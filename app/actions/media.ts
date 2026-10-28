"use server"

import { db } from "@/db"
import { media } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { writeFile, mkdir, unlink } from "fs/promises"
import path from "path"

const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB in bytes

export async function uploadMedia(formData: FormData) {
  try {
    const file = formData.get("file") as File | null
    const title = formData.get("title") as string
    const type = formData.get("type") as "photo" | "video"
    const showInGallery = formData.get("showInGallery") === "on"
    const videoUrl = formData.get("videoUrl") as string

    if (!title) throw new Error("Title is required")

    if (file && file.size > 0) {
      // 1. SERVER-SIDE SIZE CHECK
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File is too large. Maximum size is 1MB.`)
      }
    }

    if (type === "photo" && (!file || file.size === 0)) {
      throw new Error("Image file is required")
    }
    if (type === "video" && !videoUrl) {
      throw new Error("Video URL is required")
    }

    let fileUrl: string | null = null

    if (file && file.size > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads")
      await mkdir(uploadDir, { recursive: true })
      const fileExtension = file.name.split(".").pop() || "jpg"
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`
      const filePath = path.join(uploadDir, fileName)

      const bytes = await file.arrayBuffer()
      await writeFile(filePath, Buffer.from(bytes))
      fileUrl = `/uploads/${fileName}`
    }

    await db.insert(media).values({
      title,
      url: type === "photo" ? fileUrl! : videoUrl,
      thumbnail: type === "video" ? fileUrl : null,
      type,
      showInGallery,
    })

    revalidatePath("/admin/media")
    revalidatePath("/media")
    return { success: true }
  } catch (error) {
    // 2. GRACEFUL ERROR HANDLING
    console.error("Upload Error:", error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to upload media. File might be too large.",
    }
  }
}

export async function updateMedia(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string
    const showInGallery = formData.get("showInGallery") === "on"
    const newVideoUrl = formData.get("videoUrl") as string | null
    const newFile = formData.get("file") as File | null

    if (!title) throw new Error("Title is required")

    // 1. Fetch existing record
    const [existing] = await db
      .select()
      .from(media)
      .where(eq(media.id, id))
      .limit(1)
    if (!existing) throw new Error("Media not found")

    const updateData: any = { title, showInGallery }

    // 2. Handle Video URL Update
    if (existing.type === "video" && newVideoUrl) {
      updateData.url = newVideoUrl
    }

    // 3. Handle Thumbnail File Update
    if (newFile && newFile.size > 0) {
      if (newFile.size > MAX_FILE_SIZE) {
        throw new Error("New thumbnail is too large. Maximum size is 1MB.")
      }

      // Save new file
      const uploadDir = path.join(process.cwd(), "public/uploads")
      await mkdir(uploadDir, { recursive: true })
      const fileExtension = newFile.name.split(".").pop() || "jpg"
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`
      const filePath = path.join(uploadDir, fileName)
      await writeFile(filePath, Buffer.from(await newFile.arrayBuffer()))

      const newFileUrl = `/uploads/${fileName}`

      // Delete old thumbnail from disk (if it exists and is a local file)
      if (existing.thumbnail && existing.thumbnail.startsWith("/uploads/")) {
        const oldFilePath = path.join(
          process.cwd(),
          "public",
          existing.thumbnail
        )
        try {
          await unlink(oldFilePath)
        } catch (e) {
          /* ignore */
        }
      }

      updateData.thumbnail = newFileUrl
    }

    // 4. Update database
    await db.update(media).set(updateData).where(eq(media.id, id))

    revalidatePath("/admin/media")
    revalidatePath("/media")
    return { success: true }
  } catch (error) {
    console.error("Update Error:", error)
    return { success: false, error: (error as Error).message }
  }
}

// --- DELETE ---
export async function deleteMedia(id: string) {
  try {
    const [mediaItem] = await db
      .select()
      .from(media)
      .where(eq(media.id, id))
      .limit(1)
    if (!mediaItem) throw new Error("Media not found")

    await db.delete(media).where(eq(media.id, id))

    const filesToDelete = [mediaItem.url, mediaItem.thumbnail].filter(
      (url): url is string => !!url && url.startsWith("/uploads/")
    )

    for (const relativeUrl of filesToDelete) {
      const absolutePath = path.join(process.cwd(), "public", relativeUrl)
      try {
        await unlink(absolutePath)
      } catch (e) {
        /* ignore */
      }
    }

    revalidatePath("/admin/media")
    revalidatePath("/media")
    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

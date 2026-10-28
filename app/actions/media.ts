"use server"

import { db } from "@/db"
import { media } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { writeFile, mkdir, unlink } from "fs/promises"
import path from "path"

// --- CREATE ---
export async function uploadMedia(formData: FormData) {
  try {
    const file = formData.get("file") as File | null
    const title = formData.get("title") as string
    const type = formData.get("type") as "photo" | "video"
    const showInGallery = formData.get("showInGallery") === "on"
    const videoUrl = formData.get("videoUrl") as string

    if (!title) throw new Error("Title is required")
    if (type === "photo" && (!file || file.size === 0))
      throw new Error("Image file is required")
    if (type === "video" && !videoUrl) throw new Error("Video URL is required")

    let fileUrl: string | null = null
    if (file && file.size > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads")
      await mkdir(uploadDir, { recursive: true })
      const fileExtension = file.name.split(".").pop() || "jpg"
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`
      const filePath = path.join(uploadDir, fileName)
      await writeFile(filePath, Buffer.from(await file.arrayBuffer()))
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
    return { success: false, error: (error as Error).message }
  }
}

// --- UPDATE ---
export async function updateMedia(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string
    const showInGallery = formData.get("showInGallery") === "on"

    if (!title) throw new Error("Title is required")

    await db.update(media).set({ title, showInGallery }).where(eq(media.id, id))

    revalidatePath("/admin/media")
    revalidatePath("/media")
    return { success: true }
  } catch (error) {
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

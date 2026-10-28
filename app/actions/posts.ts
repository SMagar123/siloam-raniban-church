"use server"

import { db } from "@/db"
import { posts } from "@/db/schema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const postSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  shortDescription: z.string().min(10),
  content: z.string().min(20),
  thumbnailId: z.string().optional().nullable(), // Changed to accept ID
  category: z.string().min(2),
  author: z.string().min(2),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
})

export async function createPost(formData: FormData) {
  const rawData = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    shortDescription: formData.get("shortDescription"),
    content: formData.get("content"),
    thumbnailId: formData.get("thumbnailId"),
    category: formData.get("category"),
    author: formData.get("author"),
    metaTitle: formData.get("metaTitle"),
    metaDescription: formData.get("metaDescription"),
  }

  const validatedData = postSchema.parse(rawData)

  try {
    await db.insert(posts).values({
      title: validatedData.title,
      slug: validatedData.slug,
      shortDescription: validatedData.shortDescription,
      content: validatedData.content,
      thumbnailId: validatedData.thumbnailId || null, // Save ID instead of URL
      category: validatedData.category,
      author: validatedData.author,
      metaInfo: {
        title: validatedData.metaTitle || validatedData.title,
        description:
          validatedData.metaDescription || validatedData.shortDescription,
      },
    })
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to create post. Slug might already exist.")
  }

  revalidatePath("/blog")
  revalidatePath("/admin/posts")

  redirect("/admin/posts")
}

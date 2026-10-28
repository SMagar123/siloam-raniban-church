import { db } from "@/db"
import { media } from "@/db/schema"
import { eq, desc } from "drizzle-orm"

export async function getGalleryMedia() {
  return await db
    .select()
    .from(media)
    .where(eq(media.showInGallery, true))
    .orderBy(desc(media.createdAt))
}

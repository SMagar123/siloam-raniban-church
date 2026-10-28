import Image from "next/image"
import { db } from "@/db"
import { media } from "@/db/schema"
import { desc } from "drizzle-orm"
import { PlayCircle, UploadCloud } from "lucide-react"
import { UploadMediaModal } from "@/components/organisms/UploadMediaModal"
import { DeleteMediaButton } from "@/components/organisms/DeleteMediaButton"
import { EditMediaModal } from "@/components/organisms/EditMediaModal"

export default async function AdminMediaPage() {
  const allMedia = await db.select().from(media).orderBy(desc(media.createdAt))

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Media Library</h1>
          <p className="text-muted-foreground">
            Manage images and videos for your gallery.
          </p>
        </div>
        <UploadMediaModal />
      </div>

      {allMedia.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
          <UploadCloud className="mb-4 size-10 text-muted-foreground/50" />
          <p>No media found. Upload your first file to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {allMedia.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={
                    item.type === "photo"
                      ? item.url
                      : item.thumbnail || "/placeholder.jpg"
                  }
                  alt={item.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />

                <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
                  {item.showInGallery && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold tracking-wider text-primary-foreground uppercase">
                      Gallery
                    </span>
                  )}
                  {item.type === "video" && (
                    <span className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase backdrop-blur-sm">
                      <PlayCircle className="size-3" /> Video
                    </span>
                  )}
                </div>

                {/* Edit and Delete Actions (Visible on Hover) */}
                <EditMediaModal media={item} />
                <DeleteMediaButton id={item.id} />
              </div>

              <div className="flex flex-col p-3">
                <p
                  className="truncate text-sm font-semibold text-foreground"
                  title={item.title}
                >
                  {item.title}
                </p>
                <p className="text-xs tracking-wider text-muted-foreground uppercase">
                  {item.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

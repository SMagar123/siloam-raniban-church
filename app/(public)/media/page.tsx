import { MediaHero } from "@/components/templates/Media/MediaHero"
import { MediaGrid } from "@/components/templates/Media/MediaGrid"
import { mediaPageInfo } from "@/lib/data/media-page"
import { getGalleryMedia } from "@/lib/queries/media"
import { formatMediaForGallery } from "@/lib/utils"

export const revalidate = 0

export default async function MediaPage() {
  const dbItems = await getGalleryMedia()
  const formattedItems = formatMediaForGallery(dbItems)

  return (
    <main className="min-h-screen bg-background pt-24 pb-24 md:pt-32">
      <MediaHero hero={mediaPageInfo.hero} />

      {formattedItems.length > 0 ? (
        <MediaGrid items={formattedItems} />
      ) : (
        <div className="container mx-auto px-4 py-24 text-center text-muted-foreground">
          <p>No media has been uploaded to the gallery yet.</p>
        </div>
      )}
    </main>
  )
}

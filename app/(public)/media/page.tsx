import { MediaHero } from "@/components/templates/Media/MediaHero"

import { MediaGrid } from "@/components/templates/Media/MediaGrid"
import { mediaPageInfo } from "@/lib/data/media-page"

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-background pb-24">
      <MediaHero hero={mediaPageInfo.hero} />
      <MediaGrid items={mediaPageInfo.mediaItems} />
    </main>
  )
}

export { cn } from "cn"

export function formatMediaForGallery(dbItems: any[]) {
  return dbItems.map((item, index) => {
    // Generate dynamic spans for the masonry layout
    let span = "md:col-span-1 md:row-span-1"
    if (index % 5 === 0) span = "md:col-span-2 md:row-span-2"
    else if (index % 3 === 0) span = "md:col-span-2 md:row-span-1"
    else if (index % 4 === 0) span = "md:col-span-1 md:row-span-2"

    return {
      id: item.id,
      type: item.type,
      src: item.type === "photo" ? item.url : item.thumbnail || "",
      title: item.title,
      alt: item.title,
      videoUrl: item.videoUrl,
      span: span,
    }
  })
}

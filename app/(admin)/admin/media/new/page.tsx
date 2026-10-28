import { uploadMedia } from "@/app/actions/media"
import { Button } from "@/components/ui/button"

export default function UploadMediaPage() {
  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-8 text-2xl font-bold">Upload Media</h1>

      <form action={uploadMedia} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Title</label>
          <input
            name="title"
            required
            className="rounded-md border p-2"
            placeholder="Sunday Worship 2024"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Media Type</label>
          <select name="type" required className="rounded-md border p-2">
            <option value="photo">Photo</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            Upload File (Image/Thumbnail)
          </label>
          <input
            type="file"
            name="file"
            required
            accept="image/*"
            className="rounded-md border p-2"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            Video URL (Only for Videos)
          </label>
          <input
            name="videoUrl"
            type="url"
            className="rounded-md border p-2"
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="showInGallery"
            id="showInGallery"
            className="size-4"
          />
          <label htmlFor="showInGallery" className="text-sm font-medium">
            Show this in the Public Gallery
          </label>
        </div>

        <Button type="submit">Upload Media</Button>
      </form>
    </div>
  )
}

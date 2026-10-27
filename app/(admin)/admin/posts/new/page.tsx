import { createPost } from "@/app/actions/posts"
import { Button } from "@/components/ui/button"
import { SlugInput } from "./slug-input" // We'll create this below

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-2xl font-bold">Create New Post</h1>

      <form action={createPost} className="flex flex-col gap-6">
        {/* Title & Slug */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Title</label>
            <input
              name="title"
              required
              className="rounded-md border p-2"
              placeholder="Sunday Worship Recap"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Slug (URL)</label>
            <SlugInput />
          </div>
        </div>

        {/* Short Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            Short Description (Excerpt)
          </label>
          <textarea
            name="shortDescription"
            required
            rows={2}
            className="rounded-md border p-2"
            placeholder="A brief summary of the post..."
          />
        </div>

        {/* Thumbnail URL */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Thumbnail URL</label>
          <input
            name="thumbnail"
            type="url"
            className="rounded-md border p-2"
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        {/* Category & Author */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Category</label>
            <input
              name="category"
              required
              className="rounded-md border p-2"
              placeholder="Announcements"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Author</label>
            <input
              name="author"
              required
              className="rounded-md border p-2"
              placeholder="Pastor Daniel"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Content (Markdown/HTML)</label>
          <textarea
            name="content"
            required
            rows={12}
            className="rounded-md border p-2 font-mono text-sm"
            placeholder="# Heading&#10;&#10;Write your content here..."
          />
        </div>

        {/* SEO Meta Info */}
        <div className="rounded-lg border p-4">
          <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase">
            SEO Meta Info
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Meta Title</label>
              <input
                name="metaTitle"
                className="rounded-md border p-2"
                placeholder="Leave blank to use post title"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Meta Description</label>
              <textarea
                name="metaDescription"
                rows={2}
                className="rounded-md border p-2"
                placeholder="Leave blank to use short description"
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Publish Post
        </Button>
      </form>
    </div>
  )
}

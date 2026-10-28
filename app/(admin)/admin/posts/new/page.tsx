import { db } from "@/db"
import { media } from "@/db/schema"
import { eq } from "drizzle-orm"
import { createPost } from "@/app/actions/posts"
import { Button } from "@/components/ui/button"
import { SlugInput } from "./slug-input"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function NewPostPage() {
  // Fetch only photos from the media library to use as thumbnails
  const allMedia = await db.select().from(media).where(eq(media.type, "photo"))

  return (
    <div className="mx-auto max-w-4xl p-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full">
          <Link href="/admin/posts">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Create New Post
          </h1>
          <p className="text-sm text-muted-foreground">
            Write a new article or announcement for the church.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        action={createPost}
        className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
      >
        {/* Title & Slug */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Title *
            </label>
            <input
              name="title"
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="e.g., Summer Community Outreach Recap"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Slug (URL) *
            </label>
            <SlugInput />
          </div>
        </div>

        {/* Short Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Short Description (Excerpt) *
          </label>
          <textarea
            name="shortDescription"
            required
            rows={2}
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="A brief summary of the post that will appear on the blog card..."
          />
        </div>

        {/* Thumbnail Selection */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Thumbnail Image
          </label>
          <select
            name="thumbnailId"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="">No Thumbnail</option>
            {allMedia.map((img) => (
              <option key={img.id} value={img.id}>
                {img.title}
              </option>
            ))}
          </select>
          {allMedia.length === 0 && (
            <p className="text-xs text-muted-foreground">
              No media found.{" "}
              <Link
                href="/admin/media/new"
                className="text-primary hover:underline"
              >
                Upload an image first
              </Link>
              .
            </p>
          )}
        </div>

        {/* Category & Author */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Category *
            </label>
            <input
              name="category"
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="e.g., Announcements, Devotionals"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Author *
            </label>
            <input
              name="author"
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="e.g., Pastor Daniel"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Content (Markdown) *
          </label>
          <textarea
            name="content"
            required
            rows={12}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="# Heading&#10;&#10;Write your article content here using Markdown..."
          />
        </div>

        {/* SEO Meta Info */}
        <div className="rounded-xl border border-border bg-muted/20 p-6">
          <h3 className="mb-4 text-sm font-bold tracking-wider text-muted-foreground uppercase">
            SEO Meta Info
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Meta Title
              </label>
              <input
                name="metaTitle"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Leave blank to use post title"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                rows={2}
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Leave blank to use short description"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" size="lg" className="mt-4 w-full rounded-xl">
          Publish Post
        </Button>
      </form>
    </div>
  )
}

import Link from "next/link"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { desc } from "drizzle-orm"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function AdminPostsPage() {
  // Fetch posts directly from the database
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt))

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Posts</h1>
          <p className="text-muted-foreground">
            Manage your blog articles and announcements.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 size-4" /> Create Post
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm">
        {allPosts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No posts found. Click "Create Post" to get started.
          </div>
        ) : (
          <div className="flex flex-col">
            {allPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between border-b border-border p-4 last:border-0"
              >
                <div>
                  <h3 className="font-semibold text-foreground">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {post.category} •{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    View Public
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

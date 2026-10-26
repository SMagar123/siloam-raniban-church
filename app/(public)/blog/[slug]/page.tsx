import { notFound } from "next/navigation"
import { blogPageInfo } from "@/lib/data/blogs"
import { BlogDetailsHeader } from "@/components/templates/Blog/BlogDetailsHeader"
import { BlogDetailsContent } from "@/components/templates/Blog/BlogDetailsContent"
import { BlogDetailsAuthor } from "@/components/templates/Blog/BlogDetailsAuthor"
import { BlogRelated } from "@/components/templates/Blog/BlogRelated"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // Await params for Next.js 15/16 compatibility
  const { slug } = await params

  const article = blogPageInfo.articles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  // Get 3 related articles (excluding the current one)
  const relatedArticles = blogPageInfo.articles
    .filter((a) => a.id !== article.id)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-background pt-24 pb-24">
      <BlogDetailsHeader article={article} />

      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <BlogDetailsContent article={article} />
          <BlogDetailsAuthor article={article} />
        </div>
      </div>

      <BlogRelated articles={relatedArticles} />
    </main>
  )
}

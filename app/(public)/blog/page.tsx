import { BlogFeatured } from "@/components/templates/Blog/BlogFeatured"
import { BlogGrid } from "@/components/templates/Blog/BlogGrid"
import { BlogHeader } from "@/components/templates/Blog/BlogHeader"
import { BlogNewsletter } from "@/components/templates/Blog/BlogNewsLetter"
import { blogPageInfo } from "@/lib/data/blogs"

export default function BlogPage() {
  const featured =
    blogPageInfo.articles.find((a) => a.featured) || blogPageInfo.articles[0]
  const regularArticles = blogPageInfo.articles.filter(
    (a) => a.id !== featured.id
  )

  return (
    <main className="min-h-screen bg-background">
      <BlogHeader hero={blogPageInfo.hero} />
      <BlogFeatured article={featured} />
      <BlogGrid
        articles={regularArticles}
        categories={blogPageInfo.categories}
      />
      <BlogNewsletter newsletter={blogPageInfo.newsletter} />
    </main>
  )
}

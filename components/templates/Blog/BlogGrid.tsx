"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { Calendar, Search } from "lucide-react"
import { cn } from "@/lib/utils"

type Article = {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  image: string
  slug: string
}

export function BlogGrid({
  articles,
  categories,
}: {
  articles: Article[]
  categories: string[]
}) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter logic
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "All" || article.category === activeCategory
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section className="pb-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Controls: Search & Categories */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 lg:flex-row">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-border bg-background py-2.5 pr-4 pl-10 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, i) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
                >
                  <Link
                    href={`/blog/${article.slug}`}
                    className="relative aspect-[16/10] overflow-hidden bg-muted"
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-semibold text-foreground backdrop-blur-sm">
                      {article.category}
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="size-3" /> {article.date}
                    </div>
                    <Link href={`/blog/${article.slug}`}>
                      <h3 className="mb-2 text-xl leading-tight font-bold text-foreground transition-colors group-hover:text-primary">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                      <span className="text-xs font-medium text-muted-foreground">
                        By {article.author}
                      </span>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="text-sm font-semibold text-primary hover:underline"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-12 text-center text-muted-foreground"
              >
                No articles found matching your criteria.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pagination (Static UI for now) */}
        {filteredArticles.length > 0 && (
          <div className="mt-16 flex justify-center gap-2">
            <button
              className="flex size-10 items-center justify-center rounded-full border border-border text-sm font-medium hover:bg-muted disabled:opacity-50"
              disabled
            >
              Prev
            </button>
            <button className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              1
            </button>
            <button className="flex size-10 items-center justify-center rounded-full border border-border text-sm font-medium hover:bg-muted">
              2
            </button>
            <button className="flex size-10 items-center justify-center rounded-full border border-border text-sm font-medium hover:bg-muted">
              3
            </button>
            <button className="flex size-10 items-center justify-center rounded-full border border-border text-sm font-medium hover:bg-muted">
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

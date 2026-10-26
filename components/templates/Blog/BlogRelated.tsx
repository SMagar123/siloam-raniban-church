"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

export function BlogRelated({ articles }: { articles: any[] }) {
  if (articles.length === 0) return null

  return (
    <section className="mt-24 border-t border-border pt-16">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">
          Related Articles
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/blog/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="mb-2 text-xs font-semibold text-primary">
                    {article.category}
                  </p>
                  <h4 className="mb-2 line-clamp-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                    {article.title}
                  </h4>
                  <span className="mt-2 inline-flex items-center text-sm font-medium text-muted-foreground group-hover:text-primary">
                    Read More{" "}
                    <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

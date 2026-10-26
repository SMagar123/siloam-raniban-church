"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"

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

export function BlogFeatured({ article }: { article: Article }) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-lg lg:flex-row"
        >
          {/* Image Side */}
          <div className="relative aspect-video w-full overflow-hidden bg-muted lg:aspect-auto lg:w-1/2">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
              Featured
            </div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:w-1/2">
            <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">
                {article.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="size-3" /> {article.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="size-3" /> {article.author}
              </span>
            </div>

            <h2 className="mb-4 text-3xl leading-tight font-bold text-foreground md:text-4xl">
              {article.title}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              {article.excerpt}
            </p>

            <Button asChild size="lg" className="w-fit rounded-full">
              <Link href={`/blog/${article.slug}`}>
                Read Full Story <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { Calendar, User, Tag } from "lucide-react"

export function BlogDetailsHeader({ article }: { article: any }) {
  return (
    <section className="mb-12">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Meta Tags */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-primary">
              <Tag className="size-3.5" /> {article.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" /> {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="size-3.5" /> {article.author}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {article.title}
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            {article.excerpt}
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative mx-auto mt-12 aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-3xl shadow-xl"
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import { motion } from "motion/react"

export function BlogDetailsAuthor({ article }: { article: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 sm:flex-row sm:items-start"
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
        <Image
          src={article.authorImage || "/images/placeholder-avatar.jpg"}
          alt={article.author}
          fill
          className="object-cover"
        />
      </div>
      <div className="text-center sm:text-left">
        <p className="text-sm font-semibold tracking-wider text-primary uppercase">
          Written By
        </p>
        <h4 className="mt-1 text-xl font-bold text-foreground">
          {article.author}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Contributor at Siloam Church. Passionate about sharing stories of
          faith, hope, and community transformation.
        </p>
      </div>
    </motion.div>
  )
}

"use client"

import { motion } from "motion/react"

export function BlogDetailsContent({
  article,
}: {
  article: { content: string }
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="mx-auto max-w-3xl"
    >
      {/* 
        The `prose` classes are applied directly to the div that contains the HTML.
        This ensures Tailwind Typography correctly styles the h2, p, blockquote, etc.
      */}
      <div
        className="prose prose-lg prose-slate md:prose-xl prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-foreground prose-strong:text-foreground prose-img:rounded-2xl prose-img:shadow-md max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </motion.div>
  )
}

"use client"

import { motion } from "motion/react"

export function MediaHero({
  hero,
}: {
  hero: { tag: string; title: string; description: string }
}) {
  return (
    <section className="bg-primary/5 py-24 pt-32 text-center">
      <div className="container mx-auto px-4 md:px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-sm font-bold tracking-[0.2em] text-primary uppercase"
        >
          {hero.tag}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-6 max-w-3xl text-4xl font-extrabold tracking-tight text-foreground md:text-6xl"
        >
          {hero.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-muted-foreground"
        >
          {hero.description}
        </motion.p>
      </div>
    </section>
  )
}

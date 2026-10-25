"use client"

import { motion } from "motion/react"
import { aboutPageInfo } from "@/lib/data/about-page"

export function AboutHero() {
  const { hero } = aboutPageInfo
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-primary/5 py-24 pt-32 text-center">
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-sm font-bold tracking-[0.2em] text-primary uppercase"
        >
          {hero.tag}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-6 max-w-3xl text-4xl font-extrabold tracking-tight text-foreground md:text-6xl"
        >
          {hero.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg text-muted-foreground"
        >
          {hero.description}
        </motion.p>
      </div>
    </section>
  )
}

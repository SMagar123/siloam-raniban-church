"use client"

import { motion } from "motion/react"
import { Clock, Shirt, Coffee, Users } from "lucide-react"
import { visitPageInfo } from "@/lib/data/visit-page"

const FactIconMap: Record<string, React.ElementType> = {
  clock: Clock,
  shirt: Shirt,
  coffee: Coffee,
  users: Users,
}

export function VisitHero() {
  const { hero, quickFacts } = visitPageInfo

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-primary/5 py-24 pt-32 text-center md:py-32">
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
          className="mx-auto mb-6 max-w-4xl text-4xl font-extrabold tracking-tight text-foreground md:text-6xl"
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

        {/* Quick Facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4"
        >
          {quickFacts.map((fact) => {
            const Icon = FactIconMap[fact.icon] || Clock
            return (
              <div
                key={fact.label}
                className="flex flex-col items-center rounded-2xl border border-border bg-card p-4 shadow-sm"
              >
                <Icon className="mb-2 size-6 text-primary" />
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {fact.label}
                </span>
                <span className="mt-1 text-sm font-bold text-foreground">
                  {fact.value}
                </span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

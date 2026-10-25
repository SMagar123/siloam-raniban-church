"use client"

import { motion } from "motion/react"
import { Music, BookOpen, Globe, Smile } from "lucide-react"
import { visitPageInfo } from "@/lib/data/visit-page"

const ExpectIconMap: Record<string, React.ElementType> = {
  music: Music,
  book: BookOpen,
  globe: Globe,
  smile: Smile,
}

export function VisitExpectations() {
  const { expectations } = visitPageInfo

  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {expectations.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {expectations.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {expectations.items.map((item, i) => {
            const Icon = ExpectIconMap[item.icon] || Smile
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-7" />
                </div>
                <h4 className="mb-2 text-lg font-bold text-foreground">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

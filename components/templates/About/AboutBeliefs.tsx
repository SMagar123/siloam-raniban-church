"use client"

import { motion } from "motion/react"
import { aboutPageInfo } from "@/lib/data/about-page"

export function AboutBeliefs() {
  const { beliefs } = aboutPageInfo

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {beliefs.title}
          </h2>
          <p className="text-lg text-muted-foreground">{beliefs.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {beliefs.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border p-6 transition-colors hover:bg-muted/50"
            >
              <h4 className="mb-2 text-xl font-bold text-foreground">
                {item.title}
              </h4>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 rounded-xl bg-primary/10 p-6 text-center text-primary"
        >
          <p className="font-medium">{beliefs.affiliation}</p>
        </motion.div>
      </div>
    </section>
  )
}

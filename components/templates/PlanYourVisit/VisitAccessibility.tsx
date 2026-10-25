"use client"

import { motion } from "motion/react"
import { Accessibility, Volume2, Car, Bus } from "lucide-react"
import { visitPageInfo } from "@/lib/data/visit-page"

export function VisitAccessibility() {
  const { accessibility } = visitPageInfo

  // Using an array of icons to map to the index of the items
  const icons = [Accessibility, Volume2, Car, Bus]

  return (
    <section className="bg-primary py-24 text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {accessibility.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {accessibility.items.map((item, i) => {
            const Icon = icons[i] || Accessibility
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-primary-foreground/10 p-6 backdrop-blur-sm"
              >
                <Icon className="mb-4 size-8 text-primary-foreground/80" />
                <h4 className="mb-2 text-lg font-bold">{item.title}</h4>
                <p className="text-sm text-primary-foreground/80">
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

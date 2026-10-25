"use client"

import { motion } from "motion/react"
import { aboutPageInfo } from "@/lib/data/about-page"

export function AboutStory() {
  const { story } = aboutPageInfo

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">
              {story.title}
            </h2>
            <p className="mb-6 font-semibold text-primary">
              {story.established}
            </p>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              {story.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative ml-4 border-l border-border pl-8 lg:ml-0"
          >
            {story.milestones.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative mb-10 last:mb-0"
              >
                {/* Timeline Dot */}
                <span className="absolute top-1 -left-[41px] flex size-5 items-center justify-center rounded-full border-2 border-primary bg-background">
                  <span className="size-2 rounded-full bg-primary" />
                </span>
                <span className="mb-1 block text-sm font-bold text-primary">
                  {milestone.year}
                </span>
                <p className="text-muted-foreground">{milestone.event}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

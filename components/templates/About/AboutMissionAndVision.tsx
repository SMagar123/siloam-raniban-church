"use client"

import { motion } from "motion/react"
import { Target, Eye } from "lucide-react"
import { aboutPageInfo } from "@/lib/data/about-page"

export function AboutMissionVision() {
  const { missionVision } = aboutPageInfo

  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12"
          >
            <div className="absolute top-0 right-0 -mt-16 -mr-16 size-64 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
            <Target className="mb-6 size-10 text-primary" />
            <h3 className="mb-4 text-2xl font-bold">
              {missionVision.mission.title}
            </h3>
            <p className="relative z-10 text-lg leading-relaxed text-muted-foreground">
              {missionVision.mission.statement}
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12"
          >
            <div className="absolute top-0 right-0 -mt-16 -mr-16 size-64 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
            <Eye className="mb-6 size-10 text-primary" />
            <h3 className="mb-4 text-2xl font-bold">
              {missionVision.vision.title}
            </h3>
            <p className="relative z-10 text-lg leading-relaxed text-muted-foreground">
              {missionVision.vision.statement}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "motion/react"
import { Music, BookOpen, Users, Globe, HandHeart } from "lucide-react"
import { aboutPageInfo } from "@/lib/data/about-page"

const IconMap: Record<string, React.ElementType> = {
  music: Music,
  book: BookOpen,
  users: Users,
  globe: Globe,
  hands: HandHeart,
}

export function AboutValues() {
  const { values } = aboutPageInfo

  return (
    <section className="bg-primary py-24 text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {values.title}
          </h2>
          <p className="mx-auto max-w-2xl text-primary-foreground/80">
            {values.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {values.list.map((value, i) => {
            const Icon = IconMap[value.icon] || Users
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl bg-primary-foreground/5 p-6 text-center backdrop-blur-sm transition-colors hover:bg-primary-foreground/10"
              >
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-primary-foreground/10 text-primary-foreground transition-transform group-hover:scale-110">
                  <Icon className="size-6" />
                </div>
                <h4 className="mb-2 font-bold">{value.title}</h4>
                <p className="text-sm text-primary-foreground/70">
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { CheckCircle2 } from "lucide-react"
import { aboutPageInfo } from "@/lib/data/about-page"

export function AboutCulture() {
  const { culture } = aboutPageInfo

  return (
    <section className="overflow-hidden bg-muted/20 py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square overflow-hidden rounded-3xl shadow-lg md:aspect-4/3"
          >
            <Image
              src={culture.image}
              alt="Church Culture"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              {culture.title}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              {culture.description}
            </p>
            <ul className="flex flex-col gap-4">
              {culture.highlights.map((highlight, i) => (
                <motion.li
                  key={highlight}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="font-medium text-foreground">
                    {highlight}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

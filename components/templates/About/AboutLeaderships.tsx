"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { ShieldCheck } from "lucide-react"
import { aboutPageInfo } from "@/lib/data/about-page"
import { AutoCarousel } from "@/components/molecules/AutoCarousel"

export function AboutLeadership() {
  const { leadership } = aboutPageInfo

  return (
    <section className="overflow-hidden bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            {leadership.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {leadership.description}
          </p>
        </motion.div>

        {/* Marquee Carousel */}
        <div className="relative w-full">
          <AutoCarousel
            items={leadership.team}
            transition="marquee"
            autoPlay={true}
            pauseOnHover={true}
            marqueeSpeed={90}
            marqueeGap="1.5rem"
            showGradientMask={true}
            gradientWidth="10%"
            itemClassName="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            renderItem={(member) => (
              <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="relative aspect-4/5 w-full overflow-hidden bg-muted">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 280px, 320px"
                  />
                </div>
                <div className="p-5 text-center">
                  <h4 className="text-lg font-bold text-foreground">
                    {member.name}
                  </h4>
                  <p className="text-sm font-medium text-primary">
                    {member.role}
                  </p>
                </div>
              </div>
            )}
          />
        </div>

        {/* Governance Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 flex max-w-full flex-col items-center gap-4 rounded-2xl border border-border bg-muted/30 p-6 md:flex-row md:items-start md:p-8"
        >
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="size-6" />
          </div>
          <div className="text-center md:text-left">
            <h4 className="mb-1 font-bold text-foreground">
              Church Governance
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {leadership.governance}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

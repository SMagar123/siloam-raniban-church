"use client"

import Link from "next/link"
import { motion } from "motion/react"
import {
  ArrowRight,
  Heart,
  BookOpen,
  HandHeart,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { aboutCommunityInfo } from "@/lib/data/about-community"

// Map string keys to Lucide icons
const IconMap: Record<string, React.ElementType> = {
  heart: Heart,
  book: BookOpen,
  hands: HandHeart,
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
}

export function AboutCommunitySection() {
  const { header, values, belong, cta } = aboutCommunityInfo

  return (
    <section className="relative w-full overflow-hidden bg-primary py-16 md:py-24">
      <div className="pointer-events-none absolute top-0 left-0 -z-10 h-125 w-full bg-linear-to-b from-primary/5 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-3 text-sm font-bold tracking-[0.2em] text-card uppercase">
            {header.tag}
          </p>
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-card md:text-5xl">
            {header.title}
          </h2>
          <p className="text-lg leading-relaxed text-accent md:text-xl">
            {header.mission}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 md:mt-24"
        >
          <div className="mb-10 text-center md:mb-16">
            <h3 className="text-2xl font-bold text-card md:text-3xl">
              {values.title}
            </h3>
            <p className="mt-2 text-accent">{values.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.items.map((item) => {
              const Icon = IconMap[item.icon] || Heart
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-8" />
                  </div>
                  <h4 className="mb-3 text-xl font-bold text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="mb-4 text-3xl font-bold text-card md:text-4xl">
              {belong.title}
            </h3>
            <p className="mb-8 text-lg text-accent">{belong.description}</p>

            <div className="flex flex-col gap-6">
              {belong.steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2 + i * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="flex items-start gap-4"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-foreground font-bold text-card">
                    {step.step}
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-card">
                      {step.title}
                    </h5>
                    <p className="text-sm text-accent">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl bg-card p-8 text-primary-foreground shadow-xl md:p-12"
          >
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle, black 2px, transparent 2px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div>
                <h3 className="mb-4 text-3xl font-bold text-primary">
                  {cta.text}
                </h3>
                <ul className="mb-8 space-y-3">
                  {[
                    "Find your purpose",
                    "Build lasting friendships",
                    "Grow in your faith",
                  ].map((text) => (
                    <li
                      key={text}
                      className="flex items-center gap-3 text-primary"
                    >
                      <CheckCircle2 className="size-5 text-primary/80" />
                      <span className="font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                size="lg"
                variant="secondary"
                className="w-fit rounded-full bg-primary px-8 font-bold text-card transition-transform duration-500 hover:scale-105 hover:bg-foreground hover:text-card active:scale-95"
              >
                <Link href={cta.href} className="flex items-center gap-2">
                  {cta.buttonText}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

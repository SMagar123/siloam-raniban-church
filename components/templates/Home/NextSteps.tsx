"use client"

import Link from "next/link"
import { motion } from "motion/react"
import {
  ArrowRight,
  HeartHandshake,
  Users,
  HandHeart,
  Coffee,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { nextStepsInfo } from "@/lib/data/next-steps"
import { cn } from "@/lib/utils"

const IconMap: Record<string, React.ElementType> = {
  prayer: HeartHandshake,
  group: Users,
  serve: HandHeart,
  welcome: Coffee,
  contact: Mail,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export function NextStepsSection() {
  const { header, steps } = nextStepsInfo

  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-bold tracking-[0.2em] text-primary uppercase">
            {header.tag}
          </p>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {header.title}
          </h2>
          <p className="text-lg text-muted-foreground">{header.description}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {steps.map((step, i) => {
            const Icon = IconMap[step.icon] || HeartHandshake
            const isFeatured = step.featured

            return (
              <motion.div
                key={step.title}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-8 shadow-sm transition-shadow hover:shadow-md",
                  isFeatured
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-card"
                )}
              >
                {isFeatured && (
                  <div className="absolute top-0 right-0 rounded-bl-xl bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    Popular
                  </div>
                )}

                <div>
                  <div
                    className={cn(
                      "mb-6 flex size-14 items-center justify-center rounded-xl transition-colors duration-300",
                      isFeatured
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                    )}
                  >
                    <Icon className="size-7" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                <Button
                  asChild
                  variant={isFeatured ? "default" : "outline"}
                  className={cn(
                    "w-fit rounded-full transition-transform group-hover:scale-105 active:scale-95",
                    !isFeatured &&
                      "border-primary/20 hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  <Link href={step.href} className="flex items-center gap-2">
                    {step.actionText}
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            )
          })}

          <motion.div
            variants={itemVariants}
            className="hidden flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/20 p-8 text-center lg:flex"
          >
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Mail className="size-6" />
            </div>
            <h3 className="mb-1 text-lg font-semibold text-foreground">
              Still have questions?
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              We&apos;d love to hear from you.
            </p>
            <Link
              href="/contact"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "motion/react"
import { Mail, ArrowRight } from "lucide-react"

export function BlogNewsletter({
  newsletter,
}: {
  newsletter: { title: string; description: string }
}) {
  return (
    <section className="bg-primary py-24 text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary-foreground/10 backdrop-blur-sm">
            <Mail className="size-8" />
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {newsletter.title}
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/80">
            {newsletter.description}
          </p>

          <form
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-6 py-3.5 text-sm text-primary-foreground backdrop-blur-sm outline-none placeholder:text-primary-foreground/50 focus:border-primary-foreground focus:ring-1 focus:ring-primary-foreground"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-primary-foreground px-8 py-3.5 text-sm font-bold text-primary transition-transform hover:scale-105 active:scale-95"
            >
              Subscribe <ArrowRight className="size-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { ArrowRight, BookOpen, Church, ShieldCheck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { pastorMessageInfo } from "@/lib/data/message-pastor"

// Map string keys from the data object to actual Lucide components
const StoryIconMap: Record<string, React.ElementType> = {
  book: BookOpen,
  users: Users,
  church: Church,
  shield: ShieldCheck,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
}

export function PastorMessageSection() {
  const { greeting, title, paragraphs, pastor, storySection } =
    pastorMessageInfo

  return (
    <section className="relative w-full overflow-hidden bg-background py-16 md:py-24">
      <div className="pointer-events-none absolute top-1/2 right-0 -z-10 -translate-y-1/2 opacity-5">
        <svg
          width="400"
          height="400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: -20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-5"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-muted shadow-lg">
              <Image
                src={pastor.imageUrl}
                alt={pastor.name}
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/10 bg-black/60 p-5 text-white backdrop-blur-md">
                <h3 className="text-xl font-bold">{pastor.name}</h3>
                <p className="text-sm font-medium tracking-wider text-white/80 uppercase">
                  {pastor.role}
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center lg:col-span-7"
          >
            <motion.p
              variants={itemVariants}
              className="mb-3 text-sm font-bold tracking-[0.15em] text-primary uppercase"
            >
              {greeting}
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl"
            >
              {title}
            </motion.h2>

            <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {paragraphs.map((p, i) => (
                <motion.p key={i} variants={itemVariants}>
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col items-start gap-2"
            >
              <div className="font-serif text-3xl text-foreground/80 italic md:text-4xl">
                {pastor.name}
              </div>
              <p className="text-sm font-semibold tracking-widest text-primary uppercase">
                {pastor.role}
              </p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 rounded-2xl border border-border bg-accent/30 p-6 md:mt-24 md:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left: Title & CTA */}
            <div className="space-y-4 lg:col-span-5">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users className="size-5" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {storySection.title}
                </h3>
              </div>
              <p className="text-muted-foreground">
                {storySection.description}
              </p>

              <Button
                variant="outline"
                className="group mt-2 rounded-full border-primary/20 bg-primary text-card transition duration-500 ease-in-out hover:text-primary"
              >
                <Link
                  href={storySection.ctaLink}
                  className="flex items-center gap-2"
                >
                  {storySection.ctaText}
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Right: Links Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {storySection.links.map((link, i) => {
                  const Icon = StoryIconMap[link.icon] || BookOpen
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.4 + i * 0.1,
                        type: "spring",
                        stiffness: 100,
                      }}
                    >
                      <Link
                        href={link.href}
                        className="group flex items-center gap-3 rounded-xl border border-transparent p-3 transition-colors hover:border-border hover:bg-background"
                      >
                        <div className="flex size-10 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                          <Icon className="size-5" />
                        </div>
                        <span className="font-medium text-foreground/80 transition-colors group-hover:text-foreground">
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

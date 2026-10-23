"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const slides = [
  {
    src: "/images/home/church.jpg", // replace with your image paths
    alt: "Siloam Church",
  },
  {
    src: "/images/home/home-2.jpg",
    alt: "Community gathering at Siloam Church",
  },
  {
    src: "/images/home/home-img.jpg",
    alt: "Evening worship at Siloam Church",
  },
  {
    src: "/images/home/home-3.jpg",
    alt: "Evening worship at Siloam Church",
  },
  {
    src: "/images/home/home-4.jpg",
    alt: "Prayer at Siloam Church",
  },
]

const SLIDE_DURATION = 6000

export function Hero() {
  const [index, setIndex] = useState(0)

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, SLIDE_DURATION)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* ---------- Background images ---------- */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: SLIDE_DURATION / 1000 + 1.2, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <Image
              src={slides[index].src}
              alt={slides[index].alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---------- Overlay(s) for readability ---------- */}
      {/* Base darken */}
      <div className="absolute inset-0 -z-10 bg-black/40" />
      {/* Gradient for extra depth (heavier at bottom for CTA contrast) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
      {/* Optional: subtle vignette */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.5)_100%)]" />

      {/* ---------- Content ---------- */}
      <div className="relative z-10 container mx-auto flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-sm font-medium tracking-[0.2em] text-white/80 uppercase"
        >
          Welcome to Siloam Raniban Church
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-4xl text-5xl leading-[1.05] font-semibold tracking-tight md:text-7xl"
        >
          A place of grace,
          <br />
          <span className="text-white/90">community &amp; hope.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-base text-white/80 md:text-lg"
        >
          Join us in worship, fellowship, and service — wherever you are on your
          journey.
        </motion.p>

        {/* ---------- CTAs ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            className="h-12 rounded-full px-7 text-base font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
          >
            <Link href="/connect" className="flex items-center gap-2">
              Plan Your Visit
              <ArrowRight className="size-4 lg:size-6" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-white/30 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/15 hover:text-white"
          >
            <Link href="/medias" className="flex items-center gap-2">
              <PlayCircle className="size-4 lg:size-6" />
              Watch Sermons
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* ---------- Slide indicators ---------- */}
      <div className="absolute right-0 bottom-8 left-0 z-10 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index
                ? "w-8 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            )}
          />
        ))}
      </div>

      {/* ---------- Scroll hint (optional) ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute right-8 bottom-8 z-10 hidden items-center gap-2 text-xs tracking-widest text-white/60 uppercase md:flex"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="inline-block h-6 w-[1px] bg-white/40"
        />
      </motion.div>
    </section>
  )
}

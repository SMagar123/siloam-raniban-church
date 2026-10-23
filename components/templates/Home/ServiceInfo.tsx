"use client"

import dynamic from "next/dynamic"
import { motion } from "motion/react"
import {
  Calendar,
  MapPin,
  Users,
  MessageCircle,
  Car,
  Accessibility,
  Bus,
  Bike,
} from "lucide-react"
import { serviceInfo } from "@/lib/data/service-info"

const GoogleMap = dynamic(
  () => import("@/components/molecules/GoogleMap").then((mod) => mod.GoogleMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-48 w-full animate-pulse rounded-lg border border-border bg-muted/50 sm:h-[120px]" />
    ),
  }
)

const IconMap: Record<string, React.ElementType> = {
  parking: Car,
  accessible: Accessibility,
  bus: Bus,
  bike: Bike,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.6,
    },
  },
}

const listVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
}

export function ServiceInfoSection() {
  const { schedule, location, languages, accessibility } = serviceInfo

  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-2 text-sm font-bold tracking-widest text-primary uppercase">
            Visit Us
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Service Information
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We&apos;d love to welcome you! Here&apos;s everything you need to
            know about our service times, location, and what to expect when you
            visit.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          <div className="flex flex-col gap-6">
            <motion.div
              variants={itemVariants}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md md:p-8"
            >
              <div className="mb-6 flex items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <Calendar className="size-6" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {schedule.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {schedule.description}
                  </p>
                </div>
              </div>

              <motion.div
                variants={containerVariants}
                className="mb-6 flex flex-col gap-4"
              >
                {schedule.times.map((item) => (
                  <motion.div
                    key={item.day}
                    variants={listVariants}
                    className="flex flex-col border-b border-border pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-start"
                  >
                    <span className="w-32 shrink-0 font-semibold text-foreground">
                      {item.day}
                    </span>
                    <div className="flex flex-col gap-1">
                      {item.times.map((t, idx) => (
                        <div
                          key={idx}
                          className="text-sm text-muted-foreground"
                        >
                          <span className="text-foreground">{t.time}</span> (
                          {t.type})
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="mt-auto flex cursor-default items-start gap-3 rounded-xl bg-accent/50 p-4 transition-colors hover:bg-accent/80"
              >
                <Users className="mt-0.5 size-5 text-primary" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {schedule.welcomeNote.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {schedule.welcomeNote.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md md:p-8"
            >
              <div className="mb-4 flex items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <MessageCircle className="size-6" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {languages.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {languages.description}
                  </p>
                </div>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {languages.list.map((lang, i) => (
                  <motion.span
                    key={lang}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="cursor-default rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {lang}
                  </motion.span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{languages.note}</p>
            </motion.div>
          </div>

          <div className="flex flex-col gap-6">
            <motion.div
              variants={itemVariants}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md md:p-8"
            >
              <div className="mb-6 flex items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <MapPin className="size-6" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {location.title}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {location.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {location.address}
                  </p>
                </div>
              </div>

              <div className="mt-auto grid grid-cols-1 gap-4 sm:items-center">
                <GoogleMap
                  embedUrl={location.mapEmbedUrl}
                  title={`Map to ${location.name}`}
                  className="h-48 sm:h-30"
                />
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md md:p-8"
            >
              <div className="mb-6 flex items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <Car className="size-6" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {accessibility.title}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {accessibility.items.map((item, index) => {
                  const Icon = IconMap[item.icon] || MapPin
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="size-5 text-primary" />
                        <h4 className="font-semibold text-foreground">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

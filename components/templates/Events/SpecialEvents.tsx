"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { CalendarDays, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SpecialEvents({ events }: { events: any[] }) {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Upcoming Special Events
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Join us for seminars, workshops, retreats, and community outreach.
          </p>
        </div>

        {events.length === 0 ? (
          // Empty State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-background p-12 text-center shadow-sm"
          >
            <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CalendarDays className="size-10" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-foreground">
              No Special Events Scheduled Yet
            </h3>
            <p className="mb-8 text-muted-foreground">
              We are currently planning our next conference and workshop. Check
              back soon for updates!
            </p>
            <Button asChild className="rounded-full">
              <Link href="/connect">Get Notified</Link>
            </Button>
          </motion.div>
        ) : (
          // Events Grid (Ready for future data)
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {event.title}
                  </h3>
                  <div className="mb-4 flex flex-col gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="size-4" /> {event.date} at{" "}
                      {event.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="size-4" /> {event.location}
                    </span>
                  </div>
                  <p className="mb-6 line-clamp-3 flex-1 text-sm text-muted-foreground">
                    {event.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full"
                  >
                    <Link href={`/events/${event.slug}`}>
                      View Details <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

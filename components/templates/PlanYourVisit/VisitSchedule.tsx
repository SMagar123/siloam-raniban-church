"use client"

import { motion } from "motion/react"
import { MapPin, Clock, ArrowRight, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { visitPageInfo } from "@/lib/data/visit-page"
import { GoogleMap } from "@/components/molecules/GoogleMap"

export function VisitSchedule() {
  const { schedule } = visitPageInfo

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Times & Directions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="mb-2 text-3xl font-bold text-foreground">
                {schedule.title}
              </h2>
              <p className="text-muted-foreground">{schedule.description}</p>
            </div>

            {/* Service Times */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <Clock className="size-5 text-primary" />
                <h3 className="text-lg font-bold">Weekly Services</h3>
              </div>
              <div className="flex flex-col gap-4">
                {schedule.times.map((time) => (
                  <div
                    key={time.day}
                    className="flex flex-col border-b border-border pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="font-semibold text-foreground">
                      {time.day}
                    </span>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {time.time}
                      </span>{" "}
                      — {time.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Directions */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <MapPin className="size-5 text-primary" />
                <h3 className="text-lg font-bold">Location & Directions</h3>
              </div>
              <p className="mb-4 font-semibold text-foreground">
                {schedule.location.name}
              </p>
              <p className="mb-6 text-sm text-muted-foreground">
                {schedule.location.address}
              </p>

              <div className="mb-6 flex flex-col gap-3">
                {schedule.directions.map((dir) => (
                  <div key={dir.landmark} className="text-sm">
                    <span className="font-semibold text-foreground">
                      {dir.landmark}:{" "}
                    </span>
                    <span className="text-muted-foreground">
                      {dir.instruction}
                    </span>
                  </div>
                ))}
              </div>

              <Button className="w-full rounded-full sm:w-fit">
                <a
                  href={schedule.location.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps <Navigation className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full min-h-100 overflow-hidden rounded-3xl border border-border shadow-lg"
          >
            <GoogleMap
              embedUrl={schedule.location.mapEmbedUrl}
              title={`Map to ${schedule.location.name}`}
              className="h-full w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

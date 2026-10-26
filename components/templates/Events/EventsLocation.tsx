"use client"

import { motion } from "motion/react"
import { MapPin, Navigation, Car, Bus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GoogleMap } from "@/components/molecules/GoogleMap" // Assuming you have this from earlier

export function EventsLocation({ location }: { location: any }) {
  // Fallback icons if accessibility data is passed alongside
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              {location.title}
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              We are conveniently located in the heart of Raniban. Free parking
              is available on-site.
            </p>

            <div className="mb-8 flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <MapPin className="mt-1 size-6 shrink-0 text-primary" />
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {location.name}
                </h3>
                <p className="text-muted-foreground">{location.address}</p>
              </div>
            </div>

            <Button asChild size="lg" className="rounded-full">
              <a
                href={location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions <Navigation className="ml-2 size-4" />
              </a>
            </Button>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[400px] overflow-hidden rounded-3xl border border-border shadow-lg"
          >
            <GoogleMap
              embedUrl={location.mapEmbedUrl}
              title={`Map to ${location.name}`}
              className="h-full w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import { motion } from "motion/react"

export function PhotoGallery({ photos }: { photos: any[] }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Photo Gallery
          </h2>
        </div>

        {/* Masonry Grid using Tailwind CSS Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl bg-muted ${photo.span}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Optional: Hover Overlay with Alt text */}
              <div className="absolute inset-0 flex items-end bg-black/40 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-sm font-medium text-white">{photo.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

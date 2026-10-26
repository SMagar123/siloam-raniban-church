"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { Play, X, Calendar } from "lucide-react"

export function VideoGallery({ videos }: { videos: any[] }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  // Close modal on Escape key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setActiveVideo(null)
  }

  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Video Library
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Catch up on past sermons and event recaps.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveVideo(video.videoUrl)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/50">
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-1 size-6" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  {video.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal (Pop-up) */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent clicking inside video from closing
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
                aria-label="Close video"
              >
                <X className="size-5" />
              </button>

              {/* Video Iframe */}
              <div className="aspect-video w-full">
                <iframe
                  src={`${activeVideo}?autoplay=1`}
                  title="Video player"
                  width="100%"
                  height="100%"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

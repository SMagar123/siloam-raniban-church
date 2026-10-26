"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { Play, X, Calendar } from "lucide-react"

export function MediaGrid({ items }: { items: any[] }) {
  const [activeVideo, setActiveVideo] = useState<any | null>(null)
  const [activePhoto, setActivePhoto] = useState<any | null>(null)

  // Lock scroll when modal is open
  useEffect(() => {
    if (activeVideo || activePhoto) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [activeVideo, activePhoto])

  const closeAll = () => {
    setActiveVideo(null)
    setActivePhoto(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeAll()
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* The Grid */}
        <div className="grid auto-rows-[250px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:auto-rows-[300px]">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-muted ${item.span || ""}`}
              onClick={() => {
                if (item.type === "video") setActiveVideo(item)
                if (item.type === "photo") setActivePhoto(item)
              }}
            >
              <Image
                src={item.src}
                alt={item.alt || item.title || "Gallery image"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Photo Hover Overlay */}
              {item.type === "photo" && (
                <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-sm font-medium text-white">{item.alt}</p>
                </div>
              )}

              {/* Video Overlay & Play Button */}
              {item.type === "video" && (
                <div className="absolute inset-0 flex flex-col justify-between bg-black/20 p-5 transition-colors group-hover:bg-black/40">
                  <div className="flex justify-end">
                    <span className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      <Calendar className="size-3" /> {item.date}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-1 size-6" fill="currentColor" />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white shadow-sm">
                      {item.title}
                    </h3>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- PHOTO LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8"
            onClick={closeAll}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* 
              FIX: We remove the strict height constraints on the wrapper. 
              We use `flex-col` to allow the image and caption to stack naturally.
            */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative flex w-full max-w-7xl flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Positioned above the image on mobile, outside on desktop */}
              <button
                onClick={closeAll}
                className="absolute -top-12 right-0 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black md:top-0 md:-right-12 md:bg-transparent md:p-2 md:hover:bg-white/20"
              >
                <span className="hidden md:inline">Close</span>
                <X className="size-5" />
              </button>

              {/* 
                FIX: The image now scales based on the viewport height (85vh) but doesn't force the wrapper to overflow.
                `object-contain` guarantees it fits entirely.
              */}
              <img
                src={activePhoto.src}
                alt={activePhoto.alt || "Enlarged photo"}
                className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
              />

              {/* Optional Caption below the image */}
              {activePhoto.alt && (
                <p className="mt-4 text-center text-sm text-white/70">
                  {activePhoto.alt}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- VIDEO MODAL --- */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8"
            onClick={closeAll}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Video Wrapper */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar inside the modal for context and close button */}
              <div className="flex items-center justify-between bg-zinc-900 px-4 py-3">
                <h3 className="text-sm font-medium text-white md:text-base">
                  {activeVideo.title}
                </h3>
                <button
                  onClick={closeAll}
                  className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white hover:text-black"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* 16:9 Video Container */}
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={`${activeVideo.videoUrl}?autoplay=1`}
                  title={activeVideo.title}
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

"use client"

import { useState } from "react"
import { motion } from "motion/react"

interface LazyMapProps {
  embedUrl: string
  title?: string
  className?: string
}

export function GoogleMap({
  embedUrl,
  title = "Map location",
  className,
}: LazyMapProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div
      className={`relative h-48 w-full overflow-hidden rounded-lg border border-border bg-muted/50 sm:h-full sm:min-h-30 ${className}`}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-muted">
          <span className="text-xs font-medium text-muted-foreground">
            Loading Map...
          </span>
        </div>
      )}

      <motion.iframe
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        src={embedUrl}
        title={title}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setIsLoaded(true)}
        className="relative z-10 h-full w-full object-cover"
      />
    </div>
  )
}

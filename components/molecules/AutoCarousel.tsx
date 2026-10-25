"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

type AutoCarouselProps<T> = {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  transition?: "fade" | "slide" | "marquee"
  delay?: number
  loop?: boolean
  reverse?: boolean
  pauseOnHover?: boolean
  stopOnInteraction?: boolean
  showControls?: boolean
  showChevronControls?: boolean
  showDotControls?: boolean
  reverseControlsPosition?: boolean
  autoPlay?: boolean
  showGradientMask?: boolean
  gradientWidth?: string
  gradientMaskClassName?: string
  transitionDuration?: number
  className?: string
  itemClassName?: string
  onSlideChange?: (index: number) => void
  marqueeSpeed?: number
  marqueeGap?: string
  draggable?: boolean
}

export function AutoCarousel<T>(props: AutoCarouselProps<T>) {
  const { transition = "fade" } = props

  if (transition === "marquee") {
    return <MarqueeCarousel {...props} />
  }

  return transition === "slide" ? (
    <SlideCarousel {...props} />
  ) : (
    <FadeCarousel {...props} />
  )
}

function FadeCarousel<T>({
  items,
  renderItem,
  delay = 3500,
  loop = true,
  reverse = false,
  pauseOnHover = true,
  stopOnInteraction = false,
  showControls = false,
  showDotControls = true,
  reverseControlsPosition = false,
  autoPlay = true,
  showGradientMask = false,
  gradientWidth = "8%",
  gradientMaskClassName,
  transitionDuration = 500,
  className,
  itemClassName,
  onSlideChange,
}: AutoCarouselProps<T>) {
  const [index, setIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const [userInteracted, setUserInteracted] = React.useState(false)

  const count = items.length

  const handleNav = React.useCallback(
    (nextIndex: number) => {
      setIndex(nextIndex)
      onSlideChange?.(nextIndex)
    },
    [onSlideChange]
  )

  React.useEffect(() => {
    if (!autoPlay || count <= 1) return
    if (isPaused) return
    if (stopOnInteraction && userInteracted) return

    const timer = window.setInterval(() => {
      setIndex((current) => {
        let next: number

        if (reverse) {
          const atStart = current === 0

          if (atStart && !loop) {
            window.clearInterval(timer)
            return current
          }

          next = atStart ? count - 1 : current - 1
        } else {
          const atEnd = current === count - 1

          if (atEnd && !loop) {
            window.clearInterval(timer)
            return current
          }

          next = atEnd ? 0 : current + 1
        }

        onSlideChange?.(next)

        return next
      })
    }, delay)

    return () => window.clearInterval(timer)
  }, [
    autoPlay,
    count,
    delay,
    isPaused,
    loop,
    reverse,
    onSlideChange,
    stopOnInteraction,
    userInteracted,
  ])

  if (count === 0) return null

  const handleManualNav = (next: number) => {
    setUserInteracted(true)
    handleNav(((next % count) + count) % count)
  }

  const maskStyle = showGradientMask
    ? {
        WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${gradientWidth}, black calc(100% - ${gradientWidth}), transparent 100%)`,
        maskImage: `linear-gradient(to right, transparent 0%, black ${gradientWidth}, black calc(100% - ${gradientWidth}), transparent 100%)`,
      }
    : undefined

  const renderDots = showControls && showDotControls && count > 1 && (
    <DotControls count={count} selected={index} onSelect={handleManualNav} />
  )

  return (
    <div
      className={cn("relative flex w-full flex-col", className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {reverseControlsPosition && renderDots}

      <div
        className={cn("relative w-full overflow-hidden", gradientMaskClassName)}
        style={maskStyle}
      >
        {items.map((item, i) => {
          const isActive = i === index

          return (
            <div
              key={i}
              className={cn(
                "w-full transform-gpu transition-opacity ease-in-out will-change-[opacity]",
                isActive
                  ? "relative z-10 opacity-100"
                  : "pointer-events-none absolute inset-0 z-0 opacity-0",
                itemClassName
              )}
              style={{
                transitionDuration: `${transitionDuration}ms`,
              }}
            >
              {renderItem(item, i)}
            </div>
          )
        })}
      </div>

      {!reverseControlsPosition && renderDots}
    </div>
  )
}

function SlideCarousel<T>({
  items,
  renderItem,
  delay = 3500,
  loop = true,
  reverse = false,
  pauseOnHover = true,
  stopOnInteraction = false,
  showControls = false,
  showChevronControls = true,
  showDotControls = true,
  reverseControlsPosition = false,
  autoPlay = true,
  showGradientMask = false,
  gradientWidth = "8%",
  gradientMaskClassName,
  className,
  itemClassName,
  onSlideChange,
}: AutoCarouselProps<T>) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [selected, setSelected] = React.useState(0)
  const [snapCount, setSnapCount] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)

  const [plugin] = React.useState(() =>
    Autoplay({
      delay,
      stopOnInteraction,
      stopOnMouseEnter: pauseOnHover,
    })
  )

  const plugins = React.useMemo(
    () => (autoPlay && !reverse ? [plugin] : []),
    [autoPlay, reverse, plugin]
  )

  React.useEffect(() => {
    if (!api || !autoPlay || !reverse) return
    if (isPaused) return

    const interval = window.setInterval(() => {
      if (api.canScrollPrev() || loop) {
        api.scrollPrev()
      }
    }, delay)

    return () => window.clearInterval(interval)
  }, [api, autoPlay, reverse, isPaused, delay, loop])

  React.useEffect(() => {
    if (!api) return

    const onSelect = () => {
      const i = api.selectedScrollSnap()

      setSelected(i)
      onSlideChange?.(i)
    }

    const onInit = () => {
      setSnapCount(api.scrollSnapList().length)
      onSelect()
    }

    onInit()

    api.on("select", onSelect)
    api.on("reInit", onInit)

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onInit)
    }
  }, [api, onSlideChange])

  const maskStyle = showGradientMask
    ? {
        WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${gradientWidth}, black calc(100% - ${gradientWidth}), transparent 100%)`,
        maskImage: `linear-gradient(to right, transparent 0%, black ${gradientWidth}, black calc(100% - ${gradientWidth}), transparent 100%)`,
      }
    : undefined

  const renderDots = showControls && showDotControls && snapCount > 1 && (
    <DotControls
      count={snapCount}
      selected={selected}
      onSelect={(i) => api?.scrollTo(i)}
    />
  )

  return (
    <Carousel
      setApi={setApi}
      opts={{
        loop,
        duration: 60,
      }}
      plugins={plugins}
      className={cn("flex w-full flex-col", className)}
      onMouseEnter={() => pauseOnHover && reverse && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && reverse && setIsPaused(false)}
    >
      {reverseControlsPosition && renderDots}

      <div className={cn(gradientMaskClassName)} style={maskStyle}>
        <CarouselContent className="-ml-2 transform-gpu ease-out will-change-transform">
          {items.map((item, i) => (
            <CarouselItem
              key={i}
              className={cn("transform-gpu pl-4", itemClassName)}
            >
              {renderItem(item, i)}
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>

      {!reverseControlsPosition && renderDots}

      {showControls && showChevronControls && snapCount > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  )
}

function MarqueeCarousel<T>({
  items,
  renderItem,
  reverse = false,
  pauseOnHover = true,
  stopOnInteraction = false,
  autoPlay = true,
  showGradientMask = true,
  gradientWidth = "8%",
  gradientMaskClassName,
  className,
  itemClassName,
  marqueeSpeed = 40,
  marqueeGap = "1rem",
  draggable = true,
}: AutoCarouselProps<T>) {
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const singleSetWidthRef = React.useRef(0)
  const directionRef = React.useRef(reverse ? -1 : 1)
  const isHoverPausedRef = React.useRef(false)
  const isUserInteractingRef = React.useRef(false)
  const permanentlyStoppedRef = React.useRef(false)
  const resumeTimeoutRef = React.useRef<number | undefined>(undefined)

  const dragStateRef = React.useRef<{
    pointerId: number
    startX: number
    startScrollLeft: number
    dragged: boolean
  } | null>(null)

  const suppressClickRef = React.useRef(false)

  const count = items.length

  React.useEffect(() => {
    directionRef.current = reverse ? -1 : 1
  }, [reverse])

  React.useEffect(() => {
    const node = scrollerRef.current

    if (!node || count === 0) return

    const measure = () => {
      const singleSetWidth = node.scrollWidth / 3

      singleSetWidthRef.current = singleSetWidth

      if (!dragStateRef.current) {
        node.scrollLeft =
          singleSetWidth + (node.scrollLeft % singleSetWidth || 0)

        if (node.scrollLeft < singleSetWidth * 0.1) {
          node.scrollLeft = singleSetWidth
        }
      }
    }

    measure()

    const ro = new ResizeObserver(measure)

    ro.observe(node)

    return () => ro.disconnect()
  }, [count, items])

  React.useEffect(() => {
    const node = scrollerRef.current

    if (!node || count === 0) return

    let raf: number
    let lastTime: number | null = null

    const tick = (time: number) => {
      raf = requestAnimationFrame(tick)

      const singleSetWidth = singleSetWidthRef.current

      if (singleSetWidth <= 0) {
        lastTime = time
        return
      }

      const dt = lastTime === null ? 0 : (time - lastTime) / 1000

      lastTime = time

      const shouldAutoScroll =
        autoPlay &&
        !isHoverPausedRef.current &&
        !isUserInteractingRef.current &&
        !dragStateRef.current &&
        !(stopOnInteraction && permanentlyStoppedRef.current)

      if (shouldAutoScroll && dt > 0) {
        node.scrollLeft += directionRef.current * marqueeSpeed * dt
      }

      if (node.scrollLeft < singleSetWidth * 0.5) {
        node.scrollLeft += singleSetWidth
      } else if (node.scrollLeft > singleSetWidth * 1.5) {
        node.scrollLeft -= singleSetWidth
      }
    }

    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [autoPlay, count, marqueeSpeed, stopOnInteraction])

  React.useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current)
      }
    }
  }, [])

  if (count === 0) return null

  const maskStyle = showGradientMask
    ? {
        WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${gradientWidth}, black calc(100% - ${gradientWidth}), transparent 100%)`,
        maskImage: `linear-gradient(to right, transparent 0%, black ${gradientWidth}, black calc(100% - ${gradientWidth}), transparent 100%)`,
      }
    : undefined

  const clearResumeTimeout = () => {
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = undefined
    }
  }

  const registerInteraction = () => {
    if (stopOnInteraction) {
      permanentlyStoppedRef.current = true
      return
    }

    isUserInteractingRef.current = true

    clearResumeTimeout()

    resumeTimeoutRef.current = window.setTimeout(() => {
      isUserInteractingRef.current = false
    }, 1200)
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable) return

    const node = scrollerRef.current

    if (!node) return

    dragStateRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startScrollLeft: node.scrollLeft,
      dragged: false,
    }

    node.setPointerCapture(e.pointerId)

    registerInteraction()
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current
    const node = scrollerRef.current

    if (!drag || !node || drag.pointerId !== e.pointerId) {
      return
    }

    const dx = e.clientX - drag.startX

    if (Math.abs(dx) > 3) {
      drag.dragged = true
    }

    node.scrollLeft = drag.startScrollLeft - dx
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current

    if (!drag || drag.pointerId !== e.pointerId) {
      return
    }

    if (drag.dragged) {
      suppressClickRef.current = true
    }

    dragStateRef.current = null

    registerInteraction()
  }

  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (suppressClickRef.current) {
      e.preventDefault()
      e.stopPropagation()

      suppressClickRef.current = false
    }
  }

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!draggable) return

    const node = scrollerRef.current

    if (!node) return

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY

    if (delta === 0) return

    e.preventDefault()
    e.stopPropagation()

    node.scrollLeft += delta

    registerInteraction()
  }

  return (
    <div
      className={cn("relative flex w-full flex-col", className)}
      onMouseEnter={() => {
        if (pauseOnHover) {
          isHoverPausedRef.current = true
        }
      }}
      onMouseLeave={() => {
        if (pauseOnHover) {
          isHoverPausedRef.current = false
        }
      }}
    >
      <style>{`
        .auto-carousel-marquee-track::-webkit-scrollbar {
          display: none;
        }

        .auto-carousel-marquee-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

      <div
        className={cn("relative w-full overflow-hidden", gradientMaskClassName)}
        style={maskStyle}
      >
        <div
          ref={scrollerRef}
          className={cn(
            "auto-carousel-marquee-track flex w-full overflow-x-auto overscroll-contain",
            draggable &&
              "cursor-grab touch-pan-x select-none active:cursor-grabbing"
          )}
          style={{
            gap: marqueeGap,
            scrollBehavior: "auto",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={handleClickCapture}
          onWheel={handleWheel}
        >
          {[...items, ...items, ...items].map((item, i) => (
            <div
              key={i}
              aria-hidden={i >= count ? true : undefined}
              className={cn("shrink-0", itemClassName)}
            >
              {renderItem(item, i % count)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DotControls({
  count,
  selected,
  onSelect,
}: {
  count: number
  selected: number
  onSelect: (index: number) => void
}) {
  return (
    <div className="my-4 flex justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            i === selected ? "bg-primary" : "bg-muted"
          )}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  )
}

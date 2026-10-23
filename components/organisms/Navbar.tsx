"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Church } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Medias", href: "/medias" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="fixed top-0 right-0 left-0 z-50 flex justify-center px-4 pt-4"
    >
      <motion.nav
        animate={{
          maxWidth: scrolled ? "960px" : "1120px",
          paddingTop: scrolled ? 10 : 14,
          paddingBottom: scrolled ? 10 : 14,
          backgroundColor: scrolled
            ? "oklch(1 0 0 / 0.85)"
            : "oklch(1 0 0 / 0.65)",
          boxShadow: scrolled
            ? "0 10px 30px -12px rgba(0,0,0,0.15), 0 4px 12px -4px rgba(0,0,0,0.08)"
            : "0 6px 24px -10px rgba(0,0,0,0.08)",
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full items-center justify-between rounded-full border border-border/60 px-5 backdrop-blur-xl md:px-4"
        style={{ backdropFilter: "saturate(180%) blur(18px)" }}
      >
        {/* LEFT: Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Siloam Church home"
        >
          <motion.span
            whileHover={{ rotate: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm"
          >
            <Church className="size-5" strokeWidth={2} />
          </motion.span>
          <span className="text-[1.05rem] font-semibold tracking-tight text-foreground md:text-lg">
            Siloam{" "}
            <span className="font-normal text-muted-foreground">
              Raniban Church
            </span>
          </span>
        </Link>

        {/* MIDDLE: Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            // Home should only be active on the exact "/" route
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`)

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-foreground/75 hover:text-foreground",
                    // underline base
                    "after:absolute after:right-3.5 after:-bottom-0.5 after:left-3.5 after:h-[2px]",
                    "after:origin-left after:rounded-full after:bg-primary",
                    "after:transition-transform after:duration-300",
                    // active → underline visible; else → grow on hover
                    isActive
                      ? "after:scale-x-100"
                      : "after:scale-x-0 hover:after:scale-x-100"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* RIGHT: Get Connected */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden h-9 rounded-full px-5 font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 sm:inline-flex"
          >
            <Link href="/connect">Get Connected</Link>
          </Button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="grid size-9 place-items-center rounded-lg border border-border/70 bg-background/60 transition-colors hover:bg-accent md:hidden"
          >
            {mobileOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full mt-2 w-[calc(100%-2rem)] max-w-md rounded-2xl border border-border/70 bg-card/95 p-4 shadow-xl backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href ||
                      pathname.startsWith(`${link.href}/`)

                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-accent font-semibold text-foreground"
                          : "text-foreground/80 hover:bg-accent hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                )
              })}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-1 border-t border-border/60 pt-2"
              >
                <Button
                  asChild
                  className="h-10 w-full rounded-full font-semibold"
                >
                  <Link href="/connect" onClick={() => setMobileOpen(false)}>
                    Get Connected
                  </Link>
                </Button>
              </motion.div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

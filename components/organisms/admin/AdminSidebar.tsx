"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import {
  Building2,
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { logoutAction } from "@/app/actions/auth"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Posts", href: "/admin/posts", icon: FileText },
  { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

interface AdminSidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

export function AdminSidebar({
  isCollapsed,
  setIsCollapsed,
}: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 left-0 z-20 flex flex-col border-r border-border bg-card shadow-sm"
    >
      {/* Header / Logo */}
      <div className="flex h-16 items-center border-b border-border px-4">
        <Link
          href="/admin"
          className="flex items-center gap-3 overflow-hidden whitespace-nowrap"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="size-4" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-bold text-foreground"
              >
                Admin Panel
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-1 flex-col gap-2 overflow-x-hidden overflow-y-auto p-3">
        {navItems.map((item) => {
          // Logic to determine if this link is active
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "size-5 shrink-0 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              />

              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Animated Active Indicator Line */}
              {isActive && (
                <motion.div
                  layoutId="active-sidebar-indicator"
                  className="absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer / Logout */}
      <form action={logoutAction} className="w-full">
        <button
          type="submit"
          title={isCollapsed ? "Logout" : undefined}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="size-5 shrink-0 text-muted-foreground group-hover:text-red-600" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="whitespace-nowrap"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </form>

      {/* Toggle Button (Floating on the right edge) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-20 -right-3 flex size-6 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-transform hover:scale-110 hover:bg-muted"
      >
        {isCollapsed ? (
          <ChevronRight className="size-3 text-muted-foreground" />
        ) : (
          <ChevronLeft className="size-3 text-muted-foreground" />
        )}
      </button>
    </motion.aside>
  )
}

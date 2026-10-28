"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { AdminSidebar } from "@/components/organisms/admin/AdminSidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area */}
      <motion.main
        initial={false}
        animate={{ marginLeft: isCollapsed ? 80 : 256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex-1 p-6 md:p-8"
      >
        <div className="mx-auto max-w-6xl">{children}</div>
      </motion.main>
    </div>
  )
}

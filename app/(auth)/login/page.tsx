"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { Church, Loader2, ArrowRight } from "lucide-react"
import { loginAction } from "@/app/actions/auth"
import { toast } from "sonner"

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    const result = await loginAction(formData)

    if (result.success) {
      toast.success("Welcome back!")
      router.push("/admin")
    } else {
      toast.error(result.error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-xl"
      >
        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
              <Church className="size-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your credentials to access the dashboard.
            </p>
          </div>

          {/* Form */}
          <form action={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="admin@siloamchurch.org"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-primary text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-5 animate-spin" /> Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="ml-2 size-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

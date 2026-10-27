"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { isValidPhoneNumber } from "react-phone-number-input"
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PhoneInput } from "@/components/molecules/PhoneInput"
import { connectPageInfo } from "@/lib/data/connect-page"

// --- Custom SVG Social Icons (Still needed since lucide removed them) ---
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)
const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2.5 7.1C2.5 7.1 2.4 5.4 3.1 4.7 3.9 3.9 4.8 3.9 5.2 3.8 7.4 3.7 12 3.7 12 3.7s4.6 0 6.8.1c.4.1 1.3.1 2.1.9.7.7.6 2.4.6 2.4s.1 2 .1 4v2c0 2-.1 4-.1 4s.1 1.7-.6 2.4c-.8.8-1.7.8-2.1.8-2.2.1-6.8.1-6.8.1s-4.6 0-6.8-.1c-.4-.1-1.3-.1-2.1-.9-.7-.7-.6-2.4-.6-2.4s-.1-2-.1-4v-2c0-2 .1-4 .1-4z" />
    <polygon points="9.7 15.5 15.2 12 9.7 8.5 9.7 15.5" />
  </svg>
)

const SocialIconMap: Record<string, React.ElementType> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
}

// --- Form Schema ---
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true
      return isValidPhoneNumber(val)
    }, "Please enter a valid phone number for the selected country"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormValues = z.infer<typeof formSchema>

export default function ConnectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { phone: "" },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Form Data:", data)
    toast.success("Message sent successfully! We'll be in touch soon.")
    reset()
    setIsSubmitting(false)
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-24 md:pt-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p className="mb-4 text-sm font-bold tracking-[0.2em] text-primary uppercase">
            {connectPageInfo.hero.tag}
          </p>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            {connectPageInfo.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {connectPageInfo.hero.description}
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-8">
          {/* LEFT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10">
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Send us a message
              </h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Full Name *
                    </label>
                    <input
                      {...register("name")}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Email Address *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Phone - Using the reusable component */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Phone Number
                    </label>
                    <Controller
                      control={control}
                      name="phone"
                      render={({ field }) => (
                        <PhoneInput
                          placeholder="Enter phone number"
                          value={field.value}
                          onChange={field.onChange}
                          defaultCountry="NP"
                        />
                      )}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Subject *
                    </label>
                    <select
                      {...register("subject")}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Select a topic...</option>
                      {connectPageInfo.formSubjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="text-xs text-red-500">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Message *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-xl py-6 text-base font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-5 animate-spin" />{" "}
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 size-5" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* RIGHT: Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
              <h3 className="mb-2 text-xl font-bold text-foreground">
                Contact Information
              </h3>

              <a
                href={`tel:${connectPageInfo.contactInfo.phone.replace(/\D/g, "")}`}
                className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Call Us
                  </p>
                  <p className="font-medium text-foreground">
                    {connectPageInfo.contactInfo.phone}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${connectPageInfo.contactInfo.email}`}
                className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Email Us
                  </p>
                  <p className="font-medium text-foreground">
                    {connectPageInfo.contactInfo.email}
                  </p>
                </div>
              </a>

              <a
                href={connectPageInfo.contactInfo.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Visit Us
                  </p>
                  <p className="font-medium text-foreground">
                    {connectPageInfo.contactInfo.address}
                  </p>
                </div>
              </a>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
              <h3 className="mb-4 text-xl font-bold text-foreground">
                Follow Our Journey
              </h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Stay connected with us on social media for daily encouragement
                and updates.
              </p>
              <div className="flex gap-3">
                {connectPageInfo.socials.map((social) => {
                  const Icon = SocialIconMap[social.icon] || FacebookIcon
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="grid size-12 place-items-center rounded-xl bg-muted text-muted-foreground transition-all hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground"
                    >
                      <Icon className="size-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

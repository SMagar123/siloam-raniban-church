"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Building2, MapPin, Phone, Mail, ArrowRight } from "lucide-react"
import { footerInfo } from "@/lib/data/footer"

// Custom SVG components for social brands
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
}

export function Footer() {
  const { contact, quickLinks, nextSteps, socials } = footerInfo
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full overflow-hidden border-t border-primary-foreground/10 bg-primary pt-16 pb-8 md:pt-24">
      {/* BACKGROUND CROSS TEXTURE */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden opacity-30">
        {/* Soft radial glow */}
        <div className="absolute h-200 w-200 rounded-full bg-primary-foreground/10 blur-[120px]" />

        {/* The Cross */}
        <div className="relative flex h-225 w-100 items-center justify-center">
          {/* Vertical Beam */}
          <div className="absolute h-full w-32 bg-linear-to-b from-transparent via-primary-foreground/20 to-primary-foreground/5 blur-2xl" />
          <div className="absolute h-full w-20 bg-linear-to-b from-transparent via-primary-foreground/30 to-primary-foreground/10 blur-xl" />

          {/* Horizontal Beam (Intersecting near the top) */}
          <div className="absolute top-[25%] h-32 w-full bg-linear-to-r from-transparent via-primary-foreground/20 to-transparent blur-2xl" />
          <div className="absolute top-[25%] h-20 w-full bg-linear-to-r from-transparent via-primary-foreground/30 to-transparent blur-xl" />
        </div>
      </div>

      {/* Subtle dot pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {/* Column 1: Brand & Contact */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <Link href="/" className="group flex w-fit items-center gap-2.5">
              <div className="grid size-10 place-items-center rounded-xl bg-primary-foreground text-primary shadow-sm transition-transform group-hover:scale-105">
                <Building2 className="size-6" strokeWidth={2} />
              </div>
              <span className="text-xl font-bold tracking-tight text-primary-foreground">
                Siloam{" "}
                <span className="font-normal text-primary-foreground/70">
                  Raniban Church
                </span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-primary-foreground/80">
              A place of grace, community, and hope. Join us in worship and
              discover your purpose.
            </p>

            <div className="mt-2 flex flex-col gap-3">
              <a
                href={`https://maps.app.goo.gl/QDjSQQJ8TCLscnju7`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              >
                <MapPin className="size-5 shrink-0 text-primary-foreground/60 group-hover:text-primary-foreground" />
                <span>{contact.address}</span>
              </a>
              <a
                href={`tel:${contact.phone.replace(/\D/g, "")}`}
                className="group flex items-center gap-3 text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              >
                <Phone className="size-5 shrink-0 text-primary-foreground/60 group-hover:text-primary-foreground" />
                <span>{contact.phone}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center gap-3 text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              >
                <Mail className="size-5 shrink-0 text-primary-foreground/60 group-hover:text-primary-foreground" />
                <span>{contact.email}</span>
              </a>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h4 className="text-sm font-bold tracking-wider text-primary-foreground uppercase">
              Explore
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    <span className="h-px w-0 bg-primary-foreground transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Next Steps */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h4 className="text-sm font-bold tracking-wider text-primary-foreground uppercase">
              Next Steps
            </h4>
            <ul className="flex flex-col gap-3">
              {nextSteps.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    <span className="h-px w-0 bg-primary-foreground transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Newsletter & Socials */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold tracking-wider text-primary-foreground uppercase">
                Stay Connected
              </h4>
              <p className="text-sm text-primary-foreground/80">
                Subscribe to our newsletter for weekly updates.
              </p>
              <form
                className="mt-2 flex flex-col gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2.5 pr-12 text-sm text-primary-foreground transition-colors outline-none placeholder:text-primary-foreground/50 focus:border-primary-foreground/50 focus:ring-1 focus:ring-primary-foreground/50"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute top-1/2 right-1 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-primary-foreground text-primary transition-colors hover:bg-primary-foreground/90"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-2 flex flex-col gap-3">
              <h4 className="text-sm font-bold tracking-wider text-primary-foreground uppercase">
                Follow Us
              </h4>
              <div className="flex gap-2">
                {socials.map((social) => {
                  const Icon = SocialIconMap[social.icon] || FacebookIcon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid size-10 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-all hover:-translate-y-1 hover:bg-primary-foreground hover:text-primary"
                    >
                      <Icon className="size-4" />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Copyright & Legal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 md:flex-row"
        >
          <p className="text-sm text-primary-foreground/70">
            &copy; {currentYear} Siloam Raniban Church. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/70">
            <Link
              href="/privacy"
              className="transition-colors hover:text-primary-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-primary-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

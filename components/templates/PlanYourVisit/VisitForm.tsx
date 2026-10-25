"use client"

import { motion } from "motion/react"
import { Phone, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { visitPageInfo } from "@/lib/data/visit-page"

export function VisitForm() {
  const { contact, form } = visitPageInfo

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 overflow-hidden rounded-3xl border border-border bg-card shadow-lg lg:grid-cols-2">
          {/* Left: Contact Info */}
          <div className="bg-primary/5 p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                {contact.title}
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                {contact.description}
              </p>

              <div className="flex flex-col gap-6">
                <a
                  href={`tel:${contact.phone.replace(/\D/g, "")}`}
                  className="group flex items-center gap-4"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-background shadow-sm transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                      Call Us
                    </p>
                    <p className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                      {contact.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-4"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-background shadow-sm transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                      Email Us
                    </p>
                    <p className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                      {contact.email}
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <div className="p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                {form.title}
              </h2>
              <p className="mb-6 text-muted-foreground">{form.description}</p>

              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />

                <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="" disabled selected>
                    Which service are you attending?
                  </option>
                  <option value="sunday-9">Sunday 9:00 AM</option>
                  <option value="sunday-11">Sunday 11:00 AM</option>
                  <option value="wednesday">Wednesday 7:00 PM</option>
                </select>

                <textarea
                  placeholder="Any questions or comments?"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />

                <Button
                  type="submit"
                  size="lg"
                  className="mt-2 w-full rounded-xl"
                >
                  {form.buttonText} <Send className="ml-2 size-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

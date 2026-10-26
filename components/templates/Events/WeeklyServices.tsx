"use client"

import { motion } from "motion/react"
import { Calendar, Clock, Users } from "lucide-react"

export function WeeklyServices({ schedule }: { schedule: any }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            {schedule.title}
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {schedule.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schedule.times.map((service: any, i: number) => (
            <motion.div
              key={service.day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              {/* Day Badge */}
              <div className="absolute top-0 right-0 rounded-bl-2xl bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                {service.day}
              </div>

              <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Calendar className="size-6" />
              </div>

              <div className="flex flex-col gap-4">
                {service.times.map((timeSlot: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-1 border-b border-border/50 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-lg font-bold text-foreground">
                      {timeSlot.type}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="size-4" />
                      {timeSlot.time}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Welcome Note Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: schedule.times.length * 0.1 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center"
          >
            <Users className="mb-4 size-10 text-primary" />
            <h4 className="mb-2 text-xl font-bold text-foreground">
              {schedule.welcomeNote.title}
            </h4>
            <p className="text-sm text-muted-foreground">
              {schedule.welcomeNote.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

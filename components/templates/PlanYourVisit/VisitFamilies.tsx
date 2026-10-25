"use client"

import { motion } from "motion/react"
import { Baby, Blocks, ClipboardCheck } from "lucide-react"
import { visitPageInfo } from "@/lib/data/visit-page"

const FamilyIconMap: Record<string, React.ElementType> = {
  baby: Baby,
  blocks: Blocks,
  clipboard: ClipboardCheck,
}

export function VisitFamilies() {
  const { families } = visitPageInfo

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {families.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {families.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {families.items.map((item, i) => {
            const Icon = FamilyIconMap[item.icon] || Baby
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>
                <h4 className="mb-2 text-xl font-bold text-foreground">
                  {item.title}
                </h4>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

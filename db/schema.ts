import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const posts = pgTable("posts", {
  // Core Identity
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  shortDescription: text("short_description").notNull(),

  // Content & Media
  content: text("content").notNull(), // Markdown or HTML
  thumbnail: varchar("thumbnail", { length: 500 }), // URL to image

  // Categorization & Authorship
  category: varchar("category", { length: 100 }).notNull(),
  author: varchar("author", { length: 150 }).notNull(),

  // Dates
  publishedDate: timestamp("published_date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  // SEO Meta Info (Stored as JSON)
  // Example: { title: "...", description: "...", keywords: ["church", "blog"] }
  metaInfo: jsonb("meta_info").$type<{
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: string
  }>(),
})

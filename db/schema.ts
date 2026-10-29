import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { relations } from "drizzle-orm"

export const media = pgTable("media", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  thumbnail: varchar("thumbnail", { length: 500 }),
  videoUrl: varchar("video_url", { length: 500 }),
  showInGallery: boolean("show_in_gallery").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// --- Posts Table ---
export const posts = pgTable("posts", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  shortDescription: text("short_description").notNull(),
  content: text("content").notNull(),

  // NEW: Reference the media table for the thumbnail
  thumbnailId: uuid("thumbnail_id").references(() => media.id, {
    onDelete: "set null",
  }),

  category: varchar("category", { length: 100 }).notNull(),
  author: varchar("author", { length: 150 }).notNull(),
  publishedDate: timestamp("published_date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  metaInfo: jsonb("meta_info").$type<{
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: string
  }>(),
})

export const postsRelations = relations(posts, ({ one }) => ({
  thumbnail: one(media, {
    fields: [posts.thumbnailId],
    references: [media.id],
  }),
}))

export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).default("admin").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

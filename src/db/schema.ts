import { sqliteTable, integer, text, primaryKey } from "drizzle-orm/sqlite-core";

// === Блог (заменяет Django main.News + main.Tags) ===

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  content: text("content").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
  draft: integer("draft", { mode: "boolean" }).notNull().default(false),
});

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const postTags = sqliteTable(
  "post_tags",
  {
    postId: integer("post_id")
      .references(() => posts.id, { onDelete: "cascade" })
      .notNull(),
    tagId: integer("tag_id")
      .references(() => tags.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.postId, t.tagId] })],
);

// === Engagement: лайки и просмотры ===

export const views = sqliteTable("views", {
  slug: text("slug").primaryKey(),
  count: integer("count").notNull().default(0),
});

export const likes = sqliteTable(
  "likes",
  {
    slug: text("slug").notNull(),
    fingerprint: text("fingerprint").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.slug, t.fingerprint] })],
);

export const viewSeen = sqliteTable(
  "view_seen",
  {
    slug: text("slug").notNull(),
    fingerprint: text("fingerprint").notNull(),
    seenAt: integer("seen_at", { mode: "timestamp" }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.slug, t.fingerprint] })],
);

// === Quiz attempts (заготовка под future paid-фичу) ===

export const quizAttempts = sqliteTable("quiz_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id"),
  fingerprint: text("fingerprint"),
  lessonSlug: text("lesson_slug").notNull(),
  questionId: text("question_id").notNull(),
  answer: text("answer").notNull(),
  correct: integer("correct", { mode: "boolean" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

// === Auth (lucia-совместимая схема) — в MVP только для админки ===

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique(),
  passwordHash: text("password_hash"),
  isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false),
  isSubscriber: integer("is_subscriber", { mode: "boolean" }).notNull().default(false),
  subscriptionExpiresAt: integer("subscription_expires_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Tag = typeof tags.$inferSelect;

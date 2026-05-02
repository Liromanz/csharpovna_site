export const prerender = false;

import type { APIRoute } from "astro";
import { db, schema } from "@/db/client";
import { and, eq } from "drizzle-orm";

export const GET: APIRoute = async ({ params }) => {
  const slug = (Array.isArray(params.slug) ? params.slug.join("/") : params.slug) ?? "";
  if (!slug) {
    return new Response(JSON.stringify({ error: "slug required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const viewsRow = db.select().from(schema.views).where(eq(schema.views.slug, slug)).get();
  const views = viewsRow?.count ?? 0;

  // Считаем количество уникальных лайков по слагу
  const likesRows = db.select().from(schema.likes).where(eq(schema.likes.slug, slug)).all();
  const likes = likesRows.length;

  return new Response(JSON.stringify({ slug, views, likes }), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=60",
    },
  });
};

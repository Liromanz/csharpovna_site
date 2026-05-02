export const prerender = false;

import type { APIRoute } from "astro";
import { db, schema } from "@/db/client";
import { and, eq, sql } from "drizzle-orm";
import { hashFingerprint } from "@/lib/fingerprint";

interface ViewBody {
  slug?: string;
  fingerprint?: string;
}

export const POST: APIRoute = async ({ request }) => {
  let body: ViewBody;
  try {
    body = (await request.json()) as ViewBody;
  } catch {
    return jsonError(400, "invalid json");
  }
  const slug = (body.slug ?? "").trim();
  const fp = hashFingerprint((body.fingerprint ?? "").trim());

  if (!slug) return jsonError(400, "slug required");
  if (slug.length > 200) return jsonError(400, "slug too long");

  const now = new Date();
  // Сегодняшняя дата — нам нужна гранулярность сутки/fingerprint/slug.
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Проверяем: писали ли мы уже view сегодня от этого fingerprint+slug
  const seen = db
    .select()
    .from(schema.viewSeen)
    .where(and(eq(schema.viewSeen.slug, slug), eq(schema.viewSeen.fingerprint, fp)))
    .get();

  if (seen && seen.seenAt.getTime() >= today.getTime()) {
    // Сегодня уже считали — возвращаем текущий счётчик
    const v = db.select().from(schema.views).where(eq(schema.views.slug, slug)).get();
    return jsonOk({ slug, views: v?.count ?? 0, throttled: true });
  }

  // Иначе: апсёртим viewSeen + инкрементим views
  if (seen) {
    db.update(schema.viewSeen)
      .set({ seenAt: now })
      .where(and(eq(schema.viewSeen.slug, slug), eq(schema.viewSeen.fingerprint, fp)))
      .run();
  } else {
    db.insert(schema.viewSeen).values({ slug, fingerprint: fp, seenAt: now }).run();
  }

  // Upsert views.count
  const viewsRow = db.select().from(schema.views).where(eq(schema.views.slug, slug)).get();
  if (viewsRow) {
    db.update(schema.views)
      .set({ count: sql`${schema.views.count} + 1` })
      .where(eq(schema.views.slug, slug))
      .run();
  } else {
    db.insert(schema.views).values({ slug, count: 1 }).run();
  }

  const updated = db.select().from(schema.views).where(eq(schema.views.slug, slug)).get();
  return jsonOk({ slug, views: updated?.count ?? 1, throttled: false });
};

function jsonOk<T>(body: T) {
  return new Response(JSON.stringify(body), {
    headers: { "content-type": "application/json" },
  });
}
function jsonError(status: number, msg: string) {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

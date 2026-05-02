export const prerender = false;

import type { APIRoute } from "astro";
import { db, schema } from "@/db/client";
import { and, eq } from "drizzle-orm";
import { hashFingerprint } from "@/lib/fingerprint";

interface LikeBody {
  slug?: string;
  fingerprint?: string;
}

export const POST: APIRoute = async ({ request }) => {
  let body: LikeBody;
  try {
    body = (await request.json()) as LikeBody;
  } catch {
    return jsonError(400, "invalid json");
  }
  const slug = (body.slug ?? "").trim();
  const fp = hashFingerprint((body.fingerprint ?? "").trim());

  if (!slug) return jsonError(400, "slug required");
  if (slug.length > 200) return jsonError(400, "slug too long");

  // Проверяем: ставил ли уже этот fingerprint лайк
  const existing = db
    .select()
    .from(schema.likes)
    .where(and(eq(schema.likes.slug, slug), eq(schema.likes.fingerprint, fp)))
    .get();

  if (!existing) {
    db.insert(schema.likes).values({ slug, fingerprint: fp, createdAt: new Date() }).run();
  }

  const all = db.select().from(schema.likes).where(eq(schema.likes.slug, slug)).all();
  return new Response(
    JSON.stringify({ slug, likes: all.length, alreadyLiked: !!existing }),
    { headers: { "content-type": "application/json" } },
  );
};

function jsonError(status: number, msg: string) {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

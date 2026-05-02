import { db, schema } from "@/db/client";
import { and, desc, eq, inArray } from "drizzle-orm";

export interface BlogPostListItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: Date;
  tags: { id: number; name: string }[];
}

export interface PaginatedPosts {
  items: BlogPostListItem[];
  total: number;
  page: number;
  perPage: number;
  pageCount: number;
}

export const POSTS_PER_PAGE = 10;

export async function listAllTags(): Promise<{ id: number; name: string }[]> {
  return db.select().from(schema.tags).all();
}

/**
 * Постранично читает посты из БД. tag — необязательный фильтр (по точному имени).
 * Возвращает посты со связанными тегами и метаинформацией о пагинации.
 */
export async function listPosts(opts: {
  page: number;
  tag?: string | null;
}): Promise<PaginatedPosts> {
  const page = Math.max(1, opts.page);
  const perPage = POSTS_PER_PAGE;
  const offset = (page - 1) * perPage;

  let total: number;
  let postIds: number[];

  if (opts.tag) {
    // Сначала определим id тега
    const tag = await db
      .select()
      .from(schema.tags)
      .where(eq(schema.tags.name, opts.tag))
      .get();

    if (!tag) {
      return { items: [], total: 0, page, perPage, pageCount: 0 };
    }

    // Считаем общее число постов с этим тегом
    const countRow = db
      .select({ id: schema.posts.id })
      .from(schema.posts)
      .innerJoin(schema.postTags, eq(schema.postTags.postId, schema.posts.id))
      .where(and(eq(schema.posts.draft, false), eq(schema.postTags.tagId, tag.id)))
      .all();
    total = countRow.length;

    // Сами посты с пагинацией
    const rows = await db
      .select({ post: schema.posts })
      .from(schema.posts)
      .innerJoin(schema.postTags, eq(schema.postTags.postId, schema.posts.id))
      .where(and(eq(schema.posts.draft, false), eq(schema.postTags.tagId, tag.id)))
      .orderBy(desc(schema.posts.date))
      .limit(perPage)
      .offset(offset)
      .all();
    postIds = rows.map((r) => r.post.id);
  } else {
    const totalRow = db
      .select({ id: schema.posts.id })
      .from(schema.posts)
      .where(eq(schema.posts.draft, false))
      .all();
    total = totalRow.length;

    const rows = await db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.draft, false))
      .orderBy(desc(schema.posts.date))
      .limit(perPage)
      .offset(offset)
      .all();
    postIds = rows.map((r) => r.id);
  }

  if (postIds.length === 0) {
    return { items: [], total, page, perPage, pageCount: Math.ceil(total / perPage) };
  }

  // Подтягиваем сами посты в нужном порядке (если ID получены через джойн)
  const posts = await db
    .select()
    .from(schema.posts)
    .where(inArray(schema.posts.id, postIds))
    .all();

  const postsById = new Map(posts.map((p) => [p.id, p]));

  // Подтягиваем теги для всех постов одной выборкой
  const tagRows = await db
    .select({
      postId: schema.postTags.postId,
      id: schema.tags.id,
      name: schema.tags.name,
    })
    .from(schema.postTags)
    .innerJoin(schema.tags, eq(schema.tags.id, schema.postTags.tagId))
    .where(inArray(schema.postTags.postId, postIds))
    .all();

  const tagsByPost = new Map<number, { id: number; name: string }[]>();
  for (const row of tagRows) {
    if (!tagsByPost.has(row.postId)) tagsByPost.set(row.postId, []);
    tagsByPost.get(row.postId)!.push({ id: row.id, name: row.name });
  }

  const items: BlogPostListItem[] = postIds
    .map((id) => postsById.get(id))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      description: p.description,
      date: p.date,
      tags: tagsByPost.get(p.id) ?? [],
    }));

  return { items, total, page, perPage, pageCount: Math.ceil(total / perPage) };
}

export async function getPostBySlug(slug: string) {
  const post = await db.select().from(schema.posts).where(eq(schema.posts.slug, slug)).get();
  if (!post || post.draft) return null;

  const tagRows = await db
    .select({ id: schema.tags.id, name: schema.tags.name })
    .from(schema.postTags)
    .innerJoin(schema.tags, eq(schema.tags.id, schema.postTags.tagId))
    .where(eq(schema.postTags.postId, post.id))
    .all();

  return { ...post, tags: tagRows };
}

const RU_MONTHS = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

export function formatDateRu(date: Date): string {
  return `${date.getDate()} ${RU_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

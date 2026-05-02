import type { SectionId, SidebarItem } from "@/data/sections";
import { flatLessons, sections } from "@/data/sections";

export interface LessonNeighbour {
  slug: string;
  label: string;
  href: string;
}

/** Соседи: предыдущий/следующий урок в порядке сайдбара. */
export function lessonNeighbours(
  sectionId: SectionId,
  currentSlug: string,
): { previous: LessonNeighbour | null; next: LessonNeighbour | null } {
  const list = flatLessons(sectionId);
  const idx = list.findIndex((l) => l.item.slug === currentSlug);
  if (idx < 0) return { previous: null, next: null };

  const base = sections[sectionId].basePath;
  const make = (item: SidebarItem): LessonNeighbour => ({
    slug: item.slug,
    label: item.label.replace(/^◘\s*/, ""),
    href: `${base}/${item.slug}`,
  });

  return {
    previous: idx > 0 ? make(list[idx - 1]!.item) : null,
    next: idx < list.length - 1 ? make(list[idx + 1]!.item) : null,
  };
}

/** Найти группу урока по slug. */
export function findGroup(sectionId: SectionId, slug: string): string | null {
  for (const g of sections[sectionId].groups) {
    if (g.items.some((it) => it.slug === slug)) return g.title;
  }
  return null;
}

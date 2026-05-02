// Транслитерация ru → latin + kebab-case slug.
const ruToLat: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

export function transliterate(input: string): string {
  let out = "";
  for (const ch of input.toLowerCase()) {
    out += ruToLat[ch] ?? ch;
  }
  return out;
}

export function slugify(input: string, maxLen = 80): string {
  const tr = transliterate(input);
  const slug = tr
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return slug.slice(0, maxLen).replace(/-$/, "") || "post";
}

export function uniqueSlug(input: string, existing: Set<string>): string {
  const base = slugify(input);
  if (!existing.has(base)) return base;
  let i = 2;
  while (existing.has(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}

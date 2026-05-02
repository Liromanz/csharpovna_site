#!/usr/bin/env node
// Создаёт MDX-заглушки для всех уроков sections.csharp, у которых ещё нет файла
// в src/content/csharp/. Не перезаписывает существующие файлы.
//
// Запуск: node scripts/create-lesson-stubs.mjs

import { existsSync, writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");

// Раз парсить TS из node без лишних зависимостей не очень удобно — упрощаем:
// читаем sections.ts как текст и вытаскиваем slug+label+placeholder.
// Это совпадает с актуальной структурой sections.ts (см. src/data/sections.ts).
const sectionsRaw = readFileSync(join(ROOT, "src/data/sections.ts"), "utf-8");

const groupRegex = /title:\s*"([^"]+)",\s*items:\s*\[(.*?)\]/gs;
const itemRegex = /\{\s*slug:\s*"([^"]+)",\s*label:\s*"([^"]+)"(?:,\s*placeholder:\s*(true|false))?[^}]*\}/g;

const lessons = [];
for (const groupMatch of sectionsRaw.matchAll(groupRegex)) {
  const groupTitle = groupMatch[1];
  const itemsBlock = groupMatch[2];
  for (const itemMatch of itemsBlock.matchAll(itemRegex)) {
    lessons.push({
      slug: itemMatch[1],
      label: itemMatch[2].replace(/\\\\/g, "\\"),
      placeholder: itemMatch[3] === "true",
      group: groupTitle,
    });
  }
}

// Только csharp-секция (первая найденная). Остальные секции пока пусты.
const cleaned = [];
const seen = new Set();
for (const l of lessons) {
  if (seen.has(l.slug)) continue;
  seen.add(l.slug);
  cleaned.push(l);
}

console.log(`Найдено ${cleaned.length} уроков в sections.ts`);

let created = 0;
let skipped = 0;
for (const lesson of cleaned) {
  const file = join(ROOT, "src/content/csharp", `${lesson.slug}.mdx`);
  if (existsSync(file)) {
    skipped++;
    continue;
  }
  const cleanLabel = lesson.label.replace(/^◘\s*/, "");
  const description = lesson.placeholder
    ? `Урок «${cleanLabel}» в разделе «${lesson.group}» — материал в работе.`
    : `${cleanLabel} в C#: разбор темы из раздела «${lesson.group}».`;
  // YAML single-quoted strings: only ' нужно экранировать как ''. Никаких backslash-побегов.
  const yamlEscape = (s) => s.replace(/'/g, "''");
  const content = `---
title: '${yamlEscape(cleanLabel)}'
description: '${yamlEscape(description)}'
group: '${yamlEscape(lesson.group)}'
placeholder: ${lesson.placeholder ? "true" : "false"}
---

`;
  writeFileSync(file, content, "utf-8");
  created++;
}

console.log(`Создано: ${created}, пропущено (уже есть): ${skipped}`);

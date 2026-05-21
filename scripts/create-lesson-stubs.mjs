#!/usr/bin/env node
// Создаёт MDX-заглушки для всех уроков указанной секции из src/data/sections.ts,
// у которых ещё нет файла в src/content/<section>/. Существующие файлы не перезаписывает.
//
// Запуск:
//   node scripts/create-lesson-stubs.mjs                  # секция csharp (по умолчанию)
//   node scripts/create-lesson-stubs.mjs --section wpf    # секция wpf
//   node scripts/create-lesson-stubs.mjs --section java   # секция java

import { existsSync, writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");

const args = process.argv.slice(2);
let section = "csharp";
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--section" && args[i + 1]) {
    section = args[i + 1];
    i++;
  }
}
if (!/^[a-z][a-z0-9-]*$/.test(section)) {
  console.error(`Некорректный --section: ${section}`);
  process.exit(1);
}

const sectionsRaw = readFileSync(join(ROOT, "src/data/sections.ts"), "utf-8");

// Найти блок именно этой секции в Record<SectionId, Section> через баланс фигурных скобок.
function extractSectionBlock(source, id) {
  const start = new RegExp(`\\n\\s*${id}:\\s*\\{`).exec(source);
  if (!start) return null;
  let i = start.index + start[0].length;
  let depth = 1;
  while (i < source.length && depth > 0) {
    const ch = source[i++];
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
  }
  return source.slice(start.index, i);
}

const sectionBlock = extractSectionBlock(sectionsRaw, section);
if (!sectionBlock) {
  console.error(`Секция "${section}" не найдена в src/data/sections.ts`);
  process.exit(1);
}

const groupRegex = /title:\s*"([^"]+)",\s*items:\s*\[(.*?)\]/gs;
const itemRegex = /\{\s*slug:\s*"([^"]+)",\s*label:\s*"([^"]+)"(?:,\s*placeholder:\s*(true|false))?[^}]*\}/g;

const lessons = [];
for (const groupMatch of sectionBlock.matchAll(groupRegex)) {
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

const cleaned = [];
const seen = new Set();
for (const l of lessons) {
  if (seen.has(l.slug)) continue;
  seen.add(l.slug);
  cleaned.push(l);
}

console.log(`Секция "${section}": найдено ${cleaned.length} уроков в sections.ts`);

const sectionLabels = { csharp: "C#", wpf: "WPF", java: "Java" };
const sectionLabel = sectionLabels[section] ?? section.toUpperCase();

const outDir = join(ROOT, "src/content", section);
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

let created = 0;
let skipped = 0;
for (const lesson of cleaned) {
  const file = join(outDir, `${lesson.slug}.mdx`);
  if (existsSync(file)) {
    skipped++;
    continue;
  }
  const cleanLabel = lesson.label.replace(/^◘\s*/, "");
  const description = lesson.placeholder
    ? `Урок «${cleanLabel}» в разделе «${lesson.group}» — материал в работе.`
    : `${cleanLabel} в ${sectionLabel}: разбор темы из раздела «${lesson.group}».`;
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

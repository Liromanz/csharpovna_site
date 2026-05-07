// Кастомный rehype-плагин: ставит на h2/h3/... латинский транслит-id ДО того, как
// до них доберётся rehype-slug. Так заголовок «Условия» получает id="usloviya"
// вместо URL-encoded "%D1%83%D1%81%D0%BB...".
//
// rehype-slug при наличии существующего id ничего не делает, поэтому его не трогаем.

import { visit } from "unist-util-visit";
import slugify from "slugify";

function nodeText(node) {
  let text = "";
  visit(node, "text", (child) => {
    text += child.value;
  });
  return text;
}

export function rehypeTranslitSlug() {
  return (tree) => {
    const used = new Set();
    visit(tree, "element", (node) => {
      if (!/^h[1-6]$/.test(node.tagName)) return;
      node.properties = node.properties || {};
      if (node.properties.id) return;

      const text = nodeText(node).trim();
      let slug = slugify(text, { lower: true, strict: true, locale: "ru" });
      if (!slug) slug = "heading";

      let unique = slug;
      let counter = 1;
      while (used.has(unique)) {
        unique = `${slug}-${counter++}`;
      }
      used.add(unique);
      node.properties.id = unique;
    });
  };
}

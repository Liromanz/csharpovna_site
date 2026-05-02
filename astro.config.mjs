// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";
import expressiveCode from "astro-expressive-code";
import tailwindcss from "@tailwindcss/vite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const SITE_URL = process.env.SITE_URL ?? "https://codedocss.ru";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  adapter: node({ mode: "standalone" }),
  trailingSlash: "ignore",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    expressiveCode({
      themes: ["github-dark"],
      styleOverrides: {
        codeFontFamily: 'var(--font-mono, "Cascadia Code", "JetBrains Mono", ui-monospace, monospace)',
        codeBackground: "var(--color-code-bg, #222)",
        borderRadius: "10px",
      },
      defaultProps: {
        wrap: true,
      },
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: { className: ["heading-anchor"], ariaHidden: true, tabIndex: -1 },
          content: { type: "text", value: " #" },
        },
      ],
    ],
  },
  redirects: {
    "/aboutMe": "/about",
    "/devblog": "/devblog/",
  },
});

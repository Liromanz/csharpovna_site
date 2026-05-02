export interface SeoData {
  title: string;
  description: string;
  canonical?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  keywords?: string[];
  publishedTime?: Date;
  jsonLd?: Record<string, unknown>;
}

const SITE_NAME = "CodeDocSS";
const SITE_DEFAULT_DESCRIPTION =
  "База знаний по C# и .NET: статьи, примеры кода, разбор языковых конструкций и dev-блог автора.";

export function buildPageTitle(title?: string): string {
  if (!title || title === SITE_NAME) return SITE_NAME;
  return `${title} | ${SITE_NAME}`;
}

export function buildSeo(input: Partial<SeoData> & { title?: string }): SeoData {
  return {
    title: buildPageTitle(input.title),
    description: input.description ?? SITE_DEFAULT_DESCRIPTION,
    canonical: input.canonical,
    ogType: input.ogType ?? "website",
    ogImage: input.ogImage,
    keywords: input.keywords,
    publishedTime: input.publishedTime,
    jsonLd: input.jsonLd,
  };
}

export function articleJsonLd(opts: {
  type: "TechArticle" | "BlogPosting";
  headline: string;
  description: string;
  url: string;
  datePublished?: Date;
  author?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": opts.type,
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    inLanguage: "ru-RU",
    datePublished: opts.datePublished?.toISOString(),
    author: { "@type": "Person", name: opts.author ?? "CodeDocSS" },
    publisher: { "@type": "Organization", name: SITE_NAME, url: "https://codedocss.ru" },
  };
}

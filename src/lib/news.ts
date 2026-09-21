import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Article, ArticleType, Surface } from "./news-types";
import { site } from "./site";

/* ============================================================
   News & Reports content model (server-only — reads from disk).
   Types & labels live in ./news-types (client-safe, no node:fs).
   ============================================================ */

export type { Article, ArticleType, Surface } from "./news-types";
export { TYPE_LABEL } from "./news-types";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "articles");

function readingTimeOf(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function parseFile(file: string): Article {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const type = (data.type as ArticleType) ?? "news";
  const reportTypes: ArticleType[] = [
    "clinical-summary",
    "white-paper",
    "case-study",
    "webinar",
  ];
  const surface: Surface =
    (data.surface as Surface) ??
    (reportTypes.includes(type) ? "reports" : "news");

  return {
    slug: data.slug ?? file.replace(/\.mdx?$/, ""),
    title: data.title,
    type,
    surface,
    summary: data.summary ?? "",
    publishDate: data.publishDate,
    updatedDate: data.updatedDate,
    author: data.author ?? { name: site.name },
    topics: data.topics ?? [],
    tags: data.tags ?? [],
    featured: data.featured ?? false,
    heroAlt: data.heroAlt,
    readingTime: data.readingTime ?? readingTimeOf(content),
    modality: data.modality,
    disease: data.disease,
    citation: data.citation,
    toConfirm: data.toConfirm ?? false,
    content,
  };
}

let _cache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (_cache) return _cache;
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f));
  _cache = files
    .map(parseFile)
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
  return _cache;
}

/** Articles without their markdown body, for passing to client components. */
export function getArticleCards(): Omit<Article, "content">[] {
  return getAllArticles().map((article) => {
    const card: Partial<Article> = { ...article };
    delete card.content;
    return card as Omit<Article, "content">;
  });
}

export function getArticlesBySurface(surface: Surface): Article[] {
  return getAllArticles().filter((a) => a.surface === surface);
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getLatest(n = 3, surface?: Surface): Article[] {
  const list = surface ? getArticlesBySurface(surface) : getAllArticles();
  return list.slice(0, n);
}

export function getRelated(article: Article, n = 3): Article[] {
  return getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      a,
      score: a.topics.filter((t) => article.topics.includes(t)).length,
    }))
    .sort((x, y) => y.score - x.score)
    .slice(0, n)
    .map((x) => x.a);
}

export function getTopics(surface?: Surface): string[] {
  const list = surface ? getArticlesBySurface(surface) : getAllArticles();
  return Array.from(new Set(list.flatMap((a) => a.topics))).sort();
}

export function getTypes(surface: Surface): ArticleType[] {
  return Array.from(
    new Set(getArticlesBySurface(surface).map((a) => a.type)),
  ) as ArticleType[];
}

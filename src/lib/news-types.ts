/* Client-safe news types & labels (NO node:fs imports). */

export type ArticleType =
  | "press-release"
  | "news"
  | "industry-roundup"
  | "feature-story"
  | "event-recap"
  | "clinical-summary"
  | "white-paper"
  | "case-study"
  | "webinar";

export type Surface = "news" | "reports";

export type Article = {
  slug: string;
  title: string;
  type: ArticleType;
  surface: Surface;
  summary: string;
  publishDate: string;
  updatedDate?: string;
  author: { name: string; title?: string };
  topics: string[];
  tags?: string[];
  featured?: boolean;
  heroAlt?: string;
  readingTime: number;
  modality?: string[];
  disease?: string[];
  citation?: string;
  toConfirm?: boolean;
  content: string;
};

export const TYPE_LABEL: Record<ArticleType, string> = {
  "press-release": "Press Release",
  news: "Company News",
  "industry-roundup": "Industry Roundup",
  "feature-story": "Feature",
  "event-recap": "Event Recap",
  "clinical-summary": "Clinical Summary",
  "white-paper": "White Paper",
  webinar: "Webinar",
  "case-study": "Case Study",
};

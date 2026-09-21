import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TYPE_LABEL, type Article } from "@/lib/news-types";
import { formatDate, cn } from "@/lib/utils";

export type CardArticle = Omit<Article, "content">;

export function ArticleCard({ article, className, featured = false }: {
  article: CardArticle; className?: string; featured?: boolean;
}) {
  return (
    <Link href={`/news/${article.slug}`} className={cn("group flex h-full flex-col rounded-sm border border-ink-900/12 bg-white p-6 transition-colors hover:border-navy-600/50 hover:bg-navy-50/20", className)}>
      <div className="flex items-start justify-between gap-4 border-b border-ink-900/10 pb-5">
        <span className="font-mono text-xs uppercase tracking-wider text-navy-700">{TYPE_LABEL[article.type]}</span>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-navy-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <h3 className={cn("mt-6 font-display font-normal leading-tight text-ink-900 group-hover:text-navy-700", featured ? "text-3xl" : "text-2xl")}>{article.title}</h3>
      <p className="mt-4 flex-1 text-base leading-relaxed text-ink-700/80">{article.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">{article.topics.slice(0, 2).map((topic) => <span key={topic} className="rounded-sm bg-navy-50 px-2 py-1 text-xs text-navy-700">{topic}</span>)}</div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-ink-900/10 pt-4 text-xs text-ink-700/70">
        <span>{formatDate(article.publishDate)}</span><span>{article.readingTime} min read</span>
      </div>
      {article.toConfirm && <p className="mt-3 text-xs text-ink-700/70">Editorial draft · details under review</p>}
    </Link>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, CalendarDays, AlertTriangle } from "lucide-react";
import {
  getAllArticles,
  getArticle,
  getRelated,
  TYPE_LABEL,
} from "@/lib/news";
import { formatDate } from "@/lib/utils";
import { Markdown } from "@/components/news/Markdown";
import { ArticleCard } from "@/components/news/ArticleCard";
import { Reveal } from "@/components/motion/Reveal";
import { SpectrumBar } from "@/components/visuals/SpectrumBar";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Not found" };
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.publishDate,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelated(article, 3);
  const isReport = article.surface === "reports";

  return (
    <article>
      {/* Hero */}
      <header className="relative overflow-hidden bg-ink-950 pt-32 pb-14 md:pt-40 md:pb-16">
        <div className="absolute inset-0 [background-image:radial-gradient(ellipse_at_top,rgba(11,114,133,0.45),transparent_60%)]" />
        <div className="grain absolute inset-0" />
        <div className="container-x relative max-w-3xl">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> News &amp; Reports
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-ink-950">
              {TYPE_LABEL[article.type]}
            </span>
            {article.topics.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="mt-5 text-balance font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 text-lg text-white/70">{article.summary}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-white/50">
            <span>
              {article.author.name}
              {article.author.title ? ` · ${article.author.title}` : ""}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatDate(article.publishDate)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readingTime} min read
            </span>
          </div>
        </div>
      </header>

      <div className="bg-spectral h-1 w-full" />

      {/* Body */}
      <div className="container-x py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          {(isReport || article.toConfirm) && (
            <div className="mb-8 flex gap-3 rounded-2xl border border-gold-500/25 bg-gold-50/60 p-4 text-sm text-gold-800">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
              <p>
                This article is educational and is not medical advice. Clinical,
                regulatory and performance details marked{" "}
                <span className="font-mono">[TO CONFIRM]</span> require
                verification and sign-off before they are relied upon.
              </p>
            </div>
          )}

          <Markdown content={article.content} />

          {article.citation && (
            <p className="mt-10 border-t border-ink-900/10 pt-6 text-sm text-ink-700/60">
              <span className="font-semibold text-ink-800">Sources: </span>
              {article.citation}
            </p>
          )}

          <SpectrumBar className="mt-12" labels={false} />
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-ink-900/8 bg-ink-50/40 py-16">
          <div className="container-x">
            <h2 className="mb-8 font-display text-2xl font-semibold text-ink-900">
              Related reading
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <Reveal key={a.slug}>
                  <ArticleCard article={a} className="h-full" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

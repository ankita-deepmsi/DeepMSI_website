"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { ArticleCard, type CardArticle } from "./ArticleCard";
import { cn } from "@/lib/utils";

const SURFACES = [
  { key: "all", label: "All" },
  { key: "news", label: "News" },
  { key: "reports", label: "Reports" },
] as const;

type SurfaceKey = (typeof SURFACES)[number]["key"];

export function NewsExplorer({ articles }: { articles: CardArticle[] }) {
  const [surface, setSurface] = useState<SurfaceKey>("all");
  const [topic, setTopic] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const topics = useMemo(
    () => Array.from(new Set(articles.flatMap((a) => a.topics))).sort(),
    [articles],
  );

  const filtered = useMemo(
    () =>
      articles.filter((a) => {
        if (surface !== "all" && a.surface !== surface) return false;
        if (topic && !a.topics.includes(topic)) return false;
        if (
          q &&
          !`${a.title} ${a.summary}`.toLowerCase().includes(q.toLowerCase())
        )
          return false;
        return true;
      }),
    [articles, surface, topic, q],
  );

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 rounded-2xl border border-ink-900/8 bg-white/70 p-4 backdrop-blur md:flex-row md:items-center md:justify-between">
        <div className="inline-flex rounded-full bg-ink-100 p-1">
          {SURFACES.map((s) => (
            <button
              key={s.key}
              onClick={() => setSurface(s.key)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                surface === s.key
                  ? "bg-white text-navy-700 shadow-sm"
                  : "text-ink-700/70 hover:text-ink-900",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="relative md:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles…"
            className="h-10 w-full rounded-full border border-ink-900/10 bg-white pl-9 pr-4 text-sm focus:border-navy-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Topic pills */}
      <div className="mask-fade-x mt-4 flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setTopic(null)}
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            topic === null
              ? "bg-navy-600 text-white"
              : "bg-ink-100 text-ink-700/80 hover:bg-ink-100/70",
          )}
        >
          All topics
        </button>
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setTopic(t === topic ? null : t)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              topic === t
                ? "bg-navy-600 text-white"
                : "bg-ink-100 text-ink-700/80 hover:bg-ink-100/70",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((a) => (
            <motion.div
              key={a.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <ArticleCard article={a} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-ink-700/60">
          No articles match these filters yet.
        </p>
      )}
    </div>
  );
}

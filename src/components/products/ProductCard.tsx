"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/site";

export function ProductCard({ product }: { product: Product }) {
  const onFamilyPage = usePathname() === "/optical-technologies";
  const isMedical = product.category === "platform";
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-sm border-2 bg-white p-6 transition-colors",
        isMedical
          ? "border-navy-600/20 hover:border-navy-600/50"
          : "border-gold-500/25 hover:border-gold-500/60",
      )}
    >
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-1",
          isMedical ? "bg-navy-600" : "bg-gold-500",
        )}
        aria-hidden="true"
      />
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
            isMedical
              ? "bg-navy-50 text-navy-700 group-hover:bg-navy-600 group-hover:text-white"
              : "bg-gold-50 text-gold-700 group-hover:bg-gold-500 group-hover:text-ink-950",
          )}
        >
          <Icon name={product.icon} className="h-6 w-6" />
        </span>
        <StatusBadge status={product.status} />
      </div>
      <div className="mt-5 flex items-center gap-2">
        <span
          className={cn(
            "font-mono text-[11px] uppercase tracking-wider",
            isMedical ? "text-navy-700/70" : "text-gold-700/80",
          )}
        >
          {product.kicker}
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide",
            isMedical
              ? "bg-navy-600/10 text-navy-800"
              : "bg-ink-900/8 text-ink-700",
          )}
        >
          {isMedical ? "Clinical platform" : "Not a medical device"}
        </span>
      </div>
      <h3 className="mt-1 font-display text-xl font-semibold text-ink-900">
        {product.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700/80">
        {product.summary}
      </p>
      {product.external ? (
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-all hover:gap-2.5"
        >
          Visit site <ArrowUpRight className="h-4 w-4" />
        </a>
      ) : (
        <Link
          href={onFamilyPage ? "/contact" : product.href}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-all hover:gap-2.5"
        >
          {onFamilyPage ? "Discuss this product" : product.category === "optical" ? "Explore product family" : "Explore platform"} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
      {!product.external && product.category === "optical" && (
        <details className="mt-4 border-t border-ink-900/10 pt-4">
          {/* The card already carries one "Discuss this product" link to
              /contact above; a second one at the foot of the expanded panel
              went to exactly the same place. The summary drops "& inquiry"
              with it — that is what the word referred to. */}
          <summary className="cursor-pointer text-sm font-medium text-navy-700">Product details</summary>
          <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed text-ink-700/80">
            {product.highlights.map((item) => <li key={item}>{item}</li>)}
          </ul>
          {product.statusNote && <p className="mt-3 text-xs leading-relaxed text-ink-700/70">{product.statusNote}</p>}
        </details>
      )}
    </div>
  );
}

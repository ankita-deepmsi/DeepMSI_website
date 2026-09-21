import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ProductStatus } from "@/lib/site";

export function Badge({
  children,
  className,
  tone = "navy",
}: {
  children: ReactNode;
  className?: string;
  tone?: "navy" | "gold" | "violet" | "green" | "neutral";
}) {
  const tones = {
    navy: "bg-navy-50 text-navy-700 ring-navy-600/20",
    gold: "bg-gold-50 text-gold-700 ring-gold-600/25",
    violet: "bg-violet-50 text-violet-700 ring-violet-600/20",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    neutral: "bg-ink-100 text-ink-700 ring-ink-900/15",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusTone: Record<ProductStatus, "navy" | "gold" | "violet" | "green"> = {
  Available: "green",
  Investigational: "gold",
  "In Development": "navy",
  Beta: "violet",
};

export function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <Badge tone={statusTone[status]}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </Badge>
  );
}

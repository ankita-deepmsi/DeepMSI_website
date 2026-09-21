import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.18em]",
        tone === "dark" ? "text-navy-300" : "text-navy-700",
        className,
      )}
    >
      <span className="bg-spectral h-1.5 w-6 rounded-full" />
      {children}
    </span>
  );
}

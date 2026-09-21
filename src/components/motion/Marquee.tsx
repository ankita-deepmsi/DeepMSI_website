import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Infinite horizontal marquee (CSS-driven, pauses on hover, static under reduced-motion). */
export function Marquee({
  children,
  className,
  gap = "3rem",
}: {
  children: ReactNode;
  className?: string;
  gap?: string;
}) {
  return (
    <div className={cn("mask-fade-x overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]"
        style={{ gap }}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

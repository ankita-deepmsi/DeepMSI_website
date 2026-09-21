"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  titleClassName,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  titleClassName?: string;
}) {
  const center = align === "center";
  return (
    <Reveal
      className={cn("max-w-2xl", center && "mx-auto text-center", className)}
    >
      {eyebrow && (
        <Eyebrow tone={tone} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          "text-balance font-display text-3xl leading-[1.08] sm:text-4xl md:text-[2.6rem]",
          tone === "dark" ? "text-white" : "text-ink-900",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed text-pretty",
            tone === "dark" ? "text-white/70" : "text-ink-700/85",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

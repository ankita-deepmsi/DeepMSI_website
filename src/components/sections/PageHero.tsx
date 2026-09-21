import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

/** Inner-page hero with a soft spectral wash. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  align = "left",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <section
      className={cn(
        "inner-page-hero relative overflow-hidden border-b border-ink-900/10 bg-ink-50/40 pt-32 pb-16 md:pt-40 md:pb-20",
        className,
      )}
    >
      <div className="container-x relative">
        <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
          {eyebrow && (
            <Reveal>
              <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1 className="text-balance font-display text-4xl leading-[1.05] text-ink-900 sm:text-5xl md:text-6xl">
              {title}
            </h1>
          </Reveal>
          {description && (
            <Reveal delay={0.12}>
              <p
                className={cn(
                  "mt-6 text-lg leading-relaxed text-ink-700/85 md:text-xl",
                  center && "mx-auto max-w-2xl",
                )}
              >
                {description}
              </p>
            </Reveal>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-10 h-px max-w-xl bg-navy-700/25" />
        </Reveal>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { Disclaimer } from "@/components/ui/Disclaimer";

export function LegalPage({
  title,
  updated = "[TO CONFIRM]",
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} />
      <section className="bg-white py-14 md:py-20">
        <div className="container-x max-w-3xl">
          <Disclaimer variant="info" title="Draft — pending legal review">
            This document is a placeholder and has not been reviewed by counsel.
            It must be completed and approved before launch.{" "}
            <span className="font-mono">[TO CONFIRM]</span>
          </Disclaimer>
          <div className="prose-spectral prose mt-8 max-w-none">
            <p className="text-sm text-ink-700/60">Last updated: {updated}</p>
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

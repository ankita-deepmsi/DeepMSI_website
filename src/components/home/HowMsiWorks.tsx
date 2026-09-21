"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    title: "Capture",
    body: "A single, comfortable sitting at the imaging head. No more friction than a familiar fundus exam.",
    color: "#06b6d4",
  },
  {
    n: "02",
    title: "Multispectral acquisition",
    body: "The retina is illuminated across a sequence of discrete wavelengths — from visible through near-infrared — building a depth-aware spectral stack.",
    color: "#0b7285",
  },
  {
    n: "03",
    title: "AI-assisted analysis",
    body: "The stack is registered and quality-checked; AI highlights regions of interest across wavelengths — always for clinician review, never instead of it.",
    color: "#10b981",
  },
  {
    n: "04",
    title: "Structured report",
    body: "A clear, reviewable report is assembled with an audit trail for every suggestion — ready for the record.",
    color: "#b8860b",
  },
];

const SLICES = ["#6d28d9", "#2563eb", "#06b6d4", "#0b7285", "#10b981", "#eab308", "#ef4444"];

function StepVisual({ active }: { active: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-ink-900">
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_30%_30%,rgba(11,114,133,0.4),transparent_60%)]" />
      {/* Datacube of spectral slices */}
      <div className="absolute inset-0 grid place-items-center [perspective:900px]">
        <div className="relative h-44 w-44" style={{ transformStyle: "preserve-3d" }}>
          {SLICES.map((c, i) => {
            const spread = active >= 1 ? (i - 3) * (reduce ? 6 : 16) : (i - 3) * 2;
            return (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-xl border border-white/20"
                style={{ background: c }}
                animate={{
                  z: spread,
                  y: active >= 1 ? (i - 3) * 6 : 0,
                  rotateX: active >= 1 ? 52 : 0,
                  rotateZ: active >= 1 ? -28 : 0,
                  opacity: active === 0 ? (i === 3 ? 1 : 0.15) : 0.92,
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            );
          })}
          {/* AI highlight ring */}
          {active >= 2 && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed"
              style={{ borderColor: STEPS[active].color }}
            />
          )}
        </div>
      </div>

      {/* Report overlay */}
      {active >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark absolute bottom-5 left-5 right-5 rounded-2xl p-4 font-mono text-[11px] text-white/80"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-gold-300">DEEP MSI · report</span>
            <span className="text-white/40">draft</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-3/4 rounded-full bg-white/20" />
            <div className="h-1.5 w-1/2 rounded-full bg-white/15" />
            <div className="h-1.5 w-2/3 rounded-full bg-navy-400/40" />
          </div>
        </motion.div>
      )}

      {/* Active label */}
      <div className="absolute left-5 top-5 font-mono text-xs">
        <span
          className="rounded-full px-2.5 py-1 font-semibold text-ink-950"
          style={{ background: STEPS[active].color }}
        >
          {STEPS[active].n} · {STEPS[active].title}
        </span>
      </div>
    </div>
  );
}

export function HowMsiWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)));
    setActive(i);
  });

  return (
    <section ref={ref} className="relative bg-ink-950 py-20 md:py-28">
      <div className="container-x">
        <div className="mb-12 max-w-2xl">
          <Eyebrow tone="dark" className="mb-4">
            How it works
          </Eyebrow>
          <h2 className="text-balance font-display text-3xl leading-tight text-white sm:text-4xl md:text-[2.6rem]">
            From a single capture to a clinician-ready report.
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Sticky visual */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <StepVisual active={active} />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-6">
            {STEPS.map((s, i) => (
              <button
                key={s.n}
                onClick={() => {
                  const el = document.getElementById(`msi-step-${i}`);
                  el?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                id={`msi-step-${i}`}
                className={cn(
                  "rounded-2xl border p-6 text-left transition-all duration-300",
                  active === i
                    ? "border-white/20 bg-white/5"
                    : "border-white/5 bg-transparent opacity-50 hover:opacity-80",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: s.color }}
                  >
                    {s.n}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-2 leading-relaxed text-white/65">{s.body}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

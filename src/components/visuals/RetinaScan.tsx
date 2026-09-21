"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/* Real DeepMSI multispectral captures (sample data) crossfaded as the
   wavelength band cycles — each wavelength genuinely reveals different
   structure (vessels at 580nm → choroid/deep layers in near-IR).
   NOTE: sample images; production imagery + usage rights are [TO CONFIRM]. */

const BANDS = [
  { nm: "580 nm", note: "Inner retina · vessels", color: "#22c55e", src: "/fundus/msi-580.jpg" },
  { nm: "660 nm", note: "RPE · deeper layers", color: "#f59e0b", src: "/fundus/msi-660.jpg" },
  { nm: "760 nm", note: "Choroid · near-IR", color: "#ef4444", src: "/fundus/msi-760.jpg" },
  { nm: "940 nm", note: "Deep near-IR", color: "#a855f7", src: "/fundus/msi-940.jpg" },
];

export function RetinaScan({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [b, setB] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setB((x) => (x + 1) % BANDS.length), 2300);
    return () => clearInterval(id);
  }, [reduce]);

  const band = BANDS[b];

  return (
    <div className={className}>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#04070a]">
        {/* rotating spectral halo */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute inset-0 z-20 opacity-60 blur-[1px]"
            style={{
              background:
                "conic-gradient(from 0deg, #6d28d9, #2563eb, #06b6d4, #0b7285, #10b981, #eab308, #f97316, #ef4444, #6d28d9)",
              maskImage:
                "radial-gradient(circle, transparent 71%, black 72%, black 75%, transparent 76%)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 71%, black 72%, black 75%, transparent 76%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 36, ease: "linear", repeat: Infinity }}
          />
        )}

        {/* Real capture stack (crossfade) */}
        {BANDS.map((bd, i) => (
          <Image
            key={bd.nm}
            src={bd.src}
            alt={`Multispectral fundus capture at ${bd.nm}`}
            fill
            sizes="(max-width: 768px) 90vw, 480px"
            priority={i === 0}
            className="object-cover transition-opacity duration-[900ms] ease-out"
            style={{ opacity: i === b ? 1 : 0 }}
          />
        ))}

        {/* subtle wavelength duotone tint */}
        <div
          aria-hidden
          className="absolute inset-0 z-[5] transition-colors duration-700"
          style={{ background: band.color, opacity: 0.12, mixBlendMode: "soft-light" }}
        />

        {/* edge vignette */}
        <div
          aria-hidden
          className="absolute inset-0 z-[6]"
          style={{
            background:
              "radial-gradient(circle, transparent 64%, rgba(2,5,8,0.85) 100%)",
          }}
        />

        {/* sweeping scan line */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute inset-x-0 z-10 h-16"
            initial={{ top: "6%" }}
            animate={{ top: ["6%", "90%", "6%"] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(189,243,255,0.55) 48%, rgba(189,243,255,0.9) 50%, rgba(189,243,255,0.55) 52%, transparent)",
            }}
          />
        )}

        {/* reticle ring */}
        <div className="pointer-events-none absolute inset-[3%] z-10 rounded-full border border-white/12" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-full border-2 border-dashed"
          style={{ borderColor: band.color, opacity: 0.55 }}
          animate={{ borderColor: band.color }}
          transition={{ duration: 0.6 }}
        />

        {/* ---- HUD ---- */}
        {[
          "left-3 top-3 border-l-2 border-t-2",
          "right-3 top-3 border-r-2 border-t-2",
          "left-3 bottom-3 border-l-2 border-b-2",
          "right-3 bottom-3 border-r-2 border-b-2",
        ].map((c) => (
          <span key={c} className={`absolute z-20 h-5 w-5 border-white/30 ${c}`} />
        ))}

        <div className="absolute left-5 top-5 z-20 font-mono text-[10px] leading-tight text-white/60">
          <div className="font-semibold text-white/85">OD · right</div>
          <div>FOV 45°</div>
        </div>

        <div className="absolute right-5 top-5 z-20 flex gap-1.5">
          {BANDS.map((bd, i) => (
            <span
              key={bd.nm}
              className="h-1.5 w-1.5 rounded-full transition-all duration-300"
              style={{
                background: i === b ? bd.color : "rgba(255,255,255,0.3)",
                boxShadow: i === b ? `0 0 8px ${bd.color}` : "none",
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-4 left-4 z-20 font-mono text-[11px]">
          <motion.div
            key={band.nm}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-dark flex items-center gap-2 rounded-full px-3 py-1.5 text-white/90"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: band.color, boxShadow: `0 0 10px ${band.color}` }}
            />
            <span className="font-semibold tracking-wide">{band.nm}</span>
            <span className="text-white/45">·</span>
            <span className="text-white/65">{band.note}</span>
          </motion.div>
        </div>

        <div className="absolute bottom-4 right-4 z-20 text-right font-mono text-[10px] leading-tight text-white/50">
          <div>EXP 8.0 ms</div>
          <div className="text-white/35">FOCUS ●</div>
        </div>

        {/* honest sample-data badge */}
        <div className="absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-black/45 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/55 backdrop-blur">
          Sample capture
        </div>
      </div>
    </div>
  );
}

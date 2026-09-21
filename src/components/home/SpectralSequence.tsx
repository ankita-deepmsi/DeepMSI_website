"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { WAVELENGTHS } from "@/lib/wavelengths";

/**
 * Cycles the ten aligned OD captures as a continuous crossfade. The frames are
 * registered to each other, so the retina stays put while contrast shifts with
 * wavelength — the effect reads as one moving image rather than a slideshow.
 */
export function SpectralSequence({ interval = 1800 }: { interval?: number }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % WAVELENGTHS.length),
      interval,
    );
    return () => clearInterval(id);
  }, [reduce, interval]);

  const active = WAVELENGTHS[index];

  return (
    <>
      {WAVELENGTHS.map((band, i) => (
        <Image
          key={band.nm}
          src={band.src}
          alt={i === 0 ? "Multispectral retinal capture" : ""}
          aria-hidden={i !== 0}
          fill
          priority={i === 0}
          sizes="100vw"
          className="object-cover transition-opacity duration-[1400ms] ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}

      {/* Wavelength readout, tracking the frame on screen */}
      <div className="pointer-events-none absolute bottom-6 right-5 z-[3] flex items-center gap-3 md:bottom-8 md:right-8">
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 sm:inline">
          {active.band}
        </span>
        <span
          className="h-px w-8 transition-colors duration-700"
          style={{ background: active.color }}
        />
        <span className="font-mono text-sm tabular-nums text-white/85">
          {active.nm}
          <span className="ml-0.5 text-white/45">nm</span>
        </span>
      </div>

      {/* Wavelength position indicator */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] flex h-0.5">
        {WAVELENGTHS.map((band, i) => (
          <span
            key={band.nm}
            className="h-full flex-1 transition-opacity duration-700"
            style={{
              background: band.color,
              opacity: i === index ? 0.95 : 0.16,
            }}
          />
        ))}
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { WAVELENGTHS } from "@/lib/wavelengths";

/**
 * Wavelength scrubber over the ten aligned OD captures. The frames are
 * registered, so moving along the spectrum holds the retina still and changes
 * only what the light reaches. The filmstrip below doubles as the selector —
 * it shows at a glance that these are ten views of one eye, not ten eyes, and
 * simply moving the pointer across it scrubs the frame.
 */
export function SpectralExplorer() {
  const [i, setI] = useState(0);
  const band = WAVELENGTHS[i];
  const last = WAVELENGTHS.length - 1;
  const strip = useRef<HTMLUListElement>(null);
  const mounted = useRef(false);

  // Keep the selected band in view when the strip scrolls horizontally (mobile,
  // or when the spectrum is driven from the slider rather than the strip).
  //
  // The strip's own scrollLeft, NOT scrollIntoView: that walks every scrollable
  // ancestor including the document, so selecting a band scrolled the whole
  // PAGE to this figure. It is the last section on /platform and sits mid-page
  // on the homepage, which is why both routes appeared to open scrolled down.
  // block/inline: "nearest" does not prevent it — the figure is off-screen on
  // arrival, so "nearest" is still a page scroll.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const box = strip.current;
    const el = box?.children[i] as HTMLElement | undefined;
    // Nothing to do when the strip fits: that is the desktop case, and this
    // only ever existed for the overflowing one.
    if (!box || !el || box.scrollWidth <= box.clientWidth) return;
    box.scrollTo({
      left: el.offsetLeft - (box.clientWidth - el.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [i]);

  return (
    <figure
      className="spectral-explorer"
      style={{ "--band": band.color } as React.CSSProperties}
    >
      <div className="explorer-frame">
        {WAVELENGTHS.map((w, n) => (
          <Image
            key={w.nm}
            src={w.src}
            alt={n === i ? `Retina imaged at ${w.nm} nanometres` : ""}
            aria-hidden={n !== i}
            fill
            sizes="(max-width: 899px) 100vw, 60vw"
            loading={n === 0 ? "eager" : "lazy"}
            className="explorer-frame-img"
            style={{ opacity: n === i ? 1 : 0 }}
          />
        ))}

        <div className="explorer-meta">
          <span>AI-Spectral · MSI-120 . ALL RIGHTS RESERVED</span>
          <span>OD </span>
        </div>

        <figcaption className="explorer-readout">
          <span className="explorer-nm">
            {band.nm}
            <small>nm</small>
          </span>
          <span className="explorer-reveals">
            <strong>{band.band}</strong>
            {band.reveals}
          </span>
        </figcaption>
      </div>

      <div className="explorer-bar">
        <span>
          <span className="explorer-bar-hover">
            {/* Hover or </span>drag to move
          through the spectrum
        </span> */}
           </span></span>
        <span>
          {WAVELENGTHS[0].nm}—{WAVELENGTHS[last].nm} nm
        </span>
      </div>

      <div className="explorer-rail">
        <span className="explorer-rail-track" aria-hidden="true" />
        <span
          className="explorer-rail-fill"
          aria-hidden="true"
          style={{ width: `${(i / last) * 100}%` }}
        />
        <input
          type="range"
          min={0}
          max={last}
          step={1}
          value={i}
          onChange={(e) => setI(Number(e.target.value))}
          aria-label="Wavelength"
          aria-valuetext={`${band.nm} nanometres, ${band.band}`}
        />
      </div>

      <ul className="explorer-strip" ref={strip}>
        {WAVELENGTHS.map((w, n) => (
          <li key={w.nm}>
            <button
              type="button"
              onClick={() => setI(n)}
              onMouseEnter={() => setI(n)}
              onFocus={() => setI(n)}
              aria-pressed={n === i}
              aria-label={`${w.nm} nanometres`}
              className={n === i ? "is-active" : undefined}
              style={{ "--band": w.color } as React.CSSProperties}
            >
              <span className="explorer-thumb">
                <Image src={w.src} alt="" fill sizes="120px" />
              </span>
              <small>{w.nm}</small>
            </button>
          </li>
        ))}
      </ul>
    </figure>
  );
}

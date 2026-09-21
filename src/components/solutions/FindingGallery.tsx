"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * The captures for one finding, stepped through one at a time.
 *
 * Every frame is mounted, not swapped, and hidden ones are faded out rather
 * than unmounted: a finding's captures are the same eye at different
 * wavelengths or the same lesion in different cases, and the reader is
 * comparing them. Remounting would make each step re-fetch and flash white.
 *
 * Deliberately NOT a carousel: no timer, no auto-advance. These are clinical
 * images, and a frame that moves on by itself while someone is reading it is
 * worse than no gallery at all. It also never calls scrollIntoView — that
 * walks every scrollable ancestor and would yank the page to the figure.
 */

export type Frame = {
  src: string;
  alt: string;
  /* What the image is and which case it came from. Sits under the frame, never
     over it: the de-identification note is not decoration. */
  caption: string;
};

export function FindingGallery({ frames }: { frames: Frame[] }) {
  const [i, setI] = useState(0);
  const many = frames.length > 1;
  const go = (d: number) => setI((n) => (n + d + frames.length) % frames.length);

  return (
    <figure className="finding-figure">
      <div className="finding-frames">
        {frames.map((frame, n) => (
          <Image
            key={frame.src}
            src={frame.src}
            alt={n === i ? frame.alt : ""}
            aria-hidden={n !== i}
            fill
            sizes="(max-width: 1023px) 100vw, 46vw"
            data-on={n === i ? "1" : "0"}
            priority={n === 0}
          />
        ))}
      </div>

      {many && (
        <div className="finding-nav">
          <button type="button" onClick={() => go(-1)} aria-label="Previous capture">
            <ChevronLeft size={17} />
          </button>
          <span aria-hidden="true">
            {String(i + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
          </span>
          <button type="button" onClick={() => go(1)} aria-label="Next capture">
            <ChevronRight size={17} />
          </button>
        </div>
      )}

      {/* aria-live so stepping through announces the new caption; the images
          themselves are decorative to a screen reader once alt is emptied. */}
      <figcaption aria-live="polite">{frames[i].caption}</figcaption>
    </figure>
  );
}

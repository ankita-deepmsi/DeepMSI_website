"use client";

import { useState } from "react";
import { PlatformPyramid } from "./PlatformPyramid";

/**
 * The platform section, laid out like the reference infographic: captions down
 * the left, the pyramid large in the middle, the layer legend top right.
 *
 * The cards on the left are the standing description of the platform — what it
 * is and what it is for. They do not change as tiers are hovered; the per-layer
 * detail belongs to the legend, and moving both at once would give the reader
 * two things to track at the same time.
 */

/* Taken from the reference caption rather than rewritten, so the section says
   what the deck says. Anything added here is a claim about a medical device:
   keep it to wording that has already been through review. */
const notes = [
  {
    title: "Intelligent medical platform for eye care",
    body: "Proprietary MSI-120 hardware integrated with in-house DeepMSI-AI biomarker models for disease analysis.",
  },
  {
    title: "What the platform enables",
    items: [
      "Earlier detection",
      "Improved monitoring",
      "More personalized treatment of eye diseases",
    ],
  },
];

export function PlatformStack({ id }: { id?: string }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id={id} className="platform-stack-section" aria-labelledby="stack-title">
      <div className="container-x platform-stack-head">
        <p className="editorial-label">
          <span className="label-rule" /> The platform
        </p>
        <h2 id="stack-title" className="platform-stack-title">
          Four layers.
          <br />
          One connected system.
        </h2>
      </div>

      <div className="container-x platform-board">
        <div className="platform-notes">
          {notes.map((note) => (
            <article key={note.title} className="platform-note">
              <h3>{note.title}</h3>
              {note.body && <p>{note.body}</p>}
              {note.items && (
                <ul>
                  {note.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        <div className="platform-stage">
          <PlatformPyramid active={active} onActive={setActive} />
        </div>
      </div>
    </section>
  );
}

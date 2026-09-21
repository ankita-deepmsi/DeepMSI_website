import type { CSSProperties } from "react";

/**
 * Wavelength-versus-depth, drawn rather than tabulated.
 *
 * Each band is a beam entering from the top and stopping at the stratum it
 * reaches, so the page shows the argument the instrument is built on — longer
 * wavelengths go deeper — instead of asking the reader to assemble it from a
 * four-row table.
 *
 * The depths are ORDINAL, not measured: band n stops one stratum lower than
 * band n-1, which is the ordering `wavelengths.ts` already claims. Nothing here
 * asserts a penetration depth in micrometres, and the caption says so. If real
 * figures are ever confirmed, this wants revisiting with a measured scale.
 */

export type DepthBand = {
  range: string;
  label: string;
  reveals: string;
  color: string;
};

export function DepthDiagram({ bands }: { bands: DepthBand[] }) {
  return (
    <figure className="depth">
      <div className="depth-grid">
        {bands.map((band, i) => (
          <div key={`h-${band.range}`} className="depth-head" style={{ gridColumn: i + 1 }}>
            <span>{band.range}</span>
            <small>{band.label}</small>
          </div>
        ))}

        {bands.map((band, i) => (
          <div key={`s-${band.range}`} className="depth-stratum" style={{ gridRow: i + 2 }} />
        ))}

        {bands.map((band, i) => (
          <div
            key={`b-${band.range}`}
            className="depth-beam"
            style={
              {
                gridColumn: i + 1,
                gridRow: `2 / span ${i + 1}`,
                "--band": band.color,
                "--i": i,
              } as CSSProperties
            }
            aria-hidden="true"
          >
            <span />
          </div>
        ))}

        {bands.map((band, i) => (
          <p key={`r-${band.range}`} className="depth-reveal" style={{ gridRow: i + 2 }}>
            <em>{band.range}</em>
            {band.reveals}
          </p>
        ))}
      </div>
    </figure>
  );
}

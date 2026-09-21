"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { platformLayers } from "@/lib/site";

/**
 * The four platform layers as a genuinely 3D, rotating stepped pyramid.
 *
 * Why the geometry is computed rather than transformed: a CSS 3D turntable
 * cannot be clicked reliably — its faces are skewed quads whose hit areas
 * overlap, so pointer probes land on the wrong tier — and anything drawn on a
 * tumbling plate tumbles with it. Here every face is a real SVG polygon whose
 * points are recalculated each frame from one projection, so hit testing is
 * exact at any angle and each tier can be a real link.
 *
 * Projection: rotate about Y by theta, then view from 30 degrees above the
 * horizon, which is the 2:1 isometric the reference deck uses. Faces are
 * back-face culled by projected winding (they are translucent, so painting over
 * them would show through) and lit by a fixed light, so the shading turns with
 * the solid instead of staying pinned to the screen.
 *
 * Names are engraved INTO the side faces rather than floated over them: each
 * label carries a matrix that maps its own text box onto the plane of the face,
 * so it leans, foreshortens and turns away with the solid. Every side carries
 * the name, and each copy fades as its face rotates off — which is what an
 * engraving does, and it means the front of the solid is always labelled
 * without any copy ever having to jump between faces.
 *
 * The frame loop writes straight to DOM attributes through refs. Re-rendering
 * ~35 nodes through React at 60fps would be wasteful, and none of it is state
 * the rest of the component tree needs.
 */

/* The viewBox is held tight around the solid — it is only 820 wide for a
   drawing 566 across — because everything about whether a name fits on a face
   comes down to px-per-world-unit. Padding the viewBox shrinks the drawing
   inside its own box and takes the type down with it. */
const VB_W = 820;
const VB_H = 534;
const CX = 300; // left of centre: the legend occupies the top right
const CY = 373;
const H = 80; // tier thickness
const APEX_H = 170;
/* Bottom half-width per tier. Each tapers to TAPER of its own base, and the
   tier above starts narrower still — that is what makes a pyramid silhouette
   rather than a stack of blocks.

   The taper between tiers is gentle, and the capstone short and broad, because
   the upper faces have to carry their own names: a steeper stack looks better
   empty and cannot be labelled. Proportions are still set against the
   reference. The solid is deliberately a little wider than it is tall — swept
   across a full turn it is 566 x 496, i.e. 1.14 — because its height sets the
   height of the whole section, and a taller solid left the columns beside it
   sitting over a long run of empty dark. */
const SIZES = [200, 160, 120, 85];
const TAPER = 0.87;
const SIN_E = 0.5; // 30 degrees above the horizon => 2:1 isometric
const COS_E = 0.866;
const LIGHT = [-0.42, 0.74, 0.52] as const;

/* Engraved type size per tier, in world units — the tiers narrow as they rise,
   so a single size would either be lost on the base or overrun the capstone.
   Each is the largest that fits its layer's name across the width its own face
   carries at mid-height, so lengthening a name in site.ts means lowering the
   matching number here. */
const LABEL_FS = [26, 24, 17, 12];
const LINE_H = LABEL_FS.map((fs) => fs * 1.15);

type Pt3 = [number, number, number];
type Pt2 = [number, number];

function project(p: Pt3, cos: number, sin: number): Pt2 {
  const [x, y, z] = p;
  const rx = x * cos + z * sin;
  const rz = -x * sin + z * cos;
  return [CX + rx, CY - y * COS_E + rz * SIN_E];
}

/** Positive when the face is wound anticlockwise on screen, i.e. facing us. */
function signedArea(pts: Pt2[]) {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    a += x1 * y2 - x2 * y1;
  }
  return a / 2;
}

/** A face as world-space points plus the outward normal used for shading. */
type Face = { pts: Pt3[]; n: [number, number, number] };

function frustumFaces(sb: number, st: number, y0: number): Face[] {
  const y1 = y0 + H;
  // Sides lean in as they rise, so the normal tilts up by the same run/rise.
  const ny = (sb - st) / H;
  const side = (
    abx: number, abz: number, bbx: number, bbz: number,
    atx: number, atz: number, btx: number, btz: number,
    nx: number, nz: number,
  ): Face => ({
    pts: [
      [abx, y0, abz],
      [bbx, y0, bbz],
      [btx, y1, btz],
      [atx, y1, atz],
    ],
    n: [nx, ny, nz],
  });
  return [
    side(sb, -sb, sb, sb, st, -st, st, st, 1, 0),
    side(-sb, sb, -sb, -sb, -st, st, -st, -st, -1, 0),
    side(sb, sb, -sb, sb, st, st, -st, st, 0, 1),
    side(-sb, -sb, sb, -sb, -st, -st, st, -st, 0, -1),
    {
      pts: [
        [-st, y1, -st],
        [st, y1, -st],
        [st, y1, st],
        [-st, y1, st],
      ],
      n: [0, 1, 0],
    },
  ];
}

function apexFaces(s: number, y0: number): Face[] {
  const tip: Pt3 = [0, y0 + APEX_H, 0];
  const k = 0.55; // normals tilt up toward the tip
  const tri = (
    ax: number, az: number, bx: number, bz: number,
    n: [number, number, number],
  ): Face => ({ pts: [[ax, y0, az], [bx, y0, bz], tip], n });
  return [
    tri(s, -s, s, s, [1, k, 0]),
    tri(-s, s, -s, -s, [-1, k, 0]),
    tri(s, s, -s, s, [0, k, 1]),
    tri(-s, -s, s, -s, [0, k, -1]),
  ];
}

/** How squarely a face is turned toward the viewer: 1 dead-on, 0 edge-on. */
function facing(face: Face, cos: number, sin: number) {
  const [nx, ny, nz] = face.n;
  const len = Math.hypot(nx, ny, nz);
  return (-nx * sin + nz * cos) / len;
}

/** Project, cull and light one face. null when it faces away. */
function faceFrame(face: Face, cos: number, sin: number) {
  const pts = face.pts.map((p) => project(p, cos, sin));
  // Front-facing polygons project anticlockwise, i.e. POSITIVE signed area, so
  // it is the negatives that get dropped. Translucent faces have to be culled
  // rather than painted over, or the far side of the solid shows through.
  if (signedArea(pts) <= 0) return null;
  const [nx, ny, nz] = face.n;
  const len = Math.hypot(nx, ny, nz);
  const rnx = (nx * cos + nz * sin) / len;
  const rnz = (-nx * sin + nz * cos) / len;
  const lambert = rnx * LIGHT[0] + (ny / len) * LIGHT[1] + rnz * LIGHT[2];
  return {
    points: pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" "),
    // Floor raised from .34: with a photograph behind the solid, a face that
    // sheer stopped reading as a surface and started reading as a hole.
    opacity: (0.58 + 0.42 * Math.max(0, lambert)).toFixed(3),
  };
}

/**
 * The transform that lays a label into the plane of one side face.
 *
 * The face's own bottom edge and rise give two screen vectors — one screen unit
 * per world unit across, one per world unit up — and those are exactly the
 * first four terms of an SVG matrix. Text drawn at the origin in that space
 * therefore sits on the face: it shears as the face leans, compresses as the
 * face turns away, and vanishes with it. The sixth term puts the origin at the
 * middle of the bottom edge, so the label is placed by a single negative y.
 *
 * Both builders put the four side faces first, and both wind them the same way
 * (pts[0] lands to the SCREEN RIGHT of pts[1] when the face is toward us), so
 * the local x axis is pts[0] - pts[1]. Taking it the other way round mirrors
 * every word.
 */
function labelFrame(face: Face, cos: number, sin: number, isApex: boolean) {
  const f = facing(face, cos, sin);
  // Faded out well before edge-on: past about 75 degrees the type is squeezed
  // into a smear that reads as a smudge on the silhouette.
  const opacity = Math.min(1, Math.max(0, (f - 0.24) / 0.42));
  if (opacity <= 0.001) return { opacity: 0, transform: "translate(-9999,-9999)" };

  const p = face.pts.map((q) => project(q, cos, sin));
  const [a, b] = [face.pts[0], face.pts[1]];
  const width = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  const ux = (p[0][0] - p[1][0]) / width;
  const uy = (p[0][1] - p[1][1]) / width;

  let dx: number;
  let dy: number;
  if (isApex) {
    // No top edge on a triangle, so the rise is measured to the tip.
    const bm: Pt2 = [(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2];
    dx = (bm[0] - p[2][0]) / APEX_H;
    dy = (bm[1] - p[2][1]) / APEX_H;
  } else {
    dx = (p[0][0] - p[3][0]) / H;
    dy = (p[0][1] - p[3][1]) / H;
  }

  const ex = (p[0][0] + p[1][0]) / 2;
  const ey = (p[0][1] + p[1][1]) / 2;
  const t = (v: number) => v.toFixed(4);
  return {
    opacity,
    transform: `matrix(${t(ux)},${t(uy)},${t(dx)},${t(dy)},${t(ex)},${t(ey)})`,
  };
}

const TIERS = platformLayers.map((layer, i) => ({
  layer,
  isApex: i === 3,
  faces:
    i === 3
      ? apexFaces(SIZES[i], i * H)
      : frustumFaces(SIZES[i], SIZES[i] * TAPER, i * H),
}));

/* Where the label sits in face-local units: mid-height on a frustum, and low
   on the capstone, where the triangle is still wide enough to carry it. */
const LABEL_Y = TIERS.map((t) => (t.isApex ? -APEX_H * 0.26 : -H / 2));

/* A name breaks across lines on a \n in site.ts. The capstone needs it: the
   triangle is about a third of the base's width, so the longest name on the
   solid sits on the face least able to carry it. */
const LABEL_LINES = TIERS.map((t) => t.layer.short.toUpperCase().split("\n"));

/**
 * The point on a tier where its connector leaves — recomputed per frame,
 * because the solid is turning underneath it. For corners at (±s, ±s) the
 * projected x term x·cos + z·sin peaks at s(|sin| + |cos|), so that is the
 * rightmost point of the tier at any angle.
 */
function tierAnchor(i: number, cos: number, sin: number): Pt2 {
  const yMid = i === 3 ? i * H + APEX_H * 0.26 : i * H + H / 2;
  const spread = SIZES[i] * (Math.abs(sin) + Math.abs(cos));
  return [CX + spread, CY - yMid * COS_E];
}

const START = Math.PI / 4;
const C0 = Math.cos(START);
const S0 = Math.sin(START);
const FIRST_FACES = TIERS.map((t) => t.faces.map((f) => faceFrame(f, C0, S0)));
const FIRST_LABELS = TIERS.map((t) =>
  t.faces.slice(0, 4).map((f) => labelFrame(f, C0, S0, t.isApex)),
);

export function PlatformPyramid({
  active,
  onActive,
}: {
  active: number | null;
  onActive: (i: number | null) => void;
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement | null>(null);
  const refs = useRef<(SVGPolygonElement | null)[][]>(TIERS.map(() => []));
  const marks = useRef<(SVGTextElement | null)[][]>(TIERS.map(() => []));
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const leader = useRef<SVGPathElement | null>(null);
  const dot = useRef<SVGCircleElement | null>(null);
  const theta = useRef(START);
  const paused = useRef(false);
  const activeRef = useRef<number | null>(null);
  // Where the connector lands: the left edge of the active legend row, measured
  // from the DOM and converted into viewBox units. The svg is pinned to the
  // wrap's box at the viewBox aspect ratio, so the conversion is a single
  // scalar with no letterbox offset to correct for.
  const target = useRef<Pt2>([VB_W - 260, 90]);

  const measure = useCallback((i: number | null) => {
    const box = wrap.current;
    const row = i === null ? null : rows.current[i];
    if (!box || !row) return;
    const w = box.getBoundingClientRect();
    const r = row.getBoundingClientRect();
    if (!w.width) return;
    const k = VB_W / w.width;
    target.current = [(r.left - w.left) * k, (r.top - w.top + r.height / 2) * k];
  }, []);

  // Synced in an effect, not during render: the frame loop reads these refs, so
  // writing them while rendering would mutate state React has not committed.
  useEffect(() => {
    paused.current = active !== null;
    activeRef.current = active;
    measure(active);
  }, [active, measure]);

  useEffect(() => {
    const box = wrap.current;
    if (!box) return;
    const ro = new ResizeObserver(() => measure(activeRef.current));
    ro.observe(box);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      if (!reduce && !paused.current) theta.current += dt * 0.00018;

      const cos = Math.cos(theta.current);
      const sin = Math.sin(theta.current);

      TIERS.forEach((tier, ti) => {
        tier.faces.forEach((face, fi) => {
          const el = refs.current[ti][fi];
          if (el) {
            const f = faceFrame(face, cos, sin);
            if (!f) {
              el.style.display = "none";
            } else {
              el.style.display = "";
              el.setAttribute("points", f.points);
              el.setAttribute("fill-opacity", f.opacity);
            }
          }

          const mark = fi < 4 ? marks.current[ti][fi] : null;
          if (mark) {
            const l = labelFrame(face, cos, sin, tier.isApex);
            mark.setAttribute("opacity", l.opacity.toFixed(3));
            mark.setAttribute("transform", l.transform);
          }
        });
      });

      const ai = activeRef.current;
      if (ai !== null) {
        const [ax, ay] = tierAnchor(ai, cos, sin);
        const [tx, ty] = target.current;
        // A curve rather than an elbow: the tiers sit low and centre, the legend
        // high and right, so a right-angled route would cut across the solid.
        const bend = Math.max(40, (tx - ax) * 0.45);
        leader.current?.setAttribute(
          "d",
          `M${ax.toFixed(1)},${ay.toFixed(1)} C${(ax + bend).toFixed(1)},${ay.toFixed(1)} ${(tx - bend).toFixed(1)},${ty.toFixed(1)} ${tx.toFixed(1)},${ty.toFixed(1)}`,
        );
        dot.current?.setAttribute("cx", ax.toFixed(1));
        dot.current?.setAttribute("cy", ay.toFixed(1));
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const layer = active === null ? null : platformLayers[active];

  return (
    <div className="pyramid-wrap" ref={wrap}>
      <svg
        className="pyramid"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        role="group"
        aria-label="The four platform layers. Select a layer to open it."
      >
        <defs>
          {/* One gradient per layer, in objectBoundingBox units so every face
              resolves it against its own box — which is what lets a single
              definition follow polygons whose points are rewritten each frame.
              Lit at the top, shaded at the foot, matching the fixed light. */}
          {platformLayers.map((l) => (
            <linearGradient key={l.key} id={`pyr-${l.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={l.color} />
              <stop offset="0.55" stopColor={l.color} stopOpacity="0.92" />
              <stop offset="1" stopColor={l.colorDeep} />
            </linearGradient>
          ))}

          <marker
            id="pyramid-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,1 L9,5 L0,9 z" fill="currentColor" />
          </marker>
        </defs>

        <ellipse className="pyramid-shadow" cx={CX} cy={CY + 95} rx={230} ry={40} />

        <g className="pyramid-motes" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <circle
              key={i}
              r={3}
              cx={CX + (((i % 3) - 1) * 30)}
              cy={0}
              style={
                {
                  "--delay": `${i * 0.62}s`,
                  "--mote": platformLayers[i % platformLayers.length].color,
                } as React.CSSProperties
              }
            />
          ))}
        </g>

        {TIERS.map(({ layer: l, faces }, ti) => (
          <a
            key={l.key}
            href={`/platform#${l.key}`}
            className={`pyramid-tier${
              active === null ? "" : active === ti ? " is-active" : " is-dim"
            }`}
            style={
              {
                "--layer": l.color,
                "--face": `url(#pyr-${l.key})`,
              } as React.CSSProperties
            }
            aria-label={`${l.name} — ${l.role}`}
            onClick={(e) => {
              // Let modified and middle clicks behave like real links.
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
              e.preventDefault();
              router.push(`/platform#${l.key}`);
            }}
            onPointerEnter={() => onActive(ti)}
            onPointerLeave={() => onActive(null)}
            onFocus={() => onActive(ti)}
            onBlur={() => onActive(null)}
          >
            {faces.map((_, fi) => (
              <polygon
                key={fi}
                ref={(el) => {
                  refs.current[ti][fi] = el;
                }}
                className="pyramid-face"
                points={FIRST_FACES[ti][fi]?.points ?? ""}
                fillOpacity={FIRST_FACES[ti][fi]?.opacity ?? "0"}
                style={FIRST_FACES[ti][fi] ? undefined : { display: "none" }}
              />
            ))}
            {/* One copy per side, each lying in its own face. Only the sides
                that are turned toward us carry any opacity, so the name is
                always on the front of the solid without ever jumping. The name
                is spoken once, from the anchor's aria-label above. */}
            {faces.slice(0, 4).map((_, fi) => (
              <text
                key={`m${fi}`}
                ref={(el) => {
                  marks.current[ti][fi] = el;
                }}
                className="pyramid-mark"
                aria-hidden="true"
                textAnchor="middle"
                dominantBaseline="central"
                x={0}
                y={LABEL_Y[ti]}
                fontSize={LABEL_FS[ti]}
                opacity={FIRST_LABELS[ti][fi].opacity.toFixed(3)}
                transform={FIRST_LABELS[ti][fi].transform}
              >
                {LABEL_LINES[ti].map((line, li) => (
                  <tspan
                    key={line}
                    x={0}
                    dy={
                      li === 0
                        ? (-(LABEL_LINES[ti].length - 1) * LINE_H[ti]) / 2
                        : LINE_H[ti]
                    }
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            ))}
          </a>
        ))}

        <g
          className={`pyramid-leader${layer ? " is-on" : ""}`}
          style={layer ? ({ color: layer.color } as React.CSSProperties) : undefined}
          aria-hidden="true"
        >
          <path ref={leader} d="" markerEnd="url(#pyramid-arrow)" />
          <circle ref={dot} r={5} cx={-99} cy={-99} />
        </g>
      </svg>

      {/* The legend: the four layers, apex first, so it reads top-down in the
          same order as the solid. Rendered in source order and reversed by the
          flex direction, so the numbering stays 01 → 04 for assistive tech. */}
      <div className="pyramid-aside">
        <p className="pyramid-aside-label">The four layers</p>
        <ol className="pyramid-legend">
          {platformLayers.map((l, i) => (
            <li
              key={l.key}
              ref={(el) => {
                rows.current[i] = el;
              }}
              className={
                active === null ? undefined : active === i ? "is-active" : "is-dim"
              }
              style={{ "--layer": l.color } as React.CSSProperties}
            >
              <a
                href={`/platform#${l.key}`}
                onPointerEnter={() => onActive(i)}
                onPointerLeave={() => onActive(null)}
                onFocus={() => onActive(i)}
                onBlur={() => onActive(null)}
              >
                <span className="pyramid-legend-n">{l.n}</span>
                <span className="pyramid-legend-name">{l.name}</span>
                <span className="pyramid-legend-role">{l.role}</span>
              </a>
            </li>
          ))}
        </ol>

        {/* Fixed slot rather than one that grows into place: the connector is
            aimed at a measured row, and text appearing here must not shift the
            rows out from under it. */}
        <div
          className="pyramid-readout"
          data-on={layer ? "1" : "0"}
          style={layer ? ({ "--layer": layer.color } as React.CSSProperties) : undefined}
        >
          {layer && (
            <>
              <p>{layer.summary}</p>
              <span className="pyramid-readout-cue">Open this layer &rarr;</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

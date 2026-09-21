import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

const views: { src: string; label: string; note: string }[] = [
  {
    src: "/cases/case-121-cfp.jpg",
    label: "Color fundus photography",
    note: "The familiar reference view — a single, true-to-eye composite.",
  },
  {
    src: "/cases/case-121-msi-a.jpg",
    label: "Multispectral capture",
    note: "One band from the same eye, isolating contrast the composite blends away.",
  },
  {
    src: "/cases/case-121-oct-a.jpg",
    label: "OCT correlation",
    note: "Scan location and cross-section, reviewed alongside the spectral stack.",
  },
];

export function ModalityComparison() {
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-3">
        {views.map((v, i) => (
          <Reveal key={v.src} delay={i * 0.08}>
            <figure className="overflow-hidden rounded-2xl border border-ink-900/8 bg-ink-950">
              <div className="relative aspect-[4/3]">
                <Image
                  src={v.src}
                  alt={v.label}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="bg-white p-4">
                <p className="font-display text-sm font-semibold text-ink-900">
                  {v.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink-700/75">
                  {v.note}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-ink-700/60">
        Representative case imagery, de-identified by case number. Shown to
        illustrate the imaging concept — not a diagnostic claim or a
        statement of clinical performance.
      </p>
    </div>
  );
}

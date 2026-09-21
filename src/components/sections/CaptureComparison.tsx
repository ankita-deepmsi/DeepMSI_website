import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The same eye recorded two ways, shown at the hinge between the platform
 * architecture and the settings it applies to.
 *
 * This replaced a banner that asserted the site's imagery was real rather than
 * rendered. Showing the pair makes that point without raising the doubt, and it
 * answers the question the platform stack leaves open: what does the capture
 * layer actually produce?
 *
 * The two frames are different aspect ratios in the source (1.61 and 1.37), so
 * they share a 3:2 window with object-cover. The fundus is centred in both, so
 * what is trimmed is surround.
 *
 * Neither band is labelled with a wavelength: the figure for this case is not
 * recorded anywhere in the repo, and a number here would be invented. Add one
 * only once it can be confirmed against the capture record.
 */

const views = [
  {
    src: "/cases/case-121-cfp.jpg",
    tag: "Colour fundus",
    label: "Colour fundus photography",
    note: "Three broad channels, blended into a single composite — the familiar reference view.",
  },
  {
    src: "/cases/case-121-msi-a.jpg",
    tag: "Multispectral",
    label: "Multispectral capture",
    note: "One narrow band from the same eye, holding back the rest of the spectrum so a single depth comes forward.",
  },
];

export function CaptureComparison() {
  return (
    <section className="capture-compare" aria-labelledby="capture-compare-title">
      <div className="container-x">
        <div className="capture-head">
          <div>
            <p className="editorial-label">
              <span className="label-rule" /> Side by side
            </p>
            <h2 id="capture-compare-title">
              The same eye,
              <br />
              recorded two ways.
            </h2>
          </div>
          <p>
            A colour fundus camera blends everything reaching the sensor into
            three broad channels. A narrow band holds the rest of the spectrum
            back, and what returns comes from one depth rather than all of them
            at once.
          </p>
        </div>

        <div className="capture-pair">
          {views.map((view, i) => (
            <Reveal key={view.src} delay={i * 0.1}>
              <figure className="capture-figure">
                <div>
                  <Image
                    src={view.src}
                    alt={view.label}
                    fill
                    sizes="(max-width: 899px) 100vw, 46vw"
                    className="capture-frame-img"
                  />
                  <span className="capture-tag">{view.tag}</span>
                </div>
                <figcaption>
                  <strong>{view.label}</strong>
                  <span>{view.note}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="capture-foot">
          <p>
            Case 121 · de-identified. Shown to illustrate the imaging method —
            not a diagnostic claim or a statement of clinical performance.
          </p>
          <Link className="editorial-text-link" href="/platform">
            Inside the platform <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

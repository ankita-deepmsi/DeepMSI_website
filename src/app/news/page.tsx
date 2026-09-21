import type { Metadata } from "next";
import Image from "next/image";
import { NewsExplorer } from "@/components/news/NewsExplorer";
import { CtaBand } from "@/components/sections/CtaBand";
import { getArticleCards } from "@/lib/news";

/**
 * News & Reports.
 *
 * The hero is the editorial photo hero the rest of the interior pages use; it
 * previously used PageHero. NewsExplorer is untouched — it is a client
 * component with its own filter UI, and restyling it is a separate job from
 * putting a banner on the page.
 */

export const metadata: Metadata = {
  title: "News & Reports",
  description:
    "Open, responsibly-framed updates and reports on retinal imaging, AMD, fundus imaging, AI in ophthalmology, and the science of multispectral imaging.",
};

export default function NewsPage() {
  const articles = getArticleCards();

  return (
    <>
      {/* The supplied file could not ship whole. Three problems, all of them in
          the outer band of the frame and none in the middle:

            1. Third-party journal mastheads across the top — Nature,
               Ophthalmology, The Lancet Digital Health — drawn as covers. As
               decoration on our own news page they imply we publish in them.
               We do not: /evidence lists references that are explicitly not
               studies of this platform.
            2. FDA, CE, ISO and MDR certification badges at the bottom right.
               The same marks I declined to publish from Designer.png on
               /evidence, for the same reason — no clearance is claimed
               anywhere on this site.
            3. A baked-in title block, "News, Reports & Clinical Evidence",
               which would have collided with the h1 drawn over it regardless
               of everything else.

          The outer ring also carries capability labels — PEER-REVIEWED
          PUBLICATIONS, MULTICENTER STUDIES, REGULATORY & COMPLIANCE — which
          read as claims about what we have rather than about what this page
          covers.

          So the banner is the centre of the frame: a data swirl, an audience in
          silhouette, unlabelled paper stacks and chart panels too small to
          read. Cropped from x 300-1290, y 300-760 of the source and upscaled
          2x. The full file is no longer under /public: it moved to
          _source-assets/claim-bearing-originals/ with the other claim-bearing
          originals, which is gitignored, so it is neither committed nor served.

          Versioned by NAME: Next's image optimizer caches on the URL. */}
      <section className="page-hero page-hero-photo">
        <div className="page-hero-media">
          <Image
            src="/news-hero.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="page-hero-scrim" aria-hidden="true" />
        <p className="page-hero-tag">AI-generated illustration</p>
        <div className="container-x">
          <p className="editorial-label">
            <span className="label-rule" /> News &amp; reports
          </p>
          <h1>The latest in eye care &amp; imaging.</h1>
          <p className="page-hero-lead">
            Company news, industry roundups, clinical summaries and white papers
            written to be accurate, cited and responsibly framed. Educational
            only.
          </p>
        </div>
      </section>

      <section className="editorial-band section-space">
        <div className="container-x">
          <NewsExplorer articles={articles} />
        </div>
      </section>

      <CtaBand
        eyebrow="Stay in the loop"
        title="Eye-care imaging, explained — in your inbox."
        description="We publish open, plain-language updates as the science of multispectral imaging matures."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "Explore the platform", href: "/platform" }}
      />
    </>
  );
}

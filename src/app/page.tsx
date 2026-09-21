import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Activity, Crosshair } from "lucide-react";
import { EditorialHero } from "@/components/home/EditorialHero";
import { SpectralExplorer } from "@/components/home/SpectralExplorer";
import { PlatformStack } from "@/components/platform/PlatformStack";
import { CaptureComparison } from "@/components/sections/CaptureComparison";
import { CtaBand } from "@/components/sections/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { settings } from "@/lib/site";

export default function Home() {
  return (
    <>
      <EditorialHero />

      {/* What we do — organised by outcome, not by business unit */}
      <section id="problem" className="focus-section section-space">
        <div className="container-x">
          <div className="editorial-heading-row">
            <p className="editorial-label">01 / What we do</p>
            <h2>
              {/* Two things worth seeing.
              <br />
              One spectral discipline. */}
              Medical and beyond. 
              <br />
              One trusted source.
            </h2>
          </div>
          <div className="focus-grid focus-grid-weighted">
            <Link href="/platform" className="focus-path">
              {/* Decorative: the card's own heading and copy carry the meaning,
                  so the image stays out of the accessibility tree. */}
              <div className="focus-path-media">
                <Image
                  src="/eye.png"
                  alt=""
                  fill
                  sizes="(max-width: 1199px) 100vw, 46vw"
                  className="focus-path-img"
                />
                <div className="focus-path-top">
                  <Activity size={27} strokeWidth={1.25} />
                  <span>DETECT &amp; MONITOR</span>
                  <ArrowUpRight className="path-arrow" size={24} />
                </div>
              </div>
              <span className="focus-path-rule" aria-hidden="true" />
              <div className="focus-path-body">
              <h3>
                Retinal disease,
                <br />
                measured over time.
              </h3>
              <p>
                An end-to-end retinal intelligence platform.
                Built such that retinal change can be
                measured, not just described.
              </p>
              <span className="path-link">
                Explore the platform <ArrowRight size={17} />
              </span>
              {/* <span className="path-note">
                For eye-care professionals, screening networks and trial teams
              </span> */}
              </div>
            </Link>
            <Link
              href="/optical-technologies"
              className="focus-path focus-path-industry"
            >
              <div className="focus-path-media">
                <Image
                  src="/light.png"
                  alt=""
                  fill
                  sizes="(max-width: 1199px) 100vw, 46vw"
                  className="focus-path-img"
                />
                <div className="focus-path-top">
                  <Crosshair size={27} strokeWidth={1.25} />
                  <span>MEASURE &amp; VERIFY</span>
                  <ArrowUpRight className="path-arrow" size={24} />
                </div>
              </div>
              <span className="focus-path-rule" aria-hidden="true" />
              <div className="focus-path-body">
              <h3>
                Optical performance,
                <br />
                quantified.
              </h3>
              <p>
                Optical metrology, illumination QA suite and many more. 
                Built for specialists.
              </p>
              <span className="path-link">
                Optical technologies <ArrowRight size={17} />
              </span>
              {/* <span className="path-note">Not medical devices</span> */}
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why it matters + the input */}
      <section className="spectrum-section">
        <div className="container-x spectrum-grid">
          <div className="spectrum-copy">
            <p className="editorial-label">
              <span className="label-rule" /> 02 / Why it matters
            </p>
            <h2>
              Retinal disease begins <em>before</em> you can see it.
            </h2>
            {/* <p>
              A colour photograph records three broad channels of a tissue many
              layers deep. Narrow bands of light stop at different depths — so
              one eye becomes a spectral stack rather than a single surface
              image.
            </p> */}
            <p>
              A photo shows the surface. We show every layer.
            </p>
            <Link className="editorial-text-link" href="/technology">
              The science behind it <ArrowUpRight size={17} />
            </Link>
          </div>
          <SpectralExplorer />
        </div>
      </section>

      {/* The four-layer platform */}
      <PlatformStack />

      {/* <CaptureComparison /> */}

      {/* Solutions */}
      <section className="glass-section section-space">
        <span className="glass-bloom glass-bloom-a" aria-hidden="true" />
        <span className="glass-bloom glass-bloom-b" aria-hidden="true" />
        <span className="glass-bloom glass-bloom-c" aria-hidden="true" />
        <div className="container-x">
          <div className="section-title-row">
            <div>
              <p className="editorial-label">
                <span className="label-rule" /> 03 / Where it applies
              </p>
              <h2>
                Different settings.
                <br />
                The same measurement.
              </h2>
            </div>
            <Link href="/solutions" className="editorial-text-link">
              All solutions <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="glass-grid">
            {settings.map((setting) => (
              <Link
                className="glass-card"
                href={setting.href}
                key={setting.id}
                style={{ "--accent": setting.accent } as React.CSSProperties}
              >
                <span className="glass-icon">
                  <Icon name={setting.icon} className="h-6 w-6" />
                </span>
                <p className="glass-eyebrow">{setting.eyebrow}</p>
                <h3>
                  {setting.title}
                  <ArrowUpRight size={19} />
                </h3>
                <p className="glass-description">{setting.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence & understanding */}
      {/* <section className="science-section section-space">
        <div className="container-x science-layout">
          <div>
            <p className="editorial-label">04 / Evidence first</p>
            <h2>
              Claims follow
              <br />
              evidence.
            </h2>
            <p className="science-intro">
              The platform is investigational. We publish where each component
              stands, what is under study, and the science the approach rests
              on — and nothing beyond it.
            </p>
            <Link href="/evidence" className="editorial-text-link">
              Evidence &amp; regulatory <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="science-links">
            <Link href="/evidence#regulatory">
              <span className="resource-number">01</span>
              <div>
                <p>REGULATORY PATHWAY</p>
                <h3>Where does each component stand?</h3>
                <span>Device and software-as-a-medical-device review status</span>
              </div>
              <ArrowUpRight size={22} />
            </Link>
            <Link href="/news/multispectral-vs-color-fundus">
              <span className="resource-number">02</span>
              <div>
                <p>IMAGING EXPLAINED</p>
                <h3>What changes when you image beyond colour?</h3>
                <span>A guide to multispectral and colour fundus imaging</span>
              </div>
              <ArrowUpRight size={22} />
            </Link>
            <Link href="/partners">
              <span className="resource-number">03</span>
              <div>
                <p>WORKING TOGETHER</p>
                <h3>Bring your research questions.</h3>
                <span>
                  Clinical collaboration, screening networks and trial
                  partnerships
                </span>
              </div>
              <ArrowUpRight size={22} />
            </Link>
          </div>
        </div>
      </section> */}

      <CtaBand
        title="Enter into the world of retinal intelligence."
        description="Tell us about your requirements. We'll talk through where our products fit."
        primary={{ label: "Start a conversation", href: "/contact" }}
        secondary={{ label: "Explore partnerships", href: "/partners" }}
      />
    </>
  );
}

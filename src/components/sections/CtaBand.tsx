import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CtaBand({
  eyebrow = "Let's work together",
  title = "Bring a new perspective to your work.",
  description = "Tell us about your imaging needs, research questions, or the optical challenge you want to solve.",
  primary = { label: "Start a conversation", href: "/contact" },
  secondary = { label: "Explore partnerships", href: "/partners" },
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="contact-band">
      <div className="container-x contact-band-layout">
        <div><p className="editorial-label"><span className="label-rule" />{eyebrow}</p><h2>{title}</h2><p>{description}</p></div>
        <div className="contact-band-actions">
          <Link href={primary.href} className="editorial-button">{primary.label} <ArrowUpRight size={18} /></Link>
          <Link href={secondary.href} className="editorial-text-link">{secondary.label} <ArrowUpRight size={17} /></Link>
        </div>
      </div>
    </section>
  );
}

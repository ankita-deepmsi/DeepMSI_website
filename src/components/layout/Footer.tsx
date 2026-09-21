import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { site, nav, audiences } from "@/lib/site";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

/* Columns are derived from the header rather than restated, so the two cannot
   drift apart. Nav groups that have a dropdown become a column of their own;
   the header items that have no dropdown are collected with the audience strip
   under "More". Legal links are the one hard-coded set — they are deliberately
   absent from the header but have to be reachable from every page. */

type FooterColumn = { title: string; href?: string; links: [string, string][] };

const hasChildren = (group: (typeof nav)[number]) =>
  Boolean(group.children && group.children.length > 0);

const columns: FooterColumn[] = [
  ...nav.filter(hasChildren).map((group) => ({
    title: group.label,
    href: group.href,
    links: group.children!.map(
      (child) => [child.label, child.href] as [string, string],
    ),
  })),
  {
    title: "More",
    links: [
      ...nav
        .filter((group) => !hasChildren(group))
        .map((group) => [group.label, group.href ?? "/"] as [string, string]),
      ...audiences.map((a) => [a.label, a.href] as [string, string]),
    ],
  },
  {
    title: "Information",
    links: [
      ["Privacy policy", "/legal/privacy"],
      ["Terms of use", "/legal/terms"],
      ["Accessibility", "/legal/accessibility"],
      ["Cookie policy", "/legal/cookies"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="editorial-footer">
      <div className="container-x">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" aria-label={`${site.name} home`}><Logo /></Link>
            <p>Data-driven eyecare.<br />Capture to decision.</p>
            <span>{site.location}</span>
            <a className="footer-email" href={`mailto:${site.email}`}><Mail size={15} />{site.email}<ArrowUpRight size={14} /></a>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3>{column.href ? <Link href={column.href}>{column.title}</Link> : column.title}</h3>
              <ul>{column.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-updates"><div><h3>Stay curious.</h3><p>Request email updates on imaging, research, and {site.name}.</p></div><NewsletterForm /></div>
        {/* <div className="footer-notice"><p>Platform components are investigational or in development, and availability varies by region. See <Link href="/evidence" className="underline">Evidence &amp; regulatory</Link> for the status of each. Optical technologies are not medical devices and are not intended for medical use. Website content is informational and does not replace professional medical judgment.</p></div> */}
        <div className="footer-bottom"><p>© 2026 {site.legalName}. All rights reserved.</p><span>{site.signature}</span></div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { nav, site, audiences } from "@/lib/site";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  const close = () => { setOpen(null); setMobile(false); };

  useEffect(() => {
    if (!mobile) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [mobile]);

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) { setOpen(null); setMobile(false); }
    };
    const resized = () => {
      if (window.innerWidth >= 1200) setMobile(false);
    };
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", resized);
    return () => { document.removeEventListener("pointerdown", outside); window.removeEventListener("resize", resized); };
  }, []);

  return (
    <header ref={header} className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape") {
        if (mobile) menuButton.current?.focus();
        else (header.current?.querySelector('button[aria-expanded="true"]') as HTMLButtonElement | null)?.focus();
        close();
      }
    }} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node)) close();
    }}>
      <div className="header-note"><div className="container-x">
        <nav className="header-audiences" aria-label="Choose your audience">
          {audiences.map((audience) => (
            <Link key={audience.key} href={audience.href} onClick={close} aria-current={pathname === audience.href ? "page" : undefined}>{audience.label}</Link>
          ))}
        </nav>
        <span>{site.location}</span>
      </div></div>
      <nav className="container-x main-nav" aria-label="Main navigation">
        <Link href="/" aria-label={`${site.name} home`} onClick={close} className="brand-link"><Logo /></Link>
        <ul className="desktop-nav">
          {nav.map((group, index) => (
            <li key={group.label} className="nav-group">
              <div className="nav-group-heading">
                <Link href={group.href ?? "/"} onClick={close} aria-current={pathname === group.href ? "page" : undefined}>{group.label}</Link>
                {group.children && <button type="button" aria-label={`${group.label} submenu`} aria-expanded={open === group.label} aria-controls={`nav-panel-${index}`} onClick={() => setOpen(open === group.label ? null : group.label)}><ChevronDown size={14} /></button>}
              </div>
              {group.children && open === group.label && (
                <div className="nav-dropdown" id={`nav-panel-${index}`}>
                  <p>{group.label}</p>
                  {group.children.map((child) => <Link key={child.href} href={child.href} onClick={close}><strong>{child.label}</strong><span>{child.description}</span></Link>)}
                </div>
              )}
            </li>
          ))}
        </ul>
        <button ref={menuButton} className="mobile-toggle" type="button" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} aria-controls="mobile-navigation" onClick={() => setMobile(!mobile)}>{mobile ? <X /> : <Menu />}</button>
      </nav>
      {mobile && <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">
        {nav.map((group) => <div className="mobile-group" key={group.label}>
          <Link href={group.href ?? "/"} onClick={close}>{group.label} <ArrowUpRight size={18} /></Link>
          {group.children && <div>{group.children.map((child) => <Link key={child.href} href={child.href} onClick={close}>{child.label}</Link>)}</div>}
        </div>)}
        <div className="mobile-group mobile-audiences">
          {audiences.map((audience) => <Link key={audience.key} href={audience.href} onClick={close}>{audience.label}</Link>)}
        </div>
        <Link href="/contact" onClick={close} className="editorial-button">Start a conversation <ArrowUpRight size={18} /></Link>
      </nav>}
    </header>
  );
}

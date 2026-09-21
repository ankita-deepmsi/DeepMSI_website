import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Full-bleed background-photo banner with left-aligned overlay copy. */
export function PhotoBanner({
  image,
  imageAlt,
  imagePosition,
  eyebrow,
  title,
  description,
  actions,
  generated,
  priority,
  className,
}: {
  image: string;
  imageAlt: string;
  /** CSS object-position for the crop, e.g. "center 30%". A banner is far
   *  wider than the photographs that go in it, so the default centre crop
   *  often takes the subject's head off. */
  imagePosition?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** Renders a standing disclosure badge for an AI-generated image. It is a
   *  drawn element rather than part of the file, because the banner crops the
   *  photograph hard and any watermark burned into the source would be cut
   *  away at most viewport widths. */
  generated?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <section className={cn("photo-banner", className)}>
      {/* The badge lives inside the media rather than the section, so that when
          the banner restacks below 1024px — photo above, copy on solid ground
          below — the disclosure stays on the photograph it describes. */}
      <div className="photo-banner-media">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          priority={priority}
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
        {generated && (
          <p className="photo-banner-tag">AI-generated illustration</p>
        )}
      </div>
      <div className="photo-banner-scrim" aria-hidden="true" />
      <div className="photo-banner-content container-x">
        <div className="photo-banner-copy">
          {eyebrow && <p className="editorial-label">{eyebrow}</p>}
          <h2>{title}</h2>
          {description && <p className="photo-banner-lead">{description}</p>}
          {actions && <div className="photo-banner-actions">{actions}</div>}
        </div>
      </div>
    </section>
  );
}

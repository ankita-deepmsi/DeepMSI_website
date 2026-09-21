import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/Magnetic";

type Variant =
  | "primary"
  | "gold"
  | "outline"
  | "outline-light"
  | "ghost"
  | "glass";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-700 text-white hover:bg-navy-800",
  gold: "bg-gold-500 text-ink-950 shadow-[0_10px_30px_-10px_rgba(184,134,11,0.7)] hover:bg-gold-400",
  outline:
    "border border-ink-900/15 bg-white/70 text-ink-800 backdrop-blur hover:border-navy-600 hover:text-navy-700",
  "outline-light":
    "border border-white/30 text-white hover:border-white/60 hover:bg-white/10",
  ghost: "text-ink-700 hover:text-navy-700 hover:bg-ink-900/5",
  glass: "glass text-ink-900 hover:bg-white/90",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[15px]",
  lg: "h-13 px-8 text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  arrow = false,
  magnetic = false,
  external = false,
  type,
  ...rest
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
  magnetic?: boolean;
  external?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </>
  );

  const node = href ? (
    <Link
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {inner}
    </Link>
  ) : (
    <button type={type ?? "button"} className={classes} {...rest}>
      {inner}
    </button>
  );

  if (magnetic) {
    return <Magnetic className="inline-block">{node}</Magnetic>;
  }
  return node;
}

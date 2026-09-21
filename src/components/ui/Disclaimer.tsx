import type { ReactNode } from "react";
import { AlertTriangle, Info, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "info" | "investigational" | "nonmedical";

const styles: Record<
  Variant,
  { wrap: string; icon: ReactNode; label: string }
> = {
  info: {
    wrap: "border-navy-600/20 bg-navy-50/70 text-navy-900",
    icon: <Info className="h-5 w-5 text-navy-600" />,
    label: "Note",
  },
  investigational: {
    wrap: "border-gold-500/30 bg-gold-50/70 text-gold-900",
    icon: <ShieldAlert className="h-5 w-5 text-gold-600" />,
    label: "Investigational device",
  },
  nonmedical: {
    wrap: "border-ink-900/12 bg-ink-50/70 text-ink-800",
    icon: <AlertTriangle className="h-5 w-5 text-ink-700" />,
    label: "Non-medical use",
  },
};

export function Disclaimer({
  variant = "info",
  title,
  children,
  className,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const s = styles[variant];
  return (
    <div
      className={cn(
        "flex gap-3 rounded-2xl border px-5 py-4 text-sm leading-relaxed",
        s.wrap,
        className,
      )}
    >
      <span className="mt-0.5 shrink-0">{s.icon}</span>
      <div>
        <p className="font-semibold">{title ?? s.label}</p>
        <div className="mt-1 opacity-90">{children}</div>
      </div>
    </div>
  );
}

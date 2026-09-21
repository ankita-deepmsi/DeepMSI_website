import { cn } from "@/lib/utils";

const TICKS = ["400", "450", "500", "550", "600", "650", "700", "950"];

/** The 400–950nm spectral signature bar with wavelength ticks. */
export function SpectrumBar({
  className,
  labels = true,
  tone = "light",
}: {
  className?: string;
  labels?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="bg-spectral h-2.5 w-full rounded-full shadow-[0_2px_18px_-4px_rgba(11,114,133,0.6)]" />
      {labels && (
        <div
          className={cn(
            "mt-2 flex justify-between font-mono text-[10px] tracking-wide",
            tone === "dark" ? "text-white/55" : "text-ink-700/55",
          )}
        >
          {TICKS.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/** Thin spectral line used as a section divider. */
export function SpectralDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("bg-spectral h-px w-full opacity-70", className)}
    />
  );
}

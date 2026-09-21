import { cn } from "@/lib/utils";

const base =
  "w-full rounded-sm border border-ink-900/20 bg-white px-4 text-base text-ink-900 placeholder:text-ink-700/55 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/15";

export function FormField({
  label,
  name,
  type = "text",
  required,
  placeholder,
  textarea,
  options,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
  options?: string[];
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-medium text-ink-800">
        {label}
        {required && <span className="text-signal-red"> *</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={4}
          className={cn(base, "resize-y py-3")}
        />
      ) : options ? (
        <select name={name} required={required} className={cn(base, "h-11")}>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={cn(base, "h-11")}
        />
      )}
    </label>
  );
}

import {
  type LucideIcon,
  ScanEye,
  BrainCircuit,
  Crosshair,
  Lightbulb,
  Layers,
  Sun,
  FlaskConical,
  Eye,
  Droplets,
  CircleDot,
  Activity,
  Microscope,
  Factory,
  Camera,
  GraduationCap,
  Waves,
  GitBranch,
  Wrench,
  AppWindow,
  Stethoscope,
  Network,
  Handshake,
  Scan,
  Circle,
  Clock,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  ScanEye,
  BrainCircuit,
  Crosshair,
  Lightbulb,
  Layers,
  Sun,
  FlaskConical,
  Eye,
  Droplets,
  CircleDot,
  Activity,
  Microscope,
  Factory,
  Camera,
  GraduationCap,
  Waves,
  GitBranch,
  Wrench,
  AppWindow,
  Stethoscope,
  Network,
  Handshake,
  Scan,
  Circle,
  Clock,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const C = map[name] ?? Layers;
  return <C className={className} aria-hidden />;
}

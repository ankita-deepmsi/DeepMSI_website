import { permanentRedirect } from "next/navigation";

/** Superseded by /platform — the MSI-120 is now presented as layer 01 of four. */
export default function DeepMsiPage() {
  permanentRedirect("/platform");
}

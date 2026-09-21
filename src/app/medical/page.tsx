import { permanentRedirect } from "next/navigation";

/** Superseded by /platform in the digital-health repositioning. */
export default function MedicalPage() {
  permanentRedirect("/platform");
}

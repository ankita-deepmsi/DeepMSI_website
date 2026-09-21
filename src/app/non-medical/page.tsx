import { permanentRedirect } from "next/navigation";

/** Renamed to /optical-technologies and demoted from a co-equal business arm. */
export default function NonMedicalPage() {
  permanentRedirect("/optical-technologies");
}

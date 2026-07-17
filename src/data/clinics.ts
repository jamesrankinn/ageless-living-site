// Single source of truth for the three Ageless Living™ clinic locations.
// Used by the Contact page, Book page, and any per-clinic booking CTA so the
// address / phone / booking target never drift between pages.

export type ClinicId = "langley" | "victoria" | "kelowna";

export interface Clinic {
  id: ClinicId;
  name: string;
  /** Short descriptor shown under the clinic name. */
  tagline: string;
  addressLine1: string;
  addressLine2: string;
  phoneDisplay: string;
  /** Digits-only, ready for a tel: link. */
  phoneTel: string;
  email: string;
  hours: string;
  /** Google Maps directions link. */
  mapUrl: string;
}

export const clinics: Clinic[] = [
  {
    id: "langley",
    name: "Langley",
    tagline: "Longevity, recovery & aesthetic medicine",
    addressLine1: "415-20178 96th Ave",
    addressLine2: "Langley, BC V1M 0B2",
    phoneDisplay: "+1 (236) 326-6830",
    phoneTel: "+12363266830",
    email: "langley@agelessliving.ca",
    hours: "Mon–Fri: 9am–5pm",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=415-20178+96th+Ave+Langley+BC+V1M+0B2",
  },
  {
    id: "victoria",
    name: "Victoria",
    tagline: "Advanced aesthetic & personalized care",
    addressLine1: "740 Hillside Ave #120",
    addressLine2: "Victoria, BC V8T 1Z4",
    phoneDisplay: "+1 (250) 590-5787",
    phoneTel: "+12505905787",
    email: "wellness@agelessliving.ca",
    hours: "Mon–Fri: 9am–5pm",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=740+Hillside+Ave+120+Victoria+BC+V8T+1Z4",
  },
  {
    id: "kelowna",
    name: "Kelowna",
    tagline: "Integrative therapies & IV wellness",
    addressLine1: "1708 Dolphin Ave #101",
    addressLine2: "Kelowna, BC V1Y 9S4",
    phoneDisplay: "+1 (778) 760-9827",
    phoneTel: "+17787609827",
    email: "kelowna@agelessliving.ca",
    hours: "Mon–Fri: 9am–5pm",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=1708+Dolphin+Ave+101+Kelowna+BC+V1Y+9S4",
  },
];

export function getClinic(id: string | null | undefined): Clinic | undefined {
  return clinics.find((c) => c.id === id);
}

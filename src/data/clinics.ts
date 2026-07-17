// Single source of truth for the three Ageless Living™ clinic locations.
// Used by the Contact page, Book page, Footer, and any per-clinic booking CTA so
// the address / phone / hours / booking target never drift between pages.

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
    phoneDisplay: "(236) 326-6830",
    phoneTel: "+12363266830",
    email: "langley@agelessliving.ca",
    hours: "Mon–Fri: 9am–5pm · By appointment · Closed weekends",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=415-20178+96th+Ave+Langley+BC+V1M+0B2",
  },
  {
    id: "victoria",
    name: "Victoria",
    tagline: "Advanced aesthetic & personalized care",
    addressLine1: "101 Burnside Rd W #1",
    addressLine2: "Victoria, BC V9A 1B7",
    phoneDisplay: "(250) 590-5787",
    phoneTel: "+12505905787",
    email: "wellness@agelessliving.ca",
    hours: "Mon–Thu: 9am–5pm · Fri: 9am–4pm · By appointment · Closed weekends",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=101+Burnside+Rd+W+1+Victoria+BC+V9A+1B7",
  },
  {
    id: "kelowna",
    name: "Kelowna",
    tagline: "Integrative therapies & IV wellness",
    addressLine1: "3320 Richter St #102",
    addressLine2: "Kelowna, BC V1W 4V5",
    phoneDisplay: "(778) 760-9827",
    phoneTel: "+17787609827",
    email: "kelowna@agelessliving.ca",
    hours: "Mon–Fri: 9am–5pm · By appointment · Closed weekends",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=3320+Richter+St+102+Kelowna+BC+V1W+4V5",
  },
];

export function getClinic(id: string | null | undefined): Clinic | undefined {
  return clinics.find((c) => c.id === id);
}

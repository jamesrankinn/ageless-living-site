/**
 * Contact / intake form — lead capture.
 *
 * Mirrors the newsletter & performance lead persistence pattern: best-effort
 * POST to `/api/contact`, with a localStorage fallback so the form is fully
 * wired during dev / preview builds and degrades gracefully if the API is
 * offline.
 */

export type ContactLocation = "langley" | "victoria" | "kelowna" | "unsure";

export interface ContactLead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: ContactLocation;
  interest: string;
  message: string;
  createdAt: string;
}

const STORAGE_KEY = "ageless_contact_leads";

function getLocal(): ContactLead[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveLocal(list: ContactLead[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export interface ContactLeadResult {
  success: boolean;
  error?: string;
  lead?: ContactLead;
}

export async function saveContactLead(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: ContactLocation;
  interest: string;
  message: string;
}): Promise<ContactLeadResult> {
  const lead: ContactLead = {
    id: generateId(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    location: input.location,
    interest: input.interest.trim(),
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
  } catch {
    // Fall through to local persistence.
  }

  const existing = getLocal();
  saveLocal([...existing, lead]);
  return { success: true, lead };
}

export function listContactLeads(): ContactLead[] {
  return getLocal();
}

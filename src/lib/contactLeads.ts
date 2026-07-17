/**
 * Contact / intake form — lead capture with real per-clinic delivery.
 *
 * Delivery uses Web3Forms (https://web3forms.com) — a zero-backend form-to-email
 * service that works on any static host. Each clinic has its own access key so a
 * submission is emailed to the inbox for the location the patient selected:
 *   • Langley  → langley@agelessliving.ca
 *   • Victoria → wellness@agelessliving.ca
 *   • Kelowna  → kelowna@agelessliving.ca
 *   • Not sure → the shared triage inbox
 *
 * SETUP (required for the form to actually send):
 *   1. Create a free Web3Forms "Access Key" for each clinic inbox at
 *      https://web3forms.com (one per destination email).
 *   2. Provide them as Vite env vars (e.g. in `.env`, then rebuild/redeploy):
 *        VITE_WEB3FORMS_KEY_LANGLEY=...
 *        VITE_WEB3FORMS_KEY_VICTORIA=...
 *        VITE_WEB3FORMS_KEY_KELOWNA=...
 *        VITE_WEB3FORMS_KEY=...          # shared / "not sure" triage inbox
 *   Access keys are safe to expose in client-side code — that is how Web3Forms
 *   is designed to be used.
 *
 * Until keys are configured the form reports an honest error (and still keeps a
 * local backup) rather than silently dropping the lead.
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
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const env = import.meta.env;

/** Per-clinic Web3Forms access keys, with a shared fallback for "not sure". */
const ACCESS_KEYS: Record<ContactLocation, string | undefined> = {
  langley: env.VITE_WEB3FORMS_KEY_LANGLEY || env.VITE_WEB3FORMS_KEY,
  victoria: env.VITE_WEB3FORMS_KEY_VICTORIA || env.VITE_WEB3FORMS_KEY,
  kelowna: env.VITE_WEB3FORMS_KEY_KELOWNA || env.VITE_WEB3FORMS_KEY,
  unsure: env.VITE_WEB3FORMS_KEY,
};

const CLINIC_LABEL: Record<ContactLocation, string> = {
  langley: "Langley",
  victoria: "Victoria",
  kelowna: "Kelowna",
  unsure: "No preference",
};

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

async function deliverToClinic(lead: ContactLead): Promise<boolean> {
  const accessKey = ACCESS_KEYS[lead.location];
  if (!accessKey) return false;

  const clinic = CLINIC_LABEL[lead.location];
  const payload = {
    access_key: accessKey,
    subject: `New website inquiry — ${clinic} — ${lead.interest}`,
    from_name: `${lead.firstName} ${lead.lastName}`,
    replyto: lead.email,
    // Human-readable body fields (Web3Forms emails these as-is).
    "Preferred clinic": clinic,
    "First name": lead.firstName,
    "Last name": lead.lastName,
    Email: lead.email,
    Phone: lead.phone,
    "Reason for contact": lead.interest,
    Message: lead.message,
    "Submitted at": lead.createdAt,
  };

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);
    return res.ok && data?.success === true;
  } catch {
    return false;
  }
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

  // Always keep a local backup so nothing is ever lost client-side.
  saveLocal([...getLocal(), lead]);

  const delivered = await deliverToClinic(lead);
  if (!delivered) {
    return {
      success: false,
      lead,
      error:
        "We couldn't submit your message just now. Please call the clinic nearest you and we'll help you right away.",
    };
  }

  return { success: true, lead };
}

export function listContactLeads(): ContactLead[] {
  return getLocal();
}

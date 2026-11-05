/* ---- Catering request: shared validation (used by the form and the API) ---- */

export const GUEST_OPTIONS = ["25–50", "50–100", "100–200", "200+"] as const;
export const EVENT_TYPES = ["Wedding", "Birthday / Quinceañera", "Corporate", "Community event", "Other"] as const;

export type CateringRequest = {
  name: string;
  phone: string;
  email: string;
  date: string;
  guests: string;
  type: string;
  message: string;
};

export const EMAIL_RE = /^\S+@\S+\.\S+$/;

const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");

export function parseCatering(input: Record<string, unknown>) {
  const data: CateringRequest = {
    name: clip(input.name, 120),
    phone: clip(input.phone, 40),
    email: clip(input.email, 200),
    date: clip(input.date, 20),
    guests: (GUEST_OPTIONS as readonly string[]).includes(String(input.guests)) ? String(input.guests) : GUEST_OPTIONS[0],
    type: (EVENT_TYPES as readonly string[]).includes(String(input.type)) ? String(input.type) : EVENT_TYPES[0],
    message: clip(input.message, 4000),
  };
  const errors: Partial<Record<"name" | "email" | "date", string>> = {};
  if (!data.name) errors.name = "Please add your name.";
  if (!data.email || !EMAIL_RE.test(data.email)) errors.email = "Please add a valid email.";
  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) errors.date = "Please pick a valid date.";
  return { data, errors, ok: Object.keys(errors).length === 0 };
}

export function cateringText(d: CateringRequest) {
  return `Name: ${d.name}\nPhone: ${d.phone || "-"}\nEmail: ${d.email}\nEvent date: ${d.date || "-"}\nGuests: ${d.guests}\nEvent type: ${d.type}\n\n${d.message || ""}`;
}

export const cateringSubject = (d: CateringRequest) => `Catering request – ${d.name}`;

export function cateringMailto(to: string, d: CateringRequest) {
  return `mailto:${to}?subject=${encodeURIComponent(cateringSubject(d))}&body=${encodeURIComponent(cateringText(d))}`;
}

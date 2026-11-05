import { NextResponse } from "next/server";
import { parseCatering, cateringText, cateringSubject } from "@/lib/catering";
import { CONTACT } from "@/lib/site";

export const dynamic = "force-dynamic";

/* best-effort per-instance rate limit: 5 requests / 10 min per IP */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * POST /api/catering — validates a catering request and emails it to the truck.
 * Responses:
 *   200 { ok: true, delivered: "email" }      sent through Resend
 *   200 { ok: true, delivered: "mailto", to } no email service configured — the
 *                                             browser opens the visitor's email app (original behaviour)
 *   400 { ok: false, errors }                 validation failed
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // honeypot — bots fill every field; humans never see this one
  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ ok: true, delivered: "email" });
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests — please try again in a few minutes." }, { status: 429 });
  }

  const { data, errors, ok } = parseCatering(body);
  if (!ok) return NextResponse.json({ ok: false, errors }, { status: 400 });

  const to = process.env.CATERING_TO_EMAIL || CONTACT.email;
  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ ok: true, delivered: "mailto", to });

  const text = cateringText(data);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CATERING_FROM_EMAIL || "El Patio Website <onboarding@resend.dev>",
      to: [to],
      reply_to: data.email,
      subject: cateringSubject(data),
      text,
      html: `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6"><h2 style="margin:0 0 12px">New catering request</h2><pre style="font-family:inherit;white-space:pre-wrap;margin:0">${esc(text)}</pre></div>`,
    }),
  }).catch(() => null);

  if (!res || !res.ok) {
    // email service down — still let the guest reach the truck through their own email app
    console.error("Catering email failed", res?.status, await res?.text().catch(() => ""));
    return NextResponse.json({ ok: true, delivered: "mailto", to });
  }
  return NextResponse.json({ ok: true, delivered: "email" });
}

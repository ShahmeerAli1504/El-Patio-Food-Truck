import { NextResponse } from "next/server";
import { parseCatering, cateringText, cateringSubject, type CateringRequest } from "@/lib/catering";
import { fromAddress, getMailer } from "@/lib/mailer";
import { CONTACT } from "@/lib/site";

export const runtime = "nodejs"; // SMTP needs the Node runtime (not Edge)
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

function ownerHtml(d: CateringRequest) {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 14px 6px 0;color:#8a7a62;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0">${esc(v || "-")}</td></tr>`;
  return `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.55;color:#1a1209">
  <h2 style="margin:0 0 14px;font-size:20px">New catering request</h2>
  <table style="border-collapse:collapse">
    ${row("Name", d.name)}${row("Phone", d.phone)}${row("Email", d.email)}${row("Event date", d.date)}${row("Guests", d.guests)}${row("Event type", d.type)}
  </table>
  ${d.message ? `<p style="margin:16px 0 0;white-space:pre-wrap">${esc(d.message)}</p>` : ""}
  <p style="margin:20px 0 0;color:#8a7a62;font-size:13px">Hit <b>Reply</b> to answer ${esc(d.name)} directly.</p>
</div>`;
}

function guestText(d: CateringRequest) {
  return `Hi ${d.name},\n\nGracias for reaching out to El Patio Street Eats! We got your catering request and will get back to you soon.\n\nHere's what you sent us:\n\n${cateringText(d)}\n\n— El Patio Street Eats · Reno, NV`;
}

/**
 * POST /api/catering — validates a catering request and emails it to the truck through Gmail SMTP.
 * Responses:
 *   200 { ok: true, delivered: "email" }      sent through Gmail
 *   200 { ok: true, delivered: "mailto", to } Gmail not configured / failed — the browser opens the
 *                                             visitor's email app instead (original behaviour)
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

  // where requests land: CATERING_TO_EMAIL, else the Gmail account itself, else the public contact address
  const to = process.env.CATERING_TO_EMAIL || process.env.GMAIL_USER || CONTACT.email;
  const mailer = getMailer();
  if (!mailer) return NextResponse.json({ ok: true, delivered: "mailto", to });

  try {
    await mailer.sendMail({
      from: fromAddress(),
      to,
      replyTo: `"${data.name.replace(/"/g, "")}" <${data.email}>`,
      subject: cateringSubject(data),
      text: cateringText(data),
      html: ownerHtml(data),
    });
  } catch (err) {
    console.error("Catering email failed:", err);
    // Gmail down / bad app password — still let the guest reach the truck through their own email app
    return NextResponse.json({ ok: true, delivered: "mailto", to });
  }

  // optional "we got it" copy to the guest (on unless CATERING_SEND_CONFIRMATION=false)
  if (process.env.CATERING_SEND_CONFIRMATION !== "false") {
    await mailer
      .sendMail({
        from: fromAddress("El Patio Street Eats"),
        to: data.email,
        replyTo: to,
        subject: "We got your catering request — El Patio Street Eats",
        text: guestText(data),
      })
      .catch((err) => console.error("Guest confirmation failed:", err));
  }

  return NextResponse.json({ ok: true, delivered: "email" });
}

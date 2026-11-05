"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { EMAIL_RE, EVENT_TYPES, GUEST_OPTIONS, cateringMailto, parseCatering } from "@/lib/catering";

type Status = { tone: "ok" | "err"; text: string } | null;

export default function Catering() {
  const [invalid, setInvalid] = useState<{ name?: boolean; email?: boolean }>({});
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const bad = { name: !raw.name?.trim(), email: !raw.email?.trim() || !EMAIL_RE.test(raw.email) };
    setInvalid(bad);
    if (bad.name || bad.email) {
      setStatus({ tone: "err", text: "Please add your name and a valid email." });
      return;
    }

    setSending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(raw),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) {
        setStatus({ tone: "err", text: out.error || "Please add your name and a valid email." });
        if (out.errors) setInvalid({ name: !!out.errors.name, email: !!out.errors.email });
        return;
      }
      if (out.delivered === "mailto") {
        // no email service configured yet — hand off to the guest's email app, like the original site
        window.location.href = cateringMailto(out.to, parseCatering(raw).data);
        setStatus({ tone: "ok", text: "Gracias! Your email app is opening with the details — just hit send." });
      } else {
        setStatus({ tone: "ok", text: "Gracias! Your request is in — we'll be in touch soon." });
      }
      form.reset();
    } catch {
      setStatus({ tone: "err", text: "Something went wrong sending your request — please try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="catering" className="section bg-char pt-[160px] max-md:pt-[90px]">
      <div className="container-x grid grid-cols-[.85fr_1.15fr] items-center gap-20 max-md:grid-cols-1 max-md:gap-14">
        <div className="reveal relative max-md:mx-auto max-md:w-full max-md:max-w-[460px]">
          <img
            src="/assets/img/truck-day.jpg"
            alt="El Patio food truck ready for service with cacti and plants at the window"
            className="aspect-[3/4] w-full rounded-card object-cover"
          />
          <div className="absolute -right-[30px] top-10 flex h-[140px] w-[140px] animate-sway flex-col items-center justify-center gap-1.5 rounded-full border border-cream/25 bg-ink text-center shadow-[0_20px_40px_-15px_rgba(0,0,0,.8)] max-md:-right-2.5">
            <img src="/assets/img/logo-sm.png" alt="" className="w-16" />
            <span className="font-caps text-[10px] uppercase leading-normal tracking-[.22em] text-gold">
              Catering
              <br />
              Available
            </span>
          </div>
        </div>

        <div>
          <p className="eyebrow reveal">Bring El Patio to You</p>
          <h2 className="h2 reveal">
            Catering &amp; <em>Private Events</em>
          </h2>
          <p className="reveal text-cream-dim">
            Weddings, quinceañeras, corporate lunches, block parties — we roll up with the truck, the lights and a menu your guests will
            talk about. Tell us about your event and we&apos;ll be in touch.
          </p>

          <form className="reveal mt-[30px] grid gap-4" noValidate onSubmit={onSubmit}>
            {/* honeypot (hidden from people) */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <label className="field-label">
                Name
                <input name="name" required autoComplete="name" className={`field ${invalid.name ? "invalid" : ""}`} />
              </label>
              <label className="field-label">
                Phone
                <input name="phone" type="tel" autoComplete="tel" className="field" />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <label className="field-label">
                Email
                <input name="email" type="email" required autoComplete="email" className={`field ${invalid.email ? "invalid" : ""}`} />
              </label>
              <label className="field-label">
                Event date
                <input name="date" type="date" className="field" />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <label className="field-label">
                Guests
                <select name="guests" className="field">
                  {GUEST_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label className="field-label">
                Event type
                <select name="type" className="field">
                  {EVENT_TYPES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="field-label">
              Tell us more
              <textarea name="message" rows={3} placeholder="Location, timing, menu ideas, cantina service…" className="field" />
            </label>
            <button type="submit" disabled={sending} className="btn btn--gold mt-1.5 justify-self-start disabled:opacity-60">
              {sending ? "Sending…" : "Request a Quote"}
            </button>
            <p role="status" className={`m-0 min-h-[1.4em] text-[15px] ${status?.tone === "err" ? "text-[#f27b5c]" : "text-teal-bright"}`}>
              {status?.text}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

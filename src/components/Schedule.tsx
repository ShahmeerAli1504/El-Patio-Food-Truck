"use client";

import { useSchedule } from "./ScheduleProvider";
import { ClockIcon, PinIcon } from "./Icons";
import { SOCIAL } from "@/lib/site";

const DATE_BG = ["bg-[#1f5a54]", "bg-terra", "bg-[#2c6c74]"];

export default function Schedule() {
  const s = useSchedule();
  const stops = s?.stops ?? [];

  return (
    <section id="schedule" className="section bg-ink">
      <div className="container-x">
        <header className="section-head">
          <p className="eyebrow reveal">Weekly Schedule</p>
          <h2 className="h2 reveal">Find the Truck</h2>
          <p className="section-head__sub reveal">We pop up across Reno — here&apos;s where the lights are on this week.</p>
        </header>

        <div className="grid grid-cols-3 gap-[22px] max-md:mx-auto max-md:max-w-[520px] max-md:grid-cols-1">
          {stops.length === 0 ? (
            <div className="col-span-full rounded-card border border-line bg-char p-10 text-center">
              <p className="m-0 font-serif text-[22px] font-bold">New dates coming soon</p>
              <p className="text-cream-dim">
                Follow{" "}
                <a href={SOCIAL.instagram.url} target="_blank" rel="noopener" className="text-teal-bright">
                  {SOCIAL.instagram.handle}
                </a>{" "}
                for this week&apos;s stops.
              </p>
            </div>
          ) : (
            stops.map((st, i) => (
              <article
                key={st.date + st.start + st.venue}
                className="reveal relative flex flex-col overflow-hidden rounded-card border border-line bg-char transition duration-[400ms] ease-brand hover:-translate-y-1 hover:border-teal-bright/45"
              >
                <div className={`flex items-center gap-[18px] px-[26px] pb-5 pt-6 text-bone ${DATE_BG[i % 3]}`}>
                  <span className="font-serif text-[46px] font-extrabold leading-[.9]">{st.day}</span>
                  <div>
                    <span className="block font-caps text-[13px] font-bold uppercase tracking-[.28em]">{st.dow}</span>
                    <span className="font-serif text-[17px] italic opacity-90">{st.month}</span>
                  </div>
                  <span className="ml-auto rounded-full bg-black/[.28] px-2.5 pb-1 pt-1.5 font-caps text-[10px] uppercase tracking-[.2em]">
                    {st.status}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-[26px] pb-[26px] pt-6">
                  <h3 className="m-0 font-serif text-[22px] font-bold">
                    {st.venue}
                    <small className="mt-1 block font-caps text-[11px] font-normal uppercase tracking-[.18em] text-cream-dim">{st.venueFull}</small>
                  </h3>
                  <div className="mb-[22px] mt-4 grid gap-1.5 text-[15px] text-cream-dim">
                    <span className="flex items-center gap-2.5">
                      <ClockIcon />
                      {st.timeLabel}
                    </span>
                    <span className="flex items-center gap-2.5">
                      <PinIcon />
                      {st.address}
                    </span>
                  </div>
                  <a
                    href={st.mapsUrl}
                    target="_blank"
                    rel="noopener"
                    className="mt-auto inline-flex items-center gap-2 font-caps text-xs uppercase tracking-[.2em] text-teal-bright hover:text-gold"
                  >
                    Get Directions →
                  </a>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="reveal mt-[46px] text-center text-cream-dim">
          <p>Schedules can change with weather &amp; events — follow along for the latest stop.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a className="btn btn--ghost btn--sm" href={SOCIAL.instagram.url} target="_blank" rel="noopener">
              Instagram
            </a>
            <a className="btn btn--ghost btn--sm" href={SOCIAL.facebook.url} target="_blank" rel="noopener">
              Facebook
            </a>
            <a className="btn btn--ghost btn--sm" href={SOCIAL.tiktok.url} target="_blank" rel="noopener">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

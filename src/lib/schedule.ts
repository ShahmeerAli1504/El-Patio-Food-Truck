import { TIME_ZONE } from "./site";

/* ---- Weekly schedule (edit each week) ----
   Times are Reno wall-clock times (24h). Past stops hide automatically and the hero
   "next stop" pill updates itself. */
export type Stop = {
  date: string; // YYYY-MM-DD
  start: string; // HH:MM
  end: string; // HH:MM
  venue: string;
  venueFull: string;
  address: string;
};

export const SCHEDULE: Stop[] = [
  { date: "2026-10-30", start: "17:00", end: "21:00", venue: "RED", venueFull: "Reno Experience District", address: "2072 Experience Ave, Reno, NV" },
  { date: "2026-10-31", start: "17:00", end: "21:00", venue: "RED", venueFull: "Reno Experience District", address: "2072 Experience Ave, Reno, NV" },
  { date: "2026-11-01", start: "17:00", end: "21:00", venue: "RED", venueFull: "Reno Experience District", address: "2072 Experience Ave, Reno, NV" },
];

export type StopStatus = "Open now" | "Tonight" | "Upcoming";
export type StopView = Stop & {
  startsAt: string; // ISO (UTC)
  endsAt: string;
  day: number;
  dow: string;
  month: string;
  status: StopStatus;
  timeLabel: string;
  mapsUrl: string;
};
export type ScheduleView = {
  generatedAt: string;
  stops: StopView[];
  next: { when: string; live: boolean; label: string } | null;
};

/* ---------- time-zone helpers (no dependencies) ---------- */
function tzOffsetMs(utcMs: number, tz: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(new Date(utcMs));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return asUtc - (utcMs - (utcMs % 1000));
}

/** Reno wall-clock date + time → real instant. */
export function zonedToDate(date: string, time: string, tz = TIME_ZONE) {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  let ts = guess - tzOffsetMs(guess, tz);
  ts = guess - tzOffsetMs(ts, tz); // settle across DST changes
  return new Date(ts);
}

const dayKey = (d: Date, tz = TIME_ZONE) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);

export const fmtTime = (t: string) => {
  const [h0, m] = t.split(":").map(Number);
  const ap = h0 >= 12 ? "PM" : "AM";
  const h = h0 % 12 || 12;
  return h + (m ? ":" + String(m).padStart(2, "0") : "") + ap;
};

export function buildSchedule(now = new Date(), schedule: Stop[] = SCHEDULE, tz = TIME_ZONE): ScheduleView {
  const today = dayKey(now, tz);
  const stops: StopView[] = schedule
    .map((s) => ({ s, start: zonedToDate(s.date, s.start, tz), end: zonedToDate(s.date, s.end, tz) }))
    .filter(({ end }) => end > now)
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .map(({ s, start, end }) => {
      const live = now >= start && now <= end;
      const isToday = s.date === today;
      const [y, m, d] = s.date.split("-").map(Number);
      const local = new Date(Date.UTC(y, m - 1, d, 12)); // noon UTC = same calendar day for labels
      return {
        ...s,
        startsAt: start.toISOString(),
        endsAt: end.toISOString(),
        day: d,
        dow: local.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" }),
        month: local.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" }),
        status: live ? "Open now" : isToday ? "Tonight" : "Upcoming",
        timeLabel: `${fmtTime(s.start)} – ${fmtTime(s.end)}`,
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(s.address),
      };
    });

  let next: ScheduleView["next"] = null;
  if (stops.length) {
    const n = stops[0];
    const live = n.status === "Open now";
    const [y, m, d] = n.date.split("-").map(Number);
    const local = new Date(Date.UTC(y, m - 1, d, 12));
    const when = live
      ? "Open now"
      : n.status === "Tonight"
        ? "Tonight"
        : local.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric", timeZone: "UTC" });
    next = { when, live, label: `${n.venue} Reno · ${fmtTime(n.start)}–${fmtTime(n.end)}` };
  }
  return { generatedAt: now.toISOString(), stops, next };
}

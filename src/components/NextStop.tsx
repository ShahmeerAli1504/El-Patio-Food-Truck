"use client";

import { useSchedule } from "./ScheduleProvider";
import { SOCIAL } from "@/lib/site";

export default function NextStop() {
  const s = useSchedule();
  const next = s?.next;
  return (
    <a
      href="#schedule"
      className="reveal inline-flex items-center gap-3 rounded-full border border-line bg-char/60 py-3 pl-4 pr-5 text-sm text-cream-dim backdrop-blur-[8px] transition-colors duration-300 hover:border-teal [&_b]:font-semibold [&_b]:text-cream"
    >
      <span
        className={`h-[9px] w-[9px] flex-none animate-pulse rounded-full shadow-[0_0_0_0_rgba(92,192,198,.7)] ${
          next?.live ? "bg-[#6ee07a]" : "bg-teal-bright"
        }`}
      />
      <span>
        {next ? (
          <>
            <b>{next.when}</b> · {next.label}
          </>
        ) : (
          <>
            Follow <b>{SOCIAL.instagram.handle}</b> for our next stop
          </>
        )}
      </span>
    </a>
  );
}

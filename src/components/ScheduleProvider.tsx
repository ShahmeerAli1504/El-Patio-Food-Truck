"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ScheduleView } from "@/lib/schedule";

const Ctx = createContext<ScheduleView | null>(null);
export const useSchedule = () => useContext(Ctx);

/** Seeds with the server-rendered schedule, then keeps "Open now / Tonight" fresh from /api/schedule. */
export default function ScheduleProvider({ initial, children }: { initial: ScheduleView; children: React.ReactNode }) {
  const [data, setData] = useState(initial);
  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/schedule", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => alive && d && setData(d))
        .catch(() => {});
    load();
    const t = setInterval(load, 60_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);
  return <Ctx.Provider value={data}>{children}</Ctx.Provider>;
}

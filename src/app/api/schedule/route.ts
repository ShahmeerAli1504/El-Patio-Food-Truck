import { NextResponse } from "next/server";
import { buildSchedule } from "@/lib/schedule";

export const dynamic = "force-dynamic";

/** GET /api/schedule — upcoming stops with live "Open now / Tonight / Upcoming" status (Reno time). */
export function GET() {
  return NextResponse.json(buildSchedule(), {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}

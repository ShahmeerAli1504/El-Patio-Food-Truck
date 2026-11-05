import { NextResponse } from "next/server";
import { MENU, bestSellers } from "@/lib/menu";
import { ORDER_URL, ORDER_PROVIDER } from "@/lib/site";

export const revalidate = 3600;

/** GET /api/menu — full menu, best sellers and the ordering link. */
export function GET() {
  return NextResponse.json({
    orderUrl: ORDER_URL,
    orderProvider: ORDER_PROVIDER,
    categories: MENU,
    bestSellers: bestSellers().map((i) => i.id),
  });
}

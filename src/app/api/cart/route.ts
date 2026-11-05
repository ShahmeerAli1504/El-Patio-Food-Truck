import { NextResponse } from "next/server";
import { priceCart } from "@/lib/menu";
import { ORDER_URL } from "@/lib/site";

/**
 * POST /api/cart  { lines: [{ id, option?, qty }] }
 * Re-prices a cart against the live menu: drops items that no longer exist,
 * fixes stale prices and returns the subtotal + where checkout happens.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const lines = (body as { lines?: unknown })?.lines;
  if (!Array.isArray(lines)) return NextResponse.json({ error: "Expected { lines: [] }" }, { status: 400 });
  return NextResponse.json({ ...priceCart(lines), checkoutUrl: ORDER_URL });
}

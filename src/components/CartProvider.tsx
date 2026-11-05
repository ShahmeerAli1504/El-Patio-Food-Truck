"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { findItem, priceCart, type CartLine, type MenuItem } from "@/lib/menu";

const STORAGE_KEY = "elpatio-cart";

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  bump: number;
  setOpen: (v: boolean) => void;
  add: (item: MenuItem, option?: string | null) => void;
  change: (key: string, delta: number) => void;
  toast: (msg: string) => void;
  toastMsg: string;
  toastShow: boolean;
};

const Ctx = createContext<CartCtx | null>(null);

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside <CartProvider>");
  return c;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [toastMsg, setToastMsg] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const loaded = useRef(false);
  const toastT = useRef<ReturnType<typeof setTimeout>>(undefined);

  // restore saved order, drop items no longer on the menu, refresh prices (locally, then from the server)
  useEffect(() => {
    let saved: CartLine[] = [];
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      saved = [];
    }
    const local = priceCart(Array.isArray(saved) ? saved : []).lines;
    setLines(local);
    loaded.current = true;
    if (local.length) {
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: local.map(({ id, option, qty }) => ({ id, option, qty })) }),
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((res) => res && Array.isArray(res.lines) && setLines(res.lines))
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage blocked — cart still works for this visit */
    }
  }, [lines]);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastShow(true);
    clearTimeout(toastT.current);
    toastT.current = setTimeout(() => setToastShow(false), 2200);
  }, []);

  const add = useCallback(
    (item: MenuItem, option?: string | null) => {
      const real = findItem(item.id);
      if (!real || typeof real.price !== "number") return;
      const opt = real.options ? option || real.options[0] : null;
      const key = real.id + (opt ? ":" + opt : "");
      setLines((prev) => {
        const hit = prev.find((l) => l.key === key);
        if (hit) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
        return [...prev, { key, id: real.id, name: real.name, option: opt, price: real.price!, qty: 1 }];
      });
      setBump((b) => b + 1);
      toast(`Added ${real.name}${opt ? " · " + opt : ""}`);
    },
    [toast],
  );

  const change = useCallback((key: string, delta: number) => {
    setLines((prev) =>
      prev.map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0),
    );
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);
    return { lines, count, subtotal, open, bump, setOpen, add, change, toast, toastMsg, toastShow };
  }, [lines, open, bump, add, change, toast, toastMsg, toastShow]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

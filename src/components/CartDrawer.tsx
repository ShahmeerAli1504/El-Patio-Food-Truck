"use client";

/* eslint-disable @next/next/no-img-element */
import { useCart } from "./CartProvider";
import { money } from "@/lib/format";
import { ORDER_PROVIDER, ORDER_URL } from "@/lib/site";

export default function CartDrawer() {
  const { lines, count, subtotal, open, setOpen, change, toastMsg, toastShow } = useCart();

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[80] bg-black/60 backdrop-blur-[3px] transition-opacity duration-[400ms] ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Your order"
        aria-hidden={!open}
        inert={!open}
        className={`fixed bottom-0 right-0 top-0 z-[90] flex w-[min(420px,100%)] flex-col border-l border-line bg-char transition-transform duration-500 ease-brand ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-[26px] py-6">
          <h3 className="m-0 font-serif text-[26px]">Your Order</h3>
          <button onClick={() => setOpen(false)} aria-label="Close" className="border-0 bg-transparent text-[32px] leading-none text-cream-dim">
            &times;
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-[26px] py-2.5">
          {count === 0 ? (
            <div className="px-2.5 py-[60px] text-center text-cream-dim">
              <img src="/assets/img/logo-sm.png" alt="" className="mx-auto mb-[18px] w-[90px] opacity-60" />
              <p>
                Your order is empty.
                <br />
                Start with our famous enchiladas.
              </p>
            </div>
          ) : (
            lines.map((l) => (
              <div key={l.key} className="flex items-center gap-3.5 border-b border-line py-[18px]">
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-[17px] font-bold">{l.name}</div>
                  {l.option && <div className="text-[13px] text-teal-bright">{l.option}</div>}
                  <div className="text-sm text-cream-dim">{money(l.price)} each</div>
                </div>
                <div className="flex items-center rounded-full border border-line">
                  <button onClick={() => change(l.key, -1)} aria-label="Less" className="h-8 w-8 border-0 bg-transparent text-[17px] text-cream">
                    −
                  </button>
                  <span className="min-w-[18px] text-center text-sm">{l.qty}</span>
                  <button onClick={() => change(l.key, 1)} aria-label="More" className="h-8 w-8 border-0 bg-transparent text-[17px] text-cream">
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="border-t border-line px-[26px] pb-7 pt-[22px]">
          <div className="flex items-baseline justify-between font-caps text-[13px] uppercase tracking-[.16em]">
            <span>Subtotal</span>
            <strong className="font-serif text-[28px] tracking-normal text-gold">{money(subtotal)}</strong>
          </div>
          <p className="mb-[18px] mt-1.5 text-[13px] text-cream-dim">
            Checkout happens on {ORDER_PROVIDER} — it opens in a new tab. Add the items above there to place your order.
          </p>
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener"
            aria-disabled={!count}
            className={`btn btn--gold w-full ${count ? "" : "disabled"}`}
          >
            Checkout on {ORDER_PROVIDER}
          </a>
        </footer>
      </aside>

      <div
        role="status"
        className={`fixed bottom-7 left-1/2 z-[95] max-w-[calc(100%-32px)] -translate-x-1/2 overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-cream px-[22px] py-[13px] text-[15px] font-medium text-ink shadow-[0_16px_40px_-10px_rgba(0,0,0,.7)] transition-all duration-[450ms] ease-brand ${
          toastShow ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[180%] opacity-0"
        }`}
      >
        {toastMsg}
      </div>
    </>
  );
}

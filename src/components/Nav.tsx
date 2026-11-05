"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { BagIcon } from "./Icons";
import { NAV_LINKS, ORDER_URL } from "@/lib/site";

export default function Nav() {
  const { count, bump, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bumping, setBumping] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // little bounce on the bag whenever something is added
  useEffect(() => {
    if (!bump) return;
    setBumping(false);
    const r = requestAnimationFrame(() => setBumping(true));
    const t = setTimeout(() => setBumping(false), 450);
    return () => {
      cancelAnimationFrame(r);
      clearTimeout(t);
    };
  }, [bump]);

  // Logo = back to the top of the page (smooth, works every click, keeps the URL clean)
  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background,backdrop-filter,border-color] duration-[400ms] ${
        scrolled ? "border-line bg-ink/[.82] backdrop-blur-[14px]" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-[min(1280px,100%-40px)] items-center justify-between max-sm:h-[72px] max-sm:w-[calc(100%-32px)]">
        <a href="#top" onClick={toTop} aria-label="El Patio home" className="cursor-pointer transition-opacity duration-300 hover:opacity-85">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/img/logo-sm.png" alt="El Patio Street Eats" className="h-[46px] w-auto max-sm:h-[38px]" />
        </a>

        <nav
          className={`flex gap-[34px] font-caps text-[13px] font-semibold uppercase tracking-[.2em] max-lg:gap-[22px]
            max-md:fixed max-md:inset-x-0 max-md:top-20 max-md:-z-10 max-md:flex-col max-md:gap-0 max-md:border-b max-md:border-line max-md:bg-ink/[.97] max-md:px-5 max-md:pb-6 max-md:pt-2.5 max-md:backdrop-blur-[14px] max-md:transition-transform max-md:duration-500 max-md:ease-brand max-sm:top-[72px]
            ${menuOpen ? "max-md:translate-y-0" : "max-md:-translate-y-[120%]"}`}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="group relative py-1.5 text-cream-dim transition-colors duration-300 hover:text-cream max-md:border-b max-md:border-line max-md:py-4"
            >
              {l.label}
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-[400ms] ease-brand group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3.5">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open your order"
            className={`relative grid h-11 w-11 place-items-center rounded-full border border-line bg-white/[.03] transition-colors duration-300 hover:border-gold ${
              bumping ? "animate-bump" : ""
            }`}
          >
            <BagIcon />
            <span
              className={`absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-[10px] bg-terra px-[5px] text-[11px] font-semibold text-white transition-transform duration-300 ease-brand ${
                count > 0 ? "scale-100" : "scale-0"
              }`}
            >
              {count}
            </span>
          </button>
          <a href={ORDER_URL} target="_blank" rel="noopener" className="btn btn--gold btn--sm max-md:hidden">
            Order Online
          </a>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="relative hidden h-11 w-11 border-0 bg-transparent max-md:block"
          >
            <span
              className={`absolute inset-x-[11px] h-[1.5px] bg-cream transition-[transform,top] duration-[350ms] ease-brand ${
                menuOpen ? "top-[21px] rotate-45" : "top-[17px]"
              }`}
            />
            <span
              className={`absolute inset-x-[11px] h-[1.5px] bg-cream transition-[transform,top] duration-[350ms] ease-brand ${
                menuOpen ? "top-[21px] -rotate-45" : "top-[26px]"
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}

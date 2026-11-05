"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import Lights from "./Lights";
import { money } from "@/lib/format";
import type { MenuCategory, MenuItem } from "@/lib/menu";
import { ORDER_PROVIDER } from "@/lib/site";

function AddButton({ item, option, small, className = "" }: { item: MenuItem; option?: string | null; small?: boolean; className?: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(t.current), []);
  return (
    <button
      className={`add-btn ${added ? "added" : ""} ${small ? "!h-9 !w-9 !self-center !text-[19px]" : ""} ${className}`}
      aria-label={`Add ${item.name}`}
      onClick={() => {
        add(item, option);
        setAdded(true);
        clearTimeout(t.current);
        t.current = setTimeout(() => setAdded(false), 1100);
      }}
    >
      {added ? "✓" : "+"}
    </button>
  );
}

function Dish({ item }: { item: MenuItem }) {
  const [opt, setOpt] = useState(item.options?.[0] ?? null);
  return (
    <article
      className={`group relative flex gap-[18px] rounded-card border border-line bg-white/[.015] px-[26px] pb-6 pt-[26px] transition duration-[350ms] ease-brand hover:-translate-y-[3px] hover:border-gold/45 hover:bg-gold/[.03] max-sm:gap-3.5 max-sm:px-[18px] max-sm:pb-5 max-sm:pt-[22px] ${
        item.img ? "items-stretch" : ""
      }`}
    >
      {item.img && (
        <div className="w-[132px] flex-none overflow-hidden rounded-xl bg-black max-sm:w-24">
          <img src={item.img} alt={item.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.06]" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        {item.rank && (
          <span className="mb-2 inline-block rounded-full bg-terra px-[11px] pb-[3px] pt-[5px] font-caps text-[11px] font-semibold uppercase tracking-[.16em] text-bone max-sm:text-[10px]">
            #{item.rank} Best Seller
          </span>
        )}
        <div className="flex items-baseline gap-3 max-sm:flex-wrap max-sm:gap-x-2.5 max-sm:gap-y-0.5">
          <h4 className="m-0 font-serif text-[23px] font-bold leading-[1.2] max-sm:w-full max-sm:text-xl">{item.name}</h4>
          <span className="dots max-sm:hidden" />
          {item.price != null && <span className="font-serif text-[22px] font-bold text-gold max-sm:text-[19px]">{money(item.price)}</span>}
        </div>
        <p className="mt-2.5 text-[15.5px] leading-[1.6] text-cream-dim">{item.desc}</p>
        {item.options && (
          <div className="mt-3.5 flex flex-wrap gap-2">
            {item.options.map((o) => (
              <button
                key={o}
                onClick={() => setOpt(o)}
                aria-pressed={opt === o}
                className={`rounded-full border bg-transparent px-3.5 pb-1 pt-1.5 text-[13px] transition-all duration-[250ms] ${
                  opt === o ? "border-gold text-gold" : "border-line text-cream-dim"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        )}
        {item.tag && (
          <span className="mt-3 inline-block rounded-full border border-teal-bright/35 px-[11px] pb-[3px] pt-[5px] font-caps text-[11px] uppercase tracking-[.16em] text-teal-bright">
            {item.tag}
          </span>
        )}
      </div>
      {item.price != null && <AddButton item={item} option={opt} className="max-sm:!h-[38px] max-sm:!w-[38px] max-sm:!text-[19px]" />}
    </article>
  );
}

function Card({ item }: { item: MenuItem }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-line bg-black transition duration-[400ms] ease-brand hover:-translate-y-[5px] hover:border-gold/45">
      <div className="grid aspect-[1/1.05] place-items-center overflow-hidden bg-black">
        <img src={item.img} alt={item.name} loading="lazy" className="h-full w-full object-contain transition-transform duration-700 ease-brand group-hover:scale-[1.06]" />
      </div>
      <div className="flex flex-1 items-end gap-3 border-t border-line bg-char px-5 pb-5 pt-[18px] max-sm:flex-col max-sm:items-stretch max-sm:p-3.5">
        <div className="flex-1">
          <h4 className="m-0 font-serif text-xl leading-[1.2] max-sm:text-[17px]">{item.name}</h4>
          <p className="mt-1 text-sm leading-normal text-cream-dim">{item.desc}</p>
          {item.price != null ? (
            <span className="mt-1.5 block font-serif text-lg font-bold text-gold">{money(item.price)}</span>
          ) : (
            <span className="mt-1.5 block font-caps text-[11px] font-semibold uppercase tracking-[.16em] text-teal-bright">Price at the window</span>
          )}
        </div>
        {item.price != null && <AddButton item={item} className="max-sm:!h-[38px] max-sm:!w-[38px] max-sm:!self-end" />}
      </div>
    </article>
  );
}

function BestSellers({ items }: { items: MenuItem[] }) {
  if (!items.length) return null;
  return (
    <div className="mx-auto mb-14">
      <p className="mb-[22px] text-center font-caps text-[13px] uppercase tracking-[.24em] text-gold">✦ Best Sellers ✦</p>
      <div className="no-scrollbar grid grid-cols-3 gap-[22px] max-md:snap-x max-md:snap-mandatory max-md:grid-cols-[repeat(3,minmax(240px,1fr))] max-md:overflow-x-auto max-md:pb-2 max-sm:grid-cols-[repeat(3,78%)] max-sm:gap-3.5">
        {items.map((it) => (
          <article
            key={it.id}
            className="group flex snap-start flex-col overflow-hidden rounded-card border border-line bg-char transition duration-[400ms] ease-brand hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_26px_50px_-24px_rgba(0,0,0,.9)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-black">
              <img src={it.img} alt={it.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.06]" />
              <span className="absolute left-3.5 top-3.5 grid h-[50px] w-[50px] -rotate-[8deg] place-items-center rounded-full border-2 border-dashed border-bone/50 bg-terra font-serif text-[19px] font-bold italic text-bone shadow-[0_10px_20px_-8px_rgba(0,0,0,.7)] outline outline-4 outline-terra">
                #{it.rank}
              </span>
            </div>
            <div className="flex items-end justify-between gap-3 border-t border-line px-5 pb-5 pt-[18px]">
              <div>
                <h4 className="m-0 font-serif text-[22px] leading-[1.2] max-sm:text-[19px]">{it.name}</h4>
                <span className="mt-1 block font-serif text-[19px] font-bold text-gold">{money(it.price!)}</span>
              </div>
              <AddButton item={it} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Menu({ categories, best }: { categories: MenuCategory[]; best: MenuItem[] }) {
  const [active, setActive] = useState(categories[0]?.id);
  const cat = categories.find((c) => c.id === active) ?? categories[0];

  return (
    <section id="menu" className="section bg-gradient-to-b from-char to-ink pt-[170px] max-md:pt-[90px]">
      <Lights swags={4} sag={38} top={0} />
      <div className="container-x">
        <header className="section-head">
          <p className="eyebrow reveal">Order Online · via {ORDER_PROVIDER}</p>
          <h2 className="h2 reveal">El Menú</h2>
          <p className="section-head__sub reveal">
            Tap <b>+</b> to build your order, then finish your order on {ORDER_PROVIDER}.
          </p>
        </header>

        <BestSellers items={best} />

        <div
          role="tablist"
          className="no-scrollbar sticky top-[88px] z-[5] mx-auto mb-[50px] flex w-fit max-w-full flex-wrap justify-center gap-2.5 rounded-full border border-line bg-ink/85 p-2.5 backdrop-blur-md max-sm:top-20 max-sm:w-full max-sm:flex-nowrap max-sm:justify-start max-sm:gap-1 max-sm:overflow-x-auto max-sm:rounded-[18px] max-sm:p-1.5"
        >
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={c.id === cat.id}
              className={`tab-btn ${c.id === cat.id ? "active" : ""}`}
              onClick={(e) => {
                setActive(c.id);
                e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
              }}
            >
              {c.tab}
            </button>
          ))}
        </div>

        <div key={cat.id} role="tabpanel" className="animate-fadeUp">
          <div className="mb-9 text-center">
            <h3 className="m-0 font-serif text-[34px] font-bold">{cat.title}</h3>
            <p className="mt-1.5 font-serif italic text-cream-dim">{cat.sub}</p>
            {cat.intro && <p className="mx-auto mt-3.5 max-w-[720px] font-sans text-base not-italic leading-[1.7] text-cream-dim">{cat.intro}</p>}
          </div>

          {cat.layout === "list" ? (
            <div className="grid grid-cols-2 gap-[22px] max-md:grid-cols-1">
              {cat.items.map((it) => (
                <Dish key={it.id} item={it} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-[22px] max-sm:grid-cols-2 max-sm:gap-3">
                {cat.items.map((it) => (
                  <Card key={it.id} item={it} />
                ))}
              </div>
              {cat.extras && (
                <div className="mt-[22px] grid grid-cols-[220px_1fr] overflow-hidden rounded-card border border-line bg-char max-sm:grid-cols-1">
                  <div className="bg-black max-sm:aspect-video">
                    <img src={cat.extrasImg} alt={cat.extrasTitle} loading="lazy" className="block h-full w-full object-cover" />
                  </div>
                  <div className="px-[26px] pb-4 pt-[22px] max-sm:px-[18px] max-sm:pb-2.5 max-sm:pt-[18px]">
                    <h4 className="mb-1.5 mt-0 font-serif text-[22px]">{cat.extrasTitle}</h4>
                    {cat.extras.map((it) => (
                      <div key={it.id} className="flex items-center gap-3 border-b border-line py-2.5 last:border-b-0">
                        <span className="text-base">{it.name}</span>
                        <span className="dots !translate-y-0" />
                        <span className="font-serif text-[17px] font-bold text-gold">{money(it.price!)}</span>
                        <AddButton item={it} small />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {cat.credit && <p className="mt-[30px] text-center font-caps text-xs uppercase tracking-[.2em] text-cream-dim">{cat.credit}</p>}
            </>
          )}
        </div>

        <div className="mt-14 text-center text-[15px] text-cream-dim">
          <p className="my-1.5">
            <span className="text-gold">✦</span> Rice &amp; beans included with all Enchiladas and Dorados plates
          </p>
          <p className="my-1.5 font-medium text-[#f27b5c]">Please notify us of any food allergies</p>
        </div>
      </div>
    </section>
  );
}

"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import InViewVideo from "./InViewVideo";
import { InstagramIcon, TikTokIcon } from "./Icons";
import { GALLERY, GALLERY_TABS } from "@/lib/gallery";
import { SOCIAL } from "@/lib/site";

export default function Gallery() {
  const [filter, setFilter] = useState<string>("all");

  return (
    <section id="gallery" className="section bg-char">
      <div className="container-x">
        <header className="section-head">
          <p className="eyebrow reveal">Gallery</p>
          <h2 className="h2 reveal">
            The truck, the plates, <em>the people.</em>
          </h2>
          <p className="section-head__sub reveal">
            Clay platos piled high, hibiscus and dried citrus behind the bar, and string lights after sundown — this is El Patio.
          </p>
        </header>

        <div
          role="tablist"
          className="no-scrollbar mx-auto mb-[50px] flex w-fit max-w-full flex-wrap justify-center gap-2.5 rounded-full border border-line bg-ink/85 p-2.5 backdrop-blur-md max-sm:w-full max-sm:flex-nowrap max-sm:justify-start max-sm:gap-1 max-sm:overflow-x-auto max-sm:rounded-[18px] max-sm:p-1.5"
        >
          {GALLERY_TABS.map(([k, label]) => (
            <button key={k} role="tab" aria-selected={filter === k} className={`tab-btn ${filter === k ? "active" : ""}`} onClick={() => setFilter(k)}>
              {label}
            </button>
          ))}
        </div>

        <div className="[column-gap:18px] [columns:3_300px] max-sm:[column-gap:10px] max-sm:[columns:2_150px]">
          {GALLERY.map((g) => (
            <figure
              key={g.src}
              className={`group relative m-0 mb-[18px] break-inside-avoid overflow-hidden rounded-card border border-line bg-black max-sm:mb-2.5 ${
                filter !== "all" && g.cat !== filter ? "hidden" : ""
              } ${
                g.type === "video"
                  ? "after:absolute after:right-3.5 after:top-3.5 after:h-2.5 after:w-2.5 after:rounded-full after:bg-terra after:shadow-[0_0_0_4px_rgba(198,91,51,.3)]"
                  : ""
              }`}
            >
              {g.type === "video" ? (
                <InViewVideo
                  src={g.src}
                  poster={g.poster}
                  label={g.cap}
                  className="aspect-[9/16] h-auto w-full object-cover transition-transform duration-[800ms] ease-brand group-hover:scale-[1.04]"
                />
              ) : (
                <img src={g.src} alt={g.alt} loading="lazy" className="h-auto w-full transition-transform duration-[800ms] ease-brand group-hover:scale-[1.04]" />
              )}
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3.5 pt-[46px] font-serif text-lg italic max-sm:px-3 max-sm:pb-2.5 max-sm:pt-9 max-sm:text-[15px]">
                {g.cap}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="reveal mx-auto mt-[50px] grid max-w-[760px] grid-cols-2 gap-[18px] max-sm:grid-cols-1">
          {[
            { url: SOCIAL.instagram.url, name: "Instagram", handle: SOCIAL.instagram.handle, icon: <InstagramIcon size={22} /> },
            { url: SOCIAL.tiktok.url, name: "TikTok", handle: SOCIAL.tiktok.handle, icon: <TikTokIcon size={22} /> },
          ].map((f) => (
            <a
              key={f.name}
              href={f.url}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-4 rounded-card border border-line bg-white/[.02] px-[22px] py-5 transition duration-[350ms] ease-brand hover:-translate-y-[3px] hover:border-gold"
            >
              <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-teal text-[#08171a]">{f.icon}</span>
              <span>
                <small className="block font-caps text-[11px] uppercase tracking-[.2em] text-cream-dim">{f.name}</small>
                <strong className="font-serif text-xl">{f.handle}</strong>
              </span>
              <span className="ml-auto font-caps text-xs uppercase tracking-[.18em] text-gold">Follow →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

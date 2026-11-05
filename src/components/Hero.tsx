import Lights from "./Lights";
import NextStop from "./NextStop";
import { ORDER_URL } from "@/lib/site";

/* eslint-disable @next/next/no-img-element */
export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden pb-[90px] pt-[130px] max-md:pt-[110px]">
      <div
        className="absolute -inset-[4%] scale-[1.04] animate-slowzoom bg-cover bg-[center_60%]"
        style={{ backgroundImage: "url('/assets/img/gallery/truck-night.jpg')" }}
      />
      <div className="hero-shade absolute inset-0" />
      <Lights swags={3} sag={46} top={78} />

      <div className="container-x relative z-[3] grid grid-cols-[1.15fr_.85fr] items-center gap-[60px] max-md:grid-cols-1 max-md:gap-[50px] max-md:text-center">
        <div>
          <p className="eyebrow reveal max-md:justify-center max-md:text-xs max-md:tracking-[.24em] max-md:before:hidden">
            Food Truck &amp; Cantina · Reno, Nevada
          </p>
          <img
            className="reveal -ml-1.5 mb-[18px] w-[min(420px,82%)] drop-shadow-[0_10px_40px_rgba(0,0,0,.6)] max-md:mx-auto"
            src="/assets/img/logo.png"
            alt="El Patio Street Eats"
          />
          <h1 className="hero-title reveal mb-[22px] font-serif text-[clamp(44px,6vw,82px)] font-extrabold leading-none tracking-[-.015em]">
            Bold flavors.
            <br />
            <em>Real ingredients.</em>
          </h1>
          <p className="reveal mb-[34px] max-w-[520px] text-lg text-cream-dim max-md:mx-auto">
            Enchiladas bathed in house-made sauces, crispy tacos dorados, aguas frescas poured over ice — served from our
            window under the string lights.
          </p>
          <div className="reveal mb-[34px] flex flex-wrap gap-3.5 max-md:justify-center">
            <a href={ORDER_URL} target="_blank" rel="noopener" className="btn btn--gold">
              Order Online
            </a>
            <a href="#schedule" className="btn btn--ghost">
              Where&apos;s the Truck?
            </a>
          </div>
          <NextStop />
        </div>

        <div className="reveal relative w-[min(380px,100%)] justify-self-center max-md:w-[min(300px,80%)]">
          <div className="relative aspect-[9/15] overflow-hidden rounded-[999px_999px_22px_22px] border border-cream/25 shadow-[0_40px_80px_-30px_rgba(0,0,0,.9),0_0_0_10px_rgba(11,10,9,.5),0_0_0_11px_rgba(242,228,203,.12)] after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:from-60% after:to-ink/55">
            <video autoPlay muted loop playsInline preload="auto" poster="/assets/video/hero.jpg" className="h-full w-full object-cover">
              <source src="/assets/video/hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="stamp absolute -left-[54px] bottom-[60px] flex h-[132px] w-[132px] -rotate-[10deg] flex-col items-center justify-center text-center font-caps text-[10px] uppercase leading-[1.4] tracking-[.2em] max-md:-left-10 max-md:h-[110px] max-md:w-[110px] max-sm:-left-6">
            <span>Famous</span>
            <strong className="font-serif text-[21px] font-semibold normal-case italic tracking-normal max-md:text-lg">Enchiladas</strong>
            <span>since day one</span>
          </div>
        </div>
      </div>

      <a
        href="#signature"
        aria-label="Scroll down"
        className="absolute bottom-7 left-1/2 z-[3] h-[42px] w-[26px] -translate-x-1/2 rounded-[14px] border border-cream/40"
      >
        <span className="absolute left-1/2 top-2 -ml-[1.5px] h-2 w-[3px] animate-scrollcue rounded-sm bg-gold" />
      </a>
    </section>
  );
}

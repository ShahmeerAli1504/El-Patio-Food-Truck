/* eslint-disable @next/next/no-img-element */
import InViewVideo from "./InViewVideo";
const MARQUEE = ["Enchiladas Suizas", "Tacos Dorados", "Quesadillas Locas", "Agua de Jamaica", "Horchata", "Fresas con Crema", "Artisan Paletas", "Churros"];

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-black/40 bg-teal text-[#08171a]" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center pb-3.5 pt-4">
        {[...MARQUEE, ...MARQUEE].map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="whitespace-nowrap px-[26px] font-serif text-[22px] font-semibold italic">{t}</span>
            <i className="h-3.5 w-3.5 flex-none rotate-45 bg-ink" />
          </span>
        ))}
      </div>
    </div>
  );
}

const FACTS = [
  ["3", "Signature", "sauces"],
  ["100%", "Sprouted corn", "tortillas"],
  ["Local", "Paletas from", "Paletería La Paz"],
];

export default function Signature() {
  return (
    <section id="signature" className="section">
      <div className="container-x grid grid-cols-[.9fr_1.1fr] items-center gap-[90px] max-md:grid-cols-1 max-md:gap-14">
        <figure className="reveal relative m-0 max-md:mx-auto max-md:w-full max-md:max-w-[460px]">
          <span className="absolute inset-[18px_-18px_-18px_18px] -z-10 rounded-[240px_240px_18px_18px] border border-teal/50" />
          <InViewVideo
            src="/assets/video/tacos-plate.mp4"
            poster="/assets/video/tacos-plate.jpg"
            label="Tacos dorados and enchiladas on clay plates, fresh off the fryer"
            className="aspect-[4/5] w-full rounded-[240px_240px_18px_18px] bg-black object-cover"
          />
          <figcaption className="absolute bottom-[22px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/[.78] px-[18px] pb-1.5 pt-2 font-caps text-xs uppercase tracking-[.2em] backdrop-blur-[8px]">
            Fresh off the fryer
          </figcaption>
        </figure>

        <div>
          <p className="eyebrow reveal">La Especialidad de la Casa</p>
          <h2 className="h2 reveal">
            Enchiladas worth <em>tracking down.</em>
          </h2>
          <div className="reveal mb-[26px] mt-1 flex max-w-[360px] items-center gap-4">
            <span className="h-px flex-1 bg-line" />
            <img src="/assets/img/logo-sm.png" alt="" className="w-[54px] opacity-90" />
            <span className="h-px flex-1 bg-line" />
          </div>
          <p className="reveal text-cream-dim">
            Every plate starts with sprouted corn tortillas, tender chicken and sauces we make from scratch — creamy tomatillo,
            smoky chipotle, bright salsa verde. Finished with crema, queso and fresh onion, then served the way it should be: on a
            clay plate with rice and beans.
          </p>
          <ul className="reveal mb-10 mt-[34px] grid list-none grid-cols-3 border-y border-line p-0">
            {FACTS.map(([big, a, b], i) => (
              <li key={big} className={`px-2.5 py-[22px] text-center ${i ? "border-l border-line" : ""}`}>
                <strong className="block font-serif text-[34px] leading-[1.1] text-gold max-sm:text-[26px]">{big}</strong>
                <span className="font-caps text-[11px] uppercase leading-normal tracking-[.18em] text-cream-dim">
                  {a}
                  <br />
                  {b}
                </span>
              </li>
            ))}
          </ul>
          <a href="#menu" className="btn btn--ghost reveal">
            Explore the Menu
          </a>
        </div>
      </div>
    </section>
  );
}

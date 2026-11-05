/* eslint-disable @next/next/no-img-element */
import { COCKTAILS } from "@/lib/gallery";

export default function Cantina() {
  return (
    <section id="cantina" className="section isolate overflow-hidden">
      <div
        className="absolute -inset-[30px] -z-10 bg-cover bg-center blur-[10px] brightness-[.8] saturate-[.9] after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgba(11,10,9,.96)_0%,rgba(11,10,9,.85)_45%,rgba(20,12,6,.6)_100%)]"
        style={{ backgroundImage: "url('/assets/img/gallery/cocktails-duo.jpg')" }}
      />
      <div className="container-x relative grid grid-cols-[.9fr_1.1fr] items-center gap-[70px] max-md:grid-cols-1 max-md:gap-14">
        <div>
          <p className="eyebrow reveal">El Patio Cantina</p>
          <h2 className="h2 reveal">
            Pour something <em>bold.</em>
          </h2>
          <p className="reveal text-cream-dim">
            Hand-shaken cocktails made with fresh citrus, hibiscus and a little heat. Available at select events and private bookings.
          </p>
          <p className="reveal font-caps text-xs uppercase tracking-[.22em] text-gold">21+ · Please drink responsibly</p>
        </div>
        <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
          {COCKTAILS.map((c) => (
            <article
              key={c.name}
              className="reveal group flex flex-col items-center rounded-card border border-line bg-ink/55 px-[22px] py-[26px] text-center backdrop-blur-[6px] transition duration-[400ms] ease-brand hover:-translate-y-[5px] hover:border-gold/50"
            >
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                className="mb-4 h-[120px] w-[120px] rounded-full object-cover shadow-[0_16px_30px_-10px_rgba(0,0,0,.8)] transition-transform duration-[800ms] ease-brand group-hover:rotate-[25deg] group-hover:scale-105"
              />
              <div>
                <h3 className={`mb-1.5 mt-0 font-serif text-[22px] ${c.color}`}>{c.name}</h3>
                <p className="m-0 text-[14.5px] leading-[1.55] text-cream-dim">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

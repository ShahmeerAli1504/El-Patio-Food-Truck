import InViewVideo from "./InViewVideo";
import { REELS } from "@/lib/gallery";

export default function Reels() {
  return (
    <section id="reels" className="section bg-gradient-to-b from-ink to-char">
      <div className="container-x">
        <header className="section-head">
          <p className="eyebrow reveal">Behind the Window</p>
          <h2 className="h2 reveal">Life on El Patio</h2>
          <p className="section-head__sub reveal">Fresh tomatillos, hot fryers, happy regulars — a peek at a night with us.</p>
        </header>
        <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:gap-3">
          {REELS.map((r, i) => (
            <figure
              key={r.src}
              className={`reveal group relative m-0 aspect-[9/16] overflow-hidden rounded-card border border-line bg-black ${i % 2 ? "reel-offset" : ""}`}
            >
              <InViewVideo
                src={r.src}
                poster={r.poster}
                className="h-full w-full object-cover transition-transform duration-[800ms] ease-brand group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-[18px] pb-[18px] pt-[50px] font-serif text-xl italic">
                {r.cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

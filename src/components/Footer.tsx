/* eslint-disable @next/next/no-img-element */
import Lights from "./Lights";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./Icons";
import { CONTACT, ORDER_PROVIDER, ORDER_URL, SOCIAL } from "@/lib/site";

const h4 = "mb-[18px] mt-2 font-caps text-xs uppercase tracking-[.28em] text-terra";
const p = "mb-2.5 mt-0 text-[15px] text-cream-dim";
const social = "grid h-[42px] w-[42px] place-items-center rounded-full border border-line transition-colors duration-300 hover:border-gold hover:text-gold";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-[#070605] pb-[30px] pt-[150px]">
      <Lights swags={4} sag={34} top={0} />
      <div className="container-x grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <div>
          <img src="/assets/img/logo.png" alt="El Patio Street Eats" className="mb-4 w-[220px]" />
          <p className={p}>
            Bold Flavors. Real Ingredients.
            <br />
            Food Truck &amp; Cantina · Reno, NV
          </p>
        </div>
        <div>
          <h4 className={h4}>Visit</h4>
          <p className={p}>
            Home base: {CONTACT.homeBase.venue}
            <br />
            {CONTACT.homeBase.address}
          </p>
          <p className={p}>
            {CONTACT.hours} <span className="opacity-60">(check schedule)</span>
          </p>
        </div>
        <div>
          <h4 className={h4}>Contact</h4>
          <p className={p}>
            <a href={`mailto:${CONTACT.email}`} className="hover:text-gold">{CONTACT.email}</a>
          </p>
          <p className={p}>
            <a href={CONTACT.linktree} target="_blank" rel="noopener" className="hover:text-gold">
              linktr.ee/elpationv
            </a>
          </p>
          <p className={p}>
            <a href={ORDER_URL} target="_blank" rel="noopener" className="hover:text-gold">
              Delivery on {ORDER_PROVIDER}
            </a>
          </p>
        </div>
        <div>
          <h4 className={h4}>Follow</h4>
          <div className="mb-5 flex gap-2.5">
            <a href={SOCIAL.instagram.url} target="_blank" rel="noopener" aria-label="Instagram" className={social}>
              <InstagramIcon />
            </a>
            <a href={SOCIAL.facebook.url} target="_blank" rel="noopener" aria-label="Facebook" className={social}>
              <FacebookIcon />
            </a>
            <a href={SOCIAL.tiktok.url} target="_blank" rel="noopener" aria-label="TikTok" className={social}>
              <TikTokIcon />
            </a>
          </div>
          <a href={ORDER_URL} target="_blank" rel="noopener" className="btn btn--gold btn--sm">
            Order Online
          </a>
        </div>
      </div>
      <div className="container-x mt-[60px] flex flex-wrap justify-between gap-2.5 border-t border-line pt-6 text-[13px] text-cream/50">
        <span>© {new Date().getFullYear()} El Patio Street Eats. All rights reserved.</span>
        <span>
          Website by{" "}
          <a href="https://www.nexoradigital.live" target="_blank" rel="noopener" className="text-cream-dim hover:text-gold">
            Nexora Digital
          </a>
        </span>
      </div>
    </footer>
  );
}

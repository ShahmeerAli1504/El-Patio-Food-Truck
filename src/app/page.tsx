import CartProvider from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import Cantina from "@/components/Cantina";
import Catering from "@/components/Catering";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Nav from "@/components/Nav";
import Reels from "@/components/Reels";
import RevealObserver from "@/components/RevealObserver";
import Schedule from "@/components/Schedule";
import ScheduleProvider from "@/components/ScheduleProvider";
import Signature, { Marquee } from "@/components/Signature";
import { MENU, bestSellers } from "@/lib/menu";
import { buildSchedule } from "@/lib/schedule";
import { CONTACT, SOCIAL } from "@/lib/site";

// re-render at most once a minute so "Open now / Tonight" stays accurate for crawlers too
export const revalidate = 60;

export default function Home() {
  const schedule = buildSchedule();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "El Patio Street Eats",
    servesCuisine: "Mexican",
    email: CONTACT.email,
    address: { "@type": "PostalAddress", streetAddress: "2072 Experience Ave", addressLocality: "Reno", addressRegion: "NV", addressCountry: "US" },
    sameAs: [SOCIAL.instagram.url, SOCIAL.facebook.url, SOCIAL.tiktok.url],
    image: "/assets/img/gallery/truck-night.jpg",
  };

  return (
    <CartProvider>
      <ScheduleProvider initial={schedule}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Signature />
          <Menu categories={MENU} best={bestSellers()} />
          <Schedule />
          <Cantina />
          <Gallery />
          <Reels />
          <Catering />
        </main>
        <Footer />
        <CartDrawer />
        <RevealObserver />
      </ScheduleProvider>
    </CartProvider>
  );
}

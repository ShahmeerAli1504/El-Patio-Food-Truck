import type { Metadata, Viewport } from "next";
import { Jost, Josefin_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const caps = Josefin_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-caps", display: "swap" });
const sans = Jost({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.elpatioreno.com"),
  title: "El Patio Food Truck | Street Eats & Cantina · Reno, NV",
  description:
    "El Patio Street Eats — Reno's food truck & cantina. Famous enchiladas suizas, tacos dorados, aguas frescas, artisan paletas and catering. Bold flavors. Real ingredients.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "El Patio Food Truck · Reno, NV",
    description: "Bold Flavors. Real Ingredients. Food Truck & Cantina — catering available.",
    images: ["/assets/img/gallery/truck-night.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0c0b0a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${caps.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

/* ---- Site-wide config: change these in one place ---- */

// For now all ordering goes to DoorDash. When the client moves to Square online ordering
// for truck pickup, set NEXT_PUBLIC_ORDER_URL (or change the fallback below).
export const ORDER_URL =
  process.env.NEXT_PUBLIC_ORDER_URL || "https://www.doordash.com/store/el-patio-food-truck-reno-51259023/";

export const ORDER_PROVIDER = "DoorDash";

/** The truck's home time zone — all schedule times are Reno wall-clock times. */
export const TIME_ZONE = "America/Los_Angeles";

export const CONTACT = {
  email: "elpationv@gmail.com",
  linktree: "https://linktr.ee/elpationv",
  homeBase: { venue: "RED · Reno Experience District", address: "2072 Experience Ave, Reno, NV" },
  hours: "Fri–Sun · 5PM–9PM",
};

export const SOCIAL = {
  instagram: { url: "https://www.instagram.com/elpatioreno/", handle: "@elpatioreno" },
  facebook: { url: "https://www.facebook.com/ElPatioReno" },
  tiktok: { url: "https://www.tiktok.com/@elpatioreno", handle: "@elpatioreno" },
};

export const NAV_LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#schedule", label: "Find Us" },
  { href: "#cantina", label: "Cantina" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reels", label: "Behind the Window" },
  { href: "#catering", label: "Catering" },
];

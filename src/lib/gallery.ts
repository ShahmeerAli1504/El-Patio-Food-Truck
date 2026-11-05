/* ---- Gallery (photos + short clips) ---- */
export type GalleryCat = "food" | "cantina" | "truck" | "crew";
export type GalleryItem = {
  cat: GalleryCat;
  type: "img" | "video";
  src: string;
  poster?: string;
  alt?: string;
  cap: string;
  wide?: boolean;
};

export const GALLERY: GalleryItem[] = [
  { cat: "truck", type: "img", src: "/assets/img/gallery/truck-night.jpg", alt: "El Patio food truck lit up at night with colored lights, cacti and the BAR sign", cap: "Lights on at RED", wide: true },
  { cat: "food", type: "img", src: "/assets/img/gallery/enchiladas-suizas.jpg", alt: "Enchiladas suizas in creamy tomatillo sauce with rice and beans on a clay plate", cap: "Enchiladas Suizas" },
  { cat: "cantina", type: "video", src: "/assets/video/cantina-crew.mp4", poster: "/assets/video/cantina-crew.jpg", cap: "The cantina crew in action" },
  { cat: "food", type: "img", src: "/assets/img/gallery/tacos-dorados.jpg", alt: "Tacos dorados topped with pickled red onion and crema, with red rice and beans", cap: "Tacos Dorados" },
  { cat: "truck", type: "img", src: "/assets/img/gallery/truck-side.jpg", alt: "Side of the El Patio trailer with agave artwork beside the string-lit patio canopy", cap: "Under the string lights" },
  { cat: "cantina", type: "img", src: "/assets/img/gallery/cocktails-duo.jpg", alt: "Jamaica cocktail with dried hibiscus and a paloma with a dried grapefruit wheel", cap: "Jamaica & Paloma" },
  { cat: "food", type: "video", src: "/assets/video/fresas-cup.mp4", poster: "/assets/video/fresas-cup.jpg", cap: "Fresas con crema" },
  { cat: "crew", type: "img", src: "/assets/img/gallery/crew.jpg", alt: "Three El Patio bartenders cheering behind the bar", cap: "The El Patio crew" },
  { cat: "truck", type: "img", src: "/assets/img/gallery/bar-window.jpg", alt: "Marquee BAR sign and mezcal and tequila bottles at the truck window", cap: "The bar window" },
  { cat: "food", type: "img", src: "/assets/img/gallery/churros-twist.jpg", alt: "Twisted cinnamon sugar churros with caramel and chocolate drizzle", cap: "Churros" },
  { cat: "cantina", type: "video", src: "/assets/video/cantina-rimmed.mp4", poster: "/assets/video/cantina-rimmed.jpg", cap: "Rimmed & ready" },
  { cat: "truck", type: "img", src: "/assets/img/gallery/pickup-window.jpg", alt: "Pick-up window with plants, bottles and jars of dried garnishes", cap: "Pick-up here" },
  { cat: "food", type: "video", src: "/assets/video/tacos-plate.mp4", poster: "/assets/video/tacos-plate.jpg", cap: "Fresh off the fryer" },
  { cat: "cantina", type: "video", src: "/assets/video/cantina-jamaica.mp4", poster: "/assets/video/cantina-jamaica.jpg", cap: "Jamaica Mezcal" },
  { cat: "food", type: "img", src: "/assets/img/gallery/tacos-dorados-side.jpg", alt: "Tacos dorados plate on a yellow patio table at golden hour", cap: "Golden hour on the patio" },
  { cat: "cantina", type: "img", src: "/assets/img/gallery/bar-counter.jpg", alt: "Bar counter with tequila, mezcal, dried citrus and hibiscus jars", cap: "Dried citrus, hibiscus & agave" },
  { cat: "truck", type: "video", src: "/assets/video/bar-shelf.mp4", poster: "/assets/video/bar-shelf.jpg", cap: "Behind the bar" },
  { cat: "cantina", type: "video", src: "/assets/video/cantina-cheers.mp4", poster: "/assets/video/cantina-cheers.jpg", cap: "¡Salud!" },
];

export const GALLERY_TABS: [GalleryCat | "all", string][] = [
  ["all", "All"], ["food", "Food"], ["cantina", "Cantina"], ["truck", "The Truck"], ["crew", "The Crew"],
];

export const COCKTAILS = [
  { name: "Casa Margarita", img: "/assets/img/cocktail-margarita.jpg", desc: "A timeless favorite crafted for effortless sipping.", color: "text-gold" },
  { name: "El Patio Paloma", img: "/assets/img/cocktail-paloma.jpg", desc: "Vibrant citrus flavors with a refreshing finish.", color: "text-gold" },
  { name: "Jamaica Mezcal", img: "/assets/img/cocktail-jamaica.jpg", desc: "Smoky mezcal meets rich hibiscus for a bold, unforgettable sip.", color: "text-[#e0748f]" },
  { name: "Tamarind Fuego", img: "/assets/img/cocktail-tamarind.jpg", desc: "Sweet tamarind and fiery spice in perfect harmony.", color: "text-[#f0884e]" },
];

export const REELS = [
  { src: "/assets/video/reel-guests.mp4", poster: "/assets/video/reel-guests.jpg", cap: "Nights at RED" },
  { src: "/assets/video/reel-kitchen.mp4", poster: "/assets/video/reel-kitchen.jpg", cap: "Event Service" },
  { src: "/assets/video/reel-truck.mp4", poster: "/assets/video/reel-truck.jpg", cap: "Rolling In" },
  { src: "/assets/video/reel-paletas.mp4", poster: "/assets/video/reel-paletas.jpg", cap: "Paletería La Paz" },
];

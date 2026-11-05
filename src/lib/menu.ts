/* ---- Menu (server source of truth — prices match DoorDash) ----
   • Items without a `price` show "Price at the window" and can't be added to the order.
   • Give an item `rank: 1/2/3` to feature it in the Best Sellers strip.
   • A category's `extras` renders as a compact price list (used for bottled drinks). */

export type MenuItem = {
  id: string;
  name: string;
  price?: number;
  desc?: string;
  img?: string;
  rank?: number;
  options?: string[];
  tag?: string;
};

export type MenuCategory = {
  id: string;
  tab: string;
  title: string;
  sub: string;
  intro?: string;
  layout: "list" | "cards";
  items: MenuItem[];
  extrasTitle?: string;
  extrasImg?: string;
  extras?: MenuItem[];
  credit?: string;
};

export const MENU: MenuCategory[] = [
  {
    id: "especialidad", tab: "Enchiladas", title: "Enchiladas", sub: "El Patio's specialty — house-made salsas, simple real ingredients",
    intro: "Our signature plates arrive on hand-painted clay platos: three chicken enchiladas rolled in sprouted corn tortillas, blanketed in salsa made from scratch and finished with a crema drizzle, cheese, onion and fresh cilantro. Every plate comes with a dome of red Mexican rice and refried beans served in a crispy tortilla bowl topped with queso fresco.",
    layout: "list",
    items: [
      { id: "suizas", rank: 1, name: "Enchiladas Suizas", price: 17.99, img: "/assets/img/gallery/enchiladas-suizas.jpg", desc: "Three chicken enchiladas smothered in our creamy, mild tomatillo sauce, topped with melted mozzarella, a sour cream drizzle, red onion and cilantro" },
      { id: "chipotle", rank: 2, name: "Chipotles", price: 17.99, img: "/assets/img/enchiladas.jpg", desc: "Three chicken enchiladas in sprouted corn tortillas, covered in a smoky, creamy chipotle sauce, topped with mozzarella, a sour cream drizzle, red onion and cilantro" },
      { id: "verdes", name: "Verdes", price: 16.99, img: "/assets/img/menu/verdes.jpg", desc: "Three chicken enchiladas rolled in sprouted corn tortillas, topped with bright green tomatillo salsa, queso fresco, sour cream and cilantro" },
    ],
  },
  {
    id: "dorados", tab: "Dorados", title: "Dorados", sub: "Golden & crispy — rice & beans included",
    intro: "Fried to order until shatteringly crisp, then piled high with cool, crunchy toppings: shredded lettuce, sour cream and bright pink pickled red onion. Served on the plato with red rice and refried beans in a golden tortilla bowl.",
    layout: "list",
    items: [
      { id: "quesadillas", name: "Quesadillas Locas", price: 15, desc: "3 deep-fried chicken quesadillas on sprouted corn tortillas, mozzarella, queso fresco, pico de gallo, lettuce, purple onion, creamy house chipotle sauce and sour cream" },
      { id: "tacos", name: "Tacos Dorados", price: 14, img: "/assets/img/gallery/tacos-dorados.jpg", desc: "3 crispy golden tacos in sprouted corn tortillas, loaded with shredded lettuce, sour cream, queso fresco and tangy pickled red onion", options: ["Chicken", "Potato"], tag: "Crowd pleaser" },
    ],
  },
  {
    id: "fries", tab: "Fries", title: "Fries", sub: "El Patio's signature curly fries, loaded your way",
    intro: "Seasoned curly fries buried under melted queso, mozzarella and queso fresco — made for sharing at the patio tables, or not.",
    layout: "list",
    items: [
      { id: "baconfries", rank: 3, name: "Cheesy Bacon Fries", price: 16.99, img: "/assets/img/menu/cheesy-bacon-fries.jpg", desc: "Crispy curly fries, melted queso, mozzarella, queso fresco and crispy bacon, finished with a sour cream drizzle and fresh chives" },
      { id: "cheesefries", name: "Cheese Fries", price: 14.99, img: "/assets/img/menu/cheese-fries.jpg", desc: "Crispy curly fries, melted queso, mozzarella and queso fresco, topped with a sour cream drizzle and fresh chives" },
    ],
  },
  {
    id: "bebidas", tab: "Bebidas", title: "Bebidas", sub: "Aguas frescas made in-house, plus ice-cold bottles",
    intro: "Poured over ice at the window. Our agua de Jamaica is steeped from real dried hibiscus flowers — the same ones you'll see in the jars on our counter — and the horchata is handmade, creamy and ice cold.",
    layout: "cards",
    items: [
      { id: "horchata", name: "Horchata", price: 6, desc: "Handmade, creamy rice horchata with cinnamon over ice", img: "/assets/img/horchata.jpg" },
      { id: "jamaica", name: "Agua de Jamaica", price: 6, desc: "Handmade from real hibiscus flowers — tart, ruby red and lightly sweet", img: "/assets/img/jamaica.jpg" },
    ],
    extrasTitle: "Bottled Drinks", extrasImg: "/assets/img/sodas.jpg",
    extras: [
      { id: "coke", name: "Bottled Coke", price: 5 },
      { id: "sprite", name: "Bottled Sprite", price: 5 },
      { id: "fanta", name: "Bottled Orange Fanta", price: 5 },
      { id: "tahoe", name: "Tahoe Water", price: 3 },
    ],
  },
  {
    id: "postres", tab: "Postres", title: "Postres", sub: "Save room for something sweet",
    intro: "Something sweet for the walk back to the car: fresh strawberries layered with cream and chocolate, and churros fried golden, rolled in cinnamon sugar and drizzled warm.",
    layout: "cards",
    items: [
      { id: "fresas", name: "El Patio Fresas", price: 8, desc: "Fresh-cut strawberries layered with sweet cream and chocolate, topped with mazapán crumbs", img: "/assets/img/fresas.jpg" },
      { id: "churros", name: "Churros", desc: "Fried golden, rolled in cinnamon sugar and finished with a dulce de leche and chocolate drizzle", img: "/assets/img/gallery/churros-twist.jpg" },
    ],
  },
  {
    id: "paletas", tab: "Paletas", title: "Artisan Dipped Paletas", sub: "Made fresh & local by Paletería La Paz — ask about weekly flavors",
    intro: "Handmade ice pops from our friends at Paletería La Paz, dipped in chocolate and drizzled to order.",
    layout: "cards",
    items: [
      { id: "p-mazapan", name: "Mazapán", price: 6, desc: "Chocolate dipped & drizzled", img: "/assets/img/paleta-mazapan.jpg" },
      { id: "p-ube", name: "Ube", price: 6, desc: "Chocolate dipped & drizzled", img: "/assets/img/paleta-ube.jpg" },
      { id: "p-coconut", name: "Coconut", price: 6, desc: "Chocolate dipped & drizzled", img: "/assets/img/paleta-coconut.jpg" },
      { id: "p-strawberry", name: "Strawberry", price: 6, desc: "Chocolate dipped & drizzled", img: "/assets/img/paleta-strawberry.jpg" },
    ],
    credit: "✦ Made fresh & local: Paletería La Paz ✦",
  },
];

export const allItems = (menu: MenuCategory[] = MENU): MenuItem[] =>
  menu.flatMap((c) => [...c.items, ...(c.extras || [])]);

export const findItem = (id: string, menu: MenuCategory[] = MENU) => allItems(menu).find((i) => i.id === id);

export const bestSellers = (menu: MenuCategory[] = MENU) =>
  allItems(menu)
    .filter((i) => i.rank)
    .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));

/* ---- Cart pricing (server-side; the client never decides prices) ---- */
export type CartLineInput = { id: string; option?: string | null; qty: number };
export type CartLine = { key: string; id: string; name: string; option: string | null; price: number; qty: number };

export function priceCart(lines: CartLineInput[]) {
  const out: CartLine[] = [];
  for (const raw of Array.isArray(lines) ? lines.slice(0, 100) : []) {
    if (!raw || typeof raw.id !== "string") continue;
    const item = findItem(raw.id);
    if (!item || typeof item.price !== "number") continue; // unknown / not orderable online
    const qty = Math.min(99, Math.max(0, Math.floor(Number(raw.qty) || 0)));
    if (!qty) continue;
    const option = item.options ? (item.options.includes(String(raw.option)) ? String(raw.option) : item.options[0]) : null;
    const key = item.id + (option ? ":" + option : "");
    const existing = out.find((l) => l.key === key);
    if (existing) existing.qty = Math.min(99, existing.qty + qty);
    else out.push({ key, id: item.id, name: item.name, option, price: item.price, qty });
  }
  const count = out.reduce((s, l) => s + l.qty, 0);
  const subtotal = Math.round(out.reduce((s, l) => s + l.qty * l.price, 0) * 100) / 100;
  return { lines: out, count, subtotal };
}

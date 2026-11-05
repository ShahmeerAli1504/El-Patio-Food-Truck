/* =========================================================
   El Patio Street Eats — site script
   ========================================================= */

/* ---- CONFIG: change these in one place ---- */
// For now all ordering goes to DoorDash. When the client moves to Square online ordering
// for truck pickup, swap this one link (and the button text in index.html).
const ORDER_URL = "https://www.doordash.com/store/el-patio-food-truck-reno-51259023/";

/* ---- Weekly schedule (edit each week) ---- */
const SCHEDULE = [
  { date: "2026-10-30", start: "17:00", end: "21:00", venue: "RED", venueFull: "Reno Experience District", address: "2072 Experience Ave, Reno, NV" },
  { date: "2026-10-31", start: "17:00", end: "21:00", venue: "RED", venueFull: "Reno Experience District", address: "2072 Experience Ave, Reno, NV" },
  { date: "2026-11-01", start: "17:00", end: "21:00", venue: "RED", venueFull: "Reno Experience District", address: "2072 Experience Ave, Reno, NV" },
];

/* ---- Menu ---- */
const MENU = [
  {
    id: "especialidad", tab: "Enchiladas", title: "Enchiladas", sub: "El Patio's specialty — house-made salsas, simple real ingredients",
    intro: "Our signature plates arrive on hand-painted clay platos: three chicken enchiladas rolled in sprouted corn tortillas, blanketed in salsa made from scratch and finished with a crema drizzle, cheese, onion and fresh cilantro. Every plate comes with a dome of red Mexican rice and refried beans served in a crispy tortilla bowl topped with queso fresco.",
    layout: "list",
    items: [
      { id: "suizas", rank: 1, name: "Enchiladas Suizas", price: 17.99, img: "assets/img/gallery/enchiladas-suizas.jpg", desc: "Three chicken enchiladas smothered in our creamy, mild tomatillo sauce, topped with melted mozzarella, a sour cream drizzle, red onion and cilantro" },
      { id: "chipotle", rank: 2, name: "Chipotles", price: 17.99, img: "assets/img/enchiladas.jpg", desc: "Three chicken enchiladas in sprouted corn tortillas, covered in a smoky, creamy chipotle sauce, topped with mozzarella, a sour cream drizzle, red onion and cilantro" },
      { id: "verdes", name: "Verdes", price: 16.99, img: "assets/img/menu/verdes.jpg", desc: "Three chicken enchiladas rolled in sprouted corn tortillas, topped with bright green tomatillo salsa, queso fresco, sour cream and cilantro" },
    ],
  },
  {
    id: "dorados", tab: "Dorados", title: "Dorados", sub: "Golden & crispy — rice & beans included",
    intro: "Fried to order until shatteringly crisp, then piled high with cool, crunchy toppings: shredded lettuce, sour cream and bright pink pickled red onion. Served on the plato with red rice and refried beans in a golden tortilla bowl.",
    layout: "list",
    items: [
      { id: "quesadillas", name: "Quesadillas Locas", price: 15, desc: "3 deep-fried chicken quesadillas on sprouted corn tortillas, mozzarella, queso fresco, pico de gallo, lettuce, purple onion, creamy house chipotle sauce and sour cream" },
      { id: "tacos", name: "Tacos Dorados", price: 14, img: "assets/img/gallery/tacos-dorados.jpg", desc: "3 crispy golden tacos in sprouted corn tortillas, loaded with shredded lettuce, sour cream, queso fresco and tangy pickled red onion", options: ["Chicken", "Potato"], tag: "Crowd pleaser" },
    ],
  },
  {
    id: "fries", tab: "Fries", title: "Fries", sub: "El Patio's signature curly fries, loaded your way",
    intro: "Seasoned curly fries buried under melted queso, mozzarella and queso fresco — made for sharing at the patio tables, or not.",
    layout: "list",
    items: [
      { id: "baconfries", rank: 3, name: "Cheesy Bacon Fries", price: 16.99, img: "assets/img/menu/cheesy-bacon-fries.jpg", desc: "Crispy curly fries, melted queso, mozzarella, queso fresco and crispy bacon, finished with a sour cream drizzle and fresh chives" },
      { id: "cheesefries", name: "Cheese Fries", price: 14.99, img: "assets/img/menu/cheese-fries.jpg", desc: "Crispy curly fries, melted queso, mozzarella and queso fresco, topped with a sour cream drizzle and fresh chives" },
    ],
  },
  {
    id: "bebidas", tab: "Bebidas", title: "Bebidas", sub: "Aguas frescas made in-house, plus ice-cold bottles",
    intro: "Poured over ice at the window. Our agua de Jamaica is steeped from real dried hibiscus flowers — the same ones you'll see in the jars on our counter — and the horchata is handmade, creamy and ice cold.",
    layout: "cards",
    items: [
      { id: "horchata", name: "Horchata", price: 6, desc: "Handmade, creamy rice horchata with cinnamon over ice", img: "assets/img/horchata.jpg" },
      { id: "jamaica", name: "Agua de Jamaica", price: 6, desc: "Handmade from real hibiscus flowers — tart, ruby red and lightly sweet", img: "assets/img/jamaica.jpg" },
    ],
    extrasTitle: "Bottled Drinks", extrasImg: "assets/img/sodas.jpg",
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
      { id: "fresas", name: "El Patio Fresas", price: 8, desc: "Fresh-cut strawberries layered with sweet cream and chocolate, topped with mazapán crumbs", img: "assets/img/fresas.jpg" },
      { id: "churros", name: "Churros", desc: "Fried golden, rolled in cinnamon sugar and finished with a dulce de leche and chocolate drizzle", img: "assets/img/gallery/churros-twist.jpg" },
    ],
  },
  {
    id: "paletas", tab: "Paletas", title: "Artisan Dipped Paletas", sub: "Made fresh & local by Paletería La Paz — ask about weekly flavors",
    intro: "Handmade ice pops from our friends at Paletería La Paz, dipped in chocolate and drizzled to order.",
    layout: "cards",
    items: [
      { id: "p-mazapan", name: "Mazapán", price: 6, desc: "Chocolate dipped & drizzled", img: "assets/img/paleta-mazapan.jpg" },
      { id: "p-ube", name: "Ube", price: 6, desc: "Chocolate dipped & drizzled", img: "assets/img/paleta-ube.jpg" },
      { id: "p-coconut", name: "Coconut", price: 6, desc: "Chocolate dipped & drizzled", img: "assets/img/paleta-coconut.jpg" },
      { id: "p-strawberry", name: "Strawberry", price: 6, desc: "Chocolate dipped & drizzled", img: "assets/img/paleta-strawberry.jpg" },
    ],
  },
];

/* ---- Gallery (photos + short clips) ---- */
const GALLERY = [
  { cat: "truck", type: "img", src: "assets/img/gallery/truck-night.jpg", alt: "El Patio food truck lit up at night with colored lights, cacti and the BAR sign", cap: "Lights on at RED", wide: true },
  { cat: "food", type: "img", src: "assets/img/gallery/enchiladas-suizas.jpg", alt: "Enchiladas suizas in creamy tomatillo sauce with rice and beans on a clay plate", cap: "Enchiladas Suizas" },
  { cat: "cantina", type: "video", src: "assets/video/cantina-crew.mp4", poster: "assets/video/cantina-crew.jpg", cap: "The cantina crew in action" },
  { cat: "food", type: "img", src: "assets/img/gallery/tacos-dorados.jpg", alt: "Tacos dorados topped with pickled red onion and crema, with red rice and beans", cap: "Tacos Dorados" },
  { cat: "truck", type: "img", src: "assets/img/gallery/truck-side.jpg", alt: "Side of the El Patio trailer with agave artwork beside the string-lit patio canopy", cap: "Under the string lights" },
  { cat: "cantina", type: "img", src: "assets/img/gallery/cocktails-duo.jpg", alt: "Jamaica cocktail with dried hibiscus and a paloma with a dried grapefruit wheel", cap: "Jamaica & Paloma" },
  { cat: "food", type: "video", src: "assets/video/fresas-cup.mp4", poster: "assets/video/fresas-cup.jpg", cap: "Fresas con crema" },
  { cat: "crew", type: "img", src: "assets/img/gallery/crew.jpg", alt: "Three El Patio bartenders cheering behind the bar", cap: "The El Patio crew" },
  { cat: "truck", type: "img", src: "assets/img/gallery/bar-window.jpg", alt: "Marquee BAR sign and mezcal and tequila bottles at the truck window", cap: "The bar window" },
  { cat: "food", type: "img", src: "assets/img/gallery/churros-twist.jpg", alt: "Twisted cinnamon sugar churros with caramel and chocolate drizzle", cap: "Churros" },
  { cat: "cantina", type: "video", src: "assets/video/cantina-rimmed.mp4", poster: "assets/video/cantina-rimmed.jpg", cap: "Rimmed & ready" },
  { cat: "truck", type: "img", src: "assets/img/gallery/pickup-window.jpg", alt: "Pick-up window with plants, bottles and jars of dried garnishes", cap: "Pick-up here" },
  { cat: "food", type: "video", src: "assets/video/tacos-plate.mp4", poster: "assets/video/tacos-plate.jpg", cap: "Fresh off the fryer" },
  { cat: "cantina", type: "video", src: "assets/video/cantina-jamaica.mp4", poster: "assets/video/cantina-jamaica.jpg", cap: "Jamaica Mezcal" },
  { cat: "food", type: "img", src: "assets/img/gallery/tacos-dorados-side.jpg", alt: "Tacos dorados plate on a yellow patio table at golden hour", cap: "Golden hour on the patio" },
  { cat: "cantina", type: "img", src: "assets/img/gallery/bar-counter.jpg", alt: "Bar counter with tequila, mezcal, dried citrus and hibiscus jars", cap: "Dried citrus, hibiscus & agave" },
  { cat: "truck", type: "video", src: "assets/video/bar-shelf.mp4", poster: "assets/video/bar-shelf.jpg", cap: "Behind the bar" },
  { cat: "cantina", type: "video", src: "assets/video/cantina-cheers.mp4", poster: "assets/video/cantina-cheers.jpg", cap: "¡Salud!" },
];
const GALLERY_TABS = [["all", "All"], ["food", "Food"], ["cantina", "Cantina"], ["truck", "The Truck"], ["crew", "The Crew"]];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = (n) => "$" + n.toFixed(2);

/* ---------- String lights ---------- */
function drawLights(svg, { swags = 4, sag = 60, top = 8, spacing = 46 } = {}) {
  if (!svg) return;
  const w = svg.clientWidth || window.innerWidth;
  const h = sag + top + 30;
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.setAttribute("height", h);
  const ns = "http://www.w3.org/2000/svg";
  svg.innerHTML = "";
  const n = Math.max(2, Math.round(swags * Math.min(1, w / 1200)) || 2);
  const seg = w / n;
  let k = 0;
  for (let i = 0; i < n; i++) {
    const x0 = i * seg, x1 = x0 + seg, cx = x0 + seg / 2, cy = top + sag * 2;
    const p = document.createElementNS(ns, "path");
    p.setAttribute("d", `M${x0},${top} Q${cx},${cy} ${x1},${top}`);
    svg.appendChild(p);
    const count = Math.max(3, Math.floor(seg / spacing));
    for (let j = 1; j < count; j++) {
      const t = j / count;
      const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1;
      const y = (1 - t) * (1 - t) * top + 2 * (1 - t) * t * cy + t * t * top;
      const c = document.createElementNS(ns, "ellipse");
      c.setAttribute("cx", x); c.setAttribute("cy", y + 7);
      c.setAttribute("rx", 4); c.setAttribute("ry", 5.5);
      c.setAttribute("class", "bulb");
      c.style.animationDelay = `${(k++ * 0.37) % 4}s`;
      svg.appendChild(c);
    }
  }
}
function allLights() {
  drawLights($("#heroLights"), { swags: 3, sag: 46, top: 78 });
  drawLights($("#menuLights"), { swags: 4, sag: 38, top: 0 });
  drawLights($("#footLights"), { swags: 4, sag: 34, top: 0 });
}

/* ---------- Menu render ---------- */
const tacoChoice = {};
function renderMenu() {
  const tabs = $("#menuTabs"), panels = $("#menuPanels");
  MENU.forEach((cat, i) => {
    const b = document.createElement("button");
    b.className = "menu__tab" + (i === 0 ? " active" : "");
    b.textContent = cat.tab; b.dataset.target = cat.id; b.setAttribute("role", "tab");
    tabs.appendChild(b);

    const panel = document.createElement("div");
    panel.className = "menu__panel" + (i === 0 ? " active" : "");
    panel.id = "panel-" + cat.id;
    let html = `<div class="menu__panel-head"><h3>${cat.title}</h3><p>${cat.sub}</p>${cat.intro ? `<p class="menu__intro">${cat.intro}</p>` : ""}</div>`;
    if (cat.layout === "list") {
      html += `<div class="menu__grid">` + cat.items.map((it) => `
        <article class="dish${it.img ? " dish--img" : ""}">
          ${it.img ? `<div class="dish__img"><img src="${it.img}" alt="${it.name}" loading="lazy" /></div>` : ""}
          <div class="dish__body">
            ${it.rank ? `<span class="dish__rank">#${it.rank} Best Seller</span>` : ""}
            <div class="dish__top"><h4>${it.name}</h4><span class="dish__dots"></span><span class="dish__price">${money(it.price)}</span></div>
            <p>${it.desc}</p>
            ${it.options ? `<div class="dish__opts" data-for="${it.id}">${it.options.map((o, k) => `<button class="${k === 0 ? "on" : ""}" data-opt="${o}">${o}</button>`).join("")}</div>` : ""}
            ${it.tag ? `<span class="dish__tag">${it.tag}</span>` : ""}
          </div>
          <button class="add" data-add="${it.id}" aria-label="Add ${it.name}">+</button>
        </article>`).join("") + `</div>`;
    } else {
      html += `<div class="menu__grid menu__grid--cards">` + cat.items.map((it) => `
        <article class="card">
          <div class="card__img"><img src="${it.img}" alt="${it.name}" loading="lazy" /></div>
          <div class="card__body">
            <div><h4>${it.name}</h4><p>${it.desc}</p>
              ${it.price ? `<span class="card__price">${money(it.price)}</span>` : `<span class="card__price ask">Price at the window</span>`}
            </div>
            ${it.price ? `<button class="add" data-add="${it.id}" aria-label="Add ${it.name}">+</button>` : ""}
          </div>
        </article>`).join("") + `</div>`;
      if (cat.extras) html += `
        <div class="bottles">
          <div class="bottles__img"><img src="${cat.extrasImg}" alt="${cat.extrasTitle}" loading="lazy" /></div>
          <div class="bottles__list">
            <h4>${cat.extrasTitle}</h4>
            ${cat.extras.map((it) => `
              <div class="bottle"><span class="bottle__name">${it.name}</span><span class="dish__dots"></span><span class="bottle__price">${money(it.price)}</span>
                <button class="add add--sm" data-add="${it.id}" aria-label="Add ${it.name}">+</button></div>`).join("")}
          </div>
        </div>`;
      if (cat.id === "paletas") html += `<p class="menu__credit">✦ Made fresh &amp; local: Paletería La Paz ✦</p>`;
    }
    panel.innerHTML = html;
    panels.appendChild(panel);
  });

  const best = $("#menuBest");
  if (best) {
    const picks = allItems().filter((i) => i.rank).sort((a, b) => a.rank - b.rank);
    best.innerHTML = `<p class="best__label"><span class="star">✦</span> Best Sellers <span class="star">✦</span></p>
      <div class="best__grid">` + picks.map((it) => `
        <article class="best">
          <div class="best__img"><img src="${it.img}" alt="${it.name}" loading="lazy" /><span class="best__rank">#${it.rank}</span></div>
          <div class="best__body">
            <div><h4>${it.name}</h4><span class="best__price">${money(it.price)}</span></div>
            <button class="add" data-add="${it.id}" aria-label="Add ${it.name}">+</button>
          </div>
        </article>`).join("") + `</div>`;
    best.addEventListener("click", onMenuClick);
  }

  tabs.addEventListener("click", (e) => {
    const b = e.target.closest(".menu__tab"); if (!b) return;
    $$(".menu__tab").forEach((t) => t.classList.toggle("active", t === b));
    $$(".menu__panel").forEach((p) => p.classList.toggle("active", p.id === "panel-" + b.dataset.target));
    b.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  });

  panels.addEventListener("click", onMenuClick);
}
function onMenuClick(e) {
    const opt = e.target.closest(".dish__opts button");
    if (opt) {
      const wrap = opt.parentElement;
      $$("button", wrap).forEach((x) => x.classList.toggle("on", x === opt));
      tacoChoice[wrap.dataset.for] = opt.dataset.opt;
      return;
    }
    const add = e.target.closest("[data-add]");
    if (add) {
      const item = findItem(add.dataset.add);
      const option = item.options ? (tacoChoice[item.id] || item.options[0]) : null;
      addToCart(item, option);
      add.classList.add("added"); add.textContent = "✓";
      setTimeout(() => { add.classList.remove("added"); add.textContent = "+"; }, 1100);
    }
}
const allItems = () => MENU.flatMap((c) => [...c.items, ...(c.extras || [])]);
const findItem = (id) => allItems().find((i) => i.id === id);

/* ---------- Cart ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem("elpatio-cart") || "[]"); } catch (_) { cart = []; }
cart = cart.filter((l) => findItem(l.id)).map((l) => { const it = findItem(l.id); return { ...l, name: it.name, price: it.price }; });
const save = () => { try { localStorage.setItem("elpatio-cart", JSON.stringify(cart)); } catch (_) {} };

function addToCart(item, option) {
  const key = item.id + (option ? ":" + option : "");
  const line = cart.find((l) => l.key === key);
  if (line) line.qty++;
  else cart.push({ key, id: item.id, name: item.name, option, price: item.price, qty: 1 });
  save(); renderCart();
  const btn = $("#cartOpen"); btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump");
  toast(`Added ${item.name}${option ? " · " + option : ""}`);
}
function renderCart() {
  const count = cart.reduce((s, l) => s + l.qty, 0);
  const total = cart.reduce((s, l) => s + l.qty * l.price, 0);
  const c = $("#cartCount"); c.textContent = count; c.classList.toggle("show", count > 0);
  $("#cartTotal").textContent = money(total);
  $("#checkoutBtn").classList.toggle("disabled", !count);
  const body = $("#cartItems");
  if (!count) {
    body.innerHTML = `<div class="drawer__empty"><img src="assets/img/logo-sm.png" alt="" /><p>Your order is empty.<br/>Start with our famous enchiladas.</p></div>`;
    return;
  }
  body.innerHTML = cart.map((l) => `
    <div class="line">
      <div class="line__info">
        <div class="line__name">${l.name}</div>
        ${l.option ? `<div class="line__opt">${l.option}</div>` : ""}
        <div class="line__price">${money(l.price)} each</div>
      </div>
      <div class="qty"><button data-dec="${l.key}" aria-label="Less">−</button><span>${l.qty}</span><button data-inc="${l.key}" aria-label="More">+</button></div>
    </div>`).join("");
}
function openCart(open) {
  $("#drawer").classList.toggle("open", open);
  $("#scrim").classList.toggle("open", open);
  $("#drawer").setAttribute("aria-hidden", !open);
}

/* ---------- Schedule ---------- */
function parseLocal(date, time) { const [y, m, d] = date.split("-").map(Number); const [hh, mm] = time.split(":").map(Number); return new Date(y, m - 1, d, hh, mm); }
const fmtTime = (t) => { let [h, m] = t.split(":").map(Number); const ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12; return h + (m ? ":" + String(m).padStart(2, "0") : "") + ap; };

function renderSchedule() {
  const now = new Date();
  const grid = $("#scheduleGrid");
  const upcoming = SCHEDULE.filter((s) => parseLocal(s.date, s.end) > now);
  const pin = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`;
  const clock = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;

  if (!upcoming.length) {
    grid.innerHTML = `<div class="stop" style="grid-column:1/-1;text-align:center;padding:40px"><p class="stop__venue">New dates coming soon</p><p style="color:var(--cream-dim)">Follow <a href="https://www.instagram.com/elpatioreno/" target="_blank" rel="noopener" style="color:var(--teal-bright)">@elpatioreno</a> for this week's stops.</p></div>`;
    $("#nextStop .next-stop__text").innerHTML = `Follow <b>@elpatioreno</b> for our next stop`;
    return;
  }
  grid.innerHTML = upcoming.map((s) => {
    const d = parseLocal(s.date, s.start), e = parseLocal(s.date, s.end);
    const isToday = d.toDateString() === now.toDateString();
    const live = now >= d && now <= e;
    const status = live ? "Open now" : isToday ? "Tonight" : "Upcoming";
    const maps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(s.address);
    return `
      <article class="stop reveal">
        <div class="stop__date">
          <span class="stop__day">${d.getDate()}</span>
          <div><span class="stop__dow">${d.toLocaleDateString("en-US", { weekday: "long" })}</span><span class="stop__month">${d.toLocaleDateString("en-US", { month: "long" })}</span></div>
          <span class="stop__status">${status}</span>
        </div>
        <div class="stop__body">
          <h3 class="stop__venue">${s.venue}<small>${s.venueFull}</small></h3>
          <div class="stop__meta">
            <span>${clock}${fmtTime(s.start)} – ${fmtTime(s.end)}</span>
            <span>${pin}${s.address}</span>
          </div>
          <a class="stop__link" href="${maps}" target="_blank" rel="noopener">Get Directions →</a>
        </div>
      </article>`;
  }).join("");

  const n = upcoming[0], nd = parseLocal(n.date, n.start), ne = parseLocal(n.date, n.end);
  const live = now >= nd && now <= ne;
  const when = live ? "Open now" : nd.toDateString() === now.toDateString() ? "Tonight" : nd.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric" });
  const el = $("#nextStop");
  el.classList.toggle("live", live);
  $(".next-stop__text", el).innerHTML = `<b>${when}</b> · ${n.venue} Reno · ${fmtTime(n.start)}–${fmtTime(n.end)}`;
}

/* ---------- Reveal on scroll ---------- */
function setupReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => io.observe(el));
}

/* ---------- Reels play only in view ---------- */
function setupReels() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const v = en.target;
      if (en.isIntersecting) { v.preload = "auto"; v.play().catch(() => {}); } else v.pause();
    });
  }, { threshold: 0.35 });
  $$(".reel video, .shot video").forEach((v) => io.observe(v));
}

/* ---------- Gallery ---------- */
function renderGallery() {
  const tabs = $("#galleryTabs"), grid = $("#galleryGrid");
  if (!tabs || !grid) return;
  tabs.innerHTML = GALLERY_TABS.map(([k, l], i) => `<button class="menu__tab${i === 0 ? " active" : ""}" data-f="${k}" role="tab">${l}</button>`).join("");
  grid.innerHTML = GALLERY.map((g) => `
    <figure class="shot${g.wide ? " shot--wide" : ""}${g.type === "video" ? " shot--video" : ""}" data-cat="${g.cat}">
      ${g.type === "video"
        ? `<video muted loop playsinline preload="none" poster="${g.poster}" aria-label="${g.cap}"><source src="${g.src}" type="video/mp4" /></video>`
        : `<img src="${g.src}" alt="${g.alt}" loading="lazy" />`}
      <figcaption>${g.cap}</figcaption>
    </figure>`).join("");
  tabs.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    $$("button", tabs).forEach((t) => t.classList.toggle("active", t === b));
    $$(".shot", grid).forEach((el) => el.classList.toggle("hide", b.dataset.f !== "all" && el.dataset.cat !== b.dataset.f));
  });
}

/* ---------- Toast ---------- */
let toastT;
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2200); }

/* ---------- Catering form ---------- */
function setupForm() {
  $("#cateringForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target, data = Object.fromEntries(new FormData(f));
    let ok = true;
    ["name", "email"].forEach((n) => { const i = f.elements[n]; const bad = !i.value.trim() || (n === "email" && !/^\S+@\S+\.\S+$/.test(i.value)); i.classList.toggle("invalid", bad); if (bad) ok = false; });
    if (!ok) { $("#formMsg").textContent = "Please add your name and a valid email."; return; }
    const body = `Name: ${data.name}\nPhone: ${data.phone || "-"}\nEmail: ${data.email}\nEvent date: ${data.date || "-"}\nGuests: ${data.guests}\nEvent type: ${data.type}\n\n${data.message || ""}`;
    window.location.href = `mailto:elpationv@gmail.com?subject=${encodeURIComponent("Catering request – " + data.name)}&body=${encodeURIComponent(body)}`;
    $("#formMsg").textContent = "Gracias! Your email app is opening with the details — just hit send.";
    f.reset();
  });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();
  $("#checkoutBtn").href = ORDER_URL;
  document.querySelectorAll("[data-order]").forEach((a) => { a.href = ORDER_URL; a.target = "_blank"; a.rel = "noopener"; });
  renderMenu();
  renderGallery();
  renderCart();
  renderSchedule();
  allLights();
  setupReveal();
  setupReels();
  setupForm();

  $("#cartOpen").addEventListener("click", () => openCart(true));
  $("#cartClose").addEventListener("click", () => openCart(false));
  $("#scrim").addEventListener("click", () => openCart(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") openCart(false); });
  $("#cartItems").addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]"), dec = e.target.closest("[data-dec]");
    if (!inc && !dec) return;
    const key = (inc || dec).dataset[inc ? "inc" : "dec"];
    const l = cart.find((x) => x.key === key);
    l.qty += inc ? 1 : -1;
    if (l.qty <= 0) cart = cart.filter((x) => x !== l);
    save(); renderCart();
  });

  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  const burger = $("#burger"), links = $("#navLinks");
  burger.addEventListener("click", () => { burger.classList.toggle("open"); links.classList.toggle("open"); });
  $$("a", links).forEach((a) => a.addEventListener("click", () => { burger.classList.remove("open"); links.classList.remove("open"); }));
  // Logo = back to the top of the page (smooth, works every click, keeps the URL clean)
  $(".nav__brand").addEventListener("click", (e) => {
    e.preventDefault();
    burger.classList.remove("open"); links.classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  });

  let rt; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(allLights, 150); });
});

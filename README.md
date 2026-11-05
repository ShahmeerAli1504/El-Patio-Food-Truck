# El Patio Food Truck — Website (Next.js + Tailwind)

Site for **El Patio Street Eats** (food truck & cantina, Reno NV), built by [Nexora Digital](https://www.nexoradigital.live).

Full-stack **Next.js 15 (App Router, TypeScript) + Tailwind CSS v4**, rebuilt from the original static HTML version with the same design and features.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Deploy on **Vercel**: import the repo and it detects Next.js automatically. Add the variables from `.env.example` under Project → Settings → Environment Variables.

## Quick edits

| What | Where |
|---|---|
| Weekly truck stops | `src/lib/schedule.ts` → `SCHEDULE` (Reno time, 24h). Past stops hide automatically; "Open now / Tonight" and the hero pill update themselves. |
| Menu items & prices | `src/lib/menu.ts` → `MENU`. No `price` = "Price at the window" with no add button. `rank: 1/2/3` = Best Sellers. `extras` = compact price list (bottled drinks). |
| Gallery, cocktails, reels | `src/lib/gallery.ts` |
| Ordering link, contact, socials, nav | `src/lib/site.ts` (or set `NEXT_PUBLIC_ORDER_URL`) |
| Colors, fonts, breakpoints | `tailwind.config.ts` |

## Backend (API routes)

| Route | Purpose |
|---|---|
| `GET /api/menu` | Full menu, best sellers and the ordering link |
| `GET /api/schedule` | Upcoming stops with live status, computed in Reno time |
| `POST /api/cart` | Reprices a saved cart against the live menu: drops removed items, fixes stale prices, returns the subtotal |
| `POST /api/catering` | Validates the catering form and emails it to the truck through [Resend](https://resend.com). Includes a honeypot and a rate limit. |

**Catering email:** set `RESEND_API_KEY` to have requests emailed straight to `CATERING_TO_EMAIL`. Without a key, the form works like the old site and opens the visitor's email app with the details filled in.

**Cart:** the cart is saved in the browser and checkout goes to the link in `ORDER_URL` (DoorDash for now). To take orders directly later (for example Square with pickup at the truck), add the payment step to `/api/cart`.

## Structure

```
src/app/page.tsx            page (server component — loads menu & schedule)
src/app/layout.tsx          fonts, SEO metadata
src/app/globals.css         Tailwind + shared component classes (buttons, lights, reveal…)
src/app/api/*               backend routes
src/components/*            Nav, Hero, Menu, Schedule, Cantina, Gallery, Reels, Catering, Footer, CartDrawer…
src/lib/*                   data + business logic (menu, schedule, catering, site config)
public/assets/              photos, videos, logo
```

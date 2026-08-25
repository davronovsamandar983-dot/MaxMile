# MaxMiles Lubricants

Storefront for MaxMiles motor oils and lubricants — a trilingual product
catalogue (Uzbek / Russian / English) with a Telegram-based ordering flow.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and Supabase.

## Getting started

Install dependencies and create your environment file:

```bash
npm install && cp .env.example .env.local
```

Fill in the Supabase values (see [Environment](#environment)), then run the
dev server:

```bash
npm run dev
```

The site is served at http://localhost:3000.

## Environment

Both variables are required — `src/lib/supabase.ts` asserts them as
non-null, so the app fails at startup if either is missing.

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase dashboard → Project Settings → API |

The anon key is safe to expose to the browser — it is protected by row level
security on the Supabase side. Never put a service role key in a
`NEXT_PUBLIC_` variable; anything with that prefix is bundled into the
JavaScript the browser downloads.

## Project layout

| Path | What lives there |
|---|---|
| `src/app/page.tsx` | Landing page — hero, category grid, why-us |
| `src/app/products/` | Catalogue listing and `[slug]` detail pages |
| `src/components/layout/` | `Header` (nav plus language switcher) and `Footer` |
| `src/components/products/OrderModal.tsx` | Order form, submits to Supabase |
| `src/context/LanguageContext.tsx` | Locale state, persisted to `localStorage` |
| `src/lib/translations.ts` | All UI copy, keyed by locale |
| `src/lib/supabase.ts` | Supabase client, `Product` / `Order` types, `CATEGORIES` |

## Languages

Three locales are supported: `uz` (default), `ru` and `en`. On first visit the
locale is guessed from `navigator.language`; after that the choice is
remembered in `localStorage` under `maxmiles-locale`.

Copy is not fetched from anywhere — it lives in `src/lib/translations.ts`, so
adding a string means adding it to all three objects in that file. Product
names and descriptions are the exception: those are per-locale columns on the
Supabase `products` table (`name_uz`, `name_ru`, `name_en`, and the matching
`description_*` and `properties_*` columns).

## Product categories

The nine categories are defined as a constant in `src/lib/supabase.ts`, not in
the database — each carries its own label per locale, an accent colour, an
emoji and a background image from `public/`. A product joins a category
through its `category` column, which holds one of the category keys:

`ULTRA` (passenger car) · `POWER` (truck and bus) · `MOTA` (motorcycle) ·
`GEARA` (gear) · `FREEZA` (antifreeze and coolant) · `FORSA` (brake fluid) ·
`HYDRA` (hydraulic) · `SMOOTHE` (grease) · `ADDIT` (additives)

Adding a category means editing that constant and dropping a matching
`cat_*.jpg` into `public/`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint, using `eslint-config-next` |

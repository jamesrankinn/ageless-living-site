# Ageless Living™ Website Architecture Specification

## Changelog — Live Lead Delivery, Clinic Info, Team & Logo Updates (2026-07-17)

Wires up real form delivery, corrects clinic contact info, labels every phone
by location, and applies the latest team/branding feedback.

### A. Web3Forms delivery is now live
- **`src/lib/contactLeads.ts`** now ships a real Web3Forms access key as the
  client-side default, so the contact + booking forms deliver on deploy with no
  env setup. The selected clinic is included in the email subject/body. Per-clinic
  keys can still override via `VITE_WEB3FORMS_KEY*` env vars.

### B. Every phone number is labeled by clinic
- **`Footer.tsx`** now renders each clinic's address **and its own tel: link**
  ("Langley: (236) 326-6830", etc.) from `clinics.ts`; removed the lone
  unlabeled number.
- **`Header.tsx`** mobile menu's bottom call button → "Contact a Clinic" link
  to `/contact` (no unlabeled number).

### C. Corrected clinic data (`src/data/clinics.ts`)
- **Victoria:** 101 Burnside Rd W #1, Victoria, BC V9A 1B7 · (250) 590-5787 ·
  Mon–Thu 9–5, Fri 9–4, by appointment, closed weekends.
- **Kelowna:** 3320 Richter St #102, Kelowna, BC V1W 4V5 · (778) 760-9827 ·
  Mon–Fri 9–5, by appointment, closed weekends.
- **Langley:** (236) 326-6830 · Mon–Fri 9–5, by appointment, closed weekends.
- Google Maps links + Contact/Book/Footer hours updated to match (no more
  "Saturday by appointment").

### D. Team + profiles
- **Removed the "Availability" block** from the staff profile "About" section
  (`StaffProfilePage.tsx`).
- **Team hero (`TeamPage.tsx`)**: replaced the AI group photo with the three
  founders' real headshots — Michael Forbes, Dr. Jean Paul Lim, Sarita Hutton.
- **Avnit Bhullar** updated: title "Clinic Manager and Medical Aesthetician",
  new credentials, specializations, services list, and bio.
- **Added Dr. Daman Johal** (Medical Aesthetician). Placed in **Langley**
  (clinic not specified — flagged for confirmation). Headshot pending: profile
  shows a placeholder avatar until `/public/team/daman-johal.webp` is added.

### E. Branding fixes
- **Logo (`BrandMark.tsx`)**: single-line, one-word "AgelessLiving" lockup
  (same Inter font) instead of stacked AGELESS / LIVING.
- **Skin Rejuvenation image**: swapped the AI `services-1.jpg` (garbled
  "Longevity & Aestmetics" sign) for the real clinical photo.
- **Avatar cards (HomePage)**: border → ring to remove the rounded-corner
  hairline ("borders off").
- Rebalanced another HomePage line that framed aesthetics as lower priority.

### F. Still needs client input / assets
- **Web3Forms:** confirm the destination inbox + (optionally) create separate
  per-clinic keys; enable spam protection in the dashboard.
- **Daman:** confirm clinic + provide headshot file.
- **Real photos** to replace remaining AI imagery.
- **Logo:** fine-tune against the attached "agelessliving" reference if needed.


## Changelog — Victoria Clinic Feedback: Lead Delivery, Accuracy & Branding (2026-07-17)

Addresses the operational + content concerns raised by the Victoria clinic
review. Highest priority: form inquiries now actually reach the clinics.

### A. Website inquiries now get delivered (was: silently lost)
- **Root cause:** there was no `/api/contact` handler, so every inquiry 404'd
  and fell back to the visitor's own `localStorage` — nobody ever received it.
- **`src/lib/contactLeads.ts`** rewritten to deliver via **Web3Forms** (a
  zero-backend form-to-email service, matches the static-hosting setup) with
  **per-clinic routing**: the selected location maps to that clinic's inbox
  (Langley → langley@, Victoria → wellness@, Kelowna → kelowna@; "Not sure" →
  shared triage). Keeps a local backup and now returns an **honest error** if
  delivery isn't configured/succeeds, instead of a false success.
- **Setup required to go live:** add per-clinic Web3Forms access keys as Vite
  env vars — see `.env.example`. `.gitignore` now excludes `.env*`.

### B. Inquiries no longer funnel to Langley
- Per-clinic routing (above) replaces the previous single destination.
- **`ServicesPage.tsx`**: the two Langley-only `tel:` links (sidebar + closing
  CTA) are replaced with links to `/contact` ("Contact your clinic" / "Contact
  a Clinic"), which lists all three clinics' own numbers.

### C. Treatment accuracy (Victoria feedback)
- **`CosmeticDermalFillerPage.tsx`**: removed brand names (Restylane®,
  Revanesse®), **removed PRP** (not offered), and **re-categorized Sculptra**
  — the page now presents two accurate categories, **Hyaluronic Acid Fillers**
  and **Collagen Biostimulators** (explicitly noted as distinct from fillers).
  Meta description + section copy updated to match; added note that offerings
  vary by clinic and are confirmed at consultation.
- **`ServicesPage.tsx`**: "HydraFacial" → "Customized UltraFacial" (device
  brand varies by clinic); "medications like semaglutide" → "GLP-1
  medications"; added a site-level note that treatments/products vary by clinic.

### D. Copy + branding
- **Removed "free consultation"** everywhere (inaccurate for Victoria) —
  `ServicesPage` (×3) and `AboutUsPage` (×2) now say "Book a Consultation".
- **"Practice" → "Clinic"**: `TeamPage` "Victoria Practice" → "Victoria
  Clinic" (and "Kelowna Sanctuary" → "Kelowna Clinic" for consistency);
  HomePage "longevity medicine practice" → "clinic".
- **Rebalanced aesthetic-medicine framing** on the HomePage: removed the
  dismissive "only treats the surface" / "a quick syringe and out the door"
  lines and the "aesthetics is merely the result" phrasing; aesthetics is now
  presented as an expert pillar delivered with equal clinical rigor.

### E. Not code changes (need input / assets from the client)
- **Real photography** to replace AI/stock imagery (client to supply).
- **Web3Forms access keys** (client to create) to switch delivery on.
- **Staff-change / CMS login** for the social-media manager — open question.


## Changelog — Contact Page, Shop Link, Mobile Nav Fix + Team Redesign (2026-07-17)

Restores a dedicated Contact page and a Shop entry-point, fixes the mobile
menu so it always dismisses on navigation, lets visitors book at any of the
three clinics with one tap, and rebuilds the "Meet the Team" page to feel
premium.

### A. New Contact page (`/contact`)
- **Added** `src/pages/ContactPage.tsx` and its lazy route in `App.tsx`.
  Removed the old `/contact → /book` redirect so `/contact` is a real page
  again.
- Sections: hero, a three-up **clinic card grid** (Langley, Victoria,
  Kelowna) each with address, tel/mailto links, hours, a **"Book here"** CTA
  (deep-links to `/book?location=<id>`) and a **"Directions"** Google Maps
  link, plus a **"Send a message"** block (contact details + validated React
  Hook Form + Zod form reusing `saveContactLead`).
- Fully responsive: cards go 1→2→3 columns, form fields stack on mobile.

### B. Shop link in the nav
- **Added** `SHOP_URL` (`https://ageless-living.square.site/s/shop`) to
  `src/lib/links.ts`.
- Header now shows a **Shop** link (ShoppingBag icon) in the desktop nav and
  the mobile overlay, opening the Square storefront in a new tab. Footer
  bottom bar also gains **Contact** and **Shop** links.

### C. Mobile nav fix (menu wouldn't dismiss)
- The full-screen overlay no longer animates `height` (which could leave it
  lingering over the destination page). It now uses a clean opacity fade and
  `z-50`, and **locks body scroll** (`overflow: hidden`) while open.
- Added a shared `closeMobile()` helper wired to every in-menu link so tapping
  **Book Now** (or any item) reliably closes the overlay in addition to the
  existing close-on-navigation effect. Verified end-to-end with Playwright on
  an iPhone viewport.

### D. Book at any of the three clinics
- **Added** `src/data/clinics.ts` — single source of truth for all three
  locations (address, phone, email, hours, Google Maps URL).
- `BookNowPage` now reads a `?location=langley|victoria|kelowna` query param
  and pre-selects the matching clinic in the intake form; its location cards
  are sourced from `clinics.ts`.

### E. Meet the Team redesign (`/our-team`)
- Rebuilt `TeamPage.tsx`: new hero ("The people behind your care" + trust
  stats), refined pill-style location filter, premium staff cards
  (4:5 portraits, hover lift, gradient + arrow affordance), per-section
  specialist counts, and a closing booking CTA. Staff data/routing unchanged.


## Changelog — Merge Contact into Book Now + Remove Location Pages (2026-06-17)

Further simplification. The intake form now lives on a single **Book Now**
page, the separate Contact page and the three location pages are gone, and the
nav can no longer get stuck open after a click.

### A. Book Now becomes the intake form
- **`src/pages/BookNowPage.tsx`** now renders the full intake experience
  (location contact info on the left, validated React Hook Form + Zod intake
  form on the right) — the content that previously lived on the Contact page.
  Eyebrow reads **"Book Now"**, heading **"Start your journey"**.
- **Deleted** `src/pages/ContactPage.tsx`. `/contact` now 301-style redirects
  to `/book` (`App.tsx`).

### B. Location pages removed
- **Deleted** `VictoriaPage.tsx`, `LangleyPage.tsx`, `KelownaPage.tsx` and
  their lazy imports + routes. `/locations`, `/locations/victoria|langley|kelowna`
  now redirect (to `/about-us` / `/book`) so old links never 404.
- Re-pointed every internal link that targeted a location page to `/book`
  (HomePage, AboutUsPage location cards, BiohackingPage). Staff-profile
  location badges are now non-clickable `<span>`s.
- Removed the location/contact URLs from `public/sitemap.xml`.

### C. Navigation
- Removed the **Locations** dropdown and the **Contact** link from the header
  (desktop + mobile) and footer. Primary CTA renamed **"Book Consultation" →
  "Book Now"**.
- **Stuck-menu fix:** the header now closes the mobile overlay and all
  dropdowns on *every* navigation — including hash-only changes and re-clicking
  the current route — by keying the close effect on `location.key`.

## Changelog — Simplification: Remove Shop/Discount + Contact Intake Form (2026-06-17)

Site-wide simplification pass. Strips the recurring shop and discount/offer
modules so the experience is cleaner and more focused, and converts the
Contact page into a proper intake form with each location's contact details
on the left.

### A. Removed shop + discount sections (global)
- **`Layout.tsx`** no longer renders `<VisitShopCta />` or `<NewsletterSignup />`.
  These two modules previously appeared above the footer on every route; both
  are now gone so every page ends cleanly at the footer.
- **Deleted** `src/components/VisitShopCta.tsx` (global "Visit the Shop" CTA),
  `src/components/NewsletterSignup.tsx` (the "15% off your first facial"
  members-only discount block), and the now-orphaned `src/lib/subscribers.ts`.
- **`App.tsx`**: removed the `/shop` route and the `ExternalRedirect` +
  `SHOP_URL` imports; deleted the orphaned `src/components/ExternalRedirect.tsx`.
- **`src/lib/links.ts`**: removed the `SHOP_URL` constant.
- **`ChatBot.tsx`**: removed the "shop / bundle / product" intent cluster.
- **`public/sitemap.xml`**: removed the `/shop` URL entry.

### B. Contact page → intake form (`src/pages/ContactPage.tsx`)
- Replaced the locations-only layout with a two-column contact + intake layout.
- **Left:** each location's contact info (Langley, Victoria, Kelowna) as
  cards — address, click-to-call phone, mailto email — plus clinic hours.
- **Right:** an intake form (React Hook Form + Zod) capturing first/last name,
  email, phone, preferred location, area of interest, and a message, with
  inline validation and an animated success state.
- New `src/lib/contactLeads.ts` persists submissions (best-effort POST to
  `/api/contact`, localStorage fallback) mirroring the existing lead pattern.

## Changelog — Real-Asset Integration + Anti-AI Home Rebuild (2026-06-06)

Brand-authenticity pass: swap AI-generated assets for the real clinic
photography/brand assets, anchor on the official logo + teal, and simplify
the home page around outcomes (how people want to feel) over products.

### A. Brand identity wired to the real assets
- `src/components/BrandMark.tsx` now renders the **official Ageless Living
  mark** — the real teal triangle/chevron logo (from the brand SVG) plus a
  clean tracked "AGELESS / LIVING" wordmark — replacing the invented
  leaf-arc monogram. Mark uses `--clinic-teal`; wordmark inherits
  `currentColor` so it inverts correctly in the dark footer.
- `index.html`: favicon → real teal triangle (`/brand/favicon.svg`);
  `theme-color` → brand teal `#1f8a96`.
- `tailwind.config.ts`: `fontFamily.display` → **Playfair Display** to match
  the intentional `src/index.css` switch (warmer, more human/editorial than
  the previous Jost). Color tokens already point to the brand teal
  (`184 64% 33%`) in `index.css`.

### B. Real asset pipeline
- Source mirror of the live site landed at `public/agelessliving.com/`
  (375 real assets / 50 pages, indexed by `context_map.json`).
- Curated, keyword-named, <200 KB `.webp` copies placed in
  `src/assets/real/` (imported + hashed by Vite); the real brand hero video
  + poster in `public/media/` (`hero.mp4`, `hero-poster.webp`); brand SVGs in
  `public/brand/`.
- `src/lib/placeholders.ts`: `HERO_VIDEO_MP4` / `HERO_POSTER` repointed from
  the AI Kling clip + AI portraits to the **real brand video + clinic still**.

### C. Home page rebuilt (`src/pages/HomePage.tsx`)
- Removed the AI-generated imagery (`src/assets/gen/*.png`) and the
  scroll-jacking 4-phase "Inside-Out Synergy" / "Designed for Deep Healing"
  sections — the synthetic, over-produced look flagged in the Anti-AI brief.
- New lean, mobile-first structure: **Hero (real brand video) → Trust strip →
  Outcomes → Approach → Locations → Closing CTA**.
- Copy reframed from product/jargon ("True Beauty at the Cellular Level",
  "HBOT/PEMF", "healthspan vs lifespan") to **outcome-led, minimal** voice
  ("Look and feel your best, at any age"; "Start with how you want to feel";
  "We start with you — not a product").

### Verification
- `npx vite build` — clean (~4 s); all real-asset imports resolve.
- `npx tsc` — changed files clean (2 pre-existing zod-resolver errors remain
  in `NewsletterSignup.tsx` / `PerformancePackagesPage.tsx`, untouched).

### D. Service pages — honest real-photo band + dead-code cleanup
- `ServiceTransformationSection.tsx` rewritten: the synthetic 3-phase tab UI
  and the "Drag to compare · Real client" before/after slider (both fed by AI
  portraits) are gone. It now renders a calm **real clinic photo + outcome-led
  copy + Book CTA** band, keyed by `serviceSlug` to a real photo in
  `src/assets/real/`. Same props, so all 11 callers keep working.
- All 11 service call sites reworded from slider-referencing copy ("Drag the
  handle…") to honest, sentence-case, outcome-led lines.
- Deleted now-orphaned components: `TransformationAvatar.tsx`,
  `EvolutionTimeline.tsx`, `TransformationJourney.tsx`, `BeforeAfterSlider.tsx`.
- Deleted unused AI assets: `src/assets/gen/` (24 PNGs, ~30 MB) and the
  AI portraits + Kling hero clip in `public/photos/`.
- `placeholders.ts` slimmed to just `HERO_VIDEO_MP4` / `HERO_POSTER` (all the
  AI before/after maps removed).

### E. Location pages — real photos + canonical addresses
- Victoria / Langley / Kelowna hero + inset images repointed to real clinic
  photos in `src/assets/real/`.
- Addresses corrected to the canonical (Footer) set after user confirmation:
  Victoria **740 Hillside Ave #120, V8T 1Z4** (was a wrong "Burnside" address),
  Kelowna **1708 Dolphin Ave #101, V1Y 9S4** (was a wrong "Richter St"
  address); Langley `415-20178 96 Ave` was already correct. Helmet meta +
  Google Maps links updated to match.

### Outstanding (next pass)
- Per-clinic phone numbers on the location pages (Victoria `250 590-5787`,
  Kelowna `778 760-9827`) were added alongside the now-corrected wrong
  addresses — verify against the real clinic lines (Langley uses the canonical
  `236 326-6830`).
- Service pages still use the older `src/assets/*.jpg` stock imagery in their
  upper sections; swap for real clinic photography as it becomes available.

---

## Changelog — Brand Blue Repaint + Service-Page Cleanup (2026-06-04)

Two surgical changes requested ahead of brand review.

### A. Sage green → Ageless blue, site-wide (`src/index.css`)
- Every brand HSL token previously sitting in the sage-green family (`145 25% 32%`) was repointed to the Ageless clinical blue (`212 68% 38%`). Tokens updated: `--primary`, `--ring`, `--accent-foreground`, `--sage*`, `--clinic-teal*`, `--sidebar-primary`, `--sidebar-ring`, and `::selection`.
- Added the previously-undefined brand tokens that the Tailwind config already referenced: `--ageless-blue`, `--ageless-blue-deep`, `--ageless-blue-soft`, the full `--vitality-*` family, and the full `--wellness-*` family — all aligned to the Ageless blue palette so existing `bg-vitality-forest`, `text-wellness-teal`, etc. usages snap to brand without per-file edits.
- One non-token green (`bg-green-100 / text-green-700` "completed" badge in `src/pages/DashboardPage.tsx`) switched to `bg-ageless-blue-soft / text-ageless-blue-deep`.

### B. Removed the biomarker face-map avatar from every service page
- `<TransformationAvatar />` (the portrait-with-pinned-metrics card — MOOD +38%, ENERGY +45%, SLEEP +34%, CLARITY +33%, etc.) is deleted from the codebase.
- `<ServiceTransformationSection />` no longer renders the avatar column. Its layout collapses from a 2-column `[1.25fr_1fr]` grid into a single centered before/after slider with a centered eyebrow + caption — cleaner, more editorial, no more sci-fi feel.
- The `variant` prop is dropped from `ServiceTransformationSection` and from all 11 callers: Botox, Belkyra, Biohacking, CosmeticDermalFiller, CustomizedUltraFacial, Dermaplaning, HealthWeight, HormoneBalancing, LaserIplBbl, Microneedling, PerfectDermaPeel.

---

## Changelog — Launch-Readiness Critical Fixes (2026-05-16)

Follow-up to the brand pivot. Six audit-critical items addressed so the site can ship.

### A. Static `<head>` rewritten for the new brand (`index.html`)
- Title, description, OG and Twitter meta now match the Longevity & Vitality positioning. `theme-color` updated to the new forest (`#234b3a`).
- OG / Twitter images repointed from a third-party Lovable preview URL to `https://agelessliving.com/og-image.webp` — drop a 1200×630 WebP at `public/og-image.webp` before deploy.
- Site-wide JSON-LD upgraded from `Organization` to `MedicalBusiness` with description.
- `preconnect` added for `ageless.janeapp.com` (booking flow), and the `<noscript>` message is now on-brand with a fallback prompt to call the clinics.

### B. Hero video — mobile + slow-connection guard (`src/pages/HomePage.tsx`)
- New `useShouldLoadHeroVideo()` hook gates the 4.4 MB MP4 behind a min-width 768px + non-reduced-motion + non-save-data + non-2g check. Mobile and slow-network users now see the poster only, never download the video.
- `<video>` switched to `preload="metadata"` (was implicit `auto`).
- Poster `<img>` is rendered eagerly with `fetchPriority="high"` so it owns the LCP slot.
- Production prerequisite (binary, not in this commit): re-encode `no_zoom_in_or_zoom_out_create__Kling_30__00466.mp4` (4.4 MB) → ≤1.5 MB H.264 + a `.webm` sibling and rename to `hero-vitality-bc.mp4`/`.webm`. Re-export the poster as `hero-vitality-poster.webp` (≤120 KB). Update `HERO_VIDEO_MP4` / `HERO_POSTER` in `src/lib/placeholders.ts`.

### C. Header / Footer logo replaced with inline SVG (`src/components/BrandMark.tsx`)
- New `<BrandMark />` component renders a ~1 KB inline SVG wordmark (`Ageless Living` + `LONGEVITY · VITALITY` micro-line + a small leaf-arc monogram) using `currentColor`. Supports `inverted` for dark-on-light vs light-on-dark.
- `Header.tsx` and `Footer.tsx` now import `<BrandMark />` instead of `@/assets/header-logo.png`. That 812 KB PNG no longer ships on any route.
- `src/assets/header-logo.png` can be deleted once production photography swap-out is signed off; left on disk for now so designers can sanity-check.
- Outstanding asset work (not code): convert `blog1.png` (1.8 MB), `blog2.png` (3.5 MB), `blog3.png` (4.7 MB), `victoria.png` (504 KB) → `.webp` at <200 KB each and update the imports.

### D. Route-level code splitting (`src/App.tsx`, `src/components/Layout.tsx`)
- Every route except `HomePage` is now `React.lazy()`-imported. `<Routes>` is wrapped in a `<Suspense>` with a minimal no-flash fallback (`min-h-screen bg-background`, `aria-busy`).
- `ChatBot` is lazy-imported in `Layout` and mount-deferred until either (a) the user scrolls past 300 px or (b) 3.5 s of idle. Eliminates it from the initial Layout chunk.
- Build result: initial homepage JS chunk dropped from **636 kB / 154 kB gzipped** to **228 kB / 69 kB gzipped** (-64 %). Per-route chunks land at 1–25 kB each. The `> 500 kB chunk` Vite warning is gone.

### E. EvolutionTimeline — claims softened, disclaimer added (`src/components/EvolutionTimeline.tsx`)
- Numeric biomarker deltas (`↓ 62 %`, `↑ 41 %`, `↓ 38 %`, `↑ 18 %`, `↓ 8 bpm`) replaced with qualitative descriptors (`well-controlled`, `restored ↑`, `trending ↓`, `strong ↑`, `improving ↓`). Same visual rhythm, no unsubstantiated medical claims.
- Visible regulatory disclaimer added under the section: *"Illustrative stage descriptors based on patterns observed in our clinics. Individual results vary and depend on baseline health, protocol adherence and physician assessment. Not a treatment guarantee or substitute for personalised medical advice."* Required for medical advertising under BC College standards.
- Homepage stats strip "200+ Biomarkers tracked" replaced with "Physician-led · Every protocol" for the same reason.

### F. Skip-link colour updated to new palette (`src/components/Layout.tsx`)
The focus-visible "Skip to main content" link uses `bg-vitality-forest` instead of the legacy `bg-clinic-teal` alias.

### Outstanding (assets, not code)
1. Produce `/public/og-image.webp` (1200×630) and `/public/hero-vitality-poster.webp` reflecting the new hero.
2. Re-encode hero video to `<1.5 MB` H.264 + WebM sibling, rename for SEO.
3. Convert top-five PNGs to WebP (`blog1-3.png`, `victoria.png`, leftover use of `header-logo.png` if any). Update imports.
4. Commission single-model, three-stage real photography for the EvolutionTimeline avatar; swap `<AvatarFigure>` for stage-specific `<img>`/`<video>`.

---

## Changelog — Longevity & Vitality Brand Pivot (2026-05-16)

The site has been repositioned away from a "med spa" reading toward a **Longevity & Vitality Clinic** brand. Aesthetics is now framed as the *external signal* of internal cellular health rather than the headline service. Three things changed at the system level:

### 1. Brand palette (`src/index.css`, `tailwind.config.ts`)
- New vitality tokens layered into the existing CSS variable system. `clinic-teal` is preserved as a backwards-compat alias so legacy components instantly inherit the new brand without a sweeping refactor.
- Tokens added (HSL on the `:root`):
  - `--vitality-forest` (deep wellness green, primary signal) → `bg-vitality-forest`, `text-vitality-forest`
  - `--vitality-forest-deep` for hovers / pressed states
  - `--vitality-moss` for fills / progress
  - `--vitality-sage` for near-white wash backgrounds
  - `--vitality-blue` (calming clinical blue, biomarker accent) + `--vitality-blue-soft`
  - `--vitality-sand` (warm earthy neutral)
  - `--vitality-glow` (subtle gold for the "peak" state only — never as a flat brand colour)
- Background neutrals shifted from pure warm cream to a bone tone with a faint green undertone (`hsl(36 30% 97%)`) so the page reads clinical-yet-warm.

### 2. Homepage hero (`src/pages/HomePage.tsx`)
- Eyebrow rewritten: **"Ageless Living™ · Longevity & Vitality Medicine"**.
- Headline rewritten around healthspan, not aesthetics: **"Add years to your life. / Add life to your years."**
- Sub-line repositioned around hormones, metabolism and cellular energy with healthspan/lifespan framing.
- Stats strip updated to longevity-flavoured metrics ("Biomarkers tracked", "Years optimising patients").
- `<Helmet>` title + description rewritten for the new positioning so SEO snippets match the brand.

### 3. The Vitality Evolution — Avatar Journey (`src/components/EvolutionTimeline.tsx`) — NEW
Self-contained, drop-in homepage section that replaces the conventional "before/after of different people" story with a **single-avatar, three-stage evolution**:

- **Stage 01 · Baseline (Pre-Treatment)** — systemic inflammation, suboptimal composition, postural slump, fatigue cues.
- **Stage 02 · Transition (Weeks 4–16)** — reduced inflammation, evening skin tone, posture lengthening, steadier energy.
- **Stage 03 · Peak Vitality (Month 6+)** — optimised composition, clear/luminous skin, strong posture, sharp focus.

Functional build:
- **Interactive timeline rail** with three numbered stops (`01 / 02 / 03`). A gradient `forest → moss → glow` fill animates left-to-right as the user advances.
- **Stylised SVG avatar** that morphs per stage: skin-tone gradient stops shift warmer/clearer, posture tilt animates upright, a soft halo (`radial-gradient` + blur) increases in opacity, and a gold rim-light fades in only at Peak. No real photography is required — this reads as a clinical diagram, which is exactly the longevity-clinic feel and avoids the "stock med spa model" problem.
- **Biomarker callouts** orbit the avatar (Inflammation, Resting HR / VO₂ max, Deep sleep, Skin clarity / Lean mass). Values + trend arrows swap with the active stage so visitors instantly read "this is medicine, not aesthetics."
- **Controls**: prev / next chevrons, a centred Play/Pause toggle, and clickable stage stops. Auto-advance every 5.5 s, pauses on hover, resumes on leave.
- **Responsive**: figure-card and copy column stack on `<lg`, side-by-side on `lg+`. Stage rail and biomarker chips scale down via `md:` breakpoints. All controls have `aria-pressed` / `aria-label`.
- **Data shape**: `STAGES: Stage[]` at the top of the file. To swap copy, visual cues, or biomarker values, edit that array — no other changes required. To swap the SVG silhouette for production photography later, replace the `<AvatarFigure />` JSX with `<img>` / `<video>` per stage; the surrounding rail, halo and callouts are stage-agnostic.

Mounted on the homepage immediately after the stats strip, before the treatments grid, so visitors understand the proposition before they read a single service name.

### 4. Philosophy bridge section (`src/pages/HomePage.tsx`)
New section directly under the Evolution Timeline: **"The skin tells the story of the cell."** A two-column editorial block that explicitly disclaims the med-spa framing and positions aesthetics as a *readout* of internal health. Three supporting chips — Internal / Structural / External — make the systems-level approach scannable.

### 5. Treatments / Four Pillars reframed (`src/pages/HomePage.tsx`)
- Section eyebrow: "Four pillars of healthspan". Section heading: "Total-body optimisation".
- The order and copy of the four cards is rebalanced so aesthetics is no longer first:
  1. Hormone Optimisation
  2. Cellular Biohacking
  3. Metabolic Health
  4. Aesthetic Signal (renamed from "Skin Rejuvenation"; description explicitly frames it as the visible reflection of optimised cellular health)
- Routing hrefs are unchanged so service pages, the booking flow and the four-phase TransformationJourney section below it continue to work exactly as before.

### 6. Closing CTA reframed (`src/pages/HomePage.tsx`)
- "Ready to start your wellness journey?" → **"Ready to map your healthspan?"**, with the italic accent now using `text-vitality-forest`.
- Sub-copy reframed around labs, biomarkers and a physician-led optimisation plan instead of a generic consultation.

### 7. Imagery & SEO direction (creative brief for upcoming asset swaps)
Production photography should target a longevity/vitality reading, not a med-spa reading:
- **Composition**: wide, full-body or 3/4 lifestyle shots. Hands, posture, movement. Faces are calm and unstyled, not glamour-lit.
- **Lighting**: natural daylight, soft window light, midday outdoors. Avoid hard ring-light beauty lighting and warm tungsten lounge lighting.
- **Locations**: outdoors (forest, coast), bright minimal interiors, clinical white-on-natural-wood. No spa robes, no laser-room close-ups as hero shots.
- **Subjects**: people in motion (hiking, training, cooking, working). Avoid clinical "patient on table" framing for hero/marketing imagery.
- **File naming** (unchanged convention): `[concept]-[location]-[descriptor].webp`, `<200 KB`, `loading="lazy"`. Suggested concept tags going forward: `vitality`, `healthspan`, `longevity`, `biomarker`, `recovery`.

### 8. Routing & data — explicitly unchanged
No routes added or removed. No service-page slugs renamed. The existing four-phase `<TransformationJourney />` still renders below the new EvolutionTimeline; service pages, booking flow, locations and auth gate are untouched.

---

## Changelog — Final UI/UX Pass: Hero, Phased Transformation, Sliders, Auth & Shop (2026-04-21)

Final polish pass before hand-off. Tightens the hero, turns the home-page and service-page transformation sections into explicit phased journeys, fixes and re-designs every slider on the site, removes the standalone Sign-In entry-point in favour of a booking-time auth gate, and restricts the primary teal to buttons / accents (no more giant blue hero blocks in the shop CTA, closing CTA, or stats strip).

### 1. Hero Section — Clarity & Typography (`src/pages/HomePage.tsx`)
- Re-centred the hero: one editorial headline, one sub-line, two clean CTAs. Removed the competing left-aligned copy block, oversized `AGELESS` wordmark and the top pill row so the video reads clearly.
- New copy explicitly states what the site is + sells:
  - Headline: **"Look younger. Feel stronger. / Live better, longer."**
  - Supporting line: "Physician-led skin rejuvenation, hormone balancing, biohacking and weight care — across three BC clinics in Victoria, Langley & Kelowna."
  - Eyebrow: "Ageless Living™ · Wellness & Longevity Medicine".
- Softer, single-tone legibility scrim replaces the layered gradients. Typography scales with `clamp(2.75rem, 7.5vw, 6.5rem)` so it stays readable on all breakpoints.

### 2. Home-Page Transformation — Four Phases (`src/components/TransformationJourney.tsx`)
- Rewritten from a "four pillars" tab strip into an explicit **four-phase journey**: Skin Rejuvenation → Hormone Balancing → Biohacking → Health Weight. Each phase is numbered `01`–`04` and the stepper fills as the user progresses.
- Every phase now supports **before / after media**:
  - default → `<BeforeAfterSlider>` driven by per-phase `before` / `after` stills,
  - optional → a looping `.mp4` (set `video` on the phase in `HOME_PHASE_MEDIA`) replaces the slider with a full-bleed video card.
- Data model lives in `src/lib/placeholders.ts` (`HOME_PHASE_MEDIA`) so photography can be swapped one phase at a time with zero code changes.

#### Home-Page Asset Checklist (REQUIRED)
Drop the following into `/public/photos/home-phases/` (prefer `.webp`, <200 KB, ≥1200×900 or 4:3). Videos are optional but recommended.

| Phase | File (required) | Video (optional) | What it should show |
| --- | --- | --- | --- |
| 01 · Skin Rejuvenation | `skin-rejuvenation-home-before.webp` + `skin-rejuvenation-home-after.webp` | `skin-rejuvenation-home.mp4` (8–15 s, muted loop) | Close-up face: Before (visible lines / uneven tone) → After (smoother, even, glowing) |
| 02 · Hormone Balancing | `hormone-balancing-home-before.webp` + `hormone-balancing-home-after.webp` | `hormone-balancing-home.mp4` | Lifestyle portrait: Before (tired, drained) → After (energetic, clear-eyed, smiling) |
| 03 · Biohacking | `biohacking-home-before.webp` + `biohacking-home-after.webp` | `biohacking-home.mp4` | Body / posture shot OR an in-clinic therapy photo (red-light, IV, HBOT) transitioning to active, athletic shot |
| 04 · Health Weight | `health-weight-home-before.webp` + `health-weight-home-after.webp` | `health-weight-home.mp4` | Full-body: Before → After composition change, consistent pose / lighting |

Update the paths in `HOME_PHASE_MEDIA` (`src/lib/placeholders.ts`) once assets are in place.

### 3. Service-Page Transformation — Three-Phase Flow (`src/components/ServiceTransformationSection.tsx`)
- Every individual service page now shows a **three-phase client journey**: `Before Treatment` → `Mid-Protocol` → `Final Result`. A segmented control tabs between the three; each phase can render an image OR a short looping video.
- Below the phase tabs, the real draggable `<BeforeAfterSlider>` still shows the final outcome. The compact `TransformationAvatar` stays on the right.
- Per-service media is declared in `SERVICE_PHASE_MEDIA` (`src/lib/placeholders.ts`). Every service has sensible placeholder entries today; swap them one at a time as production photography arrives.

#### Service-Page Asset Checklist (REQUIRED, per service)
For **every** service below, supply all three phase stills. Store under `/public/photos/<service>/` using the naming convention `{service}-phase{1|2|3}.webp`. Videos (`.mp4`, muted 8–15 s loops) are optional and take precedence over stills when present.

All service pages also still need the existing two-file before/after pair (`before.webp` / `after.webp`) for the comparison slider.

| Service | Slug / folder | Stills required (× 3 phases) | Suggested shot |
| --- | --- | --- | --- |
| Botox / Dysport | `botox` | `botox-phase1.webp`, `botox-phase2.webp`, `botox-phase3.webp` | Forehead / glabella at rest + at full expression, Before → 2 weeks in → 2 months |
| Cosmetic Dermal Filler | `cosmetic-dermal-filler` | `cosmetic-dermal-filler-phase1.webp` … `-phase3.webp` | 3/4 profile, cheek / nasolabial area, consistent neutral light |
| Customized UltraFacial | `customized-ultrafacial` | `customized-ultrafacial-phase1.webp` … `-phase3.webp` | Bare-face frontal, Before → day-of-glow → 4 weeks |
| Laser & IPL / BBL | `laser-ipl-bbl` | `laser-ipl-bbl-phase1.webp` … `-phase3.webp` | Pigmentation / vascular area close-up, Before → week 2 → week 8 |
| The Perfect Derma™ Peel | `perfect-derma-peel` | `perfect-derma-peel-phase1.webp` … `-phase3.webp` | Full face, Before → day 4 peel → 3 weeks post |
| Medical Microneedling | `microneedling` | `microneedling-phase1.webp` … `-phase3.webp` | Texture close-up, Before → 1 week (mild pinkness) → 6 weeks |
| Belkyra™ | `belkyra` | `belkyra-phase1.webp` … `-phase3.webp` | Submental / neck profile, Before → session 2 → final |
| Dermaplaning | `dermaplaning` | `dermaplaning-phase1.webp` … `-phase3.webp` | Cheek close-up, Before → day-of → 2 weeks |
| Biohacking | `biohacking` | `biohacking-phase1.webp` … `-phase3.webp` | In-clinic therapy shots + active-life shot (or performance metrics graphic) |
| Hormone Balancing | `hormone-balancing` | `hormone-balancing-phase1.webp` … `-phase3.webp` | Lifestyle portrait showing energy transformation across phases |
| Health Weight | `health-weight` | `health-weight-phase1.webp` … `-phase3.webp` | Full-body front shot, Before → mid-program → final, consistent wardrobe / lighting |

For each service also deliver (or confirm existing) `before.webp` + `after.webp` for the drag slider — update `SERVICE_BEFORE_AFTER` in the same file.

### 4. Sliders — Global Fix & Redesign
- **`BeforeAfterSlider`** — Fixed a rendering bug where the `before` image's pixel width was read from a stale `containerRef.current.clientWidth` during render. Replaced with a `useLayoutEffect` + `ResizeObserver` that keeps the measured width in state, so the slider renders correctly on first paint and on resize. Added `pointer-capture`, `touch-action: none`, a grab / grabbing cursor, and tightened the visual frame (removed the tinted teal background that bled through).
- **`Reviews.tsx`** — Replaced the CSS ticker with a polished one-at-a-time review slider: quote card, star rating, client + service + location, left/right arrows, dot pagination, swipe gestures, 7 s auto-advance that pauses on hover.
- **`TestimonialsWall.tsx`** — Replaced the dual-row marquee with a responsive paginated slider that shows 3 cards on desktop / 2 on tablet / 1 on mobile, with arrow controls, dot pagination, swipe, and 6.5 s auto-advance. Cards are now clean white cards on a neutral background (no teal bleed).

### 5. Authentication Flow — Booking-Time Gate
- Removed the standalone **"Sign In"** link from both the desktop nav and the mobile drawer in `src/components/Header.tsx`. The only auth-related UI in the header is the avatar menu (shown only when already signed in).
- Removed the "Already a client? Sign In" side panel from `src/pages/BookNowPage.tsx`.
- Added a modal auth gate to `BookNowPage`: clicking **Confirm Booking** while unauthenticated now opens a compact in-page modal with a `Sign In` / `Create Account` toggle (React Hook Form + Zod, inline errors). On success the modal closes and the booking is finalised in the same click — the user never has to re-select their date/time/service.
- `/login` and `/signup` routes remain available for direct navigation (dashboard links, deep-linking) but they are no longer surfaced from the global nav.

### 6. Shop CTA + Closing CTA — Minimal Redesign (`src/components/VisitShopCta.tsx`, HomePage closing section)
- New **VisitShopCta** copy and layout:
  - Heading copy: **"Shop our products on our online store."**
  - Removed the full-width teal block, oversized `shop` wordmark, and `text-white` body copy. Layout is now a neutral two-column editorial section on `bg-background` with a single teal CTA button.
  - Product card uses a white glass chip for the bundle label and a dark chip for the "Save 15%" badge — no teal overlay on the image.
- **Home-page closing CTA** — swapped the full-bleed `bg-clinic-teal` hero-style panel for a neutral editorial section: `bg-background`, foreground/60 watermark, solid teal button + outline-only secondary. Adds an italic teal accent on "wellness journey?" to preserve brand warmth.
- **Home-page stats strip** — changed from `bg-clinic-teal text-white` to a neutral `bg-background` band with top/bottom hairline borders. Large teal blocks are now reserved for deliberate accents only.

### 7. Global Colour Rule
Primary blue (`clinic-teal`, `hsl(186 41% 51%)`) is now restricted to:
1. Interactive elements — primary buttons, hover states, links, focus rings.
2. Small accent moments — hairline underlines (`.hairline`), italic emphasis, pill icons.

It must **not** be used for full-width section backgrounds. Neutral surfaces are: `bg-background`, `bg-card`, `bg-secondary` (warm off-white) and `bg-foreground` (near-black, used by the footer only).

### Files Changed in This Pass

| File | Change |
| --- | --- |
| `src/pages/HomePage.tsx` | Hero redesign, stats strip de-teal, closing CTA redesign |
| `src/components/TransformationJourney.tsx` | Rewritten as 4-phase journey with before/after media |
| `src/components/ServiceTransformationSection.tsx` | Rewritten as 3-phase client journey + slider + avatar |
| `src/components/BeforeAfterSlider.tsx` | Fixed stale-width bug, polished interaction |
| `src/components/Reviews.tsx` | Replaced ticker with polished slider |
| `src/components/TestimonialsWall.tsx` | Replaced marquee with paginated slider |
| `src/components/Header.tsx` | Removed "Sign In" (desktop + mobile) |
| `src/components/VisitShopCta.tsx` | Minimal editorial redesign, new copy |
| `src/pages/BookNowPage.tsx` | Auth modal gate at confirmation |
| `src/lib/placeholders.ts` | Added `HOME_PHASE_MEDIA` + `SERVICE_PHASE_MEDIA`, documented asset checklist |

---

## Changelog — Premium Redesign: Video Hero & Transformation Components (2026-04-20)

A major premium-brand upgrade. Goal: make the site feel significantly more high-end (Apple / luxury Korean skincare aesthetic) without losing the existing core identity. Adds motion storytelling, a creative transformation avatar, real before/after sliders, and tightens the services catalogue.

### New Components

#### `src/components/TransformationAvatar.tsx`
- **Purpose**: Creative, interactive "transformation avatar" — a premium UI element that visually communicates anti-aging / aesthetic change.
- **Design**: Glassmorphic panel, orbiting accent rings, animated diagnostic scan-beam, pin-point annotations keyed to each service, portrait that cross-fades BEFORE ↔ AFTER, and animated metric chips (collagen, firmness, hydration, etc.).
- **Variant API**: 12 specialised variants — `home`, `botox`, `filler`, `ultrafacial`, `laser`, `peel`, `microneedling`, `belkyra`, `dermaplaning`, `biohacking`, `hormone`, `weight`. Each drives its own annotations, metrics and copy. A `compact` prop renders a slimmer version used inside service pages.
- **Default portraits**: `AVATAR_BEFORE` / `AVATAR_AFTER` in `src/lib/placeholders.ts` — swap those paths to go live.

#### `src/components/BeforeAfterSlider.tsx`
- **Purpose**: Smooth, draggable before/after image comparison (pointer + touch + keyboard accessible).
- **Interaction**: Click or drag anywhere on the slider; arrow keys also move the handle. Exposes `role="slider"` with ARIA values for accessibility.
- **Styling**: Rounded editorial frame, animated handle, corner "Before" / "After" pills, soft shadow ring in clinic-teal.
- **Asset overrides**: Pass `before=` / `after=` props, or change the `SERVICE_BEFORE_AFTER` map in `src/lib/placeholders.ts`.

#### `src/components/ServiceTransformationSection.tsx`
- **Purpose**: Single drop-in section that pairs a compact `TransformationAvatar` with a `BeforeAfterSlider`, used at the bottom of every service page.
- **API**: `variant`, `serviceSlug`, optional `title` / `subtitle` / `eyebrow`.
- **Placement**: Mounted just above `<ServiceCTA />` on every service page.

#### `src/lib/placeholders.ts`
- **Purpose**: Single source of truth for every placeholder image & video path introduced by this release.
- **Swap instructions**: Drop production assets into `public/photos/…` and update the exported constants (`HERO_VIDEO_MP4`, `HERO_POSTER`, `AVATAR_BEFORE`, `AVATAR_AFTER`, `BEFORE_PHOTO`, `AFTER_PHOTO`, and per-service entries in `SERVICE_BEFORE_AFTER`).

### HomePage Upgrade (`src/pages/HomePage.tsx`)

#### New Hero — full-screen motion video
- **Layout**: Full-viewport video background (`h-screen min-h-[640px]`) with legibility gradients, a floating pill-row of category chips (Skinphy-style), top-left lead copy, a giant editorial wordmark ("AGELESS") that sits *behind* the video subject, and a bottom row with tagline + dual-CTA cluster (Book / View Services).
- **Video source**: `HERO_VIDEO_MP4` = `/photos/no_zoom_in_or_zoom_out_create__Kling_30__00466.mp4` (placeholder). Muted, looping, autoplay, `playsInline` for iOS. `poster` fallback keyed to `HERO_POSTER`.
- **Animations**: Framer Motion orchestrated fades & letter-spacing reveal on the wordmark; scroll cue animates at the bottom.

#### New "Transformation, made visible" section
- Adds a dedicated home-page section introducing the `<TransformationAvatar variant="home" />` — the creative UI element the brief asked for. Sits just above the existing multi-stage `TransformationJourney` so the two complement each other.

### Service Page Upgrades (11 pages)

Every service page now renders `<ServiceTransformationSection />` above its `<ServiceCTA />`, each passing the correct `variant` + `serviceSlug` so the avatar shows specialised annotations / metrics and the slider pulls the right before/after pair:

| Page | variant | serviceSlug |
| --- | --- | --- |
| BotoxDysportPage | `botox` | `botox` |
| CosmeticDermalFillerPage | `filler` | `cosmetic-dermal-filler` |
| CustomizedUltraFacialPage | `ultrafacial` | `customized-ultrafacial` |
| LaserIplBblPage | `laser` | `laser-ipl-bbl` |
| PerfectDermaPeelPage | `peel` | `perfect-derma-peel` |
| MicroneedlingPage | `microneedling` | `microneedling` |
| BelkyraPage | `belkyra` | `belkyra` |
| DermaplaningPage | `dermaplaning` | `dermaplaning` |
| BiohackingPage | `biohacking` | `biohacking` |
| HormoneBalancingPage | `hormone` | `hormone-balancing` |
| HealthWeightPage | `weight` | `health-weight` |

### Service Catalogue — body composition removed

Per owner instruction, the service "InBody Composition Analysis" (and any residual "body composition" copy) is retired:
- `src/pages/ServicesPage.tsx` — removed from the Health & Weight pillar treatments list; replaced with "Nutritional Counseling".
- `src/pages/TreatmentsPage.tsx` — removed from Health Weight `subServices`; program description updated.
- `src/pages/BookNowPage.tsx` — removed from the Health Weight booking service list.
- No other references remain in `src/`.

### Asset Swap Instructions (summary)

All new placeholder paths live in `src/lib/placeholders.ts`. To go production-ready:
1. Drop real assets into `public/photos/` (or sub-folders like `public/photos/botox/…`).
2. Update the corresponding constants in `placeholders.ts`. Hot-reload propagates the change everywhere.
3. For per-service before/after pairs, fill in the `SERVICE_BEFORE_AFTER` map keyed by serviceSlug (see table above).
4. Follow the project image naming rule — `[service]-[location]-[descriptor].webp`, <200 KB, lazy-loaded.

### QA
- `npm run build` passes cleanly. No TypeScript or runtime errors.
- All new components use only Tailwind, Framer Motion, lucide-react and React Router — no new dependencies introduced.

---

## Changelog — Transformation Journey & Journey CTA (2026-04-06)

Added two new homepage sections per owner feedback to better visualize the Ageless Living service journey and port over the "Help Me Create My Ageless Living Journey" concept from the agelessliving.com site.

### New Components

#### TransformationJourney (`src/components/TransformationJourney.tsx`)
- **Purpose**: Interactive visual journey showing how a client transforms through the 4 service pillars (Skin Rejuvenation → Hormone Balancing → Biohacking → Health Weight)
- **Desktop**: Connected progress bar with step nodes, animated active line, stage content panel with image + text
- **Mobile**: Horizontal scrollable pill tabs, stacked layout, full-width CTAs
- **Features**: Stage badge overlay on images showing progression ("Stage 1 of 4"), avatar state description, benefits grid, animated transitions between stages via Framer Motion AnimatePresence
- **Interaction**: Click any stage to jump to it, or use "Next Stage" button to progress linearly

#### JourneyCTA (`src/components/JourneyCTA.tsx`)
- **Purpose**: Interactive AI-powered journey builder — a conversational chat experience that asks users about their wellness goals and generates personalized service recommendations
- **Layout**: Centered card with chat header (clinic-teal), scrollable message thread, option pill buttons, and free-text input
- **Flow**: Welcome → Goal selection → Concern selection (with free-text option) → Age range → Personalized results
- **AI Logic**: `getRecommendations()` analyzes user responses across goal, concern, and age to map to 1–4 service pillars (Skin Rejuvenation, Hormone Balancing, Biohacking, Health Weight)
- **Results**: Animated recommendation cards with color-coded service badges, links to service sections, and "Book My Consultation" CTA
- **Mobile**: Full-width option pills wrap naturally, free-text input with send button, scrollable chat area (max-h-[360px] on mobile, max-h-[420px] on desktop)
- **Interaction**: Click option pills to progress, type custom responses for the concern step, restart anytime via header button

### HomePage Integration
- `TransformationJourney` inserted after the Treatments section
- `JourneyCTA` inserted after TransformationJourney, before the About/Philosophy section
- Both sections maintain the existing design language (eyebrow labels, hairline accents, clinic-teal brand color, Jost/Inter typography)

### Mobile Responsiveness
- All new components follow mobile-first responsive design
- Progressive text sizing, padding, and spacing across all breakpoints
- Scrollable horizontal tabs on mobile for journey stages
- Full-width CTAs on mobile with vertical stacking
- Hidden/shown elements adapted per breakpoint (floating card hidden on mobile, mini grid shown instead)

---

## Changelog — Mobile Responsiveness Optimization (2026-04-06)

A comprehensive mobile-first optimization pass for AboutUsPage, ContactPage, and Footer component to ensure premium UX on all screen sizes.

### AboutUsPage Mobile Optimizations
- **Hero Section**: Reduced top padding from `pt-28` to `pt-24` on mobile, improved text sizing from `text-4xl` to `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` for better mobile readability
- **Container Padding**: Updated from `px-6 md:px-8` to mobile-first `px-4 sm:px-6 lg:px-8` for tighter margins on small screens
- **Rounded Corners**: Progressive rounding `rounded-xl md:rounded-2xl` instead of fixed `rounded-2xl`
- **Section Spacing**: Reduced mobile padding throughout (e.g., `py-12 md:py-16 lg:py-20` vs previous `py-16 md:py-20`)
- **Text Hierarchy**: Better progressive sizing for all headings and body text with sm/md/lg breakpoints
- **CTA Buttons**: Primary button now full-width on mobile (`w-full sm:w-auto`) for easier tapping, flex-col to flex-row on small screens
- **Image & Icon Sizing**: Progressive sizing (e.g., `w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64`) for better mobile layouts
- **Gap Spacing**: Tighter gaps on mobile throughout all grid layouts

### ContactPage Mobile Optimizations
- **Page Padding**: Top padding reduced from `pt-32` to `pt-24 md:pt-32` for mobile
- **Container**: Replaced generic `section-padding` with explicit `px-4 sm:px-6 lg:px-16` for consistency
- **Header Text**: Better progressive sizing `text-3xl sm:text-4xl md:text-4xl lg:text-5xl`
- **Location Cards**: Reduced padding `p-6 sm:p-8 lg:p-10` and tighter spacing throughout
- **Card Corners**: Progressive rounding `rounded-2xl md:rounded-3xl`
- **Get Directions Button**: Full-width on mobile (`w-full sm:w-fit`) with `justify-center` for better UX, added `rounded-lg` for visual consistency
- **Card Spacing**: Reduced gap from `space-y-10` to `space-y-6 md:space-y-10` for mobile

### Footer Mobile Optimizations
- **Container Padding**: Mobile-first `px-4 sm:px-6 lg:px-16 py-12 md:py-16 lg:py-20` (reduced from `py-16 md:py-20`)
- **Grid Spacing**: Tighter gaps `gap-10 md:gap-12 lg:gap-20` (from `gap-12 md:gap-20`)
- **Text Sizing**: All text now has mobile sizes `text-xs md:text-sm` for nav links and location info
- **Logo Sizing**: Progressive `h-7 md:h-8` for better mobile fit
- **Location Grid**: Changed from `md:grid-cols-2` to `sm:grid-cols-2` so two-column layout appears earlier
- **Link Spacing**: Reduced gaps `gap-x-6 md:gap-x-8 gap-y-2.5 md:gap-y-3` for mobile
- **Bottom Bar**: Better mobile centering with `text-center md:text-left` for copyright

### Mobile-First Design Patterns Applied
- Consistent container padding: `px-4 sm:px-6 lg:px-16`
- Reduced section padding on mobile: `pt-24 md:pt-32` and `py-12 md:py-16 lg:py-20`
- Progressive text sizing: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
- Tighter gaps and spacing on mobile throughout
- Full-width buttons on mobile with proper touch targets
- Progressive rounded corners: `rounded-xl md:rounded-2xl`
- Better responsive grid patterns with sm/md/lg breakpoints

## Changelog — Clinical Refinement Pass (2026-04-05 · v2)

A second pass that repositions the visual identity toward a clinical,
scientific aesthetic (reference: "The Ordinary").

### Typography
- **Removed Fraunces / all serif fonts**.
- Headings (`h1–h6`) now render in **Jost** (with Raleway fallback) — clean,
  geometric, minimalist. `font-display` utility and `.eyebrow` now resolve to
  Jost so every existing usage upgrades automatically.
- Body copy now uses **Inter** (replacing DM Sans).
- Imports updated in `src/index.css`; Tailwind `fontFamily` tokens updated.

### Ageless Blue Palette
- `--clinic-teal` CSS variable **repurposed to clinical blue** (`hsl(212 68% 38%)`),
  so every existing `text-clinic-teal` / `bg-clinic-teal` instance across the
  codebase instantly switches to the Ageless blue without per-file edits.
- New tokens: `--ageless-blue`, `--ageless-blue-deep` (CTA background), and
  `--ageless-blue-soft` (section tints). Exposed as Tailwind colours
  `ageless-blue`, `ageless-blue-deep`, `ageless-blue-soft`.
- New `::selection` highlight uses the Ageless blue.

### Video-First Integration
- HomePage hero rebuilt around a **full-width framed muted-looping `<video>`**
  using the existing `/public/human_graphic.{webm,mp4}` asset, with an
  editorial copy + CTA overlay in the bottom gutter.
- Reusable `LoopVideo` component renders additional muted/looping players
  used in three more on-page sections:
  1. Philosophy section — portrait-ratio video
  2. Patient Stories / Testimonials — three portrait videos in a grid
  3. (Hero counts as the fourth major video integration)
- All videos use existing assets — no new media or AI photos introduced.

### Logo Presence & Watermark
- New `.logo-watermark` CSS utility — oversized outlined wordmark for
  decorative backgrounds.
- HomePage closing CTA now uses the **ageless-blue-deep** background with a
  faint `footer-logo.png` badge and a massive outlined "ageless" wordmark as
  a background watermark.
- `VisitShopCta` component rebuilt on the same ageless-blue-deep background
  with a logo badge, an `ageless` wordmark watermark, larger whitespace and
  the new uppercase Jost headline treatment.

### Whitespace
- Section padding bumped across the board (e.g. HomePage section `py-32
  md:py-48`, VisitShop `py-28 md:py-40`) to match high-end clinical brands.

---

## Changelog — Premium UI Overhaul (2026-04-05)

A bespoke editorial redesign intended to remove any "AI-generated template"
feel and align the brand with the visual standard of Apple / Stripe /
premium wellness editorial sites.

### Typography
- Added **Fraunces** (modern display serif) paired with existing **DM Sans**.
- Global `h1`, `h2`, `h3` now render in Fraunces (`font-display`), light weight,
  tight negative tracking. Body, eyebrows and UI copy remain DM Sans.
- New CSS utilities: `.font-display`, `.font-sans-alt`, `.eyebrow`, `.hairline`,
  `.scrollbar-none`.
- New Tailwind font family tokens: `font-display`, `font-serif`.

### Layout & Global Components
- **Removed** `PromoPopup` (discount modal) from `Layout.tsx` — site no longer
  shows a promotional popup on load.
- **Added** `src/components/VisitShopCta.tsx` — a premium, globally-mounted
  "Visit Shop" module rendered above the footer on every route. Editorial
  12-col layout with giant outlined display type, dark teal gradient card,
  featured product image (`shop-1.jpeg`) and a high-contrast pill CTA.
- `Layout.tsx` now renders `<VisitShopCta />` between `<Outlet />` and
  `<Footer />`.

### HomePage (`src/pages/HomePage.tsx`) — full rewrite
- Editorial asymmetric 12-column grid throughout.
- Massive serif display hero ("Live better, *longer* — at any age.") with
  supporting portrait + inset secondary image, instead of the previous
  gradient-heavy template hero.
- New pillar section: editorial row list (number / title / blurb / thumbnail)
  using only existing brand assets (`services-1…4.jpg`).
- Philosophy section with large quote + portrait (`about-us-1.jpg`).
- Locations grid using existing `victoria.png`, `langley.jpg`, `kelowna.jpg`.
- All generic stock / AI-style imagery removed — only existing Ageless Living
  brand assets referenced.

### ServicesPage (`src/pages/ServicesPage.tsx`) — full rewrite
- Sophisticated **sticky side-navigation** on desktop (`lg:` +) that highlights
  the active pillar via `IntersectionObserver`.
- Horizontal scrolling chip nav on mobile for the same four pillars.
- Each pillar rendered as an editorial article: number, eyebrow, Fraunces
  display title with italic accent, 7/5 image+copy grid, and a numbered
  "treatment rows" list (`01 / name / description / arrow`) that links to
  individual service sub-pages.
- Brand imagery only (`services-1…4.jpg`).

### Service Sub-Pages
- Automatically inherit the new serif heading style globally via the `h1/h2/h3`
  rule in `index.css`, lifting every service page (Botox, Filler, Laser, etc.)
  into the same typographic system without page-by-page rewrites.

---

## Overview

This document describes the technical architecture of the Ageless Living™ Wellness Centre website, a React single-page application (SPA) built for a multi-location wellness clinic in British Columbia.

---

## 1. Technology Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI framework |
| TypeScript | 5.8.3 | Type-safe JavaScript |
| Vite | 5.4.19 | Build tool and dev server |
| React Router DOM | 6.30.1 | Client-side routing |

### Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 3.4.17 | Utility-first CSS |
| shadcn/ui | - | Component library (Radix UI) |
| Framer Motion | 12.38.0 | Animations |

### Data & Forms
| Technology | Version | Purpose |
|------------|---------|---------|
| TanStack React Query | 5.83.0 | Server state management |
| React Hook Form | - | Form handling |
| Zod | - | Schema validation |
| date-fns | - | Date manipulation |

### Testing
| Technology | Purpose |
|------------|---------|
| Vitest | Unit testing |
| Playwright | E2E testing |

---

## 2. Application Architecture

### Entry Points

```
index.html          → HTML shell
  └── src/main.tsx  → React DOM render
        └── App.tsx → Root component with providers
```

### Provider Hierarchy

```tsx
<HelmetProvider>           // SEO meta tag management
  <QueryClientProvider>    // React Query cache
    <TooltipProvider>      // UI tooltips
      <BrowserRouter>      // Client-side routing
        <Routes />
        <Toaster />        // Toast notifications
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
</HelmetProvider>
```

### Routing Architecture

```
BrowserRouter
├── Layout (wrapper)
│   ├── Header
│   ├── <Outlet />  ← Page content
│   ├── Footer
│   └── PromoPopup
│
└── Routes
    ├── /                    → HomePage
    ├── /services                      → ServicesPage
    ├── /services/botox-dysport        → BotoxDysportPage
    ├── /services/hormone-balancing    → HormoneBalancingPage
    ├── /services/cosmetic-dermal-filler → CosmeticDermalFillerPage
    ├── /services/customized-ultrafacial → CustomizedUltraFacialPage
    ├── /services/laser-ipl-bbl        → LaserIplBblPage
    ├── /services/perfect-derma-peel   → PerfectDermaPeelPage
    ├── /services/microneedling        → MicroneedlingPage
    ├── /services/belkyra              → BelkyraPage
    ├── /services/dermaplaning         → DermaplaningPage
    ├── /services/biohacking           → BiohackingPage
    ├── /services/health-weight        → HealthWeightPage
    ├── /locations/victoria            → VictoriaPage
    ├── /locations/langley             → LangleyPage
    ├── /locations/kelowna             → KelownaPage
    ├── /about-us            → AboutUsPage
    ├── /our-team            → TeamPage (staff listing by location)
    ├── /our-team/:slug      → StaffProfilePage (individual staff bio page)
    ├── /faqs                → FAQPage
    ├── /careers             → AboutUsPage (placeholder)
    ├── /blog                → BlogPage
    ├── /book                → BookNowPage
    ├── /shop                → ShopPage
    ├── /contact             → ContactPage
    ├── /treatments          → Redirect to /services
    ├── /journey             → Redirect to /about-us
    ├── /locations           → Redirect to /about-us
    └── *                    → NotFound (404)
```

---

## 3. Directory Structure

```
ageless-journey-creator/
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── src/
│   ├── assets/                    # Static images and media
│   │
│   ├── components/
│   │   ├── ui/                    # shadcn/Radix UI (73 components)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   │
│   │   ├── Layout.tsx             # Page wrapper
│   │   ├── Header.tsx             # Navigation
│   │   ├── Footer.tsx             # Footer
│   │   ├── Booking.tsx            # Booking form
│   │   ├── ChatBot.tsx            # AI assistant
│   │   ├── Hero.tsx               # Hero section
│   │   ├── OurTreatments.tsx      # Treatments intro section
│   │   ├── ServicesPreview.tsx    # Services grid
│   │   ├── HomeLocations.tsx      # Location cards for homepage
│   │   ├── Treatments.tsx         # Treatment list
│   │   ├── TestimonialsWall.tsx   # Reviews section
│   │   ├── TeamSection.tsx        # Staff profiles
│   │   ├── Products.tsx           # Product listings
│   │   ├── Locations.tsx          # Location tabs with team
│   │   ├── Contact.tsx            # Contact form
│   │   ├── ServiceCTA.tsx         # Reusable CTA for service pages
│   │   └── ...                    # 25+ feature components
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── BotoxDysportPage.tsx
│   │   ├── HormoneBalancingPage.tsx
│   │   ├── CosmeticDermalFillerPage.tsx
│   │   ├── CustomizedUltraFacialPage.tsx
│   │   ├── LaserIplBblPage.tsx
│   │   ├── PerfectDermaPeelPage.tsx
│   │   ├── MicroneedlingPage.tsx
│   │   ├── BelkyraPage.tsx
│   │   ├── DermaplaningPage.tsx
│   │   ├── BiohackingPage.tsx
│   │   ├── HealthWeightPage.tsx
│   │   ├── VictoriaPage.tsx
│   │   ├── LangleyPage.tsx
│   │   ├── KelownaPage.tsx
│   │   ├── AboutUsPage.tsx
│   │   ├── TeamPage.tsx             # Staff listing by location
│   │   ├── StaffProfilePage.tsx     # Individual staff bio page
│   │   ├── FAQPage.tsx
│   │   ├── BlogPage.tsx
│   │   ├── BookNowPage.tsx
│   │   ├── ShopPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── NotFound.tsx
│   │
│   ├── data/
│   │   └── staffData.ts             # Centralized staff data (single source of truth)
│   │
│   ├── hooks/
│   │   ├── use-toast.ts           # Toast notifications
│   │   └── use-mobile.tsx         # Mobile detection
│   │
│   ├── lib/
│   │   └── utils.ts               # Tailwind merge utilities
│   │
│   ├── test/
│   │   ├── setup.ts               # Vitest setup
│   │   └── example.test.ts
│   │
│   ├── App.tsx                    # Root component
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Global styles
│   └── vite-env.d.ts
│
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
└── eslint.config.js
```

---

## 4. Component Architecture

### Layout Components

```
Layout
├── Header
│   ├── Logo (ageless-living-logo-teal.png, h-10 md:h-14)
│   ├── Desktop Navigation (NavLink items)
│   ├── Book Now CTA Button
│   └── Mobile Menu (Sheet component)
│
├── Page Content (<Outlet />)
│
├── Footer
│   ├── Brand Section
│   ├── Location Links
│   ├── Service Links
│   ├── Contact Info
│   └── Social Links
│
└── PromoPopup (conditional)
```

### Page Composition Pattern

```tsx
// Typical page structure
<Layout>
  <Helmet>
    <title>Page Title</title>
    <meta name="description" content="..." />
  </Helmet>

  <Hero />
  <Section1 />
  <Section2 />
  <ServiceCTA />  // For service pages
  <FloatingBookNow />
</Layout>
```

### ServiceCTA Component

Reusable call-to-action component for all service pages:

```tsx
// ServiceCTA.tsx
interface ServiceCTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

// Default props
title: "Ready to start your aesthetic journey?"
description: "Book a comprehensive consultation with our medical team at any of our three locations."
primaryButtonText: "Book Online"
primaryButtonLink: "/book"
secondaryButtonText: "View Our Locations"
secondaryButtonLink: "/about-us"
```

**Features:**
- Consistent teal background (bg-clinic-teal)
- Two-button CTA layout (primary white, secondary outlined)
- Framer Motion scroll animations
- Fully customizable via props
- Used on all service pages: BotoxDysport, CosmeticDermalFiller, CustomizedUltraFacial, LaserIplBbl, PerfectDermaPeel, Microneedling, Belkyra, Dermaplaning, HormoneBalancing, Biohacking, HealthWeight

**Benefits:**
- Single source of truth for CTA styling
- Easy to update across all pages
- Maintains design consistency
- Reduces code duplication (~30-40 lines saved per page)

### HomePage Component Structure

The homepage follows a minimal, premium design with four main sections:

```
HomePage
├── Helmet (SEO meta tags + JSON-LD schema)
├── Hero Section (Two-column with video)
│   ├── Left Column: Text content
│   │   ├── Headline: "Discover your best self, at any age."
│   │   ├── Subtext: Treatment offerings message
│   │   └── CTAs: "Explore our Locations" + "Learn more"
│   └── Right Column: Video (human_graphic.mp4/.webm)
│       ├── autoplay, loop, muted, playsInline
│       ├── object-cover styling
│       └── Soft gradient overlay on left edge
├── Treatments Section (4-column grid)
│   ├── Header: "Our Treatments" + "View All Services" link
│   └── 4 Treatment Cards (icon-based, hover effects):
│       ├── Skin Rejuvenation (Sparkles icon)
│       ├── Hormone Balancing (FlaskConical icon)
│       ├── Biohacking (Zap icon)
│       └── Health Weight (Scale icon)
├── Locations Section (Two-column with image)
│   ├── Left Column:
│   │   ├── Heading: "Our Locations"
│   │   ├── Description: Serving BC for over a decade
│   │   └── 3 Location Cards (hover border effect):
│   │       ├── Victoria Clinic → /locations/victoria
│   │       ├── Langley Clinic → /locations/langley
│   │       └── Kelowna Clinic → /locations/kelowna
│   └── Right Column: Clinical environment image
└── Leadership Section (Centered)
    ├── Badge: "Our Expertise"
    ├── Heading: "Clinical Excellence & Collaborative Expertise"
    ├── Description: Team and standards message
    └── CTAs: "Meet our full team" + "Clinical Standards"
```

**Design Features:**
- Two-column hero with looping video (human_graphic.mp4/.webm)
- Treatment cards with teal hover state and lift animation
- Location cards with border highlight on hover
- Minimal, editorial typography with tight tracking
- Framer Motion scroll-triggered animations
- Responsive: stacks on mobile, side-by-side on desktop

### HormoneBalancingPage Component Structure

Dedicated treatment detail page for Hormone Balancing services - redesigned with updated content and structure:

```
HormoneBalancingPage
├── Helmet (SEO meta tags)
├── Hero Section (min-h-85vh, py-12-16)
│   ├── Badge: "Well-being & Vitality"
│   ├── Headline: "Hormone Balancing" (text-5xl-7xl)
│   ├── Detailed description paragraphs covering:
│   │   ├── Hormone imbalance causes and effects
│   │   ├── Environmental factors and toxins
│   │   ├── MD-directed programs
│   │   └── Location availability note
│   ├── CTAs: "Start Your Journey", "Watch the Story"
│   └── Hero image with decorative blur effects
├── Why Test Your Hormones Section (py-20-24)
│   ├── Left column: Detailed explanation text
│   └── Right column:
│       ├── Benefits card with description
│       └── Image banner with overlay text
├── Video Section (py-16-20)
│   └── Video placeholder with play button overlay
├── BHRT vs HRT Comparison Section (py-20-24, dark theme)
│   ├── Left column: Evolution explanation
│   └── Right column: Stats grid
│       ├── "100% Identical to Natural" card
│       ├── "MD Board Certified Care" card
│       └── Laboratory image (grayscale)
├── The Process Section (py-20-24)
│   ├── Section header with "Path to Balance" badge
│   ├── Step 01: Physician Consult (with checklist + detailed description)
│   ├── Step 02: Nutritionist Consultation (with checklist + pharmacist access note)
│   └── Step 03: The Follow Up (with checklist + team care message)
└── ServiceCTA Component
    └── Reusable CTA with standard messaging
```

**Design Updates:**
- Replaced entire page content with premium design matching provided HTML
- Larger hero section (85vh min-height) with extensive content
- Three-step process cards with detailed checklists
- Added video section for educational content
- Removed separate locations/maps section (handled by ServiceCTA)
- Reduced vertical padding for more compact layout (py-20-24 instead of py-28-32)
- Uses ServiceCTA component for consistency across all service pages

### CosmeticDermalFillerPage Component Structure

Dedicated treatment detail page for Cosmetic Dermal Filler services:

```
CosmeticDermalFillerPage
├── Helmet (SEO meta tags)
├── Hero Section
│   ├── Badge: "Premium Aesthetics"
│   ├── Headline: "Cosmetic Dermal Filler"
│   ├── Description: Non-surgical path to refined radiance
│   ├── CTAs: "Book Consultation", "View Pricing"
│   └── Hero image with floating badge (Medical Excellence)
├── Focus Areas Section (Precision Artistry)
│   ├── Asymmetric card grid
│   ├── Lips card
│   ├── Cheeks card
│   ├── Jawline card
│   └── Chin card
├── Product Showcase Section (World-Class Formulations)
│   ├── Product list (editorial layout)
│   │   ├── 01 - Restylane®
│   │   ├── 02 - Revanesse®
│   │   ├── 03 - PRP (Platelet-Rich Plasma)
│   │   └── 04 - Sculptra®
│   └── Product image
├── Experience Section (The Ageless Experience)
│   ├── Pre-Treatment Consultation card
│   ├── The Procedure card
│   └── Recovery & Results card
├── CTA Section (dark theme)
│   └── "Refine Your Radiance" + booking link
└── Locations Section
    └── Available at: Victoria, Langley, Kelowna
```

### CustomizedUltraFacialPage Component Structure

Dedicated treatment detail page for Customized UltraFacial (HydraFacial/AquaFirme):

```
CustomizedUltraFacialPage
├── Helmet (SEO meta tags)
├── Hero Section
│   ├── Badge: "Clinical Sanctuary Excellence"
│   ├── Headline: "Customized UltraFacial"
│   ├── Description: HydraFacial (Victoria/Langley), AquaFirme (Kelowna)
│   ├── CTAs: "Book Consultation", "View Results"
│   └── Hero image with floating tech badge
├── Intro Section (The Science of Radiant Health)
│   ├── Quote about clinical intervention
│   └── Process steps: Cleansing, Exfoliation, Extraction, Hydration, Protection
├── Key Features Section
│   ├── Safe for Pregnancy & Breastfeeding card (teal)
│   └── Medical-Grade Efficacy card
├── Benefits Section (Bento Layout)
│   ├── Featured: Immediate Radiant Glow (large card with image)
│   ├── Gentle Exfoliation
│   ├── Deep Cleansing
│   ├── No Downtime
│   └── Intense Hydration (featured teal)
├── CTA Section (dark theme)
│   └── "Begin Your Skin Journey" + booking link
└── Locations Section
    ├── Victoria & Langley: HydraFacial MD®
    ├── Kelowna: AquaFirme®
    └── All Locations: Customized Protocols
```

### LaserIplBblPage Component Structure

Dedicated treatment detail page for Laser & IPL/BBL Photorejuvenation:

```
LaserIplBblPage
├── Helmet (SEO meta tags)
├── Hero Section
│   ├── Badge: "Advanced Dermatology"
│   ├── Headline: "Laser & IPL/BBL Photorejuvenation"
│   ├── Description: Light of Transformation message
│   ├── CTA: "Book Your Clinical Assessment"
│   └── Hero image with floating "Primary Goal" card
├── Introduction Section (Asymmetric Split)
│   ├── Left: "A Masterclass in Non-Invasive Skin Correction"
│   └── Right: Description + "Clinical Excellence" quote
├── Technology Breakdown Section (The Clinical Edge)
│   ├── ICON® IPL System card (Victoria & Langley)
│   │   └── Gold standard for vascular/pigmented lesions
│   └── Sciton® BBL card (Kelowna, dark theme)
│       └── Molecular-level rejuvenation technology
├── Treatment Benefits Section (Targeted Correction)
│   ├── Left: Image with animated border
│   └── Right: Benefit cards
│       ├── Redness & Rosacea
│       ├── Pigmentation
│       ├── Hair Removal
│       └── Texture
├── The Journey Section (Steps)
│   ├── 01 - Consultation
│   ├── 02 - The Session
│   └── 03 - Recovery
├── Locations Section
│   └── Available at: Victoria, Langley, Kelowna
└── CTA Section (teal theme)
    └── "Ready for a Luminous Tomorrow?" + booking CTAs
```

### PerfectDermaPeelPage Component Structure

Dedicated treatment detail page for The Perfect Derma™ Peel:

```
PerfectDermaPeelPage
├── Helmet (SEO meta tags)
├── Hero Section
│   ├── Badge: "Advanced Resurfacing"
│   ├── Headline: "The Perfect Derma™ Peel"
│   ├── Description: Medical-grade chemical peel with Glutathione
│   ├── CTAs: "Book Consultation", "View Pricing"
│   └── Hero image with floating "Medical Grade Authority" card
├── Glutathione Advantage Section
│   ├── Left: Image with decorative blur
│   └── Right: "The Science of Renewal"
│       ├── Description of Glutathione benefits
│       └── Checklist of benefits
├── Targeted Solutions Section (Bento Grid)
│   ├── Large card: Deep Hyperpigmentation & Melasma (94% efficacy)
│   ├── Teal card: Acne & Scarring
│   ├── Radiance Boost card
│   ├── Anti-Aging card
│   └── Pore Refinement card
├── What to Expect Section (dark theme, rounded)
│   ├── Step 1: Treatment Day (15 minutes)
│   ├── Step 2: Days 1-2 (peeling begins)
│   ├── Step 3: Days 3-5 (peak peeling)
│   └── Step 4: Day 7 (complete transformation)
├── Post-Peel Results Section
│   ├── Left: "Post-Peel Radiance" + testimonial
│   └── Right: Result image
├── Locations Section
│   └── Available at: Victoria, Langley, Kelowna
└── CTA Section (teal theme)
    └── "Ready to Transform Your Skin?" + booking CTAs
```

### BelkyraPage Component Structure

Dedicated treatment detail page for Belkyra (submental fat reduction):

```
BelkyraPage
├── Helmet (SEO meta tags)
├── Hero Section
│   ├── Badge: "Advanced Injectable"
│   ├── Headline: "Belkyra™ Submental Contouring"
│   ├── Description: Injectable treatment for double chin reduction
│   ├── CTAs: "Start Your Transformation", "View Results"
│   └── Hero image with floating FDA Approved badge
├── The Science Section (The Science of Dissolving)
│   ├── Card 1: Deoxycholic Acid
│   ├── Card 2: Cellular Disruption (featured, teal)
│   └── Card 3: Natural Elimination
├── The Experience Section (dark theme)
│   ├── Step 01: Clinical Consultation
│   ├── Step 02: Precise Treatment
│   └── Step 03: Recovery & Aftercare
└── CTA Section (teal theme)
    └── "Ready to redefine your profile?" + booking CTA
```

### DermaplaningPage Component Structure

Dedicated treatment detail page for Dermaplaning (manual exfoliation):

```
DermaplaningPage
├── Helmet (SEO meta tags)
├── Hero Section
│   ├── Badge: "Manual Exfoliation Specialist"
│   ├── Headline: "Dermaplaning"
│   ├── Description: Precision manual exfoliation for clarity
│   ├── CTAs: "Book Appointment", "View Pricing"
│   └── Hero image with floating "Immediate results" card
├── The Technique Section
│   ├── Left: Image grid with info cards
│   │   ├── Vellus Hair card
│   │   └── Manual Precision card (teal)
│   └── Right: Description + benefits checklist
├── Radiant Results Section (Bento Grid)
│   ├── The Amazing Glow (large card)
│   ├── Deeper Penetration (teal card)
│   ├── Flawless Application
│   └── The Perfect Add-on (dark card)
├── The Experience Section
│   ├── Step 01: Clinical Consultation
│   ├── Step 02: Precision Treatment
│   └── Step 03: Post-Care Ritual
└── CTA Section (teal theme)
    └── "Ready to reveal your glow?" + booking CTA
```

### BiohackingPage Component Structure

Dedicated page for Biohacking & Longevity services:

```
BiohackingPage
├── Helmet (SEO meta tags)
├── Hero Section
│   ├── Badge: "The Future of Performance"
│   ├── Headline: "Biohacking: Developed by Leaders."
│   ├── Description: Advanced protocols for weight loss, strength, recovery
│   ├── CTAs: "Explore Modalities", "View Locations"
│   └── Hero image with glow effect
├── Clinical Suite Section (Bento Grid)
│   ├── PBM / Red Light Therapy (large card, all locations)
│   ├── IV Therapy (Kelowna Only)
│   ├── HBOT - Hyperbaric Oxygen (Langley, Kelowna)
│   ├── Neurointegrator (dark card, Langley)
│   └── Small Cards Grid:
│       ├── Brain Tap (Kelowna)
│       ├── Far Infrared Sauna (Langley, Kelowna)
│       ├── NuCalm (Victoria, Langley)
│       └── PEMF (All Clinics)
├── Philosophy Quote Section
│   └── "We provide the tools. Your biology provides the transformation."
└── CTA Section (teal theme)
    └── "Ready to optimize your biology?" + booking CTAs
```

### HealthWeightPage Component Structure

Dedicated page for Health Weight management services:

```
HealthWeightPage
├── Helmet (SEO meta tags)
├── Hero Section
│   ├── Badge: "Metabolic Excellence"
│   ├── Headline: "Health Weight"
│   ├── Description: Weight as function of diet and metabolism
│   └── Hero image (4:5 aspect ratio, portrait)
├── Foundation Section (The Modern Epidemic)
│   ├── Left: Two-column image grid (healthy food photography)
│   └── Right: Problem statement + description
│       ├── North American diet issues (high fat + high carb)
│       ├── Inflammation and chronic diseases
│       └── Lifestyle factors (stress, sleep, sedentary)
├── What Makes Us Different Section (Bento Grid)
│   ├── Large Feature Card: "Correcting the Cause"
│   │   ├── Description: Addressing root causes (gut, metabolism, hormones)
│   │   └── Physician avatars + "Expert Physician Oversight"
│   ├── Side Card: "Beyond the Bandage" (teal theme)
│   └── Bottom Features (3-column):
│       ├── Individualized (holistic approach)
│       ├── Assessment (hormone testing, nutrition)
│       └── Safety First (medically-based program)
├── Video Section
│   ├── Full-width video placeholder with play button
│   ├── Title: "The Science of Metabolism"
│   └── Subtitle: "Watch our full methodology"
└── Final CTA Section (teal theme)
    ├── Heading: "Ready to reclaim your health?"
    ├── Description: Comprehensive plan for sustainable weight
    └── CTA: "Schedule Your Consultation" → /book
```

**Design Features:**
- Premium medical aesthetic with scientific precision messaging
- Bento grid layout for feature cards
- Teal accent color scheme matching brand
- Framer Motion scroll animations
- Responsive image grids and asymmetric layouts
- Video placeholder with hover effects

### AboutUsPage Component Structure

Dedicated About Us page showcasing company mission and values:

```
AboutUsPage
├── Helmet (SEO meta tags)
├── Hero Section (Two-column)
│   ├── Left: "About Us" eyebrow + "Helping you feel like yourself again." headline + intro copy
│   └── Right: Practitioner/patient image (rounded-2xl)
├── Our Values Section (bg-cream-dark)
│   └── 3 cards: Genuine care, Medical expertise, Personalized approach
├── Our Story Section (Two-column, bg-background)
│   ├── Left: Team image (rounded-2xl)
│   └── Right: Origin story + "Meet our team" link
├── The Science Section (bg-cream-dark) — NEW
│   ├── Left: "The Science" eyebrow + "Good medicine starts with information" + intro
│   ├── Right: 4 principle cards (test before we treat, bio-identical hormones,
│   │         physician review, equipment with evidence — Sciton BBL, ICON IPL, HBOT)
│   └── Closing pull-quote: ongoing re-testing and plan adjustment
├── Team Preview Section (Two-column, bg-sage-light)
│   └── Copy + "Meet the full team" CTA + team image
├── Locations Section (bg-background) — REDESIGNED, photo-free
│   └── 3 typographic clinic cards (Victoria, Langley, Kelowna):
│       address, click-to-call phone, hours, "Book a visit" + "Directions" links
│       (no location photos — replaced the previous image-based cards)
└── Final CTA Section (bg-primary)
    ├── Heading: "Ready to get started?"
    └── CTA: "Book Your Free Consultation"
```

**Design Features:**
- Authentic, plain-spoken copy for the new Science section (real equipment and
  diagnostics named; avoids generic marketing language)
- Photo-free location cards with a subtle teal top-accent gradient, click-to-call
  phone links, and external Google Maps "Directions" links
- Alternating cream/sage/background section bands for clear separation
- Editorial serif display headings (Playfair) with italic teal emphasis
- Framer Motion scroll-triggered animations; mobile-first responsive layout

### VictoriaPage Component Structure

Location page for the Victoria clinic (compact styling ~15% smaller than standard):

```
VictoriaPage
├── Helmet (SEO meta tags)
├── Hero Section
│   ├── Badge: "Our Sanctuary"
│   ├── Headline: "Victoria Clinic"
│   ├── Contact info (address, phone, email)
│   ├── Hours note callout
│   ├── CTAs: "Book Consultation", "Get Directions"
│   └── Hero image with Victoria city thumbnail
├── Treatments Section
│   ├── Heading: "Treatments available in Victoria"
│   └── 4 treatment cards (Biohacking, Health Weight, Hormone, Skin)
├── Map & Hours Section
│   ├── Google Maps embed (left)
│   └── Clinic hours card (teal, right)
├── Meet the Team Section
│   └── 6 team member cards with photos and roles
└── CTA Section (dark theme)
    └── "Ready to begin your journey?" + booking CTA
```

### LangleyPage Component Structure

Location page for the Langley Clinic (compact styling ~15% smaller than standard):

```
LangleyPage
├── Helmet (SEO meta tags)
├── Hero Section
│   ├── Badge: "Our Sanctuary"
│   ├── Headline: "Langley Clinic"
│   ├── Contact info (415-20178 96 Ave, +1 236-326-6830, langley@agelessliving.ca)
│   ├── Hours note callout
│   ├── CTAs: "Book Consultation", "Get Directions"
│   └── Hero image with Langley city thumbnail
├── Treatments Section
│   ├── Heading: "Treatments available in Langley"
│   └── 4 treatment cards (Biohacking, Health Weight, Hormone, Skin)
├── Map & Hours Section
│   ├── Google Maps embed (left)
│   └── Clinic hours card (teal, right)
├── Meet the Langley Team Section
│   └── 3 team member cards:
│       ├── Avnit Bhullar (Medical Aesthetician)
│       ├── Michael Forbes, BSc Pharm (Owner, Pharmacist)
│       └── Dr. Jean Paul Lim, MD, FRCPC (Owner, Internal Medicine)
└── CTA Section (dark theme)
    └── "Ready to begin your journey?" + booking CTA
```

### KelownaPage Component Structure

Location page for the Kelowna Clinic (compact styling ~15% smaller than standard):

```
KelownaPage
├── Helmet (SEO meta tags)
├── Hero Section
│   ├── Badge: "Visit Ageless Living"
│   ├── Headline: "Kelowna Clinic"
│   ├── Contact info (102-3320 Richter Street, +1 778-760-9827, kelowna@agelessliving.ca)
│   ├── Online booking note callout
│   ├── CTAs: "Book Consultation", "Get Directions"
│   └── Hero image with Kelowna/Okanagan thumbnail
├── Intro Section
│   └── "Ageless Living™ brings together the best of what's possible..."
├── Treatments Section
│   ├── Heading: "Treatments available in Kelowna"
│   └── 4 treatment cards (Biohacking, Health Weight, Hormone, Skin)
├── Map & Hours Section
│   ├── Google Maps embed (left)
│   └── Clinic hours card (teal, right)
├── Meet the Team Section
│   └── 4 team member cards:
│       ├── Rachel Bowman-Fassio (Clinic Manager)
│       ├── Ali Latendre (Medical Office Assistant & Medical Esthetician)
│       ├── Michael Forbes, BSc Pharm (Owner, Pharmacist)
│       └── Dr. Jean Paul Lim, MD, FRCPC (Owner, Internal Medicine)
└── CTA Section (dark theme)
    └── "Ready to begin your journey?" + booking CTA
```

### Centralized Staff Data System (`src/data/staffData.ts`)

Single source of truth for all staff data. Used by TeamPage, LocationsPage, StaffProfilePage, TeamSection (homepage), and all location pages (Victoria, Langley, Kelowna).

**StaffMember Interface:**
```typescript
{
  name: string;          // Full name with credentials
  slug: string;          // URL-safe identifier (e.g. "michael-forbes")
  role: string;          // Full title/position
  credentials: string;   // Professional credentials
  image: string;         // Photo URL or local path (/images/team/name-headshot.webp)
  locations: Location[]; // ["langley", "kelowna", "victoria"]
  bio: string;           // Full biography paragraph(s)
  education: string[];   // Degrees, certifications
  specializations: string[];
  treatments: string[];  // Treatment categories they handle
  availability: string;
  funFact?: string;
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  email?: string;
  phone?: string;
}
```

**Complete Staff Roster (11 members):**

| Name | Slug | Role | Locations |
|------|------|------|-----------|
| Michael Forbes, BSc Pharm | michael-forbes | Owner, Pharmacist, Certified in Hormone Restoration | Langley, Kelowna, Victoria |
| Dr. Jean Paul Lim, MD, FRCPC | dr-jean-paul-lim | Owner, Internal Medicine, Complex Care, and Longevity Specialist | Langley, Kelowna, Victoria |
| Sarita Hutton | sarita-hutton | Owner, Aesthetic Nurse Specialist, Director of Aesthetic Medicine | Victoria |
| Rachel Bowman-Fassio, BSc, CN, RHN | rachel-bowman-fassio | Clinic Manager | Kelowna |
| Ali Latendre | ali-latendre | Medical Office Assistant & Medical Esthetician | Kelowna |
| Avnit Bhullar | avnit-bhullar | Medical Aesthetician | Langley |
| Jenny Hwang, RN | jenny-hwang | Aesthetic Nurse Mentee | Victoria |
| Madison Allen | madison-allen | Medical Aesthetician | Victoria |
| Lucy Watson | lucy-watson | Clinic Manager | Victoria |
| Natalie King | natalie-king | Medical Office Assistant | Victoria |

> **Pending additions (awaiting bios/photos):** Dr. Vicky Gairns (Naturopathic Doctor), Michelle Shewchuk, NP (Nurse Practitioner), and Cori Jeffery (Esthetician) for Kelowna; and Daman for Langley. To be added once their bios, credentials, and photos are received from the clinics.

**Image Convention:**
- Path: `/images/team/[firstname-lastname]-headshot.webp`
- Alt text: `"Photo of [Name] - [Title], Ageless Living"`
- Format: .webp, compressed <200KB
- Currently using live WordPress URLs where available; local placeholder paths for missing photos

**Helper Functions:**
- `getStaffByLocation(location)` — Filter staff by clinic
- `getStaffBySlug(slug)` — Find single member by URL slug
- `getFeaturedStaff()` — 3 founders for homepage
- `getStaffAltText(member)` — Generate SEO alt text

### StaffProfilePage Component Structure (`/our-team/:slug`)

Individual staff bio page — full "staff bio book" layout:

```
StaffProfilePage
├── Helmet (SEO: "[Name] — [Role] | Ageless Living™")
├── Back to Team Link (← Back to Team)
├── Hero Section (2-column on desktop)
│   ├── Left: Large professional headshot (4:5 ratio, rounded-2xl)
│   └── Right: Name, title, location badges, social links, bio, availability
├── Details Section (3-column cards on bg-secondary/20)
│   ├── Education & Certifications card
│   ├── Specializations card
│   └── Treatments & Services card (with treatment icons)
├── Fun Fact card (if provided)
└── CTA Section (if has treatments)
    └── "Ready to book with [FirstName]?" + Book a Consultation button
```

**Profile URL pattern:** `/our-team/[slug]` (e.g. `/our-team/michael-forbes`)

### Header Navigation with Services & Locations Dropdowns

The Header component includes dropdown menus for Services and Locations:

```
Header
├── Logo
├── Desktop Navigation
│   ├── Home
│   ├── Services (with dropdown) - Hover to open
│   │   ├── Skin Rejuvenation → /services#skin-rejuvenation
│   │   ├── Hormone Balancing → /services#hormone-balancing
│   │   ├── Biohacking → /services#biohacking
│   │   ├── Health Weight → /services#health-weight
│   │   └── View All Services → /services
│   ├── About (with dropdown) - Hover to open
│   │   ├── About Us → /about-us
│   │   ├── Our Team → /our-team
│   │   ├── FAQs → /faqs
│   │   ├── Blog → /blog
│   │   └── Careers → /careers
│   └── Locations (with dropdown) - Hover to open
│       ├── Victoria → /locations/victoria
│       ├── Langley → /locations/langley
│       └── Kelowna → /locations/kelowna
├── Book a time CTA
└── Mobile Menu (with expandable Services, About + Locations sections)
    ├── Tap "Services" to expand service options
    ├── Tap "About" to expand about options
    └── Tap "Locations" to view location options
```

**Dropdown Implementations:**

*Services Dropdown:*
- Desktop: Hover over "Services" to reveal dropdown (onMouseEnter/onMouseLeave)
- Mobile: Tap "Services" button to expand/collapse service links
- Dropdown auto-closes on navigation or when mouse leaves
- Animated dropdown with Framer Motion (fade-in: opacity 0→1, y: 8→0)
- Includes "View All Services" link with clinic-teal styling

*About Dropdown:*
- Desktop: Hover over "About" to reveal dropdown
- Mobile: Tap "About" button to expand/collapse about links
- Five items: About Us, Our Team, FAQs, Blog, Careers
- Dropdown auto-closes on navigation or when mouse leaves
- Same animation pattern as Services dropdown
- Min-width: 180px

*Locations Dropdown:*
- Desktop: Hover over "Locations" to reveal dropdown
- Mobile: Static list display
- Three location links with MapPin icons
- Same animation pattern as other dropdowns

**Anchor Link Features:**
- Each ServicesPage section has a unique ID:
  - `id="skin-rejuvenation"` (line 124)
  - `id="hormone-balancing"` (line 187)
  - `id="biohacking"` (line 273)
  - `id="health-weight"` (line 345)
- Sections use `scroll-mt-24` class to offset for the fixed navbar (prevents overlap)
- Global smooth scrolling enabled: `html { scroll-behavior: smooth }` (index.css line 102-104)
- ServicesPage includes `useEffect` to handle hash navigation on page load (line 39-48)

**UX Details:**
- Dropdown closes automatically after clicking a service link
- Keyboard navigation supported via standard link focus states
- Mobile menu collapses when navigating to avoid UI overlap
- Chevron icon rotates 180° when dropdown is open
- Consistent spacing and styling with existing Locations dropdown

### UI Component Library (shadcn/ui)

73 pre-built accessible components including:

- **Layout**: Card, Accordion, Tabs, Separator, Aspect Ratio
- **Forms**: Input, Select, Checkbox, Radio Group, Switch, Slider, Calendar
- **Feedback**: Toast, Alert, Progress, Skeleton
- **Overlay**: Dialog, Drawer, Popover, Tooltip, Hover Card
- **Navigation**: Navigation Menu, Menubar, Command, Breadcrumb
- **Data Display**: Table, Avatar, Badge, Carousel

---

## 5. State Management

### Strategy: Minimal State

The application uses a lightweight state approach:

| State Type | Solution | Usage |
|------------|----------|-------|
| Server State | React Query | API data caching (ready but underutilized) |
| UI State | React useState | Forms, modals, toggles |
| Route State | React Router | URL parameters, navigation |
| Meta State | Helmet | Document head management |

### No Global State Library

- No Redux, Zustand, or Jotai
- Component-level state with prop drilling
- React Query ready for future API integration

---

## 6. Styling System

### Tailwind Configuration

```typescript
// tailwind.config.ts
{
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        // Brand colors via CSS variables
        "clinic-teal": "hsl(var(--clinic-teal))",
        "wellness-charcoal": "hsl(var(--wellness-charcoal))",
        "wellness-warm": "hsl(var(--wellness-warm))",

        // Semantic colors
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        lg: "1rem",
        md: "calc(1rem - 2px)",
        sm: "calc(1rem - 4px)",
      },
    },
  },
}
```

### CSS Variables (index.css)

```css
:root {
  /* Brand */
  --clinic-teal: 181 100% 19%;
  --wellness-charcoal: 0 0% 10%;
  --wellness-warm: 30 33% 97%;

  /* Semantic */
  --background: 30 33% 97%;
  --foreground: 0 0% 10%;
  --primary: 0 0% 17%;
  --primary-foreground: 0 0% 100%;
  --accent: 30 18% 95%;
  --border: 0 0% 90%;
  --radius: 1rem;
}
```

### Utility Classes

```css
.section-padding  /* Responsive horizontal padding */
.section-y        /* Vertical section spacing */
.label-sm         /* Small label styling */
.text-gradient    /* Gradient text effect */
```

---

## 7. Data Flow

### Current State: Static Data

Data is currently hardcoded in components:

```tsx
// Example: Location data in Booking.tsx
const locations = [
  { id: "langley", name: "Langley", address: "..." },
  { id: "victoria", name: "Victoria", address: "..." },
  { id: "kelowna", name: "Kelowna", address: "..." },
];

// Example: Services in ServicesPage.tsx
const services = [
  { id: 1, title: "Botox & Dysport", category: "skin", ... },
  { id: 2, title: "IV Therapy", category: "biohacking", ... },
];
```

### Future API Integration Pattern

```tsx
// Ready-to-use React Query pattern
const { data, isLoading, error } = useQuery({
  queryKey: ['services'],
  queryFn: () => fetch('/api/services').then(res => res.json()),
});
```

---

## 8. Key Features

### 8.1 Booking System

```
BookNowPage Flow:
1. Select Location (Langley | Victoria | Kelowna)
2. Select Service Category
3. Select Specific Treatment
4. Select Staff Member (filtered by location)
5. Select Date/Time
6. Confirm Booking
```

**Components involved:**
- `BookNowPage.tsx` - Page orchestrator
- `Booking.tsx` - Booking form component
- `ui/calendar.tsx` - Date picker
- `ui/select.tsx` - Dropdowns

### 8.2 ChatBot

Rule-based chatbot with keyword matching:

```tsx
// ChatBot.tsx response logic
const getAutoResponse = (message: string) => {
  const lower = message.toLowerCase();
  if (lower.includes("book")) return "Navigate to booking...";
  if (lower.includes("price")) return "View pricing...";
  // ...
};
```

Features:
- Auto-responses based on keywords
- Quick reply buttons
- Navigation to app sections
- No external API dependency

### 8.3 Multi-Location Support

Three clinic locations with:
- Separate contact information
- Location-specific staff
- Google Maps integration
- Individual booking flows

### 8.4 Homepage Locations Section (HomeLocations)

Card-based display of all three clinic locations:

```tsx
// HomeLocations.tsx - Location data structure
const locations = [
  {
    id: "victoria",
    name: "Victoria",
    address: "1-101 Burnside Rd W, Victoria, BC V9A 1B7",
    phone: "+1 (250) 590-5787",
    email: "wellness@agelessliving.ca",
    note: "Hours may vary due to weather or staff training..."
  },
  {
    id: "langley",
    name: "Langley",
    address: "415-20178 96 Ave, Langley, BC V1M 0B2",
    phone: "+1 (236) 326-6830",
    email: "langley@agelessliving.ca"
  },
  {
    id: "kelowna",
    name: "Kelowna",
    address: "102-3320 Richter Street, Kelowna, BC V1W 4V5",
    phone: "+1 (778) 760-9827",
    email: "kelowna@agelessliving.ca"
  }
];
```

Features:
- Responsive 3-column grid (stacks on mobile)
- Each card includes address, phone, email
- "Book Consultation" CTA linking to /book
- Victoria location includes hours note
- Framer Motion animations on scroll

### 8.5 Our Treatments Section (OurTreatments)

Introductory section before services preview:

- **Label**: "Our Treatments" (uppercase, small)
- **Heading**: "Picture Your Possible."
- **Body**: Brand message about guidance, tools, and technologies
- Centered layout with max-width constraint
- Smooth scroll-triggered animations

---

## 9. External Integrations

| Service | Status | Implementation |
|---------|--------|----------------|
| Google Maps | Active | iframe embeds in ContactPage |
| Square Commerce | External | Links to Square store (shop) |
| Booking API | Planned | Form ready, no backend |
| Analytics | Planned | Structure ready |

---

## 10. Build Configuration

### Vite Config (vite.config.ts)

```typescript
{
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    componentTagger(),  // Development only
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}
```

### TypeScript Config

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": false,
    "noImplicitAny": false,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 11. Testing Strategy

### Unit Tests (Vitest)

```typescript
// vitest.config.ts
{
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
  }
}
```

### E2E Tests (Playwright)

```typescript
// playwright.config.ts
// Uses Lovable's Playwright configuration wrapper
```

---

## 12. Performance Considerations

### Current Optimizations
- Vite + SWC for fast builds
- Code splitting via React Router lazy loading (available)
- Tailwind CSS purging in production
- Image optimization (placeholder system)

### Recommended Improvements
- Implement React.lazy() for route-based splitting
- Add image lazy loading
- Configure service worker for caching
- Implement critical CSS extraction

---

## 13. Security Considerations

### Current State
- No authentication system
- No sensitive data handling
- Client-side only (no backend)
- Environment variables not used

### Recommended for Production
- HTTPS enforcement
- Content Security Policy headers
- Input sanitization for forms
- Rate limiting on API endpoints

---

## 14. Deployment

### Build Output

```bash
npm run build
# Creates dist/ directory with:
# - index.html
# - assets/*.js (bundled)
# - assets/*.css (bundled)
```

### Hosting Requirements
- Static file hosting
- SPA routing support (fallback to index.html)
- HTTPS support

### Compatible Platforms
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static hosting with SPA support

---

## 15. Future Architecture Recommendations

### Backend Integration
```
Frontend (React) ←→ API Gateway ←→ Backend Services
                                    ├── Booking Service
                                    ├── User Service
                                    ├── Content Service
                                    └── Payment Service
```

### Environment Configuration
```env
VITE_API_BASE_URL=https://api.agelessliving.com
VITE_GOOGLE_MAPS_API_KEY=xxx
VITE_SQUARE_API_KEY=xxx
VITE_GA_ID=xxx
```

### Database Schema (Recommended)
- Users/Patients
- Appointments/Bookings
- Services/Treatments
- Staff/Practitioners
- Locations
- Blog Posts
- Products

---

## 16. Recent Updates & Changes

### March 2026 - Service Pages Redesign

**Component Architecture Improvements:**
1. **ServiceCTA Component** - Created reusable CTA component used across all service pages
   - Location: `src/components/ServiceCTA.tsx`
   - Customizable props for title, description, and button text/links
   - Consistent teal background with two-button layout
   - Reduces code duplication by ~30-40 lines per page

2. **HormoneBalancingPage Complete Redesign**
   - Replaced entire page with premium design and expanded content
   - New sections: Video player, detailed 3-step process cards
   - Larger hero section (min-h-85vh) with comprehensive information
   - BHRT vs HRT comparison with stats grid
   - Now uses ServiceCTA component for consistency

3. **Services Pages Optimization**
   - Reduced vertical padding across all service pages (py-28/py-32 → py-16/py-20)
   - More compact, modern layout with improved page rhythm
   - Removed redundant location sections (handled by ServiceCTA)
   - All service pages now use ServiceCTA component

**Pages Updated:**
- HormoneBalancingPage.tsx (complete redesign)
- BotoxDysportPage.tsx
- CosmeticDermalFillerPage.tsx
- CustomizedUltraFacialPage.tsx
- LaserIplBblPage.tsx
- PerfectDermaPeelPage.tsx
- MicroneedlingPage.tsx
- BelkyraPage.tsx
- DermaplaningPage.tsx
- BiohackingPage.tsx
- HealthWeightPage.tsx

**Code Quality:**
- Removed unused imports across all service pages
- Eliminated code duplication (~300+ lines of redundant CTA code)
- Improved maintainability (single source of truth for CTAs)
- Consistent design patterns across all service pages

**Design Improvements:**
- Cleaner, more compact layouts
- Consistent CTA styling and messaging
- Reduced excessive whitespace
- Premium, professional aesthetic maintained throughout

### April 2026 - UI/UX Updates & Mobile Navigation Improvements

**Header & Mobile Navigation Overhaul:**
1. **Improved Mobile Menu**
   - Scrollable menu container with fixed header and bottom CTA
   - Larger touch targets (44px+ height) on all menu items
   - Made Locations section collapsible like Services and About
   - Added "View All Services" link in mobile dropdown
   - Using `100dvh` for proper mobile viewport height
   - Improved hover/active states for visual feedback

2. **Header Responsiveness**
   - Smaller logo on mobile (h-12 vs h-16)
   - Better hamburger button with larger tap area and hover state
   - Reduced padding for mobile devices
   - Visual hierarchy with borders separating sections

**HomePage Updates:**
1. **Hero Section CTAs**
   - "Explore our Locations" → "About Us" (links to /about-us)
   - "Learn more" → "Meet Our Team" (links to /our-team)

2. **Leadership Section CTAs**
   - "Meet our full team" → "Contact" (links to /contact)
   - "Clinical Standards" → "FAQ" (links to /faqs)

3. **Color Consistency**
   - All treatment cards now use consistent cyan/teal gradient
   - All location cards use matching cyan/teal theme
   - Featured image reduced from max-w-4xl to max-w-2xl

**ServicesPage Updates:**
- Removed "Explore Treatments" and "Our Clinical Approach" buttons from hero section
- Cleaner hero layout focusing on content

**Service Page Button Standardization:**

All service pages updated to use consistent cyan gradient button styling (`bg-gradient-to-r from-clinic-teal to-cyan-500`):

1. **CosmeticDermalFillerPage**
   - Book Consultation button updated to cyan gradient
   - Removed "View Pricing" button

2. **CustomizedUltraFacialPage**
   - Book Consultation button updated to cyan gradient
   - Removed "View Results" button
   - Added "Back to All Services" button

3. **PerfectDermaPeelPage**
   - Book Consultation button updated to cyan gradient
   - Removed "View Pricing" button
   - Removed "Learn about scarring" button from Acne & Scarring card

4. **BelkyraPage**
   - "Start Your Transformation" → "Book Your Consultation"
   - Removed "View Results" button
   - Hero image updated to use `object-center` for better display

5. **DermaplaningPage**
   - Removed "View Pricing" button

**Note:** Botox page treatment area photos (Forehead, Glabella, Crow's Feet) require manual replacement with more accurate images:
- `src/assets/botox-4.jpg` (Forehead)
- `src/assets/botox-5.jpg` (Glabella)
- `src/assets/botox-6.jpg` (Crow's Feet)

---

## 2026-04-16 — Full-site polish pass (branch: `claude/polish-ageless-living-site-NSzq5`)

### Homepage
- **Removed** the "Help me create my Ageless Living Journey" section (`JourneyCTA.tsx` deleted and unreferenced).
- The on-page conversational flow is superseded by the global AI Concierge (see below).

### Global AI Concierge (ChatBot)
- `src/components/ChatBot.tsx` fully rewritten.
- Mounted globally in `src/components/Layout.tsx` — now persistent on every page (mobile + desktop).
- Position: **bottom-left** (pill with "Ask Ageless AI" on ≥640px, icon on mobile).
- Expanded knowledge base: 17 intent clusters covering fatigue, skin, hormones, biohacking, weight, booking, locations, hours, pricing, insurance, team, FAQ, blog, contact, shop, safety, about.
- Accessibility: `aria-label`, `aria-expanded`, labelled input, focus-visible ring, form-submit instead of Enter-key-only, 240-char max-length, disabled send when empty.
- Intercepts internal links so in-chat CTAs navigate via React Router without a full reload.

### Booking (`BookNowPage`)
- Fixed type bug: `setSelectedDate(null)` → `setSelectedDate(undefined)` (state type is `Date | undefined`).
- Removed dead constants (`dayNames`, `monthNames`) and stray blank lines.
- Added mobile-compact progress indicator ("Step 3 of 5 · Clinician & Date") that replaces the 5-label strip under `sm`.
- Added `role="progressbar"` + `aria-valuenow/min/max`.
- "Confirm Booking" button is full-width on mobile for thumb-friendly tapping.

### Auth pages
- `LoginPage.tsx` and `SignupPage.tsx`: fixed React Hooks rules violation (`useForm` was called after a conditional early return). Redirect now runs in `useEffect`.

### SEO
- `public/sitemap.xml` added with 32 URLs matching the real React Router paths.
- `public/robots.txt` tightened: allow crawl, disallow `/dashboard` / `/login` / `/signup`, declare sitemap.
- `public/site.webmanifest` added (PWA manifest, theme colour, icons).
- `index.html` rewritten: complete OG + Twitter meta, `theme-color`, `canonical`, `geo.region` + `geo.placename`, `robots` directive, Organisation JSON-LD, `<noscript>` fallback, `apple-touch-icon`, `preconnect` + `dns-prefetch`.

### Security
- Security headers in dev via `vite.config.ts` (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`).
- `<meta http-equiv>` fallbacks in `index.html`.
- Production CSP + HSTS to be configured at hosting edge (documented in `BUSINESS_PLAN.md`).

### Performance
- Vite manual chunk splitting: `react-vendor`, `ui-vendor`, `query-vendor`, `form-vendor`.
- `preconnect` and `dns-prefetch` for asset + Jane App origins.
- Build verified: largest entry chunk gzipped at 151 KB.

### Accessibility
- Skip-to-main-content link in `Layout.tsx`.
- `<main>` gets `id="main-content"`.
- Chatbot + booking progress bar fully labelled.

### Housekeeping
- Deleted unused `src/components/FloatingBookNow.tsx`.
- Fixed shadcn/ui lint errors: empty-interface → type alias in `command.tsx` and `textarea.tsx`; `require()` → ESM import in `tailwind.config.ts`.
- Fixed a pre-existing TS error in `DashboardPage.tsx` select onChange cast.
- Clean build: 0 ESLint errors (down from 5), 0 new TS errors.

### Out of scope (see `BUSINESS_PLAN.md`)
- Real booking backend (Supabase + Resend + OAuth).
- Large image → WebP migration (critical for Lighthouse; blog1-3 are 1.8–4.9 MB PNGs today).
- Manual AI-photo audit (requires visual inspection).
- Production CSP/HSTS headers at edge.
- Google Business Profile / Search Console / GA4 setup.

---

## Production Refactor — 2026-05-15

A finalization pass shipped on `claude/refactor-wellness-site-rgU47` to harden
the site for submission and deployment.

### Code Cleanup
Removed 22 unused components and 4 unused pages from the tree (all confirmed
zero imports prior to deletion):

- Components: `Booking`, `BentoBlock`, `BrandStatement`, `Contact`, `ContactBlock`,
  `CtaBanner`, `Hero`, `HomeLocations`, `HomeTeaser`, `Journey`, `Locations`,
  `OurTreatments`, `Products`, `PromoPopup`, `Reviews`, `ServicesPreview`,
  `TeamSection`, `TestimonialsWall`, `Treatments`, `VideoTestimonial`,
  `VisitUs`, `NavLink`.
- Pages: `Index`, `JourneyPage`, `TreatmentsPage`, `LocationsPage`,
  `ShopPage` (replaced by external redirect — see below).

### Booking System UI
Replaced the calendar-driven booking flow on `/book` with a clean, high-end
**Contact-to-Book** UI (`src/pages/BookNowPage.tsx`). The new page:

- Surfaces clinic **phone** + **email** in a single editorial card with
  `tel:` / `mailto:` deep-links.
- Lists clinic hours and the three BC location quick-links.
- Drops the Jane-style calendar, slots, step machine, and auth gate that
  previously lived on this route.
- Centralized contact details in `src/lib/links.ts` so updates propagate
  site-wide.

### Shop Redirection
All shop and store links now point to the external Square storefront:

```
https://ageless-living.square.site/s/shop
```

- New helper: `src/lib/links.ts` exports `SHOP_URL`.
- New component: `src/components/ExternalRedirect.tsx` redirects via
  `window.location.replace` and renders a graceful fallback link.
- `/shop` route in `App.tsx` now uses `ExternalRedirect` — no local
  e-commerce page is bundled.
- `VisitShopCta` and `ChatBot` updated to reference `SHOP_URL` / `/shop`.

### Photo Sliders — Premium Polish
Upgraded `BeforeAfterSlider` (`src/components/BeforeAfterSlider.tsx`):

- Spring-physics drag (`useMotionValue` + `useSpring`) for fluid handle
  motion instead of raw state updates.
- Subtle hover scale on the after image (1 → 1.02 over 700ms).
- Refined divider (1 px crisp line + soft glow) and handle (larger shadow,
  spring-based active scale).
- Top-edge legibility gradient behind the Before / After chips.
- `decoding="async"` + `will-change-transform` for buttery transitions.

Used by every per-service page through `ServiceTransformationSection`.

### Lead Capture / Newsletter
New global section above the footer, mounted in `Layout.tsx`:

- Copy: *"Sign up today and receive 15% off your first facial, plus
  exclusive access to clinic promos, education, and offers."*
- Component: `src/components/NewsletterSignup.tsx` — React Hook Form +
  Zod validation, animated success state, premium centred layout.
- Persistence layer: `src/lib/subscribers.ts` (`saveSubscriber()`)
  POSTs to `/api/subscribe` and falls back to `localStorage` (so the form
  is fully wired during dev / demo).
- Reference serverless handler: `api/subscribe.ts` — Vercel-style
  `POST(req: Request)` with email validation and commented-out
  Supabase / Prisma / pg insert examples ready to swap in.

### Verification
- `npm run build` — clean (largest gzip chunk ≈ 138 KB).
- `npm test` — 1/1 passing.
- `npm run lint` — 0 errors (8 pre-existing shadcn warnings).

---

## Performance Packages Landing — 2026-05-15

A dedicated, high-converting landing page for athletic / fitness clientele
(target: bodybuilders & competitors at events such as the BC Cup).

### Route
- `/performance-packages` — public, standalone (no Header / Newsletter /
  Footer chrome) so the dark athletic canvas is uninterrupted. A minimal
  fixed top bar links back to `/`.
- `/admin` — internal marketing-tools page; not linked from public nav,
  added to `robots.txt` disallow list.

### Page composition (`src/pages/PerformancePackagesPage.tsx`)
- Dark canvas (`bg-neutral-950`) with radial sky-blue / red-amber lighting
  and a soft grid overlay — bridges luxury wellness with athletic edge.
- Hero: cinematic headline ("Train hard. Recover smarter."), eyebrow
  ribbon ("Stage-Day Protocols · BC Cup Ready") and twin CTAs.
- Stats strip: 4 cells in a hairline-separated panel.
- Packages: two interactive cards — **Men's Performance Package** and
  **Women's Performance Package**. Each card features:
  - Distinct gradient art (sky-blue for men's, pink for women's).
  - Eyebrow / ribbon / blurb / 6 icon-prefixed highlights covering
    hormone optimization, IV / recovery therapies, metabolic conditioning,
    stage-prep skin and post-show endocrine reset.
  - Hover lift + amber glow ring; "Select package" pre-fills the form
    below and smooth-scrolls to it. "Learn more" anchor for soft commits.
- Three-step process band (Intake → Build → Peak Week).
- Interest form (see below).

### Interest form
- React Hook Form + Zod validation:
  `fullName` (≥2), `email`, `phone` (≥7 digits, permissive regex),
  `package` (`mens | womens | unsure`), optional `notes`.
- Loading state with animated spinner, `disabled` on submit.
- Animated success card via Framer Motion `AnimatePresence`.
- Persistence: `savePerformanceLead()` in `src/lib/performanceLeads.ts`
  POSTs to `/api/performance-interest` (Vercel-style reference handler
  at `api/performance-interest.ts`) with `localStorage` fallback for dev.

### QR code generator (`src/components/PerformanceQRCode.tsx`)
- Uses `qrcode.react` (`QRCodeSVG`, error-correction level "H") so the
  code remains scannable even when overlaid with branding.
- URL auto-resolves to the absolute origin (`window.location.origin +
  /performance-packages`) so the same component works in dev, preview,
  and production without a config change.
- One-click **PNG download** at 1024×1024 px (rasterised via offscreen
  canvas with a white plate) for banners / flyers.
- One-click **SVG download** for vector workflows.
- Copy-link button for quick sharing.

### Admin route (`src/pages/AdminPage.tsx`)
- Mounted on `/admin` outside the public Layout.
- Renders the `PerformanceQRCode` plus a live snapshot table of leads
  captured via `listPerformanceLeads()` (localStorage fallback).
- `<meta name="robots" content="noindex, nofollow" />` + `robots.txt`
  disallow so search engines skip it.

### SEO / config
- `public/sitemap.xml` extended with `/performance-packages` at priority
  0.8 / weekly.
- `public/robots.txt` disallows `/admin`.
- New dependency: `qrcode.react` ^4.2.0.

### Verification
- `npm run build` — clean (largest gzip chunk ≈ 151 KB).
- `npm test` — 1/1 passing.
- `npm run lint` — 0 errors (8 pre-existing shadcn warnings).

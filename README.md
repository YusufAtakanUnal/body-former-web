# BodyFormer — Marketing Website

Landing page for **BodyFormer**, the competitive body-growth tracking app.
Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**.

- Minimal black & white design matching the app + pitch deck
- **Bilingual (TR / EN)** with a language toggle (Turkish is the default)
- Consumer waitlist + gym lead CTAs (forms are **UI-only** for now — see below)
- Scroll-reveal animations, fully responsive

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Adding the app screenshots

Drop your phone screenshots into [`public/screens/`](public/screens/) using
these exact filenames — they appear automatically:

| Filename             | Shows in                              |
| -------------------- | ------------------------------------- |
| `today.png`          | Hero phone + App Showcase             |
| `measurements.png`   | Digital Twin (left) + Showcase        |
| `bodyfat.png`        | Digital Twin (right) + Showcase       |
| `ranks.png`          | App Showcase                          |

Until a file exists, a labelled placeholder shows in its place. See
[`public/screens/README.md`](public/screens/README.md) for tips.

## Project structure

```
src/
  app/
    layout.tsx        # fonts (TR-safe), SEO metadata, <LanguageProvider>
    page.tsx          # assembles all sections
    globals.css       # design tokens + reveal animation
  components/
    Header.tsx        # nav + TR/EN toggle + mobile menu
    Hero.tsx          # hero with waitlist form + phone
    Sections.tsx      # Problem, How, Twin, Compete, Coin, Privacy,
                      #   Showcase, Gyms, Waitlist, FAQ
    Footer.tsx
    EmailForm.tsx     # reusable waitlist form (UI-only)
    PhoneFrame.tsx    # phone mockup w/ graceful screenshot placeholder
    Reveal.tsx        # scroll-reveal wrapper
  i18n/
    content.ts        # ALL copy, TR + EN — edit text here
    LanguageProvider.tsx
```

## Editing copy

All text lives in [`src/i18n/content.ts`](src/i18n/content.ts), keyed by `tr`
and `en`. Edit there to change any wording — keep the two languages in sync.

## Wiring up the forms (later)

The waitlist / lead forms in `EmailForm.tsx` currently just show a success
state on submit (`// UI-only for now`). To make them live, post the email to a
backend (e.g. a Next.js Route Handler at `app/api/waitlist/route.ts`) or an
email/CRM service (Mailchimp, Resend, Formspree, etc.) inside `onSubmit`.

## Domain

Point your purchased domain at the deployment (Vercel recommended for Next.js).
Update `siteUrl` in [`src/app/layout.tsx`](src/app/layout.tsx) to the final
domain so SEO / Open Graph URLs are correct.

# ScentMatch Presentation Deck Source

Purpose: 15-minute Group Project presentation source outline. Convert this into slides or use it as the speaking deck if a separate slide artifact is not required.

## Slide 1: Title And Problem

- ScentMatch: Digital Sommelier for premium fragrance discovery.
- Problem: online fragrance shopping creates blind-buy risk because scent cannot be sampled digitally.
- Prototype promise: guide the user from preference discovery to purchase with fewer dead ends.

## Slide 2: Value Proposition

- Eliminate the blind-buy gamble through quiz-led scent matching.
- Combine in-house products and local artisan discovery in one curated storefront.
- Make the experience feel like a luxury atelier rather than a generic catalog.

## Slide 3: Target Market And Business Fit

- Target users: Gen Z and millennial fragrance buyers who discover products digitally but need confidence before purchase.
- Business fit: B2C purchases, repeat allocation model, and B2B artisan marketplace participation.
- Trust levers: reviews, returns, FAQ, contact, support chatbot, and secure Shopify handoff messaging.

## Slide 4: Platform Architecture

- Frontend: Next.js App Router prototype with Tailwind, Framer Motion, Zustand cart state, and local routes.
- Commerce layer: Shopify Storefront API for product/cart data and Shopify checkout for production payment handoff.
- Prototype routes: local checkout simulation, quiz matching API, vendor onboarding API, and support/dashboard pages.

## Slide 5: Complete E-Commerce Funnel

- Home value proposition and Scent Quiz CTA.
- Shop search/filter and product detail exploration.
- Cart quantity updates, promo pricing, tax/shipping totals, local checkout simulation, order confirmation, and Shopify handoff.

## Slide 6: ScentMatch Data-Science Story

- Quiz captures environment, aesthetic, and desired perception.
- Matching API scores product notes and returns a best fit or curated fallback.
- Account dashboard demonstrates post-purchase feedback as future algorithm training input.

## Slide 7: Revenue And Promotion Model

- One-time acquisition for standard purchase behavior.
- Curator's Allocation demonstrates subscription-style repeat revenue.
- `SCENT20` promo shows dynamic pricing and cart recalculation.

## Slide 8: Vendor Marketplace Model

- Vendor application route demonstrates artisan onboarding.
- Vendor dashboard previews scent mapping, sales tracking, and 15-20% commission visibility.
- Marketplace expands catalog depth while preserving the ScentMatch recommendation model.

## Slide 9: Analytics And Funnel Evidence

- GA4 script loads when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured.
- Events cover quiz, shop search/filter, add-to-cart, promo, checkout, Shopify handoff, purchase simulation, vendor application, and chatbot.
- DebugView/dashboard proof must be captured from the deployed demo with a real measurement ID.

## Slide 10: Demo Route Order

- `/` home and quiz.
- `/shop` search/filter.
- `/product/[id]` product detail and add-to-cart.
- Cart drawer with `SCENT20`, local checkout, `/checkout/success`.
- Shopify handoff path with live variant IDs.
- `/account`, support pages, `/vendors/apply`, and `/vendor/dashboard`.

## Slide 11: Evidence Pack

- Required screenshots/clips: homepage, mobile drawer, quiz result, catalog filter/search, product detail, cart totals, checkout, success, account, support, vendor, GA DebugView, Shopify checkout handoff.
- Manual QA: desktop, tablet, mobile.
- Peer-test log: external tester journey and friction notes.

## Slide 12: Closing And Next Steps

- Prototype supports the proposal through a complete purchase journey, data-science matching, analytics instrumentation, and vendor marketplace story.
- Production next steps: real auth/order backend, deployed GA proof, live Shopify demo product validation, and full evidence capture.

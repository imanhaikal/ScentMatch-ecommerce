# ScentMatch Submission Evidence Pack

This file records demo-ready evidence for the Group Project evaluation. Items that require human proof are intentionally left as evidence-pending until screenshots, GA DebugView, or peer-test notes are captured.

## Demo Script

1. Home: show "The Digital Sommelier" value proposition and responsive mobile drawer.
2. Quiz: open Scent Quiz, answer all three questions, show API-backed match or curated fallback.
3. Shop: search by fragrance/note, filter by concentration, and open a product.
4. Product: select acquisition model, adjust quantity, add to cart.
5. Cart: apply `SCENT20`, show subtotal, promo, estimated tax, shipping, and total.
6. Checkout: choose local checkout simulation, fill shipping/billing/payment simulation, create confirmation.
7. Shopify: reopen cart and show the Shopify checkout handoff path as the production payment layer.
8. Account: show order-history UI, saved scent profile, and 14-day feedback module.
9. Support: open FAQ/contact/returns and the dummy concierge chatbot.
10. Vendor: open `/vendors/apply`, submit the artisan application, then show `/vendor/dashboard` commission and scent mapping preview.
11. Analytics: explain GA4 events and show DebugView/dashboard screenshot when available.

## Implemented Evidence

| Area | Evidence |
| --- | --- |
| Responsive navigation | `scentmatch-web/src/components/SiteHeader.tsx` |
| Cart pricing and promo | `scentmatch-web/src/lib/cart/pricing.ts`, `scentmatch-web/src/components/CartDrawer.tsx` |
| Checkout simulation | `scentmatch-web/src/app/checkout/page.tsx` |
| Order confirmation | `scentmatch-web/src/app/checkout/success/page.tsx` |
| Quiz API and persistence | `scentmatch-web/src/app/api/scentmatch/calculate/route.ts`, `scentmatch-web/src/lib/scentmatch/matcher.ts`, `scentmatch-web/src/app/HomeClient.tsx` |
| Analytics events | `scentmatch-web/src/lib/analytics.ts`, `scentmatch-web/src/app/layout.tsx` |
| Customer support | `scentmatch-web/src/components/SupportChatbot.tsx`, `/faq`, `/contact`, `/returns` |
| Vendor marketplace | `/vendors/apply`, `/vendor/dashboard`, `scentmatch-web/src/app/api/vendor/onboard/route.ts` |
| Legal links | `/terms`, `/privacy`, `scentmatch-web/src/components/Footer.tsx` |

## Automated Verification Log

| Date | Command | Result |
| --- | --- | --- |
| 2026-06-08 | `npm run test` | PASS: 10 files, 29 tests |
| 2026-06-08 | `npx tsc --noEmit` | PASS: no TypeScript errors |
| 2026-06-08 | `npm run lint` | PASS with warnings: existing `<img>` optimization warnings and one `PremiumUI.tsx` unused variable warning |
| 2026-06-08 | `npm run build` | PASS: compiled successfully and generated 22 app routes |

## Manual QA Template

| Viewport | Tester | Date | Flow | Result | Notes/Friction |
| --- | --- | --- | --- | --- | --- |
| Desktop | Pending | Pending | Home -> Quiz -> Shop -> Product -> Cart -> Checkout -> Success | Pending | Pending |
| Tablet | Pending | Pending | Mobile drawer -> support -> vendor -> legal links | Pending | Pending |
| Mobile | Pending | Pending | Mobile drawer -> cart -> checkout form -> chatbot overlap check | Pending | Pending |

## Screenshot And Clip Checklist

- [ ] Homepage hero and mobile menu open state.
- [ ] Quiz result with API-backed match.
- [ ] Shop search and concentration filter.
- [ ] Product detail with acquisition model selected.
- [ ] Cart with `SCENT20`, subtotal, discount, tax, shipping, and total.
- [ ] Checkout simulation form.
- [ ] `/checkout/success` confirmation.
- [ ] Account order history and feedback module.
- [ ] FAQ/contact/returns and chatbot.
- [ ] Vendor application success and dashboard.
- [ ] GA4 DebugView or dashboard showing custom events.

## Analytics Event Map

| Event | Trigger |
| --- | --- |
| `quiz_started` | Scent Quiz opens |
| `quiz_step_answered` | Quiz answer selected |
| `quiz_completed` | API returns a scored match |
| `quiz_zero_match` | API returns curated fallback |
| `shop_search` | Shop search input changes |
| `shop_filter` | Concentration filter changes |
| `add_to_cart` | Product added from home/shop/product detail |
| `promo_applied` | `SCENT20` accepted in cart |
| `checkout_started` | Local checkout simulation begins or submits |
| `shopify_checkout_started` | Shopify handoff button begins cart creation |
| `purchase_simulated` | Local confirmation route loads an order |
| `vendor_application_started` | Vendor application submit begins |
| `vendor_application_submitted` | Vendor API returns a reference |
| `chatbot_opened` | Concierge chatbot opens |

## Human Evidence Still Required

- Peer test from someone outside the group, with friction points recorded above.
- Final presentation deck screenshots/clips.
- Real GA4 measurement ID configured in deployment and DebugView/dashboard proof captured.
- Shopify demo environment proof: products, images, cart creation, and checkout URL handoff.

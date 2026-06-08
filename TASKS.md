# ScentMatch: Implementation Tasks

> **Status:** Verified against current implementation state (April 2026). Core B2C routes (`/shop`, `/product/[id]`, `/login`, `/signup`, `/account`) and the Scent Quiz are fully scaffolded and marked as complete.

This document outlines the chronological phases and specific, actionable tasks required to build the ScentMatch prototype, based on the requirements, architecture, and design specifications.

## Phase 1: Foundation & Project Architecture
*Objective: Establish core technical pillars, state management, and reusable UI components.*

- [x] **Landing Page Implementation:** Build the immersive hero section, infinite marquee, and product showcase adhering to the "Cinematic Minimalism" design.
- [x] **Shared UI Components:** Expand `src/components/PremiumUI.tsx` with reusable atoms (MagneticButtons, SplitText, TiltCards) adhering to the "Cinematic Minimalism" aesthetic.
- [x] **State Management Setup:** Initialize Zustand or React Context for global state (Shopping Cart, User Session, Quiz State).
- [x] **API Client Configuration:** Shopify Storefront API client and local App Router endpoints are implemented.
- [x] **Analytics Integration:** GA4 script and guarded custom events are implemented for quiz, product, cart, checkout, and vendor funnels.
- [x] **Routing Structure (Core B2C):** Scaffold Next.js App Router folders for `/shop`, `/product/[id]`, `/account`, `/login`, and `/signup`.
- [x] **Routing Structure (Remaining):** Scaffolded `/checkout`, `/checkout/success`, `/vendors/apply`, and `/vendor/dashboard`.

## Phase 2: Core E-Commerce (B2C Catalog & Cart)
*Objective: Deliver standard e-commerce functionality with premium visual fidelity.*

- [x] **Product Catalog Showcase:** Build a grid layout for featured products, featuring dark mode optimization, aspect-ratio locked images, and artisan tags.
- [x] **Product Catalog Page (`/shop`):** Expand product grid layout for the full catalog with filtering and pagination.
- [x] **Product Details Page (`/product/[id]`):** Create the immersive product view displaying Top, Heart, and Base notes, price, and "Add to Cart" functionality.
- [x] **Shopping Cart Slide-out:** Implement a non-intrusive cart drawer/modal allowing users to add/remove items, view subtotal, and proceed to checkout.
- [x] **Checkout Simulation:** Implementing Smooth Checkout / Checkout Simulation (dummy shipping/payment forms in CartDrawer).
- [x] **Secure Checkout Flow (`/checkout`):** Multi-step local shipping/billing/payment simulation is implemented; Shopify remains the secure production payment handoff.
- [x] **Order Confirmation:** `/checkout/success` renders local prototype order confirmation from session storage.

## Phase 3: The ScentMatch Engine (Core Logic)
*Objective: Build the platform's unique value proposition—the digital sommelier experience.*

- [x] **Interactive Scent Quiz (UI):** Develop a multi-step form capturing lifestyle, aesthetic, and environmental preferences. Use Framer Motion for smooth, hardware-accelerated transitions. (Implemented as landing page overlay).
- [x] **Scent Profile Results (UI):** Build the personalized results page recommending specific fragrances with high match accuracy.
- [x] **Zero-Match Fallback (UI):** Implement the "Curated Discoveries" state to gracefully handle scenarios where the algorithm returns 0 exact matches.
- [x] **Quiz State Persistence:** `sessionStorage` syncing prevents data loss on accidental browser refresh.
- [x] **Algorithm Integration:** `POST /api/scentmatch/calculate` receives quiz payloads and returns scored product matches/fallbacks.

## Phase 4: User Authentication & Customer Portal
*Objective: Enable personalized experiences, order tracking, and algorithm refinement.*

- [x] **Authentication Flow:** Build the Login (`/login`) and Registration (`/signup`) pages securely interfacing with the backend auth system.
- [x] **Customer Dashboard (`/account`):** Create the secure area for users to view order history, tracking status, and their saved Scent Profile.
- [x] **Trust & Support Pages:** Creating Trust & Support pages (FAQ, Contact, Return Policies).
- [x] **Post-Purchase Feedback UI:** Account dashboard includes a prototype 14-day match feedback module.

## Phase 5: Vendor Aggregator Portal (B2B)
*Objective: Empower local artisans to partner, upload products, and manage sales.*

- [x] **Vendor Onboarding (`/vendors/apply`):** Informational landing page, application form, and prototype API route are implemented.
- [x] **Vendor Dashboard Layout (`/vendor/dashboard`):** Dedicated B2B portal preview is implemented.
- [x] **Product & Scent Mapping Tool:** Prototype mapping fields and scent-note table are implemented.
- [x] **Sales & Commission View:** Dashboard includes sales and 15-20% commission split preview.

## Phase 6: Polish, Performance & Testing
*Objective: Ensure the application meets all non-functional requirements and quality standards.*

- [x] **Link Refinement:** Fixing broken links (e.g. `href='#'`).
- [ ] **Accessibility (WCAG AAA) Audit:** Verify stark contrast ratios (>7:1), semantic HTML, `aria-live` regions for the quiz, and custom keyboard focus states.
- [ ] **Performance Optimization:** Implement aggressive image lazy loading, WebP/AVIF formats, and base64 "blur-up" skeletons to ensure sub-3-second load times.
- [ ] **Animation Refinement:** Add `prefers-reduced-motion` media queries to gracefully degrade animations for users with vestibular disorders.
- [ ] **End-to-End Testing:** Automated tests pass; final peer/manual funnel screenshots and GA DebugView evidence still require group capture.

---

## Next Steps
1. Capture peer-test results and screenshots for the final evidence pack.
2. Replace GA placeholder with a real `NEXT_PUBLIC_GA_MEASUREMENT_ID` and capture DebugView/dashboard proof.
3. Confirm Shopify products, Storefront token, cart creation, and checkout handoff in the demo environment.

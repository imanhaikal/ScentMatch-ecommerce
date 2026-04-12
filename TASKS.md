# ScentMatch: Implementation Tasks

This document outlines the chronological phases and specific, actionable tasks required to build the ScentMatch prototype, based on the requirements, architecture, and design specifications.

## Phase 1: Foundation & Project Architecture
*Objective: Establish core technical pillars, state management, and reusable UI components.*

- [x] **Landing Page Implementation:** Build the immersive hero section, infinite marquee, and product showcase adhering to the "Cinematic Minimalism" design.
- [x] **Shared UI Components:** Expand `src/components/PremiumUI.tsx` with reusable atoms (MagneticButtons, SplitText, TiltCards) adhering to the "Cinematic Minimalism" aesthetic.
- [x] **State Management Setup:** Initialize Zustand or React Context for global state (Shopping Cart, User Session, Quiz State).
- [ ] **API Client Configuration:** Set up Axios or native Fetch wrapper for WooCommerce headless API communication (GraphQL/REST).
- [ ] **Analytics Integration:** Integrate Google Analytics 4 (GA4) to track specific custom events (Quiz Started, Quiz Completed, Add to Cart, Purchase).
- [x] **Routing Structure:** Scaffold Next.js App Router folders for `/shop`, `/product/[id]`, `/checkout`, `/account`, and `/vendor`.

## Phase 2: Core E-Commerce (B2C Catalog & Cart)
*Objective: Deliver standard e-commerce functionality with premium visual fidelity.*

- [x] **Product Catalog Showcase:** Build a grid layout for featured products, featuring dark mode optimization, aspect-ratio locked images, and artisan tags.
- [x] **Product Catalog Page (`/shop`):** Expand product grid layout for the full catalog with filtering and pagination.
- [x] **Product Details Page (`/product/[id]`):** Create the immersive product view displaying Top, Heart, and Base notes, price, and "Add to Cart" functionality.
- [x] **Shopping Cart Slide-out:** Implement a non-intrusive cart drawer/modal allowing users to add/remove items, view subtotal, and proceed to checkout.
- [x] **Secure Checkout Flow (`/checkout`):** Build the multi-step checkout form (Shipping, Billing, Payment) and integrate a payment gateway tokenization component (e.g., Stripe or FPX).
- [ ] **Order Confirmation:** Create the `/checkout/success` page and hook into WooCommerce for automated confirmation emails.

## Phase 3: The ScentMatch Engine (Core Logic)
*Objective: Build the platform's unique value proposition—the digital sommelier experience.*

- [x] **Interactive Scent Quiz (UI):** Develop a multi-step form capturing lifestyle, aesthetic, and environmental preferences. Use Framer Motion for smooth, hardware-accelerated transitions. (Implemented as landing page overlay).
- [x] **Scent Profile Results (UI):** Build the personalized results page recommending specific fragrances with high match accuracy.
- [x] **Zero-Match Fallback (UI):** Implement the "Curated Discoveries" state to gracefully handle scenarios where the algorithm returns 0 exact matches.
- [ ] **Quiz State Persistence:** Implement `sessionStorage` syncing to prevent data loss on accidental browser refresh.
- [ ] **Algorithm Integration:** Create the `POST /api/scentmatch/calculate` frontend hook to send quiz payload and receive matching product IDs.

## Phase 4: User Authentication & Customer Portal
*Objective: Enable personalized experiences, order tracking, and algorithm refinement.*

- [x] **Authentication Flow:** Build the Login and Registration modals/pages securely interfacing with the backend auth system.
- [x] **Customer Dashboard (`/account`):** Create the secure area for users to view order history, tracking status, and their saved Scent Profile.
- [ ] **Post-Purchase Feedback UI:** Design and implement the 14-day post-delivery feedback module (1-5 star rating) to collect data for algorithm weight adjustment.

## Phase 5: Vendor Aggregator Portal (B2B)
*Objective: Empower local artisans to partner, upload products, and manage sales.*

- [ ] **Vendor Onboarding (`/vendors/apply`):** Create an informational landing page and application form for prospective artisan brands.
- [ ] **Vendor Dashboard Layout (`/vendor/dashboard`):** Scaffold a dedicated, secure B2B portal using the platform's design system.
- [ ] **Product & Scent Mapping Tool:** Build the UI for vendors to upload products, enforce aspect ratios, and map Top, Heart, and Base notes to the platform's database.
- [ ] **Sales & Commission View:** Implement a financial overview for vendors tracking sales and calculating the 15-20% platform commission split.

## Phase 6: Polish, Performance & Testing
*Objective: Ensure the application meets all non-functional requirements and quality standards.*

- [ ] **Accessibility (WCAG AAA) Audit:** Verify stark contrast ratios (>7:1), semantic HTML, `aria-live` regions for the quiz, and custom keyboard focus states.
- [ ] **Performance Optimization:** Implement aggressive image lazy loading, WebP/AVIF formats, and base64 "blur-up" skeletons to ensure sub-3-second load times.
- [ ] **Animation Refinement:** Add `prefers-reduced-motion` media queries to gracefully degrade animations for users with vestibular disorders.
- [ ] **End-to-End Testing:** Conduct full funnel tests (Quiz -> Match -> Cart -> Checkout) and verify GA4 event firing accuracy.

---

## Next Steps
1. **Routing & Directory Structure:** Create the Next.js App Router structure for the remaining pages (`/shop`, `/product/[id]`, `/checkout`, etc.).
2. **State Management Integration:** Introduce Zustand to manage global state such as the Shopping Cart, User Session, and persisting the Scent Quiz state across pages.
3. **Backend/API Bridging:** Set up the API client to begin communicating with the WooCommerce backend (or a mock API) to fetch real product data and process the `POST /api/scentmatch/calculate` logic.

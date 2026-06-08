# ScentMatch Platform Documentation

This document serves as the comprehensive reference guide for ScentMatch, detailing the system architecture, frontend design patterns, backend integration strategies, database schemas, and deployment workflows.

---

## 1. System Architecture

ScentMatch operates on a decoupled **Headless Architecture**, balancing a high-performance frontend with a robust e-commerce backend.

* **Frontend Layer:** Next.js (React 19) utilizing the App Router. Housed under the `scentmatch-web` workspace, it focuses on delivering a cinematic, mobile-first experience targeting Gen Z/Millennials.
* **Backend E-Commerce Engine:** Shopify Storefront API serves the prototype catalog/cart layer, with Shopify checkout handling secure production payment authorization.
* **Vendor Aggregator (B2B):** Next.js prototype routes demonstrate local artisan onboarding, scent mapping, and automated commission splitting (15-20%) without requiring a live marketplace backend.
* **ScentMatch Core Logic:** A custom Next.js route (`POST /api/scentmatch/calculate`) processes the multi-step interactive Scent Quiz. It calculates user preferences against product scent tags to return scored fragrance recommendations or curated fallbacks.
* **Analytics Layer:** Native integration with Google Analytics 4 (GA4) for tracking crucial e-commerce funnels like quiz drop-off rates and match conversion rates.

---

## 2. Frontend Patterns & Design System

The platform strictly enforces the **"Cinematic Minimalism"** aesthetic to act as a premium digital sommelier.

### 2.1 Aesthetic & Typography
* **Color Palette:** Deep matte black background (`#0A0A0A`), surface accents (`#141414`), primary text (`#F5F5F5`), and silver-grey highlights (`#C0C0C0`). Guarantees WCAG AAA contrast ratios.
* **Typography:** Utilitarian, geometric sans-serif (e.g., *Geist*, *Inter*) for a modern, high-end laboratory feel. Avoids standard bootstrapped components.

### 2.2 Component Structure (Atomic Design)
* **Atoms:** Base primitives (1px silver borders, customized `MagneticButton`, typography scales).
* **Molecules:** Feature elements (`TiltCard`, `SplitText`, Scent Quiz input constraints, advanced olfactive note tags).
* **Organisms:** Full-bleed hero layouts, interactive `InfiniteMarquee`, cinematic product catalog grids, and the `framer-motion` powered `CartDrawer` simulating a secure checkout flow.

### 2.3 Animations & Performance
* **Hardware Acceleration:** Relies strictly on `transform` and `opacity` CSS properties. Avoids properties triggering layout recalculations to ensure 60fps renders. Implements rigorous WebKit sticky scrolling fixes in Product Detail Pages to prevent jank on iOS/Safari.
* **Framer Motion:** Powers the complex state machines governing the `CartDrawer` and Scent Quiz, ensuring fluid mounting/unmounting, staggered reveals, and layout transitions without visual flashing.
* **Accessibility:** Implements `prefers-reduced-motion` fallbacks. Custom silver focus rings (`:focus-visible`) replace standard browser outlines to preserve cinematic immersion without sacrificing a11y.

### 2.4 State Management
* **Cart State:** Managed via Zustand (`useCartStore.ts`) to handle cart drawer visibility, item quantities, Shopify cart metadata, and local checkout simulation without prop drilling.
* **Quiz State:** Managed via local component state in `HomeClient.tsx`, with API-backed result calculation and guarded GA4 funnel events.
* **Persistence:** Mid-quiz progress and local order confirmations are synced to versioned `sessionStorage` keys for demo recovery.

---

## 3. Project Structure

The Next.js App Router codebase (`/scentmatch-web/src`) follows a feature-based structure to ensure clear separation of concerns and maintainability.

### Key Directories & Files
* **`app/`**: Contains route definitions and layouts following Intentional Minimalism.
  * `page.tsx`: The cinematic landing page and entry point.
  * `shop/page.tsx`: The primary product catalog featuring advanced olfactive filtering and fluid asynchronous rendering.
  * `product/[id]/page.tsx`: Dynamic product detail pages displaying olfactive pyramids, advanced pricing UI, and utilizing WebKit sticky scrolling fixes for perfect visual hierarchy.
  * `login/page.tsx`, `signup/page.tsx`: Minimalist authentication pages (UI only).
  * `account/page.tsx`: Simulated user dashboard for profiles and order history.
  * `faq/page.tsx`, `contact/page.tsx`, `returns/page.tsx`: Dedicated Trust & Support pages rendering static, cinematic content.
* **`components/`**: Reusable React elements (Atoms, Molecules, Organisms).
  * `PremiumUI.tsx`: Shared UI atoms like `MagneticButton` and `AnimatedText`.
  * `CartDrawer.tsx`: A robust slide-out shopping cart orchestrated by a `framer-motion` state machine, integrating a simulated secure checkout flow.
  * `Footer.tsx`, `Header.tsx`: Polished navigation components with refined routing logic to prevent broken journeys.
* **`store/`**: Global state management definitions.
  * `useCartStore.ts`: Zustand store managing cart items, quantities, and drawer visibility.
* **`data/`**: Centralized, local mock data and constants.
  * `products.ts`: Acts as the Single Source of Truth (SSOT) for product definitions, categorizations, and pricing.

---

## 4. Backend Integrations & API Contracts

The Next.js frontend interacts with Shopify Storefront API plus local App Router prototype endpoints.

* **Shopify Storefront product queries**
  Fetch inventory, images, pricing, variants, vendor/artisan metadata, concentration, and scent-note metafields. Local fallback data is used when Shopify environment variables are absent.
* **`POST /api/scentmatch/calculate`**
  **Payload:** Quiz selections (e.g., environment, aesthetic, intensity).
  **Action:** Executes the >70% similarity match threshold logic.
  **Response:** Scored Shopify/local product matches. If no score passes the threshold, returns a curated fallback payload ("Curated Discoveries").
* **`POST /api/vendor/onboard`**
  Handles B2B artisan registration for the prototype and returns a vendor application reference.
* **`POST /api/feedback/rate`**
  Triggered 14 days post-delivery. Sends user 1-5 star ratings to adjust the weights of the matching algorithm.

---

## 5. Database Schema

Key entities mapped within Shopify metafields and local prototype data to support the distinct ScentMatch feature set:

### Product / Scent Profile Model
* `product_id` (Primary Key)
* `vendor_id` (Foreign Key -> Vendor; `NULL` implies In-House brand)
* `top_notes` (Array/Enum of tags)
* `heart_notes` (Array/Enum of tags)
* `base_notes` (Array/Enum of tags)
* `brand_classification` (Enum: `IN_HOUSE`, `ARTISAN`)

### Vendor Model (B2B Dashboard)
* `vendor_id` (Primary Key)
* `brand_name` (String)
* `commission_rate` (Float: Fixed 15-20%)
* `approval_status` (Boolean)

### User Model (B2C Customers)
* `user_id` (Primary Key)
* `saved_scent_profile` (JSON object holding historical quiz vectors)
* `order_history` (Relation to Order schema)

### Order & Analytics Model
* `order_id` (Primary Key)
* `user_id` (Foreign Key)
* `matched_purchase` (Boolean flag: `true` if item bought was recommended by algorithm; crucial for GA4 ROI metrics)

---

## 6. Deployment Instructions

### Frontend (Next.js via Vercel)
1. Link the `scentmatch-web` directory to a Vercel project.
2. **Environment Variables:**
   * `SHOPIFY_STORE_DOMAIN` -> Shopify store domain.
   * `SHOPIFY_STOREFRONT_ACCESS_TOKEN` -> Shopify Storefront access token.
   * `NEXT_PUBLIC_GA_MEASUREMENT_ID` -> GA4 identifier. `NEXT_PUBLIC_GA_ID` remains a legacy fallback.
3. Ensure Build Command is `npm run build` and Output Directory is `.next`.

### Backend (Shopify + Next.js Prototype Routes)
1. Configure Shopify products, variants, images, and scent-note metafields.
2. Add Storefront API environment variables to Vercel.
3. Confirm Shopify checkout is reachable from `/api/cart/create` cart creation.
4. Use local routes for quiz matching, vendor onboarding, and checkout simulation evidence.

# ScentMatch Design Document

## 1. High-Level System Architecture
ScentMatch operates on a decoupled Headless Architecture to balance a high-performance, cinematic frontend with a robust, extensible e-commerce backend:
- **Frontend Layer:** Next.js (React 19) powered by Tailwind CSS and Framer Motion, housed under the `scentmatch-web` workspace. The frontend strictly follows Headless UI patterns, ensuring 100% functional parity across mobile, tablet, and desktop views (Mobile-First targeting Gen Z).
- **Backend E-Commerce Engine:** Shopify Storefront API provides product/catalog/cart creation, while Shopify checkout remains the secure production payment layer.
- **Vendor Aggregator (B2B):** Next.js prototype routes demonstrate vendor onboarding, scent mapping, sales, and automated 15-20% commission splitting.
- **ScentMatch Core Logic:** A custom Next.js route processes the multi-step interactive Scent Quiz and returns product recommendations matching >70% mathematical similarity based on fragrance notes.
- **Analytics:** Integrated Google Analytics 4 (GA4) tracking to measure key funnels like Quiz Drop-off Rate and Match Conversion Rate.

## 2. UI/UX Design Principles
The project strictly enforces the "Avant-Garde UI Designer" role. The interface rejects standard, cluttered e-commerce layouts in favor of an intentional minimalism built around:
- **Aesthetic Identity:** "Cinematic Minimalism" acting as a digital sommelier. The palette leverages deep matte black (`#0A0A0A` background) and stark silver-grey accents (`#C0C0C0` text) to guarantee WCAG AAA contrast while imitating a high-end luxury boutique.
- **Typography Shift:** A blend of precise, utilitarian sans-serif fonts (*Geist* as primary interface font) combined with classic serif typography (*Cormorant Garamond* for elegant headers). This geometric precision reduces cognitive load and projects legitimacy.
- **Interactions & Animations:** 
  - Micro-interactions via hardware-accelerated CSS `transform` and `opacity` to minimize repaint/reflow. 
  - Framer Motion provides smooth staggered reveals and state transitions (e.g., during the Quiz Flow).
  - Premium bespoke features: Custom cursors, subtle digital noise, `SmoothScroll` (Lenis), `MagneticButton`, and `TiltCard` components.
  - Keyboard focus states leverage bespoke silver rings (`outline: 2px solid var(--color-foreground)`) to maintain accessibility without breaking immersion.

## 3. Component Structure and State Management
- **Atoms/Primitives:** Fundamental elements like `MagneticButton` and `SplitText` in `src/components/PremiumUI.tsx`.
- **Molecules & Organisms:** Feature components like `TiltCard`, `InfiniteMarquee`, `Hero` full-bleed backgrounds, and asymmetric `ProductCards`.
- **State Management:** 
  - Isolated state management (e.g., React Context or Zustand) handles the multi-step Scent Quiz state machine to prevent cascading main-page re-renders. 
  - State tracking includes syncing to `sessionStorage` to mitigate accidental mid-quiz refreshes or abandonment.
  - Active quiz components utilize strict staggered animation trees (using Framer Motion's `AnimatePresence`) ensuring that DOM mounting and unmounting remains hyper-fluid.

## 4. API Endpoints & Contracts (Headless Integration)
To effectively interface the React frontend with Shopify and local prototype logic, the following core endpoints are used:
- **Shopify Storefront product queries** 
  - Fetch product data with high-res images, variants, pricing, vendor/artisan fields, concentration, and scent notes.
- **`POST /api/scentmatch/calculate`**
  - **Payload:** User quiz selections (e.g., `{ "environment": "...", "aesthetic": "...", "intensity": "..." }`).
  - **Action:** Triggers the matching algorithm. 
  - **Response:** Array of specific product IDs yielding a >70% similarity match, or a fallback payload for a "Curated Discoveries" state if zero matches are found.
- **`POST /api/vendor/onboard`**
  - Submits artisan brand applications to the B2B prototype portal and returns a local reference.
- **`POST /api/feedback/rate`**
  - Collects post-purchase feedback (1-5 stars) dynamically adjusting future algorithm weighting.

## 5. Database Schema & Data Models
Key data modeling required within Shopify metafields and the local prototype to support the ScentMatch custom logic:

- **Product / Scent Profile Model:**
  - `product_id` (PK)
  - `vendor_id` (FK to Vendor Model; NULL if In-House)
  - `top_notes` (Array/Enum of Olfactive Tags)
  - `heart_notes` (Array/Enum)
  - `base_notes` (Array/Enum)
  - `brand_classification` (Enum: IN_HOUSE, ARTISAN)

- **Vendor Model (B2B Dashboard):**
  - `vendor_id` (PK)
  - `brand_name`
  - `commission_rate` (Fixed float e.g., `0.15` - `0.20`)
  - `approval_status` (Boolean)

- **User Model (B2C Customers):**
  - `user_id` (PK)
  - `saved_scent_profile` (JSON Object storing last quiz vectors)
  - `order_history` (Relation to Order Model)

- **Order & Analytics Model:**
  - `order_id` (PK)
  - `user_id` (FK)
  - `matched_purchase` (Boolean - Flags if the purchased product was officially recommended by the algorithm for GA4 metrics).

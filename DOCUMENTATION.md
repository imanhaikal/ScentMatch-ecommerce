# ScentMatch Platform Documentation

This document serves as the comprehensive reference guide for ScentMatch, detailing the system architecture, frontend design patterns, backend integration strategies, database schemas, and deployment workflows.

---

## 1. System Architecture

ScentMatch operates on a decoupled **Headless Architecture**, balancing a high-performance frontend with a robust e-commerce backend.

* **Frontend Layer:** Next.js (React 19) utilizing the App Router. Housed under the `scentmatch-web` workspace, it focuses on delivering a cinematic, mobile-first experience targeting Gen Z/Millennials.
* **Backend E-Commerce Engine:** WooCommerce (built on WordPress) serves as the primary engine for catalog management, cart operations, secure checkout, and order management.
* **Vendor Aggregator (B2B):** Integrates a multi-vendor plugin (e.g., Dokan) on top of WooCommerce to handle local artisan onboarding, product mapping, and automated commission splitting (15-20%).
* **ScentMatch Core Logic:** A custom rules engine (via Next.js serverless routes or Gravity Forms backend routing) processes the multi-step interactive Scent Quiz. It dynamically calculates user preferences against database scent tags to return fragrance recommendations with >70% mathematical similarity.
* **Analytics Layer:** Native integration with Google Analytics 4 (GA4) for tracking crucial e-commerce funnels like quiz drop-off rates and match conversion rates.

---

## 2. Frontend Patterns & Design System

The platform strictly enforces the **"Cinematic Minimalism"** aesthetic to act as a premium digital sommelier.

### 2.1 Aesthetic & Typography
* **Color Palette:** Deep matte black background (`#0A0A0A`), surface accents (`#141414`), primary text (`#F5F5F5`), and silver-grey highlights (`#C0C0C0`). Guarantees WCAG AAA contrast ratios.
* **Typography:** Utilitarian, geometric sans-serif (e.g., *Geist*, *Inter*) for a modern, high-end laboratory feel. Avoids standard bootstrapped components.

### 2.2 Component Structure (Atomic Design)
* **Atoms:** Base primitives (1px silver borders, customized `MagneticButton`, typography scales).
* **Molecules:** Feature elements (`TiltCard`, `SplitText`, Scent Quiz input constraints).
* **Organisms:** Full-bleed hero layouts, interactive `InfiniteMarquee`, and dynamic asynchronous product grids.

### 2.3 Animations & Performance
* **Hardware Acceleration:** Relies strictly on `transform` and `opacity` CSS properties. Avoids properties triggering layout recalculations to ensure 60fps renders.
* **Framer Motion:** Used for staggered reveals, page transitions, and ensuring the complex state machine of the Scent Quiz mounts/unmounts fluidly without flashing.
* **Accessibility:** Implements `prefers-reduced-motion` fallbacks. Custom silver focus rings (`:focus-visible`) replace standard browser outlines to preserve cinematic immersion without sacrificing a11y.

### 2.4 State Management
* **Quiz State:** Managed via isolated context (Zustand or React Context) ensuring the multi-step quiz avoids triggering cascading Virtual DOM updates.
* **Persistence:** Mid-quiz progress synced to `sessionStorage` to recover states seamlessly upon accidental browser reloads.

---

## 3. Backend Integrations & API Contracts

The Next.js frontend interacts with the WooCommerce headless backend using standard REST or GraphQL endpoints.

* **`GET /api/catalog/products`**
  Fetches inventory. Requires parameters to retrieve high-res imagery, pricing, and tag arrays differentiating `In-House` from `Artisan Brand` items.
* **`POST /api/scentmatch/calculate`**
  **Payload:** Quiz selections (e.g., environment, aesthetic, intensity).
  **Action:** Executes the >70% similarity match threshold logic.
  **Response:** Array of matched WooCommerce Product IDs. If 0 matches, triggers a curated fallback payload ("Curated Discoveries").
* **`POST /api/vendor/onboard`**
  Handles B2B artisan registration and bridges to the Dokan/vendor portal.
* **`POST /api/feedback/rate`**
  Triggered 14 days post-delivery. Sends user 1-5 star ratings to adjust the weights of the matching algorithm.

---

## 4. Database Schema

Key entities mapped within the WooCommerce backend to support the distinct ScentMatch feature set:

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

## 5. Deployment Instructions

### Frontend (Next.js via Vercel)
1. Link the `scentmatch-web` directory to a Vercel project.
2. **Environment Variables:**
   * `NEXT_PUBLIC_API_URL` -> Base URL of the headless WooCommerce instance.
   * `NEXT_PUBLIC_GA_MEASUREMENT_ID` -> GA4 identifier.
   * `WOOCOMMERCE_CONSUMER_KEY` & `WOOCOMMERCE_CONSUMER_SECRET` -> Read/Write tokens (store securely).
3. Ensure Build Command is `npm run build` and Output Directory is `.next`.

### Backend (WordPress / WooCommerce)
1. Deploy a managed WordPress environment optimized for API throughput.
2. Install standard plugins: **WooCommerce**, **Dokan Multivendor** (or equivalent), and **WPGraphQL** (if utilizing GraphQL over REST).
3. Install CORS plugins or add filters in `functions.php` to accept headless requests exclusively from the Vercel production domain.
4. Ensure SSL/TLS is active to facilitate secure payment tokenization. Data regarding credit cards must bypass ScentMatch databases directly to gateways (Stripe/FPX).

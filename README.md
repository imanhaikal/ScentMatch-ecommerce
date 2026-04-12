# ScentMatch 🌑

> A premium, hybrid-aggregator e-commerce platform designed to eliminate the "blind-buy" gamble in the fragrance market.

**Course:** WIE3002 (Electronic Commerce) | **Semester:** 2 2025/2026

---

## 📖 Overview

ScentMatch acts as a "digital sommelier," matching consumers to fragrances from both our In-House brand and B2B Local Artisan Vendors with a >70% scent-note similarity match. Through a proprietary matching algorithm and a highly curated, cinematic user interface, we transform the exhausting process of fragrance shopping into an immersive journey of guided discovery.

## 👥 User Roles

The platform serves four primary actors:
1. **Guest User (B2C):** Browses the curated catalog, takes the interactive Scent Quiz, and makes one-off purchases.
2. **Registered Customer (B2C):** Maintains a saved "Scent Profile," tracks order history, and provides post-purchase algorithm feedback.
3. **Vendor (B2B Artisan):** Accesses a dedicated aggregator portal to manage product listings, map fragrance notes, and track commissions.
4. **Platform Administrator:** Manages operations, approves artisan vendors, monitors GA4 analytics, and refines the ScentMatch algorithm.

## ✨ Core Modules

### 1. The ScentMatch Engine
* **Interactive Scent Quiz:** A multi-step state machine capturing lifestyle, aesthetic, and environmental preferences without overwhelming the user.
* **Matching Algorithm:** Evaluates user inputs against product scent tags (Top, Heart, Base notes) to return >70% similarity matches.
* **Graceful Fallbacks:** If zero exact matches exist, the system defaults to a "Curated Discoveries" state.
* **Feedback Loop:** Post-purchase ratings dynamically adjust the algorithm's weighting.

### 2. Core E-Commerce (B2C)
* **Premium Catalog:** Minimalist, high-resolution imagery showcasing In-House and Artisan brands.
* **Frictionless Checkout:** Secure, tokenized payment flows.
* **Order Management:** Automated status tracking from processing to delivery.

### 3. Vendor Aggregator Portal (B2B)
* **Artisan Onboarding:** Streamlined registration pipeline for local perfumers.
* **Scent Mapping Dashboard:** Vendors upload products and assign specific olfactive notes to integrate into the matching database.
* **Automated Commissions:** System transparently tracks the 15-20% platform commission on artisan sales.

## 🏗️ Architecture & Tech Stack

ScentMatch employs a **Decoupled Headless Architecture** to combine peak frontend performance with robust e-commerce capabilities.

### Frontend Layer (`/scentmatch-web`)
* **Framework:** Next.js (React 19) using the App Router.
* **Styling:** Tailwind CSS and Framer Motion for hardware-accelerated animations and micro-interactions.
* **State Management:** React Context / Zustand for the complex Quiz state machine.

### Backend E-Commerce Engine
* **Platform:** Headless WooCommerce (WordPress).
* **B2B Integration:** Multi-vendor plugins (e.g., Dokan) for vendor aggregation.
* **Data Integration:** Custom REST/GraphQL APIs (e.g., `POST /api/scentmatch/calculate`).

### Analytics & Tracking
* **Google Analytics 4 (GA4):** Custom event tracking for critical business metrics: Quiz Drop-off Rate, Match Conversion Rate, and Traffic Sources.

## 🎨 UI/UX Design Philosophy

Guided by the **"Cinematic Minimalism"** and **ULTRATHINK** protocols:
* **Aesthetic Identity:** A deep matte black (`#0A0A0A`) and silver-grey (`#C0C0C0`) palette ensures WCAG AAA contrast while imitating a high-end luxury boutique.
* **Typography:** Precise, utilitarian sans-serif fonts (*Geist*) reduce cognitive load and project legitimacy.
* **Performance:** Exclusive use of CSS `transform` and `opacity` to minimize repaint/reflow during transitions.
* **Accessibility:** Bespoke high-contrast focus rings, semantic HTML, `aria-live` regions, and strict `prefers-reduced-motion` compliance.

## 🚀 Development Roadmap

Following **Feature-Driven Development (FDD)**, the project is structured into 6 phases:

* **Phase 1: Foundation & Architecture** - ✅ *Completed* (Landing page, shared UI, Next.js scaffolding).
* **Phase 2: Core E-Commerce** - ⏳ *In Progress* (Catalog grid, product pages, secure checkout).
* **Phase 3: The ScentMatch Engine** - ✅ *Completed (UI)* / ⏳ *Pending (Logic)* (Quiz UI, Match results, State persistence).
* **Phase 4: User Authentication** - ⏳ *Pending* (Customer portal, order tracking, feedback loop).
* **Phase 5: Vendor Aggregator (B2B)** - ⏳ *Pending* (Onboarding, product mapping, commission tracking).
* **Phase 6: Polish & Testing** - ⏳ *Pending* (WCAG audit, full-funnel E2E testing).

## 🛠️ Getting Started

### Prerequisites
* Node.js (v18+)
* npm or yarn

### Running the Frontend Locally

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the frontend workspace
cd scentmatch-web

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Documentation Directory

For deeper technical and architectural insights, refer to the following documents:
* [`REQUIREMENTS.md`](./REQUIREMENTS.md) - Full business, system, and non-functional requirements.
* [`DESIGN.md`](./DESIGN.md) - System architecture, UI/UX principles, API contracts, and data models.
* [`architecture-design.md`](./architecture-design.md) - Deep reasoning, psychological analysis, and edge case mitigations.
* [`TASKS.md`](./TASKS.md) - Detailed chronological implementation phases and task checklists.
# REQUIREMENTS.md - ScentMatch E-Commerce Prototype
**Course:** WIE3002 (Electronic Commerce) | **Semester:** 2 2025/2026  
**Project:** Prototype of an E-Commerce Website  

## 1. Project Overview
**ScentMatch** is a premium, hybrid-aggregator e-commerce platform designed to eliminate the "blind-buy" gamble in the fragrance market. Utilizing a proprietary matching algorithm, the platform acts as a digital sommelier, matching consumers (Gen Z/Millennials and Gift Buyers) to fragrances from both our In-House brand and B2B Local Artisan Vendors with a >70% scent-note similarity match.

## 2. User Roles (Actors)
The system shall support four primary user roles:
1. **Guest User:** Can browse the catalog, take the Scent Quiz, and make one-off purchases.
2. **Registered Customer (B2C):** Can save their "Scent Profile," view order history, track shipping, and provide feedback on match accuracy.
3. **Vendor (B2B Artisan):** Can access a dedicated portal to manage their product listings, map fragrance notes, and track sales/commissions.
4. **Platform Administrator:** Has full access to manage platform operations, approve vendors, update the matching algorithm, and view site-wide analytics.

---

## 3. Functional Requirements (FR)

### Module 1: Core E-Commerce Elements (Standard EC Capabilities)
* **FR 1.1 Product Catalog:** The system shall display products with high-resolution images, pricing, and specific tags distinguishing "In-House" from "Artisan Brand."
* **FR 1.2 Product Details:** Product pages must clearly define the Top, Heart, and Base notes of each fragrance.
* **FR 1.3 Shopping Cart:** Users must be able to add/remove items, apply promo codes, and view shipping fee calculations.
* **FR 1.4 Secure Checkout & Payments:** Integration with an external payment gateway (e.g., Stripe, FPX/Billplz) to process credit cards and online banking.
* **FR 1.5 Order Management:** Automated order confirmation emails and status tracking (Processing, Shipped, Delivered).

### Module 2: The ScentMatch Engine (Core Logic Flow)
* **FR 2.1 Interactive Scent Quiz:** A dynamic, multi-step form that captures user data regarding lifestyle, aesthetic preferences, and preferred environments (e.g., "Woodland cabin" vs. "Ocean breeze").
* **FR 2.2 Matching Algorithm (Logic):** The backend must process quiz inputs against the product database's scent tags. It must filter and return products that yield a mathematical similarity match of >70%.
* **FR 2.3 Personalized Scent Profile:** Upon quiz completion, the system shall generate a customized results page recommending 1-3 specific fragrances.
* **FR 2.4 Post-Purchase Feedback Loop:** Customers shall receive an automated prompt 14 days post-delivery to rate the accuracy of their matched scent (1-5 stars), theoretically updating algorithm weights.

### Module 3: Vendor Aggregator Portal (B2B Features)
* **FR 3.1 Vendor Onboarding:** A registration form for local artisan brands to apply for partnership.
* **FR 3.2 Product & Scent Mapping Dashboard:** Approved vendors can upload products and must assign specific Top, Heart, and Base notes to integrate into the ScentMatch database.
* **FR 3.3 Commission Splitting:** The system shall track the fixed 15-20% platform commission on vendor sales, displaying net earnings in the vendor dashboard.

---

## 4. Non-Functional Requirements (NFR)

* **NFR 1. UI/UX & Brand Identity:** The interface must reflect a luxury, premium aesthetic. Color palette restricted to deep matte black, silver-grey accents, and classic serif typography. The layout must be minimalist to prevent choice paralysis.
* **NFR 2. Mobile Responsiveness:** 100% functional parity across mobile, tablet, and desktop views (Mobile-First approach targeting Gen Z).
* **NFR 3. Performance:** The Scent Quiz logic must process and render results in under 3 seconds to maintain user engagement.
* **NFR 4. Security & Privacy:** Compliance with basic data protection principles for user preferences. SSL certification required. No payment data is stored directly on the platform (handled via tokenization by the payment gateway).

---

## 5. System Architecture & Platform
* **Base Platform:** WooCommerce (Built on WordPress) or Shopify. *(Note: WooCommerce is recommended for this prototype as it allows extensive backend customization for the matching logic and easy integration of multi-vendor plugins without high monthly fees).*
* **Multi-Vendor Architecture:** Integration of a plugin (e.g., Dokan Multivendor for WooCommerce) to handle the B2B aggregator aspect.
* **Logic Integration:** A custom-built conditional logic form (e.g., using Gravity Forms with calculation routing or Typeform API) to handle the Scent Quiz and dynamically display specific WooCommerce product IDs.

---

## 6. Analytics & Customer Tracking
*(Mandatory project requirement to track customer behavior)*
* **Event Tracking:** Integration with Google Analytics 4 (GA4) or platform native analytics.
* **Key Metrics Monitored:**
  1. **Quiz Drop-off Rate:** Identifying which question causes users to abandon the quiz.
  2. **Match Conversion Rate:** Percentage of users who purchase a product specifically recommended by their Scent Profile.
  3. **Traffic Source Tracking:** Measuring inbound traffic from TikTok/Instagram campaigns to evaluate marketing ROI.

---

## 7. Web Development Methodology
**Methodology Chosen:** Feature-Driven Development (FDD)
*(Note: SDLC is strictly avoided as per project guidelines. FDD is a contemporary Agile framework highly suited for this project as it focuses on delivering tangible, working components).*

**FDD Stages applied to ScentMatch:**
1. **Develop an Overall Model:** Mapping out the hybrid B2C/B2B aggregator model and the scent matching theory.
2. **Build a Features List:** Creating this requirements document (EC Core, ScentMatch Engine, Vendor Portal).
3. **Plan by Feature:** Assigning the 5 group members specific features (e.g., Member A & B handle the Quiz Logic, Member C handles EC Checkout, Member D handles UI/UX).
4. **Design by Feature:** Creating wireframes for the Scent Quiz and mapping the algorithm rules.
5. **Build by Feature:** 
   * *Iteration 1:* Build core E-Commerce storefront (Catalog & Cart).
   * *Iteration 2:* Build the Scent Quiz and Matching Logic.
   * *Iteration 3:* Integrate the Vendor Dashboard and Analytics.
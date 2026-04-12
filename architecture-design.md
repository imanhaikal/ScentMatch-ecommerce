# ScentMatch: Architecture & Design Specification
**Phase:** Frontend Prototyping | **Design Protocol:** ULTRATHINK | **Aesthetic:** Cinematic Minimalism

---

## 1. Deep Reasoning Chain & Architectural Vision

The core mission of ScentMatch is to eliminate the "blind-buy" gamble in fragrance purchasing. To build trust in a digital product—especially one simulating an inherently sensory, offline experience—the UI must transcend standard e-commerce patterns. We are designing a "digital sommelier." 

**Intentional Minimalism:** We reject standard, cluttered catalog layouts. By stripping away extraneous UI elements (banners, sidebars, heavy color blocks), we reduce the user's cognitive load and focus their attention entirely on high-resolution product photography and the Scent Quiz. 

**The Aesthetic Shift (San-Serif Precision):** While initial requirements suggested classic serif typography, the target demographic (Gen Z/Millennials) and the directive for a *Modern, Minimalist, Cinematic* UI dictate a pivot to a precise, geometric **sans-serif** (e.g., *Helvetica Now Display*, *Geist*, or *Satoshi*). This provides the stark, utilitarian elegance of a high-end laboratory or modern art gallery, contrasting against the emotional, organic nature of perfume.

**The "Why" Factor:** Every pixel must justify its existence. An immersive, full-bleed dark mode (`#0A0A0A`) naturally dilates the pupil—psychologically linked to heightened emotional engagement, mimicking the intimate lighting of a boutique. 

---

## 2. Multi-Dimensional Analysis

### 2.1 Psychological (User Sentiment & Cognitive Load)
- **Choice Paralysis Prevention:** A maximalist e-commerce site induces anxiety. The Scent Quiz transitions the user from active, exhausting searching to passive, curated discovery. 
- **The "Boutique" Pacing:** Using smooth, staggered reveals (`animation-delay`) and a unified dark theme, we slow the user down. The stark contrast (`#0A0A0A` background with `#F5F5F5` text) frames the fragrance bottles like artifacts in a museum, elevating their perceived value.
- **Trust via Fidelity:** Gen Z users equate UI polish with brand legitimacy. The cinematic aesthetic (blur effects, sharp typography) acts as a heuristic for product quality.

### 2.2 Technical (Rendering Performance & State Complexity)
- **Repaint/Reflow Minimization:** Cinematic full-bleed transitions and micro-interactions will exclusively utilize CSS `transform` and `opacity` (hardware accelerated), avoiding properties that trigger expensive layout recalculations (`margin`, `top/left`, `width`).
- **Asset Optimization:** Full-bleed backgrounds demand aggressive optimization. High-resolution imagery will be served in `AVIF/WebP` formats with aggressive lazy loading for off-screen elements. We will employ "blur-up" skeleton screens (using base64 placeholders) to ensure perceived performance remains instantaneous (< 3s).
- **State Management:** The multi-step Scent Quiz is a complex state machine. To prevent cascading re-renders, state will be managed via isolated contexts (e.g., Zustand or React Context) ensuring only the active quiz pane updates in the Virtual DOM.

### 2.3 Accessibility (WCAG AAA Strictness)
- **Stark Contrast Ratios:** The matte black (`#0A0A0A`) and off-white/silver (`#F5F5F5` / `#C0C0C0`) palette inherently guarantees WCAG AAA compliance (>7:1 contrast ratio for text). 
- **Keyboard Navigation (Focus States):** Standard focus outlines break cinematic immersion. We will implement bespoke, high-contrast silver focus rings (`:focus-visible { outline: 2px solid #C0C0C0; outline-offset: 4px; }`) that maintain the aesthetic without compromising accessibility.
- **Vestibular Disorders:** A strict `prefers-reduced-motion` media query will kill all non-essential spatial transitions, defaulting to instant or rapid crossfade UI state changes for affected users.
- **Semantic HTML & Aria:** The Scent Quiz will use `aria-live="polite"` regions to announce step transitions to screen readers without relying on visual cues.

### 2.4 Scalability (Long-Term Maintenance & Modularity)
- **Atomic Design System:** The UI will be built on strict primitives. 
  - *Atoms:* Base typography scales, 1px silver borders, primary/secondary button variants.
  - *Molecules:* Scent Quiz input cards, Product aspect-ratio locked containers.
  - *Organisms:* The full-bleed hero section, the Vendor Dashboard table.
- **Decoupled Architecture:** As the backend is WooCommerce, the frontend must act as a Headless UI (e.g., Next.js or Nuxt) consuming data via GraphQL/REST. This prevents WordPress's monolithic structure from dictating our cinematic frontend performance.

---

## 3. Edge Case Analysis & Mitigations

1. **The "Ugly Vendor Image" Problem (B2B):** 
   - *Scenario:* Local artisans upload poorly lit or incorrectly sized product photos, breaking the premium cinematic illusion.
   - *Mitigation:* The frontend will enforce a strict aspect-ratio mask (`aspect-square` or `aspect-[4/5]`). We will apply a subtle, uniform CSS filter (`contrast(1.05) saturate(0.95)`) or dynamic background removal to standardize vendor assets and blend them into the dark UI.
2. **Algorithm Zero-Match:** 
   - *Scenario:* A user completes the quiz, but the strict >70% threshold yields 0 results.
   - *Mitigation:* Never show an empty state. Fallback to a "Curated Discoveries" state—recommending 3 universal best-sellers while elegantly stating: *"Your profile is exceptionally unique. While we refine our bespoke matches, explore these universal signatures."*
3. **Mid-Quiz Refresh/Abandonment:**
   - *Scenario:* The user accidentally refreshes the browser on step 4 of the Scent Quiz.
   - *Mitigation:* Quiz state will be synced to `sessionStorage`. On reload, the UI instantly restores the exact step without a flash of the first question.

---

## 4. Design System & Component Primitives

### 4.1 Global Styles & Variables
```css
:root {
  --color-bg-deep: #0A0A0A;
  --color-surface: #141414;
  --color-text-primary: #F5F5F5;
  --color-text-muted: #8A8A8A;
  --color-accent-silver: #C0C0C0;
  
  --font-sans: 'Geist', 'Inter', 'Helvetica Neue', sans-serif;
  --ease-cinematic: cubic-bezier(0.76, 0, 0.24, 1);
}
```

### 4.2 Typography Hierarchy
- **Display / Hero:** Minimalist Sans-Serif, Ultra-light or Regular weight, tight tracking (letter-spacing: -0.02em), high contrast.
- **Body / Interface:** Sans-Serif, Regular weight, generous line-height (1.6) for readability against the dark background.
- **Micro-copy / Labels:** Uppercase, wide tracking (letter-spacing: 0.1em), subtle silver (`#8A8A8A`), used for scent notes (TOP, HEART, BASE).

### 4.3 Key UI Components
- **Top Navigation Bar:** Absolute positioned, transparent. On scroll, it adopts a glassmorphism effect: `backdrop-filter: blur(16px); background: rgba(10, 10, 10, 0.6);`. 1px bottom border in `rgba(192, 192, 192, 0.1)`.
- **Primary Button (The "Take Quiz" CTA):**
  - *Resting:* Transparent background, 1px solid `#C0C0C0` border, `#F5F5F5` text.
  - *Hover/Focus:* Inverts instantly—`background: #C0C0C0`, `color: #0A0A0A`. No border-radius (sharp, brutalist corners). 
- **Secondary Button:** Text only with an under-animated 1px line that expands from center on hover (`transform-origin: center; scale-x: 1`).
- **Product Cards:** Borderless. The image takes up 80% of the card height, fading into the dark background. Scent notes appear on hover via a staggered fade-in animation (`opacity: 1; transform: translateY(0)`).

## 5. Implementation Strategy Summary
To achieve this, the implementation phase should leverage a modern framework (React/Next.js) with Tailwind CSS for rapid, strict styling to the color palette. Animations should be orchestrated globally using CSS transitions or Framer Motion for the multi-step Scent Quiz, ensuring a seamless, high-performance experience that aligns with the premium brand identity.

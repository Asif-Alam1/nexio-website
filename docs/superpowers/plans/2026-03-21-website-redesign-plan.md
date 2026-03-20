# Nexio Labs Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Nexio Labs single-page website into a 4-page editorial experience with kinetic animations, inspired by the "2026 Kinetic" Stitch designs.

**Architecture:** Full rebuild on a feature branch. New Tailwind config with editorial design tokens, GSAP + Framer Motion animation stack, Lenis smooth scroll. Components split into shared UI primitives, layout shell, and per-page sections. All real data (team, services, contact) carried forward.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3 (v3 is active via `postcss.config.mjs` — the `@tailwindcss/postcss` v4 package is installed but unused), GSAP + ScrollTrigger, Framer Motion 12, Lenis, react-fast-marquee

**Note on assets:** Several images are needed (hero abstract, services 3D shape, about narrative). Use placeholder gradient/blur backgrounds until real assets are sourced. Team photos exist at `public/images/team/`.

**Spec:** `docs/superpowers/specs/2026-03-20-website-redesign-design.md`

**Stitch reference HTML:** `stitch_nexio_labs_work/` (home, services, work, about_team folders with code.html + screen.png)

---

## Phase 1: Foundation

### Task 1: Create feature branch and install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Create feature branch**

```bash
git checkout -b feat/editorial-redesign
```

- [ ] **Step 2: Install new dependencies**

```bash
npm install gsap @gsap/react react-fast-marquee
```

- [ ] **Step 3: Verify install**

```bash
npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install gsap, @gsap/react, react-fast-marquee"
```

---

### Task 2: Rewrite Tailwind config with editorial design tokens

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace the entire tailwind config**

Replace the full contents of `tailwind.config.ts` with the editorial design token system from the spec (Section 2.2). Key changes:
- Surface color hierarchy: `surface` (#080D1A), `surface-dim` (#0B1120), `surface-low` (#0F1629), `surface-container` (#141C35), `surface-high` (#1A2340), `surface-bright` (#212B4A)
- Accent colors: `primary` (#F97316), `primary-dim` (#EA580C), `secondary` (#2563EB), `secondary-dim` (#1D4ED8), glow variants
- Text colors: `on-surface` (#E2E8F0), `on-surface-variant` (#94A3B8), `outline` (#64748B), `outline-variant` (#334155)
- Font families: `headline` (Newsreader), `body` (Outfit), `label` (Space Grotesk)
- Border radius: all `0px` except `full: 9999px`
- Keep existing spacing scale, transition durations

Refer to spec Section 2.2 for exact values.

- [ ] **Step 2: Verify build**

```bash
npm run build
```
Expected: Build succeeds (existing components will have broken styles, that's expected).

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: rewrite tailwind config with editorial design tokens"
```

---

### Task 3: Update fonts and globals.css

**Files:**
- Modify: `src/app/layout.tsx` (font imports only — NOT metadata/structured data yet)
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update font imports in layout.tsx**

Replace font imports: remove Outfit, Lora, DM_Mono. Add:
```ts
import { Newsreader, Space_Grotesk } from "next/font/google";
import { Outfit } from "next/font/google"; // keep Outfit
```

Configure Newsreader as variable font:
```ts
const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz", "wght"],
  display: "swap",
  style: ["italic", "normal"],
  variable: "--font-headline",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-label",
});
```

Apply all three CSS variables to `<html>` className.

- [ ] **Step 2: Rewrite globals.css**

Replace globals.css with the editorial foundation:
- Tailwind directives
- Body: `bg-surface-dim`, `text-on-surface`, `font-body`, `overflow-x: hidden`, `-webkit-font-smoothing: antialiased`
- Scrollbar hidden: `scrollbar-width: none` + `::-webkit-scrollbar { display: none }`
- `overscroll-behavior-y: none`
- Kinetic text utility: `.kinetic-text { line-height: 0.85; letter-spacing: -0.06em; }`
- Grain animation keyframes
- Glass panel utility class
- Floating metadata utility class
- `h1, h2, h3, h4, h5, h6 { text-wrap: balance; }` — global heading rule
- Chromatic aberration utility: `.chromatic-hover:hover { ... }` using three overlapping pseudo-elements with `mix-blend-screen` and ±1px `translateX` offset
- `prefers-reduced-motion` media query: disable all animations, transitions, set `scroll-behavior: auto`
- Selection colors: `::selection { background: primary; color: surface; }`

Refer to the Stitch home HTML (`stitch_nexio_labs_work/nexio_labs_2026_kinetic_home/code.html` lines 74-157) for exact CSS patterns.

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: update fonts to Newsreader/Outfit/Space Grotesk, rewrite globals.css"
```

---

### Task 4: Set up GSAP registration and Lenis integration

**Files:**
- Create: `src/lib/gsap.ts`
- Create: `src/lib/animations.ts`
- Modify: `src/hooks/useSmoothScroll.ts`

- [ ] **Step 1: Create GSAP registration file**

Create `src/lib/gsap.ts`:
```ts
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
```

- [ ] **Step 2: Create shared animation presets**

Create `src/lib/animations.ts` with shared easing curves, durations, and GSAP defaults:
```ts
export const EASE = {
  smooth: "power3.out",
  snappy: "power4.out",
  bounce: "back.out(1.7)",
  entrance: [0.16, 1, 0.3, 1], // for framer-motion
} as const;

export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  entrance: 0.8,
} as const;

export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;
```

- [ ] **Step 3: Fix Lenis hook — remove dual lerp/duration, add GSAP ticker sync**

Modify `src/hooks/useSmoothScroll.ts`:
- Remove `duration` param (keep `lerp: 0.1` only — they're mutually exclusive)
- Add GSAP ticker integration: `gsap.ticker.add((time) => lenis.raf(time * 1000))`
- Remove the standalone `requestAnimationFrame` loop (GSAP ticker replaces it)
- Import gsap from `@/lib/gsap`

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/gsap.ts src/lib/animations.ts src/hooks/useSmoothScroll.ts
git commit -m "feat: set up GSAP registration, animation presets, fix Lenis sync"
```

---

## Phase 2: Shared UI Components

### Task 5: Build GlassPanel component

**Files:**
- Create: `src/components/ui/GlassPanel.tsx`

- [ ] **Step 1: Create GlassPanel**

A reusable container with glassmorphism styling:
- Props: `children`, `className`, `as` (polymorphic element tag, default `div`)
- Styles: `bg-white/[0.02] backdrop-blur-[12px] border border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]`
- Merges with className via `cn()`

Refer to Stitch home HTML line 121-126 for the `.glass-panel` CSS.

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/GlassPanel.tsx
git commit -m "feat: add GlassPanel glassmorphism component"
```

---

### Task 6: Build SplitText and KineticText components

**Files:**
- Create: `src/components/ui/SplitText.tsx`
- Create: `src/components/ui/KineticText.tsx`

- [ ] **Step 1: Create SplitText**

Custom text splitter (replaces paid GSAP SplitText plugin):
- Props: `children` (string), `type` ("chars" | "words" | "lines"), `className`
- Splits text into `<span>` elements wrapping each character/word/line
- Each span gets `display: inline-block` (required for GSAP transforms) and a data attribute for targeting
- Preserves whitespace between words
- Returns a ref to the container for GSAP targeting

- [ ] **Step 2: Create KineticText**

Massive headline component with variable font + split animation:
- Props: `children`, `className`, `animate` (boolean, default true), `delay` (number)
- Renders text in `font-headline italic kinetic-text` classes
- Uses `clamp()` for fluid sizing via className
- On mount (if `animate`): uses GSAP to animate each character from `y: 100%, opacity: 0` to `y: 0, opacity: 1` with stagger
- Supports `font-variation-settings` hover animation (weight 200→800) via CSS transition
- Uses `useGSAP` hook for cleanup
- Import gsap from `@/lib/gsap`

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/SplitText.tsx src/components/ui/KineticText.tsx
git commit -m "feat: add SplitText and KineticText animation components"
```

---

### Task 7: Build FloatingMetadata, BlueprintGrid, AmbientBlob components

**Files:**
- Create: `src/components/ui/FloatingMetadata.tsx`
- Create: `src/components/ui/BlueprintGrid.tsx`
- Create: `src/components/ui/AmbientBlob.tsx`

- [ ] **Step 1: Create FloatingMetadata**

Tiny technical annotation component:
- Props: `children` (string), `className`, `position` ("top-left" | "top-right" | "bottom-left" | "bottom-right" | custom)
- Styles: `font-label text-[8px] tracking-[0.2em] uppercase text-on-surface/30 pointer-events-none`
- Positions absolutely within parent container

Refer to Stitch HTML `.floating-metadata` class (home code.html lines 112-119).

- [ ] **Step 2: Create BlueprintGrid**

Subtle grid background overlay:
- Props: `className`, `color` (default primary), `opacity` (default 0.05)
- CSS: `background-image: linear-gradient(rgba(color, opacity) 1px, transparent 1px), linear-gradient(90deg, rgba(color, opacity) 1px, transparent 1px); background-size: 40px 40px;`
- Applies radial gradient mask to fade edges: `mask-image: radial-gradient(circle at center, black, transparent 80%);`
- `pointer-events: none`, `position: absolute`, `inset: 0`

Refer to Stitch services HTML `.blueprint-overlay` (services code.html lines 96-101).

- [ ] **Step 3: Create AmbientBlob**

Blurred floating gradient orb:
- Props: `color` (string, e.g. "primary" or hex), `size` (string, e.g. "500px"), `position` (object {top?, left?, right?, bottom?}), `className`, `delay` (number for animation offset)
- Renders a `div` with `rounded-full`, `filter: blur(100px)`, background color from prop, `pointer-events-none`
- CSS animation: slow float on 20s infinite alternate (translate + scale)
- `animation-delay` from `delay` prop

Refer to Stitch home HTML `.non-linear-blob` and `@keyframes float` (lines 148-156).

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/FloatingMetadata.tsx src/components/ui/BlueprintGrid.tsx src/components/ui/AmbientBlob.tsx
git commit -m "feat: add FloatingMetadata, BlueprintGrid, AmbientBlob components"
```

---

### Task 8: Build MagneticButton, TextScramble, TextMarquee, ImageReveal

**Files:**
- Create: `src/components/ui/MagneticButton.tsx`
- Create: `src/components/ui/TextScramble.tsx`
- Create: `src/components/ui/TextMarquee.tsx`
- Create: `src/components/ui/ImageReveal.tsx`
- Create: `src/hooks/useMagneticEffect.ts`
- Create: `src/hooks/useTextScramble.ts`
- Create: `src/hooks/useScrollVelocity.ts`

- [ ] **Step 1: Create useMagneticEffect hook**

Hook that calculates magnetic pull toward cursor:
- Takes a ref to the element
- On mousemove within a threshold distance (default 100px), calculates offset vector
- Returns `{ x, y }` transform values (divided by a strength factor)
- Resets to `{ x: 0, y: 0 }` on mouseleave
- Uses `requestAnimationFrame` for smooth updates

- [ ] **Step 1b: Create useTextScramble hook**

Hook that powers the TextScramble component:
- Takes `text` (string) and `options` ({ duration?: number, characters?: string })
- Returns `{ displayText, trigger }` — `displayText` is the current scrambled/resolved text, `trigger()` starts the animation
- Uses `requestAnimationFrame` to cycle random characters, resolving left-to-right over `duration` ms
- Default character set: `"!@#$%^&*()_+{}|:<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ"`

- [ ] **Step 1c: Create useScrollVelocity hook**

Hook that detects scroll speed for velocity-reactive effects:
- Returns `scrollVelocity` (number, pixels/second)
- Uses GSAP's `ScrollTrigger.getVelocity()` or manual delta calculation via `requestAnimationFrame`
- Normalizes to a 0-1 range for use as a multiplier (e.g., marquee speed = baseSpeed * (1 + velocity))
- Import gsap from `@/lib/gsap`

- [ ] **Step 2: Create MagneticButton**

Button component with magnetic cursor pull + gradient/ghost variants:
- Props: `children`, `variant` ("gradient" | "ghost"), `href` (optional, renders `<a>`), `className`, `onClick`
- **Gradient variant:** `background: linear-gradient(135deg, #F97316 0%, #EA580C 100%)`, `shadow: 0 0 20px rgba(249,115,22,0.2)`, all-caps Space Grotesk label text, hover `scale(1.02)` with 400ms cubic-bezier
- **Ghost variant:** transparent bg, `outline-variant` border, hover fills white with black text
- Uses `useMagneticEffect` for subtle position shift toward cursor
- `border-radius: 0` (sharp edges per design system)

- [ ] **Step 3: Create TextScramble**

Copy from React Bits (`reactbits.dev/text-animations/scramble-text`) and adapt:
- Props: `text` (string), `className`, `trigger` ("hover" | "mount" | "inView")
- Uses `useTextScramble` hook internally
- On trigger: rapidly cycles through random characters before resolving to final text
- Duration ~600ms, character set: "!@#$%^&*()_+{}|:<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ"

- [ ] **Step 4: Create TextMarquee**

Wrapper around `react-fast-marquee`:
- Props: `children` (or `text` string), `speed`, `pauseOnHover`, `className`, `direction`
- Applies editorial styling: outlined text (stroke, no fill) when used for decorative bands
- Supports hover darkening on individual items (Astraeus pattern)
- Optional `velocityMode` prop: when true, uses `useScrollVelocity` to scale marquee speed dynamically (used on Services page)

- [ ] **Step 5: Create ImageReveal**

GSAP scroll-driven clip-path reveal:
- Props: `children` (image/content), `direction` ("left" | "right" | "top" | "bottom"), `className`
- On scroll into view: animates `clipPath` from `inset(0 100% 0 0)` → `inset(0 0 0 0)` (for left reveal)
- Uses GSAP ScrollTrigger with `useGSAP` hook
- Duration ~1s, `power3.out` ease

- [ ] **Step 6: Verify build**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/MagneticButton.tsx src/components/ui/TextScramble.tsx src/components/ui/TextMarquee.tsx src/components/ui/ImageReveal.tsx src/hooks/useMagneticEffect.ts src/hooks/useTextScramble.ts src/hooks/useScrollVelocity.ts
git commit -m "feat: add MagneticButton, TextScramble, TextMarquee, ImageReveal + hooks"
```

---

### Task 9: Build Button and SectionHeader (editorial versions)

**Files:**
- Modify: `src/components/ui/Button.tsx` (full rewrite)
- Modify: `src/components/ui/SectionHeader.tsx` (full rewrite)

- [ ] **Step 1: Rewrite Button.tsx**

Editorial button with two variants:
- **Primary (gradient):** terracotta-style gradient from `primary` to `primary-dim`, 0px radius, all-caps `font-label`, hover `scale-[1.02]` with 400ms cubic-bezier, `box-shadow: 0 0 20px rgba(249,115,22,0.2)`
- **Ghost:** transparent with ghost border (`outline-variant`), 0px radius, hover fills white + text inverts
- Polymorphic: renders `<a>` when `href` is provided, `<button>` otherwise
- Keep the existing prop interface for compatibility

- [ ] **Step 2: Rewrite SectionHeader.tsx**

Editorial section header with metadata annotation:
- Props: `title`, `subtitle`, `metadata` (string for floating annotation), `align` ("left" | "center"), `className`
- Title in Newsreader italic massive size with KineticText animation
- Subtitle in body text behind a left-border accent
- FloatingMetadata positioned above the title
- GSAP entrance animation on scroll

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/SectionHeader.tsx
git commit -m "feat: rewrite Button and SectionHeader for editorial design"
```

---

## Phase 3: Layout Shell

### Task 10: Build GrainOverlay component

**Files:**
- Create: `src/components/layout/GrainOverlay.tsx`

- [ ] **Step 1: Create GrainOverlay**

SVG `<feTurbulence>` film grain overlay:
- `"use client"` component
- Renders an SVG filter definition with `<feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />`
- Full-screen fixed div applying the filter: `position: fixed; inset: 0; z-index: 9999; pointer-events: none; opacity: 0.04;`
- `aria-hidden="true"`
- Optional: subtle CSS animation shifting the base frequency for movement
- `prefers-reduced-motion`: static, no animation

Refer to Stitch HTML grain patterns and spec Section 4.4.

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/GrainOverlay.tsx
git commit -m "feat: add SVG film grain overlay component"
```

---

### Task 11: Rewrite Navbar for glass-panel editorial style

**Files:**
- Modify: `src/components/layout/Navbar.tsx` (full rewrite)

- [ ] **Step 1: Rewrite Navbar**

Glass-panel floating nav with hide/reveal:
- `"use client"` component
- **Desktop (≥ md):** Fixed `top-8`, centered `max-w-6xl`, GlassPanel styling, `h-16 px-8`
  - Left: "NEXIO LABS" in `font-headline italic font-bold tracking-tighter`
  - Center: Page links (Home, Services, About, Contact) in `font-label uppercase tracking-widest text-[10px]`. Active link: orange dot + orange text. Others: `on-surface/60`, hover `on-surface`
  - Right: "Start Project" MagneticButton (gradient variant)
  - Active link detection via `usePathname()`
- **Mobile (< md):** `h-14 px-6`, logo left + hamburger right
  - Hamburger: 3-line → X animation (middle opacity→0, top/bottom rotate ±47deg, 800ms)
  - Opens: full-screen overlay (`fixed inset-0 bg-surface-dim z-[200]`) with staggered large links (Newsreader, fade+slide from bottom, 100ms stagger)
- **Scroll behavior:** Track scroll direction via `useRef` storing previous scrollY. On scroll down > 100px: `translateY(-120%)`. On scroll up: `translateY(0)`. 600ms cubic-bezier transition
- **Context-aware:** Sections with `data-navbar-theme="light"` toggle a `.navbar-light` class on the nav via IntersectionObserver, shifting glass tint to darker

Import navigation items from `src/lib/constants.ts` (update to include page routes instead of section IDs).

- [ ] **Step 2: Update constants.ts with page routes**

Modify `src/lib/constants.ts`: update `NAV_ITEMS` to use page routes (`/`, `/services`, `/about`, `/contact`) instead of section anchor IDs (`#services`, `#team`, etc.).

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx src/lib/constants.ts
git commit -m "feat: rewrite Navbar with glass-panel editorial style"
```

---

### Task 12: Rewrite Footer for editorial style

**Files:**
- Modify: `src/components/layout/Footer.tsx` (full rewrite)

- [ ] **Step 1: Rewrite Footer**

Editorial footer with giant watermark:
- Giant "NEXIO" watermark: `text-[12rem] font-headline italic text-white/5 select-none pointer-events-none leading-none tracking-tighter`
- Overlaid metadata: "CURATED_DIGITAL_EXPERIENCES" + "EST_2024_V_FINAL" as FloatingMetadata
- 3-column link grid: Social (Instagram, LinkedIn), Contact (Email, WhatsApp), Legal (Privacy, Terms)
  - Column headers: `font-label text-[10px] uppercase tracking-[0.3em] text-outline`
  - Links: `font-label text-[11px] uppercase tracking-widest text-on-surface/40 hover:text-secondary`
- Bottom bar: copyright in `font-label text-[9px] text-on-surface/30 uppercase tracking-[0.3em]`
- Status indicator: GlassPanel with pulsing orange+blue dots + "Global Network Status: Operational"
- Background: `bg-surface` with `backdrop-blur-xl`, top ghost border (`border-t border-white/5`)
- GSAP: Watermark parallax, staggered column entrance

Refer to Stitch home HTML footer (lines 375-418).

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: rewrite Footer with editorial watermark style"
```

---

### Task 13: Enhance CustomCursor and rewrite ScrollProgress

**Files:**
- Modify: `src/components/layout/CustomCursor.tsx`
- Modify: `src/components/layout/ScrollProgress.tsx`

- [ ] **Step 1: Enhance CustomCursor**

Update existing Framer Motion cursor implementation:
- Change appearance: 40px circle, orange border at 40% opacity (`border: 1px solid rgba(249,115,22,0.4)`), `mix-blend-mode: difference`
- Hover state (links/buttons): scale 1.5x, border goes full orange
- Click state: scale 0.8x, fill with `rgba(249,115,22,0.1)`
- Add magnetic pull for nearby interactive elements (integrate `useMagneticEffect`)
- Hide on touch devices: check `window.matchMedia('(pointer: fine)')`

- [ ] **Step 2: Restyle ScrollProgress**

Update to match editorial theme:
- Change from blue to primary (orange)
- Height: 2px → 1px for subtlety
- Background: `primary` with `shadow: 0 0 10px rgba(249,115,22,0.3)` for glow

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/CustomCursor.tsx src/components/layout/ScrollProgress.tsx
git commit -m "feat: enhance CustomCursor with magnetic pull, restyle ScrollProgress"
```

---

### Task 14: Rewrite root layout and providers

**Files:**
- Create: `src/components/providers/SmoothScrollProvider.tsx`
- Modify: `src/app/layout.tsx` (rewrite component tree, preserve ALL metadata/structured data)
- Modify: `src/components/layout/FloatingWhatsApp.tsx` (restyle)
- Delete: `src/components/layout/ClientShell.tsx` (functionality absorbed into layout)
- Delete: `src/components/layout/SmoothScrollProvider.tsx` (moved to providers/)
- Delete: `src/components/layout/PageLoader.tsx` (replaced by loading.tsx in Task 15)

Note: `foundingDate` fix and llms content updates are consolidated in Task 25 (SEO task).
Note: `PageTransition.tsx` from the spec is NOT needed — `template.tsx` handles transitions directly.

- [ ] **Step 1: Create new SmoothScrollProvider at providers path**

Create `src/components/providers/SmoothScrollProvider.tsx`:
- `"use client"` component
- Wraps children, calls `useSmoothScroll()` hook (from Task 4)
- Simple provider that initializes Lenis + GSAP ticker sync

- [ ] **Step 2: Rewrite layout.tsx component tree**

Keep ALL existing metadata and structured data (JSON-LD schemas) unchanged. Only change the component tree:
- Font imports: use new Newsreader, Outfit, Space Grotesk (from Task 3)
- Body className: apply all three font CSS variables + `bg-surface-dim text-on-surface`
- Component tree:
  ```tsx
  <html className={`${newsreader.variable} ${outfit.variable} ${spaceGrotesk.variable}`}>
    <body className="font-body bg-surface-dim text-on-surface antialiased">
      <SmoothScrollProvider>
        <GrainOverlay />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </SmoothScrollProvider>
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
  ```
- Import SmoothScrollProvider from `@/components/providers/SmoothScrollProvider`
- Add `id="main-content"` to main wrapper (for skip-to-content accessibility link)

- [ ] **Step 3: Restyle FloatingWhatsApp**

Update to match editorial theme: sharp edges (0px radius), glass panel style.

- [ ] **Step 4: Delete obsolete layout files**

```bash
rm src/components/layout/ClientShell.tsx src/components/layout/PageLoader.tsx src/components/layout/SmoothScrollProvider.tsx
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/components/providers/SmoothScrollProvider.tsx src/app/layout.tsx src/components/layout/FloatingWhatsApp.tsx
git add -u src/components/layout/ClientShell.tsx src/components/layout/PageLoader.tsx src/components/layout/SmoothScrollProvider.tsx
git commit -m "feat: rewrite root layout with editorial shell and providers"
```

---

### Task 15: Create template, error pages, and update sitemap

**Files:**
- Create: `src/app/template.tsx`
- Create: `src/app/not-found.tsx`
- Create: `src/app/error.tsx`
- Create: `src/app/loading.tsx`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Create template.tsx**

Enter-only page transition (exit animations do NOT work in App Router `template.tsx`):
```tsx
"use client";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create error.tsx**

```tsx
"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  // "Something went wrong." in Newsreader italic
  // "Try Again" button calling reset() + "Go Home" link
}
```

- [ ] **Step 4: Create loading.tsx**

Subtle loading state: `surface-dim` background with centered pulsing "NL." mark in Newsreader italic, `animate-pulse`.

- [ ] **Step 5: Update sitemap.ts**

Add new routes: `/services`, `/about`, `/contact`.

- [ ] **Step 6: Verify build**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add src/app/template.tsx src/app/not-found.tsx src/app/error.tsx src/app/loading.tsx src/app/sitemap.ts
git commit -m "feat: add template, 404, error, loading pages and update sitemap"
```

---

## Phase 4: Home Page

### Task 16: Build Home Hero section (was Task 15)

**Files:**
- Create: `src/components/home/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection**

Kinetic hero inspired by Stitch home (code.html lines 183-221):
- Full viewport `min-h-dvh`, flex column justify-center, `px-12 pt-40 pb-20`
- **Floating metadata:** Top-right "LOC / 33.8938° N, 35.5018° E", "PROTO / H_KINETIC_V1" (use FloatingMetadata)
- **Headline:** KineticText component, three lines:
  - "Curating" — `text-on-surface`, left-aligned
  - "The Future" — indented `ml-[12vw]`, `text-outline-variant opacity-40`
  - "of Code." — `text-primary`
  - Size: `clamp(3rem, 13vw, 12rem)` via className
  - Variable font hover: CSS `transition: font-variation-settings 0.6s ease`
- **Right side:** Abstract grayscale image (`mix-blend-screen`, `opacity-60`, `grayscale brightness-125 contrast-75`), positioned absolutely right-[5%] top-[15%], hidden on mobile (< lg)
- **AmbientBlobs:** Two blobs (primary/secondary) behind everything at `-z-10`
- **Bottom:** Manifesto text left + "Explore" link with expanding line animation right
- **GSAP:** On mount, hero text splits in char-by-char. On scroll, parallax the image and blobs

Use the actual Stitch HTML structure as reference (home code.html lines 183-221).

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/home/HeroSection.tsx
git commit -m "feat: add kinetic hero section for home page"
```

---

### Task 17: Build Home Capabilities section

**Files:**
- Create: `src/components/home/CapabilitiesSection.tsx`

- [ ] **Step 1: Create CapabilitiesSection**

Bento grid of 6 services inspired by Stitch home (code.html lines 312-353):
- Section header: "Capabilities" in massive Newsreader + right-side description behind left border
- 3-column grid (`grid-cols-1 md:grid-cols-3 gap-8`)
- Each card: GlassPanel, `aspect-square`, flex column justify-between
  - FloatingMetadata index ("01_WEB", "02_COMMERCE", etc.)
  - Title in `font-headline italic text-5xl`
  - Description + expanding line at bottom
  - **Hover color takeover:** Card 1 fills primary (orange), Card 2 fills secondary (blue), Card 3 fills white (text inverts to black). Use group-hover + transition-all duration-700
- Service data from `src/lib/constants.ts` (or inline — use existing service data)
- GSAP: staggered entrance with ScrollTrigger, 100ms delay offsets

Refer to Stitch home HTML bento grid (lines 312-353) for exact hover patterns.

- [ ] **Step 2: Commit**

```bash
git add src/components/home/CapabilitiesSection.tsx
git commit -m "feat: add capabilities bento grid section"
```

---

### Task 18: Build Home CTA section and assemble Home page

**Files:**
- Create: `src/components/home/CTASection.tsx`
- Modify: `src/app/page.tsx` (full rewrite)

- [ ] **Step 1: Create CTASection**

Editorial CTA inspired by Stitch home (code.html lines 354-372):
- "Let's build the Unseen." — Newsreader italic at `clamp(3rem, 10vw, 10rem)`, "Unseen." in stroke/outline at 30% opacity
- Status label: "Status: Available for Q3 2026 Projects" in blue Space Grotesk
- Email: "hello@nexiolabs.co" in `font-headline italic` ~5xl-7xl, hover turns primary. Click copies to clipboard with TextScramble feedback
- BlueprintGrid behind at low opacity
- GSAP: text fades/scales up on scroll into view

- [ ] **Step 2: Add TextMarquee band**

Include a TextMarquee between Capabilities and CTA:
- Text: "DESIGN — ENGINEERING — CRAFT — STRATEGY — INNOVATION —"
- Outlined text style: `-webkit-text-stroke: 1px` with transparent fill
- Size: `clamp(3rem, 8vw, 8rem)`
- `pauseOnHover` enabled, `speed={40}`

- [ ] **Step 3: Rewrite page.tsx (Home)**

```tsx
import { HeroSection } from "@/components/home/HeroSection";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { CTASection } from "@/components/home/CTASection";
import { TextMarquee } from "@/components/ui/TextMarquee";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CapabilitiesSection />
      {/* Marquee band */}
      <TextMarquee ... />
      <CTASection />
    </main>
  );
}
```

Remove all dynamic imports of old sections (Services, Process, Team, Contact).

- [ ] **Step 4: Verify build + visual check**

```bash
npm run build && npm run dev
```
Open `http://localhost:3000` and verify the home page renders with all sections.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/CTASection.tsx src/app/page.tsx
git commit -m "feat: complete home page with hero, capabilities, marquee, CTA"
```

---

## Phase 5: Services Page

### Task 19: Build Services Hero and Fluid Service Grid

**Files:**
- Create: `src/components/services/ServicesHero.tsx`
- Create: `src/components/services/ServiceGrid.tsx`

- [ ] **Step 1: Create ServicesHero**

Inspired by Stitch services (services code.html lines 166-199):
- Full viewport, `min-h-screen flex items-center px-8 md:px-24`
- Label: orange line + "Capabilities 2026" in Space Grotesk
- Headline: "OUR / CRAFT" at `clamp(4rem, 18vw, 16rem)`, Newsreader italic, `mix-blend-difference`, `line-height: 0.75`, `letter-spacing: -0.06em`
- Right: floating 3D shape image (grayscale, float animation), hidden < lg
- Subtitle right-aligned with scroll prompt
- BlueprintGrid overlay

- [ ] **Step 2: Create ServiceGrid**

Asymmetric fluid grid inspired by Stitch services (code.html lines 200-249):
- 12-column CSS Grid
- **Website Development:** 7 cols, 2 rows, tactile 3D card (`perspective(1000px) rotateX(2deg)` → straighten on hover). "Web / Archi-/ tecture" headline. Background image fades in on hover
- **E-Commerce:** 5 cols. "Digital / Boutique"
- **AI Chatbots:** 5 cols. "Neural / Systems". Primary tinted border
- **Mobile Apps:** 6 cols, glass panel
- **Desktop Apps:** 6 cols, glass panel
- **Automations:** 12 cols wide cinematic card
- Each card: FloatingMetadata, tech chips with ghost borders, GSAP staggered cascade
- Mobile: single column stack

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/services/ServicesHero.tsx src/components/services/ServiceGrid.tsx
git commit -m "feat: add Services hero and fluid service grid"
```

---

### Task 20: Build Process sticky scroll section

**Files:**
- Create: `src/components/services/ProcessSection.tsx`

- [ ] **Step 1: Create ProcessSection**

"LOGIC MEETS LUXURY" sticky scroll inspired by Stitch services (code.html lines 251-286):
- **White background section** — dramatic contrast break: `bg-white text-black`
- Add `data-navbar-theme="light"` for context-aware nav
- BlueprintGrid at 10% opacity
- **Two-column layout:**
  - Left (sticky): "LOGIC / MEETS / LUXURY." at `clamp(3rem, 12vw, 10rem)`, Newsreader italic, second line indented `pl-24`. `sticky top-24`
  - Right (scrolls): 5 process steps (Connect, Plan, Build, Launch, Grow) from current data
    - Each step: `border-t border-black/10 pt-12`, "Process 01-05" label, headline in Newsreader 5xl italic, description paragraph
- GSAP ScrollTrigger: pin left column while right scrolls. Each step fades in
- **Mobile (< lg):** No sticky. Headline sits above, steps stack with left border accent

Process step data from existing `src/lib/constants.ts` or the current Process component.

- [ ] **Step 2: Commit**

```bash
git add src/components/services/ProcessSection.tsx
git commit -m "feat: add LOGIC MEETS LUXURY sticky scroll process section"
```

---

### Task 21: Build Services CTA and assemble Services page

**Files:**
- Create: `src/components/services/ServicesCTA.tsx`
- Create: `src/app/services/page.tsx`

- [ ] **Step 1: Create ServicesCTA**

Circle button CTA inspired by Stitch services (code.html lines 287-306):
- "INITIATE / PROJECT." — massive headline, "PROJECT." in primary
- Center: 256px circular button (`rounded-full` — exception to 0px rule)
  - Ghost border, inner primary dot that scales 5x and fades on hover
  - "Contact" label overlaid
  - Outer circle pulsing at 1.3x scale
- Two diagonal decorative lines at ±12deg behind CTA
- Links to `/contact`

- [ ] **Step 2: Create services/page.tsx**

```tsx
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { ProcessSection } from "@/components/services/ProcessSection";
import { ServicesCTA } from "@/components/services/ServicesCTA";

export const metadata = {
  title: "Our Craft | Nexio Labs",
  description: "Web architecture, e-commerce, mobile apps, AI systems, and automations. Engineering precision meets editorial design.",
  // ... OG tags, canonical URL
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      {/* Scroll velocity marquee */}
      <ServiceGrid />
      <ProcessSection />
      <ServicesCTA />
    </main>
  );
}
```

- [ ] **Step 3: Verify build + visual check**

```bash
npm run build && npm run dev
```
Navigate to `/services` and verify all sections render.

- [ ] **Step 4: Commit**

```bash
git add src/components/services/ServicesCTA.tsx src/app/services/page.tsx
git commit -m "feat: complete services page with hero, grid, process, CTA"
```

---

## Phase 6: About Page

### Task 22: Build About Hero and Narrative sections

**Files:**
- Create: `src/components/about/AboutHero.tsx`
- Create: `src/components/about/NarrativeSection.tsx`

- [ ] **Step 1: Create AboutHero**

Inspired by Stitch about (about_team code.html lines 148-169):
- Faded abstract background image, `mix-blend-overlay`, grayscale 40%
- Label: "Est. 2024 — Beirut, Lebanon" in secondary Space Grotesk
- Headline: "THE / COLLECTIVE" at 10-12vw, Newsreader bold italic
- Below: description left + "Discover our essence" with circular icon button right

- [ ] **Step 2: Create NarrativeSection**

Inspired by Stitch about (code.html lines 170-198):
- Background: `bg-surface-low` (tonal shift, no border)
- 12-col grid: 7 cols text, 5 cols image
- Left: "Nexio Labs was born out of a **rebellion** against the templated web." — "rebellion" in primary. Two-column body text below
- Right: 3:4 portrait image, heavy shadow, grayscale → color on hover
- Overlapping stat block: "10+" / "Projects Delivered" in primary background
- GSAP: image clip-path wipe, stat block slides up

- [ ] **Step 3: Commit**

```bash
git add src/components/about/AboutHero.tsx src/components/about/NarrativeSection.tsx
git commit -m "feat: add About hero and narrative sections"
```

---

### Task 23: Build Philosophy scroller and Team gallery

**Files:**
- Create: `src/components/about/PhilosophyScroller.tsx`
- Create: `src/components/about/TeamGallery.tsx`

- [ ] **Step 1: Create PhilosophyScroller**

Horizontal scroll section inspired by Stitch about (code.html lines 199-237):
- Header: "Our Philosophy" label + "Core Mandates" headline
- GSAP ScrollTrigger horizontal scroll: `pin: true`, translate X based on scroll progress
- 3 value cards (80vw mobile / 40vw desktop):
  1. "Intentional Craft" — left border primary, giant outlined "01"
  2. "Technical Precision" — left border secondary, outlined "02"
  3. "Future-Proof Engineering" — left border primary, outlined "03"
- Outlined numbers: `-webkit-text-stroke: 1px`, fill on hover via `group-hover:text-secondary`

- [ ] **Step 2: Create TeamGallery**

Asymmetric staggered team grid inspired by Stitch about (code.html lines 238-329):
- Header: faded "THE FACULTY" at 8vw + "Collaborators" foreground
- 12-col grid with staggered members:
  - **Asif Alam:** cols 1-5, glass panel 4:5 portrait, "ASIF" at 8vw behind, metadata annotations
  - **Joseph Attieh:** cols 8-12, shifted up, "JOSEPH" vertical text, 3:4 ratio, right-aligned
  - **Karl Abou Jaoude:** cols 4-9, centered, horizontal glass panel layout
- Team data from existing `src/lib/constants.ts` or Team section
- Team images from `public/images/team/` (asif.jpeg, joseph.jpeg, karl.jpeg)
- Footer: "TOTAL_NODES: 03" + dots + "SYNC_STATUS: OPERATIONAL"
- Mobile: full-width stacked, remove giant background text

- [ ] **Step 3: Commit**

```bash
git add src/components/about/PhilosophyScroller.tsx src/components/about/TeamGallery.tsx
git commit -m "feat: add philosophy scroller and asymmetric team gallery"
```

---

### Task 24: Assemble About page

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Create about/page.tsx**

```tsx
import { AboutHero } from "@/components/about/AboutHero";
import { NarrativeSection } from "@/components/about/NarrativeSection";
import { PhilosophyScroller } from "@/components/about/PhilosophyScroller";
import { TeamGallery } from "@/components/about/TeamGallery";

export const metadata = {
  title: "The Collective | Nexio Labs",
  description: "Meet the curators, engineers, and dreamers behind Nexio Labs. Born in Beirut, building for the world.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <NarrativeSection />
      <PhilosophyScroller />
      <TeamGallery />
      {/* About CTA: "Ready to build the impossible?" */}
    </main>
  );
}
```

Include the About CTA section inline or as a small component: "Ready to build the impossible?" with MagneticButton "Inquire Now" + ghost link.

- [ ] **Step 2: Verify build + visual check**

```bash
npm run build && npm run dev
```

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: complete about page with hero, narrative, philosophy, team"
```

---

## Phase 7: Contact Page

### Task 25: Build Contact page

**Files:**
- Create: `src/components/contact/ContactHero.tsx`
- Modify: `src/components/contact/ContactForm.tsx` (if file exists) or create new
- Create: `src/app/contact/page.tsx`

Note: The existing `src/components/ui/ContactForm.tsx` has the form logic. We'll create a new editorial version that preserves the server action integration.

- [ ] **Step 1: Create ContactHero**

- "Get In Touch" blue label
- "Let's Start / Something." at `clamp(3rem, 10vw, 8rem)`, "Something." in primary. KineticText reveal
- "Currently accepting projects for Q3 2026" subtitle
- AmbientBlobs behind text

- [ ] **Step 2: Create editorial ContactForm**

Create `src/components/contact/ContactForm.tsx`:
- 12-col split: 5 cols info, 7 cols form
- **Left (info):** Email (copy on click with TextScramble), WhatsApp, Socials, Location with coordinates metadata. Blocks separated by tonal shifts
- **Right (form):** GlassPanel container with FloatingMetadata "TRANSMISSION_PROTOCOL // V.2026"
  - Underline-only fields (no boxes): `border-b border-outline/30`, focus → `border-secondary` with glow
  - Labels: Space Grotesk uppercase, floating above on focus
  - Submit: full-width gradient MagneticButton, text scrambles on click → "Sending..."
  - Success: form fades, "Message Received." + pulsing dots
  - Error: red underline + error text
- Carry forward: existing form validation, honeypot, server action (`submitContactForm` from `src/app/actions/contact.ts`)

- [ ] **Step 3: Create contact/page.tsx**

```tsx
export const metadata = {
  title: "Get In Touch | Nexio Labs",
  description: "Start a project with Nexio Labs. Currently accepting projects for Q3 2026.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
      {/* Mini CTA: "Prefer a conversation?" + WhatsApp button */}
    </main>
  );
}
```

- [ ] **Step 4: Verify build + visual check**

```bash
npm run build && npm run dev
```

- [ ] **Step 5: Commit**

```bash
git add src/components/contact/ src/app/contact/page.tsx
git commit -m "feat: complete contact page with editorial form"
```

---

## Phase 8: SEO, Polish & Cleanup

### Task 26: Update SEO metadata and structured data

**Files:**
- Modify: `src/app/layout.tsx` (structured data updates)
- Modify: `public/llms.txt`
- Modify: `public/llms-full.txt`

- [ ] **Step 1: Update structured data in layout.tsx**

- Fix `foundingDate` from "2026" to "2024" in the Organization JSON-LD
- Fix the `llmsInlineContent` string: change "Founded: 2026" to "Founded: 2024"
- Add BreadcrumbList schema for multi-page navigation. Implement as a helper function in `src/lib/utils.ts` that each page can import:
  ```
  Services: Home (/) > Our Craft (/services)
  About: Home (/) > The Collective (/about)
  Contact: Home (/) > Get In Touch (/contact)
  ```
- Verify all existing schemas still valid (Organization, ITCompany, etc.)

- [ ] **Step 2: Update Home page metadata**

In `src/app/page.tsx`, export metadata:
```ts
export const metadata = {
  title: "Nexio Labs — Curating the Future of Code",
  description: "We bridge raw technical power and high-end craftsmanship. Website development, mobile apps, AI chatbots, and automations for ambitious brands.",
};
```

- [ ] **Step 3: Update llms.txt files**

Add new page URLs to both files: `/services`, `/about`, `/contact`. Update descriptions to match new per-page metadata.

- [ ] **Step 4: Verify OG images**

Check if existing `public/images/og-image.png` works for all pages. If per-page OG images are needed, note as a follow-up task (asset creation).

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx public/llms.txt public/llms-full.txt
git commit -m "fix: update structured data, add breadcrumbs, update llms.txt"
```

---

### Task 27: Delete obsolete components and clean up

**Files:**
- Delete: `src/components/sections/Hero.tsx`
- Delete: `src/components/sections/Services.tsx`
- Delete: `src/components/sections/Process.tsx`
- Delete: `src/components/sections/Team.tsx`
- Delete: `src/components/sections/Contact.tsx`
- Delete: `src/components/ui/ServiceCard.tsx`
- Delete: `src/components/ui/TeamCard.tsx`
- Delete: `src/components/ui/ProcessPanel.tsx`
- Delete: `src/components/ui/TextReveal.tsx`
- Delete: `src/components/ui/Logo.tsx` (if unused)
- Delete: `src/components/ui/ContactForm.tsx` (replaced by contact/ContactForm.tsx)

- [ ] **Step 1: Remove all old section components**

```bash
rm -rf src/components/sections/
rm src/components/ui/ServiceCard.tsx src/components/ui/TeamCard.tsx src/components/ui/ProcessPanel.tsx src/components/ui/TextReveal.tsx
```

- [ ] **Step 2: Verify no broken imports**

```bash
npm run build
```
Fix any import errors.

- [ ] **Step 3: Commit**

```bash
git status  # verify only expected deletions, no untracked files staged
git add -u src/components/sections/ src/components/ui/ServiceCard.tsx src/components/ui/TeamCard.tsx src/components/ui/ProcessPanel.tsx src/components/ui/TextReveal.tsx
git commit -m "chore: remove obsolete single-page section components"
```

---

### Task 28: Responsive polish and accessibility pass

**Files:**
- All page and component files as needed

- [ ] **Step 1: Run dev server and test all 4 pages at mobile/tablet/desktop**

```bash
npm run dev
```

Check each page at:
- 375px (mobile)
- 768px (tablet)
- 1280px (desktop)
- 1920px (wide)

Fix any layout breaks, overflow issues, text sizing problems.

- [ ] **Step 2: Verify `prefers-reduced-motion`**

In Chrome DevTools, enable "Reduce motion" in Rendering panel. All pages should show content immediately with no animation.

- [ ] **Step 3: Verify keyboard navigation**

Tab through all pages. All links, buttons, form fields should be focusable with visible focus styles (blue outline).

- [ ] **Step 4: Run production build**

```bash
npm run build
```
Verify zero errors, check bundle sizes.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: responsive polish and accessibility improvements"
```

---

### Task 29: Final build verification

- [ ] **Step 1: Clean build**

```bash
rm -rf .next && npm run build
```

- [ ] **Step 2: Verify all pages render in production mode**

```bash
npm run start
```

Check: `/`, `/services`, `/about`, `/contact`, `/nonexistent` (404 page).

- [ ] **Step 3: Verify Lighthouse scores**

Run Lighthouse on each page. Target:
- Performance: > 85
- Accessibility: > 90
- SEO: > 90

- [ ] **Step 4: Final commit if needed**

```bash
git add -A
git commit -m "chore: final build verification and polish"
```

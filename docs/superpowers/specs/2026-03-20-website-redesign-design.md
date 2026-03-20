# Nexio Labs Website Redesign — "The Digital Curator" Edition

**Date:** 2026-03-20
**Status:** Approved
**Approach:** Full Rebuild (Approach A) on feature branch

## 1. Overview

Transform the current single-page Nexio Labs website into a multi-page, editorial-style experience inspired by the Google Stitch "2026 Kinetic" designs. The redesign applies the Stitch editorial design language (asymmetric layouts, kinetic typography, glassmorphism, film grain, floating metadata) while keeping the existing color palette, real company data, and SEO infrastructure.

### Reference Material
- **Stitch project:** `projects/6043005869282096584` ("Nexio Labs - Work")
- **Design system:** `stitch_nexio_labs_work/nexus_obsidian/DESIGN.md` — "The Digital Curator" strategy
- **Stitch screens (4):** Home, Services, Work, About/Team HTML + screenshots in `stitch_nexio_labs_work/`
- **External references:** ascendmarketing.xyz, zarcerog.com, 375.studio, astraeuswealth.com

### Key Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Colors | Keep current midnight/blue/orange palette | User preference; brand continuity |
| Typography | Newsreader (headlines) + Outfit (body) + Space Grotesk (labels) | Hybrid: editorial Newsreader impact + Outfit body continuity |
| Pages | Home, Services, About, Contact (no Work page) | No case studies available yet |
| Process section | Lives on Services page | Natural fit: "what we do + how we do it" |
| Navigation | Glass-panel, hide on scroll down, reveal on scroll up | Hybrid of Stitch approaches |
| Animation stack | Framer Motion + GSAP + Lenis | Awwwards standard: GSAP for scroll timelines, Motion for React integration |
| Motion package | Keep `framer-motion` (v12) | Already installed, same codebase as `motion`. Import from `framer-motion` throughout |
| Typography note | Outfit replaces Inter from Stitch designs | Brand continuity with current site; Inter and Outfit are visually similar |
| Surface tokens | Use Stitch hierarchy naming with Nexio midnight-blue palette | Not Stitch's charcoal grays — mapped to midnight-based blues |
| Founding year | 2024 | Fix structured data `foundingDate` from "2026" to "2024" to match |
| Border radius | 0px everywhere (exception: CTA circle button on Services page) | Stitch design system: sharp, rebellious. Circle CTA is an intentional editorial contrast |
| Rebuild approach | Full rebuild on feature branch | Design shift too fundamental for incremental migration |

---

## 2. Architecture

### 2.1 File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, providers, grain overlay
│   ├── page.tsx                # Home page
│   ├── template.tsx            # Page transition wrapper (enter-only animations)
│   ├── not-found.tsx           # Custom 404 page (editorial style)
│   ├── error.tsx               # Runtime error boundary
│   ├── loading.tsx             # Global loading state (subtle fade skeleton)
│   ├── globals.css             # Design tokens, grain animation, kinetic utilities
│   ├── robots.ts               # Carry forward
│   ├── sitemap.ts              # Updated with new routes
│   ├── services/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── actions/
│       └── contact.ts          # Carry forward server action
├── components/
│   ├── providers/
│   │   ├── SmoothScrollProvider.tsx  # Lenis context
│   │   └── PageTransition.tsx        # Framer AnimatePresence wrapper
│   ├── layout/
│   │   ├── Navbar.tsx           # Glass-panel nav, hide/reveal on scroll
│   │   ├── Footer.tsx           # Editorial footer with giant "NEXIO" watermark
│   │   ├── GrainOverlay.tsx     # SVG feTurbulence film grain
│   │   ├── CustomCursor.tsx     # Enhanced existing cursor (add magnetic pull + states)
│   │   ├── FloatingWhatsApp.tsx # Carry forward, restyle
│   │   └── ScrollProgress.tsx   # Carry forward, restyle
│   ├── ui/
│   │   ├── GlassPanel.tsx       # Reusable glassmorphism container
│   │   ├── KineticText.tsx      # Custom text splitter + GSAP animation (no SplitText plugin)
│   │   ├── FloatingMetadata.tsx # Tiny Space Grotesk annotations
│   │   ├── MagneticButton.tsx   # Magnetic pull toward cursor
│   │   ├── TextScramble.tsx     # Hover scramble effect (React Bits)
│   │   ├── TextMarquee.tsx      # react-fast-marquee wrapper
│   │   ├── ImageReveal.tsx      # GSAP clip-path scroll reveal
│   │   ├── SplitText.tsx        # Custom: splits text into <span> elements, animates with gsap.from()
│   │   ├── BlueprintGrid.tsx    # Subtle grid background overlay
│   │   ├── AmbientBlob.tsx      # Blurred floating gradient orbs
│   │   ├── Button.tsx           # Gradient CTA + ghost variant
│   │   └── SectionHeader.tsx    # Editorial section headers with metadata
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── CapabilitiesSection.tsx
│   │   └── CTASection.tsx
│   ├── services/
│   │   ├── ServicesHero.tsx
│   │   ├── ServiceGrid.tsx
│   │   ├── ProcessSection.tsx
│   │   └── ServicesCTA.tsx
│   ├── about/
│   │   ├── AboutHero.tsx
│   │   ├── NarrativeSection.tsx
│   │   ├── PhilosophyScroller.tsx
│   │   └── TeamGallery.tsx
│   └── contact/
│       ├── ContactHero.tsx
│       └── ContactForm.tsx
├── hooks/
│   ├── useSmoothScroll.ts       # Carry forward Lenis
│   ├── useMousePosition.ts      # Carry forward, enhanced
│   ├── useInView.ts             # Carry forward
│   ├── useMagneticEffect.ts     # Magnetic pull calculation
│   ├── useScrollVelocity.ts     # Scroll speed detection
│   └── useTextScramble.ts       # Text scramble logic
└── lib/
    ├── constants.ts             # Carry forward
    ├── utils.ts                 # Carry forward
    ├── gsap.ts                  # GSAP + ScrollTrigger registration (no paid plugins)
    └── animations.ts            # Shared animation configs/presets
```

### 2.2 Design Token System (Tailwind Config)

```js
// tailwind.config.ts
{
  theme: {
    extend: {
      colors: {
        // Surface layers (midnight-based editorial hierarchy)
        surface:             '#080D1A',  // deepest base
        'surface-dim':       '#0B1120',  // main background (current midnight)
        'surface-low':       '#0F1629',  // slightly elevated
        'surface-container': '#141C35',  // card backgrounds
        'surface-high':      '#1A2340',  // elevated interactive
        'surface-bright':    '#212B4A',  // highest elevation

        // Accents (contextual co-equal mapping)
        primary:          '#F97316',  // orange: CTAs, active, warm energy
        'primary-dim':    '#EA580C',  // darker orange for gradients
        'primary-glow':   'rgba(249,115,22,0.15)',
        secondary:        '#2563EB',  // blue: metadata, tech, cool accent
        'secondary-dim':  '#1D4ED8',  // darker blue
        'secondary-glow': 'rgba(37,99,235,0.15)',

        // Text
        'on-surface':         '#E2E8F0',  // primary text (NOT pure white)
        'on-surface-variant':  '#94A3B8',  // secondary text
        outline:              '#64748B',  // tertiary/disabled
        'outline-variant':    '#334155',  // ghost borders ~15%
      },
      fontFamily: {
        headline: ['Newsreader', 'serif'],
        body:     ['Outfit', 'sans-serif'],
        label:    ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        lg: '0px',
        xl: '0px',
        full: '9999px',  // only cursor/status dots + Services CTA circle
      },
    },
  },
}
```

**Font Setup (next/font/google):**
```ts
const newsreader = Newsreader({
  subsets: ['latin'],
  axes: ['opsz', 'wght'],  // variable font for weight animation 200-800
  display: 'swap',
  style: ['italic', 'normal'],
  variable: '--font-headline',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-label',
});
```

**Responsive Breakpoints:**
| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet — nav switches to hamburger below this |
| `lg` | 1024px | Desktop — multi-column layouts activate |
| `xl` | 1280px | Wide desktop — max-w-6xl/7xl containers |

### 2.3 Library Stack

| Library | Package | Purpose |
|---------|---------|---------|
| GSAP + ScrollTrigger | `gsap`, `@gsap/react` | Scroll-linked timelines, pinning, parallax |
| Framer Motion | `framer-motion` (already installed v12) | React animations, page transitions, gestures. Import from `framer-motion` |
| Lenis | `lenis` (already installed) | Smooth scrolling, integrated with GSAP ticker |
| React Bits | copy-paste | TextScramble, Magnetic, BlurText, GlassCard. Source: reactbits.dev |
| Aceternity UI | copy-paste | Hero spotlight, mask reveals. Source: ui.aceternity.com |
| react-fast-marquee | `react-fast-marquee` | Infinite text/logo marquee |

**Removed from stack (per review):**
- **Cursify:** Existing `CustomCursor.tsx` will be enhanced instead (3 states don't justify a full library)
- **Tempus:** Pre-release (1.0.0-dev.17), too risky. Instead, Lenis syncs via `gsap.ticker.add((time) => lenis.raf(time * 1000))` — the established pattern
- **GSAP SplitText plugin:** Paid/Club plugin. We build a custom `SplitText.tsx` that wraps text in `<span>` elements and animates with `gsap.from()` — same result, no license needed

**Copy-paste component sources:**
| Component | Source | URL |
|-----------|--------|-----|
| TextScramble | React Bits | `reactbits.dev/text-animations/scramble-text` |
| Magnetic effect | React Bits | `reactbits.dev/animations/magnet` |
| BlurText | React Bits | `reactbits.dev/text-animations/blur-text` |
| GlassCard | React Bits | `reactbits.dev/components/glass-card` |
| Noise/Grain | React Bits | `reactbits.dev/backgrounds/noise` |
| Spotlight | Aceternity UI | `ui.aceternity.com/components/spotlight` |

---

## 3. Page Designs

### 3.1 Home Page (`/`)

#### Hero Section
- Full viewport (`100dvh`) with asymmetric layout
- **Headline:** "Curating / The Future / of Code." — three staggered lines
  - Line 1: `on-surface` color, left-aligned
  - Line 2: indented `ml-[12vw]`, 40% opacity (ghost text)
  - Line 3: `primary` (orange)
  - Size: `clamp(3rem, 13vw, 12rem)` with `line-height: 0.85`, `letter-spacing: -0.06em`
  - Newsreader italic, variable weight hover (200→800 via `font-variation-settings`)
  - GSAP SplitText character-by-character reveal on load
- **Right side:** Abstract grayscale image at 60% opacity, `mix-blend-screen`, with ambient blobs behind
- **Floating metadata:** Top-right — "LOC / 33.8938° N, 35.5018° E", "PROTO / H_KINETIC_V1"
- **Manifesto text:** "We bridge the chasm between raw technical power and high-end craftsmanship. No templates. No shortcuts. Just intent." — "01_MANIFESTO" floating label
- **Bottom-right:** "Explore" link with expanding line animation + scroll indicator
- **Ambient blobs:** Two large blurred orbs (orange/blue), slow CSS float animation, `-z-10`
- **GSAP:** Parallax on image and blobs as user scrolls past

#### Capabilities Bento Grid
- **Header:** "Capabilities" in massive Newsreader italic + right description behind left border
- **Grid:** 3-column bento of 6 real services
  1. Website Development (square, hover fills orange)
  2. E-Commerce Solutions (square, hover fills blue)
  3. Mobile Applications (square, hover fills white, text inverts)
  4. Desktop Applications (glass panel)
  5. AI Chatbots (glass panel)
  6. Automations (wide span bottom)
- **Each card:** Glass panel, floating metadata index, Newsreader italic title, description reveals on hover, expanding line at bottom
- **GSAP:** Staggered cascade with 100ms offsets, ScrollTrigger pins briefly while cards animate in
- **Chromatic aberration:** Subtle RGB split (±1-2px) on card images on hover

#### Text Marquee Band
- Infinite horizontal scroll: "DESIGN — ENGINEERING — CRAFT — STRATEGY — INNOVATION —"
- Outlined text (stroke, no fill) at `clamp(3rem, 8vw, 8rem)`
- Hover darkens non-hovered items with `rgba(0,0,0,0.4)` overlay (Astraeus pattern)
- `react-fast-marquee` with `pauseOnHover`

#### Editorial CTA
- **Headline:** "Let's build the Unseen." — "Unseen." in outline/stroke at 30% opacity
- **Status label:** "Status: Available for Q3 2026 Projects" in blue
- **Email:** "hello@nexiolabs.co" at ~7xl Newsreader, hover turns orange, click copies with scramble feedback
- Blueprint grid background with radial mask

### 3.2 Services Page (`/services`)

#### Services Hero
- Full viewport, `mix-blend-difference` headline (more predictable on dark backgrounds than exclusion)
- **Headline:** "OUR / CRAFT" at `clamp(4rem, 18vw, 16rem)`, Newsreader italic, `line-height: 0.75`, `letter-spacing: -0.06em`
- Label: orange line + "Capabilities 2026" in Space Grotesk
- Right-side floating 3D shape (grayscale, 10s float animation), hidden on mobile
- Right-aligned subtitle paragraph with scroll prompt
- Blueprint grid overlay: orange-tinted grid lines, radial fade mask

#### Scroll Velocity Marquee
- Between hero and grid: "DESIGN — ENGINEERING — CRAFT — STRATEGY —"
- Speed scales with scroll velocity via GSAP

#### Fluid Service Grid
- 12-column CSS Grid, asymmetric layout:
  - **Website Development** — 7 cols, 2 rows. "Web / Archi-/ tecture" breaking headline. Description + tech chips. Background image at 20%→40% on hover. Tactile 3D card (`perspective(1000px) rotateX(2deg)`, straightens on hover)
  - **E-Commerce** — 5 cols, 1 row. "Digital / Boutique". Product image scales 1.05 on hover
  - **AI Chatbots** — 5 cols, 1 row. "Neural / Systems". Orange tinted border, mix-blend-screen image
  - **Mobile Apps** — 6 cols, glass panel
  - **Desktop Apps** — 6 cols, glass panel
  - **Automations** — 12 cols, wide cinematic card
- Each card: floating metadata ("001 // CORE"), tech chips with ghost borders, GSAP staggered cascade
- Mobile: full-width single column stack

#### Process — "LOGIC MEETS LUXURY" (Sticky Scroll)
- **Background inverts to WHITE, black text** — dramatic contrast break
- Blueprint grid at 10% opacity
- **Two-column sticky scroll:**
  - Left (pinned): "LOGIC / MEETS / LUXURY." at 12vw Newsreader italic, line 2 indented `pl-24`
  - Right (scrolls): 5 process steps (Connect, Plan, Build, Launch, Grow), each with border-top separator, "Process 01-05" labels, headlines, descriptions
- GSAP ScrollTrigger: left pins while right scrolls, each step fades/slides in
- Mobile: no sticky, headline above, steps stack vertically with left border accent
- **Navbar context:** glass panel shifts to darker tint during white section

#### Services CTA
- "INITIATE / PROJECT." — "PROJECT." in orange
- 256px circular button: ghost border, inner orange dot scales 5x and fades on hover, "Contact" label overlay, outer blueprint circle pulsing at 1.3x
- Two diagonal decorative lines at ±12deg, orange 20% opacity
- GSAP: section scales up on scroll entry

### 3.3 About Page (`/about`)

#### About Hero — "THE COLLECTIVE"
- Faded abstract background image, `mix-blend-overlay`, grayscale 40%
- **Label:** "Est. 2024 — Beirut, Lebanon" in blue Space Grotesk
- **Headline:** "THE / COLLECTIVE" at 10-12vw, Newsreader bold italic. SplitText reveal
- Two-column below: description left, "Discover our essence" link right with circular icon button

#### Narrative — Editorial Origin Story
- Background: `surface-low` tonal shift (no borders)
- Asymmetric 12-col: 7 cols text, 5 cols image
- **Left:** "Nexio Labs was born out of a **rebellion** against the templated web." — "rebellion" in orange. Two-column body text below
- **Right:** 3:4 portrait image, heavy shadow, grayscale → color on hover. Overlapping orange stat block: "10+" / "Projects Delivered"
- GSAP: image clip-path wipe reveal, stat block slides up

#### Philosophy Horizontal Scroller
- GSAP ScrollTrigger horizontal scroll (vertical scrolling drives horizontal translation)
- 3 value cards (80vw mobile / 40vw desktop):
  1. "Intentional Craft" — left border orange, giant outlined "01"
  2. "Technical Precision" — left border blue, outlined "02"
  3. "Future-Proof Engineering" — left border orange, outlined "03"
- Outlined numbers fill with color on hover

#### Team Gallery — Asymmetric Staggered Grid
- Header: faded "THE FACULTY" at 8vw background + "Collaborators" foreground headline
- 12-col grid, staggered:

  **Asif Alam:**
  - Cols 1-5, "UNIT 01 // CO-FOUNDER & LEAD ENGINEER" metadata
  - Glass panel, 4:5 portrait (cinematic grayscale → color hover)
  - "ASIF" at 8vw behind card, 10% → orange 20% on hover
  - Blueprint annotation + "SPEC 1.0 // ARCH_LEAD"
  - Name + "Co-Founder & Lead Engineer" (orange)

  **Joseph Attieh:**
  - Cols 8-12, shifted up with negative margin
  - "JOSEPH" vertical text at 10vw, diagonal line overlay
  - 3:4 ratio, right-aligned info
  - "Co-Founder & Business Development" (blue)

  **Karl Abou Jaoude:**
  - Cols 4-9, centered, shifted up
  - Horizontal glass panel (image left, text right)
  - "LOGIC" at 15vw behind
  - "E-Commerce Expert"

- Footer metadata: "TOTAL_NODES: 03" + pulsing dots + "SYNC_STATUS: OPERATIONAL"
- Mobile: full-width stacked cards, remove giant background text

#### About CTA
- Subtle orange gradient from bottom
- "Ready to build the impossible?" — "impossible?" in stroke text
- Dual CTA: orange magnetic "Inquire Now" + ghost link "View our services"

### 3.4 Contact Page (`/contact`)

#### Contact Hero
- Centered, generous `py-40`
- "Get In Touch" blue label
- "Let's Start / Something." at 8-10vw, "Something." in orange. SplitText reveal
- "Currently accepting projects for Q3 2026" subtitle
- Ambient blobs behind text

#### Contact Split Layout
- 12-col: 5 cols info, 7 cols form

**Left (info):**
- **Email:** "Direct Line" label. "hello@nexiolabs.co" in Newsreader 3xl, hover orange, click copies with scramble feedback
- **WhatsApp:** "Signal Channel" label. Number with green dot. Magnetic button
- **Socials:** "Protocols" label. Instagram + LinkedIn with text scramble hover
- **Location:** "Coordinates" label. "Beirut, Lebanon" + "33.8938° N, 35.5018° E" metadata
- Blocks separated by tonal shifts, no borders

**Right (form):**
- Glass panel (p-12), "TRANSMISSION_PROTOCOL // V.2026" metadata
- **Underline-only fields** (no boxes):
  - Name, Email, Message — underline at 30% outline, focus → blue with glow
  - Labels: Space Grotesk uppercase, float above on focus
- **Submit:** Full-width orange gradient, all-caps, hover scale 1.02, text scrambles on click → "Sending..."
- **Success:** Form fades, "Message Received." in Newsreader italic + pulsing dots
- **Error:** Red underline + error text
- **Honeypot + server action:** Carry forward existing

#### Mini CTA
- "Prefer a conversation?" + WhatsApp magnetic button
- Blueprint grid background

---

## 4. Shared Components

### 4.1 Navbar
- Glass panel: `backdrop-filter: blur(20px)`, surface 60% opacity, ghost border
- Fixed `top-8`, centered `max-w-6xl`, `w-[calc(100%-4rem)]`
- Hides on scroll down (`translateY(-120%)`), reveals on scroll up, 600ms cubic-bezier
- Left: "NEXIO LABS" Newsreader italic bold
- Center: page links — Space Grotesk uppercase 10px, active = orange dot + orange text
- Right: "Start Project" magnetic button, orange gradient
- **Context-aware detection:** Sections with white backgrounds get `data-navbar-theme="light"` attribute. Navbar uses GSAP ScrollTrigger `onEnter`/`onLeave` callbacks watching these sections to toggle a `.navbar-light` CSS class, shifting the glass tint to a darker `surface-container` background
- **Desktop (≥ md/768px):** Full nav with links + CTA button. Height: `h-16`, `px-8`
- **Mobile (< md/768px):** Logo left + hamburger right. Height: `h-14`, `px-6`. Hamburger is 3-line → X animation (middle `opacity:0`, top/bottom `rotate(47deg/-47deg)`, 800ms ease). Opens full-screen overlay: `fixed inset-0 bg-surface z-[200]` with large staggered links (Newsreader `clamp(2rem, 8vw, 5rem)`, 100ms stagger delay per link, fade+slide from bottom)

### 4.2 Footer
- `surface` (deepest) at 80% + backdrop-blur, top ghost border
- "NEXIO" watermark at 12rem, 5% opacity, non-selectable, subtle parallax
- "CURATED_DIGITAL_EXPERIENCES" + "EST_2024_V_FINAL" metadata overlay
- 3-column links: Social (Instagram, LinkedIn), Contact (Email, WhatsApp), Legal (Privacy, Terms)
- Bottom: copyright 9px + status indicator (pulsing orange+blue dots + "Global Network Status: Operational")

### 4.3 Page Transitions
- **Approach:** Enter-only animations in `template.tsx` (exit animations do NOT work in Next.js App Router because `template.tsx` re-mounts on each navigation — the old page is unmounted before the new template mounts, so `AnimatePresence` exit never fires)
- **Implementation:** `template.tsx` wraps children in a Framer Motion `motion.div` with `initial={{ opacity: 0, y: 20 }}` and `animate={{ opacity: 1, y: 0 }}` over 500ms with `ease: [0.16, 1, 0.3, 1]`
- **No exit animation needed** — Lenis smooth scroll + the enter animation creates a clean enough transition
- **Future enhancement:** When Next.js `ViewTransition` API stabilizes, migrate to CSS `@view-transition` for true cross-fade

### 4.6 404 Page (`not-found.tsx`)
- Giant "404" in Newsreader italic at 20vw, outline/stroke text
- Below: "This page doesn't exist yet." in body text
- "Return Home" magnetic button
- Film grain + ambient blobs active
- Metadata: `noindex`

### 4.7 Error Page (`error.tsx`)
- "Something went wrong." in Newsreader italic
- "Try Again" button that calls `reset()` + "Go Home" link
- `"use client"` directive (required by Next.js)
- Minimal styling, editorial feel

### 4.8 Loading State (`loading.tsx`)
- Subtle full-page fade: `surface-dim` background with a centered pulsing Nexio logo (or just the "NL." mark)
- Matches the editorial brand, doesn't flash white

### 4.4 Film Grain
- SVG `<feTurbulence>` filter, `position: fixed`, `inset: 0`, `z-index: 9999`, `pointer-events: none`, `aria-hidden: true`
- 4% opacity on dark, 2% on white sections
- `prefers-reduced-motion`: static grain, no animation

### 4.5 Custom Cursor (Enhanced existing)
- Enhance existing `CustomCursor.tsx` (already built with Framer Motion springs) rather than adding Cursify library
- Default: 40px circle outline, orange border 40%, `mix-blend-difference`
- Hover (links/buttons): scale 1.5x, full orange border, magnetic pull (add `useMagneticEffect` hook)
- Click: scale 0.8x, orange fill 10%
- Mobile: hidden entirely (check `window.matchMedia('(pointer: fine)')`)
- **Chromatic aberration on images:** CSS approach — three overlapping absolutely-positioned pseudo-elements with `mix-blend-screen` and ±1px `translateX`, activated on `.group:hover`

---

## 5. Design Signature Elements (Full List)

1. **Film grain overlay** — SVG feTurbulence, animated, 4% opacity
2. **Floating metadata** — Space Grotesk 8px, 30% opacity, technical annotations
3. **Custom cursor** — enhanced existing, magnetic, mix-blend-difference
4. **Glass panels** — backdrop-blur + ghost borders
5. **0px border radius** — sharp edges everywhere
6. **Variable font hover** — Newsreader weight 200→800
7. **Blueprint grids** — subtle grid lines, radial mask fade
8. **Ambient blobs** — blurred color orbs, slow float animation
9. **Page transitions** — Framer Motion enter-only in template.tsx
10. **Magnetic buttons** — pull toward cursor on proximity
11. **Text split animations** — custom SplitText component + GSAP (no paid plugin)
12. **Horizontal marquees** — react-fast-marquee, pause on hover, velocity-reactive
13. **Image clip-path reveals** — GSAP scroll-driven wipe animations
14. **Scroll velocity effects** — marquee speed reacts to scroll speed
15. **Text scramble** — React Bits ScrambleText on hover/click
16. **Pinned scroll sections** — GSAP ScrollTrigger pin for process section
17. **Parallax depth layers** — multi-speed layer movement
18. **Staggered cascades** — grid items ripple in with delay offsets
19. **Chromatic aberration** — ±1-2px RGB split on image hover
20. **Context-aware navbar** — detects white sections, adjusts tint
21. **Copy-to-clipboard email** — scramble-then-resolve feedback
22. **`text-wrap: balance`** — on all headlines
23. **Scroll-driven horizontal scroll** — philosophy section on About page

---

## 6. SEO & Performance

### SEO (carry forward + enhance)
- All existing JSON-LD preserved: Organization, ITCompany, WebSite, Services, Person, FAQPage
- Sitemap updated: add `/services`, `/about`, `/contact`
- llms.txt updated with new page URLs
- New: BreadcrumbList schema for multi-page navigation
- `text-wrap: balance` on headlines
- Fix `foundingDate` in structured data from "2026" to "2024"

**Per-page metadata:**
| Page | Title | Description |
|------|-------|-------------|
| Home | "Nexio Labs — Curating the Future of Code" | "We bridge raw technical power and high-end craftsmanship. Website development, mobile apps, AI chatbots, and automations for ambitious brands." |
| Services | "Our Craft \| Nexio Labs" | "Web architecture, e-commerce, mobile apps, AI systems, and automations. Engineering precision meets editorial design." |
| About | "The Collective \| Nexio Labs" | "Meet the curators, engineers, and dreamers behind Nexio Labs. Born in Beirut, building for the world." |
| Contact | "Get In Touch \| Nexio Labs" | "Start a project with Nexio Labs. Currently accepting projects for Q3 2026." |

**BreadcrumbList per page:**
- Services: Home > Our Craft
- About: Home > The Collective
- Contact: Home > Get In Touch

### Performance
- Dynamic imports: animation components client-side only (`"use client"`)
- Lenis + GSAP sync: `gsap.ticker.add((time) => lenis.raf(time * 1000))` — single rAF loop, no Tempus needed
- GSAP cleanup: `useGSAP()` hook for proper unmount
- Next.js Image: AVIF/WebP, priority for above-fold
- Fonts: `next/font/google` with `display: swap` + CSS variables
- `100dvh` for mobile heroes
- Scrollbar hidden: `scrollbar-width: none` (Lenis handles scroll)

### Accessibility
- All ARIA labels carried forward
- Grain overlay: `aria-hidden="true"`, `pointer-events: none`
- Custom cursor: decorative, native cursor still functional
- Focus styles: visible blue outline on all interactive elements
- Keyboard nav: full tab navigation
- `prefers-reduced-motion`: all animations gracefully degrade — content shows instantly
- Color contrast: `on-surface` (#E2E8F0) on `surface-dim` (#0B1120) = 13.5:1 ratio (WCAG AAA)

---

## 7. Data Carried Forward

All real company data preserved from current site:
- **Team:** Asif Alam (Co-Founder & Lead Engineer), Joseph Attieh (Co-Founder & Business Development), Karl Abou Jaoude (E-Commerce Expert)
- **Services:** Website Development, E-Commerce, Mobile Apps, Desktop Apps, AI Chatbots, Automations
- **Process:** Connect → Plan → Build → Launch → Grow
- **Contact:** hello@nexiolabs.co, WhatsApp +961 76 423 052
- **Social:** Instagram (@nexio.labs), LinkedIn (/company/nexio-labs)
- **Stats:** 10+ Projects, 5+ Industries, 90% Retention
- **Server action:** `submitContactForm` with Resend + honeypot (note: rate limiting packages installed but not yet implemented in the action — deferred to post-launch)
- **Security headers:** All existing HSTS, X-Frame-Options, X-Content-Type-Options carried forward

---

## 8. Lenis Configuration

Fix the existing `useSmoothScroll.ts` which sets both `lerp` and `duration` (mutually exclusive in Lenis):
```ts
// Use lerp only (ease-based smoothing)
const lenis = new Lenis({
  lerp: 0.1,
  // duration removed — lerp and duration are mutually exclusive
  smoothWheel: true,
  syncTouch: false,
});
```

---

## 9. Asset Inventory

| Asset | Status | Path / Source |
|-------|--------|---------------|
| Team: Asif portrait | Exists | `public/images/team/asif.jpeg` |
| Team: Joseph portrait | Exists | `public/images/team/joseph.jpeg` |
| Team: Karl portrait | Exists | `public/images/team/karl.jpeg` |
| Hero abstract image | Needed | Source or generate a grayscale abstract 3D render |
| Services hero 3D shape | Needed | Source or generate a floating abstract shape |
| About narrative image | Needed | Source a studio/workspace/process image |
| Service card backgrounds | Optional | Can use gradient/glass effects instead of images |
| Film grain | Generated | SVG `<feTurbulence>` — no image asset needed |
| OG images per page | Needed | Generate 1200x630 OG images per page |

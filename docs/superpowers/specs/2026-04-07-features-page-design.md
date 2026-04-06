# Features Page — Docs-Style Outline + Content

**Status:** Approved design, ready for planning
**Date:** 2026-04-07
**Replaces:** existing `src/pages/Features.tsx` (card-grid layout)

## Goal

Replace the current `/features` page with a docs-style two-column layout: a sticky table-of-contents outline on the left, and detailed feature descriptions on the right. Communicate the full breadth of what Memry does today, while making it explicit that the app is in active pre-release development and the list grows weekly.

## Source of Truth

All feature copy comes from `/Users/h4yfans/sideproject/memry/FEATURES.md` in the sibling `memry` repo.

- 9 sections: Tasks, Projects, Inbox, Notes, Journal, Reminders, Search, Navigation and UI, AI
- ~91 features total (counts per section: Tasks 18, Projects 5, Inbox 13, Notes 24, Journal 9, Reminders 5, Search 5, Navigation & UI 9, AI 3)
- Each feature has a short title and a 1–3 sentence description

The website does not consume the markdown file at runtime. The content is ported into a typed TypeScript data file inside the website repo (see "Data shape").

## Page Architecture

```
HEADER (existing)
─────────────────
HERO BLOCK
─────────────────
TWO-COLUMN BODY
  ┌──────────┬─────────────────┐
  │ outline  │ content         │
  │ (sticky) │ (sections +     │
  │          │  features)      │
  └──────────┴─────────────────┘
─────────────────
BOTTOM CTA (waitlist)
─────────────────
FOOTER (existing)
```

## Hero Block

Communicates "this is what Memry has so far — and it's growing."

| Element | Content |
|---|---|
| Eyebrow | `EVERYTHING IN MEMRY · UPDATED ${FEATURES_LAST_UPDATED}` (mono, uppercase, muted). Date string interpolated from constant. |
| Pre-release pill | Small terracotta pill: "Pre-release" — sits above the title |
| Title | `Every feature, so far.` (Instrument Serif, ~64px desktop, ~40px mobile) |
| Subtitle | `${TOTAL_COUNT} features across ${SECTION_COUNT} sections — and growing. Memry is in active development; this page reflects what's shipped today, not the full vision.` (serif, muted). Counts computed from `FEATURE_SECTIONS` at render time. |
| Stats row | `${TOTAL_COUNT} features  ·  ${SECTION_COUNT} sections  ·  growing every week` (mono, small, divider dots). Counts computed; the cadence string lives in a `FEATURES_CADENCE` constant alongside `FEATURES_LAST_UPDATED` so it can be edited in one place if cadence claims change. |

The "updated" date is hardcoded as a constant in the page component. It is updated manually when features are added — no build-time git lookup. This is acceptable because edits to the data file and the date will happen in the same commit.

## Two-Column Body Layout

**Container:** existing `<Container size="lg">` (max-w-7xl).

**Desktop (`md` and up):**

- Outline column: `220px` fixed width
- Gap: `gap-16` (~64px between columns)
- Content column: `flex-1`, inner `max-w-[680px]` for readable measure
- Outline is sticky: `top: 96px`, `max-height: calc(100vh - 96px)`, `overflow-y: auto`

**Mobile (below `md`):**

- Single column, no outline alongside content
- Sticky pill replaces the outline column (see "Mobile outline" below)
- Content `max-w-none`, padding `px-5`

## Outline (Left Sidebar) — Desktop

Two-level table of contents. Sections always visible; the active section auto-expands to show its features.

**Visual:**

```
ON THIS PAGE                    ← uppercase mono label, muted

Tasks                  18 ●     ← active section: filled terracotta dot, bold
│ Task creation                 ← border-l guide rail on expanded list
│ Subtasks ●                    ← active sub-feature: dot + terracotta text
│ Priority levels
│ Due date and time
│ Start date
│ Repeating tasks
│ …13 more

Projects                  5     ← inactive: section name + count, muted
Inbox                    13
Notes                    24
Journal                   9
Reminders                 5
Search                    5
Navigation & UI           9
AI                        3
```

**Typography:**

| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| "On this page" label | mono | 11px uppercase | 500 | muted |
| Section name | serif | 15px | 500 | ink (active) / muted (inactive) |
| Sub-feature | sans | 13px | 400 | terracotta (active) / ink-70 (inactive) |
| Counts | mono | 11px | 400 | muted |

**Behavior:**

- **Scrollspy** via `IntersectionObserver` watches each section heading and each feature item
- The active section determines which sub-list is expanded
- The active sub-feature gets the dot + terracotta text
- **Click any item** → smooth scroll, URL hash updates (`#section-id` or `#section-id-feature-slug`)
- **After a click**, scrollspy is suppressed for 600ms so the click target stays highlighted while the smooth-scroll animation runs
- **Above all sections** → first section (Tasks) is treated active
- **Past the last section** → last section stays active
- **No card border, no background** — outline blends into paper. Only line is the `border-l` guide rail on the expanded sub-list.

## Outline — Mobile (sticky pill + dropdown)

Replaces the desktop outline below the `md` breakpoint.

**Sticky pill:**

- Sits at `top: 72px` (below the existing fixed header)
- Pill: `bg-card`, `border border-border`, `rounded-full`, `px-4 py-2.5`, `shadow-card` (only when scrolled past hero)
- Content: `▾  Tasks · 1 of 9` — chevron + current section name + position counter
- Section name and counter update via the same scrollspy that drives the desktop outline

**Tap interaction:**

- Tap pill → dropdown sheet opens
- Backdrop scrim: `bg-ink/40 backdrop-blur-sm`, fades in
- Dropdown contains the same two-level outline (active section auto-expanded)
- `max-h-[70vh]`, internal scroll
- Tap any item → close dropdown + smooth scroll

## Right Content Area

### Section header (one per section)

```
─────────────────────────────────────  ← thin top rule (border-border)

Tasks                                  ← font-serif, 40px, ink
─────                                  ← terracotta accent: 40px wide, 2px tall
18 features                            ← mono, 11px, uppercase, muted
```

- Top rule sits above every section header
- Larger top spacing between sections (`pt-24`) for clear separation
- No alternating background colors between sections — the paper stays consistent

### Feature item

```
────────────────────────────────────  ← hairline rule (border-border)

01    Task creation                   ← mono number (10px, terracotta)
                                          serif title (20px, ink)
      Capture tasks fast with a       ← sans body (15px, muted, leading-relaxed)
      quick-add input that parses        indented to align with title
      smart syntax, or open the         max-width: 60ch
      full form for everything at
      once.
```

**Specifics:**

- **Numbers reset per section** — Tasks runs `01–18`, Projects runs `01–05`, etc.
- **Hairline rules** between every feature item, no rule above the first feature in a section
- **Vertical padding** per item: `py-7` (generous editorial breathing room)
- **Anchor IDs:** `id="${section-slug}-${feature-slug}"` (e.g., `tasks-task-creation`) for deep linking

### Animations (Framer Motion)

- **Section headers:** subtle `opacity: 0 → 1, y: 12 → 0` when 80px before viewport
- **Feature items:** no individual animation. 91 staggered animations would be exhausting. Items just appear naturally on scroll.

## Bottom CTA Section

Sits below the AI section, above the footer.

```
(bg-paper-alt, py-24, Container size="sm", centered)

           And there's more.            ← serif, 36px

  Memry ships new features every week.  ← serif italic, 18px, muted
  Get on the waitlist to follow along.

           [waitlist form]              ← <WaitlistForm variant="centered" />
```

Reuses existing `<WaitlistForm variant="centered" />`. No secondary GitHub link — keeps the CTA single-purpose.

## Data Shape

The 91 features are ported from `FEATURES.md` into a typed TypeScript module — `src/lib/features-data.ts`:

```ts
export interface FeatureItem {
  slug: string         // e.g. "task-creation"
  title: string        // e.g. "Task creation"
  description: string  // 1–3 sentences
}

export interface FeatureSection {
  slug: string         // e.g. "tasks"
  title: string        // e.g. "Tasks"
  features: FeatureItem[]
}

export const FEATURE_SECTIONS: FeatureSection[] = [/* 9 sections */]
```

Slugs are kebab-case derived from titles. Counts are computed from `features.length` at render time — never hardcoded.

Two small constants sit alongside the data:

- `FEATURES_LAST_UPDATED: string` — e.g. `"April 2026"`. Rendered in the hero eyebrow.
- `FEATURES_CADENCE: string` — e.g. `"growing every week"`. Rendered in the hero stats row.

Both are edited by hand when copy needs to change. They live with the data so a single PR can ship a content update + a copy refresh together.

## Component Breakdown

To keep files <500 LOC and follow the existing pattern in `src/components/sections/`:

| File | Responsibility |
|---|---|
| `src/pages/Features.tsx` | Page shell — renders hero, two-column body, bottom CTA |
| `src/lib/features-data.ts` | Typed data + last-updated constant |
| `src/components/features-page/FeaturesHero.tsx` | Hero block (eyebrow, pill, title, subtitle, stats row) |
| `src/components/features-page/FeaturesOutline.tsx` | Desktop sticky outline (uses scrollspy hook) |
| `src/components/features-page/FeaturesOutlineMobile.tsx` | Mobile pill + dropdown sheet |
| `src/components/features-page/FeatureSection.tsx` | Section header + list of feature items |
| `src/components/features-page/FeatureItem.tsx` | Single numbered + ruled feature row |
| `src/components/features-page/FeaturesCTA.tsx` | Bottom CTA block |
| `src/hooks/useScrollspy.ts` | Reusable IntersectionObserver-based scrollspy hook |

The `FeaturesPage` itself stays small (<150 lines) and just composes these blocks.

## Scrollspy Hook Contract

```ts
function useScrollspy(
  ids: string[],          // ordered list of element ids to observe
  options?: { rootMargin?: string }
): string | null          // currently-active id (or null if before all)
```

- Uses `IntersectionObserver` with a `rootMargin` of `-96px 0px -55% 0px` so the active item is the one near the top of the viewport
- Returns the *last* observed-active id when scrolling past everything (so the bottom of the page keeps the last section highlighted)
- Exposes a `suppressFor(ms)` mechanism so click handlers can pause scrollspy while smooth-scroll runs

## Routing & SEO

- Route stays at `/features` (existing)
- `<PageHead page="features" />` reused — copy may need an update in `src/lib/seo.ts` to match the new "every feature so far" framing
- Anchor links: `#${section-slug}` and `#${section-slug}-${feature-slug}` work for deep linking
- The existing `ScrollToHash` in `App.tsx` already handles smooth-scroll to hash on route enter

## Accessibility

- Outline is a `<nav aria-label="Features outline">`
- Sub-list is a true `<ul>` so screen readers announce "list of N items"
- Section headers are `<h2>`, feature titles are `<h3>` — single h1 in the hero
- Active outline item gets `aria-current="location"`
- Mobile dropdown traps focus while open, returns focus to the pill on close
- Smooth scroll respects `prefers-reduced-motion` — falls back to instant jump
- Section reveal animations respect `prefers-reduced-motion`

## Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `< 768px` (default) | Single column, sticky pill + dropdown |
| `>= 768px` (md) | Two-column, 220px outline + flex content |

No custom breakpoints introduced. Tailwind defaults only.

## What This Replaces

The current `src/pages/Features.tsx` is deleted entirely. Its `PILLARS` and `SUPPORTING` constants are not preserved — `features-data.ts` becomes the new source. The existing page exports `FeaturesPage`, so the route in `App.tsx` does not change.

## Out of Scope (Explicit)

- Search/filter inside the outline. The 91-item list is small enough to scan; search adds complexity for marginal benefit.
- Per-feature screenshots, GIFs, or media. Pure text is the editorial choice.
- Dark mode for this page. Memry's marketing site has dark *zones* (Pricing, Comparison) but the features page stays in the warm paper palette throughout.
- Build-time git lookup for "last updated". Manual constant.
- A separate "what's coming next" / roadmap section on this page. The existing `/` route already has a Roadmap section; we don't duplicate it.

## Open Questions

None — all design decisions resolved during brainstorming.

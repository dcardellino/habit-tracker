---
version: alpha
name: Ritual
description: A minimal monitoring-first habit tracker design system for technically-minded daily users.

colors:
  background: "#F8FAFC"
  surface: "#FFFFFF"
  border: "#E2E8F0"
  primary: "#0F172A"
  on-primary: "#FFFFFF"
  secondary: "#475569"
  muted: "#94A3B8"
  accent: "#6366F1"
  on-accent: "#FFFFFF"
  success: "#16A34A"
  on-success: "#FFFFFF"
  warning: "#D97706"
  error: "#DC2626"
  contribution-0: "#F1F5F9"
  contribution-1: "#BBF7D0"
  contribution-2: "#86EFAC"
  contribution-3: "#4ADE80"
  contribution-4: "#16A34A"

typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h1:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  h2:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  h3:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  body-small:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.01em"
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
  mono:
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5

rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "24px"
  full: "9999px"
  contribution: "2px"

spacing:
  0: "0px"
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
  20: "80px"

components:
  nav:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    padding: "0 24px"
    height: "56px"

  habit-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "16px"

  habit-card-checked:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "16px"

  check-button:
    backgroundColor: "{colors.contribution-0}"
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    size: "40px"

  check-button-checked:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-success}"
    rounded: "{rounded.full}"
    size: "40px"

  contribution-empty:
    backgroundColor: "{colors.contribution-0}"
    rounded: "{rounded.contribution}"
    size: "12px"

  contribution-filled:
    backgroundColor: "{colors.contribution-4}"
    rounded: "{rounded.contribution}"
    size: "12px"

  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"

  button-primary-hover:
    backgroundColor: "#4F46E5"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"

  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"

  button-ghost-hover:
    backgroundColor: "{colors.border}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"

  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
    height: "40px"

  input-focused:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
    height: "40px"

  stats-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.h1}"
    rounded: "{rounded.lg}"
    padding: "16px"

  streak-badge:
    backgroundColor: "transparent"
    textColor: "{colors.success}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 8px"

  streak-badge-danger:
    backgroundColor: "transparent"
    textColor: "{colors.error}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 8px"
---

# Ritual Design System

## Overview

Ritual is a habit monitoring dashboard for technically-minded users who treat their personal routines with the same discipline they apply to infrastructure. The product's core promise — "honest data, no drama" — defines every design choice. The visual language borrows from operational dashboards (Grafana, GitHub contribution graphs) rather than wellness apps: clean white surfaces, semantic colors with no decorative ambiguity, dense-but-readable information hierarchy. The target audience checks this each morning like they check monitoring alerts.

Two anti-patterns to guard against at every design decision: first, gamification creep (badges, confetti, streaks that celebrate rather than inform); second, typography that invites emotional engagement over clear data readout. Every component exists to convey information. The reference aesthetic is streak.kevinchromik.de — minimal, emoji-forward, iOS-native clean — applied to a web-first monitoring dashboard context.

## Colors

The palette is anchored in Tailwind's slate scale, which carries a slightly cool, technical character that suits a data-first product. `background` (#F8FAFC, slate-50) is barely-there — cards and surfaces lift cleanly against it on white (#FFFFFF). `primary` text (#0F172A, slate-950) is near-black without being harsh.

The single brand accent is indigo (#6366F1, indigo-500), used only for interactive elements: focused inputs, primary buttons, and active nav state. It is never decorative. No other non-semantic colors appear in the interface.

Semantic colors are strict and non-negotiable: `success` green (#16A34A) means "habit completed today." `error` red (#DC2626) means "missed or broken." `warning` amber (#D97706) is reserved for streak-danger states (habit last completed 2+ days ago). These are never repurposed for visual variety. All text-on-background combinations meet WCAG AA contrast (4.5:1 for body text, 3:1 for large text).

The contribution graph uses a five-step green scale from `contribution-0` (slate-100, #F1F5F9) to `contribution-4` (green-700, #16A34A), deliberately mirroring GitHub's contribution graph — a visual language technically-minded users recognize instantly without onboarding.

## Typography

Inter is the primary typeface — geometric, neutral, highly legible at small sizes, and the standard for technical product UIs (Linear, Vercel, Raycast). No display faces, no serif. The mono variant (JetBrains Mono) appears only for numbers in stat contexts where fixed-width improves scannability: streak counts, completion percentages, dates.

The type scale is compact and functional. `display` (36px/700) is used exclusively for large stat numbers on the stats page. `h1` (24px/700) for page titles. `h2` (20px/600) for section headers. `h3` (16px/600) for habit names and card titles. `body` (15px/400) for descriptive text. `label` (13px/500) for buttons, nav links, and metadata tags. `caption` (12px/400) for dates and secondary metadata. Display and h1 use tight tracking (−0.02em/−0.01em) for optical balance at larger sizes. No other letter-spacing adjustments.

## Layout

The spacing scale uses a strict 4px base grid. Dashboard density is "comfortable" — not as tight as a data table, not as airy as a marketing page. Card padding is 16px (spacing.4). Gap between habit cards is 8px (spacing.2). Page container max-width is 640px, single-column, centered on desktop; full-bleed on mobile.

There are no multi-column layouts in any Phase 0–2 view. The dashboard is one vertical column of habit cards regardless of viewport width — this prioritizes the primary use case: a phone-held morning check-in, one thumb, minimal eye movement. Responsive complexity is deferred entirely until there is evidence the user base needs it.

## Elevation & Depth

Cards use a single, minimal shadow: `0 1px 2px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)` — barely perceptible, just enough to lift the card off the background. No high-elevation surfaces in the main flow. Modals use a heavier shadow (`0 4px 24px rgba(0,0,0,0.08)`) with a backdrop overlay.

Most visual separation is done with borders (`{colors.border}`, #E2E8F0) rather than shadows. Border-based separation is more reliable across rendering environments and hardware, and keeps the UI clean at the flat end of the depth spectrum. The nav bar uses `border-bottom: 1px solid {colors.border}` — no shadow.

## Shapes

Border radius is moderate and consistent by component class:

- **Cards** (habit-card, stats-card): 12px (`rounded.lg`) — modern without playful.
- **Buttons and inputs**: 8px (`rounded.md`) — functional control, not decorative.
- **Contribution graph cells**: 2px (`rounded.contribution`) — nearly square, matching the GitHub contribution graph reference. This is intentional and must not be increased.
- **Badges and streak labels**: 9999px (`rounded.full`) — fully rounded pill, reads as metadata tag.
- **Modals**: 16px (`rounded.xl`) — distinct from cards to signal a layer change.

`rounded.2xl` is not used on any interactive surface in the current scope.

## Components

**Habit card**: White surface, 12px radius, 16px padding. Left: large emoji (24px, the habit's identity — no separate icon) beside habit name in h3 style. Right: streak count as `streak-badge` (green if active, red if broken or at risk), then the check button. Full-width touchable area on mobile.

**Check button**: Two states. Unchecked: `contribution-0` background (slate-100), no icon — a subtle implied circle. Checked: `success` green background with white checkmark icon. 40px circular, 150ms background-color transition, no spring/bounce animation. The simplicity is deliberate — the check is a binary boolean, it must never feel ambiguous.

**Contribution graph**: Cells are 12px × 12px, 2px radius, 2px gap. Seven columns (weekdays) × N rows (weeks back in time). `contribution-0` for empty days, `contribution-4` for completed days. In Phase 0–2 this is binary; multi-level intensity is deferred to a phase where habits may have numerical targets.

**Nav bar**: 56px height, white surface, 1px border-bottom. Brand name "Ritual" in h3 style left-aligned. Dashboard and Stats links centered. Sign-out button right (ghost variant). Mobile nav pattern is determined by design.md and TASK-010: bottom tab bar on ≤ 640px viewports, top nav on wider.

**Stats card**: White surface, 12px radius, 16px padding. Large `display`-scale number (streak count, percentage) in `primary` color using `mono` font for numbers. `caption`-style label below in `muted` color.

**Primary button**: Indigo (`{colors.accent}`), white text, 8px radius, 40px height, `label` typography. Used only for primary CTA (sign in, sign up, create habit). One per screen maximum.

**Ghost button**: Transparent background, `secondary` text, 8px radius. Used for secondary actions (cancel, sign out, edit). Not outlined.

**Input**: White surface, 1px `border` border, 8px radius, 40px height. On focus: 2px `accent`-colored ring (implemented as `ring-2 ring-accent` in Tailwind) — the only context where `accent` is used on a non-button element.

**shadcn/ui base color**: Use **slate** as the shadcn/ui base color when running `npx shadcn@latest init`. This aligns with the slate-based neutral palette.

## Do's and Don'ts

**Do:**
- Use `success` green for every completed state, consistently. Consistency makes the dashboard scannable without reading.
- Let the emoji carry the habit's identity. The emoji IS the icon — do not pair with a category label on the card.
- Use the contribution graph for every habit in the stats view. Users arrive for the "GitHub for habits" moment.
- Show numbers without units when context makes the unit obvious (14 days under a habit name, not "14 days").
- Keep the dashboard as one uninterrupted vertical scroll. No tabs, no filters on the main view.
- Use `border` (1px solid #E2E8F0) for separation, shadow only for elevation.

**Don't:**
- Never add confetti, bounce animations, or congratulatory text on completing a habit. The check turning green is the entire celebration.
- Never frame streak counts in motivational language. Numbers are numbers.
- Never use more than one accent-colored interactive element visible at the same time.
- Never apply a tinted or gradient background. `{colors.background}` is always `#F8FAFC`.
- Never use more than three font weights (400 regular, 500 medium, 700 bold).
- Never add onboarding overlays or guided tours. The interface must be self-explanatory to a technical audience at first glance.

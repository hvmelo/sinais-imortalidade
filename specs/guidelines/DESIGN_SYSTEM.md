# Design System — Sinais de Imortalidade

> This document is the canonical visual language for Sinais de Imortalidade.
> All UI work across all tracks must reference this document.
> Changes require dual approval (PO + Designer).

---

## Brand Intent

**Product category:** Niche editorial publication. Thematic digital media about science and the human future (not a generic blog, not a generic newsletter, not a corporate news portal).

**Target emotion (first-time user):** Fascination, intelligent urgency, and relevance ("this matters and I need to understand it").

**Personality adjectives (3–5):**
- Futuristic
- Editorial
- Precise
- Dense without feeling heavy
- Serious without feeling cold

**Anti-patterns — this should NOT feel like:**
- Buzzfeed/social-first visual language (excessive lightness, clickbait patterns)
- Personal blog or generic Substack aesthetics
- Corporate news portal (bureaucratic/heavy)
- Sterile VC newsletter minimalism
- Generic biotech startup “cold clean” visual style

**Visual references (optional):**
- Primary canonical reference: `Draft/sinais-var-a.html`
- Canonical palette source: `Draft/paletas.html` (Palette C — Cyan Futurista)
- Canonical logo source: `Logo/logo_sinais.png`

**Target platform(s):** both (web + mobile), with mobile as likely primary entry point.

---

## Color Tokens

_All code must use token names — never raw hex values. See Conformity Rules._

### Light Theme (Canonical for MVP)

| Token | Value | Usage |
|-------|-------|-------|
| `color-primary` | `#0891b2` | Primary actions, key CTAs, active states |
| `color-primary-hover` | `#0b7f9b` | Primary action hover state |
| `color-primary-active` | `#0a6b82` | Primary action pressed state |
| `color-secondary` | `#0c1222` | Secondary actions, dark CTA variant, high-emphasis UI |
| `color-accent` | `#22d3ee` | Highlights, featured pulses, emphasis chips |
| `color-neutral-100` | `#ffffff` | Lightest neutral (near-white) |
| `color-neutral-200` | `#e2e8f0` | Subtle backgrounds, dividers, borders |
| `color-neutral-400` | `#94a3b8` | Disabled text, placeholder, tertiary metadata |
| `color-neutral-700` | `#64748b` | Secondary text, labels |
| `color-neutral-900` | `#0c1222` | Primary text, headings |
| `color-success` | `#16a34a` | Success states, confirmations |
| `color-error` | `#dc2626` | Error states, destructive actions |
| `color-warning` | `#d97706` | Warning states, caution signals |
| `color-info` | `#0284c7` | Informational states |
| `color-surface` | `#ffffff` | Card and panel backgrounds |
| `color-background` | `#f4f7fb` | Page/screen background |
| `color-on-surface` | `#0c1222` | Text and icons on surface |
| `color-on-primary` | `#ffffff` | Text and icons on primary color |

### Dark Theme (Global Product Theme)

**Status:** `DEFERRED (post-MVP)`

A full dark-mode token system is intentionally deferred.
Current visual references support **contextual dark surfaces**, not a complete dark product theme.

### Contextual Dark Surfaces (MVP-supported)

| Token | Value | Usage |
|-------|-------|-------|
| `color-dark-surface-base` | `#0c1222` | Footer base, dark background zones |
| `color-dark-surface-elevated` | `#132d40` | Featured hero cards, newsletter section blocks |
| `color-dark-on-surface` | `#f8fafc` | Text/icons on dark surfaces |
| `color-dark-accent` | `#22d3ee` | Accent text/icons on dark surfaces |
| `color-dark-accent-strong` | `#0891b2` | Buttons/high-emphasis actions on dark surfaces |

---

## Typography

### Font Stack

| Role | Font family | Fallback | Rationale |
|------|-------------|----------|-----------|
| Headline | Sora | `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | Geometric precision and editorial authority; supports futuristic tone without becoming gimmicky |
| Body | DM Sans | `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | Highly readable for dense editorial paragraphs and metadata |
| Mono | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas` | monospace | IDs, token names, technical labels |

### Type Scale

| Token | Size (rem) | px equivalent | Usage |
|-------|-----------|---------------|-------|
| `text-xs` | 0.75rem | 12px | Captions, fine print, timestamps |
| `text-sm` | 0.875rem | 14px | Secondary labels, metadata |
| `text-base` | 1rem | 16px | Body text, default |
| `text-md` | 1.125rem | 18px | Large body, lead text |
| `text-lg` | 1.25rem | 20px | Section labels, card titles |
| `text-xl` | 1.5rem | 24px | Page section headings |
| `text-2xl` | 1.875rem | 30px | Page titles |
| `text-3xl` | 2.25rem | 36px | Hero headings |
| `text-xxl` | 3rem | 48px | Display/marketing headings |

### Weight Scale

| Token | Value | Usage |
|-------|-------|-------|
| `font-light` | 300 | Long secondary copy, subtitle/deck |
| `font-regular` | 400 | Body text |
| `font-medium` | 500 | Labels, navigation items |
| `font-semibold` | 600 | Subheadings, CTAs |
| `font-bold` | 700 | Headings, emphasis |
| `font-extrabold` | 800 | Hero/page-defining headlines |

### Line-Height Rules

| Context | Value | Token |
|---------|-------|-------|
| Headings | 1.2 | `leading-tight` |
| Body text | 1.6 | `leading-normal` |
| Compact UI (labels, badges) | 1.25 | `leading-compact` |

---

## Spacing Scale

**Base unit:** 4px — all spacing values are multiples of this unit.

| Token | Value | px equivalent | Usage |
|-------|-------|---------------|-------|
| `space-xs` | 0.25rem | 4px | Tight internal padding, icon gaps |
| `space-sm` | 0.5rem | 8px | Component internal padding |
| `space-md` | 0.75rem | 12px | Default spacing between compact elements |
| `space-lg` | 1rem | 16px | Card internal spacing |
| `space-xl` | 1.5rem | 24px | Section padding |
| `space-2xl` | 2.5rem | 40px | Page-level spacing rhythm |
| `space-3xl` | 5rem | 80px | Hero/newsletter section spacing |

---

## Shape / Border

### Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `radius-none` | 0 | No rounding (edge cases only) |
| `radius-sm` | 3px | Compact controls, tag buttons |
| `radius-md` | 8px | Inputs, default buttons, small cards |
| `radius-lg` | 12px | Main cards, widgets, panels |
| `radius-full` | 9999px | Pills, badges, semantic chips |

### Border Widths

| Token | Value | Usage |
|-------|-------|-------|
| `border-thin` | 1px | Default borders, dividers |
| `border-medium` | 2px | Active tab underline, focus/selection emphasis |
| `border-thick` | 4px | Decorative editorial accents only |

---

## Elevation

| Level | Token | CSS box-shadow | Flutter elevation | Usage |
|-------|-------|---------------|------------------|-------|
| 0 | `elevation-0` | none | 0 | Flat surfaces, inline elements |
| 1 | `elevation-1` | `0 1px 3px rgba(12,18,34,.08)` | 1 | Cards on page background |
| 2 | `elevation-2` | `0 4px 16px rgba(8,145,178,.08)` | 4 | Hovered cards, floating panels |
| 3 | `elevation-3` | `0 12px 32px rgba(12,18,34,.16)` | 8 | Dropdowns, popovers |
| 4 | `elevation-4` | `0 16px 48px rgba(15,28,46,.30)` | 16 | Featured hero cards, overlays (sparingly) |

---

## Component Conventions

### Naming Pattern

`[Prefix][ComponentName][Variant]` — e.g., `ButtonPrimary`, `CardFeatured`, `InputNewsletter`

All component names use PascalCase. Variants are suffixed.

### Required State Variants

| State | When required | Notes |
|-------|--------------|-------|
| `default` | Always | Resting visual state |
| `hover` | Desktop/pointer devices | Communicates interactivity |
| `active` | Always | Pressed/engaged |
| `focus` | Always | Keyboard navigation visible ring |
| `disabled` | When action can be blocked | Never hidden silently |
| `loading` | Async actions | Prevents double-submission |
| `error` | Forms/validation | Not color-only; include text/icon |

### Composition Rules

- Editorial hierarchy first: heading rhythm and metadata cadence are primary layout drivers.
- Cards own internal structure; parent controls external spacing.
- Subtheme tags must remain compact pill components (`radius-full`) with uppercase Sora label style.
- List/discovery components must preserve scanability in mobile (single-column fallback, preserved metadata order).
- Use tokens for all visual properties (color, spacing, typography, radius, elevation).

---

## Conformity Rules

### Must always do

- Use token names for color, spacing, typography, radius, and elevation.
- Keep primary reading surfaces high-contrast (`color-on-surface` on `color-surface`).
- Preserve editorial cadence: metadata first, then title, then supporting copy.
- Implement visible focus for keyboard navigation on all interactive controls.
- Keep cyan as an accent/highlight language; maintain restraint to avoid visual fatigue.

#### Product-specific required rules

**Signal cards**
- Mandatory content order: `meta → title → description → thumbnail`.
- Hover behavior must be subtle: use `elevation-2` + cyan border/accent (no aggressive motion).
- Preserve metadata visibility in all breakpoints.

**Analysis article page**
- Canonical editorial blocks are mandatory and ordered as defined in `workflow/design/SCREEN_FLOWS.md`.
- Reading column must keep a maximum readable width (long-form comfort first).
- Source links must remain always visible and visually distinct from body text.

**Newsletter CTA**
- Exactly one primary CTA per newsletter block.
- Success feedback must be inline and standardized.
- Avoid excessive CTA repetition in the same viewport.

### Must never do

- Use raw hex values in component code.
- Introduce playful/clickbait visual gimmicks (emoji-heavy badges, noisy gradients, social-feed styling).
- Replace heading font with a generic system sans.
- Overuse dark blocks in long reading flows (dark is for emphasis/featured zones).
- Remove metadata density from signal cards (it is part of the editorial identity).
- Treat dark mode as global MVP requirement (it is deferred; only contextual dark surfaces are allowed in MVP).

---

## Approval

| Role | Name | Date |
|------|------|------|
| Repo PO (brand intent + direction) | Henrique | 2026-04-10 |
| Designer (token completeness + consistency) | Henrique (acting as Designer) | 2026-04-10 |

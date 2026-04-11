// Token mapping — DESIGN_SYSTEM.md → Tailwind keys
//
// Design system uses `color-*` naming (e.g. color-primary).
// Tailwind uses flat keys for utility compatibility (e.g. primary, accent).
// Both reference the same approved hex values.
//
// COLOR TOKENS
// ────────────────────────────────
// Light theme (canonical for MVP)
//   color-primary         → primary        (#0891b2)
//   color-primary-hover   → primary-hover  (#0b7f9b)
//   color-primary-active  → primary-active  (#0a6b82)
//   color-secondary       → secondary      (#0c1222)
//   color-accent          → accent         (#22d3ee)
//
// Neutral scale
//   color-neutral-100     → neutral-100    (#ffffff)
//   color-neutral-200     → neutral-200    (#e2e8f0)
//   color-neutral-400     → neutral-400    (#94a3b8)
//   color-neutral-700     → neutral-700    (#64748b)
//   color-neutral-900     → neutral-900    (#0c1222)
//
// Semantic
//   color-success         → success        (#16a34a)
//   color-error           → error          (#dc2626)
//   color-warning         → warning        (#d97706)
//   color-info            → info           (#0284c7)
//
// Surface (MVP light theme)
//   color-surface         → surface        (#ffffff)
//   color-background      → background     (#f4f7fb)
//   color-on-surface      → on-surface     (#0c1222)
//   color-on-primary      → on-primary     (#ffffff)
//
// Contextual dark surfaces (MVP-supported, NOT global dark mode)
//   color-dark-surface-base       → dark-surface-base      (#0c1222)
//   color-dark-surface-elevated   → dark-surface-elevated  (#132d40)
//   color-dark-on-surface         → dark-on-surface        (#f8fafc)
//   color-dark-accent             → dark-accent            (#22d3ee)
//   color-dark-accent-strong      → dark-accent-strong     (#0891b2)
//
// TYPOGRAPHY TOKENS
// ────────────────────────────────
//   font-headline → Sora + system fallbacks
//   font-body    → DM Sans + system fallbacks
//   font-mono    → system monospace stack
//
// Full type scale, weight scale, spacing scale, border radius,
// elevation, and line-height tokens are defined below.
// Values match DESIGN_SYSTEM.md exactly.

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0891b2',
        'primary-hover': '#0b7f9b',
        'primary-active': '#0a6b82',
        secondary: '#0c1222',
        accent: '#22d3ee',

        neutral: {
          100: '#ffffff',
          200: '#e2e8f0',
          400: '#94a3b8',
          700: '#64748b',
          900: '#0c1222',
        },

        success: '#16a34a',
        error: '#dc2626',
        warning: '#d97706',
        info: '#0284c7',

        surface: '#ffffff',
        background: '#f4f7fb',
        'on-surface': '#0c1222',
        'on-primary': '#ffffff',

        'dark-surface-base': '#0c1222',
        'dark-surface-elevated': '#132d40',
        'dark-on-surface': '#f8fafc',
        'dark-accent': '#22d3ee',
        'dark-accent-strong': '#0891b2',
      },
      fontFamily: {
        headline: ['Sora', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        body: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        md: '1.125rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '1.875rem',
        '3xl': '2.25rem',
        xxl: '3rem',
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2.5rem',
        '3xl': '5rem',
      },
      borderRadius: {
        none: '0',
        sm: '3px',
        md: '8px',
        lg: '12px',
        full: '9999px',
      },
      boxShadow: {
        0: 'none',
        1: '0 1px 3px rgba(12,18,34,.08)',
        2: '0 4px 16px rgba(8,145,178,.08)',
        3: '0 12px 32px rgba(12,18,34,.16)',
        4: '0 16px 48px rgba(15,28,46,.30)',
      },
      lineHeight: {
        tight: '1.2',
        normal: '1.6',
        compact: '1.25',
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      maxWidth: {
        container: '62rem',
        'container-wide': '80rem',
        prose: '65ch',
      },
    },
  },
  plugins: [],
};

export default config;

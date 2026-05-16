# Portfolio Design Style Guide

## Visual Direction
- Style: dark, clean, modern portfolio with subtle depth.
- Tone: professional-first, expressive-second.
- Color movement: very soft warm-to-cool transition from top to bottom.
- Decorative effects: restrained; use only when they improve character without reducing readability.

## Color System
- Base background should stay near-neutral dark.
- Accent warm (`orange`) and cool (`cyan`) are supporting accents, not dominant fills.
- Keep gradients low-opacity and broad-radius.
- Avoid high-saturation color blocks in content sections.

## Gradient Rules
- Global page gradient should feel almost like a solid color at first glance.
- Maximum two subtle radial accents plus one vertical base gradient.
- Opacity guidance:
  - warm accent: ~0.04–0.08
  - cool accent: ~0.03–0.06
- Do not stack multiple strong gradients in the same viewport area.

## Typography & Readability
- Prioritize hierarchy: heading > summary > supporting text.
- Keep paragraph rhythm calm:
  - body size around `0.98rem–1rem`
  - line-height around `1.7–1.8`
- Avoid dense text blocks; maintain spacing between heading, summary, and actions.

## Spacing Rhythm
- Section vertical spacing should be consistent across all content sections.
- Heading blocks should share similar bottom spacing before card/list content.
- Use spacing changes before color/effect changes when refining visual balance.

## Component Principles
- Keep `portfolio-showcase.tsx` as orchestration layer (state, routing, behavior).
- Keep section UI as focused presentational components under `src/app/_components/portfolio/`.
- Preserve existing class hooks (`js-*`) used by animation logic unless intentionally refactored.

## Motion & Effects
- Keep meaningful motion (reveal, subtle transitions).
- Minimize purely decorative kinetic effects when they compete with content.
- Keep noise/scramble effects optional and brand-driven; never let them harm legibility.

## Interaction Rules
- Navigation and locale interactions must stay predictable and fast.
- Buttons/links keep consistent pill style and hover behavior.
- CV modal behavior is a stable UX contract: open/close, keyboard escape, download action.

## When Updating the Design
1. Adjust contrast and spacing first.
2. Reduce effect intensity second.
3. Add new effects only if they support the message and readability.
4. Re-check desktop + mobile visual balance after each pass.

## Engineering Constraints
- Reuse existing data shape from `src/data/portfolio.ts`.
- Prefer minimal, surgical style updates in `src/app/globals.css`.
- Validate with:
  - `npx biome check src`
  - `npm run build`

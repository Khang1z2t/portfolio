# Architecture

## High-Level Design

The app is a content-driven portfolio built around one reusable showcase component.

- Server entry routes render the same portfolio shell
- Client state handles locale, scroll tracking, sticky navigation, and CV modal behavior
- Static content is stored in typed data files instead of being fetched from an API

## Main Folders

```text
src/
  app/
    _components/
      portfolio/
    [section]/
    globals.css
    layout.tsx
    not-found.tsx
    page.tsx
  data/
    portfolio.ts
    site-content.ts
  shims/
    empty-module.ts
```

## Route Model

- `src/app/page.tsx` renders the home route
- `src/app/[section]/page.tsx` prebuilds tracked section URLs and renders the same showcase
- `dynamicParams = false` ensures only known section routes are generated

## Rendering Flow

1. `layout.tsx` defines metadata, viewport, preconnect hints, and analytics.
2. `page.tsx` or `[section]/page.tsx` passes localized content into `PortfolioShowcase`.
3. `PortfolioShowcase` coordinates:
   - locale switching
   - scroll-based path updates
   - GSAP motion
   - CV preloading and modal state
4. Presentational sections under `src/app/_components/portfolio/` render the actual UI.

## Data Flow

- `src/data/site-content.ts` contains:
  - shared types
  - shared skill lists
  - English and Vietnamese content
- `src/data/portfolio.ts` is a thin re-export layer for app imports

When editing copy, projects, contact info, labels, or section content, update `src/data/site-content.ts` first.

## Notable Technical Constraints

- The app relies on App Router conventions under `src/app`
- Animation hooks use `js-*` class names; preserve them unless intentionally refactoring animation code too
- `react-pdf` support uses a `canvas` shim in `next.config.ts` and `src/shims/empty-module.ts`
- The CV PDF is hosted remotely and warmed up with prefetch/preconnect logic

# Conventions

## Agent Startup Checklist

Before making changes:

1. Read `docs/README.md`
2. Read `docs/architecture.md`
3. Read this file
4. Read `docs/rule.md`
5. Read the relevant file in `node_modules/next/dist/docs/` if the task touches Next.js APIs, routing, metadata, config, or file conventions

## Shared Working Rules

These rules are intended for any coding agent used in this repo, including Codex and Claude Code.

- Think before coding. Do not guess silently when requirements or code behavior are unclear.
- Prefer the simplest change that fully solves the task.
- Make surgical edits. Avoid unrelated cleanup and broad refactors in a small portfolio repo.
- Every changed line should trace back to the user request.
- When touching existing code, preserve current patterns unless there is a clear reason to change them.
- For multi-step work, aim for verifiable outcomes instead of vague "done" states.

## Decision Heuristics

- If there are multiple plausible interpretations, surface them instead of picking one silently.
- If a simpler approach exists, prefer it unless the task explicitly needs more flexibility.
- If a change would add significant complexity, pause and justify it first.
- If you notice unrelated issues, mention them separately instead of folding them into the same diff.

## Project Conventions

- Keep this repo simple. It is a small personal portfolio, not a large product.
- Prefer focused edits over broad refactors.
- Keep `src/app/_components/portfolio-showcase.tsx` as the orchestration layer.
- Keep section components in `src/app/_components/portfolio/` mostly presentational.
- Keep content centralized in `src/data/site-content.ts`.
- Reuse the existing `@/*` path alias.

## Routing Conventions

- The site uses `src/app/page.tsx` for `/`
- The site uses `src/app/[section]/page.tsx` for tracked section URLs
- Do not add new public routes unless the task truly needs them
- Use private folders with `_` when colocating non-route files under `app`

## UI And Motion Conventions

- Preserve existing `js-*` hooks used by GSAP unless the animation logic is updated in the same task
- Keep sticky header, locale switcher, and CV modal behavior stable
- Favor subtle visual changes over noisy effects unless the task is explicitly a redesign

## Content Conventions

- Keep English and Vietnamese content structurally aligned
- Update labels and section copy in both locales when appropriate
- Preserve the portfolio's backend-first positioning and personal tone

## Verification

For meaningful code changes, prefer checking:

```bash
npm run lint
npm run build
```

Success means the requested change is implemented, the affected flow still makes sense, and verification matches the size of the task.

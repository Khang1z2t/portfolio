# Repo Safety Rules

This file is the hard guardrail for coding agents in this repository.

If a request conflicts with these rules, pause and ask before making risky changes.

## Read First

Before editing code, read:

1. `docs/README.md`
2. `docs/architecture.md`
3. `docs/convention.md`
4. `docs/rule.md`

## Never Do These Silently

- Do not rewrite large files when a small patch is enough.
- Do not refactor unrelated code.
- Do not rename files, folders, routes, or exports without a clear task requirement.
- Do not change project structure just because another pattern seems cleaner.
- Do not add new dependencies unless the task truly requires them.
- Do not remove existing dependencies without checking whether they are still needed.
- Do not change build tooling, Next.js config, TypeScript config, Biome config, or Tailwind setup unless the task is explicitly about that area.
- Do not change animation hook class names such as `js-*` unless the same task updates the GSAP logic too.
- Do not move portfolio content out of `src/data/site-content.ts` unless explicitly requested.
- Do not add new public routes unless the task truly needs them.
- Do not replace working patterns with abstractions “for future reuse”.

## High-Risk Files

Be extra careful when editing:

- `src/app/_components/portfolio-showcase.tsx`
- `src/data/site-content.ts`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `next.config.ts`
- `tsconfig.json`
- `package.json`

For these files:

- prefer minimal diffs
- preserve current behavior unless the requested task changes it
- verify assumptions before making structural edits

## Required Behavior

- Match the existing architecture before introducing new patterns.
- Keep this repo small, readable, and easy to maintain.
- Prefer updating content and presentational components over changing routing or app structure.
- Keep English and Vietnamese content aligned when editing copy.
- If a change may affect navigation, locale switching, CV modal behavior, metadata, or build stability, say so and verify carefully.

## Stop And Ask First

Stop and ask before doing any of the following:

- deleting files
- moving files across folders
- changing route structure
- changing data shape used across many components
- adding or removing dependencies
- changing config files
- making broad visual redesigns
- making edits that touch many unrelated files

## Safe Default

When in doubt:

- make the smallest working change
- preserve existing structure
- avoid cleanup outside the task
- explain assumptions briefly

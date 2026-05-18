<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Entry Point

Before editing code in this repository, read these files first:

1. `docs/README.md`
2. `docs/architecture.md`
3. `docs/convention.md`
4. `docs/rule.md`
5. `docs/session-handoff.md`

Use those docs as the shared source of truth before making changes.

# Agent Expectations

- Keep changes small and practical. This is a compact personal portfolio.
- Treat `src/data/site-content.ts` as the source of truth for portfolio content.
- Treat `src/app/_components/portfolio-showcase.tsx` as the main orchestration layer.
- Preserve existing `js-*` animation hooks unless the same task updates the animation logic too.
- Follow the shared working rules in `docs/convention.md` instead of duplicating local rules.
- Treat `docs/rule.md` as the hard safety boundary for risky changes.
- If a task touches Next.js routing, metadata, config, layouts, or file conventions, read the relevant file in `node_modules/next/dist/docs/` first.

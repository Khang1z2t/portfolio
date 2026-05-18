# Project Summary

## Overview

This repository is a personal portfolio for Dinh Quoc Bao Khang, built with Next.js 16, React 19, and TypeScript.

The site is a mostly single-page experience with:

- bilingual content (`en` and `vi`)
- section-based navigation with tracked URLs
- animated presentation using GSAP
- a CV modal backed by a hosted PDF

## Current Shape

- Main route: `/`
- Tracked section routes: `/about`, `/work`, `/skills`, `/how-i-work`, `/mindset`, `/contact`, `/cv`
- Content source of truth: `src/data/site-content.ts`
- Main client orchestrator: `src/app/_components/portfolio-showcase.tsx`

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- GSAP
- Radix UI
- Biome
- Vercel Analytics

## Key Commands

```bash
npm run dev
npm run build
npm run lint
npm run format
```

## What To Read Next

1. `docs/architecture.md`
2. `docs/convention.md`
3. `docs/rule.md`
4. the relevant guide in `node_modules/next/dist/docs/` before changing Next.js structure or APIs

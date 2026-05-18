# Session Handoff (Portfolio UI Iteration)

## What was completed

### 1) Project tech stack badges
- Added `techStack?: string[]` to `LocalizedFeaturedProject` in `src/data/site-content.ts`.
- Added tech stacks for projects in EN/VI content.
- Rendered badges in `src/app/_components/portfolio/projects-section.tsx`.
- Styled badges in `src/app/globals.css` with warm tone aligned to project type color.

### 2) View Project preview modal
- `View project` now opens a preview modal (for non-confidential projects with `previewImage`).
- Confidential project preview is intentionally disabled.
- Modal includes:
  - close button
  - backdrop close
  - ESC close
  - body scroll lock while open
  - footer CTA actions (`Live preview`, `View repository`)
- Implemented in `src/app/_components/portfolio/projects-section.tsx`.
- Styled in `src/app/globals.css`.

### 3) Preview image source stabilization
- Added optional fields:
  - `previewImage?: string`
  - `previewAlt?: string`
- Added local placeholder assets under `public/projects/` to avoid remote-image loading shifts.
- Updated content to point preview images to local paths.

### 4) Mobile cleanup
- Hid the entire hero panel on mobile (`.hero-panel`).
- Adjusted long hero note pill behavior on mobile for better wrapping and shape.

---

## Important UX decisions already agreed

1. **Do not auto-commit.** Only commit when user explicitly says so.
2. **Preview modal behavior**:
   - click `View project` -> open modal first
   - project actions are inside modal footer
3. **Confidential projects** should not show visual preview modal.
4. **Mobile** should be compact: hero panel hidden.

---

## Known styling sensitivities (user feedback)

- User is very sensitive to:
  - "AI-generated" spacing feel
  - accidental style overrides between breakpoints
  - modal visual consistency vs CV modal
- Keep spacing natural and conservative.
- Prefer minimal CSS changes in one clear breakpoint block to avoid cascade confusion.

---

## Recommended workflow for next session

1. Read in order:
   - `docs/README.md`
   - `docs/architecture.md`
   - `docs/convention.md`
   - `docs/rule.md`
   - this file (`docs/session-handoff.md`)
2. Run:
   - `npm run lint`
   - `npm run build`
3. Validate manually in browser:
   - project modal open/close
   - mobile hero section
   - badge spacing and button visibility

---

## Fast replace guide for real project images

Place real images in:
- `public/projects/pacific-preview.png` (or webp)
- `public/projects/bookstore-preview.png` (or webp)

Then update `previewImage` in `src/data/site-content.ts` to those paths.

---

## Commits created in this session

- `bf6108e` feat: add project preview modal and mobile hero cleanup
- one additional commit for `public/projects` placeholder assets

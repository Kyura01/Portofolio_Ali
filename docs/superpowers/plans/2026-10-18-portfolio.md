# Portofolio Ali Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Build a dark, futuristic animated portfolio with a wide horizontal 3D project orbit, an interactive Orb, smooth scroll, and cursor effects.

**Architecture:** Next.js App Router + TypeScript. One Three.js canvas per 3D feature (Orb in hero, Orbit in projects), each in its own component. All copy lives in `src/data/content.ts`. Pure orbit math lives in `src/lib/orbit.ts` and is unit-tested. Lenis drives smooth scroll and feeds GSAP ScrollTrigger.

**Tech Stack:** Next.js, React, TypeScript, three, gsap, lenis, vitest.

## Global Constraints

- Dark futuristic theme: near-black background, one neon accent, monospace for small labels.
- Orbit is a wide horizontal ellipse: cards extend sideways, active card front-centre.
- Reduced motion: respect `prefers-reduced-motion`.
- WebGL failure: fall back to 2D carousel / static Orb.
- All content comes from `src/data/content.ts` (placeholders until CV/LinkedIn arrives).
- No code, text, images or branding copied from the reference site.

---

### Task 1: Scaffold + tooling

**Files:** Create Next.js app in `C:\Portofolio_Ali`, `vitest.config.ts`.

- [ ] Scaffold with `create-next-app` (TypeScript, App Router, `src/`, no Tailwind, no ESLint prompts needed).
- [ ] `npm i three gsap lenis` and `npm i -D vitest @types/three`.
- [ ] Add `"test": "vitest run"` script.
- [ ] Verify `npm run build` passes. Commit.

### Task 2: Content data + filter logic (TDD)

**Files:** Create `src/data/content.ts`, `src/lib/filter.ts`, `src/lib/filter.test.ts`.

**Produces:** `type Project = {id:string; title:string; category:'real'|'exploration'; description:string; tags:string[]; image:string; href:string}`, `projects: Project[]`, `filterProjects(list: Project[], cat: 'all'|'real'|'exploration'): Project[]`.

- [ ] Write failing test: filter returns all for `'all'`, only matching for others.
- [ ] Implement, pass, add placeholder content (6 projects, services, experience, certifications, profile). Commit.

### Task 3: Orbit math (TDD)

**Files:** Create `src/lib/orbit.ts`, `src/lib/orbit.test.ts`.

**Produces:** `orbitPosition(index:number, count:number, progress:number, rx:number, rz:number): {x:number; z:number; scale:number; opacity:number; angle:number}` where `progress` is the float active index; active card (index===progress) has x=0, z=+rz (front), scale 1, opacity 1; others spread along the ellipse with x up to ±rx, scale/opacity decreasing with distance from front.

- [ ] Write failing tests: active card at x≈0, scale 1; neighbours have |x|>0 and scale<1; symmetric left/right.
- [ ] Implement, pass. Commit.

### Task 4: Global styles, layout, smooth scroll, cursor

**Files:** `src/app/globals.css`, `src/app/layout.tsx`, `src/components/SmoothScroll.tsx`, `src/components/Cursor.tsx`, `src/lib/useReducedMotion.ts`.

- [ ] Theme tokens (CSS variables), fonts via `next/font`.
- [ ] SmoothScroll: Lenis synced with GSAP ticker/ScrollTrigger; disabled under reduced motion.
- [ ] Cursor: follower dot + ring with GSAP quickTo; magnetic effect helper on `[data-magnetic]`; hidden on touch devices.
- [ ] Build passes. Commit.

### Task 5: Navbar + Hero (outline name, load animation)

**Files:** `src/components/Navbar.tsx`, `src/components/Hero.tsx`.

- [ ] Navbar shrinks on scroll, section links with counts.
- [ ] Hero: outline name with staggered per-letter reveal, tagline, CTA with magnetic effect, social links.
- [ ] Commit.

### Task 6: Interactive Orb

**Files:** `src/components/Orb.tsx`.

- [ ] Three.js canvas: glowing sphere with two eyes; eyes follow cursor, blink periodically, squash/react on scroll velocity and on hover of `[data-magnetic]`.
- [ ] WebGL-failure fallback (static CSS orb). Pause when offscreen; cap DPR at 2. Commit.

### Task 7: Projects orbit section

**Files:** `src/components/ProjectsOrbit.tsx`, `src/components/ProjectsFallback.tsx`.

**Consumes:** `orbitPosition`, `filterProjects`, `projects`.

- [ ] Section pinned via ScrollTrigger; scroll maps to float `progress` across projects.
- [ ] Three.js scene: card planes with image textures + glow on active; positions from `orbitPosition` (wide ellipse), gentle camera tilt following cursor.
- [ ] DOM overlay: left info panel (index, category, title, description, tags, button), right jump-to list (click scrolls to project), bottom progress bar + counter, filter chips.
- [ ] Mobile / no-WebGL / reduced-motion: render `ProjectsFallback` swipeable carousel.
- [ ] Commit.

### Task 8: Remaining sections + particles background

**Files:** `src/components/Services.tsx`, `Experience.tsx`, `Certifications.tsx`, `Contact.tsx`, `ParticleBackground.tsx`, `src/app/page.tsx`.

- [ ] Sections with line-by-line reveal on scroll. Particle background shifts with cursor.
- [ ] Compose in `page.tsx`. Commit.

### Task 9: Verification

- [ ] `npm test`, `npm run build` pass.
- [ ] Run dev server; screenshot desktop and mobile with agent-browser; check console errors, orbit at several scroll positions.
- [ ] Fix issues found. Commit.

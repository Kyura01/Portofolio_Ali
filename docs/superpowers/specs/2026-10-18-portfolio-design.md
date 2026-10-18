# Portofolio Ali — Design Spec

Date: 2026-10-18

## Goal
Personal portfolio website with eye-catching, interactive animation, inspired by the style of a reference portfolio (https://kevinndny.vercel.app). Inspiration only: layout ideas and animation concepts are reimplemented from scratch; no code, text, images, or branding are copied. Owner identity and content come from the owner's CV and LinkedIn (to be supplied).

## Stack
Next.js (App Router, TypeScript), Three.js (via react-three-fiber is optional; plain Three.js acceptable), GSAP + ScrollTrigger, Lenis smooth scroll. Deployable to Vercel.

## Visual direction
Dark and futuristic: near-black background, neon accent glow (single accent colour, chosen at implementation), monospace labels for small metadata, large display type for headings.

## Sections
1. **Hero**: large outline-style name that animates in on load; interactive 3D Orb character beside it. Orb eyes track the cursor and react to scroll and to hovering buttons.
2. **Projects**: section pinned while scrolling. Project cards are 3D meshes on a wide, horizontal elliptical orbit (extends sideways, not a tight ring around the centre). Scroll rotates the orbit; the active card sits at front-centre with glow, side cards shrink and fade. Left panel shows active project info (index, category, title, description, tech tags, case-study button); right panel is a "jump to" list; bottom progress bar and counter (e.g. 02 / 06). Category filter (All / Real / Exploration).
3. **Service, Experience, Certifications, Contact**: same visual language; content driven from data.

## Global interaction
- Custom cursor follower and magnetic effect on buttons.
- Particle background that shifts subtly with cursor position.
- Lenis smooth scrolling; per-line text reveals; navbar shrinks on scroll; back-to-top button.

## Content
All copy, projects, experience, and links live in a single data file (e.g. `src/data/content.ts`) so they can be swapped easily. Placeholders are used until the owner provides CV/LinkedIn info.

## Responsiveness and accessibility
- Mobile: the 3D orbit degrades to a swipeable carousel; particle count reduced.
- `prefers-reduced-motion`: disable orbit auto-motion, parallax, and heavy reveals; show static layouts.
- Semantic HTML for all text content; project cards also exist as accessible links/buttons (text not only in canvas textures).
- Card text is rendered into textures for the 3D scene, with an accessible DOM mirror for screen readers and SEO.

## Error handling and performance
- WebGL unsupported or failed: fall back to the 2D carousel and a static Orb image.
- Cap device pixel ratio, pause rendering when the tab or section is offscreen, lazy-load textures.

## Testing
- Unit tests for data/filter logic and orbit position math.
- Manual and browser-automation checks: desktop and mobile screenshots, scroll through the orbit, no console errors, reduced-motion behaviour.

## Out of scope (for now)
CMS, blog, i18n, contact-form backend (Contact uses mailto/social links initially).

## Open items
Accent colour, owner name and photo, real project list, and copy: pending CV/LinkedIn from the owner.

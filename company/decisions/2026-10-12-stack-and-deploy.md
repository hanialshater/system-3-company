# Next.js on Vercel, local first; no dependencies beyond the framework

owner: platform-engineer
date: 2026-10-12
status: decided

## Context
The founder asked for Vercel deployment eventually and local running until then. Lessons are
small React components. Every agent must be able to run the whole company with a shell.

## Options considered
1. Next.js (App Router), static pages and one tiny API route. *(chosen)*
2. A Vite SPA (simpler, but more work for Vercel functions and per-lesson pages).
3. Plain HTML per lesson (no shared kit; contracts are hard to enforce).

## Decision
Next.js 15 with React 19 and TypeScript. No CSS framework, no state library, no chart library:
SVG and CSS variables. The company CLI is dependency-free Node. Playwright for computer-use QA.
`SHOW_REVIEW=off` restricts production to published lessons.

## Rests on
None (convention and convenience).

## Revisit if
Build times exceed 3 minutes, or lessons need 3D/WebGL.

## Objections
none raised

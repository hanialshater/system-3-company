# Operational readiness: `.knot-tint` CSS rule

change: Add the visual designer's `.knot-tint` stroke rule (dark `--domain`, light 70% mix with black) to globals.css
change-tier: 1
paths: src/app/globals.css, company/ops/changelog.md
author: platform-engineer
self-check: platform-engineer
board: W-1582
risks: none
links: company/design/reviews/2026-10-16-knots-colour-ruling.md, company/design/specs/unknot-game.md

1. **What can fail.** A new class name could collide with an existing one, or be applied outside math, where the 70% light
   mix falls under 3:1 (probability 2.85, life 2.94; colour ruling scope note). No file uses `knot-tint` today
   (`grep -rn knot-tint src` finds only globals.css), so nothing renders differently on this commit. The scope limit is
   in the CSS comment; the knots kit is math-only.
2. **How we would know.** The first lesson to use it (unknot-game, W-1585) goes through the design lead's built-sheet look
   and QA contrast checks. No new monitor.
3. **Rollback.** Delete the 9 added lines or revert the commit. No data, no migration. Any deploy is the release
   manager's with the founder's approval.
4. **Capacity.** Two selectors in the global stylesheet, a few hundred bytes before gzip.
5. **Security.** None: no route, API, dependency, script or secret.
6. **Data.** None: no learner data, events or content touched.
7. **Risks.** No risk-register change.

## Validation

- `npm run check` on the worktree (see commit). Build of the tree before the CSS addition succeeded (a1dbd5af,
  `.next-pe-c4`); the rule is plain CSS already used elsewhere in the file (`color-mix`, `prefers-color-scheme`).

# Mini-lab composition and verification integration

owner: platform-engineer
date: 2026-10-24
status: implementation complete; integrated browser verification and independent ops readiness pending

Integration found that the unchanged protected static checker requires each `Demo.tsx` to contain the real `<Lesson>` and stage controls. Domain-delegating wrappers cannot satisfy that contract. The shared module now exposes `useMiniLab(spec)`, `MiniLabStage` with a control-children slot, and `MiniLabReveal`. The hook contains exactly the previous validation, state, action, availability and milestone-accounting code; the stage/reveal components contain exactly the previous presentation. Lesson-owned wrappers compose real kit elements using the documented template in `src/lib/mini-lab/README.md`. The checker and kit remain unchanged. Convenience adapters remain for compatibility, but the batch wrappers use the composable API.

Added `test:mini-lab` to the unprotected package scripts and placed it in `verify` after deployment tests and before publication tests. No dependency, lockfile, CI contract or gate changes. Twelve focused state/validation regressions pass through the named command. Final whole-tree typecheck was run after the refactor; integration records its completion and browser checks against the final 200-route build.

The independent R1–R3 re-review in the integrating checkout closed the earlier state defects. This refactor does not alter their pure state logic. Actual per-route protected QA and the supplemental post-Reset DOM script still need execution on the final build, alongside independent local-model arithmetic/source checks. Tier-2 operational approval remains independent of this implementation note.

# Constitutional Review Board: 2026-10-12 (AGENDA, not yet held)

chair: founder · presents: evaluation-steward · members: head-of-product, + one affected role per item (named below)

Prepared by evaluation-steward as the agenda. The **Decision** column is for the founder and the
board, and is deliberately empty. The recommendations are the steward's. They are not decisions.

## Amendments on the agenda
| AMD | Proposed by | Surface | What it removes | Prediction | Side-by-side evidence | Steward recommendation | Decision |
|---|---|---|---|---|---|---|---|
| AMD-000 re-ratification | founder | Whole constitution, protected paths, QA contract, launch gates as founded | Nothing (founding) | Gated lessons need fewer post-launch corrections than lessons in review; would_be_wrong_if the quarter shows as many | None possible yet: 0 lessons published (wave 0 gate pass rate 0) | **Re-ratify**, with two written fixes listed under "Re-ratification of standing rules". The founder authored it, so the founder should not be the deciding vote. head-of-product and the affected seat (qa-tester) should carry it | |
| AMD-001 (a) `ready` on `<Lesson>` + contract test | chief-of-staff | `src/kit/Lesson.tsx`, `tests/qa/**` | The guarantee that a gated lesson's reveal opens after one control sweep. New pressure towards key states that are easy to reach. Nothing for lessons that do not declare `ready` | At most 1 in 10 gated lessons draw "reveal reachable without key state" (wave 0: 16 to 18 of 18) | Planned: old spec and new spec on every lesson for one wave, with disagreements classified. Scratch: type-checks, diff not applied | **Ratify**, opt-in only. Revisit making it mandatory after the side-by-side. Seat: qa-tester | |
| AMD-001 (b) `retro`, `eng-review`, `offboarding` in RITUALS | chief-of-staff | `tools/company.mjs` (RITUALS) | Nothing; adds an overdue alarm for retro | Every wave gets a retro record started through the CLI | Not applicable (no judging effect) | **Ratify**. Do **not** gate a second fact-check pass yet (reasons in AMD-001) | |
| AMD-001 (c1) checker-added claims need a different check | chief-of-staff | `tools/company.mjs` (`launchGates`, `cmdCheck`) | One pass both adding and verifying a claim. Some publish speed | At least 1 checker-added claim corrected by the second check in wave 1 | Planned: both gate versions computed at publish for one wave. Scratch: fires on planted cases, current tree passes | **Ratify**. Note the identity is the review record, not the role name. Seat: fact-checker | |
| AMD-001 (c2) registry generator moves to `tools/registry.mjs` | chief-of-staff | `tools/company.mjs` (registry) | The amendment requirement on generator changes (incl. `loaders` mapping, still covered by QA) | EDD-001 lands without another amendment, and check catches every registry drift | Scratch: byte-identical output, check passes 18 lessons / 152 claims, and a tampered generator is caught | **Ratify**. Seat: platform-engineer | |

## Questions the board asks of each
1. Does this change who judges the proposer's own work? (If so, the proposer cannot be the deciding vote.)
   - AMD-000: yes. The founder approved their own founding act, which is the known weakness. The founder chairs, but should not cast the deciding vote.
   - AMD-001: no for chief-of-staff. (a) makes judging stricter for builders who opt in. (c1) is stricter for fact-checkers. (c2) loosens the protection on platform and principal engineering's generator work, so they should not be the deciding vote on (c2). The steward wrote the test diff in (a), so qa-tester should review its code.
2. What does it remove? See the "What it removes" column and each part's section in AMD-001.
3. Was old vs new run side by side? Not yet for (a) and (c1). Both have a one-wave side-by-side plan, and the board may ratify subject to it, or wait for it. For (c2), the byte-identical check is the side-by-side.
4. What is the rollback? Each part is a revert. (a) carries a note: lessons already using `ready` must drop the prop, or the prop is kept and ignored.
5. Who does this affect who is not in the room? Learners, through (a): a key state that is too hard to reach on a phone blocks the reveal. That is why the test fails when QA cannot reach the key state, and why EXP-002 holds the falsifier. Fact-checkers, through (c1): checking load rises.

## Re-ratification of standing rules
Protected rules whose reason is not written down:
- `.claude/hooks/protect-constitution.mjs` and `.github/workflows/ci.yml` are in `protected-paths.txt`, but Article 2's table does not list them or say why. Recommend adding a row (they enforce the rest) by amendment.
- `RITUALS` (the cadence table) is protected only because it lives in `tools/company.mjs`. It is not a gate. Recommend a later amendment that moves it out on the (c2) pattern. It is not bundled into AMD-001.
- EDD-001 option 4 says it "needs an amendment". If (c2) is ratified, principal-engineer should update that sentence.

## Decisions and objections
(For the board. Answer each objection with what happened to it.)

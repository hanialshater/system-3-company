# Chief of staff: the checklist (because the operator forgets)

Run `npm run company -- status`, `npm run company -- rituals` and `npm run metrics` at the start of every session.

## Every wave
1. [ ] Briefs ready for every builder (`company/domains/briefs/<d>.md` has ≥ 10 unbuilt briefs)
2. [ ] Kit changes landed **before** dispatch (tier-2 changes have an EDD and an engineering review)
3. [ ] Dispatch builders (worktrees, unique `NEXT_DIST_DIR`, `QA_PORT`, `QA_OUT`). **At most 4 Opus builders and 4 sonnet checkers at once** (COE 2026-10-13). Builders commit after every 2 lessons. Log the wave in `ops/waves.json`. If agents stop, resume them with SendMessage before re-dispatching.
4. [ ] Merge each branch → `npm run registry` → `npm run verify` on the integrated tree → `npm run company -- qa-record`
5. [ ] `npm run walkthrough -- --domain <d>` for every domain with new lessons
6. [ ] Fact-check per domain + **second check** of claims added by the previous checker (a different agent)
7. [ ] Learner review per domain (artifacts first)
8. [ ] Findings → revision briefs on the board; fatal findings stay tied to the lesson
9. [ ] Publish every lesson whose gates pass, and run a wave launch review record
10. [ ] Record tokens and counts in `ops/waves.json`
11. [ ] **WBR** (`company ritual wbr` + `npm run metrics -- --md`) and **Retro** (copy `rituals/templates/retro.md`)
12. [ ] Handoff entry in `ops/progress.md`; commit and push

## Every cycle (≈ 2 waves)
- [ ] Cycle planning · Pattern review · Board grooming (close or re-own items older than 7 days)

## Monthly / quarterly
- [ ] Distillation · Creative distrust · OP · Constitutional review board

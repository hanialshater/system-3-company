# Ruling: a frame QA copy is not enough for production flag-on; AMD-018 (W-087) must be ratified first (C7, W-2096)

owner: evaluation-steward
date: 2026-10-25
status: decided (evaluation steward's ruling on C7). The amendment it requires, AMD-018, is **proposed** and waits for the constitutional review board. The founder decides it. The steward does not ratify it.
class: gates (constitutional surface: `tests/qa/**`)
asked by: principal-engineer (Kenji), company/engineering/reviews/2026-10-25-content-hub-production-review.md, condition C7; board W-2096
amendment: company/constitution/amendments/AMD-018-qa-contract-through-frames.md (W-087)
read for this ruling: the review (C7, F6, F9, F11, P3, H5, its objections); EDD-003, its 2026-10-14 update and the A2 addendum (sections 3, 7, 12); the 2026-10-13 lesson-storage review record (its stage-1 rule); the 2026-10-16 A2 pilot review; the constitution (Articles 2 to 4) and `protected-paths.txt`; W-085, W-086 and W-087 on the board; `tests/qa/contract.spec.ts`, `tests/qa/lessons.ts`; `spike/qa/contract-frame.spec.ts` and its config; `tools/lib/readiness.mjs` (where QA evidence is read)

## The question

For the content-hub launch, 50 pilot lessons are rendered in sandboxed cross-origin frames behind `NEXT_PUBLIC_LESSON_FRAMES=pilot-50`, with the flag off by default. Is a passing copy of the QA contract adapted to frames, kept outside `tests/qa/**`, enough evidence to turn the flag on in production? Or must the W-087 amendment (frame targeting in the QA contract) be ratified first?

## Ruling

**The amendment must be ratified first.** A copy outside `tests/qa/**` may be used for the flag-on preview, as measurement, and as the "new" side of the side-by-side run that Article 3.4 asks for. It is not gate evidence for serving a lesson to learners in production, even when it is bound to each `frameDoc` hash.

Only these parts of AMD-018 block the first production flag-on: (a) the lesson list, (b) the frame targeting and (d) hash-bound evidence with a protected manifest check. Part (c), the security probes in the contract, and part (e), the kit-change sample, are severable. Each is needed before the first change it covers after flag-on, not before flag-on.

Nothing changes for: the flag-off merge (C1), the artifact deploy, the flag-on preview, C6 or the copy's preview run. None of them waits on this ruling.

## What I found in the artifact first (before the review's account of it)

I read `spike/qa/contract-frame.spec.ts` against `tests/qa/contract.spec.ts` (with `diff`) before I read section 7 of the EDD or the review's description of the copy.

- **D1. One check in the copy is vacuous inside a frame.** In step 5 the tap-target check is still `page.locator('[data-testid="stage"] [data-qa="control"]')`. The lesson's controls are inside the frame, so this finds 0 elements, filters 0 and expects 0. It passes whatever the frame's tap targets are. Every other lesson locator was moved to `f.locator`. This one line was left as it was, and the copy's header says the diff "shows the whole change". **A copy that differs "only by frame targeting" already drops one of the contract's five checks without anyone choosing to.**
- **D2. The copy tests a different host from the one learners would get.** It loads `/spike?only=<slug>&mode=single` (`SpikeHost`). Production flag-on renders through `DemoHost` → `DemoFrame` on `/d/<slug>` (review step 3), with the C2 bridge and the C3 reveal-fit and fold code. `SpikeHost` has none of those (F5, F6). C7 assumes the copy will be adapted. Whoever adapts it is choosing what the judge looks at.
- **D3. The copy's lesson list is typed in.** Without `QA_ONLY` it runs the spike's three slugs. Nothing binds the slugs it ran, or the frame document it loaded, to the manifest that would be served. A run of "all 50" is only as good as the slug list someone pasted. Nothing checks that the frame's `src` named the hash the manifest names.
- **D4. Capture of errors inside the frame is assumed, not shown.** `pageerror` and `console` listeners sit on the host page. SPIKE-001 says they work through frames, but no planted error inside a frame has been run against this spec. A dead `pageerror` capture would make check 1 pass silently, as D1 does for the tap check.
- **D5. Nothing makes the copy hard to change.** It is ordinary surface. The 2026-10-13 copy was written by the frame builder (SPIKE-001, platform-engineer), and C1 to C3 are that role's work. Review item 7 itself calls the qa-tester's run "measurement, not gate evidence".
- **D6. The in-app QA records of the 50 do not cover the frame code.** Those records judge the lesson compiled into the Next app with the app's kit and the host's DOM-reaching code (F6). The frame path is a different bundle (`spike/build.mjs`), a different kit build (`spike/kit/entry.ts`), a bridge and new parity code. Neither the app gate nor the copy has run the frame path as served.

After writing these down I read the account: the EDD section 7 ask and the review's C7, P3 and H5. Nothing there changes D1 to D6. Section 7 already says the copy "is not gate evidence and files no QA record, and it is deleted when the amendment lands". The 2026-10-13 approved rule says stage 1 "may not migrate a lesson or change a gate until … the evaluation steward's amendment (W-087) is ratified". The A2 addendum kept that rule by defining "pilot-migrated (… not served)". Production flag-on is the first time a pilot lesson is **served**.

## Options

| | Option | For | Against | Verdict |
|---|---|---|---|---|
| A | A passing copy, bound to each `frameDoc` hash, is enough | No constitutional step. The copy differs from the contract only in targeting. The flag can be withdrawn. | D1 shows the "only targeting" diff already lost a check. The copy sits on ordinary surface, so the maker of the judged code can change the judge after a run (Article 3.3, and this role's mission). Binding a hash to a judge that can be edited binds nothing. It breaks the approved 2026-10-13 rule. It serves code no gate has seen (D6). Withdrawal is a deploy that needs the founder's approval, with no pre-approval for this flag (review: rollback). | **rejected** |
| B | Ratify AMD-018 parts (a), (b) and (d) before production flag-on. The copy and the amended contract run side by side on the preview. | The judge of served code sits on the protected surface. The evidence names the exact frame document served. The manifest check that admits a lesson cannot be weakened by its builder alone. It keeps the 2026-10-13 rule. The side-by-side run is the C7 preview run that is planned anyway, so it adds a board decision, not a run. | One more founder decision before flag-on. The companion diff can only be written after C1's `DemoFrame` exists. | **chosen** |
| C | Ratify all of W-087 as EDD section 7 drafted it (including the security probes and the kit-sample rule) before flag-on | The most complete. Matches the most literal reading of the 2026-10-13 rule. | Parts (c) and (e) cover events (a kit or bridge change, a header change) that do not happen between the preview and the first flag-on. C5 re-runs the probes on the preview anyway. Holding flag-on for them guards against nothing that could happen in that window. | rejected for flag-on. (c) and (e) are severable parts with their own deadline: before the first change they cover. |
| D | The founder overrides the gate in writing (Article 4.1) and turns the flag on with the copy | It is the founder's right, and the founder wants it in production now. | It is not this role's option. It is a decision record with the founder's reason and these objections attached. If chosen, the least I would ask: D1 fixed and A18-2's positive controls run against the copy; the copy's file hash recorded with each run; qa-tester recording; and the flag-off rebuild prepared before flag-on. | **available to the founder only.** Not recommended. |
| E | An emergency session of the board (Article 3.2) | Faster | It is for "a defect that is letting bad lessons through". Nothing is getting through, because the flag is off. | not applicable |

## Reason

1. **The rule already exists and was approved.** The 2026-10-13 review, approved 2026-10-14, says no lesson migrates until W-087 is ratified. EDD-003's update repeats it, and the A2 addendum worked to keep it ("not served"). C7 asks whether a copy can stand in. It cannot without breaking that rule, and breaking it is a founder override (Article 4.1), not a steward's reading.
2. **What judges must be harder to change than what is judged.** `tests/qa/**` is protected because "it judges every lesson" (Article 2). For the 50, the frame path is the lesson a learner gets. A judge on ordinary surface, written and adaptable by the frame's maker, is the judged choosing its judge (Article 3.3). D1 shows the risk is real and not hypothetical: one unchanged line in a "targeting only" copy made a check vacuous.
3. **Hash binding is necessary but not enough.** It proves which code was run, not that the run judged it. The protected contract plus a protected manifest check (part d) gives both.
4. **This costs one decision, not a run.** AMD-018 is drafted now. Its companion diff follows C1. Its side-by-side cycle is the C7 preview run on the 50, which happens anyway. Ratification can sit between the preview run and the production deploy, the step that already waits for a founder approval.

## Objections that travel with this ruling

| Objection or position | Raised by | Answer |
|---|---|---|
| **W-087 should be ratified before production flag-on.** The 2026-10-13 rule; review C7: "serving code the gate never tested". | principal-engineer (Kenji) | **Adopted, on his evidence and on mine.** D6 confirms "never tested". D1 adds that the copy is not even a faithful stand-in. **One point where I may differ:** I hold only parts (a), (b) and (d) as blocking flag-on, and make (c) and (e) severable with their own deadline. If he reads his 2026-10-13 condition as needing all of W-087 before any lesson is served, that is a dispute about purpose, not evidence (Article 4.3). It goes to the founder with AMD-018. Until then the stricter reading (all parts) is the default. **Status: open** on that one point only. Owner: evaluation-steward, at the board. |
| The founder wants it in production now, and this adds a step. | founder's ask, relayed in the review | The flag-off merge, the artifact deploy, the preview, C6 and the copy run all go ahead today. Only the production flag-on waits, and it already waits for C2, C3, C5, C6 and a founder deploy approval. The founder can override (option D). That is a written decision with these objections attached, not something the steward can waive. **Status: answered.** The override stays the founder's to use. |
| The copy differs only by `frameLocator`, and the diff is the whole change, so ratification is ceremony. | the copy's header (SPIKE-001); the likely builder view | Answered with evidence: D1. The diff is not the whole change, because an unchanged line changed meaning. A protected judge with planted positive controls (A18-2) is what makes "only targeting" checkable. **Status: answered.** |
| Article 3.2 says the board decides at its quarterly meeting. Waiting for it would hold the launch for months. | evaluation-steward (process) | Precedent: AMD-013, AMD-015 and AMD-017 were ratified by the founder outside a quarterly meeting. For AMD-017 the seats that were not convened were recorded as an open objection. For AMD-018 I ask that head of product and qa-tester be consulted in writing before the founder decides. If they are not, that gap travels with the record as it did for AMD-017. **Status: open.** Owner: chief-of-staff (founder ask). |
| Every evaluator here is the same model. Same-model checks are correlated. | evaluation-steward (standing) | Partly answered: A18-2's planted faults test the judge itself, not just the lessons. C6's real phones are the uncorrelated check. **Status: open** (standing risk). |
| Part (d) adds `tests/lesson-frames/**` to the protected surface, which widens what needs an amendment. | evaluation-steward (anticipated, platform-engineer's cost) | It decides what code learners are served, so it is a gate in all but location. EDD-003 already warns that "moving the gates' 'where to look' is close to moving the gates". It is severable. If the board drops it, the manifest check stays ordinary surface, and this objection's risk (the builder can weaken it alone) is recorded as accepted. **Status: open, for the board.** |

## Next

- **Founder (via chief-of-staff):** AMD-018, parts (a), (b) and (d) before production flag-on; (c) and (e) severable. Board decision after the side-by-side run.
- **evaluation-steward (W-087, doing):** the companion diff against C1's `DemoFrame` branch; the A18-2 positive-control fixture; the side-by-side write-up.
- **qa-tester:** before the preview run, fix D1 in the copy (and adapt it to `/d/<slug>` on the flag-on build, D2), so the preview measurement means something. The copy stays measurement until AMD-018 lands.
- **platform-engineer:** C1 renders `iframe[data-slug]` with `sandbox="allow-scripts"` and a `src` ending `/f/<frameDoc>.html`, as the review designs it. AMD-018 (b).1 asserts exactly those.

# Ruling: tricolour-check, `loopOne` trigger and W-1614

cm-math-discrete · 2026-10-17 · lesson `src/demos/math/tricolour-check` v2 (main f6bbafcc) · brief 2 in `company/domains/briefs/math.discrete.md`
Asked by: build.md decision 1 (`company/reviews/tricolour-check/build.md`). Design side: no objection (`company/design/reviews/2026-10-16-tricolour-check-s4.md`, rulings 1 and 125).

## Ruling 1: `loopOne` fires when the ○ chip is opened. ACCEPTED.
- My brief said "a tap or Check all on ○" and a QA path of "○ (loopOne)". The builder is right that these cannot both hold: arcs come first in DOM order, so the contract's index-based path reaches the ○ chip, not an arc or Check all on it. I wrote the path; the path wins, and the key-state wording was my slip.
- Why it is enough for the learning gap: the reveal's only sentence about the plain loop is "A plain loop has one arc, so it can only ever be one colour". The state it quotes (one circle, one arc, one label) is on the stage the moment ○ opens, and quoting only reachable states is the rule (told-vs-shown). The census line "○: 3 of 3 obey: all one colour" is not quoted by the reveal, so requiring a tap or Check all on ○ would add a gesture and no quoted state.
- In the build (Demo.tsx `tap`, `checkAll`, `choose`) a tap or Check all on ○ also fires `loopOne`, so my old wording is a subset of the build.
- Brief 2's interaction bullet is edited to match: `loopOne` is "opening ○; a tap or Check all on ○ also counts".

## Does the build match the brief on the gate? Yes. QA v2's sentence is a misreading, not a gap.
- Demo.tsx: `MILESTONES = ["trefoil3","loopOne","eightAll"]`, `minInteractions={MILESTONES.length}` (3), and `interact` is called only through `reach`, once per milestone (`src/kit/milestones.ts`). Two milestones cannot unlock the reveal, so the plain loop (opening ○) is required, as the brief says.
- The learner walk (finding 6, probes A and B) saw exactly that: locked after three colours plus Check all on 3₁; opened only after ○ and 4₁ were visited and 4₁ checked.
- QA v2 (`company/reviews/tricolour-check/2026-10-17-qa-v2.md`, line 35) says the reveal unlocked after the trefoil and 4₁ Check all "before the plain loop was visited". The same paragraph records an earlier rapid chip-switching probe (plain, 4₁, 3₁, 4₁, plain) in what reads as the same mount. Milestones are kept per mount (`useMilestones` ref), so ○ had already counted. I read it as a QA-path artefact, not a lesson defect. I did not run the lesson; this is from the code and the two records. Owner of the correction: qa-tester (re-run from a fresh load or amend the sentence). It does not change the ruling.

## Ruling 2: W-1614 (learner walk findings 1 and 4) does not block launch. It waits for the next version.
- The learner walk's verdict is launch and marks both findings not blocking. Claims c1 to c8 are fact-checked; any wording edit resets the changed claims to unverified (c5, the proof sentence, is the one to protect), so a pre-launch edit costs a fact-check cycle for a stall the walker repaired within a sentence.
- Finding 1 (the pass mark is never said: 4₁ shows four ticks and the reveal says it "failed") is the real teaching weakness; fix it in the next version. Proposed replacement for "The figure-eight (4₁) failed, and all 81 ways were checked: only the three one-colour ones obey the rule": "The figure-eight (4₁) never got a second colour to pass: all 81 ways were checked, and only the three one-colour ones obey the rule." That is about 4 words longer (87 now; budget 90, the wrong-answer verdict adds 13 to the path count, so the builder must run `node tools/reveal-fit.mjs --strict --width 390 --height 844`; if over, drop "to pass"). The number is unchanged: K2 gives 3 of 81, all single-colour. Do not touch the "without cutting" clause (claim c5).
- Finding 4 (the "only with two colours" predictor gets no why) is shown only by the 3₁ census, "3 one colour, 6 all three". Leave it; a new sentence breaks the word budget. If cheap in the same edit, add Check all on 3₁ to the explore hint.
- Do not bump the version for wording alone before launch; batch with the next change.

## Files and follow-ups
- Written: this record. Edited: `company/domains/briefs/math.discrete.md` (brief 2 key-state clause). Lesson, board.json and progress.md untouched.
- For the caller to board (I did not): qa-tester, correct line 35 of the QA v2 record; demo-builder, W-1614 wording at the next version.

# Build note: zero-loses-to-this-crowd (behavioral:beauty-contest-level-k)

builder: demo-builder (builder-beh3) · 2026-10-16 · brief: `company/domains/briefs/behavioral.md` §3, "Rules every brief below follows" and "Ruling: how the stage word budget counts here" · numbers: `node company/domains/briefs/checks/behavioral-beauty-contest-level-k.mjs` (unchanged; all checks pass) · dispatch: `company/ops/dispatch-requests/2026-10-16-r2-behavioral.md` B2 · status set draft → review after the local QA contract passed

*Kept from evaluators until they have written their findings (demo-standard: artifact before account).*

## What was built
- One 0-100 number line. Above it, the rule line from the script, word for word: "Simulated crowd, seed 2: 30% guess at random, 40% near 33 (one step), 30% near 22 (two steps). Target: two thirds of everyone's average." "one step" and "two steps" link to `/d/two-thirds-of-the-average` (new tab, so the learner keeps this lesson's state). Nothing on the stage derives 33 or 22 and no ceiling is drawn (E8 (3)).
- The crowd is drawn in the browser with the kit's `mulberry32` / `randInt` (src/kit/random.ts) from seed 2, in the script's order (30 on 0-100, 40 on 30-36, 30 on 19-25). The kit generator is the script's mulberry32 written differently; in node the two gave identical draws for 100,000 calls from seed 2 (sum 3,463), and the reveal texts below match the script output word for word. The dots are a stacked dot plot (one dot per simulated guess, stacked by value; tallest column 10, at 36).
- Controls in DOM order (3, within the format's 6): slider "Guess" 0-100, starts at 50 (milestone `guess`); "Show the crowd" (enabled once the guess has moved; draws the dots, marks the average and the target with the learner's guess included, and locks the slider; milestone `crowd`); toggle "Mark the 0 guess" (enabled once the crowd shows; adds a hollow 0 marker and its dashed miss bracket to the target beside the learner's solid bracket; milestone `zero`). `minInteractions` 3. No ticks, no re-rolls, the simulated players do not react to each other.
- Picture labels are numerals only (average, target, the learner's guess, the two misses). The rule line's words are their key: "Target" in the domain colour with a solid underline (the target line is solid, domain colour), "average" with a dashed underline (the average line is dashed). At the reveal the guess, the target, the average and the 0 mark all stay on the line (the 0 mark is forced on at the reveal, even if the learner toggled it off again).
- Reveal: built from the script's sentences and formulas for every guess 0-100. The held line (claim c6) sits before "Where it stops" (`HELD_LINE = true`); the fallback is `HELD_LINE = false` (cut, nothing replaces it).
- Claims: 10 (c1-c10), all `unverified`, none self-verified. The Nagel 1995 line is not used (it stays held, E8 condition 4). No sentence says "people"; "simulated" is on the stage and in every reveal.
- Title and hook are mine (the brief gives none): "Your best guess against this crowd" / "Guess 0 to 100: closest to two thirds of the average wins. What wins against this crowd?" I did not use the slug as the title: "Zero loses to this crowd" would rule out option A before the commit (Pre-flight 1). cm-behavioral may want to rename the slug for the same reason; a slug is not shown to learners, so I left it.

## Stage word budget (under the category's ruling, pending head-of-product)
- Busiest moment (crowd shown, 0 marked): rule line 18 counted words (24 tokens less 6 numerals/percentages: 2, 30%, 40%, 33, 30%, 22, which the ruling's point 3 does not count inside a text label) + slider label "Guess" 1 (its readout is a numeral) + "Show the crowd" 3 + "Mark the 0 guess" 3 (the "0" not counted) + picture labels 0 (numerals only, point 2) = **25**. At the limit, not over it.
- That is why the picture carries no words ("average", "target", "you", "miss"): the rule line's own words act as the key. If evaluators find the numerals unreadable without words, a word there puts the stage over 25 and the call is cm-behavioral's.
- If head-of-product rules that numbers count: 24 + 1 (+ readout) + 3 + 4, plus about 7 picture numerals, is about 40. That is over 25, and a fix would need a re-layout by the learning designer. I did not trim the rule line, since it is claim-bearing (c3).
- The script counts the rule line at 24 by a plain word split; under the ruling it is 18. Both are within 25.

## Reveal-fit numbers
- `node tools/reveal-fit.mjs --url http://localhost:3961 zero-loses-to-this-crowd` (390 x 844, tool clean): verdict **fit**, stage-top crop **0 px**, hiddenBelow 0, namedHidden 0, no thumb, phoneFit true. Stage 299 px (picture 118, controls 94, text 49); reveal 295 px of a 618 px window.
- revealWords measured **95** on the QA path (guess 52; the script's 74-word branch + the 15-word held line = 89, plus the kit's verdict line "Not quite: …"). The script's own count (89 at most with the held line) leaves out the kit verdict, which is how brief 2 also measured (92). With the held line cut (fallback), the longest branch is 74 + verdict. Which sentence goes, if any, is cm-behavioral's call; I did not trim.
- Scripted 390 x 844 runs (guesses 0, 23, 33, 100): every reveal text equals the script's sentence for that guess with the held line inserted before "Where it stops"; no page errors. The stage top and the last reveal line are both on screen at 33.

## Things a reviewer should look at
- Option precision (Pre-flight 2): A "0, the equilibrium guess" and C "About 35, the crowd's average" carry a gloss; the right option B "About 23" carries none. The options are the script's and its check fixes them (E8 (2)), so I did not change them. cm-behavioral may want to judge whether the bare option stands out.
- The dots are about 3 px at 390 px (101 values across about 330 px cannot hold 10 px dots without overlap). I read the brief's "dot strip 10 px dots" as the strip's label size; the strip carries no text, and the numerals around it are 11 px in the viewBox (about 12 px rendered). A dot is shape, not a label, so the 10 px text floor does not apply to it, but the learning designer should look.
- ABM boundary (formats.md): "> 20 agents" would make 100 players agent-based on a literal reading. The brief says it is not (no reaction, no re-roll, no ticks) and that the build is the same if the design lead reads it as Simulation run. I built it as Single card.
- "Show the crowd" stays disabled until the slider has moved, so a learner cannot lock the default 50 without making a guess (that would strand the `guess` milestone). The explore hint says the order.
- The link opens a new tab. Inline links in the 12 px rule line are smaller than 24 px tap targets. They are not stage controls (no `data-qa`) and are optional.

## Pre-flight
1. **Title and hook.** "Your best guess against this crowd" / "Guess 0 to 100: closest to two thirds of the average wins. What wins against this crowd?" No: neither names 0, 23 or 35, nor says whether 0 wins.
2. **Options.** "0, the equilibrium guess" / "About 23" / "About 35, the crowd's average". All numbered; two carry a gloss, the right one does not (see above).
3. **Locked stage.** The rule line (with "near 33" and "near 22", not 23), an empty number line with "0" and "100", the slider at 50, and two disabled buttons. No dots, no target, no average, no guess marker.
4. **Reveal values.** g: (a) the locked slider value (milestone `guess`, locked by `crowd`). average, target, the learner's miss, the closer count: (a) computed from g and the seeded crowd, shown on the stage after `crowd`. The 0 player's miss 22.9: (a) computed from the same crowd with 0 in, on the stage after `zero`. 36.4 / 250: the held source line (c6), not a stage value.
5. **QA path.** Slider two ArrowRight presses (50 → 52, `guess`), "Show the crowd" (`crowd`), "Mark the 0 guess" (`zero`): all three milestones in 4 presses. Guess 52, target 23.2, average 34.8 and both brackets are on the stage when the reveal opens.
6. **Reset.** There is no Reset control. The guess locks when the crowd shows, and the 0 mark stays on at the reveal. QA-path reveal (guess 52): "With your 52 in, this simulated crowd averaged 34.8, so the target was 23.2. Your guess missed by 28.8; 86 simulated guesses were closer. Had you guessed 0, the equilibrium, you would have missed by 22.9. Against a crowd that stops after one or two steps, the winning guess sits near two thirds of the crowd's actual average, not at 0. In one online sample of 250 real players, first guesses averaged 36.4, far above 0. Where it stops: a simulated crowd with a stated rule, not real players."
7. **Phone fit.** reveal-fit: fit, crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; 95 words measured (89 + the kit verdict). The reveal points at the average, the target and the two misses, and all four numerals are on screen.

## Checks run (2026-10-16)
- Check script: all checks pass (unchanged).
- `npm run check`: pass. `npm run typecheck`: pass. `next build` (NEXT_DIST_DIR=.next-beh3): pass.
- QA (`QA_ONLY=zero-loses-to-this-crowd`, port 3961, 2 workers, harness stamp clean): **lesson contract passes on phone and desktop**; 10 of 12 specs pass. The 2 failures are `feed.spec` "subject chips filter the feed" (phone, desktop), the known harness defect under QA_ONLY that is already on the board (the allowed list is cut to the subset but the feed shows every lesson in the subject); not this lesson's code. "a finished lesson comes back as a spaced revisit" failed while the lesson was `draft` (the feed keeps drafts out of revisits) and passed after the status moved to `review`.
- Looked at: 390 x 844 screenshots at predict, explore and reveal (light), and the reveal in dark theme; the markers, brackets and key read in both.
- reveal-fit: pass, phoneFit.

## v2 revision build (2026-10-16)

builder: demo-builder · dispatch `company/ops/dispatch-requests/2026-10-16-r3-behavioral.md` B2 · decisions: brief 3 "Decisions on the built lesson" items 1, 2, 5 and rules 6-8 (`company/domains/briefs/behavioral.md`) · board W-1267 · commit 379a759 (lesson), this section in the next commit

### What changed (and nothing else)
- `HELD_LINE = false` in Demo.tsx (rule 6). No reveal branch renders c6; the only use of the held sentence is the `HELD_LINE ? … : ""` in the reveal, the same for all 101 guesses. c6 stays in meta.json, `unverified`; its text now starts "HELD, CUT (renders nowhere: HELD_LINE = false, brief rule 6, W-1267; …)" so the record says it is cut. Its source and the named cut that would pay for its return (decision 1) are unchanged.
- Predict option B: "About 23" → "About 23, between the other two". Recall option B: "About 30" → "About 30, between the other two". Both equal the check script's text. Claims c2 and c10 quoted the old option text; their quotes now carry the gloss (text only; status stays `unverified`).
- Not changed: stage, rule line, controls, crowd, reveal sentences, title, hook, slug, every other claim, status (`review`), `version`.

### Stage word budget (confirmed rule, decision 2026-10-16-stage-word-budget-counting)
- Busiest frame (crowd shown, 0 marked): stage 25 words (stimulus 0, other 25): rule line 18 (numerals 2, 30%, 40%, 33, 30%, 22 count 0) + "Guess" 1 + "Show the crowd" 3 + "Mark the 0 guess" 3 + picture labels 0 (numerals only). Same as v1; the gloss is predict text outside the stage, so it adds nothing to the stage.

### Reveal-fit numbers (QA path, guess 52)
- `node tools/reveal-fit.mjs --url http://localhost:4081 zero-loses-to-this-crowd` (390 x 844, tool clean, head 379a759): verdict **fit**, crop 0 px, hiddenBelow 0, namedHidden 0 (target, average, 34.8, 23.2, 22.9, 52, 28.8, guess all visible), phoneFit true. **revealWords 84** (the script's 74-word branch + the kit verdict "Not quite: it was "About 23, between the other two"", which is 4 words longer than v1's because it quotes the option). Stage 305 px (picture 124, controls 94, text 49); reveal 273 px of a 618 px window. v1 measured the picture at 118 px; nothing in the picture changed in this build, so I read the 6 px as a layout difference from main since v1, not this change (not checked).

### Pre-flight v2
1. **Title and hook.** "Your best guess against this crowd" / "Guess 0 to 100: closest to two thirds of the average wins. What wins against this crowd?" No: neither names 0, 23 or 35.
2. **Options.** "0, the equilibrium guess" / "About 23, between the other two" / "About 35, the crowd's average". All numbered, all glossed (v1's bare right option is fixed). Whether "between" reads as a middle-option cue is the learner-evaluator's to say (decision 2).
3. **Locked stage.** Unchanged from v1: rule line ("near 33", "near 22", not 23), empty 0-100 line, slider at 50, two disabled buttons. Nothing matches 23.
4. **Reveal values.** Unchanged from v1: g is the locked slider value; average, target, miss and closer count are computed from g and the seeded crowd; 22.9 from the same crowd with 0 in. 36.4 / 250 no longer render.
5. **QA path.** Unchanged: two ArrowRight (50 → 52, `guess`), "Show the crowd" (`crowd`), "Mark the 0 guess" (`zero`); all three milestones in 4 presses; guess, target, average and both brackets on the stage at the reveal.
6. **Reset.** No Reset control (as v1). QA-path reveal text, from the 390 x 844 run: "With your 52 in, this simulated crowd averaged 34.8, so the target was 23.2. Your guess missed by 28.8; 86 simulated guesses were closer. Had you guessed 0, the equilibrium, you would have missed by 22.9. Against a crowd that stops after one or two steps, the winning guess sits near two thirds of the crowd's actual average, not at 0. Where it stops: a simulated crowd with a stated rule, not real players."
7. **Phone fit.** fit, crop 0 px, 84 words measured; stage top and every named value on screen (screenshot `artifacts/reveal-fit/zero-loses-to-this-crowd.png`, not committed).

### Checks run (2026-10-16, v2)
- Check script `behavioral-beauty-contest-level-k.mjs`: all checks pass (unchanged script; it prints both glossed options B).
- `npm run check`: pass. `npm run typecheck`: pass (exit 0). `next build` (NEXT_DIST_DIR=.next-beh3r): pass; next build's tsconfig.json edit reverted.
- QA (`QA_ONLY=zero-loses-to-this-crowd`, QA_BASE_URL port 4081, 2 workers, QA_OUT artifacts/qa-beh3r): **lesson contract passes on phone and desktop**; 10 of 12 pass. The 2 failures are again `feed.spec` "subject chips filter the feed" (phone, desktop), the known QA_ONLY harness defect named in v1; not this lesson's code.
- Looked at the 390 x 844 reveal screenshot: the verdict wraps to two lines with the longer option, and the reveal still fits.

### For whoever looks next
- The "Why trust this?" panel serialises every claim, so c6's text (marked "HELD, CUT") is in the page data and readable there, as it was in v1. It is not in the reveal. If the fact-checker wants held claims kept out of the provenance panel, that is a kit question (platform-engineer), not a lesson change.
- The claim lease (`node tools/claim.mjs release zero-loses-to-this-crowd --done`) was not closed in this run: the permission system denied the write to the main checkout's company/ops/claims/. Someone with that permission closes it.

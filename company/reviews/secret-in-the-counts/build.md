# Build note: secret-in-the-counts (demo-builder, builder-wavej-ai-1, 2026-10-14)

Brief: `company/domains/briefs/ai.md` item 63 (Wave J). Status draft, version 1. Claims c1-c4 unverified; c3 (Carlini et al. 2021) is the real-systems citation. Brief claim 4 (Carlini et al. 2023) is not in learner text; c4 records the told sentence "Longer contexts remember rarer text." as shown by the toy, with the 2023 paper as background.

- Model: a real n-gram counter over the 7 sentences (generate() in Demo.tsx): greedy, ties to first seen, back-off to a shorter context when the context never occurred, stop at sentence end. Builder ran the MODEL block in node: 2-word "4 7 1 9"; 1-word "ready"; secret deleted, 2-word "ready" (backs off to "is").
- Stage: the 7 training sentences (the secret in the domain colour with a "private" badge; struck through with "deleted" after the delete preset), an output line "2-word context → my pin is 4 7 1 9" (red when the pin leaks), a tally chip of the first choice ("after 'pin is': 4 ×1"; 1-word: "after 'is': ready ×3, at ×1, sam ×1, …"), and a muted "Seen:" line with the 2-word and 1-word outputs, which survives Reset.
- Controls in DOM order: "Prompt with 2-word context", "Prompt with 1-word context", "Delete the secret, prompt again", Reset. Active preset disabled; Reset disabled when no output; preset row folds at the reveal.
- Milestones: leak-seen, short-context-seen (gated); deleted-seen is not gated or quoted.
- The badge is the word "private" in a red outline, not a lock icon (no icon set in the kit).
- Stage text exceeds the 25-word budget because the corpus itself is 32 words; the brief's design shows the whole corpus, which the question refers to.
- Options lost their inner quotation marks ("4 7 1 9", not "\"4 7 1 9\""), because the kit's verdict wraps the option in quotes and showed them doubled.

## Pre-flight v1
1. **Title and hook.** "Prompt it with 'my pin is'" / "One private sentence among seven training lines. What does the model say when prompted?" Neither says it leaks.
2. **Options.** "ready, the commonest word after 'is'" / "4 7 1 9" / "A random number": the brief's options. B is the only one with digits because the digits are the secret itself; A carries a reason of the same length, so B is not the most precise-looking option.
3. **Locked stage.** The 7 sentences (the secret marked "private"), "Output: –", "counts: –". No output, no tally.
4. **Reveal values.** "'4 7 1 9'": (b) milestone leak-seen, recorded in `rec.two`, in the Seen line. "'ready'": (b) milestone short-context-seen, recorded in `rec.one`, in the Seen line. "three times": computed by the same counts() over the corpus on the stage (c2). "one sentence out of seven": the corpus on the stage.
5. **QA path.** 2-word prompt (leak-seen), 1-word prompt (short-context-seen), Delete the secret, Reset: both milestones in 2 presses. At the reveal: "Seen: 2-word output '4 7 1 9' · 1-word output 'ready'", the secret line back to normal.
6. **Reset.** Reveal after Reset: "The pin was in one sentence out of seven, yet the model wrote it back in full: '4 7 1 9'. After 'pin is', its counts held only one word, so the most common next word was the secret. With one word of context, 'is' was followed by 'ready' three times, and the pin stayed hidden. Longer contexts remember rarer text. Real language models have repeated phone numbers and addresses from their training data the same way."
7. **Phone fit.** reveal-fit at 390x844 on the shared dev server (2026-10-14): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true; 85 words with the verdict (reveal body 77). Stage 289 px (all HTML text, no svg). Smallest rendered stage text 10.88 px (the "private" badge). Screenshot `artifacts/reveal-fit/secret-in-the-counts.png`.

## QA (builder's local run, 2026-10-14)
`QA_BASE_URL=http://localhost:3530 QA_ONLY=<five wave-J ai slugs> QA_OUT=artifacts/qa-wavej-ai npx playwright test tests/qa/contract.spec.ts --workers=1 --timeout=240000`: passed on phone and desktop (final run, after the last code change). `--timeout` only raises Playwright's per-test limit; the stock 45 s limit timed out on `page.goto` for all ten tests twice on the overloaded shared dev server (load average about 30-40 on 4 CPUs). Not a release build: the official record still needs a run on a quiet server or build.

## Revision v2 (demo-builder, 2026-10-16, verticals r5 B1: W-832 part, W-682 part 2)

Kept from evaluators until they report. Worktree s3c-wjd5, branch wj-design-r5b1.

- **W-832 (design review 2026-10-14, finding 2: the reveal opened on emptied evidence): fixed, both ways.** (a) Reset is now the first control in its row, so on the QA path (DOM order; Reset is disabled until a run exists, and the contract skips disabled controls) the last press is "Delete secret", whose stage still shows the counts the reveal quotes ("after 'is': ready ×3, at ×1, …"). (b) If the learner presses Reset last anyway, the stage shows the 1-word run when the reveal opens (output "1-word: my pin is ready", the 'is' tally) instead of "Output: –" / "counts: –". No line is added; the learner's own last run is kept when there is one. Probe (2-word, 1-word, Reset, reveal) on the build: stage at the reveal reads "… private 1-word: my pin is ready after 'is': ready ×3, at ×1, … Seen: 2-word '4 7 1 9' · 1-word 'ready' …".
- **W-682 part 2 (cm-ai ruling, `company/reviews/ai-cm-rulings.md` "2026-10-16 r5"): the pre-approved cuts, applied word for word.** Output "N-word context → my pin is …" to "N-word: my pin is …"; tally keeps its top two entries ("after 'is': ready ×3, at ×1, …"); Seen "2-word output … · 1-word output …" to "2-word '…' · 1-word '…'"; controls "2-word context" / "1-word context" / "Delete secret" / "Reset". The explore hint (outside the stage) still says "Prompt with two words of context, then one, then delete the secret and try again", so the verb is not lost.
- The raters'-chips ruling in the same section (W-682 3 of 3) is about raters-reward-agreement and does not touch this lesson; nothing applied.
- **Claims:** no claim's learner-visible text changed (c1-c4 quote the corpus and the reveal, which are unchanged; c2's counts are the same, the stage now shows two of them). No reset, no new claim.

### Stage word budget (v2, decision 2026-10-16; stimulus declared by cm-ai in brief 63: the 7 corpus sentences)

| Busiest frame: explore, 1-word run shown, both outputs seen, controls showing | words |
|---|---|
| Corpus, 7 sentences (declared stimulus) | 28 |
| Badge "private" (or "deleted") | 1 |
| Output "1-word: my pin is ready" | 5 |
| Tally "after 'is': ready ×3, at ×1, …" | 4 |
| "Seen: 2-word '4 7 1 9' · 1-word 'ready'" | 4 |
| Controls "Reset" / "2-word context" / "1-word context" / "Delete secret" | 1 + 2 + 2 + 2 |
| **stage 49 words (stimulus 28, other 21)** | limits: other ≤ 25, total ≤ 50 |

Matches cm-ai's projected 49. The "Delete secret" frame is the same 49 ("deleted", "2-word: my pin is ready", same tally). 2-word frame 47; Reset frame 42. Counted with a token-has-a-letter script over the rendered strings (× and … carry no letter).

## Pre-flight v2

1-3. Unchanged from v1 (title, hook, options, locked stage: corpus, "private", "Output: –", "counts: –").
4. **Reveal values.** Unchanged sources: '4 7 1 9' from `rec.two` (Seen line), 'ready' from `rec.one` (Seen line), "three" computed from counts() over the corpus on the stage, shown in the tally at the reveal.
5. **QA path.** DOM order: Reset (disabled, skipped), 2-word context (leak-seen), 1-word context (short-context-seen), Delete secret. At the reveal: struck-through secret with "deleted", "2-word: my pin is ready", tally "after 'is': ready ×3, at ×1, …", Seen line with both outputs. Every quoted state is on the stage.
6. **Reset.** Reset last, then reveal: the stage shows the 1-word run (above). Reveal text from that run: "The pin was in one sentence out of seven, yet the model wrote it back in full: '4 7 1 9'. After 'pin is', its counts held only one word, so the most common next word was the secret. With one word of context, 'is' was followed by 'ready' three times, and the pin stayed hidden. Longer contexts remember rarer text. Real language models have repeated phone numbers and addresses from their training data the same way." Every sentence matches the stage.
7. **Phone fit.** reveal-fit (own build :3647, 2026-10-16, unmodified tool, `artifacts/reveal-fit/wjd5-r5b1.json`): `verdict fit, crop 0, phoneFit true, revealWords 85, hiddenBelow 0, namedHidden 0, stageH 317`. Screenshot artifacts/reveal-fit/secret-in-the-counts.png: corpus, output, tally and Seen line on screen; controls not folded (the card fits).

### QA (v2)

Same run as tug-of-war-scale v2 (`--workers=2`, default timeouts, own production build): phone and desktop pass. Status stays draft.

Not changed, for the record: `.secret { color: var(--domain) }` colours the private corpus line in the AI domain pastel (bold, 0.8rem). It is the same pattern as design review finding 4 but was not named there, so I left it; the design-lead can say whether it needs the mixed ink.

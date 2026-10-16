# Fact-check: saved-or-die-same-600 (2026-10-16)

## FC pass 57 (2026-10-16)

Checker: fact-checker (Ingrid). Batch: standing order SO-10-2 (company/ops/dispatch-requests/2026-10-16-r3-quality.md, amended text, shared server), tag `[project:behavioral-econ]`. Rules applied: my W-975 step-9 statement as written (company/domains/behavioral.md: (a)-(c) can verify; (d) held by default), and the stage word rule company/decisions/2026-10-16-stage-word-budget-counting.md.

Target: shared review server http://localhost:3591, built from bc0edc0ebf45440c75754a31a61c63a6f9bd10cb (`/home/user/s3c-qa/.next-review2/BUILT_FROM` and `git -C /home/user/s3c-qa rev-parse HEAD`, both read at start and end; `status --porcelain` on src/content/public/package*.json empty). Ancestor test: the lesson's last commit 9d75fb3 is an ancestor of bc0edc0. The lesson directory on main equals bc0edc0. The newer src/components and src/lib commit on main (483a52b) touches only Life Hacks files.

Order (artifact first): `npm run walkthrough -- saved-or-die-same-600 zero-loses-to-this-crowd --url http://localhost:3591`, transcript cut at the appendix (R1), and the 7 screenshots. Then the meta.json claims at bc0edc0, Demo.tsx, and the brief 4 stimulus declaration (company/domains/briefs/behavioral.md line 119, for behavioral ask 2). The walkthrough drives only one branch (B then D), so I drove all four combinations with my own Playwright script against :3591 and read each reveal. My own node re-derivation followed (lotteries, a u = x^a sweep, recall), then a re-run of cm-behavioral's `node company/domains/briefs/checks/behavioral-gain-loss-framing.mjs` ("all checks pass"). One source was opened through PMC OAI-PMH. I did not read build.md. One builder count did reach me: the commit subject of 9d75fb3 ("stage 47: stimulus 30, other 17"), shown by `git log` when I checked claim authorship. That was after my screenshot count, which I had already made and which agrees with it. No claim here was written by me: meta.json history shows demo-builder commits only (aedfe36, 9d75fb3).

Result: **6 verified, 2 disputed, 1 held** (c5, type (d)). Statuses and per-claim notes are in src/demos/behavioral/saved-or-die-same-600/meta.json (each note starts 'FC pass 57').

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Stimulus and restatements render exactly (below); bars are 600 cells, filled = alive (Demo.tsx BARS, 60x10); C == A and D == B as lotteries; the reveal's SAME sentence appears in all 4 branches. |
| c2 | **disputed** | True only for a strict ranking. Expected value ranks A and B equal (200 = 200), so "any rule that ranks options by their outcomes picks ... in both" fails at u = x^1, and the predict question's "must" does not follow for that chooser. |
| c3 | **disputed** | All 4 branches read as claimed. But in the A-D and B-C branches, "No model that judges only outcomes fits both of your choices" is false for the indifferent (expected-value) model. |
| c4 | verified | Rachev et al. 2021, PMC8432807: framing effect defined; "risk-averse when presented with potential gains ... risk-seeking when the same options are presented as potential losses". |
| c5 | **held** (unverified) | Type (d), no (d) statement. **Renders nowhere** (cut transcript and all 4 branches); it appears only in the trust-sheet list. |
| c6 | verified | About this stage only; seen in all 4 branches. |
| c7 | verified | Caption seen; nothing named (no disease, place or group). |
| c8 | verified | Title and hook seen. |
| c9 | verified | 900 = 900 (own node). |

### The dispute (c2, c3), worked

- Lotteries in lives saved: A = 200 for sure; B = 600 with 1/3, 0 with 2/3. C = A and D = B exactly. So for any function f of the outcome lottery, f(A) - f(B) = f(C) - f(D). A **strict** outcome-based preference therefore picks A with C or B with D. That half of the claim holds.
- Expected value: EV(A) = EV(B) = 200. The classic problem is built with equal EVs. A risk-neutral rule ranks the two **equal**. Under weak revealed preference, picking A over B shows A >= B, and picking D over C shows B >= A. Together they give A ~ B, which this rule satisfies. So a learner who picks A then D fits a model that judges only outcomes, and the A-D reveal tells them it does not.
- My sweep, u = x^a for a = 0.01-3.00: 299 strict, one tied at a = 1. The check script compares `Math.sign` of the two differences (line 40), so the tie passes as 0 === 0 and the mixed pair is never tested against it.
- Why it is a dispute and not a wording note: the false sentence is shown to the learner (2 of 4 branches), and the counter-model is the textbook benchmark for exactly this problem, not a contrived corner. A learner who knows "both are 200 on average" can see it is false.
- Fix (builder edits; which words is cm-behavioral's call): make the premise strict. In the predict, "someone **prefers** the sure 200 saved". In the reveal, for example "Unless the two were a toss-up for you, no model that judges only outcomes fits both of your choices". Put the same qualifier in c2/c3's claim text, recount the reveal (now 72 and 69 words, limit 90), and have the script treat a tie as fitting either pair.

### Stage word count (behavioral ask 2), from the screenshots

Counted under company/decisions/2026-10-16-stage-word-budget-counting.md: a word is a whitespace token with a letter; numerals and "1/3", "2/3", "200", "600", "400" and "✓" count 0; "1-in-3" is one word; control labels, the key and the cover count; kit text outside the stage (title, hook, predict, panel, buttons below the stage) does not.

| Frame (screenshot) | Caption | Key "alive" | Cover | Toggle | Stimulus | Other | Total |
|---|---|---|---|---|---|---|---|
| locked (01-predict.png) | 10 | 1 | 4 | 6 | A 4 + B 11 = 15 | 21 | 36 |
| both rows, toggle off (02-05) | 10 | 1 | - | 6 | 4 + 11 + C 3 + D 10 = 28 | 17 | 45 |
| **toggle on / reveal (06-step-5.png, 07-reveal.png)** | 10 | 1 | - | 6 | 4 + 11 + 4 + 11 = 30 | 17 | **47** |

Busiest frame: **47 words (stimulus 30, other 17)**. Other ≤ 25 and total ≤ 50 both hold. Caption words: An, outbreak, is, expected, to, kill, people, Pick, a, programme. The decision record's estimate (other 20 = caption 10 + toggle 6 + cover 4, total 44) left out the key word "alive", and it counted the cover at the busiest frame, where the cover is gone. The rendered count is the one above. The check script prints the same three counts.

### Stimulus versus brief 4, word for word

The brief's six declared strings (A, B, C, D, and the restatements of C and D) were compared as exact whole lines against the cut transcript: **6 of 6 match exactly**. "400 people will die" and the D text appear in frames 2-5. In frame 6 (toggle on) the restatements replace them **in place** (rows 2 read "200 people will be saved" / "a 1-in-3 chance all 600 are saved, a 2-in-3 chance nobody is"), as the brief requires, not beside them.

## Findings for the builder and cm-behavioral (not disputes)

1. **c5's source, for the future (d) statement:** PMC8432807 is itself the 2020 study (first-hand). Its abstract gives "March to May 2020 ... 88,181 participants from 47 countries" and "varied substantially across nations". The OAI record carries a **2024 correction** (PLOS ONE e0315440, PMC11620341) that I did not open. Read it before any (d) verification.
2. **Held lines in the trust sheet.** The held text is visible to a learner who opens "Why trust this?", labelled HELD and unverified. This is kit behaviour shared by all lessons and not a claim problem. I note it for completeness.
3. **Rachev et al. also mention an informational-leakage account** (frames "not informationally equivalent", Sher & McKenzie 2006). The reveal's "the wording moved you" stays true either way, because the stage stipulates outcomes only.

## Unrecorded claims

None. I compared every sentence in the transcript (hook, predict and its options, panel, stage text, four reveals) and the recall card with c1-c9. The predict distractors are not asserted. The control aria-labels ("for sure: 200 of 600 live") restate c1's bars.

## What would change a verdict

- c2, c3 → verified: the strict qualifier lands in the predict question, the mixed-branch reveal sentence and the claim text, the reveal recounts at 90 or less, and the new build is on the shared server. Re-check under SO-10-2 trigger (b).
- c5 → verified: a dated W-975 (d) statement covering it, a read of the 2024 correction, and the measured reveal at 90 or less with the line in.
- Any verified claim → re-check: a change to Demo.tsx text, bars or reveal after bc0edc0.

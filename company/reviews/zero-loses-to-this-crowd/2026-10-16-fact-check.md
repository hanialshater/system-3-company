# Fact-check: zero-loses-to-this-crowd (2026-10-16)

## FC pass 57 (2026-10-16)

Checker: fact-checker (Ingrid). Batch: standing order SO-10-2 (company/ops/dispatch-requests/2026-10-16-r3-quality.md, amended text, shared server), tag `[project:behavioral-econ]`. The lesson was on the skip list for behavioral r3 B2; it re-enters under trigger (a)/(d) because v2 is merged and on the server. Rules applied: my W-975 step-9 statement as written ((a)-(c) can verify; (d) held by default).

Target: shared review server http://localhost:3591, built from bc0edc0ebf45440c75754a31a61c63a6f9bd10cb (BUILT_FROM and the s3c-qa HEAD read at start and end, unchanged; porcelain empty). Ancestor test: the lesson's last commit 379a759 ("v2: held line cut") is an ancestor of bc0edc0. The lesson directory on main equals bc0edc0.

**v2 on the server: confirmed.** The held c6 line ("In one online sample of 250 real players, first guesses averaged 36.4, far above 0.") is absent from the walkthrough reveal (transcript cut at the appendix), from every reveal I drove (g = 0, 23, 35, 52, 100), and from the reveal screenshot. It appears only in the trust-sheet claim list (transcript line 142, after the appendix at line 106, and in the page's serialized claims).

Order (artifact first): walkthrough on :3591 (5 frames, guess 52), transcript cut at the appendix (R1). Then the meta.json claims at bc0edc0 and Demo.tsx, then my own Playwright drive of five guesses on :3591. Then my own node re-derivation: my own mulberry32, written from the algorithm with no imports and no network. Then a re-run of cm-behavioral's `node company/domains/briefs/checks/behavioral-beauty-contest-level-k.mjs` ("all checks pass", the same numbers as mine). One source was opened through PMC OAI-PMH. I did not read build.md. No claim here was written by me: meta.json history shows demo-builder only (a923561, 90930b0, 379a759).

Result: **9 verified, 0 disputed, 1 held** (c6, type (d), stays held). Notes are in src/demos/behavioral/zero-loses-to-this-crowd/meta.json (each starts 'FC pass 57').

| Claim | Verdict | Basis (my numbers) |
|---|---|---|
| c1 | verified | avg = (S + g)/101; rule line seen. |
| c2 | verified | S = 3,463; g* = 2S/301 = 23.010; 0 misses by 22.9 with 84 closer; 23 by 0.0; 35 by 11.9; 23 is the only integer that no simulated guess beats. |
| c3 | verified | Seed 2: 100 guesses, sum 3,463, average 34.63. Rule expectation 34.8; seed 1 = 33.57 fails the 0.5 test, so seed 2 is the first that passes (the disclosure holds). |
| c4 | verified | Seen at g = 52 (34.8 / 23.2 / 28.8 / 86), 0 (84), 23 ("no simulated guess was closer"), 35 (62), 100 (76.5 / 100). |
| c5 | verified | Pantelis & Kennedy 2017, PMC5303671: "the Nash equilibrium of zero". See the finding below. |
| c6 | **held** (unverified) | Type (d), no (d) statement; held per W-902 result (07e7303). Renders nowhere. |
| c7 | verified | 23.010 vs 2/3 x 34.63 = 23.087; above 0. |
| c8 | verified | Seen in every branch; about this stage only. |
| c9 | verified | Hook seen; slider 0-100, step 1. |
| c10 | verified | Recall: 0 misses by 29.7, 30 by 0.1, 60 by 30.0; best 29.85. |

Stage word count (not part of this run's ask, checked because the rule line is claim-bearing): rule line 18 + "Guess" 1 + "Show the crowd" 3 + "Mark the 0 guess" 3 = **25**, at the limit. The decision record's count agrees.

## Findings for the builder and cm-behavioral (not disputes)

1. **"The equilibrium" with integer guesses.** The same source's footnote i says that with integer-only submissions, all players submitting 1 is also a Nash equilibrium. This slider is integers. "0, the equilibrium guess" is the standard name (the paper's main text uses it), so I verified c5. Whether to keep "the" is cm-behavioral's call. Under a 25-word stage and a 90-word reveal, I would not spend words on it.
2. **Unreachable branch.** "1 simulated guess was closer" (k = 1) exists in code and in c4, but no integer guess produces k = 1. Harmless.

## Unrecorded claims

None. I compared every sentence in the transcript (hook, predict and options, panel, rule line, picture alt text, reveal) and the recall card with c1-c10. "About 35, the crowd's average" is covered by c2 (the average is 34.3-35.3 over the guess range).

## What would change a verdict

- c6 → verified: a dated W-975 (d) statement that covers it and an opened source (PMC5303671 is reachable from this host), plus the reveal recount at 90 or less. Until then it stays cut.
- Any verified claim → re-check: a change to Demo.tsx text, seed, rule or reveal after bc0edc0.

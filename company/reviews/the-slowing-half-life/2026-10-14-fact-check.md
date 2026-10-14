# Fact-check: the-slowing-half-life (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (did not write or build these claims). Method: read Demo.tsx (predict, stage messages, readouts, reveal) against each claim, then re-derived every number in my own node scripts (session scratchpad fc4/). Books cited from memory were not opened; rows say where a verdict rests on derivation instead.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Derivation from 1/[A] = 1/[A]0 + kt: t1/2 = 1/(k[A]) at the start of each half, so halving [A] doubles the next half-life. Demo wait(2,n) = 10, 20, 40. Atkins edition/section not given or opened; verdict rests on the derivation. |
| c4 | verified | rate = k[A]^2: (1/2)^2 = 1/4, (1/4)^2 = 1/16; first order (1/2)^n. Demo rate() prints 1/4^n and 1/2^n. Reveal's "four times rarer ... half as many left ... twice as long" is consistent (time ~ amount/rate). |

**Result:** all claims verified (c1, c3 from 2026-10-13). Lesson fully verified.

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Method: read Demo.tsx learner-visible text (predict, stage captions/readouts, reveal) before the claim sources, then re-derived each number with my own node scripts (session scratchpad fc22/: bm.mjs, kn.mjs, kmp.mjs, nash.mjs, bid.mjs, sg.mjs, apply.mjs) or by hand. All external source hosts were blocked by the proxy (403); where a row cites a paper or book, only web-search snippets were seen and the row says so. Verdicts rest on the re-derivation, not on the unopened citation.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Pass 22 re-check of v3: own Euler integration of dA/dt = -kA (k = ln2/10): waits 10.00, 10.00, 10.00 min; t1/2 = ln2/k has no concentration term. "Radioactive decay is first order" confirmed only via web-search snippets of general-chemistry texts (LibreTexts/Averill 14.5); Atkins and the IUPAC Gold Book entry were NOT opened (hosts blocked). |
| c4 | verified | Pass 22: rate = k[A]^2: (1/2)^2 = 1/4, (1/4)^2 = 1/16; first order 1/2, 1/4. Matches rate() readout in Demo.tsx. Own integration of dA/dt = -kA^2 (k = 1/800): waits 10, 20, 40 min. |
| c5 | verified | Pass 22: derivation. Each halving of a power-law decay is the previous one rescaled: concentration x1/2 at every matching point, so rate x(1/2)^m throughout; time = amount/rate scales by (1/2)/(1/2)^m = 2^(m-1): x2 for m = 2, x1 for m = 1. Exact, not an approximation. Matches the .why line text in Demo.tsx and own integration (c4). |

**Result:** every claim in this lesson is now verified.

## Pass 24 (2026-10-14)

Checker: fact-checker (did not write these claims). Wave E revision. Method: read Demo.tsx first (every learner-visible string, every reachable branch and the state after any reset control), then build.md Pre-flight; re-ran every number in my own node scripts using the lesson's own logic (scratchpad fc24/). No builds. Web egress to source hosts is blocked (proxy 403); no claim below is verified on an unopened source alone.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Derivation: second order in A means rate = k[A]^2 (mass action for a bimolecular step: meetings scale with [A]·[A]); halving gives (1/2)^2 = 1/4, then 1/16; first order 1/2, 1/4. Own node: waits 10, 20, 40 min (2nd) and 10, 10, 10 (1st). Rate rows rateRow() print '1/4 → 1/16' and '1/2 → 1/4'; gate guarantees seen[2] >= 2 and seen[1] >= 2 before reveal. Atkins not opened; not needed for the definition. |

**Result:** all open claims verified; no disputes.

## Pass 26 (2026-10-14, batch 2, wave G revisions)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx first (every learner-visible string, every reachable branch, Reset/Start over where it exists, reduced motion where it applies; this lesson has no motion-dependent text), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc26-b2/). No builds. No sentence below is verified on an unopened source; external hosts failed DNS this pass.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | k = (1/40 - 1/80)/10 = 1/800; t(40) = 10, t(20) = 30, t(10) = 70 min, waits 10, 20, 40. Own Euler integration of dA/dt = -kA^2 from 80: reaches 40, 20, 10 at 10.00, 30.00, 70.00 min. waitRow(2) re-run in node: "10, 20 min" (seen 2) and "10, 20, 40 min" (seen 3); the reveal needs second-twice, so seen[2] >= 2 and the quoted row is never shorter than "10, 20 min". Rows persist across order switches (no reset control). |
| c3 | held unverified | Stage half checked: waitRow(1) re-run gives "10, 10 min" / "10, 10, 10 min"; t1/2 = ln2/k has no concentration term; reveal needs first-twice so the row has >= 2 entries. "Radioactive decay is first order" rests only on sources (Atkins; IUPAC Gold Book) that I could not open this pass (goldbook.iupac.org, openstax.org, libretexts, wikipedia all fail DNS), and pass 22 rested it on search snippets. Needs a checker who can open a source, or a coordinator ruling. |

**Result:** 1 verified, 0 disputed, 1 held unverified.

## Ruling on W-247: c3 held claim (2026-10-14, evaluation-steward)

Ruler: evaluation-steward (wrote, built and checked none of these claims). Inputs: c3 in meta.json, Demo.tsx line 90 (reveal), Pass 22 and Pass 26 rows above, and the W-222 precedent (board W-222 done; lobby note tx-a5ad8baee5 in company/ops/events.jsonl: three claims resting on unopenable papers were "rewritten to say only what the stage shows" and re-checked in pass 25).

**Ruling: (b) reword to stage-only.** Options weighed:

- (a) "textbook-standard facts may be verified by derivation or by agreement across snippets": rejected. Derivation cannot establish this half: that radioactive decay is first order is an empirical fact about nuclei, not a consequence of t1/2 = ln2/k. Snippet agreement is exactly what pass 26 declined to accept, and a standing rule that lowers the evidence bar for "textbook-standard" sentences would loosen the judge with no clear edge for what counts as textbook-standard. If the company wants that rule, it belongs in the claim-status gate (tools/company.mjs, protected) by ratified amendment; W-028 ("source not opened" status, needs AMD) is the existing item for it. One lesson's held claim is not the place to set it.
- (c) hold: rejected. Hosts have failed in passes 22, 24 and 26 with no date for access, so a hold blocks the lesson with no end.
- (b) chosen: matches W-222, and the stage fully supports what remains.

**Exact reword (demo-builder):**

- Demo.tsx reveal (line ~90): replace `so the wait stayed the same. Radioactive decay is first order: one fixed half-life.` with `so the wait stayed the same: one fixed half-life.`
- meta.json c3 `text`: replace with `A first-order reaction keeps one fixed half-life (here 10 min each time).`
- meta.json c3 `source`: drop the IUPAC Gold Book sentence; keep the t1/2 = ln 2 / k basis, append a note citing this ruling; status stays `unverified` (builder does not self-verify).
- Then a fact-checker re-checks c3. The stage half was already checked in Pass 26, so this should be a short re-check.

**Objection (cost of this ruling), and its answer:** the radioactive-decay sentence is the bridge back to the prior lesson the learner is assumed to know (content/curriculum/chemistry.json "Radioactive half-life"; meta learner.knows "half-life lesson"), so cutting it weakens the "why does this matter" link. Answer: the stage-only reword stands for now, because a learner-facing fact with no opened source is worse than a missing bridge. The sentence may come back unchanged as soon as any checker can open a source (IUPAC Gold Book "half life", OpenStax Chemistry 2e ch. 21, or any general-chemistry text). cm-chemistry owns whether the bridge is worth reopening; it does not block this lesson.

## Pass 27 (2026-10-14, re-check of pass 26 disputes and rewordings, W-253)

Checker: fact-checker (wrote and built none of these claims). Method: read the pass 26 dispute, then the new Demo.tsx on every reachable branch, including the exact path that failed in pass 26, plus Reset and reduced motion where they exist. Then I re-ran the numbers in my own node scripts (session scratchpad fc27/). No builds. External source hosts were refused (proxy 403 / DNS), so nothing below is verified on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | v6 text and reveal ('so the wait stayed the same: one fixed half-life') are now stage-only, per the W-247 ruling. Own node: waitRow(1) = '10, 10 min' / '10, 10, 10 min'. Independent Euler of dA/dt = -kA reaches 40, 20, 10 at 10, 20, 30 min. t1/2 = ln2/k has no concentration term. The reveal needs first-twice, so the row always has at least 2 entries. Rests on derivation, not Atkins (not opened). Nit (builder): support field still says 'source'. |

**Result:** 1 verified, 0 disputed, 0 held unverified.

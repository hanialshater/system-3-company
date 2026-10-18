# Pairwise Round 1: plan (2026-10-14, session 2, branch s2-rebuild)

owner: head-of-evaluation (Tobias) · judges: pairwise-judge × 8 (judge-1 … judge-8), dispatched by the session lead · fit: evaluation-engineer · decides: nothing

**Judges must never read this folder** (`company/evaluation/rounds/**`). The secret A/B mapping is in [`key.json`](key.json). The dispatch list is in [`dispatch.json`](dispatch.json).

## Scope

The 17 NCM batch-1 lessons. They form one fair, comparable set because they come from one course (Easley & Kleinberg, *Networks, Crowds, and Markets*), share one format, and were all at status `review` when captured. This is the first round, so there is no leaderboard yet. That leaves no new-version pairs and no uncertain neighbours to sample. **Connectivity is the only sampling goal**, plus calibration.

| lesson @ version captured | domain |
|---|---|
| mild-preferences-sharp-divides@v4, penalty-kick-mix@v4, bid-what-its-worth@v3, below-critical-mass@v4, prices-sort-the-buyers@v3 | economics |
| agenda-picks-the-winner@v2, news-comes-from-acquaintances@v3, enemy-of-my-enemy@v3, cluster-stops-the-cascade@v4 | math |
| web-bow-tie-reach@v3, one-good-link-beats-many@v5, new-road-slower-trip@v3 | cs |
| two-said-blue@v5, few-shortcuts-shrink-the-world@v5, same-songs-different-hits@v3, the-giant-appears@v2 | probability |
| contact-order-matters@v4 | life |

## Capture

- Build: `NEXT_DIST_DIR=.next-eval next build`, served by `next start -p 3221`. One server served every slug: `WALKTHROUGH_URL=http://localhost:3221 npm run walkthrough -- <17 slugs>` (phone viewport, prediction option 1, the default QA-contract path).
- **All 17 walkthroughs succeeded.** None aborted, none had page errors, and in every one the reveal unlocked.
- Versions are read from each `meta.json` at capture time. Raw (unredacted) copies are in `artifacts/pairwise/captures/<slug>@v<version>/`. These are for the head of evaluation only, never for judges.

## Pair design (24 pairs = 19 base + 5 calibration, about 21%)

**Base graph.** The 19 base pairs are a Hamiltonian cycle through all 17 lessons plus 2 chords. That gives a connected graph with no bridges: dropping any one pair, such as a leaked packet, still leaves it connected. Every lesson has at least 2 distinct opponents. The four chord endpoints (below-critical-mass, cluster-stops-the-cascade, news-comes-from-acquaintances, few-shortcuts-shrink-the-world) have 3. The cycle alternates within-domain and across-domain steps: **9 base pairs are within a domain and 10 cross domains.** That way domain clusters do not form separate components, and topical neighbours (games, cascades, network structure) still meet head-on where possible. contact-order-matters is the only life lesson, so both of its pairs cross domains.

**A/B order** is random per pair, from a seeded LCG with seed 20261014; the full script is [`build-packets.mjs`](build-packets.mjs), and it rebuilds captures, packets, key and dispatch from `artifacts/walkthroughs/` when run from the repo root. **Judge assignment** is random under two constraints: each judge gets exactly 3 pairs, and **no judge sees any lesson twice**. The second constraint also guarantees that a calibration repeat never goes to the judge who had the original, and it keeps a judge's memory of one lesson from bleeding into another verdict.

| pair | A | B | why | calibration? | judge |
|---|---|---|---|---|---|
| 01 | penalty-kick-mix@v4 | mild-preferences-sharp-divides@v4 | econ within: two equilibrium lessons | | judge-4 |
| 02 | penalty-kick-mix@v4 | bid-what-its-worth@v3 | econ within: game theory vs auctions | | judge-2 |
| 03 | bid-what-its-worth@v3 | agenda-picks-the-winner@v2 | econ × math: mechanism outcomes (bidding rule, voting agenda) | | judge-1 |
| 04 | agenda-picks-the-winner@v2 | enemy-of-my-enemy@v3 | math within | | judge-7 |
| 05 | enemy-of-my-enemy@v3 | news-comes-from-acquaintances@v3 | math within: social-network structure | | judge-5 |
| 06 | news-comes-from-acquaintances@v3 | two-said-blue@v5 | math × prob: information through people | | judge-3 |
| 07 | two-said-blue@v5 | same-songs-different-hits@v3 | prob within | | judge-1 |
| 08 | same-songs-different-hits@v3 | below-critical-mass@v4 | prob × econ: crowd feedback / tipping | | judge-3 |
| 09 | below-critical-mass@v4 | prices-sort-the-buyers@v3 | econ within: market-level outcomes | | judge-7 |
| 10 | new-road-slower-trip@v3 | prices-sort-the-buyers@v3 | econ × cs: price sorting vs selfish routing | | judge-5 |
| 11 | new-road-slower-trip@v3 | one-good-link-beats-many@v5 | cs within | | judge-4 |
| 12 | one-good-link-beats-many@v5 | web-bow-tie-reach@v3 | cs within: link structure | | judge-5 |
| 13 | web-bow-tie-reach@v3 | the-giant-appears@v2 | cs × prob: reachability vs giant component | | judge-2 |
| 14 | few-shortcuts-shrink-the-world@v5 | the-giant-appears@v2 | prob within: random-graph structure | | judge-7 |
| 15 | contact-order-matters@v4 | few-shortcuts-shrink-the-world@v5 | prob × life: network distance vs contact order | | judge-4 |
| 16 | cluster-stops-the-cascade@v4 | contact-order-matters@v4 | life × math: spreading processes | | judge-6 |
| 17 | mild-preferences-sharp-divides@v4 | cluster-stops-the-cascade@v4 | math × econ: local rules, global pattern (closes the cycle) | | judge-3 |
| 18 | few-shortcuts-shrink-the-world@v5 | news-comes-from-acquaintances@v3 | chord, math × prob: weak ties vs shortcuts | | judge-1 |
| 19 | cluster-stops-the-cascade@v4 | below-critical-mass@v4 | chord, econ × math: thresholds and cascades | | judge-8 |
| 20 | mild-preferences-sharp-divides@v4 | penalty-kick-mix@v4 | repeat of 01 | A/B swapped (position bias) | judge-6 |
| 21 | two-said-blue@v5 | news-comes-from-acquaintances@v3 | repeat of 06 | A/B swapped (position bias) | judge-8 |
| 22 | the-giant-appears@v2 | web-bow-tie-reach@v3 | repeat of 13 | A/B swapped (position bias) | judge-8 |
| 23 | below-critical-mass@v4 | prices-sort-the-buyers@v3 | repeat of 09 | same order, second judge (agreement) | judge-6 |
| 24 | cluster-stops-the-cascade@v4 | contact-order-matters@v4 | repeat of 16 | same order, second judge (agreement) | judge-2 |

**Calibration choice.** The five originals cover all five domains and both within-domain and across-domain pairs. The 3 swaps measure position bias. Because a different judge does each swap, a flip mixes position bias with judge disagreement. The 2 same-order repeats isolate agreement, so they give the baseline to read the swaps against. With 5 repeats × 6 criteria = 30 comparisons, these rates are rough (one flip is about 3 points). Report them with that caveat.

## Blinding

Each packet `artifacts/pairwise/round-1/pair-<nn>/` contains `A/`, `B/`, `criteria.json` and `task.md`, and nothing else. Each side holds step screenshots, `sheet.png` and a redacted `transcript.md`. Redactions were applied identically to both sides:
- the `recorded <ISO timestamp>` on the header line (date and capture order);
- the whole `## Appendix: trust sheet` section. It carried fact-check notes, "Revised vN" text, checker names, dates and claim addresses that include the slug.

After redaction, a check of every packet transcript found no slug, `@v`, `2026`, `fact-check`, `VERIFIED` or `address:` strings. The screenshots show no version, date or builder. Two learner-facing items remain on purpose:
1. **The "IN REVIEW" badge.** It is identical for all 17, so it carries no recency signal.
2. **"Why trust this? (k/n claims checked)"** under every card. Learners see this, so it stays. It is a possible anchor for the `trust` criterion. The task tells judges to judge `trust` from what the card states and how visible its limits are.

**Known limit:** with the trust sheet removed, `trust` is judged only from the card text. If later rounds want the trust sheet in scope, the walkthrough tool would need a learner-only trust-sheet view without fact-check notes. That change belongs to the evaluation engineer and to whoever owns `tools/walkthrough.mjs`.

## Judge brief

The verbatim brief from the ritual template is in every `task.md`, together with the criteria (ids, names and questions), the `verdict.json` shape (`{"pair","judge","verdicts":[{"criterion","winner":"A"|"B"|"tie","reason"}]}`) and the independence rules: read only this packet, no repo, no other pairs, no git, stop and write `leak.md` on any leak. Dispatch each judge as a fresh pairwise-judge agent that has not built or revised any of these lessons.

## After the round (not done yet)

1. Transcribe verdicts to `company/evaluation/pairwise/2026-10-14-round-1.jsonl` using `key.json`. Map A→`a` and B→`b`. Set `blind` honestly, and record any `leak.md` here as an exclusion.
2. Write calibration to `company/evaluation/calibration/2026-10-14-round-1.md`: agreement on 23 vs 09 and 24 vs 16; flips on 20/01, 21/06, 22/13; tie rate; and length bias, using transcript byte sizes from the captures.
3. Hand the fit to the evaluation engineer, and write the round record `company/evaluation/rounds/2026-10-14-round-1.md`.
4. No pedagogy-critic records are ingested in this round.

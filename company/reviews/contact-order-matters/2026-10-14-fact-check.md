# Fact-check: contact-order-matters (2026-10-14)

## Pass NCM-1 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal, recall) first, then re-ran the lesson's own code in node 22: the scripts extract the constants and the model function verbatim from Demo.tsx (and mulberry32 from src/kit/random.ts) rather than re-typing them (scratchpad `fc2/`). No walkthrough transcript exists for this slug (artifacts/walkthroughs/ has none), so the stage was read from code. Web: the egress proxy DNS-fails or 403s uvm.edu, toronto.edu, pubmed, europepmc, crossref, cambridge.org and library catalogues; sources were checked through web-search results (quoted abstracts, reference lists, publisher records), as each row says. Easley and Kleinberg: chapter titles from search-quoted catalogue/course pages; no section number confirmed from the book, so every section stays `section_unconfirmed`.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | spread(): day-0 first case, day loop 1..4 against a start-of-day snapshot, every eligible contact transmits. Stage rule line says the same. |
| c2 | verified | Re-run of spread() from Demo.tsx: E->A from A reaches only B on day 4; A->E from A reaches B1 C2 D3 E4. Predict answer "1" agrees. |
| c3 | verified | Overlap from A: B1 C2 D3 E4; from E: D1 C2 B3 A4. No same-day relay (snapshot). |
| c4 | verified | A->E from E reaches only D (day 4). The reveal line is gated by onOnlyD (first=E, order=A->E, day 4). |
| c5 | **disputed** | Reveal paragraph 2 and the claim say "A diagram of who met whom overstates who can be reached" as a general rule. Time-respecting reach is a subset of diagram reach, so the diagram can overstate but does not always: on this stage, Overlap from either end and A->E from A reach exactly the 4 the diagram shows. The learner has just seen such a case. **Fix (demo-builder):** in the Demo.tsx reveal and the claim text, "overstates" -> "can overstate". Then re-submit c5. |
| c6 | verified | Morris M, Kretzschmar M (1997), "Concurrent partnerships and the spread of HIV", AIDS 11(5): 641-648, PMID 9108946, doi 10.1097/00002030-199705000-00012 (reference lists, search-quoted abstract). Abstract: stochastic simulation comparing sequential monogamy with levels of concurrency, other features held constant; concurrency raises the number infected and the early growth rate exponentially. Supports the reveal's sentence. Medium (PubMed/LWW unreachable). Disease not named to learners, which is consistent with the source. |
| c7 | verified | Disclosure is true of the model. |

**Result:** 6 verified, 1 disputed (c5), 0 withdrawn. Lesson is blocked until the c5 wording is fixed.


## Pass NCM-2 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the builder's revision. Method: read the current Demo.tsx (predict, stage text, readouts, reveal and the milestones that gate it) and model files, then re-ran the lesson's own code in node 22 via tsx (Demo.tsx copied to scratchpad with its internals exported, CSS import stubbed; model/abm files imported directly). Reveal check: every number or sentence the reveal prints was traced to a state the milestones guarantee the learner reached, or to a claim. The walkthrough transcript predates this revision (08:4x vs Demo.tsx 09:xx), so the stage was read from code, not from a fresh walkthrough.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | NCM-1 fix applied: reveal paragraph 2 and claim now say 'can overstate'. Time-respecting reach is a subset of diagram reach and is strictly smaller in E->A from A (1 of 4 vs 4 of 4), which the 'one-way' milestone guarantees the learner saw. |

**Reveal check:** NCM-1 fix applied ('can overstate'). Reveal: E->A and A->E from A and Overlap from E are milestones; 'From E, A->E reached only D' prints only if reached.

**Result:** 1 verified this pass, 0 disputed, 0 withdrawn. Lesson now: 7 verified.

## Pass NCM-3 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the final-polish revisions, plus a fresh read of every predict, stage label and reveal sentence against the claims. Method: diffed Demo.tsx/model since the NCM-2 record (commit 319d2bda), re-ran the lesson's current code in node 22 via tsx (model files imported directly; Demo-only functions reproduced verbatim or re-implemented independently), and traced each reveal sentence to a milestone-guaranteed state or a claim. No fresh walkthrough: the transcripts predate the v3 commits and a build was not attempted in this shared checkout, so stage text was read from code.

No open claims. v3 changed the reveal wording and pinned the reveal stage. Re-ran spread() verbatim: AE from A 1,2,3,4; AE from E only D on day 4; EA from A only B on day 4; EA from E all four; Overlap from A or E all four, one per day. New sentences "When meetings run E to A ... only B" (c2), "Starting from E with meetings running A to E reached only D" (c4, gated by onOnlyD) and "Overlap ... every pair meets on each of days 1 to 4, so infection can run both ways, and from E all four were reached" (c3, milestone two-way) are backed.

**Advisory (not blocking):** the footer now begins "In real populations, partnerships that overlap ... can spread infection further (Morris and Kretzschmar, 1997)". c6 does not say "in real populations", and the cited paper is a simulation of a model population; the size of the real-world effect is contested in the empirical literature. "Can" keeps it true, but "In models of real populations" or dropping the prefix would match the source. Owner: demo-builder.

**Result:** 0 status changes. Lesson: 7 verified.

## Pass NCM-4 (2026-10-14)

Checker: fact-checker. Scope: re-read the footer against c6 (the NCM-3 advisory). Footer now: "In models of real populations, partnerships that overlap in time (concurrency) can spread infection further than the same ones in sequence (Morris and Kretzschmar, 1997). Real contacts are not certain to pass it on." This matches the source (a stochastic simulation of a model population) and c6 ("can spread further"); the prefix only narrows the claim, and the last sentence is c7. Advisory resolved. 0 status changes; lesson stays at 7 verified. Optional, for the builder: align c6's text with the footer by adding "In models".

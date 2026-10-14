# Fact-check: deleted-column-still-there

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | VERIFIED. world() in Demo.tsx: PER_GROUP 50 per group; PAST A 0.8, B 0.4, the same in every neighbourhood; approve = past > 0.5. Stage header 'Past lenders approved ○ A 80%, ▢ B 40%' and explore hint ('approves a whole neighbourhood if most past applicants there were approved') match. layout() uses mulberry32(1) only to shuffle dot order. |
| c2 | verified | VERIFIED. Own arithmetic in node: seg 0.8 -> N1 40 A + 10 B, past (32 + 4)/50 = 72% approve; N2 10 A + 40 B, (8 + 16)/50 = 48% reject; A 40/50 = 80%, B 10/50 = 20% (gap 60 points, wider than 40). seg 0.9 -> N1 76%, N2 44%; A 90%, B 10%. The reveal quotes rec.q, recorded on 'Train without group' (seg 0.8). |
| c3 | verified | VERIFIED. seg 0.5 -> 25 A + 25 B in each; past (20 + 10)/50 = 60% > 50% in both, so both approved: A 100%, B 100%. 'mixed-seen' is a required milestone, so the reveal's 'When you mixed the neighbourhoods' always follows a seen run. |
| c4 | unverified | HELD. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. Barocas, Hardt and Narayanan (fairmlbook.org) and Pedreshi et al. 2008 could not be opened, and no GitHub source copy of the book was found. The toy shows the mechanism, but the claim is about real systems. |

**Result:** 3 verified, 0 disputed, 1 held (unverified), 0 withdrawn.

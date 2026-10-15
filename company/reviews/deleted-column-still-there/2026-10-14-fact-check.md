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

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status draft, version 2. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-check after the W-839 wording change. Demo.tsx world(): PER_GROUP 50 per group; PAST A 0.8, B 0.4 in every neighbourhood; approve = past > 0.5. Stage header 'Past lenders approved ○ A 80%, ▢ B 40%' and the question's new rule text ('approves a whole one if most past applicants there were approved') both match the code; 'most' = more than half = past > 0.5. |
| c3 | verified | Re-check after the W-839 reveal change. seg 0.5 -> mk(25, 25) in each neighbourhood: past (25 x 0.8 + 25 x 0.4)/50 = 60% > 50%, so both approved, A 100%, B 100%. The reveal sentence 'When you mixed the neighbourhoods ... it approved everyone' always follows a seen mixed run ('mixed-seen' is in MILESTONES and minInteractions = MILESTONES.length). |

**Result (Pass 41):** 2 verified, 0 disputed, 0 unverified (held).

Other claims in this lesson not re-checked in this pass and still not verified: c4.

### Pass 41, later the same day: c4

Same checker and method as the Pass 41 section above. c4 opened on PMC after the first write-up.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Learner text (Demo.tsx lines 104-105): 'Deleting the column deletes the label, not the pattern. Fairness has to be checked on outcomes by group, not on inputs.' Opened on PMC: Adams-Prassl, Binns and Kelly-Lyth (2022), 'Directly Discriminatory Algorithms', Mod Law Rev 86(1): 144-175 (PMC10087838). It names 'proxy discrimination' as 'a common cause of algorithmic bias'. In its example, Amazon's hiring system, trained on historic data, 'quickly learned to penalise applications from graduates of two all-women's colleges' because 'some of the correlations between applicant traits and the likelihood of success were linked to sex'. It also notes 'less favourable treatment ... caused by correlations between an ADMS' features and protected characteristics'. So removing a protected attribute does not stop discrimination through correlated features. 'Where people live' is the toy's illustration of such a feature (c1-c3, verified). Checking outcomes by group is the check the claim draws from that. Barocas, Hardt and Narayanan and Pedreshi et al. 2008 are not opened. |

**Result (Pass 41, all three claims):** 3 verified, 0 disputed, 0 unverified. All claims in this lesson are now verified.

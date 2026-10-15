# Fact-check: search-the-document-body

Independent claim checks for src/demos/lifehacks/search-the-document-body. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Read StudyLesson.tsx FileStage and studyModels.ts fileResult first. Fixture: item name 'untitled', body 'telescope notes'. Step 1 (Titles only) filters r.name.includes('telescope'): 0 matches. Step 2 (Search bodies) filters r.value: 1 match, 'untitled'. So the body holds the term and the title does not, and switching the searched field changes the matches (0 to 1). Derivation from the fixture; the Google Drive Help page (not opened) is context only and not relied on. |

**Result:** 1 verified, 0 disputed, 0 held unverified.

## Pass 50

Checker: fact-checker, a fresh instance, 2026-10-15 (W-1084). I did not write, build or record any of these claims. Method: I read Demo.tsx and the shared spec or model files for every learner-visible string before any builder note. Derivations were re-run in my own node script (session scratchpad fc50/m.mjs). Sources were opened myself: PMC full text via the OAI API, the Crossref REST API (publisher-deposited abstracts), and raw.githubusercontent.com (OpenStax CNXML). The proxy refuses mdpi.com, pubs.aip.org, doaj.org, arxiv.org, eia.gov, ofgem.gov.uk, fsis.usda.gov, food.gov.uk, cdc.gov and who.int, and WebFetch fails DNS. Search-result summaries were not counted as opened sources. No fetched page contained instructions addressed to an AI; all were treated as data. The full basis is in each claim's `note` in meta.json (prefix 'FC pass 50').

Scope: the recall why 'The number is in the body; a title-only search never looks there.', flagged as false by the r11 learner review.

| Claim | Verdict | Basis |
|---|---|---|
| recall | verified | RE-CHECKED, STAYS VERIFIED (W-1084). The r11 learner review (2026-10-15-learner-adult-beginner-r11.md, point 27) and the board item read 'The number is in the body' as a stage claim and called it false because the stage word is 'telescope'. It is not a stage claim. It is meta.recall.why, the explanation for the recall card, whose question reads: 'You remember a document mentions 'invoice 4471' but not its title. Which search can find it?' (keyed: 'Search file contents for 4471'). 'The number' is 4471. It is in the body by stipulation, and a title-only search does not read the body, so the sentence is true where the learner meets it. It also matches recall-patch-study.lines.txt line 49. The real problem is presentation: the trust sheet (src/lib/trust.ts, DemoCard) lists the sentence without the recall question, so out of context it seems to point at the stage. Suggested fix for demo-builder (claim text, not a correction): make it self-contained, e.g. 'In the recall card, the invoice number 4471 is in the file's body; a title-only search never looks there.' If the text changes, reset to unverified for a re-check. |

**Result (Pass 50):** 1 re-checked, stays verified, 0 disputed. The flag was a misreading: 'the number' is invoice 4471 in the recall card, not the stage word. Open item for demo-builder (optional, not blocking): make the claim text self-contained for the trust sheet; a text change resets it to unverified.

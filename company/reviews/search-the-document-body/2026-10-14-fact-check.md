# Fact-check: search-the-document-body

Independent claim checks for src/demos/lifehacks/search-the-document-body. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Read StudyLesson.tsx FileStage and studyModels.ts fileResult first. Fixture: item name 'untitled', body 'telescope notes'. Step 1 (Titles only) filters r.name.includes('telescope'): 0 matches. Step 2 (Search bodies) filters r.value: 1 match, 'untitled'. So the body holds the term and the title does not, and switching the searched field changes the matches (0 to 1). Derivation from the fixture; the Google Drive Help page (not opened) is context only and not relied on. |

**Result:** 1 verified, 0 disputed, 0 held unverified.

# Fact-check: mail-exact-phrase (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/mail-exact-phrase v1. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Fixture: 'Both words' keeps m1 'blue folder' and m2 'folder is blue' (2); 'Exact phrase' keeps only m1 (1). Any message containing the adjacent phrase contains both words, so the both-words set is a superset; here strictly larger. The principle (shown in the reveal) states only the fixture rule. Gmail Help not needed for this sentence. |
| recall | unverified | Within the lesson's rule only 'I saw a red car' contains 'red car' as an adjacent sequence (own check). But the item is about how a real quoted search behaves, and its support is Gmail Help 7190, which could not be opened (DNS failure, proxy 403). Left unverified, as in LH-3A. |

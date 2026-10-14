# Fact-check: version-nine-and-ten (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/version-nine-and-ten v1. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | unverified | Fixture half holds: padded names v02, v09, v10 have equal width and text-sort into 2, 9, 10, while plain names text-sort as v10, v2, v9 (own node; GNU sort gives the same). The clause 'many real file browsers already use natural numeric sorting' is a claim about real file browsers. The only openable evidence on this host is GNU ls -v, which offers natural sort as an option, not by default; Drive Help 2375114 (the cited source) could not be opened. Left unverified. |

# Fact-check: selection-not-focus (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/selection-not-focus v1. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | unverified | Fixture half holds: editResult records focus ('left' → 'right' after Focus right) and selection ('A' → 'B' after Select B) as separate fields, and the stage shows both. The last clause ('shortcuts and focus behaviour vary between applications') is a real-world claim resting on Microsoft Learn (keyboard accelerators), which could not be opened (DNS failure, proxy 403). Left unverified. Options: open the source, or mark that clause as a hedge by ruling. |

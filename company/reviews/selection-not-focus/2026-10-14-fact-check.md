# Fact-check: selection-not-focus (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/selection-not-focus v1. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | unverified | Fixture half holds: editResult records focus ('left' → 'right' after Focus right) and selection ('A' → 'B' after Select B) as separate fields, and the stage shows both. The last clause ('shortcuts and focus behaviour vary between applications') is a real-world claim resting on Microsoft Learn (keyboard accelerators), which could not be opened (DNS failure, proxy 403). Left unverified. Options: open the source, or mark that clause as a hedge by ruling. |

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | VERIFIED. Fixture half: studyModels.ts sets focus ('left' -> 'right' after Focus right) and selection ('A' -> 'B' after Select B) as separate fields. Real-world half, on the cited Microsoft Learn page via its GitHub source (raw GitHub MicrosoftDocs/windows-dev-docs, hub/apps/develop/input/keyboard-accelerators.md, opened 2026-10-14). It separates control accelerators, which run 'only if the focus is on the element', from app accelerators that each app defines. It describes scoped and app-wide accelerators, and says that with a TextBox focused 'Control+C ... only copies the currently selected text'. So shortcuts and focus behaviour depend on the application. |

**Result:** 1 verified, 0 disputed, 0 held (unverified), 0 withdrawn.

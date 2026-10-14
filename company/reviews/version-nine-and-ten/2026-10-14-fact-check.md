# Fact-check: version-nine-and-ten (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/version-nine-and-ten v1. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | unverified | Fixture half holds: padded names v02, v09, v10 have equal width and text-sort into 2, 9, 10, while plain names text-sort as v10, v2, v9 (own node; GNU sort gives the same). The clause 'many real file browsers already use natural numeric sorting' is a claim about real file browsers. The only openable evidence on this host is GNU ls -v, which offers natural sort as an option, not by default; Drive Help 2375114 (the cited source) could not be opened. Left unverified. |

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | VERIFIED. Fixture half: padded v02, v09, v10 are all 3 characters and text-sort 2, 9, 10 (plain names sort v10, v2, v9). Real-world half, on opened sources (the cited Drive Help page could not be opened). GNOME Files (raw GitHub GNOME/nautilus src/nautilus-file.c) sorts names by g_utf8_collate_key_for_filename, which GLib documents (glib/gunicollate.c) as sorting 'file1 file5 file10'. KDE Dolphin (raw GitHub KDE/dolphin, dolphin_generalsettings.kcfg) has NaturalSorting as the default sort choice. Windows' shell API StrCmpLogicalW (MicrosoftDocs/sdk-api) compares digits 'as numerical content'. Builder: replace the Drive Help citation with these. |

**Result:** 1 verified, 0 disputed, 0 held (unverified), 0 withdrawn.

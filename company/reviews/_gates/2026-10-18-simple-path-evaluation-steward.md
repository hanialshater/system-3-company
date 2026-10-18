# Simple path (AMD-013): evaluation steward's answer (W-1672)

evaluation-steward · 2026-10-18 · from the code and a scripted census of 720 published + 234 review lessons; other answers unread.

**Overall: agree with changes.** As written, it breaks `check` on day one.

## Blocking objection (all parts)
`cmdCheck` runs `launchGates` on every **published** lesson. Put (a), (c) and (f) in it and `check` fails: (c) 720/720 (no `*-a11y-scan.json` exists), (a) 26 (15 non-canonical wording, 7 older-version verdicts, 4 `revise`), (f) 12 (lifehacks 6, history 4, big-ideas 2). **Change:** a separate `publishGates(meta)` that only `publish` runs. `publish` stamps `publishedUnder: "AMD-013"`, and `check` enforces `publishGates` only on stamped lessons; on the rest it warns. The 26 become a worklist, not an unpublish.

## Per part
- **(a) agree with changes.** Copy `readReview`/`decide` into `company.mjs`. Importing them from `publish-ready.mjs`, which anyone can edit, lets the judged edit the judge.
- **Step 4 of the record is wrong:** QA records carry no lesson version, and AMD-010 adds none. **Add (g):** `qa-record` writes `lesson version: vN`; the gate matches it.
- **(b) agree with changes.** Name files by reviewer: `sensitive→*-culture-en.md` (AMD-006; 8 exist), `safety→*-safety.md`, `copyright→*-copyright.md`. The 6 existing safety records say `Verdict: PASS` with no `stage:` or version. They need one template and fixed vocabulary; earlier records count for nothing.
- **(c) agree with changes. Yes, `a11y-scan.mjs` needs `--record`:** today it writes one combined file in `artifacts/` with no version or build. `--record` writes `company/reviews/<slug>/<date>-a11y-scan.json` with lesson version, built-from, a clean `tool-stamp.mjs` stamp and `verdictAuto`. Gate on **lesson-origin** fail (`verdictAuto`). A kit/app fail refuses the batch once, not as 720 lesson failures. **Open independence objection:** anyone can loosen an unprotected scanner whose output is a gate. The stamp shows it but does not stop it. The board decides whether its severity table is protected.
- **(d) object to the field, agree with the goal.** `reviewRoute` is missing on all 1,283 lessons, and no file marks a Life Hacks safety class. **Simpler: derive the route.** Use a domain default in `domains.json` (`lifehacks→safety`, `books→copyright`), then the concept's `sensitive` mark (63 concepts). meta.json carries `reviewRoute` only to raise it, or to lower it with a head-of-product `ruling`. No migration; nothing for a builder to drop. If a field is kept anyway, migrate the derived value with `assignedBy: migration`, never a blanket `standard`.
- **(e) agree with changes.** `publish` takes one slug today; it needs several slugs plus `--batch`.
- **(f) agree with changes.** Of 218 holds, 206 are incubating; **12 are not** (W-513, Books, sensitive, r5 A1, chief of staff). Retiring the file loses them. **Simpler:** `publish` also refuses any slug in `publish-holds.json`. That one line closes "publish skips holds". Also, nothing stops a category manager flipping `incubating→active`; require a Domain Launch Review path for it.

## Sampling and stop rule: agree with changes
- The tool draws the sample; nobody chooses it: `ceil(n/10)` per category, lowest `sha256(batch path + slug)`, listed in the batch record.
- Sample reviews may land after publish. `publish --batch` refuses a category's next batch until the previous batch's sample records exist. Enforced, but not blocking.
- "More than 1 in 10" cannot be measured on 2 samples. **Change:** any fatal in a category's sample sends its next batch to 100%.
- A planted claim that reaches `verified` is a fact-check miss, recorded as one, never published.

Independence holds if the parser and sampling live in `company.mjs` and the scanner is stamped.

Verdict: agree with changes. Split publish-only gates and grandfather the 720, derive the route, add a QA version check (g), enforce the remaining holds, and let the tool draw the samples.

# Simple path: accessibility-reviewer answer (W-1904)

date: 2026-10-18 · role: accessibility-reviewer · inputs: the decision record, AMD-014 (c), `tools/a11y-scan.mjs`, my records in `company/reviews/_accessibility/`. No new scan run.

## Verdicts

1. Scan with 0 `fail` as a publish gate: **agree with changes** (and one plain objection to (c) as drafted).
2. Human review at 1 in 10 per batch: **agree with changes**.
3. What the scan cannot see: list below, to go into the batch record.
4. Past numbers: below.

## Objection

**I object to AMD-014 (c) as written.** It names `tools/a11y-scan.mjs --record` and a "current version" match. Neither exists: the script has no `--record` flag, writes one JSON for the whole run (`--out`), and stores no lesson version. Ratifying (c) today gives a gate nobody can satisfy, or a hand-made file the record says is a scan. The tool change is mine to propose and the platform-engineer's to code; it must land before (c) is enforced. Answer wanted from the evaluation-steward in the AMD.

## (1) Changes to make the gate sound

- The gate counts `fail` findings with origin `lesson` only. Kit and app `fail`s are fixed once and tracked on the board, otherwise one kit defect blocks every lesson. (The scan already separates `verdictAuto` from `verdictWithKit`.)
- A scan crash is recorded as `fail` by the script. Keep that. A lesson with no scan record never passes.
- The record carries slug, `meta.json` version, commit, date, and the scan tool's hash.
- Run it on a build of the commit being published, not a shared server (my 10-13 audit hit a stale server).
- A `fail` here means contrast under 3:1, keyboard lock-out, missing name, target under 24 px, or reduced-motion animation. Contrast between 3 and 4.5 is only `fix`, so "0 fail" is not "AA".

## (2) Sample

1 in 10 is fine if it is drawn by the reviewer, not the builder, and **always includes** any lesson with new interaction code (not shared-renderer lessons). A shared renderer (Books) needs one deep review, not 1 in 10 of 100 identical pages. Stop rule agreed. Add: a kit change to `src/kit` or `globals.css` triggers a re-scan of a fixed 10-lesson panel.

## (3) The scan cannot see; the sample must cover

- Real screen reader output (announcements, the order read). Never run so far by me.
- Whether colour is the only cue: it only flags absence of text nearby (`manual`). The red/green stale cells in two-cells-sum-any-range were found by reading markup.
- Whether an SVG label is true to the current state (`more-digits-not-bigger` A2); the scan only notices an unchanged label.
- Whether live regions announce the right consequence, not just exist.
- Contrast over gradients or images ("unsure", skipped), and dimmed states.
- Zoom, text resize, landscape, 320 px reflow.
- Focus loss from self-disabling controls beyond the first press; JS-driven motion (timers, rAF).
- Colour-vision filters are screenshots only; nobody reads them automatically.

## (4) Past numbers (my records)

Source: `company/reviews/_accessibility/2026-10-13-published-audit.md`.

- 125 published lessons scanned: 26 fail (**21%**): 18 of 76 (24%), then 8 of 49 (16%). Every one was **lesson-origin contrast**, mostly pale `--good`/`--warn`/`--bad`/`--domain` used as text in light theme. None failed keyboard, names, motion or target floor.
- Kit-origin: K1 to K8, present in 125/125 (fix once). Only one is `fail`-grade by the scan's rules: app chrome "Why trust this?" at 23 px high, under the 24 px floor. If still true, it would block every lesson until fixed. Check before turning the gate on; I did not re-test it today.
- Later records: nine r5 lessons had 3 of 9 with real issues, none a lock-out (`2026-10-16-w1405-nine-lessons.md`). Books-100: zero lesson-origin findings, same kit defects 100/100 (my run entry; record at `company/reviews/books-100/2026-10-16-pr5-accessibility.md`, on a branch, not on this disk). History-maps-100: gold `--domain` text flagged lesson-origin `fail` in 100/100 (my run entry; record not on this disk).
- So the founder's would-be-wrong test (more than 20% blocked) is close: expect about 20% on hand-built lessons, until the light-theme text-colour rule is fixed in the kit or pattern.

## Next

platform-engineer: `--record` + version in scan, K-list, 24 px chrome check. Pattern reviewer: "semantic colours are fills, not text".

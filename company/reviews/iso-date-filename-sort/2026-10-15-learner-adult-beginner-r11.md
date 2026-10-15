*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): iso-date-filename-sort
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Compare lexicographic ordering of two explicit date formats.)
Screenshots seen: yes (artifacts/walkthroughs/iso-date-filename-sort/sheet.png, recorded 2026-10-15T21:33:51.677Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "YYYY-MM-DD"; tapped Sort day-first; tapped Use year-first; opened reveal.

1. **This is the most concrete lesson in the set.** Sorting day-first names puts 02-11-2026 (November) before 15-01-2026 (January): you can see it in the right-hand column. That is the real surprise.
2. **Where understanding first broke: nothing flags the wrong order.** After "Sort day-first", the readout says "Order 3", and after "Use year-first" it also says "Order 3". The one number on stage does not distinguish the broken sort from the correct one. I had to read the right-hand column carefully to find the problem; a quick learner would see "3" twice and conclude nothing changed.
3. **The hook gives the answer.** "Day-first names mix months when sorted alphabetically" is printed above the question, and the options are just the two formats.
4. **The reveal does not point at the failure.** "The current result reports 3 order" is unreadable English. It never says "day-first put November 2026 before January 2026". "Fixed-width" is a term I do not have (why zero-padding matters is not shown).
5. After year-first, both columns show the same text, so the second column becomes noise.
6. Recall card ("'05-01-2026' and 'Jan' sort ahead of 2025 as text") is garbled and introduces month names never on stage.

Verdict reason: the only readout ("Order 3") is the same for the wrong and the right sort, and the reveal never names the out-of-order file, so the learner can miss the whole point.

## After reading the brief (meta.json)

- Objective "compare lexicographic ordering of two explicit date formats" is visible in the record list, but the only metric ("Order 3") does not differ between the formats (finding 2). A metric like "in date order: no / yes" or "files out of place: 1 / 0" would carry it.
- Recall claim is garbled (mentions 'Jan' and 05-01-2026); route to fact-checker.
- Fix route: demo-builder.

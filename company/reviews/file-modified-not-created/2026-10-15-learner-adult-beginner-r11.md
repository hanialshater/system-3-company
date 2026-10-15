*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): file-modified-not-created
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Distinguish creation and modification date filters.)
Screenshots seen: yes (artifacts/walkthroughs/file-modified-not-created/sheet.png, recorded 2026-10-15T21:36)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Modified date"; tapped Created ≥8, Modified ≥8; opened reveal.

1. **The explore is clear and the best of its kind in this batch.** Created ≥8 lights only new.txt and fades the others. Modified ≥8 lights old.txt as well. Seeing old.txt (created day 1, edited day 9) appear only under Modified is exactly the point: the file I worked on yesterday is not a "new" file. The fading rows make the result legible without reading the counter.
2. **Where it first broke: the prediction matches by wording.** "For recent edits, which field matters? Modified date / Created date." "Edits" maps to "modified" by vocabulary alone. A more honest question uses the life situation: "You edited an old file yesterday and cannot find it. Sorting by which date finds it?" Then "Created" is a real temptation (people do think "newest" means "created recently").
3. **"C1 M9" is terse.** The legend "C=created M=modified" helps; "day 1, day 9" would be friendlier. "≥8" is fine for most adults.
4. **Reveal versus my question.** "A recently modified file may have been created long before; the field must match the question." That answers the practical question. The first sentence ("The current result reports 2 matches. Visible records: old.txt, new.txt.") is filler that pushes the useful sentence down.

Fixes (for the builder):
- Rephrase the prediction as the lost-file situation so that "Created" is a plausible wrong answer.
- Cut the filler sentence from the reveal; say the practical rule (sort by Date modified to find what you worked on) in plain words.

Verdict reason: the stage and reveal work, but the prediction is answered by matching "edits" to "modified", so no belief is at stake; a one-line rewording of the question would fix it.

## After reading the brief (meta.json)

- Objective: 'Distinguish creation and modification date filters.' Delivered on stage (old.txt appears only under Modified). Misconception field is 'Created date', the foil label.
- Closest to launch in this batch: one prediction rewording.
- Fix route: demo-builder.

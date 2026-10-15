<!-- Template for company/reviews/<slug>/<date>-learner-<boundary>[-rN].md
     Owner: evaluation-steward (W-843 ruling, 2026-10-15). Read by tools/publish-ready.mjs.
     Copy from the line "*Simulated learner..." down. Delete these comments. -->

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: <slug>
lesson version: v<N>
boundary: <who this mind is: what it knows, and what it does not>
Screenshots seen: yes (<path to sheet.png, recorded at>) | no ("screenshots not seen": give at most revise)
Verdict: <launch | revise | fatal>

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke ...
2. What the prediction felt like ...
3. Whether the reveal answered the question the learner actually had ...

Verdict reason: <one sentence; the specific finding if the verdict is revise or fatal>

## After reading build.md / meta.json

- ...

<!--
## The two lines the publish loop reads, and nothing else

1. `lesson version: v<N>`: on its own line, N equal to meta.json `version` at the time you walked it.
   Exactly one such line per file. "version reviewed: walkthrough ...", "Lesson v2" or
   "lesson version: 2" (no v) are not stamps: the review then counts for no version.
2. `Verdict: <word>`: a line that starts with "Verdict:", and the word is exactly one of
   - launch: no finding blocks a first-time learner. Notes can go in the findings; "launch with notes" reads as launch.
   - revise: at least one specific finding must be fixed first (name it in "Verdict reason").
   - fatal: the lesson cannot be fixed into teaching this idea (the premise, the claim, or the format is wrong).
   Every "Verdict:" line in the file must give the same word.

Not in the vocabulary, and read as **no verdict** (the lesson is held, and the reason names the word):
"pass" (write launch), "block" (write revise, or fatal if the lesson cannot be fixed), "approve",
"ship", and any heading such as "## Verdict for the current version: launch" or
"Verdict unchanged: revise" (put the word on a "Verdict:" line).

A re-review is a new file (`-r2`, `-v3`, ...) with its own stamp and its own verdict. Do not edit an
earlier review's verdict; a review dated after the current one that the loop cannot read holds the lesson.
-->

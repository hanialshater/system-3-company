*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r5 wave, first learner review): copy-overlaps-itself
lesson version: v2
boundary (from meta.json learner field): knows compressing runs of a repeated letter (the runs-that-grow lesson); does not know that "copy what came before" is how zip files work, or that a back-reference copy can overlap itself.
Screenshots seen: yes (artifacts/walkthroughs/copy-overlaps-itself/sheet.png, 8 frames)
Verdict: launch

## 1. From the artifact

- Predict: "Nothing, there are only 2 letters to copy" is exactly the misconception someone who knows only run-length coding would hold. "'ab' and stops" is a second plausible wrong answer. The locked stage caption ("The decoder copies one letter at a time, from 2 back") gives the mechanism, so a careful reader can reason out the answer. That is a fair prediction, not a leak. The correct option is noticeably more elaborate than the others ("'ababab', making 'abababab'"), which is a small tell.
- Explore: each numbered step adds one letter, with an arc labelled "2 back" from the source box to the new letter. Steps 1-2 say "reading the original letters". From step 3 the source box is a green letter the copy itself wrote, and the caption switches to "reading a letter this copy wrote". That switch is the whole idea, and it is on the stage at the exact moment it happens. I did not need the reveal to understand why 2 letters were enough.
- Reveal: "From step 3 on, it was copying letters it had written two steps earlier" matches what I watched. "That is the idea inside gzip and PNG" is told. It is a reasonable pointer, but nothing on the stage supports it.

## 2. Earlier findings

- No previous learner review exists for this lesson (company/reviews/copy-overlaps-itself/ holds only build.md and a fact-check). Nothing to compare.

## 3. New findings

1. Minor: the correct option's longer wording stands out. Equal-length options (for example "'ab' then stops / 'ababab' / nothing") would remove the tell.
2. Minor: the six numbered step buttons look like a choice rather than a sequence. One "Copy next letter" button would read more naturally. The panel's "1 to 6" covers it.
3. Minor: large empty band above the letters on explore frames.
4. Not a learner issue, but visible to learners: the badge reads DRAFT and the trust link reads "0/4 claims checked" (route to fact-checker; the gzip/PNG sentence is one of the claims a learner sees).
- No FATAL.

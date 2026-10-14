# Learner review: web-bow-tie-reach (adult beginner)

date: 2026-10-14 · reviewer: learner-evaluator (borrowed mind: adult who knows pages link to pages, not that links are one-way in effect) · version reviewed: walkthrough recorded 2026-10-14T08:42Z (phone), first-option path only
Screenshots seen: yes (sheet.png, all 14 frames). A critic's hypotheses, not evidence anyone learned.

**Verdict for this version: pass with notes (revise the reveal stage, not blocking).**

## 1. Findings from the artifact (written before meta.json and build.md)

- **Where understanding first breaks.** It does not break; the prediction is answerable by looking. The locked stage already shows the arrows (faint), so a careful learner can trace A's reach before predicting. "Ignoring direction, 10 are joined" is the only new idea, and it is explained in the question itself. That is fair, but it also hands the learner the number 10 as an option anchor. The three-option set 10 / 7 / 4 has no start that gives 4 (A,B,C,D all give 7; E gives 10), so the 4 is never confirmed or refuted on the stage.
- **Answer visible before predicting?** Partly, and legitimately: the picture is a puzzle the learner can solve. The first tap (A, the very page the question names) shows "reach 7 of 12" and settles the prediction in one tap; taps 2 to 12 are generalisation (left, middle, right). Good, because the learner who said 10 gets disconfirmed on page A and is then sent to E, where 10 is true. That is a nice moment: their number was right for a different start.
- **Told vs shown.** Shown well: filled/ring states, a one-line counter "From G: reach 3 of 12". Told: "nothing leads back to the left, and the right end leads almost nowhere". "Left" and "right" are never labelled on the stage; the learner must map those words to F/E/J and G/H/I themselves. "Core", "in", "out", "tightly linked core, pages that lead into it, pages it leads out to" appear only in the Broder sentence and are not marked anywhere on the picture.
- **Reveal quotes only states reached?** Yes. It cites A, E, G, which the milestone gate forces (one start from each group). Checked in Demo.tsx: the wording is built from the first tap per group. Good.
- **Mismatch.** The reveal frame's stage shows the last-tapped page (L: one dot filled), while the text above it talks about A, E, G. The learner reads "From A you reach 7" under a picture of L. The picture does not support the sentence beside it.
- **Unanswered learner question.** K and L (detached) are tapped, show "2 of 12" / "1 of 12" and are never explained except as "a few detached pieces". The "10 joined" arithmetic (12 minus K, L) is never closed.
- **Positional tell.** The correct option is the middle one (index 1) in every one of these five lessons (see the cross-lesson note in the one-good-link review).
- Not seen: the "Your prediction held" branch. Read in code: same body text with the verdict flipped; the sentence "You said 7" is not special-cased.

## 2. Compared with meta.json (read after section 1)

The brief says the learner does not know links are one-way and the bow-tie shape. The experience matches the first (strongly) and delivers the second only as one told sentence. The objective, "from an OUT page almost nowhere", is shown by I, J, L taps. The objective about "never IN" is not directly tested: no tap shows that from the core you cannot get to E/F/J except by seeing them unfilled; absence is the evidence, which is weak for a beginner. Suggestion: ring or label the IN group on the stage.

## 3. After build.md (read only after sections 1 and 2)

Nothing in build.md answers the reveal-stage mismatch (picture shows last tap, text cites A, E, G) or the unlabelled left/right. Builder's own "Open" line notes the stage resizes between phases. Verdict stands: pass with notes.

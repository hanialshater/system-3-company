*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9, release-build walkthrough): apply-not-quote
lesson version: v2 (meta.json version 2, status review)
boundary: adult-beginner (knows what "ascending" means; has never thought about the difference between being able to recite a rule and being able to use it).
Screenshots seen: yes (artifacts/walkthroughs/apply-not-quote/sheet.png, 6 frames)
Verdict: revise

## 1. From the artifact (written before reading meta.json, build.md or the crit)

- Where I first lose it: the title and hook. "Apply the rule" and "without quoting the rule" use "quoting" in a sense I do not have (reciting it from memory? copying the target?). The lesson never shows a quoted-but-not-applied case, so I never find out.
- The prediction is a definition check, not a prediction. "If all three numbers appear, is every arrangement ascending?" is answered by knowing the word "ascending". It has nothing to do with quoting vs applying. There is no tempting wrong answer for an adult.
- Locked stage shows the answer: the top row of 01-predict is already 2, 5, 9 in order, above an attempt row 9, 2, 5. Then "Try values" changes the top row to 5, 9, 2. The two rows have no labels ("input"? "target"? "attempt"?), the stage title changes from "Local reconstruction" (jargon) to "Rule: ascending", and I had to read the screen-reader caption to know which row I was editing.
- Explore: two swaps and Check give "Match 3/3", green boxes. This shows I can sort three numbers. It does not show the idea in the hook.
- Reveal: tells. "This was not a memory test" and "Matching it requires applying the rule" are statements about the exercise design, not a payoff I saw. It quotes my 2 → 5 → 9 and 3/3 correctly, and both are on stage.
- Amounts check (independent of the crit): no hidden amounts; every number the reveal names is on the stage.
- Recall (answer text from the trust sheet: "Ascending means smallest to largest: 3 < 8 < 12. Quoting the rule is not the same as applying it."): the first half is answerable by anyone who knows the word; it needs the definition, not the lesson. See section 3.
- Phone fit: pass (06-reveal shows the stage and the full reveal).

## 2. Earlier findings, read after section 1

None. This is the first learner review of this lesson (evidence.simulatedLearner was empty).

## 3. After reading meta.json, builder notes and the crit

- Version recorded: meta.json version 2. Boundary in meta.json: knows ["reading short labels and comparing simple counts"]; I used the same, made concrete as an adult beginner.
- meta.json doesNotKnow: 'Apply a stated sorting rule to visible values rather than repeat its wording.' The adult boundary already has this. The lesson has no misconception to correct, so the prediction cannot be wrong for a reason.
- Recall: 'Apply the ascending rule to 12, 3 and 8. Which order is correct?' (12,8,3 / 12,3,8 / 3,8,12), key 2. It follows the patch rules on position and options, but anyone who knows the word 'ascending' answers it without the lesson. It tests the definition, not the quote-vs-apply idea.
- Builder notes: build.md (W-404; Pre-flight v2, W-367) fixed claims and removed an unrendered line. It says the builder did not screenshot the stage. The unlabelled rows and the predict frame with the target row already in order are not addressed.
- Demo crit (company/rituals/records/2026-10-14-demo-crit.md, read after section 1): I found no hidden amounts here, so the 'only totals and formulas' failure does not apply. Its lesson 3 ('ask for the surprising number, not the obvious direction or definition') does apply: the predict is a definition check.
- Verdict: revise.

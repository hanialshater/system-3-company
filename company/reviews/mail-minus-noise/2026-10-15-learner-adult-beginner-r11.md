*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): mail-minus-noise
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Use exclusion to remove an explicitly unwanted term.)
Screenshots seen: yes (artifacts/walkthroughs/mail-minus-noise/sheet.png, recorded 2026-10-15T21:35:47.594Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Topic minus newsletter"; tapped Find train, Exclude newsletter; opened reveal.

1. **Where understanding first broke: the operator is never shown.** "Topic minus newsletter" is the option, but I never see what to type (`train -newsletter`). The buttons are labelled in words. I end the lesson knowing that excluding works but not how to do it.
2. **What the prediction felt like.** None. "Which query removes newsletter matches: minus newsletter, or OR newsletter?" Minus removes; that is what the word means.
3. **Whether the reveal answered my question.** "The second query keeps topic matches that lack the excluded word" is right, then "This local field matcher leaves Gmail's conversation grouping out" is jargon that I could not use. "1 matches"-style grammar recurs ("2 matches" is fine here).
4. The tapped button again does not look selected (frame after "Find train" highlights "Exclude newsletter").

Verdict reason: the prediction cannot be got wrong and the search syntax the hook implies is never shown; show the typed query and ask what a beginner would get wrong (e.g. how many results remain, or whether "-" also drops "train draft").

## After reading the brief (meta.json)

- doesNotKnow "use exclusion to remove an explicitly unwanted term": the concept is shown, but the operator a learner would type is not, so "use" is not exercised.
- Fix route: demo-builder (typed query on stage; reveal wording without "local field matcher").

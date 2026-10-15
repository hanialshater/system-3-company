*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): mail-exact-phrase
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Distinguish an exact phrase from two unordered words.)
Screenshots seen: yes (artifacts/walkthroughs/mail-exact-phrase/sheet.png, recorded 2026-10-15T21:35:39.345Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Same adjacent words"; tapped Both words, Exact phrase; opened reveal.

1. **Where understanding first broke: I never see a search.** The lesson is about quoting a phrase in mail search, but no query appears anywhere. The buttons are "Both words" and "Exact phrase"; I never see `blue folder` versus `"blue folder"` typed into a box, so I would not know what to type tomorrow.
2. **What the prediction felt like.** Given away. The hook ("'Blue folder' and 'folder is blue' do not contain the same exact phrase") is the answer to "what does a quoted phrase require?". "In this fixture" is jargon.
3. **Whether the reveal answered my question.** It states the rule ("a quoted phrase matches an adjacent sequence"). "The current result reports 1 matches" is ungrammatical and reads like a log line.
4. The tapped button does not look selected: after tapping "Both words" the stage highlights "Exact phrase".

Verdict reason: the hook states the answer and the stage never shows the quoted query a learner would type; show the two queries and ask how many messages each finds.

## After reading the brief (meta.json)

- doesNotKnow "distinguish an exact phrase from two unordered words" is stated by the hook before the prediction. Fix route: demo-builder (show the typed queries; move the hook's example into the stage).
- The "1 matches" grammar and the selected-button styling look like shared template issues across the mail lessons (see mail-minus-noise, mail-or-vs-and).

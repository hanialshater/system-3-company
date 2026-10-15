*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): pillowcase-set-kit
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: The example counts separate locations, not seconds. Keeping the chosen set’s pieces together replaces multiple location visits with one, while separating unlike sets can preserve identification.)
Screenshots seen: yes (artifacts/walkthroughs/pillowcase-set-kit/sheet.png, recorded 2026-10-15T21:32)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Scattered pieces"; after lock-in the stage showed Location visits 3; tapped One set kit (1); slid Locations to 6 (still 1); opened reveal. (The recorded sheet starts after the first tap. I checked the lock-in state in a separate browser probe of the same build: "Location visits 3".)

1. **The core contrast is visible:** 3 visits scattered, 1 visit as a kit. The reveal says it plainly ("replaces multiple location visits with one") and is honest that it counts places, not seconds, and that grouping is a trade-off.
2. **Where understanding wobbled: "Set=3 pieces · 4 places".** Three pieces in four places made me ask whether one place is empty, or why the count is 3 and not 4. The stage never says. Sliding Locations to 6 in kit mode changes nothing I can read (1 stays 1), so the slider feels broken.
3. **Selected-state styling is inverted:** the current mode is grey and the other is white, so after tapping "One set kit", "Scattered pieces" looked selected.
4. **The prediction is close to self-answering** ("fewer container visits for a complete set" → the kit). There is little surprise, but the hack is shown honestly.
5. The "separating unlike sets can preserve identification" half of the reveal is not shown on stage.

Notes (not blocking):
- Say what the extra places hold (other items), or tie the slider to pieces per set so it moves the scattered count.
- Show both counts in the reveal sentence.

Verdict reason: the reveal answers the learner's question (3 visits vs 1) with numbers seen on stage; the slider and styling issues are notes.

## After reading the brief (meta.json)

- The model in the trust sheet is "scattered visits = min(locations, 3)", which explains 3 visits with 4 places. The stage should say this (finding 2). The "separating unlike sets" half of the objective is reveal text only.
- Fix route: demo-builder (notes only).

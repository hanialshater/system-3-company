*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): labels-specific-address
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: A broad category may include several boxes. A unique box address specifies one location in the pictured system; category and location labels answer different questions.)
Screenshots seen: yes (artifacts/walkthroughs/labels-specific-address/sheet.png, recorded 2026-10-15T21:34:36.555Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Broad category"; tapped Unique box address; slid Count 8 -> 10; opened reveal.

1. **No real prediction.** "Which label narrows this search to one box?" with "Unique box address" as an option answers itself.
2. **Where understanding first broke: I never see a category.** The label says "2categories · 8boxes", but the drawing shows plain numbered boxes with no category labels or colours. I could not see which boxes a category covers.
3. **The category count is never shown.** "Candidate boxes" reads 1 and 1. The 4 (then 5) candidates under a broad label never appear, so the slider does nothing I can see.
4. The reveal sentence "category and location labels answer different questions" is the right idea, but it is told. A beginner's question is "isn't 'Cables' good enough?", and the answer (it still leaves four boxes to open) is only implied.
5. Recall card says "a category still covers 5 boxes"; the stage had 8 boxes in 2 categories (4 each) until I moved the slider. Button highlight stuck on "Broad category".

Verdict reason: the stage never shows categories or the broad-category candidate count, so the difference between a category and an address is told, not seen.

## After reading the brief (meta.json)

- Objective is the reveal sentence. Claim c3: candidate boxes = ceil(N/2) for a category; the stage never displays that value or draws the categories (findings 2-3).
- Recall says 5 boxes; at the default 8 boxes it is 4. Route to fact-checker.
- Fix route: demo-builder.

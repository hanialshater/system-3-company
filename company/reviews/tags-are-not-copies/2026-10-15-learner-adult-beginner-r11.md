*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): tags-are-not-copies
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know Distinguish multiple labels from separate document identity.)
Screenshots seen: yes (artifacts/walkthroughs/tags-are-not-copies/sheet.png, recorded 2026-10-15T21:34, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "One"; tapped Count links (3), then Count identities (2); opened reveal.

1. **Where understanding first broke: the reveal's number does not match my answer.** I answered "One" to "How many underlying documents have two labels?" and was told "Your prediction held". The next sentence is "The current result reports 2 identities." I had to stop and work out that 2 is the number of distinct documents (doc-1 and doc-2), not the number with two labels. A beginner may think they were right by accident.
2. **The prediction is easy once the list is visible.** doc-1 appears twice with "work" and "study". Counting it takes two seconds, so there is no real trap. The belief the hook aims at ("tagging a file twice makes two copies") is never tested: nothing on stage edits doc-1 under one tag and shows the change under the other.
3. **"Links", "identities" and "fixture identifier" are database words.** "3 links, 2 documents" would be enough.
4. **The selected button looks reversed** (after Count links, "Count identities" was the white raised button).
5. **The reveal's last sentence is the real point** ("multiple category links need not create separate copies with diverging contents"), but the stage never shows contents at all, so "diverging" is abstract.

Fixes (for the builder):
- Let the learner edit doc-1 under "work" and see the same change under "study"; compare with a real copy that does not change.
- Report the answer to the question asked ("1 document has two labels; 2 documents in total").
- Plain words for links and identities.

Verdict reason: the reveal reports "2 identities" to a learner who answered "One" correctly, and the stage never shows that a tagged file stays one file when edited.

## After reading meta.json

- Misconception field is "Two" (the wrong option). Objective "distinguish multiple labels from separate document identity" is stated in the reveal, but the stage never shows identity in action (an edit seen through both tags), which is what would make it more than a count (finding 2).
- Fix route: demo-builder (reveal number, an edit-through-both-tags interaction, plain words).

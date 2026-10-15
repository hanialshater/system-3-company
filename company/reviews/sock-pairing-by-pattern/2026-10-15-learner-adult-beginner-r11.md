*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): sock-pairing-by-pattern
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know Sorting the pictured socks by pattern shrinks the candidate pool for a match. The model counts candidates; it does not claim a measured time saving or guarantee that both socks are present.)
Screenshots seen: yes (artifacts/walkthroughs/sock-pairing-by-pattern/sheet.png, recorded 2026-10-15T21:33, build f1832fa on localhost:3591, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "One mixed pile"; tapped Two pattern bins; slid Socks from 6 to 10; opened reveal.

1. **Where understanding first broke: the pictures look swapped.** On the predict screen, labelled "One mixed pile", the six socks sit in two neat columns that look like two bins. After I tapped "Two pattern bins", they turned into one long row of six. I read the first picture as the sorted one.
2. **I never saw the mixed pile's number.** The panel sends me to "the second layout", so I saw Candidates 2 (6 socks) and 4 (10 socks) for the bins only. The mixed-pile number (5 or 9 others to search) never appears, so "fewer" has nothing to be fewer than.
3. **"Candidates" is not explained.** I guessed it means "socks I have to check to find this one's partner". 2 for 6 socks in two bins works out under that guess, but I had to work it out.
4. **The prediction has little tension.** That sorting first shrinks the search is what most adults expect. The more interesting point in the reveal ("extra bins add setup work") is never shown.
5. **The selected button looks reversed** ("One mixed pile" white while the bins were showing).
6. **Does the reveal answer my question?** Partly: "sorting shrinks the candidate pool" is the answer, but "The current two pattern bins setting gives 4" reports one number without the comparison.

Fixes (for the builder):
- Show both candidate counts together (mixed: 9, bins: 4 at 10 socks).
- Draw the mixed pile as a jumble and the bins as two labelled groups.
- Say what "candidates" means on the stage.

Verdict reason: the stage never shows the mixed-pile count and its pictures read the wrong way round, so the reveal's "gives 4" cannot show that bins reduce the search.

## After reading meta.json

- The misconception field is the generic template line ("the two pictured methods are interchangeable without checking their mechanism or constraints"), and the learner doesNotKnow is the reveal paragraph copied in. Neither names a belief a beginner actually holds, which matches finding 1: the prediction has no real trap.
- Fix route: demo-builder (show both options' results side by side, fix the selected-button look, reveal wording); Life Hacks category manager for whether the brief names a real beginner belief.

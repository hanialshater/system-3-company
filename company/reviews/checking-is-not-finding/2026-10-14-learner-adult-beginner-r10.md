*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): checking-is-not-finding
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows the number of choices multiplies fast; does not know that checking a proposed answer can take one step while finding one, or proving none exists, can mean trying every group, and that this gap is the P versus NP question)
Screenshots seen: yes (artifacts/walkthroughs/checking-is-not-finding/sheet.png, recorded 2026-10-14T18:52)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "6"; tapped Check 4 + 5, Search for 9, Search for 13, Add a 7th number, Reset; opened reveal.

1. **The prediction is fair** and "6" (one try per number) is a real beginner answer. The panel guides each step, which keeps the order clear.
2. **The check/find/prove contrast lands.** "check: 1 · find 9: 21 · prove no 13: 64" in the trace is a clean three-number story, and the square grid filling dark to 21, then to all 64, makes the work visible.
3. **Where I first needed an idea I lack: "GROUPS 64".** It appears after my first tap with no reason. My boundary knows choices multiply, but nobody tells me the choice here is "each number in or out", so I cannot see why 6 numbers make 64 groups (and not 15 pairs, or 6). This is the crux of the question I was asked, and the reveal also skips it. "Add a 7th number → 128" hints at doubling, which helps a learner who is already looking for it.
4. **A sharp beginner will object to "prove no 13: 64".** 34 and 12 are already too big (12 needs a 1), so I only have to look at groups of 3, 4, 5, 2, which is 16, and the largest is 14. So for this list a shortcut exists, and the stage's "had to try all 64" looks false to me. The reveal's general sentence ("nobody knows a method that always finds one") is careful, but the stage teaches "proving none means trying all", which this example contradicts. Picking numbers without an obvious shortcut, or saying "trying every group, the plain way", would avoid it.
5. **Fit:** the reveal opens after Reset, so the grid is empty and the dark squares the reveal describes are gone; only the trace line carries 21, 64, 128. Readable, but the picture does not show what the words say.
6. Trust link "0/4 claims checked" (fact-checker's lane).

Fixes (for the builder):
- Say why 64 on the stage: "each number in or out: 2×2×2×2×2×2 = 64 groups".
- Choose a list where no quick shortcut rules out 13, or frame the search as "trying every group, one by one".
- Keep the last search's grid on stage when the reveal opens.

Verdict reason: the answer the learner is asked for (64) is never derived, and the example invites a correct objection to the lesson's central "proving none means trying all".

## After reading the brief (meta.json)

- doesNotKnow says "can mean trying every group". Finding 4 is about that "can": the stage says it does, for an instance where it need not. The P vs NP sentence itself reads as accurate to me.
- Fix route: demo-builder; finding 4 may also be a cm-computer-science framing call.

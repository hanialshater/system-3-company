*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): each-element-pops-once
lesson version: v5 (meta.json version 5)
boundary: adult-beginner. Knows a stack is last-in-first-out (back-button-stack); does not know that a stack of still-waiting values answers "next bigger to the right" in one pass (meta.json learner field, same boundary as r6/r7).
Screenshots seen: yes (artifacts/walkthroughs/each-element-pops-once/sheet.png, build 5, 4 frames; frame 04-step-3.png opened at full size)
Reveal seen: no. The walkthrough reports "The reveal never unlocked during this walkthrough."
Verdict: revise

## Findings (written from the walkthrough, before build.md)

Walked the phone transcript and sheet.png. Chose option 1 ("36").

1. **The reveal never opened on the QA path, so I cannot judge it.** The path was Next number, All the rest, (chip "9 8 … 1" disabled), chip "8 … 1 9". Frame 04, taken 1.2 s after the last press, is mid-replay: the 9's row reads "3 pops", "Stack: 10", 5 boxes still waiting, and the 8 … 1 9 card still says "scan ? · stack ?". The reveal button still says "Try it first". The milestone this lesson is built around (the 9's eight pops) is reached only when a multi-second replay finishes, and there is no further action on the path. demo-standard: "A milestone that needs an animation to finish must be reachable within that wait [about 450 ms], or be reached by a step button." Here it is reached by a chip-triggered replay. None of the four reveal rules (quotes what you saw, shows the why, fits with its picture at 90 words, no stale state) can be checked on this build.
2. **What I could see of the pops is the r7 fix working.** Frame 04 is a genuinely visible intermediate state: 1, 2, 3 have left the stack, 4–8 are still boxes, the 9's row has 3 solid ticks labelled "3 pops", and 3, 2, 1 show "9✓". A beginner can watch "each waiting number popped once" happen. The pop/stop legend beside "Stack:" now tells solid from hollow; the hollow ticks are thicker and legible at phone size.
3. **No answer before the commit: met.** Options 36 / 18 / 8 are all bare numbers; the locked stage shows "?" in every slot and "scan ? · stack ?". The legend is two sample ticks with no count.
4. **Labels readable:** stage labels (row digits, "3 pops", "9✓", legend) are small but readable in the full-size frame. No reveal frame exists, so the W-287 reveal-time label shrink could not be checked.
5. **Carried over (judgment call, not a revise):** the predicted case 9 8 … 1 has 0 pops, so the question itself never exercises popping (r7 finding 1). Builder routed it to the learning designer.

Where understanding first broke: the question stem is still a procedure I cannot run in my head ("each new number pops the smaller ones on top, then is pushed"); I guessed. Explore then made it concrete.

## After reading build.md (Pre-flight v5)

Pre-flight 5 says the chip replay takes "about 2.7 s, pops-seen at the end, inside the reveal button's 5 s wait". That relies on Playwright's default expect timeout in the QA contract, not on the standard's 450 ms per-press wait or a step button. The walkthrough tool checks the reveal button immediately after the last frame, which is how this run missed it. Whether the reveal would open for QA is therefore likely yes; for this review it is unseen. The pre-flight reveal text pasted in build.md (about 75 words in the first paragraph plus a second paragraph) cannot be fit-checked from a builder quote.

**Top finding (revise, earn-the-reveal / QA path):** on the QA path the pops-seen milestone fires only at the end of a ~2.7 s replay started by chip "8 … 1 9", with no step button after it; the walkthrough's reveal never unlocked, so the reveal was not seen. Make pops-seen reachable within the 450 ms per-press wait on the DOM-order path (for example, put the step path to the 9's pops on controls that come first, or fire the milestone on the replay's first pop frame and record values then), so a walkthrough can capture the reveal. Separately, the walkthrough tool could wait on the reveal button like contract.spec.ts does (board item, tooling).

| r7 finding | Status |
|---|---|
| Revise: pops too fast to see (22 ms frames) | fixed as far as visible: frame 04 shows a held mid-pop state ("3 pops", 5 boxes left) |
| Hollow vs solid ticks hard to tell apart | fixed: thicker hollow stroke and a pop/stop legend |
| Predicted case has no pops | not changed; routed to learning designer (judgment call) |
| "n, not n²" told | not checkable (reveal unseen) |

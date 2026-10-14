*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): two-flips-slip-by
lesson version: v2
boundary: adult who knows bits are 0 or 1 and what even and odd numbers are; doesn't know how a parity check bit is chosen or tested.
Screenshots seen: yes (artifacts/walkthroughs/two-flips-slip-by/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: the question now says how the check bit is set ("so the number of 1s is even") and how the receiver tests it. The hook ("Two bits flip in transit. What does the check say?") is neutral. "Always" is the tempting answer, and "only if next to each other" is a real alternative. The locked stage shows the 8 boxes and "–" readouts. No leak.
- Explore: each tap flips a bit (red box), and the big circle alternates ERROR / OK as the "1S RECEIVED (EVEN PASSES)" readout goes 3, 4, 3, 2, 3, 2, 3, 4 while MESSAGE reads "changed". The readout label now says what is being checked. "Flip bits 1 and 6" puts two far-apart bits on screen: 2 ones received, OK, message changed. That refutes the "next to each other" option on stage. "Show me why" unlocked only after it.
- Reveal: it lists exactly the flips I made, then gives the even/odd switching argument the readout had already shown. I got "two flips put the count back to even, so the check passes on a wrong message" from the stage before reading it.

## 2. Earlier findings (v1 review)

1. Parity and the checked count not explained on stage: **fixed** (the question defines it; the readout is labelled "EVEN PASSES").
2. Non-adjacent flips never shown: **fixed** ("Flip bits 1 and 6" is required).
3. Hook phrasing leaked: **fixed**.
4. CRC aside: **fixed** (removed).
5. Check bit never shown being computed: still only stated in the question; acceptable for this boundary.

## 3. New findings

- Minor: "message: four 1s" stays under the row while I can see two or three 1s. It describes the message as sent, but a beginner may read it as a live count. "sent with four 1s" would be clearer.
- Minor: the label "1S RECEIVED (EVEN PASSES)" is dense; it works but takes a second read.
- Minor: on this path the stage at the reveal is reset to intact (after Undo flips).
- No FATAL.

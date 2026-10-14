*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): gray-code-one-flip
lesson version: v1
boundary (from meta.json learner): can count in binary (has done "Eight switches"); does not know that a counting order exists where only one bit changes per step; has never seen XOR or a shift operator.
Screenshots seen: yes (artifacts/walkthroughs/gray-code-one-flip/sheet.png)
Verdict: launch

## 1. From the artifact

- Hook and predict: "Can you count 0 to 7 flipping just one bit per step?" plus "Gray code is ..." leans toward "yes, 1". The real test is the total (7 against 11), and that still needs thought, so this is minor. The locked stage shows row 0 (000 / 000) and "Total flips: 0". Nothing leaks.
- Where understanding first broke: the formula "g = n XOR (n >> 1)" in the question and on stage. At this boundary XOR and ">>" are unknown words, and nothing on stage shows the formula working: no row shows n, n shifted, and the XOR. The learner can ignore it and still get the idea from the lamps, but it costs words in the question (now about 45) and some confidence at the start.
- Explore: "Next number" adds a row; "Count to 7" fills the rest. Each row shows binary and Gray lamps side by side. The lamps that changed are ringed, and each side has a flips column. Row 4 is the one that matters: binary 100 has three ringed lamps and "3"; Gray 110 has one ring and "1". Totals: 11 against 7. The Gray flips column is all 1s, so "one per step" is visible, not told. Good: one table, both codes, and the answer can be seen at a glance.
- After "Count to 7" both buttons are disabled. That is fine; there is no reset, but none is needed.
- Reveal: it quotes only what was seen (011 to 100, 010 to 110, 11 and 7). The rotary-encoder paragraph is told context outside the gap, and it is one claim. It ends on the idea.
- Trust sheet shows 0/5 claims checked (draft). That is for the fact-checker, not a learner finding.
- No FATAL.

## 2. After reading the brief

No earlier learner review exists, so there are no earlier findings to track.

- doesNotKnow (a one-bit-per-step order exists): shown, as the Gray flips column of all 1s plus ringed lamps. It meets the told-vs-shown rule.
- The objective quotes the XOR formula, but it asks the learner to explain the one-bit property, not the formula, so the told formula is context. It is still the main friction for this boundary (minor): XOR and >> are jargon the boundary cannot read, and the stage never shows them working.
- Misconception (several bits must change at some step): row 4 shows it false directly.

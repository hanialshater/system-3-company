*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): clear-the-lowest-one
lesson version: v2
boundary: knows that bit masks keep or clear named bits (mask-the-flags); has never seen x & (x − 1); thinks of "minus 1" as a last-digit change, as in decimal. (Same boundary as r6.)
Screenshots seen: yes (artifacts/walkthroughs/clear-the-lowest-one/sheet.png, walkthrough against build 4 at localhost:3480)
Verdict: launch

## 1. From the artifact (written before reading r6 or the brief)
- **Locked stage is clean.** Before commit I see the three rows x / x − 1 / AND for 10110 (22 / 21 / 20), REPEATS 0 and "Press x = x & (x − 1) and watch the three rows." No ones count and no mechanism caption. The rows do let me work out one step (10110 → 10100) if I want to, but that is simulating, not being told the count. Hook ("What does the count of repeats measure?") does not point to an option. Options are all "number, one per X", same precision.
- **The why is on the stage.** After one press: green marks the bits x − 1 changed, red marks the bit the AND cleared, and the caption says so. At 10100 the green run of three (10100 → 10011) is the frame that breaks "minus 1 changes the last digit". 
- **The pattern is on the stage.** "Repeat until 0", "Run from 10000" and "Run from 11111111" each add a line to a finished-runs list: "10110: 3 repeats, 1 bits: 3 / 10000: 1 repeat, 1 bits: 1 (power of two) / 11111111: 8 repeats, 1 bits: 8". Three cases, repeats always equal the ones. I get the idea from the stage without the reveal.
- **Reveal** ("Not quite: it was '3, one per 1 bit'") answers my wrong guess (one per position) with the chain I watched, then the mechanism, then the power-of-two test pointed at the 10000 run I made. About 100 words. Ends on the idea.
- Minor (quotes what you saw): the reveal names the chain 10110 → 10100 → 10000 → 0 and "10100 − 1 = 10011". When the reveal opens, after the bit taps the stage shows 11101001 and the runs list. The counts 3 / 1 / 8 are still visible; the chain and the 10011 row are not. They were seen on the required path, so it reads true, but the stage no longer shows them.
- Minor: the readout label "1 bits: 3" reads awkwardly; "ones: 3" would parse faster.
- Minor: "5, one per bit position" is ambiguous when the stage draws 8 cells (00010110). A learner who counts cells could expect 8.
- No fatal flaw.

## 2. Earlier findings (r6), read after section 1
| r6 finding | Status |
|---|---|
| Locked stage gives the answer ("1 BITS IN X: 3" readout, mechanism caption) | fixed: neither shows before commit |
| Power-of-two test told, not shown | fixed: "Run from 10000" preset, "(power of two)" label, reveal points at it |
| 255 quoted but not visited | fixed: "Run from 11111111" is on the path and in the runs list |
| Hook asks a different question from the predict | fixed: hook now asks what the count of repeats measures |
| Bit cells not obviously tappable | fixed: "Tap a bit of x to flip it." |
| 2^30 / shifting right in the last sentence | fixed: dropped |

## 3. Against the brief
Boundary and version read from meta.json (learner field, version 2) only after section 1. Not read: build.md.

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): cafe-is-five-bytes
lesson version: v2
boundary: adult beginner who knows ASCII maps characters to numbers and a byte holds one small number; has never heard of UTF-8 or hex.
Screenshots seen: yes (artifacts/walkthroughs/cafe-is-five-bytes/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: "4" is the natural guess for someone who thinks one character is one byte, and the hook ("Does every character get the same amount of room?") raises the question without answering it. The locked stage is empty with "–" counters. No leak.
- Explore: c, a and f each add one code box and the counters stay level (1/1, 2/2, 3/3). é adds two boxes (C3 A9) and the counters split: 4 characters, 5 bytes, captioned "café: 4 characters, 5 bytes." 世 adds three boxes and 😀 four, so the pattern of 1, 2, 3, 4 bytes is visible as box groups.
- Reveal: it repeats exactly what I built. I got "bytes ≠ characters; some characters take more room" from the boxes before reading it.

## 2. Earlier findings (v1 review)

1. "1 of 12" counter unexplained and hints later characters are big: **not fixed** (still "1 of 12" ... "12 of 12").
2. Byte codes are hex with no label; "63" for c reads as decimal (a learner who knows ASCII c = 99 may stall): **not fixed**.
3. Why é needs two bytes is not shown: unchanged, still acceptable for 60 s.
4. Empty grey space above the word in early frames: **not fixed** (minor).

## 3. New findings

- Minor: the hex issue matters a bit more for this boundary, since the learner knows ASCII codes and may know c = 99. A small "hex" label on the code row would remove the snag.
- Minor: "of 12" is still unexplained.
- No FATAL.

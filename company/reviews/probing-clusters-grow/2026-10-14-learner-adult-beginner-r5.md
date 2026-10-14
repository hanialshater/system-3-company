*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): probing-clusters-grow
lesson version: v2
boundary: an adult beginner who knows "a table of numbered slots"; has never heard of hashing or probing; assumes random means even.
Screenshots seen: yes (artifacts/walkthroughs/probing-clusters-grow/sheet.png, 5 frames, phone viewport)
Verdict: launch

## 1. From the artifact

- Predict: the locked stage shows only the ten slots (2, 3, 4, 7 dark) and "Which empty slot will catch the next key?". There are no odds on screen. "All equally likely" is a real, tempting guess for someone who thinks random means even.
- Explore: after the first key ("Key 1 hashed to 7, full: walked to 8 (2 probes)", with an arrow) the band appears under the slots: 1/10, 1/10, **4/10**, 1/10, 3/10. Slot 5's 4/10 is plainly the biggest, and I can see why: the band spans 2 to 5. "Until a run of 5 or more" then merges runs and the band becomes 8/10. That is the clearest moment: the run swallows the odds. The key log ("7→8 (2), 3→5 (3), 2→6 (5)") shows every hash the reveal later quotes.
- Reveal: "slot 5 caught keys hashing to 2, 3, 4 or 5: 4 in 10" matches what I saw. "Your 2nd and 3rd keys hashed to 3 and 2" is now in the log. The term "primary clustering" comes after the experience.

## 2. Earlier findings (v1 review, 2026-10-14)

1. Band with n/10 labels printed on the locked stage gave the answer away: **fixed** (the stage is bare until a key is inserted).
2. Reveal quoted key 2's hash, which was never shown: **fixed** (key log).
3. "Until a run of 5" overshooting to 7 read as a bug: **fixed** (renamed "Until a run of 5 or more").

## 3. New findings

1. Minor: "Slot 8 caught 2 in 10" in the reveal is told. The band first appears after key 1 has already filled slot 8, so the starting odds for the two named options are never on screen together. Showing the band for one beat before key 1 lands (after lock-in) would let me compare 4/10 with 2/10 myself.
2. Minor: wrap-around is never mentioned. The stem says "moves right to the next free one", yet "Key 6 hashed to 6, full: walked to 1" lands on the far left while the arrow points right. A beginner may read it as a bug. "(wraps to slot 0)" in the message would fix it.
3. Minor: the key numbers drawn inside the slots (1, 2, 3...) sit next to the slot indices (0-9). "Key 3 ... walked to 6" with a "3" drawn in slot 6 takes a second read.
- No FATAL.

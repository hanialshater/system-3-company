*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): binary-fingers
lesson version: v3
boundary: adult-beginner (knows base-ten place value and doubling; counts on fingers to ten; has never met binary).
Screenshots seen: yes (artifacts/walkthroughs/binary-fingers/sheet.png, 15 frames)
Verdict: launch

## 1. From the artifact

- Predict: ten blank fingers, readouts "?", neutral hook. 10 / 100 / 1024. A real gut call; nothing leaks.
- Explore: "+1" raises finger 1 ("1 = 1") and lights the first cells of a 1024-cell grid ("one cell per number, 0 (top left) to 1023 (bottom right)"). "Count to 16" ticks through to 16 with the caption "0 to 15 used the four right fingers: 16 numbers. Finger 16 starts them all again." The first row of the grid fills cell by cell, with no gaps. "All down" → 0. Then raising 512, 256 ... 1 one at a time gives 768 = 512 + 256 ... "10 fingers up: 1023", and the last cell (bottom right) lights. NUMBERS MADE runs to 27. The gate opens after all ten are up.
- Coverage is now visible: the grid shows that each new count lands in its own new cell, and that all ten up is the last cell. The doubling has a stand-in at 16: four fingers made 16 numbers, then the fifth starts them over. A beginner can carry "one more finger, the whole run again" from that one moment.
- Reveal: points at what was seen (each pattern lit its own cell, 0 … 16 none skipped, 1023 the last cell, "You lit 27 of them", "At 16, the four right fingers had made all of 0 to 15"). Ten doublings and "that is binary" are a short told generalisation from the shown case.
- Minor: the grid cells are tiny on a phone. The lit cells read as a thin blue line plus a few dots, and the black "current" cell is hard to find. Larger cells (for example 32 × 32 with bigger squares), or a zoomed first row, would help.
- Minor: only 0–16 is filled contiguously. "Every number from 0 to 1023" is still a step past the evidence, but the restart-at-16 caption makes the step reasonable.
- Minor: some empty band remains under the grid.

Told vs shown check (brief): doesNotKnow "n two-state places count 2^n numbers". The doubling cause is shown once (16 numbers from four fingers, then restart) and the endpoint (1023, last cell) is shown. Enough for launch.

## 2. Earlier findings (r5 review, v2)

1. The range "0 to 1023, each exactly once" was told, not shown: **fixed** ("+1", "Count to 16" and the 1024-cell grid).
2. Doubling argument told: **fixed** (the "Finger 16 starts them all again" caption at 16; the reveal points at it).
3. "You made 10 different numbers" supported the wrong answer: **fixed** (now "You lit 27 of them" on a grid of 1024).
4. Large empty stage: **partly fixed** (the grid fills most of it; a smaller band remains).

## 3. New findings

- Minor: grid legibility on a phone (above).
- Minor: one more doubling moment (for example "Count to 32" or a caption when finger 32 first rises: "0 to 31: 32 numbers") would make "each finger doubles" seen twice rather than once.
- No FATAL.

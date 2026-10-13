# Build note: four-words-beat-eight-letters (demo-builder, 2026-10-13)

- Design intent: two cards, letters (26 each) and words (2,048 each), each with a slider under it. Each card shows the exact count (BigInt with commas), a bar whose length is the count's number of digits (a log scale, said on the stage as "Bar = number of digits"), and "try all" time at a stated 10 billion guesses a second. Counts, bars and times are hidden while locked. The card that is ahead is outlined.
- Key state: both sliders moved, and the order flipped (letters beat words, or words dropped below 4). Milestones ["letters", "words", "overtake"], minInteractions 3. QA path: the letters slider +2 (10 letters: 141,167,095,653,376 > 17,592,186,044,416, so overtake), then words +2 (6 words, 234 years). The reveal quotes the start (the question's numbers, which are on the stage before any move) and the learner's own overtake sentence.
- Numbers: every count and time comes from count()/timeText() in Demo.tsx. Re-computed in Node: 26^8 = 208,827,064,576; 2048^4 = 17,592,186,044,416; ratio 84.2; 20.9 s; 29.3 min.
- Retitled: the slug gives the answer; title "8 random letters or 4 random words?".
- After screenshots: reads on phone. 23-digit counts fit on one line at 0.8rem. No changes.

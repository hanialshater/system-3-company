*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): temperature-reshapes
lesson version: v3
boundary: adult beginner; knows a language model gives each next word a chance, and percentages; has never seen softmax or the temperature setting; thinks "hot" = "more creative".
Screenshots seen: yes (artifacts/walkthroughs/temperature-reshapes/sheet.png, 5 frames)
Verdict: launch

## 1. From the artifact

- Predict: scores 2 / 1 / 0, mat 66.5% at temperature 1, options 87% / 67% / 50%. The locked stage shows the temperature-1 bars (66.5 / 24.5 / 9.0) and a "2÷1=2" column. Nothing points at 87%; the question already gives 66.5%.
- Explore: the panel says "Press 0.5, then 4". Cool 0.5 shows "2÷0.5=4 / 1÷0.5=2 / 0÷0.5=0" under the words, mat 86.7%, and 20 dots (17 · 3 · 0). Hot 4 shows "2÷4=0.5 / 0.25 / 0", bars near even (41.9 / 32.6 / 25.4), and dots 6 · 9 · 5. Frame 03 (after 0.5 and 1) still says "Try it first", so the gate needs the hot visit. The same three words are on stage in every frame.
- What the prediction felt like: a real choice. "Still 67%" is the guess of someone who thinks temperature only matters for creativity, and "About 50%" is the guess of someone who thinks lower means calmer.
- Reveal: every number it quotes (86.7%, 4/2/0, 0.5/0.25/0, 41.9%, my 17·3·0 and 6·9·5) was on stage. "Doubling the gaps" points at the divided-score column I just watched. "The menu never changed" points at the three fixed rows. The hook's question (creative or less picky?) is answered by the hot frame: moon is picked 5 times, but it is still only moon.
- Where I could still slip: the formula "chance ∝ e^(score ÷ temperature)" is told. That is fine for this boundary: the stage shows that the divided scores drive the bars, and the exponential is context.
- Minor: at temperature 1 the draws came out 15 · 2 · 3 (moon above sofa). It is honest noise, but a beginner may stare at it. The reveal does not quote it, so it costs little.
- Minor: "20 draws at 4: 6 · 9 · 5" has no word labels; the coloured dots under each bar carry them.

## 2. Earlier findings (r5, v2)

1. Never saw temperature above 1; the hot half was told: **fixed** (Hot 4 is in the path and the gate needs it).
2. Drew only at temperature 1: **fixed** (each press draws 20, and the reveal quotes the 0.5 and 4 draws).
3. "Dividing by 0.5 doubles the gaps" told, divided scores not shown: **fixed** (a score ÷ T column under each word).
4. Reveal's last line clipped: still **fixed**.
5. "About 87%" oddly specific next to round options: unchanged, minor.

## 3. After reading the brief

- doesNotKnow: "what the temperature setting does" is shown (bars and draws at 0.5 / 1 / 4). "Softmax" is shown through the divided-score column feeding the bars; only its exponential form is told, in one claimed sentence (c2). Objective ("rescales the same scores ... never adds a word") is stood for by the ÷T column and the fixed three rows. Show-the-why rule: met.
- Trust sheet: c3, c4, c6 and c9 are UNVERIFIED (reopened in v3). That is a fact-checker gate, not a learner finding.
- No FATAL.

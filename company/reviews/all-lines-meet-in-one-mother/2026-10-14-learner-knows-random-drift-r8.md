*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): all-lines-meet-in-one-mother
lesson version: v2
boundary: knows-random-drift (from meta.json learner: knows everyone has one mother and knows random drift; does not know that tracing mothers back, all lines must merge into one woman after about 2N generations, and that she had many contemporaries)
Screenshots seen: yes (artifacts/walkthroughs/all-lines-meet-in-one-mother/sheet.png and 07-reveal.png, build 5)
Verdict: revise

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "They never all meet"; slider right to 2 (23 lines); Back 10 generations (12 back: 9 lines); Back until one line (99 back: 1 line, "common mother", "+ 49 others"); Run 1,000 families (all met, mean 96); Same with 25 and 100 women (46 / 96 / 197); opened reveal.

1. **The merge is shown.** 50 → 23 → 9 → 1 line as the slider goes back, and joined lines visibly never split. For someone who guessed "never all meet", "1,000 runs: all met" is a strong answer, and so is the histogram with "yours" marked.
2. **No answer before the commit: passes.** The options are plain sentences at the same precision. The locked tree is empty, and its axis marks (50, 20, 5, 0) do not mark "1".
3. **The reveal does not fit with its picture (revise).** In 07-reveal the whole family tree is above the card, including the "common mother" dot and "+ 49 others". Only the histogram and controls remain. The reveal's last paragraph ("She was not alone: 49 other women lived beside her") points at "+ 49 others", which is off screen. "Joined lines never split" also points at the tree. The reveal is about 93 words (budget 90).
4. **Picture labels too small during explore (lesson, not kit).** Even before the reveal, when the stage is at natural size (frames 02 to 05), the tree's labels are about 4 to 5 px on the phone: "√ scale", "today: 50 women", "same mother", "common mother", "+ 49 others", and the 50/20/5 axis. The one label that carries "she had contemporaries" cannot be read at any phase. This is the lesson's own text size, not the reveal shrink, so I count it against the lesson. It needs larger SVG text or a smaller viewBox.
5. "Theory for 50 expects about 97; 2N(1 − 1/N) = 98 is an approximation" gives this learner two theory numbers and a formula in one sentence, and no stage element stands for them. It reads as a correction note. I would cut it to "about 2N" or move it to the trust sheet. The category manager picks.
6. The trust link reads "6/7 claims checked", so one claim is still open.

Verdict reason: the merge idea is shown, but the "+49 others" label the reveal ends on is unreadable at every phase and off screen at the reveal.

## After reading build.md (Pre-flight v2) and the r7 review

- r7 findings fixed in v2: the title no longer asks the right option, there is a three-size run for 2N, option 3 is clearer, and the dangling reference is gone. All of this matches the walkthrough.
- Pre-flight 4 says "49 other women: N − 1, drawn as '+ 49 others'". It is drawn, but at about 4 px it cannot be read on a phone during explore, and it is off screen at the reveal. Pre-flight has no item 7, and the build note says "Not seen in a browser".
- Board W-184 (cm-life) is about the 2N(1-1/N) wording. My finding 5 (the sentence is hard for this learner) belongs on the same item.

Fix route: demo-builder. (1) Make the tree's labels at least 10 px rendered at 390 px width ("common mother", "+ 49 others", axis), so this is not left to the kit. (2) At the reveal, stage-top crop 0 with "+ 49 others" visible. (3) Reveal at 90 words or fewer (cm-life picks the cut; the theory sentence is the candidate).

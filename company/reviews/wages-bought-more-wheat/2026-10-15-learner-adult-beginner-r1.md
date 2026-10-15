*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: wages-bought-more-wheat
lesson version: v1
boundary: adult beginner (the brief's own boundary). Knows that prices rose over the centuries. Does not know that a price rise says nothing about hardship until it is divided by pay, or that a two-axis chart hides that division. Has never seen Playfair's chart. (The brief's learner field was read before the walk, as the role's input; nothing else until the findings below were written.)
Screenshots seen: yes (artifacts/walkthroughs/wages-bought-more-wheat/sheet.png, recorded 2026-10-15T10:05:34.988Z, production build on http://localhost:3590, phone viewport; 06-reveal.png cropped to check the top of the stage)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **The yes/no title (the cm-history caution).** "Dearer bread, poorer workers?" plus the hook "Did that make a working man poorer?" is a double yes/no question, and in a lesson feed a headline question reads as "no, there's a twist". With my boundary the honest belief is "dearer = poorer" ("Less: about 40% as much"). The framing pushes me off that belief before I commit, so the wrong guess the reveal needs is less likely to be made. The options make it worse: the question says wheat rose "about 2.4 times", and the right answer is "about 2.5 times as much". The near-echo makes the 2.5 option look like the designed answer. I judge the title a real cue toward the answer, not just a style issue.
2. **Where understanding first broke: the reveal frame, at the top of the stage.** When the reveal opens, the stage is scrolled so that the chart's axis title ("quarters of wheat a week's wage buys") is cut off; the visible stage starts at the 0.6 tick. The reveal talks about "one line" made by dividing wage by price, but the line on screen has no unit or label. "0.55" means nothing without "quarters of wheat". The stage top is cropped at the reveal.
3. **"Shillings a quarter".** A beginner reads "a quarter" as a quarter-year. Nothing says it is a unit of grain (8 bushels). This weakens step 2's "quarters of wheat a week's wage buys" (0.3 of a what?).
4. **What the explore did well.** Step 1 (Playfair's two-axis chart) and step 2 (divide them) make the lesson's real point by action: two lines on different scales turn into one line, and the line goes *up*. "Mark the best year" (1785, not the last year) is a good second surprise, and the reveal names it.
5. **Did the reveal answer the question I actually had?** Yes: "wages rose 6 times" is the missing fact, and it is on the stage at step 1 ("wage ×6").

Verdict reason: the title and hook pose a yes/no question that cues "no" before the commit, and at the reveal the stage top is cropped so the ratio line has lost its axis label.

Concrete fixes:
- Title and hook without a yes/no cue, for example title "Bread prices and a mechanic's pay"; hook "Wheat cost 2.4 times as much by 1810. What could a week's pay buy?" Or keep a question but make it open: "What did a week's pay buy in 1810?"
- Re-run reveal-fit at 390×844 and fix the crop so the line's axis title is on screen when the reveal opens. Or put the unit into the best/worst labels ("1785: 0.55 quarters").
- Gloss "quarter" once on the stage: "quarter (about 8 bushels)".
- Consider distractor numbers that do not sit beside 2.4, for example "about 4 times as much", or reword the right option as "More: about 2½ times as much" so it does not echo the question.

## After reading build.md / meta.json

- The misconception ("when the price of bread rises, people become poorer") is the belief the title asks the learner to doubt before predicting. That is the opposite of "a wrong guess is the point". The cm-history caution is borne out by the walkthrough.
- The objective (wheat ×2.4, wage ×6, buys ×2.5; dividing shows what a two-axis chart hides) is shown on the stage, not told. That is the lesson's strength.
- meta.json lists all 6 claims verified; the served trust sheet shows 6/6.

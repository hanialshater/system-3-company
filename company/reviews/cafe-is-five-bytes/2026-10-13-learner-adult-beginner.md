*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: cafe-is-five-bytes
lesson version: v1
boundary: adult beginner (knows text is stored as numbers, a byte holds one small number; has never heard of UTF-8 or hex).
Screenshots seen: yes

## From the artifact
- First needed an idea I didn't have: "UTF-8" in the question, but the gloss ("a common way to save text") is enough. 4 was the natural guess; the prediction felt real.
- Shown well: typing c, a, f gives one box each; é gives two highlighted boxes (C3 A9) and the counter jumps from 3 to 5 bytes against 4 characters. Adding the CJK character (3 boxes) and the emoji (4 boxes) extends the pattern. The characters vs bytes counters side by side make the point.
- Confusing: the byte counter reads "1 of 12" from the first letter. I did not know what the 12 was (it is the total for the whole planned word), and it hints that later characters are big. The byte codes are hex ("63", "C3") with no word saying so; "63" for c reads as a decimal number to me.
- Told, not shown: why é needs two bytes is not shown; acceptable for 60 seconds.
- Layout: clean; empty grey space above the word in early frames.

## Fix suggested
Drop "of 12" from the byte counter (show just the count); optionally label the codes "hex".

## After reading the brief
Learner field matches. Claims 5/6 checked.

Verdict: launch

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): secret-in-the-counts
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows a language model picks the next word from counts of what followed, and that longer context gives sharper predictions; does not know that text seen once can be reproduced word for word when its context is unique, so a model can leak private training data)
Screenshots seen: yes (artifacts/walkthroughs/secret-in-the-counts/sheet.png, recorded 2026-10-14T18:52)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "ready, the commonest word after 'is'"; tapped "Prompt with 2-word context", "Prompt with 1-word context", "Delete the secret, prompt again", "Reset"; opened reveal.

1. **The prediction is genuine, if a little guessable.** "ready" is the trap for anyone thinking "most common wins"; the question does say "two-word context", which a careful reader can use to get 4 7 1 9. That is fine: it rewards reading the setup, and the surprise ("seen once, still leaked") holds.
2. **The payoff is on the stage.** "2-word context → my pin is 4 7 1 9" in red, with "after 'pin is': 4 ×1" directly under it: one count, so it wins. Then "1-word context → my pin is ready" with "ready ×3, at ×1, sam ×1". The contrast is clean.
3. **Where the idea I lack first appears: after "Delete the secret", the 2-word prompt says "ready".** The counts line shows "after 'is': ...", a one-word count, under a "2-word context" label. Nothing says the model falls back to one word when "pin is" has never been seen. I could not tell whether deletion "changed the model" or just switched it to the 1-word rule. The reveal does not mention deletion at all.
4. **The reveal's stage is blank on this path.** After Reset, "Output: –" and "counts: –"; only the small "Seen:" line carries '4 7 1 9' and 'ready'. The red leaked line the reveal is about is gone.
5. Only "4" is shown as counted; how "7 1 9" follow (each from its own two-word context) is not shown. A learner may wonder why the whole number came out from one count. Small.
6. "Real language models have repeated phone numbers and addresses from their training data" is a real-world claim; check it is in claims (trust sheet lists 4).
7. Trust link reads "0/4 claims checked" (fact-checker's lane).

Verdict reason: unique context → verbatim leak is seen, and the 1-word contrast is seen. Finding 3 is a gap, not a falsehood.

Fixes (hypotheses for the builder, not tested):
- After deletion, label the fallback: "no 'pin is' seen → falls back to 'is'".
- When the reveal opens, put the 2-word leaked output back on the stage.

## After reading build.md (Pre-flight v1)

- The model does back off to a shorter context when "pin is" was never seen, as I guessed in finding 3, but the stage never says so. The delete preset is ungated and unquoted, so it is a side trip; as built it may leave a learner believing "deleting the line fixed the model" without knowing why. Hypothesis for the builder.
- Fix route: none required for launch.

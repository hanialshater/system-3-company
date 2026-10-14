*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): twenty-cultures-twenty-plates
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows resistant cells can exist before a drug arrives; does not know how anyone could tell random-before from drug-made, or that the two ideas predict different spreads of counts across identical cultures)
Screenshots seen: yes (artifacts/walkthroughs/twenty-cultures-twenty-plates/sheet.png, recorded 2026-10-14T18:55)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "About the same on every plate"; tapped "Random, while growing", "Made by the drug"; opened reveal.

1. **The prediction is genuine.** "Identical cultures" makes "About the same" the natural pick; the jackpot answer is not something a beginner would invent. Good options.
2. **The two rows are the argument.** Random: lumpy bars, "9 empty, max 128", one red bar broken off the 40 scale. Drug-made: an even row, "0 empty, 5 to 15". The difference in spread is visible at a glance, which is exactly the idea in my gap.
3. **Where the idea I lack first appears: "128: one mutation at division 13, copied".** Why does an early mutation give 128? The stage says "copied" but not that each division doubles the mutant line (2⁷ = 128 from division 13 to 20). "division 13" means nothing to me without "of about 20". The reveal's "copied into every descendant: a jackpot" is enough to accept it.
4. **The averages are not compared.** The test works because both rules can give the same average count but very different spreads. The stage gives "9 empty, max 128" vs "5 to 15", which mixes measures; I cannot tell whether the totals are similar. A beginner may think "random gives more mutants" instead of "random gives lumpier mutants".
5. The question asks what happens in reality, but the explore shows two models. The reveal resolves it with Luria and Delbrück's 1943 result, so the right answer is backed by a real experiment, not by the toy. Good. "with a virus instead of a drug" is an honest note.
6. "New seed" is never prompted; trying it would show jackpots are typical, not a seed-1 fluke.
7. Trust link reads "0/5 claims checked" (fact-checker's lane).

Verdict reason: the different spreads, which are the whole test, are seen in two rows and named in the reveal.

Fixes (hypotheses for the builder, not tested):
- Show the same summary for both rows (e.g. "average 10 · empty 9 · max 128" vs "average 10 · empty 0 · max 15").
- "division 13 of 20: each later division doubles it" under the jackpot bar.

## After reading build.md (Pre-flight v1)

- Seed 2 gives "8 empty, max 6" with no big jackpot, and the reveal has a branch for it. So finding 6 cuts both ways: "New seed" can show that jackpots are not every run, which is truthful but could confuse a learner who presses it once. Finding 4 (compare averages) is not addressed in the note.
- Fix route: none required for launch.

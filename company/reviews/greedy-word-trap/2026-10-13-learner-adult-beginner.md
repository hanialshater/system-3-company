*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: greedy-word-trap
lesson version: v1
boundary: an adult with school-level maths and science, new to the topic (has used autocomplete and chatbots; knows chances multiply along a path only if reminded). Screenshots seen (sheet.png, all 7 frames).

## 1. From the artifact

- Prediction: a real guess for most, and derivable by a patient adult: 0.6 x 0.4 = 24% against 0.4 x 0.9 = 36%. "cat + its best word (greedy's pick)" is the intuitive pick; "greedy" is defined in the option label itself. The hook ("Always pick the likeliest next word. Do you end up with the likeliest sentence?") leans toward "no" by its phrasing.
- The locked stage is a tree with labelled odds ("INVENTED WORD ODDS"). The stage shows only the tree; the numbers the learner needs are there. Nothing leaks.
- Where understanding first broke: it mostly did not. The one soft spot is the "CHANCE (PRODUCT)" label: the product rule is used on the stage ("= 24%") before it is stated; a rusty adult may not remember that chances along a path multiply. The reveal says it ("A sentence's chance is the product along its path") after the stage has already shown it.
- What was SHOWN works: tapping "Greedy path" draws the cat-sat path and "= 24%"; tapping dog then barked shows "= 36%" in green. The learner's own click on dog then sat (4%) gives a wrong path and a small number, which is a natural extra contrast. Showing the tree beside the readout makes the comparison direct.
- Only two of the five end paths are compared (24% vs 36%); the other branches (cat ran 21%, cat ate 15%, dog sat 4%) are never summarised. The learner cannot see that 36% is the overall best unless they check all five.
- AI claims: the odds are labelled invented. "Some real systems use beam search, keeping several partial sentences" is a true, hedged aside, said as "some". Nothing states how real chatbots choose words.
- Reveal earned: dog + best word, yes (24 vs 36 shown). The explanation "the less likely first word led to a near-certain one" is visible in the tree (90%).
- Problems: (1) product rule not stated before use; (2) not all five endings compared; (3) hook leans.
- No FATAL.

## 2. After reading the brief

- The brief's learner knows a language model gives each next word a chance; the objective (sentence chance is the product; a less likely first word can beat greedy) is delivered by 24% vs 36% on the tree. The product rule is used before it is named.
- Claims verified (4/4).

Verdict: launch

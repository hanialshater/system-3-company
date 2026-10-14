*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, wave E r6): same-letters-same-key
lesson version: v1
boundary: knows-hash-buckets (knows a hash table groups items by a key, from hash-bucket-pileup, and what an anagram is; does not know that a word's sorted letters are a key all its anagrams share). From meta.json learner field.
Screenshots seen: yes (artifacts/walkthroughs/same-letters-same-key/sheet.png, 13 frames)
Verdict: launch

## 1. From the artifact

- Hook: "Finding anagrams sounds like checking every pair. What if each word named its own bin?" names the tension well.
- Predict: ten words, "use each word's letters in alphabetical order as a key. How many groups?" 3 / 4 / 5. The locked stage shows the ten word chips, "Bins appear here", and three counters at 0. No leak. The pull toward a wrong answer comes from "gogole" (not a word, but google's letters) and from "dog" (a group of one). I picked 3, forgetting dog. It is a fair miss.
- Explore: each tap puts the key on the chip ("listen eilnst") with a one-line caption ("listen → eilnst: into the eilnst bin"). It drops the word into a bin with a count ("eilnst · 4"). Watching four different spellings turn into the same "eilnst" is the idea, on the stage, ten times. "dog → dgo" opens bin 4, and the gate opens at 10/10.
- "WORD-TO-WORD CHECKS 0" sits under every frame and never moves. It is a quiet stand-in for "no word compared to another". It would land harder next to the pairwise cost: "45" appears only in the reveal.
- Reveal: it quotes the four bins and counts I saw ("Dog sat alone"), and "You never held two words side by side" points at the 0 counter. "45 comparisons" and "hash table keyed this way" are told context, in two sentences. The reveal frame shows an empty stage, because the QA path pressed Start over (minor).

## 2. Earlier findings

No earlier learner review (company/reviews/same-letters-same-key/ has a fact-check and build.md only). The boundary is taken from meta.json.

## 3. New findings

- Moderate (not blocking): the question stem gives the method ("use each word's letters in alphabetical order as a key"), so the prediction tests counting, not the misconception ("you must compare every pair"). The surprise is "dog counts" or "gogole joins google", not "no comparisons needed". One option is to ask "how many word-to-word checks does grouping need: 45 / about 20 / 0", with the key named after commit. That is for the builder to weigh. The lesson still shows the idea.
- Minor: put "pairwise: 45" beside "WORD-TO-WORD CHECKS 0" on stage so the contrast is seen, not only told.
- Minor: the reveal sits under a reset stage after Start over.
- Told vs shown: the single doesNotKnow item (the sorted letters are a shared key) is shown on every tap. No FATAL.

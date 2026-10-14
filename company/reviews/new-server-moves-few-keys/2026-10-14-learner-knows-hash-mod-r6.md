*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): new-server-moves-few-keys
lesson version: v1
boundary: knows a key lands in the bucket given by hash mod size (lesson hash-bucket-pileup); does not know that changing the server count by one moves most keys under mod, but about 1/n on a ring (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/new-server-moves-few-keys/sheet.png)
Verdict: revise

## 1. From the artifact
- Hook: "Does it take a fifth of the keys, or reshuffle them all?" is a real tension. The title is a question but is 35 characters with a comma splice; fine.
- Predict: "of 20 consecutive keys, how many stay on the server they had?" with 16 / 10 / 4. 16 is the tempting "a fifth moves" answer. The locked stage shows 20 key bubbles labelled by mod-4 server and "? of 20 moved", so nothing leaks.
- Where understanding first broke: the question counts keys that **stay**, but every stage readout counts keys that **moved** ("16 of 20 moved", "4 of 20 moved"). Then the reveal says "it was 4" while the panel above it shows "Ring: 4 of 20 moved". I chose 16. My first reading of "Not quite: it was 4" next to "Ring: 4 of 20 moved" was that the answer was about the ring and about moving, and that 16 meant mod moves 16, which is what I had in mind with a fifth. The number 4 means opposite things in two places. "Make the question's numbers match the stage exactly" is not met.
- Explore: "Add server E" turns the mod circle into new letters with the old letter faint inside and moved keys ringed. Almost every bubble changes, which is a strong picture. "Ring" switches to a second picture: servers as ticks on a circle, coloured arcs, and an arrow showing clockwise. Keys 0–3 turn into E. The cause (a key goes to the next server clockwise, so E only takes from the arc it splits) is drawn as E's small blue arc cut out of A's.
- Two circles in a row (the key circle, then the server ring) have different meanings. The toggle keeps it to one at a time, so it is acceptable, but at first glance the switch is a bit jarring.
- Reveal: "16 of your 20 ... only 0 to 3 kept" and "4, all to E, all from its neighbour A" match what I saw. On the reveal the ring is cropped at the top, so E and keys 0–3 (the thing the reveal points at) are off-screen.
- Reveal word count is about 100, within budget.

## 2. Earlier findings

No earlier learner review exists (only a fact-check). The boundary is taken from meta.json.

## 3. Show the why you promised

The doesNotKnow item has two halves, and both are on stage. The mod circle shows almost every bubble get a new letter (16 of 20). The ring shows E's arc cut out of A's and only keys 0–3 turn E (4 of 20, a fifth). The reveal's "a new server only takes keys from the one after it" points at that arc. The even-fifth spot was chosen, and the reveal says so. The 1/n figure for hashed spots is told context with a claim.

## 4. New findings

- Blocking (top finding): the question asks how many keys **stay**, but the stage counts how many **moved**, and the answer "4" sits beside "Ring: 4 of 20 moved". Ask how many move (answer 16, with 4 as the tempting "a fifth" option), or show a "stayed" count on stage. Either way, the question's number and the stage's number must count the same thing.
- Should fix: on the reveal the ring is cropped at the top, so E and keys 0–3 are hidden.
- Minor: the switch from the key circle to the server ring could use a one-word cue that the circle now means positions.
- No FATAL.

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7): new-server-moves-few-keys
lesson version: v2
boundary: knows-hash-mod (same tag as r6). Knows a key lands in the bucket given by hash mod size. Does not know that changing the server count by one moves most keys under mod, but about 1/n on a ring.
Screenshots seen: yes (artifacts/walkthroughs/new-server-moves-few-keys/sheet.png, build 4 at localhost:3480)
Verdict: launch

## Findings (written from the walkthrough before reading the brief or the r6 review)

Walked as someone who knows that "server = key mod n" spreads keys evenly and has never seen consistent hashing or a hash ring.

1. **No answer before the commit.** The locked stage shows 20 keys on a circle, coloured by mod 4, with "? of 20 moved" for both schemes. Options 4 / 10 / 16 are all bare numbers. The hook ("a fifth of the keys, or reshuffle them all?") names two candidates, and the wrong one maps onto option 4. That is a fair tension, not a leak.
2. **The mod-n reshuffle is shown.** On "Add server E", every key that moves gets a red outline and a small ghost letter for its old server. "16 of 20 moved" appears, and only 0 to 3 stay. I can see at a glance that the moved keys are nearly all of them. The reason (the remainder changes for almost every key when n changes) is a told sentence. At this boundary I already know mod, so it does not hurt.
3. **The ring's why is drawn.** Coloured arcs show each server's stretch, tick marks show the server spots, and an arrow shows clockwise. After E is added, only keys 0 to 3 change, all to E, and the ghost labels show they came from A. "A new server only takes keys from the one after it" is on the stage, not just in the text.
4. **"Ring: the circle is now spots. Each key goes to the next server clockwise."** "The circle is now spots" is the one line I could not parse on first read. "Spots" is never defined. The picture rescues it (tick marks with letters), but the caption makes things harder, not easier.
5. **The ring's starting layout is not the mod-4 layout.** Switching to Ring, the 4-server ring puts keys in blocks (0 to 4 A, 5 to 9 B, …), not A B C D repeating. Nothing tells me the baseline changed. A careful learner may wonder whether "4 moved" is measured against the same start. It is (ring 4 vs ring 5), but that is only implied.
6. **After "Remove server E" the ring readout still says "4 of 20 moved"** while the picture shows 4 servers and no moved keys. As a record it is fine, and the reveal quotes it. But the moved state itself (keys outlined, on E) is no longer drawn when the reveal opens. Only the readout survives.
7. The reveal's 20,000-key / about 1/n sentence and "E's spot was picked to give it an even fifth" are honest told context. Disclosing the chosen spot is good.

What the prediction felt like: I took the hook's "a fifth" (4), and I was really surprised by 16. The ring then answered the hook's question in the other direction. The reveal answered what I actually wondered ("so what does stay put?").

Verdict reasoning: both halves of the idea are visible on one circle at a time, and the quoted numbers come from my own taps and stay in readouts.

## Earlier findings (r6), checked after the findings above were written

1. Blocking: the question counted keys that stay, the stage counted keys that moved: **fixed.** The question now asks how many move (answer 16), which matches "key mod n: 16 of 20 moved".
2. Reveal crops the top of the ring, hiding E and keys 0 to 3: **not fixed.** The reveal frame still shows only the bottom of the ring. And with the walkthrough's last tap being Remove server E, E is gone from the picture anyway. The readouts carry the quoted numbers.
3. Cue that the circle now means positions: **attempted, not landed.** The new caption "the circle is now spots" is the line I could not parse (finding 4 above).

## Verdict

Launch. The question, the stage and the reveal now count the same thing, and both schemes' why is drawn. Polish, not blockers: reword the "spots" caption, and keep E's arc in view (or not erased) when the reveal opens.

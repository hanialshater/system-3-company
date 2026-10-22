*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: friends-of-friends-overlap
lesson version: v3
boundary: knows that everyone has about the same number of friends and can multiply 10 × 9; does not know that friends of friends are mostly your own friends when friends know each other (triadic closure), so expects about 90 people two steps out.
Screenshots seen: yes (artifacts/walkthroughs/friends-of-friends-overlap/sheet.png, recorded 2026-10-22T12:21:33.462Z)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: it did not break. The predict stage shows the ring with "you" and the step-1 neighbours labelled "1 1", and a table with "village step 1: 10" and every other cell "?". The question ("friends of your friends but not your own friends") maps onto the "step 2" row once I tap "2 steps"; the panel never says "step 2 = friends of friends who are not your friends" in so many words, but the green "2" labels sitting just beyond the blue "1" dots make the mapping obvious. Note, not a block.
2. What the prediction felt like: 90 is exactly what my boundary would choose (10 friends × 9 others each); 45 is a plausible "halve for overlap" hedge; 10 feels too small. A genuine bet. The locked stage gives nothing away (only step 1 is filled).
3. Whether the reveal answered my question: yes. My question after seeing "10" at step 2 was "where did the other 80 go?". The stage's arcs answer it before the reveal does: the ringed friend (3 places right of you) has 5 arcs left landing on you and your blue friends, and 5 arcs right, of which 2 land on blue dots and 3 on green ones. I counted 5 + 2 = 7 old, 3 new, matching the reveal's "7 land on you or your own friends, only 3 are new". The "No shared friends" column then puts my 90 beside the village's 10 (and 810 beside 10), and the reveal names my mistake: "Multiplying 10 × 9 assumes no shared friends." The misconception is broken by something I can see and count, not told.
4. Every number the reveal quotes (10, 10, 31, 7, 3, 90, 810) is on the stage when the reveal opens (table and arcs in 06-reveal.png).
5. Notes (not blocking):
   - "within 3: 31" includes you; the table does not say so, only the reveal ("counting you"). A learner adding 10+10+10 = 30 may be briefly puzzled at the stage before the reveal resolves it.
   - In the "No shared friends" picture (04-step-3.png) the "you" label sits beside, not under, the centre dot and overlaps a blue node; the 810 ring is texture only. The readout carries the number, so it does not block.
   - In 04-step-3 two chips are highlighted ("3 steps" and "No shared friends"): world and step are separate axes, which reads fine, but "Village" losing its highlight is the only cue that the world changed.
   - The "1,000" of the ring is never visible (only ~30 nodes of the arc show); the lesson does not need it, since the counts are local.

Verdict reason: no finding blocks a first-time learner; the arcs from the ringed friend let the learner count the overlap that the reveal names.

## After reading build.md / meta.json

- Not read (this stage reads only the walkthrough and the template). The version stamp is not in the walkthrough; The leave check named meta.json as v3; the walkthrough is the one code recorded for this stage, so the stamp is v3.

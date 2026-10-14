# Build note: new-server-moves-few-keys

builder: algo2-sb · 2026-10-14 · status: draft (not self-verified; all claims unverified)

Built from `company/design/specs/new-server-moves-few-keys.md` (+ svg) and brief #58 in `company/domains/briefs/cs.algorithms.md`.

## Answer check (builder's own node script)
k mod 4 = k mod 5 only for k = 0..3 in 0..19: 4 stay, 16 move (answer C holds). Designed ring (keys at k/20, A B C D at 4.5, 9.5, 14.5, 19.5, E at 3.5): keys 0-3 move A -> E, nothing else. Hashed ring re-run with my own FNV-1a script (1,000 points per server named `<server>#<i>`, keys `key-<k>`, 20,000 keys): 20.4% moved, all to E; with 100 points 22.7%. Other naming schemes gave 18.3% and 19.1%, so the brief's 19.6% is one of a spread around the ideal 20%. The reveal therefore says "about 20%", and claim c5 records my numbers and the naming dependence.

## Built as specced
One circle of 20 discs (key number above server letter, tint plus letter). Ring mode adds ticks A-E at radius 160, shaded owned arcs and a faint clockwise arrow. Moved discs get a 3 px `--bad-fill` outline and a struck-through ghost of the old letter, held until the next change. Table "key mod n: ? of 20 moved" / "Ring: ? of 20 moved". 3 controls in DOM order: Add/Remove server E (`aria-pressed`), key mod n (active, disabled at start), Ring. Switching scheme with E on shows the move against the 4-server version of the new scheme and fills that row. Repaint staggered 15 ms per disc (<= 285 ms). Milestones `mod-moved`, `ring-moved`; minInteractions 2. The stage never hashes; the designed layout is disclosed in claim c2 and in the reveal ("E's spot was picked to give it an even fifth").

## Choices and deviations
- `company/design/system.md` has no categorical palette, so the five server hues are hard-coded in Demo.tsx (blue, orange, green, pink, red, mixed 45% into `--bg-2`; text is `--fg`). Design lead may want to name a palette.
- The mod rule line adds "n = 4." / "n = 5." so the learner can see which formula is live.
- Removing E repaints and outlines the same keys moving back; it does not change the table.
- The reveal falls back to the derived numbers if a row is somehow empty (the gate makes both rows filled).

## Problems found in the brief or spec
The brief's 19.6% is not reproducible without its script (hash naming changes it by about 2 points). Not blocking: the reveal quotes "about 20%".

## Checks skipped
next build, QA, walkthrough and tsc were not run (coordinator order). `npm run registry` and `npm run check` passed.

## Pre-flight v2

Changes for r6 (knows-hash-mod, revise): the question now asks how many keys **move** (options 4 / 10 / 16, answer 16), so the question, the readouts ("16 of 20 moved") and the reveal count the same thing (top finding). "Add server E" no longer relabels itself; a separate "Remove server E" comes last in DOM order. The ring rule line now says "the circle is now spots" (minor cue). Not fixed: the ring top cropped under the reveal (layout of the reveal panel over the stage; needs a walkthrough to see). No claim text changed. Not built, typechecked or QA'd (batch instruction).

1. **Title and hook.** "One new server, how many keys move?" / "Add a fifth server to four. Does it take a fifth of the keys, or reshuffle them all?" No: the hook names the 4 reading ("a fifth") and the 16 reading ("reshuffle them all") equally.
2. **Options.** "4", "10", "16": bare numbers, same precision.
3. **Locked stage.** 20 discs lettered by key mod 4, rule "Server = key mod n … n = 4", table "key mod n: ? of 20 moved / Ring: ? of 20 moved". No moved count drawn.
4. **Reveal values.** "moved 16 of your 20 keys": (b) milestone mod-moved, recorded in the table when E is added under mod; the row stays. "only 0 to 3 kept": same run, discs 0–3 are the unringed ones. "On the ring it moved 4, all to E, all from A": (b) milestone ring-moved, recorded in the table row. Hashed-spot 20% / 1/n: told context, claim c5, not quoted as seen.
5. **QA path.** Add server E (mod-moved, table 16), key mod n (disabled, already mod), Ring (ring-moved with E present, table 4), Remove server E. Both milestones in three presses; nothing waits on an animation (the disc colour transition is cosmetic).
6. **Reset.** No Reset control; the last press is Remove server E, which leaves the table as is. Reveal (traced from code, not run): "Under key mod n, adding E moved 16 of your 20 keys: only 0 to 3 kept their server. On the ring it moved 4, all to E, all from its neighbour A. / On a ring a key belongs to the next server clockwise, so a new server only takes keys from the one after it. A formula like key mod n reassigns nearly every key when n changes. / Here E's spot was picked to give it an even fifth. With hashed spots, 1,000 per server, and 20,000 keys, about 20% moved, all to E: about 1/n. This is consistent hashing (Karger and others, 1997)." Matches the table "16 of 20 moved / 4 of 20 moved".

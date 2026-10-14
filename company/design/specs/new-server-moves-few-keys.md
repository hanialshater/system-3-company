# Spec: new-server-moves-few-keys

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #58 · wireframe: `new-server-moves-few-keys.svg`

**Format: Before / after toggle** (as briefed). There is one picture for both schemes, so the toggle changes the rule and not the representation. The 20 keys (0–19) sit as numbered discs around a circle in fixed places, and each disc shows the letter of the server that holds it. Under **key mod n** the letters come from the formula. Under **Ring** the servers are ticks on the same circle, and a key belongs to the next server clockwise. Adding server E repaints the letters. Under mod, 16 discs change, scattered all round the circle. On the ring, 4 adjacent discs change, all to E. The ring is the "after" and persists into the reveal.

## Brief check (re-run in node, 2026-10-14)
- k mod 4 = k mod 5 for k = 0, 1, 2, 3 only (in 0–19): **4 stay, 16 move.** Answer C (4) holds. **The brief is right.**
- The ring on the stage is a **designed layout**, not a hash. Key k sits at angle k/20 of the circle. Servers A, B, C, D sit just after keys 4, 9, 14, 19, so each holds 5 keys. E is placed just after key 3, so it takes keys 0–3 from A: **4 of 20 move, all to E, all from one neighbour.** The placement gives E an even share (1/5). The claim must say so ("positions chosen to show one even share"). The statistical 1/n result is the brief's hashed simulation (19.6% with 1000 points per server; 24.1% with 100), and it is quoted in the reveal as the real-world number. Without this disclosure, the 4 of 20 would look like a law of rings rather than one even split.

## Stage at 390×844 (~400 px at predict, ~500 px in explore)
1. Rule line (muted, ≤ 12 words). Mod: "Server = key mod n (A=0, B=1, …)." Ring: "Each key goes to the next server clockwise."
2. **Circle** (radius 130, centre of a 330 px square): 20 discs of 30 px, each showing the key number (12 px) above the server letter (14 px bold). Each server has a fill tint **and** a letter; discs keep their place in both modes.
3. **Ring mode only**: server ticks on a ring outside the discs (radius 160) with labels A–E, and a faint clockwise arrow. The arc each server owns is shaded on the ring in its tint.
4. **Moved marking**: when E is added, each disc whose letter changes gets a thick `--bad` outline and a small strike-through ghost of its old letter, held until the next change.
5. **Readout table** (2 rows): "key mod n: ? of 20 moved" / "Ring: ? of 20 moved". These fill as the learner adds E in each mode.
6. Controls (one row of 44 px).

Stage words at the busiest moment: rule line 8 + table 12 + server letters (single characters, counted as labels) = 20.

## Controls, in DOM order (3)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control toggle | "Add server E" / "Remove server E" (`aria-pressed`) | adds or removes E in the current mode. Discs repaint (staggered 15 ms per disc, ≤ 300 ms), moved discs get their outline, and the mode's table row fills |
| 2–3 | Control chips | "key mod n" · "Ring" (group "Scheme") | start: **key mod n** active and disabled (the question's scheme). Switching repaints all discs in the new scheme with the current server set. **If E is on**, it shows the move against the 4-server version of the new scheme (outlines on the 4 ring keys), and that row fills |

All 3 render at first paint, disabled while `locked`, class `.tap`. No reset.

QA path (each control once, DOM order): Add server E (mod: 16 discs outlined, scattered; "key mod n: 16 of 20 moved"; milestone `mod-moved`) · key mod n (disabled, skipped) · Ring (ring drawn; with E on, keys 0–3 outlined, E's arc shaded; "Ring: 4 of 20 moved"; milestone `ring-moved`). The QA path ends on the ring with E: the after.

## States
- **Predict:** mod mode, 4 servers, discs lettered A B C D A B C D…, table "?". No ring ticks, no outlines.
- **On unlock:** exploration hint: "Add server E, then try the same on the ring."
- **Mod + E:** letters now repeat A–E. Only discs 0–3 kept their letter. The 16 outlines run all round the circle.
- **Ring, 4 servers:** four arcs of 5 discs each, letters in blocks.
- **Ring + E:** one block of 4 discs turns E and nothing else changes. A's arc shrinks.
- **Reveal:** stage as left (ring, E on). Reveal quotes the table: "Under mod, adding E moved 16 of your 20 keys. On the ring it moved 4, all to E, all from its neighbour." Then the general claim, sourced: "With many points per server and 20,000 hashed keys, 19.6% moved: about 1/n" (claim 2), and Karger et al. 1997 (claim 3).

Milestones (`minInteractions=2`): `mod-moved`, `ring-moved`.

## Shown, not told
One circle, one press, two rules. Under the formula the learner sees outlines spray across the whole circle. On the ring they see one block flip. The reveal names "only the neighbour's keys" after the learner has watched it happen.

## Colour and access
Server tints are the five categorical hues from `company/design/system.md`, and each disc always carries its letter, so colour is never the only cue. The moved outline is 3 px `--bad` plus the struck ghost letter. Circle `aria-label`: "Ring, 5 servers: 4 of 20 keys moved, all to E".

## Notes for others
- **Builder:** the ring layout is fixed and designed (see Brief check), and must be disclosed in the ring claim. Do not hash on the stage: with 20 keys and one point per server, a hashed layout can give E anything from 0 to 15 keys.
- **Brief owner (cm-cs-algorithms):** the brief's mod/ring toggle and "add server" are kept. The percent readout is replaced by "k of 20", because 20 keys make "%" look more precise than it is. The 19.6% moves to the reveal with its simulation claim.
- No illustration (CS).

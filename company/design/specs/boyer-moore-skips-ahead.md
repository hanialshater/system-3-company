# Spec: boyer-moore-skips-ahead

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #55 · wireframe: `boyer-moore-skips-ahead.svg`

**Format: Side-by-side comparison, as two stacked lanes driven by one button.** The same 24-letter text in two full-width lanes: the plain method on top, Horspool below. Each press makes **one character comparison** in each lane, so both counters advance together and the skipping lane visibly races ahead. Letters the search has read get a mark that stays, so "never read" is on the stage at the reveal.

## Brief check (re-run in node, 2026-10-14)
Text "HERE IS A SIMPLE EXAMPLE" (24 characters, spaces count), pattern EXAMPLE (7). Horspool slide table: E 6, X 5, A 4, M 3, P 2, L 1, any other letter 7 (the pattern's last E is not in the table).
- Horspool: **15 comparisons**, placements at text positions 0, 7, 9, 15, 17. The letters under the pattern's end at each miss are S (slide 7), P (slide 2), E (slide 6), P (slide 2), then the match at 17. It reads **13 of the 24 letters; 11 are never read.** Plain left-to-right: **27 comparisons over 18 placements**, and it reads all 24.
- **Brief error (route to cm-cs-algorithms before build):** the brief says Horspool uses **4 alignments**. It uses **5** (0, 7, 9, 15, 17). Claim (1) must say 5. The answer (C, 15) is unaffected.

## Stage at 390×844 (~300 px at predict, ~440 px in explore)
1. Rule line (muted, 14 words): "Horspool compares from the pattern's end. On a miss, slide by the table below."
2. **Lane "Plain: left to right"**: the text in 24 monospace cells, 14 px each (336 px), 13 px type; spaces drawn as a faint middle dot. The pattern EXAMPLE sits in a row under it at its current placement. The pair being compared is outlined: a match gets a tick, a miss a cross. Every text letter that has been read gets a small filled dot under it, and the dot stays. Readouts: "Comparisons: 0", "Placements: 1".
3. **Lane "Horspool: from the end"**: the same, comparing right to left. When it slides, the previous placement stays as a dashed ghost row for that press, and a note under the lane names the reason: "S is not in EXAMPLE: slide 7", or "P: slide 2". The **slide table** under the lane is seven small cells (E6 X5 A4 M3 P2 L1 · other 7). The cell used for the last slide is outlined. Readouts as in the plain lane, plus "Never read: –", which fills with a count when the lane matches.
4. Controls, below.

Stage words at the busiest moment: rule line 14 + lane titles 6 + readout labels 5 = 25. The slide note ("S is not in EXAMPLE: slide 7", 7 words) replaces the rule line while it shows (until the next press), so it stays inside the budget.

## Controls, in DOM order (2)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Compare" | makes one character comparison in each lane that has not matched. If the comparison misses, the lane slides at once (200 ms move, instant under reduced motion), by 1 for the plain lane and by the table for Horspool. Disabled when both lanes have matched |
| 2 | Control | "Compare to the match" | replays the remaining comparisons one at a time in both lanes, about 14 ms each (27 at most, ≤ 400 ms; instant under reduced motion). Every slide and read-dot is drawn |

Both controls render at first paint, disabled while `locked`, class `.tap` (44 px). No reset: the matched state is the reveal's picture.

**Why the slide is not its own button** (the brief has "compare" and "slide"): the two lanes share one button, so they need one unit of work, and the plain lane slides on almost every press. A separate "Slide" would be enabled for one lane and not the other. Folding the slide into the miss keeps it visible (ghost row, reason note, outlined table cell) without a second control.

QA path (each control once, DOM order): Compare (plain: H vs E miss, slides 1; Horspool: S vs E miss, **slides 7**, note "S is not in EXAMPLE": milestone `first-skip`) · Compare to the match (Horspool matches at 15 comparisons, 5 placements, 11 never read; plain matches at 27 and 18: milestone `both-matched`).

## States
- **Predict:** both lanes show the text with EXAMPLE under positions 0–6. The comparison counters read 0, no read-dots, and no ghost. The slide table is visible: it is part of the question's rule. The Horspool lane's compare cursor is not drawn while locked, so nothing shows where the first comparison lands.
- **On unlock:** nothing moves until a press. Exploration hint: "Compare one letter at a time and watch the bottom lane jump."
- **After press 1:** plain lane has 1 dot (H) and sits at placement 2. Horspool has 1 dot (under S, position 6), the dashed ghost at 0–6, and the pattern now at 7–13: the first seven letters, except S, were never read.
- **Horspool at 9 (text " SIMPLE"):** E, L, P and M match from the end; I against A misses. Five dots in a row (position 13 is read a second time), then slide 6 on E.
- **Horspool at the match:** seven ticks under 17–23, "Comparisons: 15", "Placements: 5", "Never read: 11". The undotted letters are visible as gaps in the dot row.
- **Plain at the match:** a dot under every letter, "Comparisons: 27", "Placements: 18".
- **Reveal:** the stage stays as left. The reveal: "Reading from the pattern's end, the first check met S. S is not in EXAMPLE, so no placement covering it could match, and the pattern jumped 7. Your search made 15 comparisons in 5 placements and never read 11 of the 24 letters. The plain method read every letter: 27 comparisons, 18 placements. A search can skip text, as long as each skip is justified by a letter it did read. Longer patterns can skip further."

Milestones (`minInteractions=2`): `first-skip`, `both-matched`.

## Shown, not told
The misconception is "every letter must be read". The read-dots disprove it: the learner sees gaps in the Horspool dot row where no comparison ever looked. The first press already shows the 7-letter jump next to the plain lane's 1-letter step.

## Colour and access
Ticks and crosses for match and miss (shape, plus `--good`/`--bad`); read-dots `--fg`; the ghost dashed `--muted`. Each lane's `aria-label`: "Horspool: 15 comparisons, 5 placements, 11 letters never read".

## Notes for others
- **Builder:** a comparison is one text letter against one pattern letter. The slide uses the text letter under the pattern's **last** position, not the mismatched one. The node log: 0:S→7, 7:P→2, 9:E→6, 15:P→2, 17:match.
- **Brief owner (cm-cs-algorithms):** please change "4 alignments" to 5 in the check line and claim (1).
- No illustration (CS).

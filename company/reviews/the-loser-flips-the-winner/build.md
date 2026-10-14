# Build note: the-loser-flips-the-winner

builder: demo-builder (ncm-specs) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.discrete.md, Course: NCM, brief 2 · spec: company/design/specs/the-loser-flips-the-winner.md (+ .svg)

- Intent, as specced: five ballot cards (3 × A > B > C, 2 × B > C > A) with name tiles; "Count points" puts Borda points on every tile and fills the score bars; the toggle "C on the ballot" ⇄ "C removed" turns C's tiles into dashed ghosts **in place** (no reflow, so A stays visibly 3rd on cards 4–5) and recounts live once counted; "A vs B on each ballot" shows the gap chips (+1 A on 1–3; +2 B with "C between" on 4–5, or +1 B with "was +2" after removal). Log keeps both counted states.
- Scores and gaps are computed from the ballots (ballotPoints/totals/gapAB), not hard-coded. Re-run via a transpile-only harness on Demo.tsx: with C A 6, B 7, C 2; without C A 3, B 2. Reveal figures (2-point lead, 4 beats 3, 7–6, 3–2) are read from the same functions.
- Milestones (minInteractions 3): count-with-c, count-without-c, gaps. QA path in DOM order: Count (B 7–6) · toggle (C removed, A 3–2) · gaps. Count and gaps disable after use; the toggle always changes tiles/rule line.
- Show the why: the cause (C between B and A doubling B's lead on ballots 4–5) is the chip pair "+2 B" → "+1 B / was +2"; the reveal points at it.
- Format "before-after"; interactions choice-before-reveal, toggle-before-after, milestone-gate. Reference: E&K chapter 23 only.
- Claims c1–c5, all unverified. c4 (Borda / IIA, E&K ch. 23, Borda 1781) carries the brief's "Attribution: fact-checker confirms" flag. c5 records the stage rule line as a convention.
- Not run, per the batch instruction: next build, typecheck, QA, walkthrough. Status stays draft until local QA.

# F6 (Q-R1): is EDD-010 §6.3's moving-reason rule true against every passed card?

owner: learning-scientist-personalization (Oskar), run ls-f6-1017 · asked by vp-personalization (dispatch 20261017T194207930Z-vp-personalization-26420593, batch 5 §14.2)
artifact: company/personalization/policies/reachable-v2.ts (sha256 2666271f06aeef20f2771bcd7d1ad35391e0852e879aa0c7040f477f3f906714, checked) · rule: company/engineering/edd/EDD-010-personalised-new-lesson-order.md §5.4 steps 5-6 and §6.3, read on branch ccr-3744965a-rfmufj at b5d55ae
order of work: §1 was written and saved before any probe ran. EDD-010 §3.2 and S1's report were not read before §2-§4 were written.
status: check only. Nothing here is a verified learner-facing claim; copy is RC's (fact-checker).

## 1. Truth test (written before any probe output)

**Which cards a moved card passed.** The display is §5.4's: pilot slots keep their positions, a slot whose default lesson was completed before the page load keeps that lesson, every other pilot slot takes the next slug of `R = rank(...)`, and the cards before the pin horizon `h` keep the server's card. On the pilot slots only, write `def(x)` for x's slot in the default order and `disp(x)` for its slot in the display. A card x is *shown earlier* if `disp(x) < def(x)`, *shown later* if `disp(x) > def(x)`.
- x shown earlier **passed** y if `def(y) < def(x)` and `disp(y) > disp(x)`.
- x shown later **was passed by** y if `def(y) > def(x)` and `disp(y) < disp(x)`.
- Only cards `rank` ranked count (lessons not yet completed). Completed lessons that keep their slot, non-pilot cards and pinned cards are not passed in any sense a reason can be about; §4 counts them separately.

**When "x is ahead of y because of code C" is true.** For an ordered pair (upper u, lower l) with u shown above l:
- T0 (a reason exists): `value(u) > value(l)`. If the values are equal, u is above only by default index (or by pin), and no term reason is true.
- T1 (decisive, the strong form): C is the code `rank` itself would give if l were the next row after u: the term among {prerequisites, q, refresh} whose swap of l's value into u's terms closes the most of the gap, with q mapped to `concept-known` if u has a concept state and to `domain-estimate` otherwise. This is the candidate's own definition of "decided the order", applied to the pair rather than to the neighbour.
- T2 (contributing, the weaker form): C's swap closes a positive part of the gap (`closed_C > 0`): the term favours u over l, even if another term favours it more.
- For "x shown earlier because C": u = x, l = each card x passed. For "x shown later because C": u = each card that passed x, l = x, and C is read against each such pair.

**Copy strengths** (descriptions of what a line could assert, not copy):
- S-all-decisive: "ahead of (behind) the lessons it passed (that passed it) because of C". True for a card iff T0 and T1 hold against every passed card.
- S-all-contributing: "C is one reason it is ahead of (behind) the lessons it passed". True iff T0 and T2 hold against every passed card.
- S-some-decisive: "ahead of (behind) some lessons because of C". True iff T0 and T1 hold against at least one passed card.
- S-some-contributing: "C helped it move ahead of (behind) some lessons". True iff T0 and T2 hold against at least one passed card.
- S-boundary: the rule's own claim, true by construction: C decided the order at its run's lower (upper) boundary. A boundary card need not be a card x passed, so S-boundary alone is not a truth about the move.

**Rule (from the brief).** Blocking if, for some code and direction in some probe, no copy strength above is true for every card assigned that pair. Otherwise a note. Also flagged: any moved card the rule leaves at `default-order`, `last` or with no row.

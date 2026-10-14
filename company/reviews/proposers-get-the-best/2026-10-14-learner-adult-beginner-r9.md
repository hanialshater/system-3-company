*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): proposers-get-the-best
lesson version: v5
boundary: adult-beginner (from meta.json learner: knows greedy choices and ranking options first to last; does not know that in a matching market who proposes decides who gets their first choice, or that deferred acceptance always ends stable)
Screenshots seen: yes (artifacts/walkthroughs/proposers-get-the-best/sheet.png and 10-reveal.png, recorded 2026-10-14T15:10)
Verdict: launch

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "The same pairs both times"; tapped Ann, Bea, Cal (students propose: Ann–X, Bea–Y, Cal–Z); flipped to "Hospitals propose"; tapped X, Y, Z (Ann–Y, Bea–Z, Cal–X); tapped "Would a pair rather swap?"; opened reveal.

1. **The r8 blocker is gone.** In 10-reveal the student cards (with the matched hospital underlined), the arrows, the dashed ✕ clash, the hospital row with stars, and both readouts with their "Stable: 0 of 6" lines are on screen together with the last reveal line. Controls fold into "Show more controls ▾". 73 words (r8: about 105).
2. **The payoff is shown.** "First choices: students 2, hospitals 0" against "students 0, hospitals 2" on the same lists is countable, and the reveal quotes it. The misconception option ("same pairs") is the one I chose, and the second run's arrows visibly break it.
3. **Where the idea I lack first appears: "deferred".** The caption says "Receivers keep their best offer". On my tap order no receiver ever drops an offer it was already holding: X holds Ann and refuses Bea, and Ann holds Y and refuses Z. Each clash was refuse-on-arrival. So the "deferred" part (holding an offer and later trading up) never happened in front of me. A different tap order (Bea before Ann) would show it. The reveal's "deferred acceptance always ends stable (Gale and Shapley 1962)" is the told sentence. The swap check stands for "stable", so this is not blocking. But the name points at a move I did not see.
4. "0 of 6 other pairs say yes both ways" is a slightly cryptic phrasing of "no pair would rather swap". It took me a second read.
5. The trust link reads "3/7 claims checked" (fact-checker's lane).

Verdict reason: r8's fit problem is fixed, the gap is asked, broken and quoted, and the remaining told sentence is one claimed line of context.

## After reading build.md (Pre-flight v5) and the r8 review

- r8's two items are fixed: crop 0 with the clash ✕ on screen, and 73 words. "Best stable partner" was cut, which also removes r8's told-sentence note.
- The note does not address finding 3: on the DOM-order path no receiver trades up, so the "deferred" move is never seen. It is a design hypothesis (a tap order or a list tweak that forces one trade-up), for learning-designer. Not blocking.
- Fix route: none required for launch.

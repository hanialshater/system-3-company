# Build note: news-comes-from-acquaintances (demo-builder, 2026-10-14)

Kept from evaluators until they have written their findings (company/reviews/README.md).

- Source: brief 1, "Networks, Crowds, and Markets, batch 1" in `company/domains/briefs/math.discrete.md` (cm-math-discrete). Format: single card with a hand-drawn network stage. Built by hand to the interim network-stage rules, `company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` §2. This is the first of the rule-of-two pair (§3.1); `enemy-of-my-enemy` should copy its constants.
- `owner.categoryManager` is `cm-math` because `company check` requires the domain's CM; the brief's author is cm-math-discrete.

## Stage
- 8 people: group 1 = circles A, C, D, E; group 2 = squares B, F, G, H (shape = group). K4 + K4 (12 links, solid 3 px = close) plus the one link A–B (13). viewBox 340 × 250, fixed positions, no layout code.
- Rule line on the stage: "Rule: any two of your close friends are linked." (one line at 390 px) Legend: "━ ♥ close · ╌ ♡ acquaintance · ● heard news".
- Controls in DOM order: A–B pill (switches close / acquaintance), C–E check pill, F–H check pill, Send news. 4 controls (3 edge handles + 1 button). Nodes are not tappable.
- Before the prediction A–B is a grey line with a "?" pill (the answer is not on the stage). After it, A–B starts at the learner's guess: "a close friend" and "either could be" start close; "an acquaintance" starts as an acquaintance.
- A–B close: A–B and A–C get a red tint, the missing C–B link is drawn red dotted with a ✗, caption "Broken: B and C, both close to A, aren't linked." One of the 6 broken triples is drawn (brief asks for one).
- Check pills: tap C–E → triangle A–C–E tinted green, "A is close to C and E: C–E exists ✓"; same for B–F–H. Pill turns from "?" to "✓" once checked. Tapping again hides the tint.
- Send news: H → F, G, B; B → A; A → C, D, E. Lit links are a wide translucent `--accent` underlay (so the dashed A–B still shows through), nodes filled; staggered fade of 90 ms per hop (≈ 270 ms total; none under reduced motion). The final state is set at once, so QA screenshots are stable. Switching A–B clears the news so it can be resent.
- Milestones (2): `both-ties` (A–B switched once, so the learner has seen both ties, since it starts at one of them) and `news-over-weak` (news sent while A–B is an acquaintance). Sending news while A–B is close says "News crossed, but a close A–B breaks the rule." and does not count.
- QA path (last option "either could be" → start close): A–B tap → acquaintance; C–E check; F–H check; Send news → over the acquaintance. End state: A–B dashed, news everywhere, F–H triangle tinted. The reveal describes that.

## After the screenshots (changes made)
- First build: the news highlight drew over A–B and hid the dashes, so "crossed the acquaintance" could not be seen; now an underlay. "Send news" was clipped at the bottom of the locked stage on the phone; the stage box is now capped at 28dvh tall-equivalent and the rule fits one line.
- The walkthrough and QA never photograph the close/broken state: every learner sees it on unlock (or after one tap if they guessed "acquaintance"), but the first scripted tap leaves it. I screenshotted it myself (phone, light and dark, option "a close friend"): red tint on A–B and A–C, red dotted C–B with ✗, caption fits one line. Evaluators should open the lesson themselves or ask for that frame.
- Small phones: the box scales with the card (and with 28dvh). At Pixel 7 the scale is about 1.0; below about 0.93 (short screens, e.g. 667 px tall) the 51.5-unit handle spacing drops under 48 px while the 44 px buttons do not shrink. Design review should check a short phone.

## Interim rules §2 checked
- Nodes r = 15 (circles) / 28 px squares; labels 1 letter, 14 px, inside the shape. 8 named nodes, 0 tappable nodes, 3 tappable edges (≤ 10).
- Handles at link midpoints, 44 × 44 px HTML buttons positioned over the SVG (the box has the SVG's aspect ratio, so they track it at every width). Drawn pill 26 px. Closest centre-to-centre distance among nodes and handles: 51.5 px (C/E to the C–E handle; F/H to F–H); A to the A–B handle 52 px (node check in the scratchpad).
- Edge state: close = solid 3 px + ♥ on the A–B pill; acquaintance = dashed 2 px + ♡. Not colour alone. Node states: hollow / filled (heard news), 2 states; group by shape.
- Stage words at any moment ≤ 24: rule 9 + legend 4 + button 2 + caption ≤ 9.

## Words
- Predict: "Rule: any two of your close friends are linked. A and B both have close friends in their own groups. Their link must be…" (23 words). The brief's version named Ana and Ben; the rulings allow only 1-character node names, so the people are A and B throughout. Options: a close friend / an acquaintance (answer) / either could be.
- Reveal ≈ 85 words; quotes A–B close breaking the rule (reached by every learner: milestone 1), A–B acquaintance breaking nothing, the checked triangles only if the learner checked one, and the news crossing A–B (milestone 2). Granovetter (c5) is not in learner text.

## Numbers (re-run in node, same rule as the code)
- 13 links; local bridges (no common neighbour) = [A–B] only.
- 2^13 = 8,192 labellings; 4,160 satisfy the rule; 64 make A–B close; in all 64 neither A nor B has another close tie.
- Stage with A–B close: 6 broken triples (A: C–B, D–B, E–B; B: F–A, G–A, H–A). With A–B an acquaintance: 0.
- Granovetter: 9, 30, 15 of 54 → 16.7%, 55.6%, 27.8%.

## Open
- Section numbers §3.1 and §3.2 in `curriculum.references` are **unconfirmed** (brief: Cornell page returned 403); the fact-checker confirms against the free PDF.
- c5 (Granovetter 1973) is empirical and needs a human source check; it stays out of learner text until then.
- ♥ / ♡ glyphs depend on the system font; checked in the phone screenshots of this build only.
- All claims unverified, for the fact-checker. Design review (visual designer + accessibility reviewer) should check §2 at 390 px.

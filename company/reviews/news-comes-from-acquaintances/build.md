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

## Revision v2 (demo-builder, 2026-10-14)

Inputs: learner review `2026-10-14-learner-adult-beginner.md`, fact-check pass NCM-1, design review swatch rule (`company/design/reviews/2026-10-14-design-review-ncm-specs.md`, "legend swatches").

- **"Linked" ambiguous; the two kinds of tie never named.** The predict question now opens "Every tie is close or an acquaintance." (24 words in total). The stage rule line is "Rule: two people you're close to must have a tie." Every "link" in learner text is now "tie". Options: an acquaintance (answer, now **first**, index 0) / close / either could be.
- **The title gave the answer away and the hook overpromised.** The title "News comes from acquaintances" stated the answer before the prediction. It is now "The one tie between two groups" (the slug is unchanged). The hook "Your closest friends bring you the most news" claimed something the stage never shows. It is now "News from another friend group has one way in. What kind of tie is it?", which the stage does show (A–B is the only cross-group tie). The reveal no longer suggests acquaintances are better news carriers. It says that news from outside comes in over *that* tie, which must be an acquaintance. A close A–B still carries news in the toy, and the caption keeps saying so ("News crossed, but a close A–B breaks the rule.").
- **Told, not shown (reveal ¶2).** The reveal now points back at the drawn break and extends it to the cases it stands for: "The same break hits D and E, and on B's side F, G and H. So while A or B has a close friend in their own group, the one tie between the groups must be an acquaintance."
- **The broken state was missing from the scripted path.** A–B now **always starts close** after the prediction, whatever the guess. The learner's guess is no longer the start state. That costs a little of the "your own guess breaks" effect for the "close" guessers, but now every learner, including the acquaintance guessers, sees close fail first. DOM order is now C–E check, F–H check, A–B pill, Send news. The QA/walkthrough path therefore shows the broken state (red tint, red dotted C–B with ✗) at steps 1 and 2, with state-aware captions "C–E tie ✓, but no B–C tie ✗" and "F–H tie ✓, but still no B–C tie ✗". Step 3 switches A–B to an acquaintance and step 4 sends news over it. Both milestones are reached on every path. Seen in walkthrough frames 02 and 03 (phone).
- **♥/♡ glyphs.** The legend entries and the A–B pill are now inline SVG swatches (`Swatch`), drawn with the stage's own classes: `bridgeStrong` solid line, `weak` dashed line, and a filled disc for heard news. There are no glyph fonts left except ✓/✗.
- **c5 (Granovetter, withdrawn)** stays out of all learner text.
- **References:** left exactly as they were, as instructed. The fact-checker asked for `section` to move to `section_unconfirmed`. That is still open (owner: cm-math / builder on a later pass).

Stage words at any moment: rule 10 + legend 4 + caption ≤ 9 + button 2 = 25. Reveal: 93 words.

Numbers re-run in node with the lesson's rule: 13 ties; local bridges = [A–B]; all close → 6 broken triples (A: CB, DB, EB; B: FA, GA, HA); A–B acquaintance → 0; 8,192 labellings → 4,160 OK, 64 with A–B close, 0 of them giving A or B another close tie.

Claims: c1, c3 and c4 have new text and are back to **unverified**. c2 is unchanged (verified). c5 is withdrawn.

QA: contract passed on phone and desktop (QA_PORT 3683, own dist dir), recorded with `company qa-record`. In the same run, `feed.spec.ts › subject chips filter the feed` failed on both viewports. That test belongs to the feed, not this lesson, and I did not investigate it. Walkthrough (phone, option 1): I looked at all 6 frames. The caption "A–B is an acquaintance: the rule holds everywhere." wraps to two lines on a Pixel 7. That is acceptable, but it is the longest line.

## Revision v3 (demo-builder, polish, 2026-10-14)

Inputs: design review `company/design/reviews/2026-10-14-design-review-network-pair.md` N1-N8, reconciled constants table.

- **N1** `.box` is now `min(100%, 340px)`: no viewport-height term, scale 1.0 whenever the card is 340 px wide or more (about 0.95 at the narrowest 390 px card inner width). On short phones the stage is taller than before and the platform's card scroll takes it (in the reveal frame the top of C and F is clipped by that scroll: platform behaviour, not changed here).
- **N2** Handle centres to node centres (viewBox units, scale 1): C-E 51.5, F-H 51.5, A-B 52, all >= 48; at 0.95 they are >= 48.9 px.
- **N3** All eight nodes are circles r 16 (were r 15 and 28 px squares). Label 15 px / 800.
- **N4** The x mark ink is `#0d0f14`.
- **N5** Tint strokes kept as emphasis only; no fourth added.
- **N6** News fade step 60 ms (was 90): last node at 180 ms delay + 90 ms fade = 270 ms. Dashed edge `6 5` (was `8 5`). In-group edges stay `--muted` 3 px.
- **N7** Check handles read "Check the rule on tie C-E, checked / not checked yet"; `aria-pressed` removed from the A-B handle.
- **N8** Looked at all six phone frames (Pixel 7): the A-B pill touches neither node, the x dot is clear of the C-E handle, captions are at most two lines.

No learner text changed, so no claim changed status (c1-c4 stay verified, c5 withdrawn). Version 3. QA: contract passes on phone and desktop (QA_PORT 3831, own dist `.next-news3`). In the full-suite run the phone contract failed once under parallel load and passed on two reruns; the feed specs (subject chips, home feed, spaced revisit) fail and belong to the feed, not this lesson.

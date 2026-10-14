# Fact-check: bird-on-the-wire

Independent claim checks for src/demos/physics/bird-on-the-wire. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | held unverified | Read Demo.tsx first: the reveal sentence matches the claim. The claim rests on Ohm's law as stated in an external text (OpenStax UP2 ch. 9). WebFetch failed (DNS) for openstax.org and its mirrors (libretexts, xyzhomework), and curl got a proxy 403. Search snippets only. Not verified: it needs a source that can be opened here, or the evaluation-steward can rule that a basic law may rest on derivation. |
| c2 | verified | Own node port acrossV(cm) = 200 × 0.0002 × cm/100: 5 cm 0.002 V; 2 cm 0.0008 V, which toFixed(3) shows as '0.001 V'; 20 cm 0.008 V. Foot 1 reads V_LINE; foot 2 reads 11,000 − 0.002, which fmtV rounds to '11,000 V'. Seen line 'feet 11,000 V' needs both feet; 'across 5 cm 0.002 V' and the reveal quote the stored across reading (updated by the slider only while in across mode). The 2 cm value is a 3-decimal display of 0.0008 V; the claim says what the stage shows. |
| c3 | verified | Own node port: birdI = birdV / 10,000: 0.002 V gives 2e-7 A, fmtI '0.2 µA' at the 5 cm default (0.1 to 0.8 µA over 2 to 20 cm, so 'about 0.2 µA' is the default case); wing on gives 11,000 / 10,000 = '1.1 A' and the reading 'to pole 11,000 V'. Reveal 'the difference jumped to 11,000 V' needs the pole milestone. These are in-model derivations from illustrative constants; APLIC (2006), cited for real electrocutions, was not opened and is not relied on. |
| c4 | verified | Convention, checked against the SVG: the pole rect runs into the ground line (GROUND = 176), an insulator rect sits on the crossarm, and the wire starts at the insulator (POLE_X + 27), not on the pole. The wing reading (foot to pole) is V_LINE, i.e. the pole is treated as 0 V. No stage text says 'grounded'; the claim is about the drawing. APLIC was not opened and is not needed for a drawing convention. |
| c5 | held unverified | Safety sentence (reveal muted line) is in Demo.tsx exactly as claimed. It rests on air breakdown and utility guidance (OpenStax UP2 7.5, utility safety pages), and none could be opened (DNS failure, proxy 403). Also, the source note says safety wording needs approval by a reader other than its author (W-361 precedent). Left unverified. |
| c6 | verified | Derivation: both feet sit on the same conductor, so their difference at any instant is I(t) × (series impedance per metre) × L. With the model's 200 A and 0.2 ohm/km this is ≤ 0.002 × √2 V peak at 5 cm, i.e. tiny, while each foot swings with the line. The Demo.tsx header states the steady-voltage simplification. It is not on stage (no stage text), so it is a model note, not a learner sentence. |

**Result:** 4 verified, 0 disputed, 2 held unverified (no source could be opened; board W-511, evaluation-steward).

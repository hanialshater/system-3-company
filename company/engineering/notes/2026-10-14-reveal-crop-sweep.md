# Reveal stage-top crop sweep, all lessons at 390×844 (W-264, after W-242)

owner: platform-engineer · date: 2026-10-14 · build: integrated build 5, served at http://localhost:3500 (not
rebuilt; the source changes in flight are not in it) · route: `/d/<slug>` only (the feed was not measured,
see Limits) · tool: `node tools/reveal-fit.mjs --url http://localhost:3500 --jobs 2` (W-242 version)

Decision this informs: `company/decisions/2026-10-14-reveal-fits-with-its-picture.md` (revisit trigger for
option a). Rule: `company/product/demo-standard.md`, "The reveal fits with its picture" and Pre-flight 7.

## Headline

- **217 of 624 measured lessons (35%) have a stage-top crop at the reveal** (crop > 1 px). Median 61 px,
  max 333 px. 177 of them are published, 15 in review, 25 drafts. 14 lessons could not be measured.
- **The reveal's last line is on screen in every measured lesson** (hidden below 0 px in all 624), so the
  W-135 guarantee holds and every crop is the stage top, not the reveal.
- 52 lessons have a stage label that the reveal quotes off screen (heuristic, see Method).
- 2 real thumbnails, no fitted picture flagged: fewest-exits-first-tour (picture 156 px at 0.49 scale)
  and glider-walks (52 px at 0.16). Neither is cropped. Pictures shrunk by the card (`data-reveal-fit`,
  1a879c6) are expected and are no longer counted as thumbnails.
- Crop size: 2-10 px 17 (mostly the stage's top padding plus a few px; cosmetic), 11-50 px 80, 51-100 px 59,
  101-200 px 50, over 200 px 11.

## Causes (and what it says about option a)

Primary cause per cropped lesson, assigned in this order: **reveal length** if cutting the reveal to 90 words
alone would close the crop (excess words ÷ measured words per line × measured px per line); otherwise the
largest non-picture stage block (**controls**, **table**, **stage text**) if that block alone is at least the
crop that is left; otherwise **picture** (the picture is already at the card's 40% floor and only a compact
stage helps).

| cause | lessons | of which fix in flight | median crop px | max crop px | builder fix (demo-standard order) |
|---|---|---|---|---|---|
| controls | 92 | 4 | 90 | 333 | merge control rows; or option (a) if the design lead revisits it |
| reveal length | 77 | 1 | 26 | 112 | trim the reveal to ≤ 90 words (category manager picks the sentence) |
| stage text | 31 | 0 | 106 | 319 | fold stage text into the picture or the caption; trim the reveal too |
| table | 12 | 0 | 86 | 185 | fold the table into the picture |
| picture | 5 | 0 | 182 | 221 | compact stage (design change) |

Option (a) trigger in the decision: "more than about 15% of lessons cropped, *and* most of those crops are
mainly control rows". Measured: 35% cropped. Controls are the tallest stage block in 121 of 217 cropped
lessons (56%), and hiding every control block would by itself close the crop in 174 of 217 (80%).
**Read literally, the revisit trigger is met.** Two cautions for the design lead: (1) a "controls" block is
any stage block holding a `[data-qa="control"]` and outside the picture, so it also counts the labels,
readouts and captions in that row; (2) the decision's objections to (a) still stand (the reveal quotes
control state; the learner keeps exploring after the reveal). The cheaper half of the answer is the
77 reveal-length lessons, which a text trim fixes without any kit change.

The 90-word budget, measured: of 624 measured reveals, 282 are ≤ 90 words and 37 of those still crop
(13%, median 41 px); 180 of the 342 reveals over 90 words crop (53%). A reveal line at 390 px measured
22.5 px (median, paragraph gaps included) and 7.8 words, against the decision's estimate of 23 px and
9 words. So 90 words is about 11.5 lines, about 260 px. 90 looks about right as a target; it is not a
guarantee when the stage has more than one control row.

## Method (W-242)

`tools/reveal-fit.mjs` at 390×844, `isMobile`, `hasTouch`, deviceScaleFactor 2, taps (a click fallback is
tried only if taps never unlock the reveal, and is recorded as `input: "click"`). Same path as the QA
contract: first option, commit, first 16 enabled stage controls (sliders two steps), "Show me why", 900 ms
settle. New fields per lesson:

- `crop`: px the stage's top edge is above the visible card (viewport ∩ clipping ancestors). Matches the
  earlier hand measurement on all six lessons in the stage-crop note (33/45/200/275/99/0).
- `hiddenBelow`: px the reveal's last line is below the visible card (above the footer).
- `named` / `namedHidden`: stage labels that the reveal quotes (svg text, leaf HTML text, aria-label;
  ≥ 4 letters or a 2+ digit number), each visible or not. Heuristic: it finds "the 41 circle" or
  "the left loop", not a picture named only by a noun ("the globe"), and a number can match by chance.
- `parts`: stage height per block (picture, table, controls, text), `revealWords`, `revealLines`,
  `pxPerLine`, `fitted` (drawn/natural px of pictures the card shrank).
- `phoneFit` = crop ≤ 1, hiddenBelow ≤ 2 and namedHidden 0. `--strict` makes it the exit-code bar; the
  default bar is still W-135's.

Raw run: 638 lessons, 2 workers (a QA run shared :3500). The 233 lessons that failed or errored were re-run
with the final tool; 2 moved by more than 3 px between runs (rotation-untangles-the-chain 26 → 5,
route-explosion 95 → 77: animation timing). Spot-checked by screenshot: bridge-parity (8 px, the stage
padding and the top of the North box), rsa-lock-with-public-key (96 px, the public/locked/unlocked labels
the reveal names are off screen).

## Limits

- The feed is not measured; only `/d/<slug>` (a separate board item already asks for a feed mode). The
  feed card has no top bar, so its crops are probably the same or smaller, not measured.
- Not measured (reveal never unlocked on the QA path, with taps or clicks; an exploration-path problem,
  not a fit result): boyer-moore-skips-ahead, dilute-until-none-left, each-element-pops-once,
  exponential-growth, merge-sort-payoff, molecules-in-one-drop, moon-hammer-feather,
  odd-numbers-make-squares, one-dose-of-acid, pendulum-period, ph-log-scale, puck-on-ice-no-push,
  push-the-swing-in-time, race-down-the-ramp. boyer-moore-skips-ahead unlocked once with clicks in a
  check run, so some of these are timing under load.
- Only one path is measured (first option, QA path). A different prediction gives a different reveal and
  a different length.
- Build 5 does not hold the five fixes in flight; their rows show the old state.

## Every cropping lesson (sorted by crop)

| # | lesson | domain | status | crop px | reveal hidden px | words | picture / table / controls / text px | picture fitted (drawn/natural) | named, off screen | cause | note |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | odds-average-the-bettors | economics | draft | 333 | 0 | 116 | 60 / 0 / 294 / 146 | 60/150 | 400 / simple average / 80% / equal money | controls |  |
| 2 | keeping-the-bad-gene | life | published | 319 | 0 | 165 | 54 / 0 / 85 / 236 | 54/135 | 25% / 50% / balance | stage text |  |
| 3 | herd-immunity | life | published | 314 | 0 | 153 | 101 / 0 / 157 / 175 | 101/253 | immune / unprotected / each case infects | stage text |  |
| 4 | every-second-seat-out | cs | review | 275 | 0 | 83 | 128 / 92 / 326 / 80 | 128/320 | 10 / 16 / 19 / 32 / 41 | controls | fix in flight |
| 5 | proposers-get-the-best | cs | draft | 247 | 0 | 117 | 28 / 0 / 222 / 160 | 28/71 | - | controls |  |
| 6 | pennies-dont-add-up | cs | published | 228 | 0 | 131 | 163 / 0 / 165 / 82 | 25/64 | - | controls |  |
| 7 | plus-fifty-minus-forty | probability | published | 226 | 0 | 126 | 79 / 92 / 156 / 87 | 79/198 | - | controls |  |
| 8 | near-and-far-links-find-the-way | probability | published | 221 | 0 | 118 | 106 / 92 / 96 / 100 | 106/264 | target | picture |  |
| 9 | wheel-needs-four-colours | cs | draft | 215 | 0 | 123 | 84 / 0 / 226 / 109 | 84/210 | - | controls |  |
| 10 | karatsuba-three-not-four | cs | draft | 206 | 0 | 100 | 103 / 80 / 96 / 111 | 103/258 | a b c d / schoolbook / karatsuba | picture |  |
| 11 | natural-selection | life | published | 202 | 0 | 125 | 101 / 0 / 206 / 64 | 101/253 | - | controls |  |
| 12 | a-star-heads-for-goal | cs | review | 200 | 0 | 116 | 101 / 88 / 140 / 61 | 101/252 | 16 / 10 | controls | fix in flight |
| 13 | gradient-descent | ai | published | 198 | 0 | 127 | 80 / 0 / 209 / 94 | 80/200 | bottom / step size | controls |  |
| 14 | every-scale-equally-likely | probability | draft | 196 | 0 | 118 | 80 / 92 / 146 / 65 | 80/200 | 10 / 256 / uniform | controls |  |
| 15 | four-queens-pruning | cs | published | 185 | 0 | 84 | 0 / 264 / 78 / 116 | - | - | table |  |
| 16 | strategy-builder | life | published | 182 | 0 | 98 | 78 / 75 / 128 / 104 | 46/115,32/81 | 30 / 14 / 10 | picture |  |
| 17 | earth-flattening | geography | published | 174 | 0 | 90 | 94 / 0 / 120 / 226 | 94/236 | equator | stage text |  |
| 18 | fenwick-hops-by-lowest-bit | cs | draft | 172 | 0 | 93 | 70 / 92 / 113 / 161 | 70/176 | 12 / 13 / 61 | picture |  |
| 19 | range-min-in-four-nodes | cs | draft | 172 | 0 | 133 | 78 / 42 / 188 / 68 | 78/196 | 10 / 11 / 12 / 14 / positions | controls |  |
| 20 | all-lines-meet-in-one-mother | life | draft | 168 | 0 | 101 | 103 / 0 / 178 / 149 | 103/258 | 50 | controls |  |
| 21 | patience-wins-the-split | economics | draft | 167 | 0 | 121 | 74 / 0 / 113 / 161 | 74/184 | 50% / 100% / 400 rounds | stage text |  |
| 22 | the-slowing-half-life | chemistry | review | 166 | 0 | 113 | 84 / 0 / 128 / 168 | 84/210 | 20 / 10 / 1st order | stage text |  |
| 23 | birthday-paradox | probability | published | 164 | 0 | 120 | 108 / 0 / 131 / 126 | 108/270 | 253 | controls |  |
| 24 | huffman-by-merging | cs | published | 164 | 0 | 114 | 268 / 0 / 120 / 20 | 107/268 | bits | controls |  |
| 25 | more-copying-bigger-stars | probability | published | 164 | 0 | 118 | 60 / 125 / 170 / 17 | 60/150 | - | controls |  |
| 26 | wave-from-the-corner | cs | published | 162 | 0 | 96 | 0 / 0 / 385 / 36 | - | next ring | controls |  |
| 27 | accurate-bettor-takes-the-pot | economics | draft | 157 | 0 | 116 | 74 / 92 / 113 / 82 | 74/184 | 50% | controls |  |
| 28 | newton-doubles-the-digits | cs | published | 155 | 0 | 85 | 42 / 0 / 162 / 251 | 42/105 | - | stage text |  |
| 29 | hidden-carriers | life | published | 154 | 0 | 116 | 71 / 142 / 78 / 85 | 71/177 | - | table |  |
| 30 | one-in-four-sprouts | life | published | 154 | 0 | 126 | 91 / 92 / 78 / 88 | 91/228 | - | table |  |
| 31 | two-writers-one-counter | cs | published | 153 | 0 | 83 | 0 / 74 / 88 / 248 | - | both read first | stage text |  |
| 32 | mercator-greenland | geography | review | 152 | 0 | 121 | 94 / 0 / 170 / 56 | 94/236 | equator | controls |  |
| 33 | two-bets-split | economics | review | 152 | 0 | 111 | 80 / 92 / 128 / 54 | 80/200 | - | controls |  |
| 34 | bigger-beetles-everyone-loses | life | published | 147 | 0 | 126 | 51 / 60 / 78 / 107 | 51/128 | small / large | stage text |  |
| 35 | stag-needs-three-in-four | economics | draft | 144 | 0 | 112 | 88 / 92 / 128 / 34 | 88/220 | 50% / 75% / 100% / hare 3 / both hare 3 each / both stag 4 each | controls |  |
| 36 | hawks-never-take-over | life | published | 142 | 0 | 109 | 53 / 60 / 85 / 154 | 53/132 | hawk / dove | stage text |  |
| 37 | clear-the-lowest-one | cs | published | 137 | 0 | 108 | 0 / 0 / 215 / 157 | - | - | controls |  |
| 38 | one-road-cuts-the-map | cs | draft | 135 | 0 | 123 | 106 / 92 / 113 / 68 | 106/266 | - | controls |  |
| 39 | useless-degree-still-pays | economics | published | 133 | 0 | 100 | 78 / 0 / 178 / 81 | 78/196 | degree | controls |  |
| 40 | iss-gravity-still-there | physics | published | 129 | 0 | 113 | 109 / 0 / 146 / 72 | 109/272 | - | controls |  |
| 41 | last-digit-first | cs | published | 123 | 0 | 103 | 66 / 0 / 192 / 96 | 66/166 | - | controls |  |
| 42 | friends-split-more-than-chance | probability | published | 117 | 0 | 114 | 86 / 92 / 121 / 65 | 54/136,31/78 | crosses | controls |  |
| 43 | one-in-a-million-match | probability | published | 114 | 0 | 106 | 67 / 0 / 85 / 159 | 67/166 | - | stage text |  |
| 44 | shoelace-order-matters | cs | published | 114 | 0 | 99 | 82 / 0 / 140 / 150 | 82/206 | - | stage text |  |
| 45 | drop-the-losing-start | cs | published | 113 | 0 | 71 | 151 / 0 / 140 / 140 | 74/184,77/192 | - | controls |  |
| 46 | four-in-a-row-two-thirds | economics | draft | 113 | 0 | 114 | 92 / 42 / 35 / 88 | 92/230 | fallback | stage text |  |
| 47 | shuffle-until-sorted | cs | published | 113 | 0 | 104 | 90 / 87 / 140 / 43 | 39/98,50/126 | - | controls |  |
| 48 | hole-through-earth | geography | published | 112 | 0 | 94 | 64 / 0 / 184 / 120 | 64/160 | - | controls |  |
| 49 | next-word-tally | ai | published | 112 | 0 | 154 | 0 / 0 / 78 / 152 | - | the cat sat on the fish | reveal length |  |
| 50 | same-revenue-any-rule | economics | published | 112 | 0 | 85 | 94 / 0 / 112 / 96 | 94/236 | - | controls |  |
| 51 | window-forgets-start | ai | published | 112 | 0 | 87 | 56 / 142 / 156 / 34 | 56/140 | 13 / 20 | controls |  |
| 52 | lower-bid-takes-the-top-ad | economics | published | 108 | 0 | 120 | 70 / 0 / 113 / 126 | 70/176 | - | stage text |  |
| 53 | twenty-harmless-tests | probability | published | 108 | 0 | 89 | 0 / 0 / 272 / 124 | - | - | controls |  |
| 54 | four-to-one-settles | chemistry | published | 107 | 0 | 118 | 76 / 0 / 85 / 166 | 76/190 | 100 / 20 / 80 | stage text |  |
| 55 | fifty-hour-monday | geography | published | 106 | 0 | 106 | 64 / 0 / 126 / 154 | 64/160 | - | stage text |  |
| 56 | shrinking-degree | geography | review | 106 | 0 | 101 | 128 / 0 / 85 / 154 | 128/320 | - | stage text |  |
| 57 | heavy-but-floats | chemistry | published | 105 | 0 | 105 | 81 / 92 / 128 / 42 | 81/203 | - | controls |  |
| 58 | half-of-humanity | geography | review | 104 | 0 | 97 | 62 / 92 / 124 / 86 | 62/156 | - | controls |  |
| 59 | the-bar-nobody-can-forecast | economics | draft | 103 | 0 | 93 | 80 / 42 / 113 / 50 | 80/200 | 50 | controls |  |
| 60 | hailstone-27-climbs | cs | draft | 102 | 0 | 104 | 100 / 49 / 154 / 61 | 100/249 | - | controls |  |
| 61 | seattle-moscow-heading | geography | published | 101 | 0 | 95 | 104 / 0 / 148 / 106 | 104/260 | seattle / moscow | controls |  |
| 62 | three-students-two-rooms | math | published | 100 | 0 | 109 | 78 / 0 / 156 / 79 | 78/196 | - | controls |  |
| 63 | truck-hits-car-force | physics | published | 100 | 0 | 121 | 60 / 0 / 143 / 74 | 60/150 | - | controls |  |
| 64 | midnight-sun-line | geography | review | 99 | 0 | 125 | 88 / 0 / 143 / 100 | 88/220 | pole | controls | fix in flight |
| 65 | insurance-fair-price | economics | published | 98 | 0 | 126 | 80 / 0 / 52 / 133 | 80/200 | - | reveal length |  |
| 66 | rsa-lock-with-public-key | cs | published | 96 | 0 | 115 | 0 / 0 / 163 / 155 | - | public / locked / unlocked | controls |  |
| 67 | eratosthenes-shadow | geography | review | 94 | 0 | 117 | 94 / 0 / 126 / 84 | 94/236 | alexandria | controls |  |
| 68 | tissot-circles | geography | published | 93 | 0 | 103 | 137 / 92 / 85 / 28 | 137/342 | - | table |  |
| 69 | diagonal-escapes-the-list | math | published | 92 | 0 | 68 | 0 / 316 / 85 / 51 | - | - | table |  |
| 70 | the-grid-takes-up-to-three-eighths | math | published | 91 | 0 | 113 | 44 / 73 / 156 / 76 | 44/110 | - | controls |  |
| 71 | binary-search | cs | published | 90 | 0 | 109 | 38 / 0 / 170 / 58 | 38/96 | 250 | controls |  |
| 72 | dish-runs-out | life | published | 90 | 0 | 109 | 64 / 0 / 213 / 51 | 64/160 | - | controls |  |
| 73 | no-zip-shrinks-everything | cs | published | 90 | 0 | 98 | 0 / 0 / 238 / 84 | - | - | controls |  |
| 74 | pay-for-the-harm-you-do | economics | draft | 90 | 0 | 127 | 88 / 42 / 85 / 64 | 88/220 | without x / with x | reveal length |  |
| 75 | vaccinate-at-the-peak | life | review | 88 | 0 | 118 | 81 / 0 / 128 / 82 | 81/203 | - | controls |  |
| 76 | hidden-third-cause | probability | published | 87 | 0 | 115 | 100 / 0 / 170 / 15 | 100/250 | - | controls |  |
| 77 | compound-interest | economics | published | 86 | 0 | 96 | 80 / 92 / 81 / 69 | 80/200 | - | table |  |
| 78 | groups-where-everyone-reaches-everyone | cs | published | 86 | 0 | 125 | 89 / 0 / 121 / 124 | 89/222 | - | stage text |  |
| 79 | epidemic-overshoot | life | published | 83 | 0 | 109 | 81 / 0 / 120 / 52 | 81/203 | - | controls |  |
| 80 | honolulu-overhead | geography | published | 81 | 0 | 96 | 64 / 0 / 85 / 176 | 64/160 | tropic of cancer / tropic of capricorn / miami / cairo / honolulu | stage text |  |
| 81 | lru-eviction-order | cs | published | 80 | 0 | 141 | 0 / 0 / 78 / 190 | - | - | reveal length |  |
| 82 | one-crowded-bucket | cs | draft | 80 | 0 | 108 | 98 / 42 / 88 / 105 | 98/245 | - | stage text |  |
| 83 | enemies-allow-three-camps | math | draft | 79 | 0 | 114 | 72 / 42 / 88 / 99 | 72/181 | - | stage text |  |
| 84 | cheese-for-bread | economics | published | 78 | 0 | 95 | 80 / 0 / 135 / 115 | 80/200 | model fixed output per hour | controls |  |
| 85 | insertion-by-hand | cs | published | 78 | 0 | 108 | 0 / 0 / 160 / 142 | - | - | controls |  |
| 86 | route-explosion | cs | published | 77 | 0 | 112 | 84 / 0 / 163 / 50 | 84/210 | - | controls |  |
| 87 | selfish-routes-cost-a-third-more | cs | draft | 77 | 0 | 134 | 83 / 42 / 85 / 88 | 83/207 | 60 | reveal length |  |
| 88 | london-december-noon-sun | geography | published | 76 | 0 | 93 | 86 / 0 / 135 / 134 | 86/214 | equinox | controls |  |
| 89 | free-rider-pot | economics | published | 75 | 0 | 119 | 80 / 0 / 120 / 62 | 80/200 | - | reveal length |  |
| 90 | land-hemisphere | geography | published | 75 | 0 | 68 | 88 / 92 / 195 / 28 | 88/220 | - | controls |  |
| 91 | china-one-clock | geography | published | 74 | 0 | 103 | 60 / 0 / 126 / 120 | 60/150 | kashgar / shanghai | controls |  |
| 92 | half-life | chemistry | published | 74 | 0 | 113 | 64 / 0 / 85 / 128 | 64/160 | - | stage text |  |
| 93 | undo-a-multiplication-mod-n | cs | published | 74 | 0 | 106 | 60 / 42 / 113 / 154 | 60/150 | - | stage text |  |
| 94 | cut-the-cube-surface | chemistry | published | 73 | 0 | 94 | 105 / 92 / 78 / 92 | 105/262 | - | table |  |
| 95 | bad-hash-one-bucket | cs | published | 72 | 0 | 135 | 86 / 0 / 149 / 68 | 86/214 | - | reveal length |  |
| 96 | paths-by-adding | math | published | 72 | 0 | 90 | 300 / 0 / 35 / 37 | 224/300 | - | picture |  |
| 97 | penalty-on-wiggle | ai | review | 69 | 0 | 126 | 78 / 0 / 185 / 34 | 78/196 | - | reveal length |  |
| 98 | square-root-wealth | economics | published | 68 | 0 | 107 | 64 / 92 / 85 / 57 | 64/160 | felt value / 25 | table |  |
| 99 | weak-links-hold-it-together | probability | draft | 68 | 0 | 74 | 139 / 0 / 118 / 110 | 100/251,38/96 | - | controls |  |
| 100 | drift-of-a-straight-throw | geography | published | 67 | 0 | 117 | 94 / 0 / 126 / 62 | 94/236 | - | reveal length |  |
| 101 | fib-call-explosion | cs | published | 66 | 0 | 68 | 256 / 0 / 85 / 52 | 186/256 | - | controls |  |
| 102 | a-birthday-like-mine | probability | published | 65 | 0 | 101 | 48 / 92 / 85 / 48 | 48/120 | - | table |  |
| 103 | background-shortcut | ai | published | 64 | 0 | 107 | 79 / 0 / 156 / 50 | 79/198 | - | controls |  |
| 104 | better-in-every-group-worse-overall | probability | published | 62 | 0 | 110 | 69 / 42 / 128 / 45 | 69/172 | - | controls |  |
| 105 | patience-piles | cs | published | 62 | 0 | 99 | 0 / 0 / 243 / 95 | - | - | controls |  |
| 106 | spreaders-are-rare | life | published | 62 | 0 | 109 | 101 / 92 / 35 / 37 | 101/253 | - | table |  |
| 107 | supply-demand | economics | published | 62 | 0 | 120 | 84 / 42 / 124 / 34 | 84/210 | bakers bake | reveal length |  |
| 108 | projectile-angle | physics | published | 61 | 0 | 118 | 76 / 42 / 81 / 68 | 76/190 | - | reveal length |  |
| 109 | stop-at-epoch-sixty | ai | published | 61 | 0 | 117 | 102 / 0 / 85 / 80 | 76/190,26/64 | - | reveal length |  |
| 110 | stable-until-mutants-meet | life | published | 60 | 0 | 110 | 51 / 60 / 78 / 107 | 51/128 | - | stage text |  |
| 111 | doubling-finds-the-edge | cs | published | 58 | 0 | 108 | 45 / 92 / 121 / 65 | 45/112 | - | controls |  |
| 112 | waves-return | life | published | 57 | 0 | 109 | 73 / 0 / 120 / 52 | 41/101,32/81 | - | reveal length |  |
| 113 | interpolation-guesses-the-page | cs | published | 56 | 0 | 103 | 87 / 0 / 132 / 84 | 87/216 | - | controls |  |
| 114 | coaster-track-shape | physics | published | 54 | 0 | 99 | 45 / 0 / 141 / 88 | 45/112 | steep ramp | controls |  |
| 115 | king-queen-arrow | ai | published | 54 | 0 | 83 | 94 / 0 / 164 / 84 | 94/236 | woman / queen / crown | controls |  |
| 116 | one-in-a-million-daily | probability | published | 54 | 0 | 89 | 86 / 92 / 113 / 55 | 86/215 | - | controls |  |
| 117 | random-surfer-finds-the-rank | cs | published | 52 | 0 | 114 | 87 / 42 / 78 / 67 | 87/216 | - | reveal length |  |
| 118 | same-push-twice-the-mass | physics | published | 52 | 0 | 110 | 78 / 0 / 108 / 100 | 78/194 | 10 | reveal length |  |
| 119 | outside-option-sets-the-split | economics | draft | 51 | 0 | 114 | 69 / 0 / 90 / 107 | 69/173 | - | reveal length |  |
| 120 | same-genes-different-drift | life | published | 51 | 0 | 100 | 91 / 0 / 120 / 37 | 91/228 | - | controls |  |
| 121 | armour-where-no-holes | probability | published | 49 | 0 | 109 | 96 / 92 / 78 / 0 | 96/241 | engines | reveal length |  |
| 122 | continental-jigsaw | geography | review | 49 | 0 | 107 | 108 / 0 / 85 / 84 | 108/270 | gulf of guinea | reveal length |  |
| 123 | monty-hall-100-doors | probability | published | 49 | 0 | 130 | 0 / 0 / 157 / 79 | - | - | reveal length |  |
| 124 | confident-and-wrong | ai | published | 48 | 0 | 106 | 74 / 0 / 120 / 62 | 74/185 | - | controls |  |
| 125 | kitchen-crowding | economics | published | 48 | 0 | 114 | 80 / 0 / 137 / 39 | 80/200 | - | reveal length |  |
| 126 | mouse-vs-elephant | life | published | 48 | 0 | 112 | 81 / 42 / 85 / 37 | 81/203 | - | reveal length |  |
| 127 | closer-in-winter | geography | published | 47 | 0 | 92 | 107 / 0 / 85 / 116 | 107/268 | - | stage text |  |
| 128 | middle-of-three-takes-all | economics | published | 47 | 0 | 119 | 89 / 0 / 78 / 81 | 89/222 | - | reveal length |  |
| 129 | same-letters-same-key | cs | published | 47 | 0 | 88 | 0 / 92 / 155 / 83 | - | - | controls |  |
| 130 | base-rates | probability | published | 46 | 0 | 117 | 80 / 0 / 161 / 34 | 80/200 | - | reveal length |  |
| 131 | no-best-move-one-stable-pair | economics | published | 46 | 0 | 100 | 0 / 0 / 201 / 96 | - | - | controls |  |
| 132 | one-shy-rioter-stops-the-riot | math | published | 46 | 0 | 107 | 128 / 42 / 78 / 35 | 128/320 | - | reveal length |  |
| 133 | leaky-vaccine-threshold | life | published | 45 | 0 | 98 | 81 / 0 / 135 / 52 | 81/203 | - | controls |  |
| 134 | never-flag-99 | ai | published | 45 | 0 | 98 | 80 / 0 / 142 / 53 | 80/200 | - | controls |  |
| 135 | one-odd-loop-blocks-two-camps | math | review | 45 | 0 | 100 | 74 / 0 / 132 / 106 | 74/184 | - | controls | fix in flight |
| 136 | attention-shares-one | ai | published | 43 | 0 | 98 | 92 / 0 / 85 / 102 | 92/230 | - | stage text |  |
| 137 | bank-lends-it-again | economics | published | 43 | 0 | 102 | 80 / 0 / 70 / 62 | 80/200 | - | controls |  |
| 138 | heads-after-heads-trap | probability | published | 43 | 0 | 81 | 0 / 92 / 210 / 35 | - | - | controls |  |
| 139 | blocked-cell-routes | cs | published | 41 | 0 | 73 | 0 / 0 / 335 / 38 | - | - | controls |  |
| 140 | pockets-below-threshold | life | published | 41 | 0 | 101 | 67 / 0 / 135 / 83 | 67/169 | town a / town b | controls |  |
| 141 | throw-it-fast-enough | physics | review | 39 | 0 | 124 | 110 / 0 / 50 / 103 | 110/276 | - | reveal length |  |
| 142 | new-server-moves-few-keys | cs | published | 38 | 0 | 110 | 128 / 45 / 96 / 30 | 128/320 | - | reveal length |  |
| 143 | postfix-stack-run | cs | published | 37 | 0 | 85 | 0 / 0 / 84 / 272 | - | - | stage text |  |
| 144 | shade-your-sealed-bid | economics | published | 37 | 0 | 98 | 79 / 42 / 138 / 20 | 79/198 | - | controls |  |
| 145 | back-button-stack | cs | published | 36 | 0 | 128 | 0 / 0 / 78 / 196 | - | - | reveal length |  |
| 146 | loaf-with-smoke | economics | published | 36 | 0 | 102 | 62 / 92 / 85 / 54 | 62/156 | - | table |  |
| 147 | ray-counts-crossings | cs | draft | 36 | 0 | 111 | 96 / 0 / 78 / 121 | 96/240 | - | reveal length |  |
| 148 | who-has-grandchildren | life | published | 36 | 0 | 109 | 73 / 42 / 85 / 37 | 73/181 | - | reveal length |  |
| 149 | average-that-never-settles | probability | published | 35 | 0 | 103 | 57 / 0 / 78 / 143 | 57/141 | - | reveal length |  |
| 150 | pinhole-flips-the-world | physics | published | 35 | 0 | 99 | 70 / 0 / 185 / 42 | 70/176 | - | controls |  |
| 151 | the-pivotal-juror-convicts | probability | published | 35 | 0 | 115 | 56 / 0 / 78 / 122 | 56/140 | - | reveal length |  |
| 152 | twins-never-split | ai | published | 35 | 0 | 81 | 89 / 92 / 78 / 52 | 89/222 | - | table |  |
| 153 | point-one-is-26-percent | chemistry | published | 34 | 0 | 111 | 89 / 92 / 128 / 0 | 89/223 | - | reveal length |  |
| 154 | undo-a-bad-push | cs | published | 34 | 0 | 110 | 72 / 0 / 188 / 38 | 72/180 | - | reveal length |  |
| 155 | bending-frontier | economics | review | 33 | 0 | 124 | 102 / 0 / 93 / 62 | 102/256 | - | reveal length | fix in flight |
| 156 | monopolist-holds-back | economics | published | 33 | 0 | 100 | 80 / 0 / 85 / 81 | 80/200 | - | controls |  |
| 157 | triangle-three-right-angles | geography | published | 33 | 0 | 115 | 101 / 92 / 50 / 30 | 101/252 | - | reveal length |  |
| 158 | atoms-across-a-hair | chemistry | published | 32 | 0 | 82 | 139 / 0 / 85 / 92 | 139/348 | - | stage text |  |
| 159 | bad-start-kmeans | ai | published | 32 | 0 | 112 | 60 / 0 / 213 / 28 | 60/150 | - | reveal length |  |
| 160 | antibiotic-already-there | life | published | 30 | 0 | 73 | 91 / 0 / 156 / 79 | 91/228 | - | controls |  |
| 161 | heapify-from-the-bottom | cs | published | 30 | 0 | 80 | 363 / 0 / 0 / 32 | 176/210,176/210 | - | stage text |  |
| 162 | two-distances-two-places | geography | published | 30 | 0 | 82 | 74 / 0 / 176 / 72 | 74/186 | - | controls |  |
| 163 | deleted-key-breaks-search | cs | published | 29 | 0 | 124 | 53 / 0 / 88 / 104 | 53/133 | - | reveal length |  |
| 164 | cheapest-is-not-shortest | cs | published | 28 | 0 | 88 | 200 / 0 / 35 / 104 | 168/200 | - | stage text |  |
| 165 | hanoi-tower-doubles | cs | published | 28 | 0 | 82 | 0 / 0 / 251 / 90 | - | - | controls |  |
| 166 | lemon-market-unravels | economics | published | 27 | 0 | 83 | 52 / 92 / 128 / 54 | 52/130 | - | controls |  |
| 167 | shrink-toward-zero | ai | published | 27 | 0 | 103 | 60 / 42 / 85 / 68 | 60/150 | - | reveal length |  |
| 168 | count-the-out-of-order-pairs | cs | published | 26 | 0 | 84 | 94 / 92 / 96 / 70 | 94/236 | - | controls |  |
| 169 | only-the-needed-trader-profits | economics | draft | 26 | 0 | 102 | 86 / 0 / 78 / 81 | 86/214 | - | reveal length |  |
| 170 | the-fast-ones-leave | chemistry | published | 25 | 0 | 118 | 190 / 0 / 35 / 12 | 147/176 | - | reveal length |  |
| 171 | immunity-eats-r | life | published | 24 | 0 | 95 | 95 / 0 / 85 / 71 | 95/236 | - | controls |  |
| 172 | draw-the-xor-lines | ai | published | 23 | 0 | 140 | 96 / 0 / 120 / 0 | 96/240 | - | reveal length |  |
| 173 | few-survivors | life | published | 22 | 0 | 115 | 93 / 0 / 78 / 37 | 93/232 | - | reveal length |  |
| 174 | pairs-cancel-under-xor | cs | published | 22 | 0 | 108 | 78 / 0 / 96 / 127 | 78/196 | - | reveal length |  |
| 175 | pesticide-paradox | life | published | 21 | 0 | 103 | 85 / 0 / 85 / 93 | 85/213 | pests / predators / no spray | reveal length |  |
| 176 | ruler-on-mercator | geography | review | 21 | 0 | 100 | 105 / 0 / 85 / 84 | 105/262 | - | reveal length |  |
| 177 | null-island-lat-lon | geography | published | 20 | 0 | 104 | 64 / 0 / 143 / 70 | 64/160 | - | reveal length |  |
| 178 | sorted-input-sinks-quicksort | cs | published | 20 | 0 | 82 | 102 / 0 / 148 / 86 | 102/254 | - | controls |  |
| 179 | sunk-cost-exit | economics | published | 20 | 0 | 92 | 84 / 0 / 100 / 19 | 84/210 | - | controls |  |
| 180 | binary-fingers | math | published | 19 | 0 | 107 | 37 / 0 / 176 / 79 | 37/92 | - | reveal length |  |
| 181 | city-poll-nation-poll | probability | published | 17 | 0 | 98 | 65 / 0 / 156 / 78 | 65/162 | - | reveal length |  |
| 182 | every-message-is-possible | cs | published | 17 | 0 | 78 | 0 / 141 / 150 / 53 | - | - | controls |  |
| 183 | horizon-ruler | geography | review | 17 | 0 | 106 | 91 / 0 / 126 / 56 | 91/228 | - | reveal length |  |
| 184 | bearing-spiral-to-the-pole | geography | published | 15 | 0 | 99 | 120 / 0 / 78 / 70 | 120/300 | - | reveal length |  |
| 185 | call-stack-depth | cs | published | 15 | 0 | 97 | 0 / 0 / 318 / 0 | - | - | reveal length |  |
| 186 | rule-of-72-shortcut | economics | published | 15 | 0 | 108 | 80 / 42 / 85 / 19 | 80/200 | - | reveal length |  |
| 187 | running-median-two-heaps | cs | published | 15 | 0 | 109 | 60 / 0 / 78 / 166 | 60/150 | - | reveal length |  |
| 188 | who-pays-same-filter | economics | draft | 15 | 0 | 102 | 253 / 0 / 0 / 20 | 72/179,72/179 | - | reveal length |  |
| 189 | cell-too-big | life | published | 14 | 0 | 107 | 91 / 0 / 142 / 37 | 91/228 | - | reveal length |  |
| 190 | coin-greedy-trap | cs | published | 14 | 0 | 101 | 0 / 0 / 118 / 176 | - | - | reveal length |  |
| 191 | fastest-at-the-bend | life | published | 14 | 0 | 100 | 80 / 0 / 135 / 49 | 80/200 | - | reveal length |  |
| 192 | no-fraction-fits | math | review | 14 | 0 | 111 | 40 / 0 / 140 / 118 | 40/100 | - | reveal length |  |
| 193 | equinox-twelve-everywhere | geography | published | 13 | 0 | 113 | 74 / 0 / 100 / 92 | 74/184 | - | reveal length |  |
| 194 | honest-bid-loses-in-gsp | economics | published | 13 | 0 | 95 | 87 / 0 / 90 / 76 | 87/216 | - | reveal length |  |
| 195 | in-order-is-sorted | cs | published | 13 | 0 | 99 | 190 / 0 / 70 / 72 | 173/190 | - | reveal length |  |
| 196 | tax-who-pays | economics | published | 13 | 0 | 110 | 80 / 0 / 120 / 20 | 80/200 | - | reveal length |  |
| 197 | atlantic-to-pacific-heading | geography | published | 12 | 0 | 76 | 76 / 0 / 228 / 28 | 76/190 | - | controls |  |
| 198 | overfitting | ai | published | 12 | 0 | 126 | 80 / 0 / 50 / 91 | 80/200 | - | reveal length |  |
| 199 | three-giants-in-africa | geography | published | 12 | 0 | 113 | 132 / 0 / 76 / 52 | 132/330 | - | reveal length |  |
| 200 | flip-twenty-percent | ai | published | 11 | 0 | 73 | 123 / 0 / 85 / 94 | 123/307 | - | stage text |  |
| 201 | ambulance-pitch-drop | physics | published | 10 | 0 | 112 | 68 / 76 / 50 / 34 | 68/170 | - | reveal length |  |
| 202 | shortest-way-to-tokyo | geography | published | 10 | 0 | 111 | 85 / 0 / 76 / 87 | 85/212 | - | reveal length |  |
| 203 | whose-cutoff-wins | ai | published | 10 | 0 | 107 | 86 / 0 / 85 / 61 | 86/214 | - | reveal length |  |
| 204 | bridge-parity | math | published | 8 | 0 | 82 | 213 / 0 / 83 / 51 | 201/213 | - | controls |  |
| 205 | negative-edge-fools-dijkstra | cs | published | 7 | 0 | 100 | 302 / 0 / 0 / 0 | 67/168,67/168 | - | reveal length |  |
| 206 | spam-threshold-tradeoff | ai | published | 7 | 0 | 118 | 67 / 0 / 85 / 76 | 67/168 | - | reveal length |  |
| 207 | inflation-halves-cash | economics | published | 6 | 0 | 100 | 94 / 0 / 85 / 61 | 94/236 | - | reveal length |  |
| 208 | outbreak-can-fizzle-above-one | life | published | 6 | 0 | 100 | 75 / 92 / 70 / 52 | 75/188 | - | reveal length |  |
| 209 | coin-gap-keeps-growing | probability | published | 5 | 0 | 93 | 83 / 92 / 78 / 30 | 83/207 | - | reveal length |  |
| 210 | pixel-nudges-add-up | ai | published | 5 | 0 | 119 | 86 / 0 / 142 / 0 | 86/214 | - | reveal length |  |
| 211 | rotation-untangles-the-chain | cs | draft | 5 | 0 | 79 | 121 / 0 / 88 / 131 | 121/303 | - | stage text |  |
| 212 | salt-and-concert-tickets | economics | published | 5 | 0 | 86 | 76 / 0 / 85 / 62 | 76/190 | - | controls |  |
| 213 | word-in-pieces | ai | published | 5 | 0 | 130 | 48 / 0 / 77 / 70 | 48/120 | - | reveal length |  |
| 214 | clay-boat | physics | published | 4 | 0 | 111 | 78 / 0 / 50 / 114 | 78/196 | - | reveal length |  |
| 215 | centre-moves-the-gap | geography | published | 3 | 0 | 88 | 67 / 0 / 126 / 87 | 67/168 | - | controls |  |
| 216 | union-find-shortcut | cs | published | 3 | 0 | 108 | 69 / 0 / 122 / 70 | 69/172 | - | reveal length |  |
| 217 | cut-the-island | life | published | 2 | 0 | 98 | 72 / 0 / 85 / 79 | 72/179 | - | reveal length |  |

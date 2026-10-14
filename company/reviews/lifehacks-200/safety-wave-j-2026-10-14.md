# Safety review: Life Hacks Wave J briefs (W-568)

date: 2026-10-14 · reviewer: lifehacks-safety-reviewer (Sana) · scope: the 9 briefs under "## Wave J" in `company/domains/briefs/lifehacks.md` (ranks 6-14). **Brief-stage review.** Nothing is built, so there is no walkthrough and no artifact verdict. This record clears briefs to be built. It does not attest any lesson; launch review must still read each walkthrough.

Inputs read: the 9 briefs; the charter `company/domains/lifehacks.md` (refuse list, A1-A5); `company/domains/lifehacks-scope/safety.md` (classes, strand table, required lines, proposed refuse items); `company/ops/brief-skips.json`; board W-568, W-570, W-556; `company/domains/briefs/checks/lifehacks-wave-j-check.mjs`, which I ran (output below).

## Verdicts

Vocabulary: **go** (safe to build as written), **go with changes** (safe to build once the listed changes are in the brief or the lesson), **refuse** (never taught). No brief is refused. Changes in the second group are conditions, not suggestions. Where I propose wording, I may not approve it: a second reader does (see "Who does what").

| # | Brief | Class | Verdict |
|---|---|---|---|
| 6 | mix-the-problem-types | none | go |
| 7 | style-match-needs-a-crossover | none | go |
| 8 | top-ups-count-the-same | review | go with changes |
| 9 | three-copies-one-house | warning | go with changes |
| 10 | reviews-that-spread-out | none | go |
| 11 | salt-makes-ice-colder | review | go with changes |
| 12 | lid-on-boils-first | review | go with changes |
| 13 | steak-keeps-cooking | review | go with changes (the brief as drafted is not buildable; see below) |
| 14 | sizzle-means-no-seal | review | go with changes |

## The refuse list, and what is actually in force

The charter's refuse list has **five** items: mixing cleaning chemicals; medical, dosage or diagnosis hacks; electrical work beyond a bulb or breaker; defeating a safety device; legal or financial advice. "Damaged or swollen batteries, and any charging hack" is item 6 of my **proposed** additions (`safety.md` section 5). It takes effect only when cm-lifehacks puts it in the charter and the wording is confirmed. I am applying it anyway, in the sense I meant it, because the brief itself asks for the ruling. None of the other briefs touches any of the five charter items or any of the eight proposed ones. Items 1 (food-safety shortcuts) and 5 (homemade disinfectants) matter to brief 13 and are applied there.

## Numbers

`node company/domains/briefs/checks/lifehacks-wave-j-check.mjs` was run today. Every figure a learner would see in the briefs matches the output: J6 (3 vs 12 choice problems; 8.5 vs 7.4 practice; 3.7 vs 5.4 test); J7 (only Study 3 supports matching; the question's fact holds in all three); J8 (24 cycles each, 60 vs 30 plug-ins); J9 (1 in 195, 1 in 200, 1 in 2,439; tallies 569, 43, 52, 3); J10 (days 1, 3, 7, 15, 31; 20 and 60 for the other presets; 80.0% dips; 81.7% on day 60); J11 (24.1, 12.7, 8.8 min; 13.6%); J12 (8.9 vs 7.5 min; 502, 641, 539 kJ; 22.6 kJ; 3.6 K); J13 (rises and peaks as the brief lists); J14 (48 kJ; 2.1, 7.1, 10.6 g). I checked arithmetic only. Whether the models match the world, and the owed sources, are the fact-checker's (W-571).

## 8. top-ups-count-the-same: the ruling on refuse item 6

**Ruling: this brief is not a charging hack, and it is allowed, on conditions.** The lesson teaches how a counter counts (charge added, not plug-ins). It tells the learner nothing to do. It has no instruction about when, how fast, how far, with what accessory or in what state to charge. What item 6 exists to stop is a how-to: overnight rules, percentage bands, "revive a dead or swollen battery", cable and charger workarounds. A debunk that corrects a counting belief and gives no instruction is outside it. The ruling holds only while the lesson stays that way, so these are conditions:

1. **No recommended behaviour.** The reveal and stage must not say or imply "so charge like Ana" or "so top up". Ana's 50-90% and Ben's 10-90% habits must be labelled as made-up examples on the stage (for example "Made-up habits, not advice"). Neither habit may be shown as the better one.
2. **The claim is about the count, not about wear.** Equal cycles does not mean equal wear, and the brief rightly refuses "shallow cycles wear the battery less". But "Draining to 0% first saved nothing" can read as "deep discharge costs nothing". Change it to "saved no cycles" and add one stage caption: "This counts cycles, not wear." Record it as a claim with the manufacturer's definition as its source.
3. **Required line, on the stage as well as in the reveal:** "A swollen battery goes to a recycling point, not a charger." Recorded as an advice claim. Its source is owed (a manufacturer or a product-safety regulator). The wording is mine, so a second reader approves it.
4. **Hero:** no damaged, opened or swollen phone, no cable plugged into anything on fire or sparking, nothing that shows a charger being modified.
5. **Not allowed on the card, now or in a later variant:** overnight charging, heat, fast or third-party chargers, "calibration", any percentage band as a target.
6. **Region:** none needed (checklist e). The definition of a cycle is the manufacturer's and is universal.

**Recommendation to cm-lifehacks, which owns the charter:** when item 6 is added, word it as "instructions for charging damaged or swollen batteries, and charging workarounds (rates, timing, thresholds, accessories)", so that counting lessons like this one are not caught by the phrase "any charging hack". I will confirm the final wording once a second reader has seen it.

## 13. steak-keeps-cooking: food-safety shortcut risk

**As drafted, this brief should not be built.** The model values are fine as physics. The problem is how they reach the learner. The prediction says "comes off the heat when its centre reads 50 °C", and the reveal says the centre "climbed from 50 °C to about 55 °C" and near 58 °C with a hotter outside. A learner reads that as: pull a steak at 50, it finishes at 55. That is the "take it off early" shortcut. 50 °C is below any minimum internal temperature I know a food-safety body to give for beef, and the brief has no verified source for any number. The "follow your food-safety body" tail does not undo it; it is a sentence beside a number that looks like a target. Proposed refuse items 1 (food-safety shortcuts) and the kitchen strand's out-of-scope list apply to the draft.

**Rulings on the brief's checklist:**

- **(a) Temperatures on the card: no absolute temperature.** The card shows the **rise** only: "the centre kept climbing by about 5 degrees". Readouts and the peak marker show degrees gained since it left the heat. No pull point, no centre temperature, no "safe" or doneness number. The preset labels "Outer 60/70/80 °C" must also go, because a model input in °C reads as a cooking temperature. Use relative labels ("Outer: warm", "hotter", "hottest") and let the outer temperature appear only as the model's own made-up setting in the claim record, not on the card. The rises already follow from the script: 2.4, 5.3 and 8.4 °C at the peak, and 1.5, 4.7 and 7.9 °C at 10 minutes (centre at 10 min minus 50). The cm must restate the prediction and the options in those terms, and the check must be re-run.
- **(b) "Take it off early, it will finish": must not be taught.** The reveal explains why the centre rises. It must not say or imply that this lets you pull the steak sooner or that resting replaces reaching a temperature. Resting may be mentioned as "still cooking", nothing more. A line that some food-safety guidance counts a rest as part of the cooking is allowed **only** if the fact-checker verifies it against a food-safety body (USDA FSIS or the region's), and the International team flags it as region-dependent. If it cannot be verified, it is left out.
- **(c) Required line, on the stage:** "Use a thermometer: colour does not show doneness." Recorded as an advice claim. The extra "follow your food-safety body's temperatures" is allowed only if it stays one line with this one; the first line alone is the required one.
- **Colour:** the cross-section strip is coloured by temperature. It must not use meat colours (pink, red, brown). A pink-to-brown strip teaches doneness by colour, which the required line contradicts. Use a neutral scale with a text and pattern cue, not colour alone.
- **Scope of the model:** the lesson says "steak" or "a thick whole cut" and states that the model is made up. It must not generalise to poultry, mince, burgers or pork, where the centre matters in a different way.
- **(d) Hero:** a plated or pan-side steak cooked through is fine. No raw meat, no hands, no knife, no flame.
- **(e) Arabic examples:** halal default (`localization.md` section 3): no pork, no alcohol in a pan sauce, no flambé. Food temperatures and rest guidance go to the International team as region-dependent.
- If the changes above are made, the claim "no food-safety temperature appears" is a **claim to check at walkthrough**: every number on the card is a rise or a time.

**Confidence:** high that the draft is unsafe as written; medium that the rewrite keeps the lesson interesting (the rise alone is a weaker hook than 50 to 55, and that is the cost I am accepting).

## The other kitchen heat briefs

The kitchen strand is review on every lesson. The kitchen pattern note (allowed mechanisms, required lines, hero must-not-show list) promised in `safety.md` section 7 **does not exist yet**. I owe it. It is on the board for me. Briefs 11, 12 and 14 stay held until it exists and kitchen opens.

### 11. salt-makes-ice-colder: go with changes

- **(a) Salt-and-ice skin injury.** No hand, finger or skin on the stage or in the hero. The line "Salted ice is colder than ice: keep it off skin." is recorded as an advice claim, with a burns or frostbite safety source owed. The line must be on the stage near the bath thermometer, not only at the end of the reveal.
- **Can below freezing.** The model's can keeps falling past 5 °C. At −10 °C it reaches about −5 °C by 30 minutes, which the stage would show as a can freezing. Required: end the can's curve at 5 °C (and the scrubber with it), or stop it at the question's own case. No can below 0 °C is drawn. This keeps "leave a can in salted ice" from becoming a bursting-can hack.
- **−20 °C preset.** Keep only if the NaCl eutectic claim is verified (the brief already says to drop it otherwise). Either way, the preset is labelled "made-up model".
- (b) No children shown: confirmed as a condition. (c) No food-safety claim: the card says "drink can", never "chilled food". (d) No glass, no freezer, no sealed container: confirmed as a condition. (e) Region: universal.

### 12. lid-on-boils-first: go with changes

- **Steam line.** The brief's "Lift a lid away from you: steam burns." is ambiguous. I propose "Tilt the lid away from you: steam burns.", on the stage beside the steam card as well as in the reveal, recorded as an advice claim with a burns-safety source owed. Second reader required.
- **(b)** No hand over a pot, no child, no hob left unattended. Add: the card must not suggest covering and walking away. Nothing about boil-over, and nothing that sounds like sealing a pot or a pressure cooker.
- **Only water.** The lesson says "water". It must not be read as covering any other pot (oil in particular).
- **(c)** Arithmetic in kJ only: confirmed. **(d)** Hero: a pot with a lid, no flame detail, no hands, no steam rising toward a face. **(e)** Region: universal.

### 14. sizzle-means-no-seal: go with changes

- **Required lines on the stage:** "Use a thermometer: colour does not show doneness." Add "Hot oil and water do not mix: never add water to hot fat." **if any fat, oil or liquid is drawn in the pan.** Simplest is to draw a dry pan and no fat, which needs only the first line.
- **(b)** No smoking oil, flare, flambé, spatter or hand over the pan, on the stage or in the hero.
- **(c)** "2 minutes a side" is a model input, not a doneness time. Say so on the stage ("made-up model"), and do not show the steak as finished. The "brown crust" sentence stays about flavour and never about doneness.
- **Not a bacteria claim.** The debunk is about juice. It must not say, or imply, anything about whether a sear makes meat safe or unsafe. Some food-safety guidance (for example the UK's) uses "sealed" for outside surfaces cooked on a whole cut. International should flag that the word is used in two senses before the lesson ships in any other region.
- **Weak claim.** Claim 3 (McGee) is the lesson's only empirical sentence and is unverified. If it fails, the brief already says to end the reveal at "the pan would go quiet". I agree. That is a misleading-the-learner risk, not a physical one.
- Build order: 13 before 14, as the brief says.

## Study and digital briefs

### 6. mix-the-problem-types: go

Class none, confirmed. No health, sleep, stress or "brain" framing; nothing about cheating. The model must be called illustrative on the stage: the draft caption says "Model: ..." without the word. At build, make it "Made-up model:" or similar. This is a build check, not a change to the brief. The classroom-study sentence (Rohrer & Taylor 2007) is unverified; cutting it leaves the reveal standing on the model (the brief says so).

### 7. style-match-needs-a-crossover: go

Class none, confirmed. All four checks pass on the draft: nothing implies dyslexia, ADHD, learning disabilities or accommodations are a myth, because the debunk is about matching to a self-reported preference; preferences are called real; no teacher or student is blamed; there is no "brain type" language. Build checks: the stage says the groups are "say they prefer pictures / words" and the scores are made up; the card has no sentence about disability or support. Safety does not depend on Pashler et al. 2008, but **honesty does**: without it, this is not a debunk (the brief says the same). The fact-checker's W-571 gates shipping, not the build. One non-safety note for the formats owner: the reveal's "In Studies 1 and 2" refers to a study the milestones do not force the learner to open.

### 9. three-copies-one-house: go with changes

- **Illustrative rates, in the reveal too.** The stage labels the rates as made up, as the brief says. The reveal currently states "about 1 year in 195 / 2,400" as fact. Add "With these made-up rates" (or "in this model") to the reveal. The numbers must not be quotable as real drive statistics (checklist c).
- **State the model's independence assumption.** Drive failures are independent of each other in this model. Real drives bought together can fail together, which is a version of the lesson's own point. One short caption line is enough.
- **(a)** No account, password, cloud-login or ransomware content: confirmed. **(b)** No vendor named, no claim that "the cloud" is safe, and "another address" stays as drawn (two houses): confirmed as a condition. **(d)** No strand line is needed here. "Only on your own device and accounts." applies to lessons that operate a device or account, and this one operates neither. No line at all is the right choice.
- Class warning is satisfied by the changes above. If a later version adds encryption, accounts or cloud storage, it is review class and comes back to me.

### 10. reviews-that-spread-out: go

Class none, confirmed. No exam-stress, sleep or "memory boost" framing in the draft; the model is labelled illustrative in the reveal ("The model is illustrative: real gaps depend on you and the material"); the caption line does not say so yet. Build check: the stage itself carries the word "illustrative" on the curve. Leitner (claim 4) stays out of learner text unless verified, as the brief says.

## Skip lines (`company/ops/brief-skips.json`)

**All 9 stay.** None is removed, for these reasons.

- **6, 7, 10 (study, wave 1).** Safety is cleared. The charter gate allows them: they are the gap concepts A2 puts first, the study strand is open in wave 1, and study goes from 12 to 15 lessons, the cap. But **W-570 is not ruled** (board state `next`), and its question 3 (does W-556 Wave K gating apply to these?) covers all 9 briefs. The latest progress entry says the builds are "gated by W-556", which is also unruled. Removing the line would hand these briefs to a builder through `claim.mjs` while that question is open. When head-of-product answers W-570(3) as "not gated" (or W-556 is ruled), the line can go; nothing else holds these three.
- **8, 9 (digital, wave 2).** Safety is cleared with changes. W-570(1) is open: wave 2 is not open on the record (0 Life Hacks lessons published, no Domain Launch Review), and whether A1 lets 8 and 9 be built now is head-of-product's call. 8 and 9 also need the changes above in the brief first.
- **11-14 (kitchen, wave 3).** Kitchen is not open, and my kitchen pattern note is not written. 13 also needs a rewrite by cm-lifehacks before it can be built at all, and 14 comes after 13.

I updated each skip line's reason text to say that the safety review is done and what still holds, so the next worker does not repeat it. The keys are unchanged.

## Who does what

- **cm-lifehacks:** apply the conditions above to briefs 8, 9, 11, 12, 13 and 14 (and the two stage-wording builds checks for 6 and 7). For 13, rewrite prediction, options, presets and reveal in terms of rise, then re-run the check.
- **Second reader for all wording I proposed** (swollen-battery line, steam line, skin line, "This counts cycles, not wear."): I may not approve my own wording. Evaluation-steward or a separate `lifehacks-safety-reviewer` instance that did not write them.
- **fact-checker (W-571):** sources for the safety lines (burns, frostbite, swollen batteries) are added to the existing owed list, and nothing in 13 or 14 is verified from memory.
- **head-of-product (W-570):** rule on wave 2 for 8 and 9, and on W-556 gating for all 9.
- **International:** food temperature and rest guidance (13), the word "sealed" (14), and the Arabic halal default (13).
- **Me:** the kitchen pattern note, then re-read 8, 9, 11-14 when cm-lifehacks says the changes are in. The launch-review attestation per lesson stays mine and needs the walkthrough.

## What I am sure of, and what I am not

Sure: no brief teaches a refuse-list item; 13 as drafted is a food-safety shortcut and must be rewritten; the numbers match the script. Less sure: the item 6 ruling for 8. It is a judgement about what "charging hack" means, made before the charter carries the wording. If cm-lifehacks or head-of-product reads it more broadly, brief 8 goes to refuse, so I have asked for the wording to be fixed in the charter. Not checked: any real-world source (no host reachable) and any walkthrough.

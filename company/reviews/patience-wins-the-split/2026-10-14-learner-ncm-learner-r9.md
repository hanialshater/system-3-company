*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r9, batch B): patience-wins-the-split
lesson version: v5
boundary: ncm-learner (meta.json learner: knows backward induction, that in a one-shot take-it-or-leave-it offer the proposer keeps almost everything, from lowball-offer-should-pass, and that money later is worth less than money now; does not know that when each delay shrinks the pie, the first proposer gets 1/(1 + δ), a small edge when delays are cheap). Same tag as r8.
Screenshots seen: yes (artifacts/walkthroughs/patience-wins-the-split/sheet.png, 7 frames, fresh release-build walkthrough 2026-10-14 15:24; 07-reveal.png checked)
Phone fit (tools/reveal-fit.mjs, 390x844, http://localhost:3561): crop 1 px (within the 1 px tolerance), hidden below 0 px, 77 reveal words, named labels hidden 0, phoneFit true.
Verdict: launch

## 1. From the artifact (written before reading build.md)

Path walked: chose "About 90%"; +1 round; +10 rounds; 400 rounds; Shrink 30%; Shrink 50%; opened reveal.

- **Where the idea first runs out:** step 1. With 2 rounds the header says "offer 0.9 × 100.0% (their share proposing next) = 90.0%; keep 10.0%". This boundary arrives believing the proposer keeps almost everything, and the first thing the stage shows is the proposer keeping 10%. The label "their share proposing next" is what lets the learner read it: the responder can refuse and become the one-round proposer. That is the new idea, and it is on the stage at the moment it is needed. The zig-zag bars (100%, 10%, … settling) then show the alternation damping toward a line.
- **No answer before the commit: pass.** About 90% / 53% / 47% / Exactly 50%; 53 and 47 both non-round. Chart empty.
- **Show the why: pass.** The header's "offer 0.9 × (their share proposing next)" is backward induction written on the stage; the bars show it compounding.
- **Reveal quotes what you saw: pass.** "Seen at 10%, 400 rounds: offer 0.9 × 52.6% = 47.4%; keep 52.6%" and "50% → 66.7%" are rows on screen at the reveal; "one round ... 100%" is the first bar, on screen.
- **Reveal fits with its picture: pass.** The chart, the dashed "your 400 rounds" line, the controls, both rows and the whole reveal are on one screen (r8's top finding fixed). **Text budget: pass** (77 words, was about 118).
- Small: at the reveal the dashed line reads "your 400 rounds: 66.7%" (the current 50% shrink), while the reveal's headline number is 52.6% at 10%. The Seen row carries the 52.6%; the picture shows the 50% case. Acceptable, since the reveal's last sentence names 66.7% too.
- Small (carried): "1 ÷ (1 + 0.9)" uses 0.9 as the patience factor; the stage only ever writes "shrink 10%". "Worth 0.9 of a proposer's share" bridges it, but a learner may still ask why 0.9 and not 0.1.
- Small (carried): chart labels small once the long-game rows show (r8 estimated about 7 px; not re-measured here, and eyeball px estimates in this batch ran low, see who-pays r9 section 4).
- Wording: the hook says "with no deadline", the panel says "Add rounds in front of the deadline". The row "Long games (stand-in for no deadline)" reconciles them, but only from step 3 on.

## 2. Earlier findings (r8, v4)

1. Revise: reveal about 118 words and stage top cropped: **fixed** (77 words, crop 1 px).
2. Minor: chart labels about 7 px: **not fixed** (minor).

## 3. Verdict

launch. The reason the proposer's edge is small is on the stage before the reveal names it. No FATAL.

## 4. After reading build.md

Pre-flight v5 item 7 (crop 1 px, 77 words) matches the release build; item 6 says "Back to 1" keeps the records and Seen rows, so the reveal survives Reset. Findings and verdict unchanged.

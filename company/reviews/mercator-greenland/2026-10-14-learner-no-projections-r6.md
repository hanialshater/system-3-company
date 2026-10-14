*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: mercator-greenland (r6)
lesson version: v3
boundary: the lesson's own. Knows what a world map looks like, the equator and the poles; has never seen map projections, why maps distort, or Mercator's purpose.
Screenshots seen: yes (artifacts/walkthroughs/mercator-greenland/sheet.png, 4 frames, recorded 2026-10-14 against build 3 on localhost:3470; walk chose option 1 "Greenland, about 15× bigger", slid 2°, toggled to Equal Earth)

## 1. From the artifact (written before reading any earlier review)

- **No answer before the commit: fails.**
  - Options: "Greenland, about 15× bigger" / "About the same size" / "Congo, about 4× bigger". Two options carry a number and the right one is the only one with none, so the options are not worded at the same precision ("every option numbered or none"). A test-wise learner can spot the odd one out.
  - Hook: "Wall maps make Greenland look enormous. Slide it south and see." "Look enormous" says the enormity is an appearance, which points away from option 1 and toward "it is not really that big". Together with the question's "On this map ... drawn about 15 times", the lesson tells me the map is lying before I commit.
  - Locked stage: 15.4× is the question's own number; no line or label matches "about the same". Passes on its own.
- **Prediction felt like:** I would still pick option 1 from wall-map habit, but the wording makes it feel like a trick question; the guess is less honest than it should be.
- **Explore:** sliding 2° drops the readout 15.4× → 11.3× and the blue shape shrinks, dashed outline left behind. "Show Equal Earth map" gives 0.9×. The reveal unlocked after only a 2° slide plus the toggle; Greenland was still at 71°N, nowhere near the equator the hook invites me toward.
- **Where understanding first broke:** in the Equal Earth frame (03) Greenland is clipped at the top edge of the oval, a sliver of blue. The 0.9× claim is read off the readout, not seen as two similar shapes. "Mercator" and "Equal Earth" appear as button labels with no meaning attached.
- **The reveal quotes what you saw: fails.**
  - "Greenland never changed as you slid it. The map did." I slid it 2°; I saw a 27% drop, not a trip to the equator. The sentence describes a slide I did not make.
  - "More than ten times at Greenland's latitude" and "1 / cos²(latitude)": nothing on the stage shows that factor; the readout I saw at reveal time is 0.9× on Equal Earth.
  - 2.17 vs 2.34 million km² are told facts (acceptable as context), but the stage's own 0.9×, which is visible when the reveal opens, is never quoted. The reveal ignores the one number I can still see.
- **Show the why you promised: fails.** "Why maps distort" and "Mercator's purpose" are in the boundary's gap. The stage stands for "areas stretch away from the equator" (the slider) but nothing stands for "keeps angles true, so a straight line is a constant compass bearing" or "no flat map can keep both". Those are told sentences.
- **Did the reveal answer my question?** It answered "is Greenland really big?" (no). It did not answer the question the stage raised for me: "why would anyone draw a map that does this?"

## 2. After reading the earlier review (2026-10-13-learner-adult-beginner.md)

- Different boundary label (adult map user, no projections; close to the brief's). Its launch verdict was written without the launch reviewer seeing the screenshots.
- It saw the hook "nudges" but did not count it; under "No answer before the commit" the hook phrase and the unnumbered right option are findings. It noted the 2° slide and the told sailors/angles payoff as minor; under "The reveal quotes what you saw" and "Show the why you promised" they are revise-level.
- Agreement: Mercator / Equal Earth undefined, Greenland cramped at the top of the Equal Earth map, 1/cos² is jargon.

## Findings (problems, not fixes)

1. The right option is the only one without a number; the options are not at the same precision.
2. The hook "make Greenland look enormous" points to the answer before the commit.
3. The reveal unlocks after a 2° slide, then says "Greenland never changed as you slid it", describing a slide the learner did not make; "more than ten times" is never on the stage.
4. Mercator's purpose (angles / compass bearing) is in the gap and is told only.
5. In the Equal Earth state Greenland is clipped at the map's top edge, so "about the same size" is read, not seen.

Verdict: revise (findings 1–2 break "No answer before the commit", 3 breaks "The reveal quotes what you saw", 4 breaks "Show the why you promised"; no false claim or dead control seen, so not a fatal block)

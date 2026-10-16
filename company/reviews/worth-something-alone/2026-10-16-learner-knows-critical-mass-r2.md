*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: worth-something-alone
lesson version: v2
boundary: same as r1 (company/reviews/worth-something-alone/2026-10-16-learner-knows-critical-mass.md): knows the tipping point of below-critical-mass; does not know that some stand-alone value shrinks the critical mass but leaves an empty app at zero unless that value beats the price. Phone viewport (Pixel 7), first-time learner, chose "About 0%".
Screenshots seen: yes (artifacts/walkthroughs/worth-something-alone/sheet.png, recorded 2026-10-16T23:15Z, built from e092f6c3 with NEXT_DIST_DIR=.next-le-ncm-r2, port 3711; 05-step-4.png opened at full size; plus a playwright probe of the reveal gate on the same build, port 3712, scratchpad, not committed)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Does r1 still hold?** No; it is fixed. Each curve now carries its own name at its peak ("20¢ alone", "10¢ alone" in teal, "0¢ alone"), stacked in value order. At step 4 the highlighted teal curve is plainly the 10¢ app; I no longer read it as the 0¢ one. The "7.3%" and "20.0%" tipping labels still sit close together on the price line, but they are separate and readable at full size.
2. **Where understanding now first breaks.** Nowhere that blocks. Still from r1: the question's "Same app at 16¢" assumes the previous lesson, so a cold feed learner gets no "same". The y-axis phrase "keenest non-user's value" is hard outside this boundary.
3. **What the prediction felt like.** Real: "About 10%" is a good trap, "About 80%" the hopeful answer.
4. **Did the reveal answer my question?** Yes ("then what did the 10¢ do?"): it lowered the critical mass from 20.0% to 7.3%, but the keenest fan values the empty app below 16¢, so nobody starts; at 20¢ alone the app climbs to 85%.
5. **The reveal gate (QA observation: locked until every milestone is hit, with only "Try it first" as a hint).** Probed: "Launch from 0", "0¢ alone", "10¢ alone" (skipping 20¢) leaves "Try it first", although the panel's "then try other stand-alone values" is already satisfied by 0¢. 20¢ is the only launch that climbs, and the reveal's second paragraph rests on it, so holding the reveal for it is right. With one untouched button of four, the learner finds it. Not blocking; the hint could name what is left.

Verdict reason: the idea reaches a learner with this boundary; the r1 curve-label finding is fixed.

## After reading build.md / meta.json
- Intent matches experience: the objective (10¢ alone lowers the tipping point from 20.0% to 7.3% but a launch from 0 stays at 0%; 20¢ alone climbs to about 85%) is what the three launches and the reveal showed. meta.json version is 2, matching my stamp.
- build.md (fix round W-1573, v2) adds claim c8 (each curve named by its stand-alone value; coloured = current, grey = earlier); that is the change that fixed r1's finding. The milestones are the 10¢ launch, 20¢ (climbs) and 0¢ (no-alone); my probe found 20¢ the missing one when skipped, consistent with that.

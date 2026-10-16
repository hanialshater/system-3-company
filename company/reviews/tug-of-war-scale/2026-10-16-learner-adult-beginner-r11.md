*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: tug-of-war-scale
lesson version: v2
boundary: adult beginner who knows a pull is a force in newtons and a spring scale measures a pull; does not know that a scale reads the tension passed through it, so two equal opposite 100 N pulls give 100 N, or that a wall pulls back exactly as hard as a second person would (meta.json `learner` field, read before walking; nothing else in meta.json read before the findings)
Screenshots seen: yes (artifacts/walkthroughs/tug-of-war-scale/sheet.png, recorded 2026-10-16T14:43:10Z)
Verdict: revise

Run: SO-10-3 batch=SO-10-3 `[project:wave-j]`, shared review server http://localhost:3591 built from 987687acc1cc934b5eaa4f5510d2111712263532 (BUILT_FROM read at start; R3a check.sh exit 0). Inputs: transcript cut at `## Appendix: trust sheet`, plus sheet.png. Walkthrough choice: option 1 ("0 N").

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke.** At the reveal, for the learner who picked 0 N. The explore is clear: slack rope, dial at 0; "Both pull 100 N" and the dial reads 100 N with "tension 100 N" under the spring; the wall reads 100 N too; 200 + 200 reads 200 N. The Seen row keeps all three. So the 0 N picker sees that they were wrong. What they do not get is *why their reason was wrong*. Their reason is "the two pulls cancel, so the total is zero". That reason is half right (the forces on the scale do cancel, which is why it stays still), and the lesson never says so.
2. **What the prediction felt like.** A real three-way choice with two strong misconceptions: 0 N ("they cancel") and 200 N ("they add"). Both are common. That is a good predict card.
3. **Whether the reveal answered the question the learner actually had.** For the 200 N picker, yes: "your scale read 100 N, not 200", and the wall step shows one person plus a wall gives the same 100 N. For the 0 N picker (this walk), **no**. The reveal opens "With each friend pulling 100 N, your scale read 100 N, not 200": it talks to the other wrong answer. Then "A scale measures the tension in the rope, the pull passed through it, and at rest it is stretched only when both ends are pulled equally." For this mind that sentence is hard to parse and does not touch "they cancel": "stretched only when both ends are pulled equally" sounds like it says unequal pulls do not stretch it, which this mind knows is not the point. The missing sentence is something like "the two pulls do cancel: that is why the scale does not move; but the scale reads one of them, the pull passing through it". **This is the blocking finding.** The 0 N picker is marked wrong and gets an explanation written for the 200 N picker. Which fix to make (a per-choice line, or one sentence that covers both) is the CM's or builder's call.

Notes (not blocking):
- In the wall frame the 100 N arrow at the wall end points right, away from the scale, the same as the friend's arrow in the 100 + 100 frame. That is consistent (the wall pulls the rope towards itself), and it supports "the wall pulls back exactly as hard".
- "at rest it is stretched only when both ends are pulled equally" also reads oddly for a physics-literate learner: equal pulls are what keep it *at rest*, not what make it stretch.
- No dead end under R4: all three controls change the stage; "Show me why" unlocked after the third control.

Verdict reason: revise. The reveal answers the 200 N picker ("not 200") but never tells the 0 N picker why "the pulls cancel" does not give a reading of 0.

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: what-pushes-the-car
lesson version: v2
boundary: adult beginner who knows friction resists sliding and that forces come in action-reaction pairs; does not know that a car's forward force comes from the road gripping the tyres, or that the engine only turns the wheels and internal forces cannot move the car (meta.json `learner` field, read before walking; nothing else in meta.json read before the findings)
Screenshots seen: yes (artifacts/walkthroughs/what-pushes-the-car/sheet.png, recorded 2026-10-16T14:43:03Z)
Verdict: launch

Run: SO-10-3 batch=SO-10-3 `[project:wave-j]`, shared review server http://localhost:3591 built from 987687acc1cc934b5eaa4f5510d2111712263532 (BUILT_FROM read at start; R3a check.sh exit 0). Inputs: transcript cut at `## Appendix: trust sheet`, plus sheet.png. Walkthrough choice: option 1 ("Its engine").

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke.** It did not break in a way that blocks. Dry road: two arrows at the tyres, "road on tyre →" and "← tyre on road", with "2,400 N forward · 2.0 m/s²" and a ghost car showing the car moved. Ice: "1,177 N max · 0.98 m/s² · slipping", spin marks at the wheels, a shorter ghost. Frictionless: "0 N forward · 0 m/s² · wheels spin", spin marks, no ghost, no arrows. The frictionless step is the decisive one for the "engine" picker: the engine is still running and the car does not move. It lands.
   The hesitation this mind has is on ice: "1,177 N **max**" says the road can give at most that much, but nothing says how much the engine *asked* for. The learner can infer it (dry gave 2,400 N with the same pedal), but the word "max" is the only cue that the road is the limit.
2. **What the prediction felt like.** A real choice. "Its engine" is the natural answer; "The road" sounds wrong (roads don't push); "The air behind it" is a weak distractor, and the caption "no air drag" quietly answers it. Fair.
3. **Whether the reveal answered the question the learner actually had.** Yes. After the frictionless step the question is "so the engine does nothing?", and the last paragraph answers it: "The engine turns the wheels and the tyres push back on the road; the road pushing forward on the tyres is what moves the car." For this boundary (knows action-reaction) that sentence connects to something already known, though it does not name the pair.

**The question in the brief: does the forces-only Seen row keep the "wheels slipped" thread?** Partly. The Seen row reads "dry: 2,400 N · ice: 1,177 N · frictionless: 0 N": three forces, no "slipping" and no "spin". The slip is carried only by the stage caption of the step being shown ("· slipping", "· wheels spin") and by the red spin marks at the tyres. When the learner reaches the reveal, the stage shows the frictionless state, so "wheels spin" and the spin marks are on screen, but the ice step's "slipping" is not. The reveal's "On ice the road could give only 1,177 N and the wheels slipped" refers back to a caption that is no longer visible. For this mind that is not a break: the ice step was seconds earlier, and the frictionless frame shows the extreme case of the same thing. But in the row alone, "ice: 1,177 N" reads as "a smaller force", not as "the road's limit, so the tyres slipped". If the CM wants the row to carry the thread by itself, "ice: 1,177 N max" or "ice: 1,177 N, slipping" would do it; that is a note, not a blocking finding.

Notes (not blocking):
- The arrow labels "road on tyre →" / "← tyre on road" sit below the road line and are small at phone size; the colour pairing (orange forward, dark back) carries them.
- No dead end under R4: every control changes the stage; "Show me why" unlocked after the third surface.

Verdict reason: launch. No finding blocks a first-time learner; the frictionless step answers the engine picker, and the slip thread survives in the stage, though the Seen row alone does not carry it.

## After reading build.md / meta.json

(Written after the findings above were committed in 5246021. build.md not read. meta.json read at HEAD 74a730e, committed content only.)
- **Intent vs experience.** The objective (engine only turns the wheels; the road's grip on the tyres speeds the car; no grip, no motion however hard the wheels spin) is what this mind took from the walk. The misconception also includes "friction only ever slows things down"; the dry/ice contrast addresses that implicitly, and the reveal's "the road's 2,400 N grip" names grip as the forward force.
- c4 cites the Seen row as "ice: 1,177 N" and the stage readout as "1,177 N max · 0.98 m/s² · slipping": the claim itself places "slipping" on the stage, not the row. That matches my answer to the brief's question: the row carries forces only, and the slip thread lives in the stage caption and spin marks of the step on screen. c3/c4 also give the 2,400 N "asked for", which the learner never sees stated; my note on "max" stands.

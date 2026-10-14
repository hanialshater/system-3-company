# Build note: tug-of-war-scale

Builder: demo-builder (wave-j-physics), 2026-10-14. Brief: `company/domains/briefs/physics.md` round 4, #56. Status draft; every claim unverified.

Built as briefed: one rope band, two pullers (the right one becomes a wall), a spring whose stretch and two equal tension arrows grow with the tension, and a dial. Three preset buttons in brief order; each disables itself while active. Departures: the title and hook were not in the brief (written here: "Tug of war on a spring scale" / "Two friends pull a rope from opposite ends. What does a scale in the middle read?"). The spring stretch and arrow lengths are schematic (claim c4). No Reset control (the brief lists none); the Seen row is never cleared.

## Pre-flight v1

1. **Title and hook.** "Tug of war on a spring scale" / "Two friends pull a rope from opposite ends. What does a scale in the middle read?" No number, no hint of 100 vs 200.
2. **Options.** "0 N", "100 N", "200 N": all numbered, same precision.
3. **Locked stage.** Slack rope, two pullers, spring at rest length, dial with ticks 0-250 labelled 0, 100, 200 (all three options alike), needle at 0, "0 N". No arrows, no tension label.
4. **Reveal values.** "100 N" (pair): milestone pair-100, Seen row. "100 N" (wall): milestone wall-100, Seen row. "200 N": milestone pair-200, Seen row. "not 200", "the second friend": text.
5. **QA path.** DOM order: Both pull 100 N (pair-100, the question's case), Tie right end to a wall (wall-100), Both pull 200 N (pair-200). Three presses reach all three. At the reveal the stage shows 200 + 200 and the Seen row "100 + 100: 100 N · wall: 100 N · 200 + 200: 200 N".
6. **Reset.** No Reset; switching presets never clears the Seen row. Reveal text from the QA path: "With each friend pulling 100 N, your scale read 100 N, not 200. Tied to a wall, one friend's 100 N pull also read 100 N: the wall pulls back exactly as hard, just as the second friend did. A scale measures the tension in the rope, the pull passed through it, and it can only be stretched if both ends are pulled equally. Only when both pulled 200 N did it read 200 N."

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): limestone-crossover
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows that some changes absorb heat and that spreading out raises entropy; does not know that a change goes by itself when ΔH − TΔS is negative, or that a heat-absorbing change that makes gas therefore switches on above a definite temperature)
Screenshots seen: yes (artifacts/walkthroughs/limestone-crossover/sheet.png, recorded 2026-10-14T18:56)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "about 100 °C"; tapped 25 °C, 500 °C, 900 °C, Find the switch; opened reveal.

1. **The prediction is genuine.** "Soaks up heat" makes "never, or only when very hot" the intuition, and the four temperatures span the range fairly.
2. **The two-bar race is a clear picture.** A fixed red bar (ΔH, heat in: 179 kJ) and a pink bar that grows with temperature (48, 124, 188 kJ), with "does not go" / "goes by itself" beside it. "Find the switch" drops a dashed line at ≈ 845 °C where they match. I can see "longer pink bar wins".
3. **Where I first needed an idea I lack: "TΔS" and "ΔG".** ΔH gets a gloss ("heat in"); TΔS gets none, and ΔG appears in the readout tiles (+131 kJ, −9 kJ) with no definition. I can infer ΔG = 179 − 48 = 131 from the numbers, but the rule the lesson exists to teach ("goes by itself when ΔH − TΔS is negative") is never written down; the reveal uses ΔG as if I already knew it. My boundary knows "spreading raises entropy", not that entropy enters as T × ΔS.
4. **The T is in kelvin and nothing says so.** 48 kJ at 25 °C and 188 kJ at 900 °C is a ratio of about 3.9, which matches 1173 K / 298 K. A learner who tries to multiply by the Celsius figure (36×) will get nonsense. One label ("T in kelvin: 298 K, 1173 K") prevents it.
5. "(25 °C data)" next to the switch is an expert caveat (ΔH and ΔS taken as constant). It reads as noise to me.
6. The reveal's last line, "Absorbing heat does not forbid a change; it sets the temperature where it starts", is a good takeaway. Reveal fits: all quoted numbers are on stage. Trust link "5/6 claims checked".

Fixes (for the builder):
- Write the rule on the stage once: "ΔG = ΔH − TΔS; negative ΔG → goes by itself".
- Gloss TΔS ("entropy gain × temperature") and show T in kelvin on the temperature buttons or bar label.

Verdict reason: the picture is right, but the one rule the brief targets is used in the reveal without ever being stated, and the T in TΔS silently uses kelvin.

## After reading the brief (meta.json)

- doesNotKnow item 1 is literally "goes by itself when ΔH − TΔS is negative"; finding 3 is that this formula never appears in words. Item 2 (switches on above a definite temperature) is delivered well by the bar crossing.
- Fix route: demo-builder (stage labels).

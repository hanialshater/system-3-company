# Build note: coat-on-the-ice

Builder: demo-builder (wave-j-physics), 2026-10-14. Brief: `company/domains/briefs/physics.md` round 4, #60. Status draft; every claim unverified.

Built as briefed: one table scene; heat-flow arrows whose width is set by the watts (0.5 px per W for the ice, 0.015 px per W for the person, each scene to its own scale; claim c1), a coat layer, and a label with the watts and the melt time. All values are recomputed in Demo.tsx from the brief's constants (Q = ΔT / ΣR). Departures: title and hook written here ("Wrap the ice in a warm coat" / "A wool coat keeps you warm. What does it do to a block of ice?"). Values are shown to one decimal ("15.0 W", "4.3 W", "5.7 h", "19.9 h"); the reveal rounds 19.9 h to "about 20 hours" as the brief does. The melt clock is a text label ("melts in 5.7 h"), not a clock face.

## Pre-flight v1

1. **Title and hook.** "Wrap the ice in a warm coat" / "A wool coat keeps you warm. What does it do to a block of ice?" Names the coat's reputation, not the result.
2. **Options.** "The wrapped block", "The bare block", "Both at the same time": none numbered.
3. **Locked stage.** A bare ice block on a table, "ice 0 °C", "room 25 °C". No arrows, no watts, no times.
4. **Reveal values.** "15.0 W", "5.7 hours": milestone bare (Seen row). "4.3 W", "about 20 hours": milestone coat (Seen row "coat: 4.3 W, 19.9 h"). "149 W": milestone person (Seen row "person: 149 W out"); "522 W": constant, on the stage label "149 W out (bare: 522 W)" when the reveal opens.
5. **QA path.** DOM order: Bare block (bare), Wrap it in the coat (coat, the question's case), Person in the coat (person). Three presses reach all three. At the reveal the person scene with "149 W out (bare: 522 W)" and the full Seen row are on the stage.
6. **Reset.** No Reset; the Seen row is never cleared. Reveal from the QA path: "Your bare block took in heat at 15.0 W and melted in about 5.7 hours. Wrapped in the coat, it took in only 4.3 W and lasted about 20 hours. The coat makes no heat. It is a layer of trapped air that slows heat crossing it in either direction: on the person it cut the heat flowing out from 522 W to 149 W. Heat flows from warm to cold, and insulation only slows it. Your body is the heater."
7. **Phone fit.** Not yet measured by `tools/reveal-fit.mjs`: on 2026-10-14 the shared dev server (:3530, load average 30-55 on 4 CPUs) took about 50 s to deliver the page and about 200 s to render the lesson, so every reveal-fit run ended in its own 15 s / 30 s timeouts (`artifacts/reveal-fit/wavej-physics.json`: 5 errors, no measurements). Builder's own probe (Playwright, 390×844, touch, first option committed, each enabled control pressed once in DOM order with 450 ms waits, reveal opened): stage top at 174 px from the viewport top (on screen, no scroll), reveal bottom at 681 px of 844, 88 reveal words including the verdict line, smallest SVG label 10 px as drawn, every control at least 44 px tall, no horizontal overflow, every press changed the stage, no console errors on a clean load. The reveal points at the person scene, '149 W out (bare: 522 W)' and the Seen row; all on screen in the 390×844 screenshot. This is testimony until reveal-fit confirms it.

## QA

Computer-use QA (`QA_ONLY=coat-on-the-ice`, `artifacts/qa-wavej-physics`) ran on 2026-10-14 and failed on both projects at `page.goto` (45 s test timeout) because of the server load above, before any lesson check ran. No contract result yet. Status stays draft.

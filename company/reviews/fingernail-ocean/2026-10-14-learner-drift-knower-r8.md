*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8, build 5 walkthrough): fingernail-ocean
lesson version: v3 (meta.json version 3; the walkthrough shows the v3 "Run to 3,000 km" button and Seen line)
boundary: drift-knower (knows continents drift and the Atlantic separates South America and Africa; does not know how slow plates move or how much time such a speed needs to make an ocean). Same tag as r6.
Screenshots seen: yes (artifacts/walkthroughs/fingernail-ocean/sheet.png, 7 frames)
Verdict: revise

## 1. From the artifact (written before reading build.md)

- The r6 "+100 / +20" button pointer is gone: the buttons are "Run to 3,000 km", "+1 / +10 / +100 million years", "Back to today". Options 12 million / 120 million / 1.2 billion years, same precision.
- **Finding 1 (No answer before the commit): the locked caption does the conversion the question tests.** Before I commit, the stage says "Toy: South America slides west at 2.5 cm a year = 25 km per million years." The question asks how long 3,000 km takes at 2.5 cm a year; the hard part for my boundary is the cm-per-year to km-per-million-years step. With "25 km per million years" printed, 3,000 / 25 = 120 is one division, and the other two options are off by 10×. That is a pre-drawn rate pointing at the right option. Show the rate only after the commit (or keep it in cm a year until then).
- **Finding 2 (text budget): the reveal is ~101 words on a new version (budget 90).** The last sentence ("Real spreading in the Atlantic varies… this stage is a toy…") is told context and repeats the caption's "Toy".
- Reveal quotes what I saw: pass, and the r6 blocking finding is fixed. After "Back to today" the Seen line still reads "120 million years → 3,000 km of new ocean", and the reveal says so ("the Seen line keeps it"). "25 km, the rate under the map" points at the caption, which is on screen.
- Phone fit: in 07-reveal.png the stage top (map) and the reveal's last line are both on screen, but the map is shrunk to about 40%, so the dashed "today" outline and the moved continent are hard to see. That is kit W-287; with the floor, the map grows and a 101-word reveal will likely crop.
- Moderate: the moving thing is a continent, the question says "plates"; nothing shows a plate or a ridge. "About 2 metres in one [lifetime]" is told (claimed).

## 2. Earlier findings (r6), read after section 1

1. Blocking, quoted state not visible after Back to today: FIXED (Seen line).
2. "+100 and +20 sum to the answer" pointer: FIXED; replaced by a different pointer (the 25 km per million years caption, finding 1).
3. "25 km per million years" never a readout: now in the caption (which causes finding 1).
4. "plates" vs continent, "Equal Earth" jargon: "plates" unchanged (moderate); "Equal Earth" no longer on stage.

## 3. After reading build.md (Pre-flight v3)

- Pre-flight 3 says "Nothing says 120." True literally, but it does not consider that the caption gives 25 km per million years before the commit; Pre-flight 4 lists it as "(a) a constant shown in the caption". No Pre-flight item 7.
- Verdict: revise (finding 1, pointer before the commit; finding 2, word budget). No FATAL.

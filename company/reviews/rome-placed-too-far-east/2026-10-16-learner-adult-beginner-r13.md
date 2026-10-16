*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: rome-placed-too-far-east
lesson version: v4
boundary: adult beginner. Knows maps, knows that latitude and longitude exist and that time zones put the east "ahead"; does not know how big a degree of longitude is, why one would measure from Toledo, how longitude was found before modern clocks, or who Ptolemy or Jansonius were.
Screenshots seen: yes (artifacts/walkthroughs/rome-placed-too-far-east/sheet.png, recorded 2026-10-16T09:59:43Z, phone viewport, option 1 chosen)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke.** The first idea this mind does not have is in the reveal, paragraph 2: "longitude needs the difference in local time between two places". I can half-rebuild it from time zones (east is ahead, so a clock gap is an east-west gap), but nothing on screen says how much time is how many degrees, and "which nobody could then measure well" leaves me asking *why not? they had clocks and sundials*. It is the lesson's only causal sentence and it arrives as an assertion. Earlier wobble, not a break: in the predict card, "16.5 degrees" and "within 2 degrees" have no size for me; the 500 km scale bar on the axis is the only anchor, and I only understood it after the middle readout said "9.3° too far ≈ 780 km". Not blocking: the question still works as "how good were they?", which is the hook's question.

2. **What the prediction felt like.** A guess about old scientists' competence, not about longitude: 1 / 6 / 10 of 12 reads as "bad / so-so / good". I picked 1 of 12 and was told "Your prediction held". A real choice with a real answer; it does not depend on knowing anything I lack. The surprise for me was not the count but the stage after unlocking: every tick sits to the right of the green line. That is what I wanted explained.

3. **Whether the reveal answered the question I actually had.** My question after the stage was "why were all twelve too far east?". The reveal does not answer it, and now says so plainly: "this record does not say why every one was too far east." That changes my experience from r12's complaint: paragraph 2 (time is hard to measure) no longer pretends to explain the direction, because paragraph 3 fences it off. I leave knowing (a) they were far off, (b) all in the same direction, so errors did not scatter around the truth, and (c) the lesson does not know why. That is an honest stop, not a dodge. Unsatisfying, but it does not mislead me.

Notes (do not block a first-time learner):
- **Year view takeaway is never said.** "Sort by year" shows AD 150: 27.8° and 1610: 28.2°. I can see the later one is no better, but no learner-visible sentence says "no improvement in 1,460 years", and the reveal never mentions years. A beginner who skips the comparison misses it.
- **Stale readout label.** In the year view the small label reads "MIDDLE · 780 KM TOO FAR" above "AD 150: 27.8°, 1610: 28.2°". I briefly read it as both of those being 780 km too far.
- **An invited hypothesis left hanging.** The AD 150 row and the line "2 of the 12 were probably read from maps" made me guess "they all copied the first one". The lesson neither invites nor rules that out; fine for 60 seconds, but it is the hypothesis a beginner forms.
- **Why Toledo?** Never said. I accepted it as "the reference place", no harm done.
- Trust link says 8/10 claims checked; two shown as NOT YET CHECKED (the middle-estimate km figure and the "record does not say why" sentence). Not my gate, but the second one is the sentence my launch verdict leans on.

Verdict reason: no finding blocks a first-time adult beginner: the stage refutes "errors scatter around the truth" by sight, and the reveal now states the one-sided error as unexplained instead of implying the time-measurement sentence explains it; the bare "difference in local time" sentence (finding 1) is the weakest point and the first thing to strengthen.

## After reading meta.json

(meta.json version 4 read after the findings above were written; build.md and the cm rulings file not read.)

- **Objective vs experience.** The objective has three parts: all twelve too far east with the numbers (met on the stage and in reveal paragraph 1), longitude hard because it needs a difference in local time (stated, not shown: finding 1), and the record does not explain the eastward error (met, paragraph 3). The misconception "scattered around the truth, so the average was about right" is refuted by sight on the stage, which is the lesson's strongest moment.
- **The recall item tests an idea the card never shows.** `recall` asks for 2 hours of clock difference in degrees and its `why` says "The Earth turns 15 degrees an hour". That 15-degrees-per-hour link appears only in claim c6's text in the trust sheet ("one hour = 15 degrees"), not on the card. My adult beginner could guess 30 from time-zone intuition at best. Either the card shows the link or the recall question is testing a prerequisite, not this lesson. Not a card blocker, but it is the same gap as finding 1 and it should be fixed with it.
- **Learner field vs prerequisites.** `learner.knows` lists only "old maps were rough" and "latitude and longitude locate a place"; `curriculum.prerequisites` includes `geography:sun-time-from-longitude`. If that prerequisite holds, finding 1 dissolves; for the learner the field describes (my boundary), it does not. Which one is meant is the curriculum owner's call.
- **c4 and c11 are unverified.** c11 is the "this record does not say why" sentence that my launch verdict depends on. If fact-check cannot support it, my verdict should be read as revise.
- `evidence.simulatedLearner` lists only r1, not r12 or this r13. Bookkeeping, not mine.

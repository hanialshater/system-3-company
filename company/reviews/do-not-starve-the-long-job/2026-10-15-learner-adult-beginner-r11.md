*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): do-not-starve-the-long-job
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows reading short labels and comparing simple counts; does not know: Compare waiting and lateness when their objectives conflict.)
Screenshots seen: yes (artifacts/walkthroughs/do-not-starve-the-long-job/sheet.png, recorded 2026-10-15T21:34)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Long job first"; tapped Run queue, Swap first, Try target; opened reveal.

1. **The prediction is arithmetic with no temptation.** "For this long job due at minute 25, which order meets its deadline?" The long job takes 25 minutes and is due at 25. It must start at 0. The question tells me the deadline and the length, so there is nothing to believe. The real-life trap (I clear quick emails "first, it'll only take a minute") is in the hook but not in the question.
2. **The explore shows it clearly.** Small-first: long finishes past its red line, Late 1. Long-first: Late 0. The red deadline line cutting through the long bar is a good picture.
3. **Where it first broke: Wait jumps from 15 to 55 and nobody mentions it.** The title is "The short-job trade-off". The trade-off is right there (meeting the deadline costs 40 more minutes of total waiting), but I do not know what Wait counts, and the reveal never names the cost. It just states the 55 as if it were fine.
4. **"Swap first" did nothing useful.** It swapped tiny and small, two identical 5-minute jobs. Same numbers.
5. **Reveal versus my question.** "Short-job ordering is not a universal priority rule. The stated deadline makes the long job urgent in this fixture." This is right but stated as a rule about rules. The word "starve" in the slug never appears; "fixture" is jargon.

Fixes (for the builder):
- Make the prediction tempting: e.g. small jobs are 2 minutes each and the long job has slack that runs out only after several small jobs, so "a few quick ones first" feels safe.
- Name the trade-off in the reveal (what the other jobs give up when the long one goes first), and define Wait or drop it.

Verdict reason: the prediction is forced by the numbers in its own question, and the trade-off the title promises (more total waiting) is shown on the counter but never explained.

## After reading the brief (meta.json)

- Objective: 'Compare waiting and lateness when their objectives conflict.' The conflict is on stage (15m/Late 1 vs 55m/Late 0) but not named in the reveal; adding one sentence naming it would deliver the objective.
- Fix route: demo-builder.

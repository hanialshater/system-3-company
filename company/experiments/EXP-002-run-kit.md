# EXP-002 run kit: five adults, five lessons, one delayed check

owner: founder (recruiting, sessions) · analytics-steward (kit, matching, analysis) · date: 2026-10-17 · status: ready once the pre-session checklist is done; no session has run
experiment: company/experiments/EXP-002-real-learner-recall.md · predictions gate: company/experiments/EXP-002/predictions.md · per-person file: company/experiments/EXP-002/participant-template.md
asked for by: company/reviews/org/2026-10-17-external-assessment.md (§5 item 5, §6, Appendix B case 5, "Teaching versus delivery")

This kit is for one person (the founder) in one week: about 30 minutes per participant on day 0, about 12 minutes
per participant on day 3, about 10 minutes per participant typing notes. Roughly five hours in total. It changes
nothing about the lessons and nothing about the committed EXP-002 prediction.

## The week

| Day | Founder | Company |
|---|---|---|
| before day 0 | Says yes or no to Amendment A (below). Recruits 5 adults. | Pre-session checklist (below), including the committed P-list. |
| day 0-1 | Sessions P1-P5 (about 30 min each), notes typed into `EXP-002/sessions/P<n>.md` the same day | Chief of staff commits each file as it arrives, unread by the analytics steward |
| day 3-4 | Delayed checks, each 48-96 h after that person's session (aim for 72 h) | |
| day 5-7 | Nothing | Blind match, scoring, result section, evidence links |

**Who counts as a participant.** An adult (18+) who has not used System 3 lessons, does not work on the company,
and has no university degree in physics, chemistry, economics, maths or statistics. Friends and family are allowed
(it is a diagnostic, not a survey); write the relationship in their file, because people who know you are kinder
about confusing things.

## The five lessons (fixed, same for everyone)

All five are published at v1, have a fact-check record, a QA pass record, only "launch" learner verdicts, and every
claim verified (meta.json and company/reviews/<slug>/ at commit c31c1fab). Each comes from a different domain,
uses an everyday setting, needs only school knowledge, targets one named adult misconception, and has a reason that
fits in one sentence (needed for the explanation measure).

| | Lesson | Domain | Link | Why it is a good candidate | Known risk |
|---|---|---|---|---|---|
| A | drop-on-the-train | physics | https://system-3-company.vercel.app/d/drop-on-the-train | Classic misconception (it lands behind you); the recall stem moves to a plane, so it is not a copy of the lesson | Some adults know this from flying |
| B | cheap-printer-dear-ink | economics | https://system-3-company.vercel.app/d/cheap-printer-dear-ink | Everyday decision; the recall needs a calculation, not recognition | Arithmetic anxiety can look like confusion |
| C | cube-the-size | math | https://system-3-company.vercel.app/d/cube-the-size | Square-cube scaling is widely misjudged; the misconception has two forms (3× and 9×) | |
| D | heat-in-no-rise | chemistry | https://system-3-company.vercel.app/d/heat-in-no-rise | Its simulated review names three concrete problems (hook leaks the answer, 334 kJ makes it computable, the reason is told, not shown): good targets for the borrowed-mind measure | Recall (boiling water stays at 100 °C) is something many adults already know: watch the prediction card |
| E | best-of-twenty-identical | probability | https://system-3-company.vercel.app/d/best-of-twenty-identical | Selection on luck; review says "nowhere hard", so it is the lesson where the borrowed mind predicts *little* confusion: a real test of whether that is right | |

**Considered and left out.** armour-where-no-holes (its recall question is close to a giveaway: one option is the
only sensible one); cell-too-big (the same square-cube idea as C); due-west-from-london (a fact, no mechanism to
explain); at-least-one-boy (the puzzle's reading is contested); any lesson in EXP-004 to EXP-008 (their launch
predictions would be read from the same people).

**Order.** Each person sees all five in a rotated order, so no lesson is always first or last:

| Participant | Order |
|---|---|
| P1 | A B C D E |
| P2 | B C D E A |
| P3 | C D E A B |
| P4 | D E A B C |
| P5 | E A B C D |

The delayed check uses the same order as that person's session.

If a lesson's version changes before a session (meta.json `version` is no longer 1), run the session anyway, write
the version in the file, and the analysis reports that lesson separately.

## Pre-session checklist (all before P1)

1. Founder: accept or decline Amendment A. If declined, skip every line marked (A) in the scripts.
2. Chief of staff (not analytics-steward): fill the P-list and its key in company/experiments/EXP-002/predictions.md
   and commit. **No session before this commit.**
3. Fact-checker: check the answer key of the five transfer questions below (they are new text a person will see).
4. Privacy-reviewer: read the participant template; it is designed to hold no name, contact or employer.
5. Anyone: open the five links on a phone in a private window; each must load and play to the end.

## Session script (day 0): read it word for word

Set up: a phone in a **private (incognito) window**, so no progress from earlier visits shows. Open the first
link in that person's order. Have the participant file open to type or a printout to write on.

> Thanks for doing this. I'm testing some very short lessons, about a minute each. I'm testing the lessons, not
> you: if something is confusing, that's the lesson's fault, and it's exactly what I need to hear.
>
> There are five of them. Each starts with a question where you guess, then something to play with, then an
> explanation. While you go, please think out loud: say what you're looking at, what you expect, and anything that
> seems odd or unclear. I'll stay quiet and take notes. I can't help or explain anything until the end, sorry,
> because that would spoil the test.
>
> I'm writing notes, not your name; nothing I write will say who you are. [If you want audio:] Is it all right if I
> record audio, just so I can check my notes? It's deleted once the notes are typed. You can stop at any time.
>
> In three days I'll ask you a few short questions about these, about ten minutes. Please don't look the lessons up
> before then. Ready? Here's the first one.

During each lesson: say nothing except, if they go silent for about 10 seconds, **"What are you thinking?"** If
they ask you a question, say **"What would you guess?"** and write the question down as a confusion point. Do not
point, nod, or help with a control.

After each lesson, before opening the next link:

> Was anything in that one confusing?

Write the answer word for word. Do not discuss it. Then open the next link.

At the end:

> That's all five. Thank you. I'll get in touch in three days for the short follow-up. Again, please don't look them
> up in the meantime.

Do not explain the answers, even if asked; offer to after the delayed check.

Same day: type your notes into `company/experiments/EXP-002/sessions/P<n>.md` (copy the template). Write the
confusion points **before** you read anything in company/reviews/ for these lessons (ideally, never read them).

## Delayed check script (day 3; window 48-96 hours): read it word for word

By phone, video or in person. Schedule it with a neutral message ("the 10-minute follow-up we talked about"), never
with a hint about the content. No screen: the lessons are not shown again.

> Thanks again. A few short questions about the lessons from the other day. Some are multiple choice; I'll read the
> options. Just say your best answer; it's fine to guess. I won't say whether answers are right until the end.
>
> First: since we met, did you look at any of these lessons or the website again?

Then for each lesson, in that person's order, three steps. Write every answer.

**1. Recall** (the lesson's own recall question, from meta.json `recall`, read exactly):

| | Recall question | Options (read all) | Key |
|---|---|---|---|
| A | On a plane cruising smoothly at 250 m/s, you drop your phone. Where does it land? | Several metres behind you · Directly below where you dropped it · A little ahead of you | Directly below |
| B | Kettle X costs $20 and uses $0.50 of power a month. Kettle Y costs $35 and uses $0.20 a month. Over 5 years (60 months), which costs less in total? | X · Y · The same | Y |
| C | A bronze statue is copied at twice the height, same shape, same bronze. The copy needs how much bronze? | 2 times as much · 4 times as much · 8 times as much | 8 times |
| D | A pot of water is boiling hard at 100 °C. You turn the burner up. The water's temperature… | stays at about 100 °C; it boils away faster · climbs steadily above 100 °C · drops | stays at about 100 °C |
| E | Of 50 fund managers who all pick stocks at random, the best one beat the market by 15% last year. What do you expect from them next year? | About 15% again · About the same as a random manager · Worse than a random manager | About the same as a random manager |

**2. (A) Unaided explanation.** Ask, with no options, and write the answer word for word:

| | Explanation prompt |
|---|---|
| A | "In your own words: when you drop something on a train or plane moving steadily, where does it land, and why?" |
| B | "In your own words: how would you work out which of two machines really costs less?" |
| C | "In your own words: when you make a solid object bigger in every direction, same shape and material, how does its weight change, and why?" |
| D | "In your own words: what happens to the temperature of a bowl of ice and water while you keep heating it, and why?" |
| E | "In your own words: if you pick the top scorer from a big group whose results are mostly luck, what should you expect from them next time, and why?" |

If they stop after one sentence, say once: **"Anything else?"** Nothing more.

**3. (A) Transfer.** A new situation with the same idea. Read the question and all options:

| | Transfer question | Options (read all) | Key (to be checked by the fact-checker) |
|---|---|---|---|
| A | A plane flies level, steadily, in a straight line and drops a heavy box. Ignore the air. When the box hits the ground, where is the plane? | Far behind the box · Roughly straight above the box · Straight above the spot where it dropped the box | Roughly straight above the box |
| B | Car P costs $18,000 and uses $1,500 of fuel a year. Car Q costs $24,000 and uses $500 of fuel a year. Nothing else differs. From about when has Q cost less in total? | Never, it costs more to buy · After about 4 years · After about 6 years | After about 6 years |
| C | A toy brick and a real brick are the same shape and made of the same clay. The real brick is 4 times as long, 4 times as wide and 4 times as tall. How many toy bricks' worth of clay is in the real brick? | 4 · 16 · 64 | 64 |
| D | A glass of water full of ice cubes has stood in a warm room for 15 minutes and been stirred now and then. Some ice is still floating. The water's temperature is closest to… | 0 °C · Halfway between 0 °C and room temperature · Room temperature | 0 °C |
| E | A hospital ranks 100 surgeons by last year's complication rate, and most of the differences are luck. The 5 with the best rates are asked to teach. Next year, their rates will most likely be… | Still the best · Closer to the average · The worst | Closer to the average |

At the end:

> That's everything, thank you. Would you like me to go through the answers?

Then you may explain. Type the answers into the same participant file that day.

## What is recorded, and where

- One file per person: `company/experiments/EXP-002/sessions/P<n>.md`, copied from
  company/experiments/EXP-002/participant-template.md. The founder fills the session and delayed-check parts; the
  analytics steward fills only the last section. No names; the founder keeps the P-number list privately.
- Audio, if any, never goes in the repository and is deleted once notes are typed.
- The chief of staff commits each file when it arrives. The analytics steward does not open the files until all
  five delayed checks are done (so no matching rule is tuned on early sessions).

## Blind matching (borrowed-mind hit rate)

The borrowed-mind predictions are the existing simulated learner reviews, written 2026-10-13/14, long before any
session; the P-list pins them verbatim at a commit, pooled and shuffled with lesson names removed (predictions.md).

1. The chief of staff makes a **match sheet**: every confusion point from the five files, shuffled, with participant
   and lesson labels removed (a key, as in predictions.md, kept beside it).
2. The analytics steward matches each confusion point to **at most one** P-id, or to none, using one rule written
   now: *a confusion point matches a prediction when a builder fixing the prediction would change the same element
   of the lesson (the same sentence, number, control or step) that the confusion point is about.* Sharing a topic
   is not a match.
3. The match is committed **before** either key is opened. Then the keys are applied:
   - **hit**: matched to a P-id from the same lesson;
   - **cross-match**: matched to a P-id from another lesson (counted and reported as a leniency check: a high rate
     means the matching is too generous to mean anything);
   - **miss**: matched to none.
4. Borrowed-mind hit rate = hits ÷ all confusion points (the EXP-002 measure). Also reported: the share of P-ids
   that no participant hit (predicted problems no real person showed).

Limitation stated now: confusion points often name their lesson's topic, so the matcher can guess the lesson; the
blinding removes labels and order, not content. The cross-match count is there because of it.

## Scoring the two added measures (A)

- **Explanation**, per item, 0-2, against the lesson's objective in meta.json:

  | | 2 (the reason) | 1 (partial) | 0 |
  |---|---|---|---|
  | A | lands at your feet / below, because it already moves forward at the train's (plane's) speed and keeps it while falling | lands at your feet with no reason, or "moves with the train" only | lands behind, or no answer |
  | B | total = price + cost of use, and which wins depends on how much it is used | mentions running costs but not that the winner depends on use | the cheaper price wins, or no answer |
  | C | weight grows with the cube (k × k × k), because length, width and height all grow | "much more than k" or a right number without a reason | grows in proportion, or no answer |
  | D | stays at 0 °C until the ice is gone, because the heat goes into melting, not into raising temperature | stays the same, with no reason (or a reason with the wrong outcome) | rises steadily, or no answer |
  | E | about average next time, because the top score was picked partly for luck and luck does not repeat | "falls back" with no selection reason | will repeat, or no answer |

- Two scorers, each alone: analytics-steward and evaluation-steward. They score from a shuffled sheet of the 25
  answers (made by the chief of staff) without participant labels and without the recall answers. Both scores are
  reported; disagreements are listed, not resolved toward a prediction.
- **Transfer**: right or wrong against the key above, after the fact-checker has checked the key.
- **Prior knowledge**: an item is flagged "knew it before" when the person picked the right option on the lesson's
  own prediction card. Recall, explanation and transfer are reported for all 25 items (primary, as committed) and
  for the unflagged items.

## Committed prediction (Amendment A, written 2026-10-17 before any session)

Applies only if the founder accepts the two added measures. The primary EXP-002 predictions (recall ≥ 60%, and at
least half of real confusion points predicted by borrowed minds) are unchanged; they sit in
company/experiments/EXP-002-real-learner-recall.md and are not edited.

- **E1 (explanation).** At least 10 of the 25 explanation items score 2 (by the mean of the two scorers, rounded
  down).
- **E2 (explanation is harder than recognition).** The share of items scoring 2 is at least 15 points below the
  recall correct rate. Reason: picking an outcome from three is easier than producing the reason.
- **T1 (transfer).** At least 15 of the 25 transfer items are right, and the transfer rate is no more than 15 points
  below the recall rate.

would_be_wrong_if: 5 or fewer of 25 explanation items score 2 (the lessons leave the outcome without the reason);
or transfer is 10 or fewer of 25 right (near the 33% guessing rate for three options); or recall minus transfer is
25 points or more (people remember the lesson's own question and not the idea). E2 is wrong if the explanation
rate is at or above the recall rate.

**What each competing explanation predicts.** If people recall answers by recognition only: recall high, transfer
and explanation low. If people already knew most of this: high prediction-card accuracy and similar scores with and
without flagged items. If the lessons teach the idea: transfer close to recall, and explanation lower but well
above 0.

**Small sample, stated before.** 25 items from 5 people: one person moves any rate by up to 20 points. No p-values;
every rate is reported with its count, per person and per lesson. A result carried by one participant is reported as
that. This run is a diagnostic: it can say "the lessons fail with real people" or "nothing alarming", not that the
lessons work in general.

## Linking results into meta.json evidence.humanLearners

1. After the Result section is written in EXP-002, the analytics steward writes one record per lesson:
   `company/reviews/<slug>/<date>-human-learners-exp002.md`, headed `lesson version: v1` and `Real learners (EXP-002),
   n = 5`, with each person's prediction, confusion points (verbatim, P-numbers only), recall, explanation and
   transfer, and the matches. No names.
2. The lesson's category manager (not the steward, not the builder) adds that path to `evidence.humanLearners` in the
   lesson's meta.json. `npm run check` fails if the path does not exist.
3. Five people is not enough to raise a lesson's `confidence` to "**"; the record says so, and the category manager
   does not change confidence on this evidence alone.
4. If the lesson is revised later, the record still names v1; it is evidence about v1 only.

## Changes from the 2026-10-12 design (recorded, not hidden)

- **Fixed lessons instead of "participants choose lessons from the map".** Blind matching needs the borrowed-mind
  predictions pinned and pooled before any session, which is not possible for lessons chosen on the day from 720.
  Objection (it travels with the change): free choice also tested whether people find lessons they want, and
  interest may help recall; this run cannot say anything about choice. A later run can use a menu of pre-pinned
  lessons. Disposition: kept fixed for this run; the founder may overrule.
- **Delay: day 3 within a 48-96 hour window**, with the actual hours recorded; the original said "3 days later".
- **The recall question is asked first**, before the added measures, so the committed primary measure is not
  changed by them.

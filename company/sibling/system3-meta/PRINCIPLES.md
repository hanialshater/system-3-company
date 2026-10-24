# System 3 Meta: design principles for agent organisations

owner: the founder (recorded by vp-meta) · date: 2026-10-24 · status: **founder principles: every new Meta org design and
benchmark arm follows them, or says why not**

Where they came from: Benchmarks 8 and 9. One strong agent kept winning because it held the whole problem (about 350k
tokens: the compiler and Lua) in one context, peaking at 442k tokens, while our multi-agent sessions peaked at a median
of 35-41k. They were short, narrowly briefed and cold, and they passed each other summaries. The founder's diagnosis
(2026-10-24): we took the agents' autonomy away. "It can be that agents have autonomy to explore and see the big
picture, specialise, choose what to read for efficiency and focus … they can share learnings as well … if we have a
population they should start with generic different prompts for diversity but without restricting them on what to do
… the shared learning could be organized and shared across the org." The founder notes similar ideas in Anthropic's
work on automated alignment researchers.

## The principles

1. **Autonomy.** An agent sees the big picture first: the whole system, its measurements, its history. Then it chooses
   its own focus, decides what to read and how deep, and changes course when the evidence says so. An org does not
   prescribe scopes, directions or files in advance. It may prevent collisions (two agents editing the same code at
   once) through visible, short claims that agents take and drop themselves.
2. **Diversity without restriction.** A population gets its diversity from **generic, different prompts**:
   temperaments, methods and values, such as "measure before you change anything", "look for the one bold
   restructuring", "be the sceptic: try to break what others claim", "simplest change with the biggest effect". It does
   not get it from assigned tasks or areas. What each member works on is its own choice.
3. **Full context.** An agent starts warm, from a session that already understands the system (a fork of a scout's or
   a strong agent's context), or builds that understanding itself before it narrows. It never starts from a summary
   alone when the whole fits.
4. **Shared, organised learning.** What any agent learns is shared across the org, organised by topic, as it is
   learned, not only at retros:
   - measured findings, each citing its evidence (a commit, a judge run);
   - **negative results** ("tried X: no gain, reverted"), so nobody repeats a dead end;
   - practices with beliefs that code updates from measured outcomes (K38, K39);
   - agents read it before choosing a focus and add to it after each experiment. It is the org's memory, readable by
     every role.
5. **An independent referee and credit.** A judge the agents cannot influence measures every merged change. Credit goes
   to the change and to the practice it used, so the org learns what works and who to trust.

## Roles and hierarchy (founder, 2026-10-24: "are we eliminating roles and hierarchy?" No.)

What the principles remove is **prescribing the work in advance** (assigned scopes, directions, files), not roles or
hierarchy. "Let go of the path, not the boundary": the hierarchy holds the boundary and the intent; the agents choose
the path.
- **Fixed, assigned roles stay where they need independence, authority or accountability:** the founder (intent,
  budgets, changing the rules: "the human stays in the loop that changes the loops"); the referee and the independent
  checkers ("the judged do not amend the judge alone"); the architect or manager, who owns the interfaces, settles
  conflicting claims and allocates budget (an arbiter, not an allocator of tasks); and specialist roles whose value has
  been shown on recurring work (the lesson company's fact-checker: all 7 of M6's revises were real defects).
- **Work roles emerge:** an agent becomes the company's parser specialist by choosing that focus and earning credit
  for it on the record ("let the work change the architecture"), not by an org chart drawn up front.
- **The hierarchy gives intent and constraints, not instructions** ("make it faster; here is the budget; here is the
  gate"): mission command.

## Ownership as stewardship (founder, 2026-10-24: "ownership area could help")

Ownership areas stay, as **stewardship, not exclusivity**:
- an owner is accountable for its area's health (not only its next change), keeps its design coherent, builds memory
  there (K33's per-module playbooks), and reviews what others change in it;
- others may contribute to an owned area and the owner reviews afterwards (K37 borrow); interfaces stay owned and change
  by request (K32);
- ownership can be **earned** (an agent that keeps choosing an area and earning credit there becomes its owner) or
  **assigned** where the area is stable and long-lived;
- areas follow the durable structure of the work; short-term focus is still chosen freely, by claims.

In proportion: light for short bounded work (B9: claims, owners optional); strong for running work over long horizons
and recurring orders, where accountability and memory pay (RESEARCH-AGENDA E1, E2); always for interfaces.

## Coverage and reach (founder, 2026-10-24)

Owners and free exploration do different jobs, and the org needs both:
- **owners give coverage**, a floor: every area has a steward watching its health, tests and design, so nothing quietly
  rots (alone they miss the cross-cutting wins, as B8/B9's module owners did);
- **free exploration gives reach**, the ceiling: anyone may follow the largest opportunity wherever it lies (alone,
  everyone piles onto the obvious hotspot and some areas go unwatched);
- **the findings board connects them**: what explorers find reaches the owners, and what owners know reaches the
  explorers.

An explorer's change in an owned area goes through, the owner reviews it, and the referee's measurement settles a
disagreement: ideas compete on numbers, not on rank (maintainers and patches, as in open source).

**Measured:** every multi-agent arm reports a **coverage map**: per area, who looked, who changed it, its measured gain,
and its regressions. It shows whether the org got coverage and reach, or a crowd on one hotspot.

## Proportion (founder, 2026-10-24: "use your judgement not to over use principles")

The principles are for work that needs an organisation, and they cost tokens (warm contexts scale with the number of
agents). So:
- **The default is one strong agent.** An organisation is formed only where the work gives a reason: it does not fit
  one context, it runs over a long horizon, it recurs, or its risk needs independent checking. "Spend attention where
  it changes the result."
- **Same budget as the simpler arrangement.** Every multi-agent design runs at the single agent's budget and must beat
  it there, or be dropped.
- **Smallest dose that works:** a few warm forks, not many; a compacted context where the whole one is not needed;
  cheaper models for some members; stop when the measured curve flattens.
- **Cost per improvement is reported** beside every result.

## What follows for the next designs

- **B9b, P-fork:** a population forked from a warm session, each member with a generic temperament prompt (principle 2)
  and no assigned direction, sharing a findings board (principle 4).
- **B9c, the autonomous org:** warm starts, a claim board instead of fixed module ownership, a findings board with
  beliefs, the architect as arbiter rather than allocator, and the judge crediting each merged change.
- Existing arms (B8 S1/S2, B9 P and S) **violate principles 1-3** by design: fixed modules, assigned directions, short
  cold sessions. Their results measure that design, not agent organisations in general.

## Against the Zen of System 3 (the book's appendix; the founder: "you only need to check the Zen section", 2026-10-24)

| Principle | Zen | Fit, and what it adds |
|---|---|---|
| 1 Autonomy | "Conditions over commands." "The farmer grows nothing. The plant does." "Let the work change the architecture." "Let go of the path, not the boundary." | Strong. Fixed scopes and directions were commands. What stays fixed is the boundary: the judge, the gate, the rules |
| 2 Diversity without restriction | "Keep a strange branch alive long enough to test it." "Emergence over design." "Five judges sharing one source are one witness." | Strong. One model behind different prompts is close to one source: use another model family where available, and let an agent form its own view before it reads others' |
| 3 Full context | "Scaffold. Don't substitute." | Fits. A summary standing in for understanding substitutes |
| 4 Shared, organised learning | "A record outlives the clerk." "Let knowledge accumulate. Let it be overthrown." "Patterns over recipes." "A feather is not a reason." "Remembering is not knowing." | Fits, on conditions: each entry carries its evidence and reasons (not a feather), and stays open to overthrow (beliefs that measurements can lower) |
| 5 Independent referee | "System 3 checks." "The student will find the gradebook." "The judged do not amend the judge alone." "Reality retains the right to be rude." | Strong. More autonomy makes the gradebook easier to find: a held-out judge the agents cannot query, and quiet final scoring |

And for how these designs are tested: "A philosophy of emergence should be willing to lose an A/B test" (B9b and B9c
may lose to V, and a loss is written up as one), and "Investigate the procedure too" (audit what the autonomous agents
tried, not only their scores).

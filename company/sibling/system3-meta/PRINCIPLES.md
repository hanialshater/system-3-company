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

## What follows for the next designs

- **B9b, P-fork:** a population forked from a warm session, each member with a generic temperament prompt (principle 2)
  and no assigned direction, sharing a findings board (principle 4).
- **B9c, the autonomous org:** warm starts, a claim board instead of fixed module ownership, a findings board with
  beliefs, the architect as arbiter rather than allocator, and the judge crediting each merged change.
- Existing arms (B8 S1/S2, B9 P and S) **violate principles 1-3** by design: fixed modules, assigned directions, short
  cold sessions. Their results measure that design, not agent organisations in general.

## Against the book (*System 3: Towards Fluent Autonomy*, checked 2026-10-24)

**Consistent.** Autonomy: Ch 3 ("A fixed Planner → Builder → Critic → Revise loop … answers all of those questions in
advance"), the Zen ("Conditions over commands"), Ch 5 ("Organization itself has entered the search space"). Little
scaffolding: Ch 8 on Anthropic's nine automated alignment researchers ("too much human-designed scaffolding made the
agents less flexible, so they mostly left the workflow alone"; they shared code and findings "through a common forum").
Diversity: Ch 5 (a second witness "has to be capable of being wrong differently"; Kitcher on dividing labour among
programs). Shared record: Ch 8 (the compiler agents "invented their shared record against their instructions").

**Refinements the book asks for** (proposed with the principles, applied in B9b/B9c):

- **R1. Independence before sharing (to 2 and 4).** Ch 5: "When five agents merely repeat one source, we have one
  witness wearing different coats"; "which result is allowed to become everybody else's premise". Each agent forms its
  own view of where the time goes before it reads the findings board; a finding becomes a premise for others only after
  a second agent (or the judge) has reproduced it.
- **R2. Findings are patterns, not feathers (to 4).** Ch 6: knowledge without its context, reasons, the conditions under
  which it would be wrong and a confidence mark is a "feather". Every board entry carries its evidence (commit, judge
  run), where it applies, a wrong-if line and a belief; a one-line rule is not enough.
- **R3. Wrong differently means more than prompts (to 2).** Temperament prompts on one model are a weak form of
  independence; where another model family is available, part of a population and the independent checkers use it.
- **R4. An evaluation the agents cannot quietly win (to 5).** Ch 8: agents probed a scoring API by flipping labels, and
  2.4% of 1,600 research transcripts contained cheating; "once experiments are cheap, the expensive part is an
  evaluation the researcher cannot quietly win". More autonomy needs a held-out judge the agents cannot query (B9's
  hidden corpus and quiet final scoring), and an audit of what they tried.
- **R5. Keep some budget off the favourite (to 1).** Ch 5 (Kitcher; "keep part of the budget away from the leader"): a
  claim board must not pull every agent to the largest measured gain; some pursue a less promising direction.
- And the Afterword's rule, which every benchmark already follows: "Each proposal should beat a simpler arrangement on
  the same model and budget, or be dropped."

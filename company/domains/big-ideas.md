# Big Ideas: category charter

owner: cm-big-ideas (Dmitri) · strands: science (cm-big-ideas-science, Lucia), society (cm-big-ideas-society, Babajide), mind (cm-big-ideas-mind, Signe) · status: incubating · curriculum: `content/curriculum/big-ideas.json` · coverage: `npm run company -- coverage big-ideas` · decision: `company/decisions/2026-10-14-books-and-big-ideas.md`

Drafted on 2026-10-14 by chief-of-staff-ceo-office (Leonie) at the founder's request. cm-big-ideas owns this charter from here and may rewrite anything except the accuracy rules. Changing those needs a decision record.

## Audience
Curious adults and older students who like the "huh, I never thought of it that way" moment. Some come from podcasts and popular-science books. They want ideas that change how they see the world (deep time, the square-cube law, the Jevons paradox, falsification) and they want them right, not just exciting.

## What a great lesson in this category does
It picks **one idea that changes a default view**. Then it sets up a prediction the old view gets wrong, and lets the learner see the new view work on the stage. The idea crosses fields: deep time is geology and it also changes how you read biology, and the Jevons paradox is economics and it also changes climate arguments. Where the idea's mechanism is already a subject lesson (exponential growth, regression to the mean, comparative advantage), the Big Ideas lesson does **not** re-run that mechanism. It teaches the shift in view and names the subject lesson as a prerequisite.

Every lesson also ends with **where the idea stops working**. Chaos limits weather forecasts, not climate statistics. The square-cube law is softened when animals change shape. The 2-4-6 task shows a case where confirming is the wrong strategy, not that it always is. An idea without its limits is a slogan.

## How claims get checked here
- **The strong form is sourced or flagged.** Pop science often states an idea more strongly than the evidence does: "the incompetent overrate themselves", "10,000 hours makes an expert", "1% a day". A lesson states the version the primary literature supports, cites it, and says so where the popular version goes further. If the idea is contested, the reveal names both sides, each with its source.
- **Primary sources first.** Cite the original paper or book (Lorenz 1963, Wason 1960, Jevons 1865, Rawls 1971) for what was claimed. Cite a review, meta-analysis or replication for whether it holds. A popular book or article is a source only for the fact that it popularised the idea.
- **Replication status.** Psychology and social-science ideas carry a replication note in their claims (for example a Many Labs result, a registered report or a meta-analysis), or say plainly "not replicated" or "untested".
- **Toy models are labelled.** A model we chose (logistic map, a public-goods game, a population with fixed birth and death rates) is labelled as the lesson's model, with its assumptions on the stage. Its numbers are checked in node (`company/domains/briefs/checks/`).
- **Thought experiments** (veil of ignorance, ship of Theseus, Newcomb) have no "right answer" about the world. Their predictions must be about something checkable: what the argument implies, what people in a cited study chose, or what a stated rule computes. A prediction that is pure opinion has no answer index, and it is refused.
- Anything touching health is about method, not advice (the control-group lesson is about evidence, never about what to take).

## What we refuse to publish (the refuse list; cm-big-ideas owns it)
- Ideas that are only provocative, with no checkable content: "everything is a simulation", "free will is an illusion" stated as fact.
- The popular strong form of a contested or failed finding presented as settled, for example power posing, ego depletion or the marshmallow test as destiny. These can be taught as **failures of the finding**, sourced to the replication.
- Moral or political conclusions presented as facts. Thought experiments are taught as arguments with named positions (Rawls versus Harsanyi), never as "the right answer".
- "Great man" history that credits one person for a collective discovery without saying so.
- Health, diet, medication or money advice, as in the Life Hacks refuse list.
- Ideas whose only demonstration is a told story. If nothing on the stage stands for the idea, it is not a lesson (see `company/decisions/2026-10-14-told-vs-shown.md`).

## Portfolio rules
- **Strands.** Each concept carries one strand in `subarea`: `science`, `society` (Society & Economics) or `mind` (Mind & Philosophy). Each strand manager owns that strand's concepts and the briefs file `company/domains/briefs/big-ideas.<strand>.md`. cm-big-ideas owns the cross-strand ranked list in `company/domains/briefs/big-ideas.md`.
- **Subject first.** Before adding a concept, search every curriculum (`content/curriculum/*.json`) and run `node tools/overlap.mjs`. If a subject category already teaches the mechanism, that concept becomes a prerequisite or goes in `also`, and the Big Ideas concept must name what it adds. If it adds nothing, it is not a Big Ideas concept: offer it to the subject's category manager instead, like the Life Hacks transfer rule.
- **Balance.** Each cycle's ranked list covers all three strands, and no strand gets more than half of the briefs.
- **One lesson per idea first.** No idea gets a second lesson until every demand-3 idea has one.
- **Ranking.** Demand first. Then how far the idea changes a default view (a bigger shift ranks higher). Then how well it can be shown on one phone screen. Then how much overlap it has with existing lessons (less overlap ranks higher).
- **Demand ratings** in `content/curriculum/big-ideas.json` are a first estimate made at drafting. They are not learner data. cm-big-ideas confirms or changes them at the first cycle planning.
- **Launch gate.** The category stays incubating until 5 lessons have passed Domain Launch Review.

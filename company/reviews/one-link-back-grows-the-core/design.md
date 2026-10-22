# Design note: one-link-back-grows-the-core (cs:core-grows-by-one-link)

author: demo-builder (learning-designer merged into the builder, F-f) · 2026-10-22 · v1 · brief: `company/domains/briefs/cs.systems.md` #8 (NCM wave J, J5; cm-cs, strand cm-cs-systems) · numbers: node reachability check quoted in build.md

## The payoff
A back link does not pour the whole bow tie into the core. It closes one loop, and only the pages on that loop can now both reach the core and be reached from it. The learner should see I → F light up exactly E, F, H and I (8), see G and J stay hollow, then see J → G light up a different loop (6) and both together fill all 10.

## Knowledge boundary (meta.json `learner`)
- knows: links are one-way; the IN / core / OUT picture (web-bow-tie-reach).
- doesNotKnow: that one new link from OUT back to IN joins exactly the pages on the loop it closes, not the whole of IN and OUT.

## Misconception
One link from OUT back to IN pulls all of IN and OUT into the core.

## Objective
The learner can say that a new OUT → IN link adds to the core only the pages on the loop it closes (here 8, not 10), because a page joins the core only when it both reaches the core and is reached from it.

## Prediction
Brief's text turned into a second-person scene with every condition stated (copy-style): "You map a 10-page web. In its core, pages A to D can each click their way to every other. You add one link, from OUT page I to IN page F. How many pages are in the core now?" Options 5 / 8 / 10 (answer 8), all bare numbers. 10 is the misconception; 5 is "only the new page joins".

## Interaction
- One picture (340 × 240 viewBox): ten nodes in a bow tie, IN (F, E, G) left, core (A, B, C, D) centre, OUT (H, I, J) right; tags IN, CORE, OUT. Graph from the brief: A→B→C→D→A; E→A, F→E, G→B; C→H, H→I, D→J.
- Back links run around the outside in the domain colour: I → F over the top, J → G under the bottom, drawn only while added.
- The core is computed live (pages A reaches that reach A). Core pages are filled; links between two core pages are bold, the rest muted. Readout above the picture: "core: N pages".
- Controls in brief DOM order: [Add I → F] [Add J → G] [Both] [None]; exclusive presets, the shown one active and disabled. No node taps.
- Trace: each tried chip keeps "✓ N" (the core size it gave), so None cannot erase what the reveal quotes.
- Milestones: `IF` (core 8, the question's case) and `JG` (core 6). minInteractions 2. QA path (each chip once in DOM order) hits both on presses 1 and 2.
- In the reveal the stage is pinned to I → F, the case the reveal walks through; chips are disabled there.

## Reveal
"I → F closed one loop: F → E → A → B → C → H → I → F. Every page on it now reaches every other, so E, F, H and I joined: core 8. G still can't be reached from the core, and J can't click back, so they stayed out. / J → G instead closed J → G → B → C → D → J: core 6. [Both links: all 10.] One back link adds only the pages on the loop it closes. / A toy web, not to scale."
8 and 6 are the recorded milestone values; the bracket shows only if Both was pressed (it is on the QA path). The closing sentence is the lesson's point (the answer to the misconception), kept as content per copy-style.

## Told vs shown
The cause (a page must reach the core and be reached from it) is shown: the loop's links turn bold and its pages fill; G (reaches in, never reached) and J (reached, never gets back) stay hollow beside them. The general rule is told once (claim c3), after two cases on the stage.

## Recall
"A web has a core, IN pages that link into it and OUT pages it links to. You add one link from an OUT page back to an IN page. Which pages join the core?" Only the two pages the link joins / The pages on the loop the new link closes / Every IN and OUT page (answer: the loop; claims c2, c3).

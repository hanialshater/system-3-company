# Decision: a Marketing org on its own HQ floor, with a VP of Marketing reporting to the founder

owner: chief-of-staff-ceo-office (Leonie), org design; the founder decided the org
date: 2026-10-14
status: accepted (founder request: the org, the floor and the reporting line); the design is consulted by written record, and the directs' answers are owed (board)
class: org
route: founder (decided whether) → chief-of-staff-ceo-office (design, this record) → head-of-product, analytics-steward, growth-designer, design-lead, privacy-reviewer (consulted: handoffs) → chief-of-staff (dispatching) → founder (ratifies the design and the refuse rules)
recorded by: chief-of-staff-ceo-office
pattern: 2026-10-14-books-and-big-ideas.md, company/ceo-office/org-change-process.md

## What the founder said

> "Also create a new a new floor for marketing. With VP of marketing reporting to me"

(company/decisions/2026-10-14-founder-durable-ops-and-marketing.md, Decision 2)

## What the founder decided, and what is left to the owners

- **Decided by the founder (whether):** a Marketing org; a VP of Marketing reporting directly to the founder; a new HQ floor.
- **Designed here (how):** the VP's scope, decision rights and refuse rules; no first reports yet; handoffs; the floor.

## The org

| Role | Name | Reports to | Owns |
|---|---|---|---|
| **vp-marketing**: VP of Marketing | Celeste | founder | `company/marketing/`: positioning, the audience notes, the marketing claims register, channel proposals, launch narratives for founder-approved deploys |

**No first reports.** Each candidate was tested against the founder's "durable work" ask and today's audit (company/reviews/org/2026-10-14-operating-audit.md), which found the host and review capacity, not headcount, are the bottlenecks:
- *Content marketer:* not yet. There is no approved public channel to write for. Trigger: the founder approves a first channel and the VP shows a weekly cadence one agent cannot hold.
- *Marketing analyst:* no. Metric definitions belong to the analytics steward; a second owner of "what the number means" is the failure the steward exists to prevent.
- *Copy checker:* no. The fact-checker checks every factual line in marketing copy, the same way it checks lessons; the VP never verifies its own claims.
- *Community or social manager:* no. No external accounts exist or may be created without the founder.

So the floor opens with one office and empty meeting space. That is deliberate: rooms are cheap, roles are not.

## Scope and decision rights

**In scope:** positioning and messaging (who it is for, the one-line promise, what we never say); audience notes built from the vertical strategies and the domain charters; a marketing claims register (`company/marketing/claims.md`): every factual sentence in any copy, with its source, checked by the fact-checker; launch narratives and release-note copy for deploys the founder has approved; channel and budget proposals (the founder decides); a marketing section in the WBR once a channel exists.

**Out of scope:** product features and promises (head-of-product); in-product sharing, invites and streaks (growth-designer); metric definitions and experiments (analytics-steward); lesson content (category managers); the visual system (design-lead); deploys (release-manager).

**May:** propose positioning, channels, budgets and campaigns; draft copy; ask the analytics steward for numbers and their definitions; ask category managers for showcase lessons.

**May not (refuse rules):**
1. Post anything publicly, or create, sign in to or run any external account, without the founder's approval of that item.
2. Deploy, publish or change anything a learner or the public can see without the founder's approval of that specific change (CLAUDE.md deploy rule).
3. State or imply a learning outcome ("learn faster", "remember 2x") without analytics-steward data and its written definition. There is no real-learner data yet (EXP-002 has not run), so today no outcome claim may be made at all.
4. Fabricate or paraphrase-into-existence testimonials, reviews, user counts, quotes or endorsements; impersonate anyone.
5. Mark its own copy claims verified, or feature a lesson whose claims are not all verified.
6. Use dark patterns, fake scarcity or engagement-as-learning framing (growth-designer's and Surface Value's rules apply to copy too).
7. Spend money or accept terms on the company's behalf.

## Handoffs

| With | Marketing gives | Marketing gets | Rule |
|---|---|---|---|
| head-of-product | copy that states what the product does | sign-off on every product promise; the roadmap it may mention | no promise of an unshipped feature |
| growth-designer | the outside-the-product half of a share or invite flow | the in-product half; the link spec | growth owns in-product, marketing owns outside; privacy-reviewer reviews any tracking (UTM, referral ids) |
| analytics-steward | the number it wants to cite and where | the definition, period and what would count against it, or "no data" | no number without a definition |
| category managers | the showcase request (audience, one lesson per category) | a lesson whose claims are all verified and which is published | cm confirms the claims status |
| fact-checker | the claims register entries | verified / disputed / held | independent of the VP |
| design-lead | layout and asset requests | the visual system | marketing does not invent a second look |
| release-manager | release-note copy | the approved deploy and its record | copy rides only a founder-approved deploy |

## HQ

A new floor for Marketing: its own floor number, the stairs and lobby pattern of the other floors, the floor switcher, the VP's office and a marketing meeting room, and the event-log room map (`tools/events.mjs`) so marketing events land on that floor. Built after the History org's HQ commit lands, per the coordinator's sequence.

## Rituals

wbr (marketing section, once a channel exists), launch-review (attends, for the public narrative of an approved deploy), op-planning (marketing narrative), retro (attends). No new ritual.

## Objections

- **principal-pm-verticals / ops review (carried in the founder record):** review capacity and the host are the bottlenecks; a new org adds coordination load and adds neither. **Answer:** accepted as a constraint. The org opens as one role with no reports and no build work, so it uses no builder slot and no review batch until the founder approves a channel. Its first dispatch counts against the 8-agent cap like any other.
- **analytics-steward (carried in the founder record):** nothing is deployed to real learners, so marketing has no outcome evidence. **Answer:** refuse rule 3 makes that binding: no outcome claims at all until EXP-002 data and a written definition exist. Copy may describe what a lesson does (verifiable), not what it does to the learner.
- **CEO office against itself (failure mode "adding roles to fix problems that are really about process"):** the founder asked for this org; it does not fix today's process failures and should not be presented as if it did. **Answer:** recorded. The durable-ops fixes are separate (2026-10-14-operating-caps-and-intake.md).
- **First direct report outside the CEO office and the founder's existing directs.** The org-change process lists the founder's directs; adding one widens the founder's span. **Answer:** the founder chose the reporting line. The VP's handoffs run through head-of-product for anything about the product, so the founder is not the only integrator.

## Consulted (owed, written)

head-of-product (Priya), analytics-steward (Grace), growth-designer, design-lead, privacy-reviewer (Elif), chief-of-staff (Ada). Each answers agree / agree with changes / object here. Board items carry the asks.

- **design-lead (Ines), 2026-10-16 (W-761): agree with changes.** I agree with the handoff row "design-lead | layout and asset requests | the visual system" and with "marketing does not invent a second look". The changes below say what that row means in practice, so it can be checked. They do not set marketing's scope, channels or cadence. Those belong to vp-marketing and head-of-product, and no asset is made until a founder-approved item needs one (refuse rules 1 and 2).
  1. **Which sections marketing assets must follow.** From `company/design/system.md`: *Colour roles* (v0 list) and *Tokens and contrast (v1)*, all of it. That means the same tokens in light and dark, text at 4.5:1 and graphics at 3:1, `--good`/`--warn`/`--bad` as text and `--*-fill` for shapes only, `--domain` never as light-mode text unless mixed (`color-mix(in srgb, var(--domain) 45%, #000)`), and dark ink on bright fills. Also *Type* (system UI sans; the 25/90-word budgets are lesson budgets, not copy limits) and *Charts and diagrams* whenever an asset shows a chart or a model. *Motion* (settle within 450 ms, respect `prefers-reduced-motion`) applies to any asset that moves. *Accessibility: minimum text size in lesson pictures* also applies: any labelled picture shown at phone size uses the 11 px authoring target and never goes under the 10 px floor. *Fold at the reveal* does not apply. Any illustration follows `company/design/illustration.md` in full, with its review chain (visual-designer for style, fact-checker for accuracy, accessibility-reviewer for alt text, lifehacks-safety-reviewer for Life Hacks). Its *Accuracy and safety* rules block a delivery here exactly as they do in a lesson, and *No text in images* holds: headline copy sits beside the picture, never painted into it. Today there is no logo, wordmark or marketing palette. If one is needed, it is a design-system change: a request to design-lead, recorded in system.md. It is not a marketing asset.
  2. **How a request reaches design.** vp-marketing adds a board item owned by design-lead: `npm run company -- board add "Marketing asset: <what>, <size/format>, for <founder-approved item or record>" --owner=design-lead`. The item links the copy and its `company/marketing/claims.md` entries. Design-lead triages it into one of three routes. (a) A layout or look: a visual-designer run. (b) An illustration: an illustrator run requested through visual-designer, as `illustration.md` already requires. (c) A lesson screenshot: no design run at all; see point 3. Design-lead does not approve designs it made itself. The maker's output is reviewed by a role other than the maker, and accessibility-reviewer checks contrast and alt text before anything public. A request that would need a new on-screen format inside the product, such as the ad card in `company/marketing/2026-10-15-monetization-ads-proposal.md` (point 3, "visually distinct from a lesson"), is not an asset request. It is a format: it needs a spec in `company/design/formats.md` and a reference before anyone builds it (design-lead may block until then), and the kit work goes to platform-engineer.
  3. **Lesson screenshots are never re-drawn.** Any picture of a lesson used publicly is taken from that lesson's walkthrough artifacts (`npm run walkthrough -- <slug>` → `artifacts/walkthroughs/<slug>/*.png` or `sheet.png`). It is never re-drawn, mocked up, re-typeset or edited, except to crop or scale it, or to place it in a neutral device frame. The claims register entry records the slug, the frame file and the commit SHA the walkthrough ran at. If the lesson changes, the screenshot is taken again. The lesson must meet the showcase rule above (published, with every claim verified), because every learner-visible sentence in a screenshot is a claim of that lesson. A re-drawn lesson would be a second look and an unchecked claim at the same time.
  Limit: none of these is checked mechanically yet. Until a public channel exists, the check is the reviewer named in point 2. If that turns out to be too weak, the ask goes to evaluation-steward for a lane 10 check, not to marketing.

## Board

Added with this record: founder ratification of the design and refuse rules; the consultations; the VP's first deliverable (positioning draft and an empty claims register, no public output).

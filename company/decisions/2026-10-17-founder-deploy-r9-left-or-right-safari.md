# Founder decision: production deploy of 2026-10-17 approved, carrying math/left-or-right unverified in Safari (r9 ruling 2, W-1661)

owner: release-manager (the deploy)
date: 2026-10-17
status: decided
class: release and risk acceptance
route: chief-of-staff summary → founder → release-manager prepares → chief-of-staff triggers the Deploy to Vercel workflow
recorded by: release-manager (from the words the chief-of-staff relayed from the conversation of 2026-10-17)

## What the founder said
1. On the summary listing the 5 lessons published earlier and the four knot lessons published today: **"Deploy"**.
2. Asked separately whether to hold back math/left-or-right because its 3D card is unverified in WebKit/Safari (r9 ruling 2, W-1661), the founder chose **"Ship it anyway"**. Option text shown: "Deploy left-or-right too, untested in Safari. If the card fails there, iPhone users see the mirror-image knot after 'Turn over'. Your decision gets recorded in the release record."

## What this approves
One production deploy of the tree prepared in release r9 (company/ops/releases.json), including the published `math/left-or-right` v3. It is this deploy only; any later deploy needs its own approval.

## The risk the founder accepted
The left-or-right card is correct only if both faces keep `backface-visibility: hidden` and the card keeps `transform-style: preserve-3d` (r9 record, ruling 2; principal-engineer condition C3). The lesson is verified in Chromium only (contract QA, C1 61/61). No WebKit run and no real iPhone check exists. If WebKit fails, an iPhone/Safari learner sees the reflected front, the mirror-image knot, after "Turn over": a false picture on the lesson's own question. Builder set the `-webkit-` prefix inline and both properties are long supported in Safari, so failure is judged unlikely, but it is not checked. Firefox is also not run (r9 objection 2).

## What would make this decision wrong
A WebKit/iOS Safari failure of the card (mirror frame or any rest-state failure), found by `company/reviews/left-or-right/c1-check.mjs` with `ENGINE=webkit`, a real iPhone check, or a learner report. Then: revert the left-or-right publish commit (0b4e2e0ae, "release: publish math/left-or-right v3") and redeploy (needs its own founder approval), and r9 ruling 2 (d) applies: the go lapses and the lesson goes back to demo-builder with the record. Until then W-1607/W-1615 (WebKit/Safari check) stay owed.

## Where it is recorded
- r9 launch record, WebKit cell: company/rituals/records/2026-10-17-launch-review-left-or-right-r9.md ("waived by founder for this deploy").
- Release entry r9: `approved_by` and `known_issues` in company/ops/releases.json.

## Objections
- r9 objection 1 (demo-builder, qa-tester, design-lead, principal-engineer C3): the 3D card is unverified in WebKit/Safari. Answer: the r9 chair made it a deploy-time precondition (ruling 2 (b)); the founder was asked, with the consequence stated, and waived it for this deploy only. The gap stays open on W-1607/W-1615, the cell is marked as waived (not as verified), and the release entry lists it as a known issue.
- r9 objection 2: Firefox not run. Answer: declined as a precondition by the chair (ruling 2 (f)); stays on W-1607 and in the release known issues.
- Release-manager objection: none to the founder's choice; recorded that the waiver is not a verification and is not carried to any later deploy.

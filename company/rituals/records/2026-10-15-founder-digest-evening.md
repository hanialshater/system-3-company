# Founder digest: 2026-10-15 evening

owner: chief-of-staff · cadence: at least every 12 h (company/rituals/triggers.json)

## Shipped
- **Release r7 is live** on https://system-3-company.vercel.app. It ships 40 newly published lessons (675 published now), including the first 4 History lessons, and draft 404s with the publicMeta allow-list. QA ran on the exact tree, 1930/1930. C2 passed on production: drafts 404 twice, and /api/meta carries allow-listed keys only.
  - **COE:** r7 was built and promoted from aefb10a about 20 minutes before your approval. The deploy marker was quoted in a commit body. You approved the same content afterwards, and there was no second deploy. Fixes are W-1051..W-1054 (company/rituals/records/2026-10-15-coe.md).
- **Behavioral economics is a category in the code** (W-981 merged; principal engineer and PE-ops approved). Briefs 1–5 are written with passing check scripts, and design notes exist for briefs 1–2. Builds are held for Project Review 1 and W-556.
- **Claims:** FC pass 49 verified 11 of 11 reset claims on the 9 lessons held out of r7.
- **Life Hacks learner reviews (r11):** 5 of 6 batches are done, 153 lessons. 22 launch, 131 revise, 0 fatal, 0 safety holds. Most revises come from template-level defects: the answer is given away, only one option's number is shown, dead sliders, inverted toggle highlight, formula notation on screen. These are filed as template fixes (W-1064, W-1066, W-1070, W-1071).

## Decided by you since the last digest
- "yes, deploy r7".
- Speed up Life Hacks reviews, and work on behavioral economics.

## Blocked
- **The Life Hacks wave-2 gate:** spaced-beats-cram came back revise. Its stage contradicts its own claim c5, so it is going to a builder first (W-1075).
- **Vercel API is 403 for this session's scope.** Deploy state is read from GitHub commit statuses instead.

## Waiting on you (most important first)
1. **Project Review 1** (F-15), due 2026-10-16 23:59 UTC. It gates the behavioral builds.
2. **Sign AMD-001 (c2)**: it closes the client-bundle leak (W-946) and makes phones about 5× faster to usable.
3. **F-01** accounts/sign-in by 10-23; **F-24** age policy; **F-25** lawyer by 10-30; **F-23** domain name.
4. **F-22** behavioral slot budget (option (c) recommended). **F-17..F-20** ads (release 2, not urgent).
5. W-1051: the deploy-marker fix changes deploy config, so it needs your approval when ready.

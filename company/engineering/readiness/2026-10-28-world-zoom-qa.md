# Branching world and camera QA

Recorded by: qa-tester · 2026-10-28 UTC. Target: root-approved http://localhost:3500/learn/world, externally started development artifact, changing during inspection; base helper identity supplied as `7ff5ec195`. This is not frozen production evidence. No application source or builder notes were opened before these observations. No app/style injection or source edits were used.

## Initial independent browser observations

Chromium at phone 390×844, short phone 390×650 and desktop 1440×1000:

- Overview exposes 14 subject choices rather than the old 162-island corridor. Mathematics opens four island choices; Number Island opens three topic branches and 12 leaf questions. Actual scene has hub/leaf connectors, shared ocean, cream and forest styling with List; the selected leaf/row is visibly highlighted. Initial fresh route currently opens Number Island; Overview/Atlas offers the broader choices.
- Rendered List contains 3,895 lesson buttons with 3,895 unique IDs.
- Actual two-finger CDP touch expands map scale 1→2 while `visualViewport.scale` remains 1. Zoom in moves 1→1.25; Reset returns translateX0 / scale1. Headless fullscreen is unavailable here; Expand enters immersive CSS layout, exposes Exit, and Escape restores the introduction.
- Desktop drag changes translateX −360→−660 at scale1.5 and keeps the Open lesson selection. Keyboard Enter on Reset restores translateX0 / scale1. Drag also selects text in a leaf; this is a cosmetic limitation, not a changed lesson selection.
- Short-phone single-finger horizontal touch changes translateX0→−200 at scale1 while document scrollY remains 413 and the selected lesson remains add-a-zero. Reset while already at100% restores translateX0. Touch cancellation releases the gesture; subsequent Zoom changes scale1→1.25.
- Initial page has zero document horizontal overflow at all three viewports. First inspected mobile World atlas wordmark target is about38×44 px, below requested44px width; zoom controls, Feed, Map/List, breadcrumb Atlas and Overview measure at least44px in both dimensions. This does not certify every rendered control.
- Initial scripts captured no JavaScript page exceptions. Actual first player navigation waited30s for its controls, and a separate direct player HTTP/DOMContentLoaded navigation timed out after60s. Owned-server world request subsequently stalled as well; these are recorded as dev compile/server blocking dependent checks, not assumed UI defects. Root/builder were notified. Player return/camera, cross-subject connection navigation, legacy storage and the live breadcrumb fix are pending warmed artifact checks.

Evidence: `artifacts/world-zoom/dev/initial.mjs`, `audit.mjs`, `interaction.mjs`, `touch.mjs`, `connection.mjs` and corresponding JSON. `interaction.mjs` first used the wrong Exit accessible name, then was corrected to actual `Exit immersive view`; that harness correction is not a product failure. Actual initial screenshots viewed: phone/desktop initial map, phone List, phone Atlas, phone immersive zoomed and desktop immersive zoomed. Current dev screenshots include a Next.js dev control and are not final presentation assets. Final frozen artifact identity, player/camera checks and clean screenshots will be appended rather than attributed retrospectively to this changing dev artifact.

## Warmed development followup

After root confirmed player compile readiness, remaining actual browser checks completed successfully. This is still changing dev evidence, not production stamping.

- Map at translateX−112.5 / scale1.25 / scrollY865 → Open lesson → Next → World returns the updated second stop and exactly the same transform and scrollY865. Browser v2 storage records island/subject, focus, view, zoom/pan and selection.
- Topic connection from Number Island to Physics Island 1 opens `pendulum-period`, the Physics breadcrumb, five branch hubs and actual physics lesson leaves. The selected List row afterward is `world-stop-pendulum-period`.
- Seeded only the exact old key `s3:world-position:v1` with `{slug:'add-a-zero',view:'map',y:453692,limit:138}`; fresh new map remains at scrollY0. Giant corridor offset is ignored.
- Atlas → Life Sciences shows Life Sciences in breadcrumb and choice heading; Life Island 1 remains Life Sciences. Root-reported breadcrumb correction is verified through actual UI.
- Actual desktop drag no longer shows text selection in refreshed screenshot. Mobile/desktop product targets in later List geometry are at least44px in each dimension; the sole32×32 match is Next.js's development tool.
- No JS page exceptions captured in completed warm followup. Earlier player timeout is resolved by server warmup; earlier wrong Exit and missing whitespace in the topic-connection locator were probe mistakes, corrected to actual accessible names.

Further screenshots actually opened: `desktop-list.png`, `desktop-connected-physics.png`, `short-life-subject.png`, `short-life-list.png`, `short-immersive-map.png`. List shows the full inventory starting from Mathematics while detail/breadcrumb retain a selected Physics/Life lesson; the selected row exists further down. This record does not infer filtering from the breadcrumb. Machine evidence: `dev/interaction.json`, `dev/legacy.json`, `dev/touch.json`. Root was told these checks are ready for frozen production smoke; no new content verification or full suite requested.

## Frozen production smoke — 2026-10-28 UTC

**Bounded production smoke passes.** Target `http://localhost:3400/learn/world`, external root-started production server. Root identifies frozen app `8a8e630b977fff89dde5b5b7ce04d6f6ebe5ae00`, BUILD_ID `VkYO2NHoyWSW6d6YpWCrT`, completed production build8230pages/exit0. Server identity is supplied by its owner; this QA did not build/start it. The preceding environment disconnect prevented the earlier final run; this reconnected run completed without app changes or browser style injection.

- Phone390×844, short390×650, desktop1440×1000 each complete Overview→Mathematics→Number Island, Map/List and immersive125% presentation, Exit, player Next/World. Every viewport renders3,895 List buttons with3,895 unique lesson IDs.
- Actual phone two-finger touch changes map transform from translateX−48.75/scale1.25 to translateX−186/scale2 while browser visualViewport.scale stays1. Reset is then used successfully before returning to125%.
- Actual phone lesson-stage swipe updates selection from first to second lesson; World returns `more-digits-not-bigger`, scale1.25/translateX−48.75, exact scrollY247. Short and desktop Next/World likewise retain the second selection and exact camera/offset: short−48.75/1.25/Y344; desktop−175/1.25/Y377.
- No JS page exception captured. Prior dev checks cover drag/cancel, legacy key, cross-subject navigation and breadcrumb fixes; production smoke did not repeat every dev edge case or certify all lessons/content/accessibility.

Machine evidence: `artifacts/world-zoom/final/smoke.mjs`, `final/smoke.json`. Separate actual captures are `phone-map.png`, `phone-list.png`, `phone-immersive-zoomed.png`, the equivalent `short-*` and `desktop-*`, plus atlas captures. QA opened and visually compared all nine Map/List/immersive images and desktop atlas. The images show matching ocean/cream/forest styling, consistent selected question and branch/leaf connections. Narrow views intentionally clip the2Dmap horizontally, with the tested pan gesture providing access. Short immersive screenshot has a reduced exposed map area above the fixed detail sheet; Exit and Open lesson remain visible.

Use the final captures for this working baseline. Bespoke new scenery, subject emblems and animation art are a subsequent untested candidate, outside this baseline verdict. No future-art or performance claim is made. All QA-owned browser contexts closed. No source, lesson metadata, shared ops or publishing gates changed. Next: coordinating owner may present/push the verified baseline; new art receives its own artifact review when concrete.

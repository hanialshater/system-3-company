# Branching World presentation: platform tier1 self-check

owner: platform-engineer
date: 2026-10-28
tier: 1
status: builder self-check; independent artifact QA and coordinator production build remain required

Scope is existing World presentation and navigation only. Subject atlas and island topic fan-outs replace the lesson corridor; membership spokes do not assert prerequisite gates. Stable island IDs and contextual-player order remain unchanged. All List entries remain present. Existing curriculum-only cross-island links are supplied by the independently tested pure helper. No lesson metadata, account, assessment, progress, kit, feed, route, dependency, deployment configuration or protected gate changed.

The canvas reserves its measured unscaled height multiplied by magnification. Horizontal pan is normalized and clamped to actual content overflow; native document scrolling remains the vertical coordinate. Chrome, camera controls and selected lesson sheet stay outside the transform. Touch pan is horizontal-only; normal one-finger vertical scroll remains native. Two-finger pinch is captured only on the map. Mouse drag supports horizontal pan plus document movement. Click suppression applies to a moved gesture and later intentional taps clear it; cancellation/capture loss/Escape release drag state. Navigation snapshot v2 ignores incompatible old corridor offsets and includes bounded finite camera/immersive/focus state. The player updates the v2 selected slug on return.

Validation performed by the builder: 12 World helper tests passed (inventory4, grounded connections5, camera3). Initial full typecheck passed; final incremental recheck is recorded in the coordinating report. Real local Chromium builder smoke at390×844 and1440×1000 produced no JavaScript page exception, displayed3895 List links and working125% button zoom. Real two-touch CDP events magnified1→1.6; Reset returned1 and Expand exposed an always-visible Exit. Actual Map/List/immersive screenshots were viewed. These are builder checks, not independent review or hosted deployment evidence.

Rollback is an additive revert of the World-only UI/camera source commits, preserving all3895 lessons and existing publication states. Legacy aggregate check failures remain outside this scoped presentation work; no success is claimed for them. No deployment was attempted.

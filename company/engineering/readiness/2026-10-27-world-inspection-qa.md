# All-lessons world: bounded artifact QA

Recorded by: qa-tester · independent browser inspection · 2026-10-28 UTC.
Target: http://localhost:3400/learn/world · mode: external, root-started production server.
Built from: `782afa361066cf6b2d7232de12d1abdb0c5588fb`; `.next-world-inspection/BUILD_ID`: `fsL1oO0CEQic0ISRWCIY7` (both read locally during audit). No rebuild or source changes by QA.

**Usable for founder inspection with a stage-swipe limitation: arrows, keyboard and outer touch swipe work; swiping inside the lesson stage does not advance.** This is a world/player usability record, not lesson-content verification, publication approval, or learning evidence. Builder notes and implementation source were not opened. The brief supplied expected counts and routes; observations below come from the served artifact.

## Observed behavior

- Phone 390×844, short phone 390×650, desktop 1440×1000: actual SVG island scenery, village headings and numbered lesson buttons render. Phone sheet opens/closes and keeps Open lesson available; scrolling exposes the island path. Initial selection is Number Island stop 01, `add-a-zero`. Desktop detail panel remains visible beside the scene. Landscape resize 844×390 has zero horizontal overflow; phone/short-phone/desktop initial audits also recorded zero horizontal overflow.
- List renders **3,742 lesson links with 3,742 distinct stop slugs across 156 island sections**. All 3,742 lesson buttons exist; Unchecked text is visible. Count/uniqueness is an artifact check; comparison against an independent filesystem registry was outside this browser-only audit.
- Subject selector → Behavioral Economics jumps to island 136 and selects `sure-million-or-long-shot`. It opens Behavioral Island 1, Unchecked, In review / Unpublished. Next opens `saved-or-die-same-600` (2/25); World returns to that updated selection and exactly the previous map scroll offset **453692 px**.
- Final List stop `be-source-0500` opens Behavioral Island 21, position 4/4, with Draft / Unpublished text and a loaded interactive prediction. World retains List + final selection and restores **307201 px** exactly. At an earlier 500 ms sample scroll was still 0; a fresh reproduction waiting 2 seconds restored the exact offset. Do not call the early sample a permanent restoration failure.
- First lesson prediction 35 → Lock it in → ×10 changes the visible readout to Written 35 / Value 35 and the explanatory sentence. This checks one live lesson interaction, not every lesson.
- Contextual player starts at requested stop 2/12 on a direct route. Enter on focused Next moves to 3/12. ArrowDown with body focus moves 1→2. Real Chromium touch events at the card gutter x=5 and x=330 move 1→2→3 and update the URL in island order. Swipes/wheel inside the interactive stage did not change lessons; outer gutter swipe does.
- Ordinary `/` still presents the existing All/category feed and introductory Start screen; no exhaustive feed regression suite was run.
- No JavaScript page exception was captured. HTTP 404 `/api/account/me` appears in the world/player and ordinary feed; this is inherited account behavior, not a world-specific exception. One initial page also reported an unattributed second resource 404; subsequent response-URL capture identified only the account endpoint.

## Navigation limitation and nonblocking followup

0. **Stage swipe:** a 500 px upward touch at x180,y650→150 inside the initial lesson stage stays on stop 1. Gutter touches advance normally. A temporary browser-only diagnostic `.card-body{overscroll-behavior-y:auto!important}` makes the identical stage touch advance to stop 2, attributing the difference to scroll containment. This diagnostic is not a passing result for the unmodified artifact and was not saved into app source. See `stage-diagnostic.json`. Implementation owner should decide whether stage swipe needs parity with the ordinary feed before presenting it as general swipe navigation.
1. Long late-island village headings are not adapted to the narrow map composition: Behavioral Island 1's first heading wraps across the tree/house scenery and its small subtitle. Stops remain accessible and the lesson detail/player title is readable. See `phone-late-subject.png`. Design/implementation owner should shorten displayed village copy or reserve more label space.
2. The top Feed link measures about 37×44 px on phone, below the brief's 44 px width; lesson stop buttons measure 48×48, Map/List and subject selector are 44 px high. List's automated geometry scan found Feed as its only target below 44 px in either dimension. This audit does not certify every player lesson control's touch target.
3. Exact late-List return can take over 500 ms. The final 2-second check succeeds; a loading/restoration cue could improve perceived responsiveness.
4. No WebKit/Safari, screen-reader, contrast, dark-theme, reduced-motion or all-lesson interaction pass. Lazy map rendering was observed through initially limited controls and later subject materialization; no performance benchmark was attempted. Advanced mastery/recall features are intentionally outside this inspection. Independent content, claims and review gates remain unchanged.

## Evidence and founder captures

Evidence scripts and JSON are under `artifacts/world-inspection/`: `probe.mjs`, `interact.mjs`, `audit.mjs`, `followup.mjs`, `repro.mjs`, `touch.mjs`, `gesture.mjs`, `stage-diagnostic.mjs`; corresponding `*-initial.json`, `interactions.json`, `audit.json`, `followup.json`, `repro.json`, `touch.json`, `gesture.json`, `stage-diagnostic.json`.

Selected actual screenshots, all opened and visually inspected by QA:

- `phone-world-scene.png` — attractive 390×844 Number Village path and compact lesson sheet.
- `desktop-world-scene.png` — 1440×1000 SVG path with side detail panel.
- `phone-player.png`, `desktop-player.png` — actual initial lesson player.
- `phone-late-player.png` — actual unpublished Behavioral lesson player.
- `phone-late-subject.png` — long-label limitation.
- `short-phone-scene.png`, `short-phone-expanded-sheet.png` — 390×650 scene and expanded sheet.
- `list-bottom-back.png` — final lesson List selection after exact-scroll restoration.

Raw captures are local ignored artifacts; preserve/copy them with the founder inspection bundle. No lesson review record, metadata claim state, publishing gate, shared board, event or progress log was changed. Next: coordinating owner can present this built artifact and selected captures to the founder; visual followup belongs to design/implementation owner.

## Final artifact affected-only recheck — 2026-10-28 UTC

Target remains root-started `http://localhost:3400`; actual HEAD `2ff4748e9720de33dfb7c3f43989f977e871ebcb`, BUILD_ID `y54lbicpjgyppu2w1Kq9a`, both read locally. Earlier evidence above is preserved as historical evidence for its own artifact. **The stage-swipe defect and Feed target finding pass on this final artifact.** No browser style injection, source read, source edit, rebuild or broad QA suite was used for this recheck.

- Identical real Chromium touch sequence at x180,y650→150 inside the lesson stage advances `add-a-zero` → `more-digits-not-bigger` both before prediction and after normal prediction/explore interaction. Prediction 35 → Lock it in → ×10 still yields Written 35 / Value 35.
- Feed link now measures exactly 44×44 px at 390×844.
- Actual Behavioral Island 1 phone screenshot shows the long heading limited to three lines and hint to two, with visible separation; heading no longer overlaps the hint. Some scenery remains behind the label, consistent with the scene composition; no further polish requested.
- Map → player → stage swipe → World retains updated stop 2 and restores exactly 450 px. Final List lesson → player → World retains `be-source-0500`, List view and exactly 307526 px after a two-second wait.
- No JavaScript page exception captured in the affected recheck. General scope limitations above remain: no full lesson-content, accessibility or browser-family certification.

Fresh screenshots are separate under `artifacts/world-inspection/final/`; old images are untouched. QA opened and visually inspected `phone-world.png`, `desktop-world.png`, `phone-player.png`, `desktop-player.png`, `phone-after-stage-swipe.png`, and `phone-late-label.png`. Use the final phone/desktop world and player images for the founder bundle. Machine results and exact touch sequence are `final/recheck.json` and `final/recheck.mjs`. The first harness invocation stopped on an ambiguous Feed locator before checking anything; it was corrected to the exact visible link label, then the complete bounded recheck ran once successfully. All QA-owned browser contexts closed at completion.

# A11y ruling W-1111: aria-disabled on a pressed mode button, and aria-pressed on CordStage "Test" buttons

owner: accessibility-reviewer (Arjun)
date: 2026-10-15
status: decided. One code change is routed to demo-builder (spec below); one spec line is routed to cm-lifehacks.
class: quality-gate (accessibility ruling on a shared template, no launch block)
route: accessibility-reviewer → demo-builder (code change, board) → cm-lifehacks (amend R1 in `company/design/specs/lifehacks-engines-v2.md`) → qa-tester (re-check on the slate)
recorded by: accessibility-reviewer
board: W-1111 (mine), W-598 (the half that is still open)
inputs read: spec R1 and the "Special stages" paragraph (`company/design/specs/lifehacks-engines-v2.md` §1, lines 46-49 and 79), `src/components/lifehacks/a11y.tsx` (`StageControl`, `ModeControl`), `a11y.module.css`, `HomeLesson.tsx` (`HomeMode`, `CordStage`, line 326), `tools/a11y-scan.mjs` (lines 130 and 195). Code read only; no build, no server, no screen reader run. The ruling rests on the WAI-ARIA 1.2 and APG definitions, not on a listening test.

## Context

Today the mode button in effect has `aria-pressed="true"` and `aria-disabled="true"` (StageControl `inactive={pressed}`), drawn at full opacity with a check mark. The sight cue says "selected". Screen readers announce "toggle button, pressed, dimmed/unavailable" (wording differs by reader). The two states contradict each other. R1 chose `aria-disabled` for one reason: W-557, keep keyboard focus on the button when it stops doing anything, so focus never falls to `<body>`. R1 also needed the button to be a no-op when pressed (batch-200 rule 3).

`CordStage` "Test 0.3m / Test 3m" already render through `HomeMode` (line 326), so they carry `aria-pressed` (true once run, `runs>=1` / `runs>=2`) plus `aria-disabled`, the check mark and `.active`. The spec says they "only need the check mark" and does not mention aria-pressed. PE-ops objected to the extra attribute.

## Ruling

### 1. A pressed mode button must NOT carry aria-disabled. Ruled: remove it, keep `aria-pressed`, keep focus, keep the no-op.

Reasoning.
- **Toggle button (APG, WAI-ARIA 1.2 `aria-pressed`).** `aria-pressed` states that a button is a two-state control and what state it is in. A toggle is pressable in both states: pressing it flips the state. `aria-disabled="true"` says "this control exists but cannot be operated". Both together say "a toggle that cannot be toggled, and is unavailable". That is the "pressed, dimmed" the learner hears. It is a wrong description even though the sight styling is right.
- **Radio-group semantics (APG radio group).** The mode pair is a one-of-two choice. In a radio group the selected radio is not disabled. It is checked, focusable, and activating it again changes nothing. `aria-disabled` would never be put on the checked radio. The mode pair behaves like that group, so "selected, still reachable, re-activating is harmless" is the model. The group is the group of two buttons only if they are named as one: see "Group name" below.
- **The reason for aria-disabled (W-557) does not need it.** A button that is not natively `disabled` keeps focus. The no-op can live in the click handler. `aria-disabled` was doing a second job, advertising the no-op, and that advertisement is the thing that is wrong. A re-press of the selected mode that does nothing is the same behaviour as a re-activated radio. Silent no-op is acceptable; announcing "dimmed" is not.
- **Contrast side effect (good).** `tools/a11y-scan.mjs` line 195 exempts `[aria-disabled=true]` from the contrast check (WCAG 1.4.3 exempts inactive components). The selected mode button is not inactive, and its label is the most important text on the stage. Dropping the attribute puts it back under the contrast scan. That is the correct result, and the builder should expect the scan to start measuring it (tint on `--bg-2`, light and dark).
- **Pattern kept: aria-pressed, not a radiogroup rewrite.** A true radio group needs `role=radiogroup`, `role=radio`, `aria-checked` and arrow-key roving, plus the neutral start (R2: nothing checked) which is legal but a bigger change, across every v2 lesson. Two named toggle buttons in a labelled `role="group"` is an accepted pattern and meets WCAG 4.1.2 (name, role, value). Not worth the churn before launch. Revisit if a listening test shows learners confused.

Consequences the builder must handle (not optional):
- `.inactive.mode.active[aria-disabled="true"] { opacity: 1 }` becomes dead for the mode in effect. The `.mode.active` rule (tint, 2 px border) already carries the look. Keep `cursor: default` for the pressed state so the pointer does not suggest an action.
- `useKeepFocus` (a11y.tsx line 88) and any QA code that decides "enabled" by `aria-disabled !== "true"` will now count the pressed mode button as enabled. Check `tests/qa` and the QA contract for a rule "every enabled control must change state" (batch-200 rule 3). If one exists, it must exempt `[aria-pressed="true"]`. This is a QA-protected path (`tests/qa/` is protected). Do not edit it. If it blocks, file an amendment request; do not work around it.
- Do not set `disabled` natively after the prediction. That is the W-557 failure.

### 2. CordStage "Test" buttons: do NOT put aria-pressed on them. Ruled: PE-ops is right on the attribute, wrong that the check mark is enough.

Reasoning.
- `aria-pressed` means a two-state toggle. "Test 0.3m" and "Test 3m" are one-shot actions (spec: "already 'seen' buttons", i.e. R1's *action button* kind, "done" = ran). Pressing one never un-presses it, and pressing "Test 3m" does not release "Test 0.3m" (`runs>=1` stays true). "Pressed" would be misleading: it reads as "currently selected", but the learner's state is "already run". The APG says to use `aria-pressed` for a control that toggles, and not for a button whose job is to do something once.
- The check mark is `aria-hidden`, so for a screen-reader learner it is **not** a cue at all. Spec §1 says the check is "the non-colour cue" for sight users. For the non-sighted learner the only remaining cue is whatever the accessible name says. Today that cue is `aria-pressed` + `aria-disabled`. If both go, "Test 0.3m" announces identically before and after being run. That is a regression against the rule "meaning never carried by colour alone", extended to "never carried by sight alone".
- So: remove `aria-pressed` and `aria-disabled`, **put the state in the name**. When run, the accessible name is `Test 0.3m, done`. Implement with a visually-hidden suffix (`<span className="sr-only"> (done)</span>`) or `aria-label`; the visible text stays "Test 0.3m". The same status region (`StageStatus`) already announces the result chips on change, which carries the outcome.
- Should a run button still ignore a second press? Yes, the click handler can no-op (or just re-run: it is idempotent, `setRuns` to the same value). Either is fine. No `aria-disabled`, for the same reason as ruling 1: nothing here is unavailable, so do not say so. Re-pressing "Test 0.3m" after "Test 3m" must not lower `runs` (that is the current behaviour and must stay).
- This also means the cord buttons are **not** `HomeMode`. They need a small `HomeAction` (or `HomeMode` with a `kind="action"` prop), or the builder can inline it. This settles PE-ops' objection (see Objections).

### Group name (small, adjacent, same change)

Wrap each pair of mode buttons in `role="group"` with an `aria-label` that says what is being switched (for example "Layout" for Home, "Case" for Study). Without a group name, "A · tall box, pressed" has no context. Check the existing `s.controls` div; if it already has a role/label, keep it. This is a one-line addition and applies to Home and Study mode rows only, not to cord.

## Change spec for demo-builder (exact, minimal)

Files: `src/components/lifehacks/a11y.tsx`, `a11y.module.css`, `src/components/lifehacks/HomeLesson.tsx`. No lesson `Demo.tsx` or `meta.json` changes. No new dependency. No change to protected paths.

1. `a11y.tsx`, `StageControl`: add a prop `pressedNoop?: boolean` (or split `ModeControl`/`HomeMode` away from `StageControl`). Behaviour: when set, the button is NOT given `aria-disabled`, still returns early from `onClick`, and still gets the `.inactive` class only for the cursor rule. Simplest:

   ```tsx
   export function StageControl({ locked, inactive = false, noop = false, onClick, className = "", children, ...rest }) {
     const off = !locked && inactive;
     return <Control {...rest} disabled={locked}
       aria-disabled={off && !noop ? true : undefined}
       className={`${className} ${a.inactive}`.trim()}
       onClick={(event) => { if (locked || inactive) return; onClick?.(event); }}>{children}</Control>;
   }
   ```

   `ModeControl` and `HomeMode` pass `noop` (so `inactive={pressed}` makes the click inert, `aria-pressed` stays, `aria-disabled` is absent). Update the doc comments on `ModeControl` and `HomeMode` ("aria-disabled" wording) so the code no longer claims R1's old text.
2. `a11y.module.css`: the `.inactive[aria-disabled="true"] { opacity: .5 }` rule stays for action buttons. Add `.mode:global(.active) { cursor: default; }`. The rule `.inactive.mode:global(.active)[aria-disabled="true"] { opacity: 1 }` can stay as harmless; delete it if no mode button can still match it.
3. `HomeLesson.tsx` `CordStage` (line 326): replace the two `HomeMode` with a `HomeAction` that renders `<StageControl locked inactive={done}>` (aria-disabled is NOT wanted either, so use `noop`) with **no `aria-pressed`**, the same `.active` class and `✓` span (aria-hidden), and `{done && <span className="sr-only"> done</span>}` after the label. Use the project's existing visually-hidden class if there is one (`a11y.module.css` `.status` is a hidden-region pattern; add `.srOnly` with the same clip rules if no shared class exists). `runs` must never decrease on re-press.
4. Wrap the mode rows (`s.controls` in `Stage`, `ModeControl` users in `StudyLesson`/`StudyLessonV2` if they use it) in `role="group" aria-label="..."`.
5. Tests (ratchet): add to the existing lifehacks test file asserts that (a) a pressed mode button has `aria-pressed="true"` and no `aria-disabled`, (b) the unpressed mode button has `aria-pressed="false"`, (c) `Test 0.3m` after run has no `aria-pressed`, no `aria-disabled`, and its text content includes "done".
6. Done when: `npm run test:lifehacks` passes, `node tools/a11y-scan.mjs` on one Home v1 lesson, one v2 lesson, and the cord lesson shows the selected button's contrast measured (not exempt) and passing in light and dark, and qa-tester re-runs the 6 slate lessons. Do not run `npm run deploy`.

## Spec amendment routed to cm-lifehacks

`company/design/specs/lifehacks-engines-v2.md` R1 line 47: "`aria-pressed="true"`, `aria-disabled="true"` (StageControl `inactive`, so focus is kept per W-557)" should read "`aria-pressed="true"` and no `aria-disabled`; the handler ignores the press, so focus is kept (W-557)". Line 79: "CordStage ... only need the check mark" should read "need the check mark and `done` in the accessible name; they are action buttons, no `aria-pressed`". This file is a design spec, not a protected path as far as I can see (not in the protected list I checked); the spec owner makes the edit, not me.

## Does this block the launch?

No. Nothing here locks a learner out: every control is reachable and operable by keyboard, and the visible selected state is right. This is a wrong announcement ("pressed, dimmed"), which is a defect, not a lock-out, so I am not using my block authority. W-598's sight half is fixed by 9302c25. I recommend the change ships before the slate, because the slate is the five toggle lessons and the contradiction is heard on every one of them. If the deploy cannot wait, ship as is and record the open item; the cost is a confusing announcement, not a barrier.

## What I did not verify

- No screen reader was run, so "pressed, dimmed" is the expected reading from the ARIA mapping, not a recording. NVDA/JAWS say "unavailable"; VoiceOver says "dimmed". Confidence the combination is announced contradictorily: high (about 90%).
- I did not read `tests/qa` for a rule that depends on `aria-disabled`. The builder must, before changing.
- I did not check the contrast of the tint (`color-mix(... 25% ...)`) in both themes. Once the exemption is gone the scan will, and its numbers go in the next a11y record.

## Objections

| Objection | Raised by | Kind (evidence/purpose) | Status (accepted / rejected because… / open, funded by… / superseded) |
|---|---|---|---|
| The spec asks only for a check mark on CordStage "Test" buttons. Adding `aria-pressed` goes beyond the spec. | PE-ops (via the W-1111 brief) | purpose | Accepted on the attribute: `aria-pressed` comes off the cord buttons (they are one-shot actions, not toggles). Rejected on "check mark only": the check is `aria-hidden`, so a screen-reader learner would get no done-cue at all. The cue moves into the accessible name ("done"). Spec line 79 is amended to match. |
| R1 chose `aria-disabled` deliberately so the pressed mode button keeps focus (W-557) and is a clear no-op. | Spec R1 / W-608 / W-557 | evidence | Accepted as to the goals, rejected as to the means. Focus is kept because the button is not natively `disabled`, and the no-op is in the handler. `aria-disabled` is not needed for either. Routed as spec amendment above. |
| Two toggle buttons are weaker than a real radio group. | Self (APG radio group) | purpose | Open, not funded: a radiogroup rewrite is bigger than the launch can carry. Reopen if a listening test shows confusion. Revisit-if below. |
| Removing `aria-disabled` makes `useKeepFocus` and any QA "enabled control" rule count the pressed button as enabled. | Self | evidence | Open, owner demo-builder: read `tests/qa` and `useKeepFocus` first (change spec, consequences). If a protected QA file needs an amendment, file the request. Not worked around here. |

## Revisit if

- A listening test (NVDA or VoiceOver) shows the pressed/unpressed pair is still misheard without a group name.
- Mode rows grow beyond two options, or A/B-style modes become arrow-key navigable.
- A QA rule is found that cannot be met without `aria-disabled` on the pressed mode.

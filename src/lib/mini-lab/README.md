# Local numerical traces for the 2026-10-24 draft batch

Owner: platform-engineer. Teaching models and factual claims belong to the lesson builder and category manager.

`types.ts` is the stable payload contract. A lesson imports only its own computed `spec`, then composes the existing kit with `useMiniLab`, `MiniLabStage` and `MiniLabReveal`. The lesson-owned `Demo.tsx` contains the actual `<Lesson>` and `<Control>` elements required by the unchanged static source gate. The domain convenience entry points remain available, but cannot replace this contract-bearing wrapper. No existing lesson engine or kit file changes.

```tsx
"use client";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { useMiniLab, MiniLabStage, MiniLabReveal } from "@/components/mini-lab/TraceLesson";
import { spec } from "./spec";

export default function Demo({ slug }: { slug: string }) {
  const lab = useMiniLab(spec);
  return <Lesson slug={slug} predict={lab.spec.predict} minInteractions={2}
    exploreHint={lab.spec.hint} reveal={() => <MiniLabReveal lab={lab} />}>
    {({ locked, interact }) => <MiniLabStage lab={lab} locked={locked}>
      <Control disabled={locked || !lab.enabled.run} onClick={() => lab.apply("run", interact)}>Run case</Control>
      <Control disabled={locked || !lab.enabled.compare} onClick={() => lab.apply("compare", interact)}>Compare</Control>
      <Control disabled={locked || !lab.enabled.step} onClick={() => lab.apply("step", interact)}>Step</Control>
      <Control disabled={locked || !lab.enabled.reset} onClick={() => lab.apply("reset", interact)}>Reset</Control>
    </MiniLabStage>}
  </Lesson>;
}
```

`MiniLabStage` supplies only the picture, saved evidence and styled control row around its children. The hook returns `{spec, state, enabled, displayed, apply}`; action semantics and milestone accounting are unchanged. `MiniLabReveal` supplies the spec's explanation paragraphs. This is composition through the real kit, not a source-gate waiver.

A `MiniLabSpec` has a prediction, a neutral `setup`, an exploration `hint`, exactly two `scenarios`, and 1–3 `reveal` paragraphs. Each scenario has an id, label, at least two frames and a computed `summary`. Each frame has a caption, a discriminated visual and optional metrics. Visuals are bars, curve, scatter, grid, graph, table, timeline or intervals. Graph coordinates use a 320×170 viewBox and lie within x=20–300, y=20–150. Values must be finite and bounded by 10^15; loops and data generation remain bounded in the local model.

The renderer validates the payload, but it cannot verify the lesson's mathematics or source attribution. Each builder supplies and tests the actual numerical calculation, answer, revealing sentence, transfer recall and claims. No empirical behavior can be inferred from the renderer or a toy calculation. Input probability/count domain checks are the local model's responsibility.

## State and evidence

`Run case` finishes scenario A (the question's case). `Compare` is disabled until A is witnessed, then finishes scenario B. Completing each case awards one interaction, exactly once; the kit requires both. `Step` visits individual frames. `Reset` clears active exploration while preserving both witnessed summaries and the saved final A picture, labelled `Saved case A`. It never erases evidence while leaving an answer-bearing reveal available. Disabled/no-op actions preserve object identity. The first two controls implement the unchanged protected QA contract's one-press path.

Every action is checked against `presentationSignature`, which contains only rendered geometry, formatted readouts and retained result summaries. Hidden frame/scenario indices, captions, raw unrendered precision and the Saved prefix cannot establish a meaningful action. Consequently Reset is disabled from active A-final when it would only relabel the same picture; Run is disabled from saved A-final. Step can rewind saved A into a genuinely different frame, skipping an identical first frame. Adjacent duplicate rendered frames are rejected even when a later frame changes. Signatures compare the renderer's formatted values and geometry to hundredth-pixel precision; tiny raw changes cannot manufacture a contrast.

The reveal must quote the retained summaries or structure visible in the saved A picture. A result present only in B's plot must also be in B's summary if the reveal quotes it. The validator rejects caption-only adjacent transitions and two scenarios with identical final visible payloads.

## Text and layout

Use captions of at most six words, summaries of at most six words (mostly numbers and units), at most two compact metrics, and concise graph labels. Count the actual rendered stage, including controls and both summaries, against the 25-word budget. The validator's character limits are data safety bounds, not permission to exceed that budget. Reveal text must exceed 120 characters and stay at or below 90 words. Check the actual phone artifact; a payload type cannot prove phone fit or adequate pedagogy.

The stage has no new network, storage, dependencies or event fields. It imports the existing kit and supports keyboard buttons, theme variables, text-safe labels, numerical accessible chart names and ordinary table semantics.

## Focused verification

`npm run test:mini-lab` (also runs early in `npm run verify`, before publication tests).

The tests cover all visual payload families, malformed inputs, answer bounds, true visible contrast, the one-press path, manual milestones, enabled/no-op transitions, Reset witnesses and retained final geometry. The transition test compares presentation signatures, not serialized internal state. An additional artifact check, `node tools/mini-lab-control-check.mjs --url <built-server> --slugs <comma-separated-slugs>`, presses every enabled control and independently re-establishes the saved-A state before testing each post-Reset branch on phone and desktop. It compares rendered picture text/SVG geometry, metrics and saved summaries, excluding captions and state indices. Whole-tree typecheck and every actual lesson's protected browser QA remain required at integration. This shared surface is tier 2; its implementer cannot approve readiness or ship it.

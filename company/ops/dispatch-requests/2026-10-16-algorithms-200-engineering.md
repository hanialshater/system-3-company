# Algorithms 200: engineering route and builder contract

owner: principal-engineer
poc: principal-engineer
lane: engineering
date: 2026-10-16
status: ready for dispatch
source: company/decisions/2026-10-16-algorithms-200.md
content owner: cm-cs / cm-cs-algorithms

## Ruling

New lessons and curriculum/manifest/brief files are tier 0. The opt-in helper in
`src/lib/algorithms/**` and `src/components/algorithms/**`, validation scripts and
an edit of the existing `src/app/catalog/page.tsx` are tier 1 under the current
ordered `company/engineering/readiness/paths.json` (unmatched paths default to 1).
This is not the Life Hacks engine: its explicit tier-2 path rule does not cover
new algorithms helpers. The helper changes no existing lesson or contract.

No kit, registry shape, meta schema, domain registration, new route, dependency,
network, storage, event or deployment change is needed. Do not add `/algorithms`:
new production pages are explicitly tier 2. Founder topic browsing will use the
existing `/catalog#algorithms`. Keep the ordinary generated registry workflow.
A future promotion to the kit, shared loading change or gate change is a separate
engineering decision, not authorized by this batch.

Tier-1 closeout: integrated `npm run verify`, one engineer reads the diff, a
changelog line and self-check readiness record. This record is the classification
and pre-code design, not a claim that unbuilt code has passed. Rollback: revert
only the new algorithms helper, its 200 dependent lessons and the catalog diff;
leave all existing lessons and visibility logic untouched. No deploy requested.

## B1 · Shared renderer, types and bounded validation
role: demo-builder
kind: build
worktree: yes
model: agent default
project: [project:catalog]
budget: 1 run

order: first; content builders may implement pure models against the contract now
allowed paths: src/lib/algorithms/types.ts; src/components/algorithms/**;
  tools/algorithms-200-check.mjs; tests/algorithms/**;
  company/engineering/readiness/2026-10-16-algorithms-200.md
inputs: this record; company/product/demo-standard.md;
  company/domains/briefs/algorithms-200.json; src/kit/controls.tsx;
  src/kit/milestones.tsx; src/app/catalog/page.tsx
outputs: helper + one runnable representative model integration; a check tool;
  readiness self-check; no changes to another builder's topic module

### Frozen interface (content builders implement this exact public shape)

```ts
// src/lib/algorithms/types.ts
export type AlgorithmTone = 'plain' | 'active' | 'good' | 'bad' | 'muted';
export type AlgorithmCell = { text: string; tone?: AlgorithmTone };
export type AlgorithmRow = { label: string; cells: AlgorithmCell[] };
export type AlgorithmNode = { id: string; label: string; x: number; y: number;
  tone?: AlgorithmTone };
export type AlgorithmEdge = { from: string; to: string; label?: string;
  directed?: boolean; tone?: AlgorithmTone };
export type AlgorithmFrame = {
  caption: string;
  // Choose one dominant representation. Rows serve arrays, strings and DP grids;
  // nodes + edges serve trees, graphs, geometry and state machines.
  rows?: AlgorithmRow[];
  nodes?: AlgorithmNode[];
  edges?: AlgorithmEdge[];
  metrics?: { label: string; value: string }[];
};
export type AlgorithmRun = {
  frames: AlgorithmFrame[];
  // Tiny persistent proof of the completed question case. Reveal quotes only
  // this visible computed text, including after Reset or another-case presses.
  proof: string;
  result: number | string | boolean;
};
export type AlgorithmSpec = {
  slug: string;
  topic: string;
  predict: { question: string; options: string[]; answer: number };
  exploreHint: string;
  cases: { label: string; run: () => AlgorithmRun }[];
  // Run for cases[0] is the question case; it must be witnessed first.
  reveal: (witness: AlgorithmRun) => string[];
};
```

Each content module exports named `AlgorithmSpec` objects (one per lesson), and
its own actual pure algorithms. `run()` computes the sequence of states from the
case's input on invocation. The implementation may call topic-local helpers.
The first case is the prediction's exact case; include a second input/case that
changes an algorithmic result or a relevant invariant. A static array of manually
written outcome frames is not an algorithm implementation. Do not create a
universal `answer` field and march a marker through unrelated labels.

Content ownership stays in `src/lib/algorithms/topics/<topic-id>.ts`; one assigned
builder owns a topic module. Every lesson wrapper imports only its own named
spec, never a giant catalog of all 200 models. Follow the direct-kit wrapper
pattern in `src/demos/lifehacks/lh-big-pack-price/Demo.tsx`: direct `Lesson` and
real `Control` elements in each wrapper, shared hook and drawing. This satisfies
the existing source checks with actual controls rather than comments or aliases.
B1 exports this exact wrapper API from
`src/components/algorithms/AlgorithmLesson.tsx` (renderer owner confirmed):

```tsx
'use client';
import { Lesson } from '@/kit/Lesson';
import { Control } from '@/kit/controls';
import { AlgorithmStage, AlgorithmReveal, algorithmControlClass, useAlgorithmState }
  from '@/components/algorithms/AlgorithmLesson';
import { mySpec as spec } from '@/lib/algorithms/topics/my-topic';
export default function Demo({ slug }: { slug: string }) {
  const state = useAlgorithmState(spec);
  return <Lesson slug={slug} predict={spec.predict} exploreHint={spec.exploreHint}
    minInteractions={1}
    reveal={() => <AlgorithmReveal spec={spec} witness={state.witness} />}>
    {({ locked, interact }) => <AlgorithmStage state={state}>
      <div className={algorithmControlClass}>
        <Control disabled={locked || !state.canRun}
          onClick={() => state.run(interact)}>Run example</Control>
        <Control disabled={locked || !state.canStep}
          onClick={() => state.step(interact)}>Step</Control>
        <Control disabled={locked || !state.canTryAnother}
          onClick={state.tryAnother}>Try another</Control>
        <Control disabled={locked || !state.canReset}
          onClick={state.reset}>Reset</Control>
      </div>
    </AlgorithmStage>}
  </Lesson>;
}
```

The state has `witness`, `canRun`, `canStep`, `canTryAnother`, `canReset`, and the
four action methods shown above. `run(interact)` and `step(interact)` call the
existing kit callback only when case 0 is first fully witnessed; arbitrary
exploration clicks do not earn the reveal. `AlgorithmStage` renders the active
frame, retained Seen proof and the supplied controls as one bounded stage.
`AlgorithmReveal` renders `spec.reveal(witness)` paragraphs from the captured
run. It never invents a witness when the exact question case has not completed.

The wrapper renders the existing `Lesson` and records one interaction only when
the exact question case reaches its completed computed witness. The shared hook
must not infer claims or change a lesson's metadata. `meta.json` remains the
normal brief, claim ledger, recall and evidence record; builders mark claims
unverified and leave confidence/evidence empty until independent review.

### Interaction and visual requirements

- Predict first: every control locked, no solved state or answer marker visible.
  Initial frame is the problem input, never the computed result.
- Provide `Run example` first in DOM order: complete case 0 synchronously and
  capture its computed run as the immutable witness. `Step` supports inspecting
  the actual intermediate states. No animation is required to reach evidence.
- `Try another` runs the second model case and changes visible state/result;
  `Reset` resets current exploration but retains a plainly labelled `Seen` proof
  for the completed question case. Disable controls that would be no-ops.
- Reveal is gated on witnessing case 0, not clicking any arbitrary control.
  `reveal(witness)` uses the retained witness. After any legal control sequence,
  every state/number it quotes remains present in the compact Seen proof.
- A second case is exploration, not evidence for a universal law. Caption and
  reveal distinguish the bounded example from a general theorem.
- Rows can draw character cells, arrays, DP boards or comparison lanes. Nodes
  and edges have stable IDs and coordinates in a 300 by 180 SVG viewBox. They
  must display the causal state: chosen edge, rejected edge, frontier, predecessor,
  recurrence update, failure counterexample, or another algorithm-specific event.
  Share visual mechanics; never replace the distinctive mechanism with prose.
- Keep one dominant representation, at most 25 stage words including controls
  and the busiest proof/caption, reveal at most 90 words, accessible status output,
  current design tokens and light/dark support. Numeric-only cells count zero
  words under the current standard. Do not make text smaller to fit.
- Bound outputs: at most 64 trace frames, at most 24 graph nodes, and a phone-sized
  visible grid. Model loops must have explicit finite bounds. No network/storage,
  eval or timers. Do not silently truncate information a reveal depends on.

### B1 done / validation

The check tool imports each pure topic module using the existing TypeScript test
loader (tests/lifehacks/register.mjs), not a new dependency. For all 200 specs it
checks unique slug, valid options/answer index, at least two cases, deterministic
finite traces with at least two frames, a different meaningful result/state for case 2, all node
IDs/edge endpoints valid, finite coordinates, declared bounds, and manifest to
spec to meta one-to-one correspondence. It reports, rather than silently fixes,
missing factual claim coverage and possible duplicate objectives.

Test real semantics: for each model family, small independent oracle/certificate
checks at least one counterexample or invariant (e.g. enumerate small subsets,
compare a path to exhaustive search, reconstruct a DP solution, validate a sorted
permutation). Re-running the same implementation is only a determinism check.
The renderer needs meaningful checks for predict lock, DOM-order witness path,
step progression, case change, no-op disabling, and Reset retaining reveal truth.
Existing browser QA still applies to every lesson; do not weaken its contract.
Checks of manifest completeness or model arithmetic are not independent learner
review, fact checking, phone-fit evidence or publishing approval.

## B2 · Topic browsing on the existing map
role: demo-builder
kind: build
worktree: yes
model: agent default
project: [project:catalog]
budget: 1 run

order: after the manifest is available; independent of model code
allowed paths: src/app/catalog/page.tsx; existing catalog styling;
  content/algorithms-200.json (optional public projection of the CM manifest)
inputs: content/curriculum/cs.json; company/domains/briefs/algorithms-200.json;
  src/app/catalog/page.tsx; src/lib/catalog.ts (read only)

Add an Algorithms section with id `algorithms` inside the existing CS section of
`/catalog`. Display 20 topic headings, counts and linked visible lessons in
curriculum order. Keep other CS concepts and every other domain intact; do not
duplicate the same lesson in the grouped and legacy lists. A compact topic index
links to the heading anchors. The existing feed can remain unchanged.

Use `visibleDemos()` as the single visibility source, including its review/dev
behavior. Topics are data projection only: `{ id, name, concepts, slugs }` from
the separate manifest; metadata retains domain `cs` and the existing algorithms
strand. Do not add new DomainId, meta schema or domain subareas just for this.
HQ already groups by curriculum `subarea` (e.g. existing `algorithms`); it has no
nested-topic support. The public catalog currently groups only by domain, so
JSON topic labels alone do not fulfill the learner browsing requirement.

Done: the 20 headings and their visible lesson counts reconcile with the
manifest filtered through `visibleDemos()`; no draft is exposed by a new link;
review lessons keep the existing label; empty topics show a quiet not-yet-visible
state. Check phone width and keyboard links. Existing `/catalog` change is tier 1;
no production `/algorithms` route is part of this batch.

## Content and review handoff

CM owns the 20 by 10 allocation, nearest-existing-lesson distinctions, learning
objectives and misconceptions. Content builder lanes own disjoint topic modules
and lesson folders, and use the contract above without changing it independently.
Unresolved overlap stops that lesson, not all 200. Builder notes record computed
proof, two inputs, bounds and pre-flight answers. Evaluation roles receive the
artifact first and retain the normal independent gates. No lesson is called
published or verified merely because this implementation batch is complete.

## Dispatched

- B1 → demo-builder (`algorithms-200-renderer`), committed 77c948c3 and integrated as 5ac6dd51. Seven focused tests and TypeScript passed; integrated browser checks remain separate.
- B2 waiting for a builder slot and the final topic projection.

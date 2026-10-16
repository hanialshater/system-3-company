# AMD-001: Earn the reveal in the kit, three rituals in the cadence table, and a second check for checker-added claims

status: applied in part ((c2)+R1, 0d76ae1); (a), (b), (c1), (d) proposed
date: 2026-10-12
proposed_by: chief-of-staff
prepared_by: evaluation-steward
surface: `src/kit/Lesson.tsx`, `tests/qa/contract.spec.ts`, `tools/company.mjs` (`RITUALS`, `launchGates`, `cmdCheck`, the registry generator)

This bundles four parts. **Ratify each one on its own.** They touch separate hunks, so any subset
applies cleanly. Every part ratified at the meeting goes in one commit (Article 3.5):
`S3_AMENDMENT=AMD-001`, message trailer `Amendment: AMD-001`. None of the diffs below has been
applied. Each was applied to a scratch copy of the repo and exercised there: Lesson.tsx and
contract.spec.ts type-check under `--strict`. With the company.mjs parts, `check` passes on the
current tree (18 lessons, 152 claims). The new rules fire on planted violations, and the
regenerated registry is byte-identical to the current file.

| Part | Change | Protected path | Recommended affected-role seat |
|---|---|---|---|
| (a) | `ready` prop on `<Lesson>`, `data-ready`, and a contract test of the gate | `src/kit/Lesson.tsx`, `tests/qa/**` | qa-tester (written input from learning-designer) |
| (b) | `retro`, `eng-review` and `offboarding` in `RITUALS`. Decision: no separate second-fact-check ritual or gate | `tools/company.mjs` | none needed (no judging effect) |
| (c1) | Gate: a claim a checker added must be verified by a different check | `tools/company.mjs` | fact-checker |
| (c2) | Move the registry generator to `tools/registry.mjs`. `check` keeps judging it | `tools/company.mjs` | platform-engineer (or principal-engineer) |

---

## (a) Kit support for earn-the-reveal

### Claimed benefit
Today the kit enables "Show me why" after `minInteractions` actions of any kind. The learner
reviews found the reveal reachable without the key state in at least 16 of 18 lessons (a keyword
search of `company/reviews/*/*learner*.md`). The wave 0 retro counts 18/18, and five of those
findings were marked FATAL or FATAL-candidate (base-rates, half-life, odd-numbers-make-squares,
pendulum-period, binary-search). Examples: base-rates can end on "99 of 108" and then reveal 9%.
compound-interest unlocks at year 11, so the learner never sees year 40. pendulum-period unlocks
without the pendulum ever being released. The demo-standard rule and the pattern ask builders to
gate by calling `interact()` with discipline. That is a convention, and no test can see it. With
this part, a lesson declares its key state as data (`ready`), the kit enforces it, and QA checks it.

### The change
- `ready?: boolean` on `LessonProps`. If it is omitted, behaviour is byte-for-byte what it is today
  (no `data-ready` attribute, the same `canReveal`), so all 18 current lessons are unaffected.
  If it is passed, the reveal also waits until `ready` has been true once during explore. The
  state **latches**, so a learner who reached the key state and moved on keeps the button.
- The lesson root renders `data-ready="true|false"` only for lessons that declare it.
- I chose a boolean over a `keyState` callback. Lesson state lives in the Demo component that
  renders `<Lesson>` (for example base-rates' `rate` and `tested`), so the Demo can compute
  `ready={rate === 2 && tested && filled === 1000}`. A callback would need the kit to know the
  lesson's state. It does not.
- Contract test, for lessons that declare it only:
  1. `data-ready="false"` before the prediction and when explore starts. The key state may not be
     the starting state.
  2. After every action in the control sweep, the reveal is disabled while `data-ready` is not
     `"true"`.
  3. If the sweep does not reach the key state, `seekKeyState` explores harder within a fixed
     budget (400 actions). It moves every range control from end to end (Home, then ArrowRight
     to max) and presses every button up to 6 times. It keeps checking rule 2 throughout.
  4. QA must reach `data-ready="true"`. A key state an automated explorer cannot reach within the
     budget is treated as a finding: a phone learner probably will not reach it either.
     gradient-descent's "nine nudges with a thumb" is the warning case.
  5. All the existing checks still run afterwards, including that the reveal is enabled and
     substantial.

```diff
--- a/src/kit/Lesson.tsx
+++ b/src/kit/Lesson.tsx
@@ -36,20 +36,31 @@
   minInteractions?: number;
   /** Optional nudge shown in the explore phase. */
   exploreHint?: string;
+  /**
+   * Earn the reveal (pattern earn-the-reveal). Omit it and nothing changes. Pass it and the reveal
+   * also waits until it has been true once in the explore phase: the lesson's key state was reached.
+   * It latches, so a learner who reached the key state and then moved on keeps the button.
+   */
+  ready?: boolean;
 }
 
-export function Lesson({ slug, predict, reveal, children, minInteractions = 1, exploreHint }: LessonProps) {
+export function Lesson({ slug, predict, reveal, children, minInteractions = 1, exploreHint, ready }: LessonProps) {
   const [phase, setPhase] = useState<Phase>("predict");
   const [choice, setChoice] = useState<number | null>(null);
   const [prediction, setPrediction] = useState<number | null>(null);
   const [interactions, setInteractions] = useState(0);
   const started = useRef(Date.now());
   const interactedOnce = useRef(false);
+  const [reached, setReached] = useState(false);
 
   useEffect(() => {
     track({ type: "view", slug });
   }, [slug]);
 
+  useEffect(() => {
+    if (phase === "explore" && ready === true && !reached) setReached(true);
+  }, [phase, ready, reached]);
+
   const commit = () => {
     if (choice === null) return;
     setPrediction(choice);
@@ -74,10 +85,16 @@
     track({ type: "complete", slug, dwellMs: Date.now() - started.current });
   };
 
-  const canReveal = phase === "explore" && interactions >= minInteractions;
+  const gated = ready !== undefined;
+  const canReveal = phase === "explore" && interactions >= minInteractions && (!gated || reached);
 
   return (
-    <div className="lesson" data-testid="lesson" data-phase={phase}>
+    <div
+      className="lesson"
+      data-testid="lesson"
+      data-phase={phase}
+      data-ready={gated ? String(reached) : undefined}
+    >
       <div className="stage" data-testid="stage" aria-disabled={phase === "predict"}>
         {children({ phase, prediction, locked: phase === "predict", interact, interactions })}
       </div>
```

```diff
--- a/tests/qa/contract.spec.ts
+++ b/tests/qa/contract.spec.ts
@@ -8,6 +8,8 @@
 //   2. Predict-before-reveal: stage controls are locked and no reveal exists before a prediction.
 //   3. Every stage control does something observable ("the beautiful button that does nothing").
 //   4. The reveal unlocks only after interaction, and says something substantial.
+//      Lessons that declare a key state (<Lesson ready={...}>, rendered as data-ready) must keep
+//      the reveal disabled until it is reached, and QA must be able to reach it (AMD-001).
 //   5. Nothing overflows the screen horizontally; controls are big enough to tap.
 // It saves a screenshot per phase to artifacts/qa/ for the evaluators.
 
@@ -27,6 +29,59 @@
   });
 }
 
+/** Reads the earn-the-reveal gate in one round trip: ready state and whether the reveal is enabled. */
+async function gateState(page: Page) {
+  return page.evaluate(() => {
+    const l = document.querySelector('[data-testid="lesson"]');
+    const b = document.querySelector('[data-testid="reveal-button"]') as HTMLButtonElement | null;
+    return { ready: l?.getAttribute("data-ready") ?? null, revealEnabled: !!b && !b.disabled };
+  });
+}
+
+/**
+ * For gated lessons: explore harder until the key state is reached, within a fixed budget of
+ * actions. Sweeps every range control end to end and presses every button up to 6 times,
+ * checking after each action that the reveal stays disabled until data-ready is "true".
+ * Returns the labels of any action after which the reveal was enabled while not ready.
+ */
+async function seekKeyState(page: Page, budget = 400) {
+  const leaks: string[] = [];
+  let spent = 0;
+  const check = async (label: string) => {
+    spent++;
+    const g = await gateState(page);
+    if (g.ready !== "true" && g.revealEnabled) leaks.push(label);
+    return g.ready === "true";
+  };
+  for (let round = 0; round < 3 && spent < budget; round++) {
+    const total = await page.locator('[data-testid="stage"] [data-qa="control"]').count();
+    for (let i = 0; i < total && spent < budget; i++) {
+      const c = page.locator('[data-testid="stage"] [data-qa="control"]').nth(i);
+      if ((await c.count()) === 0 || !(await c.isVisible()) || (await c.isDisabled())) continue;
+      const tag = await c.evaluate((el) => `${el.tagName}:${(el as HTMLInputElement).type ?? ""}`);
+      if (tag === "INPUT:range") {
+        await c.focus();
+        await page.keyboard.press("Home");
+        if (await check(`range #${i} home`)) return leaks;
+        for (let k = 0; k < 120 && spent < budget; k++) {
+          const at = await c.evaluate((el) => (el as HTMLInputElement).value === (el as HTMLInputElement).max);
+          if (at) break;
+          await page.keyboard.press("ArrowRight");
+          if (await check(`range #${i} step ${k + 1}`)) return leaks;
+        }
+      } else {
+        for (let k = 0; k < 6 && spent < budget; k++) {
+          if ((await c.count()) === 0 || (await c.isDisabled())) break;
+          await c.click();
+          await page.waitForTimeout(150);
+          if (await check(`control #${i} click ${k + 1}`)) return leaks;
+        }
+      }
+    }
+  }
+  return leaks;
+}
+
 async function shot(page: Page, slug: string, project: string, phase: string) {
   const dir = path.join("artifacts", "qa", slug);
   fs.mkdirSync(dir, { recursive: true });
@@ -60,12 +115,17 @@
       const options = page.locator('[data-testid="predict-option"]');
       expect(await options.count(), "at least two prediction options").toBeGreaterThanOrEqual(2);
       await expect(page.locator('[data-testid="commit-prediction"]')).toBeDisabled();
+      // Earn the reveal: a lesson opts in by passing `ready` to <Lesson>. Undeclared lessons are unchanged.
+      const gated = (await lessonEl.getAttribute("data-ready")) !== null;
+      if (gated) await expect(lessonEl, "the key state is not reached before the prediction").toHaveAttribute("data-ready", "false");
 
       // Commit a prediction (the last option, so the right answer is not always picked).
       await options.last().click();
       await page.locator('[data-testid="commit-prediction"]').click();
       await expect(lessonEl).toHaveAttribute("data-phase", "explore");
       await expect(page.locator('[data-testid="reveal-button"]'), "reveal waits for interaction").toBeDisabled();
+      if (gated) await expect(lessonEl, "the key state is not the starting state").toHaveAttribute("data-ready", "false");
+      const leaks: string[] = [];
 
       // 3. Every control does something. Re-query each time: the stage re-renders.
       const dead: string[] = [];
@@ -90,8 +150,17 @@
         await page.waitForTimeout(450); // let animations settle
         const after = await stageFingerprint(page);
         if (before === after) dead.push(label || `#${i}`);
+        if (gated) {
+          const g = await gateState(page);
+          if (g.ready !== "true" && g.revealEnabled) leaks.push(label || `#${i}`);
+        }
       }
       expect(dead, `controls that changed nothing observable: ${dead.join(", ")}`).toEqual([]);
+      if (gated && (await lessonEl.getAttribute("data-ready")) !== "true") leaks.push(...(await seekKeyState(page)));
+      if (gated) {
+        expect(leaks, `reveal enabled before the key state, after: ${leaks.join(", ")}`).toEqual([]);
+        await expect(lessonEl, "QA reached the declared key state within its action budget").toHaveAttribute("data-ready", "true");
+      }
       await shot(page, lesson.slug, info.project.name, "2-explore");
 
       // 4. Reveal.
```

### What it removes
- For gated lessons, the guarantee that the reveal opens after the first sweep of controls. Their
  reveal can now be unreachable, and the test fails if QA cannot reach the key state. That is new
  pressure towards key states that are easy to reach. It may push builders to pick shallow key
  states ("slider moved to max") over the real one.
- A small amount of builder freedom: a declared key state is visible to QA, so "I gated it with
  `interact()`" no longer counts as gating.
- Nothing for lessons that do not declare `ready`. Their gate stays as weak as it is today. This
  part does **not** make `ready` mandatory. Making it mandatory is a later step and needs evidence
  from the side-by-side (see would_be_wrong_if).

### Prediction and test
- prediction: In the first wave after ratification, at most 1 in 10 lessons that declare `ready`
  draws a learner-evaluator finding of "reveal reachable without the key state". The baseline is
  16 to 18 of 18 lessons in wave 0. The contract test fails at least one gated lesson for a real
  gate leak or an unreachable key state that a learner-evaluator independently confirms.
- would_be_wrong_if: (1) At least 3 in 10 gated lessons still draw that finding. That would mean
  builders declare the wrong key state, and the kit prop only adds ceremony. Or (2) more than 20%
  of gated lessons fail "QA reached the declared key state" when a learner-evaluator could reach
  it by hand. The explorer would then be too weak, and the test is judging QA's thumbs, not the
  lesson. Or (3) EXP-002 shows the falsifier already written in the earn-the-reveal pattern.
- side_by_side: For one wave, run the pre-amendment `contract.spec.ts` from a worktree at the
  parent commit next to the new spec, on every lesson. Expected agreement: identical results on
  lessons without `ready`. On gated lessons, list every disagreement (old pass / new fail, and the
  reverse) in the QA record, with the walkthrough screenshot showing which state was reached. The
  learner-evaluator reviews each gated lesson **before** reading the QA verdict. Each disagreement
  is classified as a gate leak, an unreachable key state, a wrong key state, or a test defect.
  The agreement rate is not the measure. The classified disagreements are.

### Does it change how the proposer is judged?
No for the proposer (chief-of-staff). It changes how lessons, and so demo-builders and the
learning-designer, are judged: the judgement gets stricter, and only when they opt in. The
evaluation steward wrote the test diff and is on the board. The steward's work is the judge here,
not the judged, but qa-tester should review the test code as the affected-role seat, so that the
author of the test is not its only reviewer.

### Rollback
Revert the commit. Lessons that already pass `ready` would then fail typecheck on an unknown prop.
So the rollback commit either removes those props (an ordinary-surface edit per lesson), or, the
lighter option, keeps `ready?: boolean` in `LessonProps` while ignoring it, and reverts only the
`canReveal` and test hunks.

---

## (b) Rituals in the cadence table

### Claimed benefit
`company/rituals/README.md` lists Retro (after every wave), Engineering Review (per tier-2 change)
and Offboarding (when a role leaves). All three have templates. None is in `RITUALS`, so
`npm run company -- ritual retro` refuses to start one. The wave 0 retro record had to be written
by hand, and `status` cannot show a missed retro.

### The change
```diff
--- a/tools/company.mjs
+++ b/tools/company.mjs
@@ -85,6 +85,9 @@
   "launch-review": { cadenceDays: null, title: "Launch Review (go / no-go)" },
   coe: { cadenceDays: null, title: "Correction of Error" },
   retirement: { cadenceDays: null, title: "Retirement Review" },
+  retro: { cadenceDays: 7, title: "Retro (after every wave; at least weekly)" },
+  "eng-review": { cadenceDays: null, title: "Engineering Review (tier-2 changes)" },
+  offboarding: { cadenceDays: null, title: "Offboarding (ownership transfer)" },
 };
 
 function ritualRecords() {
```
Retro gets `cadenceDays: 7` because waves are planned weekly or faster. Seven days is the slowest
acceptable gap. A wave that ends sooner simply holds its retro early. The other two run on events:
they are triggered by a tier-2 change or a departure, not by the calendar.

### Second fact-check: gate or ritual? Decision: neither, for now
The retro adopted "second fact-check pass every wave" as checklist step 6, which is ordinary
surface. I do **not** propose it as a gate on all claims, or as a cadence ritual:
1. The specific hole it was meant to close is a checker adding a claim and then vouching for it.
   Part (c1) closes that hole precisely, with a rule that the gate can see.
2. No second pass has run yet, so there is no evidence that a blanket second check on claims
   already verified by an independent checker finds anything. Gating it now would be "adding a
   check after every incident" (the steward's own failure mode). It would also roughly double
   checking cost (56k tokens per lesson in wave 0) without a prediction.
3. Re-open condition: if wave 1's second pass marks at least 1 in 20 previously verified claims as
   disputed or withdrawn, I will propose making it a gate in a later amendment, with that number
   as its prediction. If it finds nothing across two waves, the distillation ritual should
   consider dropping checklist step 6.

### What it removes
Nothing is removed. It adds an overdue alarm for retro. If waves stop, retro will show as overdue
when no wave ran. That is noise, and part of what the test below watches for.

### Prediction and test
- prediction: Over the next cycle, every wave has a retro record started with `ritual retro`, and
  every tier-2 change in `company/engineering/` has an `eng-review` record.
- would_be_wrong_if: Retro shows overdue in two or more weeks in which no wave ran. That would
  mean the cadence is wrong: set it to `null` (on event) by a later amendment.
- side_by_side: Not applicable. Nothing is judged differently. Compare the table with
  `company/rituals/README.md` at the next constitutional review.

### Does it change how the proposer is judged?
Marginally, and in the stricter direction. The chief-of-staff owns retro, and a missed retro
becomes visible in `status`. The proposer gains nothing it could exploit.

### Rollback
Revert the three lines. Existing records stay on disk.

### Note for a later amendment (not part of this one)
`RITUALS` is not a gate, yet it lives in a protected file. That is why adding a row needs an
amendment at all. The constitution already says "tooling that is not a gate belongs in other
files under `tools/`". A future amendment could move the cadence table out on the same pattern as
(c2). I have not bundled it, so the board can see first whether (c2)'s pattern holds.

---

## (c1) Gate: a claim a checker added is verified by a different check

### Claimed benefit
Wave 0 fact-checkers found unrecorded learner-facing claims in most lessons and correctly added
them as `unverified`. 43 claims are open now, most of them checker-added. Several records say so
explicitly: binary-search's says "c5 and c6 need a checker other than me". The current gate only
compares `checkedBy` with `meta.owner.builder`. All 109 recorded verifications are signed
`checkedBy: "fact-checker"`. So a later session of the same check could verify claims it added
itself and pass the gate. The role name cannot tell two checks apart. The review record can.

### The change
Claims get three optional fields: `addedBy` (the role), `addedIn` (the review record that added
the claim) and `checkedIn` (the record of the check that verified it). `launchGates`: a verified
claim with `addedIn` must name a `checkedIn` that exists and differs from `addedIn`. `cmdCheck`:
if `addedIn` is present, it must point at a real file and come with `addedBy`. Claims without
`addedIn` (claims the builder recorded) are judged exactly as today, so the change is backwards
compatible.

The task suggested comparing `checkedBy` with `addedBy`. I propose comparing records instead,
because `checkedBy ≠ addedBy` would compare `"fact-checker"` with `"fact-checker"`. That fails
every legitimate second check, and it would pass a builder-turned-checker with a different role
string.

```diff
--- a/tools/company.mjs
+++ b/tools/company.mjs
@@ -156,6 +156,13 @@
   for (const c of meta.claims) {
     if (c.status === "verified" && (!c.checkedBy || !c.checkedOn)) fails.push(`${c.id} verified without checkedBy/checkedOn`);
     if (c.status === "verified" && c.checkedBy === meta.owner.builder) fails.push(`${c.id} verified by its own builder`);
+    // A claim a checker added is verified by a different check (AMD-001). Every fact-checker signs
+    // as "fact-checker", so the role name cannot tell two checks apart: the review record can.
+    if (c.status === "verified" && c.addedIn) {
+      if (!c.checkedIn) fails.push(`${c.id} was added by a checker (${c.addedIn}); its verification must name checkedIn`);
+      else if (c.checkedIn === c.addedIn) fails.push(`${c.id} verified in the same check that added it (${c.addedIn})`);
+      else if (!exists(rel(c.checkedIn))) fails.push(`${c.id} checkedIn points at missing file ${c.checkedIn}`);
+    }
   }
   if (!meta.evidence.qa?.length) fails.push("no computer-use QA record (company/reviews/...)");
   if (!meta.evidence.simulatedLearner?.length) fails.push("no borrowed-mind learner review");
@@ -234,6 +241,8 @@
       if (!["derivation", "simulation", "source", "convention"].includes(c.support)) err(where, `${c.id} bad support ${c.support}`);
       if (!["unverified", "verified", "disputed", "withdrawn"].includes(c.status)) err(where, `${c.id} bad status ${c.status}`);
       if (!c.source?.trim()) err(where, `${c.id} has no source: a claim without a trail is a feather`);
+      if (c.addedIn !== undefined && !(typeof c.addedBy === "string" && c.addedBy && exists(rel(c.addedIn))))
+        err(where, `${c.id} addedIn must point at an existing review record and come with addedBy`);
     }
     const demoPath = path.join(d.dir, "Demo.tsx");
     if (!exists(demoPath)) err(where, "missing Demo.tsx");
```
Accompanying ordinary-surface change (not protected; same commit):
```diff
--- a/src/kit/types.ts
+++ b/src/kit/types.ts
@@ -27,3 +27,8 @@
   checkedBy?: string;
   checkedOn?: string;
+  /** Set when a checker (not the builder) recorded this claim: the role, and the review record it came from. */
+  addedBy?: string;
+  addedIn?: string;
+  /** The review record of the check that verified it. Required when addedIn is set, and must differ from it. */
+  checkedIn?: string;
 }
```
Also on ordinary surface, as board work for the fact-checker: backfill `addedBy`/`addedIn` on the
wave 0 checker-added claims from the "Unrecorded claims" sections of
`company/reviews/*/2026-10-12-fact-check.md`, and update the fact-checker brief to set them.

### What it removes
The ability of one fact-check pass to both add and verify a claim. It also removes some speed:
checker-added claims now need a second dispatch before launch. It does not remove or weaken any
existing rule.

### Known limit
The gate checks for a separate trail, not for real independence. A distinct record path is cheap
to create. The steward's independence audit should sample checker-added claims each wave and
confirm the verifying record came from a separate dispatch, written without the first record in
its brief. The gate also cannot see a checker who adds a claim without filling in `addedIn`. The
audit compares each fact-check record's "Unrecorded claims" section with `meta.json`.

### Prediction and test
- prediction: In wave 1, at least one checker-added claim is disputed, withdrawn or corrected by
  the second check before launch. That is about 1 in 40 of the roughly 43 claims now open.
- would_be_wrong_if: Across two waves, the second check on checker-added claims changes none of
  them, and the extra dispatch costs more than 10% of checking tokens. Then the rule is ceremony,
  and distillation should propose removing it.
- side_by_side: For one wave, compute both rules on every lesson at publish time (`launchGates`
  with and without the new block, run from a scratch copy). List every lesson the new rule blocks
  and what the second check then found on it.

### Does it change how the proposer is judged?
No for the chief-of-staff. It changes how fact-checkers' additions are judged: stricter, and
slower to publish. That is why fact-checker should hold the affected-role seat.

### Rollback
Revert the `launchGates` and `cmdCheck` hunks. The extra fields in `meta.json` are harmless and can
stay.

---

## (c2) Move the registry generator out of the gate file

### Claimed benefit
EDD-001 option 4 (splitting the registry into a slim index and loaders for the feed at 500+
lessons) is blocked on an amendment only because `registrySource` sits in `tools/company.mjs`. The
generator decides nothing about what may publish. Article 2 already says that tooling which is not
a gate belongs elsewhere under `tools/`. What has to stay protected is the **judgement** of the
generator, and this part keeps it in `cmdCheck`.

### Decision: move it, and make `check` judge the generator independently
- `tools/registry.mjs` (new, ordinary surface) exports `registryFiles(demos)`, which returns a
  `{ path: contents }` map. The map means a split into several files (option 4) needs no change
  to protected code.
- `cmdCheck` keeps judging three things:
  1. Freshness: every file the generator produces matches what is on disk, and no orphaned
     `*.generated.ts` is left behind.
  2. Faithfulness, independent of the generator: every lesson on disk is imported from its own
     `meta.json`, and nothing else is imported.
  3. No status literal appears anywhere in the generated code, so a generator cannot promote a
     lesson around `launchGates`.
- I tested this in scratch. With an altered generator that dropped half-life and injected
  `status: "published"`, `check` failed with both errors. With the real generator, `check`
  passed and the output was byte-identical to the current file.

```diff
--- a/tools/company.mjs
+++ b/tools/company.mjs
@@ -21,6 +21,7 @@
 import fs from "node:fs";
 import path from "node:path";
 import { fileURLToPath } from "node:url";
+import { registryFiles } from "./registry.mjs";
 
 const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
 const rel = (...p) => path.join(ROOT, ...p);
@@ -95,31 +96,17 @@
 }
 
 // ---------------------------------------------------------------- registry
-
-function registrySource(demos) {
-  const ok = demos.filter((d) => d.meta && exists(path.join(d.dir, "Demo.tsx")));
-  const lines = [
-    "// GENERATED by `node tools/company.mjs registry`. Do not edit by hand.",
-    "// Source of truth: src/demos/<domain>/<slug>/meta.json",
-    'import type { ComponentType } from "react";',
-    'import type { DemoMeta } from "@/kit/types";',
-  ];
-  ok.forEach((d, i) => lines.push(`import m${i} from "./${d.domainDir}/${d.slugDir}/meta.json";`));
-  lines.push("");
-  lines.push(`export const demos: DemoMeta[] = [${ok.map((_, i) => `m${i} as DemoMeta`).join(", ")}];`);
-  lines.push("");
-  lines.push("export const loaders: Record<string, () => Promise<{ default: ComponentType<{ slug: string }> }>> = {");
-  ok.forEach((d) => lines.push(`  ${JSON.stringify(d.meta.slug)}: () => import("./${d.domainDir}/${d.slugDir}/Demo"),`));
-  lines.push("};");
-  return lines.join("\n") + "\n";
-}
+// The generator is ordinary surface: tools/registry.mjs (AMD-001). What judges it stays here:
+// `check` regenerates in memory and fails on drift, and checks generator-independent invariants.
 
 function cmdRegistry({ quiet } = {}) {
-  const src = registrySource(loadDemos());
-  const out = rel("src/demos/registry.generated.ts");
-  const prev = exists(out) ? fs.readFileSync(out, "utf8") : "";
-  if (prev !== src) fs.writeFileSync(out, src);
-  if (!quiet) console.log(prev === src ? "registry: up to date" : "registry: regenerated");
+  let changed = 0;
+  for (const [file, src] of Object.entries(registryFiles(loadDemos()))) {
+    const out = rel(file);
+    const prev = exists(out) ? fs.readFileSync(out, "utf8") : "";
+    if (prev !== src) (fs.writeFileSync(out, src), changed++);
+  }
+  if (!quiet) console.log(changed ? `registry: regenerated ${changed} file(s)` : "registry: up to date");
 }
 
 // ---------------------------------------------------------------- check
@@ -248,10 +235,18 @@
     if (m.status === "review" && m.claims.some((c) => c.status === "disputed")) warn(where, "in review with a disputed claim");
   }
 
-  // Registry freshness
-  const expected = registrySource(demos);
-  const regPath = rel("src/demos/registry.generated.ts");
-  if (!exists(regPath) || fs.readFileSync(regPath, "utf8") !== expected) err("src/demos/registry.generated.ts", "stale: run `npm run registry`");
+  // Registry: fresh, and faithful to meta.json whatever the generator does
+  const files = registryFiles(demos);
+  for (const [file, src] of Object.entries(files))
+    if (!exists(rel(file)) || fs.readFileSync(rel(file), "utf8") !== src) err(file, "stale: run `npm run registry`");
+  for (const f of ls(rel("src/demos")).filter((f) => f.endsWith(".generated.ts")))
+    if (!(`src/demos/${f}` in files)) err(`src/demos/${f}`, "generated file the generator no longer produces: delete it");
+  const gen = Object.values(files).join("\n");
+  const imported = new Set([...gen.matchAll(/from "\.\/([^/"]+)\/([^/"]+)\/meta\.json"/g)].map((x) => `${x[1]}/${x[2]}`));
+  const onDisk = new Set(demos.filter((d) => d.meta && exists(path.join(d.dir, "Demo.tsx"))).map((d) => `${d.domainDir}/${d.slugDir}`));
+  for (const k of onDisk) if (!imported.has(k)) err("src/demos/*.generated.ts", `lesson ${k} is not imported from its meta.json`);
+  for (const k of imported) if (!onDisk.has(k)) err("src/demos/*.generated.ts", `imports ${k}, which is not a lesson on disk`);
+  if (/\bstatus"?\s*:\s*["'`]/.test(gen)) err("src/demos/*.generated.ts", "generated code sets a status literal; status comes only from meta.json");
 
   // Roles and agents: every agent has an onboarding doc and vice versa
   const agentFiles = ls(rel(".claude/agents")).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3));
```
```diff
--- /dev/null
+++ b/tools/registry.mjs
@@ -0,0 +1,26 @@
+// Registry generator: meta.json files on disk -> src/demos/*.generated.ts.
+// Ordinary surface (AMD-001): change it through normal engineering review (EDD-001).
+// tools/company.mjs `check` regenerates in memory, fails on drift, and checks that every lesson
+// is imported from its own meta.json and that no status is set here.
+
+import fs from "node:fs";
+import path from "node:path";
+
+/** Returns { "<repo-relative path>": "<file contents>" } for every generated file. */
+export function registryFiles(demos) {
+  const ok = demos.filter((d) => d.meta && fs.existsSync(path.join(d.dir, "Demo.tsx")));
+  const lines = [
+    "// GENERATED by `node tools/company.mjs registry`. Do not edit by hand.",
+    "// Source of truth: src/demos/<domain>/<slug>/meta.json",
+    'import type { ComponentType } from "react";',
+    'import type { DemoMeta } from "@/kit/types";',
+  ];
+  ok.forEach((d, i) => lines.push(`import m${i} from "./${d.domainDir}/${d.slugDir}/meta.json";`));
+  lines.push("");
+  lines.push(`export const demos: DemoMeta[] = [${ok.map((_, i) => `m${i} as DemoMeta`).join(", ")}];`);
+  lines.push("");
+  lines.push("export const loaders: Record<string, () => Promise<{ default: ComponentType<{ slug: string }> }>> = {");
+  ok.forEach((d) => lines.push(`  ${JSON.stringify(d.meta.slug)}: () => import("./${d.domainDir}/${d.slugDir}/Demo"),`));
+  lines.push("};");
+  return { "src/demos/registry.generated.ts": lines.join("\n") + "\n" };
+}
```

### What it removes
The amendment requirement on generator changes. Specifically, a generator change can now:
reorder or split the generated files; change what the bundle carries (which is the point of
EDD-001); or alter `loaders`, for example by pointing a slug at the wrong `Demo`. That last one is
**not** caught by the invariants. It is caught by the QA contract and the feed spec, which render
each slug from disk, so it is not silent. If option 4 inlines slim metadata as literals rather
than projecting from the imported `meta.json`, invariant 3 will block it. That is deliberate:
copying status out of `meta.json` is exactly the change the judge should see.

### Prediction and test
- prediction: Within this quarter, EDD-001 lands whichever option the measurements choose without
  another amendment, and `check` catches every registry drift.
- would_be_wrong_if: (1) A lesson reaches the feed with a status or gate result that differs from
  its `meta.json` because of a generator change. That would mean the invariants are too weak:
  roll back. Or (2) a legitimate generator change needs an amendment to get past invariant 2 or 3.
  That would mean they are too tight: amend them.
- side_by_side: The applying commit must regenerate a byte-identical `registry.generated.ts`, and
  `check` must pass with the same counts before and after. Both were confirmed in scratch.

### Does it change how the proposer is judged?
No. It loosens the protection on the platform-engineer's and principal-engineer's generator work
and keeps the judgement protected. Neither role should be the deciding vote.

### Rollback
Revert the commit. `registrySource` returns to `company.mjs`, and `tools/registry.mjs` is deleted.
If option 4 has landed by then, revert that first.

---

## (c2) ratification packet, with rider R1 (W-946) (evaluation steward, 2026-10-15, W-1006 / W-667)

This section supersedes the (c2) section above where they differ. The (c2) text above was tested
on 18 lessons. Everything below was re-run on the tree at `e02a6c7` (960 lessons, 5161 claims).

### What is being ratified (the law, in words)
`tools/company.mjs` stops holding the registry generator. `tools/registry.mjs` (ordinary surface)
exports `registryFiles(demos)`, which returns `{ "<repo path>": "<contents>" }`. `check` keeps
judging the output with six invariants. They are computed over all generated files together
(`gen`) and over each file on its own:

1. **Freshness.** Every file the generator returns matches the file on disk. No `src/demos/*.generated.ts` exists that the generator does not return (orphan rule).
2. **Meta faithfulness.** Every lesson on disk (a `meta.json` plus a `Demo.tsx`) is imported from its own `meta.json`, and nothing else is imported.
3. **No status literal** in generated code. Status comes only from `meta.json`, so a generator cannot promote around `launchGates`.
4. **Loader faithfulness (rider R1).** Every lesson on disk has exactly one loader, `"<meta.slug>": () => import("./<domainDir>/<slugDir>/Demo")`. Its key is the slug in that lesson's own `meta.json`. No other `import()` appears in generated code.
5. **Side separation (rider R1).** No generated file both imports a `meta.json` and contains an `import()`.
6. **No chaining (rider R1, added by the steward).** No generated file imports another generated file. Without this, invariant 5 holds per file, but a re-export file can still join metas and loaders again (planted test T8 below passed `check` until this rule was added).

Invariants 1 to 3 are (c2) as proposed on 2026-10-12. Invariants 4 and 5 are the principal
engineer's rider (`company/engineering/notes/2026-10-15-w946-loaders-design.md` section 4). I
changed three things in it: a count map instead of an O(n²) filter, a check that a loader's
target is a lesson on disk, and invariant 6.

### Why the rider: what (c2) alone misses
- With (c2) alone, a generator that points `"asthma-looks-safe"` at `./ai/attention-shares-one/Demo` passes `check` (960 lessons, run in scratch). That is the gap (c2) admitted ("not caught by the invariants"). R1 fails it with 3 errors.
- (c2) alone does not stop the generator from merging metas and loaders back into one module. That merge is the W-946 leak: every `meta.json`, internal fact-check notes included, in a 5.39 MB client chunk on every page. The principal engineer measured the split in scratch (build E in `company/engineering/notes/2026-10-15-first-light-reestimate.md`): `/` first-load JS 2,711,774 to 229,969 B gz, `/` HTML 309,937 to 47,614 B, stylesheets 751 to 1, phone usable 4.61 s to 0.89 s. **I did not re-measure these numbers.** They are the PE's testimony. What I tested is the gate, not the bundle.

### Sequencing finding: R1 cannot land on the one-file generator
Today's `registry.generated.ts` holds both metas and loaders, so invariant 5 fails it (tested:
`check failed: 1 error`, "must not hold both metas and loaders"). The PE's order of work applies
(c2) first and does the split "in a separate commit". With R1 in the amendment, that order leaves
a red `check` between the two commits, or else it needs two commits licensed by AMD-001. Article
3.5 says one commit. **So the applying commit carries (c2) + R1 and the A1 split together:**

| In the applying commit | Surface | Owner |
|---|---|---|
| `tools/company.mjs`: exactly the diff in `AMD-001-c2/tools-company-mjs.c2-r1.diff` (4 hunks; `git apply --check` is clean on `e02a6c7`) | protected | applied under `S3_AMENDMENT=AMD-001` |
| `tools/registry.mjs` (new), emitting `src/demos/index.generated.ts` and `src/demos/loaders.generated.ts` (reference shape: `AMD-001-c2/registry.split.reference.mjs`) | ordinary | platform-engineer |
| `src/demos/registry.generated.ts` deleted; the two new generated files added | generated | `npm run registry` |
| `src/lib/catalog.ts` imports `@/demos/index.generated` and adds `import "server-only"`; `src/components/DemoHost.tsx` imports `@/demos/loaders.generated` | ordinary (tier 2) | platform-engineer |
| `tools/qa-changed.mjs` excludes `*.generated.ts` instead of the one name | ordinary | platform-engineer |
| `tests/platform/registry-split.test.mjs` and the `static/chunks` extension of `tests/platform/built-output.test.mjs` (design note section 2) | ordinary | platform-engineer |

If the founder wants (c2) applied before A1 is ready, the alternative is to sign (c2) alone now
(invariants 1 to 3) and R1 later, as a second application commit together with A1. Article 3.5
does not foresee two application commits for one AMD, so that path needs the founder to say so
explicitly. I recommend the single commit: A1 is designed and measured, and (c2) has no use
before A1.

### Tests that enforce it
- **In the gate (protected once applied):** invariants 1 to 6 run in every `npm run check`, and so in `verify` and CI.
- **Side by side and planted violations:** `bash company/constitution/amendments/AMD-001-c2/side-by-side.sh <repo> pre` before applying, and `... post` on the applied tree. The script works on a copy, never on the given tree, and exits non-zero if any expectation fails. Run on `e02a6c7` (pre), all 14 pass:

| # | Case | Expected | Result |
|---|---|---|---|
| S1 | (c2) alone, one-file generator: `registry.generated.ts` regenerated | byte-identical | pass |
| S2 | (c2) alone: `check` | 960 lessons, 5161 claims, as before | pass |
| S3 | R1 on the one-file generator | fails invariant 5 (the sequencing finding) | pass |
| S4 | (c2)+R1 with the split generator, old file deleted | 960 / 5161, as before | pass |
| T1 | a loader pointed at another lesson's Demo | caught (inv. 4) | pass |
| T2 | metas merged back into the loaders file | caught (inv. 5) | pass |
| T3 | an extra computed `import()` | caught (inv. 4) | pass |
| T4 | a second loader key for one Demo | caught (inv. 4) | pass |
| T5 | one loader dropped | caught (inv. 4) | pass |
| T6 | `status: "published"` injected | caught (inv. 3) | pass |
| T7 | one meta import dropped | caught (inv. 2) | pass |
| T8 | `registry.generated.ts` kept as `export *` of both | caught (inv. 6) | pass |
| T9 | a meta imported but left out of `demos[]` | **missed** (known gap, objection O4) | pass (expected miss) |
| R | real generator restored | 960 / 5161 | pass |

  `check` runtime: 0.27 s before and after.
- **Outside the gate (ordinary; they catch what `check` cannot see):** the import-scan test (no client module reaches `index.generated`, only `DemoHost.tsx` imports `loaders.generated`, no server module imports `loaders.generated`), the built-output test (0 `INTERNAL_STRINGS` in `static/chunks`, no chunk over 300 KB raw), and `test:platform` in `verify` (W-925).

### What it removes
- The amendment requirement on generator changes: reordering, splitting, or changing what the bundle carries.
- From R1: the ability of a generator change to point a slug at another lesson's code, add a stray `import()`, or put metas and loaders back into one module (directly or through a re-export) without `check` failing.
- It removes nothing from `launchGates`. What may publish is unchanged.

### Prediction and test
- prediction: (1) The applying commit's `check` passes with 960 lessons and 5161 claims (or that day's counts, identical before and after), and `side-by-side.sh post` passes. (2) *(Restated 2026-10-16 by the evaluation steward, W-1152, before the post-deploy audit, per PE review F5 and readiness A5. As first written it said "every file in `static/chunks`", which was false before any deploy: the /hq org-role chunk carries `checkedBy`, and two Life Hacks client chunks carry the four `LESSON_CODE_FIELDS` names.)* After the founder-approved deploy, `view-source` of `/` and **every learner-reachable chunk** show 0 hits for every `INTERNAL_STRINGS` entry. The exception is the four `LESSON_CODE_FIELDS` names (`"owner"`, `"concept"`, `"objective"`, `"misconception"`), which stay within the ratchet of at most 2 chunks. A chunk is learner-reachable unless only `/hq` client-reference manifests reference it, which is the rule in `tests/platform/built-output.test.mjs`. The /hq-only chunks are excluded from this prediction, but the exclusion is not a pass: they are still fetchable on production (W-1117, readiness A6). (3) No later generator change needs an amendment to pass invariants 1 to 6 this quarter, except the EDD-003 stage 1 manifest (see O1).
- would_be_wrong_if: (1) a lesson reaches a learner with a status, a meta, or a Demo that is not its own because of a generator change while `check` is green (the invariants are too weak: roll back and amend); (2) a legitimate generator shape has to be bent, or amended, to pass invariant 5 or 6 (too tight: amend to name the allowed file); (3) an internal string ships in a learner-reachable chunk on production after the split, or the field-name ratchet exceeds 2 chunks (the guard sits in the wrong place: see O2; wording aligned with the restated prediction (2), 2026-10-16).
- side_by_side: the table above, re-run as `post` on the applying commit, with the before and after counts written in the commit message.

### Does it change how the proposer is judged?
No. platform-engineer and principal-engineer are interested parties: it loosens the protection on
their generator work and adds rules to it. The principal engineer drafted R1, which is written
input from the affected side. platform-engineer has given no written seat input. Neither is the
deciding vote. If the founder ratifies alone, record it as a sole-approver ratification, as with
AMD-002 (allowed, because it changes nothing about how the founder is judged).

### Rollback
- Whole: `git revert <applying sha>`, then `npm run registry` and `npm run check`. Because the split is in the same commit, one revert restores `registrySource`, `registry.generated.ts` and both importers together. The revert touches `tools/company.mjs`, so it needs `S3_AMENDMENT=AMD-001` and the trailer `Amendment: AMD-001`. Production keeps the split build until a founder-approved deploy, and rolling back brings the W-946 leak back.
- Partial (R1 only, for example if O1 fires): remove invariants 5 and 6. That is a protected edit, so it needs a short amendment that names the file allowed to hold both. Invariants 1 to 4 stay.

### Objections, each with what happened to it
| # | From | Objection | What happened |
|---|---|---|---|
| O1 | principal-engineer (design note, "would be wrong if") | Invariant 5 may block a legitimate shape, such as EDD-003 stage 1's manifest. | Accepted as falsifier (2). Not changed now, because that manifest is not designed. When it is, its design names the file and a short amendment allows it. Open, with that trigger. |
| O2 | evaluation steward | R1 judges only generated files. The W-946 leak was an **importer** choice (`DemoHost.tsx` importing the combined file). A new `"use client"` file that imports `index.generated` passes `check`. Only the ordinary-surface import-scan and built-output tests catch it, and a builder can weaken those without an amendment. | Not moved into the gate now. A transitive import scan in `cmdCheck` freezes more of the app, and protecting `tests/platform/**` would freeze the platform-engineer's tests. Re-open condition: if any internal string reaches a production client chunk after the split, or either guard is weakened without an engineering review, I propose a direct-import rule in `cmdCheck` (about 15 lines). Open, with that trigger. |
| O3 | evaluation steward | **Ratifying any part makes `AMD-001` a licence for every protected path.** The hook and CI match `^status:\s*ratified` in the AMD file, and CI accepts any ratified AMD for any path (2026-10-14 review G5(c); AMD-003 is not drafted). Once the status line says ratified, a session with `S3_AMENDMENT=AMD-001` may edit `src/kit/Lesson.tsx` and `tests/qa/**` for the unratified part (a). The amendments directory is not protected, so that line can be written by any agent. | Mitigated, not fixed. (1) The founder writes the status line, or the ratification quotes the founder's own message. (2) The steward audits the applying commit (`git show --stat`: the only protected path it touches is `tools/company.mjs`) and writes the audit under Decision. (3) After CI is green on the applying push, a follow-up push sets `status: applied in part ((c2)+R1, <sha>); (a), (b), (c1), (d) proposed`. The regex then stops matching and the licence closes. It must be a separate push, because CI reads the AMD file at HEAD. The real fix is AMD-003 (each AMD licenses only its `surface:` and its own commit range). Open, routed to AMD-003. |
| O4 | evaluation steward | Invariant 2 checks imports, not exports: a generator can import a meta and leave it out of `demos[]` (T9 passes `check`). That hides a lesson from the feed. It cannot promote one. | Not tightened. A rule over the array syntax would couple the gate to the generator's formatting, which is what (c2) frees. Re-open condition: any lesson on disk missing from `/catalog` while `check` is green. Open, with that trigger. |
| O5 | principal-engineer (residual) | Draft lesson code is still fetchable: `loaders` lists every slug, drafts included. | Out of scope, and it should stay so: filtering by status in the generator is what invariant 3 forbids. The fix is EDD-003 stage 1's published-only manifest. W-884 stays open on that half, and it goes in the release's `known_issues`. |
| O6 | evaluation steward | The invariants parse generated code with regexes. A harmless reformat (single quotes, a different arrow layout) fails `check`. | Accepted: it fails closed and loudly, and the fix is ordinary (match the format, or amend the regex). That is would_be_wrong_if (2) of (c2) if it ever blocks a needed change. |
| O7 | evaluation steward | The PE's order of work puts the split in a separate commit after (c2). | Answered by the sequencing finding: with R1, that leaves a red `check` or needs two licensed commits. One commit, with the split in it. The engineering review of the split (principal-engineer) and the EDD-007 readiness record (principal-engineer-ops) happen **before** that commit, on a branch. |

## Decision (constitutional review board)
(Left for the board. Record a decision for each part: (a), (b), (c1), (c2).)

### (c2) with rider R1: what the founder signs (prepared 2026-10-15; SIGNED 2026-10-15)
> I ratify AMD-001 part **(c2) with rider R1**, as written in "(c2) ratification packet" above: the generator moves to `tools/registry.mjs`, and `check` judges its output with invariants 1 to 6. It is applied in **one commit** with the A1 split, from `AMD-001-c2/tools-company-mjs.c2-r1.diff`, under `S3_AMENDMENT=AMD-001` with the trailer `Amendment: AMD-001`, after the principal-engineer's review of the split and the EDD-007 readiness record. This ratifies nothing in parts (a), (b), (c1) or (d). I accept objections O1, O2, O4 and O5 as open with their triggers, and O3 mitigated until AMD-003. Board: sole-approver ratification / board sat (strike one).
>
> Signed: founder, 2026-10-15. Sole-approver ratification. Founder's words, in the chief of staff conversation: "Ok do 2", answering the item "Sign AMD-001 (c2): closes the leak that puts drafts' metadata in the downloadable code, and makes phones about 5x faster". Recorded by: chief of staff.
>
> Sequencing (O3): the `status:` line stays `proposed` until the applying commit, which sets it to `ratified`; a separate follow-up push sets `applied in part ((c2)+R1, <sha>)` once CI is green, closing the licence.

Deploying the result is a separate founder approval.

Audit of the applying commit (steward, after it lands): **PASS, with three findings** (evaluation steward, 2026-10-16, W-1152; audited `0d76ae1`, `29e8694` and `1c96049` on `ccr-4c6c7654-ew9ko1`). Checked: (i) The parent is `e5288b7`, which is A1's base, so there was no drift to re-check. (ii) `git show --name-status 0d76ae1` lists 15 paths. Against `protected-paths.txt`, the only protected one is `tools/company.mjs`. `tests/platform/**` is not `tests/qa/**`. (iii) `tools/company.mjs` at `0d76ae1` has sha256 `938ea4fa…795eedb`. That equals A2, and I reproduced it on my own by applying `AMD-001-c2/tools-company-mjs.c2-r1.diff` to `e5288b7:tools/company.mjs`. (iv) `git interpret-trailers --parse` shows `Amendment: AMD-001`. The message has no deploy marker, and neither do `29e8694`, `1c96049` or `6ef70dc`. (v) `src/demos/registry.generated.ts` is absent from the tree. The 13 ordinary paths are blob-identical to `amd001-c2` (`2284c7d`). They are also exactly the set `amd001-c2` changes from its merge base `5103c0c`. Nothing else changed except this file's status line (`proposed` to `ratified`). (vi) `1c96049` changes only this file's status line, from `ratified` to `applied in part ((c2)+R1, 0d76ae1); (a), (b), (c1), (d) proposed`. Neither the hook regex nor CI's grep matches it any more, so AMD-001's licence is closed. CI's constitution job was green on `0d76ae1` itself. **F1, A4, met in substance but not to the letter:** on `0d76ae1` itself, check, typecheck and build passed. Its `qa` was cancelled when the `29e8694` push arrived (AMD-002 cancel-in-progress, run 38828123853). The full verify, including `qa`, passed on `29e8694` (run 38829110090). That tree differs from `0d76ae1` only in `company/ops/board.json`. Nothing under `tests/qa/` reads board.json: only `src/lib/hq*.ts` read it (the /hq pages), and the build was green on both trees. The status push (01:21Z) came after that run finished. I accept it as satisfying A4. Lesson for the next licensed commit: push nothing to the ref until the applying sha's own verify is done. **F2, an unapproved deploy was attempted:** `ccr-4c6c7654-ew9ko1` is the repo's default branch, so `deploy.yml` (`workflow_run`) starts a preview deploy after every green `ci`. Run 38834441241 tried to deploy `29e8694`, which contains this amendment, without founder approval. It deployed nothing only because the Vercel configuration check failed. That conflicts with the founder's 2026-10-14 rule (every deploy, preview included) and with A5. It is routed to release-manager under W-1153, which should be treated as an approval gap and not just a failing workflow. **F3, O3 is not closed as a class:** `AMD-000` and `AMD-002` still read `status: ratified`. Either one, named in a trailer or in `S3_AMENDMENT`, licenses any protected path today. Closing AMD-001's line does not close that. This adds to O3's routing to AMD-003. Interim: mark AMD-002 as applied, which needs the board's or the founder's say-so. Prediction (2) is restated above as "every learner-reachable chunk". It remains untested until the founder-approved deploy and the release manager's A5 grep.

## Additional evidence (chief-of-staff, 2026-10-12, wave 1)
The wave 1 chemistry builder reported independently that the current contract presses each control
once, so a lesson that gates its reveal on a real end state would fail QA ("reveal unlocks after
interaction"). Builders therefore fall back to `minInteractions` of 2–4, which is the weak gate
the reviews flagged. Part (a)'s "reach the key state within 400 actions" contract test removes
that trade-off.

## Additional evidence: the judge is shaping the product (chief-of-staff, 2026-10-12)
The wave 1 math builder reports that, because the contract presses each control only once (two
arrow presses for a slider), builders now design *for the QA path*: a 3-stop slider where
continuous sliding teaches better, a "Run to 100" play button the lesson would not otherwise
need, and the first split chosen with the rest automatic. Life and chemistry reported the same
pressure. This is the failure the book warns about ("if your ecosystem rewards clicks, clickable
organisms evolve"), produced by our own evaluator. Part (a), or a per-lesson declared QA route
(`data-qa-steps`), would let the lesson define the path to its key state instead of the harness.

## Proposed part (d): gates must read the verdict and the version (chief-of-staff, 2026-10-13)
On the first launch review, `launchGates` reported 30 lessons "ready to publish", but most had a
learner verdict of "revise", or a review written for an older version of the lesson. The gate
only checks that a review file exists. Proposal: a lesson is publishable only if its most recent
learner review names the current `version` and ends "Verdict: launch", and no fatal finding is
open. Until this is ratified, the launch review applies the rule by hand (see the 2026-10-13
launch-review record).

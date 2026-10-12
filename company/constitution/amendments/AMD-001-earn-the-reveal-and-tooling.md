# AMD-001: Earn the reveal in the kit, three rituals in the cadence table, and a second check for checker-added claims

status: proposed
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

## Decision (constitutional review board)
(Left for the board. Record a decision for each part: (a), (b), (c1), (c2).)

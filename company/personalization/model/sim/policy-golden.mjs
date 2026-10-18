// Byte-identity fixture for every existing ordering policy (W-1547 do-item 5).
// owner: learner-model-engineer (Ifeoma) · offline only · no dependencies, Node 22.18 or later.
//
//   node company/personalization/model/sim/policy-golden.mjs            # print the current hashes
//   node company/personalization/model/sim/policy-golden.mjs --write    # rewrite policy-golden.json (see rule below)
//
// For each policy in simulate.mjs ALL_POLICIES (default-order, draft-rules, gam at model-v0.2.2, the GAM
// ablations, random, epsilon-greedy) it hashes, on fixed inputs:
//   (a) the full compose output (picks + slot traces) of the policy's compose function over fixed synthetic
//       histories on the real pilot catalog, 6 cards per case, recomputing after each card;
//   (b) a whole simulated episode with the per-step trace (runEpisode, 2 personas x seed 1 x 2 days).
// policy-golden.json holds the hashes recorded at commit 4e13ef1 (main HEAD before the review-timing
// candidate existed). review-timing.test.mjs asserts today's hashes equal them byte for byte.
// Rule: --write is for a deliberate, versioned change to an existing policy only, with its own decision
// line; never to make the test pass after adding a new policy.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../model.ts";
import { composeExplained, gamCompose, defaultOrderPolicy, randomPolicy, draftRulesPolicy } from "./composer.ts";
import { loadPinnedCatalog } from "./catalog-pin.mjs"; // pinned catalogue (2026-10-18 note)
import { runEpisode, ALL_POLICIES, GAM_VARIANTS, rng } from "./simulate.mjs";
import { PERSONAS } from "../personas.ts";

const here = dirname(fileURLToPath(import.meta.url));
export const GOLDEN_FILE = join(here, "policy-golden.json");
const sha = (o) => createHash("sha256").update(JSON.stringify(o)).digest("hex");
const NOW = Date.UTC(2026, 9, 16, 9);
const HOUR = 3_600_000, DAY = 24 * HOUR;
const fnv = (s) => { let h = 0x811c9dc5; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h; };

function cases(cat) {
  const byDomain = (d) => cat.defaultOrder.filter((s) => cat.dims[s].domain === d);
  const hist = (slugs, f) => slugs.map((slug, i) => { const o = f(slug, i); const at = NOW - DAY - (slugs.length - i) * HOUR;
    return { slug, completedAt: at, ...(o.pred === undefined ? {} : { predictedCorrectly: o.pred }), recalls: o.recall === undefined ? [] : [{ at: at + DAY, correct: o.recall }] }; });
  return [
    { id: "cold-start", hist: [], due: [] },
    { id: "missing-probability", hist: hist(byDomain("probability").slice(0, 9), (s, i) => ({ pred: i % 3 === 0, recall: i % 2 ? false : undefined })), due: [] },
    { id: "succeeding-mixed", hist: hist(cat.defaultOrder.slice(0, 14), () => ({ pred: true, recall: true })), due: [] },
    { id: "concentrated-cs", hist: hist(byDomain("cs").slice(0, 12), (s) => ({ pred: fnv(s) % 2 === 0, recall: fnv(s) % 3 === 0 })), due: [] },
    { id: "with-due-revisits", hist: hist(cat.defaultOrder.slice(0, 6), (s, i) => ({ pred: i % 2 === 0 })), due: cat.defaultOrder.slice(0, 2) },
    { id: "switched-off", hist: hist(byDomain("probability").slice(0, 9), () => ({ pred: false, recall: false })), due: [], off: true },
  ];
}

function composeFor(policy, input, cat, rand) {
  if (policy === "default-order") return defaultOrderPolicy(input);
  if (policy === "random" ) return randomPolicy(input, rand);
  if (policy === "draft-rules") return draftRulesPolicy(input, M.COMPOSER, cat.pilotConcepts);
  const off = policy === "epsilon-greedy" ? [] : GAM_VARIANTS[policy];
  if (!off) throw new Error(`policy-golden: unknown policy ${policy}`);
  return { ...composeExplained(input, M.COMPOSER, { off, pilotConcepts: cat.pilotConcepts }), contract: off.length ? null : gamCompose(input, M.COMPOSER) };
}

/** Hashes per existing policy. Pure: same code, same catalog, same hashes. */
export function goldenHashes(cat = loadPinnedCatalog()) {
  const out = {};
  const personas = PERSONAS.slice(0, 2);
  for (const policy of ALL_POLICIES) {
    const compose = [];
    for (const c of cases(cat)) {
      const rand = rng(fnv(`${c.id}|${policy}`));
      const h = c.hist.map((x) => ({ ...x, recalls: x.recalls.map((r) => ({ ...r })) }));
      let t = NOW;
      for (let step = 0; step < 6; step++) {
        const fingerprint = M.fingerprintFrom(h, cat.dims, t, { predictedCorrectly: true });
        const needs = M.detect(fingerprint);
        const input = { fingerprint, needs, remaining: { ...needs }, pool: cat.lessons, defaultOrder: cat.defaultOrder,
          queued: [], history: h.slice(), dueRevisits: step === 0 ? c.due : [], personalisationOn: !c.off };
        const comp = composeFor(policy, input, cat, rand);
        compose.push(comp);
        const pick = comp.picks.find((p) => p.reason !== "due-revisit");
        if (!pick) break;
        t += 10 * 60_000;
        h.push({ slug: pick.slug, completedAt: t, predictedCorrectly: fnv(pick.slug) % 2 === 0, recalls: [] });
      }
    }
    const episodes = personas.map((p) => runEpisode({ persona: p, policy, seed: 1, cat, trace: true, days: 2 }));
    out[policy] = { compose: sha(compose), episodes: sha(episodes) };
  }
  return out;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const t0 = Date.now();
  const hashes = goldenHashes();
  if (process.argv.includes("--write")) {
    const rec = { recordedAt: "4e13ef1 (main HEAD before the review-timing candidate; W-1547)", modelVersion: M.MODEL_VERSION,
      composerVersion: M.COMPOSER.version, rule: "rewrite only for a deliberate, versioned change to an existing policy (see policy-golden.mjs header)", hashes };
    writeFileSync(GOLDEN_FILE, JSON.stringify(rec, null, 2) + "\n");
  }
  const golden = (() => { try { return JSON.parse(readFileSync(GOLDEN_FILE, "utf8")).hashes; } catch { return null; } })();
  for (const [p, h] of Object.entries(hashes)) console.log(`${p.padEnd(26)} compose ${h.compose.slice(0, 12)} episodes ${h.episodes.slice(0, 12)}${golden ? (JSON.stringify(golden[p]) === JSON.stringify(h) ? "  same" : "  DIFFERENT") : ""}`);
  console.log(`${Date.now() - t0} ms`);
}

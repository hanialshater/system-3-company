#!/usr/bin/env node
// The company CLI. Dependency-free on purpose: any agent with a shell can run it.
//
//   node tools/company.mjs <command> [args]
//
//   status                     one-screen operating picture (start every session here)
//   check                      validate the whole company: demos, claims, roles, rituals, constitution
//   registry                   regenerate src/demos/*.generated.ts (generator: tools/registry.mjs)
//   coverage [domain]          concept coverage and unmet demand per domain
//   claims [--open]            the claims ledger; --open lists claims not yet verified
//   new-demo <domain> <slug>   scaffold a lesson from the standard template
//   publish <slug>             run the launch gates and flip status to published
//   sample <domain> <slug...> --by=<role>  draw a tier-S batch's learner-walk sample (AMD-017 (b))
//   ritual <name>              start a ritual record from its template (wbr, op-planning, ...)
//   rituals                    cadence table: last run, next due, overdue
//   board [add|move] ...       the work board (company/ops/board.json)
//   roles                      the org: every role, its scope line and its agent file
//   qa-record                  file the last Playwright run as QA records in company/reviews/
//
// Exit code is non-zero when `check` or `publish` finds a violation, so CI can gate on it.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registryFiles } from "./registry.mjs";
import { readiness, loadContext, gitAncestry } from "./lib/readiness.mjs";
import * as tiers from "./lib/tiers.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rel = (...p) => path.join(ROOT, ...p);
const exists = (p) => fs.existsSync(p);
const readJSON = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const writeJSON = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + "\n");
const today = () => new Date().toISOString().slice(0, 10);
const ls = (dir) => (exists(dir) ? fs.readdirSync(dir) : []);

const color = process.stdout.isTTY
  ? { red: (s) => `\x1b[31m${s}\x1b[0m`, green: (s) => `\x1b[32m${s}\x1b[0m`, yellow: (s) => `\x1b[33m${s}\x1b[0m`, bold: (s) => `\x1b[1m${s}\x1b[0m`, dim: (s) => `\x1b[2m${s}\x1b[0m` }
  : { red: (s) => s, green: (s) => s, yellow: (s) => s, bold: (s) => s, dim: (s) => s };

// ---------------------------------------------------------------- loading

function loadDomains() {
  return readJSON(rel("content/domains.json")).domains;
}

function loadCurriculum(domainId) {
  const p = rel("content/curriculum", `${domainId}.json`);
  return exists(p) ? readJSON(p) : null;
}

function loadDemos() {
  const demos = [];
  for (const domain of ls(rel("src/demos"))) {
    const ddir = rel("src/demos", domain);
    if (!fs.statSync(ddir).isDirectory()) continue;
    for (const slug of ls(ddir)) {
      const dir = path.join(ddir, slug);
      if (!fs.statSync(dir).isDirectory()) continue;
      const metaPath = path.join(dir, "meta.json");
      let meta = null;
      let parseError = null;
      try {
        meta = readJSON(metaPath);
      } catch (e) {
        parseError = e.message;
      }
      demos.push({ domainDir: domain, slugDir: slug, dir, metaPath, meta, parseError });
    }
  }
  return demos.sort((a, b) => (a.domainDir + a.slugDir).localeCompare(b.domainDir + b.slugDir));
}

function loadBoard() {
  const p = rel("company/ops/board.json");
  return exists(p) ? readJSON(p) : { items: [] };
}

const RITUALS = {
  wbr: { cadenceDays: 7, title: "Weekly Business Review" },
  "demo-crit": { cadenceDays: 7, title: "Demo Crit (independent, pairwise)" },
  "cycle-planning": { cadenceDays: 14, title: "Cycle Planning" },
  "pattern-review": { cadenceDays: 14, title: "Pattern Review" },
  distillation: { cadenceDays: 30, title: "Distillation Day" },
  "creative-distrust": { cadenceDays: 30, title: "Creative Distrust Session" },
  "op-planning": { cadenceDays: 91, title: "Operational Planning (OP)" },
  "constitutional-review": { cadenceDays: 91, title: "Constitutional Review Board" },
  "domain-launch": { cadenceDays: null, title: "Domain Launch Review" },
  "launch-review": { cadenceDays: null, title: "Launch Review (go / no-go)" },
  coe: { cadenceDays: null, title: "Correction of Error" },
  retirement: { cadenceDays: null, title: "Retirement Review" },
};

function ritualRecords() {
  const dir = rel("company/rituals/records");
  return ls(dir)
    .filter((f) => /^\d{4}-\d{2}-\d{2}-.+\.md$/.test(f))
    .map((f) => ({ file: f, date: f.slice(0, 10), name: f.slice(11, -3).replace(/-\d+$/, "") }));
}

// ---------------------------------------------------------------- registry

// The generator is ordinary surface: tools/registry.mjs (AMD-001). What judges it stays here:
// `check` regenerates in memory and fails on drift, and checks generator-independent invariants.

function cmdRegistry({ quiet } = {}) {
  let changed = 0;
  for (const [file, src] of Object.entries(registryFiles(loadDemos()))) {
    const out = rel(file);
    const prev = exists(out) ? fs.readFileSync(out, "utf8") : "";
    if (prev !== src) (fs.writeFileSync(out, src), changed++);
  }
  if (!quiet) console.log(changed ? `registry: regenerated ${changed} file(s)` : "registry: up to date");
}

// ---------------------------------------------------------------- check

const REQUIRED_META = {
  slug: "string",
  title: "string",
  hook: "string",
  domain: "string",
  concept: "string",
  status: "string",
  durationSec: "number",
  owner: "object",
  learner: "object",
  misconception: "string",
  objective: "string",
  claims: "array",
  confidence: "string",
  recall: "object",
  evidence: "object",
  version: "number",
};

function typeOf(v) {
  return Array.isArray(v) ? "array" : v === null ? "null" : typeof v;
}

// ---------------------------------------------------------------- readiness (AMD-013)
// One readiness policy for status, publish, batch publish (tools/publish-ready.mjs) and check. The mechanics of
// reading verdicts, versions, holds and review order live in tools/lib/readiness.mjs (ordinary surface, tunable
// without an amendment). What judges that lib stays here: the strictness parameters below, a known-answer canary
// it must pass before launchGates trusts it, an active-hold floor that does not depend on it, and the rule that
// launchGates calls it. A lib that throws, answers malformed, or fails the canary blocks every gate (fail closed).

// QA records dated on or after this day must carry `lesson version: vN` (qa-record writes it from AMD-013 on).
// The applying commit sets this to the ratification date (AMD-013 apply step A2; the steward's audit checks it).
const READINESS_SINCE = "2026-10-17";
// AMD-010 part 3 step 10, folded in here rather than as a second gate line: when that part is ratified, set this to
// its ratification date and a newest QA record from that date on must read `recorded by: qa-tester` and
// `kind: independent`. null = not ratified, no recorder rule.
const QA_INDEPENDENT_SINCE = null;
// Published before AMD-013 and failing it when measured (AMD-013-one-readiness/measure.mjs at c31c1fab; 268 of 720,
// 219 of them only because an unstamped QA record shares a day with an older-version review). check warns for
// these and errors for any other published lesson that fails readiness. Changes only by amendment; never grows.
const READINESS_GRANDFATHERED = new Set([
  "a-star-heads-for-goal", "accurate-bettor-takes-the-pot", "all-lines-meet-in-one-mother",
  "antibiotic-already-there", "atlantic-to-pacific-heading", "attention-shares-one", "average-that-never-settles",
  "back-button-stack", "background-shortcut", "bad-hash-one-bucket", "bad-start-kmeans", "ball-at-the-top",
  "bank-lends-it-again", "bearing-spiral-to-the-pole", "below-critical-mass", "below-the-threshold-crash",
  "bending-frontier", "bet-too-much-and-go-broke", "better-in-every-group-worse-overall", "bid-what-its-worth",
  "bigger-beetles-everyone-loses", "binary-fingers", "binary-numbers", "birthday-paradox", "bisect-the-bad-commit",
  "boyer-moore-skips-ahead", "bridge-parity", "build-a-balanced-mobile", "capped-doubling-game",
  "centre-moves-the-gap", "cheapest-is-not-shortest", "circle-slices-to-rectangle", "city-poll-nation-poll",
  "clear-the-lowest-one", "closer-in-winter", "coaster-track-shape", "coin-gap-keeps-growing", "coin-greedy-trap",
  "collect-all-six-faces", "common-letters-in-order", "compound-interest", "confident-and-wrong",
  "contact-order-matters", "copy-of-a-copy", "count-the-bread-once", "count-the-out-of-order-pairs",
  "count-the-thunder", "crumple-zone-stopping-time", "cut-the-cube-surface", "dakar-nearer-brazil",
  "dam-depth-not-width", "deleted-key-breaks-search", "diagonal-escapes-the-list", "digits-are-logs",
  "dilute-until-none-left", "direction-not-distance", "dish-runs-out", "dog-bites-man-twice",
  "double-after-every-loss", "doubling-finds-the-edge", "doubling-speed-braking", "draw-the-xor-lines",
  "drift-of-a-straight-throw", "drop-the-losing-start", "dropped-vs-fired-ball", "drunk-walk-distance",
  "each-element-pops-once", "earth-flattening", "equinox-twelve-everywhere", "eratosthenes-shadow",
  "every-base-fools-fermat", "every-scale-equally-likely", "every-second-seat-out", "exchange-round-trip",
  "exterior-turns", "fee-on-two-week-loan", "fenwick-hops-by-lowest-bit", "fib-call-explosion", "fifty-hour-monday",
  "filament-vs-led-heat", "fingernail-ocean", "flaw-to-lawn", "flip-and-add-one", "four-in-a-row-two-thirds",
  "four-queens-pruning", "free-rider-pot", "friends-have-more-friends", "friends-split-more-than-chance",
  "gauss-staircase", "gradient-descent", "greedy-slot-machine", "groups-where-everyone-reaches-everyone",
  "half-adder-wiring", "half-of-humanity", "halve-the-margin-cost", "hanoi-tower-doubles", "hash-bucket-pileup",
  "hawks-never-take-over", "heap-bubble-up", "heavy-but-floats", "herd-immunity", "hidden-carriers",
  "hidden-third-cause", "high-satellite-view", "honolulu-overhead", "horizon-ruler", "huffman-by-merging",
  "income-in-dollars", "insert-at-front-cost", "insertion-by-hand", "insurance-fair-price",
  "iss-gravity-still-there", "keep-one-of-a-stream", "keeping-the-bad-gene", "king-queen-arrow", "kitchen-crowding",
  "kmp-never-steps-back", "land-hemisphere", "lap-at-89-north", "last-digit-first", "list-doubling-copies",
  "loaf-with-smoke", "london-december-noon-sun", "london-la-over-greenland", "lower-bid-takes-the-top-ad",
  "lru-eviction-order", "maze-depth-first", "meaning-without-the-word", "median-without-sorting",
  "memorise-coin-flips", "mercator-greenland", "merge-sort-payoff", "middle-of-three-takes-all", "midnight-sun-line",
  "mild-preferences-sharp-divides", "monty-hall-100-doors", "more-copying-bigger-stars", "most-cases-vaccinated",
  "natural-selection", "near-and-far-links-find-the-way", "near-the-wall", "negative-edge-fools-dijkstra",
  "never-flag-99", "new-server-moves-few-keys", "newton-doubles-the-digits", "next-word-tally", "nines-without-end",
  "north-is-up-convention", "odds-average-the-bettors", "one-boss-moves-the-mean", "one-crowded-bucket",
  "one-in-four-sprouts", "one-nudge-per-mistake", "one-odd-loop-blocks-two-camps", "one-recipe-for-sixty",
  "pairs-cancel-under-xor", "palindromes-grow-from-centres", "paths-by-adding", "patience-piles",
  "pay-first-then-profit", "pcr-not-quite-doubling", "pendulum-period", "pennies-dont-add-up", "pesticide-paradox",
  "plus-fifty-minus-forty", "point-one-is-26-percent", "potassium-battery", "price-tag-or-auction",
  "prices-sort-the-buyers", "probing-clusters-grow", "product-plus-one", "projectile-angle",
  "proposers-get-the-best", "puck-on-ice-no-push", "purging-slows-down", "queue-or-stack-same-search",
  "ramp-same-work", "random-surfer-finds-the-rank", "ray-counts-crossings", "real-rate-illusion",
  "rising-price-stops-at-second", "rolling-hash-window", "rotation-untangles-the-chain", "route-explosion",
  "rsa-lock-with-public-key", "ruler-on-mercator", "running-median-two-heaps", "same-picture-two-histories",
  "same-push-twice-the-mass", "same-revenue-any-rule", "same-sugar-more-water", "saturated-enzyme",
  "seattle-moscow-heading", "second-trader-pays-the-seller", "seesaw-sit-closer", "seventy-two-doubling",
  "shoelace-order-matters", "shortest-job-first-wait", "shrink-toward-zero", "shrinking-degree",
  "side-of-the-square", "skydiver-speed-limit", "split-the-sum", "spreaders-are-rare", "square-a-plus-b",
  "square-root-wealth", "stag-needs-three-in-four", "steeper-is-not-taller", "stop-at-epoch-sixty",
  "strategy-builder", "sum-seven-ignores-first-die", "summit-kettle", "tear-the-corners", "temperature-reshapes",
  "ten-to-one-buffer", "ternary-asks-more", "thales-corner", "the-bar-nobody-can-forecast", "the-contrary-program",
  "the-fast-ones-leave", "the-grid-takes-up-to-three-eighths", "the-loser-flips-the-winner",
  "the-middle-voter-decides", "the-pivotal-juror-convicts", "the-slowing-half-life", "the-tagged-molecule",
  "the-tail-that-reacts", "thirteen-pigeons", "three-cards-one-red-face", "three-giants-in-africa",
  "tic-tac-toe-is-a-draw", "ties-keep-their-order", "tissot-circles", "torch-underwater-tilt", "tortoise-meets-hare",
  "tournament-second-best", "tree-count-explodes", "triangle-three-right-angles", "twenty-dollar-basket",
  "twenty-then-ten-off", "twice-as-hot-not-twice-as-fast", "two-bulges", "two-flips-slip-by",
  "two-locks-wait-forever", "two-pointers-meet", "two-ripples-cancel", "two-said-blue", "two-squares-become-one",
  "two-stacks-make-a-queue", "two-tugs-right-angle", "two-writers-one-counter", "undo-a-bad-push",
  "undo-a-multiplication-mod-n", "union-find-shortcut", "unknot-game", "waves-return", "ways-to-make-ten",
  "web-map-cut-off-latitude", "wheel-needs-four-colours", "wheel-of-negatives", "when-the-water-is-full",
  "where-the-dew-forms", "which-answer-wins", "who-grabs-the-electrons", "whose-cutoff-wins", "window-forgets-start",
  "word-in-pieces", "worth-something-alone"
]);

function qaRecorderRule(rec) {
  if (!QA_INDEPENDENT_SINCE || rec.d < QA_INDEPENDENT_SINCE) return null;
  return /recorded by:[ \t]*qa-tester\b/.test(rec.t) && /kind:[ \t]*independent\b/.test(rec.t) ? null : `evidence.qa ${rec.f} is not an independent QA record`;
}

// The hold floor reads the hold file here, not through the lib (AMD-013 (a) 2; principal-engineer condition C1).
// null means unreadable, and then every gate is closed.
function readHolds() {
  const p = rel("company/ops/publish-holds.json");
  if (!fs.existsSync(p)) return {};
  try {
    const h = JSON.parse(fs.readFileSync(p, "utf8")).holds ?? {};
    return h && typeof h === "object" && !Array.isArray(h) ? h : null;
  } catch {
    return null;
  }
}

let readinessOptsCache = null;
function readinessOpts() {
  return (readinessOptsCache ??= { holds: readHolds(), isAncestor: gitAncestry(ROOT), versionSince: READINESS_SINCE, recorder: qaRecorderRule });
}

// Known answers the lib must give before any gate trusts it. Synthetic records, no disk.
let canaryResult;
function readinessCanary() {
  if (canaryResult !== undefined) return canaryResult;
  const learner = (verdict, v) => ({ f: "2026-01-02-learner-canary.md", t: `lesson version: v${v}\nVerdict: ${verdict}\n` });
  const qa = (result, v) => ({ f: "2026-01-02-qa.md", t: `date: 2026-01-02 · lesson version: v${v} · result: **${result}**\n`, linked: true });
  const meta = { slug: "canary", version: 2 };
  const cases = [
    ["launch on the current version, QA pass", { learner: [learner("launch", 2)], qa: [qa("pass", 2)], hold: null }, true],
    ["learner revise", { learner: [learner("revise", 2)], qa: [qa("pass", 2)], hold: null }, false],
    ["learner launch for an older version", { learner: [learner("launch", 1)], qa: [qa("pass", 2)], hold: null }, false],
    ["QA fail", { learner: [learner("launch", 2)], qa: [qa("fail", 2)], hold: null }, false],
    ["QA for an older version", { learner: [learner("launch", 2)], qa: [qa("pass", 1)], hold: null }, false],
    ["active hold", { learner: [learner("launch", 2)], qa: [qa("pass", 2)], hold: "canary hold" }, false],
    ["unstamped QA on or after READINESS_SINCE", { learner: [learner("launch", 2)], qa: [{ f: "2026-01-02-qa.md", t: "date: 2026-01-02 · result: **pass**\n", linked: true }], hold: null, versionSince: "2026-01-01" }, false],
    ["same-day tie of launch and revise", { learner: [learner("launch", 2), { f: "2026-01-02-learner-other.md", t: "lesson version: v2\nVerdict: revise\n" }], qa: [qa("pass", 2)], hold: null }, false],
  ];
  canaryResult = null;
  for (const [name, ctx, want] of cases) {
    let got;
    try {
      got = readiness(meta, ctx)?.ready;
    } catch (e) {
      got = `threw ${e.message}`;
    }
    if (got !== want) {
      canaryResult = `readiness lib failed its known-answer canary (${name}: expected ${want}, got ${got}); every gate is closed until it passes (AMD-013)`;
      break;
    }
  }
  return canaryResult;
}

/** Readiness gates (AMD-013): verdicts, versions, holds, review order. Returns a list of failures. */
function readinessGates(meta) {
  const canary = readinessCanary();
  if (canary) return [canary];
  const fails = [];
  const opts = readinessOpts();
  if (!opts.holds) return ["company/ops/publish-holds.json is unreadable; every gate is closed until it parses (AMD-013 hold floor)"];
  let r;
  try {
    r = readiness(meta, loadContext(ROOT, meta, opts));
  } catch (e) {
    return [`readiness check failed to run: ${e.message}`];
  }
  if (!r || typeof r.ready !== "boolean" || !Array.isArray(r.reasons)) return ["readiness returned a malformed answer"];
  // AMD-017 (b): a batch sample can stand in for the learner walk of a tier-S lesson; QA, holds and the rest still apply.
  const covered = walkCover(meta).covered;
  const reasons = covered ? r.reasons.filter((x) => !x.startsWith("learner review:")) : r.reasons;
  if (!r.ready && !(covered && reasons.length === 0)) fails.push(...(reasons.length ? reasons : ["not ready (readiness gave no reason)"]));
  if (opts.holds[meta.slug] && !fails.some((f) => f.startsWith("active publish hold"))) fails.push(`active publish hold: ${opts.holds[meta.slug]}`);
  return fails;
}

/** Gates a lesson must pass to be published: the claim/evidence floor plus readiness. Returns a list of failures. */
function launchGates(meta) {
  return [...claimGates(meta), ...readinessGates(meta), ...(AMD017_EVIDENCE_ENFORCED ? tierEvidence(meta) : [])];
}

// ---------------------------------------------------------------- AMD-017: risk tiers (ratified 2026-10-25, F-51)
// Mechanics in tools/lib/tiers.mjs (ordinary surface); the strictness parameters, the canary and the rule that the
// gates call it live here. Record: company/decisions/2026-10-25-founder-f51-amd017.md.
//   (a) tier N (new format), R (risky route, sensitive concept or incubating domain), S (the rest);
//   (b) tier S may publish on a batch sample: at least 1 in 5 of the category's batch walked, drawn by hash, not by
//       the maker; stop rule: more than 1 fatal in 10 in a sample and that batch and the category's next batch walk
//       every lesson; two weekly audits running with more than 1 fatal in 10 in a category revoke (b) for it;
//   (c)-(e) route verdict, sequence-probe record, design and pairwise records: side by side (warnings) for one cycle,
//       then enforced by setting AMD017_EVIDENCE_ENFORCED in a commit under the AMD-017 trailer.
const AMD017 = { sampleRate: 1 / 5, stopNumerator: 1, stopDenominator: 10, newFormatBelow: 3, riskRoutes: ["sensitive", "safety", "copyright"] };
const AMD017_EVIDENCE_ENFORCED = false;

let tierDataCache = null;
function tierData() {
  if (tierDataCache) return tierDataCache;
  const metas = loadDemos().map((d) => d.meta).filter(Boolean);
  const domains = new Map(loadDomains().map((d) => [d.id, d]));
  const concepts = new Map();
  for (const id of domains.keys()) for (const c of loadCurriculum(id)?.concepts ?? []) concepts.set(`${id}:${c.id}`, c);
  let batches = [];
  let audits = [];
  let loadError = null;
  try {
    batches = tiers.loadBatches(ROOT);
    audits = tiers.loadAudits(ROOT);
  } catch (e) {
    loadError = `batch or audit records unreadable (${e.message})`;
  }
  const bySlug = new Map(metas.map((m) => [m.slug, m]));
  const reviews = new Map();
  const reviewsOf = (slug) => (reviews.has(slug) ? reviews.get(slug) : reviews.set(slug, tiers.learnerVerdicts(ROOT, slug)).get(slug));
  tierDataCache = { metas, domains, concepts, batches, audits, loadError, bySlug, reviewsOf, formatCounts: tiers.publishedFormatCounts(metas) };
  return tierDataCache;
}

function amd017Params() {
  const td = tierData();
  return { ...AMD017, builders: (b) => (b.lessons ?? []).map((l) => td.bySlug.get(l.slug)?.owner?.builder).filter(Boolean) };
}

// Known answers the tiers lib must give before the sampled path is open. Synthetic records, no disk.
let tiersCanaryResult;
function tiersCanary() {
  if (tiersCanaryResult !== undefined) return tiersCanaryResult;
  tiersCanaryResult = null;
  try {
    const P = { ...AMD017, builders: () => ["builder-x"] };
    const fc = new Map([["single-card", 10], ["multi-card-sequence", 2]]);
    const m = (slug, extra = {}) => ({ slug, domain: "math", status: "review", version: 1, format: "single-card", ...extra });
    const ten = Array.from({ length: 10 }, (_, i) => ({ slug: `l${i}`, version: 1 }));
    const b1 = { id: "2026-01-01-math-1", date: "2026-01-01", domain: "math", drawnBy: "evaluation-steward", lessons: ten };
    const s1 = tiers.drawSample(b1, AMD017.sampleRate);
    const un = ten.map((l) => l.slug).find((x) => !s1.includes(x));
    const all = (v) => () => v;
    const fatalOne = (slug) => (slug === s1[0] ? "fatal" : "launch");
    const b2 = { ...b1, id: "2026-01-02-math-2", date: "2026-01-02", lessons: ten.map((l) => ({ ...l, slug: `k${l.slug}` })) };
    const s2 = tiers.drawSample(b2, AMD017.sampleRate);
    const un2 = b2.lessons.map((l) => l.slug).find((x) => !s2.includes(x));
    const audit = (date, f, n) => ({ date, lessons: Array.from({ length: n }, (_, i) => ({ domain: "math", fatal: i < f })) });
    const cases = [
      ["tier S", tiers.tierOf(m("a"), { formatCounts: fc }, P).tier, "S"],
      ["tier R from the lesson route", tiers.tierOf(m("a", { reviewRoute: { route: "safety" } }), { formatCounts: fc }, P).tier, "R"],
      ["tier R from a sensitive concept", tiers.tierOf(m("a"), { formatCounts: fc, concept: { sensitive: "war" } }, P).tier, "R"],
      ["tier R from an incubating domain", tiers.tierOf(m("a"), { formatCounts: fc, domainStatus: "incubating" }, P).tier, "R"],
      ["tier N wins over R", tiers.tierOf(m("a", { format: "multi-card-sequence", reviewRoute: { route: "sensitive" } }), { formatCounts: fc }, P).tier, "N"],
      ["sample of 10 is 2", s1.length, 2],
      ["full sample is 10", tiers.drawSample(b1, AMD017.sampleRate, true).length, 10],
      ["unsampled lesson covered", tiers.coverage(m(un), "S", [b1], all("launch"), P).covered, true],
      ["sampled lesson not covered", tiers.coverage(m(s1[0]), "S", [b1], all("launch"), P).covered, false],
      ["sample not walked", tiers.coverage(m(un), "S", [b1], all(null), P).covered, false],
      ["stop rule trips this batch", tiers.coverage(m(un), "S", [b1], fatalOne, P).covered, false],
      ["stop rule makes the next batch full", tiers.coverage(m(un2), "S", [b1, b2], fatalOne, P).covered, false],
      ["no stop rule, next batch normal", tiers.coverage(m(un2), "S", [b1, b2], all("launch"), P).covered, true],
      ["tier R never covered", tiers.coverage(m(un), "R", [b1], all("launch"), P).covered, false],
      ["own review governs", tiers.coverage(m(un), "S", [b1], all("launch"), P, { ownCurrentReviews: 1 }).covered, false],
      ["older version not covered", tiers.coverage(m(un, { version: 2 }), "S", [b1], all("launch"), P).covered, false],
      ["drawn by a builder", tiers.coverage(m(un), "S", [{ ...b1, drawnBy: "builder-x" }], all("launch"), P).covered, false],
      ["two bad audits revoke", !!tiers.auditRevoked("math", [audit("2026-01-08", 1, 5), audit("2026-01-15", 1, 2)], P), true],
      ["one bad audit does not revoke", !!tiers.auditRevoked("math", [audit("2026-01-08", 1, 1), audit("2026-01-15", 0, 10)], P), false],
    ];
    for (const [name, got, want] of cases) {
      if (got !== want) {
        tiersCanaryResult = `tiers lib failed its known-answer canary (${name}: expected ${want}, got ${got}); the sampled learner walk is closed until it passes`;
        break;
      }
    }
  } catch (e) {
    tiersCanaryResult = `tiers lib canary threw (${e.message}); the sampled learner walk is closed until it passes`;
  }
  return tiersCanaryResult;
}

/** Tier and learner-walk coverage for one lesson. Fails closed: any error means "not covered". */
const walkCoverCache = new Map();
function walkCover(meta) {
  const key = `${meta.slug}@${meta.version ?? 1}:${meta.status}`;
  if (walkCoverCache.has(key)) return walkCoverCache.get(key);
  let out;
  try {
    const canary = tiersCanary();
    const td = tierData();
    const P = amd017Params();
    const t = tiers.tierOf(meta, { formatCounts: td.formatCounts, concept: td.concepts.get(`${meta.domain}:${meta.concept}`) ?? null, domainStatus: td.domains.get(meta.domain)?.status ?? null }, P);
    if (canary || td.loadError) out = { covered: false, reason: canary ?? td.loadError, ...t };
    else {
      const v = meta.version ?? 1;
      const own = td.reviewsOf(meta.slug).filter((r) => r.version === v).length;
      const verdictAt = (slug, ver) => tiers.worstAt(td.reviewsOf(slug), ver);
      const c = tiers.coverage(meta, t.tier, td.batches, verdictAt, P, { ownCurrentReviews: own, revoked: tiers.auditRevoked(meta.domain, td.audits, P) });
      out = { ...c, ...t };
    }
  } catch (e) {
    out = { covered: false, reason: `tiers check failed to run: ${e.message}` };
  }
  walkCoverCache.set(key, out);
  return out;
}

/** AMD-017 (c)-(e): the evidence tiers R and N, and multi-card lessons, need. Returns a list of failures. */
function tierEvidence(meta) {
  const fails = [];
  const t = walkCover(meta).tier;
  if (!t) return ["(a) tier unknown: the tiers check did not run"];
  const v = meta.version ?? 1;
  const dir = rel("company/reviews", meta.slug);
  const files = ls(dir).filter((f) => f.endsWith(".md"));
  const read = (f) => fs.readFileSync(path.join(dir, f), "utf8");
  const stamped = (txt) => new RegExp(`lesson version:[ \\t*_]*v${v}\\b`, "i").test(txt);
  if (t === "R" || t === "N") {
    const c = tierData().concepts.get(`${meta.domain}:${meta.concept}`);
    const route = meta.reviewRoute?.route ?? (typeof c?.reviewRoute === "string" ? c.reviewRoute : null) ?? (c?.sensitive ? "sensitive" : null);
    if (route && AMD017.riskRoutes.includes(route)) {
      const ok = files.filter((f) => f.endsWith(`-${route}.md`) && !f.endsWith(`-${route}-brief.md`)).some((f) => {
        const x = read(f);
        return /stage:[ \t]*publish\b/i.test(x) && /^[ \t>*_#-]*Verdict:[ \t*_]*publish\b/im.test(x) && stamped(x);
      });
      if (!ok) fails.push(`(c) tier ${t}: no ${route} route verdict (stage: publish, Verdict: publish) for v${v}`);
    } else if (t === "R") fails.push("(c) tier R: no reviewRoute.route declared, so no route verdict can be read");
  }
  if (tiers.normFormat(meta.contentType ?? meta.format) === "multi-card-sequence") {
    const ok = files.filter((f) => /sequence-probe/.test(f)).some((f) => {
      const x = read(f);
      return stamped(x) && /\b0 FAIL\b/.test(x);
    });
    if (!ok) fails.push(`(d) multi-card: no sequence-probe record with 0 FAIL for v${v} (company/reviews/${meta.slug}/*-sequence-probe.md)`);
  }
  if (t === "N") {
    if (!files.filter((f) => /design/.test(f)).some((f) => stamped(read(f)))) fails.push(`(e) tier N: no design-review record for v${v}`);
    if (!(meta.evidence?.pairwise ?? []).some((p) => exists(rel(p)) && stamped(fs.readFileSync(rel(p), "utf8")))) fails.push(`(e) tier N: no pairwise record for v${v}`);
  }
  return fails;
}

/** `company sample <domain> <slug...> --by=<role>`: list a tier-S batch and draw its learner-walk sample. */
function cmdSample(args) {
  const by = args.find((a) => a.startsWith("--by="))?.slice(5);
  const [domain, ...slugs] = args.filter((a) => !a.startsWith("--"));
  if (!by || !domain || !slugs.length) {
    console.log("usage: company sample <domain> <slug...> --by=<role>");
    process.exitCode = 1;
    return;
  }
  const td = tierData();
  const problems = [];
  const lessons = [];
  for (const s of [...new Set(slugs)]) {
    const m = td.bySlug.get(s);
    if (!m) problems.push(`${s}: no such lesson`);
    else if (m.domain !== domain) problems.push(`${s}: domain ${m.domain}, not ${domain}`);
    else if (m.status === "published" || m.status === "retired") problems.push(`${s}: already ${m.status}`);
    else if (m.owner?.builder === by) problems.push(`${s}: built by ${by}, who may not draw its sample`);
    else if (td.batches.some((b) => (b.lessons ?? []).some((l) => l.slug === s && l.version === (m.version ?? 1)))) problems.push(`${s}: already listed in a batch at v${m.version ?? 1}`);
    else {
      const w = walkCover(m);
      if (w.tier !== "S") problems.push(`${s}: tier ${w.tier ?? "?"} (${w.why ?? w.reason}) walks every lesson`);
      else lessons.push({ slug: s, version: m.version ?? 1 });
    }
  }
  if (problems.length) {
    console.log(color.red("cannot draw a sample:"));
    for (const p of problems) console.log(`  - ${p}`);
    process.exitCode = 1;
    return;
  }
  const date = today();
  const n = td.batches.filter((b) => b.domain === domain && String(b.date) === date).length + 1;
  const batch = { id: `${date}-${domain}-${n}`, date, domain, drawnBy: by, lessons };
  const P = amd017Params();
  const verdictAt = (slug, ver) => tiers.worstAt(td.reviewsOf(slug), ver);
  let prev = false;
  for (const b of td.batches.filter((x) => x.domain === domain).sort((a, b) => String(a.date).localeCompare(String(b.date)) || String(a.id).localeCompare(String(b.id))))
    prev = tiers.batchState(b, verdictAt, P, prev).tripped;
  batch.sample = tiers.drawSample(batch, AMD017.sampleRate, prev);
  fs.mkdirSync(rel(tiers.BATCH_DIR), { recursive: true });
  writeJSON(rel(tiers.BATCH_DIR, `${batch.id}.json`), batch);
  console.log(`${tiers.BATCH_DIR}/${batch.id}.json: ${lessons.length} lesson(s); walk ${batch.sample.length}${prev ? " (stop rule: the previous batch tripped, so every lesson)" : ""}: ${batch.sample.join(", ")}`);
}

/** The claim and evidence floor, unchanged by AMD-013. Returns a list of failures. */
function claimGates(meta) {
  const fails = [];
  const open = meta.claims.filter((c) => c.status !== "verified" && c.status !== "withdrawn");
  if (meta.claims.length === 0) fails.push("no claims recorded: every lesson asserts something; write it down");
  if (open.length) fails.push(`claims not verified: ${open.map((c) => c.id).join(", ")}`);
  for (const c of meta.claims) {
    if (c.status === "verified" && (!c.checkedBy || !c.checkedOn)) fails.push(`${c.id} verified without checkedBy/checkedOn`);
    if (c.status === "verified" && c.checkedBy === meta.owner.builder) fails.push(`${c.id} verified by its own builder`);
  }
  if (!meta.evidence.qa?.length) fails.push("no computer-use QA record (company/reviews/...)");
  if (!meta.evidence.simulatedLearner?.length && !walkCover(meta).covered) fails.push("no borrowed-mind learner review");
  for (const k of ["qa", "simulatedLearner", "pairwise", "humanLearners"]) {
    for (const r of meta.evidence[k] ?? []) if (!exists(rel(r))) fails.push(`evidence.${k} points at missing file ${r}`);
  }
  if (meta.confidence === "**" && !(meta.evidence.humanLearners?.length > 0))
    fails.push('confidence "**" needs human-learner evidence; simulated learners are not learners');
  return fails;
}

function cmdCheck() {
  const errors = [];
  const warnings = [];
  const grandfathered = []; // AMD-013: published before the policy and still failing it
  const err = (where, msg) => errors.push(`${where}: ${msg}`);
  const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

  // Domains and curricula
  const domains = loadDomains();
  const domainIds = new Set(domains.map((d) => d.id));
  const curricula = {};
  for (const d of domains) {
    const cur = loadCurriculum(d.id);
    if (!cur) err(`content/curriculum/${d.id}.json`, "missing curriculum for domain");
    else {
      curricula[d.id] = cur;
      const ids = new Set();
      for (const c of cur.concepts ?? []) {
        if (ids.has(c.id)) err(`curriculum ${d.id}`, `duplicate concept ${c.id}`);
        ids.add(c.id);
        for (const p of c.prerequisites ?? []) {
          const [pd, pc] = p.includes(":") ? p.split(":") : [d.id, p];
          const target = pd === d.id ? cur : loadCurriculum(pd);
          if (!target || !(target.concepts ?? []).some((x) => x.id === pc)) err(`curriculum ${d.id}/${c.id}`, `unknown prerequisite ${p}`);
        }
      }
    }
    if (!exists(rel("company/roles", `${d.categoryManager}.md`))) err(`domain ${d.id}`, `category manager ${d.categoryManager} has no onboarding doc`);
    if (!exists(rel("company/domains", `${d.id}.md`))) err(`domain ${d.id}`, "missing category charter company/domains/<id>.md");
  }

  // Demos
  const demos = loadDemos();
  const slugs = new Set();
  const claimIds = new Set();
  for (const d of demos) {
    const where = `src/demos/${d.domainDir}/${d.slugDir}`;
    if (d.parseError) {
      err(where, `meta.json unreadable: ${d.parseError}`);
      continue;
    }
    const m = d.meta;
    for (const [k, t] of Object.entries(REQUIRED_META)) if (typeOf(m[k]) !== t) err(where, `meta.${k} should be ${t}`);
    if (errors.some((e) => e.startsWith(where))) continue;
    if (m.slug !== d.slugDir) err(where, `slug "${m.slug}" does not match directory`);
    if (m.domain !== d.domainDir) err(where, `domain "${m.domain}" does not match directory`);
    if (!domainIds.has(m.domain)) err(where, `unknown domain ${m.domain}`);
    if (slugs.has(m.slug)) err(where, "duplicate slug");
    slugs.add(m.slug);
    if (!["draft", "review", "published", "retired"].includes(m.status)) err(where, `bad status ${m.status}`);
    if (!["", "*", "**"].includes(m.confidence)) err(where, `confidence must be "", "*" or "**"`);
    if (m.hook.length > 90) err(where, `hook is ${m.hook.length} chars; the hook budget is 90`);
    if (m.durationSec > 120) warn(where, `durationSec ${m.durationSec} > 120: is this still one idea?`);
    const cur = curricula[m.domain];
    if (cur && !(cur.concepts ?? []).some((c) => c.id === m.concept)) err(where, `concept "${m.concept}" is not in content/curriculum/${m.domain}.json`);
    const dom = domains.find((x) => x.id === m.domain);
    if (dom && m.owner.categoryManager !== dom.categoryManager) err(where, `owner.categoryManager should be ${dom.categoryManager}`);
    if (!m.learner.knows?.length || !m.learner.doesNotKnow?.length) err(where, "learner knowledge boundary needs both knows and doesNotKnow");
    const r = m.recall;
    if (!r.question || !Array.isArray(r.options) || r.options.length < 2 || !(r.answer >= 0 && r.answer < r.options.length) || !r.why)
      err(where, "recall needs question, ≥2 options, a valid answer index and a why");
    for (const c of m.claims) {
      if (!c.id?.startsWith(`${m.domain}.${m.slug}.`)) err(where, `claim id "${c.id}" must start with ${m.domain}.${m.slug}.`);
      if (claimIds.has(c.id)) err(where, `duplicate claim id ${c.id}`);
      claimIds.add(c.id);
      if (!["derivation", "simulation", "source", "convention"].includes(c.support)) err(where, `${c.id} bad support ${c.support}`);
      if (!["unverified", "verified", "disputed", "withdrawn"].includes(c.status)) err(where, `${c.id} bad status ${c.status}`);
      if (!c.source?.trim()) err(where, `${c.id} has no source: a claim without a trail is a feather`);
    }
    const demoPath = path.join(d.dir, "Demo.tsx");
    if (!exists(demoPath)) err(where, "missing Demo.tsx");
    else {
      const src = fs.readFileSync(demoPath, "utf8");
      if (!src.includes("<Lesson")) err(where, "Demo.tsx must render <Lesson> (the predict → explore → reveal contract)");
      if (!/data-qa="control"|<Control|<Slider/.test(src)) err(where, "no stage controls found (Control, Slider or data-qa=\"control\")");
      if (/localStorage|sessionStorage/.test(src)) err(where, "demos must not touch storage directly; progress lives in the kit");
      if (/fetch\(|https?:\/\//.test(src.replace(/\/\/.*$/gm, ""))) warn(where, "network or URL in Demo.tsx: lessons should work offline");
    }
    if (m.status === "published") {
      for (const f of claimGates(m)) err(where, `published but fails gate: ${f}`);
      const rg = readinessGates(m);
      if (rg.length && READINESS_GRANDFATHERED.has(m.slug)) grandfathered.push(m.slug);
      else for (const f of rg) err(where, `published but fails gate: ${f}`);
    }
    if (m.status === "review" && m.claims.some((c) => c.status === "disputed")) warn(where, "in review with a disputed claim");
  }

  // Registry: fresh, and faithful to meta.json whatever the generator does
  const files = registryFiles(demos);
  for (const [file, src] of Object.entries(files))
    if (!exists(rel(file)) || fs.readFileSync(rel(file), "utf8") !== src) err(file, "stale: run `npm run registry`");
  for (const f of ls(rel("src/demos")).filter((f) => f.endsWith(".generated.ts")))
    if (!(`src/demos/${f}` in files)) err(`src/demos/${f}`, "generated file the generator no longer produces: delete it");
  const gen = Object.values(files).join("\n");
  const imported = new Set([...gen.matchAll(/from "\.\/([^/"]+)\/([^/"]+)\/meta\.json"/g)].map((x) => `${x[1]}/${x[2]}`));
  const onDisk = new Set(demos.filter((d) => d.meta && exists(path.join(d.dir, "Demo.tsx"))).map((d) => `${d.domainDir}/${d.slugDir}`));
  for (const k of onDisk) if (!imported.has(k)) err("src/demos/*.generated.ts", `lesson ${k} is not imported from its meta.json`);
  for (const k of imported) if (!onDisk.has(k)) err("src/demos/*.generated.ts", `imports ${k}, which is not a lesson on disk`);
  if (/\bstatus"?\s*:\s*["'`]/.test(gen)) err("src/demos/*.generated.ts", "generated code sets a status literal; status comes only from meta.json");

  // Rider R1 (W-946): each loader points at its own lesson's Demo, and metas and loaders never share a file.
  const loaderRe = /"([^"]+)":\s*\(\)\s*=>\s*import\("\.\/([^/"]+)\/([^/"]+)\/Demo"\)/g;
  const loaderList = [...gen.matchAll(loaderRe)].map((x) => [x[1], `${x[2]}/${x[3]}`]);
  const slugOf = new Map(demos.filter((d) => d.meta).map((d) => [`${d.domainDir}/${d.slugDir}`, d.meta.slug]));
  const loaderCount = new Map();
  for (const [, p] of loaderList) loaderCount.set(p, (loaderCount.get(p) ?? 0) + 1);
  for (const k of onDisk) if (loaderCount.get(k) !== 1) err("src/demos/*.generated.ts", `lesson ${k} needs exactly one loader (has ${loaderCount.get(k) ?? 0})`);
  for (const [slug, p] of loaderList) if (slugOf.get(p) !== slug || !onDisk.has(p)) err("src/demos/*.generated.ts", `loader "${slug}" points at ${p}, which is not that lesson's Demo`);
  if ((gen.match(/\bimport\s*\(/g) || []).length !== loaderList.length) err("src/demos/*.generated.ts", "import() in generated code that is not a lesson loader");
  for (const [file, src] of Object.entries(files))
    if (/from "\.\/[^"]+\/meta\.json"/.test(src) && /\bimport\s*\(/.test(src)) err(file, "a generated file must not hold both metas and loaders (W-946)");
  for (const [file, src] of Object.entries(files))
    if (/(from|import)\s*\(?\s*["'][^"']*\.generated(\.ts)?["']/.test(src)) err(file, "a generated file must not import another generated file (keeps invariant 5 transitive)");


  // Roles and agents: every agent has an onboarding doc and vice versa
  const agentFiles = ls(rel(".claude/agents")).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3));
  const roleFiles = ls(rel("company/roles")).filter((f) => f.endsWith(".md") && f !== "README.md" && !f.startsWith("_")).map((f) => f.slice(0, -3));
  for (const a of agentFiles) if (!roleFiles.includes(a)) err(`.claude/agents/${a}.md`, "agent has no onboarding doc in company/roles/");
  for (const r of roleFiles) {
    const doc = fs.readFileSync(rel("company/roles", `${r}.md`), "utf8");
    for (const h of ["## Mission", "## In scope", "## Out of scope", "## Authority", "## Inputs", "## Outputs", "## Day one"])
      if (!doc.includes(h)) err(`company/roles/${r}.md`, `onboarding doc missing section "${h}"`);
    const human = /^human:\s*true/m.test(doc);
    if (!human && !agentFiles.includes(r)) err(`company/roles/${r}.md`, "role has no agent definition in .claude/agents/ (or mark `human: true`)");
  }

  // Patterns
  for (const f of ls(rel("company/knowledge/patterns")).filter((f) => f.endsWith(".md") && f !== "README.md")) {
    const t = fs.readFileSync(rel("company/knowledge/patterns", f), "utf8");
    for (const k of ["id:", "confidence:", "context:", "therefore:", "would_be_wrong_if:"])
      if (!t.includes(k)) err(`company/knowledge/patterns/${f}`, `pattern missing "${k}"`);
  }

  // Decisions carry their objections
  for (const f of ls(rel("company/decisions")).filter((f) => /^\d{4}-.+\.md$/.test(f))) {
    const t = fs.readFileSync(rel("company/decisions", f), "utf8");
    if (!t.includes("## Objections")) err(`company/decisions/${f}`, 'decision record needs an "## Objections" section (write "none raised" if so)');
    if (!/^owner:/m.test(t)) err(`company/decisions/${f}`, "decision record needs an owner: line");
  }

  // Experiments: prediction committed before result
  for (const f of ls(rel("company/experiments")).filter((f) => /^EXP-.+\.md$/.test(f))) {
    const t = fs.readFileSync(rel("company/experiments", f), "utf8");
    const pred = t.indexOf("## Committed prediction");
    const res = t.indexOf("## Result");
    if (pred < 0) err(`company/experiments/${f}`, "missing committed prediction");
    if (res >= 0 && res < pred) err(`company/experiments/${f}`, "result section precedes the prediction");
    if (!/would_be_wrong_if:/.test(t)) err(`company/experiments/${f}`, "missing would_be_wrong_if");
  }

  // Constitution
  if (!exists(rel("company/constitution/protected-paths.txt"))) err("company/constitution", "protected-paths.txt missing");

  // Board
  const board = loadBoard();
  const ids = new Set();
  for (const it of board.items) {
    if (ids.has(it.id)) err("company/ops/board.json", `duplicate id ${it.id}`);
    ids.add(it.id);
    if (!["backlog", "next", "doing", "review", "done", "dropped"].includes(it.state)) err("company/ops/board.json", `${it.id} bad state ${it.state}`);
    if (!it.owner) err("company/ops/board.json", `${it.id} has no owner`);
  }

  if (grandfathered.length)
    warn("readiness (AMD-013)", `${grandfathered.length} grandfathered published lesson(s) still fail readiness: ${grandfathered.slice(0, 6).join(", ")}${grandfathered.length > 6 ? ", …" : ""} (measure.mjs in company/constitution/amendments/AMD-013-one-readiness/ lists why)`);
  const nowPass = [...READINESS_GRANDFATHERED].filter((slug) => !grandfathered.includes(slug) && demos.some((d) => d.meta?.slug === slug && d.meta.status === "published"));
  if (nowPass.length) warn("readiness (AMD-013)", `${nowPass.length} grandfathered lesson(s) now pass readiness; drop them from READINESS_GRANDFATHERED at the next amendment: ${nowPass.slice(0, 6).join(", ")}`);
  {
    // AMD-017: canary, batch records, and the (c)-(e) side-by-side count for lessons in review.
    const canary = tiersCanary();
    if (canary) warn("tiers (AMD-017)", canary);
    for (const b of tierData().batches) if (!b.id || !b.domain || !Array.isArray(b.lessons) || !b.drawnBy) err(`${tiers.BATCH_DIR}/${b._file}`, "batch record needs id, domain, lessons and drawnBy");
    const inReview = demos.filter((d) => d.meta?.status === "review");
    const stopped = inReview.filter((d) => tierEvidence(d.meta).length);
    if (!AMD017_EVIDENCE_ENFORCED && stopped.length)
      warn("tiers (AMD-017)", `side-by-side: ${stopped.length} of ${inReview.length} lesson(s) in review would be stopped by (c)-(e) once enforced: ${stopped.slice(0, 6).map((d) => d.meta.slug).join(", ")}${stopped.length > 6 ? ", …" : ""}`);
  }
  for (const w of warnings) console.log(color.yellow("warn  ") + w);
  for (const e of errors) console.log(color.red("error ") + e);
  console.log(
    errors.length
      ? color.red(`\ncheck failed: ${errors.length} error(s), ${warnings.length} warning(s)`)
      : color.green(`check passed: ${demos.length} lessons, ${claimIds.size} claims, ${roleFiles.length} roles, ${warnings.length} warning(s)`),
  );
  process.exitCode = errors.length ? 1 : 0;
}

// ---------------------------------------------------------------- coverage

function coverage() {
  const demos = loadDemos().filter((d) => d.meta && d.meta.status !== "retired");
  return loadDomains().map((dom) => {
    const cur = loadCurriculum(dom.id) ?? { concepts: [] };
    const concepts = cur.concepts.map((c) => {
      const lessons = demos.filter((d) => d.meta.domain === dom.id && d.meta.concept === c.id).map((d) => d.meta);
      return { ...c, lessons };
    });
    const covered = concepts.filter((c) => c.lessons.length > 0).length;
    const published = concepts.filter((c) => c.lessons.some((l) => l.status === "published")).length;
    const unmet = concepts.filter((c) => c.lessons.length === 0).sort((a, b) => (b.demand ?? 0) - (a.demand ?? 0));
    return { dom, concepts, covered, published, total: concepts.length, unmet };
  });
}

function cmdCoverage(domainId) {
  for (const row of coverage()) {
    if (domainId && row.dom.id !== domainId) continue;
    console.log(color.bold(`\n${row.dom.name} (${row.dom.id}) — ${row.covered}/${row.total} concepts have a lesson, ${row.published} published · owner ${row.dom.categoryManager}`));
    for (const c of row.concepts) {
      const mark = c.lessons.some((l) => l.status === "published") ? color.green("●") : c.lessons.length ? color.yellow("◐") : "○";
      const demand = "▮".repeat(c.demand ?? 0).padEnd(3, "·");
      console.log(`  ${mark} ${demand} ${c.id.padEnd(30)} ${c.lessons.map((l) => `${l.slug} [${l.status}]`).join(", ")}`);
    }
  }
  console.log(color.dim("\n● published  ◐ in progress  ○ unmet demand   ▮ demand (1–3, set by the category manager)"));
}

// ---------------------------------------------------------------- claims

function cmdClaims(args) {
  const onlyOpen = args.includes("--open");
  for (const d of loadDemos()) {
    if (!d.meta) continue;
    for (const c of d.meta.claims) {
      if (onlyOpen && (c.status === "verified" || c.status === "withdrawn")) continue;
      const s = c.status === "verified" ? color.green(c.status) : c.status === "disputed" ? color.red(c.status) : color.yellow(c.status);
      console.log(`${c.id.padEnd(44)} ${s.padEnd(12)} ${c.support.padEnd(11)} ${c.text}`);
      console.log(color.dim(`${"".padEnd(44)} source: ${c.source}${c.checkedBy ? ` · checked by ${c.checkedBy} on ${c.checkedOn}` : ""}`));
    }
  }
}

// ---------------------------------------------------------------- rituals

function ritualTable() {
  const recs = ritualRecords();
  return Object.entries(RITUALS).map(([name, r]) => {
    const mine = recs.filter((x) => x.name === name).sort((a, b) => a.date.localeCompare(b.date));
    const last = mine.at(-1)?.date ?? null;
    let due = null;
    let overdue = false;
    if (r.cadenceDays) {
      const base = last ? new Date(last) : null;
      if (base) {
        const d = new Date(base.getTime() + r.cadenceDays * 86_400_000);
        due = d.toISOString().slice(0, 10);
        overdue = due < today();
      } else {
        due = "now";
        overdue = true;
      }
    }
    return { name, ...r, last, due, overdue, count: mine.length };
  });
}

function cmdRituals() {
  console.log(color.bold("ritual".padEnd(24) + "cadence".padEnd(10) + "last".padEnd(13) + "next due"));
  for (const r of ritualTable()) {
    const due = r.cadenceDays ? (r.overdue ? color.red(r.due + " (overdue)") : r.due) : color.dim("on event");
    console.log(`${r.name.padEnd(24)}${(r.cadenceDays ? r.cadenceDays + "d" : "—").padEnd(10)}${(r.last ?? "never").padEnd(13)}${due}`);
  }
}

function cmdRitual(name) {
  if (!name || !RITUALS[name]) {
    console.log(`usage: ritual <${Object.keys(RITUALS).join("|")}>`);
    process.exitCode = 1;
    return;
  }
  const tpl = rel("company/rituals/templates", `${name}.md`);
  if (!exists(tpl)) {
    console.log(`no template at company/rituals/templates/${name}.md`);
    process.exitCode = 1;
    return;
  }
  const dir = rel("company/rituals/records");
  fs.mkdirSync(dir, { recursive: true });
  let file = path.join(dir, `${today()}-${name}.md`);
  for (let n = 2; exists(file); n++) file = path.join(dir, `${today()}-${name}-${n}.md`);
  let body = fs.readFileSync(tpl, "utf8").replaceAll("{{date}}", today());
  if (body.includes("{{snapshot}}")) body = body.replace("{{snapshot}}", snapshotMarkdown());
  fs.writeFileSync(file, body);
  console.log(`started ${path.relative(ROOT, file)}`);
}

// ---------------------------------------------------------------- status

function snapshotMarkdown() {
  const demos = loadDemos().filter((d) => d.meta);
  const by = (s) => demos.filter((d) => d.meta.status === s).length;
  const openClaims = demos.flatMap((d) => d.meta.claims).filter((c) => c.status === "unverified" || c.status === "disputed");
  const cov = coverage();
  const lines = [];
  lines.push(`Generated by \`company status\` on ${today()}. Numbers are counts from the repository, not learning outcomes.`);
  lines.push("");
  lines.push(`| Lessons | draft | review | published | retired | open claims |`);
  lines.push(`|---|---|---|---|---|---|`);
  lines.push(`| ${demos.length} | ${by("draft")} | ${by("review")} | ${by("published")} | ${by("retired")} | ${openClaims.length} |`);
  lines.push("");
  lines.push(`| Domain | Owner | Concepts with a lesson | Published | Top unmet demand |`);
  lines.push(`|---|---|---|---|---|`);
  for (const r of cov) lines.push(`| ${r.dom.name} | ${r.dom.categoryManager} | ${r.covered}/${r.total} | ${r.published} | ${r.unmet.slice(0, 2).map((c) => c.id).join(", ") || "—"} |`);
  return lines.join("\n");
}

function cmdStatus() {
  const demos = loadDemos().filter((d) => d.meta);
  const by = (s) => demos.filter((d) => d.meta.status === s).length;
  console.log(color.bold("System 3 Company — operating picture") + color.dim(`  (${today()})`));
  console.log(`\nLessons: ${demos.length} total · ${by("draft")} draft · ${by("review")} review · ${color.green(by("published") + " published")} · ${by("retired")} retired`);

  const open = demos.flatMap((d) => d.meta.claims.map((c) => ({ ...c, slug: d.meta.slug }))).filter((c) => c.status === "unverified" || c.status === "disputed");
  console.log(`Claims awaiting the fact-checker: ${open.length ? color.yellow(open.length) : 0}${open.some((c) => c.status === "disputed") ? color.red(" (some disputed)") : ""}`);

  const blocked = demos.filter((d) => d.meta.status === "review").map((d) => ({ slug: d.meta.slug, gates: launchGates(d.meta) }));
  const ready = blocked.filter((b) => b.gates.length === 0);
  if (ready.length) console.log(color.green(`Ready to publish: ${ready.map((r) => r.slug).join(", ")}`));
  const notReady = blocked.filter((b) => b.gates.length);
  if (notReady.length) {
    console.log("In review, blocked by gates:");
    for (const b of notReady) console.log(`  ${b.slug}: ${b.gates[0]}${b.gates.length > 1 ? color.dim(` (+${b.gates.length - 1} more)`) : ""}`);
  }

  console.log(color.bold("\nCoverage"));
  for (const r of coverage()) {
    const bar = "█".repeat(r.published) + "▒".repeat(r.covered - r.published) + "░".repeat(Math.max(0, r.total - r.covered));
    console.log(`  ${r.dom.short.padEnd(12)} ${bar.padEnd(16)} ${String(r.covered).padStart(2)}/${r.total}  next: ${r.unmet[0]?.id ?? "—"}${r.dom.status !== "active" ? color.dim(` [${r.dom.status}]`) : ""}`);
  }

  const board = loadBoard();
  const st = (s) => board.items.filter((i) => i.state === s);
  console.log(color.bold("\nBoard") + `  doing ${st("doing").length} · review ${st("review").length} · next ${st("next").length} · backlog ${st("backlog").length}`);
  for (const i of [...st("doing"), ...st("review")]) console.log(`  [${i.state}] ${i.id} ${i.title} ${color.dim("— " + i.owner)}`);

  const overdue = ritualTable().filter((r) => r.overdue);
  console.log(color.bold("\nRituals") + (overdue.length ? color.red(`  overdue: ${overdue.map((r) => r.name).join(", ")}`) : color.green("  all on cadence")));

  const progress = rel("company/ops/progress.md");
  if (exists(progress)) {
    const t = fs.readFileSync(progress, "utf8");
    const first = t.split(/\n## (?=\d{4}-\d{2}-\d{2})/).slice(1, 2)[0];
    if (first) console.log(color.bold("\nLast handoff") + "\n  " + first.split("\n").slice(0, 6).join("\n  "));
  }
  console.log(color.dim("\nNext: `company check` before you push. Full detail: `company coverage`, `company claims --open`, `company rituals`."));
}

// ---------------------------------------------------------------- new-demo

function cmdNewDemo(domain, slug) {
  if (!domain || !slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    console.log("usage: new-demo <domain> <kebab-case-slug>");
    process.exitCode = 1;
    return;
  }
  const dom = loadDomains().find((d) => d.id === domain);
  if (!dom) {
    console.log(`unknown domain ${domain}`);
    process.exitCode = 1;
    return;
  }
  const dir = rel("src/demos", domain, slug);
  if (exists(dir)) {
    console.log(`${path.relative(ROOT, dir)} already exists`);
    process.exitCode = 1;
    return;
  }
  fs.mkdirSync(dir, { recursive: true });
  const tplDir = rel("tools/templates");
  fs.writeFileSync(path.join(dir, "Demo.tsx"), fs.readFileSync(path.join(tplDir, "Demo.tsx.tpl"), "utf8"));
  const meta = readJSON(path.join(tplDir, "meta.json.tpl"));
  meta.slug = slug;
  meta.domain = domain;
  meta.owner.categoryManager = dom.categoryManager;
  meta.claims = meta.claims.map((c, i) => ({ ...c, id: `${domain}.${slug}.c${i + 1}` }));
  writeJSON(path.join(dir, "meta.json"), meta);
  cmdRegistry({ quiet: true });
  console.log(`created ${path.relative(ROOT, dir)}/{Demo.tsx,meta.json}. Fill the brief fields first; build second.`);
}

// ---------------------------------------------------------------- publish

function cmdPublish(slug) {
  const d = loadDemos().find((x) => x.meta?.slug === slug);
  if (!d) {
    console.log(`no lesson ${slug}`);
    process.exitCode = 1;
    return;
  }
  const fails = launchGates(d.meta);
  const wc = walkCover(d.meta);
  console.log(color.dim(`tier ${wc.tier ?? "?"} (${wc.why ?? ""}); learner walk: ${wc.covered ? `covered by batch ${wc.batch}` : wc.reason}`));
  if (!AMD017_EVIDENCE_ENFORCED) for (const w of tierEvidence(d.meta)) console.log(color.yellow(`  AMD-017 side-by-side (not yet enforced): ${w}`));
  if (fails.length) {
    console.log(color.red(`${slug} cannot publish:`));
    for (const f of fails) console.log(`  - ${f}`);
    process.exitCode = 1;
    return;
  }
  d.meta.status = "published";
  writeJSON(d.metaPath, d.meta);
  console.log(color.green(`${slug} published. Record the launch review in company/rituals/records/.`));
}

// ---------------------------------------------------------------- board

function cmdBoard(args) {
  const p = rel("company/ops/board.json");
  const board = loadBoard();
  const [sub, ...rest] = args;
  if (sub === "add") {
    const title = rest.filter((a) => !a.startsWith("--")).join(" ");
    const opt = (k) => rest.find((a) => a.startsWith(`--${k}=`))?.split("=")[1];
    const n = board.items.reduce((m, i) => Math.max(m, Number(i.id.split("-")[1]) || 0), 0) + 1;
    const item = { id: `W-${String(n).padStart(3, "0")}`, title, owner: opt("owner") ?? "chief-of-staff", state: opt("state") ?? "backlog", domain: opt("domain") ?? null, created: today(), links: [] };
    board.items.push(item);
    writeJSON(p, board);
    console.log(`added ${item.id}`);
    return;
  }
  if (sub === "move") {
    const [id, state] = rest;
    const it = board.items.find((i) => i.id === id);
    if (!it) {
      console.log(`no item ${id}`);
      process.exitCode = 1;
      return;
    }
    it.state = state;
    it.updated = today();
    writeJSON(p, board);
    console.log(`${id} → ${state}`);
    return;
  }
  for (const s of ["doing", "review", "next", "backlog", "done"]) {
    const items = board.items.filter((i) => i.state === s);
    if (!items.length) continue;
    console.log(color.bold(`\n${s} (${items.length})`));
    for (const i of items) console.log(`  ${i.id} ${i.title} ${color.dim(`— ${i.owner}${i.domain ? " · " + i.domain : ""}`)}`);
  }
}

// ---------------------------------------------------------------- roles

function cmdRoles() {
  const dir = rel("company/roles");
  for (const f of ls(dir).filter((f) => f.endsWith(".md") && f !== "README.md" && !f.startsWith("_"))) {
    const t = fs.readFileSync(path.join(dir, f), "utf8");
    const title = t.match(/^# (.+)$/m)?.[1] ?? f;
    const team = t.match(/^team:\s*(.+)$/m)?.[1] ?? "";
    const scope = t.split("## Mission")[1]?.trim().split("\n")[0] ?? "";
    console.log(`${color.bold(f.slice(0, -3).padEnd(26))} ${team.padEnd(12)} ${title}\n${"".padEnd(27)}${color.dim(scope.slice(0, 110))}`);
  }
}

// ---------------------------------------------------------------- qa-record

function cmdQaRecord() {
  const out = process.env.QA_OUT || "test-results";
  const reportPath = rel(out, "qa-report.json");
  if (!exists(reportPath)) {
    console.log(`no report at ${out}/qa-report.json: run \`npm run qa\` first`);
    process.exitCode = 1;
    return;
  }
  const report = readJSON(reportPath);
  const bySlug = {};
  const walk = (suite, trail) => {
    for (const s of suite.suites ?? []) walk(s, [...trail, s.title]);
    for (const spec of suite.specs ?? []) {
      if (!trail.some((t) => t.endsWith("contract.spec.ts"))) continue;
      const slug = trail.at(-1);
      for (const t of spec.tests ?? []) {
        const last = t.results?.at(-1);
        (bySlug[slug] ??= []).push({
          project: t.projectName,
          status: last?.status ?? "unknown",
          retries: Math.max(0, (t.results?.length ?? 1) - 1),
          error: last?.error?.message?.split("\n").slice(0, 3).join(" ").replace(/\x1b\[[0-9;]*m/g, "") ?? "",
        });
      }
    }
  };
  walk(report, []);
  const demos = loadDemos();
  for (const [slug, runs] of Object.entries(bySlug)) {
    const d = demos.find((x) => x.meta?.slug === slug);
    if (!d) continue;
    const passed = runs.length > 0 && runs.every((r) => r.status === "passed" && r.retries === 0);
    const dir = rel("company/reviews", slug);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${today()}-qa.md`);
    const body = [
      `# Computer-use QA: ${slug}`,
      "",
      `date: ${today()} · harness: tests/qa/contract.spec.ts · recorded by: qa-tester (company qa-record) · lesson version: v${d.meta.version ?? 1} · result: **${passed ? "pass" : "fail"}**`,
      "",
      "| Viewport | Result | Retries | First error |",
      "|---|---|---|---|",
      ...runs.map((r) => `| ${r.project} | ${r.status} | ${r.retries} | ${r.error.replace(/\|/g, "/").slice(0, 160) || "—"} |`),
      "",
      `Screenshots: \`artifacts/qa/${slug}/\` (not committed; regenerate with \`QA_ONLY=${slug} npm run qa\`).`,
      "",
      "A pass means the contract held in a browser. It is not evidence that anyone learned.",
      "",
    ].join("\n");
    fs.writeFileSync(file, body);
    const relFile = path.relative(ROOT, file);
    if (passed && !d.meta.evidence.qa.includes(relFile)) {
      d.meta.evidence.qa.push(relFile);
      writeJSON(d.metaPath, d.meta);
    }
    console.log(`${passed ? color.green("pass") : color.red("fail")} ${slug} → ${relFile}`);
  }
}

// ---------------------------------------------------------------- main

const [cmd, ...args] = process.argv.slice(2);
const commands = {
  status: () => cmdStatus(),
  check: () => cmdCheck(),
  registry: () => cmdRegistry(),
  coverage: () => cmdCoverage(args[0]),
  claims: () => cmdClaims(args),
  "new-demo": () => cmdNewDemo(args[0], args[1]),
  publish: () => cmdPublish(args[0]),
  sample: () => cmdSample(args),
  ritual: () => cmdRitual(args[0]),
  rituals: () => cmdRituals(),
  board: () => cmdBoard(args),
  roles: () => cmdRoles(),
  "qa-record": () => cmdQaRecord(),
};
if (!cmd || !commands[cmd]) {
  console.log(fs.readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n").slice(1, 20).map((l) => l.replace(/^\/\/ ?/, "")).join("\n"));
  process.exitCode = cmd ? 1 : 0;
} else commands[cmd]();

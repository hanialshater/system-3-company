#!/usr/bin/env node
// Bradley-Terry leaderboard over pairwise lesson judgements.
//
//   npm run eval                         read company/evaluation/pairwise/*.jsonl, write
//                                        src/app/hq/evaluation/leaderboard.generated.json
//   node tools/eval/bt.mjs --dir=<d> --out=<f> --demos=<d> --criteria=<f> --seed=<n> --resamples=<n>
//
// MODEL. P(i beats j) = p_i / (p_i + p_j). Strengths are fitted by the MM algorithm
// (Hunter 2004, "MM algorithms for generalized Bradley-Terry models"):
//     p_i  <-  W_i / sum_j  n_ij / (p_i + p_j)
// where W_i is i's wins (a tie counts as half a win to each side) and n_ij the number of
// comparisons of i with j. A tie is a comparison with 0.5 / 0.5.
//
// PRIOR. Plain BT has no finite maximum for an undefeated (or winless) item, and strengths
// of disconnected components are not comparable. So every item also has one virtual tie
// against a fixed reference of strength 1 (it adds 0.5 to W_i and 1/(p_i+1) to the
// denominator). This is a weak ridge toward the reference: an item's strength is always finite
// and positive, the reference fixes the scale, and a disconnected component is pulled toward
// the same centre rather than floating free. Because the reference is a prior and not data,
// "disconnected" is still reported from the real comparison graph.
//
// RATING. 1000 + 400*log10(p), shifted so the mean over the scope's items is 1000.
// INTERVAL. Percentile 95% interval from a bootstrap over records (default 200 resamples,
// seeded mulberry32), refitting each resample and re-centring over the same item set.
// Intervals are honest about few comparisons but not exact; read them as rough.
// SCOPES. One fit per criterion. Plus "overall", which pools all criteria: it is DIAGNOSTIC ONLY
// (decision of the head of evaluation, company/evaluation/README.md "Overall"). It is marked
// `diagnostic: true`, is not listed in `criteria`, gets no next-pair suggestions, and its bootstrap
// resamples whole JUDGEMENTS (one judge on one shown pair in one run = up to 6 lines), not lines,
// because a judge's lines on one pair are not independent comparisons. (Measured on round 1: this
// widened the extremes but NARROWED most mid-table items, whose judgements split across criteria;
// with 2-4 judgements per lesson the cluster bootstrap is itself rough. Still diagnostic.)
// EXCLUSIONS. company/evaluation/exclusions.json lists record ids the head of evaluation excluded
// from the fit, each with a reason (protocol rule 6). Excluded records stay in the .jsonl files and
// are counted and listed in the output; they are only left out of the fits.
// FLAGS. company/evaluation/flags.json holds caveats per criterion (head of evaluation edits it);
// they are copied into the output so HQ shows them next to the ranks.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const ITEM_RE = /^[a-z0-9][a-z0-9-]*@v\d+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
export const DEFAULT_SEED = 20261014;
export const DEFAULT_RESAMPLES = 200;
export const OVERALL = "overall";
export const DIAGNOSTIC_NOTE =
  "Diagnostic only, never shown in HQ or used for ranking (head of evaluation, 2026-10-14). Pools all criteria with equal weight, which is not an approved definition of best. Intervals resample whole judgements; with 2-4 judgements per lesson that bootstrap is rough, and where a judge split a pair across criteria it can be narrower than the per-line one.";

// ---------- parsing and validation ----------
export function parseRecords(files, criteriaIds) {
  const records = [];
  const errors = [];
  const seenIds = new Set();
  for (const { name, text } of files) {
    text.split("\n").forEach((raw, idx) => {
      const line = raw.trim();
      if (!line) return;
      const where = `${name}:${idx + 1}`;
      let r;
      try {
        r = JSON.parse(line);
      } catch {
        return errors.push(`${where}: not valid JSON`);
      }
      if (!r || typeof r !== "object" || Array.isArray(r)) return errors.push(`${where}: not an object`);
      const bad = [];
      if (typeof r.id !== "string" || !r.id) bad.push("id missing");
      else if (seenIds.has(r.id)) bad.push(`duplicate id ${r.id}`);
      if (typeof r.date !== "string" || !DATE_RE.test(r.date)) bad.push("date must be YYYY-MM-DD");
      if (typeof r.judge !== "string" || !r.judge) bad.push("judge missing");
      if (!criteriaIds.includes(r.criterion)) bad.push(`unknown criterion ${JSON.stringify(r.criterion)}`);
      for (const k of ["a", "b"]) if (typeof r[k] !== "string" || !ITEM_RE.test(r[k])) bad.push(`${k} must look like slug@v<n>`);
      if (!bad.length && r.a === r.b) bad.push("a and b are the same item");
      if (!["a", "b", "tie"].includes(r.winner)) bad.push("winner must be a, b or tie");
      if (bad.length) return errors.push(`${where}: ${bad.join("; ")}`);
      seenIds.add(r.id);
      records.push({ id: r.id, date: r.date, judge: r.judge, criterion: r.criterion, a: r.a, b: r.b, winner: r.winner, blind: r.blind === true, reason: r.reason ?? "" });
    });
  }
  return { records, errors };
}

// ---------- the fit ----------
// records: [{a,b,winner}]; items: string[]. Returns Map item -> strength (reference = 1).
export function fitBT(records, items, { maxIter = 5000, tol = 1e-10 } = {}) {
  const idx = new Map(items.map((x, i) => [x, i]));
  const n = items.length;
  const wins = new Array(n).fill(0.5); // the prior's half win
  const pairs = new Map(); // "i,j" (i<j) -> count
  for (const r of records) {
    const i = idx.get(r.a);
    const j = idx.get(r.b);
    if (i === undefined || j === undefined) continue;
    const sa = r.winner === "a" ? 1 : r.winner === "b" ? 0 : 0.5;
    wins[i] += sa;
    wins[j] += 1 - sa;
    const key = i < j ? `${i},${j}` : `${j},${i}`;
    pairs.set(key, (pairs.get(key) ?? 0) + 1);
  }
  const nbr = Array.from({ length: n }, () => []);
  for (const [key, c] of pairs) {
    const [i, j] = key.split(",").map(Number);
    nbr[i].push([j, c]);
    nbr[j].push([i, c]);
  }
  let p = new Array(n).fill(1);
  for (let it = 0; it < maxIter; it++) {
    const q = new Array(n);
    let delta = 0;
    for (let i = 0; i < n; i++) {
      let den = 1 / (p[i] + 1); // virtual tie against the reference
      for (const [j, c] of nbr[i]) den += c / (p[i] + p[j]);
      q[i] = wins[i] / den;
      delta = Math.max(delta, Math.abs(q[i] - p[i]) / p[i]);
    }
    p = q;
    if (delta < tol) break;
  }
  return new Map(items.map((x, i) => [x, p[i]]));
}

export const toRating = (p) => 1000 + 400 * Math.log10(p);

function centredRatings(strengths, items) {
  const raw = items.map((x) => toRating(strengths.get(x)));
  const mean = raw.reduce((s, v) => s + v, 0) / (raw.length || 1);
  return new Map(items.map((x, i) => [x, raw[i] - mean + 1000]));
}

export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const quantile = (sorted, q) => {
  if (!sorted.length) return NaN;
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
};

// Connected components of the real comparison graph. Returns Map item -> component index (0 = largest).
export function components(records, items) {
  const parent = new Map(items.map((x) => [x, x]));
  const find = (x) => {
    while (parent.get(x) !== x) {
      parent.set(x, parent.get(parent.get(x)));
      x = parent.get(x);
    }
    return x;
  };
  for (const r of records) parent.set(find(r.a), find(r.b));
  const groups = new Map();
  for (const x of items) {
    const root = find(x);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(x);
  }
  const ordered = [...groups.values()].sort((g, h) => h.length - g.length || (g[0] < h[0] ? -1 : 1));
  const out = new Map();
  ordered.forEach((g, i) => g.forEach((x) => out.set(x, i)));
  return out;
}

// The resampling unit for the overall scope: one judge's judgement of one shown pair in one run.
// The run is the id without its trailing counter ("round-1-42" -> "round-1").
export const judgementKey = (r) => `${String(r.id ?? "").replace(/-\d+$/, "")}|${r.judge}|${r.a}|${r.b}`;

// One scope (a criterion, or overall): ratings, intervals, counts.
// cluster: optional record -> key. When given, the bootstrap resamples whole clusters (with
// replacement, as many clusters as there are) instead of single records.
export function analyseScope(records, { seed = DEFAULT_SEED, resamples = DEFAULT_RESAMPLES, cluster = null } = {}) {
  const items = [...new Set(records.flatMap((r) => [r.a, r.b]))].sort();
  if (!items.length) return [];
  const fit = fitBT(records, items);
  const rating = centredRatings(fit, items);
  const rng = mulberry32(seed);
  const samples = new Map(items.map((x) => [x, []]));
  let groups = null;
  if (cluster) {
    const g = new Map();
    for (const r of records) {
      const k = cluster(r);
      if (!g.has(k)) g.set(k, []);
      g.get(k).push(r);
    }
    groups = [...g.values()];
  }
  for (let b = 0; b < resamples; b++) {
    const boot = groups
      ? Array.from({ length: groups.length }, () => groups[Math.floor(rng() * groups.length)]).flat()
      : Array.from({ length: records.length }, () => records[Math.floor(rng() * records.length)]);
    const rr = centredRatings(fitBT(boot, items), items);
    for (const x of items) samples.get(x).push(rr.get(x));
  }
  const comp = components(records, items);
  const stat = new Map(items.map((x) => [x, { comparisons: 0, wins: 0, losses: 0, ties: 0, opp: new Set() }]));
  for (const r of records) {
    const A = stat.get(r.a);
    const B = stat.get(r.b);
    A.comparisons++;
    B.comparisons++;
    A.opp.add(r.b);
    B.opp.add(r.a);
    if (r.winner === "tie") (A.ties++, B.ties++);
    else if (r.winner === "a") (A.wins++, B.losses++);
    else (B.wins++, A.losses++);
  }
  return items
    .map((x) => {
      const s = samples.get(x).sort((u, v) => u - v);
      const st = stat.get(x);
      return {
        item: x,
        rating: round(rating.get(x)),
        lo: round(quantile(s, 0.025)),
        hi: round(quantile(s, 0.975)),
        comparisons: st.comparisons,
        wins: st.wins,
        losses: st.losses,
        ties: st.ties,
        opponents: st.opp.size,
        disconnected: comp.get(x) !== 0,
      };
    })
    .sort((u, v) => v.rating - u.rating || (u.item < v.item ? -1 : 1));
}
const round = (v) => Math.round(v * 10) / 10;

// Raw agreement where two judges judged the same pair on the same criterion (each judge's latest record).
export function judgeAgreement(records) {
  const groups = new Map();
  for (const r of records) {
    const flip = r.a > r.b;
    const [x, y] = flip ? [r.b, r.a] : [r.a, r.b];
    const out = r.winner === "tie" ? "tie" : (r.winner === "a") !== flip ? "x" : "y";
    const key = `${r.criterion}|${x}|${y}`;
    if (!groups.has(key)) groups.set(key, new Map());
    const g = groups.get(key);
    const prev = g.get(r.judge);
    if (!prev || r.date >= prev.date) g.set(r.judge, { date: r.date, out });
  }
  let n = 0;
  let agree = 0;
  const byPair = new Map();
  for (const g of groups.values()) {
    const js = [...g.keys()].sort();
    for (let i = 0; i < js.length; i++)
      for (let k = i + 1; k < js.length; k++) {
        const same = g.get(js[i]).out === g.get(js[k]).out;
        n++;
        if (same) agree++;
        const key = `${js[i]} / ${js[k]}`;
        const e = byPair.get(key) ?? { judges: [js[i], js[k]], n: 0, agree: 0 };
        e.n++;
        if (same) e.agree++;
        byPair.set(key, e);
      }
  }
  return {
    comparable: n,
    agree,
    rate: n ? Math.round((agree / n) * 1000) / 1000 : null,
    byJudgePair: [...byPair.values()].map((e) => ({ ...e, rate: Math.round((e.agree / e.n) * 1000) / 1000 })),
  };
}

// Adjacent items (by rating) whose intervals overlap, preferring pairs with few direct comparisons.
export function suggestPairs(rows, records, limit = 5) {
  const direct = new Map();
  for (const r of records) {
    const k = r.a < r.b ? `${r.a}|${r.b}` : `${r.b}|${r.a}`;
    direct.set(k, (direct.get(k) ?? 0) + 1);
  }
  const out = [];
  for (let i = 0; i + 1 < rows.length; i++) {
    const hi = rows[i];
    const lo = rows[i + 1];
    const overlap = Math.min(hi.hi, lo.hi) - Math.max(hi.lo, lo.lo);
    if (overlap <= 0) continue;
    const width = Math.max(hi.hi - hi.lo, lo.hi - lo.lo, 1);
    const k = hi.item < lo.item ? `${hi.item}|${lo.item}` : `${lo.item}|${hi.item}`;
    const n = direct.get(k) ?? 0;
    out.push({ a: hi.item, b: lo.item, overlap: round(overlap), direct: n, score: Math.round((Math.min(overlap / width, 1) / (1 + n)) * 1000) / 1000 });
  }
  return out.sort((u, v) => v.score - u.score || (u.a < v.a ? -1 : 1)).slice(0, limit);
}

// ---------- metadata ----------
export function loadMeta(demosDir) {
  const out = new Map();
  if (!fs.existsSync(demosDir)) return out;
  for (const domain of fs.readdirSync(demosDir, { withFileTypes: true })) {
    if (!domain.isDirectory()) continue;
    for (const lesson of fs.readdirSync(path.join(demosDir, domain.name), { withFileTypes: true })) {
      const f = path.join(demosDir, domain.name, lesson.name, "meta.json");
      if (!lesson.isDirectory() || !fs.existsSync(f)) continue;
      try {
        const m = JSON.parse(fs.readFileSync(f, "utf8"));
        out.set(m.slug ?? lesson.name, { title: m.title ?? lesson.name, domain: m.domain ?? domain.name, status: m.status ?? "unknown", version: m.version ?? null, strand: m.curriculum?.strand ?? null });
      } catch {
        /* unreadable meta: the item shows without metadata */
      }
    }
  }
  return out;
}

// ---------- exclusions and flags (head of evaluation's files) ----------
// exclusions.json: {"exclude":[{"id":"<record id>","reason":"<why>","round":"<run>"}]}.
// An entry without an id or a non-empty reason is invalid and NOT applied (an exclusion must say why).
export function parseExclusions(doc) {
  const list = Array.isArray(doc?.exclude) ? doc.exclude : [];
  const valid = [];
  const invalid = [];
  const seen = new Set();
  list.forEach((e, i) => {
    const bad = [];
    if (!e || typeof e !== "object") bad.push("not an object");
    else {
      if (typeof e.id !== "string" || !e.id) bad.push("id missing");
      else if (seen.has(e.id)) bad.push(`duplicate id ${e.id}`);
      if (typeof e.reason !== "string" || !e.reason.trim()) bad.push("reason missing");
    }
    if (bad.length) return invalid.push(`exclude[${i}]: ${bad.join("; ")}`);
    seen.add(e.id);
    valid.push({ id: e.id, reason: e.reason.trim(), round: typeof e.round === "string" ? e.round : null });
  });
  if (doc && !Array.isArray(doc.exclude) && doc.exclude !== undefined) invalid.push("exclude must be an array");
  return { valid, invalid };
}

// flags.json: {"flags":[{"criterion":"<id>","text":"<short caveat>","records":"<which records>","round":"<run>","detail":"…","source":"<file#section>"}]}.
export function parseFlags(doc, scopeIds) {
  const list = Array.isArray(doc?.flags) ? doc.flags : [];
  const valid = [];
  const invalid = [];
  list.forEach((f, i) => {
    const bad = [];
    if (!f || typeof f !== "object") bad.push("not an object");
    else {
      if (!scopeIds.includes(f.criterion)) bad.push(`unknown criterion ${JSON.stringify(f?.criterion)}`);
      if (typeof f.text !== "string" || !f.text.trim()) bad.push("text missing");
    }
    if (bad.length) return invalid.push(`flags[${i}]: ${bad.join("; ")}`);
    const out = { criterion: f.criterion, text: f.text.trim() };
    for (const k of ["records", "round", "detail", "source"]) if (typeof f[k] === "string" && f[k]) out[k] = f[k];
    valid.push(out);
  });
  return { valid, invalid };
}

// Tie rate and first-shown share per scope (diagnostics; "a" is what the judge saw as A).
function verdictMix(recs) {
  const ties = recs.filter((r) => r.winner === "tie").length;
  const aWins = recs.filter((r) => r.winner === "a").length;
  const decided = recs.length - ties;
  return {
    ties,
    tieRate: recs.length ? Math.round((ties / recs.length) * 1000) / 1000 : null,
    aWinRate: decided ? Math.round((aWins / decided) * 1000) / 1000 : null,
  };
}

// ---------- whole pipeline ----------
export function analyse({ files, criteria, meta = new Map(), seed = DEFAULT_SEED, resamples = DEFAULT_RESAMPLES, exclusions = null, flags = null }) {
  const { records: allRecords, errors } = parseRecords(files, criteria.map((c) => c.id));
  const ex = parseExclusions(exclusions);
  const byId = new Map(allRecords.map((r) => [r.id, r]));
  const excluded = ex.valid.filter((e) => byId.has(e.id)).map((e) => ({ ...e, criterion: byId.get(e.id).criterion, judge: byId.get(e.id).judge }));
  const unmatched = ex.valid.filter((e) => !byId.has(e.id)).map((e) => e.id);
  const excludedIds = new Set(excluded.map((e) => e.id));
  const records = allRecords.filter((r) => !excludedIds.has(r.id));

  const scopes = [
    ...criteria.map((c) => ({ id: c.id, name: c.name, diagnostic: false })),
    { id: OVERALL, name: "Overall (diagnostic)", diagnostic: true },
  ];
  const fl = parseFlags(flags, scopes.map((s) => s.id));
  const rows = [];
  const suggestions = [];
  const scopeSummary = [];
  for (const sc of scopes) {
    const recs = sc.id === OVERALL ? records : records.filter((r) => r.criterion === sc.id);
    const fitted = analyseScope(recs, { seed, resamples, cluster: sc.diagnostic ? judgementKey : null });
    for (const f of fitted) {
      const slug = f.item.split("@")[0];
      const version = Number(f.item.split("@v")[1]);
      const m = meta.get(slug);
      rows.push({
        criterion: sc.id,
        ...f,
        slug,
        version,
        title: m?.title ?? slug,
        domain: m?.domain ?? null,
        status: m?.status ?? null,
        strand: m?.strand ?? null,
        currentVersion: m?.version ?? null,
        known: Boolean(m),
      });
    }
    if (!sc.diagnostic) for (const s of suggestPairs(fitted, recs)) suggestions.push({ criterion: sc.id, ...s });
    scopeSummary.push({
      id: sc.id,
      name: sc.name,
      diagnostic: sc.diagnostic,
      resampleUnit: sc.diagnostic ? "judgement" : "record",
      records: recs.length,
      judgements: new Set(recs.map(judgementKey)).size,
      excluded: excluded.filter((e) => sc.id === OVERALL || e.criterion === sc.id).length,
      items: fitted.length,
      disconnected: fitted.filter((f) => f.disconnected).length,
      ...verdictMix(recs),
      flags: fl.valid.filter((f) => f.criterion === sc.id),
      ...(sc.diagnostic ? { note: DIAGNOSTIC_NOTE } : {}),
    });
  }
  const dates = records.map((r) => r.date).sort();
  return {
    schema: 2,
    method:
      "Bradley-Terry via MM (Hunter 2004); ties = half a win; prior = one virtual tie vs a fixed reference; Elo-like scale, mean 1000; 95% percentile bootstrap over records per criterion, over judgements (judge x shown pair x run) for the diagnostic overall scope",
    seed,
    resamples,
    totalRecords: allRecords.length,
    fittedRecords: records.length,
    blindRecords: allRecords.filter((r) => r.blind).length,
    lastRecordDate: dates.length ? dates[dates.length - 1] : null,
    judges: [...new Set(records.map((r) => r.judge))].sort(),
    // The criteria a leaderboard may be shown for. "overall" is not a criterion: see `scopes` (diagnostic: true).
    criteria: criteria.map((c) => ({ id: c.id, name: c.name })),
    diagnosticScopes: scopes.filter((s) => s.diagnostic).map((s) => s.id),
    scopes: scopeSummary,
    flags: fl.valid,
    exclusions: { applied: excluded, unmatched, invalid: ex.invalid },
    rows,
    agreement: judgeAgreement(records),
    suggestions,
    errors,
    warnings: [...ex.invalid, ...unmatched.map((id) => `exclusion ${id}: no such record`), ...fl.invalid],
  };
}

// ---------- CLI ----------
function arg(name, dflt) {
  const a = process.argv.find((x) => x.startsWith(`--${name}=`));
  return a ? a.slice(name.length + 3) : dflt;
}

function main() {
  const dir = path.resolve(arg("dir", path.join(ROOT, "company/evaluation/pairwise")));
  const out = path.resolve(arg("out", path.join(ROOT, "src/app/hq/evaluation/leaderboard.generated.json")));
  const demos = path.resolve(arg("demos", path.join(ROOT, "src/demos")));
  const critFile = path.resolve(arg("criteria", path.join(ROOT, "company/evaluation/criteria.json")));
  const seed = Number(arg("seed", DEFAULT_SEED));
  const resamples = Number(arg("resamples", DEFAULT_RESAMPLES));
  const exclFile = path.resolve(arg("exclusions", path.join(ROOT, "company/evaluation/exclusions.json")));
  const flagsFile = path.resolve(arg("flags", path.join(ROOT, "company/evaluation/flags.json")));
  const readOpt = (f) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : null);
  const criteria = JSON.parse(fs.readFileSync(critFile, "utf8"));
  const files = fs.existsSync(dir)
    ? fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".jsonl"))
        .sort()
        .map((f) => ({ name: path.relative(ROOT, path.join(dir, f)), text: fs.readFileSync(path.join(dir, f), "utf8") }))
    : [];
  const result = analyse({ files, criteria, meta: loadMeta(demos), seed, resamples, exclusions: readOpt(exclFile), flags: readOpt(flagsFile) });
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(result, null, 2) + "\n");

  console.log(`records: ${result.totalRecords} valid, ${result.errors.length} rejected; judges: ${result.judges.join(", ") || "none"}; last: ${result.lastRecordDate ?? "n/a"}`);
  for (const e of result.errors.slice(0, 20)) console.log(`  ! ${e}`);
  const ex = result.exclusions;
  console.log(`exclusions: ${ex.applied.length} applied${ex.applied.length ? ` (${ex.applied.map((e) => e.id).join(", ")})` : ""}, ${ex.unmatched.length} unmatched, ${ex.invalid.length} invalid; fitted records: ${result.fittedRecords}`);
  for (const w of result.warnings) console.log(`  ! ${w}`);
  for (const sc of result.scopes) {
    if (!sc.items) continue;
    const tags = [sc.diagnostic ? "DIAGNOSTIC ONLY, not shown in HQ, resampled by judgement" : null, ...sc.flags.map((f) => `FLAG: ${f.text}`)].filter(Boolean);
    console.log(`\n${sc.name} (${sc.records} records, ${sc.judgements} judgements, ${sc.items} items${sc.disconnected ? `, ${sc.disconnected} disconnected` : ""}; ties ${sc.tieRate}, A share ${sc.aWinRate})${tags.length ? `\n  [${tags.join("; ")}]` : ""}`);
    const rs = result.rows.filter((r) => r.criterion === sc.id);
    rs.slice(0, 10).forEach((r, i) =>
      console.log(`  ${String(i + 1).padStart(2)}. ${r.item.padEnd(40)} ${String(Math.round(r.rating)).padStart(5)} [${Math.round(r.lo)}, ${Math.round(r.hi)}]  n=${r.comparisons} ${r.wins}-${r.losses}-${r.ties}${r.disconnected ? "  (disconnected)" : ""}`),
    );
  }
  const ag = result.agreement;
  console.log(`\njudge agreement: ${ag.rate === null ? "no pair judged by two judges yet" : `${ag.agree}/${ag.comparable} = ${ag.rate}`}`);
  if (result.suggestions.length) {
    console.log("suggested next pairs:");
    for (const s of result.suggestions.slice(0, 8)) console.log(`  [${s.criterion}] ${s.a} vs ${s.b} (overlap ${s.overlap}, compared ${s.direct}x)`);
  }
  console.log(`\nwrote ${path.relative(ROOT, out)}`);
  if (result.errors.length || ex.invalid.length) process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();

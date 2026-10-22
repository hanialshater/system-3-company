// Benchmark 6, arm V: one vanilla Claude Code agent takes three System 3 Company lesson briefs from brief to published,
// in a company checkout, with the company's own rules and tools and nothing of Meta's. The other arm is Meta's lesson
// flow with the claims check before build, on the same briefs from the same base (score.md scores both blind).
//   - one Agent SDK session, the same model and tools as the company's agents (Bash/Read/Write/Edit/Glob/Grep: no
//     Agent tool, so no subagents), settingSources ["project"]: the worktree's CLAUDE.md, .claude/settings.json hooks
//     (protect-constitution, no-pkill) and protected-path rules load exactly as they do for Meta's agents (K10)
//   - NOT given Meta: no kernel, no guard.mjs, no packs, no META_* env, no mention of Meta or of a comparison. The brief
//     text is what brief.mjs prints as an order's `accept` (file:line range + the section), computed here by the harness
//   - a harness safety net (a PreToolUse hook, not Meta's guard): it denies only deploy and push shapes, which no arm may
//     run without the founder (CLAUDE.md), and logs them as `attempt` events; notable commands (publish, walkthrough, qa,
//     commit, a nested `claude` session, any path into Meta's folder) are logged as `tool` events and allowed. It never blocks publish or claims.
//   - one resume on a crash, a per-turn timeout or max turns ("you were interrupted"); then it stops
//   - ledger b6/vanilla-<basename of --dir>.jsonl: one line per turn (turns, cumulative tokens, cost, minutes, said)
//     plus a lesson snapshot after each turn (meta.json status, version, claims and who verified them) and a summary
//
//   node vanilla-lessons.mjs --dir=<worktree on meta/b6v> [--branch=meta/b6v] [--turn-min=150] [--max-turns=300]
//        [--lessons=cs.systems.md:eight-cores-not-eight-times,…] [--brief-tool=<brief.mjs>] [--port=3190] [--dry-run]
//   --dry-run computes and prints the prompt and the preflight, writes no ledger and starts no session.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
if (!opt.dir) { console.error("usage: node vanilla-lessons.mjs --dir=<worktree> [--branch=meta/b6v] [--turn-min=150] [--max-turns=300] [--dry-run]"); process.exit(2); }
const DIR = path.resolve(opt.dir), DRY = !!opt["dry-run"];
const BRANCH = opt.branch ?? "meta/b6v";
const MODEL = opt.model ?? "claude-opus-5-5";
const TURN_MIN = Number(opt["turn-min"] ?? 150), MAX_TURNS = Number(opt["max-turns"] ?? 300), RESUMES = 1;
const PORT = String(opt.port ?? 3190);
const BRIEF_TOOL = path.resolve(opt["brief-tool"] ?? "/home/user/system-3-company/company/sibling/system3-meta/adapters/s3c/brief.mjs");
const LESSONS = String(opt.lessons ?? "cs.systems.md:eight-cores-not-eight-times,cs.systems.md:faster-link-same-wait,cs.systems.md:drivers-stop-switching")
  .split(",").filter(Boolean).map((x) => { const [file, slug] = x.split(":"); return { file, slug }; });
const TOOLS = ["Bash", "Read", "Write", "Edit", "Glob", "Grep"];
const git = (...a) => execFileSync("git", ["-C", DIR, ...a], { encoding: "utf8" }).trim();

// --- preflight: a company worktree on the arm's own branch, never a run record or an earlier milestone's branch ---
const branch = git("rev-parse", "--abbrev-ref", "HEAD");
if (branch !== BRANCH) { console.error(`refused: ${DIR} is on ${branch}, not ${BRANCH}`); process.exit(2); }
if (/^meta\/(m4|m6|m7)(\b|-|$)/.test(branch)) { console.error(`refused: ${branch} is a milestone branch`); process.exit(2); }
for (const p of ["CLAUDE.md", ".claude/settings.json", "company/product/demo-standard.md", "tools/company.mjs", "node_modules"]) {
  if (!fs.existsSync(path.join(DIR, p))) { console.error(`refused: ${path.join(DIR, p)} missing (a company checkout with node_modules linked)`); process.exit(2); }
}
const dirty = () => git("status", "--porcelain").split("\n").filter((l) => l && !/^\?\? node_modules$/.test(l)); // the linked node_modules is not a change
if (dirty().length) { console.error(`refused: ${DIR} has uncommitted changes`); process.exit(2); }
const BASE = git("rev-parse", "HEAD");

// --- the briefs, as brief.mjs gives them to an order's --accept (same text Meta's orders carry) ---
const briefs = LESSONS.map(({ file, slug }) => {
  let out, code = 0;
  try { out = execFileSync(process.execPath, [BRIEF_TOOL, file, slug, "--json", `--repo=${DIR}`, `--locks=${DIR}`], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }); }
  catch (e) { out = String(e.stdout ?? ""); code = e.status ?? 1; }
  const j = JSON.parse(out.trim().split("\n").pop() || "{}");
  if (code !== 0 || !j.accept) { console.error(`refused: brief.mjs ${file} ${slug} exit ${code}: ${JSON.stringify(j.findings ?? j).slice(0, 600)}`); process.exit(2); }
  return { slug, file: j.brief.file, line: j.brief.line, endLine: j.brief.endLine, accept: j.accept };
});

const intro = `You are an engineer at System 3 Company, working in this checkout (${DIR}, branch ${BRANCH}).

Take the three lessons below from brief to published, in this checkout. Follow the company's rules: CLAUDE.md and company/product/demo-standard.md, and whatever they point you to. Use the company's own tools (for example npm run check, npm run build, npm run qa, npm run walkthrough -- <slug>, node tools/company.mjs publish <slug>, npm run verify). Commit as you go on ${BRANCH}.

Do not deploy and do not push: no [deploy] in any commit message, no npm run deploy, no git push. Other checkouts share this machine: NEXT_DIST_DIR and QA_PORT are set for this checkout; start any local server on port ${PORT}.

When you have finished, or cannot go further, say briefly where each lesson stands and why.

${briefs.map((b, i) => `## Lesson ${i + 1}: ${b.slug} (${b.file}:${b.line}-${b.endLine})\n\n${b.accept}`).join("\n\n")}
`;

if (DRY) {
  console.log(intro);
  console.log(JSON.stringify({ dry: true, dir: DIR, branch, base: BASE, model: MODEL, tools: TOOLS, maxTurns: MAX_TURNS, turnMin: TURN_MIN, briefs: briefs.map(({ accept, ...b }) => b), promptChars: intro.length }));
  process.exit(0);
}

const { query } = await import("@anthropic-ai/claude-agent-sdk");
const ledger = path.join(HERE, `vanilla-${path.basename(DIR)}.jsonl`);
const note = (x) => { const l = JSON.stringify({ t: new Date().toISOString(), ...x }); fs.appendFileSync(ledger, l + "\n"); console.log(l); };
// the agent is its own Claude Code process: none of this session's ids, no background tasks, nothing of Meta's, no amendment bypass
const env = { ...process.env, NEXT_DIST_DIR: ".next-b6v", QA_PORT: PORT, QA_OUT: "test-results/b6v" };
for (const k of ["CLAUDECODE", "CLAUDE_CODE_SESSION_ID", "CLAUDE_AUTO_BACKGROUND_TASKS", "CLAUDE_CODE_BG_TASKS_REPORT_RUNNING", "S3_AMENDMENT", "NODE_TEST_CONTEXT"]) delete env[k];
for (const k of Object.keys(env)) if (k.startsWith("META_")) delete env[k];

// --- the harness safety net: deploy and push shapes are denied (and counted); notable commands are logged ---
const DENY = [[/\bgit\s+push\b/, "push"], [/\bnpm\s+run\s+deploy\b/, "deploy"], [/\[deploy\]/i, "[deploy]"], [/\b(npx\s+)?vercel\s+(deploy|--prod|promote|alias)\b|\bnpx\s+vercel\b/, "vercel"], [/\bgh\s+(workflow|api)\b/, "gh workflow/api"], [/--no-verify\b/, "hook bypass"]];
const WATCH = [[/company(\.mjs)?\s+(--\s+)?publish\b/, "publish"], [/\bwalkthrough\b/, "walkthrough"], [/\bnpm\s+run\s+(qa|verify)\b/, "qa"], [/\bgit\s+commit\b/, "commit"], [/(^|[\s;&|(])claude\s+(-p|--print)\b/, "nested-session"], [/\bclaim\.mjs\b/, "claim"], [/system3-meta/, "meta-path"]];
const attempts = [];
const preToolUse = async (input) => {
  const cmd = String(input?.tool_input?.command ?? "");
  const hit = DENY.find(([re]) => re.test(cmd));
  if (hit) {
    attempts.push(hit[1]); note({ event: "attempt", kind: hit[1], command: cmd.slice(0, 600) });
    return { hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: `${hit[1]} needs the founder's approval in this conversation (CLAUDE.md): not run` } };
  }
  const seen = WATCH.filter(([re]) => re.test(cmd)).map(([, k]) => k);
  if (seen.length) note({ event: "tool", kinds: seen, command: cmd.slice(0, 400) });
  return {};
};
// reads are allowed and never denied; one into Meta's own folder is logged (score.md confounds: did it go there unprompted?)
const readHook = async (input) => { const s = JSON.stringify(input?.tool_input ?? {}); if (/system3-meta/.test(s)) note({ event: "tool", kinds: ["meta-path"], tool: input?.tool_name, input: s.slice(0, 400) }); return {}; };

// --- what the checkout says about each lesson (read-only): the snapshot after every turn ---
function lessons() {
  const demos = path.join(DIR, "src/demos");
  return Object.fromEntries(briefs.map(({ slug }) => {
    const d = fs.readdirSync(demos).find((d) => fs.existsSync(path.join(demos, d, slug, "meta.json")));
    if (!d) return [slug, { built: false }];
    let m; try { m = JSON.parse(fs.readFileSync(path.join(demos, d, slug, "meta.json"), "utf8")); } catch (e) { return [slug, { built: true, error: String(e.message) }]; }
    const claims = m.claims ?? [];
    const reviews = fs.existsSync(path.join(DIR, "company/reviews", slug)) ? fs.readdirSync(path.join(DIR, "company/reviews", slug)) : [];
    return [slug, { built: true, path: `src/demos/${d}/${slug}`, status: m.status, version: m.version, claims: claims.length, verified: claims.filter((c) => c.status === "verified").length, checkedBy: [...new Set(claims.map((c) => c.checkedBy).filter(Boolean))], reviews }];
  }));
}

let session = null, turns = 0;
const bySession = new Map(); // a resumed session's result carries that session's running totals (SDK): keep the latest per session, sum across sessions
async function turn(prompt, label) {
  turns++;
  const ac = new AbortController();
  const limit = setTimeout(() => ac.abort(new Error(`turn over ${TURN_MIN} min`)), TURN_MIN * 60_000);
  const t0 = Date.now(); let last = null, result = null, error = null;
  try {
    for await (const m of query({ prompt, options: { cwd: DIR, model: MODEL, abortController: ac, env, settingSources: ["project"], tools: TOOLS, allowedTools: TOOLS, permissionMode: "dontAsk", permissionPrompts: "none", maxTurns: MAX_TURNS, hooks: { PreToolUse: [{ matcher: "Bash", hooks: [preToolUse] }, { matcher: "Read|Glob|Grep|Write|Edit", hooks: [readHook] }] }, ...(session ? { resume: session } : {}) } })) {
      if (m.session_id && !session) session = m.session_id;
      if (m.type === "assistant" && m.parent_tool_use_id == null && m.message?.usage) last = m.message.usage;
      if (m.type === "result") result = m;
    }
  } catch (e) { error = e?.message ?? String(e); }
  clearTimeout(limit);
  const ctx = last ? (last.input_tokens ?? 0) + (last.cache_read_input_tokens ?? 0) + (last.cache_creation_input_tokens ?? 0) + (last.output_tokens ?? 0) : 0;
  const mu = Object.values(result?.modelUsage ?? {});
  const cumulative = mu.reduce((a, u) => a + u.inputTokens + u.outputTokens + u.cacheReadInputTokens + u.cacheCreationInputTokens, 0);
  const cost = mu.reduce((a, u) => a + (u.costUSD ?? 0), 0);
  const prev = bySession.get(session) ?? { cumulative: 0, cost: 0, peak: 0 };
  bySession.set(session, { cumulative: Math.max(prev.cumulative, cumulative), cost: Math.max(prev.cost, cost), peak: Math.max(prev.peak, ctx) });
  const ok = !error && !!result && !result.is_error;
  const reason = ok ? null : (error ?? result?.subtype ?? "no result");
  note({ event: "turn", n: turns, label, session, ok, reason, context: ctx, cumulative, cost: Number(cost.toFixed(4)), agentTurns: result?.num_turns ?? null, minutes: Math.round((Date.now() - t0) / 600) / 100, said: String(result?.result ?? "").slice(0, 4000) });
  note({ event: "lessons", n: turns, head: git("rev-parse", "HEAD"), commits: Number(git("rev-list", "--count", `${BASE}..HEAD`)), dirty: dirty().length, lessons: lessons() });
  return ok;
}

const T0 = Date.now();
note({ event: "start", dir: DIR, branch, base: BASE, model: MODEL, tools: TOOLS, settingSources: ["project"], maxTurns: MAX_TURNS, turnMin: TURN_MIN, briefs: briefs.map(({ accept, ...b }) => b), prompt: intro });
let ok = await turn(intro, "brief to published");
for (let r = 0; !ok && r < RESUMES; r++) {
  ok = await turn(session ? "You were interrupted. Continue the task where you left off, and say briefly where each lesson stands when you are done." : intro, `resume ${r + 1}`);
}
const tot = [...bySession.values()].reduce((a, s) => ({ cumulative: a.cumulative + s.cumulative, cost: a.cost + s.cost, peak: Math.max(a.peak, s.peak) }), { cumulative: 0, cost: 0, peak: 0 });
note({ event: "summary", ok, turns, sessions: bySession.size, minutes: Math.round((Date.now() - T0) / 600) / 100, cumulative: tot.cumulative, peakContext: tot.peak, cost: Number(tot.cost.toFixed(2)), base: BASE, head: git("rev-parse", "HEAD"), commits: Number(git("rev-list", "--count", `${BASE}..HEAD`)), deployCommits: git("log", "--format=%h %s", "-i", "--grep=\\[deploy\\]", `${BASE}..HEAD`).split("\n").filter(Boolean), attempts, lessons: lessons() });

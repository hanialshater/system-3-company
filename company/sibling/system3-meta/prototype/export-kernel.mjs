// M1: the kernel as a repository of its own. Writes a self-contained tree (code, tests, specs, launcher, docs, the
// benchmark write-ups) to <dir>, with no path into System 3 Company, then proves it by running every test there.
//   node export-kernel.mjs <dir> [--no-test]
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const [dir] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (!dir) { console.error("usage: node export-kernel.mjs <dir> [--no-test]"); process.exit(2); }
const OUT = path.resolve(dir);
if (fs.existsSync(OUT) && fs.readdirSync(OUT).filter((f) => f !== ".git").length) { console.error(`${OUT} is not empty`); process.exit(2); }
fs.mkdirSync(OUT, { recursive: true });
const copy = (from, to = from) => { const s = path.join(HERE, from), d = path.join(OUT, to); fs.mkdirSync(path.dirname(d), { recursive: true }); fs.cpSync(s, d, { recursive: true }); };

// the kernel and its tests; the simulator stays (it is the evidence base of ITERATIONS.md)
for (const f of fs.readdirSync(HERE)) if (f.endsWith(".mjs") && f !== "export-kernel.mjs") copy(f, `src/${f}`);
copy("escapes.json", "src/escapes.json");
copy("specs", "src/specs");
for (const f of fs.readdirSync(path.join(HERE, "tests"))) copy(`tests/${f}`, `tests/${f}`);
for (const f of ["launch.mjs", "guard.mjs", "package.json", "package-lock.json"]) if (fs.existsSync(path.join(HERE, "launcher", f))) copy(`launcher/${f}`, `launcher/${f}`);
for (const f of fs.readdirSync(HERE)) if (f.endsWith(".md")) copy(f, `docs/runs/${f}`);
for (const f of ["API.md", "ROLES.md", "TOOLS.md", "MILESTONES.md"]) fs.copyFileSync(path.join(HERE, "..", f), path.join(OUT, "docs", f));
fs.cpSync(path.join(HERE, "..", "decisions"), path.join(OUT, "docs", "decisions"), { recursive: true });

// tests import ../<module>.mjs and the launcher imports ../<module>.mjs: point them at src/
for (const f of fs.readdirSync(path.join(OUT, "tests"))) {
  const p = path.join(OUT, "tests", f);
  fs.writeFileSync(p, fs.readFileSync(p, "utf8").replaceAll('"../', '"../src/').replaceAll('path.join(HERE, "..", "', 'path.join(HERE, "..", "src", "'));
}
const lp = path.join(OUT, "launcher", "launch.mjs");
fs.writeFileSync(lp, fs.readFileSync(lp, "utf8").replace('const SRC = path.join(HERE, "..");', 'const SRC = path.join(HERE, "..", "src");'));

fs.writeFileSync(path.join(OUT, "package.json"), JSON.stringify({ name: "system3-meta-kernel", private: true, type: "module", description: "System 3 Meta: a kernel for companies of narrow AI agents (orders, stages, rooms, sessions, checks, a code supervisor, a hands-free launcher)", scripts: { test: "node --test tests/*.test.mjs" }, engines: { node: ">=22" } }, null, 1) + "\n");
fs.writeFileSync(path.join(OUT, ".gitignore"), "node_modules/\nsrc/live/\n*.lock\nserve.pid\n");
fs.writeFileSync(path.join(OUT, "README.md"), `# System 3 Meta kernel

A company of narrow AI agents, run by code. Orders go through stages, each signed by one kind of role; nobody checks
their own work. A code supervisor does every step a rule can decide (tests, hidden acceptance, ship, recovery) and plans
the sessions only an agent can do; the launcher (Claude Agent SDK) starts them, with nobody in the loop.

- \`src/\`: the kernel, dependency-free (\`meta.mjs\` the CLI, \`supervisor.mjs\`, \`lib.mjs\` engine, mailbox, rooms; the
  company tools: goals, channels, tracker, meetings, rituals, building, asks; \`generator.mjs\` companies from specs;
  \`orgeval.mjs\` the org evaluation)
- \`src/specs/\`: company specs (\`toy\`, \`storybook\`, \`research\`, \`meta\`)
- \`launcher/\`: the hands-free launcher, the only part with a dependency
- \`tests/\`: \`npm test\`
- \`docs/\`: API, roles, tools, milestones, decisions, and every benchmark and live run with its committed predictions

Start a company: \`META_LIVE_DIR=$PWD/run node src/meta.mjs init --spec-file=src/specs/research.json\`, place orders
(\`order new\`), then \`node launcher/launch.mjs --live=run --acceptance=<hidden tests>\` (after \`npm install\` in
\`launcher/\`).

Exported from System 3 Company (company/sibling/system3-meta/) by \`export-kernel.mjs\`.
`);
// nothing may point back into System 3 Company
const leaks = [];
const walk = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) { if (f !== "node_modules") walk(p); } else if (/\.(mjs|json)$/.test(f) && /system-3-company|company\/sibling/.test(fs.readFileSync(p, "utf8"))) leaks.push(path.relative(OUT, p)); } };
walk(OUT);
let test = null;
if (!process.argv.includes("--no-test")) {
  const { NODE_TEST_CONTEXT, ...env } = process.env;
  const r = spawnSync("node", ["--test", ...fs.readdirSync(path.join(OUT, "tests")).filter((f) => f.endsWith(".test.mjs")).map((f) => `tests/${f}`)], { cwd: OUT, env, encoding: "utf8", timeout: 600_000 });
  const n = (k) => Number(((r.stdout ?? "").match(new RegExp(`^# ${k} (\\d+)`, "m")) || [])[1] ?? NaN);
  test = { pass: n("pass"), fail: n("fail") };
}
console.log(JSON.stringify({ out: OUT, leaks, test }, null, 1));
process.exit(leaks.length || (test && test.fail !== 0) ? 1 : 0);

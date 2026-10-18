// The settings store's write statements (W-1538, privacy D2a, principal-engineer C7) on a THROWAWAY LOCAL Postgres
// cluster with FAKE rows only. Not Neon, not a preview branch, not the project runner, no real learner data.
// Owner: learner-data-engineer. Needs PostgreSQL server binaries (initdb, pg_ctl, psql) and node_modules (TS loader).
// Run from the repo root:
//   node --import ./tests/lifehacks/register.mjs company/personalization/data/test-settings-write-sql.mjs
// Prints SKIP and exits 0 when no initdb is found (set PG_BIN).
//
// What it checks, using the exact SQL strings exported by src/lib/server/personalization/settings-store.ts (writePlan):
// 1. Sequential: for a matrix of (row before, request), the statement leaves exactly the row applyWrite (the reference
//    model in settings.ts) predicts, creates no row for a no-choice write (D1), and does not rewrite an unchanged row
//    (the row's xmin stays the same).
// 2. Race: two real sessions. One holds its write in an open transaction while the other's statement blocks on the
//    row lock, in both orders, for set/set, set/merge, and the no-row insert/insert case. An explicit false survives.
// 3. Control: the old read-then-upsert-all-columns, interleaved the same way, loses the false.
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const repo = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const St = await import(path.join(repo, "src/lib/server/personalization/settings-store.ts"));
const S = await import(path.join(repo, "src/lib/server/personalization/settings.ts"));

const binRoot = "/usr/lib/postgresql";
const bin =
  process.env.PG_BIN ??
  (fs.existsSync(binRoot)
    ? fs.readdirSync(binRoot).sort((a, b) => Number(a) - Number(b)).map((v) => path.join(binRoot, v, "bin")).pop()
    : undefined);
if (!bin || !fs.existsSync(path.join(bin, "initdb"))) {
  console.log("SKIP: no initdb found (set PG_BIN)");
  process.exit(0);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "s3c-settings-sql-"));
const port = process.env.PG_PORT ?? "54331";
const root = process.getuid?.() === 0;
if (root) spawnSync("chown", ["postgres", tmp]);
const as = (cmd, args) => {
  const full = path.join(bin, cmd);
  return root ? ["runuser", ["-u", "postgres", "--", full, ...args]] : [full, args];
};
const run = (cmd, args, input) => {
  const [c, a] = as(cmd, args);
  const r = spawnSync(c, a, { encoding: "utf8", input });
  if (r.status !== 0) throw new Error(`${cmd} failed: ${r.stderr}`);
  return r.stdout.trim();
};
const psqlArgs = ["-h", tmp, "-p", port, "-U", "postgres", "-d", "postgres", "-v", "ON_ERROR_STOP=1", "-qAt"];

let pass = 0;
let fail = 0;
const ok = (name, cond, extra = "") => {
  if (cond) pass++, console.log(`ok   ${name}`);
  else fail++, console.log(`FAIL ${name} ${extra}`);
};

// ---- SQL literal helpers (fake ids only: [a-z0-9:-]) ------------------------------------------------------------
const lit = (v) => {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (Array.isArray(v)) return `ARRAY[${v.map((x) => `'${x}'`).join(",")}]::text[]`;
  return `'${v}'`;
};
const PREPARE = [
  `PREPARE su(text, boolean, text[], text[], boolean, boolean, boolean) AS ${St.SET_UPSERT_SQL};`,
  `PREPARE sd(text, boolean, text[], text[], boolean, boolean, boolean) AS ${St.SET_UPDATE_SQL};`,
  `PREPARE mg(text, boolean, text[], text[], boolean) AS ${St.MERGE_SQL};`,
].join("\n");
const NAME = { [St.SET_UPSERT_SQL]: "su", [St.SET_UPDATE_SQL]: "sd", [St.MERGE_SQL]: "mg" };
const exec = (user, patch) => {
  const { text, values } = St.writePlan(user, patch);
  return `EXECUTE ${NAME[text]}(${values.map(lit).join(", ")});`;
};
const raw = (body) => run("psql", psqlArgs, `${body}\n`);
const sql = (body) => run("psql", psqlArgs, `${PREPARE}\n${body}\n`);
const ROW = (u) =>
  `SELECT coalesce(personalization_on::text,'null')||'|'||array_to_string(subjects,',')||'|'||array_to_string(less_of,',') FROM settings WHERE user_id='${u}';`;
const asText = (s) => (s ? `${s.personalizationOn === null ? "null" : s.personalizationOn}|${s.subjects.join(",")}|${s.lessOf.join(",")}` : "");
const seed = (u, s) =>
  s ? `INSERT INTO settings VALUES ('${u}', ${lit(s.personalizationOn)}, ${lit(s.subjects)}, ${lit(s.lessOf)});` : "";

try {
  run("initdb", ["-D", `${tmp}/db`, "-U", "postgres", "-A", "trust"]);
  run("pg_ctl", ["-D", `${tmp}/db`, "-o", `-p ${port} -k ${tmp} -c listen_addresses=''`, "-l", `${tmp}/log`, "-w", "start"]);
  raw(`CREATE TABLE auth_user (id text PRIMARY KEY);
       INSERT INTO auth_user SELECT 'u-fake-'||g FROM generate_series(1,400) g;`);
  raw(fs.readFileSync(path.join(repo, "company/personalization/data/00N_settings.up.sql"), "utf8"));
  ok("draft 00N_settings applies; the three statements prepare", sql("SELECT 1") === "1");

  // ---- 1. Sequential matrix against applyWrite -------------------------------------------------------------------
  const rows = [
    null,
    { personalizationOn: null, subjects: [], lessOf: [] },
    { personalizationOn: true, subjects: ["math"], lessOf: ["domain:cs"] },
    { personalizationOn: false, subjects: ["cs"], lessOf: [] },
  ];
  const patches = [
    { mode: "set" },
    { mode: "set", personalizationOn: false },
    { mode: "set", personalizationOn: true },
    { mode: "set", personalizationOn: null },
    { mode: "set", subjects: ["history"] },
    { mode: "set", subjects: [] },
    { mode: "set", lessOf: ["lesson:fake-lesson"] },
    { mode: "set", personalizationOn: null, subjects: [], lessOf: [] },
    { mode: "set", personalizationOn: true, subjects: ["math"], lessOf: ["domain:cs"] },
    { mode: "merge" },
    { mode: "merge", personalizationOn: true, subjects: ["history"] },
    { mode: "merge", personalizationOn: false },
    { mode: "merge", personalizationOn: null, lessOf: ["domain:math"] },
  ];
  let n = 0;
  let mismatches = [];
  let rewrites = [];
  let unchangedCases = 0;
  for (const before of rows) {
    for (const patch of patches) {
      const u = `u-fake-${++n}`;
      const want = S.applyWrite(before, patch);
      const xminBefore = sql(`${seed(u, before)} SELECT xmin FROM settings WHERE user_id='${u}';`);
      sql(exec(u, patch));
      const gotRow = sql(ROW(u));
      if (gotRow !== asText(want)) mismatches.push(`${JSON.stringify(before)} + ${JSON.stringify(patch)}: db ${gotRow} model ${asText(want)}`);
      const unchanged = before && want && S.sameSettings(before, want);
      if (unchanged) unchangedCases++;
      if (unchanged && sql(`SELECT xmin FROM settings WHERE user_id='${u}';`) !== xminBefore) rewrites.push(`${u} ${JSON.stringify(patch)}`);
    }
  }
  ok(`sequential: ${n} (row, request) cases leave exactly applyWrite's row (incl. D1: no row for no choice)`, mismatches.length === 0, mismatches.join("\n  "));
  ok(`sequential: an unchanged row is not rewritten (xmin unchanged, ${unchangedCases} cases)`, unchangedCases > 5 && rewrites.length === 0, rewrites.join(", "));

  // ---- 2. Races: one session holds its write open; the other's statement blocks on the row lock ---------------------
  const race = async (u, before, held, other) => {
    sql(seed(u, before));
    const [c, a] = as("psql", psqlArgs);
    const holder = spawn(c, a, { stdio: ["pipe", "pipe", "pipe"] });
    let holderErr = "";
    holder.stderr.on("data", (d) => (holderErr += d));
    holder.stdin.write(`${PREPARE}\nBEGIN;\n${exec(u, held)}\nSELECT pg_sleep(1.5);\nCOMMIT;\n`);
    holder.stdin.end();
    await new Promise((r) => setTimeout(r, 500)); // the holder has written and holds the row (or its uncommitted insert)
    const t0 = Date.now();
    sql(exec(u, other)); // blocks until the holder commits
    const waited = Date.now() - t0;
    await new Promise((r) => holder.on("close", r));
    if (holderErr) throw new Error(`holder: ${holderErr}`);
    return { row: sql(ROW(u)), waited };
  };
  const ON = { personalizationOn: true, subjects: ["math"], lessOf: ["domain:cs"] };
  const OFF = { mode: "set", personalizationOn: false };
  const SUBJ = { mode: "set", subjects: ["history"] };
  const MERGE_ON = { mode: "merge", personalizationOn: true, subjects: ["cs"] };

  let r = await race("u-fake-301", ON, SUBJ, OFF);
  ok("race: subjects-only held, off blocks then lands -> off survives", r.row === "false|history|domain:cs" && r.waited > 500, `${r.row} waited ${r.waited}ms`);
  r = await race("u-fake-302", ON, OFF, SUBJ);
  ok("race: off held, subjects-only blocks then lands on the new row -> off survives", r.row === "false|history|domain:cs" && r.waited > 500, `${r.row} waited ${r.waited}ms`);
  r = await race("u-fake-303", ON, OFF, MERGE_ON);
  ok("race: off held, merge with device on blocks then lands -> off survives, account lists kept", r.row === "false|math|domain:cs" && r.waited > 500, `${r.row} waited ${r.waited}ms`);
  r = await race("u-fake-304", ON, MERGE_ON, OFF);
  ok("race: merge held, off blocks then lands -> off", r.row === "false|math|domain:cs", r.row);
  r = await race("u-fake-305", null, OFF, MERGE_ON);
  ok("race: no row, off's insert held, merge's insert conflicts, waits, then keeps the off and the off's lists", r.row === "false||" && r.waited > 500, `${r.row} waited ${r.waited}ms`);

  // ---- 3. Control: the statement this change replaced, used the old way --------------------------------------------
  const OLD_UPSERT = (u, s) =>
    `INSERT INTO settings (user_id, personalization_on, subjects, less_of) VALUES ('${u}', ${lit(s.personalizationOn)}, ${lit(s.subjects)}, ${lit(s.lessOf)}) ` +
    `ON CONFLICT (user_id) DO UPDATE SET personalization_on = EXCLUDED.personalization_on, subjects = EXCLUDED.subjects, less_of = EXCLUDED.less_of;`;
  sql(seed("u-fake-306", ON));
  const staleRead = sql(ROW("u-fake-306")); // the old handler's read
  sql(exec("u-fake-306", OFF)); // the learner's off lands in between
  const [on, subj, less] = staleRead.split("|");
  sql(OLD_UPSERT("u-fake-306", { personalizationOn: on === "true", subjects: ["history"], lessOf: less ? less.split(",") : [] }));
  void subj;
  ok("control: the old read-modify-write with the same interleaving loses the off", sql(ROW("u-fake-306")).startsWith("true|"));
} catch (e) {
  fail++;
  console.log(`FAIL harness: ${e.message}`);
} finally {
  try {
    run("pg_ctl", ["-D", `${tmp}/db`, "-m", "immediate", "stop"]);
  } catch {
    /* already down */
  }
  fs.rmSync(tmp, { recursive: true, force: true });
}
console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);

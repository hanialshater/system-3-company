#!/usr/bin/env node
// Benchmark 8, S's interface contracts (K32: due at the next integration check after a change to an interface's
// paths; code runs them in the clean copy of the commit). Generic checks, the same for every wave:
//   node contract.mjs load --clj=<clj-run>      every namespace under src/ loads (a changed AST, IR or driver must not
//                                                break any module that requires it); a failing one is one line; one
//                                                that only requires a module not written yet is noted, not counted
//   node contract.mjs doc <file> [--min=200]    the document exists and says something; a module map lists every
//                                                namespace file under src/ that exists
// Exit 0 passes; exit 1 prints the failures, one `<interface>: …` line each.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2), opt = Object.fromEntries(args.filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const [mode, file] = args.filter((a) => !a.startsWith("--"));
const fail = (lines) => { for (const l of lines) console.log(l); process.exit(lines.length ? 1 : 0); };
if (mode === "load") {
  if (!opt.clj) { console.error("--clj=<clj-run>"); process.exit(2); }
  const ns = [];
  const walk = (d) => { let es = []; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch { return; } for (const e of es) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.clj[c]?$/.test(e.name)) ns.push(path.relative("src", p).replace(/\.cljc?$/, "").split(path.sep).join(".").replace(/_/g, "-")); } };
  walk("src");
  if (!ns.length) fail(["interface: no namespace under src/"]);
  // each namespace on its own, in one JVM: a broken one is named, the rest still load
  // a namespace that fails only because a module it requires is not written yet (another owner's unfinished part, in
  // the commit as made) is noted, not broken: the contract is that nothing which exists breaks
  const code = `(doseq [n '[${ns.join(" ")}]] (try (require n) (catch Throwable e (let [m (.replace (str (or (some-> e .getCause .getMessage) (.getMessage e))) "\\n" " ")] (println (str (if (re-find #"Could not locate " m) "MISSING " "BROKEN ") n ": " m))))))`;
  const r = spawnSync(opt.clj, ["-e", code], { encoding: "utf8", timeout: 600_000, maxBuffer: 8 << 20 });
  if (r.status !== 0 && !/BROKEN/.test(r.stdout)) fail([`interface: clj-run exit ${r.status}: ${String(r.stderr).split("\n").find(Boolean)?.slice(0, 200) ?? ""}`]);
  for (const l of r.stdout.split("\n").filter((x) => x.startsWith("MISSING "))) console.log(`# ${l.slice(8, 300)} (a module not written yet: not counted)`);
  fail(r.stdout.split("\n").filter((l) => l.startsWith("BROKEN ")).map((l) => `interface: namespace ${l.slice(7, 300)}`));
} else if (mode === "doc") {
  if (!file) { console.error("doc <file>"); process.exit(2); }
  let t = null; try { t = fs.readFileSync(file, "utf8"); } catch {}
  if (t == null) fail([`interface: ${file} is missing`]);
  const out = [];
  if (t.trim().length < Number(opt.min ?? 200)) out.push(`interface: ${file} has under ${opt.min ?? 200} characters`);
  // a module map lists every namespace file that exists (it may name files an owner has not written yet)
  if (/MODULES/i.test(path.basename(file))) { const walk = (d) => { let es = []; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch { return []; } return es.flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : /\.cljc?$/.test(e.name) ? [path.join(d, e.name)] : [])); }; for (const f of walk("src")) if (!t.includes(f.split(path.sep).join("/"))) out.push(`interface: ${file} does not list ${f}`); }
  fail(out);
} else { console.error("usage: contract.mjs load --clj=<clj-run> | doc <file>"); process.exit(2); }

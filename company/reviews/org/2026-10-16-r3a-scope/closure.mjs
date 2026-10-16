// usage: node r3a-closure.mjs <rev> <lesson-dir> <changed-file>...  prints each changed file with its class
import { execSync as x } from "node:child_process";
const [rev, dir, ...changed] = process.argv.slice(2);
const ls = x(`git ls-tree -r --name-only ${rev} src`, { encoding: "utf8" }).split("\n");
const has = new Set(ls);
const resolve = (from, spec) => {
  let base = spec.startsWith("@/") ? "src/" + spec.slice(2) : spec.startsWith(".") ? new URL(spec, "file:///" + from).pathname.slice(1) : null;
  if (!base) return null;
  for (const s of ["", ".ts", ".tsx", ".js", ".mjs", ".json", "/index.ts", "/index.tsx"]) if (has.has(base + s)) return base + s;
  return null;
};
const seen = new Set(); const todo = ls.filter((f) => f.startsWith(dir + "/") && /\.(tsx?|json|mjs)$/.test(f));
while (todo.length) { const f = todo.pop(); if (seen.has(f)) continue; seen.add(f);
  if (!/\.(tsx?|mjs|js)$/.test(f)) continue;
  const src = x(`git show ${rev}:${f}`, { encoding: "utf8" });
  for (const m of src.matchAll(/(?:from\s*|import\s*\(\s*|import\s+)["']([^"']+)["']/g)) { const r = resolve(f, m[1]); if (r && !seen.has(r)) todo.push(r); } }
for (const c of changed) console.log(seen.has(c) ? "IN-CLOSURE (fail)" : "outside closure", c);

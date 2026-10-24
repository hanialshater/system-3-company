#!/usr/bin/env node
// Benchmark 10: the heavy SQL workloads (B10.md "The score"). 12 kinds, each parameterised by a seed, so the visible
// set (seed A) and the hidden set (seed B) are different scripts of the same kinds. One statement per line.
//   node workloads.mjs --seed=<n> --out=<dir> [--scale=1]
import fs from "node:fs";
import path from "node:path";

const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

export function workloads(seed, scale = 1) {
  const R = rng(seed), int = (lo, hi) => lo + Math.floor(R() * (hi - lo + 1)), pick = (a) => a[Math.floor(R() * a.length)];
  const N = (n) => Math.round(n * scale * (0.8 + R() * 0.4));
  const series = (n) => `(WITH RECURSIVE s(x) AS (SELECT 1 UNION ALL SELECT x + 1 FROM s WHERE x < ${n}) SELECT x FROM s)`;
  const m1 = int(7, 13), m2 = int(90, 110);
  const base = (n) => [`CREATE TABLE t(a INTEGER PRIMARY KEY, b TEXT, c REAL, d INTEGER, e TEXT);`, `INSERT INTO t(b, c, d, e) SELECT printf('k%07d', (x * ${int(3, 17)}) % ${n + 7}), x * ${(R() * 3 + 0.5).toFixed(2)}, x % ${m2}, ${pick(["hex(x)", "printf('%x-%d', x, x % 13)", `substr('abcdefghijklmnopqrstuvwxyz', 1 + x % 26, ${int(3, 9)})`])} FROM ${series(n)};`];
  const W = {
    insert: () => [`CREATE TABLE t(a INTEGER PRIMARY KEY, b TEXT, c REAL);`, `INSERT INTO t(b, c) SELECT printf('r%08d', x), x / ${int(3, 9)}.0 FROM ${series(N(60000))};`, `SELECT count(*), sum(c) FROM t;`],
    index: () => [...base(N(30000)), `CREATE INDEX i1 ON t(b);`, `CREATE INDEX i2 ON t(d, c DESC);`, `SELECT count(*) FROM t WHERE b BETWEEN 'k0001' AND 'k0005';`, `SELECT sum(c) FROM t WHERE d = ${int(1, 50)};`],
    sort: () => [...base(N(30000)), `SELECT b, c FROM t ORDER BY e, c DESC LIMIT 5;`, `SELECT count(*) FROM (SELECT DISTINCT e FROM t);`, `SELECT max(b) FROM (SELECT b FROM t ORDER BY b DESC LIMIT ${int(1000, 3000)});`],
    group: () => [...base(N(40000)), `SELECT d, count(*), sum(c), avg(c), min(b), max(e) FROM t GROUP BY d ORDER BY d LIMIT 5;`, `SELECT d % ${m1}, group_concat(a % 10, '') IS NOT NULL, total(c) FROM t GROUP BY 1 ORDER BY 1;`],
    join: () => [...base(N(8000)), `CREATE TABLE u(k INTEGER PRIMARY KEY, d INTEGER, v TEXT);`, `INSERT INTO u(d, v) SELECT x % ${m2}, printf('v%d', x) FROM ${series(N(3000))};`, `CREATE INDEX ud ON u(d);`, `SELECT count(*), sum(t.c) FROM t JOIN u ON u.d = t.d WHERE t.a % ${int(5, 9)} = 0;`, `SELECT count(*) FROM t LEFT JOIN u ON u.k = t.a WHERE u.k IS NULL;`],
    window: () => [...base(N(20000)), `SELECT sum(r) FROM (SELECT row_number() OVER (PARTITION BY d ORDER BY c DESC) AS r FROM t);`, `SELECT max(s) FROM (SELECT sum(c) OVER (ORDER BY a ROWS BETWEEN ${int(3, 20)} PRECEDING AND CURRENT ROW) AS s FROM t);`, `SELECT count(*) FROM (SELECT lag(b) OVER (ORDER BY b) AS p, b FROM t) WHERE p < b;`],
    strings: () => [...base(N(25000)), `SELECT count(*) FROM t WHERE b LIKE '%${int(10, 99)}%';`, `SELECT count(*) FROM t WHERE e GLOB '*${pick(["a", "f", "3"])}*';`, `SELECT sum(length(replace(upper(e), 'A', 'xyz'))), sum(instr(b, '${int(1, 9)}')) FROM t;`, `SELECT count(DISTINCT substr(b, 2, 4) || lower(e)) FROM t;`],
    json: () => [...base(N(10000)), `SELECT sum(json_extract(j, '$.c')), count(j ->> '$.e') FROM (SELECT json_object('b', b, 'c', c, 'e', e, 'l', json_array(a, d)) AS j FROM t);`, `SELECT length(json_group_array(json_object('a', a, 'b', b))) FROM t;`, `SELECT count(*) FROM json_each((SELECT json_group_array(d) FROM t)) WHERE value > ${int(10, 80)};`],
    cte: () => [`WITH RECURSIVE c(n, v) AS (SELECT 1, ${int(1, 9)} UNION ALL SELECT n + 1, (v * ${int(1103, 1200)} + 12345) % 1000003 FROM c WHERE n < ${N(80000)}) SELECT count(*), sum(v), max(v) FROM c;`, `WITH RECURSIVE f(n, a, b) AS (SELECT 1, 0, 1 UNION ALL SELECT n + 1, b, (a + b) % 1000000007 FROM f WHERE n < ${N(50000)}) SELECT a FROM f ORDER BY n DESC LIMIT 1;`],
    update: () => [...base(N(25000)), `UPDATE t SET c = c * 1.5 + d WHERE d < ${int(30, 60)};`, `UPDATE t SET e = e || '!' WHERE a % ${int(3, 7)} = 0;`, `DELETE FROM t WHERE d > ${int(80, 95)};`, `SELECT count(*), sum(c), sum(length(e)) FROM t;`],
    trigger: () => [`CREATE TABLE t(a INTEGER PRIMARY KEY, v INTEGER);`, `CREATE TABLE log(a, v);`, `CREATE TRIGGER g AFTER INSERT ON t BEGIN INSERT INTO log VALUES(NEW.a, NEW.v * 2); END;`, `INSERT INTO t(v) SELECT x % ${int(50, 99)} FROM ${series(N(20000))};`, `SELECT count(*), sum(v) FROM log;`],
    numeric: () => [`SELECT sum(x * 1.0 / ${int(3, 11)}), sum(x % ${int(7, 31)}), sum(round(x / 7.0, 2)), sum(abs(${int(100, 999)} - x)), max(printf('%.3f', x / 3.0)) FROM ${series(N(60000))};`, `SELECT sum(CAST(printf('%d', x) AS INTEGER)), count(CAST(x AS TEXT)) FROM ${series(N(40000))};`],
  };
  return Object.entries(W).map(([k, f]) => ({ name: k, sql: f().join("\n") + "\n" }));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const out = path.resolve(opt.out ?? "workloads"); fs.mkdirSync(out, { recursive: true });
  for (const w of workloads(Number(opt.seed ?? 1), Number(opt.scale ?? 1))) fs.writeFileSync(path.join(out, `${w.name}.sql`), w.sql);
  console.log(`wrote 12 workloads (seed ${opt.seed ?? 1}) to ${out}`);
}

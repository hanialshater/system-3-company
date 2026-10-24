#!/usr/bin/env node
// Benchmark 10: the deterministic SQL corpus (B10.md "The SQL corpus"). One statement per line (sqlrun.c's contract).
//   node corpus.mjs --seed=<n> --n=<scripts> --out=<dir>       writes <dir>/<family>-<k>.sql
// Each script: a random schema and data, then statements from one main family and a few from others. Nothing in a
// script depends on time, randomness or the machine: no random(), randomblob(), 'now', changes of locale.
import fs from "node:fs";
import path from "node:path";

const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));

/** mulberry32: small, fast, deterministic */
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

export function generate(seed, n) {
  const R = rng(seed);
  const int = (lo, hi) => lo + Math.floor(R() * (hi - lo + 1));
  const pick = (a) => a[Math.floor(R() * a.length)];
  const chance = (p) => R() < p;
  const WORDS = ["alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa", "Lambda", "MU", "nu", "xi", "omicron", "pi", "rho", "sigma", "tau", "upsilon", "phi", "chi", "psi", "omega", "café", "naïve", "über", "señor", "Ελλάδα", "日本", "x_y", "a%b", "it's", "", " pad ", "1e3", "42", "-7", "0x1F", "NULL"];
  const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
  const num = () => pick([() => String(int(-1000, 1000)), () => String(int(-5, 5)), () => (R() * 2000 - 1000).toFixed(int(0, 4)), () => pick(["0", "-0.0", "1e308", "-1e308", "9223372036854775807", "-9223372036854775808", "0.1", "1e-7", "3.141592653589793", "2.5", "-2.5", "123456789012", "1.0e15", "4.5e-310"])])();
  const val = () => pick([num, num, () => q(pick(WORDS)), () => "NULL", () => `x'${[...Array(int(0, 6))].map(() => int(0, 255).toString(16).padStart(2, "0")).join("")}'`])();

  // a schema: 2-3 tables with mixed affinities
  function schema() {
    const out = [], tables = [];
    const nt = int(2, 3);
    for (let t = 0; t < nt; t++) {
      const name = `t${t}`, cols = [{ n: "id", ty: "INTEGER PRIMARY KEY" }];
      const nc = int(2, 5);
      for (let c = 0; c < nc; c++) cols.push({ n: `c${c}`, ty: pick(["INTEGER", "TEXT", "REAL", "NUMERIC", "BLOB", "", "INT", "VARCHAR(10)"]), extra: pick(["", "", "", " NOT NULL DEFAULT 0", " DEFAULT 'd'", " UNIQUE", ` CHECK(c${c} IS NULL OR length(c${c}) < 40)`, " COLLATE NOCASE"]) });
      if (t > 0 && chance(0.6)) cols.push({ n: "ref", ty: "INTEGER", extra: ` REFERENCES t${t - 1}(id)` });
      const strict = chance(0.12);
      if (strict) for (const c of cols) if (c.n !== "id") c.ty = c.n === "ref" ? "INTEGER" : pick(["INTEGER", "TEXT", "REAL", "ANY"]);
      const cdef = cols.map((c) => `${c.n} ${c.ty}${c.extra ?? ""}`.trim()).join(", ");
      out.push(`CREATE TABLE ${name}(${cdef})${strict ? " STRICT" : ""};`);
      tables.push({ name, cols: cols.map((c) => c.n), strict });
      const rows = int(3, 25);
      for (let r = 0; r < rows; r++) {
        // mostly values the column accepts (a few violations stay, for the constraint and type errors)
        const fit = (c) => { if (chance(0.06)) return val(); let v = strict && c.ty === "INTEGER" ? String(int(-500, 500)) : strict && c.ty === "REAL" ? (R() * 100 - 50).toFixed(3) : strict && c.ty === "TEXT" ? q(pick(WORDS)) : val(); if (/NOT NULL/.test(c.extra ?? "") && v === "NULL") v = "0"; return v; };
        const vs = cols.slice(1).map((c) => (c.n === "ref" ? (chance(0.8) ? String(int(1, 8)) : "NULL") : fit(c)));
        out.push(`INSERT ${chance(0.15) ? "OR IGNORE " : ""}INTO ${name}(${cols.slice(1).map((c) => c.n).join(", ")}) VALUES(${vs.join(", ")});`);
      }
    }
    if (chance(0.3)) out.push(`INSERT INTO t0(${tables[0].cols.slice(1).join(", ")}) SELECT ${tables[0].cols.slice(1).map((c, i) => (i === 0 ? "x" : i === 1 ? "x * 7 % 13" : "'v' || x")).join(", ")} FROM (WITH RECURSIVE s(x) AS (SELECT 1 UNION ALL SELECT x + 1 FROM s WHERE x < ${int(50, 3000)}) SELECT x FROM s);`);
    return { out, tables };
  }
  const col = (t) => pick(t.cols);
  const expr = (t, d = 0) => {
    if (d > 2 || chance(0.3)) return chance(0.6) ? col(t) : val();
    const a = expr(t, d + 1), b = expr(t, d + 1);
    return pick([
      () => `(${a} ${pick(["+", "-", "*", "/", "%", "||", "&", "|", "<<", ">>", "=", "<>", "<", ">=", "IS", "IS NOT", "AND", "OR"])} ${b})`,
      () => `CASE WHEN ${a} THEN ${b} ELSE ${expr(t, d + 1)} END`,
      () => `coalesce(${a}, ${b})`, () => `nullif(${a}, ${b})`, () => `CAST(${a} AS ${pick(["INTEGER", "REAL", "TEXT", "NUMERIC", "BLOB"])})`,
      () => `typeof(${a})`, () => `abs(${a})`, () => `-(${a})`, () => `NOT ${a}`, () => `${a} BETWEEN ${b} AND ${expr(t, d + 1)}`,
      () => `${a} IN (${b}, ${val()}, ${val()})`, () => `iif(${a}, ${b}, ${val()})`, () => `${a} IS NULL`,
    ])();
  };
  const where = (t) => (chance(0.6) ? ` WHERE ${expr(t, 1)}` : "");
  const order = (t, all = false) => ` ORDER BY ${(all ? t.cols : [col(t), "id"]).map((c) => `${c}${chance(0.3) ? " DESC" : ""}`).join(", ")}`;

  const FAMILIES = {
    expr: (t) => [`SELECT id, ${expr(t)}, ${expr(t)} FROM ${t.name}${order(t, true)};`, `SELECT ${expr(t)}, ${expr(t)};`.replace(/\bc\d+\b|\bref\b|\bid\b/g, () => val())],
    numfmt: () => { const v = num(); return [`SELECT printf('${pick(["%d", "%5.2f", "%e", "%.10g", "%g", "%x", "%o", "%,d", "%-8s|", "%08.3f", "%+d", "%.0f", "%!.15g", "%c", "%q", "%Q", "%w", "%%", "%lld", "%5s", "%.3s"])}', ${v}), round(${v}, ${int(0, 4)}), ${v} * ${num()}, ${v} / ${num()}, CAST(${v} AS TEXT), ${v} + 0.0;`]; },
    strings: () => { const s = q(pick(WORDS)), s2 = q(pick(WORDS)); return [`SELECT length(${s}), upper(${s}), lower(${s}), substr(${s}, ${int(-3, 4)}, ${int(0, 5)}), instr(${s}, ${s2}), replace(${s}, ${q(pick(["a", "e", "", "é"]))}, ${q(pick(["", "XY", "_"]))}), trim(${s}), ltrim(${s}, 'ab'), hex(${s}), quote(${s}), unicode(${s}), ${s} LIKE ${q(pick(["a%", "%a_", "_", "%", "A%", "%é%"]))}, ${s} GLOB ${q(pick(["a*", "*[a-m]*", "?", "*"]))}, char(${int(65, 90)}, ${int(200, 1000)}), ${s} || ${s2}, ${s} < ${s2}, ${s} = ${s2} COLLATE NOCASE;`]; },
    aggregates: (t) => { const c = col(t); return [`SELECT count(*), count(${c}), sum(${c}), total(${c}), avg(${c}), min(${c}), max(${c}), count(DISTINCT ${c}) FROM ${t.name}${where(t)};`, `SELECT ${c}, count(*), group_concat(id${chance(0.5) ? ", ';'" : ""}) FROM (SELECT * FROM ${t.name} ORDER BY id) GROUP BY ${c}${chance(0.4) ? ` HAVING count(*) > ${int(0, 2)}` : ""} ORDER BY ${c};`]; },
    joins: (t, T) => { const u = T[1]; const jt = pick(["JOIN", "LEFT JOIN", "CROSS JOIN", "LEFT OUTER JOIN"]); return [`SELECT a.id, b.id, a.${col(t)}, b.${col(u)} FROM ${t.name} a ${jt} ${u.name} b${jt.startsWith("CROSS") ? "" : ` ON ${u.cols.includes("ref") ? "b.ref = a.id" : `a.id ${pick(["=", "<", ">="])} b.id`}`} ORDER BY 1, 2 LIMIT ${int(5, 60)};`, `SELECT count(*) FROM ${t.name} a JOIN ${t.name} b USING(id)${where(t).replace(/WHERE /, "WHERE a.")};`.replace("a.(", "(")]; },
    subqueries: (t, T) => { const u = T[1]; return [`SELECT id, (SELECT count(*) FROM ${u.name} WHERE ${u.name}.id <= ${t.name}.id) FROM ${t.name}${order(t)};`, `SELECT id FROM ${t.name} WHERE id ${pick(["IN", "NOT IN"])} (SELECT id FROM ${u.name}${where(u)}) ORDER BY id;`, `SELECT id FROM ${t.name} x WHERE ${pick(["", "NOT "])}EXISTS (SELECT 1 FROM ${u.name} y WHERE y.id = x.id + ${int(0, 3)}) ORDER BY id;`, `SELECT ${col(t)} FROM ${t.name} ${pick(["UNION", "UNION ALL", "INTERSECT", "EXCEPT"])} SELECT ${col(u)} FROM ${u.name} ORDER BY 1 LIMIT ${int(3, 30)} OFFSET ${int(0, 3)};`]; },
    cte: () => [`WITH RECURSIVE f(n, a, b) AS (SELECT 1, 0, 1 UNION ALL SELECT n + 1, b, a + b FROM f WHERE n < ${int(5, 90)}) SELECT n, a FROM f ORDER BY n DESC LIMIT 5;`, `WITH RECURSIVE s(x) AS (SELECT ${int(1, 9)} UNION ALL SELECT CASE WHEN x % 2 THEN 3 * x + 1 ELSE x / 2 END FROM s WHERE x <> 1) SELECT count(*), max(x), group_concat(x) FROM s;`, `WITH a(x) AS (VALUES(1),(2),(3)), b(y) AS (SELECT x * x FROM a) SELECT x, y FROM a, b ORDER BY x, y;`],
    window: (t) => { const c = col(t); return [`SELECT id, ${c}, ${pick(["row_number()", "rank()", "dense_rank()", "percent_rank()", "cume_dist()", `ntile(${int(2, 4)})`, `lag(${c})`, `lead(${c}, ${int(1, 2)}, 'none')`, `first_value(${c})`, `last_value(${c})`, `nth_value(${c}, 2)`, `sum(id)`, `count(*)`, `group_concat(id, '.')`])} OVER (${chance(0.5) ? `PARTITION BY ${c} IS NULL ` : ""}ORDER BY id${chance(0.4) ? ` ${pick(["ROWS", "RANGE", "GROUPS"])} BETWEEN ${pick(["UNBOUNDED PRECEDING", "1 PRECEDING", "CURRENT ROW"])} AND ${pick(["CURRENT ROW", "1 FOLLOWING", "UNBOUNDED FOLLOWING"])}` : ""}) FROM ${t.name} ORDER BY id;`]; },
    json: (t) => { const j = pick([`'{"a":1,"b":[1,2,{"c":"x"}],"d":null,"e":1.5e3}'`, `'[1,"two",3.0,true,false,null,{"k":"v"}]'`, `'{"name":"café","tags":["a","b"],"n":{"m":{"o":-1}}}'`, `'not json'`, `'{"a":}'`]); return [`SELECT json_valid(${j}), json(${j}), json_type(${j}), json_array_length(${j}), json_extract(${j}, '$.a', '$[1]', '$.b[2].c'), ${j} -> '$.b', ${j} ->> '$.n.m.o';`, `SELECT key, value, type FROM json_each(${j}) ORDER BY key;`, `SELECT json_set(${j}, '$.z', 1), json_insert(${j}, '$.a', 2), json_remove(${j}, '$.a'), json_patch('{"a":1}', '{"b":2}');`, `SELECT json_group_array(id), json_group_object(CAST(id AS TEXT), ${col(t)}) FROM ${t.name};`, `SELECT json_object('id', id, 'v', ${col(t)}) FROM ${t.name} ORDER BY id LIMIT 4;`]; },
    indexes: (t) => { const c = col(t); const nm = `i${int(0, 99)}`; return [`CREATE ${chance(0.3) ? "UNIQUE " : ""}INDEX IF NOT EXISTS ${nm} ON ${t.name}(${c}${chance(0.3) ? " DESC" : ""}, id)${chance(0.3) ? ` WHERE ${c} IS NOT NULL` : ""};`, `SELECT id, ${c} FROM ${t.name} WHERE ${c} ${pick([">", "<=", "=", "IS NOT"])} ${val()} ORDER BY ${c}, id;`, `SELECT count(*) FROM ${t.name} INDEXED BY ${nm} WHERE ${c} IS NOT NULL;`, `REINDEX ${t.name};`, `DROP INDEX IF EXISTS ${nm};`]; },
    dml: (t) => { const c = t.cols[1]; return [`UPDATE ${t.name} SET ${c} = ${expr(t, 1)}${where(t)};`, `DELETE FROM ${t.name} WHERE id % ${int(2, 5)} = ${int(0, 1)};`, `INSERT INTO ${t.name}(id, ${c}) VALUES(${int(1, 6)}, ${val()}) ON CONFLICT(id) DO UPDATE SET ${c} = excluded.${c} || '!';`, `REPLACE INTO ${t.name}(id, ${c}) VALUES(${int(1, 9)}, ${val()});`, `INSERT INTO ${t.name}(${c}) VALUES(${val()}) RETURNING id, ${c};`, `SELECT * FROM ${t.name}${order(t, true)};`]; },
    txn: (t) => { const c = t.cols[1]; return [`BEGIN;`, `UPDATE ${t.name} SET ${c} = NULL WHERE id < ${int(2, 9)};`, `SAVEPOINT s1;`, `DELETE FROM ${t.name} WHERE id > ${int(2, 9)};`, pick([`ROLLBACK TO s1;`, `RELEASE s1;`]), `SELECT count(*), count(${c}) FROM ${t.name};`, pick([`COMMIT;`, `ROLLBACK;`]), `SELECT count(*) FROM ${t.name};`, `COMMIT;`]; },
    triggers: (t, T) => { const u = T[1]; return [`CREATE TABLE IF NOT EXISTS log(x, y);`, (() => { const ev = pick(["INSERT", "DELETE", "UPDATE"]); return `CREATE TRIGGER IF NOT EXISTS g${t.name} ${pick(["AFTER", "BEFORE"])} ${ev} ON ${t.name} BEGIN INSERT INTO log VALUES('${t.name}', ${ev === "INSERT" ? "NEW" : ev === "DELETE" ? "OLD" : pick(["NEW", "OLD"])}.id); END;`; })(), `INSERT INTO ${t.name}(id) VALUES(${int(100, 200)});`, `UPDATE ${t.name} SET id = id + 1000 WHERE id < 3;`, `DELETE FROM ${t.name} WHERE id > 1000;`, `SELECT * FROM log ORDER BY rowid;`, `CREATE VIEW IF NOT EXISTS v${t.name} AS SELECT a.id, b.id AS bid FROM ${t.name} a LEFT JOIN ${u.name} b ON a.id = b.id;`, `SELECT * FROM v${t.name} ORDER BY id LIMIT 10;`]; },
    datetime: () => { const d = pick(["'2024-02-29'", "'2000-01-01 12:34:56'", "'1970-01-01'", "'2038-01-19 03:14:07'", "2451545.0", "'1999-12-31T23:59:59.999'", "1700000000", "'bad'"]); return [`SELECT date(${d}), time(${d}), datetime(${d}, '${pick(["+1 day", "-1 month", "+1 year", "start of month", "weekday 0", "+12 hours", "unixepoch", "localtime"]).replace("localtime", "+0 seconds")}'), julianday(${d}), strftime('${pick(["%Y-%m-%d %H:%M:%S", "%j %w %W", "%s", "%f", "%J"])}', ${d}), unixepoch(${d}), timediff('2024-03-01', '2023-01-15');`]; },
    errors: (t) => [pick([`SELEC 1;`, `SELECT * FROM ${t.name} WHERE;`, `INSERT INTO ${t.name}(nope) VALUES(1);`, `SELECT ${t.name}.nope FROM ${t.name};`, `CREATE TABLE ${t.name}(x);`, `SELECT 1 FROM (SELECT 1, 2) ORDER BY 3;`, `SELECT abs(-9223372036854775808);`, `SELECT CAST('9e999' AS REAL), 1 / 0, 1 % 0, 9223372036854775807 + 1;`, `INSERT INTO ${t.name}(id) VALUES(1), (1);`, `SELECT json('{');`, `SELECT substr();`, `SELECT x'zz';`, `DROP TABLE nope;`, `COMMIT;`, `ROLLBACK TO nope;`, `SELECT 'a' + 'b', 'a' > 1, x'01' < 1;`])],
    pragma: (t) => [`PRAGMA table_info(${t.name});`, `PRAGMA index_list(${t.name});`, `PRAGMA foreign_key_list(${t.name});`, `PRAGMA integrity_check;`, `SELECT name, type FROM sqlite_schema ORDER BY name;`],
  };
  const names = Object.keys(FAMILIES), scripts = [];
  for (let k = 0; k < n; k++) {
    const fam = names[k % names.length];
    const { out, tables } = schema();
    const lines = [...out];
    const T = tables, t0 = T[0];
    const reps = int(3, 7);
    for (let r = 0; r < reps; r++) lines.push(...FAMILIES[fam](pick(T), [t0, T[1] ?? t0]));
    for (let r = 0; r < int(1, 3); r++) { const f2 = pick(names); lines.push(...FAMILIES[f2](pick(T), [t0, T[1] ?? t0])); }
    scripts.push({ name: `${fam}-${String(k).padStart(4, "0")}`, family: fam, sql: lines.join("\n") + "\n" });
  }
  return scripts;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const seed = Number(opt.seed ?? 1), n = Number(opt.n ?? 100), out = path.resolve(opt.out ?? "corpus");
  fs.mkdirSync(out, { recursive: true });
  for (const s of generate(seed, n)) fs.writeFileSync(path.join(out, `${s.name}.sql`), s.sql);
  console.log(`wrote ${n} scripts (seed ${seed}) to ${out}`);
}

// Benchmark 8 material: chibicc's test/*.c adapted to standalone programs.
// Each ASSERT(x, y) in main becomes a "unit": check(id, x, (y)); and a GNU statement expression that is the whole
// second argument, ASSERT(x, ({ S...; e; })), becomes the block { S... check(id, x, (e)); } (the same scoping).
// test.h is replaced by a W1-level support prelude (check() on printf and exit), and test/common's definitions are
// added where a unit uses them. A program for a set of units holds: the support prelude, the common and top-level
// items the units need (by identifier closure), and main with its other statements and only those units.
import fs from "node:fs";
import path from "node:path";
import { mask, topItems, bodySegments, splitArgs, matchClose, identifiers } from "./ctok.mjs";
import { userDecls, astOf } from "./tagger.mjs";

export const SUPPORT = `int printf(const char *fmt, ...);
void exit(int status);
void check(int id, int expected, int actual) {
  if (expected == actual) {
    printf("%d => %d\\n", id, actual);
  } else {
    printf("%d => %d expected but got %d\\n", id, expected, actual);
    exit(1);
  }
}
`;
// prototypes test.h gave, in standard form, added when a unit names one and no included header declares it
const PROTOS = {
  sprintf: "int sprintf(char *buf, const char *fmt, ...);",
  strcmp: "int strcmp(const char *a, const char *b);",
  strncmp: "int strncmp(const char *a, const char *b, unsigned long n);",
  memcmp: "int memcmp(const void *a, const void *b, unsigned long n);",
  strlen: "unsigned long strlen(const char *s);",
  memcpy: "void *memcpy(void *dst, const void *src, unsigned long n);",
  memset: "void *memset(void *s, int c, unsigned long n);",
};

export function headerNames(incDir) {
  const names = {};
  for (const h of fs.readdirSync(incDir)) {
    const t = fs.readFileSync(path.join(incDir, h), "utf8");
    const s = new Set();
    for (const m of t.matchAll(/([A-Za-z_]\w*)\s*\(/g)) s.add(m[1]);
    for (const m of t.matchAll(/#\s*define\s+([A-Za-z_]\w*)/g)) s.add(m[1]);
    for (const m of t.matchAll(/typedef[^;]*?([A-Za-z_]\w*)\s*(\[[^\]]*\])?\s*;/g)) s.add(m[1]);
    const inc = [...t.matchAll(/#\s*include\s*<([^>]+)>/g)].map((m) => m[1]);
    names[h] = { names: s, inc };
  }
  // transitive includes
  const all = (h, seen = new Set()) => { if (seen.has(h) || !names[h]) return new Set(); seen.add(h); const s = new Set(names[h].names); for (const i of names[h].inc) for (const x of all(i, seen)) s.add(x); return s; };
  return Object.fromEntries(Object.keys(names).map((h) => [h, all(h)]));
}

// [prefix, lastStatement] of a statement list whose last statement is an expression statement, or null
function lastStatement(body) {
  const m = mask(body);
  let e = m.length - 1;
  while (e >= 0 && /\s/.test(m[e])) e--;
  if (m[e] !== ";") return null;
  let k = e - 1, depth = 0;
  const openOf = { ")": "(", "]": "[", "}": "{" };
  for (; k >= 0; k--) {
    const c = m[k];
    if (c === ")" || c === "]") depth++;
    else if (c === "(" || c === "[") depth--;
    else if (depth === 0 && c === ";") break;
    else if (depth === 0 && c === "{") break;
    else if (depth === 0 && c === "}") {
      // a '}' followed by a member access or subscript belongs to a compound literal inside the expression
      let a = k + 1; while (a < m.length && /\s/.test(m[a])) a++;
      if (m[a] === "." || m[a] === "[" || (m[a] === "-" && m[a + 1] === ">")) {
        // skip back to the matching '{'
        let d = 0;
        for (; k >= 0; k--) { if (m[k] === "}") d++; else if (m[k] === "{") { d--; if (d === 0) break; } }
        continue;
      }
      break;
    }
    if (depth < 0) return null;
  }
  const start = k + 1;
  const last = body.slice(start, e + 1).trim();
  if (!last || last === ";") return null;
  return [body.slice(0, start), last];
}

function convertAssert(text, id) {
  // text: "ASSERT( ... );" possibly with leading whitespace/newlines
  const lead = text.match(/^\s*/)[0];
  const t = text.slice(lead.length);
  const m = mask(t);
  const open = t.indexOf("(");
  const close = matchClose(m, open);
  if (close < 0 || !/^\s*;\s*$/.test(t.slice(close + 1))) return null;
  const args = splitArgs(t.slice(open + 1, close));
  if (args.length !== 2) return null;
  const [x, yRaw] = args.map((a) => a.trim());
  const y = yRaw;
  if (y.startsWith("({") && y.endsWith("})") && matchClose(mask(y), 1) === y.length - 2) {
    const body = y.slice(2, -2);
    const split = lastStatement(body);
    if (!split) return null;
    const [prefix, last] = split;
    if (/^(if|for|while|do|switch|return|goto|break|continue|case|default|else)\b/.test(last) || /^[A-Za-z_]\w*\s*:[^:]/.test(last)) return null;
    // a declaration as the last statement has no value
    if (/^(int|char|short|long|unsigned|signed|struct|union|enum|typedef|static|extern|const|volatile|float|double|_Bool|void)\b/.test(last)) return null;
    return `${lead}{${prefix} check(${id}, ${x}, (${last.slice(0, -1).trim()})); }`;
  }
  return `${lead}check(${id}, ${x}, (${y}));`;
}

// Parse one chibicc test file into { name, units, build(unitIdxs) -> source }
// File-specific adaptations (line counts kept where __LINE__ is tested): macro.c's quoted includes become the macros
// and definitions those headers give, __FILE__ becomes the path chibicc's test expects, and the ASSERTs on
// implementation macros (__DATE__, __TIME__, __COUNTER__, __TIMESTAMP__, __BASE_FILE__) are removed.
const PATCHES = {
  macro: [
    [/^#include "include1\.h"$/m, 'int include1 = 5; int include2 = 7; char *include1_filename = "test/include1.h"; int include1_line = 4;'],
    [/\b__FILE__\b/g, '"test/macro.c"'],
    [/^#include "\/no\/such\/file"$/m, ""],
    [/^#include "include3\.h"$/m, "#undef foo\n#define foo 3"],
    [/^#include "include4\.h"$/m, "#undef foo\n#define foo 4"],
    [/^#define M13 "include3\.h"\n#include M13$/m, "#undef foo\n#define foo 3"],
    [/^#define M13 < include4\.h\n#include M13 >$/m, "#undef foo\n#define foo 4"],
    [/^.*\b(__DATE__|__TIME__|__COUNTER__|__TIMESTAMP__|__BASE_FILE__)\b.*$/gm, ""],
    // GNU named variadic macros (args...) and the assert( trick built on chibicc's own assert() are removed
    [/^.*#define \w+\([^)\n]*\w\.\.\.\).*$/gm, ""],
    [/^.*\bASSERT_\b.*$/gm, ""],
    [/^#(define|undef) (if|five|END)\b.*$/gm, ""],
    [/^.*\b__VA_OPT__\b.*$/gm, ""],
    // chibicc redefines macros freely; ISO C needs an #undef first (inside main only, so the __LINE__ tests at the
    // top keep their lines)
    [/int main\(\) \{[\s\S]*$/, (m) => m.replace(/^([ \t]*)#define ([A-Za-z_]\w*)/gm, "$1#undef $2\n$1#define $2")],
  ],
};

export function parseChibicc(file, commonSrc, incDir, workDir) {
  const name = path.basename(file, ".c");
  let src = fs.readFileSync(file, "utf8").replace(/^[ \t]*#[ \t]*include[ \t]*"test\.h"[ \t]*\n/m, "\n");
  for (const [re, to] of PATCHES[name] ?? []) src = src.replace(re, to);
  const items = topItems(src).map((it) => ({ ...it, from: "file" }));
  const mainIdx = items.findIndex((it) => it.kind === "decl" && /^\s*int\s+main\s*\(/.test(it.text));
  if (mainIdx < 0) return { name, units: [], error: "no main" };
  const mainItem = items[mainIdx];
  const mm = mask(mainItem.text);
  const ob = mm.indexOf("{"), cb = matchClose(mm, ob);
  const head = mainItem.text.slice(0, ob + 1), tail = mainItem.text.slice(cb);
  const segs = bodySegments(mainItem.text.slice(ob + 1, cb));
  const units = [], segPlan = [];
  for (const s of segs) {
    if (s.kind === "stmt" && /^\s*ASSERT\s*\(/.test(s.text)) {
      const id = units.length + 1;
      const conv = convertAssert(s.text, id);
      const lead = s.text.match(/^\s*/)[0];
      units.push({ id, orig: s.text.trim(), conv, lead });
      segPlan.push({ unit: id });
    } else segPlan.push({ text: s.text, kind: s.kind });
  }
  const ppInMain = segs.some((s) => s.kind === "pp");
  // common items (minus the includes we re-add on demand and assert, which check() replaces)
  const common = topItems(commonSrc).filter((it) => !(it.kind === "decl" && /\bassert\s*\(/.test(it.text.split("{")[0]))).map((it) => ({ ...it, from: "common" }));
  const topCond = items.some((it) => it.kind === "pp" && /^#\s*(if|ifdef|ifndef|elif|else|endif|undef)\b/.test(it.text.trim()));
  const noPrune = ppInMain || topCond;
  const hdr = headerNames(incDir);
  const prelude = [...common, ...items.filter((_, i) => i !== mainIdx)];
  // names each item declares
  const allMain = (unitIds) => segPlan.map((p) => (p.unit ? (unitIds.includes(p.unit) ? units[p.unit - 1].conv ?? "" : "") : p.text));
  const assemble = (sel, unitIds, all = false) => {
    const mainBody = (all || noPrune ? allMain(unitIds) : planFor(unitIds)).join("");
    const chosen = new Set(sel);
    const parts = [SUPPORT];
    for (const it of common) if (chosen.has(it)) parts.push(it.text.trimEnd() + "\n");
    for (let i = 0; i < items.length; i++) {
      if (i === mainIdx) parts.push(`${head}${mainBody}${tail}\n`);
      else if (chosen.has(items[i])) parts.push(items[i].text.trimEnd() + "\n");
    }
    return parts.join("");
  };
  // declared names by clang on the whole program (all items, all units)
  for (const it of prelude) {
    it.names = new Set();
    if (it.kind === "pp") {
      const d = it.text.match(/^#\s*define\s+([A-Za-z_]\w*)/);
      if (d) it.names.add(d[1]);
      const h = it.text.match(/^#\s*include\s*<([^>]+)>/);
      if (h && hdr[h[1]]) for (const x of hdr[h[1]]) it.names.add(x);
    }
  }
  let astOk = true;
  {
    const wholeSel = prelude;
    const whole = assemble(wholeSel, units.map((u) => u.id), true);
    const tmp = path.join(workDir, `${name}.whole.c`);
    fs.writeFileSync(tmp, whole);
    // offsets of each item in the assembled text
    const offs = [];
    let at = SUPPORT.length;
    for (const it of common) { offs.push([it, at, at + it.text.trimEnd().length + 1]); at += it.text.trimEnd().length + 1; }
    for (let i = 0; i < items.length; i++) {
      if (i === mainIdx) { at += head.length + allMain(units.map((u) => u.id)).join("").length + tail.length + 1; continue; }
      const L = items[i].text.trimEnd().length + 1;
      offs.push([items[i], at, at + L]); at += L;
    }
    try {
      const ast = astOf(tmp, incDir, true);
      for (const d of userDecls(ast, tmp)) {
        const o = d.loc?.offset ?? d.loc?.expansionLoc?.offset ?? d.range?.begin?.offset ?? d.range?.begin?.expansionLoc?.offset;
        const hit = offs.find(([, a, b]) => o >= a && o < b);
        if (!hit) continue;
        const it = hit[0];
        if (d.name) it.names.add(d.name);
        const walk = (n) => { if (n.kind === "EnumConstantDecl" && n.name) it.names.add(n.name); if ((n.kind === "RecordDecl" || n.kind === "EnumDecl") && n.name) it.names.add(n.name); for (const c of n.inner ?? []) if (c.kind !== "CompoundStmt") walk(c); };
        walk(d);
      }
    } catch { astOk = false; }
  }
  // main's other statements: pp lines, declarations and return always stay; a plain statement stays when it names
  // something a selected unit names (g1 = 3; before ASSERT(3, g1)), so a lone `1 ? -2 : (void)-1;` does not tag them all
  const SUPPORT_NAMES = new Set(["printf", "exit", "check"]);
  const KW = new Set(["int", "char", "short", "long", "unsigned", "signed", "struct", "union", "enum", "typedef", "static", "extern", "const", "volatile", "float", "double", "_Bool", "void", "return", "if", "else", "for", "while", "do", "switch", "case", "default", "break", "continue", "goto", "sizeof"]);
  const ids = (t) => new Set([...identifiers(t)].filter((x) => !KW.has(x) && !SUPPORT_NAMES.has(x)));
  for (const p of segPlan) {
    if (p.unit) continue;
    const t = p.text.trim();
    p.always = p.kind === "pp" || t === "" || /^return\b/.test(t) || /^(int|char|short|long|unsigned|signed|struct|union|enum|typedef|static|extern|const|volatile|float|double|_Bool|void)\b/.test(t);
    p.ids = ids(p.text);
  }
  const planFor = (unitIds) => {
    const keep = new Set(unitIds), want = new Set();
    for (const id of unitIds) for (const x of ids(units[id - 1].conv ?? "")) want.add(x);
    return segPlan.map((p) => (p.unit ? (keep.has(p.unit) ? units[p.unit - 1].conv : "") : (p.always || [...p.ids].some((x) => want.has(x)) ? p.text : "")));
  };
  const select = (unitIds) => {
    if (!astOk) return prelude;
    // noPrune (preprocessor lines in main or top-level conditionals): every item of the file stays; common's
    // definitions are still added only where named
    const want = new Set();
    for (const t of noPrune ? allMain(unitIds) : planFor(unitIds)) for (const x of ids(t)) want.add(x);
    if (noPrune) for (const it of items) if (it !== mainItem) for (const x of ids(it.text)) want.add(x);
    const sel = new Set(noPrune ? items.filter((it) => it !== mainItem) : []);
    let grew = true;
    while (grew) {
      grew = false;
      for (const it of prelude) {
        if (sel.has(it)) continue;
        if ([...it.names].some((x) => want.has(x))) { sel.add(it); grew = true; for (const x of ids(it.text)) want.add(x); }
      }
    }
    // test/common was its own translation unit: a typedef the file repeats from it is dropped (one definition)
    const commonNames = new Set([...sel].filter((it) => it.from === "common").flatMap((it) => [...it.names]));
    for (const it of [...sel]) if (it.from === "file" && /^\s*typedef\b/.test(it.text) && it.names.size && [...it.names].every((x) => commonNames.has(x))) sel.delete(it);
    return prelude.filter((it) => sel.has(it));
  };
  const build = (unitIds) => {
    const sel = select(unitIds);
    let text = assemble(sel, unitIds);
    // prototypes test.h used to give
    const ids = identifiers(text);
    const declared = new Set();
    for (const it of sel) if (it.kind === "pp") for (const x of it.names) declared.add(x);
    const extra = Object.entries(PROTOS).filter(([f]) => ids.has(f) && !declared.has(f) && !new RegExp(`\\b(int|char|void|long|unsigned)\\b[^;(){}=]*\\b${f}\\s*\\(`).test(mask(text))).map(([, p]) => p);
    if (extra.length) text = text.replace(SUPPORT, SUPPORT + extra.join("\n") + "\n");
    return text;
  };
  return { name, units, build, noPrune, astOk };
}

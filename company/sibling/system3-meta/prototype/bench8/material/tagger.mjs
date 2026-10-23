// Benchmark 8 material: the automated feature tagger. A test's first wave is the highest wave of any feature it uses;
// its category is that wave's first feature (in the wave's CATEGORY order) the test uses. Features come from clang's
// JSON AST of the test's own top-level declarations (never the provided headers') and from its preprocessor lines.
// A test that uses anything out of scope gets reasons[] and is dropped.
import { spawnSync } from "node:child_process";
import { mask } from "./ctok.mjs";

export const FEATURE_WAVE = {
  // W1
  expressions: 1, control: 1, functions: 1,
  // W2
  pointers: 2, arrays: 2, strings: 2, globals: 2, char: 2,
  // W3
  structs: 3, unions: 3, typedef: 3, enums: 3, sizeof: 3, initializers: 3,
  // W4
  include: 4, define: 4, "macro-function": 4, conditional: 4, "stringize-paste": 4, varargs: 4,
  // W5
  switch: 5, goto: 5, casts: 5, "integer-types": 5, bitwise: 5, "function-pointers": 5, storage: 5, floating: 5, misc: 5,
};
// category priority inside each wave (first present wins)
export const CATEGORY_ORDER = {
  1: ["functions", "control", "expressions"],
  2: ["strings", "char", "globals", "arrays", "pointers"],
  3: ["unions", "enums", "typedef", "initializers", "sizeof", "structs"],
  4: ["varargs", "stringize-paste", "macro-function", "conditional", "define", "include"],
  5: ["floating", "function-pointers", "goto", "switch", "misc", "storage", "bitwise", "casts", "integer-types"],
};

// The functions a test may call that it does not define: those the provided headers declare, and the va intrinsics.
export const ALLOWED_EXTERNAL = new Set([
  "printf", "sprintf", "snprintf", "vprintf", "vsprintf", "vsnprintf", "puts", "putchar",
  "malloc", "calloc", "realloc", "free", "exit", "abort", "atoi", "atol", "abs", "labs", "qsort",
  "strlen", "strcmp", "strncmp", "strcpy", "strncpy", "strcat", "strncat", "strchr", "strrchr", "strstr",
  "memcpy", "memmove", "memset", "memcmp", "memchr",
  "__builtin_va_start", "__builtin_va_end", "__builtin_va_copy",
]);
export const HEADERS = new Set(["stdio.h", "stdlib.h", "string.h", "stdarg.h", "stddef.h", "stdbool.h", "limits.h", "stdint.h"]);
const PREDEF_OK = new Set(["__LINE__", "__STDC__", "__STDC_VERSION__", "__x86_64__", "__LP64__", "__VA_ARGS__"]);

// ---- preprocessor (text) features ----
export function ppFeatures(src) {
  const f = new Set(), reasons = [];
  const m = mask(src);
  const lines = m.split("\n"), raw = src.split("\n");
  for (let li = 0; li < lines.length; li++) {
    const t = lines[li].trim();
    if (!t.startsWith("#")) continue;
    // join continuation lines
    let full = t, rawFull = raw[li];
    while (/\\\s*$/.test(full) && li + 1 < lines.length) { full = full.replace(/\\\s*$/, " ") + lines[++li].trim(); rawFull += "\n" + raw[li]; }
    const dm = full.match(/^#\s*([a-z]*)/);
    const d = dm ? dm[1] : "";
    if (d === "") continue; // null directive
    if (d === "include") {
      const r = rawFull.match(/#\s*include\s*<([^>]+)>/);
      if (!r) reasons.push("include-quoted");
      else if (!HEADERS.has(r[1])) reasons.push(`header ${r[1]}`);
      f.add("include");
    } else if (d === "define") {
      const dd = full.match(/^#\s*define\s+([A-Za-z_]\w*)(\()?(.*)$/);
      if (!dd) { reasons.push("bad-define"); continue; }
      f.add(dd[2] ? "macro-function" : "define");
      const body = dd[2] ? dd[3].replace(/^[^)]*\)/, "") : dd[3];
      if (/##/.test(body) || (dd[2] && /(^|[^#])#\s*[A-Za-z_]/.test(body))) f.add("stringize-paste");
    } else if (d === "undef") f.add("define");
    else if (["if", "ifdef", "ifndef", "elif", "else", "endif"].includes(d)) f.add("conditional");
    // #error is standard C; a test that gcc and clang compile has it only in a skipped group
    else if (d === "error") f.add("conditional");
    else reasons.push(`directive #${d}`);
  }
  // predefined / implementation macros and trigraphs
  for (const id of m.match(/\b__[A-Za-z0-9_]+__\b/g) ?? []) if (!PREDEF_OK.has(id)) reasons.push(`predefined ${id}`);
  if (/\b__LINE__\b/.test(m)) f.add("define");
  if (/\b__STDC(_VERSION)?__\b|\b__x86_64__\b|\b__LP64__\b/.test(m)) f.add("conditional");
  if (/\?\?[=\/'()!<>\-]/.test(src)) reasons.push("trigraph");
  if (/(^|[^A-Za-z0-9_])(L|u8|u|U)["']/.test(src.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ""))) reasons.push("wide-or-unicode-literal");
  if (/\\u[0-9a-fA-F]{4}|\\U[0-9a-fA-F]{8}/.test(src)) reasons.push("ucn");
  if (/[^\x00-\x7f]/.test(m)) reasons.push("non-ascii-source");
  return { features: f, reasons };
}

// ---- AST features ----
function typeFeatures(t, f, reasons) {
  if (!t) return;
  const s = ` ${t} `;
  if (/long double/.test(s)) reasons.push("long double");
  if (/_Complex|_Imaginary/.test(s)) reasons.push("complex");
  if (/_Atomic/.test(s)) reasons.push("atomic");
  if (/\bstruct\b/.test(s)) f.add("structs");
  if (/\bunion\b/.test(s)) f.add("unions");
  if (/\benum\b/.test(s)) f.add("enums");
  // a pointer to function prints as "int (*)(int)" (or "(*[3])(…)"); "int (*)[2]" is a pointer to array
  if (/\(\s*\*[^()]*\)\s*\(/.test(s)) f.add("function-pointers");
  if (/\[/.test(s)) f.add("arrays");
  if (/\[[^\]]*[A-Za-z_][^\]]*\]/.test(s)) reasons.push("vla");
  if (/\*/.test(s)) f.add("pointers");
  if (/\b(unsigned|long|short|_Bool|signed)\b/.test(s)) f.add("integer-types");
  if (/\bchar\b/.test(s)) f.add("char");
  if (/\b(float|double)\b/.test(s)) f.add("floating");
  if (/\b(volatile|restrict)\b/.test(s)) f.add("misc");
}
const typeOf = (n) => [n.type?.qualType, n.type?.desugaredQualType].filter(Boolean).join(" | ");

// Walk clang's JSON in emission order to know which file each top-level decl belongs to (clang prints "file" only
// when it changes from the previously printed location).
function locFiles(obj, st) {
  if (!obj || typeof obj !== "object") return;
  if (obj.spellingLoc || obj.expansionLoc) { locFiles(obj.spellingLoc, st); locFiles(obj.expansionLoc, st); st.exp = st.last; return; }
  if (typeof obj.file === "string") st.last = obj.file;
  st.exp = st.last;
}
function scanLocs(node, st) {
  // emission order: loc, range.begin, range.end, then children
  if (node.loc) locFiles(node.loc, st);
  const locFile = st.exp;
  if (node.range) { locFiles(node.range.begin, st); locFiles(node.range.end, st); }
  for (const c of node.inner ?? []) scanLocs(c, st);
  return locFile;
}

// clang's JSON AST; with tolerant, an AST of a file with errors is still returned (clang dumps what it parsed)
export function astOf(file, incDir, tolerant = false) {
  const r = spawnSync("clang", ["-Xclang", "-ast-dump=json", "-fsyntax-only", "-std=c11", "-w", "-nostdinc", "-I", incDir, file],
    { maxBuffer: 1 << 30, stdio: ["ignore", "pipe", "ignore"] });
  if ((r.status !== 0 && !tolerant) || !r.stdout?.length) throw new Error(`clang ast failed: ${file}`);
  return JSON.parse(r.stdout);
}

// the top-level decls written in the main file, with their offsets
export function userDecls(ast, mainFile) {
  const st = { last: null, exp: null }, decls = [];
  for (const d of ast.inner ?? []) {
    const lf = scanLocs(d, st);
    if (d.isImplicit) continue;
    if (lf === mainFile) decls.push(d);
  }
  return decls;
}

export function astFeatures(ast, mainFile) {
  const f = new Set(), reasons = [];
  const decls = userDecls(ast, mainFile);
  const defined = new Set(), calledUser = new Set(), externRefs = new Set();
  let recursion = false;
  for (const d of decls) if (d.kind === "FunctionDecl" && (d.inner ?? []).some((c) => c.kind === "CompoundStmt")) defined.add(d.name);

  const visit = (n, parent, ctx) => {
    const k = n.kind;
    if (/Attr$/.test(k)) reasons.push(`attribute ${k}`);
    switch (k) {
      case "FunctionDecl": {
        const hasBody = (n.inner ?? []).some((c) => c.kind === "CompoundStmt");
        if (hasBody) {
          const ft = n.type?.qualType ?? "";
          if (/\.\.\.\)/.test(ft)) f.add("varargs");
          const params = (n.inner ?? []).filter((c) => c.kind === "ParmVarDecl");
          if (/\(\)$/.test(ft.replace(/\s+$/, "")) && params.length) reasons.push("k&r-definition");
          // return type: the qualType before the parameter list
          typeFeatures(ft.replace(/\((?:[^()]|\([^()]*\))*\)\s*$/, ""), f, reasons);
          if (n.storageClass === "static" || n.storageClass === "extern") f.add("storage");
          if (n.inline) f.add("misc");
          for (const c of n.inner ?? []) visit(c, n, { fn: n.name, depth: 0 });
        } else if (ctx.fn) {
          // a block-scope function declaration
          if (n.storageClass) f.add("storage");
        }
        return;
      }
      case "ParmVarDecl": typeFeatures(typeOf(n), f, reasons); break;
      case "VarDecl": {
        typeFeatures(typeOf(n), f, reasons);
        if (!ctx.fn) f.add("globals");
        if (n.storageClass === "static" || n.storageClass === "extern") f.add("storage");
        if (n.tls) reasons.push("thread-local");
        if (n.init) {
          const kids = n.inner ?? [];
          const strInit = kids.some((c) => c.kind === "StringLiteral") && /\[/.test(typeOf(n));
          if (strInit) f.add("initializers");
          if (!ctx.fn && !strInit) {
            // a global whose initializer refers to a name or a string needs relocations: an initializer feature
            const refs = JSON.stringify(kids);
            if (/"kind":"(DeclRefExpr|StringLiteral|AddrLabelExpr)"/.test(refs)) f.add("initializers");
          }
        }
        break;
      }
      case "FieldDecl": typeFeatures(typeOf(n), f, reasons); if (n.isBitfield) f.add("misc"); break;
      case "RecordDecl": f.add(n.tagUsed === "union" ? "unions" : "structs"); if (n.completeDefinition && !n.name && !ctx.fn && parent?.kind === "TranslationUnitDecl") {} break;
      case "EnumDecl": f.add("enums"); break;
      case "TypedefDecl": f.add("typedef"); typeFeatures(typeOf(n), f, reasons); break;
      case "StaticAssertDecl": f.add("misc"); break;
      case "IntegerLiteral": if (/unsigned|long/.test(n.type?.qualType ?? "")) f.add("integer-types"); break;
      case "CharacterLiteral": f.add("char"); break;
      case "FloatingLiteral": f.add("floating"); break;
      case "StringLiteral": {
        const p = ctx.callArg;
        if (!p) f.add("strings");
        break;
      }
      case "UnaryOperator":
        if (n.opcode === "&" || n.opcode === "*") f.add("pointers");
        if (n.opcode === "~") f.add("bitwise");
        if (n.opcode === "__extension__" || n.opcode === "__real" || n.opcode === "__imag") reasons.push(`gnu ${n.opcode}`);
        break;
      case "BinaryOperator": case "CompoundAssignOperator":
        if (/^(&|\||\^|<<|>>)=?$/.test(n.opcode)) f.add("bitwise");
        break;
      case "ArraySubscriptExpr": f.add("arrays"); break;
      case "MemberExpr": f.add("structs"); if (n.isArrow) f.add("pointers"); break;
      case "CStyleCastExpr": f.add("casts"); typeFeatures(typeOf(n), f, reasons); break;
      case "UnaryExprOrTypeTraitExpr":
        f.add("sizeof");
        if (n.argType) typeFeatures([n.argType.qualType, n.argType.desugaredQualType].filter(Boolean).join(" | "), f, reasons);
        if (n.name === "alignof" || n.name === "_Alignof" || n.name === "__alignof") f.add("sizeof");
        break;
      case "OffsetOfExpr": f.add("sizeof"); break;
      case "InitListExpr": case "DesignatedInitExpr": f.add("initializers"); break;
      case "CompoundLiteralExpr": f.add("misc"); break;
      case "VAArgExpr": f.add("varargs"); break;
      case "SwitchStmt": case "CaseStmt": case "DefaultStmt": f.add("switch"); break;
      case "GotoStmt": case "LabelStmt": f.add("goto"); break;
      case "IfStmt": case "WhileStmt": case "ForStmt": case "DoStmt": case "BreakStmt": case "ContinueStmt": f.add("control"); break;
      case "PredefinedExpr": f.add("misc"); break;
      case "StmtExpr": case "IndirectGotoStmt": case "AddrLabelExpr": case "BinaryConditionalOperator": case "GenericSelectionExpr":
      case "AtomicExpr": case "GCCAsmStmt": case "MSAsmStmt": case "ChooseExpr": case "BuiltinBitCastExpr": case "ConvertVectorExpr":
      case "ShuffleVectorExpr": case "ImaginaryLiteral": case "FixedPointLiteral":
        reasons.push(`out-of-scope ${k}`); break;
      case "DeclRefExpr": {
        const r = n.referencedDecl;
        if (r?.kind === "FunctionDecl") {
          const isCallee = ctx.callee;
          if (!isCallee) f.add("function-pointers");
          if (!defined.has(r.name)) {
            externRefs.add(r.name);
            if (!ALLOWED_EXTERNAL.has(r.name)) reasons.push(`external ${r.name}`);
          } else if (isCallee) { calledUser.add(r.name); if (r.name === ctx.fn) recursion = true; }
        } else if ((r?.kind === "VarDecl" || r?.kind === "ParmVarDecl") && /\(\s*\*[^()]*\)\s*\(/.test(`${r.type?.qualType ?? ""} ${r.type?.desugaredQualType ?? ""}`)) f.add("function-pointers");
        break;
      }
      case "CallExpr": {
        const [callee, ...args] = n.inner ?? [];
        // a direct call: callee is (ImplicitCastExpr FunctionToPointerDecay) of a DeclRefExpr to a function
        let c = callee, direct = false;
        while (c && (c.kind === "ImplicitCastExpr" || c.kind === "ParenExpr") && c.inner?.length === 1) {
          if (c.kind === "ImplicitCastExpr" && c.castKind === "FunctionToPointerDecay" && c.inner[0].kind === "DeclRefExpr" && c.inner[0].referencedDecl?.kind === "FunctionDecl") { direct = true; break; }
          c = c.inner[0];
        }
        if (callee?.kind === "ImplicitCastExpr" && callee.castKind === "BuiltinFnToFnPtr") direct = true;
        if (!direct) f.add("function-pointers");
        if (callee) visit(callee, n, { ...ctx, callee: direct, callArg: false });
        for (const a of args) {
          // a string literal passed straight to a call is W1 (printf("..."))
          let s = a;
          while (s && (s.kind === "ImplicitCastExpr" || s.kind === "ParenExpr") && s.inner?.length === 1) s = s.inner[0];
          if (s?.kind === "StringLiteral") { visit(s, n, { ...ctx, callee: false, callArg: true }); continue; }
          visit(a, n, { ...ctx, callee: false, callArg: false });
        }
        return;
      }
    }
    const wrap = k === "ImplicitCastExpr" || k === "ParenExpr";
    for (const c of n.inner ?? []) visit(c, n, { ...ctx, callee: wrap ? ctx.callee : false, callArg: false });
  };
  for (const d of decls) visit(d, { kind: "TranslationUnitDecl" }, { fn: null });
  if (recursion || [...calledUser].some((x) => x !== "main" && x !== "b8_main")) f.add("functions");
  f.add("expressions");
  return { features: f, reasons, externRefs: [...externRefs], defined: [...defined] };
}

export function classify(features) {
  let wave = 1;
  for (const x of features) wave = Math.max(wave, FEATURE_WAVE[x] ?? 1);
  const category = CATEGORY_ORDER[wave].find((c) => features.has(c)) ?? CATEGORY_ORDER[wave].at(-1);
  return { wave, category };
}

// Tag one file (path on disk, mainName = the name clang prints for it, usually the path given).
export function tag(file, src, incDir) {
  const pp = ppFeatures(src);
  let ast;
  try { ast = astOf(file, incDir); } catch (e) { return { reasons: ["clang-ast-failed"], features: [], wave: 0 }; }
  const a = astFeatures(ast, file);
  const features = new Set([...pp.features, ...a.features]);
  const reasons = [...pp.reasons, ...a.reasons];
  const { wave, category } = classify(features);
  return { reasons: [...new Set(reasons)], features: [...features].sort(), wave, category, externRefs: a.externRefs };
}

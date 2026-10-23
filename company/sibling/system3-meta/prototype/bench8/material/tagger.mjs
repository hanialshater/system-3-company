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
  // W5 (pilot fix, 2026-10-23): GNU extensions and variable-length arrays, their own categories (W5.md lists them)
  gnu: 5, vla: 5,
};
// category priority inside each wave (first present wins)
export const CATEGORY_ORDER = {
  1: ["functions", "control", "expressions"],
  2: ["strings", "char", "globals", "arrays", "pointers"],
  3: ["unions", "enums", "typedef", "initializers", "sizeof", "structs"],
  4: ["varargs", "stringize-paste", "macro-function", "conditional", "define", "include"],
  5: ["floating", "gnu", "vla", "function-pointers", "goto", "switch", "misc", "storage", "bitwise", "casts", "integer-types"],
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
const PREDEF_OK = new Set(["__LINE__", "__STDC__", "__STDC_VERSION__", "__x86_64__", "__LP64__", "__VA_ARGS__", "__func__"]);
// attribute names in their __x__ spelling: the text scan lets them through as gnu, and the AST decides (GNU_ATTRS)
const ATTR_WORDS = new Set(["__packed__", "__aligned__", "__unused__", "__used__", "__noinline__", "__noclone__", "__noipa__", "__always_inline__", "__noreturn__", "__pure__", "__nothrow__", "__cold__", "__hot__", "__format__", "__printf__", "__nonnull__", "__warn_unused_result__", "__deprecated__", "__malloc__", "__may_alias__", "__mode__", "__section__", "__weak__", "__alias__", "__visibility__", "__vector_size__", "__transparent_union__", "__cleanup__", "__regparm__", "__byte__", "__word__", "__pointer__"]);
// gcc's type, limit, size and byte-order macros (CONTRACT.md section 3 lists their values): W4 `define` features
// (pilot fix: about a fifth of the torture tests dropped as out of scope used one of these)
export const PREDEF_GCC = new Set([
  "__SIZE_TYPE__", "__PTRDIFF_TYPE__", "__WCHAR_TYPE__", "__WINT_TYPE__", "__INTMAX_TYPE__", "__UINTMAX_TYPE__", "__INTPTR_TYPE__", "__UINTPTR_TYPE__",
  "__INT8_TYPE__", "__INT16_TYPE__", "__INT32_TYPE__", "__INT64_TYPE__", "__UINT8_TYPE__", "__UINT16_TYPE__", "__UINT32_TYPE__", "__UINT64_TYPE__",
  "__CHAR_BIT__", "__SCHAR_MAX__", "__SHRT_MAX__", "__INT_MAX__", "__LONG_MAX__", "__LONG_LONG_MAX__", "__WCHAR_MAX__", "__WCHAR_MIN__",
  "__SIZE_MAX__", "__PTRDIFF_MAX__", "__INTMAX_MAX__", "__UINTMAX_MAX__", "__INTPTR_MAX__", "__UINTPTR_MAX__",
  "__INT8_MAX__", "__INT16_MAX__", "__INT32_MAX__", "__INT64_MAX__", "__UINT8_MAX__", "__UINT16_MAX__", "__UINT32_MAX__", "__UINT64_MAX__",
  "__SIZEOF_INT__", "__SIZEOF_LONG__", "__SIZEOF_LONG_LONG__", "__SIZEOF_SHORT__", "__SIZEOF_POINTER__", "__SIZEOF_FLOAT__", "__SIZEOF_DOUBLE__",
  "__SIZEOF_SIZE_T__", "__SIZEOF_PTRDIFF_T__", "__SIZEOF_WCHAR_T__",
  "__BYTE_ORDER__", "__ORDER_LITTLE_ENDIAN__", "__ORDER_BIG_ENDIAN__", "__ORDER_PDP_ENDIAN__", "__FLOAT_WORD_ORDER__",
]);
// GNU spellings that are W5 `gnu` (W5.md "GNU extensions in scope")
const GNU_WORDS = new Set(["__attribute__", "__attribute", "__extension__", "__typeof__", "__typeof", "typeof", "__alignof__", "__alignof", "__inline__", "__inline", "__const__", "__const", "__volatile__", "__volatile", "__signed__", "__signed", "__restrict__", "__restrict", "__label__", "__FUNCTION__", "__PRETTY_FUNCTION__", "__COUNTER__"]);
// the builtins in scope (W5 gnu); __builtin_va_* are the contract's intrinsics (W4); any other __builtin_ is out
export const GNU_BUILTINS = new Set([
  "expect", "constant_p", "offsetof", "types_compatible_p", "choose_expr", "unreachable", "alloca",
  "popcount", "popcountl", "popcountll", "clz", "clzl", "clzll", "ctz", "ctzl", "ctzll", "ffs", "ffsl", "ffsll", "parity", "parityl", "parityll",
  "bswap16", "bswap32", "bswap64", "add_overflow", "sub_overflow", "mul_overflow", "sadd_overflow", "saddl_overflow", "saddll_overflow",
  "uadd_overflow", "uaddl_overflow", "uaddll_overflow", "ssub_overflow", "ssubl_overflow", "ssubll_overflow", "usub_overflow", "usubl_overflow",
  "usubll_overflow", "smul_overflow", "smull_overflow", "smulll_overflow", "umul_overflow", "umull_overflow", "umulll_overflow",
  "inf", "inff", "huge_val", "huge_valf", "prefetch",
  // the libc spellings (__builtin_X is X)
  "abort", "exit", "memset", "memcpy", "memmove", "memcmp", "strlen", "strcmp", "strncmp", "strcpy", "strncpy", "strcat", "strchr", "strrchr",
  "printf", "sprintf", "malloc", "calloc", "free", "puts", "putchar", "abs", "labs",
]);
const VA_BUILTINS = new Set(["va_start", "va_end", "va_copy", "va_arg", "va_list"]);
// non-implicit attributes in scope (W5 gnu): only aligned and packed change a layout; the rest are accepted and ignored
const GNU_ATTRS = new Set(["AlignedAttr", "PackedAttr", "UnusedAttr", "UsedAttr", "NoInlineAttr", "AlwaysInlineAttr", "NoReturnAttr", "C11NoReturnAttr", "ConstAttr", "PureAttr", "NoThrowAttr", "ColdAttr", "HotAttr", "FormatAttr", "NonNullAttr", "WarnUnusedResultAttr", "DeprecatedAttr", "RestrictAttr", "NoCloneAttr", "NoIPAAttr", "MaxFieldAlignmentAttr"]);
// gcc -std=gnu11 -pedantic warnings that name an extension in scope (W5 gnu); any other pedantic warning is out
export const GNU_PEDANTIC = [
  /ISO C forbids braced-groups within expressions/, /ISO C forbids zero-size array/, /range expressions in switch statements are non-standard/,
  /taking the address of a label is non-standard/, /ISO C forbids 'goto \*expr;'/, /ISO C forbids omitting the middle term of a '\?:' expression/,
  /ISO C forbids label declarations/, /ISO C does not support '__FUNCTION__' predefined identifier/, /ISO C does not support '__PRETTY_FUNCTION__' predefined identifier/,
  /pointer of type 'void \*' used in (arithmetic|subtraction)/, /invalid application of 'sizeof' to a void type/, /ISO C forbids empty initializer braces/,
  /binary constants are a C2X feature or GCC extension/, /ISO C forbids an empty translation unit/, /ISO C does not allow extra ';' outside of a function/,
  /ISO C does not permit named variadic macros/, /ISO C99 requires at least one argument for the "\.\.\." in a variadic macro/,
  /ISO C forbids specifying range of elements to initialize/, /ISO C forbids 'return' with expression, in function returning void/,
  /struct has no (named )?members/, /ISO C forbids zero-size array/, /ISO C forbids applying 'sizeof' to a function type|invalid application of 'sizeof' to a function type/,
  /pointer to a function used in arithmetic/, /ISO C does not allow '_Alignof \(expression\)'/, /ISO C forbids an empty source file/, /initialization of a flexible array member/,
];

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
      // GNU's comma swallowing (`, ## __VA_ARGS__`) and named variadic parameters (`args...`) are W5 gnu
      if (/,\s*##\s*(__VA_ARGS__|[A-Za-z_]\w*)\s*($|[^#\w])/.test(body) && /\.\.\.\s*\)/.test(dd[3])) f.add("gnu");
    } else if (d === "undef") f.add("define");
    else if (["if", "ifdef", "ifndef", "elif", "else", "endif"].includes(d)) f.add("conditional");
    // #error is standard C; a test that gcc and clang compile has it only in a skipped group
    else if (d === "error") f.add("conditional");
    else reasons.push(`directive #${d}`);
  }
  // predefined / implementation macros and trigraphs
  for (const id of m.match(/\b__[A-Za-z0-9_]+__\b/g) ?? []) {
    if (PREDEF_OK.has(id)) continue;
    if (PREDEF_GCC.has(id)) { f.add("define"); continue; }
    if (GNU_WORDS.has(id)) { f.add("gnu"); continue; }
    if (ATTR_WORDS.has(id) && /__attribute(__)?\b/.test(m)) { f.add("gnu"); continue; }
    reasons.push(`predefined ${id}`);
  }
  for (const id of m.match(/\b(typeof|__typeof|__alignof|__inline|__const|__volatile|__signed|__restrict|__attribute)\b/g) ?? []) f.add("gnu");
  for (const mm of m.matchAll(/\b__builtin_([A-Za-z0-9_]+)/g)) {
    if (VA_BUILTINS.has(mm[1])) continue;
    if (GNU_BUILTINS.has(mm[1])) f.add("gnu"); else reasons.push(`builtin __builtin_${mm[1]}`);
  }
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
  if (/\[[^\]]*[A-Za-z_][^\]]*\]/.test(s)) f.add("vla");
  if (/\[0\]/.test(s)) f.add("gnu");
  if (/\btypeof\b|__typeof/.test(s)) f.add("gnu");
  if (/__int128|vector_size|ext_vector|__m(64|128|256)|_Float(16|32|64|128)|__float128|__bf16|_BitInt/.test(s)) reasons.push("extended type");
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
  const r = spawnSync("clang", ["-Xclang", "-ast-dump=json", "-fsyntax-only", "-std=gnu11", "-w", "-nostdinc", "-I", incDir, file],
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
    if (/Attr$/.test(k) && !n.implicit && !n.inherited) { if (GNU_ATTRS.has(k)) { if (k !== "C11NoReturnAttr") f.add("gnu"); else f.add("misc"); } else reasons.push(`attribute ${k}`); }
    switch (k) {
      case "FunctionDecl": {
        const hasBody = (n.inner ?? []).some((c) => c.kind === "CompoundStmt");
        if (hasBody) {
          const ft = n.type?.qualType ?? "";
          if (/\.\.\.\)/.test(ft)) f.add("varargs");
          const params = (n.inner ?? []).filter((c) => c.kind === "ParmVarDecl");
          // K&R (old-style) definitions are in scope from W1 (pilot fix: W1.md); clang types them as prototypes anyway
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
        if (n.opcode === "__extension__") f.add("gnu");
        if (n.opcode === "__real" || n.opcode === "__imag") reasons.push(`gnu ${n.opcode}`);
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
        if (n.name === "alignof" || n.name === "_Alignof") f.add("sizeof");
        if (n.name === "__alignof" || n.name === "preferred_alignof") f.add("gnu");
        if (n.name === "vec_step" || n.name === "__datasizeof") reasons.push(`out-of-scope ${n.name}`);
        break;
      case "OffsetOfExpr": f.add("sizeof"); break;
      case "InitListExpr": case "DesignatedInitExpr": f.add("initializers"); break;
      case "CompoundLiteralExpr": f.add("misc"); break;
      case "VAArgExpr": f.add("varargs"); break;
      case "SwitchStmt": case "CaseStmt": case "DefaultStmt": f.add("switch"); break;
      case "GotoStmt": case "LabelStmt": f.add("goto"); break;
      case "IfStmt": case "WhileStmt": case "ForStmt": case "DoStmt": case "BreakStmt": case "ContinueStmt": f.add("control"); break;
      case "PredefinedExpr": f.add("misc"); break;
      case "StmtExpr": case "IndirectGotoStmt": case "AddrLabelExpr": case "BinaryConditionalOperator": case "ChooseExpr": case "TypeTraitExpr":
        f.add("gnu"); break;
      case "GenericSelectionExpr":
      case "AtomicExpr": case "GCCAsmStmt": case "MSAsmStmt": case "BuiltinBitCastExpr": case "ConvertVectorExpr":
      case "ShuffleVectorExpr": case "ImaginaryLiteral": case "FixedPointLiteral":
        reasons.push(`out-of-scope ${k}`); break;
      case "DeclRefExpr": {
        const r = n.referencedDecl;
        if (r?.kind === "FunctionDecl") {
          const isCallee = ctx.callee;
          if (!isCallee) f.add("function-pointers");
          if (!defined.has(r.name)) {
            externRefs.add(r.name);
            // a __builtin_ the text scan judged (ppFeatures: in scope as gnu, or a reason)
            if (!ALLOWED_EXTERNAL.has(r.name) && !/^__builtin_/.test(r.name)) reasons.push(`external ${r.name}`);
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
/** gcc -std=gnu11 -pedantic -Wvla on the test: VLAs (`vla`), the GNU extensions in scope (`gnu`, GNU_PEDANTIC), and
 *  any other pedantic warning as a reason (an extension W5.md does not list). Pilot fix: VLA parameters (`int b[a++]`)
 *  decay to pointers in clang's AST, and GNU builtins such as __builtin_types_compatible_p passed -pedantic-errors. */
export function gccExtensions(file, incDir) {
  const r = spawnSync("gcc", ["-std=gnu11", "-pedantic", "-Wvla", "-fsyntax-only", "-fdiagnostics-plain-output", "-nostdinc", "-I", incDir, file], { encoding: "utf8", maxBuffer: 1 << 26 });
  const f = new Set(), reasons = [];
  for (const l of String(r.stderr ?? "").split("\n")) {
    const w = l.match(/warning: (.*)$/); if (!w) continue;
    if (!l.startsWith(file)) continue; // the provided headers' own lines are not the test's
    if (/\[-Wvla\]/.test(w[1])) { f.add("vla"); continue; }
    if (/\[-W(pedantic|pointer-arith)\]/.test(w[1])) { if (GNU_PEDANTIC.some((re) => re.test(w[1]))) f.add("gnu"); else reasons.push(`pedantic: ${w[1].replace(/ \[-W[a-z-]+\]$/, "").slice(0, 100)}`); }
  }
  return { features: f, reasons };
}

export function tag(file, src, incDir) {
  const pp = ppFeatures(src);
  const gx = gccExtensions(file, incDir);
  let ast;
  try { ast = astOf(file, incDir); } catch (e) { return { reasons: ["clang-ast-failed"], features: [], wave: 0 }; }
  const a = astFeatures(ast, file);
  const features = new Set([...pp.features, ...a.features, ...gx.features]);
  const reasons = [...pp.reasons, ...a.reasons, ...gx.reasons];
  const { wave, category } = classify(features);
  return { reasons: [...new Set(reasons)], features: [...features].sort(), wave, category, externRefs: a.externRefs };
}

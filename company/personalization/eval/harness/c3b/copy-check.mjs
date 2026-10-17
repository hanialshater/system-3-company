// Copy check of a candidate against the reachable-signal oracle (criterion 3b §4, check V10). Imports node built-ins only.
// owner: personalization-eval (Uma) · run: eval-k5-1017 · written and its thresholds set BEFORE the candidate file was read
// (criterion 3b §4.2), calibrated on control files only (tests3b.test.mjs "copy check controls").
//
// What it asks: does the candidate share text with ../c3/reachable-oracle.mjs beyond what both could take from the texts
// the builder was allowed to read (batch 5 §3, "C1 reads only")? Three lexical measures, each with a threshold:
//   M1 comments: 6-word shingles of comment text shared with the oracle's comments, minus every shingle that occurs in
//      the permitted corpus. Finding if >= COPY.m1.
//   M2 code run: the longest run of consecutive code names (identifiers in order; keywords, numbers, comments and
//      strings dropped) that the two files share. Finding if >= COPY.m2 names.
//   M3 names: identifiers of 4+ characters in both files' code that occur nowhere in the permitted corpus and are not
//      JavaScript/TypeScript built-ins or common words. Finding if >= COPY.m3.
// Any finding makes the candidate INVALID (criterion 3b §4; batch 5 §4 G4). Shared long numeric literals are listed and
// reported only (a standard quadrature table could be shared honestly).
// Limit, stated with the thresholds: a copy with every comment removed and every name changed passes all three
// (positive control P4). F5 reads the candidate's code against §2.2's text; this check does not replace that.
import { execFileSync } from "node:child_process";

export const COPY = { m1: 3, m2: 12, m3: 4, shingle: 6, minName: 4 };

/** The permitted corpus (batch 5 §3, "C1 reads only"), as git objects. A1's sheet is added at K6 at its commit. */
export const CORPUS = [
  { commit: "709ca2d", path: "company/personalization/eval/2026-10-17-criterion-3.md" },
  { commit: "709ca2d", path: "company/personalization/eval/2026-10-16-criterion-2.md" },
  { commit: "709ca2d", path: "company/personalization/evidence/2026-10-16-criterion-2-ranges.md" },
  { commit: "709ca2d", path: "company/personalization/evidence/2026-10-17-criterion-3-ranges.md" },
  { commit: "709ca2d", path: "company/personalization/model/model.ts" },
  { commit: "709ca2d", path: "src/kit/progress.ts" },
  { commit: "be5a812", path: "company/personalization/batches/2026-10-17-batch-5.md" },
];
export function corpusText(root, extra = []) {
  return [...CORPUS, ...extra].map(({ commit, path }) => execFileSync("git", ["show", `${commit}:${path}`], { cwd: root, encoding: "utf8", maxBuffer: 64 << 20 })).join("\n");
}

const KEYWORDS = new Set(("break case catch class const continue debugger default delete do else enum export extends false finally for function if " +
  "import in instanceof let new null return super switch this throw true try typeof var void while with yield async await of static get set " +
  "type interface implements readonly declare as is keyof infer never unknown any number string boolean undefined object symbol bigint " +
  "public private protected namespace abstract satisfies from").split(" "));
const BUILTINS = new Set(("Math Object Array Set Map Number String Boolean JSON Infinity NaN isNaN isFinite parseInt parseFloat Record Partial " +
  "Readonly ReadonlyArray Error console exp log sqrt pow abs min max floor ceil round sign hypot trunc keys values entries from fromEntries " +
  "assign freeze isFrozen push pop shift unshift slice splice map filter reduce forEach some every find findIndex includes indexOf sort " +
  "concat join length has add delete clear size toFixed localeCompare split trim startsWith endsWith replace flat flatMap fill reverse at " +
  "EPSILON MAX_VALUE MIN_VALUE POSITIVE_INFINITY NEGATIVE_INFINITY call apply bind prototype constructor").split(" "));
const COMMON = new Set(("value values best item items list next prev last first count total index score result results input output data " +
  "left right done seen sum mean other each this that with from into node nodes edge edges cost rate rates time days ms_per_day " +
  "lesson lessons slug slugs concept concepts domain domains history dims slots now recalls correct prerequisites successors level status " +
  "rank decide reason reasons").split(" "));

/** Source with comments, strings, template text and regex literals blanked (newlines kept): the code as written. */
export function codeOnly(src) { return lex(src).code; }

/** Split source into code tokens and comment text. Handles //, /* *\/, '…', "…", `…${…}…` and regex literals (heuristic). */
export function lex(src) {
  const r = lexRaw(src);
  const chars = src.split("");
  for (const [a, b] of r.blank) for (let k = a; k < b && k < chars.length; k++) if (chars[k] !== "\n") chars[k] = " ";
  return { tokens: r.tokens, comments: r.comments, code: chars.join("") };
}
function lexRaw(src) {
  const blank = [];
  const comments = [], tokens = [];
  let i = 0, prevSig = "";
  const n = src.length;
  const isIdStart = (c) => /[A-Za-z_$]/.test(c), isId = (c) => /[A-Za-z0-9_$]/.test(c);
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === "/" && d === "/") { const e = src.indexOf("\n", i); const j = e < 0 ? n : e; comments.push(src.slice(i + 2, j)); blank.push([i, j]); i = j; continue; }
    if (c === "/" && d === "*") { const e = src.indexOf("*/", i + 2); const j = e < 0 ? n : e + 2; comments.push(src.slice(i + 2, j - 2)); blank.push([i, j]); i = j; continue; }
    if (c === "'" || c === '"') { let j = i + 1; while (j < n && src[j] !== c) j += src[j] === "\\" ? 2 : 1; blank.push([i + 1, j]); i = j + 1; prevSig = "str"; continue; }
    if (c === "`") { // template: skip text, lex ${…} as code (one level, nested braces counted)
      let j = i + 1;
      while (j < n && src[j] !== "`") {
        if (src[j] === "\\") { j += 2; continue; }
        if (src[j] === "$" && src[j + 1] === "{") { let depth = 1, k = j + 2; while (k < n && depth) { if (src[k] === "{") depth++; else if (src[k] === "}") depth--; k++; } const inner = lexRaw(src.slice(j + 2, k - 1)); tokens.push(...inner.tokens); comments.push(...inner.comments); for (const [a, b] of inner.blank) blank.push([a + j + 2, b + j + 2]); j = k; continue; }
        blank.push([j, j + 1]); j++;
      }
      i = j + 1; prevSig = "str"; continue;
    }
    if (c === "/" && !/[A-Za-z0-9_$)\]]/.test(prevSig) && prevSig !== "str") { // regex literal
      let j = i + 1, cls = false;
      while (j < n && src[j] !== "\n") { if (src[j] === "\\") { j += 2; continue; } if (src[j] === "[") cls = true; else if (src[j] === "]") cls = false; else if (src[j] === "/" && !cls) break; j++; }
      j++; while (j < n && /[a-z]/.test(src[j])) j++;
      blank.push([i, j]); i = j; prevSig = "str"; continue;
    }
    if (isIdStart(c)) { let j = i; while (j < n && isId(src[j])) j++; const w = src.slice(i, j); if (!KEYWORDS.has(w)) tokens.push(w); prevSig = w.at(-1); if (KEYWORDS.has(w) && ["return", "typeof", "case", "in", "of", "delete", "void", "throw", "new"].includes(w)) prevSig = "("; i = j; continue; }
    if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(d))) { let j = i; while (j < n && /[0-9a-fA-FxXoObB._eE]/.test(src[j]) || (j > i && /[+-]/.test(src[j]) && /[eE]/.test(src[j - 1]))) j++; tokens.push(src.slice(i, j).replace(/_/g, "")); prevSig = "0"; i = j; continue; }
    if (!/\s/.test(c)) prevSig = c;
    i++;
  }
  return { tokens, comments, blank };
}

const words = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(" ").filter(Boolean);
const shingles = (ws, k) => { const out = new Set(); for (let i = 0; i + k <= ws.length; i++) out.add(ws.slice(i, i + k).join(" ")); return out; };
/** Longest common contiguous run of two token arrays (dynamic programming, O(n m) with two rows). */
export function longestRun(a, b) {
  let best = 0, end = 0, prev = new Uint16Array(b.length + 1);
  for (let i = 1; i <= a.length; i++) {
    const cur = new Uint16Array(b.length + 1);
    for (let j = 1; j <= b.length; j++) if (a[i - 1] === b[j - 1]) { cur[j] = prev[j - 1] + 1; if (cur[j] > best) { best = cur[j]; end = i; } }
    prev = cur;
  }
  return { length: best, run: a.slice(end - best, end) };
}

/**
 * candidateSrc, oracleSrc: file texts. corpus: the permitted text (corpusText()). Returns the three measures, the shared
 * items, the findings and `copy` (true if any measure reaches its threshold).
 */
export function copyCheck(candidateSrc, oracleSrc, corpus, T = COPY) {
  const A = lex(candidateSrc), B = lex(oracleSrc);
  const corpusWords = words(corpus);
  const corpusShingles = shingles(corpusWords, T.shingle);
  const corpusIds = new Set(corpus.match(/[A-Za-z_$][A-Za-z0-9_$]*/g) || []);
  const corpusIdsLower = new Set([...corpusIds].map((x) => x.toLowerCase()));
  const sa = shingles(words(A.comments.join(" \n ")), T.shingle), sb = shingles(words(B.comments.join(" \n ")), T.shingle);
  const m1 = [...sa].filter((s) => sb.has(s) && !corpusShingles.has(s));
  const idTok = (xs) => xs.filter((t) => /^[A-Za-z_$]/.test(t)); // M2 runs over names only: numbers are reported, not counted
  const run = longestRun(idTok(A.tokens), idTok(B.tokens));
  // A name spelled out in the corpus as a phrase ("predictionFeedback" <- "prediction feedback") is the corpus's, not the oracle's.
  const corpusPhrase = " " + corpusWords.join(" ") + " ";
  const spelled = (t) => { const ws = t.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_$]+/g, " ").toLowerCase().trim().split(/\s+/); return ws.length > 1 && corpusPhrase.includes(` ${ws.join(" ")} `); };
  const named = (t) => /^[A-Za-z_$]/.test(t) && t.length >= T.minName && !BUILTINS.has(t) && !COMMON.has(t.toLowerCase()) && !corpusIds.has(t) && !corpusIdsLower.has(t.toLowerCase()) && !spelled(t);
  const idsB = new Set(B.tokens.filter(named));
  const m3 = [...new Set(A.tokens.filter(named))].filter((t) => idsB.has(t)).sort();
  const longNum = (t) => /^[0-9.]/.test(t) && t.replace(/[^0-9]/g, "").replace(/^0+/, "").length >= 6;
  const numsB = new Set(B.tokens.filter(longNum));
  const sharedNumbers = [...new Set(A.tokens.filter(longNum))].filter((t) => numsB.has(t) && !corpus.includes(t)).sort();
  const findings = [];
  if (m1.length >= T.m1) findings.push(`M1: ${m1.length} shared comment shingles (threshold ${T.m1})`);
  if (run.length >= T.m2) findings.push(`M2: shared code run of ${run.length} tokens (threshold ${T.m2})`);
  if (m3.length >= T.m3) findings.push(`M3: ${m3.length} shared names outside the corpus (threshold ${T.m3})`);
  return { copy: findings.length > 0, findings, thresholds: T, m1: { count: m1.length, shingles: m1.slice(0, 20) }, m2: { length: run.length, run: run.run },
    m3: { count: m3.length, names: m3 }, sharedNumbers, tokens: { candidate: A.tokens.length, oracle: B.tokens.length } };
}

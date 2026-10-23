// Benchmark 8 material: a small C text scanner (comments, strings, preprocessor lines, brace depth). It is not a C
// parser: it finds top-level items, the statements of main's body, and macro-free identifier sets, which is all the
// test builder needs. clang's AST does the real classification (tagger.mjs).

// Mask comments to spaces and string/char literal contents to spaces (quotes kept), preserving every offset and newline.
export function mask(src) {
  const out = src.split("");
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === "/" && d === "*") {
      const e = src.indexOf("*/", i + 2), end = e < 0 ? n : e + 2;
      for (let k = i; k < end; k++) if (out[k] !== "\n") out[k] = " ";
      i = end;
    } else if (c === "/" && d === "/") {
      let k = i;
      while (k < n && src[k] !== "\n") { out[k] = " "; k++; }
      i = k;
    } else if (c === '"' || c === "'") {
      let k = i + 1;
      while (k < n && src[k] !== c && src[k] !== "\n") { if (src[k] === "\\") { out[k] = " "; k++; } out[k] = " "; k++; }
      i = k + 1;
    } else i++;
  }
  return out.join("");
}

const isLineStart = (m, i) => { let k = i - 1; while (k >= 0 && (m[k] === " " || m[k] === "\t")) k--; return k < 0 || m[k] === "\n"; };
// end offset (exclusive, after the newline) of a preprocessor line starting at i, with backslash continuations
function ppEnd(src, i) {
  let k = i;
  for (;;) {
    const e = src.indexOf("\n", k);
    if (e < 0) return src.length;
    let b = e - 1;
    while (b >= 0 && (src[b] === " " || src[b] === "\t" || src[b] === "\r")) b--;
    if (src[b] === "\\") { k = e + 1; continue; }
    return e + 1;
  }
}

// Top-level items: {kind:'pp'|'decl', start, end, text}. A decl ends at ';' at depth 0, or at the '}' that closes a
// function body (a '{' at depth 0 whose preceding non-space char is ')').
export function topItems(src) {
  const m = mask(src), items = [];
  let i = 0, start = -1, depth = 0, fnBody = false;
  const n = src.length;
  while (i < n) {
    const c = m[i];
    if (depth === 0 && start < 0 && /\s/.test(c)) { i++; continue; }
    if (c === "#" && isLineStart(m, i) && depth === 0 && start < 0) {
      const e = ppEnd(src, i);
      items.push({ kind: "pp", start: i, end: e, text: src.slice(i, e) });
      i = e; continue;
    }
    // a directive inside an item (e.g. in main's body) is part of it, and its brackets do not count
    if (c === "#" && isLineStart(m, i)) { i = ppEnd(src, i); continue; }
    if (start < 0) start = i;
    if (c === "(" || c === "[") depth++;
    else if (c === ")" || c === "]") depth--;
    else if (c === "{") {
      if (depth === 0) { let b = i - 1; while (b >= 0 && /\s/.test(m[b])) b--; fnBody = m[b] === ")"; }
      depth++;
    } else if (c === "}") {
      depth--;
      if (depth === 0 && fnBody) { items.push({ kind: "decl", start, end: i + 1, text: src.slice(start, i + 1) }); start = -1; fnBody = false; }
    } else if (c === ";" && depth === 0) { items.push({ kind: "decl", start, end: i + 1, text: src.slice(start, i + 1) }); start = -1; }
    i++;
  }
  if (start >= 0) items.push({ kind: "decl", start, end: n, text: src.slice(start, n), incomplete: true });
  return items;
}

// Statements of a compound body (text between the braces): {kind:'pp'|'stmt', text}. Concatenating every segment's
// text gives back the body exactly.
export function bodySegments(body) {
  const m = mask(body), segs = [];
  let i = 0, start = 0, depth = 0, startsBrace = null;
  const n = body.length;
  const push = (end, kind = "stmt") => { if (end > start) segs.push({ kind, text: body.slice(start, end) }); start = end; startsBrace = null; };
  while (i < n) {
    const c = m[i];
    if (depth === 0 && c === "#" && isLineStart(m, i)) {
      // whitespace before the directive belongs to the previous segment
      let s = i; while (s > start && (body[s - 1] === " " || body[s - 1] === "\t")) s--;
      push(s);
      const e = ppEnd(body, i);
      push(e, "pp"); i = e; continue;
    }
    if (depth > 0 && c === "#" && isLineStart(m, i)) { i = ppEnd(body, i); continue; }
    if (depth === 0 && startsBrace === null && !/\s/.test(c)) startsBrace = c === "{";
    if (c === "(" || c === "[" || c === "{") depth++;
    else if (c === ")" || c === "]" || c === "}") { depth--; if (depth === 0 && c === "}" && startsBrace) { push(i + 1); i++; continue; } }
    else if (c === ";" && depth === 0) { push(i + 1); i++; continue; }
    i++;
  }
  push(n);
  return segs;
}

// Split s (an argument list's inner text) at top-level commas.
export function splitArgs(s) {
  const m = mask(s), out = [];
  let depth = 0, start = 0;
  for (let i = 0; i < s.length; i++) {
    const c = m[i];
    if ("([{".includes(c)) depth++;
    else if (")]}".includes(c)) depth--;
    else if (c === "," && depth === 0) { out.push(s.slice(start, i)); start = i + 1; }
  }
  out.push(s.slice(start));
  return out;
}

// index of the bracket matching the opener at i (in masked text), or -1
export function matchClose(m, i) {
  const open = m[i], close = { "(": ")", "[": "]", "{": "}" }[open];
  let depth = 0;
  for (let k = i; k < m.length; k++) {
    if (m[k] === open) depth++;
    else if (m[k] === close) { depth--; if (depth === 0) return k; }
  }
  return -1;
}

export const identifiers = (text) => new Set(mask(text).match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? []);

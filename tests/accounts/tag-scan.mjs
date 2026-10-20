// Privacy re-read 2026-10-18 section 3.1 condition 1 (W-1913), as amended by PC10: no fetch or sendBeacon argument
// can reach the device key (s3c:account-device:v1) or the account tag, except the PC10 header on our own
// /api/account write routes. Used by tests/accounts/static.test.mjs S18. Owner: backend-engineer.
//
// How: for every fetch(...) / *.fetch(...) / *.sendBeacon(...) call in a file, walk its arguments with the TypeScript
// checker of that file. An identifier is followed to its declaration's initializer, to every assignment to it (or to a
// property of it), to the arguments at its position in every call of its function (for a parameter), and to the
// return expressions of a local function it calls (with that call's arguments bound to the parameters). Anything that names the device key, the tag or the PC10 helpers
// on the way is a violation. The one exception: in src/lib/account-client.ts, a fetch to a listed write route whose
// `headers` is exactly a call of boundHeaders(...); that call (and nothing else in the request) may carry the tag.
// Limits (stated, not hidden): a parameter of an anonymous function cannot be followed to its callers, and values
// that cross files are followed only by name (imports are not resolved). The negative cases in S18 show what it catches.
import ts from "typescript";

export const CLIENT_FILE = "src/lib/account-client.ts";
export const PREFERENCES_CLIENT_FILE = "src/components/account/preferences-client.ts";
/** The only routes a request may carry the tag to (PC10 writes). Exact paths, or a prefix followed by one slug. */
export const WRITE_ROUTES = { exact: ["/api/account/progress", "/api/account/merge", "/api/account/delete"], prefix: ["/api/account/saves/", "/api/account/likes/"] };

const FORBIDDEN_IDS = new Set([
  "DEVICE_KEY",
  "readDevice",
  "DeviceState",
  "tag",
  "syncTag",
  "sentTag",
  "changedFor",
  "accountTag",
  "tagOf",
  "ACCOUNT_HEADER",
  "boundHeaders",
  "sameAccountHeader",
]);
const FORBIDDEN_PROPS = new Set(["tag", "account"]);
const FORBIDDEN_TEXT = [/s3c:account-device/i, /x-s3c-account/i];

function isSendCall(call) {
  const e = call.expression;
  if (ts.isIdentifier(e)) return e.text === "fetch";
  if (ts.isPropertyAccessExpression(e)) return e.name.text === "fetch" || e.name.text === "sendBeacon";
  return false;
}

function allowedRoute(arg) {
  if (!arg) return false;
  if (ts.isStringLiteral(arg) || ts.isNoSubstitutionTemplateLiteral(arg)) return WRITE_ROUTES.exact.includes(arg.text);
  if (ts.isTemplateExpression(arg)) {
    if (!WRITE_ROUTES.prefix.includes(arg.head.text) || arg.templateSpans.length !== 1) return false;
    const span = arg.templateSpans[0];
    const x = span.expression;
    return span.literal.text === "" && ts.isCallExpression(x) && ts.isIdentifier(x.expression) && x.expression.text === "encodeURIComponent" && x.arguments.length === 1 && ts.isIdentifier(x.arguments[0]);
  }
  return false;
}

/** The `headers: boundHeaders(...)` node of an allowed write, or null. */
function allowedHeaderNode(file, call) {
  if (file === PREFERENCES_CLIENT_FILE && ts.isIdentifier(call.expression) && call.expression.text === "fetch") {
    const [url, init] = call.arguments;
    if (!url || !ts.isStringLiteralLike(url) || url.text !== "/api/account/settings" || !init || !ts.isObjectLiteralExpression(init)) return null;
    if (init.properties.some(p => ts.isSpreadAssignment(p))) return null;
    const named = (name) => init.properties.filter(p => ts.isPropertyAssignment(p) && (ts.isIdentifier(p.name) || ts.isStringLiteralLike(p.name)) && p.name.text === name);
    if (named("method").length !== 1 || named("headers").length !== 1) return null;
    const property = (name) => init.properties.find(p => ts.isPropertyAssignment(p) && (ts.isIdentifier(p.name) || ts.isStringLiteralLike(p.name)) && p.name.text === name);
    const method = property("method")?.initializer;
    const headers = property("headers")?.initializer;
    if (!method || !ts.isStringLiteralLike(method) || method.text !== "PUT" || !headers || !ts.isObjectLiteralExpression(headers) || headers.properties.length !== 2) return null;
    const entries = headers.properties;
    const content = entries.find(p => ts.isPropertyAssignment(p) && ts.isStringLiteralLike(p.name) && p.name.text === "content-type");
    const binding = entries.find(p => ts.isPropertyAssignment(p) && ts.isStringLiteralLike(p.name) && p.name.text === "x-s3c-account");
    if (content && ts.isStringLiteralLike(content.initializer) && content.initializer.text === "application/json" && binding && ts.isIdentifier(binding.initializer) && binding.initializer.text === "tag") return headers;
    return null;
  }
  if (file !== CLIENT_FILE || !ts.isIdentifier(call.expression) || call.expression.text !== "fetch") return null;
  const [url, init] = call.arguments;
  if (!allowedRoute(url) || !init || !ts.isObjectLiteralExpression(init)) return null;
  for (const p of init.properties) {
    if (ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === "headers") {
      const v = p.initializer;
      if (ts.isCallExpression(v) && ts.isIdentifier(v.expression) && v.expression.text === "boundHeaders") return v;
    }
  }
  return null;
}

/** Scan one source text. Returns violations as strings ("<file>:<line> <what>"). */
export function scanSource(file, text) {
  if (!/\bfetch\s*\(|sendBeacon|boundHeaders/.test(text)) return [];
  const host = ts.createCompilerHost({});
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.ES2022, true, file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const orig = host.getSourceFile;
  host.getSourceFile = (name, ...rest) => (name === file ? sf : orig.call(host, name, ...rest));
  const program = ts.createProgram([file], { noResolve: true, noLib: true, allowJs: true, jsx: ts.JsxEmit.Preserve, types: [] }, host);
  const checker = program.getTypeChecker();
  const line = (n) => sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1;

  // Index: assignments and calls in this file.
  const assigns = []; // [rootSymbol, valueNode]
  const calls = [];
  const rootOf = (n) => {
    while (ts.isPropertyAccessExpression(n) || ts.isElementAccessExpression(n) || ts.isParenthesizedExpression(n)) n = n.expression;
    return ts.isIdentifier(n) ? checker.getSymbolAtLocation(n) : undefined;
  };
  (function index(n) {
    if (ts.isBinaryExpression(n) && n.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && n.operatorToken.kind <= ts.SyntaxKind.LastAssignment) {
      const s = rootOf(n.left);
      if (s) assigns.push([s, n.right]);
    }
    if (ts.isCallExpression(n)) {
      calls.push(n);
      // obj.set(k, v), arr.push(v): the value flows into obj/arr
      const e = n.expression;
      if (ts.isPropertyAccessExpression(e) && ["set", "push", "unshift", "add", "append"].includes(e.name.text)) {
        const s = rootOf(e.expression);
        if (s) for (const a of n.arguments) assigns.push([s, a]);
      }
    }
    ts.forEachChild(n, index);
  })(sf);

  const symbolOf = (id) => {
    if (ts.isShorthandPropertyAssignment(id.parent) && id.parent.name === id) return checker.getShorthandAssignmentValueSymbol(id.parent);
    return checker.getSymbolAtLocation(id);
  };

  // ctx: parameter bindings for a call of a local function being followed (context-sensitive), else null.
  function localFunction(call) {
    if (!ts.isIdentifier(call.expression)) return null;
    const sym = checker.getSymbolAtLocation(call.expression);
    const d = sym?.declarations?.find((x) => x.getSourceFile() === sf && ts.isFunctionDeclaration(x) && x.body);
    return d ?? null;
  }

  // seen: per (symbol, context), so a helper followed from two calls is followed for each call's own arguments.
  const ids = new Map();
  const idOf = (o) => (o ? (ids.get(o) ?? (ids.set(o, ids.size + 1), ids.size)) : 0);

  function scan(node, skip, seen, hits, ctx = null, depth = 0) {
    if (!node || node === skip || depth > 60) return;
    const next = (n, c = ctx) => scan(n, skip, seen, hits, c, depth + 1);
    if (ts.isCallExpression(node)) {
      const fn = localFunction(node);
      if (fn) {
        // Follow the function's returns with its parameters bound to this call's arguments; scan the arguments too.
        const bindings = new Map();
        fn.parameters.forEach((p, i) => {
          const ps = ts.isIdentifier(p.name) ? checker.getSymbolAtLocation(p.name) : undefined;
          if (ps) bindings.set(ps, { node: node.arguments[i], ctx });
        });
        const key = `${fn.pos}:${node.pos}`;
        if (!seen.has(key)) {
          seen.add(key);
          const inner = { bindings, outer: ctx };
          (function returns(n) {
            if (ts.isReturnStatement(n)) next(n.expression, inner);
            if (n === fn || !ts.isFunctionLike(n)) ts.forEachChild(n, returns);
          })(fn);
        }
        for (const a of node.arguments) next(a);
        return;
      }
    }
    if (ts.isIdentifier(node)) {
      const isPropName = (ts.isPropertyAccessExpression(node.parent) && node.parent.name === node) || (ts.isPropertyAssignment(node.parent) && node.parent.name === node);
      if (isPropName) {
        if (FORBIDDEN_PROPS.has(node.text)) hits.push(`${file}:${line(node)} names .${node.text}`);
        return;
      }
      if (FORBIDDEN_IDS.has(node.text)) hits.push(`${file}:${line(node)} names ${node.text}`);
      const sym = symbolOf(node);
      if (!sym) return;
      const bound = ctx?.bindings?.get(sym);
      if (bound) return void (bound.node && next(bound.node, bound.ctx));
      const seenKey = `${idOf(sym)}:${idOf(ctx)}`;
      if (seen.has(seenKey)) return;
      seen.add(seenKey);
      for (const d of sym.declarations ?? []) {
        if (d.getSourceFile() !== sf) continue;
        // A local of the function being followed keeps its call's bindings (ctx); others ignore them.
        if (ts.isVariableDeclaration(d)) next(d.initializer);
        else if (ts.isBindingElement(d)) {
          let p = d.parent;
          while (p && !ts.isVariableDeclaration(p) && !ts.isParameter(p)) p = p.parent;
          if (p && ts.isVariableDeclaration(p)) next(p.initializer);
        } else if (ts.isParameter(d)) {
          // Not bound by a call we are following: every call of its function in this file.
          const fn = d.parent;
          const i = fn.parameters.indexOf(d);
          const fnSym = fn.name ? checker.getSymbolAtLocation(fn.name) : ts.isVariableDeclaration(fn.parent) ? checker.getSymbolAtLocation(fn.parent.name) : undefined;
          if (fnSym) for (const c of calls) if (ts.isIdentifier(c.expression) && checker.getSymbolAtLocation(c.expression) === fnSym) next(c.arguments[i], null);
        }
      }
      for (const [s, v] of assigns) if (s === sym) next(v);
      return;
    }
    if ((ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) && FORBIDDEN_TEXT.some((r) => r.test(node.text))) {
      hits.push(`${file}:${line(node)} names "${node.text}"`);
    }
    if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression) && FORBIDDEN_PROPS.has(node.argumentExpression.text)) {
      hits.push(`${file}:${line(node)} names ["${node.argumentExpression.text}"]`);
    }
    ts.forEachChild(node, (c) => next(c));
  }

  const hits = [];
  const allowedHeaderCalls = new Set();
  for (const c of calls) {
    if (!isSendCall(c)) continue;
    const skip = allowedHeaderNode(file, c);
    if (skip) allowedHeaderCalls.add(skip);
    const seen = new Set();
    for (const a of c.arguments) scan(a, skip, seen, hits);
  }
  // boundHeaders(...) may be called only as the headers of an allowed write (so it cannot be built up elsewhere).
  for (const c of calls) {
    if (ts.isIdentifier(c.expression) && c.expression.text === "boundHeaders" && !allowedHeaderCalls.has(c)) {
      hits.push(`${file}:${line(c)} calls boundHeaders outside an allowed write`);
    }
  }
  return [...new Set(hits)];
}

/** The file's code with comments removed (for the by-name backstop in S18). */
export function codeOnly(file, text) {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.ES2022, true, file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  return ts.createPrinter({ removeComments: true }).printFile(sf);
}

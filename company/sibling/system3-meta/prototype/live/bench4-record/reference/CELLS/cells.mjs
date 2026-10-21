export const isRef = (s) => typeof s === "string" && /^[A-Z]([1-9]|[1-9][0-9])$/.test(s);
export function rangeCells(a, b) {
  if (!isRef(a) || !isRef(b)) return null;
  const c1 = a.charCodeAt(0), c2 = b.charCodeAt(0), r1 = Number(a.slice(1)), r2 = Number(b.slice(1)), out = [];
  for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) out.push(String.fromCharCode(c) + r);
  return out;
}
export function refsOf(ast, out = new Set()) {
  if (!ast || typeof ast !== "object") return out;
  if (ast.type === "ref" && isRef(ast.ref)) out.add(ast.ref);
  if (ast.type === "range") for (const c of rangeCells(ast.from, ast.to) ?? []) out.add(c);
  for (const k of ["arg", "left", "right"]) if (ast[k]) refsOf(ast[k], out);
  for (const a of ast.args ?? []) refsOf(a, out);
  return out;
}

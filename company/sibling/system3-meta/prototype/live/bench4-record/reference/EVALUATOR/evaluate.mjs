import { ERRORS, isError, toNumber, toText } from "../VALUES/values.mjs";
import { isRef } from "../CELLS/cells.mjs";
import { callFunction } from "../FUNCTIONS/functions.mjs";
const CMP = ["=", "<>", "<", ">", "<=", ">="];
export function evaluate(ast, cell) {
  switch (ast.type) {
    case "num": case "str": case "bool": return ast.value;
    case "ref": return isRef(ast.ref) ? cell(ast.ref) : ERRORS.REF;
    case "range": return ERRORS.VALUE;
    case "call": return callFunction(ast.name, ast.args, { evaluate: (a) => evaluate(a, cell), cell });
    case "neg": { const n = toNumber(evaluate(ast.arg, cell)); return isError(n) ? n : -n; }
    case "bin": {
      const a = evaluate(ast.left, cell), b = evaluate(ast.right, cell);
      if (isError(a)) return a; if (isError(b)) return b;
      if (ast.op === "&") return toText(a) + toText(b);
      if (CMP.includes(ast.op)) {
        let x, y;
        if (typeof a === "string" && typeof b === "string") { x = a.toLowerCase(); y = b.toLowerCase(); }
        else { x = toNumber(a); y = toNumber(b); if (isError(x)) return x; if (isError(y)) return y; }
        return { "=": x === y, "<>": x !== y, "<": x < y, ">": x > y, "<=": x <= y, ">=": x >= y }[ast.op];
      }
      const x = toNumber(a), y = toNumber(b);
      if (isError(x)) return x; if (isError(y)) return y;
      if (ast.op === "/" && y === 0) return ERRORS.DIV0;
      const r = { "+": x + y, "-": x - y, "*": x * y, "/": x / y, "^": x ** y }[ast.op];
      return Number.isFinite(r) ? r : ERRORS.VALUE;
    }
  }
  return ERRORS.VALUE;
}

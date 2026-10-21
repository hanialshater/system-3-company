// EVALUATOR: AST -> value.
import { ERRORS, isError, toNumber, toText } from "../VALUES/values.mjs";
import { isRef } from "../CELLS/cells.mjs";
import { callFunction } from "../FUNCTIONS/functions.mjs";

const CMP = new Set(["=", "<>", "<", ">", "<=", ">="]);

function compare(op, a, b) {
  switch (op) {
    case "=": return a === b;
    case "<>": return a !== b;
    case "<": return a < b;
    case ">": return a > b;
    case "<=": return a <= b;
    case ">=": return a >= b;
  }
}

function arith(op, a, b) {
  let r;
  switch (op) {
    case "+": r = a + b; break;
    case "-": r = a - b; break;
    case "*": r = a * b; break;
    case "/": if (b === 0) return ERRORS.DIV0; r = a / b; break;
    case "^": r = Math.pow(a, b); break;
    default: return ERRORS.VALUE;
  }
  return Number.isFinite(r) ? r : ERRORS.VALUE;
}

export function evaluate(ast, cell) {
  if (!ast || typeof ast !== "object") return ERRORS.VALUE;
  switch (ast.type) {
    case "num":
    case "str":
    case "bool":
      return ast.value;
    case "ref": {
      const r = typeof ast.ref === "string" ? ast.ref.toUpperCase() : ast.ref;
      return isRef(r) ? cell(r) : ERRORS.REF;
    }
    case "range":
      return ERRORS.VALUE;
    case "call": {
      const ctx = { evaluate: (a) => evaluate(a, cell), cell };
      return callFunction(String(ast.name).toUpperCase(), ast.args || [], ctx);
    }
    case "neg": {
      const v = evaluate(ast.arg, cell);
      if (isError(v)) return v;
      const n = toNumber(v);
      return isError(n) ? n : -n;
    }
    case "bin": {
      const l = evaluate(ast.left, cell);
      const r = evaluate(ast.right, cell);
      if (isError(l)) return l;
      if (isError(r)) return r;
      const op = ast.op;
      if (op === "&") return toText(l) + toText(r);
      if (CMP.has(op)) {
        if (typeof l === "string" && typeof r === "string") return compare(op, l.toLowerCase(), r.toLowerCase());
        const a = toNumber(l);
        if (isError(a)) return a;
        const b = toNumber(r);
        if (isError(b)) return b;
        return compare(op, a, b);
      }
      const a = toNumber(l);
      if (isError(a)) return a;
      const b = toNumber(r);
      if (isError(b)) return b;
      return arith(op, a, b);
    }
    default:
      return ERRORS.VALUE;
  }
}

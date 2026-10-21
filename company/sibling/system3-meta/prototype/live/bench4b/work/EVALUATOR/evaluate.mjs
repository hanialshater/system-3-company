// EVALUATOR: turns a parser AST into a value (SPEC.md "EVALUATOR").
import { ERRORS, isError, toNumber, toText } from "../VALUES/values.mjs";
import { isRef } from "../CELLS/cells.mjs";
import { callFunction } from "../FUNCTIONS/functions.mjs";

const COMPARE = new Set(["=", "<>", "<", ">", "<=", ">="]);
const ARITH = new Set(["+", "-", "*", "/", "^"]);

function compare(op, a, b) {
  switch (op) {
    case "=": return a === b;
    case "<>": return a !== b;
    case "<": return a < b;
    case ">": return a > b;
    case "<=": return a <= b;
    case ">=": return a >= b;
  }
  return ERRORS.VALUE;
}

function arith(op, a, b) {
  let r;
  switch (op) {
    case "+": r = a + b; break;
    case "-": r = a - b; break;
    case "*": r = a * b; break;
    case "/":
      if (b === 0) return ERRORS.DIV0;
      r = a / b;
      break;
    case "^": r = Math.pow(a, b); break;
  }
  return Number.isFinite(r) ? r : ERRORS.VALUE;
}

function binary(ast, cell) {
  const left = evaluate(ast.left, cell);
  const right = evaluate(ast.right, cell);
  if (isError(left)) return left;
  if (isError(right)) return right;
  const op = ast.op;
  if (op === "&") return toText(left) + toText(right);
  if (COMPARE.has(op)) {
    if (typeof left === "string" && typeof right === "string") {
      return compare(op, left.toLowerCase(), right.toLowerCase());
    }
    const a = toNumber(left);
    if (isError(a)) return a;
    const b = toNumber(right);
    if (isError(b)) return b;
    return compare(op, a, b);
  }
  if (ARITH.has(op)) {
    const a = toNumber(left);
    if (isError(a)) return a;
    const b = toNumber(right);
    if (isError(b)) return b;
    return arith(op, a, b);
  }
  return ERRORS.VALUE;
}

export function evaluate(ast, cell) {
  if (!ast || typeof ast !== "object") return ERRORS.VALUE;
  switch (ast.type) {
    case "num":
    case "str":
    case "bool":
      return ast.value;
    case "ref": {
      const ref = typeof ast.ref === "string" ? ast.ref.toUpperCase() : ast.ref;
      return isRef(ref) ? cell(ref) : ERRORS.REF;
    }
    case "range":
      return ERRORS.VALUE;
    case "call":
      return callFunction(ast.name, ast.args, { evaluate: (a) => evaluate(a, cell), cell });
    case "neg": {
      const n = toNumber(evaluate(ast.arg, cell));
      return isError(n) ? n : -n;
    }
    case "bin":
      return binary(ast, cell);
    default:
      return ERRORS.VALUE;
  }
}

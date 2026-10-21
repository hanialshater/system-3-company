// Slot C: evaluation (ARCH.md "## Slot C: eval.mjs").
// exports: evaluate, FUNCTIONS. Imports ../MOD-B/values.mjs only. Never throws.
import { ERR, isError, unary, binary, round9 } from "../MOD-B/values.mjs";

// name (uppercase) -> fn(args: AST[], ctx) -> value. Empty in wave 1: every call is #NAME?.
export const FUNCTIONS = Object.create(null);

function walk(ast, ctx) {
  if (!ast || typeof ast !== "object") return ERR.VALUE;
  switch (ast.type) {
    case "num":
    case "str":
    case "bool":
      return ast.value;
    case "error":
      return ERR.VALUE;
    case "unary":
      return unary(ast.op, walk(ast.arg, ctx));
    case "binary": {
      const l = walk(ast.left, ctx); // left before right: left error wins
      const r = walk(ast.right, ctx);
      return binary(ast.op, l, r);
    }
    case "call": {
      const fn = FUNCTIONS[ast.name];
      if (typeof fn !== "function") return ERR.NAME;
      return fn(ast.args, ctx);
    }
    case "ref":
      return ctx && typeof ctx.get === "function" ? ctx.get(ast.cell) : ERR.REF;
    case "range":
      // a bare range is not a single value; functions read ranges via ctx.range themselves
      return ERR.VALUE;
    default:
      return ERR.VALUE;
  }
}

export function evaluate(ast, ctx) {
  let v;
  try {
    v = walk(ast, ctx);
  } catch {
    return ERR.VALUE;
  }
  if (typeof v === "number") return Number.isFinite(v) ? round9(v) : ERR.VALUE;
  if (v === undefined || v === null) return "";
  if (isError(v) || typeof v === "string" || typeof v === "boolean") return v;
  return ERR.VALUE;
}

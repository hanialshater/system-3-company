// Slot C: evaluator and function registry.
// Contract: live/bench5/work/ARCH/ARCH.md, "Slot C: eval.mjs". Imports ../MOD-B/values.mjs only.
import { ERR, errorFromCode, binary, unary } from "../MOD-B/values.mjs";

// Registry {NAME: (argNodes, ctx, evaluate) -> value}; empty in wave 1, so every call -> #NAME?.
export const FUNCTIONS = {};

function walk(ast, ctx) {
  if (!ast || typeof ast !== "object") return ERR.VALUE;
  switch (ast.type) {
    case "num":
    case "str":
    case "bool":
      return ast.value;
    case "error":
      return errorFromCode(ast.code);
    case "unary":
      return unary(ast.op, walk(ast.arg, ctx));
    case "binary": {
      const a = walk(ast.left, ctx);
      const b = walk(ast.right, ctx);
      return binary(ast.op, a, b);
    }
    case "call": {
      const fn = Object.hasOwn(FUNCTIONS, ast.name) ? FUNCTIONS[ast.name] : undefined;
      return fn ? fn(ast.args ?? [], ctx, evaluate) : ERR.NAME;
    }
    case "ref": {
      // wave 2: ref lookups go through ctx
      if (!ctx || typeof ctx.get !== "function") return ERR.VALUE;
      const v = ctx.get(ast.cell);
      return v === undefined ? "" : v;
    }
    default:
      return ERR.VALUE;
  }
}

export function evaluate(ast, ctx) {
  try {
    return walk(ast, ctx);
  } catch {
    return ERR.VALUE;
  }
}

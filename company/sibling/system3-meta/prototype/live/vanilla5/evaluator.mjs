// Evaluates an AST. ctx: { getCell(name) -> value, functions: Map }.
import { err, ERR, isError, toNumber, toText } from './values.mjs';

function arith(op, a, b) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? err(ERR.DIV0) : a / b;
    case '^': return Math.pow(a, b);
  }
}

function finite(v) {
  return typeof v === 'number' && !Number.isFinite(v) ? err(ERR.VALUE) : v;
}

function compare(op, l, r) {
  let a, b;
  if (typeof l === 'string' && typeof r === 'string') {
    // both text: case-insensitive string compare
    a = l.toLowerCase(); b = r.toLowerCase();
  } else {
    a = toNumber(l); if (isError(a)) return a;
    b = toNumber(r); if (isError(b)) return b;
  }
  switch (op) {
    case '=': return a === b;
    case '<>': return a !== b;
    case '<': return a < b;
    case '>': return a > b;
    case '<=': return a <= b;
    case '>=': return a >= b;
  }
}

export function evaluate(node, ctx) {
  switch (node.kind) {
    case 'num': case 'str': case 'bool': return node.value;
    case 'unary': {
      const v = evaluate(node.arg, ctx);
      const n = toNumber(v);
      if (isError(n)) return n;
      return node.op === '-' ? -n : n;
    }
    case 'binary': {
      const l = evaluate(node.left, ctx);
      const r = evaluate(node.right, ctx);
      if (isError(l)) return l;
      if (isError(r)) return r;
      if (node.op === '&') return toText(l) + toText(r);
      if (['=', '<>', '<', '>', '<=', '>='].includes(node.op)) return compare(node.op, l, r);
      const a = toNumber(l); if (isError(a)) return a;
      const b = toNumber(r); if (isError(b)) return b;
      return finite(arith(node.op, a, b));
    }
    case 'ref':
      if (!node.valid || !ctx.getCell) return err(ERR.REF);
      return ctx.getCell(node.cell);
    case 'call': {
      const fn = ctx.functions && ctx.functions.get(node.name);
      if (!fn) return err(ERR.NAME);
      return finite(fn(node.args, makeApi(ctx)));
    }
    case 'range': return err(ERR.VALUE);
    case 'name': return err(ERR.NAME);
  }
  return err(ERR.VALUE);
}

// Helpers handed to function implementations.
function makeApi(ctx) {
  return {
    eval: (node) => evaluate(node, ctx),
    isRange: (node) => node.kind === 'range',
    // Values of a range node, column by column; or a SheetError (#REF!) for a bad corner.
    rangeValues(node) {
      if (!node.valid) return err(ERR.REF);
      const c1 = node.from.charCodeAt(0), c2 = node.to.charCodeAt(0);
      const r1 = Number(node.from.slice(1)), r2 = Number(node.to.slice(1));
      const out = [];
      for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++)
        for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++)
          out.push(ctx.getCell(String.fromCharCode(c) + r));
      return out;
    },
  };
}

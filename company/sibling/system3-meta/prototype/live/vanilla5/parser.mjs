// Recursive-descent parser producing an AST.
// Node kinds: num, str, bool, unary{op,arg}, binary{op,left,right},
// ref{cell}, range{from,to}, call{name,args}, name{name}.
import { tokenize, ParseError } from './tokenizer.mjs';
import { isCellName } from './cellname.mjs';

export { ParseError };

// Anything shaped like letters+digits is a cell reference (possibly invalid → #REF!).
const REF_LIKE = /^[A-Za-z]+[0-9]+$/;

const LEVELS = [
  ['=', '<>', '<', '>', '<=', '>='],
  ['&'],
  ['+', '-'],
  ['*', '/'],
];

export function parseFormula(src) {
  const toks = tokenize(src);
  let p = 0;
  const peek = () => toks[p];
  const isOp = (v) => peek().type === 'op' && peek().value === v;
  const expect = (v) => {
    if (!isOp(v)) throw new ParseError(`expected ${v}`);
    p++;
  };

  function binary(level) {
    if (level === LEVELS.length) return power();
    let left = binary(level + 1);
    while (peek().type === 'op' && LEVELS[level].includes(peek().value)) {
      const op = toks[p++].value;
      left = { kind: 'binary', op, left, right: binary(level + 1) };
    }
    return left;
  }
  // ^ is right-associative; unary binds tighter than ^ (so -2^2 = 4).
  function power() {
    const base = unary();
    if (isOp('^')) { p++; return { kind: 'binary', op: '^', left: base, right: power() }; }
    return base;
  }
  function unary() {
    if (isOp('-') || isOp('+')) {
      const op = toks[p++].value;
      return { kind: 'unary', op, arg: unary() };
    }
    return atom();
  }
  function atom() {
    const t = toks[p];
    if (t.type === 'num') { p++; return { kind: 'num', value: t.value }; }
    if (t.type === 'str') { p++; return { kind: 'str', value: t.value }; }
    if (t.type === 'op' && t.value === '(') {
      p++;
      const e = binary(0);
      expect(')');
      return e;
    }
    if (t.type === 'ident') {
      p++;
      const up = t.value.toUpperCase();
      if (isOp('(')) {
        p++;
        const args = [];
        if (!isOp(')')) {
          args.push(binary(0));
          while (isOp(',')) { p++; args.push(binary(0)); }
        }
        expect(')');
        return { kind: 'call', name: up, args };
      }
      if (up === 'TRUE' || up === 'FALSE') return { kind: 'bool', value: up === 'TRUE' };
      if (REF_LIKE.test(t.value)) {
        if (isOp(':')) {
          p++;
          const n = toks[p];
          if (n.type !== 'ident' || !REF_LIKE.test(n.value)) throw new ParseError('bad range');
          p++;
          const to = n.value.toUpperCase();
          return { kind: 'range', from: up, to, valid: isCellName(up) && isCellName(to) };
        }
        return { kind: 'ref', cell: up, valid: isCellName(up) };
      }
      return { kind: 'name', name: up };
    }
    throw new ParseError('unexpected token');
  }

  const ast = binary(0);
  if (peek().type !== 'eof') throw new ParseError('trailing input');
  return ast;
}

// Tokenizer for formula bodies (text after '=').
export class ParseError extends Error {}

const OPS2 = ['<>', '<=', '>='];
const OPS1 = '+-*/^&=<>(),:';

export function tokenize(src) {
  const out = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j])) j++;
      const t = src.slice(i, j);
      if ((t.match(/\./g) || []).length > 1 || t === '.') throw new ParseError(`bad number ${t}`);
      out.push({ type: 'num', value: Number(t) });
      i = j; continue;
    }
    if (c === '"') {
      const j = src.indexOf('"', i + 1);
      if (j < 0) throw new ParseError('unterminated string');
      out.push({ type: 'str', value: src.slice(i + 1, j) });
      i = j + 1; continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < src.length && /[A-Za-z0-9_.]/.test(src[j])) j++;
      out.push({ type: 'ident', value: src.slice(i, j) });
      i = j; continue;
    }
    const two = src.slice(i, i + 2);
    if (OPS2.includes(two)) { out.push({ type: 'op', value: two }); i += 2; continue; }
    if (OPS1.includes(c)) { out.push({ type: 'op', value: c }); i++; continue; }
    throw new ParseError(`unexpected character ${c}`);
  }
  out.push({ type: 'eof' });
  return out;
}

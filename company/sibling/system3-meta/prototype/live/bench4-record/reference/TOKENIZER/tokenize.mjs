export function tokenize(src) {
  const t = []; let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) { let j = i; while (j < src.length && /[0-9.]/.test(src[j])) j++; const s = src.slice(i, j); if (!/^(\d+\.?\d*|\.\d+)$/.test(s)) throw new SyntaxError(`bad number ${s}`); t.push({ type: "num", value: Number(s) }); i = j; continue; }
    if (c === '"') { const j = src.indexOf('"', i + 1); if (j < 0) throw new SyntaxError("unterminated string"); t.push({ type: "str", value: src.slice(i + 1, j) }); i = j + 1; continue; }
    if (/[A-Za-z]/.test(c)) { let j = i; while (j < src.length && /[A-Za-z0-9_]/.test(src[j])) j++; t.push({ type: "id", value: src.slice(i, j).toUpperCase() }); i = j; continue; }
    const two = src.slice(i, i + 2);
    if (["<=", ">=", "<>"].includes(two)) { t.push({ type: "op", value: two }); i += 2; continue; }
    if ("+-*/^&=<>(),:".includes(c)) { t.push({ type: "op", value: c }); i++; continue; }
    throw new SyntaxError(`unexpected ${c}`);
  }
  return t;
}

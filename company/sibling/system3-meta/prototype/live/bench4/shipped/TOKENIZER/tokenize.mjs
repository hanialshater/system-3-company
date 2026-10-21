// TOKENIZER: turns formula source text into tokens { type, value }.
const isDigit = (c) => c >= "0" && c <= "9";
const isLetter = (c) => (c >= "A" && c <= "Z") || (c >= "a" && c <= "z");
const isWs = (c) => c === " " || c === "\t" || c === "\n" || c === "\r" || c === "\f" || c === "\v";
const TWO = new Set(["<>", "<=", ">="]);
const ONE = new Set(["+", "-", "*", "/", "^", "&", "=", "<", ">", "(", ")", ",", ":"]);

export function tokenize(src) {
  if (typeof src !== "string") throw new SyntaxError("tokenize expects a string");
  const out = [];
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (isWs(c)) { i++; continue; }
    if (isDigit(c) || c === ".") {
      let j = i, dots = 0, digits = 0;
      while (j < n && (isDigit(src[j]) || src[j] === ".")) {
        if (src[j] === ".") { if (++dots > 1) throw new SyntaxError(`Bad number at ${i}`); }
        else digits++;
        j++;
      }
      if (digits === 0) throw new SyntaxError(`Bad number at ${i}`);
      out.push({ type: "num", value: Number(src.slice(i, j)) });
      i = j;
      continue;
    }
    if (c === '"') {
      const end = src.indexOf('"', i + 1);
      if (end < 0) throw new SyntaxError(`Unterminated string at ${i}`);
      out.push({ type: "str", value: src.slice(i + 1, end) });
      i = end + 1;
      continue;
    }
    if (isLetter(c)) {
      let j = i + 1;
      while (j < n && (isLetter(src[j]) || isDigit(src[j]) || src[j] === "_")) j++;
      out.push({ type: "id", value: src.slice(i, j).toUpperCase() });
      i = j;
      continue;
    }
    const two = src.slice(i, i + 2);
    if (TWO.has(two)) { out.push({ type: "op", value: two }); i += 2; continue; }
    if (ONE.has(c)) { out.push({ type: "op", value: c }); i++; continue; }
    throw new SyntaxError(`Unexpected character ${JSON.stringify(c)} at ${i}`);
  }
  return out;
}

// TOKENIZER: tokenize(src) -> [{ type, value }]. See SPEC.md, "TOKENIZER".
const TWO_CHAR_OPS = new Set(["<>", "<=", ">="]);
const ONE_CHAR_OPS = new Set(["+", "-", "*", "/", "^", "&", "=", "<", ">", "(", ")", ",", ":"]);

const isDigit = (c) => c >= "0" && c <= "9";
const isLetter = (c) => (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
const isSpace = (c) => /\s/.test(c);

export function tokenize(src) {
  if (typeof src !== "string") throw new SyntaxError("tokenize: source must be a string");
  const tokens = [];
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (isSpace(c)) { i++; continue; }

    if (isDigit(c) || c === ".") {
      const start = i;
      let dots = 0;
      let digits = 0;
      while (i < n && (isDigit(src[i]) || src[i] === ".")) {
        if (src[i] === ".") {
          dots++;
          if (dots > 1) throw new SyntaxError(`Bad number at ${start}: too many dots`);
        } else digits++;
        i++;
      }
      if (digits === 0) throw new SyntaxError(`Unexpected "." at ${start}`);
      tokens.push({ type: "num", value: Number(src.slice(start, i)) });
      continue;
    }

    if (c === '"') {
      const end = src.indexOf('"', i + 1);
      if (end === -1) throw new SyntaxError(`Unterminated string at ${i}`);
      tokens.push({ type: "str", value: src.slice(i + 1, end) });
      i = end + 1;
      continue;
    }

    if (isLetter(c)) {
      const start = i;
      i++;
      while (i < n && (isLetter(src[i]) || isDigit(src[i]) || src[i] === "_")) i++;
      tokens.push({ type: "id", value: src.slice(start, i).toUpperCase() });
      continue;
    }

    const two = src.slice(i, i + 2);
    if (TWO_CHAR_OPS.has(two)) { tokens.push({ type: "op", value: two }); i += 2; continue; }
    if (ONE_CHAR_OPS.has(c)) { tokens.push({ type: "op", value: c }); i++; continue; }

    throw new SyntaxError(`Unexpected character ${JSON.stringify(c)} at ${i}`);
  }
  return tokens;
}

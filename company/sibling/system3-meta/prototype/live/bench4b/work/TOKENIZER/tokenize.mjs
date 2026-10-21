// TOKENIZER: turns formula source into { type, value } tokens (see SPEC.md).
const OPS2 = new Set(["<>", "<=", ">="]);
const OPS1 = new Set(["+", "-", "*", "/", "^", "&", "=", "<", ">", "(", ")", ",", ":"]);
const isDigit = (c) => c >= "0" && c <= "9";
const isLetter = (c) => (c >= "A" && c <= "Z") || (c >= "a" && c <= "z");
const isSpace = (c) => c === " " || c === "\t" || c === "\n" || c === "\r" || c === "\f" || c === "\v";

export function tokenize(src) {
  if (typeof src !== "string") throw new SyntaxError("tokenize expects a string");
  const out = [];
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (isSpace(c) || /\s/.test(c)) { i++; continue; }
    if (isDigit(c) || (c === "." && isDigit(src[i + 1] ?? ""))) {
      let j = i;
      let dots = 0;
      while (j < n && (isDigit(src[j]) || src[j] === ".")) {
        if (src[j] === ".") {
          dots++;
          if (dots > 1) throw new SyntaxError(`Bad number at ${i}: ${src.slice(i, j + 1)}`);
        }
        j++;
      }
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
    if (OPS2.has(two)) { out.push({ type: "op", value: two }); i += 2; continue; }
    if (OPS1.has(c)) { out.push({ type: "op", value: c }); i++; continue; }
    throw new SyntaxError(`Unexpected character ${JSON.stringify(c)} at ${i}`);
  }
  return out;
}

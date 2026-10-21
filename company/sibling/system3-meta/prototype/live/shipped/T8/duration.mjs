// parseDuration: "1d2h3m4s5ms" -> milliseconds. Units d,h,m,s,ms in descending order, each at most once.
const UNITS = [['d', 86400000], ['h', 3600000], ['m', 60000], ['s', 1000], ['ms', 1]];

export function parseDuration(s) {
  if (typeof s !== 'string' || s.length === 0) throw new SyntaxError('duration must be a non-empty string');
  const part = /(\d+)(ms|d|h|m|s)/y;
  let pos = 0, last = -1, total = 0;
  while (pos < s.length) {
    part.lastIndex = pos;
    const m = part.exec(s);
    if (!m) throw new SyntaxError(`invalid duration at position ${pos}: ${JSON.stringify(s)}`);
    const idx = UNITS.findIndex(([u]) => u === m[2]);
    if (idx <= last) throw new SyntaxError(`unit "${m[2]}" out of order or repeated in ${JSON.stringify(s)}`);
    last = idx;
    total += Number(m[1]) * UNITS[idx][1];
    pos = part.lastIndex;
  }
  return total;
}

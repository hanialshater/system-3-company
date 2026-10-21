const NUM = /^(0|[1-9][0-9]*)$/;
const IDENT = /^[0-9A-Za-z-]+$/;
const DIGITS = /^[0-9]+$/;

function parse(v) {
  if (typeof v !== 'string') throw new TypeError(`Invalid version: ${String(v)}`);
  let rest = v;
  let build = null;
  const plus = rest.indexOf('+');
  if (plus !== -1) { build = rest.slice(plus + 1); rest = rest.slice(0, plus); }
  let pre = null;
  const dash = rest.indexOf('-');
  if (dash !== -1) { pre = rest.slice(dash + 1); rest = rest.slice(0, dash); }
  const core = rest.split('.');
  if (core.length !== 3 || !core.every((p) => NUM.test(p))) throw new TypeError(`Invalid version: ${v}`);
  const preIds = pre === null ? [] : pre.split('.');
  for (const id of preIds) {
    if (!IDENT.test(id)) throw new TypeError(`Invalid prerelease identifier in: ${v}`);
    if (DIGITS.test(id) && !NUM.test(id)) throw new TypeError(`Leading zero in prerelease identifier: ${v}`);
  }
  if (build !== null) {
    for (const id of build.split('.')) if (!IDENT.test(id)) throw new TypeError(`Invalid build identifier in: ${v}`);
  }
  return { core: core.map(BigInt), pre: preIds };
}

const sign = (x, y) => (x < y ? -1 : x > y ? 1 : 0);

export function compare(a, b) {
  const A = parse(a), B = parse(b);
  for (let i = 0; i < 3; i++) {
    const c = sign(A.core[i], B.core[i]);
    if (c) return c;
  }
  if (!A.pre.length && !B.pre.length) return 0;
  if (!A.pre.length) return 1;
  if (!B.pre.length) return -1;
  const n = Math.min(A.pre.length, B.pre.length);
  for (let i = 0; i < n; i++) {
    const x = A.pre[i], y = B.pre[i];
    const xn = DIGITS.test(x), yn = DIGITS.test(y);
    let c;
    if (xn && yn) c = sign(BigInt(x), BigInt(y));
    else if (xn) c = -1;
    else if (yn) c = 1;
    else c = x < y ? -1 : x > y ? 1 : 0; // ASCII order
    if (c) return c;
  }
  return sign(A.pre.length, B.pre.length);
}

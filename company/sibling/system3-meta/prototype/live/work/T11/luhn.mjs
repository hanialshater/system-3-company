// Luhn checksum validator. Never throws.
export function isValidLuhn(s) {
  try {
    if (typeof s !== 'string') return false;
    const d = s.split(' ').join(''); // only U+0020 is ignored
    if (d.length < 2 || !/^[0-9]+$/.test(d)) return false;
    let sum = 0;
    for (let i = d.length - 1, k = 0; i >= 0; i--, k++) {
      let v = d.charCodeAt(i) - 48;
      if (k % 2 === 1) { v *= 2; if (v > 9) v -= 9; }
      sum += v;
    }
    return sum % 10 === 0;
  } catch { return false; }
}

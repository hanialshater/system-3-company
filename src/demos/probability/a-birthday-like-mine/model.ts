// Birthday matching with 365 equally likely days (no leap day, even birth rates).
//   pMe(n)   = chance that at least one of n other people shares YOUR birthday = 1 - (364/365)^n
//   pAny(n)  = chance that some two of n people share a birthday = 1 - prod_{i<n} (1 - i/365)
//   pairs(n) = n(n-1)/2 pairs among n people; "you versus the crowd" is n comparisons.

export const DAYS = 365;
export const START = 10;
export const SMALL = 23;
export const MID = 183;
export const ANSWER = 253;

export const pMe = (n: number) => 1 - Math.pow((DAYS - 1) / DAYS, n);
export function pAny(n: number) {
  let none = 1;
  for (let i = 0; i < n; i++) none *= 1 - i / DAYS;
  return 1 - none;
}
export const pairs = (n: number) => (n * (n - 1)) / 2;

/** Smallest crowd for which pMe reaches 50%. */
export function evenOdds() {
  let n = 1;
  while (pMe(n) < 0.5) n++;
  return n;
}
export const pct1 = (p: number) => `${(p * 100).toFixed(1)}%`;

// Berkson's paradox. N people have talent and looks drawn as independent standard normals (Box-Muller from
// mulberry32(SEED)). A person is admitted when talent + looks > cut. The correlation is computed from the admitted dots.

import { mulberry32 } from "@/kit/random";

export const N = 1500;
export const SEED = 31;
export const ALL_CUT = -6; // admits everyone (no talent + looks in these samples is below -6)
export const HALF_CUT = 0;
export const TOP_CUT = 1.5;

export interface Person {
  talent: number;
  looks: number;
}

export function make(n = N, seed = SEED): Person[] {
  const r = mulberry32(seed);
  const g = () => Math.sqrt(-2 * Math.log(r() || 1e-12)) * Math.cos(2 * Math.PI * r());
  return Array.from({ length: n }, () => ({ talent: g(), looks: g() }));
}
export const PEOPLE = make();

export const admitted = (cut: number, people = PEOPLE) => people.filter((p) => p.talent + p.looks > cut);

export function corr(ps: Person[]) {
  const n = ps.length;
  if (n < 3) return 0;
  const mx = ps.reduce((a, p) => a + p.talent, 0) / n;
  const my = ps.reduce((a, p) => a + p.looks, 0) / n;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (const p of ps) {
    sxy += (p.talent - mx) * (p.looks - my);
    sxx += (p.talent - mx) ** 2;
    syy += (p.looks - my) ** 2;
  }
  return sxy / Math.sqrt(sxx * syy);
}

export function stats(cut: number, people = PEOPLE) {
  const a = admitted(cut, people);
  return { count: a.length, share: a.length / people.length, r: corr(a) };
}
export const fmtR = (r: number) => (r >= 0 ? "+" : "-") + Math.abs(r).toFixed(2);

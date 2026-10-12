// Simpson's paradox with the kidney-stone data (Charig et al. 1986, as presented by
// Julious & Mullee 1994). Success rates within each stone size stay fixed; the slider
// moves large-stone patients between treatments (each treatment keeps 350 patients).
// Away from the real split, cured counts are expected values (rate x patients), not whole people.

export const RATES = {
  A: { small: 81 / 87, large: 192 / 263 },
  B: { small: 234 / 270, large: 55 / 80 },
};
export const TOTAL_LARGE = 263 + 80; // 343
export const PER_ARM = 350;
export const REAL_K = 263; // large-stone patients who actually got A

export interface Arm {
  small: number;
  large: number;
  smallWins: number;
  largeWins: number;
}

/** k = how many of the 343 large-stone patients get A. At k = 263 this is the real data. */
export function arms(k: number): { A: Arm; B: Arm } {
  const aLarge = k;
  const aSmall = PER_ARM - k;
  const bLarge = TOTAL_LARGE - k;
  const bSmall = PER_ARM - bLarge;
  return {
    A: { small: aSmall, large: aLarge, smallWins: aSmall * RATES.A.small, largeWins: aLarge * RATES.A.large },
    B: { small: bSmall, large: bLarge, smallWins: bSmall * RATES.B.small, largeWins: bLarge * RATES.B.large },
  };
}

export const overall = (a: Arm) => (a.smallWins + a.largeWins) / (a.small + a.large);

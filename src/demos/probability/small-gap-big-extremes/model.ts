// Tail ratios. Two equal-sized seed batches with exact normal heights, same sd (10 cm), means 100 cm
// (A) and 105 cm (B). Above a cutoff c, each batch's share is Q((c - mean) / sd), where Q is the
// standard normal upper tail. B's share of the plants above c is Q_B / (Q_A + Q_B). Drawn exactly,
// no sampling. A model with equal spreads and exact bell shapes, chosen for the card.

export const SD = 10;
export const MEAN_A = 100;
export const MEAN_B = 105;
export const CUT = { min: 100, max: 140, step: 10, start: 120 };
export const PER = 100000;

/** Complementary error function (Numerical Recipes erfcc, fractional error < 1.2e-7). */
function erfc(x: number): number {
  const z = Math.abs(x);
  const t = 1 / (1 + 0.5 * z);
  const r =
    t *
    Math.exp(
      -z * z - 1.26551223 +
        t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))),
    );
  return x >= 0 ? r : 2 - r;
}

/** Standard normal upper tail Q(z) = P(Z > z). */
export const upper = (z: number) => 0.5 * erfc(z / Math.SQRT2);
export const tailA = (c: number) => upper((c - MEAN_A) / SD);
export const tailB = (c: number) => upper((c - MEAN_B) / SD);
export const shareB = (c: number) => tailB(c) / (tailA(c) + tailB(c));
export const ratio = (c: number) => tailB(c) / tailA(c);
export const density = (x: number, mean: number) => Math.exp(-0.5 * ((x - mean) / SD) ** 2) / (SD * Math.sqrt(2 * Math.PI));

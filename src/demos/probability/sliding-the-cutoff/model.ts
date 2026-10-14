// Two normal score curves: healthy people (mean 0) and sick people (mean SICK, or BETTER for a better test),
// both with spread 1. A person is flagged when their score is above the cutoff.
//   missed       = share of sick people scoring below the cutoff   = Phi(cutoff - mean)
//   falseAlarms  = share of healthy people scoring above the cutoff = 1 - Phi(cutoff)

export const SICK = 2;
export const BETTER = 2.5; // better test: sick mean
export const BETTER_HEALTHY = -0.5; // better test: healthy mean (curves 3 apart instead of 2)
export const START_CUT = 1;
export const HIGH_CUT = 1.5;
export const LOW_CUT = 0.5;

function erf(x: number) {
  const s = Math.sign(x);
  const a = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * a);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t) * Math.exp(-a * a);
  return s * y;
}
export const Phi = (x: number) => 0.5 * (1 + erf(x / Math.SQRT2));
export const pdf = (x: number, mean: number) => Math.exp(-0.5 * (x - mean) ** 2) / Math.sqrt(2 * Math.PI);

export function errors(cut: number, sickMean: number, healthyMean = 0) {
  return { missed: Phi(cut - sickMean), falseAlarms: 1 - Phi(cut - healthyMean) };
}
export const pct1 = (p: number) => `${(p * 100).toFixed(1)}%`;

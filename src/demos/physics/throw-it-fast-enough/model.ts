// Newton's mountain, no air. A ball is thrown horizontally from a 10 km peak on a
// spherical, non-rotating Earth (R = 6371 km, g = 9.81 m/s^2 at the surface, so
// GM = g R^2). Integrated with velocity Verlet, dt = 1 s. Shared by Demo.tsx and by
// the claim checks, so the stage and the text use the same numbers.

export const G0 = 9.81;
export const R_E = 6.371e6; // m
export const PEAK = 10_000; // m
export const GM = G0 * R_E * R_E;
export const SPEEDS = [790, 4000, 7000, 7600, 7800, 7850, 7900]; // m/s, slider stops
export const V_CIRC_SURFACE = Math.sqrt(G0 * R_E); // 7906 m/s, the brief's sqrt(g R)
export const V_CIRC_PEAK = Math.sqrt(GM / (R_E + PEAK)); // 7899 m/s

export interface Flight {
  v: number;
  /** polar samples: angle travelled (rad), height above ground (m) */
  pts: [number, number][];
  lands: boolean;
  /** ground distance to the landing point (m), or one full circumference */
  dist: number;
  /** time of flight (s), or time to come round to the peak again */
  time: number;
}

export function fly(v: number): Flight {
  const d = 1;
  let x = 0;
  let y = R_E + PEAK;
  let vx = v;
  let vy = 0;
  let t = 0;
  let unwrapped = 0;
  let prev = 0;
  const pts: [number, number][] = [[0, PEAK]];
  for (let i = 0; i < 20000; i++) {
    const r = Math.hypot(x, y);
    const ax = (-GM * x) / r ** 3;
    const ay = (-GM * y) / r ** 3;
    x += vx * d + 0.5 * ax * d * d;
    y += vy * d + 0.5 * ay * d * d;
    const r2 = Math.hypot(x, y);
    vx += 0.5 * (ax - (GM * x) / r2 ** 3) * d;
    vy += 0.5 * (ay - (GM * y) / r2 ** 3) * d;
    t += d;
    let ang = Math.atan2(x, y);
    if (ang < 0) ang += 2 * Math.PI;
    if (ang < prev - Math.PI) unwrapped += 2 * Math.PI;
    prev = ang;
    const total = ang + unwrapped;
    if (r2 <= R_E) {
      pts.push([total, 0]);
      return { v, pts, lands: true, dist: total * R_E, time: t };
    }
    if (total >= 2 * Math.PI) {
      pts.push([2 * Math.PI, r2 - R_E]);
      return { v, pts, lands: false, dist: 2 * Math.PI * R_E, time: t };
    }
    if (i % 5 === 0) pts.push([total, r2 - R_E]);
  }
  return { v, pts, lands: false, dist: 2 * Math.PI * R_E, time: t };
}

export const FLIGHTS = SPEEDS.map(fly);

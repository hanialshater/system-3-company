// NOAA solar calculator equations (after Meeus 1998, Astronomical Algorithms ch. 25 and 28), as in section
// `sunset` of company/domains/briefs/checks/geography-wave-j.mjs: London 51.5074 N, 0.1278 W, clock = GMT,
// refraction and solar disc 0.833 degrees, declination and equation of time at noon UT of each date.

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const LAT = 51.5074;
const LON = -0.1278;

function jd(y: number, m: number, d: number) {
  if (m <= 2) {
    y--;
    m += 12;
  }
  const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
}

function sun(JD: number) {
  const T = (JD - 2451545) / 36525;
  const L0 = (280.46646 + T * (36000.76983 + T * 0.0003032)) % 360;
  const M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
  const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
  const C = Math.sin(rad(M)) * (1.914602 - T * (0.004817 + 0.000014 * T)) + Math.sin(rad(2 * M)) * (0.019993 - 0.000101 * T) + Math.sin(rad(3 * M)) * 0.000289;
  const lam = L0 + C - 0.00569 - 0.00478 * Math.sin(rad(125.04 - 1934.136 * T));
  const eps0 = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60;
  const epsl = eps0 + 0.00256 * Math.cos(rad(125.04 - 1934.136 * T));
  const dec = deg(Math.asin(Math.sin(rad(epsl)) * Math.sin(rad(lam))));
  const y = Math.tan(rad(epsl / 2)) ** 2;
  const eot = 4 * deg(y * Math.sin(2 * rad(L0)) - 2 * e * Math.sin(rad(M)) + 4 * e * y * Math.sin(rad(M)) * Math.cos(2 * rad(L0)) - 0.5 * y * y * Math.sin(4 * rad(L0)) - 1.25 * e * e * Math.sin(2 * rad(M)));
  return { dec, eot };
}

export type Day = { k: number; label: string; rise: number; noon: number; set: number; len: number };
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** 1 December 2026 (k = 0) to 15 January 2027 (k = 45); times in minutes after midnight GMT. */
export const DAYS: Day[] = Array.from({ length: 46 }, (_, k) => {
  const J = jd(2026, 12, 1) + k + 0.5;
  const { dec, eot } = sun(J);
  const ha = deg(Math.acos(Math.cos(rad(90.833)) / (Math.cos(rad(LAT)) * Math.cos(rad(dec))) - Math.tan(rad(LAT)) * Math.tan(rad(dec))));
  const noon = 720 - 4 * LON - eot;
  const d = new Date(Date.UTC(2026, 11, 1 + k));
  return { k, label: `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`, rise: noon - 4 * ha, noon, set: noon + 4 * ha, len: 8 * ha };
});

/** HH:MM, rounded to the nearest minute. */
export const clock = (min: number) => {
  const m = Math.round(min);
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};
export const span = (min: number) => {
  const m = Math.round(min);
  return `${Math.floor(m / 60)} h ${m % 60} min`;
};

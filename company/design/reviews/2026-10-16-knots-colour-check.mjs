// Colour check for the knots batch 1 (W-1580). Run from the repo root:
//   node company/design/reviews/2026-10-16-knots-colour-check.mjs
// Contrast: WCAG 2.x relative luminance. Colour vision: Machado, Oliveira & Fernandes 2009 matrices,
// severity 1.0, applied in linear sRGB; then CIEDE2000 between simulated colours, and WCAG contrast of the
// simulated colour on the simulated background. Dichromat simulations are approximations, not a clinical test.
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
const lin = c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const gam = c => { c = Math.min(1, Math.max(0, c)); return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055; };
const lum = rgb => { const [r, g, b] = rgb.map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const cr = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const M = {
  deuteranopia: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
  protanopia: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  tritanopia: [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]],
};
const sim = (rgb, k) => k === 'normal' ? rgb : M[k].map(r => gam(r[0] * lin(rgb[0]) + r[1] * lin(rgb[1]) + r[2] * lin(rgb[2])));
const lab = rgb => {
  const [r, g, b] = rgb.map(lin);
  const x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047, y = 0.2126 * r + 0.7152 * g + 0.0722 * b, z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883;
  const f = t => t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116;
  return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
};
function de00(l1, l2) {
  const d2r = Math.PI / 180, r2d = 180 / Math.PI;
  const [L1, a1, b1] = l1, [L2, a2, b2] = l2;
  const C1 = Math.hypot(a1, b1), C2 = Math.hypot(a2, b2), Cb = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)));
  const ap1 = (1 + G) * a1, ap2 = (1 + G) * a2, Cp1 = Math.hypot(ap1, b1), Cp2 = Math.hypot(ap2, b2);
  const hp = (b, a) => { const h = Math.atan2(b, a) * r2d; return h < 0 ? h + 360 : h; };
  const h1 = Cp1 ? hp(b1, ap1) : 0, h2 = Cp2 ? hp(b2, ap2) : 0;
  const dL = L2 - L1, dC = Cp2 - Cp1;
  let dh = 0;
  if (Cp1 * Cp2) { dh = h2 - h1; if (dh > 180) dh -= 360; else if (dh < -180) dh += 360; }
  const dH = 2 * Math.sqrt(Cp1 * Cp2) * Math.sin(dh * d2r / 2), Lb = (L1 + L2) / 2, Cpb = (Cp1 + Cp2) / 2;
  let hb = h1 + h2;
  if (Cp1 * Cp2) hb = Math.abs(h1 - h2) > 180 ? (h1 + h2 + (h1 + h2 < 360 ? 360 : -360)) / 2 : (h1 + h2) / 2;
  const T = 1 - 0.17 * Math.cos((hb - 30) * d2r) + 0.24 * Math.cos(2 * hb * d2r) + 0.32 * Math.cos((3 * hb + 6) * d2r) - 0.2 * Math.cos((4 * hb - 63) * d2r);
  const dt = 30 * Math.exp(-(((hb - 275) / 25) ** 2)), Rc = 2 * Math.sqrt(Cpb ** 7 / (Cpb ** 7 + 25 ** 7));
  const Sl = 1 + 0.015 * (Lb - 50) ** 2 / Math.sqrt(20 + (Lb - 50) ** 2), Sc = 1 + 0.045 * Cpb, Sh = 1 + 0.015 * Cpb * T, Rt = -Math.sin(2 * dt * d2r) * Rc;
  return Math.sqrt((dL / Sl) ** 2 + (dC / Sc) ** 2 + (dH / Sh) ** 2 + Rt * (dC / Sc) * (dH / Sh));
}
const mix = (rgb, k) => rgb.map(c => c * k); // color-mix(in srgb, c k%, #000)
const hx = rgb => '#' + rgb.map(c => Math.round(c * 255).toString(16).padStart(2, '0')).join('');
// Tokens from src/app/globals.css; math --domain from content/domains.json (#7c9cff = --accent).
const themes = {
  dark: { bg3: '#1f2430', fg: '#eef1f7', domain: '#7c9cff', arcs: ['#E69F00', '#56B4E9', '#E87FBF'] },
  light: { bg3: '#eceff6', fg: '#141824', domain: '#7c9cff', arcs: ['#A65E00', '#0068A8', '#B0337A'] },
};
const modes = ['normal', 'deuteranopia', 'protanopia', 'tritanopia'];
// Search: best 3-colour sets (>= 3:1 on stage) from Okabe-Ito hues, plus the darkened light-theme versions
// (each colour mixed with black at 100/80/65 %), ranked by the smallest pairwise dE2000 over all four vision types.
// Score a set: node ... score dark|light #aaa #bbb #ccc
if (process.argv[2] === 'score') {
  const [, , , th, ...cols] = process.argv, bg = hex(themes[th].bg3), cs = cols.map(hex);
  for (const m of modes) {
    const pr = []; for (let a = 0; a < 3; a++) for (let b = a + 1; b < 3; b++) pr.push(`${a + 1}-${b + 1}:${de00(lab(sim(cs[a], m)), lab(sim(cs[b], m))).toFixed(1)}`);
    console.log(`${m.padEnd(12)} contrast ${cs.map(c => cr(sim(c, m), sim(bg, m)).toFixed(2)).join(' / ')} ; dE ${pr.join('  ')}`);
  }
  process.exit(0);
}
if (process.argv[2] === 'search') {
  const oi = ['#E69F00', '#56B4E9', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7'];
  for (const [t, T] of Object.entries(themes)) {
    const bg = hex(T.bg3), pool = [];
    for (const h of oi) for (const k of (t === 'dark' ? [1] : [1, 0.8, 0.65])) { const c = mix(hex(h), k); if (cr(c, bg) >= 3) pool.push([h, k, c]); }
    const res = [];
    for (let i = 0; i < pool.length; i++) for (let j = i + 1; j < pool.length; j++) for (let l = j + 1; l < pool.length; l++) {
      if (new Set([pool[i][0], pool[j][0], pool[l][0]]).size < 3) continue;
      const cs = [pool[i], pool[j], pool[l]];
      let min = 1e9; for (const m of modes) for (let a = 0; a < 3; a++) for (let b = a + 1; b < 3; b++) min = Math.min(min, de00(lab(sim(cs[a][2], m)), lab(sim(cs[b][2], m))));
      res.push([min, cs.map(c => hx(c[2])).join(' '), Math.min(...cs.map(c => cr(c[2], bg)))]);
    }
    res.sort((x, y) => y[0] - x[0]);
    console.log(`\n${t}: top sets by worst-case dE (min contrast)`);
    for (const r of res.slice(0, 5)) console.log(`  ${r[1]}  worst dE ${r[0].toFixed(1)}  min contrast ${r[2].toFixed(2)}`);
  }
  process.exit(0);
}
for (const [t, T] of Object.entries(themes)) {
  const bg = hex(T.bg3), fg = hex(T.fg);
  console.log(`\n=== ${t} (stage ${T.bg3}) ===`);
  const cands = t === 'dark' ? { 'domain raw': hex(T.domain) } : {
    'domain raw': hex(T.domain), '70% (spec)': mix(hex(T.domain), 0.70), '60%': mix(hex(T.domain), 0.60), '45% (system.md text mix)': mix(hex(T.domain), 0.45),
  };
  console.log('TINT: contrast on stage; dE2000 against the --fg strand');
  for (const [name, c] of Object.entries(cands)) {
    console.log(`  ${name} ${hx(c)}`);
    for (const m of modes) {
      const sc = sim(c, m), sb = sim(bg, m), sf = sim(fg, m);
      console.log(`    ${m.padEnd(12)} ${cr(sc, sb).toFixed(2)}:1  dE vs fg ${de00(lab(sc), lab(sf)).toFixed(1)}  L* ${lab(sc)[0].toFixed(0)} (fg ${lab(sf)[0].toFixed(0)})`);
    }
  }
  console.log('ARCS: contrast on stage per vision type; pairwise dE2000 and L*');
  const arcs = T.arcs.map(hex);
  for (const m of modes) {
    const sb = sim(bg, m);
    const cs = arcs.map(a => cr(sim(a, m), sb).toFixed(2));
    const pairs = [];
    for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) pairs.push(`${i + 1}-${j + 1}:${de00(lab(sim(arcs[i], m)), lab(sim(arcs[j], m))).toFixed(1)}`);
    console.log(`  ${m.padEnd(12)} contrast ${cs.join(' / ')} ; dE ${pairs.join('  ')} ; L* ${arcs.map(a => lab(sim(a, m))[0].toFixed(0)).join('/')}`);
  }
}

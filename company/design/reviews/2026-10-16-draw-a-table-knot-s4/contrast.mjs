const lum = (h) => {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return ((x + 0.05) / (y + 0.05)).toFixed(2); };
const mix = (a, t, b) => "#" + [1, 3, 5].map((i) => Math.round(parseInt(a.slice(i, i + 2), 16) * t + parseInt(b.slice(i, i + 2), 16) * (1 - t)).toString(16).padStart(2, "0")).join("");
const dom = "#7c9cff", ink = mix(dom, 0.45, "#000000");
console.log("domain on light bg-3 #eceff6:", cr(dom, "#eceff6"));
console.log("domain on dark bg-3 #1f2430:", cr(dom, "#1f2430"));
console.log("ink", ink, "on light bg-3:", cr(ink, "#eceff6"));
for (const t of [0.8, 0.7, 0.65, 0.6]) { const m = mix(dom, t, "#000000"); console.log("mix", t, m, "on light bg-3:", cr(m, "#eceff6"), "vs fg #141824:", cr(m, "#141824")); }
console.log("muted light #5d6578 on bg-3:", cr("#5d6578", "#eceff6"), " muted dark #9aa3b5:", cr("#9aa3b5", "#1f2430"));

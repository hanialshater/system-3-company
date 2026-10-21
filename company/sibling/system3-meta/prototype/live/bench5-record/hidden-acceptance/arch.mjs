// reads ARCH.md: "## Slot A: <file>.mjs" then a line "exports: a, b"
import fs from "node:fs"; import path from "node:path";
export function slots() {
  const f = path.join(process.env.BOOK_ROOT, "ARCH", "ARCH.md");
  if (!fs.existsSync(f)) return null;
  const t = fs.readFileSync(f, "utf8"), out = {};
  for (const m of t.matchAll(/^##\s*Slot\s+([A-D])\s*:\s*`?([\w.\-]+\.mjs)`?[^\n]*\n([\s\S]*?)(?=^##\s|(?![\s\S]))/gm)) {
    const ex = (m[3].match(/^\s*exports\s*:\s*(.+)$/im) || [])[1];
    out[m[1]] = { file: m[2], exports: ex ? ex.split(/[,\s]+/).map((x) => x.replace(/[`()]/g, "")).filter(Boolean) : [] };
  }
  return out;
}

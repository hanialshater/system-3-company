// HQ whiteboard, disk side (server only).
import fs from "node:fs";
import path from "node:path";
import { ROOMS } from "./hq";
import { WB_ROOT, isSketchFile, sketchRelPath, validateSketch, type Sketch } from "./hq-whiteboard";

export const boardIds = () => ROOMS.filter((r) => r.kind === "meeting").map((r) => r.id);
const abs = (rel: string) => path.join(process.cwd(), rel);

export function listSketches(board: string): string[] {
  try {
    return fs.readdirSync(abs(`${WB_ROOT}/${board}`)).filter(isSketchFile).sort().reverse();
  } catch {
    return [];
  }
}

export function loadSketch(board: string, file: string): Sketch | null {
  const rel = sketchRelPath(board, file, boardIds());
  if (!rel) return null;
  try {
    const j = JSON.parse(fs.readFileSync(abs(rel), "utf8"));
    return validateSketch(j, boardIds()) ? null : (j as Sketch);
  } catch {
    return null;
  }
}

export function saveSketch(file: unknown, sketch: unknown): { ok: true; file: string } | { ok: false; error: string } {
  const err = validateSketch(sketch, boardIds());
  if (err) return { ok: false, error: err };
  const s = sketch as Sketch;
  const rel = sketchRelPath(s.board, file, boardIds());
  if (!rel) return { ok: false, error: "file must be <yyyy-mm-dd>-<slug>.json" };
  const root = path.resolve(abs(WB_ROOT));
  const target = path.resolve(abs(rel));
  if (!target.startsWith(root + path.sep)) return { ok: false, error: "path outside whiteboards" };
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, JSON.stringify(s, null, 1) + "\n");
  return { ok: true, file: file as string };
}

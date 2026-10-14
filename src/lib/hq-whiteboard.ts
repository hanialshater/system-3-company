// HQ whiteboard: the sketch format, its validator and the write-path guards. Pure (no fs), so tests
// and the browser can share it. Format and examples: company/meetings/whiteboards/README.md.
export const WB_ROOT = "company/meetings/whiteboards";
export const WB_W = 1000;
export const WB_H = 700;
export const WB_MAX_BYTES = 200_000;
export const WB_MAX_SHAPES = 2000;
export const WB_MAX_POINTS = 4000;
export const WB_COLORS = ["#1f2430", "#e5484d", "#2f7de1", "#2da44e", "#e8a317", "#8e4ec6"] as const;

export type Shape = { id: string; color: string; author: string } & (
  | { type: "stroke"; points: [number, number][]; width?: number }
  | { type: "rect" | "ellipse"; x: number; y: number; w: number; h: number }
  | { type: "line" | "arrow"; x1: number; y1: number; x2: number; y2: number }
  | { type: "text"; x: number; y: number; text: string; size?: number }
  | { type: "svg"; svg: string }
);
export interface Sketch {
  version: 1;
  board: string;
  title: string;
  created?: string;
  shapes: Shape[];
}

const BOARD_RE = /^[a-z0-9][a-z0-9-]{0,39}$/;
const FILE_RE = /^\d{4}-\d{2}-\d{2}-[a-z0-9][a-z0-9-]{0,47}\.json$/;
const COLOR_RE = /^#[0-9a-fA-F]{6}$/;
const AUTHOR_RE = /^[\w .@-]{1,40}$/;
const num = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v) && Math.abs(v) <= 10_000;

export const isBoardId = (s: unknown): s is string => typeof s === "string" && BOARD_RE.test(s);
export const isSketchFile = (s: unknown): s is string => typeof s === "string" && FILE_RE.test(s);

/** Relative path of a sketch under the repo root, or null if board or file is not on the allow-list. */
export function sketchRelPath(board: unknown, file: unknown, boards: readonly string[]): string | null {
  if (!isBoardId(board) || !boards.includes(board) || !isSketchFile(file)) return null;
  return `${WB_ROOT}/${board}/${file}`;
}

/** Build a file name from a title: <date>-<slug>.json */
export function sketchFileName(title: string, date: string): string {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "sketch";
  return `${date}-${slug}.json`;
}

/** Returns an error string, or null when the shape is valid. */
export function validateShape(s: unknown): string | null {
  if (!s || typeof s !== "object") return "shape is not an object";
  const o = s as Record<string, unknown>;
  if (typeof o.id !== "string" || !/^[\w-]{1,40}$/.test(o.id)) return "shape id must be 1-40 word characters";
  if (typeof o.color !== "string" || !COLOR_RE.test(o.color)) return "color must be #rrggbb";
  if (typeof o.author !== "string" || !AUTHOR_RE.test(o.author)) return "author must be 1-40 characters";
  switch (o.type) {
    case "stroke":
      if (!Array.isArray(o.points) || o.points.length < 1 || o.points.length > WB_MAX_POINTS) return "stroke needs 1-" + WB_MAX_POINTS + " points";
      if (!o.points.every((p) => Array.isArray(p) && p.length === 2 && num(p[0]) && num(p[1]))) return "stroke points must be [x, y] numbers";
      if (o.width !== undefined && !(num(o.width) && o.width > 0 && o.width <= 40)) return "stroke width 0-40";
      return null;
    case "rect":
    case "ellipse":
      return num(o.x) && num(o.y) && num(o.w) && num(o.h) ? null : `${o.type} needs numeric x, y, w, h`;
    case "line":
    case "arrow":
      return num(o.x1) && num(o.y1) && num(o.x2) && num(o.y2) ? null : `${o.type} needs numeric x1, y1, x2, y2`;
    case "text":
      if (!num(o.x) || !num(o.y)) return "text needs numeric x, y";
      if (typeof o.text !== "string" || o.text.length < 1 || o.text.length > 500) return "text must be 1-500 characters";
      if (o.size !== undefined && !(num(o.size) && o.size >= 6 && o.size <= 120)) return "text size 6-120";
      return null;
    case "svg":
      if (typeof o.svg !== "string" || o.svg.length > 20_000 || !/^\s*<svg[\s>]/i.test(o.svg)) return "svg must be an <svg ...> string under 20000 characters";
      if (/<script|<foreignObject|\son\w+\s*=|javascript:|<iframe|<image|href\s*=/i.test(o.svg)) return "svg may not contain scripts, links, images or event handlers";
      return null;
    default:
      return "unknown shape type";
  }
}

/** Returns an error string, or null when the sketch is valid. */
export function validateSketch(x: unknown, boards?: readonly string[]): string | null {
  if (!x || typeof x !== "object") return "sketch is not an object";
  const o = x as Record<string, unknown>;
  if (o.version !== 1) return "version must be 1";
  if (!isBoardId(o.board) || (boards && !boards.includes(o.board))) return "unknown board";
  if (typeof o.title !== "string" || o.title.length < 1 || o.title.length > 120) return "title must be 1-120 characters";
  if (o.created !== undefined && typeof o.created !== "string") return "created must be a string";
  if (!Array.isArray(o.shapes) || o.shapes.length > WB_MAX_SHAPES) return "shapes must be a list of at most " + WB_MAX_SHAPES;
  const ids = new Set<string>();
  for (const [i, s] of o.shapes.entries()) {
    const e = validateShape(s);
    if (e) return `shapes[${i}]: ${e}`;
    const id = (s as { id: string }).id;
    if (ids.has(id)) return `shapes[${i}]: duplicate id ${id}`;
    ids.add(id);
  }
  return null;
}

/** Same-origin only, like /api/events, and stricter: a write must carry an Origin header (browsers always send one). */
type Req = { url: string; headers: { get(name: string): string | null } };
export function whiteboardWriteAllowed(req: Req, sameOrigin: (r: Req) => boolean): boolean {
  // sameOrigin is eventWriteAllowed from src/lib/spike.ts (passed in so this file stays loadable by the test runner).
  return req.headers.get("origin") !== null && sameOrigin(req);
}

/** Local runs always; production only with WHITEBOARD_WRITE=1 (EDD-003: production state outside git is undecided). */
export const whiteboardWritable = (env: Record<string, string | undefined> = process.env) => env.NODE_ENV !== "production" || env.WHITEBOARD_WRITE === "1";

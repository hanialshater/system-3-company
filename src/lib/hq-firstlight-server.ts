// First Light war room, disk side (server only): status.json, the board, risks, founder inbox, stand-up records, announcements.
import fs from "node:fs";
import path from "node:path";
import { validateStatus, validateRefs, type BoardItem, type FirstLightStatus } from "./hq-firstlight";

const rd = (root: string, rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const json = (root: string, rel: string) => JSON.parse(rd(root, rel));
const FL = "company/initiatives/first-light";

export interface RiskRow { id: string; title: string; likelihood: number; impact: number; owner: string; status?: string }
export interface InboxRow { id: string; title: string; status: string; priority?: number; recommendation?: string }
export interface Record_ { file: string; kind: "standup" | "founder-review"; text: string }

export interface FirstLightData {
  status: FirstLightStatus | null;
  error: string | null;
  board: BoardItem[];
  risks: RiskRow[];
  inbox: InboxRow[];
  standup: Record_ | null;
  review: Record_ | null;
  announcements: string;
  boardIds: string[];
}

export function loadStandups(root = process.cwd()): { standup: Record_ | null; review: Record_ | null } {
  let files: string[] = [];
  try {
    files = fs.readdirSync(path.join(root, FL, "standups")).filter((f) => /^\d{4}-\d{2}-\d{2}-(standup|founder-review)\.md$/.test(f)).sort();
  } catch {}
  const latest = (kind: "standup" | "founder-review"): Record_ | null => {
    const f = files.filter((x) => x.endsWith(`-${kind}.md`)).pop();
    return f ? { file: f, kind, text: rd(root, `${FL}/standups/${f}`) } : null;
  };
  return { standup: latest("standup"), review: latest("founder-review") };
}

export function loadFirstLight(root = process.cwd()): FirstLightData {
  const out: FirstLightData = { status: null, error: null, board: [], risks: [], inbox: [], ...loadStandups(root), announcements: "", boardIds: [] };
  try {
    out.board = json(root, "company/ops/board.json").items.map((b: BoardItem) => ({ id: b.id, title: b.title, owner: b.owner, state: b.state }));
    out.risks = json(root, "company/ops/risks.json").risks;
    out.inbox = json(root, "company/ops/founder-inbox.json").items;
    out.announcements = rd(root, `${FL}/announcements.md`);
  } catch (e) {
    out.error = `a source file could not be read: ${(e as Error).message}`;
    return out;
  }
  out.boardIds = out.board.map((b) => b.id);
  try {
    const st = json(root, `${FL}/status.json`);
    out.error = validateStatus(st) ?? validateRefs(st, new Set(out.boardIds), new Set(out.inbox.map((i) => i.id)), new Set(out.risks.map((r) => r.id)));
    if (!out.error) out.status = st;
    else out.error = `${FL}/status.json is invalid: ${out.error}`;
  } catch (e) {
    out.error = `${FL}/status.json could not be read: ${(e as Error).message}`;
  }
  return out;
}

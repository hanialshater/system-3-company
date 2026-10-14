// Kudos, write side for HQ (server only). Mirrors tools/kudos.mjs: same id scheme, no self-kudos.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { roles } from "../../tools/org/roles.mjs";
import { KUDOS_EMOJI, KUDOS_MAX, kudosRole } from "./hq-kudos";

/** Writes are local-only: unlike reading, HQ_PUBLIC does not open them up. */
export const kudosWritable = () => process.env.NODE_ENV !== "production";

export type GiveResult = { ok: true; id: string; added: boolean } | { ok: false; error: string };

export function giveKudos(body: unknown): GiveResult {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const to = typeof b.to === "string" ? b.to.trim() : "";
  const why = typeof b.for === "string" ? b.for.trim() : "";
  const emoji = typeof b.emoji === "string" ? b.emoji : "🎉";
  const ref = typeof b.ref === "string" && b.ref.length <= 200 && /^[\w./@-]+$/.test(b.ref) && !b.ref.includes("..") ? b.ref : undefined;
  const from = "founder";
  if (!roles.some((r: { id: string }) => r.id === to)) return { ok: false, error: "unknown recipient" };
  if (kudosRole(from) === kudosRole(to)) return { ok: false, error: "no kudos to yourself" };
  if (!why) return { ok: false, error: "say what it was for" };
  if (why.length > KUDOS_MAX || /[\r\n]/.test(why)) return { ok: false, error: `one line, ${KUDOS_MAX} characters at most` };
  if (!(KUDOS_EMOJI as readonly string[]).includes(emoji)) return { ok: false, error: "pick one of the emoji" };
  const log = path.join(process.cwd(), "company/ops/events.jsonl");
  const id = "kudos-" + crypto.createHash("sha1").update(`${from}|${to}|${why}`).digest("hex").slice(0, 10);
  const have = fs.existsSync(log) ? fs.readFileSync(log, "utf8") : "";
  if (have.includes(`"id":"${id}"`)) return { ok: true, id, added: false };
  const ev = { id, ts: new Date().toISOString(), type: "kudos", room: "lobby", actor: from, summary: `${emoji} ${from} → ${to}: ${why}`, subjects: [to], refs: ref ? [ref] : [], body: why };
  fs.appendFileSync(log, (have && !have.endsWith("\n") ? "\n" : "") + JSON.stringify(ev) + "\n");
  return { ok: true, id, added: true };
}

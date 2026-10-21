// F3 live (supplementary): drop the first check message the moment it appears (poll 200 ms).
import fs from "node:fs"; import path from "node:path";
const LIVE = path.resolve(process.argv[2]); process.env.META_LIVE_DIR = LIVE;
const { load, save, withLock } = await import(path.resolve(process.argv[3], "state.mjs"));
for (const end = Date.now() + 10 * 60000; Date.now() < end;) {
  await new Promise((r) => setTimeout(r, 200));
  let r = null; try { r = withLock(() => { const c = load(); const m = [...c.mailbox.msgs.values()].find((x) => x.kind === "work" && x.state === "open" && x.body?.stage === "check" && !x.lease); if (!m) return null; c.mailbox.msgs.delete(m.id); save(c); return { msg: m.id, order: m.ref }; }); } catch {}
  if (r) { fs.appendFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), `faults-${path.basename(LIVE)}.jsonl`), JSON.stringify({ t: new Date().toISOString(), fault: "F3", what: "check message dropped", ...r }) + "\n"); console.log("dropped", JSON.stringify(r)); break; }
}

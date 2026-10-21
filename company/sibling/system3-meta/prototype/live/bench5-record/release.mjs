// Benchmark 5 wave releaser and fault injector (hidden from agents; logs outside the live dir). It plays the founder:
//   when SHEET ships at wave n < 3: wave n+1 goes into SPEC5.md and the hidden tests, a company post announces it, and
//     every module order and SHEET are reopened with what the wave adds (the team decides what changes where)
//   F2: after wave 1 ships, the shipped and work SHEET are wrapped so a value of 10 reads as 11
//   F4: at the first ship after wave 3 opens, #CYCLE! is renamed #CIRC!: SHEET is reopened; the team finds the owner
//   node release.mjs --live=<dir> --acc=<dir> --proto=<kernel src> --waves=<dir with wave2.md, wave3.md>
import fs from "node:fs"; import path from "node:path"; import { spawnSync } from "node:child_process";
const opt = Object.fromEntries(process.argv.slice(2).map((a) => { const [k, ...v] = a.replace(/^--/, "").split("="); return [k, v.join("=")]; }));
const LIVE = path.resolve(opt.live), ACC = path.resolve(opt.acc), HERE = path.dirname(new URL(import.meta.url).pathname);
process.env.META_LIVE_DIR = LIVE;
const { load } = await import(path.join(opt.proto, "state.mjs"));
const logf = path.join(HERE, `release-${path.basename(LIVE)}.jsonl`);
const log = (x) => { const l = JSON.stringify({ t: new Date().toISOString(), ...x }); fs.appendFileSync(logf, l + "\n"); console.log(l); };
const meta = (...a) => { const r = spawnSync("node", [path.join(opt.proto, "meta.mjs"), ...a], { env: process.env, encoding: "utf8" }); return r.status === 0 ? JSON.parse(r.stdout) : { error: r.stderr.trim().slice(0, 300) }; };
const reqf = path.join(ACC, "requirements.json"), req = () => JSON.parse(fs.readFileSync(reqf, "utf8"));
const setReq = (x) => fs.writeFileSync(reqf, JSON.stringify({ ...req(), ...x }));
const spec = path.join(LIVE, "SPEC5.md");
let f2 = false, f4 = false, w3ships = null;
const end = Date.now() + Number(opt["max-min"] ?? 150) * 60000;
const shippedAtWave = new Map();
while (Date.now() < end) {
  await new Promise((r) => setTimeout(r, 1500));
  let co; try { co = load(); } catch { continue; }
  const os = [...co.engine.orders.values()], sheet = os.find((o) => o.task === "SHEET");
  const wave = req().wave;
  const nShipped = co.log.events.filter((e) => e.type === "shipped").length;
  if (sheet?.stage === "done" && !shippedAtWave.has(wave)) {
    shippedAtWave.set(wave, Date.now()); log({ event: "wave-shipped", wave });
    if (wave >= 3) { if (f4) break; else continue; }
    const next = wave + 1;
    fs.appendFileSync(spec, fs.readFileSync(path.join(opt.waves, `wave${next}.md`), "utf8").replaceAll("#CYCLE!", req().cycle));
    setReq({ wave: next });
    const post = meta("channel", "post", "--by=founder", "--channel=company", `--title=Wave ${next} is released: SPEC5.md now has a Wave ${next} section. Every module and SHEET is reopened; change what your slot owns (ARCH.md), hand in unchanged what it does not.`, "--ack");
    const re = os.filter((o) => /^MOD-|^SHEET$/.test(o.task)).map((o) => [o.task, meta("order", "reopen", o.id, "--by=founder", "--reason=wave release", `--findings=Wave ${next} is released (see the Wave ${next} section at the end of live/bench5/SPEC5.md). Change what your slot owns under ARCH.md for it; if your module needs nothing, hand it in unchanged and say so. If the wave needs a change to the interfaces, raise it with the lead.`).stage ?? "error"]);
    log({ event: "wave-released", wave: next, post: post.post ?? post.error, reopened: re });
    if (next === 3) w3ships = nShipped;
  }
  if (!f2 && shippedAtWave.has(1)) {
    for (const root of ["work", "shipped"]) {
      const d = path.join(LIVE, root, "SHEET"), f = path.join(d, "sheet.mjs");
      if (!fs.existsSync(f) || fs.existsSync(path.join(d, "sheet-impl.mjs"))) continue;
      fs.renameSync(f, path.join(d, "sheet-impl.mjs"));
      fs.writeFileSync(f, `export * from "./sheet-impl.mjs";\nimport { createSheet as impl } from "./sheet-impl.mjs";\nexport function createSheet() { const s = impl(); return { set: (c, t) => s.set(c, t), get: (c) => { const v = s.get(c); return v === 10 ? 11 : v; }, display: (c) => s.display(c) }; }\n`);
    }
    f2 = true; log({ fault: "F2", what: "SHEET wrapped after wave 1 shipped: a value of 10 reads as 11" });
  }
  if (!f4 && w3ships != null && nShipped > w3ships) {
    setReq({ cycle: "#CIRC!" });
    fs.writeFileSync(spec, fs.readFileSync(spec, "utf8").replaceAll("#CYCLE!", "#CIRC!") + `\n## Changed (founder, during wave 3)\n\nThe cycle error is now \`#CIRC!\` (it was \`#CYCLE!\`). Everything else stands.\n`);
    const post = meta("channel", "post", "--by=founder", "--channel=company", "--title=Requirement change: the cycle error is now #CIRC! (was #CYCLE!). SPEC5.md is updated.", "--ack");
    const re = meta("order", "reopen", sheet.id, "--by=founder", "--reason=changed requirement", "--findings=Requirement change from the founder: the cycle error value is now \"#CIRC!\" (was \"#CYCLE!\"). Find the module that owns it (ARCH.md) and get it changed: raise it with the lead if it is not yours.");
    f4 = true; log({ fault: "F4", what: "#CYCLE! renamed #CIRC!", post: post.post ?? post.error, reopen: re.stage ?? re.error });
  }
}
log({ event: "release-exit", waves: [...shippedAtWave.keys()], f2, f4 });

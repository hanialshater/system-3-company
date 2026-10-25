#!/usr/bin/env node
// The crew's runner: drives each member of a crew (crew.mjs) as one continuous agent session until the shared budget,
// the time or a plateau ends it, then off-boards every member into the company's knowledge base. Generalised from
// bench11-13's run.mjs (the dynamic-workflow archetype, product/ONBOARDING.md).
//   node crew-run.mjs <crew dir> [--fake|--sandboxed]       the crew's crew.json: members [{id, model, role, tree, root?}], main,
//                                                referee {cmd}, budget, minutes, task (a file the members read first),
//                                                knowledge (the knowledge base's KB.md, optional), plateauMin (optional)
// Sessions: the Agent SDK in each member's tree (sdkSession); a member's spend is estimated from its session transcript (the SDK's
// own figure is unreliable for resumed sessions, B10) and emitted as a spend event per turn. --fake plays each member
// (a trivial commit and a land), for tests.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { openCrew, startCrew, mainState, spent, unread, land, sync } from "./crew.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PRICE = (m) => (/sonnet/.test(m) ? [3, 3.75, 0.3, 15] : /haiku/.test(m) ? [1, 1.25, 0.1, 5] : [5, 6.25, 0.5, 25]);
const projDir = (cwd) => path.join(process.env.HOME ?? "/root", ".claude", "projects", path.resolve(cwd).replace(/[^A-Za-z0-9]/g, "-"));
/** a session's cost since t0 from its transcript (list prices × 1.33, B9c's calibration) */
export function transcriptCost(cwd, sid, since = 0) {
  let txt; try { txt = fs.readFileSync(path.join(projDir(cwd), `${sid}.jsonl`), "utf8"); } catch { return 0; }
  const seen = new Set(); let usd = 0;
  for (const l of txt.split("\n")) { let m; try { m = JSON.parse(l); } catch { continue; } if (m.type !== "assistant" || !m.message?.usage || Date.parse(m.timestamp) < since || seen.has(m.message.id)) continue; seen.add(m.message.id); const p = PRICE(m.message.model ?? ""), u = m.message.usage; usd += ((u.input_tokens ?? 0) * p[0] + (u.cache_creation_input_tokens ?? 0) * p[1] + (u.cache_read_input_tokens ?? 0) * p[2] + (u.output_tokens ?? 0) * p[3]) / 1e6; }
  return usd * 1.33;
}

export function intro(crew, m) {
  const s = crew.spec, task = s.task ? fs.readFileSync(s.task, "utf8") : "", cli = `CREW_DIR=${crew.dir} CREW_ME=${m.id} node ${path.join(HERE, "crew.mjs")}`;
  return `${task}

## You are a member of an organisation of ${s.members.length}

Members: ${s.members.map((x) => `**${x.id}** (${String(x.role).split(":")[0]})`).join(", ")}. You are **${m.id}**; your starting role: **${m.role}**. A role is a responsibility, not a limit: you may work on anything, in any way, that you judge most useful for the goal; change role, pair, review, or stop to leave the budget to others. Your tree: ${m.tree}.

- \`${cli} sync\` merges main into your tree; \`${cli} land "what it does"\` lands your committed work on main if the referee says main does not get worse. Land often.
- \`${cli} status\`; \`${cli} note --to=<member|all> --text='…'\`; \`${cli} notes\`; the board: \`${cli} read\`, \`${cli} post --kind=finding|dead-end|hypothesis --area=… --text='…' --evidence='…' --wrong-if='…'\`; claims: \`${cli} claim --area=… --text='…'\`, \`${cli} claims\`, \`${cli} drop --area=…\`.
- When you meet with others (a note thread, a pairing), record it: \`${cli} minutes --title='…' --with='a|b' --decided='…|…' --text='…'\`.
- The budget ($${s.budget}) and the time (${Math.round(s.minutes / 60)} hours) are shared by all members.${s.knowledge ? `\n- What earlier teams learned: ${s.knowledge} (use what you judge useful).` : ""}
- To step back, end your answer with IDLE on its own line; you will be woken by a note.

Commit as you go. When you stop, I will say "go on" while the organisation's time and budget last.`;
}

async function fakeTurn(crew, m, k) {
  fs.appendFileSync(path.join(m.tree, "WORK.md"), `turn ${k}\n`); spawnSync("git", ["-C", m.tree, "add", "-A"]); spawnSync("git", ["-c", "user.name=f", "-c", "user.email=f@f", "-C", m.tree, "commit", "-qm", `fake ${m.id} ${k}`]);
  try { sync(crew, m.id); land(crew, m.id, `fake ${k}`); } catch {}
  return { sid: `fake-${m.id}`, usd: 0.5, text: k >= 2 ? "done\nIDLE" : "ok" };
}

export async function runCrew(dir, { fake = false, session = null } = {}) {
  const crew = openCrew(dir), s = crew.spec; startCrew(crew);
  const t0 = Date.now(), minutes = () => (Date.now() - t0) / 60000, plateauMin = s.plateauMin ?? null;
  const lastGain = () => { const g = crew.events().filter((e) => e.type === "land" && e.after > e.before).at(-1); return g ? Date.parse(g.t) : t0; };
  const done = () => spent(crew) >= s.budget - 1 || minutes() >= s.minutes || (plateauMin && minutes() > plateauMin && (Date.now() - lastGain()) / 60000 > plateauMin);
  const W = s.members.map((m) => ({ ...m, sid: null, k: 0, idle: false }));
  const one = async (w) => {
    while (!done()) {
      if (w.idle) { if (unread(crew, w.id) > 0) { w.idle = false; crew.emit("wake", w.id, { count: crew.events().filter((e) => e.type === "note" && e.to === w.id).length }); } else { await new Promise((r) => setTimeout(r, fake ? 50 : 20_000)); if (W.every((x) => x.idle)) return; continue; } }
      const prompt = w.k === 0 ? intro(crew, w) : `Go on. The organisation: $${spent(crew).toFixed(2)} of $${s.budget}, ${Math.round(minutes())} of ${s.minutes} minutes; main at ${mainState(crew).rate}.${unread(crew, w.id) > 0 ? ` You have ${unread(crew, w.id)} unread note(s).` : ""}`;
      const r = fake ? await fakeTurn(crew, w, w.k) : await session(w, prompt, { resume: w.sid, stop: done });
      w.sid = r.sid ?? w.sid; w.k++;
      crew.emit("spend", w.id, { usd: Number((r.usd ?? 0).toFixed(4)), turn: w.k, sid: w.sid });
      // a failed turn (not one the stop guard cut) is retried; after three in a row the member goes idle until a note
      if (r.error && !done()) { w.errors = (w.errors ?? 0) + 1; crew.emit("turn.error", w.id, { why: r.error.slice(0, 300), turn: w.k }); if (w.errors >= 3) { w.idle = true; w.errors = 0; crew.emit("idle", w.id, { why: "three failed turns" }); } continue; }
      w.errors = 0;
      if (/(^|\n)\s*IDLE\s*$/.test(r.text ?? "")) { w.idle = true; crew.emit("idle", w.id, {}); }
    }
  };
  await Promise.all(W.map(one));
  crew.emit("crew.end", "operator", { main: mainState(crew), spent: Number(spent(crew).toFixed(2)), minutes: Math.round(minutes()) });
  return { crew, W };
}

/** Agent SDK sessions for real members: session(w, prompt, {resume, stop}) → {sid, usd, text}. One turn runs until the
 *  member answers, `stop()` turns true (checked every 10 s: the shared budget, the time, a plateau) or turnMs passes.
 *  `options(w)` adds the company's own session options (a sandbox, canUseTool, hooks, env): the kernel grants nothing
 *  beyond the tools list, so a company without a sandbox decides here what its members may run. `query` is for tests. */
export const TOOLS = ["Bash", "Read", "Write", "Edit", "Glob", "Grep"];
export function sdkSession({ options = () => ({}), turnMs = 45 * 60000, query = null, sdk = path.join(HERE, "launcher", "node_modules", "@anthropic-ai", "claude-agent-sdk", "sdk.mjs") } = {}) {
  return async (w, prompt, { resume = null, stop = () => false } = {}) => {
    query ??= (await import(pathToFileURL(sdk).href)).query;
    const ac = new AbortController(), t0 = Date.now(), timer = setTimeout(() => ac.abort(new Error("time cap")), turnMs), guard = setInterval(() => { if (stop()) ac.abort(new Error("stop")); }, 10_000);
    let sid = resume, text = "", error = null;
    try {
      const opts = { cwd: w.root ?? w.tree, model: w.model, abortController: ac, settingSources: [], tools: TOOLS, maxTurns: 1000, ...(resume ? { resume } : {}), ...(await options(w)) };
      for await (const m of query({ prompt, options: opts })) {
        if (typeof m.session_id === "string" && m.session_id) sid = m.session_id;
        if (m.type === "assistant") for (const c of m.message?.content ?? []) if (c.type === "text") text = c.text;
        if (m.type === "result" && typeof m.result === "string") text = m.result;
      }
    } catch (e) { error = String(e?.message ?? e); }
    clearTimeout(timer); clearInterval(guard);
    return { sid, usd: sid ? transcriptCost(w.root ?? w.tree, sid, t0) : 0, text, error };
  };
}

/** off-boarding: one last turn per member, its JSON entries appended to the company's knowledge base */
export const OFFBOARD = `Off-boarding: the work is over. Before you leave, record what you learned, for whoever works on a problem like this next: practices that paid, findings, dead ends and pitfalls, each with its evidence and how sure you are (a belief between 0 and 1). Do not run any more commands. Answer with a JSON array between the lines BEGIN-KB and END-KB, each item {"topic": "…", "kind": "practice|finding|dead-end|pitfall", "text": "…", "evidence": "…", "belief": 0.0-1.0}, 3 to 12 items.`;
export function recordOffboard(kbDir, run, member, text) {
  const m = String(text).match(/BEGIN-KB\s*([\s\S]*?)\s*END-KB/); let items = [];
  try { items = JSON.parse(m ? m[1] : "[]"); } catch {}
  fs.mkdirSync(kbDir, { recursive: true });
  for (const it of items) fs.appendFileSync(path.join(kbDir, "entries.jsonl"), JSON.stringify({ run, by: member.id, model: member.model, t: new Date().toISOString(), ...it }) + "\n");
  return items.length;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  // a real crew from the CLI gets the kernel's sessions with no options of the company's: run it only inside a sandbox
  // (a company's launcher passes its own options to sdkSession instead)
  const dir = path.resolve(process.argv[2] ?? "."), fake = process.argv.includes("--fake");
  if (!fake && !process.argv.includes("--sandboxed")) { console.error("crew-run: real members need a sandbox; run inside one with --sandboxed, or from a launcher that passes sdkSession({options}), or --fake"); process.exit(2); }
  const { crew } = await runCrew(dir, { fake, session: fake ? null : sdkSession({ options: () => ({ permissionMode: "bypassPermissions", allowDangerouslySkipPermissions: true }) }) });
  console.log(JSON.stringify(crew.events().at(-1)));
}

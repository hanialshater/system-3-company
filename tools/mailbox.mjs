#!/usr/bin/env node
// Mailboxes (founder decision F-42; runbook company/ops/runbook-mailbox.md; library tools/lib/mailbox.mjs).
//
//   node tools/mailbox.mjs send --from=<role> --to=<role|dispatcher> --kind=<dispatch-request|report|question|answer>
//                               --project=<tag> [--lane=<n>] [--role=<role>] (--file=<path> | --body=<text>)
//                               [--title=…] [--budget=…] [--done-when=…] [--stop-if=…] [--dispatch-kind=build|check|…]
//                               [--worktree=<path>] [--in-reply-to=<id>]
//        A dispatch-request goes to the dispatcher's mailbox; name the role with --role (or --to=<role>). It needs
//        --budget, --done-when and --stop-if, an approved --project, and passes the lane rule or is refused (exit 1).
//   node tools/mailbox.mjs list <role> [--unread] [--json]
//   node tools/mailbox.mjs read <id> [--by=<role>]            print it and mark it read
//   node tools/mailbox.mjs drain dispatcher [--json] [--lease=<min>] [--peek]   RESERVES each open request that passes
//                                       the lane re-check (O_EXCL, run id, lease 30 min) BEFORE printing its check,
//                                       launch, launched/release and event lines; --peek reserves nothing.
//   node tools/mailbox.mjs launched <id> --run=<run>          the agent started: confirm the reservation
//   node tools/mailbox.mjs release <id> --run=<run> --reason=…   the check failed or the launch failed: give it back
//   node tools/mailbox.mjs claim <id> [--agent=<label>]       reserve one request by hand (as the drain does)
//   node tools/mailbox.mjs done <id> --report=<path>          copy the report to the requester's mailbox
//   node tools/mailbox.mjs status [--json]                    unread per mailbox (company status is protected)
// Exit: 0 ok, 1 refused or not found, 2 usage.
import fs from "node:fs";
import * as mb from "./lib/mailbox.mjs";

const argv = process.argv.slice(2);
const opt = {}, pos = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (!a.startsWith("--")) { pos.push(a); continue; }
  const [k, ...v] = a.slice(2).split("=");
  if (v.length) opt[k] = v.join("=");
  else if (["unread", "json", "peek", "force"].includes(k)) opt[k] = true;
  else if (i + 1 < argv.length && !argv[i + 1].startsWith("--")) opt[k] = argv[++i];
  else opt[k] = true;
}
const [cmd, arg] = pos;
const usage = () => { console.error(fs.readFileSync(new URL(import.meta.url), "utf8").split("\n").filter((l) => l.startsWith("//")).slice(0, 19).map((l) => l.slice(3)).join("\n")); process.exit(2); };
const out = (x) => console.log(JSON.stringify(x, null, 2));

try {
  if (cmd === "send") {
    let body = opt.body;
    if (opt.file && opt.file !== true) body = fs.readFileSync(opt.file, "utf8");
    const r = mb.send({ ...opt, body });
    if (opt.json) out(r); else console.log(`sent ${r.id} -> ${r.to}${r.role ? ` (role ${r.role}, lane ${r.lane})` : ""}\n  ${r.file}`);
  } else if (cmd === "list") {
    if (!arg) usage();
    const ms = mb.list(arg).filter((m) => !opt.unread || !m.read);
    if (opt.json) out(ms.map(({ body, ...m }) => m));
    else {
      if (!ms.length) console.log(`${arg}: no ${opt.unread ? "unread " : ""}messages`);
      for (const m of ms) console.log(`${m.read ? " " : "*"} ${m.id}  ${m.fm.kind}  from ${m.fm.from}${m.fm.role ? `  role ${m.fm.role}` : ""}${m.claimed ? "  claimed" : ""}${m.done ? "  done" : ""}  ${m.fm.title ?? ""}`);
    }
  } else if (cmd === "read") {
    if (!arg) usage();
    const m = mb.markRead(arg, { by: opt.by && opt.by !== true ? opt.by : null });
    console.log(fs.readFileSync(m.file, "utf8"));
  } else if (cmd === "claim") {
    if (!arg) usage();
    const m = mb.claim(arg, { by: opt.by && opt.by !== true ? opt.by : "chief-of-staff", agent: opt.agent && opt.agent !== true ? opt.agent : null });
    console.log(`reserved ${m.id} for run ${m.claimed.run} until ${m.claimed.leaseUntil} (agent "${m.claimed.agent}")\n  after the agent starts: node tools/mailbox.mjs launched ${m.id} --run=${m.claimed.run}`);
  } else if (cmd === "launched") {
    if (!arg) usage();
    const m = mb.launched(arg, { run: opt.run });
    console.log(`${m.already ? "already launched" : "launched"} ${m.id} (run ${m.claimed.run})`);
  } else if (cmd === "release") {
    if (!arg) usage();
    const r = mb.release(arg, { run: opt.run, reason: opt.reason, force: !!opt.force });
    console.log(`released ${r.id} (run ${r.run}): ${r.reason}; the request is open again for the next drain`);
  } else if (cmd === "drain") {
    const leaseMs = opt.lease && opt.lease !== true ? Number(opt.lease) * 60_000 : undefined;
    if (leaseMs !== undefined && !(leaseMs >= 0)) usage();
    const reqs = mb.drain(arg || mb.DISPATCHER, { reserve: !opt.peek, ...(leaseMs !== undefined ? { leaseMs } : {}) });
    if (opt.json) out(reqs);
    else {
      if (!reqs.length) console.log(`dispatcher: no open dispatch-requests${opt.peek ? "" : " to reserve"}`);
      for (const r of reqs) {
        const tag = r.status === "reserved" ? "RESERVED" : r.status === "unreserved" ? "REQUEST (peek, not reserved)" : r.status === "expired-launched" ? "EXPIRED (launched)" : "REFUSED";
        console.log(`${tag} ${r.id}  ${r.role} for ${r.from} (lane ${r.lane}, project ${r.project}, kind ${r.kind})${r.run ? `  run ${r.run}` : ""}${r.leaseUntil ? ` lease until ${r.leaseUntil}` : ""}${r.reclaimed ? ` (reclaimed from expired run ${r.reclaimed})` : ""}\n  brief: ${r.brief}`);
        if (r.status === "expired-launched") { for (const x of r.refused) console.log(`  ${x}`); continue; }
        if (!r.ok) { for (const x of r.refused) console.log(`  refused: ${x}`); console.log("  do not dispatch; answer the sender (send --kind=answer)"); continue; }
        if (r.status === "unreserved") { console.log("  peek only: run the drain without --peek to reserve it before launching"); continue; }
        console.log(`  1 check: ${r.check}\n      on FAIL: ${r.release}\n  2 start the agent with description "${r.label}" and the brief file as its prompt\n      if the Agent call fails: ${r.release}\n  3 confirm: ${r.launched}\n  4 event (chief of staff records it; skip if the hook wrote one): ${r.event}`);
      }
    }
  } else if (cmd === "done") {
    if (!arg) usage();
    const r = mb.done(arg, opt.report);
    console.log(`done ${r.id}: report ${r.reply} -> ${r.to}\n  ${r.file}\n  event (chief of staff records it): ${r.event}`);
  } else if (cmd === "status") {
    const s = mb.status();
    if (opt.json) out(s);
    else {
      if (!s.length) console.log(`mailboxes: none yet (${mb.baseDir()})`);
      for (const b of s) console.log(`${b.role.padEnd(32)} ${String(b.unread).padStart(3)} unread${b.reportsUnread ? ` (${b.reportsUnread} reports)` : ""}${b.role === mb.DISPATCHER ? `, ${b.unclaimed} unreserved requests, ${b.reserved} reserved (lease live), ${b.expired} lease expired` : ""}  of ${b.total}`);
    }
  } else usage();
} catch (e) {
  if (e instanceof mb.MailError) { console.error(`mailbox: ${e.message}`); process.exit(1); }
  throw e;
}

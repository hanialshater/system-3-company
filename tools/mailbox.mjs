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
//   node tools/mailbox.mjs claim <id> [--agent=<label>] [--by=<role>]   the dispatcher took it (O_EXCL; once only)
//   node tools/mailbox.mjs drain dispatcher [--json]          unclaimed requests, re-checked, with the dispatch-check,
//                                                             claim and event lines to run. Writes nothing.
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
  else if (["unread", "json"].includes(k)) opt[k] = true;
  else if (i + 1 < argv.length && !argv[i + 1].startsWith("--")) opt[k] = argv[++i];
  else opt[k] = true;
}
const [cmd, arg] = pos;
const usage = () => { console.error(fs.readFileSync(new URL(import.meta.url), "utf8").split("\n").filter((l) => l.startsWith("//")).slice(0, 18).map((l) => l.slice(3)).join("\n")); process.exit(2); };
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
    console.log(`claimed ${m.id} (agent "${m.claimed.agent}")`);
  } else if (cmd === "drain") {
    const reqs = mb.drain(arg || mb.DISPATCHER);
    if (opt.json) out(reqs);
    else {
      if (!reqs.length) console.log("dispatcher: no unclaimed dispatch-requests");
      for (const r of reqs) {
        console.log(`${r.ok ? "REQUEST" : "REFUSED"} ${r.id}  ${r.role} for ${r.from} (lane ${r.lane}, project ${r.project}, kind ${r.kind})\n  brief: ${r.brief}`);
        if (!r.ok) { for (const x of r.refused) console.log(`  refused: ${x}`); console.log("  do not dispatch; answer the sender (send --kind=answer)"); continue; }
        console.log(`  1 check: ${r.check}\n  2 start the agent with description "${r.label}" and the brief file as its prompt\n  3 claim: ${r.claim}\n  4 event (chief of staff records it; skip if the hook wrote one): ${r.event}`);
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
      for (const b of s) console.log(`${b.role.padEnd(32)} ${String(b.unread).padStart(3)} unread${b.reportsUnread ? ` (${b.reportsUnread} reports)` : ""}${b.role === mb.DISPATCHER ? `, ${b.unclaimed} unclaimed requests` : ""}  of ${b.total}`);
    }
  } else usage();
} catch (e) {
  if (e instanceof mb.MailError) { console.error(`mailbox: ${e.message}`); process.exit(1); }
  throw e;
}

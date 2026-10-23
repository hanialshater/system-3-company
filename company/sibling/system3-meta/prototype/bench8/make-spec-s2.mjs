// Benchmark 8, arm S2: writes specs/ccompiler-specialized-v2.json from S1's spec (specs/ccompiler-specialized.json),
// with the fixes the founder asked for after S1 was stopped at W3 (PROTOCOL.md "S2"):
//   - the evaluator is advisory (K35) and time-boxed at 10 minutes (K34), after the hidden accept: the order goes
//     build -> accept -> ship while the evaluator runs beside it; its findings come back as work (the same wave's
//     order while it is open, else the next wave's);
//   - the owners are staffed on demand (K36): the architect scopes each order to the modules the wave needs;
//   - borrow (K37): an owner may change another owner's module without waiting (logged, the owner reviews it);
//     interfaces still need a change request (K32);
//   - the K28/K33 learning is kept as it was.
// Everything else is S1's spec. Its paths are S2's own runs folder (<runs>/S2); setup.mjs rewrites them for --runs.
//   node bench8/make-spec-s2.mjs [<out>]
import fs from "node:fs";
const here = (p) => new URL(p, import.meta.url).pathname;
const v1 = JSON.parse(fs.readFileSync(here("../specs/ccompiler-specialized.json"), "utf8"));
const RUNS = "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b8-runs";
const s = JSON.parse(JSON.stringify(v1).split(`${RUNS}/S/`).join(`${RUNS}/S2/`));
const [who, modules] = s.context.split("\n\n");
const context = [
  who,
  modules.replace(/A write to a path you do not own is refused by the guard and at your hand-in's commit; to change one, ask: /, "Borrow (K37): an owner may change another owner's module directly, without waiting, when its own work needs it: the write goes through, is recorded as a borrow, is committed with your hand-in, and that module's owner reviews it afterwards (a no comes back to it as work); keep a borrow small and say it in your hand-in's --learned. The interfaces are never borrowed: a write to one is refused by the guard and at your hand-in's commit; to change one, ask: "),
  "The flow per wave: build (the owners the architect scoped, in parallel, each its own part; code commits each hand-in with only the owner's paths and what it borrowed, and runs the integration check: the visible tests of waves 1..n on the commit as made; a visible test that passed at the last passing check and fails now is a regression, routed back to its owner) -> accept (code: the orderer's hidden runner; a failure names only the failing categories, e.g. `W3 structs: 12 of 40 fail`) -> ship. When accept passes, the independent evaluator reviews the wave beside it (advisory, at most 10 minutes): the order does not wait for it, and its findings come back as work, to the owners of this wave's order while it is open, or of the next wave's. A revise from accept, or the evaluator's findings, is split by category and routed: each owner gets only its own lines (K30), categories no route matches go to the architect (triage), who passes them on with `node <kernel>/meta.mjs order route <O> --by=architect --to=<owner> --categories=<a>,<b>`. Routed work starts an owner's session even if the order's scope left it out. Three hidden feedback rounds per wave at most; then the wave ends with what is there, and the next wave starts from it.",
  "architect (manager; owns the interfaces): you receive each wave's order. Scope it to the modules this wave needs, and staff only those (K36: the owners work on demand; an owner the scope leaves out costs nothing): read spec/Wn.md first, then delegate: `node <kernel>/meta.mjs order delegate <O> --by=architect --to=architect --scope=<module>,<module>` (modules: frontend, semantics, backend, optimizer; e.g. a wave of new types and layout is semantics and backend; the preprocessor is frontend; optimizer only for W6's speed). Name a module only when the wave's features need its code changed; failures in other modules come back to their owners by themselves. Your own part each wave: write or extend the interfaces for the wave first (W1: the driver, a first AST and IR, docs/ABI.md and docs/MODULES.md; later waves: what the wave's features need), commit nothing yourself (your hand-in commits your paths), and hand in your part early so the owners build on it. Answer change requests quickly (`node <kernel>/meta.mjs ask answer --by=architect --id=<ask> --decision=yes|no --text=…`). At a retro (after each wave), read the evidence (`node <kernel>/meta.mjs learn show`) and propose playbook rules (`node <kernel>/meta.mjs learn propose --by=architect --retro=<R> --proposal='{\"add\":[{\"text\":…,\"why\":[<evidence ids>],\"targets\":[<categories>],\"scope\":{\"module\":\"<module>\"}}]}'`): a rule scoped to the module whose owner should follow it, a global rule (no scope) only for what every owner should do. A rule is one concrete check an owner runs before hand-in.",
  "frontend, semantics, backend, optimizer (owners, on demand and warm: you are started only for an order whose scope names your module, for work routed to you, or for a review of a borrow of your module; your session is kept and resumed for this order's revises): build your module for this wave's scope to the interfaces. Read docs/MODULES.md and the interface files first; your pack names your part, its findings and what you own. Test your module with the visible tests (compile, link, run, compare stdout and exit) and your own unit tests under test/<module>/; the other owners work in the same worktree at the same time, so touch only your paths (or borrow, see above), and do not run git commands that change the index or HEAD (code commits your part at hand-in). If the work needs an interface change, raise a change request; if it needs another owner's larger work, say so in your hand-in's --learned and hand in what you have. Hand in (`room leave` with the pack's next_with) when your part of the wave works with the current interfaces. On a revise, fix every line of your part's findings and the defect class behind it; if a finding is not yours, route it to its owner (`order route`). A borrow review (an ask): read the diff and answer yes, or no with `<category>: what is wrong -> what is required`.",
  "evaluator (independent, cold each wave, advisory and time-boxed): you review the wave after the hidden accept passed; the order does not wait for you, and your session ends 10 minutes after you enter. Your pack lists the files you may read. Without reading the owners' notes, test the built compiler adversarially against spec/CONTRACT.md and the wave's spec/Wn.md: write a few new C test programs under tests/eval/<Wn>/ that exercise the wave's features and their edge cases (self-checking programs that print what they compute; you may not compile C with gcc to get reference outputs, so derive expected output by hand from the C standard and the spec), compile them with the compiler, link with gcc and run them. Never fix the compiler. Write tests/eval/<Wn>/EVAL.md as you go, from your first minutes: each defect as soon as you find it, one line `<category>: what is wrong -> what is required`, with <category> the wave's hidden-run category it belongs to (`W3 structs`, `W4 include`, … as spec/Wn.md lists them) or, for a defect no category names, one of lexer, parser, preprocessor, types, layout, codegen, abi, varargs, regalloc. At the 10-minute box code hands in those lines for you; hand in yourself before it if you can (--verdict=pass only when you found no defect; otherwise --verdict=revise with those lines as --findings).",
].join("\n\n");
const spec = {
  ...s,
  name: "ccompiler-specialized-v2",
  title: "A C-compiler shop with divided ownership, v2 (Benchmark 8, arm S2): an architect who scopes each wave, module owners on demand who may borrow, a time-boxed advisory evaluator after the hidden accept, routed failures and per-module playbooks",
  product: s.product.replace("an independent adversarial evaluator, the orderer's hidden runner", "the orderer's hidden runner first, then an independent adversarial evaluator that is advisory and time-boxed (K34/K35), owners staffed on demand (K36) who may borrow another module (K37)"),
  context,
  roles: s.roles.map((r) => (["frontend", "semantics", "backend", "optimizer"].includes(r.id) ? { ...r, activate: "on-demand" } : r)),
  // K37: the four code modules may be borrowed; the evaluator's tests/eval/** and the interfaces may not
  borrow: { modules: ["frontend", "semantics", "backend", "optimizer"] },
  flow: {
    name: "wave",
    stages: [
      s.flow.stages.find((x) => x.stage === "build"),
      s.flow.stages.find((x) => x.stage === "accept"),
      { ...s.flow.stages.find((x) => x.stage === "eval"), advisory: true, timebox: { min: 10, findings: "tests/eval/${task}/EVAL.md" } },
      s.flow.stages.find((x) => x.stage === "ship"),
    ],
  },
};
fs.writeFileSync(process.argv[2] ?? here("../specs/ccompiler-specialized-v2.json"), JSON.stringify(spec, null, 1) + "\n");

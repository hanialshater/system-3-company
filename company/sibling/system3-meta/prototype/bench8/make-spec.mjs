// Benchmark 8: writes specs/ccompiler-specialized.json (arm S's company), so the spec's long texts stay readable here.
//   node bench8/make-spec.mjs [<out>]     (default: ../specs/ccompiler-specialized.json)
// The paths are the default runs layout (setup.mjs paths); setup.mjs place rewrites them for another --runs.
import fs from "node:fs";
const RUNS = "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b8-runs";
const CLJ = `${RUNS}/toolchain/clj-run`, H = `${RUNS}/S/harness`;
const TOOLS = ["Bash", "Read", "Write", "Edit", "Glob", "Grep"];
const context = [
  "Your role is <id>: the role id this session was launched as (the --role= of your `room enter`). The company builds one product: a compiler for a subset of C, written in Clojure, that emits x86-64 GNU as assembly (CONTRACT.md). It comes in six waves on one growing codebase, one order per wave (task W1..W6). Each order has its own git worktree (the pack's workdir): main as the last wave left it, plus this wave's released files. spec/ and visible/ are the orderer's files: never edit them. spec/CONTRACT.md is what never changes; spec/Wn.md is the wave's exact scope; visible/Wn/ holds about a quarter of each wave's tests (.c, .expected stdout, .exit, manifest.json); spec/include/ the provided headers. Clojure runs only through " + CLJ + " (Clojure 1.12.6 + spec.alpha; ./src on the classpath; run it from the worktree root): `" + CLJ + " -m ccc.main -I spec/include <in.c> -o <out.s>`, then `gcc <out.s> -o <prog>`. The company's CLI is <kernel>/meta.mjs: your brief gives its absolute path (run it with node from anywhere). Rules for everyone (CONTRACT.md section 4): never compile or preprocess C with gcc, clang, cpp or anything else (gcc only assembles and links the compiler's .s), no downloads, no network, no special cases for test programs.",
  "The modules and who writes them (K29; every role reads everything): frontend owns src/ccc/frontend/** and test/frontend/** (the preprocessor, the lexer, the parser); semantics owns src/ccc/sema/** and test/sema/** (types, declarations, struct/union layout, constant evaluation, lowering the AST to the IR); backend owns src/ccc/backend/** and test/backend/** (x86-64 code generation, the System V ABI, frames, calls, varargs); optimizer owns src/ccc/opt/** and test/opt/** (IR passes, register allocation; it joins from W5); the evaluator owns tests/eval/**. The architect owns the interfaces (K32): src/ccc/main.clj (the driver: the contract's single-file and --batch modes), src/ccc/ast.clj (the AST), src/ccc/ir.clj (the IR), docs/ABI.md (calling convention, frame layout, data layout), docs/MODULES.md (the module map: each namespace, its owner, what it exports). A write to a path you do not own is refused by the guard and at your hand-in's commit; to change one, ask: `node <kernel>/meta.mjs ask raise --by=<you> --kind=change-request --module=<module or interface> --order=<O> --title=… --why=… --due=20` (the owner or the architect decides; a yes lets you write those paths on this order). Keep interface changes small and say in the request what changes for whom.",
  "The flow per wave: build (the owners in parallel, each its own part; code commits each hand-in with only the owner's paths and runs the integration check: the visible tests of waves 1..n on the commit as made; a visible test that passed at the last passing check and fails now is a regression, routed back to its owner) -> eval (the independent evaluator) -> accept (code: the orderer's hidden runner; a failure names only the failing categories, e.g. `W3 structs: 12 of 40 fail`) -> ship. A revise from eval or accept is split by category and routed: each owner gets only its own lines (K30), categories no route matches go to the architect (triage), who passes them on with `node <kernel>/meta.mjs order route <O> --by=architect --to=<owner> --categories=<a>,<b>`. Three hidden feedback rounds per wave at most; then the wave ends with what is there, and the next wave starts from it.",
  "architect (manager; owns the interfaces): you receive each wave's order. Delegate it to every active owner at once: `node <kernel>/meta.mjs order delegate <O> --by=architect --to=backend --owners=architect,frontend,semantics` (add optimizer from W5 on). Your own part each wave: write or extend the interfaces for the wave first (W1: the driver, a first AST and IR, docs/ABI.md and docs/MODULES.md; later waves: what the wave's features need), commit nothing yourself (your hand-in commits your paths), and hand in your part early so the owners build on it. Answer change requests quickly (`node <kernel>/meta.mjs ask answer --by=architect --id=<ask> --decision=yes|no --text=…`). At a retro (after each wave), read the evidence (`node <kernel>/meta.mjs learn show`) and propose playbook rules (`node <kernel>/meta.mjs learn propose --by=architect --retro=<R> --proposal='{\"add\":[{\"text\":…,\"why\":[<evidence ids>],\"targets\":[<categories>],\"scope\":{\"module\":\"<module>\"}}]}'`): a rule scoped to the module whose owner should follow it, a global rule (no scope) only for what every owner should do. A rule is one concrete check an owner runs before hand-in.",
  "frontend, semantics, backend, optimizer (owners, warm: your session is kept and resumed for this wave's revises): build your module for this wave's scope to the interfaces. Read docs/MODULES.md and the interface files first; your pack names your part, its findings and what you own. Test your module with the visible tests (compile, link, run, compare stdout and exit) and your own unit tests under test/<module>/; the other owners work in the same worktree at the same time, so touch only your paths, and do not run git commands that change the index or HEAD (code commits your part at hand-in). If the work needs a change in another module or an interface, raise a change request; if it needs another owner's work, say so in your hand-in's --learned and hand in what you have. Hand in (`room leave` with the pack's next_with) when your part of the wave works with the current interfaces. On a revise, fix every line of your part's findings and the defect class behind it; if a finding is not yours, route it to its owner (`order route`).",
  "evaluator (independent, cold each wave): your pack lists the files you may read. Without reading the owners' notes, test the built compiler adversarially against spec/CONTRACT.md and the wave's spec/Wn.md: write new C test programs under tests/eval/<Wn>/ that exercise the wave's features and their edge cases (self-checking programs that print what they compute; you may not compile C with gcc to get reference outputs, so derive expected output by hand from the C standard and the spec), compile them with the compiler, link with gcc, run them, and also run the visible tests. Never fix the compiler. Write tests/eval/<Wn>/EVAL.md: one line per check with its result, then your verdict. Report each defect as one line `<category>: what is wrong -> what is required`, with <category> the wave's hidden-run category it belongs to (`W3 structs`, `W4 include`, … as spec/Wn.md lists them) or, for a defect no category names, one of lexer, parser, preprocessor, types, layout, codegen, abi, varargs, regalloc. Hand in --verdict=pass only when you found no defect; otherwise --verdict=revise with those lines as --findings.",
].join("\n\n");
const role = (id, level, extra = {}) => ({ id, level, reportsTo: level === "evaluator" ? "founder" : level === "manager" ? "founder" : "architect", ...(level === "evaluator" ? { room: "review", floor: 3 } : { lane: "c", room: "lab", floor: 2 }), skills: [level === "manager" ? "manage" : level === "evaluator" ? "evaluate" : "build"], tools: TOOLS, settingSources: [], sessionMin: 60, maxTurns: 200, ...extra });
const spec = {
  name: "ccompiler-specialized",
  title: "A C-compiler shop with divided ownership (Benchmark 8, arm S): an architect, four module owners in parallel, an independent evaluator, routed failures and per-module playbooks",
  product: "A compiler for a subset of C, written in Clojure, built in six waves on one growing codebase: an architect who owns the interfaces, frontend/semantics/backend/optimizer owners working one worktree at once (K29-K31), interface change requests (K32), an independent adversarial evaluator, the orderer's hidden runner, failures routed to their owners (K30) and playbooks scoped per module (K33).",
  vars: { playbook_store: "" },
  context,
  rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "lab", floor: 2, kind: "lane", lane: "c" }, { id: "review", floor: 3, kind: "quality" }],
  skills: ["manage", "build", "evaluate"],
  roles: [
    { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
    role("architect", "manager"),
    role("frontend", "builder", { warm: true }),
    role("semantics", "builder", { warm: true }),
    role("backend", "builder", { warm: true }),
    role("optimizer", "builder", { warm: true }),
    role("evaluator", "evaluator"),
  ],
  maxLoops: 6,
  modules: {
    frontend: { paths: ["src/ccc/frontend/**", "test/frontend/**"], owner: "frontend", readers: "all" },
    semantics: { paths: ["src/ccc/sema/**", "test/sema/**"], owner: "semantics", readers: "all" },
    backend: { paths: ["src/ccc/backend/**", "test/backend/**"], owner: "backend", readers: "all" },
    optimizer: { paths: ["src/ccc/opt/**", "test/opt/**"], owner: "optimizer", readers: "all" },
    evaluation: { paths: ["tests/eval/**"], owner: "evaluator", readers: "all" },
  },
  interfaces: [
    { name: "driver", paths: ["src/ccc/main.clj"], owner: "architect", contract: { argv: ["node", `${H}/contract.mjs`, "load", `--clj=${CLJ}`], timeoutMs: 600000 } },
    { name: "ast", paths: ["src/ccc/ast.clj"], owner: "architect", contract: { argv: ["node", `${H}/contract.mjs`, "load", `--clj=${CLJ}`], timeoutMs: 600000 } },
    { name: "ir", paths: ["src/ccc/ir.clj"], owner: "architect", contract: { argv: ["node", `${H}/contract.mjs`, "load", `--clj=${CLJ}`], timeoutMs: 600000 } },
    { name: "abi-doc", paths: ["docs/ABI.md"], owner: "architect", contract: { argv: ["node", `${H}/contract.mjs`, "doc", "docs/ABI.md"] } },
    { name: "module-map", paths: ["docs/MODULES.md"], owner: "architect", contract: { argv: ["node", `${H}/contract.mjs`, "doc", "docs/MODULES.md"] } },
  ],
  // K30: the hidden runner's categories (normalized: "W3 structs" -> w3-structs) and the evaluator's module words
  routes: [
    { match: "^w4-(include|define|macro-function|conditional|stringize-paste)$", owner: "frontend" },
    { match: "^(preprocessor|lexer|parser|syntax|frontend)", owner: "frontend" },
    { match: "^w3-", owner: "semantics" },
    { match: "^w2-globals$", owner: "semantics" },
    { match: "^w5-(integer-types|casts|storage)$", owner: "semantics" },
    { match: "^(types|layout|declarations|initializers|semantics|sema|lowering)", owner: "semantics" },
    { match: "^w1-", owner: "backend" },
    { match: "^w2-(strings|char|arrays|pointers)$", owner: "backend" },
    { match: "^w4-varargs$", owner: "backend" },
    { match: "^w5-(floating|function-pointers|goto|switch|bitwise)$", owner: "backend" },
    { match: "^(codegen|abi|backend|varargs|frames|calls)", owner: "backend" },
    { match: "^w6-", owner: "optimizer" },
    { match: "^(optimizer|regalloc|performance|perf)", owner: "optimizer" },
  ],
  triage: "architect",
  architect: "architect",
  integration: { run: { argv: ["node", `${H}/visible-check.mjs`, "--wave=${task}", `--clj=${CLJ}`, `--baseline=${RUNS}/_operator/S/integration-baseline.json`], findings: { fromStdout: "^failed: (.+)$" }, timeoutMs: 1800000 }, at: "head", maxTries: 5 },
  workspace: { kind: "git-worktree", repo: `${RUNS}/S/work`, base: "main", root: `${RUNS}/S/wt`, branch: "wave-${task}", run: "b8s", commit: true },
  flow: {
    name: "wave",
    stages: [
      { stage: "build", signer: "builder", evidence: ["src/"] },
      { stage: "eval", signer: { role: "evaluator" }, independent: true, evidence: ["tests/eval/"], pack: { include: ["spec/**", "visible/**", "docs/**", "src/**", "test/**", "tests/eval/**"], exclude: ["NOTES*.md", "**/NOTES*.md"], history: false } },
      { stage: "accept", signer: "code", evidence: [], run: { argvFrom: "order", findings: { fromStdout: "^failed: (.+)$", checked: "^checked: (.+)$" }, errorExit: [2, 3], timeoutMs: 7200000 } },
      { stage: "ship", signer: "code", evidence: [], run: { argv: ["node", "-e", "0"] } },
    ],
  },
  learn: { store: "${playbook_store}", roles: ["frontend", "semantics", "backend", "optimizer"], retro: { role: "architect", every: 1 }, maxRules: 24, retireAfter: 2 },
};
fs.writeFileSync(process.argv[2] ?? new URL("../specs/ccompiler-specialized.json", import.meta.url).pathname, JSON.stringify(spec, null, 1) + "\n");

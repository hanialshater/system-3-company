// Benchmark 9, arm S: writes specs/compiler-speed-s9.json from S2's spec (specs/ccompiler-specialized-v2.json), for
// the compile-time task (bench9/PROTOCOL.md). What changes from S2:
//   - the modules follow the start's layout (V's B8 compiler): frontend owns lexer.clj and preproc.clj, parser owns
//     parser.clj (it also types and lowers), backend owns codegen.clj; the architect owns main.clj and types.clj (the
//     interfaces, K32); no optimizer role (every owner's work is speed);
//   - three orders (tasks W8, W9, W10: B9 rounds 1-3), each one round of the orderer's full judge, so the architect's retro (K28/K33,
//     with K38 beliefs) runs between rounds and its rules are scored on the next order;
//   - the integration check is the visible check of waves 1..5 and Lua (W7) on every hand-in, as S2's at W7;
//   - the evaluator stays advisory and time-boxed (K34/K35): it hunts for what the speed work broke.
// Its paths are S9's own runs folder (<runs>/S9); bench8/setup.mjs rewrites them for --runs.
//   node bench9/make-spec-s9.mjs [<out>]
import fs from "node:fs";
const here = (p) => new URL(p, import.meta.url).pathname;
const RUNS = "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b8-runs";
const s2 = JSON.parse(JSON.stringify(JSON.parse(fs.readFileSync(here("../specs/ccompiler-specialized-v2.json"), "utf8"))).split(`${RUNS}/S2/`).join(`${RUNS}/S9/`));
const OWNERS = ["frontend", "parser", "backend"];
const role = (id) => ({ ...s2.roles.find((r) => r.id === "frontend"), id });
const load = s2.interfaces.find((i) => i.name === "driver").contract;
const context = [
  "Your role is <id>: the role id this session was launched as (the --role= of your `room enter`). The company has one product: a working compiler for a subset of C, written in Clojure, that emits x86-64 GNU as (spec/CONTRACT.md); it passes its tests and builds the Lua 5.4.7 interpreter (spec/W7.md). The job now is spec/B9.md: **make it compile faster without breaking anything**. It comes as three orders (tasks W8, W9, W10: rounds 1, 2 and 3), each one round of the orderer's full judge; each order has its own git worktree (the pack's workdir): main as the last order left it. Clojure runs only through the toolchain's clj-run (its fixed flags; ./src on the classpath). Rules (spec/B9.md): no native image, no JVM flags, no AOT, no .class files or jars (src/ holds only .clj, .cljc, .edn); nothing survives from one compile to the next; no special cases for any input; never compile or preprocess C with anything but this compiler; no network.",
  "The modules and who writes them (K29; every role reads everything): frontend owns src/ccc/lexer.clj, src/ccc/preproc.clj and test/frontend/** (tokens, the preprocessor); parser owns src/ccc/parser.clj and test/parser/** (the parser, types, declarations, lowering); backend owns src/ccc/codegen.clj and test/backend/** (code generation and output); the architect owns the interfaces, src/ccc/main.clj (the driver, the batch loop) and src/ccc/types.clj, and docs/MODULES.md. Borrow (K37): an owner may change another owner's module directly when its own work needs it (logged; that module's owner reviews it afterwards); keep a borrow small and say it in your hand-in's --learned. The interfaces are never borrowed: to change one, ask: `node <kernel>/meta.mjs ask raise --by=<you> --to=architect --kind=interface --text=…`.",
  "The flow per order: build (the owners the architect scoped, in parallel; code commits each hand-in with only the owner's paths and what it borrowed, and runs the integration check: the visible tests of waves 1..5 and Lua's build and visible test files; a visible test that passed at the last passing check and fails now is a regression, routed back) -> accept (code: the orderer's full judge, once per order: the hidden tests, Lua's hidden test files, the runtime and memory limits, and the two timings against the start; its lines come back to the architect) -> ship. Beside it the independent evaluator (advisory, at most 10 minutes) hunts for what the speed work broke; its findings come back as work. The fast judge, which anyone may run as often as they like: `node <toolchain>/judge/judge.mjs fast --dir=<your workdir>` (about 5 minutes; timings are noisy, about ±15%, because the owners work at the same time).",
  "architect (manager; owns the interfaces): you receive each order. Read spec/B9.md and the last order's judge lines (in your pack's history), decide where the time goes (profile: the batch over Lua's sources, per phase), and scope the order to the owners whose modules hold the gain: `node <kernel>/meta.mjs order delegate <O> --by=architect --to=architect --scope=<module>,<module>` (modules: frontend, parser, backend). Your own part: the driver and the shared types (startup and load time live there: namespaces, requires, reflection), and docs/MODULES.md (where the time goes, per module, with numbers). Answer change requests quickly. At a retro (after each order), read the evidence (`node <kernel>/meta.mjs learn show`: each order's measured score, the owners' notes on what they changed and what it gained, the rules' beliefs) and propose **effect rules** (K39): practices that made the compiler faster and should be applied again, or what to stop doing, each with the effect you expect on the score (`node <kernel>/meta.mjs learn propose --by=architect --retro=<R> --proposal='{\"add\":[{\"kind\":\"effect\",\"text\":…,\"why\":[<evidence ids>],\"expect\":-0.05,\"roles\":[\"<owner>\"],\"wrongIf\":…}]}'`; expect -0.05 means 5% faster). Code measures each effect rule against every later order's score and keeps its belief; retire one whose belief has fallen.",
  "frontend, parser, backend (owners, on demand and warm): make your module faster for this order without changing what the compiler emits (the generated code's runtime may not get more than 10% slower; every test the compiler passes now must still pass). Profile first (time each phase on Lua's sources), change what the numbers say, and check with the visible tests and the fast judge. The other owners work in the same worktree at the same time: touch only your paths (or borrow), and do not run git commands that change the index or HEAD (code commits your part at hand-in). Hand in (`room leave` with the pack's next_with) when your part is faster and still correct. Your --learned is the company's experiment record (K39): what you changed, in which phase, and what the fast judge measured before and after (e.g. `parser: type hints on the token loop, reflection gone; lua 11.2 s -> 9.8 s`); follow the playbook's effect rules where they apply. On a revise, fix every line of your part's findings.",
  "evaluator (independent, cold each order, advisory and time-boxed): you review the order after the full judge ran; your session ends 10 minutes after you enter. Without reading the owners' notes, look for what the speed work broke: read the diff against main's previous state, write a few self-checking C test programs under tests/eval/<task>/ that exercise what changed (you may not compile C with gcc to get reference outputs: derive expected output by hand), compile them with the compiler, link with gcc and run them. Never fix the compiler. Write tests/eval/<task>/EVAL.md as you go, one line per defect `<module>: what is wrong -> what is required` (module: frontend, parser, backend, driver). At the 10-minute box code hands in those lines for you.",
].join("\n\n");
const spec = {
  ...s2,
  name: "compiler-speed-s9",
  title: "A compiler shop that makes its compiler fast (Benchmark 9, arm S): an architect who scopes each round, module owners on demand who may borrow, a time-boxed advisory evaluator, playbooks with beliefs",
  product: "Benchmark 9's task (bench9/PROTOCOL.md): make the start's compiler compile faster without breaking it, in three orders of one full-judge round each, with module owners (K29-K31, K36, K37), interface change requests (K32), an advisory evaluator (K34/K35), routed findings (K30) and per-module playbooks with Bayesian beliefs (K33, K38).",
  context,
  roles: [...s2.roles.filter((r) => ["founder", "architect", "evaluator"].includes(r.id)), ...OWNERS.map((id) => ({ ...role(id), activate: "on-demand" }))],
  modules: {
    frontend: { paths: ["src/ccc/lexer.clj", "src/ccc/preproc.clj", "test/frontend/**"], owner: "frontend", readers: "all" },
    parser: { paths: ["src/ccc/parser.clj", "test/parser/**"], owner: "parser", readers: "all" },
    backend: { paths: ["src/ccc/codegen.clj", "test/backend/**"], owner: "backend", readers: "all" },
    evaluation: { paths: ["tests/eval/**"], owner: "evaluator", readers: "all" },
  },
  interfaces: [
    { name: "driver", paths: ["src/ccc/main.clj"], owner: "architect", contract: load },
    { name: "types", paths: ["src/ccc/types.clj"], owner: "architect", contract: load },
    { name: "module-map", paths: ["docs/MODULES.md"], owner: "architect", contract: s2.interfaces.find((i) => i.name === "module-map").contract },
  ],
  // the evaluator's lines name a module; the judge's lines go to the architect (triage)
  routes: [
    { match: "^(frontend|lexer|preproc)", owner: "frontend" },
    { match: "^(parser|types|lowering)", owner: "parser" },
    { match: "^(backend|codegen)", owner: "backend" },
  ],
  integration: { ...s2.integration, run: { ...s2.integration.run, argv: s2.integration.run.argv.map((a) => (a === "--wave=${task}" ? "--wave=W7" : a)) } },
  // K39: the judge's score is the accept stage's metric; each order's change in it scores the effect rules
  learn: { ...s2.learn, roles: OWNERS, metric: { name: "score", lower: true, noise: 0.15, baseline: 1 } },
  flow: { ...s2.flow, stages: s2.flow.stages.map((x) => (x.stage === "accept" ? { ...x, run: { ...x.run, findings: { ...x.run.findings, metric: "^metric: (.+)$" } } } : x)) },
  borrow: { modules: OWNERS },
};
fs.writeFileSync(process.argv[2] ?? here("../specs/compiler-speed-s9.json"), JSON.stringify(spec, null, 1) + "\n");

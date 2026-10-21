import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const cli = (dir, ...args) => {
  const env = { ...process.env, META_LIVE_DIR: dir }; delete env.NODE_TEST_CONTEXT;
  const r = spawnSync("node", [path.join(HERE, "..", "meta.mjs"), ...args], { env, encoding: "utf8" });
  return { code: r.status, out: r.stdout ? JSON.parse(r.stdout) : null, err: r.stderr };
};
const state = (dir) => JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"));
const order = (dir, id) => new Map(state(dir).engine.orders.__map).get(id);
const write = (dir, task, text) => { fs.mkdirSync(path.join(dir, "work", task), { recursive: true }); fs.writeFileSync(path.join(dir, "work", task, "page.md"), text); };

test("decisions become checks: open orders tighten, later orders inherit, bad rules are refused", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-rules-"));
  cli(dir, "init", "--spec=storybook");
  assert.equal(cli(dir, "order", "new", "--by=cos", "--to=editor", "--title=R1", "--task=ROUND1", "--accept=x", `--checks={"maxWords":300,"lineMaxWords":[{"prefix":"**Why:**","maxWords":25}]}`).code, 0);
  assert.equal(cli(dir, "order", "new", "--by=cos", "--to=editor", "--title=S", "--task=STYLE", "--accept=x", `--checks={"minWords":10}`).code, 0);
  cli(dir, "meeting", "open", "--by=editor", "--title=Kickoff", "--invitees=writer-1", `--agenda=[{"title":"format"}]`);
  cli(dir, "meeting", "reveal", "--id=MTG-1", "--by=editor", "--item=1", "--force");
  // a rule with an unknown check is refused, and nothing changes
  const bad = cli(dir, "meeting", "decide", "--id=MTG-1", "--by=editor", "--item=1", "--decision=d", `--rules=[{"tasks":"ROUND","checks":{"vibes":1}}]`);
  assert.equal(bad.code, 1); assert.match(bad.err, /unknown check vibes/);
  const r = cli(dir, "meeting", "decide", "--id=MTG-1", "--by=editor", "--item=1", "--decision=Why lines at most 20 words; answers unique across rounds",
    `--rules=[{"tasks":"ROUND","checks":{"maxWords":280,"lineMaxWords":[{"prefix":"**Why:**","maxWords":20}],"distinctAnswers":{"prefix":"**Answer:**","across":"ROUND"}}}]`);
  assert.equal(r.code, 0, r.err);
  const o1 = order(dir, "O-1");
  assert.equal(o1.checks.maxWords, 280, "stricter limit wins");
  assert.deepEqual(o1.checks.lineMaxWords, [{ prefix: "**Why:**", maxWords: 20 }]);
  assert.equal(order(dir, "O-2").checks.lineMaxWords, undefined, "STYLE does not match ROUND");
  // an order placed after the decision inherits it
  cli(dir, "order", "new", "--by=cos", "--to=editor", "--title=R2", "--task=ROUND2", "--accept=x", `--checks={"titleLine":true}`);
  assert.deepEqual(order(dir, "O-3").checks.lineMaxWords, [{ prefix: "**Why:**", maxWords: 20 }]);
  // the minutes carry the rule
  const m = cli(dir, "meeting", "close", "--id=MTG-1", "--by=editor");
  assert.match(m.out.minutes, /rule for ROUND\*: .*tightened O-1/);
  // and the check enforces it
  write(dir, "ROUND1", "# Round 1: Sun\n**Q1.** What is the Sun?\n**Answer:** A star\n**Why:** It is a very big and very hot ball of glowing gas that gives our whole world its light and its warmth.\n");
  const c = cli(dir, "check", "--order=O-1");
  assert.equal(c.out.pass, false); assert.match(c.out.output, /\(\*\*Why:\*\*\) has 2\d words > 20/);
});

test("distinctAnswers: a repeat or a giveaway across rounds fails, an ordinary mention does not", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-answers-"));
  cli(dir, "init", "--spec=storybook");
  cli(dir, "order", "new", "--by=cos", "--to=editor", "--title=R1", "--task=ROUND1", "--accept=x", `--checks={"distinctAnswers":{"prefix":"**Answer:**","across":"ROUND"}}`);
  write(dir, "ROUND5", "# Round 5: Small worlds\n**Q2.** What is the biggest dwarf planet?\n**Answer:** Pluto\n**Why:** It is far away.\n");
  write(dir, "ROUND1", "# Round 1: Sun\n**Q1.** What is the Sun?\n**Answer:** A star\n**Why:** Light from it reaches Pluto too.\n");
  assert.equal(cli(dir, "check", "--order=O-1").out.pass, true, "mentioning Pluto is fine");
  write(dir, "ROUND1", "# Round 1: Sun\n**Q1.** How many planets?\n**Answer:** Eight\n**Why:** Pluto is now called a dwarf planet.\n");
  const g = cli(dir, "check", "--order=O-1").out;
  assert.equal(g.pass, false); assert.match(g.output, /ROUND1 gives away ROUND5's answer "pluto"/);
  write(dir, "ROUND1", "# Round 1: Sun\n**Q1.** Which dwarf world is far?\n**Answer:** Pluto\n**Why:** It is cold.\n");
  assert.match(cli(dir, "check", "--order=O-1").out.output, /answer "pluto" is in both ROUND1 and ROUND5/);
});

test("closing a meeting writes its minutes to live/<dir>/minutes/<MTG>.md", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-minutes-"));
  cli(dir, "init", "--spec=storybook");
  cli(dir, "meeting", "open", "--by=editor", "--title=K", "--invitees=writer-1", `--agenda=[{"title":"a"}]`);
  cli(dir, "meeting", "reveal", "--id=MTG-1", "--by=editor", "--item=1", "--force");
  cli(dir, "meeting", "decide", "--id=MTG-1", "--by=editor", "--item=1", "--decision=Round topics: mammals, fish, shells");
  assert.equal(cli(dir, "meeting", "close", "--id=MTG-1", "--by=editor").code, 0);
  assert.match(fs.readFileSync(path.join(dir, "minutes", "MTG-1.md"), "utf8"), /Round topics: mammals, fish, shells/);
});

test("distinctAnswers within a round: an answer inside another answer, or named in another question", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "meta-within-"));
  cli(dir, "init", "--spec=storybook");
  cli(dir, "order", "new", "--by=cos", "--to=editor", "--title=R2", "--task=ROUND2", "--accept=x", `--checks={"distinctAnswers":{"prefix":"**Answer:**","across":"ROUND"}}`);
  write(dir, "ROUND2", "# Round 2: Fish\n**Q2.** Which fish has a tall fin?\n**Answer:** A shark\n**Why:** Fins.\n**Q3.** Which is the biggest fish?\n**Answer:** A whale shark\n**Why:** Big.\n");
  const r = cli(dir, "check", "--order=O-1").out;
  assert.equal(r.pass, false); assert.match(r.output, /answer "shark" is part of answer "whale shark"/);
  write(dir, "ROUND2", "# Round 2: Fish\n**Q2.** Which fish carries eggs in a pouch?\n**Answer:** A seahorse\n**Why:** Pouch.\n**Q3.** Unlike a seahorse, which fish is biggest?\n**Answer:** A whale shark\n**Why:** Big.\n");
  assert.equal(cli(dir, "check", "--order=O-1").out.pass, true, "a later question may name an earlier answer");
  write(dir, "ROUND2", "# Round 2: Fish\n**Q2.** Unlike a seahorse, which fish is biggest?\n**Answer:** A whale shark\n**Why:** Big.\n**Q3.** Which fish carries eggs in a pouch?\n**Answer:** A seahorse\n**Why:** Pouch.\n");
  assert.match(cli(dir, "check", "--order=O-1").out.output, /answer "seahorse" is named in an earlier question/);
  write(dir, "ROUND2", "# Round 2: Fish\n**Q2.** Which fish carries eggs in a pouch?\n**Answer:** A seahorse\n**Why:** Pouch.\n**Q3.** Which fish is biggest?\n**Answer:** A whale shark\n**Why:** Big.\n");
  assert.equal(cli(dir, "check", "--order=O-1").out.pass, true);
});

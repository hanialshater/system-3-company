#!/usr/bin/env node
// Check script for behavioral brief 5, mental-accounting (company/domains/briefs/behavioral.md).
// Run: node company/domains/briefs/checks/behavioral-mental-accounting.mjs
// Written by cm-behavioral (Rasmus), 2026-10-15. No network, no Math.random.
// Prints every number the learner sees and checks the type (a) derivation (Ana's and Ben's money and bills are
// identical; only a label differs) and every type (b) reveal branch (all 4 combinations the two choice controls allow).
// Boundary conditions it enforces (cm-economics E6, signed with changes 2026-10-15):
//   (1) no past payment: no stage or option text says spent, paid, prepaid, lost, "already covered" or "already paid";
//       the grocery line reads "her grocery costs are met from her regular pay" (E6 change 1);
//   (2) the predict's wrong answer A is "labelled money is not available for another use", not "money already spent";
//   (3) the reveal is the inconsistency between the learner's two answers (type b), not "ignore sunk costs";
//   (4) no rate, discount or "true cost" wording; no budget line or two-goods trade-off on the stage (E6 change 2).
// A mismatch exits non-zero.

let fail = 0;
const ok = (name, cond, detail) => { console.log(`${cond ? "ok  " : "FAIL"} ${name}: ${detail}`); if (!cond) fail++; };
const words = (s) => s.trim().split(/\s+/).length;
const FORBIDDEN = /\b(spent|spend|paid|prepaid|pay in advance|lost|lose|already covered|already paid|sunk|interest|rate|discount|true cost|give up|budget line|trade-off|instead of)\b/i;

// ---------- Stage: two people, same money, same bills; only the label on the spare $50 differs ----------
const person = (name, labels) => ({ name, income: 2000, bills: 1950, labels });
const ana = person("Ana", { groceries: 50, fun: 0 });
const ben = person("Ben", { groceries: 0, fun: 50 });
const TICKET = 50;
const spare = (p) => Object.values(p.labels).reduce((a, b) => a + b, 0);
const stage = {
  setup: "Same pay, same bills, $50 spare each. Ana labels hers \"groceries\"; her grocery costs are met from her regular pay. Ben labels his \"fun\".",
  ask: "A $50 concert ticket. You are Ana: buy it? You are Ben: buy it?",
  toggle: "Merge the labels",
};
console.log(`Ana: income $${ana.income}, bills $${ana.bills}, spare $${spare(ana)} (groceries $${ana.labels.groceries}, fun $${ana.labels.fun})`);
console.log(`Ben: income $${ben.income}, bills $${ben.bills}, spare $${spare(ben)} (groceries $${ben.labels.groceries}, fun $${ben.labels.fun})`);
console.log(`Ticket: $${TICKET}. After "${stage.toggle}": one $${spare(ana)} balance for each`);

// ---------- Type (a): the two set-ups hold the same money ----------
ok("(a) same income and same bills", ana.income === ben.income && ana.bills === ben.bills, `$${ana.income} in, $${ana.bills} out, for both`);
ok("(a) same spare total; only the label differs", spare(ana) === spare(ben) && spare(ana) === ana.income - ana.bills && JSON.stringify(ana.labels) !== JSON.stringify(ben.labels), `$${spare(ana)} each, under "groceries" for Ana and "fun" for Ben`);
ok("(a) both can buy the ticket and end with the same money", spare(ana) - TICKET === spare(ben) - TICKET && spare(ana) >= TICKET, `after the ticket each has $${spare(ana) - TICKET} spare and the same bills met`);
// The stage shows no budget line: one good (the ticket), one yes/no per person, no second good to trade against.
ok("(E6 change 2) one good on the stage, no budget line", Object.keys(stage).length === 3 && !/\band\b.*\bor\b.*\bper\b/i.test(stage.ask), "the ticket only; yes/no for Ana and for Ben");

// ---------- Predict ----------
const predict = {
  q: "Ana and Ben have the same money and bills; only the label on their spare $50 differs. Who can better afford the $50 concert?",
  options: ["Ben: it is his fun money", "Ana: her grocery costs are met from her regular pay", "Neither: it is the same $50"],
  answer: 2,
};
ok("predict question <= 25 words", words(predict.q) <= 25, `${words(predict.q)} words: "${predict.q}"`);
ok("predict answer follows from the derivation", predict.answer === 2 && spare(ana) === spare(ben), `answer: "${predict.options[2]}"`);
for (const t of [stage.setup, stage.ask, stage.toggle, predict.q, ...predict.options])
  ok("(E6 1, 4) no past payment, rate or 'true cost' wording", !FORBIDDEN.test(t), `"${t}"`);
ok("stage text <= 25 words", words(stage.setup) <= 25 && words(stage.ask) <= 25, `set-up ${words(stage.setup)} words, question ${words(stage.ask)} words`);

// ---------- Reveal: one branch per combination (type b) ----------
const ans = { yes: "buy", no: "skip" };
const sameLine = "Same pay, same bills, same $50: only the label moved.";
const scope = "Labels can be a useful rule for yourself; they do not change the money.";
const stops = "Where it stops: you answered both set-ups back to back.";
function reveal(a, b, held = "") {
  const lead = a === b
    ? `As Ana and as Ben you chose to ${ans[a]} the ticket.`
    : `As Ana you chose to ${ans[a]} the ticket; as Ben, to ${ans[b]}.`;
  const mid = a === b
    ? "Your two answers matched, so they treat the $50 as the same money, whatever its label."
    : "Your two answers differed, so they treat labelled money as different money: that is called mental accounting.";
  return [lead, sameLine, mid, scope, held, stops].filter(Boolean).join(" ");
}
console.log("\nReveal branches (every combination the controls allow)");
for (const a of ["yes", "no"]) for (const b of ["yes", "no"]) {
  const t = reveal(a, b);
  ok(`reveal Ana=${a}, Ben=${b} <= 90 words, verdict matches the answers, no forbidden wording`,
    words(t) <= 90 && /differed/.test(t) === (a !== b) && !FORBIDDEN.test(t) && !/\bpeople\b/i.test(t), `${words(t)} words: "${t}"`);
}

// ---------- Held type (d) line, the limit (one only; G1). Not in the published text until the fact-checker opens it ----------
const held = "Re-run in 2025 with US online samples, 11 of 17 classic mental-accounting problems held; the rest were mixed or absent.";
let worst = 0;
for (const a of ["yes", "no"]) for (const b of ["yes", "no"]) worst = Math.max(worst, words(reveal(a, b, held)));
console.log("\nHeld type (d) line: W-902 row 'Mental accounting' (with limits), Li & Feldman 2025, PMC12445221, opened by research-lead, not by the fact-checker");
ok("held line names no single failed problem and no past payment", !FORBIDDEN.test(held) && !/jacket|calculator|ticket|theatre/i.test(held), `"${held}"`);
ok("reveal with the held line stays within 90 words", worst <= 90, `held (${words(held)} words); longest branch with it: ${worst} words. It goes before "Where it stops". Fallback when not checkable: cut; nothing replaces it`);

// ---------- Transfer recall ----------
const recall = "Cara is given $200 as a gift; Dev earns $200 in overtime. Otherwise the same pay and bills. Who can better afford a $200 coat?";
const recallOptions = ["Dev: he worked for it", "Cara: gift money is for treats", "Neither: it is the same $200"];
const cara = 200, dev = 200;
ok("recall <= 25 words, no past payment", words(recall) <= 25 && !FORBIDDEN.test(recall + recallOptions.join(" ")), `${words(recall)} words: "${recall}" options: ${recallOptions.join(" / ")}`);
ok("recall: a $200 gift and $200 of overtime pay are the same $200", cara === dev, 'Answer: "Neither: it is the same $200"');

console.log(`\n${fail ? `${fail} check(s) FAILED` : "all checks pass"}`);
process.exit(fail ? 1 : 0);

#!/usr/bin/env node
// Check script for behavioral brief 4, gain-loss-framing (company/domains/briefs/behavioral.md).
// Run: node company/domains/briefs/checks/behavioral-gain-loss-framing.mjs
// Written by cm-behavioral (Rasmus), 2026-10-15. No network, no Math.random.
// Prints every number the learner sees and checks the type (a) derivation (each option in the "lost" wording
// has exactly the outcomes of one option in the "saved" wording) and every type (b) reveal branch (all 4
// combinations the two choice controls allow).
// Boundary conditions it enforces (cm-books B0/B1, 2026-10-15): no mixed 50/50 bet (every option is all-gain
// or all-loss in its own wording, never both), no loss-aversion ratio; (P0) a probability is stated, never
// asked for, and no expected value is shown.
// A mismatch exits non-zero.

let fail = 0;
const ok = (name, cond, detail) => { console.log(`${cond ? "ok  " : "FAIL"} ${name}: ${detail}`); if (!cond) fail++; };
const words = (s) => s.trim().split(/\s+/).length;

// ---------- Stage: 600 people; two wordings of the same two programmes ----------
const N = 600;
// Each option is a list of [probability, people who live]; "saved" wording counts the living, "lost" counts the dead.
const OPT = {
  A: { frame: "saved", text: "200 people will be saved", out: [[1, 200]] },
  B: { frame: "saved", text: "a 1-in-3 chance all 600 are saved, a 2-in-3 chance nobody is", out: [[1 / 3, 600], [2 / 3, 0]] },
  C: { frame: "lost", text: "400 people will die", out: [[1, 200]] },
  D: { frame: "lost", text: "a 1-in-3 chance nobody dies, a 2-in-3 chance all 600 die", out: [[1 / 3, 600], [2 / 3, 0]] },
};
// What each wording says, recomputed from the text's own numbers.
const said = { A: [[1, 200]], B: [[1 / 3, 600], [2 / 3, 0]], C: [[1, N - 400]], D: [[1 / 3, N - 0], [2 / 3, N - 600]] };
const same = (x, y) => x.length === y.length && x.every(([p, v], i) => Math.abs(p - y[i][0]) < 1e-12 && v === y[i][1]);
for (const k of "ABCD") ok(`option ${k} text matches its outcomes`, same(OPT[k].out, said[k]), `${OPT[k].frame}: "${OPT[k].text}" -> ${OPT[k].out.map(([p, v]) => `${(p * 100).toFixed(1)}%: ${v} live, ${N - v} die`).join("; ")}`);
ok("probabilities in each option sum to 1", Object.values(OPT).every((o) => Math.abs(o.out.reduce((s, [p]) => s + p, 0) - 1) < 1e-12), "A, B, C, D");

// ---------- Type (a): the lost wording is the saved wording, option for option ----------
ok("(a) C has exactly A's outcomes", same(OPT.A.out, OPT.C.out), "200 live and 400 die, for sure");
ok("(a) D has exactly B's outcomes", same(OPT.B.out, OPT.D.out), "1 in 3: all 600 live; 2 in 3: all 600 die");
// So any rule that ranks options by their outcomes (any function of the outcome lists) ranks A vs B as C vs D.
// Check with a family of such rules: expected utility with u(x) = x^a for many a, plus the worst case and best case.
const rules = [];
for (let a = 0.1; a <= 3; a += 0.1) rules.push((o) => o.reduce((s, [p, v]) => s + p * v ** a, 0));
rules.push((o) => Math.min(...o.map(([, v]) => v)), (o) => Math.max(...o.map(([, v]) => v)));
const consistent = rules.every((f) => Math.sign(f(OPT.A.out) - f(OPT.B.out)) === Math.sign(f(OPT.C.out) - f(OPT.D.out)));
ok("(a) every outcome-based rule tried picks the matching option in both wordings", consistent, `${rules.length} rules (u = x^a for a = 0.1-3.0, worst case, best case); none picks A with D or B with C`);
// B0/B1: no mixed bet. Within its own wording, no option offers both a gain and a loss.
const oneWay = (o) => (o.frame === "saved" ? /saved/.test(o.text) && !/die/.test(o.text) : /di/.test(o.text) && !/saved/.test(o.text));
ok("(B0/B1) no mixed 50/50 bet and no ratio on the stage", Object.values(OPT).every(oneWay) && !Object.values(OPT).some((o) => o.out.some(([p]) => p === 0.5)),
  "each option counts only lives saved or only deaths, never both; chances are sure or 1-in-3 / 2-in-3, never 50/50");

// ---------- Predict ----------
const predict = {
  q: "Judged by outcomes, not wording: someone picks the sure 200 saved. In the 'die' wording, which must they pick?",
  options: ["The sure 400 die", "The 1-in-3 chance nobody dies", "Either: the two wordings are different offers"],
  answer: 0,
};
ok("predict question <= 25 words", words(predict.q) <= 25, `${words(predict.q)} words: "${predict.q}"`);
ok("predict answer follows from the derivation", predict.answer === 0 && same(OPT.A.out, OPT.C.out), `answer: "${predict.options[0]}" (C has A's outcomes)`);

// ---------- Reveal: one branch per combination (type b) ----------
const pick = { A: "the sure 200 saved", B: "the 1-in-3 chance to save all 600", C: "the sure 400 die", D: "the 1-in-3 chance that nobody dies" };
const sameLine = "In the same words, 400 sure to die is 200 sure to be saved, and the two chances are one chance.";
const stops = "Where it stops: you saw both wordings back to back.";
function reveal(s, l, held = "") {
  const lead = `You chose ${pick[s]}, then ${pick[l]}.`;
  const match = (s === "A") === (l === "C");
  let mid;
  if (match) mid = "You answered the same offer the same way twice: a model that judges outcomes fits both of your choices.";
  else if (s === "A") mid = "No model that judges only outcomes fits both of your choices: the wording moved you. Sure for gains, gamble for losses: that pattern is called a framing effect.";
  else mid = "No model that judges only outcomes fits both of your choices: the wording moved you, the reverse of the pattern called a framing effect.";
  return [lead, sameLine, mid, held, stops].filter(Boolean).join(" ");
}
console.log("\nReveal branches (every combination the controls allow)");
for (const s of ["A", "B"]) for (const l of ["C", "D"]) {
  const t = reveal(s, l);
  const match = (s === "A") === (l === "C");
  ok(`reveal saved=${s}, lost=${l} <= 90 words, verdict matches the derivation`, words(t) <= 90 && /No model that judges only outcomes fits/.test(t) === !match && !/\bpeople (choose|pick|flip)/i.test(t), `${words(t)} words: "${t}"`);
}

// ---------- Held type (d) line (one only; G1). Not in the published text until the fact-checker opens it ----------
const held = "Re-run in 2020 with 88,181 people in 47 countries, the wording shifted choices; how much varied by country.";
let worst = 0;
for (const s of ["A", "B"]) for (const l of ["C", "D"]) worst = Math.max(worst, words(reveal(s, l, held)));
console.log("\nHeld type (d) line: W-902 row 'Framing' (robust; varied across nations), Rachev et al. 2021, PMC8432807, opened by research-lead, not by the fact-checker");
ok("reveal with the held line stays within 90 words", worst <= 90, `held: "${held}" (${words(held)} words); longest branch with it: ${worst} words. It goes before "Where it stops". Fallback when not checkable: cut; nothing replaces it`);

// ---------- Stage word budget (head-of-product, company/decisions/2026-10-16-stage-word-budget-counting.md) ----------
// A word is a whitespace token containing a letter ("1-in-3" is one word; "600" is none). Declared stimulus
// (the wording the lesson manipulates) is exempt from the 25 but counts toward the 50. cm-behavioral, 2026-10-16.
const sw = (s) => s.trim().split(/\s+/).filter((t) => /\p{L}/u.test(t)).length;
// Declared stimulus, word for word: the four option texts, and the two restatements the toggle puts IN PLACE of C and D.
const RESTATE = { C: OPT.A.text, D: OPT.B.text };
// Non-stimulus stage text (counts toward the 25). No option letters, no wording headings; bar legends are numerals only.
const OTHER = { caption: "An outbreak is expected to kill 600 people. Pick a programme.", toggle: "Say both in the same words", cover: "Answer the first wording", key: "■ = alive" };
const frames = {
  "locked (A, B shown; C, D under the cover)": { other: ["caption", "toggle", "cover", "key"], stim: [OPT.A.text, OPT.B.text] },
  "both wordings shown, toggle off": { other: ["caption", "toggle", "key"], stim: [OPT.A.text, OPT.B.text, OPT.C.text, OPT.D.text] },
  "toggle on (C, D re-labelled in place) and open reveal": { other: ["caption", "toggle", "key"], stim: [OPT.A.text, OPT.B.text, RESTATE.C, RESTATE.D] },
};
console.log("\nStage word budget (declared stimulus exempt from 25; all stage text <= 50)");
for (const [k, s] of Object.entries(OPT)) console.log(`  stimulus ${k}: "${s.text}" (${sw(s.text)} words)`);
for (const k of ["C", "D"]) console.log(`  stimulus ${k} restated (toggle on, in place of ${k}): "${RESTATE[k]}" (${sw(RESTATE[k])} words)`);
for (const [name, f] of Object.entries(frames)) {
  const o = f.other.reduce((n, k) => n + sw(OTHER[k]), 0), m = f.stim.reduce((n, t) => n + sw(t), 0);
  ok(`stage at "${name}"`, o <= 25 && o + m <= 50, `stage ${o + m} words (stimulus ${m}, other ${o})`);
}
ok("restatements are option A's and B's texts word for word", RESTATE.C === OPT.A.text && RESTATE.D === OPT.B.text && same(OPT.C.out, OPT.A.out) && same(OPT.D.out, OPT.B.out), "so the two rows read the same with the toggle on");

// ---------- Transfer recall ----------
// "A treatment: 'a 90% survival rate' or 'a 10% death rate'. Same 1,000 patients: 900 live, 100 die in both."
const surv = 1000 * 0.9, death = 1000 - 1000 * 0.1;
ok("recall: 90% survive and 10% die describe the same outcome", surv === death, `${surv} of 1,000 live in both wordings. Answer: "They describe the same outcome"`);

console.log(`\n${fail ? `${fail} check(s) FAILED` : "all checks pass"}`);
process.exit(fail ? 1 : 0);

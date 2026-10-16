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
// Ties (FC pass 57, W-1315): expected value (u = x^1) ranks A and B EQUAL (200 = 200), so a strict check alone
// misses it. Fit is tested under weak revealed preference: a pair of choices fits a rule if each chosen option is
// ranked at least as high as the one not chosen.
const EPS = 1e-9;
const d1 = (f) => f(OPT.A.out) - f(OPT.B.out), d2 = (f) => f(OPT.C.out) - f(OPT.D.out);
const fits = (f, s, l) => (s === "A" ? d1(f) >= -EPS : d1(f) <= EPS) && (l === "C" ? d2(f) >= -EPS : d2(f) <= EPS);
const tied = (f) => Math.abs(d1(f)) <= EPS;
const consistent = rules.every((f) => Math.abs(d1(f) - d2(f)) <= EPS);
ok("(a) every outcome-based rule tried ranks A against B exactly as C against D", consistent, `${rules.length} rules (u = x^a for a = 0.1-3.0, worst case, best case)`);
const tiedRules = rules.filter(tied).length;
ok("(a) mixed pairs (A with D, B with C) fit only rules that rank the two programmes as a toss-up", rules.every((f) => (!fits(f, "A", "D") && !fits(f, "B", "C")) || tied(f)) && tiedRules >= 1,
  `${tiedRules} rule(s) tied (expected value, u = x^1: 200 = 200); every strict rule rejects both mixed pairs`);
ok("(a) both matched pairs fit some strict rule", rules.some((f) => !tied(f) && fits(f, "A", "C")) && rules.some((f) => !tied(f) && fits(f, "B", "D")),
  "A with C (a < 1, cautious); B with D (a > 1, bold): so 'only the sure option both times fits' is false");
// B0/B1: no mixed bet. Within its own wording, no option offers both a gain and a loss.
const oneWay = (o) => (o.frame === "saved" ? /saved/.test(o.text) && !/die/.test(o.text) : /di/.test(o.text) && !/saved/.test(o.text));
ok("(B0/B1) no mixed 50/50 bet and no ratio on the stage", Object.values(OPT).every(oneWay) && !Object.values(OPT).some((o) => o.out.some(([p]) => p === 0.5)),
  "each option counts only lives saved or only deaths, never both; chances are sure or 1-in-3 / 2-in-3, never 50/50");

// ---------- Predict (reworked 2026-10-16, cm-behavioral, W-1306 + W-1315) ----------
// Strict premise ("prefers"), so the expected-value tie cannot fit; no "judged by outcomes, not wording" premise,
// which ruled out the misconception option before the learner thought (learner r1, finding 1); no "sure"-to-"sure"
// word match: the question gives both choices and asks whether one outcome model fits them.
const predict = {
  q: "Someone prefers the sure 200 saved, then, in the 'die' wording, the 1-in-3 chance nobody dies. Can one model that judges outcomes fit both?",
  options: ["Yes: 'saved' and 'die' are different offers", "No: only the sure option both times fits", "No: same programmes, two wordings"],
  answer: 2,
};
ok("predict question <= 25 words", words(predict.q) <= 25, `${words(predict.q)} words: "${predict.q}"`);
const strictAD = rules.some((f) => d1(f) > EPS && d2(f) < -EPS);
ok("predict answer follows from the derivation", predict.answer === 2 && !strictAD && same(OPT.A.out, OPT.C.out) && same(OPT.B.out, OPT.D.out),
  `answer: "${predict.options[2]}": no rule strictly prefers A to B and D to C, because C has A's outcomes and D has B's`);
ok("predict: the misconception is an option, and no premise rules it out", /different offers/.test(predict.options[0]) && !/not wording/i.test(predict.q), `"${predict.options[0]}"`);
ok("predict: the right option is not the middle one, and not the only one with a number", predict.answer !== 1 && !/\d/.test(predict.options[predict.answer]), predict.options.map((o) => `"${o}"`).join(" / "));

// ---------- Reveal: one branch per combination (type b) ----------
const pick = { A: "the sure 200 saved", B: "the 1-in-3 chance to save all 600", C: "the sure 400 die", D: "the 1-in-3 chance that nobody dies" };
const sameLine = "In the same words, 400 sure to die is 200 sure to be saved, and the two chances are one chance.";
const stops = "Where it stops: you saw both wordings back to back.";
function reveal(s, l, held = "") {
  const lead = `You chose ${pick[s]}, then ${pick[l]}.`;
  const match = (s === "A") === (l === "C");
  let mid;
  // Mixed branches carry the toss-up qualifier (FC pass 57); matched branches now name the framing effect too
  // (learner r1, finding 3: the consistent path never named it).
  if (match) mid = "Same offer, same answer twice: a model that judges outcomes fits both. Preferring the sure 200 saved, then the chance nobody dies, would fit none: that is called a framing effect.";
  else if (s === "A") mid = "Unless the two were a toss-up for you, no model that judges only outcomes fits both of your choices: the wording moved you. Sure for gains, gamble for losses: that pattern is called a framing effect.";
  else mid = "Unless the two were a toss-up for you, no model that judges only outcomes fits both of your choices: the wording moved you, the reverse of the pattern called a framing effect.";
  return [lead, sameLine, mid, held, stops].filter(Boolean).join(" ");
}
// Rule 7: the 90 is reveal-fit's count, which includes the kit's verdict line. The longer verdict is
// 'Not quite: it was "<answer>".' (src/kit/Lesson.tsx), so the answer's words count.
const VERDICT = Math.max(words("Your prediction held."), words(`Not quite: it was "${predict.options[predict.answer]}".`));
console.log("\nReveal branches (every combination the controls allow)");
for (const s of ["A", "B"]) for (const l of ["C", "D"]) {
  const t = reveal(s, l);
  const match = (s === "A") === (l === "C");
  const m = words(t) + VERDICT;
  ok(`reveal saved=${s}, lost=${l}: measured <= 90 with the kit verdict, verdict matches the derivation`, m <= 90 && /no model that judges only outcomes fits/i.test(t) === !match && /toss-up/.test(t) === !match && /framing effect/.test(t) && !/\bpeople (choose|pick|flip)/i.test(t), `${words(t)} words + verdict ${VERDICT} = ${m}: "${t}"`);
}

// ---------- Held type (d) line (one only; G1). Not in the published text until the fact-checker opens it ----------
const held = "Re-run in 2020 with 88,181 people in 47 countries, the wording shifted choices; how much varied by country.";
let worst = 0;
for (const s of ["A", "B"]) for (const l of ["C", "D"]) worst = Math.max(worst, words(reveal(s, l, held)) + VERDICT);
console.log("\nHeld type (d) line: W-902 row 'Framing' (robust; varied across nations), Rachev et al. 2021, PMC8432807, opened by research-lead, not by the fact-checker");
ok("held line: measured reveal with it (verdict included) is over 90, so it stays cut (rule 6)", worst > 90, `held: "${held}" (${words(held)} words); longest branch with it: ${worst} words. It goes before "Where it stops". Fallback when not checkable: cut; nothing replaces it`);

// ---------- Stage word budget (head-of-product, company/decisions/2026-10-16-stage-word-budget-counting.md) ----------
// A word is a whitespace token containing a letter ("1-in-3" is one word; "600" is none). Declared stimulus
// (the wording the lesson manipulates) is exempt from the 25 but counts toward the 50. cm-behavioral, 2026-10-16.
const sw = (s) => s.trim().split(/\s+/).filter((t) => /\p{L}/u.test(t)).length;
// Declared stimulus, word for word: the four option texts, and the two restatements the toggle puts IN PLACE of C and D.
const RESTATE = { C: OPT.A.text, D: OPT.B.text };
// Non-stimulus stage text (counts toward the 25). No option letters, no wording headings; bar legends are numerals only.
const OTHER = { caption: "An outbreak is expected to kill 600 people. Pick a programme.", toggle: "Say both in the same words", cover: "Answer the first wording", key: "■ = alive · □ = die" }; // "□ = die" added 2026-10-16 (learner r1, finding 5)
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

// ---------- Transfer recall (reworked 2026-10-16, W-1306: no "judged by outcomes" premise; strict preferences) ----------
const recall = {
  q: "Someone prefers to take a treatment described as '90% survive', and to refuse it described as '10% die'. Can one model that judges outcomes fit both?",
  options: ["Yes: '10% die' is the worse offer", "No: only taking it both times fits", "No: same outcome, two descriptions"],
  answer: 2,
};
const surv = 1000 * 0.9, death = 1000 - 1000 * 0.1;
ok("recall: 90% survive and 10% die describe the same outcome", surv === death, `${surv} of 1,000 live in both wordings. Answer: "${recall.options[recall.answer]}"; "only taking it both times" is false (refusing both times also fits)`);
ok("recall question <= 30 words; right option not the middle one, no number in it", words(recall.q) <= 30 && recall.answer !== 1 && !/\d/.test(recall.options[recall.answer]), `${words(recall.q)} words: "${recall.q}"`);

console.log(`\n${fail ? `${fail} check(s) FAILED` : "all checks pass"}`);
process.exit(fail ? 1 : 0);

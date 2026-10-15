#!/usr/bin/env node
// Check script for behavioral brief 2, present-bias-reversal (company/domains/briefs/behavioral.md).
// Run: node company/domains/briefs/checks/behavioral-present-bias-reversal.mjs
// Written by cm-behavioral (Rasmus), 2026-10-15. No network, no Math.random.
// Prints every number the learner sees (stage, slider stops, predict, reveal, recall) and checks the
// type (a) derivation and every type (b) reveal branch (all 4 combinations the two choice controls allow).
// Stated model: steady (exponential) discounting, named on the stage as a simplification (E4).
// No present value at a market rate is computed or shown (E4); the weekly factor d below is never on screen.
// A mismatch exits non-zero.

let fail = 0;
const ok = (name, cond, detail) => { console.log(`${cond ? "ok  " : "FAIL"} ${name}: ${detail}`); if (!cond) fail++; };
const words = (s) => s.trim().split(/\s+/).length;

// ---------- Stage ----------
const SOON = 100, LATE = 110, GAP = 1;              // $100 at week t, or $110 at week t + 1
const STOPS = [52, 26, 13, 4, 1, 0];                 // start-date slider stops, in weeks from today
console.log("Stage: $" + SOON + " at week t or $" + LATE + " at week t+" + GAP + "; slider stops t = " + STOPS.join(", "));
ok("slider has 6 stops from a year out to today", STOPS.length === 6 && STOPS[0] === 52 && STOPS.at(-1) === 0, "far choice at t = 52, near choice at t = 0");

// ---------- Type (a): under exponential discounting the choice does not depend on t ----------
// Value of the later option relative to the sooner: (110 d^(t+1)) / (100 d^t) = 1.1 d, for every t.
const ratio = (d, t) => (LATE * d ** (t + GAP)) / (SOON * d ** t);
let flat = true, maxDev = 0;
for (let d = 0.5; d <= 1.2; d += 0.0005) for (const t of STOPS) { const dev = Math.abs(ratio(d, t) - 1.1 * d); maxDev = Math.max(maxDev, dev); if (dev > 1e-9) flat = false; }
ok("(a) later/sooner value ratio = 1.1 x d at every start date", flat, `max deviation over d in [0.5, 1.2] and all 6 stops: ${maxDev.toExponential(1)}`);
let sameChoice = true;
for (let d = 0.5; d <= 1.2; d += 0.0005) { const c = STOPS.map((t) => ratio(d, t) > 1); if (!c.every((x) => x === c[0])) sameChoice = false; }
ok("(a) so every steady rate gives the same choice at all 6 stops", sameChoice, `wait for $110 iff d > 1/1.1 = ${(1 / 1.1).toFixed(4)} per week, whatever t is`);
// Continuous-time form, exp(-rho t): ratio 1.1 exp(-rho), again independent of t.
let cont = true;
for (let rho = 0; rho <= 1; rho += 0.001) for (const t of STOPS) if (Math.abs((LATE * Math.exp(-rho * (t + 1))) / (SOON * Math.exp(-rho * t)) - 1.1 * Math.exp(-rho)) > 1e-9) cont = false;
ok("(a) same result in continuous time", cont, "ratio = 1.1 x e^(-rho) for every t");
// A model that gives today extra weight (quasi-hyperbolic: value 1 today, b x d^t later) can fit the switch.
const qh = (b, d, t) => (t === 0 ? (LATE * b * d) / SOON : (LATE * b * d ** (t + 1)) / (SOON * b * d ** t));
ok("(a) witness: extra weight on today (b = 0.9, d = 1) waits a year out and takes $100 today", qh(0.9, 1, 52) > 1 && qh(0.9, 1, 0) < 1,
  `ratio at t = 52: ${qh(0.9, 1, 52).toFixed(2)} (wait); at t = 0: ${qh(0.9, 1, 0).toFixed(2)} (take $100). Not shown as numbers; supports the reveal's "a model that gives today extra weight does"`);

// ---------- Predict ----------
const predict = {
  q: "Under steady discounting, someone prefers $110 at week 53 to $100 at week 52. Moved to today, they must:",
  options: ["Wait a week again for the $110", "Take the $100, since today weighs more", "Either, depending on their discount rate"],
  answer: 0,
};
ok("predict question <= 25 words", words(predict.q) <= 25, `${words(predict.q)} words: "${predict.q}"`);
ok("predict answer follows from the derivation", predict.answer === 0 && sameChoice, `answer: "${predict.options[0]}"`);

// ---------- Reveal: one branch per combination (type b) ----------
const far = { wait: "waited a week for the $110", take: "took the $100" };
const gapLine = "Steady discounting judges the pair only by its gap, one week for $10 more, and the gap never changed as the pair moved to today.";
const stops = "Where it stops: imagined payments, chosen once each, with your first choice in view.";
function reveal(f, n) {
  const lead = f === n ? `Both a year out and today you ${far[f]}.` : `A year out you ${far[f]}; today you ${far[n]}.`;
  if (f === n) return `${lead} ${gapLine} One steady rate fits both of your choices. A switch to the $100 today would fit only a model that gives today extra weight. ${stops}`;
  if (f === "wait") return `${lead} ${gapLine} No steady discount rate fits both of your choices. A model that gives today extra weight does: that departure is called present bias. ${stops}`;
  return `${lead} ${gapLine} No steady discount rate fits both of your choices. Yours switched toward patience as the date came closer, the reverse of present bias. ${stops}`;
}
console.log("\nReveal branches (every combination the controls allow)");
for (const f of ["wait", "take"]) for (const n of ["wait", "take"]) {
  const t = reveal(f, n);
  // A steady rate fits iff the two choices match (derivation above).
  ok(`reveal far=${f}, today=${n} <= 90 words, verdict matches the derivation`, words(t) <= 90 && (/No steady discount rate fits/.test(t) === (f !== n)), `${words(t)} words: "${t}"`);
}

// ---------- Held type (d) line (one only; D4 / G1) ----------
const held = "With real payments, reversals are clearer for effort than for money.";
let worst = 0;
for (const f of ["wait", "take"]) for (const n of ["wait", "take"]) worst = Math.max(worst, words(reveal(f, n)) + words(held));
console.log("\nHeld type (d) line, not in the published text until W-902 sources it and the fact-checker opens it");
ok("reveal with the held line stays within 90 words", worst <= 90,
  `held: "${held}" (${words(held)} words); longest branch with it: ${worst} words. It goes before "Where it stops". Fallback when not checkable: cut; "Where it stops" already says the payments were imagined`);

// ---------- Transfer recall ----------
// "$50 in 10 days or $60 in 20 days; then $50 in 100 days or $60 in 110 days": same 10-day gap.
let rec = true;
for (let d = 0.9; d <= 1.0; d += 0.0001) { const a = 60 * d ** 20 > 50 * d ** 10, b = 60 * d ** 110 > 50 * d ** 100; if (a !== b) rec = false; }
ok("recall: prefers $50 at day 10 over $60 at day 20; at days 100 and 110 the choice is the same", rec, 'ratio 1.2 x d^10 at both dates. Answer: "Still take the $50, at day 100"');

console.log(`\n${fail ? `${fail} check(s) FAILED` : "all checks pass"}`);
process.exit(fail ? 1 : 0);

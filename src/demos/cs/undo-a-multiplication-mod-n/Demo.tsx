"use client";

// Undoing "times 7" on a 26-hour clock. Euclid on (26, 7): 26 = 3x7 + 5, 7 = 1x5 + 2, 5 = 2x2 + 1,
// 2 = 2x1 + 0, so gcd = 1. Running the steps backwards rewrites 1 as a mix of 26 and 7:
// 1 = 5 - 2x2 = 3x5 - 2x7 = 3x26 - 11x7. So -11 x 7 is 1 on the clock, and -11 + 26 = 15: 7 x 15 = 105 =
// 4 x 26 + 1. The column of equations is built one tap at a time (or run to the end).
// v2 (r6, euclid-knower): a 26-hour ring shows the hours m·x lands on for x = 0..25 (×7: all 26, so one
// of them is 1; ×13: only 0 and 13, so none is 1). A ×13 chip runs Euclid on (26, 13): it stops at 13,
// and the x readout says "none" (milestone), so "an undo exists exactly when the gcd is 1" is shown.
// "Divide to the end" / "Back up to the end" make the key state reachable with one press per control.
// Start over is gone; the ×7 result stays as a summary row while ×13 is shown.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 26;
const A = 7;
const B = 13; // shares the factor 13 with 26: no undo
const PICKS = [11, 15, 19];

// Euclid: remainders r[0] = N, r[1] = a, ..., quotients q[j] with r[j+1] = r[j-1] - q[j] r[j].
function euclid(n: number, a: number) {
  const r = [n, a];
  const q: number[] = [0];
  while (r[r.length - 1] !== 0) {
    const x = r[r.length - 2];
    const y = r[r.length - 1];
    q.push(Math.floor(x / y));
    r.push(x % y);
  }
  return { r, q };
}
const { r: REM, q: Q } = euclid(N, A);
const DIVS = REM.length - 2; // number of division rows (the last gives remainder 0)
const K = REM.length - 2; // index of the last non-zero remainder
const GCD = REM[K];
const { r: REM_B, q: Q_B } = euclid(N, B);
const GCD_B = REM_B[REM_B.length - 2]; // 13

const term = (c: number, v: number, first: boolean) =>
  `${c < 0 ? (first ? "−" : "− ") : first ? "" : "+ "}${Math.abs(c) === 1 ? "" : `${Math.abs(c)} × `}${v}`;
const combo = (c1: number, v1: number, c2: number, v2: number) => `${term(c1, v1, true)} ${term(c2, v2, false)}`;

// Back-substitution: 1 = cA * r[j-1] + cB * r[j], starting at 1 = r[K-2] - q[K-1] r[K-1].
const BACK = (() => {
  const rows: { use: string; eq: string; c: [number, number] }[] = [];
  let j = K - 1;
  let cA = 1;
  let cB = -Q[K - 1];
  rows.push({ use: `from ${REM[K - 2]} = ${Q[K - 1]} × ${REM[K - 1]} + ${REM[K]}`, eq: `1 = ${combo(cA, REM[j - 1], cB, REM[j])}`, c: [cA, cB] });
  while (j > 1) {
    // r[j] = r[j-2] - q[j-1] r[j-1]
    const nA = cB;
    const nB = cA - cB * Q[j - 1];
    rows.push({ use: `swap in ${REM[j]} = ${REM[j - 2]} − ${Q[j - 1]} × ${REM[j - 1]}`, eq: `1 = ${combo(nA, REM[j - 2], nB, REM[j - 1])}`, c: [nA, nB] });
    cA = nA;
    cB = nB;
    j--;
  }
  return rows;
})();
const [COEF_N, COEF_A] = BACK[BACK.length - 1].c; // 3 and -11
const X = ((COEF_A % N) + N) % N; // 15
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const INVERTIBLE = Array.from({ length: N - 1 }, (_, i) => i + 1).filter((a) => gcd(a, N) === 1).length;
const hits = (m: number) => new Set(Array.from({ length: N }, (_, x) => (m * x) % N));

// ring of N hours
const CX = 74;
const CY = 74;
const RR = 58;
const hx = (h: number) => CX + RR * Math.sin((2 * Math.PI * h) / N);
const hy = (h: number) => CY - RR * Math.cos((2 * Math.PI * h) / N);

export default function UndoMultiplicationModN({ slug }: { slug: string }) {
  const [divs, setDivs] = useState(0);
  const [backs, setBacks] = useState(0);
  const [read, setRead] = useState(false);
  const [mult, setMult] = useState<number>(A);
  const [triedB, setTriedB] = useState(false);

  const euclidDone = divs >= DIVS;
  const backDone = backs >= BACK.length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On a clock of ${N} hours, multiplying by ${A} scrambles the hours. Which x brings ${A}x back to 1 o'clock (${A}x leaves remainder 1 when divided by ${N})?`,
        options: PICKS.map(String),
        answer: 1,
      }}
      exploreHint={`Divide until the remainder is 0, back up to write 1 using only ${N} and ${A}, then try ×${B}.`}
      minInteractions={4}
      reveal={({ prediction }) => (
        <>
          <p>
            Euclid on {N} and {A} reached remainder {GCD}. Backing up, you wrote 1 = {combo(COEF_N, N, COEF_A, A)}. The {COEF_N} × {N}{" "}
            part is whole turns of the clock, so {COEF_A} × {A} is 1, and {COEF_A} + {N} = {X}: {A} × {X} = {A * X},{" "}
            {Math.floor((A * X) / N)} turns and 1 hour.
            {prediction === 0
              ? ` Your ${-COEF_A} is the coefficient without its minus sign: ${A} × ${-COEF_A} lands on ${(A * -COEF_A) % N}.`
              : prediction === 2
                ? ` Your 19: ${A} × 19 lands on ${(A * 19) % N}, not 1.`
                : ""}
          </p>
          <p>
            With ×{B}, Euclid stopped at {GCD_B}, not 1, and the ring lit only 0 and {B}: no x reaches 1, so ×{B} has no
            undo. An undo exists exactly when the gcd is 1: {INVERTIBLE} of the {N - 1} non-zero hours here have one.
          </p>
        </>
      )}
    >
      {({ locked, interact, prediction }) => (
        <Milestones interact={interact} names={["gcd-1", "bezout", "read-15", "no-undo"]}>
          {(reach) => {
            const onA = mult === A;
            const divide = (all: boolean) => {
              if (locked || !onA || euclidDone) return;
              const n = all ? DIVS : divs + 1;
              setDivs(n);
              if (n >= DIVS) reach("gcd-1");
            };
            const backUp = (all: boolean) => {
              if (locked || !onA || !euclidDone || backDone) return;
              const n = all ? BACK.length : backs + 1;
              setBacks(n);
              if (n >= BACK.length) reach("bezout");
            };
            const readOff = () => {
              if (locked || !onA || !backDone || read) return;
              setRead(true);
              reach("read-15");
            };
            const pickMult = (m: number) => {
              if (locked || m === mult) return;
              setMult(m);
              if (m === B) {
                setTriedB(true);
                reach("no-undo");
              }
            };
            // the Euclid row the latest back-up step used
            const usedRow = backs === 0 ? -1 : K - backs;
            const note = !onA
              ? `gcd = ${GCD_B}, not 1: no way to write 1. ×${B} has no undo.`
              : !euclidDone
                ? `Divide: bigger = q × smaller + remainder.`
                : !backDone
                  ? `gcd = ${GCD}. Now write 1 using ${N} and ${A} only.`
                  : !read
                    ? `Read off x.`
                    : `x = ${X}: ${A} × ${X} lands on 1 o'clock.`;
            const lit = hits(mult);
            const pick = prediction !== null && prediction !== undefined ? PICKS[prediction] : null;
            const pickHour = onA && read && pick !== null && pick !== X ? (A * pick) % N : null;
            const caption = onA
              ? [`×${A}: x = 0…${N - 1}`, `lands on all ${lit.size} hours`]
              : [`×${B}: x = 0…${N - 1}`, `lands on only ${Array.from(lit).sort((a, b) => a - b).join(" and ")}`];

            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 320 150" className={`stage-svg ${s.ring}`} role="img" aria-label={`${caption.join(" ")}`}>
                  <circle cx={CX} cy={CY} r={RR} fill="none" stroke="var(--line)" strokeWidth={1.5} />
                  {Array.from({ length: N }, (_, h) => (
                    <circle
                      key={h}
                      cx={hx(h)}
                      cy={hy(h)}
                      r={h === 1 ? 5.5 : 4}
                      fill={lit.has(h) ? (h === 1 && onA && read ? "var(--good)" : "var(--domain)") : "var(--bg-2)"}
                      stroke={h === 1 ? "var(--fg)" : "var(--line)"}
                      strokeWidth={h === 1 ? 2 : 1}
                    />
                  ))}
                  {[0, 1, 13].map((h) => (
                    <text key={h} x={CX + (RR - 15) * Math.sin((2 * Math.PI * h) / N)} y={CY - (RR - 15) * Math.cos((2 * Math.PI * h) / N) + 3.5} textAnchor="middle" className={s.hr}>
                      {h}
                    </text>
                  ))}
                  {pickHour !== null && (
                    <circle cx={hx(pickHour)} cy={hy(pickHour)} r={8} fill="none" stroke="var(--bad)" strokeWidth={2} />
                  )}
                  <text x={160} y={52} className={s.cap}>
                    {caption[0]}
                  </text>
                  <text x={160} y={68} className={s.cap}>
                    {caption[1]}
                  </text>
                  {onA && read && (
                    <text x={160} y={92} className={s.capGood}>
                      {A} × {X} = {A * X} → 1
                    </text>
                  )}
                  {pickHour !== null && (
                    <text x={160} y={110} className={s.capBad}>
                      your {A} × {pick} = {A * pick!} → {pickHour}
                    </text>
                  )}
                </svg>
                {onA ? (
                  <>
                    <ol className={s.eqs} aria-label="Euclid's divisions">
                      {Array.from({ length: divs }, (_, i) => i + 1).map((j) => (
                        <li key={j} className={j === usedRow ? s.used : ""}>
                          {REM[j - 1]} = {Q[j]} × {REM[j]} + <b className={REM[j + 1] === GCD ? s.one : ""}>{REM[j + 1]}</b>
                        </li>
                      ))}
                    </ol>
                    {euclidDone && backs > 0 && (
                      <ol className={s.back} aria-label="Backing up">
                        {BACK.slice(0, backs).map((b, i) => (
                          <li key={i} className={i === backs - 1 ? s.latest : ""}>
                            <span className={s.use}>{b.use}:</span> <span className={s.eq}>{b.eq}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                    {read && (
                      <p className={s.final}>
                        {COEF_A} + {N} = {X} · {A} × {X} = {A * X} = {Math.floor((A * X) / N)} × {N} + 1
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <ol className={s.eqs} aria-label={`Euclid's divisions for ${B}`}>
                      {Array.from({ length: REM_B.length - 2 }, (_, i) => i + 1).map((j) => (
                        <li key={j}>
                          {REM_B[j - 1]} = {Q_B[j]} × {REM_B[j]} + <b>{REM_B[j + 1]}</b>
                        </li>
                      ))}
                    </ol>
                    {read && (
                      <p className={s.final}>
                        ×{A}: x = {X}, {A} × {X} = {A * X} → 1
                        {pick !== null && pick !== X ? ` · your ${A} × ${pick} = ${A * pick} → ${(A * pick) % N}` : ""}
                      </p>
                    )}
                  </>
                )}
                <Row>
                  <Control className={onA && !euclidDone ? "active" : ""} disabled={locked || !onA || euclidDone} onClick={() => divide(false)}>
                    Divide
                  </Control>
                  <Control disabled={locked || !onA || euclidDone} onClick={() => divide(true)}>
                    Divide to the end
                  </Control>
                  <Control
                    className={onA && euclidDone && !backDone ? "active" : ""}
                    disabled={locked || !onA || !euclidDone || backDone}
                    onClick={() => backUp(false)}
                  >
                    Back up
                  </Control>
                  <Control disabled={locked || !onA || !euclidDone || backDone} onClick={() => backUp(true)}>
                    Back up to {N} and {A}
                  </Control>
                  <Control className={onA && backDone && !read ? "active" : ""} disabled={locked || !onA || !backDone || read} onClick={readOff}>
                    Read off x
                  </Control>
                </Row>
                <Row>
                  {[A, B].map((m) => (
                    <Control key={m} className={mult === m ? "active" : ""} disabled={locked || mult === m} onClick={() => pickMult(m)}>
                      Times {m}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Readout label="Remainder" value={!onA ? REM_B[REM_B.length - 1] : divs === 0 ? "–" : REM[divs + 1]} />
                  <Readout label={`Undo ×${A}`} value={read ? X : "?"} />
                  <Readout label={`Undo ×${B}`} value={triedB ? "none" : "?"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

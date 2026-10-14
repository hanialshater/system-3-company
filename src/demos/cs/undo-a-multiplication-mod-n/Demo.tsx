"use client";

// Undoing "times 7" on a 26-hour clock. Euclid on (26, 7): 26 = 3x7 + 5, 7 = 1x5 + 2, 5 = 2x2 + 1,
// 2 = 2x1 + 0, so gcd = 1. Running the steps backwards rewrites 1 as a mix of 26 and 7:
// 1 = 5 - 2x2 = 3x5 - 2x7 = 3x26 - 11x7. So -11 x 7 is 1 on the clock, and -11 + 26 = 15: 7 x 15 = 105 =
// 4 x 26 + 1. One representation: the column of equations, built one tap at a time.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 26;
const A = 7;

// Euclid: remainders r[0] = N, r[1] = A, ..., quotients q[j] with r[j+1] = r[j-1] - q[j] r[j].
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

export default function UndoMultiplicationModN({ slug }: { slug: string }) {
  const [divs, setDivs] = useState(0);
  const [backs, setBacks] = useState(0);
  const [read, setRead] = useState(false);

  const euclidDone = divs >= DIVS;
  const backDone = backs >= BACK.length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On a clock of ${N} hours, multiplying by ${A} scrambles the hours. Which x brings ${A}x back to 1 o'clock (${A}x leaves remainder 1 when divided by ${N})?`,
        options: ["11", "15", "19"],
        answer: 1,
      }}
      exploreHint={`Divide until the remainder is 0, then back up to write 1 using only ${N} and ${A}.`}
      minInteractions={3}
      reveal={({ prediction }) => (
        <>
          <p>
            Euclid on {N} and {A} reached remainder {GCD}, the gcd. Backing up, you rewrote it as 1 = {combo(COEF_N, N, COEF_A, A)}. The{" "}
            {COEF_N} × {N} part is a whole number of turns, so on the clock {COEF_A} × {A} is 1, and {COEF_A} + {N} = {X}: {A} ×{" "}
            {X} = {A * X} = {Math.floor((A * X) / N)} × {N} + 1.
            {prediction === 0
              ? ` You picked ${-COEF_A}: that is the coefficient without its minus sign, and ${A} × ${-COEF_A} = ${A * -COEF_A} lands on ${(A * -COEF_A) % N} o'clock.`
              : prediction === 2
                ? ` ${A} × 19 = ${A * 19} lands on ${(A * 19) % N} o'clock, not 1.`
                : ""}
          </p>
          <p>
            If 1 = a × {N} + b × {A}, then b undoes ×{A}. Such a and b exist exactly when the gcd is 1: only {INVERTIBLE} of the{" "}
            {N - 1} non-zero hours on this clock have an undo, and 13 has none. This is the step RSA uses to make a private key.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["gcd-1", "bezout", "read-15"]}>
          {(reach) => {
            const divide = () => {
              if (locked || euclidDone) return;
              const n = divs + 1;
              setDivs(n);
              if (n >= DIVS) reach("gcd-1");
            };
            const backUp = () => {
              if (locked || !euclidDone || backDone) return;
              const n = backs + 1;
              setBacks(n);
              if (n >= BACK.length) reach("bezout");
            };
            const readOff = () => {
              if (locked || !backDone || read) return;
              setRead(true);
              reach("read-15");
            };
            const restart = () => {
              if (locked || divs === 0) return;
              setDivs(0);
              setBacks(0);
              setRead(false);
            };
            // the Euclid row the latest back-up step used
            const usedRow = backs === 0 ? -1 : K - backs;
            const note = !euclidDone
              ? `Divide: bigger = q × smaller + remainder.`
              : !backDone
                ? `gcd = ${GCD}. Now write 1 using ${N} and ${A} only.`
                : !read
                  ? `1 = ${combo(COEF_N, N, COEF_A, A)}. Read off x.`
                  : `x = ${X}: ${A} × ${X} lands on 1 o'clock.`;

            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <ol className={s.eqs} aria-label="Euclid's divisions">
                  {Array.from({ length: divs }, (_, i) => i + 1).map((j) => (
                    <li key={j} className={j === usedRow ? s.used : ""}>
                      {REM[j - 1]} = {Q[j]} × {REM[j]} + <b className={REM[j + 1] === GCD ? s.one : ""}>{REM[j + 1]}</b>
                    </li>
                  ))}
                </ol>
                {euclidDone && (
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
                <Row>
                  <Control className={!euclidDone ? "active" : ""} disabled={locked || euclidDone} onClick={divide}>
                    Divide
                  </Control>
                  <Control className={euclidDone && !backDone ? "active" : ""} disabled={locked || !euclidDone || backDone} onClick={backUp}>
                    Back up
                  </Control>
                  <Control className={backDone && !read ? "active" : ""} disabled={locked || !backDone || read} onClick={readOff}>
                    Read off x
                  </Control>
                  <Control disabled={locked || divs === 0} onClick={restart}>
                    Start over
                  </Control>
                </Row>
                <Row>
                  <Readout label="Remainder" value={divs === 0 ? "–" : REM[divs + 1]} />
                  <Readout label={`x (mod ${N})`} value={read ? X : "?"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}


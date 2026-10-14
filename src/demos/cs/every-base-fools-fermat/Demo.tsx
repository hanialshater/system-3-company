"use client";

// Fermat's test: for prime n, a^(n-1) mod n = 1 for every base a coprime to n. 561 = 3 x 11 x 17 is
// composite, yet all 320 coprime bases give 1 (a Carmichael number). The stronger (Miller-Rabin) test
// writes 560 = 35 x 2^4, computes a^35 and squares it four times; a value other than 1 or 560 whose
// square is 1 proves n composite. For base 2 the chain is 263, 166, 67, 1, 1: 67^2 = 1 mod 561.
// v2: the reveal quotes the chain of the base the learner last ran the stronger test on (that chain stays drawn).
// One representation: the base chips feeding one result line, then the squaring chain for that base.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";
import { Milestones } from "@/kit/milestones";

const N = 561;
const BASES = [2, 5, 7, 10, 13];

// all products stay below 561^2, well inside exact integer range
function powMod(a: number, e: number, n: number) {
  let r = 1;
  let b = a % n;
  while (e > 0) {
    if (e & 1) r = (r * b) % n;
    b = (b * b) % n;
    e = Math.floor(e / 2);
  }
  return r;
}
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

// 560 = D x 2^S with D odd
const S = (() => {
  let k = 0;
  let d = N - 1;
  while (d % 2 === 0) {
    d /= 2;
    k++;
  }
  return k;
})();
const D = (N - 1) / 2 ** S; // 35
function chain(a: number) {
  const c = [powMod(a, D, N)];
  for (let i = 0; i < S; i++) c.push((c[i] * c[i]) % N);
  return c;
}
// index of a value that squares to 1 but is not 1 or n-1 (a witness), or -1
function witnessAt(c: number[]) {
  for (let i = 0; i < c.length - 1; i++) if (c[i + 1] === 1 && c[i] !== 1 && c[i] !== N - 1) return i;
  return -1;
}
const COPRIME = Array.from({ length: N - 1 }, (_, i) => i + 1).filter((a) => gcd(a, N) === 1);
const FERMAT_ONES = COPRIME.filter((a) => powMod(a, N - 1, N) === 1).length; // 320
// strong liars among all 320 coprime bases, base 1 included (pass Miller-Rabin although 561 is composite)
const LIARS = COPRIME.filter((a) => {
  const c = chain(a);
  return c[0] === 1 || c.slice(0, S).includes(N - 1);
}).length; // 10

export default function EveryBaseFoolsFermat({ slug }: { slug: string }) {
  const [base, setBase] = useState<number | null>(null);
  const [tried, setTried] = useState<number[]>([]);
  // The base the stronger test last ran on. Its chain stays on the stage until the test runs on another base,
  // and the reveal quotes this chain (not a fixed base 2).
  const [strongFor, setStrongFor] = useState<number | null>(null);
  const cr = strongFor !== null ? chain(strongFor) : null;
  const wr = cr ? witnessAt(cr) : -1;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Fermat's test: for prime n, a^(n-1) mod n = 1. n = ${N} = 3 x 11 x 17. For how many of the ${COPRIME.length} bases coprime to ${N} does a^${N - 1} mod ${N} equal 1?`,
        options: [`None of the ${COPRIME.length}`, `About ${COPRIME.length / 2} of the ${COPRIME.length}`, `All ${COPRIME.length}`],
        answer: 2,
      }}
      exploreHint={`Tap a few bases to run Fermat's test, then run the stronger test.`}
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            All {tried.length} bases you tried gave 1, and so do all {FERMAT_ONES} coprime bases. {N} is a Carmichael number, the smallest:
            Fermat&apos;s test cannot tell it from a prime.
          </p>
          <p>
            The stronger test starts at a^{D} and squares {S} times. Your run on base {strongFor} went{" "}
            {cr && wr >= 0 ? cr.slice(0, wr + 2).join(", ") : cr?.join(", ")}
            {cr && wr >= 0 ? `: ${cr[wr]} squared leaves 1` : ""}. Modulo a prime, only 1 and n − 1 square to 1, so {N} is
            caught. A few bases still slip past ({LIARS} of {COPRIME.length} here, about{" "}
            {Math.round((100 * LIARS) / COPRIME.length)}%), so several random bases make a miss on {N} very unlikely.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["three-bases", "strong-test"]}>
          {(reach) => {
            const pick = (a: number) => {
              if (locked || a === base) return;
              setBase(a);
              const next = tried.includes(a) ? tried : [...tried, a];
              setTried(next);
              if (next.length >= 3) reach("three-bases");
            };
            const strong = () => {
              if (locked || base === null || strongFor === base) return;
              setStrongFor(base);
              reach("strong-test");
            };

            const result = base === null ? null : powMod(base, N - 1, N);
            const c = cr;
            const w = wr;
            const note =
              base === null
                ? "Pick a base. A prime would give 1 every time."
                : c && strongFor === base
                  ? w >= 0
                    ? `${c[w]} squared is 1, but ${c[w]} is not 1 or ${N - 1}: composite.`
                    : `No stray square root of 1: base ${strongFor} is fooled.`
                  : `${base}^${N - 1} mod ${N} = ${result}: looks prime.`;

            // chain boxes
            const bw = 48;
            const gap = 16;
            const x0 = (320 - (S + 1) * bw - S * gap) / 2;

            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <Row>
                  {BASES.map((a) => (
                    <Control key={a} className={a === base ? "active" : ""} disabled={locked || a === base} onClick={() => pick(a)}>
                      a = {a}
                    </Control>
                  ))}
                </Row>
                <svg viewBox="0 0 320 100" className="stage-svg" role="img" aria-label={c ? `chain ${c.join(", ")}` : "squaring chain not run"}>
                  <text x={160} y={16} textAnchor="middle" className={s.label}>
                    {c ? `stronger test on ${strongFor}: ${strongFor}^${D}, then square ${S} times` : `stronger test: not run yet`}
                  </text>
                  {Array.from({ length: S + 1 }, (_, i) => {
                    const x = x0 + i * (bw + gap);
                    const hot = c !== null && i === w;
                    return (
                      <g key={i}>
                        {i > 0 ? (
                          <>
                            <text x={x - gap / 2} y={44} textAnchor="middle" className={s.label}>
                              ²
                            </text>
                            <text x={x - gap / 2} y={58} textAnchor="middle" className={s.arrow}>
                              →
                            </text>
                          </>
                        ) : null}
                        <rect
                          x={x}
                          y={36}
                          width={bw}
                          height={30}
                          rx={6}
                          fill={hot ? "var(--bad)" : "var(--bg-2)"}
                          stroke={hot ? "var(--bad)" : "var(--line)"}
                          strokeWidth={1.5}
                        />
                        <text x={x + bw / 2} y={57} textAnchor="middle" className={`${s.val} ${hot ? s.valHot : ""}`}>
                          {c ? c[i] : "?"}
                        </text>
                        <text x={x + bw / 2} y={84} textAnchor="middle" className={s.label}>
                          {i === 0 ? `a^${D}` : `a^${D * 2 ** i}`}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Control className="active" disabled={locked || base === null || strongFor === base} onClick={strong}>
                    Stronger test on this base
                  </Control>
                </Row>
                <Row>
                  <Readout label="Bases tried" value={tried.length} />
                  <Readout label="Gave 1" value={tried.filter((a) => powMod(a, N - 1, N) === 1).length} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

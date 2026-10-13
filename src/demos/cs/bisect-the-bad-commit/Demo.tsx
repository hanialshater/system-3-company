"use client";

// Version 1 works, version 1,000 is broken, and once broken every later version stays broken.
// Testing the middle of the suspects halves them: 999 -> 500 -> 250 -> ... -> 1 in 10 tests,
// because 2^10 = 1,024 >= 999. One strip of 1,000 versions; ruled-out parts grey out.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 1000;
const BAD = 737; // first broken version: fixed so QA reproduces; 974 of the 999 possible spots also take 10 tests
const fmt = (n: number) => n.toLocaleString("en-US");

type Test = { v: number; broken: boolean };
interface State {
  lo: number; // last version known to work
  hi: number; // first version known broken
  tests: Test[];
  sizes: number[]; // suspects after each test, starting with the initial count
}
const START: State = { lo: 1, hi: N, tests: [], sizes: [N - 1] };
const testAt = (st: State, v: number): State => {
  const broken = v >= BAD;
  const lo = broken ? st.lo : v;
  const hi = broken ? v : st.hi;
  return { lo, hi, tests: [...st.tests, { v, broken }], sizes: [...st.sizes, hi - lo] };
};
const mid = (st: State) => Math.floor((st.lo + st.hi) / 2);

/** Worst case for halving: smallest t with 2^t >= suspects. */
const WORST = Math.ceil(Math.log2(N - 1));

const W = 320;
const X0 = 14;
const X1 = W - 14;
const xOf = (v: number) => X0 + ((v - 1) / (N - 1)) * (X1 - X0);

export default function BisectTheBadCommit({ slug }: { slug: string }) {
  const [st, setSt] = useState<State>(START);
  const suspects = st.hi - st.lo;
  const found = suspects === 1;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Version 1 works and version ${fmt(N)} is broken. Each test says 'works' or 'broken' for one version. What is the most tests you could ever need to find the first broken one?`,
        options: [String(WORST), fmt(N / 2), fmt(N)],
        answer: 0,
      }}
      exploreHint="Test the middle of the suspects and watch the range shrink."
      minInteractions={2}
      reveal={() => {
        const halvingOnly = st.tests.length > 0 && st.tests.every((t, i) => t.v === mid(replay(i)));
        return (
          <>
            <p>
              Your suspects went {st.sizes.slice(0, 11).map(fmt).join(" → ")}
              {st.sizes.length > 11 ? " → …" : ""}
              {found ? `, and v${BAD} was the first broken version after ${st.tests.length} tests` : ""}. Each middle test
              rules out half of what is left, whichever answer comes back.
            </p>
            <p>
              Halving {fmt(N - 1)} suspects down to 1 takes at most {WORST} tests, because 2^{WORST - 1} = {fmt(2 ** (WORST - 1))}{" "}
              is too few and 2^{WORST} = {fmt(2 ** WORST)} is enough.{" "}
              {halvingOnly ? "" : "Tests off the middle can waste a step. "}Testing one by one from v2 would have taken{" "}
              {fmt(BAD - 1)} tests here. This works only because the break, once in, stays in. That is how git bisect finds
              the commit that broke a program.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["halved", "under-10"]}>
          {(reach) => {
            const apply = (next: State) => {
              setSt(next);
              if (next.hi - next.lo <= (N - 1) / 2 + 1) reach("halved");
              if (next.hi - next.lo < 10) reach("under-10");
            };
            const testMiddle = () => {
              if (locked) return;
              if (found) return setSt(START);
              apply(testAt(st, mid(st)));
            };
            const toEnd = () => {
              if (locked || found) return;
              let x = st;
              while (x.hi - x.lo > 1) x = testAt(x, mid(x));
              apply(x);
            };
            const testNext = () => {
              if (locked || found) return;
              apply(testAt(st, st.lo + 1));
            };
            const last = st.tests[st.tests.length - 1];

            return (
              <div className={s.wrap}>
                <p className={s.lead}>Once a version breaks, every later one stays broken.</p>
                <svg viewBox={`0 0 ${W} 92`} className="stage-svg" role="img" aria-label={`Suspects v${st.lo + 1} to v${st.hi}`}>
                  <rect x={X0} y={30} width={X1 - X0} height={26} rx={4} fill="var(--bg-2)" stroke="var(--line)" />
                  <rect
                    x={xOf(st.lo)}
                    y={30}
                    width={Math.max(2, xOf(st.hi) - xOf(st.lo))}
                    height={26}
                    fill="var(--domain)"
                    opacity={locked ? 0.35 : 0.85}
                  />
                  {st.tests.map((t, i) => (
                    <line
                      key={i}
                      x1={xOf(t.v)}
                      x2={xOf(t.v)}
                      y1={24}
                      y2={62}
                      stroke={t.broken ? "var(--bad)" : "var(--good)"}
                      strokeWidth={i === st.tests.length - 1 ? 2.5 : 1.2}
                    />
                  ))}
                  <text x={X0} y={18} className={s.end}>
                    v1 works
                  </text>
                  <text x={X1} y={18} textAnchor="end" className={s.end}>
                    v{fmt(N)} broken
                  </text>
                  <text x={W / 2} y={80} textAnchor="middle" className={s.range}>
                    {found ? `First broken: v${st.hi}` : `Suspects: v${st.lo + 1} to v${st.hi}`}
                  </text>
                </svg>
                <Row>
                  <Readout label="Suspects" value={fmt(suspects)} />
                  <Readout label="Tests" value={st.tests.length} />
                  <Readout label="Last test" value={last ? `v${last.v} ${last.broken ? "broken" : "works"}` : "–"} />
                </Row>
                <Row>
                  <Control className="active" disabled={locked} onClick={testMiddle}>
                    {found ? "Start again" : `Test the middle: v${mid(st)}`}
                  </Control>
                  <Control disabled={locked || found} onClick={toEnd}>
                    Keep halving to the end
                  </Control>
                  <Control disabled={locked || found} onClick={testNext}>
                    {found ? "Test the next one" : `Test the next one: v${st.lo + 1}`}
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );

  // Rebuild the state before test i so the reveal can tell whether every test was a middle test.
  function replay(i: number): State {
    let x = START;
    for (let k = 0; k < i; k++) x = testAt(x, st.tests[k].v);
    return x;
  }
}

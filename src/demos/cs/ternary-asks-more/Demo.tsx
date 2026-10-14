"use client";

// Two number lines, 1 to 1,000, one shared button: every press asks one question (one comparison of 721 with one list
// number) in each lane. Halving leaves 500, 249, ...; thirds (both probes every round, as briefed) leaves 666, 333, ...
// and some second probes cut nothing (hollow ticks). Halves finds 721 in 10, thirds in 13. "Try all 1,000 targets"
// fills worst case and average for every target. Milestones: both-found, all-targets
// (spec company/design/specs/ternary-asks-more.md; target 721 chosen by the spec and disclosed in claim c3).

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 1000;
const TARGET = 721;

type Q = { p: number; lo: number; hi: number; found?: boolean; hollow?: boolean; round: number };

function halves(t: number): Q[] {
  let lo = 1;
  let hi = N;
  const qs: Q[] = [];
  for (let r = 0; ; r++) {
    const m = Math.floor((lo + hi) / 2);
    if (m === t) {
      qs.push({ p: m, lo: t, hi: t, found: true, round: r });
      return qs;
    }
    if (t < m) hi = m - 1;
    else lo = m + 1;
    qs.push({ p: m, lo, hi, round: r });
  }
}

// The brief's ternary: each round asks both probes, lo + floor((hi - lo) / 3) and hi - floor((hi - lo) / 3).
function thirds(t: number): Q[] {
  let lo = 1;
  let hi = N;
  const qs: Q[] = [];
  for (let r = 0; ; r++) {
    const d = Math.floor((hi - lo) / 3);
    const m1 = lo + d;
    const m2 = hi - d;
    if (m1 === t) {
      qs.push({ p: m1, lo: t, hi: t, found: true, round: r });
      return qs;
    }
    const a = t < m1 ? lo : m1 + 1;
    const b = t < m1 ? m1 - 1 : hi;
    qs.push({ p: m1, lo: a, hi: b, round: r });
    if (m2 === t) {
      qs.push({ p: m2, lo: t, hi: t, found: true, round: r });
      return qs;
    }
    if (t < m1) hi = m1 - 1;
    else if (t > m2) lo = m2 + 1;
    else {
      lo = m1 + 1;
      hi = m2 - 1;
    }
    qs.push({ p: m2, lo, hi, hollow: lo === a && hi === b, round: r });
  }
}

const HQ = halves(TARGET); // 10 questions
const TQ = thirds(TARGET); // 13 questions
const MAXQ = Math.max(HQ.length, TQ.length);

const stats = (f: (t: number) => Q[]) => {
  const hist: number[] = [];
  let worst = 0;
  let sum = 0;
  for (let t = 1; t <= N; t++) {
    const q = f(t).length;
    hist[q] = (hist[q] ?? 0) + 1;
    worst = Math.max(worst, q);
    sum += q;
  }
  return { worst, avg: sum / N, hist: Array.from({ length: worst + 1 }, (_, i) => hist[i] ?? 0) };
};
const HS = stats(halves); // worst 10, average 8.99
const TS = stats(thirds); // worst 13, average 11.19

const left = (qs: Q[], k: number) => (k === 0 ? N : qs[Math.min(k, qs.length) - 1].hi - qs[Math.min(k, qs.length) - 1].lo + 1);
const range = (qs: Q[], k: number) => (k === 0 ? [1, N] : [qs[Math.min(k, qs.length) - 1].lo, qs[Math.min(k, qs.length) - 1].hi]);

// Shared zoom: once both lanes have fewer than 40 numbers left, both lines zoom to the smallest run of tens holding both.
const ZOOM_AT = (() => {
  for (let k = 1; k <= MAXQ; k++) if (left(HQ, k) < 40 && left(TQ, k) < 40) return k;
  return MAXQ + 1;
})();
const WINDOW = (() => {
  const [a, b] = range(HQ, ZOOM_AT);
  const [c, d] = range(TQ, ZOOM_AT);
  return [Math.floor((Math.min(a, c) - 1) / 10) * 10 + 1, Math.ceil(Math.max(b, d) / 10) * 10];
})(); // 701..740

const fmt = (n: number) => n.toLocaleString("en-US");
const reduced = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const X0 = 2;
const W = 336;

function Lane({ y, name, qs, k, hist, showHist }: { y: number; name: string; qs: Q[]; k: number; hist: number[]; showHist: boolean }) {
  const n = Math.min(k, qs.length);
  const zoom = k >= ZOOM_AT;
  const [w0, w1] = zoom ? WINDOW : [1, N];
  const x = (v: number) => X0 + ((v - w0 + 0.5) / (w1 - w0 + 1)) * W;
  const [lo, hi] = range(qs, k);
  let bx0 = x(lo - 0.5);
  let bx1 = x(hi + 0.5);
  if (bx1 - bx0 < 4) {
    const m = (bx0 + bx1) / 2;
    bx0 = m - 2;
    bx1 = m + 2;
  }
  const found = n > 0 && !!qs[n - 1].found;
  const asked = qs.slice(0, n).map((q, i) => ({ ...q, i }));
  const latest = n > 0 ? qs[n - 1] : null;
  const inWin = (v: number) => v >= w0 && v <= w1;
  const rounds = new Map<number, number[]>();
  for (const q of asked) rounds.set(q.round, [...(rounds.get(q.round) ?? []), q.p]);
  const hmax = Math.max(...hist);
  const peak = hist.indexOf(hmax);
  return (
    <g>
      <text x={X0} y={y + 10} className={s.title}>
        {name}
      </text>
      <text x={338} y={y + 10} textAnchor="end" className={s.read}>
        Questions: {n} · {found ? `found in ${n}` : `Left: ${fmt(left(qs, k))}`}
      </text>
      <line x1={X0} x2={X0 + W} y1={y + 42} y2={y + 42} stroke="var(--line)" strokeWidth={2} />
      <rect x={bx0} y={y + 39} width={bx1 - bx0} height={6} rx={2} fill="var(--domain)" />
      {name === "Thirds" &&
        [...rounds.values()]
          .filter((ps) => ps.length === 2 && ps.every(inWin))
          .map(([a, b], i) => (
            <path
              key={i}
              d={`M${x(a)},${y + 27} V${y + 24} H${x(b)} V${y + 27}`}
              fill="none"
              stroke="var(--muted)"
              strokeWidth={1}
            />
          ))}
      {asked
        .filter((q) => inWin(q.p))
        .map((q) => (
          <rect
            key={q.i}
            x={x(q.p) - 1.5}
            y={y + 29}
            width={3}
            height={9}
            fill={q.hollow ? "none" : "var(--fg)"}
            stroke="var(--fg)"
            strokeWidth={q.hollow ? 1 : 0}
          />
        ))}
      {latest && inWin(latest.p) && (
        <text x={Math.min(322, Math.max(14, x(latest.p)))} y={y + 21} textAnchor="middle" className={s.tick}>
          {latest.p}?
        </text>
      )}
      <text x={Math.min(310, Math.max(24, (bx0 + bx1) / 2))} y={y + 56} textAnchor="middle" className={s.band}>
        {lo === hi ? fmt(lo) : `${fmt(lo)}–${fmt(hi)}`}
      </text>
      <text x={X0} y={y + 56} className={s.axis}>
        {zoom ? `${w0} · zoomed` : "1"}
      </text>
      <text x={X0 + W} y={y + 56} textAnchor="end" className={s.axis}>
        {fmt(w1)}
      </text>
      {showHist && (
        <g>
          <text x={X0} y={y + 84} className={s.axis}>
            Targets by questions
          </text>
          {hist.map((c, q) =>
            q === 0 ? null : (
              <g key={q}>
                <rect
                  x={X0 + 104 + (q - 1) * 16}
                  y={y + 86 - (c / hmax) * 14}
                  width={12}
                  height={Math.max(1, (c / hmax) * 14)}
                  fill={q === peak ? "var(--domain)" : "var(--muted)"}
                />
                {q === peak && (
                  <text x={X0 + 110 + (q - 1) * 16} y={y + 70} textAnchor="middle" className={s.axis}>
                    {q}: {hmax}
                  </text>
                )}
              </g>
            ),
          )}
        </g>
      )}
    </g>
  );
}

function Stage({ locked, interact, k, setK, target, runTo, all, setAll }: {
  locked: boolean;
  interact: () => void;
  k: number;
  setK: (n: number) => void;
  target: number;
  runTo: (n: number) => void;
  all: boolean;
  setAll: (b: boolean) => void;
}) {
  const { reach } = useMilestones(interact, ["both-found", "all-targets"]);
  const bothFound = k >= MAXQ;
  useEffect(() => {
    if (bothFound) reach("both-found");
  }, [bothFound]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (all) reach("all-targets");
  }, [all]); // eslint-disable-line react-hooks/exhaustive-deps
  const busy = k < target;
  const hFound = k >= HQ.length;
  const tFound = k >= TQ.length;
  const tn = Math.min(k, TQ.length);
  const [tlo, thi] = range(TQ, k);
  return (
    <div className={s.wrap}>
      <p className={s.rule}>{k >= ZOOM_AT ? "Find 721." : "Find 721 in 1 to 1,000. Each question compares 721 with one number."}</p>
      <svg
        viewBox={`0 0 340 ${all ? 196 : 140}`}
        className="stage-svg"
        role="img"
        aria-label={`Halves: ${Math.min(k, HQ.length)} questions, ${left(HQ, k)} numbers left. Thirds: ${tn} questions, ${left(TQ, k)} numbers left, ${tlo} to ${thi}`}
      >
        <Lane y={0} name="Halves" qs={HQ} k={k} hist={HS.hist} showHist={all} />
        <Lane y={all ? 100 : 76} name="Thirds" qs={TQ} k={k} hist={TS.hist} showHist={all} />
      </svg>
      <table className={s.table}>
        <thead>
          <tr>
            <th />
            <th>721</th>
            <th>worst of 1,000</th>
            <th>average</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Halves</th>
            <td>{hFound ? HQ.length : "?"}</td>
            <td>{all ? HS.worst : "?"}</td>
            <td>{all ? HS.avg.toFixed(1) : "?"}</td>
          </tr>
          <tr>
            <th>Thirds</th>
            <td>{tFound ? TQ.length : "?"}</td>
            <td>{all ? TS.worst : "?"}</td>
            <td>{all ? TS.avg.toFixed(1) : "?"}</td>
          </tr>
        </tbody>
      </table>
      <Row>
        <Control className={s.tap} disabled={locked || bothFound || busy} onClick={() => setK(k + 1)}>
          Ask one question
        </Control>
        <Control className={s.tap} disabled={locked || bothFound || busy} onClick={() => runTo(MAXQ)}>
          Ask until found
        </Control>
        <Control className={s.tap} disabled={locked || all} onClick={() => setAll(true)}>
          Try all 1,000 targets
        </Control>
      </Row>
    </div>
  );
}

export default function TernaryAsksMore({ slug }: { slug: string }) {
  const [k, setK] = useState(0);
  const [target, setTarget] = useState(0);
  const [all, setAll] = useState(false);
  useEffect(() => {
    if (k >= target) return;
    const t = setTimeout(() => setK((x) => x + 1), 25);
    return () => clearTimeout(t);
  }, [k, target]);
  const step = (n: number) => {
    setTarget(n);
    setK(n);
  };
  const runTo = (n: number) => {
    setTarget(n);
    setK(reduced() ? n : k + 1);
  };
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Ternary search checks two points per round and keeps one third of the list. For 1,000 sorted numbers, how does its worst-case number of comparisons compare with binary search's 10?",
        options: ["Fewer than 10", "About the same", "More: 13"],
        answer: 2,
      }}
      exploreHint="Ask one question at a time and watch what is left."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            On 721, halving needed <strong>{HQ.length}</strong> questions; thirds needed <strong>{TQ.length}</strong>.
            Over all 1,000 targets the worst cases were {HS.worst} and {TS.worst} (averages about {HS.avg.toFixed(1)} and{" "}
            {TS.avg.toFixed(1)}).
          </p>
          <p>
            Look at &ldquo;left&rdquo; after two questions: halving had {left(HQ, 2)} numbers left, thirds {left(TQ, 2)}.
            A third sounds smaller than a half, but it costs two questions, and two halvings leave a quarter. Per
            question, halving wins.
          </p>
          <p className="muted">Ternary search earns its place elsewhere: finding the top of a smooth hill.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage
          locked={locked}
          interact={interact}
          k={k}
          setK={step}
          target={target}
          runTo={runTo}
          all={all}
          setAll={setAll}
        />
      )}
    </Lesson>
  );
}

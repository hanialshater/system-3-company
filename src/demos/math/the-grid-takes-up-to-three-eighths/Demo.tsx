"use client";

// Cascade capacity. Threshold rule: a person adopts once at least a share q of their neighbours have.
// Grid: a 41 x 41 8-neighbour grid whose outer ring is a frozen frame, so every one of the 1,521 people
// inside has exactly 8 neighbours; a centred block (5 x 5, or 7 x 7) starts. Line: a 201-person path,
// the middle two start. Synchronous rounds. Re-run in node (2026-10-14): grid 5x5 takes all 1,521 at
// q = 1/4 and 3/8 and stays at 25 at 2/5 and 1/2 (7x7 stays at 49); line takes all 201 at q <= 1/2 and
// only the 2 starters above. A cell beside a side of a block sees 3 of 8 adopters, a cell off a corner 1.
// The stage shows the middle 11 x 11 of the grid (or 12 people of the line) with each waiting
// person's count of adopting neighbours.
// v2 (wave E r6): the line half is now a milestone: "Line at 1/2" switches to the line at q = 1/2,
// the q where the 5x5 grid stalls, and the gate needs that run to finish. A results table records
// every finished run (5x5, 7x7, line by q) and survives Reset; the reveal quotes it. The block
// button keeps one label (an active state shows 7x7). The corner-timing sentence, which only Step
// could show, is gone.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const QS = [
  { v: 1 / 4, label: "1/4" },
  { v: 3 / 8, label: "3/8" },
  { v: 2 / 5, label: "2/5" },
  { v: 1 / 2, label: "1/2" },
  { v: 3 / 5, label: "3/5" },
];
const EPS = 1e-9;
const G = 41; // grid side including the frozen frame
const L = 201; // line length
const END = 100000;

type Net = "grid" | "line";
type Sim = { round: number[]; last: number; total: number; nb: number[][] };

const gridNb: number[][] = (() => {
  const nb: number[][] = [];
  for (let i = 0; i < G; i++)
    for (let j = 0; j < G; j++) {
      const list: number[] = [];
      if (i > 0 && j > 0 && i < G - 1 && j < G - 1)
        for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) if (di || dj) list.push((i + di) * G + (j + dj));
      nb.push(list); // frame cells have no list: they never adopt
    }
  return nb;
})();
const lineNb: number[][] = Array.from({ length: L }, (_, i) => [i - 1, i + 1].filter((j) => j >= 0 && j < L));

function simulate(nb: number[][], seeds: number[], q: number, total: number): Sim {
  const round = nb.map(() => Infinity);
  for (const x of seeds) round[x] = 0;
  let last = 0;
  for (let r = 1; ; r++) {
    const add: number[] = [];
    for (let v = 0; v < nb.length; v++) {
      if (round[v] < Infinity || nb[v].length === 0) continue;
      const k = nb[v].filter((u) => round[u] < r).length;
      if (k / nb[v].length >= q - EPS) add.push(v);
    }
    if (add.length === 0) break;
    for (const v of add) round[v] = r;
    last = r;
  }
  return { round, last, total, nb };
}
const blockSeeds = (b: number) => {
  const o = (G - b) / 2;
  const out: number[] = [];
  for (let i = 0; i < b; i++) for (let j = 0; j < b; j++) out.push((o + i) * G + (o + j));
  return out;
};
const cache = new Map<string, Sim>();
function sim(net: Net, qi: number, block: number) {
  const key = `${net}-${qi}-${net === "grid" ? block : 0}`;
  let r = cache.get(key);
  if (!r) {
    r =
      net === "grid"
        ? simulate(gridNb, blockSeeds(block), QS[qi].v, (G - 2) * (G - 2))
        : simulate(lineNb, [(L - 1) / 2 - 1, (L - 1) / 2], QS[qi].v, L);
    cache.set(key, r);
  }
  return r;
}

const WIN = 11; // grid window
const W0 = (G - WIN) / 2;
const LW = 12; // line window
const L0 = (L - 1) / 2 - LW / 2;

export default function TheGridTakesUpToThreeEighths({ slug }: { slug: string }) {
  const [net, setNet] = useState<Net>("grid");
  const [qi, setQi] = useState(3); // 1/2
  const [block, setBlock] = useState(5);
  const [t, setT] = useState(0);
  // finished runs: key "grid5" | "grid7" | "line" -> q index -> adopted count
  const [res, setRes] = useState<Record<string, Record<number, number>>>({});
  const rowKey = (n: Net, b: number) => (n === "line" ? "line" : `grid${b}`);
  const cell = (k: string, i: number) => res[k]?.[i];
  const Q38 = QS.findIndex((q) => q.label === "3/8");
  const QHALF = QS.findIndex((q) => q.label === "1/2");
  const GRID_TOTAL = (G - 2) * (G - 2);
  const stuckAbove = QS.map((q, i) => ({ q, i })).filter(({ q, i }) => q.v > 3 / 8 && cell("grid5", i) !== undefined && cell("grid5", i)! < GRID_TOTAL);
  const big = QS.map((q, i) => ({ q, i })).filter(({ q, i }) => q.v > 3 / 8 && cell("grid7", i) !== undefined && cell("grid7", i)! < GRID_TOTAL);

  const S = sim(net, qi, block);
  // a spread that stops is only known to have stopped after one round in which nobody new adopts
  const fullAt = (R: Sim) => R.round.filter((r) => r < Infinity).length === R.total;
  const endOf = (R: Sim) => (fullAt(R) ? R.last : R.last + 1);
  const shownT = Math.min(t, endOf(S));
  const atEnd = t >= endOf(S);
  const adopted = S.round.filter((r) => r <= t).length;
  const deg = net === "grid" ? 8 : 2;
  const need = Math.ceil(QS[qi].v * deg - EPS);
  const seen = (v: number) => S.nb[v].filter((u) => S.round[u] <= t).length;
  const waiting = S.round.map((r, v) => (r > t && S.nb[v].length > 0 ? seen(v) : 0));
  const bestSeen = Math.max(...waiting);
  const all = adopted === S.total;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "In a huge town laid out as a grid, each home has 8 neighbours. A 5x5 block adopts a new app; others adopt once at least q of their neighbours do. Highest q that takes everyone?",
        options: ["1/2", "3/8", "1/4"],
        answer: 1,
      }}
      exploreHint="Run the grid at each q, try a bigger block, then compare a line."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            On the grid, 3/8 took all {(cell("grid5", Q38) ?? cell("grid7", Q38) ?? GRID_TOTAL).toLocaleString("en-GB")} people
            {stuckAbove.length ? `, while ${stuckAbove.map((x) => x.q.label).join(", ")} left the block at ${cell("grid5", stuckAbove[0].i)}` : ""}.
            The numbers beside the block show why: a person facing the middle of a side sees 3 adopters among 8 neighbours, one near
            a corner 2, one off a corner 1. At 3/8, 3 is enough.
          </p>
          <p>
            Above 3/8 a newcomer needs 4 of 8, which nobody beside a block has
            {big.length ? `, so your 7x7 block stalled too, at ${cell("grid7", big[0].i)}` : ""}. Your line at 1/2
            {(cell("grid5", QHALF) ?? GRID_TOTAL) < GRID_TOTAL ? ", where the grid stuck," : ""} took all {cell("line", QHALF)}: each
            newcomer sees 1 of 2. That largest q is the network&apos;s cascade capacity: 1/2
            for a line, 3/8 for this grid.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["grid-full", "grid-stuck", "line-half"]}>
          {(reach) => {
            const check = (n: Net, q: number, b: number, nt: number) => {
              const R = sim(n, q, b);
              if (nt < endOf(R)) return;
              const got = R.round.filter((r) => r < Infinity).length;
              const k = rowKey(n, b);
              setRes((x) => ({ ...x, [k]: { ...x[k], [q]: got } }));
              if (n === "line") {
                if (q === QHALF && fullAt(R)) reach("line-half");
              }
              else if (QS[q].v === 3 / 8 && fullAt(R)) reach("grid-full");
              else if (QS[q].v > 3 / 8) reach("grid-stuck");
            };
            const run = () => {
              if (locked) return;
              setT(END);
              check(net, qi, block, END);
            };
            const step = () => {
              if (locked || atEnd) return;
              setT(shownT + 1);
              check(net, qi, block, shownT + 1);
            };
            const chooseQ = (i: number) => {
              if (locked) return;
              setQi(i);
              check(net, i, block, t);
            };
            const toggleBlock = () => {
              if (locked) return;
              const b = block === 5 ? 7 : 5;
              setBlock(b);
              check(net, qi, b, t);
            };
            const chooseNet = (n: Net) => {
              if (locked) return;
              setNet(n);
              check(n, qi, block, t);
            };
            const lineAtHalf = () => {
              if (locked) return;
              setNet("line");
              setQi(QHALF);
              setT(END);
              check("line", QHALF, block, END);
            };
            const reset = () => {
              if (locked) return;
              setT(0);
            };

            const unit = net === "grid" ? "of 8" : "of 2";
            const note = locked
              ? "A 5x5 block has adopted."
              : all
              ? `q = ${QS[qi].label}: everyone adopted, ${S.total.toLocaleString("en-GB")}.`
              : atEnd
                ? `q = ${QS[qi].label}, stuck: newcomers see at most ${bestSeen} ${unit}; they need ${need}.`
                : `q = ${QS[qi].label}: adopt once ${need} ${unit} neighbours have. Round ${shownT}.`;

            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                {net === "grid" ? (
                  <svg viewBox="0 0 320 276" className="stage-svg" role="img" aria-label={`Grid, q ${QS[qi].label}: ${adopted} adopted`}>
                    {Array.from({ length: WIN * WIN }, (_, k) => {
                      const i = W0 + Math.floor(k / WIN);
                      const j = W0 + (k % WIN);
                      const v = i * G + j;
                      const on = S.round[v] <= t;
                      const n = on ? 0 : seen(v);
                      const x = 28 + (k % WIN) * 24;
                      const y = 4 + Math.floor(k / WIN) * 24;
                      return (
                        <g key={k}>
                          <rect
                            x={x}
                            y={y}
                            width={22}
                            height={22}
                            rx={3}
                            className={on ? (S.round[v] === 0 ? s.seed : s.on) : !locked && n >= need ? s.ready : !locked && n > 0 ? s.near : s.off}
                          />
                          {!locked && !on && n > 0 && (
                            <text x={x + 11} y={y + 15.5} textAnchor="middle" className={s.count}>
                              {n}
                            </text>
                          )}
                        </g>
                      );
                    })}
                    <text x={160} y={274} textAnchor="middle" className={s.cap}>
                      numbers: adopting neighbours
                    </text>
                  </svg>
                ) : (
                  <svg viewBox="0 0 320 110" className="stage-svg" role="img" aria-label={`Line, q ${QS[qi].label}: ${adopted} adopted`}>
                    <line x1={6} x2={314} y1={44} y2={44} className={s.edge} />
                    {Array.from({ length: LW }, (_, k) => {
                      const v = L0 + k;
                      const on = S.round[v] <= t;
                      const n = on ? 0 : seen(v);
                      const x = 24 + k * 24.7;
                      return (
                        <g key={k}>
                          <circle cx={x} cy={44} r={10} className={on ? (S.round[v] === 0 ? s.seed : s.on) : !locked && n >= need ? s.ready : !locked && n > 0 ? s.near : s.off} />
                          {!locked && !on && n > 0 && (
                            <text x={x} y={74} textAnchor="middle" className={s.count}>
                              {n}/2
                            </text>
                          )}
                        </g>
                      );
                    })}
                    <text x={160} y={102} textAnchor="middle" className={s.cap}>
                      adopting neighbours, of 2
                    </text>
                  </svg>
                )}
                <Row>
                  <Control disabled={locked || atEnd} onClick={run}>
                    Run
                  </Control>
                  <Control disabled={locked || atEnd} onClick={step}>
                    Step
                  </Control>
                  <span className={s.qLab}>q =</span>
                  {QS.map((q, i) => (
                    <Control key={q.label} className={qi === i ? "active" : ""} disabled={locked || qi === i} onClick={() => chooseQ(i)}>
                      {q.label}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Control
                    className={block === 7 ? "active" : ""}
                    disabled={locked || net !== "grid"}
                    onClick={toggleBlock}
                    aria-pressed={block === 7}
                  >
                    7x7 block
                  </Control>
                  <Control className={net === "grid" ? "active" : ""} disabled={locked || net === "grid"} onClick={() => chooseNet("grid")}>
                    Grid
                  </Control>
                  <Control
                    className={net === "line" && qi === QHALF ? "active" : ""}
                    disabled={locked || (net === "line" && qi === QHALF && atEnd)}
                    onClick={lineAtHalf}
                  >
                    Line at 1/2
                  </Control>
                  <Control disabled={locked || t === 0} onClick={reset}>
                    Reset
                  </Control>
                </Row>
                <Row>
                  <Readout label="Adopted" value={`${adopted.toLocaleString("en-GB")} / ${S.total.toLocaleString("en-GB")}`} />
                  <Readout label="Round" value={shownT} />
                </Row>
                {Object.keys(res).length > 0 && (
                  <table className={s.res} aria-label="Finished runs: people adopted">
                    <thead>
                      <tr>
                        <th>q</th>
                        {QS.map((q) => (
                          <th key={q.label}>{q.label}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["grid5", "5x5"],
                        ["grid7", "7x7"],
                        ["line", "Line"],
                      ]
                        .filter(([k]) => res[k])
                        .map(([k, name]) => (
                          <tr key={k}>
                            <th>{name}</th>
                            {QS.map((q, i) => {
                              const v = res[k]?.[i];
                              const full = v !== undefined && v === (k === "line" ? L : GRID_TOTAL);
                              return (
                                <td key={q.label} className={v === undefined ? "" : full ? s.full : s.stuck}>
                                  {v === undefined ? "" : full ? "all" : v}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

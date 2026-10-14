"use client";

// Counting ways to make 10 from coins 1, 2, 5, one coin kind per row. Cell = ways without this
// coin (the cell above) + ways using one more of it (the cell c to the left, same row).
// The "any order" row sums the cells 1, 2 and 5 to the left of one row, which counts sequences.
// All values come from the two recurrences below (re-run in node: see meta.json). No randomness.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const COINS = [1, 2, 5];
const NAMES = ["one", "two", "five"];
const T = 10;

// TABLE[k][t]: ways to make t using the first k+1 coin kinds, combinations (order ignored).
const TABLE: number[][] = [];
for (let k = 0; k < COINS.length; k++) {
  const above = k === 0 ? [1, ...Array(T).fill(0)] : TABLE[k - 1];
  const row: number[] = [1];
  for (let t = 1; t <= T; t++) row[t] = above[t] + (t >= COINS[k] ? row[t - COINS[k]] : 0);
  TABLE.push(row);
}
// ANY[t]: sequences of coins that add to t (order matters).
const ANY: number[] = [1];
for (let t = 1; t <= T; t++) ANY[t] = COINS.reduce((acc, c) => acc + (t >= c ? ANY[t - c] : 0), 0);

const ABOVE = (k: number, t: number) => (k === 0 ? (t === 0 ? 1 : 0) : TABLE[k - 1][t]);

// Mixes (fives, twos, ones) that make t using the first k+1 kinds, as a coin list.
function mixes(k: number, t: number): number[][] {
  const out: number[][] = [];
  for (let f = 0; f <= (k >= 2 ? Math.floor(t / 5) : 0); f++)
    for (let w = 0; w <= (k >= 1 ? Math.floor((t - 5 * f) / 2) : 0); w++) {
      const o = t - 5 * f - 2 * w;
      out.push([...Array(f).fill(5), ...Array(w).fill(2), ...Array(o).fill(1)]);
    }
  return out;
}

// Geometry (viewBox 366 wide: 36 px label column + 11 columns of 30).
const LX = 36;
const CWD = 30;
const HEAD = 16;
const PITCH = 30;
const CH = 24;
const X = (t: number) => LX + t * CWD + CWD / 2;
const TOP = (r: number) => HEAD + r * PITCH + 3; // r: 0 none, 1..3 coin rows, 4 any order
const H = HEAD + 5 * PITCH + 4;

const RADIUS: Record<number, number> = { 1: 3, 2: 5, 5: 7.5 };

function Stack({ coins, x, y, w, bad }: { coins: number[]; x: number; y: number; w: number; bad?: boolean }) {
  let cx = 1;
  let cy = 0;
  let rowH = 0;
  const discs: { c: number; x: number; y: number }[] = [];
  for (const c of coins) {
    const d = RADIUS[c] * 2 + 1;
    if (cx + d > w - 1 && cx > 1) {
      cx = 1;
      cy += rowH;
      rowH = 0;
    }
    discs.push({ c, x: cx + d / 2, y: cy + d / 2 });
    cx += d;
    rowH = Math.max(rowH, d);
  }
  const hh = cy + rowH;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-1} y={-2} width={w + 1} height={hh + 4} rx={4} fill="none" stroke={bad ? "var(--bad)" : "none"} strokeDasharray={bad ? "3 2" : undefined} strokeWidth={1.4} />
      {discs.map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y} r={RADIUS[d.c]} fill="var(--bg-2)" stroke="var(--fg)" strokeWidth={1} />
          {d.c > 1 && (
            <text x={d.x} y={d.y + (d.c === 5 ? 3 : 2.5)} textAnchor="middle" className={s.coin} style={{ fontSize: d.c === 5 ? 9 : 7 }}>
              {d.c}
            </text>
          )}
        </g>
      ))}
    </g>
  );
}

type Last = { row: number; t: number } | null; // row 0..2 = coin rows, 3 = any order

function Table({ main, any, last, started }: { main: number; any: number; last: Last; started: boolean }) {
  const cells: React.ReactNode[] = [];
  const cell = (r: number, t: number, text: string, opts: { cur?: boolean; empty?: boolean; any?: boolean }) => {
    const y = TOP(r);
    cells.push(
      <g key={`${r}-${t}`}>
        <rect
          x={LX + t * CWD + 1.5}
          y={y}
          width={CWD - 3}
          height={CH}
          rx={4}
          fill={opts.empty ? "none" : "var(--bg-2)"}
          stroke={opts.cur ? "var(--fg)" : "var(--line)"}
          strokeWidth={opts.cur ? 2 : 1}
          strokeDasharray={opts.empty ? "2 2" : undefined}
        />
        {text && (
          <text x={X(t)} y={y + 16} textAnchor="middle" className={opts.any ? s.valAny : s.val}>
            {text}
          </text>
        )}
      </g>,
    );
  };
  // none row
  for (let t = 0; t <= T; t++) cell(0, t, t === 0 ? "1" : "0", {});
  for (let k = 0; k < 3; k++) {
    for (let t = 0; t <= T; t++) {
      const idx = k * T + t - 1; // main index of this cell (t >= 1)
      const filled = t === 0 || idx < main;
      const isCur = last?.row === k && last.t === t;
      const text = filled ? String(TABLE[k][t]) : k === 2 && t === T ? "?" : "";
      cell(k + 1, t, text, { cur: isCur, empty: !filled });
    }
  }
  if (started) {
    for (let t = 0; t <= T; t++) {
      const filled = t === 0 || t - 1 < any;
      cell(4, t, filled ? String(ANY[t]) : "", { cur: last?.row === 3 && last.t === t, empty: !filled, any: true });
    }
  }
  // arrows into the last-filled cell
  const arrows: React.ReactNode[] = [];
  if (last) {
    const r = last.row + 1;
    const t = last.t;
    const y = TOP(r);
    if (last.row < 3) {
      const c = COINS[last.row];
      arrows.push(<line key="up" x1={X(t)} y1={TOP(r - 1) + CH - 3} x2={X(t)} y2={y - 1} stroke="var(--fg)" strokeWidth={1.6} markerEnd="url(#ar)" />);
      if (t >= c) {
        const x1 = X(t - c);
        const x2 = X(t);
        const b = 9 + c;
        arrows.push(<path key="left" d={`M${x1},${y} Q${(x1 + x2) / 2},${y - b * 1.6} ${x2 - 2},${y - 1}`} fill="none" stroke="var(--fg)" strokeWidth={1.6} markerEnd="url(#ar)" />);
      }
    } else {
      COINS.forEach((c, i) => {
        if (t < c) return;
        const x1 = X(t - c);
        const x2 = X(t);
        const b = 6 + i * 3;
        arrows.push(<path key={c} d={`M${x1},${y} Q${(x1 + x2) / 2},${y - b * 1.6} ${x2 - 2},${y - 1}`} fill="none" stroke="var(--fg)" strokeWidth={1.4} markerEnd="url(#ar)" />);
      });
    }
  }
  const aria = last
    ? `Last filled: ${last.row < 3 ? `coins ${COINS.slice(0, last.row + 1).join(", ")}` : "any order"}, total ${last.t}: ${last.row < 3 ? TABLE[last.row][last.t] : ANY[last.t]}`
    : "Coin table, nothing filled yet";
  return (
    <svg viewBox={`0 0 366 ${H}`} className="stage-svg" role="img" aria-label={aria}>
      <defs>
        <marker id="ar" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 z" fill="var(--fg)" />
        </marker>
      </defs>
      {Array.from({ length: T + 1 }, (_, t) => (
        <text key={t} x={X(t)} y={11} textAnchor="middle" className={s.hd}>
          {t}
        </text>
      ))}
      <text x={2} y={11} className={s.hd}>
        total
      </text>
      <text x={4} y={TOP(0) + 16} className={s.lab}>
        none
      </text>
      {COINS.map((c, i) => (
        <g key={c}>
          <circle cx={19} cy={TOP(i + 1) + CH / 2} r={c === 5 ? 10 : c === 2 ? 8.5 : 7} fill="var(--bg-2)" stroke="var(--fg)" strokeWidth={1.2} />
          <text x={19} y={TOP(i + 1) + CH / 2 + 3.5} textAnchor="middle" className={s.coin}>
            {c}
          </text>
        </g>
      ))}
      {started && (
        <text x={4} y={TOP(4) + 11} className={s.lab}>
          <tspan x={4}>any</tspan>
          <tspan x={4} dy={9}>order</tspan>
        </text>
      )}
      {cells}
      {arrows}
    </svg>
  );
}

function MixStrip({ last, ordered }: { last: Last; ordered: boolean }) {
  if (ordered) {
    return (
      <svg viewBox="0 0 366 60" className="stage-svg" role="img" aria-label="Total 3: the table counts 1+1+1 and 1+2; any order also counts 2+1">
        <text x={4} y={9} className={s.cap}>Table, total 3: 2 ways</text>
        <Stack coins={[1, 1, 1]} x={6} y={16} w={36} />
        <Stack coins={[1, 2]} x={52} y={16} w={36} />
        <text x={200} y={9} className={s.cap}>Any order, total 3: 3 ways</text>
        <Stack coins={[1, 1, 1]} x={202} y={16} w={36} />
        <Stack coins={[1, 2]} x={248} y={16} w={36} />
        <Stack coins={[2, 1]} x={294} y={16} w={36} bad />
        <text x={294} y={52} className={s.capBad}>2+1: same coins, new order</text>
      </svg>
    );
  }
  const list = last && last.row < 3 ? mixes(last.row, last.t) : [];
  return (
    <svg viewBox="0 0 366 60" className="stage-svg" role="img" aria-label={`${list.length} ways for the last cell`}>
      {list.map((coins, i) => (
        <Stack key={i} coins={coins} x={4 + i * 36} y={4} w={33} />
      ))}
    </svg>
  );
}

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [st, setSt] = useState<{ main: number; any: number; last: Last; started: boolean }>({
    main: 0,
    any: 0,
    last: null,
    started: false,
  });
  const ref = useRef(st);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  const stepMain = () => {
    const c = ref.current;
    if (c.main >= 30) return;
    const row = Math.floor(c.main / T);
    const t = (c.main % T) + 1;
    ref.current = { ...c, main: c.main + 1, last: { row, t } };
    setSt(ref.current);
    if (ref.current.main === 30) reach("ten-filled");
  };
  const stepAny = () => {
    const c = ref.current;
    if (c.any >= T) return;
    ref.current = { ...c, any: c.any + 1, started: true, last: { row: 3, t: c.any + 1 } };
    setSt(ref.current);
    if (ref.current.any === T) reach("orders-counted");
  };
  const run = (step: () => void, n: number) => {
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      for (let i = 0; i < n; i++) step();
      return;
    }
    setRunning(true);
    for (let i = 0; i < n; i++) {
      timers.current.push(
        setTimeout(() => {
          step();
          if (i === n - 1) setRunning(false);
        }, i * 35),
      );
    }
  };
  // Fill the rest of coin row k (0..2): from the current main index to the end of that row.
  const fillRow = (k: number) => run(stepMain, (k + 1) * T - ref.current.main);
  const letOrder = () => {
    ref.current = { ...ref.current, started: true };
    setSt(ref.current);
    run(stepAny, T);
  };

  const { main, any, last, started } = st;
  const off = locked || running;
  const f = last && last.row < 3 ? last : null;
  let formula = "";
  if (f) {
    const c = COINS[f.row];
    const above = ABOVE(f.row, f.t);
    const names = COINS.slice(0, f.row + 1).join(", ");
    const val = TABLE[f.row][f.t];
    formula =
      f.t >= c
        ? `Total ${f.t} with ${names}: ${above} above + ${val - above} ${NAMES[f.row]} left = ${val}`
        : `Total ${f.t} with ${names}: ${above} above, no ${c} fits = ${val}`;
  } else if (last) {
    const t = last.t;
    const parts = COINS.filter((c) => t >= c).map((c) => ANY[t - c]);
    formula = `Any order, total ${t}: ${parts.join(" + ")} = ${ANY[t]}`;
  }

  return (
    <div className={s.wrap}>
      <p className={s.model}>Each cell: ways without this coin (above) plus ways using one more (c cells left).</p>
      <Table main={main} any={any} last={last} started={started} />
      <p className={s.formula} aria-live="polite">
        {formula}
      </p>
      <MixStrip last={last} ordered={started} />
      <div className={s.btns}>
        <Control className={s.tap} disabled={off || main >= 30} onClick={stepMain}>
          Fill one cell
        </Control>
        <Control className={s.tap} disabled={off || main >= T} onClick={() => fillRow(0)}>
          Fill the 1-coin row
        </Control>
        <Control className={s.tap} disabled={off || main < T || main >= 2 * T} onClick={() => fillRow(1)}>
          Add the 2-coin row
        </Control>
        <Control className={s.tap} disabled={off || main < 2 * T || main >= 3 * T} onClick={() => fillRow(2)}>
          Add the 5-coin row
        </Control>
        <Control className={s.tap} disabled={off || main < 3 * T || started} onClick={letOrder}>
          Let order matter
        </Control>
      </div>
    </div>
  );
}

export default function WaysToMakeTen({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Coins 1, 2 and 5. In how many ways can you make 10, if 5+5 and 2+2+2+2+2 count, and 1+2 is the same as 2+1?",
        options: ["4", "10", "128"],
        answer: 1,
      }}
      exploreHint="Build the rows one coin kind at a time, then let order matter."
      minInteractions={2}
      reveal={({ correct }) => (
        <>
          <p>
            {correct ? "Your prediction held." : "Not quite."} Your table reached 10 at total 10: 6 ways without a 5, plus 4
            that use one more 5. Adding one coin kind per row builds every mix in one fixed order, so each mix is counted
            once.
          </p>
          <p>
            When order mattered, the same coins in a new order counted again (1+2 and 2+1 at total 3), and your row climbed
            to <strong>128</strong>.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["ten-filled", "orders-counted"]}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}

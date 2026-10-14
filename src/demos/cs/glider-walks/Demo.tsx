"use client";

// Conway's Game of Life on a 7x7 grid with a five-cell glider. A filmstrip of four frame buttons: each makes
// exactly one generation from the one before, then (once made) can be tapped again to look back. The dashed
// ghost is where the shape started, so "it moved" is something to point at. One shared rule, computed here.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 7;
const CELL = 40;
// Glider (x right, y down), placed at offset (1, 1) so gen 4 stays inside the grid.
const START: [number, number][] = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]].map(([x, y]) => [x + 1, y + 1] as [number, number]);

const key = (x: number, y: number) => `${x},${y}`;

function neighbours(live: Set<string>, x: number, y: number) {
  let n = 0;
  for (let dx = -1; dx <= 1; dx++)
    for (let dy = -1; dy <= 1; dy++) if ((dx || dy) && live.has(key(x + dx, y + dy))) n++;
  return n;
}

// One generation of the rule. The grid is larger than the glider's path over 4 steps, so edges never matter.
function step(live: Set<string>) {
  const next = new Set<string>();
  for (let x = 0; x < N; x++)
    for (let y = 0; y < N; y++) {
      const n = neighbours(live, x, y);
      if (n === 3 || (n === 2 && live.has(key(x, y)))) next.add(key(x, y));
    }
  return next;
}

export default function GliderWalks({ slug }: { slug: string }) {
  const gens = useMemo(() => {
    const out: Set<string>[] = [new Set(START.map(([x, y]) => key(x, y)))];
    for (let g = 1; g <= 4; g++) out.push(step(out[g - 1]));
    return out;
  }, []);
  const [made, setMade] = useState(0); // generations made so far (0 to 4)
  const [shown, setShown] = useState(0);
  const [counts, setCounts] = useState(true);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Five live cells in a glider shape. Each step: a live cell with 2 or 3 live neighbours lives; an empty cell with exactly 3 comes alive; everything else dies. After 4 steps the shape is:",
        options: ["Gone", "The same shape, moved one cell diagonally", "Grown to 10 cells"],
        answer: 1,
      }}
      exploreHint="Make each generation in turn, then look back across them."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            In your four steps it was always <strong>5</strong> cells. At gen 4 it was the starting shape again, one cell right
            and one down from its dashed outline.
          </p>
          <p>
            No rule says move: each cell only counts its neighbours, and the pattern travels. It is called a glider. These rules
            are Conway&rsquo;s Game of Life, and patterns in it can be built to compute anything a computer can.
          </p>
        </>
      )}
    >
      {({ phase, locked, interact }) => {
        const view = phase === "reveal" && made === 4 ? 4 : shown;
        return (
          <Stage
            locked={locked}
            interact={interact}
            gens={gens}
            made={made}
            shown={view}
            counts={counts}
            pinned={phase === "reveal"}
            onMake={(g) => {
              setMade(g);
              setShown(g);
            }}
            onShow={setShown}
            onCounts={() => setCounts((c) => !c)}
          />
        );
      }}
    </Lesson>
  );
}

function Mini({ live, ghost }: { live: Set<string>; ghost: boolean }) {
  return (
    <svg viewBox={`0 0 ${N * 8} ${N * 8}`} className={s.mini} aria-hidden="true">
      <rect width={N * 8} height={N * 8} fill="var(--bg-2)" />
      {ghost &&
        START.map(([x, y]) => (
          <rect key={key(x, y)} x={x * 8 + 0.5} y={y * 8 + 0.5} width={7} height={7} fill="none" stroke="var(--muted)" strokeWidth={0.6} strokeDasharray="1.5 1" />
        ))}
      {[...live].map((k) => {
        const [x, y] = k.split(",").map(Number);
        return <rect key={k} x={x * 8 + 0.5} y={y * 8 + 0.5} width={7} height={7} fill="var(--fg)" />;
      })}
    </svg>
  );
}

function Stage({
  locked,
  interact,
  gens,
  made,
  shown,
  counts,
  pinned,
  onMake,
  onShow,
  onCounts,
}: {
  locked: boolean;
  interact: () => void;
  gens: Set<string>[];
  made: number;
  shown: number;
  counts: boolean;
  pinned: boolean;
  onMake: (g: number) => void;
  onShow: (g: number) => void;
  onCounts: () => void;
}) {
  const { reach } = useMilestones(interact, ["gen-1", "gen-4"]);
  const live = gens[shown];
  const prev = shown > 0 ? gens[shown - 1] : null;
  const ghostKeys = new Set(START.map(([x, y]) => key(x, y)));

  const press = (g: number) => {
    if (locked || g > made + 1 || g === shown) return;
    if (g === made + 1) {
      onMake(g);
      if (g === 1) reach("gen-1");
      if (g === 4) reach("gen-4");
    } else onShow(g);
  };

  const cells = [];
  for (let x = 0; x < N; x++)
    for (let y = 0; y < N; y++) {
      const k = key(x, y);
      const on = live.has(k);
      const n = neighbours(live, x, y);
      const died = prev ? prev.has(k) && !on : false;
      const born = prev ? !prev.has(k) && on : false;
      cells.push(
        <g key={k}>
          <rect x={x * CELL + 1} y={y * CELL + 1} width={CELL - 2} height={CELL - 2} rx={3} fill={on ? "var(--fg)" : "var(--bg-2)"} stroke="var(--line)" strokeWidth={1} />
          {ghostKeys.has(k) && (
            <rect x={x * CELL + 4} y={y * CELL + 4} width={CELL - 8} height={CELL - 8} rx={2} fill="none" stroke="var(--muted)" strokeWidth={2} strokeDasharray="4 3" />
          )}
          {counts && n > 0 && (
            <text x={x * CELL + CELL / 2} y={y * CELL + CELL / 2 + 5} textAnchor="middle" className={on ? s.nOn : s.n}>
              {n}
            </text>
          )}
          {died && (
            <text x={x * CELL + CELL - 5} y={y * CELL + 13} textAnchor="end" className={s.died}>
              ×
            </text>
          )}
          {born && (
            <g>
              <circle cx={x * CELL + CELL - 9} cy={y * CELL + 9} r={7} fill="var(--bg)" />
              <text x={x * CELL + CELL - 9} y={y * CELL + 13} textAnchor="middle" className={s.born}>
                +
              </text>
            </g>
          )}
        </g>,
      );
    }

  const label =
    shown === 4
      ? "Gen 4: 5 live cells, starting shape moved one right and one down"
      : `Gen ${shown}: ${live.size} live cells`;

  return (
    <div className={s.wrap}>
      <p className={s.rule}>Each step: live with 2 or 3 live neighbours stays; empty with exactly 3 is born; the rest die.</p>
      <svg viewBox={`0 0 ${N * CELL} ${N * CELL}`} className={`stage-svg ${s.grid}`} role="img" aria-label={label}>
        {cells}
      </svg>
      <p className={s.read} aria-live="polite">
        {pinned && shown === 4 ? "Your gen 4" : `Gen ${shown}`} · {live.size} live
        {prev ? " · × died, + born" : ""}
      </p>
      <div className={s.strip}>
        <div className={s.frame} aria-label="Gen 0">
          <Mini live={gens[0]} ghost={false} />
          <span>Gen 0</span>
        </div>
        {[1, 2, 3, 4].map((g) => (
          <button
            key={g}
            type="button"
            data-qa="control"
            className={`control ${s.frameBtn} ${shown === g ? "active" : ""}`}
            disabled={locked || g > made + 1 || shown === g}
            onClick={() => press(g)}
            aria-label={`Gen ${g}`}
          >
            {g <= made ? <Mini live={gens[g]} ghost={true} /> : <div className={s.q}>?</div>}
            <span>Gen {g}</span>
          </button>
        ))}
      </div>
      <button type="button" data-qa="control" className={`control ${s.toggle}`} disabled={locked} onClick={onCounts}>
        Counts: {counts ? "on" : "off"}
      </button>
    </div>
  );
}

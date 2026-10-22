"use client";

// Two corners off the board: a 4×4 chequered board with two squares removed, and dominoes.
// Square (r, c) is dark when r + c is even (so (0,0) is dark); dark squares also carry a dot (not colour alone).
// "Opposite corners off" removes (0,0) and (3,3), both dark: 6 dark, 8 light, no tiling (brief check D4), so
// the best try places 6 dominoes and leaves 2 light squares, outlined. "Corners in one row off" removes (0,0)
// and (0,3), one of each: 7 and 7, and draws one of its 12 tilings. "Another try" cycles fixed placements.
// The placements below are fixed (brief: "builder records them in meta"); every one is checked at module load
// (dominoes are neighbours, disjoint, on the board), and the readout is counted from the board itself.
// Milestones: "opp" (opposite-corner board with its best try drawn) and "row" (one-row board tiled). The last
// try seen on each board is recorded, so Reset cannot change what the reveal shows beside it.
// Brief: company/domains/briefs/math.discrete.md, Wave J, brief 4 (check D4).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useRef, useState } from "react";
import s from "./styles.module.css";

const N = 4;
type Cell = number; // r * N + c
type Domino = [Cell, Cell];
type BoardId = "opp" | "row";

const BOARDS: Record<BoardId, { removed: Cell[]; tries: Domino[][] }> = {
  // Opposite corners (0,0) and (3,3) off. Each try: 6 dominoes, 2 light squares left.
  opp: {
    removed: [0, 15],
    tries: [
      [[1, 2], [3, 7], [4, 5], [6, 10], [8, 9], [12, 13]], // leaves (2,3), (3,2)
      [[1, 2], [4, 5], [6, 7], [8, 9], [10, 11], [13, 14]], // leaves (0,3), (3,0)
      [[2, 3], [5, 6], [7, 11], [8, 9], [10, 14], [12, 13]], // leaves (0,1), (1,0)
    ],
  },
  // Corners (0,0) and (0,3) of the top row off. Each try: a full tiling with 7 dominoes.
  row: {
    removed: [0, 3],
    tries: [
      [[1, 2], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13], [14, 15]],
      [[1, 2], [4, 5], [6, 7], [8, 12], [9, 13], [10, 14], [11, 15]],
      [[1, 5], [2, 6], [4, 8], [7, 11], [9, 10], [12, 13], [14, 15]],
    ],
  },
};
const MILESTONES = ["opp", "row"] as const;

const rc = (x: Cell) => [Math.floor(x / N), x % N] as const;
const isDark = (x: Cell) => {
  const [r, c] = rc(x);
  return (r + c) % 2 === 0;
};
const cellsOf = (b: BoardId) => Array.from({ length: N * N }, (_, i) => i).filter((i) => !BOARDS[b].removed.includes(i));
const counts = (b: BoardId) => {
  const cells = cellsOf(b);
  const dark = cells.filter(isDark).length;
  return { dark, light: cells.length - dark };
};

// Sanity check of the fixed placements (throws in dev if a placement is ever edited wrongly).
for (const b of Object.keys(BOARDS) as BoardId[]) {
  const on = new Set(cellsOf(b));
  for (const t of BOARDS[b].tries) {
    const used = new Set<Cell>();
    for (const [a, z] of t) {
      const [ra, ca] = rc(a);
      const [rz, cz] = rc(z);
      if (!on.has(a) || !on.has(z) || used.has(a) || used.has(z) || Math.abs(ra - rz) + Math.abs(ca - cz) !== 1)
        throw new Error(`two-corners-off-the-board: bad placement on ${b}`);
      used.add(a);
      used.add(z);
    }
  }
}

type View = { board: BoardId; tryIdx: number | null };
type Seen = { opp: number | null; row: number | null };

export default function TwoCornersOffTheBoard({ slug }: { slug: string }) {
  const [view, setView] = useState<View>({ board: "opp", tryIdx: null });
  const seen = useRef<Seen>({ opp: null, row: null });

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You have a 4 by 4 chequered board and dominoes that each cover two neighbouring squares. Take off two opposite corners: 14 squares are left. Can 7 dominoes cover them exactly?",
        options: ["Yes", "No"],
        answer: 1,
      }}
      exploreHint="Try both boards, then ask for another try."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Every domino covers one dark and one light square, whichever way it lies. With opposite corners off you had
            6 dark and 8 light, so at most 6 dominoes could fit and 2 light squares were always left. With two corners
            in one row off, 7 and 7, and the board tiled.
          </p>
          <p>
            Counting colours proves no arrangement can work, without trying them all. The same count rules out a full
            chessboard with opposite corners off: 30 dark, 32 light.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} view={view} setView={setView} seen={seen.current} />}
    </Lesson>
  );
}

const S = 56; // square size in viewBox units
const SIDE = N * S + 8; // one board with its margin

const describe = (board: BoardId, tryIdx: number | null) => {
  const { dark, light } = counts(board);
  const n = tryIdx === null ? 0 : BOARDS[board].tries[tryIdx].length;
  return (
    `Board without ${board === "opp" ? "two opposite corners" : "two corners of one row"}: ${dark} dark, ${light} light squares` +
    (tryIdx === null ? ", no dominoes yet" : `, ${n} dominoes placed, ${cellsOf(board).length - 2 * n} squares uncovered`)
  );
};

/** One board, 224 px wide on the stage. */
function Board({ board, tryIdx }: { board: BoardId; tryIdx: number | null }) {
  return (
    <svg viewBox={`-4 -4 ${SIDE} ${SIDE}`} className={`stage-svg ${s.big}`} role="img" aria-label={describe(board, tryIdx)}>
      <BoardCells board={board} tryIdx={tryIdx} />
    </svg>
  );
}

/** Both boards in one picture across the stage width (the reveal frame). */
function BoardPair({ opp, row }: { opp: number | null; row: number | null }) {
  const GAP = 40;
  return (
    <svg
      viewBox={`-4 -4 ${2 * SIDE + GAP} ${SIDE}`}
      className={`stage-svg ${s.pair}`}
      role="img"
      aria-label={`${describe("opp", opp)}. ${describe("row", row)}.`}
    >
      <BoardCells board="opp" tryIdx={opp} />
      <g transform={`translate(${SIDE + GAP} 0)`}>
        <BoardCells board="row" tryIdx={row} />
      </g>
    </svg>
  );
}

function BoardCells({ board, tryIdx }: { board: BoardId; tryIdx: number | null }) {
  const { removed, tries } = BOARDS[board];
  const doms = tryIdx === null ? [] : tries[tryIdx];
  const covered = new Set(doms.flat());
  const left = tryIdx === null ? [] : cellsOf(board).filter((c) => !covered.has(c));
  return (
    <g data-board={board} data-try={tryIdx ?? "none"}>
      {Array.from({ length: N * N }, (_, i) => {
        const [r, c] = rc(i);
        const x = c * S;
        const y = r * S;
        if (removed.includes(i))
          return (
            <rect key={i} x={x + 2} y={y + 2} width={S - 4} height={S - 4} rx={4} className={s.gone} />
          );
        return (
          <g key={i}>
            <rect x={x} y={y} width={S} height={S} className={isDark(i) ? s.dark : s.light} />
            {isDark(i) && <circle cx={x + S / 2} cy={y + S / 2} r={5} className={s.dot} />}
          </g>
        );
      })}
      {doms.map(([a, z], k) => {
        const [ra, ca] = rc(a);
        const [rz, cz] = rc(z);
        const x = Math.min(ca, cz) * S + 6;
        const y = Math.min(ra, rz) * S + 6;
        const w = (Math.abs(ca - cz) + 1) * S - 12;
        const h = (Math.abs(ra - rz) + 1) * S - 12;
        return <rect key={k} x={x} y={y} width={w} height={h} rx={10} className={s.domino} />;
      })}
      {left.map((i) => {
        const [r, c] = rc(i);
        return <rect key={`l${i}`} x={c * S + 4} y={r * S + 4} width={S - 8} height={S - 8} rx={4} className={s.left} />;
      })}
    </g>
  );
}

function Stage({
  phase,
  locked,
  interact,
  view,
  setView,
  seen,
}: StageContext & { view: View; setView: (v: View) => void; seen: Seen }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const done = phase === "reveal";

  const show = (board: BoardId, tryIdx: number) => {
    setView({ board, tryIdx });
    seen[board] = tryIdx;
    reach(board);
  };
  const another = () => {
    if (view.tryIdx === null) return;
    show(view.board, (view.tryIdx + 1) % BOARDS[view.board].tries.length);
  };

  const readout = (b: BoardId, known: boolean) => {
    const { dark, light } = counts(b);
    return known ? `dark ${dark} · light ${light}` : "dark ? · light ?";
  };

  return (
    <div className={s.wrap}>
      {done && seen.opp !== null && seen.row !== null ? (
        // At the reveal both boards the learner tiled are shown side by side, with the last try seen on each.
        <>
          <BoardPair opp={seen.opp} row={seen.row} />
          <div className={s.pairText}>
            <p className={s.readout}>{readout("opp", true)}</p>
            <p className={s.readout}>{readout("row", true)}</p>
          </div>
        </>
      ) : (
        <>
          <Board board={view.board} tryIdx={view.tryIdx} />
          <p className={s.readout} aria-live="polite">
            {readout(view.board, view.tryIdx !== null)}
          </p>
        </>
      )}
      <Row>
        <Control
          disabled={locked || done || (view.board === "opp" && view.tryIdx !== null)}
          className={`${s.tap} ${view.board === "opp" && view.tryIdx !== null ? "active" : ""}`}
          aria-pressed={view.board === "opp" && view.tryIdx !== null}
          onClick={() => show("opp", 0)}
        >
          Opposite corners off
        </Control>
        <Control
          disabled={locked || done || (view.board === "row" && view.tryIdx !== null)}
          className={`${s.tap} ${view.board === "row" && view.tryIdx !== null ? "active" : ""}`}
          aria-pressed={view.board === "row" && view.tryIdx !== null}
          onClick={() => show("row", 0)}
        >
          Corners in one row off
        </Control>
      </Row>
      <Row>
        <Control disabled={locked || done || view.tryIdx === null} className={s.tap} onClick={another}>
          Another try
        </Control>
        <Control
          disabled={locked || done || view.tryIdx === null}
          className={s.tap}
          onClick={() => setView({ board: "opp", tryIdx: null })}
        >
          Reset
        </Control>
      </Row>
    </div>
  );
}

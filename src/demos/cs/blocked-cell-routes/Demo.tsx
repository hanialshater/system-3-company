"use client";

// Counting robot routes on a 4 x 4 grid (moves: right or down) with the cell in row 2, column 2
// blocked. The learner taps cells to fill each with "routes from the left + routes from above";
// a cell can be filled only once those two are filled. The blocked cell holds 0. The corner reads 8.
// A toggle after the grid removes the block and every filled cell updates at once (corner 20).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 4;
const BLOCK = { r: 1, c: 1 }; // row 2, column 2
const isBlock = (r: number, c: number, blocked: boolean) => blocked && r === BLOCK.r && c === BLOCK.c;
function counts(blocked: boolean) {
  const v: number[][] = [];
  for (let r = 0; r < N; r++) {
    v.push([]);
    for (let c = 0; c < N; c++) {
      if (isBlock(r, c, blocked)) v[r][c] = 0;
      else if (r === 0 && c === 0) v[r][c] = 1;
      else v[r][c] = (r ? v[r - 1][c] : 0) + (c ? v[r][c - 1] : 0);
    }
  }
  return v;
}
const WITH = counts(true);
const OPEN = counts(false);
const ANSWER = WITH[N - 1][N - 1]; // 8
const OPEN_TOTAL = OPEN[N - 1][N - 1]; // 20
const THROUGH = OPEN_TOTAL - ANSWER; // 12
const CELLS = Array.from({ length: N * N }, (_, i) => ({ r: Math.floor(i / N), c: i % N }));

export default function BlockedCellRoutes({ slug }: { slug: string }) {
  const [filled, setFilled] = useState<boolean[]>(Array(N * N).fill(false));
  const [blocked, setBlocked] = useState(true);
  const [sawOpen, setSawOpen] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const v = counts(blocked);
  const f = (r: number, c: number) => filled[r * N + c];
  const nFilled = filled.filter(Boolean).length;
  const cornerDone = f(N - 1, N - 1);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A robot crosses a ${N} x ${N} grid from top-left to bottom-right, moving only right or down. The cell in row ${BLOCK.r + 1}, column ${BLOCK.c + 1} is blocked. How many routes?`,
        options: [String(ANSWER), String(THROUGH), String(OPEN_TOTAL)],
        answer: 0,
      }}
      exploreHint="Fill each cell: routes from the left plus routes from above."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You filled {nFilled} cells, each with one addition: the cell to its left plus the cell above. The blocked cell
            held 0, so no route passed through it, and the corner read <strong>{ANSWER}</strong>.
            {sawOpen ? ` With the block removed the corner read ${OPEN_TOTAL}: the block cut ${THROUGH} routes.` : ""}
          </p>
          <p>
            Every route into a cell arrives from the left or from above, so its count is those two added. Reusing counts
            you already have, instead of listing routes one by one, is called dynamic programming.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["blocked", "corner"]}>
          {(reach) => {
            const tap = (r: number, c: number) => {
              if (locked || f(r, c)) return;
              const needLeft = c > 0 && !f(r, c - 1);
              const needUp = r > 0 && !f(r - 1, c);
              if (needLeft || needUp) {
                setNote(`Row ${r + 1}, column ${c + 1}: fill the cell ${needLeft ? "to its left" : "above it"} first.`);
                return;
              }
              const next = [...filled];
              next[r * N + c] = true;
              setFilled(next);
              if (isBlock(r, c, blocked)) {
                reach("blocked");
                setNote("Blocked: 0 routes reach it, so it passes on 0.");
              } else if (r === 0 && c === 0) setNote("Start: count it as 1 route.");
              else {
                const left = c ? v[r][c - 1] : 0;
                const up = r ? v[r - 1][c] : 0;
                setNote(`${left} from the left + ${up} from above = ${v[r][c]}.`);
              }
              if (r === N - 1 && c === N - 1 && blocked) reach("corner");
            };
            const toggle = () => {
              if (locked) return;
              if (blocked) setSawOpen(true);
              else if (cornerDone) reach("corner");
              setBlocked(!blocked);
              setNote(blocked ? "Block removed: the filled cells update at once." : "Block back in place.");
            };
            const msg = locked ? "Make a prediction to start." : note ?? "Robot moves right or down. Each cell: routes from the left + routes from above.";
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <div className={s.grid}>
                  {CELLS.map(({ r, c }) => {
                    const blk = isBlock(r, c, blocked);
                    const shown = !locked && f(r, c);
                    return (
                      <Control key={`${r}-${c}`} aria-label={`Row ${r + 1}, column ${c + 1}${blk ? ", blocked" : ""}`}
                        disabled={locked || f(r, c)}
                        className={`${s.cell} ${blk ? s.block : ""} ${shown ? `active ${s.done}` : ""} ${r === N - 1 && c === N - 1 ? s.goal : ""}`}
                        onClick={() => tap(r, c)}>
                        {shown ? v[r][c] : blk ? "✕" : r === 0 && c === 0 ? "start" : r === N - 1 && c === N - 1 ? "end" : ""}
                      </Control>
                    );
                  })}
                </div>
                <div className={s.foot}>
                  <span className={s.corner}>{locked ? "" : cornerDone ? `Routes to the end: ${v[N - 1][N - 1]}` : `Cells filled: ${nFilled} of ${N * N}`}</span>
                  <Control disabled={locked} onClick={toggle}>{blocked ? "Remove the block" : "Put the block back"}</Control>
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

"use client";

// Deadlock and lock order (brief cs #57). Two workers, P and Q. Each runs three steps: take its first lock,
// take its second lock, release both. A worker whose next lock is held by the other cannot step (it waits).
// P takes A then B; Q takes B then A, or A then B with "Q takes A first" on.
// Picture: P and Q on the sides, locks A and B in the middle. A solid line joins a lock to its holder; a dashed
// red arrow runs from a waiting worker to the lock it waits for. In a jam the arrows form the circle P → B → Q → A.
// Controls (DOM order = QA order): Step P, Step Q, Reset, "P all, then Q", "Q takes A first", "Take turns".
// Milestones: jammed (both waiting, opposite orders; holders recorded), finished (opposite orders, both done),
// same-order (toggle on, both done, someone waited at least once). Recorded runs stay as trace lines.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type W = "P" | "Q";
type L = "A" | "B";
const other = (w: W): W => (w === "P" ? "Q" : "P");
const orderOf = (w: W, same: boolean): L[] => (w === "P" || same ? ["A", "B"] : ["B", "A"]);

type State = { done: Record<W, number>; holder: Record<L, W | null> };
const start = (): State => ({ done: { P: 0, Q: 0 }, holder: { A: null, B: null } });
const nextLock = (st: State, w: W, same: boolean): L | null => (st.done[w] < 2 ? orderOf(w, same)[st.done[w]] : null);
const blocked = (st: State, w: W, same: boolean) => {
  const l = nextLock(st, w, same);
  return l !== null && st.holder[l] === other(w);
};
const canStep = (st: State, w: W, same: boolean) => st.done[w] < 3 && !blocked(st, w, same);

function apply(st: State, w: W, same: boolean): State {
  const n: State = { done: { ...st.done }, holder: { ...st.holder } };
  const l = nextLock(st, w, same);
  if (l) n.holder[l] = w;
  else {
    if (n.holder.A === w) n.holder.A = null;
    if (n.holder.B === w) n.holder.B = null;
  }
  n.done[w] += 1;
  return n;
}

// Replay a run; "waited" = at some point an unfinished worker's next lock was held by the other.
function play(seq: W[], same: boolean) {
  let st = start();
  let waited: W | null = null;
  const note = (x: State) => {
    for (const w of ["P", "Q"] as W[]) if (!waited && blocked(x, w, same)) waited = w;
  };
  for (const w of seq) {
    st = apply(st, w, same);
    note(st);
  }
  const jam = blocked(st, "P", same) && blocked(st, "Q", same);
  const finished = st.done.P === 3 && st.done.Q === 3;
  return { st, waited: waited as W | null, jam, finished };
}

const P_THEN_Q: W[] = ["P", "P", "P", "Q", "Q", "Q"];
function turns(same: boolean): W[] {
  const seq: W[] = [];
  let st = start();
  let turn: W = "P";
  for (let guard = 0; guard < 20; guard++) {
    if (st.done.P === 3 && st.done.Q === 3) break;
    const w = canStep(st, turn, same) ? turn : canStep(st, other(turn), same) ? other(turn) : null;
    if (!w) break; // both stuck
    seq.push(w);
    st = apply(st, w, same);
    turn = other(w);
  }
  return seq;
}

const STEP_LABEL = (w: W, i: number, same: boolean) => (i < 2 ? `take ${orderOf(w, same)[i]}` : "release");

// picture geometry
const VW = 360;
const VH = 166;
const WPOS: Record<W, [number, number]> = { P: [52, 46], Q: [308, 46] };
const LPOS: Record<L, [number, number]> = { A: [180, 34], B: [180, 118] };
const toward = (from: [number, number], to: [number, number], stop: number): [number, number] => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const d = Math.hypot(dx, dy);
  return [to[0] - (dx / d) * stop, to[1] - (dy / d) * stop];
};

export default function TwoLocksWaitForever({ slug }: { slug: string }) {
  const [seq, setSeq] = useState<W[]>([]);
  const [same, setSame] = useState(false);
  const [jamSeen, setJamSeen] = useState<Record<L, W> | null>(null);
  const [sameSeen, setSameSeen] = useState<{ waiter: W; lock: L } | null>(null);
  const run = play(seq, same);
  const st = run.st;

  const jA = jamSeen?.A ?? "P";
  const jB = jamSeen?.B ?? "Q";

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "P takes lock A, then lock B. Q takes B, then A. Anyone who finds a lock taken waits. Can both wait forever?",
        options: ["No, one always finishes", "Yes, in some orders", "Yes, in every order"],
        answer: 1,
      }}
      exploreHint="Step P and Q one at a time, or run a whole order. Then make Q take A first."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Your jam: {jA} held A and waited for B while {jB} held B and waited for A. Each waited for the other, a circle, so
            neither could ever move. It happens whenever both take their first lock before either takes its second.
          </p>
          <p>
            When Q also took A first, whoever got A could always get B, so no circle could form. Taking locks in one agreed
            order everywhere is a standard cure for deadlock.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["jammed", "finished", "same-order"]}>
          {(reach) => {
            const go = (next: W[], sameNow = same) => {
              if (locked) return;
              setSeq(next);
              const r = play(next, sameNow);
              if (r.jam && !sameNow && r.st.holder.A && r.st.holder.B) {
                setJamSeen({ A: r.st.holder.A, B: r.st.holder.B });
                reach("jammed");
              }
              if (r.finished && !sameNow) reach("finished");
              if (r.finished && sameNow && r.waited) {
                const waiter = r.waited;
                setSameSeen({ waiter, lock: "A" });
                reach("same-order");
              }
            };
            const step = (w: W) => canStep(st, w, same) && go([...seq, w]);
            const toggle = () => {
              if (locked) return;
              setSame(!same);
              setSeq([]);
            };
            const stepLabel = (w: W) =>
              st.done[w] >= 3 ? `${w} done` : blocked(st, w, same) ? `${w} waits for ${nextLock(st, w, same)}` : `Step ${w}`;

            const msg = locked
              ? "Make a prediction to start."
              : run.jam
                ? "Both wait: each holds the lock the other needs."
                : run.finished
                  ? `Both finished${run.waited ? `; ${run.waited} had to wait` : ""}.`
                  : seq.length === 0
                    ? "Step P and Q in any order, or run a whole order."
                    : `${seq.length} steps run.`;

            const waitArrows = (["P", "Q"] as W[]).filter((w) => !locked && blocked(st, w, same));
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <svg viewBox={`0 0 ${VW} ${VH}`} className="stage-svg" role="img" aria-label={`A held by ${st.holder.A ?? "nobody"}, B held by ${st.holder.B ?? "nobody"}`}>
                  <defs>
                    <marker id="tlwf-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                      <path d="M0 0 L10 5 L0 10 z" fill="var(--bad)" />
                    </marker>
                  </defs>
                  {(["A", "B"] as L[]).map((l) => {
                    const h = st.holder[l];
                    if (!h) return null;
                    const [x1, y1] = WPOS[h];
                    const [x2, y2] = LPOS[l];
                    return <line key={`h${l}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--domain)" strokeWidth={5} />;
                  })}
                  {waitArrows.map((w) => {
                    const l = nextLock(st, w, same) as L;
                    const [x1, y1] = WPOS[w];
                    const [x2, y2] = toward(WPOS[w], LPOS[l], 30);
                    return (
                      <line key={`w${w}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--bad)" strokeWidth={3} strokeDasharray="6 4" markerEnd="url(#tlwf-arrow)" />
                    );
                  })}
                  {(["A", "B"] as L[]).map((l) => {
                    const [x, y] = LPOS[l];
                    const h = locked ? null : st.holder[l];
                    return (
                      <g key={l}>
                        <rect x={x - 24} y={y - 16} width={48} height={32} rx={7} fill={h ? "var(--domain)" : "var(--bg-2)"} stroke="var(--fg)" strokeWidth={1.5} />
                        <text x={x} y={y + 6} textAnchor="middle" className={s.lock}>
                          lock {l}
                        </text>
                        <text x={x} y={y + 31} textAnchor="middle" className={s.small}>
                          {h ? `${h} has it` : "free"}
                        </text>
                      </g>
                    );
                  })}
                  {run.jam && !locked ? (
                    <text x={VW / 2} y={12} textAnchor="middle" className={s.circle}>
                      waiting in a circle
                    </text>
                  ) : null}
                  {(["P", "Q"] as W[]).map((w) => {
                    const [x, y] = WPOS[w];
                    const isBlocked = !locked && blocked(st, w, same);
                    return (
                      <g key={w}>
                        <circle cx={x} cy={y} r={20} fill={isBlocked ? "var(--bad)" : "var(--bg-2)"} stroke="var(--fg)" strokeWidth={2} />
                        <text x={x} y={y + 7} textAnchor="middle" className={s.worker}>
                          {w}
                        </text>
                        {[0, 1, 2].map((i) => {
                          const done = !locked && i < st.done[w];
                          const waiting = isBlocked && i === st.done[w];
                          return (
                            <text key={i} x={x} y={y + 44 + i * 18} textAnchor="middle" className={`${s.step} ${done ? s.done : ""} ${waiting ? s.waiting : ""}`}>
                              {i + 1} {STEP_LABEL(w, i, same)}
                              {done ? " ✓" : waiting ? " ⏳" : ""}
                            </text>
                          );
                        })}
                      </g>
                    );
                  })}
                </svg>
                <div className={s.trace}>
                  <span>{jamSeen ? `Jam: ${jamSeen.A} holds A, ${jamSeen.B} holds B.` : " "}</span>
                  <span>{sameSeen ? `Same order: ${sameSeen.waiter} waited for A, both finished.` : " "}</span>
                </div>
                <div className={s.controls}>
                  <Control disabled={locked || !canStep(st, "P", same)} onClick={() => step("P")}>
                    {stepLabel("P")}
                  </Control>
                  <Control disabled={locked || !canStep(st, "Q", same)} onClick={() => step("Q")}>
                    {stepLabel("Q")}
                  </Control>
                  <Control disabled={locked || seq.length === 0} onClick={() => go([])}>
                    Reset
                  </Control>
                </div>
                <div className={s.controls}>
                  <Control aria-label="Run: P all three steps, then Q" disabled={locked} onClick={() => go(P_THEN_Q)}>
                    P all, then Q
                  </Control>
                  <Control className={same ? "active" : ""} aria-pressed={same} disabled={locked} onClick={toggle}>
                    Q takes A first: {same ? "on" : "off"}
                  </Control>
                  <Control aria-label="Run: P and Q take turns" disabled={locked} onClick={() => go(turns(same))}>
                    Take turns
                  </Control>
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

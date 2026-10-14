"use client";

// Colouring a wheel: a centre region C touching the ring regions 1..n, each ring region also touching
// its two ring neighbours. Neighbours must differ. C takes one colour, so the ring has only two left,
// and two colours alternate only round an even ring. Ring of 5 (the question): backtracking (regions in
// order C,1..5, colours tried in order) hits 6 dead ends with 3 colours and finds no colouring; with 4 it
// succeeds at once: C=1, 1..5 = 2 3 2 3 4. Ring of 4 (the contrast): 3 colours are enough, 1 2 3 2 3.
// Controls in DOM order: Run backtracking, 3 colours, 4 colours, Ring of 5, Ring of 4, regions, colours, Undo.
// Changing the colour count or the ring re-runs backtracking if its result is on the wheel (a-star pattern),
// so pressing each control once reaches: dead end (5, 3), complete (5, 4), ring of 4 done with 3 colours.
// v4 (learner r8, phone fit): when the reveal opens, the learner's recorded ring-of-5 dead end goes back on the wheel
// (OnReveal), so the region the reveal names is the one on screen. "Colours used" / "Coloured" moved into the
// picture's top corners; every control row is Row foldAtReveal (none holds a readout; the reveal quotes the runs line
// and the wheel, not the controls). Reveal 123 -> 72 words: the "for big maps no fast method" sentence (c5) and the
// even-ring clause were cut. Crop 341 -> 0 px at 390x844.

import { useLayoutEffect, useState } from "react";
import type { Phase } from "@/kit/Lesson";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const NAME = (r: number) => (r === 0 ? "C" : String(r));
const adjOf = (ring: number): number[][] =>
  Array.from({ length: ring + 1 }, (_, r) =>
    r === 0 ? Array.from({ length: ring }, (_, i) => i + 1) : [0, r === 1 ? ring : r - 1, r === ring ? 1 : r + 1],
  );
const COLOURS = ["#e4572e", "#2a9df4", "#f2c14e", "#9b5de5"];
const COLOUR_NAMES = ["red", "blue", "yellow", "purple"];

type Col = (number | null)[]; // colour index per region

// backtracking colourer: regions in order, colours in order; counts dead ends, remembers the first
function backtrack(ring: number, k: number) {
  const ADJ = adjOf(ring);
  const N = ring + 1;
  const col: Col = Array(N).fill(null);
  let deadEnds = 0;
  let first: Col | null = null;
  let stuckAt = -1;
  const go = (r: number): boolean => {
    if (r === N) return true;
    let any = false;
    for (let c = 0; c < k; c++) {
      if (ADJ[r].some((u) => col[u] === c)) continue;
      any = true;
      col[r] = c;
      if (go(r + 1)) return true;
      col[r] = null;
    }
    if (!any) {
      deadEnds++;
      if (!first) {
        first = [...col];
        stuckAt = r;
      }
    }
    return false;
  };
  const ok = go(0);
  return { ok, col: ok ? [...col] : ((first as Col | null) ?? [...col]), deadEnds, stuckAt };
}

// geometry: centre disc and ring sectors
const CX = 160;
const CY = 98;
const R_IN = 36;
const R_OUT = 92;
const ang = (ring: number, i: number) => ((-90 + i * (360 / ring)) * Math.PI) / 180;
const pt = (r: number, a: number) => `${(CX + r * Math.cos(a)).toFixed(1)} ${(CY + r * Math.sin(a)).toFixed(1)}`;
const sector = (ring: number, i: number) => {
  const a0 = ang(ring, i - 1);
  const a1 = ang(ring, i);
  return `M ${pt(R_IN, a0)} L ${pt(R_OUT, a0)} A ${R_OUT} ${R_OUT} 0 0 1 ${pt(R_OUT, a1)} L ${pt(R_IN, a1)} A ${R_IN} ${R_IN} 0 0 0 ${pt(R_IN, a0)} Z`;
};
const labelAt = (ring: number, r: number) => {
  if (r === 0) return [CX, CY];
  const a = (ang(ring, r - 1) + ang(ring, r)) / 2;
  return [CX + ((R_IN + R_OUT) / 2) * Math.cos(a), CY + ((R_IN + R_OUT) / 2) * Math.sin(a)];
};

/** What the learner has seen for one (ring, colours) setting. */
type Seen = { ok: boolean; used: number; stuck: number; deadEnds: number | null; col: Col };
const keyOf = (ring: number, k: number) => `${ring}-${k}`;

export default function WheelNeedsFourColours({ slug }: { slug: string }) {
  const [ring, setRing] = useState(5);
  const [k, setK] = useState(3); // colours allowed
  const [col, setCol] = useState<Col>(Array(6).fill(null));
  const [auto, setAuto] = useState(false); // the wheel shows a backtracking result
  const [sel, setSel] = useState<number | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [clash, setClash] = useState<number | null>(null); // region that clashed
  const [history, setHistory] = useState<Col[]>([]);
  const [seen, setSeen] = useState<Record<string, Seen>>({});

  const N = ring + 1;
  const ADJ = adjOf(ring);
  const filled = col.filter((c) => c !== null).length;
  const used = new Set(col.filter((c) => c !== null)).size;
  const stuckIn = (c: Col, adj: number[][], kk: number) =>
    c.findIndex((x, r) => x === null && Array.from({ length: kk }, (_, q) => q).every((q) => adj[r].some((u) => c[u] === q)));
  const stuck = stuckIn(col, ADJ, k);

  const s53 = seen[keyOf(5, 3)];
  const s54 = seen[keyOf(5, 4)];
  // ring of four: the finished run that used the fewest colours; the reveal quotes it only if it used 3
  const best4 = [seen[keyOf(4, 3)], seen[keyOf(4, 4)]]
    .filter((x): x is Seen => !!x && x.ok)
    .sort((a, b) => a.used - b.used)[0];
  const ring4 = best4 && best4.used <= 3 ? best4 : undefined;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A round plaza is split into a centre region and five regions around it. Each outer region touches the centre and its two neighbours. Touching regions must get different colours. What is the fewest colours that works?",
        options: ["2", "3", "4"],
        answer: 2,
      }}
      exploreHint="Run backtracking with three colours, then four. Then try a ring of four."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            {s53 && !s53.ok
              ? `With three colours on the ring of five, region ${NAME(s53.stuck)} ran out: its neighbours held all three${
                  s53.deadEnds !== null ? ` (${s53.deadEnds} dead ends)` : ""
                }. `
              : ""}
            The centre takes one colour, leaving two for the ring, and two colours must alternate. Five is odd, so the last
            region meets both.
            {s54?.ok ? ` A fourth colour finished it: ${s54.used} used.` : ""}
          </p>
          {ring4 && <p>On the ring of four the two alternated all the way round, so {ring4.used} were enough.</p>}
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={["dead-end", "complete", "ring-of-four"]}>
          {(reach) => {
            // Record what the wheel now shows and reach the milestones it earns.
            const after = (next: Col, rr: number, kk: number, deadEnds: number | null) => {
              const adj = adjOf(rr);
              const st = stuckIn(next, adj, kk);
              const done = next.every((c) => c !== null);
              const u = new Set(next.filter((c) => c !== null)).size;
              if (st >= 0 || done) {
                setSeen((m) => {
                  const key = keyOf(rr, kk);
                  const prev = m[key];
                  // keep the first dead end; keep a colouring only if it uses fewer colours than the one kept
                  if (prev && (prev.ok ? !done || u >= prev.used : !done)) return m;
                  return { ...m, [key]: { ok: done, used: u, stuck: st, deadEnds, col: [...next] } };
                });
              }
              if (rr === 5 && kk === 3 && st >= 0) reach("dead-end");
              if (rr === 5 && done) reach("complete");
              if (rr === 4 && done && u <= 3) reach("ring-of-four");
              return st;
            };
            const run = (rr: number, kk: number) => {
              const r = backtrack(rr, kk);
              setHistory([]);
              setCol(r.col);
              setAuto(true);
              setClash(r.ok ? null : r.stuckAt);
              setSel(r.ok ? null : r.stuckAt);
              const u = new Set(r.col.filter((c) => c !== null)).size;
              setMsg(
                r.ok
                  ? `Ring of ${rr}, ${kk} colours: backtracking found a colouring using ${u}.`
                  : `Ring of ${rr}, ${kk} colours: ${r.deadEnds} dead ends, no colouring. Region ${NAME(r.stuckAt)} touches all ${kk}.`,
              );
              after(r.col, rr, kk, r.ok ? null : r.deadEnds);
            };
            const setting = (rr: number, kk: number) => {
              if (locked || (rr === ring && kk === k)) return;
              setRing(rr);
              setK(kk);
              if (auto) {
                run(rr, kk);
                return;
              }
              // manual colouring: keep what still fits, drop colours no longer allowed or regions that left
              const next: Col = Array.from({ length: rr + 1 }, (_, r) => {
                const c = rr === ring ? col[r] : r === 0 ? col[0] : null;
                return c !== null && c !== undefined && c < kk ? c : null;
              });
              setCol(next);
              setHistory([]);
              setSel(null);
              setClash(null);
              setMsg(`Ring of ${rr}, ${kk} colours allowed.`);
              after(next, rr, kk, null);
            };
            const pick = (r: number) => {
              if (locked) return;
              setSel(r);
              setClash(null);
              setMsg(`Region ${NAME(r)} picked. Now a colour.`);
            };
            const paint = (c: number) => {
              if (locked || sel === null) return;
              const bad = ADJ[sel].find((u) => col[u] === c);
              if (bad !== undefined) {
                setClash(bad);
                setMsg(`${COLOUR_NAMES[c]} clashes with region ${NAME(bad)}.`);
                return;
              }
              const next = [...col];
              next[sel] = c;
              setHistory((h) => [...h, col]);
              setCol(next);
              setAuto(false);
              setClash(null);
              const st = after(next, ring, k, null);
              setMsg(
                next.every((x) => x !== null)
                  ? `Every region coloured, no clashes.`
                  : st >= 0
                    ? `Dead end: region ${NAME(st)} touches all ${k} colours.`
                    : `Region ${NAME(sel)} is ${COLOUR_NAMES[c]}.`,
              );
            };
            const undo = () => {
              if (locked || history.length === 0) return;
              setCol(history[history.length - 1]);
              setHistory((h) => h.slice(0, -1));
              setClash(null);
              setMsg("Undone.");
            };

            const showDeadEnd = () => {
              if (!s53 || s53.ok) return;
              setRing(5);
              setK(3);
              setCol(s53.col);
              setHistory([]);
              setAuto(true);
              setClash(s53.stuck);
              setSel(s53.stuck);
              setMsg(`Your run, ring of 5, 3 colours: region ${NAME(s53.stuck)} touches all 3.`);
            };
            const note = msg || "Touching regions must differ.";
            const log = [
              s53 ? `5 ring, 3 colours: ${s53.ok ? "done" : "dead end"}` : null,
              s54 ? `5 ring, 4: done, ${s54.used} used` : null,
              best4 ? `4 ring: done, ${best4.used} used` : null,
            ].filter(Boolean);
            return (
              <div className={s.wrap}>
                <OnReveal phase={phase} run={showDeadEnd} />
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 320 210" className="stage-svg" role="img" aria-label={`Ring of ${ring}. Colours ${col.map((c) => (c === null ? "none" : COLOUR_NAMES[c])).join(", ")}`}>
                  {Array.from({ length: ring }, (_, i) => i + 1).map((r) => (
                    <path
                      key={`r${ring}-${r}`}
                      d={sector(ring, r)}
                      fill={col[r] === null || col[r] === undefined ? "var(--bg-2)" : COLOURS[col[r] as number]}
                      stroke={clash === r ? "var(--bad)" : sel === r ? "var(--fg)" : "var(--line)"}
                      strokeWidth={clash === r || sel === r ? 4 : 2}
                      className={`${s.region} ${clash === r ? s.flash : ""}`}
                      aria-label={`Region ${NAME(r)}`}
                      onClick={() => pick(r)}
                    />
                  ))}
                  <circle
                    cx={CX}
                    cy={CY}
                    r={R_IN}
                    fill={col[0] === null ? "var(--bg-2)" : COLOURS[col[0] as number]}
                    stroke={clash === 0 ? "var(--bad)" : sel === 0 ? "var(--fg)" : "var(--line)"}
                    strokeWidth={clash === 0 || sel === 0 ? 4 : 2}
                    className={`${s.region} ${clash === 0 ? s.flash : ""}`}
                    aria-label="Region C"
                    onClick={() => pick(0)}
                  />
                  {Array.from({ length: N }, (_, r) => {
                    const [x, y] = labelAt(ring, r);
                    return (
                      <text key={`l${r}`} x={x} y={y + 5} textAnchor="middle" className={`${s.lab} ${col[r] === null ? "" : s.labOn}`}>
                        {NAME(r)}
                      </text>
                    );
                  })}
                  <g aria-hidden>
                    <text x={4} y={14} className={s.cornerLab}>colours used</text>
                    <text x={4} y={34} className={s.cornerVal} data-testid="colours-used">{used}</text>
                    <text x={316} y={14} textAnchor="end" className={s.cornerLab}>coloured</text>
                    <text x={316} y={34} textAnchor="end" className={s.cornerVal}>{`${filled} / ${N}`}</text>
                  </g>
                  {stuck >= 0 && (
                    <text x={CX} y={205} textAnchor="middle" className={s.stuck}>
                      region {NAME(stuck)}: no colour left
                    </text>
                  )}
                </svg>
                <p className={s.log} data-testid="runs">
                  {log.length ? log.join(" · ") : "Runs: none yet"}
                </p>
                <Row foldAtReveal>
                  <Control disabled={locked} onClick={() => !locked && run(ring, k)}>
                    Run backtracking
                  </Control>
                </Row>
                <Row foldAtReveal>
                  {[3, 4].map((kk) => (
                    <Control
                      key={`k${kk}`}
                      className={k === kk ? "active" : ""}
                      aria-pressed={k === kk}
                      disabled={locked || k === kk}
                      onClick={() => setting(ring, kk)}
                    >
                      {kk} colours
                    </Control>
                  ))}
                  {[5, 4].map((rr) => (
                    <Control
                      key={`g${rr}`}
                      className={ring === rr ? "active" : ""}
                      aria-pressed={ring === rr}
                      disabled={locked || ring === rr}
                      onClick={() => setting(rr, k)}
                    >
                      Ring of {rr}
                    </Control>
                  ))}
                </Row>
                <Row foldAtReveal>
                  {Array.from({ length: N }, (_, r) => (
                    <Control key={`p${r}`} className={sel === r ? "active" : ""} disabled={locked} onClick={() => pick(r)} aria-label={`Region ${NAME(r)}`}>
                      {NAME(r)}
                    </Control>
                  ))}
                </Row>
                <Row foldAtReveal>
                  {COLOURS.slice(0, k).map((c, i) => (
                    <Control
                      key={`c${i}`}
                      disabled={locked || sel === null}
                      onClick={() => paint(i)}
                      aria-label={`Colour ${COLOUR_NAMES[i]}`}
                      style={{ background: c, color: "#0d0f14", fontWeight: 800 }}
                    >
                      {COLOUR_NAMES[i]}
                    </Control>
                  ))}
                  <Control disabled={locked || history.length === 0} onClick={undo}>
                    Undo
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

/** v4: when the reveal opens, put the learner's recorded ring-of-5 dead end back on the wheel (once, before paint). */
function OnReveal({ phase, run }: { phase: Phase; run: () => void }) {
  const [done, setDone] = useState(false);
  useLayoutEffect(() => {
    if (phase === "reveal" && !done) {
      setDone(true);
      run();
    }
    if (phase !== "reveal" && done) setDone(false);
  }, [phase, done, run]);
  return null;
}

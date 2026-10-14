"use client";

// Colouring a wheel: a centre region C touching five ring regions 1..5, each ring region also touching
// its two ring neighbours (the 5-wheel). Neighbours must differ. C takes one colour, so the odd ring
// has only two left and they cannot alternate round five regions: region 5 meets all three. Backtracking
// (regions in order C,1..5, colours tried in order) hits 6 dead ends with 3 colours and finds no
// colouring; with 4 it succeeds at once: C=1, 1..5 = 2 3 2 3 4.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const RING = 5;
const N = RING + 1; // region 0 is the centre, 1..5 the ring
const NAME = (r: number) => (r === 0 ? "C" : String(r));
const ADJ: number[][] = Array.from({ length: N }, (_, r) =>
  r === 0
    ? Array.from({ length: RING }, (_, i) => i + 1)
    : [0, r === 1 ? RING : r - 1, r === RING ? 1 : r + 1],
);
const COLOURS = ["#e4572e", "#2a9df4", "#f2c14e", "#9b5de5"];
const COLOUR_NAMES = ["red", "blue", "yellow", "purple"];

type Col = (number | null)[]; // colour index per region

// backtracking colourer: regions in order, colours in order; counts dead ends, remembers the first
function backtrack(k: number) {
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
  return { ok, col: ok ? [...col] : (first as Col | null) ?? [...col], deadEnds, stuckAt };
}
const THREE = backtrack(3); // fails: 6 dead ends, first stuck at region 5
const FOUR = backtrack(4); // succeeds

// geometry: centre disc and five ring sectors
const CX = 160;
const CY = 98;
const R_IN = 36;
const R_OUT = 92;
const ang = (i: number) => ((-90 + i * (360 / RING)) * Math.PI) / 180;
const pt = (r: number, a: number) => `${(CX + r * Math.cos(a)).toFixed(1)} ${(CY + r * Math.sin(a)).toFixed(1)}`;
const sector = (i: number) => {
  const a0 = ang(i - 1);
  const a1 = ang(i);
  return `M ${pt(R_IN, a0)} L ${pt(R_OUT, a0)} A ${R_OUT} ${R_OUT} 0 0 1 ${pt(R_OUT, a1)} L ${pt(R_IN, a1)} A ${R_IN} ${R_IN} 0 0 0 ${pt(R_IN, a0)} Z`;
};
const labelAt = (r: number) => {
  if (r === 0) return [CX, CY];
  const a = (ang(r - 1) + ang(r)) / 2;
  return [CX + ((R_IN + R_OUT) / 2) * Math.cos(a), CY + ((R_IN + R_OUT) / 2) * Math.sin(a)];
};

export default function WheelNeedsFourColours({ slug }: { slug: string }) {
  const [col, setCol] = useState<Col>(Array(N).fill(null));
  const [k, setK] = useState(3); // colours allowed
  const [sel, setSel] = useState<number | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [clash, setClash] = useState<number | null>(null); // region that clashed
  const [history, setHistory] = useState<Col[]>([]);

  const filled = col.filter((c) => c !== null).length;
  const used = new Set(col.filter((c) => c !== null)).size;
  // a dead end: some empty region already sees every allowed colour among its neighbours
  const stuck = col.findIndex((c, r) => c === null && Array.from({ length: k }, (_, x) => x).every((x) => ADJ[r].some((u) => col[u] === x)));
  const complete = filled === N;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A round plaza is split into a centre region and five regions around it. Each outer region touches the centre and its two neighbours. Touching regions must get different colours. What is the fewest colours that works?",
        options: ["2", "3", "4"],
        answer: 2,
      }}
      exploreHint="Try with three colours first: pick a region, then a colour. Then allow a fourth."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            With three colours, a region ran out: its neighbours held all three. The centre takes one colour, so the five ring regions
            have only two left, and two colours must alternate round the ring. Five is odd, so the last region meets both.
          </p>
          <p>
            Backtracking tried every other choice and hit {THREE.deadEnds} dead ends, with no way through. A fourth colour is the
            only way out. With four regions round the centre, three colours are enough. For big maps no fast method is known for
            finding the fewest colours, so trying and undoing is often the tool.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["dead-end", "complete"]}>
          {(reach) => {
            const after = (next: Col, kk: number) => {
              const st = next.findIndex(
                (c, r) => c === null && Array.from({ length: kk }, (_, x) => x).every((x) => ADJ[r].some((u) => next[u] === x)),
              );
              if (kk === 3 && st >= 0) reach("dead-end");
              if (next.every((c) => c !== null)) reach("complete");
              return st;
            };
            const autoFill = () => {
              if (locked) return;
              const r = k === 3 ? THREE : FOUR;
              setHistory((h) => [...h, col]);
              setCol(r.col);
              setClash(r.ok ? null : r.stuckAt);
              setSel(r.ok ? null : r.stuckAt);
              setMsg(
                r.ok
                  ? `Backtracking found a colouring with ${k}.`
                  : `Backtracking: ${r.deadEnds} dead ends, no colouring. Region ${NAME(r.stuckAt)} touches all 3 colours.`,
              );
              after(r.col, k);
            };
            const toggleK = () => {
              if (locked) return;
              const nk = k === 3 ? 4 : 3;
              const next = nk === 3 ? col.map((c) => (c === 3 ? null : c)) : col;
              setK(nk);
              setCol(next);
              setClash(null);
              setMsg(nk === 4 ? "A fourth colour is allowed." : "Back to three colours.");
              after(next, nk);
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
              setClash(null);
              const st = after(next, k);
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

            const note = msg || "Touching regions must differ.";
            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 320 210" className="stage-svg" role="img" aria-label={`Colours ${col.map((c) => (c === null ? "none" : COLOUR_NAMES[c])).join(", ")}`}>
                  {Array.from({ length: RING }, (_, i) => i + 1).map((r) => (
                    <path
                      key={`r${r}`}
                      d={sector(r)}
                      fill={col[r] === null ? "var(--bg-2)" : COLOURS[col[r] as number]}
                      stroke={clash === r ? "var(--bad)" : sel === r ? "var(--fg)" : "var(--line)"}
                      strokeWidth={clash === r || sel === r ? 4 : 2}
                      className={`${s.region} ${clash === r ? s.flash : ""}`}
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
                    onClick={() => pick(0)}
                  />
                  {Array.from({ length: N }, (_, r) => {
                    const [x, y] = labelAt(r);
                    return (
                      <text key={`l${r}`} x={x} y={y + 5} textAnchor="middle" className={`${s.lab} ${col[r] === null ? "" : s.labOn}`}>
                        {NAME(r)}
                      </text>
                    );
                  })}
                  {stuck >= 0 && (
                    <text x={CX} y={205} textAnchor="middle" className={s.stuck}>
                      region {NAME(stuck)}: no colour left
                    </text>
                  )}
                </svg>
                <Row>
                  <Control disabled={locked} onClick={autoFill}>
                    Let backtracking try {k}
                  </Control>
                  <Control className={k === 4 ? "active" : ""} disabled={locked} onClick={toggleK}>
                    {k === 3 ? "Allow a 4th colour" : "Back to 3 colours"}
                  </Control>
                </Row>
                <Row>
                  {Array.from({ length: N }, (_, r) => (
                    <Control key={`p${r}`} className={sel === r ? "active" : ""} disabled={locked} onClick={() => pick(r)} aria-label={`Region ${NAME(r)}`}>
                      {NAME(r)}
                    </Control>
                  ))}
                </Row>
                <Row>
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
                <Row>
                  <Readout label="Colours allowed" value={k} />
                  <Readout label="Colours used" value={used} />
                  <Readout label="Coloured" value={`${filled} / ${N}`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

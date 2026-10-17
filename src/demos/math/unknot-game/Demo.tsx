"use client";

// Unknot game (brief: company/domains/briefs/math.discrete.md "Knots, batch 1" #3 with the W-1569 and W-1581 rulings;
// build spec company/design/specs/unknot-game.md, U-1 and U-2 folded in; design note company/reviews/unknot-game/design.md).
// The kit's trefoil (or figure-eight) is drawn on its stored layout. The learner taps a crossing to switch it, one switch
// at a time; every single switch gives a plain loop (brief checks K3, K8), so the tally fills and no crossing is special.
// After each switch the strand that now lies on top at two crossings in a row is tinted (the "why" on the stage).
//
// Kit rules (src/kit/knots/README.md rules 1, 2(a), 4; design-lead S1 to S3 in
// company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md):
// - import only from '@/kit/knots';
// - `layout` once per knot (useMemo, on mount, default relax); every state is draw(q, { layout: L, gap: 0.5 }) with q the
//   table entry or one crossingChange of it; default size and margin; scaled only by the viewBox and CSS;
// - simplify() is read for its status only, moves() is read for the tint only; apply() is never called and nothing they
//   return is drawn. The tint is the global .knot-tint class (globals.css, W-1582) plus width 3 on a path from the
//   same draw() call (spec "The tint"). identify() is not used (README rule 5 does not apply: no tap shows a name).
// - simplify status 'unknot' -> "Plain loop", 'minimal' -> "Still a knot", anything else -> nothing (rule 4).
// W-1604 / design-lead S4 D3: when the reveal opens, the stage returns to the trefoil with the learner's last trefoil
// switch and its tint, so "the tinted strand lay on top at two crossings in a row" points at something on screen
// (learner walk 2026-10-17 finding 2; same pattern as W-1602 in draw-a-table-knot).

import { useEffect, useMemo, useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { knot, layout, draw, crossingChange, moves, simplify, type Layout, type PD } from "@/kit/knots";
import s from "./styles.module.css";

type Chip = "3_1" | "4_1";
const CHIPS: { id: Chip; name: string }[] = [
  { id: "3_1", name: "Trefoil" },
  { id: "4_1", name: "Figure-eight" },
];
// S1 viewBox "-8 -8 116 116", tightened (as S1 allows) to the curves' extent plus 8 units: over both knots and all
// 7 single switches the curves span x 8.0..97.6, y 8.0..88.5 (sampled Bezier bbox, build.md). S3 room: 4_1's
// right-hand crossing (x 96.4) keeps 9.6 units to the edge, 22 px down to 2.3 px per unit.
const VB = { x: 0, y: 0, w: 106, h: 97 };

type Status = "unknot" | "minimal" | "other";
type State = { pd: PD; status: Status; tint: number | null };
type KnotData = { L: Layout; base: State; sw: State[] };
type Tally = Record<Chip, boolean[]>;

/** Status for the readout, and the tinted edge: of the first R2's two edges, the one in an over slot (1 or 3) of the
 *  PD tuple at both of the move's crossings (spec "The tint"; brief check K20). Read only. */
function stateOf(q: PD, switched: boolean): State {
  const st = simplify(q).status;
  const status: Status = st === "unknot" ? "unknot" : st === "minimal" ? "minimal" : "other";
  let tint: number | null = null;
  if (switched && status === "unknot") {
    const m = moves(q).filter((x) => x.type === "R2")[0];
    if (m) {
      const overAtBoth = (e: number) =>
        m.crossings.every((c) => {
          const k = (q[c] as number[]).indexOf(e);
          return k === 1 || k === 3;
        });
      tint = m.edges.find(overAtBoth) ?? null;
    }
  }
  return { pd: q, status, tint };
}

function Tick({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" className={s.glyph}>
      <circle cx="10" cy="10" r="9" fill="var(--good-fill)" />
      <path d="M5.5 10.2 l3 3.3 l6 -7" fill="none" stroke="#0d0f14" strokeWidth="2.2" />
    </svg>
  );
}

function Marks({ marks }: { marks: boolean[] }) {
  return (
    <span className={s.marks} aria-hidden="true">
      {marks.map((on, k) =>
        on ? (
          <Tick key={k} size={14} />
        ) : (
          <svg key={k} width={14} height={14} viewBox="0 0 20 20" className={s.glyph}>
            <circle cx="10" cy="10" r="8" fill="none" stroke="var(--muted)" strokeWidth="2" />
          </svg>
        ),
      )}
    </span>
  );
}

function Stage({
  ctx,
  tally,
  setTally,
  lastTre,
  setLastTre,
}: {
  ctx: StageContext;
  tally: Tally;
  setTally: (t: Tally) => void;
  lastTre: number | null;
  setLastTre: (i: number) => void;
}) {
  const { locked, phase } = ctx;
  const { reach } = useMilestones(ctx.interact, ["firstFree", "allThree"]);
  const [chip, setChip] = useState<Chip>("3_1");
  const [sw, setSw] = useState<number | null>(null);

  // Rule 1: one layout per knot, computed once on mount and reused for every tap. The 1 + n states per knot are
  // read (status, tint edge) at the same time: simplify and moves take under 1 ms each on these diagrams (build.md).
  const data = useMemo(() => {
    const out = {} as Record<Chip, KnotData>;
    for (const { id } of CHIPS) {
      const pd = knot(id)!.pd;
      out[id] = {
        L: layout(pd),
        base: stateOf(pd, false),
        sw: pd.map((_, i) => stateOf(crossingChange(pd, i), true)),
      };
    }
    return out;
  }, []);

  const k = data[chip];
  const cur = sw === null ? k.base : k.sw[sw];
  const pic = useMemo(() => draw(cur.pd, { layout: k.L, gap: 0.5 }), [cur, k.L]);
  const free = cur.status === "unknot";

  const tap = (i: number) => {
    if (locked) return;
    if (sw === i) {
      setSw(null); // tapping the switched crossing again restores it
      return;
    }
    setSw(i); // one switch at a time: any other switched crossing is restored first
    if (chip === "3_1") setLastTre(i); // D3: the reveal returns to this switch
    if (k.sw[i].status === "unknot") {
      const marks = tally[chip].slice();
      marks[i] = true;
      const next = { ...tally, [chip]: marks };
      setTally(next);
      reach("firstFree");
      if (next["3_1"].every(Boolean)) reach("allThree");
    }
  };
  const pick = (c: Chip) => {
    if (locked) return;
    setChip(c);
    setSw(null);
  };
  const reset = () => {
    if (locked) return;
    setSw(null);
  };

  // D3: on entering the reveal, show the trefoil with the last trefoil switch (it exists: the reveal unlocks at
  // allThree, i.e. after the third trefoil crossing was switched). The stage stays live afterwards.
  useEffect(() => {
    if (phase !== "reveal" || lastTre === null) return;
    setChip("3_1");
    setSw(lastTre);
  }, [phase]); // only on entering the reveal; lastTre is fixed by then

  const hidden = phase === "predict";
  const showTint = free && cur.tint !== null && sw !== null;

  return (
    <div className={`${s.wrap} ${phase === "reveal" ? s.atReveal : ""}`}>
      <p className={s.readout} role="status" aria-live="polite">
        {cur.status === "unknot" ? (
          <>
            <Tick size={18} /> Plain loop
          </>
        ) : cur.status === "minimal" ? (
          "Still a knot"
        ) : (
          " "
        )}
      </p>
      <div className={s.board}>
        <svg
          viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
          className={`stage-svg ${s.svg}`}
          role="img"
          aria-label={`${CHIPS.find((c) => c.id === chip)!.name} drawing, ${pic.crossings.length} crossings${
            sw === null ? "" : `, crossing ${sw + 1} switched`
          }`}
        >
          {pic.edges.map((e) => {
            const on = e.label === cur.tint;
            return (
              <path
                key={`${chip}-${e.label}`}
                d={e.d}
                className={`${s.strand} ${on ? "knot-tint" : s.plain}`}
                strokeWidth={on ? 3 : 2}
              />
            );
          })}
        </svg>
        <div className={s.hits}>
          {pic.crossings.map((c) => (
            <button
              key={`${chip}-${c.i}`}
              type="button"
              data-qa="control"
              className={s.hit}
              style={{ left: `${((c.x - VB.x) / VB.w) * 100}%`, top: `${((c.y - VB.y) / VB.h) * 100}%` }}
              disabled={locked}
              aria-pressed={sw === c.i}
              aria-label={`Crossing ${c.i + 1}: switch`}
              onClick={() => tap(c.i)}
            />
          ))}
        </div>
      </div>
      <p className={`${s.caption} ${hidden ? s.hidden : ""}`}>
        {showTint ? (
          <>
            <svg width={18} height={8} viewBox="0 0 18 8" aria-hidden="true" className={s.swatch}>
              <line x1="1" y1="4" x2="17" y2="4" className="knot-tint" strokeWidth={5} strokeLinecap="round" />
            </svg>{" "}
            On top twice: it slides off
          </>
        ) : (
          " "
        )}
      </p>
      <div className={`${s.tally} ${hidden ? s.hidden : ""}`}>
        <p className={s.tallyHead}>Freed by one switch</p>
        {CHIPS.map(({ id, name }) => {
          const marks = tally[id];
          return (
            <p key={id} className={s.tallyRow}>
              <span className={s.tallyName}>{name}</span>
              <Marks marks={marks} />
              <span className={s.tallyCount}>
                {marks.filter(Boolean).length} of {marks.length}
              </span>
            </p>
          );
        })}
      </div>
      <Row>
        <Control disabled={locked || sw === null} onClick={reset}>
          Reset
        </Control>
        {CHIPS.map(({ id, name }) => (
          <Control
            key={id}
            className={chip === id ? "active" : ""}
            disabled={locked || chip === id}
            aria-pressed={chip === id}
            onClick={() => pick(id)}
          >
            {name}
          </Control>
        ))}
      </Row>
    </div>
  );
}

function Reveal({ tally }: { tally: Tally }) {
  const n = tally["3_1"].filter(Boolean).length;
  return (
    <>
      <p>
        Each crossing you switched freed the trefoil on its own: {n} of 3. No crossing was special. After each switch, the
        tinted strand lay on top at two crossings in a row, so it slides off, and the twist left over falls out.
      </p>
      <p>
        The fewest switches that can free a knot is its unknotting number: 1 for the trefoil, and for the figure-eight
        too. Some knots need more than one.
      </p>
    </>
  );
}

export default function UnknotGame({ slug }: { slug: string }) {
  // Kept across Reset and chip changes (spec "Tally"), and read by the reveal.
  const [tally, setTally] = useState<Tally>({ "3_1": [false, false, false], "4_1": [false, false, false, false] });
  const [lastTre, setLastTre] = useState<number | null>(null); // last trefoil crossing switched (D3)
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "The trefoil has 3 crossings. Switching a crossing makes its top strand go under. What is the fewest switches that frees it?",
        options: ["1", "2", "3"],
        answer: 0,
      }}
      exploreHint="Tap a crossing to switch it, then try each of the others."
      minInteractions={2}
      reveal={() => <Reveal tally={tally} />}
    >
      {(ctx) => <Stage ctx={ctx} tally={tally} setTally={setTally} lastTre={lastTre} setLastTre={setLastTre} />}
    </Lesson>
  );
}

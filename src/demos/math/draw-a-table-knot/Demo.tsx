"use client";

// Draw a table knot (brief: company/domains/briefs/math.discrete.md "Knots, batch 1" #1, as revised by
// W-1569; design note company/reviews/draw-a-table-knot/design.md). A table name like 6₁ promises that
// no drawing of the knot has fewer than 6 crossings. The stage shows the kit's 6₁ (or 5₂) drawing; the
// learner switches one crossing at a time. The drawing keeps its 6 (or 5) crossings but its name becomes
// 4₁, 3₁ or 0₁ (brief check K14), so the name cannot be counting this drawing.
//
// Kit rules (src/kit/knots/README.md rule 1 and 2(a) scope; design-lead S1-S3 in
// company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md):
// - import only from '@/kit/knots';
// - `layout` is computed once per knot (useMemo, on mount) at the default relax; taps redraw with
//   draw(pd, { layout: L, gap: 0.5 }) on that stored layout; default size and margin; scaled only by
//   the viewBox "-8 -8 116 116" and CSS;
// - only table knots and their single crossing changes are drawn; identify() is read, never drawn.
// Milestone "switched": any switch (every single switch on both knots changes the name, K14). The last
// switch is recorded ({chip, drawn, name}) and survives Reset and chip changes (Seen line, reveal).

import { useEffect, useMemo, useRef, useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { knot, layout, draw, crossingChange, crossingCount, identify, type Layout, type PD } from "@/kit/knots";
import s from "./styles.module.css";

type Chip = "6_1" | "5_2";
const CHIPS: Chip[] = ["5_2", "6_1"];
// S1 viewBox "-8 -8 116 116", tightened (as S1 allows) to the union of both knots' curves plus 8 units:
// curves span x 6.9..93.1, y 7.2..95.7 over every drawn state (bbox probe in build.md). S3 room holds:
// the lowest crossing (5₂ at y 94.1) keeps >= 22 px to the edge down to 2.24 px per unit (260 px / 116).
const VB = { x: -1.5, y: -1, w: 103, h: 105 };

const SUB = "₀₁₂₃₄₅₆₇₈₉";
/** "6_1" -> "6₁" (the name only; the table lists a knot and its mirror under one name). */
function pretty(name: string): string {
  const [n, k] = name.split("_");
  return n + [...(k ?? "")].map((d) => SUB[Number(d)] ?? d).join("");
}

type Seen = { chip: Chip; drawn: number; name: string };

function tableName(pd: PD): string {
  const hits = identify(pd);
  return hits.length > 0 ? hits[0].name : "?";
}

function Stage({ ctx, seen, record }: { ctx: StageContext; seen: Seen | null; record: (r: Seen) => void }) {
  const { locked, phase } = ctx;
  const { reach } = useMilestones(ctx.interact, ["switched"]);
  const [chip, setChip] = useState<Chip>("6_1");
  const [sw, setSw] = useState<number | null>(null);

  // Rule 1: one layout per knot, computed once, reused for every tap.
  const layouts = useMemo(() => {
    const out = {} as Record<Chip, { pd: PD; L: Layout }>;
    for (const c of CHIPS) {
      const pd = knot(c)!.pd;
      out[c] = { pd, L: layout(pd) };
    }
    return out;
  }, []);

  // identify() is read only (never drawn), once per switched state. The unswitched drawing is the table
  // entry itself, so its name is the chip's (identify returns each entry's own name: brief check K6).
  const names = useRef(new Map<string, string>());
  const nameOf = (c: Chip, i: number | null, q: PD): string => {
    if (i === null) return c;
    const key = `${c}:${i}`;
    let n = names.current.get(key);
    if (n === undefined) {
      n = tableName(q);
      names.current.set(key, n);
    }
    return n;
  };

  const { pd: base, L } = layouts[chip];
  // Warm the names of this knot's single switches after first paint, so the first tap does not pay for
  // identify's cold start (EDD-004 C4 measure in company/reviews/draw-a-table-knot/build.md).
  useEffect(() => {
    const t = setTimeout(() => {
      for (let i = 0; i < base.length; i++) nameOf(chip, i, crossingChange(base, i));
    }, 50);
    return () => clearTimeout(t);
  }, [chip, base]); // nameOf only reads and fills the names ref
  const pd = useMemo(() => (sw === null ? base : crossingChange(base, sw)), [base, sw]);
  const pic = useMemo(() => draw(pd, { layout: L, gap: 0.5 }), [pd, L]);
  const drawn = crossingCount(pd);
  const name = nameOf(chip, sw, pd);

  const tap = (i: number) => {
    if (locked) return;
    if (sw === i) {
      setSw(null); // tapping the switched crossing again switches it back
      return;
    }
    const next = crossingChange(base, i); // one switch at a time: the previous one is restored
    record({ chip, drawn: crossingCount(next), name: nameOf(chip, i, next) });
    setSw(i);
    reach("switched");
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

  const at = sw === null ? null : pic.crossings.find((c) => c.i === sw);

  return (
    <div className={`${s.wrap} ${phase === "reveal" ? s.atReveal : ""}`}>
      {/* The gesture caption is not needed once the reveal is open (phone fit, build.md). */}
      {phase !== "reveal" && <p className={s.caption}>Switch: top strand goes under</p>}
      <div className={s.board}>
        <svg
          viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
          className={`stage-svg ${s.svg}`}
          role="img"
          aria-label={`Knot drawing with ${drawn} crossings, name ${pretty(name)}`}
        >
          {at && <circle cx={at.x} cy={at.y} r={9} className={s.ring} />}
          {pic.edges.map((e) => (
            <path key={e.label} d={e.d} className={s.strand} />
          ))}
        </svg>
        {pic.crossings.map((c) => (
          <button
            key={`${chip}-${c.i}`}
            type="button"
            data-qa="control"
            className={s.hit}
            style={{ left: `${((c.x - VB.x) / VB.w) * 100}%`, top: `${((c.y - VB.y) / VB.h) * 100}%` }}
            disabled={locked}
            aria-pressed={sw === c.i}
            aria-label={`Crossing ${c.i + 1}${sw === c.i ? ", switched" : ""}`}
            onClick={() => tap(c.i)}
          />
        ))}
      </div>
      <p className={s.now} aria-live="polite">
        Crossings drawn: {drawn} · Name: {pretty(name)}
        {name === "0_1" ? ", plain loop" : ""}
      </p>
      <p className={s.seen}>{seen ? `Seen on ${pretty(seen.chip)}: ${seen.drawn} drawn, name ${pretty(seen.name)}` : " "}</p>
      <Row>
        {CHIPS.map((c) => (
          <Control key={c} className={chip === c ? "active" : ""} disabled={locked || chip === c} onClick={() => pick(c)}>
            {pretty(c)}
          </Control>
        ))}
        <Control disabled={locked || sw === null} onClick={reset}>
          Reset
        </Control>
      </Row>
    </div>
  );
}

function Reveal({ seen }: { seen: Seen | null }) {
  const r = seen ?? { chip: "6_1" as Chip, drawn: 6, name: "4_1" };
  const loop = r.name === "0_1";
  const k = Number(r.name.split("_")[0]);
  return (
    <>
      <p>
        Your switch made a new knot. Your {pretty(r.chip)} still had {r.drawn} crossings drawn, but its name became {pretty(r.name)}
        {loop ? ", a plain loop" : ""}.
      </p>
      <p>
        The first number in a name is the fewest crossings any drawing of that knot can have:{" "}
        {loop ? "a plain loop can be drawn with none." : `${pretty(r.name)} can be drawn with ${k} and never with fewer.`} The
        table draws each knot with that fewest, so {pretty(r.chip)} had exactly {r.drawn}. The second number is only its place in
        the table.
      </p>
    </>
  );
}

export default function DrawATableKnot({ slug }: { slug: string }) {
  const [seen, setSeen] = useState<Seen | null>(null);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Knot tables name each knot with a number, like 6₁. This drawing of 6₁ has 6 crossings. What does the 6 count?",
        options: [
          "The crossings in any drawing of it",
          "The fewest crossings any drawing of it can have",
          "The loops in the rope",
        ],
        answer: 1,
      }}
      exploreHint="Tap a crossing to switch it, and watch the count and the name."
      minInteractions={1}
      reveal={() => <Reveal seen={seen} />}
    >
      {(ctx) => <Stage ctx={ctx} seen={seen} record={setSeen} />}
    </Lesson>
  );
}

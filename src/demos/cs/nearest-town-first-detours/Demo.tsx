"use client";

// Nearest-neighbour tour on a line. Towns at -15, -3, 2, 8; start 0. A tour is drawn as arcs: rightward hops
// above the road, leftward hops below, each labelled with its km. Controls in DOM order: Nearest-first tour
// (all 5 hops, 56), Out to 8 first (46), Try all 24 orders (shortest 46, longest 56), Step (one nearest-first
// hop), Reset. Milestones: greedy (full nearest-first tour, by button or 5 steps), sweep, all-orders. The trace
// keeps "nearest-first 2+5+11+23+15 = 56 · out to 8 first: 46 · all 24: 46 to 56" and survives Reset.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { ALL_TOTALS, TOWNS, type Hop, nearestFirst, outTo8First, total } from "./model";
import s from "./styles.module.css";

const GREEDY = nearestFirst();
const SWEEP = outTo8First();
const SHORTEST = Math.min(...ALL_TOTALS);
const LONGEST = Math.max(...ALL_TOTALS);
const ROAD_Y = 64;
const X = (km: number) => 30 + (km + 15) * 12.6;
const H = (len: number) => 6 + len * 2.6;

type Tour = { kind: "none" } | { kind: "greedy"; hops: number } | { kind: "sweep" };

function Arc({ hop, strong }: { hop: Hop; strong: boolean }) {
  const x1 = X(hop.from), x2 = X(hop.to), mid = (x1 + x2) / 2;
  const up = hop.to > hop.from;
  const h = H(hop.len);
  const cy = up ? ROAD_Y - 2 * h : ROAD_Y + 2 * h;
  const ly = up ? ROAD_Y - h - 4 : ROAD_Y + h + 13;
  return (
    <g>
      <path d={`M ${x1} ${ROAD_Y} Q ${mid} ${cy} ${x2} ${ROAD_Y}`} className={strong ? s.arcStrong : s.arc} />
      <text x={mid} y={ly} textAnchor="middle" className={s.hopLabel}>{hop.len}</text>
    </g>
  );
}

function Stage({ locked, interact, tourState, setTour, showAll, setShowAll, seen }: {
  locked: boolean; interact: () => void; tourState: Tour; setTour: (t: Tour) => void;
  showAll: boolean; setShowAll: (v: boolean) => void; seen: Set<string>;
}) {
  const { reach } = useMilestones(interact, ["greedy", "sweep", "all-orders"]);
  const hops = tourState.kind === "greedy" ? GREEDY.slice(0, tourState.hops) : tourState.kind === "sweep" ? SWEEP : [];
  const longest = hops.length ? Math.max(...hops.map((h) => h.len)) : -1;
  const greedyHops = tourState.kind === "greedy" ? tourState.hops : 0;
  const drawGreedy = (k: number) => { setTour({ kind: "greedy", hops: k }); if (k === GREEDY.length) reach("greedy"); };
  const trace = [
    seen.has("greedy") ? `nearest-first ${GREEDY.map((h) => h.len).join("+")} = ${total(GREEDY)}` : null,
    seen.has("sweep") ? `out to 8 first: ${total(SWEEP)}` : null,
    seen.has("all-orders") ? `all 24: ${SHORTEST} to ${LONGEST}` : null,
  ].filter(Boolean).join(" · ");
  const name = tourState.kind === "sweep" ? "Out to 8 first" : tourState.kind === "greedy" ? `Nearest-first, ${greedyHops} of 5 hops` : "No tour";

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 340 150" className={`stage-svg ${s.svg}`} role="img"
        aria-label={`Road from -15 to 8 km, start at 0. ${name}: ${hops.map((h) => `${h.from} to ${h.to}, ${h.len} km`).join("; ") || "nothing drawn"}.`}>
        <line x1={X(-15)} y1={ROAD_Y} x2={X(8)} y2={ROAD_Y} className={s.road} />
        {hops.map((h, i) => <Arc key={i} hop={h} strong={h.len === longest} />)}
        {[0, ...TOWNS].map((km) => (
          <g key={km}>
            <rect x={X(km) - 11} y={ROAD_Y - 8} width={22} height={16} rx={5} className={km === 0 ? s.start : s.town} />
            <text x={X(km)} y={ROAD_Y + 4} textAnchor="middle" className={km === 0 ? s.startText : s.townText}>{km < 0 ? `−${-km}` : km}</text>
          </g>
        ))}
      </svg>
      <p className={s.legend}>km along the road · start and finish at 0</p>
      <Row>
        <Control disabled={locked || greedyHops === GREEDY.length} onClick={() => drawGreedy(GREEDY.length)}>Nearest-first tour</Control>
        <Control disabled={locked || tourState.kind === "sweep"} onClick={() => { setTour({ kind: "sweep" }); reach("sweep"); }}>Out to 8 first</Control>
        <Control disabled={locked || showAll} onClick={() => { setShowAll(true); reach("all-orders"); }}>Try all 24 orders</Control>
        <Control disabled={locked || greedyHops === GREEDY.length} onClick={() => drawGreedy(greedyHops + 1)}>Step</Control>
        <Control disabled={locked || (tourState.kind === "none" && !showAll)} onClick={() => { setTour({ kind: "none" }); setShowAll(false); }}>Reset</Control>
      </Row>
      <Row>
        <Readout label="Tour" value={hops.length ? `${total(hops)} km` : "–"} />
        <Readout label="All 24 orders" value={showAll ? `${SHORTEST} to ${LONGEST} km` : "–"} />
      </Row>
      <p className={s.trace}>{trace || " "}</p>
    </div>
  );
}

export default function NearestTownFirstDetours({ slug }: { slug: string }) {
  const [tourState, setTourState] = useState<Tour>({ kind: "none" });
  const [showAll, setShowAllState] = useState(false);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const mark = (m: string) => setSeen((p) => (p.has(m) ? p : new Set([...p, m])));
  const setTour = (t: Tour) => {
    setTourState(t);
    if (t.kind === "greedy" && t.hops === GREEDY.length) mark("greedy");
    if (t.kind === "sweep") mark("sweep");
  };
  const setShowAll = (v: boolean) => { setShowAllState(v); if (v) mark("all-orders"); };
  const hint = !seen.has("greedy") ? "Draw the nearest-first tour (or Step through it)."
    : !seen.has("sweep") ? "Now try driving out to 8 first."
    : !seen.has("all-orders") ? "Now try all 24 orders."
    : "Compare the tours in the trace.";

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Towns on one road at km −15, −3, 2 and 8. Start at 0, always drive to the nearest unvisited town, then return. Shortest?",
        options: ["Yes", "No, a tour about 5 km shorter exists", "No, a tour about 10 km shorter exists"],
        answer: 2,
      }}
      exploreHint={hint}
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Nearest-first took cheap hops of {GREEDY[0].len}, {GREEDY[1].len} and {GREEDY[2].len} km, then had to cross the whole road, <strong>{GREEDY[3].len} km</strong> from 8 to −15, and come back {GREEDY[4].len}: {total(GREEDY)} km. Driving out to 8 first and sweeping back cost <strong>{total(SWEEP)}</strong>. Of all 24 orders, nearest-first tied for the longest.
          </p>
          <p>
            Each greedy hop was the cheapest at that moment, but the far towns it put off all came due at the end. Route planners use tours like this only as a start and then repair them.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} tourState={tourState} setTour={setTour} showAll={showAll} setShowAll={setShowAll} seen={seen} />
      )}
    </Lesson>
  );
}

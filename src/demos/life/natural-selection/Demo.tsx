"use client";

// Natural selection as compounding. Each generation the dark beetles leave a
// slightly larger share of the young, and the young keep their parent's colour.
// The stage is always 100 beetles standing for the whole (very large)
// population; every generation they are new beetles. No beetle changes colour.
//
// v2 (revision): the reveal is gated on reaching generation 100 at the question's 10% edge.
// "Go to 100" makes that one press (the QA contract presses each control once); a strip under
// the bark draws the path the share took, so a jump still shows the slow start and the take-off.
// The edge is a row of chips (1, 5, 10, 20%) so "shrink it" is one tap, not a drag the wrong way.

import { useEffect, useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const START = 0.01;
const MAX_GEN = 150;
const TARGET_GEN = 100;
const QUESTION_EDGE = 10;
const EDGES = [1, 5, 10, 20];
const CELL = 30;
const MILESTONES = ["gen-100-at-10"] as const;

/** Share of dark beetles after g generations with relative edge e (deterministic, no drift). */
function darkShare(g: number, edgePct: number): number {
  const odds = (START / (1 - START)) * Math.pow(1 + edgePct / 100, g);
  return odds / (1 + odds);
}

// Numbers for the reveal, from the same function that draws the stage.
const GROWTH = Math.pow(1 + QUESTION_EDGE / 100, TARGET_GEN); // 13,781
const RATIO_AT_100 = Math.round((START / (1 - START)) * GROWTH); // about 139 dark to 1 pale
const AT_100 = Math.round(darkShare(TARGET_GEN, QUESTION_EDGE) * 100); // 99
const SMALL_EDGE_AT_100 = Math.round(darkShare(TARGET_GEN, 1) * 100); // 3
const UNDER_10_UNTIL = (() => {
  let g = 0;
  while (darkShare(g + 1, QUESTION_EDGE) < 0.1) g++;
  return g;
})(); // 25: generations 0..25 are under 10%

// Seeded order in which grid spots turn dark, plus a little jitter so it reads as a crowd.
const SPOTS = (() => {
  let x = 424242;
  const next = () => (x = (x * 48271) % 2147483647) / 2147483647;
  const order = Array.from({ length: 100 }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const rank = Array(100).fill(0);
  order.forEach((spot, r) => (rank[spot] = r));
  return Array.from({ length: 100 }, (_, i) => ({
    x: (i % 10) * CELL + CELL / 2 + (next() - 0.5) * 6,
    y: Math.floor(i / 10) * CELL + CELL / 2 + (next() - 0.5) * 6,
    turn: Math.round((next() - 0.5) * 50),
    rank: rank[i],
  }));
})();

/** Dark-to-pale ratio in words: "1 to 99" while dark is rarer, "139 to 1" once it is commoner. */
function ratioText(share: number): string {
  const q = share / (1 - share);
  if (q >= 1000) return "over 1,000 to 1";
  if (q >= 1) return `${q >= 100 ? Math.round(q) : q.toFixed(q >= 10 ? 0 : 1)} to 1`;
  return `1 to ${Math.round(1 / q)}`;
}

function Beetle({ x, y, turn, dark }: { x: number; y: number; turn: number; dark: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn})`} className={dark ? s.dark : s.pale}>
      <path d="M-7 -4 L-11 -7 M-7.5 1 L-12 1 M-7 5 L-11 9 M7 -4 L11 -7 M7.5 1 L12 1 M7 5 L11 9" className={s.legs} />
      <circle cx={0} cy={-10} r={4} className={s.head} />
      <ellipse cx={0} cy={1} rx={7.5} ry={10} className={s.body} />
      <line x1={0} y1={-8.5} x2={0} y2={10.5} className={s.seam} />
    </g>
  );
}

// The strip under the bark: share dark (0..100%) against generation (0..150).
const STRIP_Y = 308;
const STRIP_H = 44;
const gx = (g: number) => 8 + (g / MAX_GEN) * 284;
const sy = (p: number) => STRIP_Y + STRIP_H - p * STRIP_H;

function Gate({ interact, gen, edge }: { interact: () => void; gen: number; edge: number }) {
  const { reach } = useMilestones(interact, MILESTONES);
  useEffect(() => {
    if (gen >= TARGET_GEN && edge === QUESTION_EDGE) reach("gen-100-at-10");
  });
  return null;
}

/** Lifts the kit's phase so the reveal can show the state it describes (generation 100, 10% edge). */
function PhaseSync({ phase, onPhase }: { phase: string; onPhase: (p: string) => void }) {
  useEffect(() => onPhase(phase), [phase, onPhase]);
  return null;
}

export default function NaturalSelection({ slug }: { slug: string }) {
  const [genSet, setGen] = useState(0);
  const [edgeSet, setEdge] = useState(QUESTION_EDGE);
  const [phaseNow, setPhaseNow] = useState("predict");
  const inReveal = phaseNow === "reveal";
  const gen = inReveal ? TARGET_GEN : genSet;
  const edge = inReveal ? QUESTION_EDGE : edgeSet;
  const [smallSeen, setSmallSeen] = useState(false);
  const share = darkShare(gen, edge);
  const darkCount = Math.round(share * 100);
  const beetles = useMemo(() => SPOTS.map((b) => ({ ...b, dark: b.rank < darkCount })), [darkCount]);
  const pct = share >= 0.995 ? ">99%" : share < 0.1 ? `${(share * 100).toFixed(1)}%` : `${Math.round(share * 100)}%`;
  const path = useMemo(() => {
    const pts: string[] = [];
    for (let g = 0; g <= gen; g++) pts.push(`${g === 0 ? "M" : "L"}${gx(g).toFixed(1)} ${sy(darkShare(g, edge)).toFixed(1)}`);
    return pts.join(" ");
  }, [gen, edge]);

  useEffect(() => {
    if (edge === 1 && gen >= TARGET_GEN) setSmallSeen(true);
  }, [edge, gen]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "On sooty bark, birds spot pale beetles more easily, so dark ones leave 10% more young. Young keep their parent's colour. Dark starts at 1 in 100. After 100 generations, how many in 100 are dark?",
        options: ["About 2", "About 10", "About 50", "About 99"],
        answer: 3,
      }}
      exploreHint="Get to generation 100 at the 10% edge. Then try a 1% edge."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You reached generation {TARGET_GEN}: about <strong>{AT_100} in 100</strong> are dark. The start was 1 dark
            to 99 pale, the ratio on the stage. Every generation that ratio grows 1.1&times;, on top of the last. After {TARGET_GEN} generations
            it has grown 1.1<sup>100</sup> &asymp; 14,000&times;: about {RATIO_AT_100} dark to 1 pale. For the first{" "}
            {UNDER_10_UNTIL} generations it stays under 10%: the strip barely rises.
          </p>
          <p>
            No beetle changed colour. Each generation is new beetles, and more had dark parents.{" "}
            {smallSeen ? "You saw a 1% edge" : "A 1% edge"} only reach{smallSeen ? "" : "es"} about {SMALL_EDGE_AT_100}%
            in {TARGET_GEN} generations: selection needs time, not a big edge.
          </p>
          <p className="muted">
            Real case, as illustration only: near Manchester, dark peppered moths went from first recorded in 1848 to
            about 98% by 1895. This model ignores chance.
          </p>
        </>
      )}
    >
      {({ phase, locked: lockedPhase, interact }) => { const locked = lockedPhase || phase === "reveal"; return (
        <div className={s.wrap}>
          <PhaseSync phase={phase} onPhase={setPhaseNow} />
          <Gate interact={interact} gen={gen} edge={edge} />
          <p className={s.model}>Model: 100 beetles stand for a huge population. Each generation is all new.</p>
          <svg
            viewBox="0 0 300 356"
            className={`stage-svg ${s.svg}`}
            role="img"
            aria-label={`Generation ${gen}: ${darkCount} of 100 beetles are dark`}
          >
            <rect x={0} y={0} width={300} height={300} rx={12} className={s.bark} />
            {beetles.map((b, i) => (
              <Beetle key={i} {...b} />
            ))}
            <rect x={8} y={STRIP_Y} width={284} height={STRIP_H} className={s.strip} />
            <line x1={gx(TARGET_GEN)} y1={STRIP_Y} x2={gx(TARGET_GEN)} y2={STRIP_Y + STRIP_H} className={s.mark} />
            <text x={gx(TARGET_GEN) - 3} y={STRIP_Y + 11} textAnchor="end" className={s.stripText}>
              gen 100
            </text>
            <text x={12} y={STRIP_Y + 11} className={s.stripText}>
              % dark
            </text>
            <path d={path} className={s.curve} />
            <circle cx={gx(gen)} cy={sy(share)} r={3.5} className={s.dot} />
          </svg>

          <p className={s.msg} aria-live="polite">
            {lockedPhase
              ? "Make a prediction to start."
              : gen === 0
                ? "Generation 0: 1 in 100 beetles is dark."
                : `Generation ${gen}: ${pct} dark (dark to pale ${ratioText(share)}). Ratio × ${(1 + edge / 100).toFixed(2).replace(/0$/, "")} each generation.`}
          </p>

          <Row>
            <Slider
              label="Generations"
              value={gen}
              min={0}
              max={MAX_GEN}
              disabled={locked}
              onChange={(v) => setGen(v)}
            />
          </Row>
          <Row>
            <Control disabled={locked || gen >= MAX_GEN} onClick={() => setGen((g) => Math.min(MAX_GEN, g + 1))}>
              +1 gen
            </Control>
            <Control disabled={locked || gen >= MAX_GEN} onClick={() => setGen((g) => Math.min(MAX_GEN, g + 10))}>
              +10 gens
            </Control>
            <Control disabled={locked || gen === TARGET_GEN} onClick={() => setGen(TARGET_GEN)}>
              Go to 100
            </Control>
            <Readout label="Dark" value={pct} />
          </Row>
          <div className={s.edges} role="group" aria-label="Dark beetles' edge">
            <span className="muted small">Edge:</span>
            {EDGES.map((e) => (
              <Control
                key={e}
                className={e === edge ? "active" : ""}
                disabled={locked || e === edge}
                aria-pressed={e === edge}
                onClick={() => setEdge(e)}
              >
                +{e}%
              </Control>
            ))}
            <Control disabled={locked || gen === 0} onClick={() => setGen(0)}>
              Start over
            </Control>
          </div>
        </div>
      ); }}
    </Lesson>
  );
}

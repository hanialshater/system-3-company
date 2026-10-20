"use client";

// Homophily test (E&K ch. 4). A class of 30: 20 in group A (circles), 10 in group B (squares).
// 435 possible pairs, 20 x 10 = 200 cross groups (46%). The real class: 45 friendships, 9 crossing (20%).
// A random class: 45 friendships, each an independent uniformly random pair, so the number crossing is
// exactly Binomial(45, 200/435): mean 20.7, P(<= 9) = 0.000264, about 1 in 3,800 ("about 1 in 4,000").
// Generator: mulberry32(41) for random classes (not chosen for its result; builder's node run of the
// default sequence: first class 26 crossing, 1,001 classes with none <= 9, fewest 11);
// mulberry32(7) lays out the real class's friendships.
// v2 (r6 fatal): the reveal read the live tally, so after Start over it said "your 0 random classes … 0% … the
// fewest was 45". The largest run is now recorded when it is drawn and kept after Start over, in a "Your run"
// row the reveal quotes. The pairs yardstick is shown: "Count possible pairs" draws all 200 cross-group pairs
// (10 × 20) and keeps a "200 of 435 pairs" row; it is the first control and a milestone.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const NA = 20;
const NB = 10;
const PEOPLE = NA + NB;
const F = 45; // friendships
const REAL_CROSS = 9;
const SEED = 41;
const isA = (i: number) => i < NA;
const crosses = ([a, b]: [number, number]) => isA(a) !== isA(b);

const PAIRS: [number, number][] = [];
for (let i = 0; i < PEOPLE; i++) for (let j = i + 1; j < PEOPLE; j++) PAIRS.push([i, j]);
const CROSS_PAIRS = PAIRS.filter(crosses); // 200 of 435

// the real class: 9 crossing friendships, 36 within groups (28 in A, 8 in B), distinct pairs
const REAL: [number, number][] = (() => {
  const rng = mulberry32(7);
  const pick = (pool: [number, number][], n: number) => {
    const p = [...pool];
    for (let i = p.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    return p.slice(0, n);
  };
  const inA = PAIRS.filter(([a, b]) => isA(a) && isA(b));
  const inB = PAIRS.filter(([a, b]) => !isA(a) && !isA(b));
  return [...pick(inA, 28), ...pick(inB, 8), ...pick(CROSS_PAIRS, REAL_CROSS)];
})();

// layout: group A in a ring on the left, group B on the right
const POS = Array.from({ length: PEOPLE }, (_, i) => {
  if (isA(i)) {
    const t = (2 * Math.PI * i) / NA;
    return { x: 92 + 56 * Math.cos(t), y: 68 + 56 * Math.sin(t) };
  }
  const t = (2 * Math.PI * (i - NA)) / NB;
  return { x: 246 + 40 * Math.cos(t), y: 68 + 40 * Math.sin(t) };
});

type Tally = { draws: number; sum: number; min: number; low: number; hist: number[] };
type Rec = { draws: number; avg: number; min: number; low: number };
const EMPTY: Tally = { draws: 0, sum: 0, min: F, low: 0, hist: Array(F + 1).fill(0) };

const HX0 = 22;
const HB = 9; // bin width for counts 5..35
const H_LO = 5;
const H_HI = 35;
const hx = (c: number) => HX0 + (c - H_LO) * HB;

export default function FriendsSplitMoreThanChance({ slug }: { slug: string }) {
  const rngRef = useRef(mulberry32(SEED));
  const [view, setView] = useState<"real" | "random" | "pairs">("real");
  const [rec, setRec] = useState<Rec | null>(null); // the largest run, kept after Start over
  const [counted, setCounted] = useState(false);
  const [last, setLast] = useState<[number, number][]>([]);
  const [tally, setTally] = useState<Tally>(EMPTY);

  const edges = view === "real" ? REAL : view === "pairs" ? CROSS_PAIRS : last;
  const nCross = edges.filter(crosses).length;
  const avg = tally.draws ? tally.sum / tally.draws / F : 0;
  const maxBin = Math.max(1, ...tally.hist);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Class of 30: 20 in one group, 10 in the other. It has 45 friendships; 9 cross groups (20%). If friendships ignored group, what share would cross groups?",
        options: ["About 33%", "About 46%", "About 20%"],
        answer: 1,
      }}
      exploreHint="Draw random classes where friendships ignore group, then compare them with the real one."
      minInteractions={3}
      reveal={() => (
        <>
          {rec && (
            <p>
              Your {rec.draws.toLocaleString("en-US")} random classes crossed groups {Math.round(rec.avg * 100)}% of the time on
              average, close to the {CROSS_PAIRS.length} of {PAIRS.length} possible pairs that cross (
              {Math.round((100 * CROSS_PAIRS.length) / PAIRS.length)}%). The real class crosses 20%. {rec.low === 0 ? "None" : rec.low}{" "}
              of your random classes had 9 or fewer; the fewest was {rec.min}. The exact chance is about 1 in 4,000.
            </p>
          )}
          <p>
            The yardstick is pairs, not people: each of the {NB} can pair with {NA} people in the other group, the{" "}
            {NB} × {NA} = {CROSS_PAIRS.length} lines you counted. For large groups of 2/3 and 1/3 it is 2 × 2/3 × 1/3, about 44%.
          </p>
          <p>So the gap between 46% and 20%, not the 20% alone, is the evidence that friends sort by group.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["pairs", "drew", "many"]}>
          {(reach) => {
            const drawClasses = (n: number) => {
              if (locked) return;
              const rng = rngRef.current;
              const hist = [...tally.hist];
              let { sum, min, low } = tally;
              let e: [number, number][] = [];
              for (let d = 0; d < n; d++) {
                e = [];
                let x = 0;
                for (let f = 0; f < F; f++) {
                  const p = PAIRS[Math.floor(rng() * PAIRS.length)];
                  e.push(p);
                  if (crosses(p)) x++;
                }
                hist[x]++;
                sum += x;
                if (x < min) min = x;
                if (x <= REAL_CROSS) low++;
              }
              const draws = tally.draws + n;
              setTally({ draws, sum, min, low, hist });
              if (!rec || draws > rec.draws) setRec({ draws, avg: sum / draws / F, min, low });
              setLast(e);
              setView("random");
              reach("drew");
              if (draws >= 1000) reach("many");
            };
            const restart = () => {
              if (locked) return;
              rngRef.current = mulberry32(SEED);
              setTally(EMPTY);
              setLast([]);
              setView("real");
            };
            const countPairs = () => {
              if (locked) return;
              setView("pairs");
              setCounted(true);
              reach("pairs");
            };
            return (
              <div className={s.wrap}>
                <p className={s.note}>
                  {view === "pairs"
                    ? `Possible pairs across: each of the ${NB} with each of the ${NA} = ${CROSS_PAIRS.length} of ${PAIRS.length}`
                    : `${view === "real" ? "Real class" : `Random class #${tally.draws.toLocaleString("en-US")}`}: ${nCross} of ${F} cross groups (${Math.round((nCross / F) * 100)}%)`}
                </p>
                <svg viewBox="0 0 320 136" className="stage-svg" role="img" aria-label={`${nCross} of ${F} friendships cross groups`}>
                  {edges.map(([a, b], i) => (
                    <line
                      key={`${view}-${i}`}
                      x1={POS[a].x}
                      y1={POS[a].y}
                      x2={POS[b].x}
                      y2={POS[b].y}
                      stroke={crosses([a, b]) ? "var(--domain)" : "var(--muted)"}
                      strokeWidth={view === "pairs" ? 0.6 : crosses([a, b]) ? 2 : 1}
                      opacity={view === "pairs" ? 0.5 : crosses([a, b]) ? 0.95 : 0.55}
                    />
                  ))}
                  {POS.map((p, i) =>
                    isA(i) ? (
                      <circle key={i} cx={p.x} cy={p.y} r={5} fill="var(--fg)" />
                    ) : (
                      <rect key={i} x={p.x - 5} y={p.y - 5} width={10} height={10} fill="var(--good)" />
                    ),
                  )}
                </svg>
                <p className={s.legend}>
                  <span>● group of 20</span> <span className={s.sq}>■ group of 10</span> <span className={s.cr}>— crosses</span>
                </p>
                <svg viewBox="0 0 320 78" className="stage-svg" role="img" aria-label={`Random classes drawn: ${tally.draws}`}>
                  <text x={HX0} y={10} className={s.cap}>
                    random classes: how many friendships cross groups
                  </text>
                  {tally.hist.map((v, c) =>
                    c >= H_LO && c <= H_HI && v > 0 ? (
                      <rect
                        key={c}
                        x={hx(c) - HB / 2 + 0.5}
                        y={62 - (44 * v) / maxBin}
                        width={HB - 1}
                        height={(44 * v) / maxBin}
                        fill="var(--domain)"
                        opacity={0.8}
                      />
                    ) : null,
                  )}
                  <line x1={HX0 - 6} y1={62} x2={hx(H_HI) + 6} y2={62} stroke="var(--line)" />
                  <line x1={hx(REAL_CROSS)} y1={16} x2={hx(REAL_CROSS)} y2={64} stroke="var(--bad)" strokeWidth={2} />
                  <text x={hx(REAL_CROSS) + 4} y={24} className={s.real}>
                    real class: 9
                  </text>
                  {[10, 20, 30].map((t) => (
                    <text key={t} x={hx(t)} y={74} textAnchor="middle" className={s.tick}>
                      {t}
                    </text>
                  ))}
                </svg>
                <Row>
                  <Control disabled={locked || view === "pairs"} onClick={countPairs}>
                    Count possible pairs
                  </Control>
                  <Control disabled={locked} onClick={() => drawClasses(1)}>
                    Draw a random class
                  </Control>
                  <Control disabled={locked} onClick={() => drawClasses(1000)}>
                    Draw 1,000 more
                  </Control>
                  <Control disabled={locked || view === "real"} onClick={() => !locked && setView("real")}>
                    Show the real class
                  </Control>
                  <Control disabled={locked || tally.draws === 0} onClick={restart}>
                    Start over
                  </Control>
                </Row>
                <Row>
                  <Readout label="Random classes" value={tally.draws.toLocaleString("en-US")} />
                  <Readout label="Average crossing" value={tally.draws ? `${Math.round(avg * 100)}%` : "–"} />
                  <Readout label="With 9 or fewer" value={tally.low} />
                </Row>
                <p className={s.legend}>
                  {locked
                    ? ""
                    : [
                        ...(counted ? [`Pairs across: ${NB} × ${NA} = ${CROSS_PAIRS.length} of ${PAIRS.length} (${Math.round((100 * CROSS_PAIRS.length) / PAIRS.length)}%)`] : []),
                        ...(rec ? [`Your run: ${rec.draws.toLocaleString("en-US")} classes, avg ${Math.round(rec.avg * 100)}%, ${rec.low} with 9 or fewer, fewest ${rec.min}`] : []),
                      ].join(" · ")}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

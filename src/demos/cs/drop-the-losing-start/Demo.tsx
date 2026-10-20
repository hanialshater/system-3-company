"use client";

// Best stretch of days. The learner walks a 9-day row, one day at a time, and decides when to drop
// the stretch so far ("start over"). Two lines on a fixed-axis chart: "Kept everything" (never
// starts over) and "Your total" (drops to 0 at each start-over). The 45-stretch triangle appears
// only after a finished walk, as the check against the slow method. The target (6) is never drawn
// before the learner reaches it: the axis is fixed and no best marker exists at predict.

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const G = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const N = G.length;

// Brute force over all start/end pairs (the slow method), computed once.
const PAIR = (() => {
  const m: number[][] = []; // m[end][start]
  for (let e = 0; e < N; e++) {
    m[e] = [];
    for (let st = 0; st <= e; st++) m[e][st] = G.slice(st, e + 1).reduce((a, b) => a + b, 0);
  }
  return m;
})();
const ALL = PAIR.flat();
const BEST_ALL = Math.max(...ALL);

type Flag = 0 | 1 | 2; // none, manual, auto
type Walk = { day: number; flags: Flag[]; auto: boolean };
type Ghost = { n: number; pts: [number, number][]; best: number };

const sg = (v: number) => (v < 0 ? `−${-v}` : `${v}`);

/** Everything the stage shows, derived from the day and the start-over flags. */
function derive(w: Walk) {
  let t = 0;
  let kept = 0;
  let best = -Infinity;
  let bestDay = 0;
  let bestStart = 0;
  let keptBest = -Infinity;
  const pts: [number, number][] = [[0, 0]];
  const keptPts: [number, number][] = [[0, 0]];
  const drops: { day: number; amount: number; auto: boolean; from: number }[] = [];
  let stretchStart = 0; // 0-based start of the current stretch
  for (let d = 1; d <= w.day; d++) {
    t += G[d - 1];
    kept += G[d - 1];
    keptBest = Math.max(keptBest, kept);
    pts.push([d, t]);
    keptPts.push([d, kept]);
    if (t > best) {
      best = t;
      bestDay = d;
      bestStart = stretchStart + 1;
    }
    if (w.flags[d]) {
      drops.push({ day: d, amount: t, auto: w.flags[d] === 2, from: stretchStart + 1 });
      pts.push([d, 0]);
      t = 0;
      stretchStart = d;
    }
  }
  return { total: t, best: w.day ? best : null, bestDay, bestStart, keptBest: w.day ? keptBest : null, pts, keptPts, drops, stretchStart };
}

/** Add the next day; with auto on, a day that leaves the total below 0 is followed by a start-over. */
function advance(w: Walk): Walk {
  if (w.day >= N) return w;
  const day = w.day + 1;
  const flags = [...w.flags];
  const sum = derive({ ...w, day, flags }).total;
  if (w.auto && sum < 0) flags[day] = 2;
  return { ...w, day, flags };
}

const X0 = 30;
const XW = 260;
const PLOT_TOP = 10;
const PLOT_H = 160;
const YMIN = -6;
const YMAX = 12;
const px = (d: number) => X0 + (d * XW) / N;
const py = (v: number) => PLOT_TOP + ((YMAX - v) * PLOT_H) / (YMAX - YMIN);
const line = (p: [number, number][]) => p.map(([d, v]) => `${px(d).toFixed(1)},${py(v).toFixed(1)}`).join(" ");

const TILE = 34;
const SX = 14;

type Snap = { drops: { day: number; amount: number }[]; bestStart: number; bestDay: number };

function Stage({
  locked,
  phase,
  interact,
  onSnap,
}: {
  locked: boolean;
  phase: string;
  interact: () => void;
  onSnap: (s: Snap) => void;
}) {
  const [w, setW] = useState<Walk>({ day: 0, flags: [], auto: false });
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const [walks, setWalks] = useState(1);
  const [checked, setChecked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { reach } = useMilestones(interact, ["best-found", "checked"]);

  const d = derive(w);
  const atEnd = w.day >= N;
  const anyDrop = d.drops.length > 0;

  // Milestone: a finished walk whose best equals the best of all 45 stretches (computed, never shown before then).
  useEffect(() => {
    if (atEnd && d.best === BEST_ALL) {
      reach("best-found");
      onSnap({ drops: d.drops.map((x) => ({ day: x.day, amount: x.amount })), bestStart: d.bestStart, bestDay: d.bestDay });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atEnd, d.best, w.flags.join(",")]);

  // Play to day 9 under the current rule, one day per tick.
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setW((p) => advance(p)), 45);
    return () => clearInterval(id);
  }, [playing]);
  useEffect(() => {
    if (playing && atEnd) setPlaying(false);
  }, [playing, atEnd]);

  const busy = locked || playing;
  const inReveal = phase === "reveal";
  const next = () => {
    if (busy || atEnd) return;
    setW(advance(w));
  };
  const startOver = () => {
    if (busy || w.day < 1 || w.day >= N || d.total === 0) return;
    const flags = [...w.flags];
    flags[w.day] = 1;
    setW({ ...w, flags });
  };
  const toggleAuto = () => {
    if (busy || atEnd) return;
    const auto = !w.auto;
    const flags = [...w.flags];
    if (auto && w.day >= 1 && w.day < N && d.total < 0) flags[w.day] = 2;
    setW({ ...w, auto, flags });
  };
  const play = () => {
    if (busy || atEnd) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      let x = w;
      while (x.day < N) x = advance(x);
      setW(x);
    } else setPlaying(true);
  };
  const walkAgain = () => {
    if (busy || !atEnd) return;
    setGhosts([...ghosts, { n: walks, pts: d.pts, best: d.best ?? 0 }].slice(-2));
    setWalks(walks + 1);
    setW({ day: 0, flags: [], auto: false });
    setChecked(false);
  };
  const checkAll = () => {
    if (busy || !atEnd || !anyDrop || checked) return;
    setChecked(true);
    if (d.best === BEST_ALL) reach("checked");
  };

  // Which stretch is dropped / current, for the strip.
  const dropped = (day: number) => d.drops.some((x) => day > x.from - 1 && day <= x.day);
  const curFrom = d.stretchStart + 1;

  const msg = locked
    ? "Make a prediction to start."
    : playing
      ? ""
      : atEnd
        ? d.best === BEST_ALL
          ? checked
            ? `Your best ${d.best} matches the ${ALL.length} stretches.`
            : `Day 9. Your best is ${d.best}.`
          : `Your best is ${d.best}. Walk again?`
        : w.day === 0
          ? "Press Next day to walk the row."
          : "";

  const readout = locked
    ? "Day 0 · Total ? · Best ?"
    : `Day ${w.day} · Total ${sg(d.total)} · Best ${d.best === null ? "?" : sg(d.best)}`;

  const bestPt = d.best === null ? null : { x: px(d.bestDay), y: py(d.best) };
  const bestDays = d.best === null ? "" : d.bestStart === d.bestDay ? `day ${d.bestDay}` : `days ${d.bestStart}–${d.bestDay}`;

  // Cell shading for the 45-stretch triangle.
  const ringCell = d.best === null ? null : { r: d.bestDay - 1, c: d.bestStart - 1 };

  return (
    <div className={s.wrap}>
      <p className={s.model}>Running total of consecutive days. Start over drops the stretch so far.</p>
      <svg viewBox="0 0 340 62" className="stage-svg" role="img" aria-label="Daily gains for nine days">
        {d.best !== null && !locked && w.day > 0 && (
          <g>
            <path
              d={`M${SX + (curFrom - 1) * TILE + 2},12 V6 H${SX + w.day * TILE - 2} V12`}
              fill="none"
              stroke="var(--fg)"
              strokeWidth={1.5}
              opacity={d.total === 0 && w.flags[w.day] ? 0 : 1}
            />
          </g>
        )}
        {G.map((v, i) => {
          const day = i + 1;
          const grey = dropped(day);
          const now = day === w.day;
          return (
            <g key={day} opacity={grey ? 0.4 : 1}>
              <rect
                x={SX + i * TILE + 1}
                y={14}
                width={TILE - 3}
                height={28}
                rx={5}
                fill={now ? "color-mix(in srgb, var(--domain) 25%, var(--bg-2))" : "var(--bg-2)"}
                stroke={now ? "var(--domain)" : "var(--line)"}
                strokeWidth={now ? 2 : 1}
              />
              <text x={SX + i * TILE + (TILE - 3) / 2 + 1} y={32} textAnchor="middle" className={`${s.gain} ${v < 0 ? s.neg : ""}`}>
                {sg(v)}
              </text>
            </g>
          );
        })}
        {d.drops.map((x) => (
          <text key={x.day} x={SX + x.day * TILE - 2} y={55} textAnchor="end" className={s.small}>
            dropped {sg(x.amount)}
          </text>
        ))}
      </svg>

      <svg
        viewBox="0 0 340 196"
        className="stage-svg"
        role="img"
        aria-label={
          atEnd && !locked
            ? `Day 9: your best ${d.best}, ${bestDays}; kept everything best ${d.keptBest}`
            : `Chart of the running total, day ${w.day} of 9`
        }
      >
        {[-4, 0, 4, 8, 12].map((v) => (
          <g key={v}>
            <line x1={X0} x2={X0 + XW} y1={py(v)} y2={py(v)} stroke={v === 0 ? "var(--fg)" : "var(--line)"} strokeWidth={v === 0 ? 1 : 0.5} />
            <text x={X0 - 4} y={py(v) + 3} textAnchor="end" className={s.axis}>
              {sg(v)}
            </text>
          </g>
        ))}
        {[0, 3, 6, 9].map((v) => (
          <text key={v} x={px(v)} y={PLOT_TOP + PLOT_H + 12} textAnchor="middle" className={s.axis}>
            {v}
          </text>
        ))}
        <text x={X0 + XW / 2} y={PLOT_TOP + PLOT_H + 24} textAnchor="middle" className={s.axis}>
          Day
        </text>
        <text x={4} y={8} className={s.axis}>
          Total
        </text>
        {ghosts.map((g) => (
          <polyline key={g.n} points={line(g.pts)} fill="none" stroke="var(--muted)" strokeWidth={1} opacity={0.8} />
        ))}
        {!locked && w.day > 0 && (
          <>
            <polyline points={line(d.keptPts)} fill="none" stroke="var(--muted)" strokeWidth={2} strokeDasharray="5 4" />
            <polyline points={line(d.pts)} fill="none" stroke="var(--fg)" strokeWidth={2.5} strokeLinejoin="round" />
            {d.drops.map((x) => (
              <g key={x.day}>
                <text
                  x={px(x.day) + 4}
                  y={x.amount < 0 ? py(x.amount) + 10 : py(x.amount) - 4}
                  className={s.lbl}
                >
                  dropped {sg(x.amount)}
                  {x.auto ? " (auto)" : ""}
                </text>
              </g>
            ))}
          </>
        )}
        {bestPt && !locked && (
          <g>
            <circle cx={bestPt.x} cy={bestPt.y} r={4.5} fill="var(--good)" stroke="var(--fg)" strokeWidth={1.5} />
            <text x={X0 + XW + 6} y={bestPt.y + 1} className={s.legend}>
              Best {sg(d.best ?? 0)}
            </text>
            <text x={X0 + XW + 6} y={bestPt.y + 11} className={s.small}>
              {bestDays}
            </text>
          </g>
        )}
        <g>
          <line x1={X0 + 4} x2={X0 + 22} y1={PLOT_TOP + 6} y2={PLOT_TOP + 6} stroke="var(--fg)" strokeWidth={2.5} />
          <text x={X0 + 26} y={PLOT_TOP + 9} className={s.legend}>
            Your total
          </text>
          <line x1={X0 + 86} x2={X0 + 104} y1={PLOT_TOP + 6} y2={PLOT_TOP + 6} stroke="var(--muted)" strokeWidth={2} strokeDasharray="5 4" />
          <text x={X0 + 108} y={PLOT_TOP + 9} className={s.legend}>
            Kept everything
          </text>
          {ghosts.map((g, i) => (
            <text key={g.n} x={X0 + 4 + i * 100} y={PLOT_TOP + 22} className={s.small}>
              walk {g.n}: best {sg(g.best)}
            </text>
          ))}
        </g>
      </svg>

      <p className={s.readout}>{readout}</p>
      <p className={s.model}>{w.auto ? "Rule: start over whenever the total goes below 0." : "Rule: you choose when to start over."}</p>
      <p className={`${s.msg} ${atEnd && d.best === BEST_ALL ? s.good : ""}`} aria-live="polite">
        {msg}
      </p>
      <Row>
        <Control className={s.tap} disabled={busy || !atEnd || inReveal} onClick={walkAgain}>
          Walk again
        </Control>
        <Control className={s.tap} disabled={busy || atEnd} onClick={next}>
          Next day
        </Control>
        <Control className={s.tap} disabled={busy || w.day < 1 || atEnd || d.total === 0} onClick={startOver}>
          Start over
        </Control>
      </Row>
      <Row>
        <Control className={`${s.tap} ${w.auto ? "active" : ""}`} aria-pressed={w.auto} disabled={busy || atEnd} onClick={toggleAuto}>
          Auto: start over below 0
        </Control>
        <Control className={s.tap} disabled={busy || atEnd} onClick={play}>
          Play to day 9
        </Control>
        <Control className={s.tap} disabled={busy || !atEnd || !anyDrop || checked} onClick={checkAll}>
          Check all 45 stretches
        </Control>
      </Row>

      {checked && (
        <svg viewBox="0 0 340 204" className="stage-svg" role="img" aria-label={`All ${ALL.length} stretches; the largest total is ${BEST_ALL}`}>
          <text x={26} y={10} className={s.axis}>
            start →
          </text>
          <text x={2} y={22} className={s.axis}>
            end
          </text>
          {Array.from({ length: N }, (_, c) => (
            <text key={c} x={46 + c * 19 + 9} y={22} textAnchor="middle" className={s.axis}>
              {c + 1}
            </text>
          ))}
          {PAIR.map((row, r) =>
            row.map((v, c) => {
              const isMax = v === BEST_ALL;
              const shade = Math.max(0, Math.min(1, v / BEST_ALL)) * 80;
              const x = 46 + c * 19;
              const y = 28 + r * 19;
              return (
                <g key={`${r}-${c}`}>
                  <rect
                    x={x}
                    y={y}
                    width={18}
                    height={18}
                    fill={`color-mix(in srgb, var(--domain) ${shade}%, var(--bg-2))`}
                    stroke={isMax ? "var(--fg)" : "var(--line)"}
                    strokeWidth={isMax ? 2.5 : 0.5}
                  />
                  <text x={x + 9} y={y + 12} textAnchor="middle" className={s.cellnum}>
                    {sg(v)}
                  </text>
                </g>
              );
            }),
          )}
          {Array.from({ length: N }, (_, r) => (
            <text key={r} x={42} y={28 + r * 19 + 12} textAnchor="end" className={s.axis}>
              {r + 1}
            </text>
          ))}
          {ringCell && (
            <circle cx={46 + ringCell.c * 19 + 9} cy={28 + ringCell.r * 19 + 9} r={13} fill="none" stroke="var(--good)" strokeWidth={2.5} />
          )}
          <text x={210} y={60} className={s.legend}>
            {ALL.length} stretches checked
          </text>
        </svg>
      )}
    </div>
  );
}

function startOverLog(drops: { day: number; amount: number }[]) {
  const parts = drops.map((x) => `${sg(x.amount)} after day ${x.day}`);
  return parts.length <= 1 ? parts.join("") : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

export default function DropTheLosingStart({ slug }: { slug: string }) {
  // The reveal quotes the walk the learner actually finished at the best total.
  const [snap, setSnap] = useState<Snap | null>(null);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Over nine days your market stall's daily gains were -2 1 -3 4 -1 2 1 -5 4. What is the biggest total you made over a run of consecutive days?",
        options: ["4", "6", "12"],
        answer: 1,
      }}
      exploreHint="Walk the days. Drop a stretch when you think it has become a burden, then check all 45."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {snap ? (
              <>
                You dropped {startOverLog(snap.drops)}, then days {snap.bestStart} to {snap.bestDay} climbed to{" "}
                <strong>{BEST_ALL}</strong>.
              </>
            ) : (
              <>Your walk climbed to {BEST_ALL}.</>
            )}{" "}
            The line that kept everything never got above 2.
          </p>
          <p>
            A stretch that has gone negative can only drag down what follows, so dropping it never loses the best. Your one
            pass over 9 days found the same {BEST_ALL} as checking all {ALL.length} stretches.
          </p>
          <p className="muted">This is Kadane&apos;s algorithm.</p>
        </>
      )}
    >
      {({ locked, phase, interact }) => <Stage locked={locked} phase={phase} interact={interact} onSnap={(x) => setSnap((p) => (p && JSON.stringify(p) === JSON.stringify(x) ? p : x))} />}
    </Lesson>
  );
}

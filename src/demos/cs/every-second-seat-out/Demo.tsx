"use client";

// Josephus with every second person out. n people in a circle, seats 1..n. The count starts on seat 1: skip one,
// remove the next, round and round. 41 -> survivor 19. Key frame: after 9 removals 32 (a power of two) are left
// and the count starts on 19, so 19 survives (each lap of an even circle removes half and comes back to the
// starter). Binary: 41 = 101001, move the leading 1 to the end: 010011 = 19.
// Storyboard / scrub: the circle plus a scrubber over the removals made so far (it never computes ahead).
// Spec: company/design/specs/every-second-seat-out.md.
// v2 (r6): "Run to a power of two left" is a required step (milestone pow-41) and leaves a formula line on stage
// (41 = 32 + 9 → 2 × 9 + 1 = 19); after the run the stage lists who the count starts on at 32, 16, 8, 4, 2 left,
// and the binary rotation. Readouts carry n = 2^m + L. The reveal quotes the readouts and the current circle.
// v3 (W-267, phone fit at 390x844): compact stage. The three step buttons share one three-column row ("Run to a
// power of 2"), the size chips are one three-column row with each circle's result on a line right under its chip
// (no separate readout boxes, no "People" label), the scrubber label sits beside the track, the rule line is one
// line, the tick labels tuck under the track, and the reveal is 81 words (was 88). The circle, both formula lines, the ticks and the results stay.
// v4 (phone fit, build 6 measured crop 175 px with seats 10 and 41 off screen): the three step buttons stand in a
// column beside the circle, the circle's seat labels are 14 units (so the card can fit it down to the 10 px floor)
// in a tighter viewBox, the binary rotation moved from the second formula line into the circle's centre, the rule
// line is gone (the question states the rule), and gaps are 2 px. Measured crop 0 at 390x844; reveal unchanged.
// v5 (W-447, design review 2026-10-14): the circle is a fixed 232 px in every phase (lesson CSS: width, max-width,
// flex: none), so the kit's reveal rule no longer grows it from 218 to 250 px past the stage; seat labels 14 -> 15.5
// units and the survivor star 14 -> 16, so they render at 11.1 px at 390 px in predict, explore and reveal (was 9.4).
// Replays are paced by elapsed time, so they end within 360 ms on a slow device too. Text and reveal unchanged.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const SIZES = [7, 10, 41];
const QUESTION_N = 41;

type Frame = { standing: number[]; skip: number }; // seats standing, seat the count starts on
type Game = { frames: Frame[]; order: number[]; survivor: number; powFrame: number; lapFrame: number; pow: number; laps: { left: number; skip: number }[] };

function play(n: number): Game {
  const ring = Array.from({ length: n }, (_, i) => i + 1);
  let at = 0; // index in ring of the person the count starts on (skipped)
  const frames: Frame[] = [{ standing: [...ring], skip: ring[at] }];
  const order: number[] = [];
  let powFrame = -1;
  while (ring.length > 1) {
    const r = (at + 1) % ring.length;
    order.push(ring[r]);
    ring.splice(r, 1);
    at = r % ring.length;
    frames.push({ standing: [...ring], skip: ring[at] });
    if (powFrame < 0 && (ring.length & (ring.length - 1)) === 0) powFrame = order.length;
  }
  // Every frame from powFrame on with a power of two (>= 2) left: who the count starts on.
  const laps = frames
    .slice(powFrame)
    .filter((f) => f.standing.length >= 2 && (f.standing.length & (f.standing.length - 1)) === 0)
    .map((f) => ({ left: f.standing.length, skip: f.skip }));
  return { frames, order, survivor: ring[0], powFrame, lapFrame: Math.floor(n / 2), pow: n - powFrame, laps };
}
const GAMES = new Map(SIZES.map((n) => [n, play(n)]));
const G41 = GAMES.get(QUESTION_N) as Game;
const bin = (x: number) => x.toString(2);
const rotated = (x: number) => {
  const b = bin(x);
  return b.slice(1) + b[0];
};

const C = 170; // centre
const R_DOT = 125;
const R_NUM = 147;
const pos = (seat: number, n: number, r: number) => {
  const t = -Math.PI / 2 + (2 * Math.PI * (seat - 1)) / n;
  return [C + r * Math.cos(t), C + r * Math.sin(t)];
};

export default function EverySecondSeatOut({ slug }: { slug: string }) {
  const [n, setN] = useState(QUESTION_N);
  const [made, setMade] = useState(0); // removals computed so far
  const [view, setView] = useState(0); // removal the scrubber shows (<= made)
  const [busy, setBusy] = useState(false);
  const [table, setTable] = useState<Record<number, number>>({});
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  const game = GAMES.get(n) as Game;
  const last = n - 1; // removals in a full game
  const finished = made >= last;
  const f = game.frames[view];
  const standing = new Set(f.standing);
  const left = f.standing.length;
  const end = left === 1;
  const keyFrames = (
    game.lapFrame === game.powFrame
      ? [{ t: game.powFrame, label: `${n - game.powFrame} left · lap 1 done` }]
      : [
          { t: game.powFrame, label: `${n - game.powFrame} left` },
          { t: game.lapFrame, label: "lap 1 done" },
        ]
  ).filter((k) => k.t > 0 && k.t <= made);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${QUESTION_N} people stand in a circle numbered 1 to ${QUESTION_N}. Starting at 1, every second person is removed (2, 4, ... then round again) until one is left. Which number survives?`,
        options: ["1", "19", "41"],
        answer: 1,
      }}
      exploreHint="Step to a power of two left, then run to the end."
      minInteractions={2}
      reveal={() => {
        const others = SIZES.filter((x) => x !== QUESTION_N && table[x] !== undefined);
        const g = GAMES.get(n) as Game;
        const cur = table[n] !== undefined ? g : G41;
        const cn = table[n] !== undefined ? n : QUESTION_N;
        const lefts = (x: Game) => x.laps.map((l) => l.left).join(", ");
        const start41 = G41.frames[G41.powFrame].skip;
        return (
          <>
            <p>
              {G41.survivor} survived. {QUESTION_N} = {G41.pow} + {G41.powFrame}: after {G41.powFrame} removals the count started on 2 ×{" "}
              {G41.powFrame} + 1 = {start41}
              {cn === QUESTION_N
                ? ` and stayed on ${start41} at ${lefts(G41)} left.`
                : `. On your ${cn} circle it started on ${cur.laps[0].skip} at ${lefts(cur)} left.`}
            </p>
            <p>
              A power of two halves each lap and comes back to the starter, so the starter survives. In binary,{" "}
              {bin(cn)} with its leading 1 moved to the end is {rotated(cn)} = {cur.survivor}.
              {others.length ? ` ${others.map((x) => `${x} = ${(GAMES.get(x) as Game).pow} + ${(GAMES.get(x) as Game).powFrame} gave ${table[x]}`).join(", ")}: the same rule.` : ""}
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["pow-41", "survivor-41"]}>
          {(reach) => {
            const finish = (nn: number) => {
              setTable((t) => ({ ...t, [nn]: (GAMES.get(nn) as Game).survivor }));
              if (nn === QUESTION_N) reach("survivor-41");
            };
            const replay = (nn: number, from: number, stop?: number) => {
              if (timer.current) clearInterval(timer.current);
              const to = stop ?? nn - 1;
              const done = () => {
                if (nn === QUESTION_N && to >= (GAMES.get(nn) as Game).powFrame) reach("pow-41");
                if (to >= nn - 1) finish(nn);
              };
              const reduced =
                typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
              if (reduced || from >= to) {
                setMade(to);
                setView(to);
                done();
                return;
              }
              setBusy(true);
              const ms = Math.max(4, Math.min(9, Math.floor(360 / (to - from))));
              // Paced by the clock, not by tick count, so a slow device still ends the replay on time (<= 360 ms).
              const t0 = performance.now();
              timer.current = setInterval(() => {
                const t = Math.min(to, from + Math.max(1, Math.floor((performance.now() - t0) / ms)));
                setMade(t);
                setView(t);
                if (t >= to) {
                  if (timer.current) clearInterval(timer.current);
                  timer.current = null;
                  setBusy(false);
                  done();
                }
              }, ms);
            };
            const removeNext = () => {
              if (locked || busy || finished) return;
              const t = made + 1;
              setMade(t);
              setView(t);
              if (n === QUESTION_N && t >= game.powFrame) reach("pow-41");
              if (t >= last) finish(n);
            };
            const runToPow = () => {
              if (locked || busy || made >= game.powFrame) return;
              replay(n, made, game.powFrame);
            };
            const runToEnd = () => {
              if (locked || busy || finished) return;
              replay(n, made);
            };
            const scrub = (v: number) => {
              if (locked || busy) return;
              setView(Math.max(0, Math.min(made, v)));
            };
            const pick = (nn: number) => {
              if (locked || busy || nn === n) return;
              setN(nn);
              setMade(0);
              setView(0);
              if (finished) replay(nn, 0);
            };

            const label = end
              ? `${n} people, ${f.standing[0]} survives`
              : `${n} people, ${left} left, next skip ${f.skip}`;
            const [px, py] = pos(f.skip, n, R_DOT - 30);
            const [qx, qy] = pos(f.skip, n, R_DOT - 13);
            const frac = (t: number) => (made > 0 ? t / made : 0);

            return (
              <div className={s.wrap}>
                <div className={s.top}>
                <svg viewBox="8 8 324 324" className={`stage-svg ${s.svg}`} role="img" aria-label={label} data-view={view}>
                  <circle cx={C} cy={C} r={R_DOT} fill="none" stroke="var(--line)" strokeWidth={1} />
                  {Array.from({ length: n }, (_, i) => i + 1).map((seat) => {
                    const [x, y] = pos(seat, n, R_DOT);
                    const [tx, ty] = pos(seat, n, R_NUM);
                    const up = standing.has(seat);
                    const isSkip = up && !end && seat === f.skip;
                    const isSurvivor = end && up;
                    return (
                      <g key={seat}>
                        {isSurvivor ? (
                          <>
                            <circle cx={x} cy={y} r={13} fill="var(--domain)" stroke="var(--fg)" strokeWidth={2} />
                            <text x={x} y={y + 5} textAnchor="middle" className={s.star}>
                              ★
                            </text>
                          </>
                        ) : up ? (
                          <circle
                            cx={x}
                            cy={y}
                            r={7}
                            fill="var(--fg)"
                            stroke={isSkip ? "var(--domain)" : "var(--fg)"}
                            strokeWidth={isSkip ? 4 : 1}
                          />
                        ) : (
                          <>
                            <circle cx={x} cy={y} r={4} fill="none" stroke="var(--muted)" strokeWidth={1.2} />
                            <line x1={x - 4} y1={y + 4} x2={x + 4} y2={y - 4} stroke="var(--muted)" strokeWidth={1.2} />
                          </>
                        )}
                        <text
                          x={tx}
                          y={ty + 4}
                          textAnchor="middle"
                          className={`${s.seat} ${up ? "" : s.seatOut} ${isSkip || isSurvivor ? s.seatOn : ""}`}
                        >
                          {seat}
                        </text>
                      </g>
                    );
                  })}
                  {!end && (
                    <line x1={px} y1={py} x2={qx} y2={qy} stroke="var(--domain)" strokeWidth={3} markerEnd="url(#arrowJ)" />
                  )}
                  <defs>
                    <marker id="arrowJ" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                      <path d="M0,0 L10,5 L0,10 z" fill="var(--domain)" />
                    </marker>
                  </defs>
                  <text x={C} y={C + 4} textAnchor="middle" className={s.big}>
                    Left: {left}
                  </text>
                  <text x={C} y={C + 26} textAnchor="middle" className={s.small}>
                    {end ? `survivor: ${f.standing[0]}` : `next skip: ${f.skip}`}
                  </text>
                  {!locked && finished && (
                    <text x={C} y={C + 50} textAnchor="middle" className={s.small} data-testid="binary">
                      binary {bin(n)} → {rotated(n)}
                    </text>
                  )}
                </svg>

                <div className={s.col}>
                  <Control className="tap" disabled={locked || busy || finished} onClick={removeNext}>
                    Remove next
                  </Control>
                  <Control className="tap" disabled={locked || busy || made >= game.powFrame} onClick={runToPow}>
                    Run to a power of 2
                  </Control>
                  <Control className="tap" disabled={locked || busy || finished} onClick={runToEnd}>
                    Run to the end
                  </Control>
                </div>
                </div>
                <p className={s.formula} aria-live="polite">
                  {!locked && made >= game.powFrame
                    ? `${n} = ${game.pow} + ${game.powFrame} → start 2 × ${game.powFrame} + 1 = ${game.frames[game.powFrame].skip}`
                    : ""}
                </p>
                <p className={s.formula}>
                  {!locked && finished
                    ? `Starts on ${game.laps[0].skip} at ${game.laps.map((l) => l.left).join(", ")} left.`
                    : ""}
                </p>
                <div className={s.scrub}>
                  <label className={s.scrubLabel}>
                    <span>
                      Removals <output>{view}</output>
                    </span>
                    <input
                      data-qa="control"
                      type="range"
                      className={s.range}
                      min={0}
                      max={made}
                      step={1}
                      value={view}
                      disabled={locked || busy || made === 0}
                      aria-label="Removals"
                      onChange={(e) => scrub(Number(e.target.value))}
                    />
                  </label>
                  <div className={s.ticks} aria-hidden="true">
                    {keyFrames.map((k) => (
                      <span
                        key={k.label}
                        className={s.tick}
                        style={{ left: `calc(14px + (100% - 28px) * ${frac(k.t)})` }}
                      >
                        {k.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={s.grid3} role="group" aria-label="People in the circle">
                  {SIZES.map((x) => (
                    <Control
                      key={x}
                      className={`tap ${n === x ? "active" : ""}`}
                      disabled={locked || busy || n === x}
                      aria-pressed={n === x}
                      onClick={() => pick(x)}
                    >
                      {x} people
                    </Control>
                  ))}
                  {SIZES.map((x) => (
                    <span key={`r${x}`} className={s.result} data-qa="readout" aria-label={`${x} people result`}>
                      {table[x] !== undefined ? `→ ${table[x]} (${(GAMES.get(x) as Game).pow} + ${(GAMES.get(x) as Game).powFrame})` : "→ ?"}
                    </span>
                  ))}
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

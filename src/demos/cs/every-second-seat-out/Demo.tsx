"use client";

// Josephus with every second person out. n people in a circle, seats 1..n. The count starts on seat 1: skip one,
// remove the next, round and round. 41 -> survivor 19. Key frame: after 9 removals 32 (a power of two) are left
// and the count starts on 19, so 19 survives (each lap of an even circle removes half and comes back to the
// starter). Binary: 41 = 101001, move the leading 1 to the end: 010011 = 19.
// Storyboard / scrub: the circle plus a scrubber over the removals made so far (it never computes ahead).
// Spec: company/design/specs/every-second-seat-out.md.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const SIZES = [7, 10, 41];
const QUESTION_N = 41;

type Frame = { standing: number[]; skip: number }; // seats standing, seat the count starts on
type Game = { frames: Frame[]; order: number[]; survivor: number; powFrame: number; lapFrame: number };

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
  return { frames, order, survivor: ring[0], powFrame, lapFrame: Math.floor(n / 2) };
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
const R_NUM = 150;
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
      exploreHint="Run it, then scrub back to where 32 are left."
      minInteractions={1}
      reveal={() => {
        const others = SIZES.filter((x) => x !== QUESTION_N && table[x] !== undefined);
        return (
          <>
            <p>
              {G41.survivor} survived. Scrub to removal {G41.powFrame}: {QUESTION_N - G41.powFrame} were left and the count
              started at {G41.frames[G41.powFrame].skip}. With a power of two left, the person the count starts on always
              survives: each lap removes exactly half and comes back to them.
            </p>
            <p>
              {QUESTION_N} = 32 + {G41.powFrame}, so {G41.powFrame} removals reach 32 and the starter is seat 2 × {G41.powFrame}{" "}
              + 1 = {G41.survivor}. In binary, write {QUESTION_N} as {bin(QUESTION_N)} and move the leading 1 to the end:{" "}
              {rotated(QUESTION_N)} = {parseInt(rotated(QUESTION_N), 2)}.
              {others.length ? ` ${others.map((x) => `${x} gave ${table[x]}`).join(", ")}: the same rule.` : ""}
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["survivor-41"]}>
          {(reach) => {
            const finish = (nn: number) => {
              setTable((t) => ({ ...t, [nn]: (GAMES.get(nn) as Game).survivor }));
              if (nn === QUESTION_N) reach("survivor-41");
            };
            const replay = (nn: number, from: number) => {
              if (timer.current) clearInterval(timer.current);
              const to = nn - 1;
              const reduced =
                typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
              if (reduced || from >= to) {
                setMade(to);
                setView(to);
                finish(nn);
                return;
              }
              setBusy(true);
              let t = from;
              const ms = Math.max(4, Math.min(9, Math.floor(360 / (to - from))));
              timer.current = setInterval(() => {
                t += 1;
                setMade(t);
                setView(t);
                if (t >= to) {
                  if (timer.current) clearInterval(timer.current);
                  timer.current = null;
                  setBusy(false);
                  finish(nn);
                }
              }, ms);
            };
            const removeNext = () => {
              if (locked || busy || finished) return;
              const t = made + 1;
              setMade(t);
              setView(t);
              if (t >= last) finish(n);
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
                <p className={s.rule}>Skip one, remove the next, round and round until one is left.</p>
                <svg viewBox="0 0 340 340" className={`stage-svg ${s.svg}`} role="img" aria-label={label} data-view={view}>
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
                </svg>

                <Row>
                  <Control className="tap" disabled={locked || busy || finished} onClick={removeNext}>
                    Remove next
                  </Control>
                  <Control className="tap" disabled={locked || busy || finished} onClick={runToEnd}>
                    Run to the end
                  </Control>
                </Row>
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

                <Row>
                  <span className={s.group}>People</span>
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
                </Row>
                <Row>
                  {SIZES.map((x) => (
                    <Readout key={x} label={`${x} people`} value={table[x] !== undefined ? `→ ${table[x]}` : "→ ?"} />
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

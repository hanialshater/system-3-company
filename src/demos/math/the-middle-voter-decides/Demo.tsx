"use client";

// Median voter. Five voters sit at 1, 2, 3, 8 and 10 on a 0-10 line and each votes for the nearer of
// two positions. The learner picks a position to test (3 = median, 4.8 = mean, 5 = centre) and drags a
// rival along the line. Voters colour by the side of the halfway line they fall on, and a strip shows
// the result against every whole-number rival. Re-run in node (2026-10-14): only 3 beats all of 0..10;
// 3 beats 5 (and 4.8, and 4) by 3 votes to 2; a rival at 4 beats 4.8 by 3 to 2.
// Positions are kept in tenths so 4.8 and the halfway point compare exactly.
// v2: the reveal needs the learner to SEE the average lose and the centre lose (a rival that beats each), plus 3 hold
// against the whole strip. The rival starts at 4, so each test button pressed once shows its result. The rival
// position at which each lost is recorded in a "Seen" line on the stage, which the reveal quotes. Strip cells carry
// their rival position. The neutral hook drops "Surely".

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const VOTERS = [10, 20, 30, 80, 100]; // tenths
const MEDIAN = 30;
const MEAN = 48;
const CENTRE = 50;
const TESTS = [
  { at: 30, label: "3 (3rd voter)" },
  { at: 48, label: "4.8 (avg)" },
  { at: 50, label: "5 (centre)" },
];

const fmt = (t: number) => (t % 10 === 0 ? String(t / 10) : (t / 10).toFixed(1));

// votes for a, votes for b, ties (equidistant voters abstain)
function duel(a: number, b: number) {
  let x = 0;
  let y = 0;
  for (const v of VOTERS) {
    const da = Math.abs(v - a);
    const db = Math.abs(v - b);
    if (da < db) x++;
    else if (db < da) y++;
  }
  return [x, y] as const;
}

const X0 = 22;
const X1 = 298;
const px = (t: number) => X0 + ((X1 - X0) * t) / 100;

export default function TheMiddleVoterDecides({ slug }: { slug: string }) {
  const [tested, setTested] = useState(CENTRE);
  const [rival, setRival] = useState(40);
  // The rival each position first lost to, recorded when seen (survives later moves).
  const [lostTo, setLostTo] = useState<{ mean?: number; centre?: number; medianHeld?: boolean }>({});
  const nearerVoters = (r: number, t: number) =>
    VOTERS.filter((v) => Math.abs(v - r) < Math.abs(v - t)).map(fmt);

  const [forT, forR] = duel(tested, rival);
  const same = tested === rival;
  const strip = Array.from({ length: 11 }, (_, i) => i * 10)
    .filter((r) => r !== tested)
    .map((r) => {
      const [a, b] = duel(tested, r);
      return { r, res: a > b ? "win" : a < b ? "lose" : "tie" };
    });

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Five voters' favourite spots on a 0-10 line are 1, 2, 3, 8 and 10, and each prefers whatever is nearer. Which position beats every other in a one-on-one vote?",
        options: ["3 (the third voter)", "4.8 (the average)", "5 (the centre)"],
        answer: 0,
      }}
      exploreHint="Test each position against the rival and move the rival. Watch the halfway line."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            The average, 4.8, lost to your rival at {fmt(lostTo.mean ?? 40)}: voters{" "}
            {nearerVoters(lostTo.mean ?? 40, MEAN).join(", ")} were nearer it, and three is a majority. The centre, 5, lost
            too, to the rival at {fmt(lostTo.centre ?? 40)}. Position 3 won against every rival on the strip.
          </p>
          <p>
            The halfway line shows why. Put a rival anywhere right of 3 and voters 1, 2 and 3 stay on 3&apos;s side; put it left and
            3, 8 and 10 do. The middle voter is on the winning side of every split.
          </p>
          <p>
            The average is pulled by how far away 8 and 10 sit; a vote only asks which side each voter is on. When each voter
            prefers nearer, the median voter&apos;s favourite beats every rival.
          </p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={["median-holds", "average-loses", "centre-loses"]}>
          {(reach) => {
            // Check the duel on the stage now and record what it showed.
            const see = (t: number, r: number) => {
              const [a, b] = duel(t, r);
              if (t === MEDIAN) {
                setLostTo((x) => ({ ...x, medianHeld: true }));
                reach("median-holds");
              } else if (b > a && t === MEAN) {
                setLostTo((x) => (x.mean === undefined ? { ...x, mean: r } : x));
                reach("average-loses");
              } else if (b > a && t === CENTRE) {
                setLostTo((x) => (x.centre === undefined ? { ...x, centre: r } : x));
                reach("centre-loses");
              }
            };
            const pick = (at: number) => {
              if (locked) return;
              setTested(at);
              see(at, rival);
            };
            const move = (v: number) => {
              if (locked) return;
              const r = Math.round(v * 10);
              setRival(r);
              see(tested, r);
            };
            const seen = [
              lostTo.mean !== undefined ? `4.8 lost to ${fmt(lostTo.mean)}` : null,
              lostTo.centre !== undefined ? `5 lost to ${fmt(lostTo.centre)}` : null,
              lostTo.medianHeld ? "3 beat every rival" : null,
            ].filter(Boolean);
            const showing = phase !== "predict";
            const half = (tested + rival) / 2;
            const note = !showing
              ? "Each voter votes for the nearer position."
              : same
                ? "Same spot: a tie."
                : forR > forT
                  ? `Rival ${fmt(rival)} wins ${forR}–${forT}. ${fmt(tested)} loses.`
                  : forT > forR
                    ? `${fmt(tested)} wins ${forT}–${forR} against ${fmt(rival)}.`
                    : `A ${forT}–${forR} tie.`;
            const sideOf = (v: number) => {
              if (!showing || same) return "none";
              const dt = Math.abs(v - tested);
              const dr = Math.abs(v - rival);
              return dt < dr ? "t" : dr < dt ? "r" : "none";
            };
            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <svg viewBox="0 0 320 194" className="stage-svg" role="img" aria-label={`Testing ${fmt(tested)} against rival ${fmt(rival)}: ${forT} to ${forR}`}>
                  {/* halfway line */}
                  {showing && !same && (
                    <g>
                      <line x1={px(half)} x2={px(half)} y1={16} y2={84} className={s.half} />
                      <text x={px(half)} y={12} textAnchor="middle" className={s.halfLab}>
                        halfway
                      </text>
                    </g>
                  )}
                  {/* the line */}
                  <line x1={X0} x2={X1} y1={80} y2={80} className={s.axis} />
                  {Array.from({ length: 11 }, (_, i) => (
                    <g key={`t${i}`}>
                      <line x1={px(i * 10)} x2={px(i * 10)} y1={76} y2={84} className={s.axis} />
                      <text x={px(i * 10)} y={95} textAnchor="middle" className={s.tick}>
                        {i}
                      </text>
                    </g>
                  ))}
                  {/* voters */}
                  {VOTERS.map((v) => {
                    const side = sideOf(v);
                    return (
                      <g key={`v${v}`}>
                        <circle
                          cx={px(v)}
                          cy={46}
                          r={12}
                          className={side === "t" ? s.voterT : side === "r" ? s.voterR : s.voter}
                          strokeWidth={showing && v === MEDIAN ? 3.5 : 1.5}
                        />
                        <text x={px(v)} y={50.5} textAnchor="middle" className={s.vLab}>
                          {fmt(v)}
                        </text>
                      </g>
                    );
                  })}
                  {showing && (
                    <text x={px(MEDIAN)} y={27} textAnchor="middle" className={s.midLab}>
                      middle voter
                    </text>
                  )}
                  {/* the two positions */}
                  <g>
                    <path d={`M ${px(tested)} 100 l -8 13 h 16 z`} className={s.markT} />
                    <text x={px(tested)} y={125} textAnchor="middle" className={s.markLabT}>
                      {fmt(tested)}
                    </text>
                  </g>
                  {showing && (
                    <g>
                      <path d={`M ${px(rival)} 100 l -7 13 h 14 z`} className={s.markR} />
                      <text x={px(rival)} y={137} textAnchor="middle" className={s.markLabR}>
                        rival {fmt(rival)}
                      </text>
                    </g>
                  )}
                  {/* every whole-number rival */}
                  {showing && (
                    <g>
                      <text x={X0 - 8} y={153} className={s.stripLab}>
                        {fmt(tested)} vs each rival:
                      </text>
                      {strip.map(({ r, res }) => (
                        <g key={`s${r}`}>
                          <rect
                            x={px(r) - 9}
                            y={159}
                            width={18}
                            height={18}
                            rx={4}
                            className={res === "win" ? s.win : res === "lose" ? s.lose : s.tie}
                          />
                          <text x={px(r)} y={172} textAnchor="middle" className={s.cellLab}>
                            {res === "win" ? "✓" : res === "lose" ? "✗" : "="}
                          </text>
                          <text x={px(r)} y={189} textAnchor="middle" className={s.tick}>
                            {r / 10}
                          </text>
                        </g>
                      ))}
                    </g>
                  )}
                </svg>
                <Row>
                  {TESTS.map((t) => (
                    <Control
                      key={t.at}
                      className={tested === t.at ? "active" : ""}
                      disabled={locked || tested === t.at}
                      onClick={() => pick(t.at)}
                    >
                      {t.label}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Slider label="Rival" value={rival / 10} min={0} max={10} step={0.2} onChange={move} disabled={locked} format={(v) => v.toFixed(1)} />
                </Row>
                <p className={s.seen}>{seen.length ? `Seen: ${seen.join(" · ")}` : "\u00a0"}</p>
                <Row>
                  <Readout label={`For ${fmt(tested)}`} value={showing ? forT : "–"} />
                  <Readout label="For rival" value={showing ? forR : "–"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

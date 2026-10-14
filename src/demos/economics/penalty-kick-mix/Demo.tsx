"use client";

// Penalty kick as a mixed-strategy game (Easley & Kleinberg 2010, ch. 6). Toy numbers, not real rates.
// Kicker scores H = 0.5 when the keeper dives the way the ball goes, B = 0.9 when he guesses wrong on the
// right side, and X (slider, 0.90 to 1.00) when he guesses wrong on the left side.
// Equilibrium mix, both players indifferent:
//   kicker shoots left  p = (B - H) / ((X - H) + (B - H))
//   keeper dives left   q = (X - H) / ((X - H) + (B - H))
//   scoring chance      p*H + (1-p)*B  (= q*H + (1-q)*X)
// Key state: X = 1.00 (p 44.4%, q 55.6%, score 0.722), against the 0.90 start (50/50, 0.700).
// No randomness.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const H = 0.5;
const B = 0.9;
const START = 90; // hundredths
const BEST = 100;
const mix = (c: number) => {
  const x = c / 100;
  const d = x - H + (B - H);
  const p = (B - H) / d;
  return { x, p, q: (x - H) / d, score: p * H + (1 - p) * B };
};
const pct = (v: number) => `${(v * 100).toFixed(1)}%`;
const f3 = (v: number) => v.toFixed(3);
const A = mix(START);
const Z = mix(BEST);

// Geometry (viewBox 320 x 214)
const COL = [78, 200];
const ROW = [46, 88];
const CW = 114;
const CH = 38;
const BX = 8;
const BW = 304;

function Bar({ y, label, v }: { y: number; label: string; v: number }) {
  return (
    <g>
      <text x={BX} y={y - 5} className={s.axis}>
        {label}
      </text>
      <text x={BX + BW} y={y - 5} textAnchor="end" className={s.value}>
        {pct(v)}
      </text>
      <rect x={BX} y={y} width={BW} height={14} className={s.track} />
      <rect x={BX} y={y} width={BW * v} height={14} className={s.main} />
      <line x1={BX + BW / 2} x2={BX + BW / 2} y1={y - 2} y2={y + 16} className={s.tick} />
    </g>
  );
}

export default function PenaltyKickMix({ slug }: { slug: string }) {
  const [c, setC] = useState(START);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A kicker scores 0.5 if the keeper dives the right way, 0.9 if he dives the wrong way. Both now play their best mix: 50% left. The kicker's left shot improves, 0.9 to 1.0, when the keeper dives right. How often should the kicker shoot left?",
        options: ["More than 50%", "Still 50%", "Less than 50%"],
        answer: 2,
      }}
      exploreHint="Improve the left shot to 1.00 and watch both bars."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            At {A.x.toFixed(2)} both sides sat at 50/50 and the kicker scored {f3(A.score)}. At {Z.x.toFixed(2)} the kicker shot left only{" "}
            <strong>{pct(Z.p)}</strong> of the time, the keeper dived left <strong>{pct(Z.q)}</strong>, and the kicker scored{" "}
            <strong>{f3(Z.score)}</strong>.
          </p>
          <p>
            A better left shot makes the keeper cover the left more, so the kicker leans right. Each side&apos;s mix is set so the other
            side gains nothing from either choice. Your own strength decides how much your opponent must guard it.
          </p>
          <p className="muted">Toy numbers, not real penalty rates.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["best-left-shot"]}>
          {(reach) => {
            const m = mix(c);
            const set = (v: number) => {
              setC(v);
              if (v === BEST) reach("best-left-shot");
            };
            const cell = (r: number, k: number, v: number, on = false) => (
              <g key={`${r}${k}`}>
                <rect x={COL[k]} y={ROW[r]} width={CW} height={CH} className={on ? s.cellOn : s.cell} />
                <text x={COL[k] + CW / 2} y={ROW[r] + CH / 2 + 5} textAnchor="middle" className={s.big}>
                  {v.toFixed(2)}
                </text>
              </g>
            );
            return (
              <div className={s.wrap}>
                <svg
                  viewBox="0 0 320 232"
                  className="stage-svg"
                  role="img"
                  aria-label={`Left shot ${m.x.toFixed(2)}: kicker shoots left ${pct(m.p)}, keeper dives left ${pct(m.q)}, scoring ${f3(m.score)}`}
                >
                  <text x={160} y={14} textAnchor="middle" className={s.value}>
                    Toy game · scoring {f3(m.score)}
                  </text>
                  <text x={COL[0] + CW / 2} y={34} textAnchor="middle" className={s.axis}>
                    Dives left
                  </text>
                  <text x={COL[1] + CW / 2} y={34} textAnchor="middle" className={s.axis}>
                    Dives right
                  </text>
                  <text x={BX} y={ROW[0] + CH / 2 + 4} className={s.axis}>
                    Kick left
                  </text>
                  <text x={BX} y={ROW[1] + CH / 2 + 4} className={s.axis}>
                    Kick right
                  </text>
                  {cell(0, 0, H)}
                  {cell(0, 1, m.x, true)}
                  {cell(1, 0, B)}
                  {cell(1, 1, H)}
                  <Bar y={160} label="Kicker shoots left" v={m.p} />
                  <Bar y={204} label="Keeper dives left" v={m.q} />
                </svg>
                <Slider
                  label="Left-shot score"
                  value={c}
                  min={START}
                  max={BEST}
                  step={2}
                  disabled={locked}
                  format={(v) => (v / 100).toFixed(2)}
                  onChange={set}
                />
                <Row>
                  <Control className={s.tap} disabled={locked || c === BEST} onClick={() => set(BEST)}>
                    Perfect left shot
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

"use client";

// Penalty kick as a mixed-strategy game (Easley & Kleinberg 2010, ch. 6). Toy numbers, not real rates.
// Kicker scores H = 0.5 when the keeper dives the way the ball goes. B = 0.9 for a kick right when the keeper
// dives left. X (slider, 0.90 to 1.00) for a kick left when the keeper dives right.
// Equilibrium mix, both players indifferent:
//   kicker shoots left  p = (B - H) / ((X - H) + (B - H))
//   keeper dives left   q = (X - H) / ((X - H) + (B - H))
//   scoring chance      p*H + (1-p)*B  (= q*H + (1-q)*X)
// Key state: X = 1.00 (p 44.4%, q 55.6%, score 0.722), against the 0.90 start (50/50, 0.700).
// "Keep 50% left" mode: kicker stays at p = 0.5, keeper replies with the dive that scores the kicker least
// (left: 0.70 vs right 0.5*X + 0.25), so the kicker scores 0.700 for every X.
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
const mix = (c: number, keep = false) => {
  const x = c / 100;
  const d = x - H + (B - H);
  const p = keep ? 0.5 : (B - H) / d;
  // Kicker's score against each keeper dive, given the kicker's left share p
  const kl = p * H + (1 - p) * B;
  const kr = p * x + (1 - p) * H;
  const q = keep ? (kr - kl > 1e-9 ? 1 : 0.5) : (x - H) / d;
  // Kicker's score from each kick, given the keeper's left share q
  const ql = q * H + (1 - q) * x;
  const qr = q * B + (1 - q) * H;
  return { x, p, q, kl, kr, ql, qr, score: keep ? Math.min(kl, kr) : p * H + (1 - p) * B };
};
const pct = (v: number) => `${(v * 100).toFixed(1)}%`;
const f3 = (v: number) => v.toFixed(3);
const A = mix(START);
const Z = mix(BEST);
const K = mix(BEST, true);

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
  const [keep, setKeep] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A kicker scores 0.5 if the keeper guesses his side, 0.9 if not. He mixes sides so the keeper can't guess: 50% left is best. Now a left kick scores 1.0, not 0.9, when the keeper guesses wrong. How often should he shoot left?",
        options: ["More than 50%", "Still 50%", "Less than 50%"],
        answer: 2,
      }}
      exploreHint="Improve the left shot to 1.00. Then try keeping 50% left."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            At {A.x.toFixed(2)} both sat at 50/50 and the kicker scored {f3(A.score)}. At {Z.x.toFixed(2)} he shot left only{" "}
            <strong>{pct(Z.p)}</strong>, the keeper dived left <strong>{pct(Z.q)}</strong>, and he scored <strong>{f3(Z.score)}</strong>.
          </p>
          <p>
            Why not keep 50%? Then a left dive holds him to {f3(K.kl)} but a right dive lets him have {f3(K.kr)}, so the keeper dives
            left and the kicker still scores {f3(K.score)}. Shooting left less stops that: at the best mixes either dive concedes{" "}
            {f3(Z.score)} and either kick wins {f3(Z.score)}, so neither side gains by switching.
          </p>
          <p className="muted">Made-up numbers, not real penalty rates.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["best-left-shot", "kept-50"]}>
          {(reach) => {
            const m = mix(c, keep);
            const note = (v: number, k: boolean) => {
              if (v === BEST && !k) reach("best-left-shot");
              if (v === BEST && k) reach("kept-50");
            };
            const set = (v: number) => {
              setC(v);
              note(v, keep);
            };
            const best = () => {
              setKeep(false);
              setC(BEST);
              note(BEST, false);
            };
            const stay = () => {
              setKeep(true);
              const v = c === START ? BEST : c;
              setC(v);
              note(v, true);
            };
            const eq = (a: number, b: number) => (Math.abs(a - b) < 1e-9 ? "=" : "|");
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
                  viewBox="0 0 320 256"
                  className="stage-svg"
                  role="img"
                  aria-label={`Left shot ${m.x.toFixed(2)}: kicker shoots left ${pct(m.p)}, keeper dives left ${pct(m.q)}, scoring ${f3(m.score)}`}
                >
                  <text x={160} y={14} textAnchor="middle" className={s.value}>
                    Scoring {f3(m.score)}
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
                  <Bar y={158} label="Kicker shoots left" v={m.p} />
                  <text x={160} y={188} textAnchor="middle" className={s.axis}>
                    Keeper left {f3(m.kl)} {eq(m.kl, m.kr)} right {f3(m.kr)}
                  </text>
                  <Bar y={214} label="Keeper dives left" v={m.q} />
                  {!keep && (
                    <text x={160} y={244} textAnchor="middle" className={s.axis}>
                      Kick left {f3(m.ql)} {eq(m.ql, m.qr)} right {f3(m.qr)}
                    </text>
                  )}
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
                  <Control className={s.tap} disabled={locked || (c === BEST && !keep)} onClick={best}>
                    Perfect left shot
                  </Control>
                  <Control className={s.tap} disabled={locked || keep} onClick={stay}>
                    Keep 50% left
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

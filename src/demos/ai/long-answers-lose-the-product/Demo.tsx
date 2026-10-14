"use client";

// Length bias toy. A whole answer's probability is the product of its tokens' probabilities.
// S: 2 tokens at 50% -> 0.5^2 = 0.25. L: n tokens at 85% -> 0.85^n; at n = 10, 0.197, so S wins.
// L beats 0.25 up to n = 8 (0.85^8 = 0.272) and loses from n = 9 (0.232).
// Per token (geometric mean, a length-normalised score): S 50%, L 85% at every length, so L wins.
// Invented token odds. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const S = { n: 2, p: 0.5 } as const;
const L = { p: 0.85, min: 1, max: 10, start: 10 } as const;
const whole = (p: number, k: number) => p ** k;
/** Longest L that still beats S as a whole answer (8). */
const CROSS = (() => {
  let n = 0;
  while (whole(L.p, n + 1) > whole(S.p, S.n)) n++;
  return n;
})();
// MODEL END

const MILESTONES = ["question-case", "crossover-seen", "per-token-on"] as const;
const pc = (v: number) => {
  const x = Math.round(v * 1000) / 10;
  return `${Number.isInteger(x) ? x : x.toFixed(1)}%`;
};
const BW = 28;
const GAP = 3;
const X0 = 22;
const BAR = 290;

type Rec = { pL: number; pS: number } | null;
type Cross = { n: number; p: number } | null;

export default function LongAnswersLoseTheProduct({ slug }: { slug: string }) {
  const [n, setN] = useState<number>(L.start);
  const [steps, setSteps] = useState(0);
  const [full, setFull] = useState(false);
  const [perToken, setPerToken] = useState(false);
  const [rec, setRec] = useState<Rec>(null);
  const [cross, setCross] = useState<Cross>(null);

  const kS = full ? S.n : Math.min(steps, S.n);
  const kL = full ? n : Math.min(steps, n);
  const done = kS === S.n && kL === n;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Answer S has 2 tokens, each 50% likely. Answer L has 10 tokens, each 85% likely. The more probable whole answer is:",
        options: ["S", "L", "They tie"],
        answer: 0,
      }}
      exploreHint="Multiply the tokens, shorten L, then score per token."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const r = rec ?? { pL: whole(L.p, L.start), pS: whole(S.p, S.n) };
        return (
          <>
            <p>
              Every token of L was more likely than any token of S, yet S won: {pc(r.pS)} against {pc(r.pL)}. Each extra token
              multiplies the whole by something below 1, so ten confident steps lost to two shaky ones.
            </p>
            <p>
              {cross ? `At ${cross.n} tokens L won with ${pc(cross.p)}, but past ${CROSS} it always loses. ` : `Past ${CROSS} tokens L always loses. `}So
              the single most probable answer tends to be a short one. Scoring per token, which you switched on, put L ahead: {pc(L.p)} against {pc(S.p)}. Real decoders add
              such a length correction.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const check = (st: number, fu: boolean, len: number) => {
              const ks = fu ? S.n : Math.min(st, S.n);
              const kl = fu ? len : Math.min(st, len);
              if (ks !== S.n || kl !== len) return;
              if (len === L.start) {
                setRec({ pL: whole(L.p, len), pS: whole(S.p, S.n) });
                reach("question-case");
              }
              if (len <= CROSS) {
                setCross({ n: len, p: whole(L.p, len) });
                reach("crossover-seen");
              }
            };
            const wS = perToken ? S.p : whole(S.p, kS);
            const wL = perToken ? L.p : whole(L.p, kL);
            const winner = !done ? null : wS > wL ? "S" : wL > wS ? "L" : "tie";
            const chain = (label: string, len: number, p: number, k: number, y: number, w: number, wholeV: number) => (
              <g>
                <text x={4} y={y + 18} className={s.label} fill="var(--fg)">
                  {label}
                </text>
                {Array.from({ length: len }, (_, i) => (
                  <g key={i}>
                    <rect
                      x={X0 + i * (BW + GAP)}
                      y={y}
                      width={BW}
                      height={26}
                      rx={4}
                      className={!locked && i < k ? s.boxOn : s.box}
                    />
                    <text x={X0 + i * (BW + GAP) + BW / 2} y={y + 17} textAnchor="middle" className={s.small} fill="var(--fg)">
                      {Math.round(p * 100)}%
                    </text>
                  </g>
                ))}
                <rect x={X0} y={y + 32} width={BAR} height={12} rx={3} className={s.track} />
                {!locked && k > 0 && <rect x={X0} y={y + 32} width={BAR * w} height={12} rx={3} className={s.bar} />}
                <text x={X0} y={y + 58} className={s.small} fill="var(--fg)">
                  {locked || k === 0
                    ? "whole answer: –"
                    : perToken
                      ? `per token: ${pc(w)} (whole: ${pc(wholeV)})`
                      : `whole answer: ${pc(w)}`}
                  {winner === label ? "  ◀ more probable" : ""}
                </text>
              </g>
            );
            const msg = locked
              ? "Make a prediction to start."
              : rec
                ? `Seen: S ${pc(rec.pS)}; L at 10 tokens ${pc(rec.pL)}${cross ? `, at ${cross.n} ${pc(cross.p)}` : ""}.`
                : "Each tap multiplies in one more token's chance.";
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Invented token odds</span>
                <p className={s.msg}>{msg}</p>
                <svg viewBox="0 0 340 150" className={`stage-svg ${s.svg}`} role="img" aria-label={`S ${pc(wS)}, L ${pc(wL)}`}>
                  {chain("S", S.n, S.p, kS, 4, wS, whole(S.p, kS))}
                  {chain("L", n, L.p, kL, 80, wL, whole(L.p, kL))}
                </svg>
                <Row>
                  <Control
                    disabled={locked || done}
                    onClick={() => {
                      setSteps(steps + 1);
                      check(steps + 1, full, n);
                    }}
                  >
                    +1 token
                  </Control>
                  <Control
                    disabled={locked || done}
                    onClick={() => {
                      setFull(true);
                      check(steps, true, n);
                    }}
                  >
                    All tokens
                  </Control>
                  <Control
                    className={perToken ? "active" : ""}
                    aria-pressed={perToken}
                    disabled={locked || !done}
                    onClick={() => {
                      setPerToken(!perToken);
                      if (!perToken) reach("per-token-on");
                    }}
                  >
                    Per token
                  </Control>
                </Row>
                <Slider
                  label="Tokens in L"
                  value={n}
                  min={L.min}
                  max={L.max}
                  disabled={locked}
                  onChange={(v) => {
                    setN(v);
                    check(steps, full, v);
                  }}
                />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

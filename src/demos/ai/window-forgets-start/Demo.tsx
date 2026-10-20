"use client";

// Context window. A document of 20 tokens; the model answers after token 20 and sees only the
// last W tokens (positions 21 - W .. 20). A fact at a uniformly random position is usable with
// chance W / 20: 8 / 20 = 40% for W = 8. "Drop at 20 random spots" uses mulberry32 seeds 1, 2,
// 3, ... in order (untuned) and shows how many of the 20 spots were inside the window.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const LEN = 20;
const WINDOWS = [4, 8, 12, 20] as const;
const Q_W = 8;
const DROPS = 20;
const firstVisible = (w: number) => LEN - w + 1;
const visible = (pos: number, w: number) => pos >= firstVisible(w);
const share = (w: number) => w / LEN;
/** DROPS random fact positions (1..LEN) for a seed. */
function drops(seed: number) {
  const rng = mulberry32(seed);
  return Array.from({ length: DROPS }, () => 1 + Math.floor(rng() * LEN));
}
const hits = (seed: number, w: number) => drops(seed).filter((p) => visible(p, w)).length;
// MODEL END

const START_FACT = 5;
const CELL = 30;
const cellX = (pos: number) => 12 + ((pos - 1) % 10) * CELL;
const cellY = (pos: number) => 34 + Math.floor((pos - 1) / 10) * 46;

export default function WindowForgetsStart({ slug }: { slug: string }) {
  const [w, setW] = useState<number>(LEN);
  const [fact, setFact] = useState(START_FACT);
  const [draw, setDraw] = useState(0);
  const [drawW, setDrawW] = useState<number>(LEN);
  const [darkSeen, setDarkSeen] = useState<number | null>(null);

  const usable = visible(fact, w);
  const dropped = draw > 0 ? drops(draw) : [];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You paste a ${LEN}-token document into a chatbot that sees only the last ${Q_W} tokens when it answers. Your key fact sits at a random position in it. What is the chance the model can still use it?`,
        options: ["100%", `${Math.round(share(Q_W) * 100)}%`, `${Q_W}%`],
        answer: 1,
      }}
      exploreHint="Shrink the window and move the fact. When does the model lose it?"
      minInteractions={1}
      reveal={() => {
        return (
          <>
            <p>
              With a window of {Q_W}, only positions {firstVisible(Q_W)}–{LEN} reach the model: {Q_W} of {LEN}, so{" "}
              <strong>{Math.round(share(Q_W) * 100)}%</strong> of places a fact could sit.{" "}
              {darkSeen !== null ? `Your fact at position ${darkSeen} went dark.` : ""}
            </p>
            {draw > 0 && (
              <p>
                Your {DROPS} random drops at window {drawW} put {hits(draw, drawW)} inside, {Math.round((hits(draw, drawW) / DROPS) * 100)}%
                {drawW === Q_W ? "; the long-run share is 40%." : `; the long-run share for window ${drawW} is ${Math.round(share(drawW) * 100)}%.`}
              </p>
            )}
            <p>
              Text before the window is not remembered faintly; for that answer it is not there at all. A real system may retrieve or summarize older text. This model uses only the tokens inside its fixed window.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["fact-fell-out"]}>
          {(reach) => {
            const update = (nw: number, nf: number) => {
              setW(nw);
              setFact(nf);
              if (nw === Q_W && !visible(nf, nw)) {
                setDarkSeen(nf);
                reach("fact-fell-out");
              }
            };
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy: {LEN}-token document · ★ = fact · dots = drops</span>
                <svg viewBox="0 0 320 140" className="stage-svg" role="img" aria-label={`Window of ${w} tokens, fact at ${fact}`}>
                  <text x={160} y={16} textAnchor="middle" className={s.small} fill="var(--muted)">
                    {locked ? "The model answers after token 20" : `Model sees the last ${w} tokens (${firstVisible(w)}–${LEN})`}
                  </text>
                  {Array.from({ length: LEN }, (_, i) => i + 1).map((pos) => {
                    const lit = locked || visible(pos, w);
                    const isFact = pos === fact;
                    const nDrops = dropped.filter((p) => p === pos).length;
                    return (
                      <g key={pos} opacity={lit ? 1 : 0.3}>
                        <rect
                          x={cellX(pos)}
                          y={cellY(pos)}
                          width={CELL - 4}
                          height={26}
                          rx={4}
                          fill={isFact ? "color-mix(in srgb, var(--domain) 35%, var(--bg-2))" : "var(--bg-2)"}
                          stroke={!locked && lit ? "var(--domain)" : "var(--line)"}
                          strokeWidth={!locked && lit ? 2 : 1}
                        />
                        <text x={cellX(pos) + (CELL - 4) / 2} y={cellY(pos) + 17} textAnchor="middle" className={s.label} fill="var(--fg)">
                          {isFact ? "★" : pos}
                        </text>
                        {nDrops > 0 &&
                          Array.from({ length: Math.min(nDrops, 5) }, (_, k) => (
                            <circle key={k} cx={cellX(pos) + 4 + k * 5} cy={cellY(pos) + 32} r={2} fill={lit ? "var(--good)" : "var(--muted)"} />
                          ))}
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  {WINDOWS.map((ww) => (
                    <Control key={ww} className={w === ww ? "active" : ""} disabled={locked || w === ww} onClick={() => update(ww, fact)}>
                      Window {ww}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Control aria-label="Move the fact earlier" disabled={locked || fact === 1} onClick={() => update(w, fact - 1)}>
                    ★ ◀
                  </Control>
                  <Control aria-label="Move the fact later" disabled={locked || fact === LEN} onClick={() => update(w, fact + 1)}>
                    ★ ▶
                  </Control>
                  <Control disabled={locked} onClick={() => {
                      setDraw((d) => d + 1);
                      setDrawW(w);
                    }}>
                    Drop at {DROPS} random spots
                  </Control>
                </Row>
                <Row>
                  <Readout label="Model can use ★" value={locked ? "–" : usable ? "yes" : "no: outside"} />
                  <Readout label="Positions inside window" value={locked ? "–" : `${w} of ${LEN} = ${Math.round(share(w) * 100)}%`} />
                  <Readout label="Random spots in window" value={locked || draw === 0 ? "–" : `${hits(draw, drawW)} of ${DROPS} (window ${drawW})`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

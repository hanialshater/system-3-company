"use client";

// Goodhart's law with an invented formula. An article has 10 units of effort: hype h and
// substance s = 10 − h. Clicks = 2h + s; reader value = s. Clicks do reward substance, but
// each unit moved from substance to hype gains a click and costs a unit of value, so an
// optimiser chasing clicks ends at h = 10: 20 clicks, value 0. The reveal waits until the
// learner has run the click optimiser to its end.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

// MODEL START
const EFFORT = 10;
const START_HYPE = 2;
type Target = "clicks" | "value";
const clicks = (h: number) => 2 * h + (EFFORT - h);
const value = (h: number) => EFFORT - h;
const score = (h: number, t: Target) => (t === "clicks" ? clicks(h) : value(h));

/** One optimiser step: move one unit of effort if that raises the target, else stay. */
function step(h: number, t: Target) {
  const options = [h - 1, h + 1].filter((x) => x >= 0 && x <= EFFORT);
  const best = options.reduce((a, b) => (score(b, t) > score(a, t) ? b : a), h);
  return best;
}
function runToEnd(h: number, t: Target) {
  let x = h;
  for (let i = 0; i < 2 * EFFORT; i++) x = step(x, t);
  return x;
}
// MODEL END

// Geometry (viewBox 320 × 210).
const BLOCK = 26;
const BX = 160 - (EFFORT * BLOCK) / 2;
const BAR_BASE = 168;
const UNIT = 6; // px per click or per unit of value

export default function ClicksNotValue({ slug }: { slug: string }) {
  const [h, setH] = useState(START_HYPE);
  const [target, setTarget] = useState<Target>("clicks");
  const atEnd = step(h, target) === h;

  const go = (next: number, interact: () => void) => {
    setH(next);
    if (target === "clicks" && next === runToEnd(START_HYPE, "clicks")) interact(); // the reveal waits for the end
  };

  const bars = [
    { label: "clicks", v: clicks(h), max: clicks(EFFORT), color: "var(--domain)", x: 90 },
    { label: "reader value", v: value(h), max: value(0), color: "var(--good)", x: 200 },
  ];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "An article has 10 units of effort split between hype (h) and substance (s). Clicks = 2h + s; reader value = s. The split that maximises clicks gives reader value of:",
        options: ["10", "5", "0"],
        answer: 2,
      }}
      exploreHint="Step the click optimiser, then run it to the end."
      reveal={() => (
        <>
          <p>
            Chasing clicks moved every unit of effort into hype: <strong>{clicks(EFFORT)} clicks</strong>, reader value{" "}
            <strong>{value(EFFORT)}</strong>. Clicks do reward substance, one per unit, so clicks and value look related.
            But hype earns two per unit, so each step trades one unit of value for one more click, until no substance is
            left.
          </p>
          <p>
            Aim the optimiser at value and it ends at {value(0)} value and {clicks(0)} clicks. A measure that tracks the
            goal while nobody pushes on it can stop tracking it once something optimises it.
          </p>
          <p className="muted">
            The formula is invented. The pattern is Goodhart&apos;s law: “when a measure becomes a target, it ceases to
            be a good measure”.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg viewBox="0 0 320 210" className="stage-svg" role="img" aria-label={`Hype ${h}, substance ${EFFORT - h}; clicks ${clicks(h)}, reader value ${value(h)}`}>
            {Array.from({ length: EFFORT }, (_, i) => (
              <rect
                key={i}
                x={BX + i * BLOCK + 1}
                y={8}
                width={BLOCK - 2}
                height={18}
                rx={3}
                fill={i < h ? "var(--warn)" : "var(--good)"}
                opacity={i < h ? 1 : 0.7}
              />
            ))}
            <text x={BX} y={40} className={s.small} fill="var(--warn)">
              hype {h}
            </text>
            <text x={BX + EFFORT * BLOCK} y={40} textAnchor="end" className={s.small} fill="var(--good)">
              substance {EFFORT - h}
            </text>

            <line x1={40} y1={BAR_BASE} x2={280} y2={BAR_BASE} stroke="var(--line)" />
            {bars.map((b) => (
              <g key={b.label}>
                <rect x={b.x} y={BAR_BASE - b.max * UNIT} width={40} height={b.max * UNIT} rx={4} fill="var(--bg-2)" />
                <rect x={b.x} y={BAR_BASE - b.v * UNIT} width={40} height={b.v * UNIT} rx={4} fill={b.color} />
                <text x={b.x + 20} y={BAR_BASE - b.v * UNIT - 5} textAnchor="middle" className={s.num} fill="var(--fg)">
                  {b.v}
                </text>
                <text x={b.x + 20} y={BAR_BASE + 16} textAnchor="middle" className={s.small} fill="var(--fg)">
                  {b.label}
                </text>
              </g>
            ))}
          </svg>
          <p className={s.msg} aria-live="polite">
            {locked
              ? "Lock in a guess to start."
              : atEnd
                ? `As many ${target === "clicks" ? "clicks" : "units of value"} as possible.`
                : `The optimiser chases ${target === "clicks" ? "clicks" : "reader value"}.`}
          </p>
          <Row>
            <Control disabled={locked || atEnd} onClick={() => go(step(h, target), interact)}>
              Step
            </Control>
            <Control disabled={locked || atEnd} onClick={() => go(runToEnd(h, target), interact)}>
              Run to the end
            </Control>
            <Control disabled={locked || h === START_HYPE} onClick={() => setH(START_HYPE)}>
              Reset
            </Control>
          </Row>
          <Row>
            <span className={s.label}>Optimise for:</span>
            {(["clicks", "value"] as const).map((t) => (
              <Control
                key={t}
                className={target === t ? "active" : ""}
                aria-pressed={target === t}
                disabled={locked || target === t}
                onClick={() => setTarget(t)}
              >
                {t === "clicks" ? "Clicks" : "Reader value"}
              </Control>
            ))}
          </Row>
        </div>
      )}
    </Lesson>
  );
}

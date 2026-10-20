"use client";

// Regression to the mean as a slope chart. 1,000 students sit test 1 (top line); the
// learner picks the top scorers and sends them to test 2 (bottom line) with the same skill.
// The payoff: their lines fan back toward the middle. Extreme scores held extra luck,
// and luck does not repeat. No coaching, no complacency, no jinx.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { group, mean, students } from "./model";
import s from "./styles.module.css";

const ALL = students();
const W = 340;
const X0 = 14;
const X1 = W - 14;
const Y1 = 46;
const Y2 = 186;
const sx = (v: number) => X0 + (v / 100) * (X1 - X0);
const jitter = (i: number) => ((i * 37) % 13) - 6;

export default function PraiseThenSlump({ slug }: { slug: string }) {
  const [pct, setPct] = useState(10);
  const [top, setTop] = useState(true);
  const [sat, setSat] = useState(false);

  const g = useMemo(() => group(ALL, pct, top), [pct, top]);
  const inGroup = useMemo(() => new Set(g), [g]);
  const m1 = mean(g.map((i) => ALL[i].t1));
  const m2 = mean(g.map((i) => ALL[i].t2));
  const tri = (x: number, y: number, up: boolean) =>
    `${x},${y} ${x - 7},${y + (up ? 12 : -12)} ${x + 7},${y + (up ? 12 : -12)}`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A test score is half skill, half luck. The top 10% on test 1 sit test 2 with the same skill and no coaching. What happens to their average on test 2?",
        options: ["About the same", "Lower", "Higher"],
        answer: 1,
      }}
      exploreHint="Send the top scorers to test 2. Then try the top 1%, and the bottom group."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your {top ? "top" : "bottom"} {pct}% averaged {m1.toFixed(0)} on test 1 and {m2.toFixed(0)} on test 2:
            about <strong>halfway back</strong> to the class average of 50. Nothing about them changed.
          </p>
          <p>
            To score at the very top you usually need skill <em>and</em> good luck. The skill comes back for test 2;
            the luck is drawn fresh, so on average it is ordinary. The bottom group rises for the same reason.
          </p>
          <p className="muted">
            Galton named this regression toward the mean in 1886.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg viewBox={`0 0 ${W} 230`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Test 1 and test 2 scores for the ${top ? "top" : "bottom"} ${pct}% of 1,000 students`}>
            <text x={W / 2} y={12} textAnchor="middle" className={s.axisLabel}>Test 1</text>
            <text x={W / 2} y={Y2 + 38} textAnchor="middle" className={s.axisLabel}>Test 2</text>
            <line x1={X0} x2={X1} y1={Y1} y2={Y1} className={s.axis} />
            <line x1={X0} x2={X1} y1={Y2} y2={Y2} className={s.axis} />
            {[0, 50, 100].map((v) => (
              <g key={v}>
                <text x={sx(v)} y={Y1 - 20} textAnchor="middle" className={s.tick}>{v}</text>
                <text x={sx(v)} y={Y2 + 24} textAnchor="middle" className={s.tick}>{v}</text>
                <line x1={sx(v)} x2={sx(v)} y1={Y1 - 4} y2={Y2 + 4} className={s.grid} />
              </g>
            ))}
            {ALL.map((st, i) =>
              inGroup.has(i) ? null : <circle key={`a${i}`} cx={sx(st.t1)} cy={Y1 + jitter(i) * 0.9} r={1.6} className={s.crowd} />,
            )}
            {g.map((i) => (
              <circle key={`ap${i}`} cx={sx(ALL[i].t1)} cy={Y1 + jitter(i) * 0.9} r={1.8} className={s.pick} />
            ))}
            {sat &&
              g.map((i) => (
                <line key={`l${i}`} x1={sx(ALL[i].t1)} y1={Y1 + 6} x2={sx(ALL[i].t2)} y2={Y2 - 6} className={s.path} />
              ))}
            {sat &&
              ALL.map((st, i) =>
                inGroup.has(i) ? null : <circle key={`b${i}`} cx={sx(st.t2)} cy={Y2 + jitter(i) * 0.9} r={1.6} className={s.crowd} />,
              )}
            {sat &&
              g.map((i) => (
                <circle key={`bp${i}`} cx={sx(ALL[i].t2)} cy={Y2 + jitter(i) * 0.9} r={1.8} className={s.pick} />
              ))}
            {!sat && (
              <text x={W / 2} y={Y2 + 5} textAnchor="middle" className={s.wait}>
                not sat yet
              </text>
            )}
            <polygon points={tri(sx(m1), Y1 - 8, false)} className={s.mean} />
            {sat && <polygon points={tri(sx(m2), Y2 + 8, true)} className={s.mean} />}
            {sat && <line x1={sx(m1)} y1={Y1} x2={sx(m2)} y2={Y2} className={s.meanPath} />}
          </svg>
          <Row>
            <Control
              disabled={locked || sat}
              onClick={() => {
                setSat(true);
                interact();
              }}
            >
              {sat ? "Test 2 done" : "Sit test 2"}
            </Control>
            <Control
              disabled={locked}
              onClick={() => {
                setTop((t) => !t);
                if (sat) interact();
              }}
            >
              {top ? "Pick bottom scorers" : "Pick top scorers"}
            </Control>
          </Row>
          <Row>
            <Slider
              label={`${top ? "Top" : "Bottom"} scorers on test 1`}
              value={pct}
              min={1}
              max={50}
              disabled={locked}
              format={(v) => `${v}%`}
              onChange={(v) => {
                setPct(v);
                if (sat) interact();
              }}
            />
          </Row>
          <Row>
            <Readout label="Their test 1 average" value={m1.toFixed(0)} />
            <Readout label="Their test 2 average" value={sat && !locked ? m2.toFixed(0) : "?"} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}

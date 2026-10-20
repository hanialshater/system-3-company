"use client";

// Anscombe's quartet (1973): four datasets of 11 points with the same means, spreads, correlation and
// best-fit line. The stage shows one set at a time (tabs I to IV) with a toggle for the fitted line.
// Mean, r and the line are computed from the plotted points (stats()). Key state: the fitted line has been
// shown on all four plots (the toggle is the first control, so tabs pressed after it count). Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const X123 = [10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5];
const SETS: { x: number[]; y: number[]; note: string }[] = [
  { x: X123, y: [8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68], note: "A loose cloud around a rising line." },
  { x: X123, y: [9.14, 8.14, 8.74, 8.77, 9.26, 8.1, 6.13, 3.1, 9.13, 7.26, 4.74], note: "A smooth curve that rises, then falls." },
  { x: X123, y: [7.46, 6.77, 12.74, 7.11, 7.81, 8.84, 6.08, 5.39, 8.15, 6.42, 5.73], note: "A tight line with one point far above it." },
  { x: [8, 8, 8, 8, 8, 8, 8, 19, 8, 8, 8], y: [6.58, 5.76, 7.71, 8.84, 8.47, 7.04, 5.25, 12.5, 5.56, 7.91, 6.89], note: "Ten points stacked at x = 8, one far to the right." },
];
const ROMAN = ["I", "II", "III", "IV"];

function stats(x: number[], y: number[]) {
  const n = x.length, mx = x.reduce((a, b) => a + b) / n, my = y.reduce((a, b) => a + b) / n;
  let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) {
    sxy += (x[i] - mx) * (y[i] - my);
    sxx += (x[i] - mx) ** 2;
    syy += (y[i] - my) ** 2;
  }
  const slope = sxy / sxx;
  return { mx, my, slope, icpt: my - slope * mx, r: sxy / Math.sqrt(sxx * syy) };
}
const ST = SETS.map((d) => stats(d.x, d.y));
const RTXT = ST[0].r.toFixed(2);
const LINE = `y = ${ST[0].icpt.toFixed(2)} + ${ST[0].slope.toFixed(2)}x`;
const MILESTONES = ["line-on-all"] as const;

const X0 = 28, X1 = 330, Y0 = 138, Y1 = 8, XM = 20, YM = 14;
const px = (v: number) => X0 + (v / XM) * (X1 - X0);
const py = (v: number) => Y0 - (v / YM) * (Y0 - Y1);

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const [tab, setTab] = useState(0);
  const [line, setLine] = useState(false);
  const [seen, setSeen] = useState<number[]>([]);
  const view = (t: number, l: boolean) => {
    if (!l) return;
    const next = seen.includes(t) ? seen : [...seen, t];
    setSeen(next);
    if (next.length === SETS.length) reach("line-on-all");
  };
  const d = SETS[tab], st = ST[tab];
  const msg = locked
    ? "Four sets of 11 points. Same means, same spread, same correlation."
    : `Set ${ROMAN[tab]}: ${d.note}`;
  return (
    <div className={s.wrap}>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <svg viewBox="0 0 340 160" className={`stage-svg ${s.svg}`} role="img" aria-label={`Set ${ROMAN[tab]}, ${d.x.length} points${line ? ", fitted line shown" : ""}`}>
        <line className={s.axis} x1={X0} x2={X1} y1={Y0} y2={Y0} />
        <line className={s.axis} x1={X0} x2={X0} y1={Y1} y2={Y0} />
        {[0, 5, 10, 15, 20].map((t) => <text key={t} className={s.tick} x={px(t)} y={Y0 + 11}>{t}</text>)}
        {[0, 5, 10].map((t) => <text key={t} className={s.tickR} x={X0 - 3} y={py(t) + 3}>{t}</text>)}
        {line && <line className={s.fit} x1={px(3)} x2={px(20)} y1={py(st.icpt + st.slope * 3)} y2={py(st.icpt + st.slope * 20)} />}
        {d.x.map((xv, i) => <circle key={i} className={s.pt} cx={px(xv)} cy={py(d.y[i])} r={4} />)}
      </svg>
      <Row>
        <Control
          className={line ? "active" : ""}
          disabled={locked}
          onClick={() => {
            const l = !line;
            setLine(l);
            view(tab, l);
          }}
        >
          {line ? "Hide fitted line" : "Show fitted line"}
        </Control>
        {ROMAN.map((r, i) => (
          <Control
            key={r}
            className={tab === i ? "active" : ""}
            disabled={locked || tab === i}
            onClick={() => {
              setTab(i);
              view(i, line);
            }}
          >
            {r}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Mean x, y" value={locked ? "?" : `${st.mx.toFixed(1)}, ${st.my.toFixed(1)}`} />
        <Readout label="Correlation r" value={locked ? "?" : st.r.toFixed(2)} />
        {line && <Readout label="Fitted line" value={`y = ${st.icpt.toFixed(2)} + ${st.slope.toFixed(2)}x`} />}
      </Row>
    </div>
  );
}

export default function SameLineFourPictures({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your teacher hands out four sets of 11 points with the same means, spreads and correlation (${RTXT}). One of them plots as a curve. Its best-fit line is:`,
        options: ["Much flatter than the others", "The same as the others", "Steeper than the others"],
        answer: 1,
      }}
      exploreHint="Show the fitted line, then flip through sets I to IV."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            You saw the line <strong>{LINE}</strong> on all four sets, with r = {RTXT} each time, yet the pictures differ: a cloud, a curve, an outlier, and
            a single point that holds the whole slope.
          </p>
          <p>
            Means, spread and correlation cannot tell these apart. Always draw the data. (These are Anscombe&rsquo;s four sets, made up in 1973 to
            show exactly this.)
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}

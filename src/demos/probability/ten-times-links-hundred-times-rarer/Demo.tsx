"use client";

// Power law with exponent 2: the share of pages with k links is proportional to 1/k².
// Relative to pages with 1 link: k = 10 → 1/100, k = 100 → 1/10,000, k = 1,000 → 1/1,000,000.
// Each tenfold step in k divides the share by 10² = 100; on log–log axes log(c·k^-2) = log c − 2·log k,
// a straight line of slope −2.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const KS = [1, 10, 100, 1000];
const rel = (k: number) => 1 / (k * k);
const n = (x: number) => x.toLocaleString("en-US");

// chart box
const W = 320;
const H = 210;
const X0 = 46;
const X1 = 304;
const Y0 = 14; // top
const Y1 = 172; // bottom
const xLin = (k: number) => X0 + ((X1 - X0) * k) / 1000;
const yLin = (v: number) => Y1 - (Y1 - Y0) * v;
const xLog = (k: number) => X0 + ((X1 - X0) * Math.log10(k)) / 3;
const yLog = (v: number) => Y1 - ((Y1 - Y0) * (Math.log10(v) + 6)) / 6;

// curve samples, k from 1 to 1000 spaced evenly in log k
const SAMPLES = Array.from({ length: 121 }, (_, i) => Math.pow(10, (3 * i) / 120));

export default function TenTimesLinksHundredTimesRarer({ slug }: { slug: string }) {
  const [log, setLog] = useState(false);
  const [ki, setKi] = useState(2); // k = 100

  const k = KS[ki];
  const xf = log ? xLog : xLin;
  const yf = log ? yLog : yLin;
  const curve = SAMPLES.map((kk, i) => `${i ? "L" : "M"}${xf(kk).toFixed(1)},${yf(rel(kk)).toFixed(1)}`).join(" ");
  const xTicks = log ? KS : [0, 250, 500, 750, 1000];
  const yTicks = log
    ? [
        { v: 1, t: "1" },
        { v: 1e-2, t: "1/100" },
        { v: 1e-4, t: "1/10⁴" },
        { v: 1e-6, t: "1/10⁶" },
      ]
    : [1, 0.5, 0].map((v) => ({ v, t: String(v) }));

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "The share of pages with k links falls like 1/k². How much rarer are pages with 1,000 links than pages with 100?",
        options: ["10 times", "100 times", "Millions of times"],
        answer: 1,
      }}
      exploreHint="Switch to log–log axes, then move k up to 1,000 and watch the factor at each step."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Pages with 1,000 links came out 100 times rarer than pages with 100, and those were 100 times rarer than pages
            with 10. Every tenfold step in links costs the same factor, 100.
          </p>
          <p>
            That is why the log–log picture is a straight line of slope −2: down two powers of ten for every power of ten
            across. On linear axes everything past about 10 links looks like zero, but there is no cliff: pages with 1,000
            links are rare, not absent.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["loglog", "k1000"]}>
          {(reach) => (
            <div className={s.wrap}>
              <p className={s.note}>
                {log ? "Log–log axes: each step is ten times more links." : "Linear axes: share of pages with k links, vs k = 1."}
              </p>
              <svg viewBox={`0 0 ${W} ${H}`} className="stage-svg" role="img" aria-label={`${log ? "Log–log" : "Linear"} chart of 1/k²`}>
                <line x1={X0} y1={Y1} x2={X1} y2={Y1} stroke="var(--line)" strokeWidth={1.5} />
                <line x1={X0} y1={Y0} x2={X0} y2={Y1} stroke="var(--line)" strokeWidth={1.5} />
                {xTicks.map((t) => (
                  <text key={`x${t}`} x={log ? xLog(t) : xLin(t)} y={Y1 + 14} textAnchor="middle" className={s.tick}>
                    {n(t)}
                  </text>
                ))}
                {yTicks.map(({ v, t }) => (
                  <text key={`y${t}`} x={X0 - 4} y={yf(v) + 3} textAnchor="end" className={s.tick}>
                    {t}
                  </text>
                ))}
                <text x={(X0 + X1) / 2} y={H - 4} textAnchor="middle" className={s.tick}>
                  k, number of links
                </text>
                <path d={curve} fill="none" stroke="var(--domain)" strokeWidth={2.5} />
                {log &&
                  !locked &&
                  KS.slice(1).map((kk) => (
                    <text
                      key={`f${kk}`}
                      x={(xLog(kk) + xLog(kk / 10)) / 2 + 8}
                      y={(yLog(rel(kk)) + yLog(rel(kk / 10))) / 2 - 4}
                      className={s.factor}
                    >
                      ÷100
                    </text>
                  ))}
                {KS.map((kk) => (
                  <circle
                    key={`p${kk}`}
                    cx={xf(kk)}
                    cy={yf(rel(kk))}
                    r={kk === k ? 6 : 3.5}
                    fill={kk === k ? "var(--good)" : "var(--fg)"}
                  />
                ))}
                <text
                  x={Math.min(xf(k) + 8, X1 - 4)}
                  y={Math.max(yf(rel(k)) - 10, Y0 + 10)}
                  textAnchor={k === 1000 ? "end" : "start"}
                  className={s.label}
                >
                  k = {n(k)}
                </text>
              </svg>
              <Row>
                <Control
                  className={`tap ${log ? "active" : ""}`}
                  disabled={locked}
                  onClick={() => {
                    if (locked) return;
                    setLog(true);
                    reach("loglog");
                  }}
                >
                  Log–log axes
                </Control>
                <Control
                  className={`tap ${log ? "" : "active"}`}
                  disabled={locked}
                  onClick={() => {
                    if (locked) return;
                    setLog(false);
                  }}
                >
                  Linear axes
                </Control>
              </Row>
              <Slider
                label="Pages with k links, k ="
                value={ki}
                min={0}
                max={KS.length - 1}
                disabled={locked}
                format={(v) => n(KS[v])}
                onChange={(v) => {
                  if (locked) return;
                  setKi(v);
                  if (KS[v] === 1000) reach("k1000");
                }}
              />
              <Row>
                <Readout label="Share vs k = 1" value={locked ? "?" : k === 1 ? "1" : `1/${n(k * k)}`} />
                <Readout label={k === 1 ? "Rarer than k ÷ 10" : `Rarer than k = ${n(k / 10)}`} value={locked ? "?" : k === 1 ? "–" : "100×"} />
              </Row>
            </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

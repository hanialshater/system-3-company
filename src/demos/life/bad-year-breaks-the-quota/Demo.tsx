"use client";

// Bad year breaks the quota (brief: company/domains/briefs/life.ecology-body.md #2, check E2).
// Two logistic lakes, dN/dt = 0.5 N (1 - N/1000) - H, N(0) = 600, Euler step 0.001 year, years 0 to 60.
// Lake A: H = 120 a year (fixed number). Lake B: H = 0.2 N (fixed share; 120 at 600).
// At year 10 a disease multiplies N by 0.7 or 0.5 (preset buttons). Deterministic.
// Quota balance points: 0.5 N (1 - N/1000) = 120 at N = 400 and 600, so A drains from any N below 400.
// Share balance: 0.5 (1 - N/1000) = 0.2 at N = 600, and B grows back from any N below it.
// Milestones: "k30" (30% seen) and "k50" (50% seen, the question's case). At the reveal the 50% case is
// put on the stage (the 30% case stays as faint traces), so every value the reveal quotes is drawn.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const K = 1000;
const R = 0.5;
const YEARS = 60;
const START = 600;
const QUOTA = 120;
const SHARE = 0.2;
const TIP = 400; // lower balance point of the quota lake
const MILESTONES = ["k30", "k50"] as const;
type Kill = 0 | 0.3 | 0.5;

type Run = { pts: [number, number][]; end: number; emptyYear: number | null };

export function simulate(rule: "quota" | "share", kill: number): Run {
  const dt = 0.001;
  const steps = Math.round(YEARS / dt);
  const hit = Math.round(10 / dt);
  let n = START;
  let emptyYear: number | null = null;
  const pts: [number, number][] = [[0, n]];
  for (let i = 0; i < steps; i++) {
    if (i === hit) {
      pts.push([10, n]);
      n *= 1 - kill;
      pts.push([10, n]);
    }
    if (n > 0) {
      const h = rule === "quota" ? QUOTA : SHARE * n;
      n += dt * (R * n * (1 - n / K) - h);
      if (n <= 0) {
        n = 0;
        emptyYear = (i + 1) * dt;
        pts.push([emptyYear, 0]);
      }
    }
    if ((i + 1) % 250 === 0 && (n > 0 || emptyYear === null || (i + 1) * dt > emptyYear)) pts.push([(i + 1) * dt, n]);
  }
  return { pts, end: n, emptyYear };
}

const RUNS: Record<Kill, { A: Run; B: Run }> = {
  0: { A: simulate("quota", 0), B: simulate("share", 0) },
  0.3: { A: simulate("quota", 0.3), B: simulate("share", 0.3) },
  0.5: { A: simulate("quota", 0.5), B: simulate("share", 0.5) },
};
const yr = (t: number) => Math.ceil(t); // 16.9 -> "year 17"
const endOf = (r: Run) => (r.emptyYear === null ? `${Math.round(r.end)} fish` : `empty in year ${yr(r.emptyYear)}`);
const growthAt = (n: number) => R * n * (1 - n / K);

// Chart geometry.
const W = 356, H = 206;
const X0 = 38, X1 = 268, Y0 = 12, Y1 = 182;
const X = (t: number) => X0 + (t / YEARS) * (X1 - X0);
const Y = (n: number) => Y1 - (n / K) * (Y1 - Y0);
const path = (pts: [number, number][]) => pts.map(([t, n], i) => `${i ? "L" : "M"}${X(t).toFixed(1)},${Y(n).toFixed(1)}`).join(" ");

function Stage({ locked, atReveal, kill, tried, onKill }: { locked: boolean; atReveal: boolean; kill: Kill; tried: Kill[]; onKill: (k: Kill) => void }) {
  const run = RUNS[kill];
  const tried30 = kill !== 0.3 && tried.includes(0.3);
  const tried50 = kill !== 0.5 && tried.includes(0.5);
  const lockedPts = (r: Run) => r.pts.filter(([t]) => t <= 10).slice(0, -1);
  const aPts = locked ? lockedPts(run.A) : run.A.pts;
  const bPts = locked ? lockedPts(run.B) : run.B.pts;
  const yA = run.A.emptyYear === null ? Y(run.A.end) : Y(0);
  const yB = Y(run.B.end);
  // End labels in the right gutter, nudged apart.
  let la = yA, lb = yB;
  if (Math.abs(la - lb) < 13) {
    const mid = (la + lb) / 2;
    la = mid + (la >= lb ? 7 : -7);
    lb = mid + (la >= lb ? -7 : 7);
  }
  const readout = locked
    ? "year 60: ?"
    : `year 60: A ${run.A.emptyYear === null ? `${Math.round(run.A.end)} fish` : "empty"} · B ${Math.round(run.B.end)} fish`;
  const showTip = !locked && kill !== 0;
  const after = kill === 0.5 ? Math.round(START * 0.5) : null;

  return (
    <div className={s.wrap}>
      {!atReveal && (
        <p className={s.msg}>
          {locked
            ? "Two lakes of 600 fish, steady for years. Lake A: catch 120 fish a year. Lake B: catch 20% a year, also 120 now."
            : "Toy lakes: fish add 0.5·N·(1 − N/1000) a year. A takes 120 a year; B takes 20%."}
        </p>
      )}
      <div className={s.panel}>
        <p className={s.readout} data-testid="year60">{readout}</p>
        <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img"
          aria-label={locked ? "Both lakes flat at 600 fish up to year 10" : `${kill ? `Disease kills ${kill * 100}% in year 10. ` : "No disease. "}Lake A: ${endOf(run.A)} by year 60. Lake B: ${endOf(run.B)}.`}>
          {[0, 500, 1000].map((v) => (
            <g key={v}>
              <line x1={X0} x2={X1} y1={Y(v)} y2={Y(v)} className={s.grid} />
              <text x={X0 - 4} y={Y(v) + 4} textAnchor="end" className={s.tick}>{v.toLocaleString("en-US")}</text>
            </g>
          ))}
          {[0, 10, 20, 40, 60].map((t) => (
            <text key={t} x={X(t)} y={H - 6} textAnchor="middle" className={s.tick}>{t === 60 ? "60 yr" : t}</text>
          ))}

          {showTip && (
            <g>
              <line x1={X0} x2={X1} y1={Y(TIP)} y2={Y(TIP)} className={s.tip} />
              <text x={X(60) - 2} y={Y(TIP) - 4} textAnchor="end" className={s.tipText}>A&apos;s tipping point: 400</text>
            </g>
          )}

          {tried30 && (
            <g>
              <path d={path(RUNS[0.3].A.pts)} className={s.traceA} />
              <path d={path(RUNS[0.3].B.pts)} className={s.traceB} />
            </g>
          )}
          {tried50 && (
            <g>
              <path d={path(RUNS[0.5].A.pts)} className={s.traceA} />
              <path d={path(RUNS[0.5].B.pts)} className={s.traceB} />
            </g>
          )}

          <path d={path(bPts)} className={s.lineB} />
          <path d={path(aPts)} className={s.lineA} />

          {after !== null && <circle cx={X(10)} cy={Y(after)} r={3.5} className={s.dot} />}
          {after !== null && (
            <text x={X(18)} y={Y(150)} className={s.note}>
              at {after} fish: grows {growthAt(after)}, A takes {QUOTA}
            </text>
          )}

          {!locked && (
            <g>
              <text x={X1 + 4} y={la + 4} className={s.endA}>A: 120 a year</text>
              <text x={X1 + 4} y={lb + 4} className={s.endB}>B: 20%</text>
            </g>
          )}
          {locked && (
            <text x={X(10) + 6} y={Y(START) - 6} className={s.tick}>year 10</text>
          )}
        </svg>
      </div>
      <Row>
        <Control className={kill === 0.3 ? "active" : ""} disabled={locked || kill === 0.3} onClick={() => onKill(0.3)}>
          Disease kills 30%
        </Control>
        <Control className={kill === 0.5 ? "active" : ""} disabled={locked || kill === 0.5} onClick={() => onKill(0.5)}>
          Disease kills 50%
        </Control>
      </Row>
    </div>
  );
}

export default function BadYearBreaksTheQuota({ slug }: { slug: string }) {
  const [kill, setKill] = useState<Kill>(0);
  const [tried, setTried] = useState<Kill[]>([]);
  const a50 = RUNS[0.5].A;
  const b50 = RUNS[0.5].B;
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "In year 10 a disease kills half the fish in both lakes. Which lakes still have fish in year 60?",
        options: ["Both", "Only lake A", "Only lake B", "Neither"],
        answer: 2,
      }}
      exploreHint="Try both diseases and read year 60 for each lake."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            After a 30% loss both lakes came back. After a 50% loss, lake B recovered to {Math.round(b50.end)}, but lake A was empty in year {yr(a50.emptyYear ?? YEARS)}.
          </p>
          <p>
            Lake A&apos;s catch stays {QUOTA} however few fish remain. At {START / 2} fish the lake adds only{" "}
            {growthAt(START / 2)} a year, so each year takes more than it adds. Lake B&apos;s 20% shrinks with the stock:{" "}
            {SHARE * (START / 2)} fish at {START / 2}.
          </p>
          <p>A fixed number has a tipping point, {TIP} fish here; a fixed share has none. Toy model, not fishing advice.</p>
        </>
      )}
    >
      {({ locked, interact, phase }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <RevealSync atReveal={phase === "reveal"} onOpen={() => setKill(0.5)}>
              <Stage
                locked={locked}
                atReveal={phase === "reveal"}
                kill={kill}
                tried={tried}
                onKill={(k) => {
                  setTried((v) => (v.includes(k) ? v : [...v, k]));
                  setKill(k);
                  reach(k === 0.3 ? "k30" : "k50");
                }}
              />
            </RevealSync>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

/** When the reveal opens, put the question's case (50%) on the stage; the 30% case stays as faint traces. */
function RevealSync({ atReveal, onOpen, children }: { atReveal: boolean; onOpen: () => void; children: ReactNode }) {
  const open = useRef(onOpen);
  open.current = onOpen;
  useEffect(() => {
    if (atReveal) open.current();
  }, [atReveal]);
  return <>{children}</>;
}

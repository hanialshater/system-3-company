"use client";

// Newton's cradle, ideal identical balls (mass m, speed v before the hit; units m = v = 1).
// Two balls at v hit the row. Three candidate outcomes are tested against two tallies:
// momentum n v and energy 1/2 n v^2. Only "two balls at v" keeps both. A ball at speed k v swings
// to a height k^2 times higher, so the drawn angle comes from 1 - cos(theta) = k^2 (1 - cos(theta0)).
// Key state: all three outcomes tried ("all-three"). QA path: press each outcome once, in order.
// Every number comes from BEFORE and OUTCOMES.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

interface Motion { n: number; speed: number }
const BEFORE: Motion = { n: 2, speed: 1 };
const OUTCOMES: { label: string; m: Motion }[] = [
  { label: "Two balls at the starting speed", m: { n: 2, speed: 1 } },
  { label: "One ball at double speed", m: { n: 1, speed: 2 } },
  { label: "One ball at the starting speed", m: { n: 1, speed: 1 } },
];
const MOMENTUM = (m: Motion) => m.n * m.speed;
const ENERGY = (m: Motion) => 0.5 * m.n * m.speed ** 2;
const KEEPS = (m: Motion) => MOMENTUM(m) === MOMENTUM(BEFORE) && ENERGY(m) === ENERGY(BEFORE);
const MILESTONES = ["all-three"] as const;
const fmt = (x: number) => String(x);

const TH0 = (30 * Math.PI) / 180;
const angle = (speed: number) => Math.acos(1 - speed ** 2 * (1 - Math.cos(TH0)));
const L = 82;
const R = 10;
const TOP = 18;
const XS = [110, 130, 150, 170, 190];
const ball = (i: number, th: number) => ({ x: XS[i] + L * Math.sin(th), y: TOP + L * Math.cos(th) });

export default function CradleTwoInTwoOut({ slug }: { slug: string }) {
  const [pick, setPick] = useState<number | null>(null);
  const [tried, setTried] = useState<number[]>([]);
  const m = pick === null ? null : OUTCOMES[pick].m;
  const bP = MOMENTUM(BEFORE);
  const bE = ENERGY(BEFORE);
  const good = OUTCOMES.find((o) => KEEPS(o.m))!;

  const bars = (label: string, before: number, after: number | null, px: number) => {
    return { label, before, after, px };
  };
  const rows = [
    bars("Momentum (m v)", bP, m ? MOMENTUM(m) : null, 48),
    bars("Energy (½ m v²)", bE, m ? ENERGY(m) : null, 48),
  ];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "On a desk Newton's cradle, you lift two balls at one end and let them go. After the click, what swings out at the far end?",
        options: OUTCOMES.map((o) => o.label),
        answer: 0,
      }}
      exploreHint="Try each outcome and watch the two bars."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Before the hit: momentum {fmt(bP)} and energy {fmt(bE)} (units m v and m v²). You tried all three outcomes:
          </p>
          <p>
            {OUTCOMES.map((o) => `${o.label.toLowerCase()}: ${fmt(MOMENTUM(o.m))} and ${fmt(ENERGY(o.m))}`).join("; ")}. Only{" "}
            <strong>{good.label.toLowerCase()}</strong> keeps both tallies, so two constraints leave one way to move.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const caption = locked
              ? "Make a prediction to start."
              : "Pick what swings out. Bars compare before and after.";
            const left = m ? 0 : angle(BEFORE.speed);
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 236" className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
                  <line x1={90} y1={TOP} x2={210} y2={TOP} className={s.frame} />
                  {XS.map((x, i) => {
                    let th = 0;
                    if (!m && i < BEFORE.n) th = -left;
                    if (m && i >= XS.length - m.n) th = angle(m.speed);
                    const b = ball(i, th);
                    return (
                      <g key={i}>
                        <line x1={x} y1={TOP} x2={b.x} y2={b.y} className={s.string} />
                        <circle cx={b.x} cy={b.y} r={R} className={s.ball} />
                      </g>
                    );
                  })}
                  {m &&
                    XS.slice(0, BEFORE.n).map((x, i) => {
                      const b = ball(i, -angle(BEFORE.speed));
                      return <circle key={`g${i}`} cx={b.x} cy={b.y} r={R} className={s.ghost} />;
                    })}
                  <text x={316} y={14} className={`${s.chip} ${s.chipR}`}>
                    Ideal identical balls, no losses
                  </text>
                  <text x={4} y={14} className={s.chip}>
                    {m ? "Faint: before" : "Lifted: before"}
                  </text>
                  {rows.map((r, i) => {
                    const y = 134 + i * 52;
                    const after = r.after;
                    const ok = after !== null && after === r.before;
                    return (
                      <g key={r.label}>
                        <text x={12} y={y} className={s.rowLab}>
                          {r.label}
                        </text>
                        <rect x={12} y={y + 6} width={r.before * r.px} height={12} className={s.before} />
                        <text x={12 + r.before * r.px + 6} y={y + 16} className={s.val}>
                          before {fmt(r.before)}
                        </text>
                        {after !== null && (
                          <>
                            <rect x={12} y={y + 22} width={after * r.px} height={12} className={ok ? s.same : s.differs} />
                            <text x={12 + after * r.px + 6} y={y + 32} className={ok ? s.valOk : s.valBad}>
                              after {fmt(after)} {ok ? "same" : "differs"}
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>

                <p className={s.caption} aria-live="polite">
                  {caption}
                </p>

                <div className={s.picks} role="group" aria-label="Pick the outcome">
                  {OUTCOMES.map((o, i) => (
                    <Control
                      key={o.label}
                      disabled={locked || pick === i}
                      className={pick === i ? "active" : ""}
                      onClick={() => {
                        setPick(i);
                        const next = tried.includes(i) ? tried : [...tried, i];
                        setTried(next);
                        if (next.length === OUTCOMES.length) reach("all-three");
                      }}
                    >
                      {o.label}
                    </Control>
                  ))}
                </div>
                <Row>
                  <Readout label="Momentum kept?" value={locked || !m ? "?" : MOMENTUM(m) === bP ? "Yes" : "No"} />
                  <Readout label="Energy kept?" value={locked || !m ? "?" : ENERGY(m) === bE ? "Yes" : "No"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

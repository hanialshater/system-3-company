"use client";

// Optional stopping. 20 seeded fair-coin experiments are drawn as z-score lines against a +-1.96 band. The learner
// switches between "look every flip" (flag a line the first time it leaves the band from flip 10) and "look only at
// the end", then counts all 100 seeded coins. Key state: both modes seen and the 100-coin count shown.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { BAND, FIRST_LOOK, FLIPS, SHOWN, TOTAL, countEnd, countEvery, exact, walks } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["every", "end", "hundred"] as const;
const W = 320;
const H = 140;
const PL = 22;
const ZM = 4;
const px = (n: number) => PL + (n / FLIPS) * (W - PL - 6);
const py = (z: number) => H / 2 - (Math.max(-ZM, Math.min(ZM, z)) / ZM) * (H / 2 - 8);
const W100 = walks(TOTAL);
const SHOWN_W = W100.slice(0, SHOWN);
const EV = countEvery(W100);
const EN = countEnd(W100);
const EX = exact();
const pct = (p: number) => `${Math.round(p * 100)}%`;

type Mode = "none" | "every" | "end";

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [mode, setMode] = useState<Mode>("none");
  const [counted, setCounted] = useState(false);
  const flagged = (w: (typeof SHOWN_W)[number]) => (mode === "every" ? w.firstCross > 0 : mode === "end" ? w.endFlag : false);
  const k = SHOWN_W.filter(flagged).length;

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : `Each line is a fair coin: z = (heads - tails) / sqrt(flips). Outside the band, the test says biased.`}
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`${SHOWN} fair-coin z-score lines, mode ${mode}`}>
        <rect x={px(0)} y={py(BAND)} width={px(FLIPS) - px(0)} height={py(-BAND) - py(BAND)} className={s.band} />
        <line x1={px(0)} x2={px(FLIPS)} y1={py(BAND)} y2={py(BAND)} className={s.edge} />
        <line x1={px(0)} x2={px(FLIPS)} y1={py(-BAND)} y2={py(-BAND)} className={s.edge} />
        <text x={PL - 3} y={py(BAND) + 3} textAnchor="end" className={s.lab}>1.96</text>
        <text x={PL - 3} y={py(-BAND) + 3} textAnchor="end" className={s.lab}>-1.96</text>
        {mode === "every" && <line x1={px(FIRST_LOOK)} x2={px(FIRST_LOOK)} y1={4} y2={H - 14} className={s.look} />}
        {mode === "end" && <line x1={px(FLIPS)} x2={px(FLIPS)} y1={4} y2={H - 14} className={s.look} />}
        {SHOWN_W.map((w, i) => (
          <polyline
            key={i}
            fill="none"
            className={flagged(w) ? s.hit : s.line}
            points={w.z.map((z, n) => `${px(n).toFixed(1)},${py(z).toFixed(1)}`).join(" ")}
          />
        ))}
        {mode === "every" &&
          SHOWN_W.filter((w) => w.firstCross > 0).map((w, i) => <circle key={i} cx={px(w.firstCross)} cy={py(w.z[w.firstCross])} r={2.6} className={s.dot} />)}
        <text x={px(FLIPS)} y={H - 3} textAnchor="end" className={s.lab}>flips 0 to {FLIPS}</text>
      </svg>
      <Row>
        <Control
          className={mode === "every" ? "active" : ""}
          disabled={locked}
          onClick={() => {
            setMode("every");
            reach("every");
          }}
        >
          Look every flip
        </Control>
        <Control
          className={mode === "end" ? "active" : ""}
          disabled={locked}
          onClick={() => {
            setMode("end");
            reach("end");
          }}
        >
          Look only at the end
        </Control>
        <Control
          disabled={locked || counted}
          onClick={() => {
            setCounted(true);
            reach("hundred");
          }}
        >
          Count all {TOTAL} coins
        </Control>
      </Row>
      <Row>
        <Readout label={`Flagged of ${SHOWN} shown`} value={locked ? "?" : mode === "none" ? "-" : k} />
        <Readout label={`Of ${TOTAL}: every flip`} value={locked || !counted ? "-" : EV} />
        <Readout label={`Of ${TOTAL}: end only`} value={locked || !counted ? "-" : EN} />
      </Row>
    </div>
  );
}

export default function StopWhenItLooksSignificant({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A friend's coin is fair, but you doubt it. From flip ${FIRST_LOOK} to flip ${FLIPS} you run a 5% test after each flip, stopping once it looks biased. How often do you wrongly call it biased?`,
        options: ["about 5%", `about ${pct(EX.peek)}`, "about 60%"],
        answer: 1,
      }}
      exploreHint="Switch between looking every flip and only at the end, then count all 100 coins."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Of the {TOTAL} fair coins, {EV} left the band at some flip when you looked every time, but only {EN} were outside it at the end. Exactly: {(EX.peek * 100).toFixed(1)}% with checks at flips {FIRST_LOOK} to {FLIPS}, against {(EX.end * 100).toFixed(1)}% for one look.
          </p>
          <p>
            Noise wanders, and each look is another chance for it to cross the line. A 5% test assumes you look once. Another set of 100 coins would give different counts.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}

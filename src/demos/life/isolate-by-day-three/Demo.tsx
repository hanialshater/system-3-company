"use client";

// Toy model of isolation timing. A made-up infection with R0 = 3: a case is infectious for
// 6 days and spreads evenly across them (R0/6 = 0.5 infections a day). Isolation at the end of
// day d stops all later spread, so R = R0 x d / 6. The stage shows 10 such cases: 30 would-be
// infections, 5 per day; the ones after the isolation line are crossed out. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const R0 = 3;
const DAYS = 6;
const CASES = 10;
const PER_DAY = (CASES * R0) / DAYS; // 5
const TOTAL = CASES * R0; // 30
const DAY_Q = 3;
const DAY_EDGE = 2;
const MILESTONES = ["day-3", "day-2"] as const;
const CW = 46, DOT = 13, TOP = 8;

const rAt = (d: number) => (R0 * d) / DAYS;
const fmtR = (r: number) => (Number.isInteger(r) ? String(r) : r.toFixed(1));

function Stage({ locked, iso, setIso }: { locked: boolean; iso: number; setIso: (d: number) => void }) {
  const happen = iso * PER_DAY;
  const r = rAt(iso);
  const W = DAYS * CW, H = TOP + PER_DAY * DOT + 30;
  const msg = locked
    ? `Make a prediction to start. Toy: ${CASES} cases, R0 ${R0}, spread evenly over ${DAYS} infectious days.`
    : iso === DAYS
      ? `Never isolated: all ${TOTAL} infections happen. R = ${TOTAL}/${CASES} = ${R0}.`
      : `Isolated after day ${iso}: ${happen} of ${TOTAL} infections happen. R = ${happen}/${CASES} = ${fmtR(r)}.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`-4 0 ${W + 8} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {Array.from({ length: DAYS }, (_, d) => (
          <g key={d}>
            <rect x={d * CW + 3} y={TOP - 4} width={CW - 6} height={PER_DAY * DOT + 6} rx={6} className={!locked && d >= iso ? s.colOff : s.col} />
            {Array.from({ length: PER_DAY }, (_, k) => {
              const cx = d * CW + CW / 2, cy = TOP + k * DOT + DOT / 2;
              const off = !locked && d >= iso;
              return (
                <g key={k}>
                  <circle cx={cx} cy={cy} r={4.5} className={off ? s.stopped : s.inf} />
                  {off && <path d={`M${cx - 4},${cy - 4} L${cx + 4},${cy + 4}`} className={s.cross} />}
                </g>
              );
            })}
            <text x={d * CW + CW / 2} y={H - 10} className={s.lab} textAnchor="middle">day {d + 1}</text>
          </g>
        ))}
        {!locked && iso < DAYS && (
          <line x1={iso * CW} x2={iso * CW} y1={0} y2={H - 22} className={s.iso} />
        )}
      </svg>

      <p className={s.msg} aria-live="polite">{msg}</p>

      <Row>
        {[DAY_Q, DAY_EDGE].map((d) => (
          <Control key={d} className={iso === d ? "active" : ""} aria-pressed={iso === d} disabled={locked || iso === d} onClick={() => setIso(d)}>
            Isolate after day {d}
          </Control>
        ))}
      </Row>
      <Slider label="Isolated after day" value={iso} min={0} max={DAYS} disabled={locked} format={(v) => (v === DAYS ? "never" : `day ${v}`)} onChange={setIso} />
    </div>
  );
}

export default function IsolateByDayThree({ slug }: { slug: string }) {
  const [iso, setIsoState] = useState(DAYS);
  const [tried, setTried] = useState<number[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Made-up infection, R0 = ${R0}. A case is infectious for ${DAYS} days, spreading evenly across them. If each case is isolated at the end of day ${DAY_Q}, what is R?`,
        options: [String(R0), fmtR(rAt(DAY_Q)), fmtR(rAt(1))],
        answer: 1,
      }}
      exploreHint={`Isolate after day ${DAY_Q}, then after day ${DAY_EDGE}. Watch R.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Isolating after day {DAY_Q} kept {DAY_Q} of {DAYS} infectious days, so half the spread still happened: {DAY_Q * PER_DAY} of{" "}
            {TOTAL} infections, R = <strong>{fmtR(rAt(DAY_Q))}</strong>. Isolation does not have to catch everyone eventually; each day
            earlier removes another sixth.
          </p>
          <p>
            After day {DAY_EDGE}, R was exactly {fmtR(rAt(DAY_EDGE))}: the knife-edge in this model, where each case only replaces itself.
            {tried.length ? ` You also tried ${tried.map((d) => (d === DAYS ? "never" : `day ${d} (R ${fmtR(rAt(d))})`)).join(", ")}.` : ""}
          </p>
          <p className="muted">
            Toy model: spread is even across the days. Real infectiousness is not even, and some spread can happen before symptoms.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              iso={iso}
              setIso={(d) => {
                setIsoState(d);
                if (d === DAY_Q) reach("day-3");
                else if (d === DAY_EDGE) reach("day-2");
                else setTried((t) => (t.includes(d) ? t : [...t, d].slice(-3)));
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

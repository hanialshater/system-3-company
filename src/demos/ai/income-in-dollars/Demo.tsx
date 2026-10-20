"use client";

// Feature scaling. Query: 30 years, $50,000. A: 31, $58,000. B: 60, $51,000. Distance is
// sqrt(age gap^2 + income gap^2) with income in the chosen unit. In dollars B is nearer
// (1,000.4 vs 8,000.0); in $100s still B (31.6 vs 80.0); in $1,000s A is nearer (8.06 vs 30.0).
// The plot uses the same scale on both axes, so the drawn circle is the true distance.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
type Person = { id: string; age: number; income: number };
const QUERY: Person = { id: "you", age: 30, income: 50000 };
const PEOPLE: Person[] = [
  { id: "A", age: 31, income: 58000 },
  { id: "B", age: 60, income: 51000 },
  { id: "", age: 25, income: 72000 },
  { id: "", age: 45, income: 64000 },
  { id: "", age: 52, income: 38000 },
  { id: "", age: 22, income: 30000 },
  { id: "", age: 38, income: 85000 },
  { id: "", age: 66, income: 77000 },
  { id: "", age: 41, income: 44000 },
  { id: "", age: 19, income: 59000 },
  { id: "", age: 57, income: 26000 },
  { id: "", age: 35, income: 41000 },
];
const UNITS = [1, 100, 1000] as const;

const dist = (p: Person, unit: number) => Math.hypot(p.age - QUERY.age, (p.income - QUERY.income) / unit);
function nearest(unit: number) {
  let best = PEOPLE[0];
  for (const p of PEOPLE) if (dist(p, unit) < dist(best, unit)) best = p;
  return best;
}
// MODEL END

const unitName = (u: number) => (u === 1 ? "$1" : `$${u.toLocaleString("en-US")}`);
const unitsLabel = (u: number) => (u === 1 ? "dollars" : `${unitName(u)}s`);
const fmt = (d: number) => (d >= 100 ? d.toFixed(0) : d.toFixed(1));

// Plot box (viewBox 320 x 236): x 34..306, y 22..206, equal scale on both axes.
const BX0 = 34;
const BX1 = 306;
const BY0 = 22;
const BY1 = 206;

function layout(unit: number) {
  const all = [QUERY, ...PEOPLE];
  const xs = all.map((p) => p.age);
  const ys = all.map((p) => p.income / unit);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const k = Math.min((BX1 - BX0) / (maxX - minX), (BY1 - BY0) / (maxY - minY));
  const cx = (BX0 + BX1) / 2 - ((minX + maxX) / 2) * k;
  const cy = (BY0 + BY1) / 2 + ((minY + maxY) / 2) * k;
  return { k, X: (p: Person) => cx + p.age * k, Y: (p: Person) => cy - (p.income / unit) * k };
}

export default function IncomeInDollars({ slug }: { slug: string }) {
  const [unit, setUnit] = useState<number>(1);
  const [chosen, setChosen] = useState(false); // no unit is picked until the learner taps one
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["dollars", "thousands"]);
  const { k, X, Y } = layout(unit);
  const near = nearest(unit);
  const [A, B] = PEOPLE;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A matching app looks for the person most like you: 30 years old, earning $50,000. A is 31 and earns $58,000. B is 60 and earns $51,000. Using straight-line distance with income in dollars, who comes out nearest?",
        options: ["A", "B", "A tie"],
        answer: 1,
      }}
      exploreHint="Tap each unit income is measured in. Watch who counts as nearest."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            In dollars, B is {fmt(dist(B, 1))} away and A is {fmt(dist(A, 1))}: <strong>B wins</strong>, though B is 30 years
            older. A one-year gap counts the same as a one-dollar gap, so age barely registers: on the plot everyone squeezed into
            one vertical line.
          </p>
          <p>
            Measure income in $1,000s and A is {fmt(dist(A, 1000))} away, B {fmt(dist(B, 1000))}: <strong>A wins</strong>. Nothing
            about the people changed, only the units. Distance obeys the size of the numbers, not their importance, so features
            are put on comparable scales before asking who is near.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const r = dist(near, unit) * k;
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 236" className="stage-svg" role="img" aria-label={`Income in ${unitName(unit)} units`}>
              <defs>
                <clipPath id="iid-clip">
                  <rect x={0} y={16} width={320} height={200} />
                </clipPath>
              </defs>
              <text x={160} y={12} textAnchor="middle" className={s.small} fill="var(--muted)">
                {chosen ? `1 year of age counts like ${unitName(unit)} of income` : "Pick a unit to place everyone"}
              </text>
              {!locked && chosen && (
                <g clipPath="url(#iid-clip)">
                  <circle cx={X(QUERY)} cy={Y(QUERY)} r={r} fill="var(--domain)" opacity={0.1} stroke="var(--domain)" strokeDasharray="4 3" />
                  <line x1={X(QUERY)} y1={Y(QUERY)} x2={X(near)} y2={Y(near)} stroke="var(--domain)" strokeWidth={2.5} />
                </g>
              )}
              {chosen && PEOPLE.map((p, i) => (
                <circle key={i} cx={X(p)} cy={Y(p)} r={p.id ? 6 : 4} fill={p.id ? "var(--fg)" : "var(--muted)"} opacity={p.id ? 1 : 0.7} />
              ))}
              {chosen && [A, B].map((p) => (
                <text key={p.id} x={X(p) + 9} y={Y(p) + 4} className={s.label} fill="var(--fg)">
                  {p.id}
                </text>
              ))}
              {chosen && <rect x={X(QUERY) - 6} y={Y(QUERY) - 6} width={12} height={12} fill="var(--domain)" transform={`rotate(45 ${X(QUERY)} ${Y(QUERY)})`} />}
              {chosen && (
                <text x={X(QUERY) - 10} y={Y(QUERY) + 4} textAnchor="end" className={s.label} fill="var(--domain)">
                  you
                </text>
              )}
              <text x={BX1} y={230} textAnchor="end" className={s.tiny} fill="var(--muted)">
                age →
              </text>
              <text x={6} y={230} className={s.tiny} fill="var(--muted)">
                ↑ income{chosen ? ` (${unitsLabel(unit)})` : ""}
              </text>
            </svg>
            <Row>
              <span className={s.small}>Income in:</span>
              {UNITS.map((u) => (
                <Control
                  key={u}
                  className={chosen && unit === u ? "active" : ""}
                  aria-pressed={chosen && unit === u}
                  disabled={locked || (chosen && unit === u)}
                  onClick={() => {
                    setUnit(u);
                    setChosen(true);
                    if (u === 1) reach("dollars");
                    if (u === 1000) reach("thousands");
                  }}
                >
                  {unitsLabel(u)}
                </Control>
              ))}
            </Row>
            {!locked && chosen && (
              <p className={s.small}>
                {[A, B].map((p) => (
                  <span key={p.id}>
                    {p.id}: age gap {Math.abs(p.age - QUERY.age)}, income gap {fmt(Math.abs(p.income - QUERY.income) / unit)} → {fmt(dist(p, unit))}.{" "}
                  </span>
                ))}
              </p>
            )}
            <Row>
              <Readout label="Nearest" value={locked || !chosen ? "–" : near.id} />
              <Readout label="A away" value={locked || !chosen ? "–" : fmt(dist(A, unit))} />
              <Readout label="B away" value={locked || !chosen ? "–" : fmt(dist(B, unit))} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}

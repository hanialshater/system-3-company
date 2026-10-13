"use client";

// 1,000 people, everyone exposed once. Unvaccinated risk 50%; the vaccine cuts
// risk by 90%, so vaccinated risk is 5%. Counts are expected values (no chance),
// so the learner sees exactly 45 + 50 cases at 90%. Vaccinated people fill the
// grid from the left, column by column, so the two groups sit side by side.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const COLS = 40;
const ROWS = 25;
const N = COLS * ROWS;
const GAP = 7.5;
const RISK_VAX = 0.05;
const RISK_UNVAX = 0.5;

// Seeded rank for choosing who in each group becomes a case.
const RANK = (() => {
  let x = 20261012;
  const next = () => (x = (x * 48271) % 2147483647) / 2147483647;
  const idx = Array.from({ length: N }, (_, i) => i);
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const r = Array(N).fill(0);
  idx.forEach((p, k) => (r[p] = k));
  return r;
})();

function town(sharePct: number) {
  const nVax = Math.round((sharePct / 100) * N);
  const vaxCases = Math.round(nVax * RISK_VAX);
  const unvaxCases = Math.round((N - nVax) * RISK_UNVAX);
  // Person i sits at column floor(i / ROWS), row i % ROWS; the first nVax are vaccinated.
  const vax = Array.from({ length: N }, (_, i) => i < nVax);
  const pick = (from: number, to: number, k: number) => {
    const ids = Array.from({ length: to - from }, (_, j) => from + j).sort((a, b) => RANK[a] - RANK[b]);
    return new Set(ids.slice(0, k));
  };
  const cases = new Set([...pick(0, nVax, vaxCases), ...pick(nVax, N, unvaxCases)]);
  return { nVax, vaxCases, unvaxCases, vax, cases };
}

const SHARES = [0, 50, 90, 100];
const START = 90; // the question setting; the stage opens here
const MILESTONES = ["nobody", "everybody"] as const;
// Reveal numbers come from the same function as the stage.
const AT90 = town(START);
const AT0 = town(0);
const AT100 = town(100);
const PCT90 = Math.round((100 * AT90.vaxCases) / (AT90.vaxCases + AT90.unvaxCases));

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const [share, setShare] = useState(START);
  const { reach } = useMilestones(interact, MILESTONES);
  const t = useMemo(() => town(share), [share]);
  const total = t.vaxCases + t.unvaxCases;
  const pctVax = total ? Math.round((100 * t.vaxCases) / total) : 0;
  const divider = Math.ceil(t.nVax / ROWS) * GAP;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${COLS * GAP} ${ROWS * GAP}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`${share}% vaccinated${locked ? "" : `: ${total} cases, ${t.vaxCases} of them vaccinated`}`}>
        {t.vax.map((v, i) => {
          const x = Math.floor(i / ROWS) * GAP + GAP / 2;
          const y = (i % ROWS) * GAP + GAP / 2;
          const sick = !locked && t.cases.has(i);
          return <circle key={i} cx={x} cy={y} r={sick ? 3.2 : 2.6} className={sick ? s.case : v ? s.vax : s.unvax} />;
        })}
        {t.nVax > 0 && t.nVax < N && <line x1={divider} x2={divider} y1={0} y2={ROWS * GAP} className={s.divider} />}
      </svg>

      <div className={s.legend} aria-hidden>
        <span><i className={s.vax} />vaccinated</span>
        <span><i className={s.unvax} />not vaccinated</span>
        <span><i className={s.case} />case</span>
      </div>

      <p className={s.msg} aria-live="polite">
        {locked ? "Make a prediction to start." : `Everyone is exposed. ${share}% vaccinated. Risk per person: 5% if vaccinated, 50% if not.`}
      </p>

      <Row>
        {SHARES.map((v) => (
          <Control
            key={v}
            className={`${s.chip} ${share === v ? "active" : ""}`}
            aria-pressed={share === v}
            disabled={locked || share === v}
            onClick={() => {
              setShare(v);
              if (v === 0) reach("nobody");
              if (v === 100) reach("everybody");
            }}
          >
            {v}% vaccinated
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="All cases" value={locked ? "?" : total} />
        <Readout label="Vaccinated" value={locked ? "?" : `${t.vaxCases} (${pctVax}%)`} />
        <Readout label="Unvaccinated" value={locked ? "?" : t.unvaxCases} />
      </Row>
    </div>
  );
}

export default function MostCasesVaccinated({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A town of 1,000 people, 90% of them vaccinated, is exposed to a disease. An unvaccinated person has a 50% chance of falling ill; the vaccine cuts that to 5%. About what share of the sick people are vaccinated?",
        options: ["About 5%", "About 25%", "About 47%", "About 90%"],
        answer: 2,
      }}
      exploreHint="Try 0% vaccinated, then 100%, and compare the case counts with the 90% you started at."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At {START}% vaccinated: {N - AT90.nVax} unvaccinated &times; 50% = {AT90.unvaxCases} cases, and {AT90.nVax}{" "}
            vaccinated &times; 5% = {AT90.vaxCases} cases. So <strong>about {PCT90}%</strong> of cases ({AT90.vaxCases} of{" "}
            {AT90.vaxCases + AT90.unvaxCases}) were vaccinated, though each vaccinated person had a tenth of the risk.
          </p>
          <p>
            With nobody vaccinated there were {AT0.unvaxCases} cases; with everybody, {AT100.vaxCases}, all vaccinated. A big
            protected group can fill a big share of a short list. Compare risk per person, not who fills the list.
          </p>
          <p className="muted">Made-up numbers; everyone equally exposed and the vaccine works the same for everyone.</p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}

"use client";

// 1,000 people, everyone exposed once. Unvaccinated risk 50%; the vaccine cuts
// risk by 90%, so vaccinated risk is 5%. Counts are expected values (no chance),
// so the learner sees exactly 45 + 50 cases at 90%. Vaccinated people fill the
// grid from the left, column by column, so the two groups sit side by side.

import { useMemo, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
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

export default function MostCasesVaccinated({ slug }: { slug: string }) {
  const [share, setShare] = useState(80);
  const hit = useRef(new Set<string>());
  const t = useMemo(() => town(share), [share]);
  const total = t.vaxCases + t.unvaxCases;
  const pctVax = total ? Math.round((100 * t.vaxCases) / total) : 0;
  const divider = Math.ceil(t.nVax / ROWS) * GAP;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "1,000 people, 90% vaccinated, all exposed. Unvaccinated risk is 50%; the vaccine cuts that risk by 90%. Roughly what share of the cases are vaccinated people?",
        options: ["About 5%", "About 47%", "About 90%"],
        answer: 1,
      }}
      exploreHint="Slide to 90% vaccinated and count. Then go to 100%."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            At 90%: 100 unvaccinated people &times; 50% = 50 cases, and 900 vaccinated &times; 5% = 45 cases. So{" "}
            <strong>about 47%</strong> of cases (45 of 95) were vaccinated, while each vaccinated person had a tenth of the
            risk.
          </p>
          <p>
            At 100%, every case was vaccinated, yet there were 50 cases instead of 500 with nobody vaccinated. A big
            protected group fills a big share of a short case list. To judge a vaccine, compare risk per person in each
            group, not who fills the list.
          </p>
          <p className="muted">
            Made-up numbers. The model assumes everyone is equally exposed and the vaccine works the same for everyone.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
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
            {locked ? "Make a prediction to start." : "Everyone is exposed. Risk: 5% if vaccinated, 50% if not."}
          </p>

          <Slider
            label="Vaccinated"
            value={share}
            min={0}
            max={100}
            step={10}
            format={(v) => `${v}%`}
            disabled={locked}
            onChange={(v) => {
              setShare(v);
              const mark = (k: string) => {
                if (!hit.current.has(k)) {
                  hit.current.add(k);
                  interact();
                }
              };
              if (v === 90) mark("90");
              if (v === 100) mark("100");
            }}
          />
          <Row>
            <Readout label="All cases" value={locked ? "?" : total} />
            <Readout label="Vaccinated" value={locked ? "?" : `${t.vaxCases} (${pctVax}%)`} />
            <Readout label="Unvaccinated" value={locked ? "?" : t.unvaxCases} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}

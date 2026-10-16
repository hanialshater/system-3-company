"use client";

// Prediction is not intervention. 200 toy pneumonia patients: 50 with asthma, 150 others.
// Toy risks: on the ward, asthma 20%, others 8%; intensive care (ICU) cuts asthma's risk to 4%.
// Old rule (every asthma patient -> ICU): asthma 2 of 50 die (4%), others 12 of 150 (8%), total 14.
// A model fitted to those records scores asthma 4% < 8%: the lowest-risk group. If its ranking decides
// care, asthma patients go to the ward: 10 of 50 die (20%), others unchanged, total 22.
// Exact expected counts (no sampling); which dots die is a fixed list. Deterministic.
// v3: the ward-risk line shows in every unlocked state; the rule controls head the two died rows,
// so the stage stays within 25 words (2026-10-16 counting rule).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const ASTHMA = 50;
const OTHERS = 150;
const RISK = { asthmaWard: 0.2, asthmaIcu: 0.04, othersWard: 0.08 } as const;
// Which asthma dots die: 2 under ICU care (4% of 50), 10 on the ward (20% of 50); the 2 are among the 10.
const ASTHMA_DIE_WARD = [2, 7, 13, 19, 24, 28, 32, 36, 41, 47];
const ASTHMA_DIE_ICU = [7, 32];
// Which other dots die: 12 of 150 (8%), the same under both rules.
const OTHERS_DIE = new Set(Array.from({ length: OTHERS }, (_, o) => o).filter((o) => o % 25 === 3 || o % 25 === 16));
type Rule = "old" | "model";
function outcome(rule: Rule) {
  const asthmaDie = rule === "old" ? ASTHMA_DIE_ICU : ASTHMA_DIE_WARD;
  return { asthma: asthmaDie.length, others: OTHERS_DIE.size, asthmaSet: new Set(asthmaDie) };
}
const OLD = outcome("old");
const MODEL = outcome("model");
// MODEL END

const pc = (n: number, d: number) => `${Math.round((100 * n) / d)}%`;
const pct = (r: number) => `${Math.round(r * 100)}%`;
const MILESTONES = ["model-view", "model-decides"] as const;
const P = 14.4;
const X0 = 20;
const Y0 = 24;

export default function AsthmaLooksSafe({ slug }: { slug: string }) {
  const [rule, setRule] = useState<Rule>("old");
  const [view, setView] = useState(false);
  const [seenModel, setSeenModel] = useState(false);
  const cur = rule === "old" ? OLD : MODEL;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "In past records every asthma patient went to intensive care, and 4% of them died. Now the model sends low-risk patients to the ward. Asthma patients' death rate:",
        options: ["Stays about 4%, as before", "Rises above 4%", "Falls below 4%"],
        answer: 1,
      }}
      exploreHint="Open the model's view, then let the model decide care."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The records were right: asthma patients died less, {OLD.asthma} of {ASTHMA} against {OLD.others} of {OTHERS}, because
            every one of them went to intensive care. On the ward their toy risk is {pct(RISK.asthmaWard)}, against{" "}
            {pct(RISK.othersWard)} for others: the care was hiding a higher risk. The model saw the outcome, not the reason, and
            ranked asthma safest. When its ranking chose the care, {MODEL.asthma} of {ASTHMA} died.
          </p>
          <p>
            A model that predicts well answers &lsquo;who did badly before?&rsquo;, not &lsquo;what happens if we change what we
            do?&rsquo;
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const icu = !locked && rule === "old";
            const showDeaths = !locked;
            return (
              <div className={s.wrap}>
                <div className={s.top}>
                  <Control
                    className={view ? "active" : ""}
                    disabled={locked || view}
                    onClick={() => {
                      setView(true);
                      reach("model-view");
                    }}
                  >
                    Model&apos;s view
                  </Control>
                  <span className={s.view}>
                    {view ? `Safest: asthma ${pc(OLD.asthma, ASTHMA)}, others ${pc(OLD.others, OTHERS)}` : ""}
                  </span>
                </div>
                <p className={s.msg}>
                  {locked
                    ? "Make a prediction to start."
                    : `Ward risk: asthma ${pct(RISK.asthmaWard)}, others ${pct(RISK.othersWard)}. Intensive care: asthma ${pct(RISK.asthmaIcu)}.`}
                </p>
                <svg
                  viewBox="0 0 340 176"
                  className={`stage-svg ${s.svg}`}
                  role="img"
                  aria-label={locked ? "200 patients, 50 with asthma" : `${rule === "old" ? "Old rule" : "Model"}: asthma ${cur.asthma} of ${ASTHMA} died`}
                >
                  {/* care boxes */}
                  {icu ? (
                    <>
                      <rect x={X0 - 6} y={Y0 - 6} width={5 * P + 8} height={10 * P + 12} rx={6} className={s.icuBox} />
                      <text x={X0 - 4} y={Y0 - 10} className={s.label} fill="var(--domain)">
                        Intensive care
                      </text>
                      <rect x={X0 + 5 * P + 6} y={Y0 - 6} width={15 * P + 2} height={10 * P + 12} rx={6} className={s.wardBox} />
                      <text x={X0 + 5 * P + 10} y={Y0 - 10} className={s.label} fill="var(--fg)">
                        Ward
                      </text>
                    </>
                  ) : (
                    <>
                      <rect x={X0 - 6} y={Y0 - 6} width={20 * P + 12} height={10 * P + 12} rx={6} className={s.wardBox} />
                      <text x={X0 - 4} y={Y0 - 10} className={s.label} fill={locked ? "var(--muted)" : "var(--fg)"}>
                        {locked ? "Care: ?" : "Ward: all"}
                      </text>
                    </>
                  )}
                  <text x={X0 + 20 * P + 6} y={Y0 - 10} textAnchor="end" className={s.toy}>
                    Toy pneumonia patients
                  </text>
                  {Array.from({ length: ASTHMA }, (_, a) => {
                    const cx = X0 + Math.floor(a / 10) * P + P / 2;
                    const cy = Y0 + (a % 10) * P + P / 2;
                    const dead = showDeaths && cur.asthmaSet.has(a);
                    return <circle key={`a${a}`} cx={cx} cy={cy} r={5.2} className={dead ? s.asthmaDead : s.asthma} />;
                  })}
                  {Array.from({ length: OTHERS }, (_, o) => {
                    const cx = X0 + (5 + Math.floor(o / 10)) * P + P / 2 + (icu ? 4 : 0);
                    const cy = Y0 + (o % 10) * P + P / 2;
                    const dead = showDeaths && OTHERS_DIE.has(o);
                    return <circle key={`o${o}`} cx={cx} cy={cy} r={5.2} className={dead ? s.dead : s.other} />;
                  })}
                </svg>
                {/* The two died rows, headed by the rule controls. The header dots are the picture's legend. */}
                <div className={s.grid}>
                  <span className={s.head}>
                    <Dot cls={s.dotDead} />
                    Died:
                  </span>
                  <span className={s.head}>
                    <Dot cls={s.dotAsthma} />
                    asthma
                  </span>
                  <span className={s.head}>
                    <Dot cls={s.dotOther} />
                    others
                  </span>
                  <Control className={rule === "old" ? "active" : ""} disabled={locked || rule === "old"} onClick={() => setRule("old")}>
                    Old rule
                  </Control>
                  <span className={`${s.cell} ${!locked && rule === "old" ? s.now : s.faint}`}>{locked ? "–" : `${OLD.asthma}/${ASTHMA}`}</span>
                  <span className={`${s.cell} ${!locked && rule === "old" ? s.now : s.faint}`}>{locked ? "–" : `${OLD.others}/${OTHERS}`}</span>
                  <Control
                    className={rule === "model" ? "active" : ""}
                    disabled={locked || rule === "model"}
                    onClick={() => {
                      setRule("model");
                      setSeenModel(true);
                      reach("model-decides");
                    }}
                  >
                    Model decides
                  </Control>
                  <span className={`${s.cell} ${!locked && rule === "model" ? s.now : s.faint}`}>{seenModel ? `${MODEL.asthma}/${ASTHMA}` : "–"}</span>
                  <span className={`${s.cell} ${!locked && rule === "model" ? s.now : s.faint}`}>{seenModel ? `${MODEL.others}/${OTHERS}` : "–"}</span>
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

// Legend dot (decoration, no words; a span, not an svg, so it is never taken for the picture).
function Dot({ cls }: { cls: string }) {
  return <span aria-hidden="true" className={`${s.dot} ${cls}`} />;
}

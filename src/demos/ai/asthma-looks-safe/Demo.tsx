"use client";

// Prediction is not intervention. 200 toy pneumonia patients: 50 with asthma, 150 others.
// Toy risks: on the ward, asthma 20%, others 8%; intensive care (ICU) cuts asthma's risk to 4%.
// Old rule (every asthma patient -> ICU): asthma 2 of 50 die (4%), others 12 of 150 (8%), total 14.
// A model fitted to those records scores asthma 4% < 8%: the lowest-risk group. If its ranking decides
// care, asthma patients go to the ward: 10 of 50 die (20%), others unchanged, total 22.
// Exact expected counts (no sampling); which dots die is a fixed list. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
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
          "In past records every asthma patient went to intensive care. Now the model sends low-risk patients to the ward. Asthma patients' death rate becomes:",
        options: ["About 4%, as before", "About 8%, like others", "About 20%"],
        answer: 2,
      }}
      exploreHint="Open the model's view, then let the model decide care."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The records were right: asthma patients died less, {OLD.asthma} of {ASTHMA} against {OLD.others} of {OTHERS}. But they
            died less because every one of them went to intensive care. The model saw the outcome, not the reason, and ranked asthma as the safest group. When its ranking chose the care,
            asthma patients went to the ward and {MODEL.asthma} of {ASTHMA} died.
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
            const msg = locked
              ? "Make a prediction to start."
              : view
                ? `Model's view of the old records: asthma ${pc(OLD.asthma, ASTHMA)} risk, others ${pc(OLD.others, OTHERS)}. Safest: asthma.`
                : `Ward risk: asthma ${RISK.asthmaWard * 100}%, others ${RISK.othersWard * 100}%. Intensive care: asthma ${RISK.asthmaIcu * 100}%.`;
            return (
              <div className={s.wrap}>
                <div className={s.top}>
                  <span className={`tag ${s.model}`}>Toy pneumonia patients</span>
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
                </div>
                <p className={s.msg}>{msg}</p>
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
                        {locked ? "Care: ?" : "Ward: all · intensive care: none"}
                      </text>
                    </>
                  )}
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
                  <circle cx={238} cy={Y0 - 14} r={4.5} className={s.asthma} />
                  <text x={245} y={Y0 - 10} className={s.small} fill="var(--fg)">
                    asthma
                  </text>
                  <circle cx={294} cy={Y0 - 14} r={4.5} className={s.dead} />
                  <text x={301} y={Y0 - 10} className={s.small} fill="var(--fg)">
                    died
                  </text>
                </svg>
                <div className={s.rows}>
                  <p className={`${s.line} ${!locked && rule === "old" ? s.now : s.faint}`}>
                    Old rule · died: asthma {locked ? "–" : `${OLD.asthma} of ${ASTHMA}`}, others {locked ? "–" : `${OLD.others} of ${OTHERS}`}
                  </p>
                  <p className={`${s.line} ${!locked && rule === "model" ? s.now : s.faint}`}>
                    Model · died: asthma {seenModel ? `${MODEL.asthma} of ${ASTHMA}` : "–"}, others {seenModel ? `${MODEL.others} of ${OTHERS}` : "–"}
                  </p>
                </div>
                <Row>
                  <Control className={rule === "old" ? "active" : ""} disabled={locked || rule === "old"} onClick={() => setRule("old")}>
                    Old rule
                  </Control>
                  <Control
                    className={rule === "model" ? "active" : ""}
                    disabled={locked || rule === "model"}
                    onClick={() => {
                      setRule("model");
                      setSeenModel(true);
                      reach("model-decides");
                    }}
                  >
                    Model decides care
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

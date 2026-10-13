"use client";

// Three radiation beams, 100 rays per second each, meet one shield. Illustrative rounded counts for
// ~5 MeV alpha, ~1 MeV beta and ~1 MeV gamma (see meta.json claims c4 to c6).
// Key state: the learner has tried paper, 3 mm aluminium and 5 cm lead (milestones). Reveal quotes
// the paper row (alpha 0, beta about 95, gamma about 100) and the lead row.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Shield = "none" | "paper" | "aluminium" | "lead";
const SHIELDS: { id: Exclude<Shield, "none">; label: string; short: string }[] = [
  { id: "paper", label: "One sheet of paper", short: "paper" },
  { id: "aluminium", label: "3 mm aluminium", short: "3 mm aluminium" },
  { id: "lead", label: "5 cm lead", short: "5 cm lead" },
];
const RAYS: { id: "alpha" | "beta" | "gamma"; name: string; what: string; through: Record<Shield, number> }[] = [
  { id: "alpha", name: "alpha", what: "helium nucleus", through: { none: 100, paper: 0, aluminium: 0, lead: 0 } },
  { id: "beta", name: "beta", what: "fast electron", through: { none: 100, paper: 95, aluminium: 0, lead: 0 } },
  { id: "gamma", name: "gamma", what: "high-energy light", through: { none: 100, paper: 100, aluminium: 95, lead: 2 } },
];
const NAMES = ["paper", "aluminium", "lead"] as const;
const PAPER_ALPHA = RAYS[0].through.paper;
const LEAD_GAMMA = RAYS[2].through.lead;

const LANE = [50, 100, 150];

export default function ShieldRays({ slug }: { slug: string }) {
  const [shield, setShield] = useState<Shield>("none");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Alpha, beta and gamma are three kinds of radiation from radioactive atoms. A single sheet of paper stops which one almost entirely?",
        options: ["alpha", "beta", "gamma"],
        answer: 0,
      }}
      exploreHint="Slide each shield in front of the beams and read the counts behind it."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            Paper let {PAPER_ALPHA} alpha rays through out of 100 a second, but about {RAYS[1].through.paper} beta and about {RAYS[2].through.paper} gamma.
          </p>
          <p>
            Alpha is a heavy, charged helium nucleus that gives up its energy in the first bit of matter it meets. Beta needed aluminium, and even 5 cm of lead
            left about {LEAD_GAMMA} gamma rays in 100. Heavy and charged is easy to stop; neutral gamma goes deep.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const pick = (id: Exclude<Shield, "none">) => {
              setShield(id);
              reach(id);
            };
            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 190" className="stage-svg" role="img" aria-label={`shield: ${shield}`}>
                  <text x={4} y={12} className={s.small}>
                    100 rays per second from each source; counts are about
                  </text>
                  {RAYS.map((r, i) => {
                    const n = r.through[shield];
                    return (
                      <g key={r.id}>
                        <text x={4} y={LANE[i] - 2} className={s.lab}>
                          {r.name}
                        </text>
                        <text x={4} y={LANE[i] + 10} className={s.small}>
                          {r.what}
                        </text>
                        <line x1={92} x2={shield === "none" ? 232 : 150} y1={LANE[i]} y2={LANE[i]} className={s.beam} />
                        {shield !== "none" && n > 0 && (
                          <line x1={166} x2={232} y1={LANE[i]} y2={LANE[i]} className={s.beam} style={{ strokeWidth: 1 + (n / 100) * 5 }} />
                        )}
                        <text x={240} y={LANE[i] + 5} className={s.count}>
                          {n} /s
                        </text>
                      </g>
                    );
                  })}
                  {shield !== "none" && <rect x={150} y={26} width={16} height={146} className={s[shield]} />}
                  <text x={158} y={186} textAnchor="middle" className={s.small}>
                    {shield === "none" ? "no shield" : SHIELDS.find((x) => x.id === shield)!.short}
                  </text>
                </svg>
                <Row>
                  {SHIELDS.map((sh) => (
                    <Control key={sh.id} onClick={() => pick(sh.id)} disabled={locked || shield === sh.id} className={shield === sh.id ? "active" : ""}>
                      {sh.label}
                    </Control>
                  ))}
                  <Control onClick={() => setShield("none")} disabled={locked || shield === "none"}>
                    No shield
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

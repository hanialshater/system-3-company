"use client";

// Pivotal voting under unanimity (E&K ch. 23). Three jurors, each with a private clue that is right 70%
// of the time, prior guilt 1/2. The other two vote their clues (sincere), so their votes reveal their clues.
// Your clue says innocent. Unanimity: convict only if all three vote guilty.
// P(guilty | g guilty clues, i innocent clues) = 0.7^g 0.3^i / (0.7^g 0.3^i + 0.3^g 0.7^i):
// own innocent alone 30%; + two guilty 70%; + one of each 30%; + two innocent 7%.
// Your vote changes the verdict only when both others vote guilty (pivotal).
// v3: each juror shows a clue chip and a vote tag separately (yours: clue innocent, fixed; vote free), the bar
// says it is computed from the clues, a fixed line shows "your clue alone: 30%", the stem states the 50/50 prior,
// and the buttons keep their labels.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const R = 0.7;
function guilt(g: number, i: number) {
  const a = R ** g * (1 - R) ** i;
  const b = (1 - R) ** g * R ** i;
  return a / (a + b);
}
const pct = (p: number) => `${Math.round(p * 100)}%`;

export default function ThePivotalJurorConvicts({ slug }: { slug: string }) {
  const [others, setOthers] = useState<[boolean, boolean]>([false, false]); // true = votes guilty
  const [mine, setMine] = useState(false); // your vote: true = convict

  const g = others.filter(Boolean).length;
  const pivotal = g === 2;
  const pGuilt = guilt(g, 3 - g);
  const verdictGuilty = others[0] && others[1] && mine;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Three jurors, clues 70% reliable; guilty or innocent equally likely beforehand. Unanimity needed to convict. Your clue says innocent. In the one case your vote matters, how likely is guilt?",
        options: ["30%", "50%", "70%"],
        answer: 2,
      }}
      exploreHint="Set the other jurors' votes and find the case where your vote changes the verdict."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Your vote changed the verdict only when both other jurors voted guilty. In every other case one innocent vote already
            acquits, whatever you do.
          </p>
          <p>
            The others vote their clues, so in that pivotal case you know two clues said guilty. Two guilty clues against your one
            innocent clue make the bar read {pct(guilt(2, 1))}, the same as one guilty clue alone. Your clue by itself gives only{" "}
            {pct(guilt(0, 1))}, the line under the bar. Your vote moves the verdict, never the bar: it is not a clue.
          </p>
          <p>
            Voting your clue ignores what being pivotal tells you. A juror who asks &ldquo;what if my vote decides?&rdquo; uses
            evidence the sincere voter throws away.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["pivotal", "decided"]}>
          {(reach) => {
            const flip = (k: 0 | 1) => {
              if (locked) return;
              const next: [boolean, boolean] = [...others] as [boolean, boolean];
              next[k] = !next[k];
              setOthers(next);
              if (next[0] && next[1]) reach("pivotal");
            };
            const vote = () => {
              if (locked) return;
              setMine(!mine);
              if (pivotal) reach("decided");
            };
            // The others vote their clues, so clue and vote move together; your clue stays innocent.
            const jurors = [
              { name: "Juror 1", clue: others[0], guilty: others[0] },
              { name: "Juror 2", clue: others[1], guilty: others[1] },
              { name: "You", clue: false, guilty: mine },
            ];
            return (
              <div className={s.wrap}>
                <p className={s.note}>
                  {pivotal ? "Your vote decides the verdict." : "One innocent vote already acquits. Your vote changes nothing."}
                </p>
                <svg viewBox="0 0 320 140" className="stage-svg" role="img" aria-label={`Verdict: ${verdictGuilty ? "convict" : "acquit"}`}>
                  {jurors.map((j, i) => {
                    const x = 60 + i * 100;
                    const col = j.guilty ? "var(--bad)" : "var(--good)";
                    return (
                      <g key={j.name}>
                        <circle cx={x} cy={26} r={13} fill="none" stroke={i === 2 ? "var(--domain)" : "var(--fg)"} strokeWidth={2.5} />
                        <path d={`M ${x - 22} 66 Q ${x} 34 ${x + 22} 66 Z`} fill="none" stroke={i === 2 ? "var(--domain)" : "var(--fg)"} strokeWidth={2.5} />
                        <text x={x} y={84} textAnchor="middle" className={s.name}>
                          {j.name}
                        </text>
                        <rect x={x - 40} y={89} width={80} height={18} rx={4} fill="none" stroke={j.clue ? "var(--bad)" : "var(--good)"} strokeWidth={1.5} strokeDasharray="3 2" />
                        <text x={x} y={102} textAnchor="middle" className={s.clue}>
                          clue: {j.clue ? "guilty" : "innocent"}
                        </text>
                        <rect x={x - 40} y={113} width={80} height={20} rx={10} fill={col} opacity={0.9} />
                        <text x={x} y={127} textAnchor="middle" className={s.vote}>
                          vote: {j.guilty ? "guilty" : "innocent"}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <div className={s.bar} aria-label={`Chance of guilt ${pct(pGuilt)}`}>
                  <div className={s.fill} style={{ width: pct(pGuilt) }} />
                  <span className={s.barText}>Chance of guilt from the three clues: {pct(pGuilt)}</span>
                </div>
                {!locked && <p className={s.alone}>Your clue alone: {pct(guilt(0, 1))}. Votes are not clues.</p>}
                <Row>
                  <Control className={others[0] ? "active" : ""} aria-pressed={others[0]} disabled={locked} onClick={() => flip(0)}>
                    Flip Juror 1&apos;s clue
                  </Control>
                  <Control className={others[1] ? "active" : ""} aria-pressed={others[1]} disabled={locked} onClick={() => flip(1)}>
                    Flip Juror 2&apos;s clue
                  </Control>
                  <Control className={mine ? "active" : ""} aria-pressed={mine} disabled={locked} onClick={vote}>
                    Flip your vote
                  </Control>
                </Row>
                <Row>
                  <Readout label="Verdict" value={verdictGuilty ? "Convict" : "Acquit"} />
                  <Readout label="Your vote matters" value={pivotal ? "Yes" : "No"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

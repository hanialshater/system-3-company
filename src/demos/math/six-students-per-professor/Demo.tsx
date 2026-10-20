"use client";

// Six students per professor. P professors (1 to 5), each with k students (1 to 8), drawn as columns:
// one professor on top, their k students below, so S = k × P. Three equations sit under the picture
// with today's counts substituted and lit true or false. Milestones: "six" (k = 6, the question's case),
// "resize" (k = 6 seen at a second number of professors: S = 6P stays true). QA path (DOM order):
// k slider (4 → 6, P = 2: S = 12, the brief's case), P slider (2 → 4, S = 24). Every number comes from
// P, k and the EQS functions.

import { Lesson } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const KEY = 6;
const MILESTONES = ["six", "resize"] as const;
const EQS = [
  { text: "6S = P", lhs: (S: number) => 6 * S, rhs: (P: number) => P, show: (S: number, P: number) => `${6 * S} = ${P}` },
  { text: "S = 6P", lhs: (S: number) => S, rhs: (P: number) => 6 * P, show: (S: number, P: number) => `${S} = ${6 * P}` },
  { text: "6S = 6P", lhs: (S: number) => 6 * S, rhs: (P: number) => 6 * P, show: (S: number, P: number) => `${6 * S} = ${6 * P}` },
] as const;
const holds = (i: number, S: number, P: number) => EQS[i].lhs(S) === EQS[i].rhs(P);

const W = 320;
const H = 116;
const CX0 = 104;
const CDX = 50;

export default function SixStudentsPerProfessor({ slug }: { slug: string }) {
  const [p, setP] = useState(2);
  const [k, setK] = useState(4);
  const [sixAt, setSixAt] = useState<number[]>([]);
  const S = k * p;
  const lit = EQS.map((_, i) => holds(i, S, p));

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Your college has six times as many students as professors. Let S be the number of students and P the number of professors. Which equation is right?",
        options: ["6S = P", "S = 6P", "6S = 6P"],
        answer: 1,
      }}
      exploreHint="Give each professor 6 students, then change the number of professors."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          {k === KEY ? (
            <p>
              With {p} professors and {S} students you saw S = 6P read <strong>{EQS[1].show(S, p)}</strong>, while 6S = P read{" "}
              {EQS[0].show(S, p)}. It stayed true when you changed the number of professors.
            </p>
          ) : (
            <p>
              Now, at {k} students per professor, S = 6P reads {EQS[1].show(S, p)}: false, as it should be. At six per professor
              it was the only true one, at every size you tried.
            </p>
          )}
          <p>
            The letters count people; they are not labels. 6S = P actually says professors outnumber students six to one.
            Multiply the smaller group by 6 to get the bigger one: six times the professors is the number of students.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const seeSix = (kk: number, pp: number) => {
              if (kk !== KEY) return;
              reach("six");
              const next = sixAt.includes(pp) ? sixAt : [...sixAt, pp];
              if (next !== sixAt) setSixAt(next);
              if (next.length >= 2) reach("resize");
            };
            const onK = (v: number) => {
              setK(v);
              seeSix(v, p);
            };
            const onP = (v: number) => {
              setP(v);
              seeSix(k, v);
            };
            // Explore phase: no caption; the slider label already says how many students each professor has.
            const caption = "Each column: one professor and their students. Make a prediction to start.";
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${p} professors, ${S} students`}>
                  <text x={8} y={24} className={s.count}>
                    P = {p}
                  </text>
                  <text x={8} y={72} className={s.count}>
                    S = {S}
                  </text>
                  <text x={8} y={38} className={s.small}>
                    professors
                  </text>
                  <text x={8} y={86} className={s.small}>
                    students
                  </text>
                  {Array.from({ length: p }, (_, c) => {
                    const cx = CX0 + c * CDX;
                    return (
                      <g key={c}>
                        <circle cx={cx} cy={20} r={11} className={s.prof} />
                        <text x={cx} y={24} className={s.profLab} textAnchor="middle">
                          P
                        </text>
                        {Array.from({ length: k }, (_, j) => (
                          <circle key={j} cx={cx - 9 + (j % 2) * 18} cy={46 + Math.floor(j / 2) * 18} r={7} className={s.stud} />
                        ))}
                      </g>
                    );
                  })}
                </svg>

                {locked && <p className={s.caption}>{caption}</p>}

                <ul className={s.eqs} aria-live="polite">
                  {EQS.map((e, i) => (
                    <li key={e.text} className={locked ? "" : lit[i] ? s.on : s.off}>
                      <span className={s.eq}>{e.text}</span>
                      <span className={s.sub}>{locked ? "?" : e.show(S, p)}</span>
                      <span className={s.verdict}>{locked ? "" : lit[i] ? "true" : "false"}</span>
                    </li>
                  ))}
                </ul>

                <Slider label="Students per professor" value={k} min={1} max={8} disabled={locked} onChange={onK} />
                <Slider label="Professors P" value={p} min={1} max={5} disabled={locked} onChange={onP} />
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

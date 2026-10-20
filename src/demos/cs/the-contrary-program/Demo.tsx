"use client";

// The learner plays the checker H. For each program they give H's verdict (halts or loops) and
// the program runs: A always stops, B always loops, and D asks H about itself and does the
// opposite. On A and B the verdict can be right; on D both verdicts are proved wrong.
// One representation: the program's code card with the branch it took and the outcome.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Verdict = "halts" | "loops";
type Prog = "D" | "A" | "B";

const PROGRAMS: Record<Prog, { lines: string[]; run: (v: Verdict) => { line: number; does: Verdict } }> = {
  D: {
    lines: ["ask H: does D halt?", "H said halts → loop forever", "H said loops → stop"],
    run: (v) => (v === "halts" ? { line: 1, does: "loops" } : { line: 2, does: "halts" }),
  },
  A: { lines: ['print "hi"', "stop"], run: () => ({ line: 1, does: "halts" }) },
  B: { lines: ["repeat forever:", "  wait"], run: () => ({ line: 1, does: "loops" }) },
};
const ORDER: Prog[] = ["D", "A", "B"];
const said = (v: Verdict) => (v === "halts" ? "halts" : "loops forever");

export default function TheContraryProgram({ slug }: { slug: string }) {
  const [prog, setProg] = useState<Prog>("D");
  const [verdict, setVerdict] = useState<Partial<Record<Prog, Verdict>>>({});
  const [tried, setTried] = useState<Record<Prog, { v: Verdict; right: boolean }[]>>({ D: [], A: [], B: [] });

  const v = verdict[prog];
  const result = v ? PROGRAMS[prog].run(v) : null;
  const right = result ? result.does === v : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You build a checker, H, that reads any program and answers 'halts' (it stops) or 'loops forever'. A rival writes program D, which asks H about D, then does the opposite. Can H be right about D?",
        options: ["Yes, if H is clever enough", "No: whatever H says is wrong", "Only if D is short"],
        answer: 1,
      }}
      exploreHint="Give D both answers. Then judge A and B."
      minInteractions={2}
      reveal={() => {
        const d = tried.D;
        const others = (["A", "B"] as Prog[]).filter((p) => tried[p].some((t) => t.right));
        return (
          <>
            <p>
              {d.length
                ? `On D you said ${d.map((t) => `"${t.v}" and D ${t.v === "halts" ? "looped" : "stopped"}`).join("; you said ")}. `
                : ""}
              D is built to do the opposite of whatever H says about D, so both of H&apos;s answers are wrong. No cleverness
              inside H helps.
            </p>
            <p>
              {others.length ? `On ${others.join(" and ")} a verdict can be right (see the ticks): ` : "On simple programs like A and B a verdict can be right: "}
              particular programs can be checked. What cannot exist is one checker that is right about every program,
              because from any such H we could build its own D. Turing proved this in 1936: the halting problem cannot be
              solved by any program.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["d-halts", "d-loops"]}>
          {(reach) => {
            const judge = (p: Prog, x: Verdict) => {
              if (locked) return;
              const r = PROGRAMS[p].run(x);
              setProg(p);
              setVerdict((m) => ({ ...m, [p]: x }));
              setTried((t) => ({ ...t, [p]: [...t[p].filter((e) => e.v !== x), { v: x, right: r.does === x }] }));
              if (p === "D") reach(x === "halts" ? "d-halts" : "d-loops");
            };

            return (
              <div className={s.wrap}>
                <p className={s.lead}>You are H. For each program, say: halts (stops) or loops forever?</p>

                <div className={s.card} aria-label={`Program ${prog}`}>
                  <div className={s.name}>Program {prog}</div>
                  {PROGRAMS[prog].lines.map((l, i) => (
                    <div key={i} className={`${s.line} ${result && result.line === i ? s.taken : ""}`}>
                      {l}
                    </div>
                  ))}
                </div>

                <div className={`${s.outcome} ${right === null ? "" : right ? s.right : s.wrong}`}>
                  {result ? `${prog} ${said(result.does)}: H was ${right ? "right" : "wrong"}${prog === "D" ? ". Any other H gets the same trap: D just asks it." : ""}` : "Waiting for H"}
                </div>

                <div className={s.verdicts}>
                  {ORDER.map((p) => (
                    <div key={p} className={s.vrow}>
                      <span className={s.vname}>{p}</span>
                      {(["halts", "loops"] as Verdict[]).map((x) => {
                        const t = tried[p].find((e) => e.v === x);
                        return (
                          <Control
                            key={x}
                            className={prog === p && v === x ? "active" : ""}
                            disabled={locked}
                            onClick={() => judge(p, x)}
                          >
                            H: {said(x)} {t ? (t.right ? "✓" : "✗") : ""}
                          </Control>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

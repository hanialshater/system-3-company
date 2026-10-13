"use client";

// Five on/off settings stored as one row of bits, 10110. A mask is a second row the learner taps;
// the result row combines the two place by place with AND, OR or XOR. The stage starts at the
// question's mask 00110 under AND (result hidden until the prediction): only the masked places
// keep their setting. Then OR turns masked places on and XOR flips them, all five at once.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Op = "AND" | "OR" | "XOR";
const OPS: Op[] = ["AND", "OR", "XOR"];
const VALUE = "10110";
const START_MASK = "00110";
const RULE: Record<Op, string> = {
  AND: "AND: 1 only where both are 1.",
  OR: "OR: 1 where either is 1.",
  XOR: "XOR: 1 where they differ.",
};
const bit = (op: Op, a: string, b: string) =>
  op === "AND" ? (a === "1" && b === "1" ? "1" : "0") : op === "OR" ? (a === "1" || b === "1" ? "1" : "0") : a !== b ? "1" : "0";
const combine = (op: Op, v: string, m: string) => v.split("").map((a, i) => bit(op, a, m[i])).join("");
const START_RESULT = combine("AND", VALUE, START_MASK); // 00110

export default function MaskTheFlags({ slug }: { slug: string }) {
  const [mask, setMask] = useState(START_MASK);
  const [op, setOp] = useState<Op>("AND");
  const [seen, setSeen] = useState<Partial<Record<Op, string>>>({}); // op -> "value op mask = result" when first used

  const result = combine(op, VALUE, mask);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Five on/off settings are stored as ${VALUE}. You AND them with the mask ${START_MASK} (AND gives 1 only where both have 1). What results?`,
        options: [START_RESULT, "10000", VALUE],
        answer: 0,
      }}
      exploreHint="Tap mask bits and watch the result. Then try OR, then XOR."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            At the start, {VALUE} AND {START_MASK} gave <strong>{START_RESULT}</strong>: only the places the mask
            marks kept their setting, and the 1 at the far left was dropped.
            {seen.OR ? ` OR turned every marked place on (${seen.OR}).` : ""}
            {seen.XOR ? ` XOR flipped every marked place (${seen.XOR}).` : ""}
          </p>
          <p>
            One mask, one step, all five places at once: AND reads chosen settings, OR switches them on, XOR toggles
            them. File permissions on Unix are stored and changed this way.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["and-mask", "or", "xor"]}>
          {(reach) => {
            const record = (o: Op, m: string) => {
              if (!seen[o]) setSeen((x) => ({ ...x, [o]: `${VALUE} ${o} ${m} = ${combine(o, VALUE, m)}` }));
            };
            const tapMask = (i: number) => {
              if (locked) return;
              const m = mask.slice(0, i) + (mask[i] === "1" ? "0" : "1") + mask.slice(i + 1);
              setMask(m);
              if (op === "AND") reach("and-mask");
              else {
                record(op, m);
                reach(op === "OR" ? "or" : "xor");
              }
            };
            const pick = (o: Op) => {
              if (locked || o === op) return;
              setOp(o);
              if (o === "AND") reach("and-mask");
              else {
                record(o, mask);
                reach(o === "OR" ? "or" : "xor");
              }
            };
            const row = (label: string, bits: string, kind: "value" | "mask" | "result") => (
              <div className={s.row}>
                <span className={s.label}>{label}</span>
                {bits.split("").map((b, i) =>
                  kind === "mask" ? (
                    <Control key={i} disabled={locked} className={`${s.cell} ${b === "1" ? s.marked : ""}`}
                      aria-label={`Mask place ${i + 1}: ${b}`} onClick={() => tapMask(i)}>
                      {b}
                    </Control>
                  ) : (
                    <span key={i} className={`${s.cell} ${s.fixed} ${kind === "result" && b === "1" ? s.one : ""} ${kind === "result" && mask[i] === "1" ? s.underMask : ""}`}>
                      {b}
                    </span>
                  ),
                )}
              </div>
            );
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{locked ? "Make a prediction to start." : RULE[op]}</p>
                {row("settings", VALUE, "value")}
                {row("mask", mask, "mask")}
                <div className={s.rule} />
                {locked ? row("result", "?????", "value") : row(`${op} gives`, result, "result")}
                <div className={s.ops}>
                  {OPS.map((o) => (
                    <Control key={o} disabled={locked || o === op} className={!locked && o === op ? "active" : ""} onClick={() => pick(o)}>
                      {o}
                    </Control>
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

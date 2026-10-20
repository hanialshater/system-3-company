"use client";

// A byte as eight switches in two groups of four. Each group is read on its own (8 4 2 1) and
// written as one hex symbol, 0-9 then A-F for 10-15. The stage starts at the question's byte,
// 1101 0110, with the symbols hidden until the prediction. Flipping a switch in one group changes
// only that group's symbol. One picture: the two groups, each with its symbol under it.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const START = "11010110";
const PLACES = [8, 4, 2, 1];
const HEX = "0123456789ABCDEF";
const val = (bits: string) => bits.split("").reduce((a, b, i) => a + (b === "1" ? PLACES[i] : 0), 0);
const sym = (bits: string) => HEX[val(bits)];
const hi = (b: string) => b.slice(0, 4);
const lo = (b: string) => b.slice(4);
const sumText = (bits: string) => {
  const parts = bits.split("").flatMap((b, i) => (b === "1" ? [PLACES[i]] : []));
  return parts.length ? parts.join(" + ") : "0";
};
const START_HEX = sym(hi(START)) + sym(lo(START)); // "D6"

export default function ByteInTwoDigits({ slug }: { slug: string }) {
  const [bits, setBits] = useState(START);
  const [seen, setSeen] = useState<{ high?: string; low?: string }>({}); // first flip in each group: before -> after

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You split the byte ${START} into ${hi(START)} and ${lo(START)}. Each group of four becomes one hex symbol (0 to 9, then A to F for 10 to 15). What do you write for the byte in hex?`,
        options: [START_HEX, `${HEX[val(hi(START)) - 1]}${sym(lo(START))}`, `${sym(lo(START))}${sym(hi(START))}`],
        answer: 0,
      }}
      exploreHint="Read each group. Then flip a switch on the left, and one on the right."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You started at {hi(START)} {lo(START)}: {sumText(hi(START))} = {val(hi(START))} is {sym(hi(START))}, and{" "}
            {sumText(lo(START))} = {val(lo(START))} is {sym(lo(START))}, so <strong>{START_HEX}</strong>.
            {seen.high ? ` Flipping a left switch changed only the left symbol (${seen.high}).` : ""}
            {seen.low ? ` A right switch changed only the right one (${seen.low}).` : ""} Now your byte is {hi(bits)}{" "}
            {lo(bits)} = {sym(hi(bits))}
            {sym(lo(bits))} in hex.
          </p>
          <p>
            Four switches have exactly 16 settings, one per hex symbol, so hex is
            binary written four switches at a time and every byte is exactly two symbols.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["high-only", "low-only"]}>
          {(reach) => {
            const flip = (i: number) => {
              if (locked) return;
              const next = bits.slice(0, i) + (bits[i] === "1" ? "0" : "1") + bits.slice(i + 1);
              setBits(next);
              const was = sym(hi(bits)) + sym(lo(bits));
              const now = sym(hi(next)) + sym(lo(next));
              if (i < 4) {
                if (!seen.high) setSeen((x) => ({ ...x, high: `${was} to ${now}` }));
                reach("high-only");
              } else {
                if (!seen.low) setSeen((x) => ({ ...x, low: `${was} to ${now}` }));
                reach("low-only");
              }
            };
            const group = (g: 0 | 1) => {
              const part = g === 0 ? hi(bits) : lo(bits);
              return (
                <div className={s.group} role="group" aria-label={g === 0 ? "Left four switches" : "Right four switches"}>
                  <div className={s.places}>
                    {PLACES.map((p) => (
                      <span key={p}>{p}</span>
                    ))}
                  </div>
                  <div className={s.switches}>
                    {part.split("").map((b, j) => (
                      <Control key={j} disabled={locked} className={`${s.sw} ${b === "1" ? s.on : ""}`}
                        aria-label={`Switch worth ${PLACES[j]}, ${b === "1" ? "on" : "off"}`} onClick={() => flip(g * 4 + j)}>
                        {b}
                      </Control>
                    ))}
                  </div>
                  <div className={s.sum}>{locked ? " " : `${val(part)} →`}</div>
                  <div className={s.hex}>{locked ? "?" : sym(part)}</div>
                </div>
              );
            };
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {locked ? "Make a prediction to start." : "One hex symbol per four switches: 0–9, then A=10 … F=15."}
                </p>
                <div className={s.groups}>
                  {group(0)}
                  {group(1)}
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

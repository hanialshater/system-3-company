"use client";

// 0.1 + 0.2 is not 0.3. The payoff is not "floats are weird" but why: 0.1 has no
// finite binary form, so the learner hunts for it with twelve binary switches and
// keeps landing either side of it. Then the computer's own (53-digit) answer shows
// the same thing: 0.1 and 0.2 are each kept a hair high, so their sum is too.
// One representation: the switches and the total they make.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const BITS = 12;
const DEN = 2 ** BITS; // 4096
const TARGET = DEN / 10; // 409.6 in units of 1/4096
const NEAREST = Math.round(TARGET); // 410 = 000110011010
const LABELS = Array.from({ length: BITS }, (_, i) => `1/${2 ** (i + 1)}`);

// Exact decimal of k / 4096 (always terminates: 4096 = 2^12).
function exact(k: number): string {
  if (k === 0) return "0";
  // k / 2^12 = k * 5^12 / 10^12
  const digits = (BigInt(k) * 5n ** 12n).toString().padStart(12, "0");
  return `0.${digits}`.replace(/0+$/, "");
}

// Exact decimal of |k/4096 - 1/10| = |10k - 4096| / 40960, and 1/40960 = 5^12 / 10^13.
function gapText(k: number): string {
  const digits = (BigInt(Math.abs(10 * k - DEN)) * 5n ** 12n).toString().padStart(13, "0");
  return `0.${digits}`.replace(/0+$/, "");
}

export default function PenniesDontAddUp({ slug }: { slug: string }) {
  const [k, setK] = useState(0); // switches as a 12-bit number: bit 11 is worth 1/2
  const [toggles, setToggles] = useState(0);
  const [shown, setShown] = useState(false);

  const on = (i: number) => (k & (1 << (BITS - 1 - i))) !== 0;
  const over = k > TARGET;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A program adds 0.1 and 0.2, then asks if the result equals 0.3. What happens?",
        options: ["They are equal", "The sum is a tiny bit more than 0.3", "The sum is a tiny bit less than 0.3"],
        answer: 1,
      }}
      exploreHint="Build 0.1 out of switches. Then see how the computer stores it."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            No set of the 12 switches makes exactly 0.1: the closest, {exact(NEAREST)}, is still over. In binary, 0.1 is 0.000110011001100… with &quot;0011&quot; repeating
            forever, the way 1/3 is 0.333… in decimal. So the computer keeps the nearest value it can.
          </p>
          <p>
            With 53 binary digits, that nearest value is a hair above 0.1, and 0.2 is kept a hair above 0.2. Add them
            and the hairs add up: the sum prints as <strong>0.30000000000000004</strong>, so &quot;equals 0.3&quot; is
            false.
          </p>
          <p className="muted">Decimals are rounded on the way in. That is why money is often counted in whole cents.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const toggle = (i: number) => {
          if (locked) return;
          const next = k ^ (1 << (BITS - 1 - i));
          setK(next);
          setToggles((t) => t + 1);
        };
        const showComputer = () => {
          if (locked) return;
          interact();
          setShown(true);
          setK(NEAREST);
        };

        const msg = locked
          ? "Make a prediction to start."
          : k === 0
            ? "Each switch adds its fraction. Aim for 0.1: try 1/16 first."
            : k === NEAREST
              ? "Closest 12 switches can get: still over."
              : k === NEAREST - 1
                ? "Close. One pattern is closer."
                : over
                  ? `Over by ${gapText(k)}`
                  : `Short by ${gapText(k)}`;

        return (
          <div className={s.wrap}>
            <div className={s.total} aria-live="polite">
              <span className="muted small">Target 0.1</span>
              <span className={`${s.totalNum} ${k === 0 ? "" : over ? s.over : s.under}`}>{exact(k)}</span>
              <span className={`small ${s.msg}`}>{msg}</span>
            </div>

            <div className={s.switches}>
              {LABELS.map((lab, i) => (
                <div key={lab} className={s.col}>
                  <Control
                    className={`${s.sw} ${on(i) ? s.on : ""}`}
                    disabled={locked}
                    aria-pressed={on(i)}
                    aria-label={`Switch worth ${lab}, ${on(i) ? "on" : "off"}`}
                    onClick={() => toggle(i)}
                  >
                    <span className={s.knob} />
                  </Control>
                  <span className={s.val}>{lab}</span>
                </div>
              ))}
            </div>

            {shown ? (
              <div className={s.computer} aria-live="polite">
                <span className="muted small">A computer, with 53 binary digits:</span>
                <span>
                  0.1 → 0.1000000000000000055… <b className={s.up}>above 0.1</b>
                </span>
                <span>
                  0.2 → 0.2000000000000000111… <b className={s.up}>above 0.2</b>
                </span>
                <span>0.1 in binary: 0.000110011001100…</span>
                <span>
                  0.1 + 0.2 → <b>0.30000000000000004</b> <b className={s.up}>over 0.3</b>
                </span>
              </div>
            ) : null}

            <Row>
              <Control className="active" disabled={locked || shown || toggles < 3} onClick={showComputer}>
                {toggles < 3 && !locked ? "Try 3 switches first" : "How does a computer store 0.1?"}
              </Control>
              <Control disabled={locked || k === 0} onClick={() => setK(0)}>
                All off
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}

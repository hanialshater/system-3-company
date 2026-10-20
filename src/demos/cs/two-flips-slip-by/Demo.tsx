"use client";

// The noisy wire. A 7-bit message travels with an even-parity check bit (the 1s, check bit
// included, add up to an even number). The learner flips bits in transit and watches the
// receiver's check: one flip, ERROR; two flips, OK again, though the message is wrong.
// One representation: the received bits with the check light. Almost no words, by design.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const DATA = [1, 0, 1, 1, 0, 1, 0];
const CHECK = DATA.reduce((a, b) => a + b, 0) % 2; // even parity: makes the total count of 1s even
const SENT = [...DATA, CHECK];

const ones = (bits: number[]) => bits.reduce((a, b) => a + b, 0);
/** The receiver's test: an even number of 1s passes. */
const passes = (bits: number[]) => ones(bits) % 2 === 0;

export default function TwoFlipsSlipBy({ slug }: { slug: string }) {
  const [flipped, setFlipped] = useState<boolean[]>(SENT.map(() => false));
  const [tried, setTried] = useState<Record<number, boolean>>({}); // flip count -> did the check pass

  const got = SENT.map((b, i) => (flipped[i] ? 1 - b : b));
  const n = flipped.filter(Boolean).length;
  const ok = passes(got);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You send a message with one extra check bit, set so the number of 1s is even; the receiver checks the count is still even. Two bits flip on the way. Does the receiver notice?",
        options: ["Always", "Only if the flipped bits are next to each other", "No, it can miss it"],
        answer: 2,
      }}
      exploreHint="Flip one bit, then another. Then try two bits far apart."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            {Object.keys(tried).length
              ? `You tried ${Object.entries(tried)
                  .map(([k, v]) => `${k} flip${k === "1" ? "" : "s"} (${v ? "passed" : "caught"})`)
                  .join(", ")}. `
              : ""}
            The check bit makes the count of 1s even. Every flip changes that count by one, so it switches the count between
            even and odd. One flip makes it odd: caught. A second flip makes it even again, and the check passes on a wrong
            message. So <strong>no</strong>, two flips slip by, wherever they are.
          </p>
          <p>
            A parity bit catches any odd number of flips and is blind to any even number. So one check bit cannot
            protect a message from noise that flips several bits.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["caught-one", "missed-even", "far-pair"]}>
          {(reach) => {
            const flip = (i: number) => {
              if (locked) return;
              const f = flipped.map((x, j) => (j === i ? !x : x));
              const g = SENT.map((b, j) => (f[j] ? 1 - b : b));
              const k = f.filter(Boolean).length;
              setFlipped(f);
              if (k > 0) setTried((t) => ({ ...t, [k]: passes(g) }));
              if (k > 0 && !passes(g)) reach("caught-one");
              if (k > 0 && passes(g)) reach("missed-even");
              const idx = f.map((x, j) => (x ? j : -1)).filter((j) => j >= 0);
              if (idx.length === 2 && idx[1] - idx[0] > 1 && passes(g)) reach("far-pair");
            };
            const farPair = () => {
              if (locked) return;
              const f = SENT.map((_, j) => j === 0 || j === 5);
              const g = SENT.map((b, j) => (f[j] ? 1 - b : b));
              setFlipped(f);
              setTried((t) => ({ ...t, 2: passes(g) }));
              reach("missed-even");
              reach("far-pair");
            };
            const undo = () => {
              if (locked) return;
              setFlipped(SENT.map(() => false));
            };

            const light = locked ? "–" : ok ? "OK" : "ERROR";

            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 84" className="stage-svg" role="img" aria-label={`Receiver check: ${light}`}>
                  <circle
                    cx={160}
                    cy={42}
                    r={34}
                    fill={locked ? "var(--bg-2)" : ok ? "var(--good)" : "var(--bad)"}
                    stroke="var(--line)"
                    strokeWidth={2}
                  />
                  <text x={160} y={49} textAnchor="middle" className={s.light}>
                    {light}
                  </text>
                </svg>

                <div className={s.bits}>
                  {got.map((b, i) => (
                    <Control
                      key={i}
                      className={`${s.bit} ${flipped[i] ? s.flip : ""} ${i === SENT.length - 1 ? s.check : ""}`}
                      disabled={locked}
                      onClick={() => flip(i)}
                      aria-label={`${i === SENT.length - 1 ? "Check bit" : `Bit ${i + 1}`}: ${b}${flipped[i] ? ", flipped" : ""}`}
                      aria-pressed={flipped[i]}
                    >
                      {b}
                    </Control>
                  ))}
                </div>
                <p className={s.legend}>
                  <span>message: four 1s</span>
                  <span>check: 0</span>
                </p>

                <Row>
                  <Readout label="Flips" value={n} />
                  <Readout label="1s received (even passes)" value={locked ? "–" : ones(got)} />
                  <Readout label="Message" value={locked ? "–" : n ? "changed" : "intact"} />
                  <Control disabled={locked || flipped.every((x, j) => x === (j === 0 || j === 5))} onClick={farPair}>
                    Flip bits 1 and 6
                  </Control>
                  <Control disabled={locked || n === 0} onClick={undo}>
                    Undo flips
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

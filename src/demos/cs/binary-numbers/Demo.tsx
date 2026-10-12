"use client";

// Binary as counting with switches. The payoff: each switch is worth twice the one
// to its right, so eight of them reach 255, one less than a ninth switch would be worth.
// The +1 button shows the carry ripple: 127 + 1 flips all eight switches.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const VALUES = [128, 64, 32, 16, 8, 4, 2, 1];

export default function BinaryNumbers({ slug }: { slug: string }) {
  const [n, setN] = useState(0);
  const [flipped, setFlipped] = useState<number>(0); // bitmask of switches the last +1 flipped
  const [wrapped, setWrapped] = useState(false);
  const [best, setBest] = useState(0); // biggest number the learner has made

  const on = (v: number) => (n & v) !== 0;
  const parts = VALUES.filter(on);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Eight switches, each on or off, worth 128, 64, 32, 16, 8, 4, 2 and 1. Add up the ones that are on. What is the biggest number you can make?",
        options: ["8", "16", "128", "255"],
        answer: 3,
      }}
      exploreHint="Flip switches to make the biggest number you can. Then try +1 from 127."
      reveal={() => (
        <>
          <p>
            The biggest you made was {best}. All eight on is 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = <strong>255</strong>. Counting all-off as 0, that is
            256 different numbers, and every pattern names exactly one of them.
          </p>
          <p>
            Each switch is worth twice the one to its right, so the switches together always add up to one less than the
            next switch would be worth: 256 − 1. A ninth switch doubles the count to 512.
          </p>
          <p className="muted">
            That is binary: a byte is 8 switches, 0 to 255. 32 of them pass four billion.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const toggle = (v: number) => {
          if (locked) return;
          interact();
          setN((x) => x ^ v);
          setBest((b) => Math.max(b, n ^ v));
          setFlipped(0);
          setWrapped(false);
        };
        const plusOne = () => {
          if (locked) return;
          interact();
          const next = (n + 1) % 256;
          setFlipped(n ^ next);
          setWrapped(n === 255);
          setN(next);
          setBest((b) => Math.max(b, next));
        };
        const clear = () => {
          if (locked) return;
          interact();
          setN(0);
          setFlipped(0);
          setWrapped(false);
        };

        const flipCount = VALUES.filter((v) => (flipped & v) !== 0).length;

        return (
          <div className={s.wrap}>
            <div className={s.total} aria-live="polite">
              <span className={s.totalNum}>{n}</span>
              <span className={`muted small ${s.sum}`}>
                {locked
                  ? "Make a prediction to start."
                  : wrapped
                    ? "Out of switches: back to 0."
                    : flipped && flipCount > 1
                      ? `+1 flipped ${flipCount} switches.`
                      : parts.length
                        ? parts.join(" + ")
                        : "All off = 0"}
              </span>
            </div>

            <div className={s.switches}>
              {VALUES.map((v) => (
                <div key={v} className={s.col}>
                  <Control
                    className={`${s.sw} ${on(v) ? s.on : ""} ${flipped & v ? s.flip : ""}`}
                    disabled={locked}
                    aria-pressed={on(v)}
                    aria-label={`Switch worth ${v}, ${on(v) ? "on" : "off"}`}
                    onClick={() => toggle(v)}
                  >
                    <span className={s.knob} />
                  </Control>
                  <span className={s.val}>{v}</span>
                </div>
              ))}
            </div>

            <Row>
              <Control className="active" disabled={locked} onClick={plusOne}>
                +1
              </Control>
              <Control disabled={locked || n === 0} onClick={clear}>
                All off
              </Control>
              <span className="muted small">
                {VALUES.map((v) => (on(v) ? "1" : "0")).join("")} in binary
              </span>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}

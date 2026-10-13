"use client";

// Binary as counting with switches. The payoff: each switch is worth twice the one
// to its right, so it is worth one more than all the switches to its right together
// (128 = 127 + 1). Eight of them reach 255, so they name 256 numbers counting 0.
// v2: the doubling is drawn (×2 arcs), the +1 ripple is explained when it happens,
// and the reveal is gated on two key states: all eight on, and a +1 that flips all eight.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const VALUES = [128, 64, 32, 16, 8, 4, 2, 1];
const MILESTONES = ["all-on", "ripple"] as const;

const isAllOnesBelowTop = (n: number) => n >= 3 && (n & (n + 1)) === 0; // 3, 7, 15, ... 255

export default function BinaryNumbers({ slug }: { slug: string }) {
  const [n, setN] = useState(0);
  const [flipped, setFlipped] = useState<number>(0); // bitmask of switches the last +1 flipped
  const [from, setFrom] = useState<number | null>(null); // the number the last +1 started from
  const [best, setBest] = useState(0); // biggest number the learner has made
  const [rippleFrom, setRippleFrom] = useState<number | null>(null); // 127 or 255, once seen

  // The kit hands interact() to the stage render; a ref lets the milestone hook live at the top level.
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), MILESTONES);

  const on = (v: number) => (n & v) !== 0;
  const parts = VALUES.filter(on);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Eight on/off switches, each worth double the one to its right: 1, 2, 4, 8 … Add up the ones that are on. How many different numbers can they show, counting 0?",
        options: ["8", "16", "128", "256"],
        answer: 3,
      }}
      exploreHint="Turn all eight on. Then use +1 from 127 or from 255 and watch the switches."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your biggest was <strong>{best}</strong>: all eight on. All off is 0, and every pattern in between names
            exactly one number, so eight switches show <strong>256</strong> numbers, 0 to 255.
          </p>
          <p>
            Each switch is worth one more than all the switches to its right together: 128 = 127 + 1.{" "}
            {rippleFrom === 127
              ? "That is why +1 from 127 flipped all eight. A ninth switch, worth 256, would double the count to 512."
              : "That is why 255 + 1 rolled back to 0: it needs a ninth switch, worth 256, which would double the count to 512."}
          </p>
          <p className="muted">That is binary. A computer byte is 8 such switches (bits); 32 bits name over four billion numbers.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        const record = (next: number) => {
          setBest((b) => Math.max(b, next));
          if (next === 255) reach("all-on");
        };
        const toggle = (v: number) => {
          if (locked) return;
          const next = n ^ v;
          setN(next);
          setFlipped(0);
          setFrom(null);
          record(next);
        };
        const plusOne = () => {
          if (locked) return;
          const next = (n + 1) % 256;
          setFlipped(n ^ next);
          setFrom(n);
          setN(next);
          record(next);
          if (n === 127 || n === 255) {
            setRippleFrom(n);
            reach("ripple");
          }
        };
        const clear = () => {
          if (locked) return;
          setN(0);
          setFlipped(0);
          setFrom(null);
        };

        const flipCount = VALUES.filter((v) => (flipped & v) !== 0).length;
        const top = VALUES.find(on);

        const message = locked
          ? "Make a prediction to start."
          : from === 255
            ? "255 + 1 = 256 needs a ninth switch, so all eight roll back to 0."
            : from !== null && flipCount > 1
              ? `${from} + 1 = ${n}: ${flipCount} switches flip, carrying left like 9 + 1 = 10.`
              : isAllOnesBelowTop(n) && top
                ? `All ${parts.length} on = ${n}: one less than the next switch, ${top * 2}.`
                : parts.length
                  ? parts.join(" + ")
                  : "All off = 0";

        return (
          <div className={s.wrap}>
            <div className={s.total} aria-live="polite">
              <span className={s.totalNum}>{n}</span>
              <span className={`muted small ${s.sum}`}>{message}</span>
            </div>

            <svg viewBox="0 0 800 46" className={s.doubling} aria-label="Each switch is worth twice the one to its right">
              {VALUES.slice(0, -1).map((v, i) => {
                const a = (i + 1.5) * 100; // right switch centre
                const b = (i + 0.5) * 100; // left switch centre
                return (
                  <g key={v}>
                    <path
                      d={`M${a - 12},40 Q${(a + b) / 2},4 ${b + 12},40`}
                      fill="none"
                      stroke="var(--muted)"
                      strokeWidth={2.5}
                      markerEnd="url(#bn-arrow)"
                    />
                    <text x={(a + b) / 2} y={30} textAnchor="middle" className={s.times} fill="var(--fg)">
                      ×2
                    </text>
                  </g>
                );
              })}
              <defs>
                <marker id="bn-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--muted)" />
                </marker>
              </defs>
            </svg>

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
                pattern {VALUES.map((v) => (on(v) ? "1" : "0")).join("")} = {n}
              </span>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}

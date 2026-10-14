"use client";

// A one-bit change to the message scrambles about half of SHA-256's 256 output bits.
// The learner taps single bits of the 3-letter message "cat"; the 16 x 16 grid of output bits
// is recomputed with a real SHA-256 (sha256.ts) and the bits that changed on that tap light up,
// with a count. One representation: the message bits above the output grid.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { digestBits } from "./sha256";
import s from "./styles.module.css";

const WORD = "cat";
const START = Array.from(new TextEncoder().encode(WORD));
const OUT_BITS = 256;
const MSG_BITS = START.length * 8; // 24

const flipBit = (bytes: number[], b: number) => bytes.map((v, i) => (i === b >> 3 ? v ^ (1 << (7 - (b & 7))) : v));
const hashOf = (bytes: number[]) => digestBits(new Uint8Array(bytes));
const charOf = (v: number) => (v >= 33 && v <= 126 ? String.fromCharCode(v) : "·");

export default function OneBitAvalanche({ slug }: { slug: string }) {
  const [msg, setMsg] = useState<number[]>(START);
  const [prev, setPrev] = useState<number[] | null>(null); // output bits before the last tap
  const [log, setLog] = useState<number[]>([]); // how many output bits each tap changed

  const out = useMemo(() => hashOf(msg), [msg]);
  const changed = prev ? out.map((v, i) => v !== prev[i]) : out.map(() => false);
  const lastCount = log.length ? log[log.length - 1] : null;
  const mean = log.length ? Math.round(log.reduce((a, b) => a + b, 0) / log.length) : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A hash is a fixed-size fingerprint of a message, used to check it was not altered. SHA-256 makes ${OUT_BITS} bits. You flip one bit of the message. About how many of the ${OUT_BITS} output bits change?`,
        options: ["About 1", `About ${OUT_BITS / 2}`, "About 10"],
        answer: 1,
      }}
      exploreHint="Tap one message bit at a time and count what changes."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {log.length
              ? `Your ${log.length} flip${log.length > 1 ? "s" : ""} changed ${log.slice(0, 6).join(", ")}${log.length > 6 ? ", …" : ""} of the ${OUT_BITS} output bits (about ${mean} on average). `
              : ""}
            One bit in, about half the output out: roughly {OUT_BITS / 2} of {OUT_BITS}, never a handful.
          </p>
          <p>
            A good hash is built so that each output bit flips with a chance of about one half, like a coin toss, whenever
            anything in the message changes. So similar messages do not get similar hashes. Each of your taps re-rolled about half the picture,
            which is why you cannot tweak a message to fix just a few bits of its hash.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["flip-1", "flip-3"]}>
          {(reach) => {
            const tap = (b: number) => {
              if (locked) return;
              const next = flipBit(msg, b);
              const before = out;
              const after = hashOf(next);
              const n = after.reduce((c, v, i) => c + (v !== before[i] ? 1 : 0), 0);
              setPrev(before);
              setMsg(next);
              setLog((l) => [...l, n]);
              reach("flip-1");
              if (log.length + 1 >= 3) reach("flip-3");
            };

            return (
              <div className={s.wrap}>
                <p className={s.label}>Message (tap one bit; · is a non-letter symbol)</p>
                <div className={s.msg}>
                  {msg.map((byte, i) => (
                    <div key={i} className={s.byte}>
                      <span className={s.char}>{charOf(byte)}</span>
                      {Array.from({ length: 8 }, (_, k) => {
                        const b = i * 8 + k;
                        const on = (byte >> (7 - k)) & 1;
                        return (
                          <Control
                            key={k}
                            className={`${s.bit} ${on ? s.on : ""}`}
                            disabled={locked}
                            aria-label={`Flip message bit ${b + 1} of ${MSG_BITS}`}
                            onClick={() => tap(b)}
                          >
                            {on}
                          </Control>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <p className={s.label}>
                  SHA-256 output: {OUT_BITS} bits
                  {lastCount !== null && (
                    <>
                      {" · "}
                      <strong className={s.count}>{lastCount} changed</strong>
                    </>
                  )}
                </p>
                <svg viewBox="0 0 160 160" className={`stage-svg ${s.grid}`} role="img" aria-label={`Output bits; ${lastCount ?? 0} changed on the last tap`}>
                  {out.map((v, i) => (
                    <rect
                      key={i}
                      x={(i % 16) * 10 + 0.5}
                      y={Math.floor(i / 16) * 10 + 0.5}
                      width={9}
                      height={9}
                      rx={1.5}
                      fill={changed[i] ? "var(--domain)" : v ? "var(--muted)" : "var(--bg-2)"}
                      opacity={changed[i] ? 1 : v ? 0.55 : 1}
                      stroke="var(--line)"
                      strokeWidth={0.5}
                    />
                  ))}
                </svg>
                <p className={s.key}>
                  <span className={s.swatch} /> changed by your last tap
                </p>
                {log.length > 0 && <p className={s.key}>Changed per tap: {log.join(", ")}</p>}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

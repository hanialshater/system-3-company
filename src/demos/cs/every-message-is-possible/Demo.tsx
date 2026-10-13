"use client";

// One-time pad on 4 bits. The intercepted ciphertext is fixed at 1101. The learner sets a
// candidate message bit by bit; the key that would turn it into 1101 (key = message XOR 1101)
// appears at once, and the message is marked in a 4 x 4 table of all 16 possible messages.
// "Fill in the rest" completes the table: 16 messages, 16 different keys, all consistent.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const BITS = 4;
const CIPHER = 0b1101;
const ALL = 1 << BITS; // 16
const b4 = (n: number) => n.toString(2).padStart(BITS, "0");
const keyFor = (m: number) => m ^ CIPHER;
const KEYS = new Set(Array.from({ length: ALL }, (_, m) => keyFor(m)));
const DISTINCT_KEYS = KEYS.size; // 16

export default function EveryMessageIsPossible({ slug }: { slug: string }) {
  const [msg, setMsg] = useState(0);
  const [tried, setTried] = useState<number[]>([]);
  const [filled, setFilled] = useState(false);
  const key = keyFor(msg);
  const shown = (m: number) => filled || tried.includes(m);
  const count = filled ? ALL : tried.length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A ${BITS}-bit message was XORed with a random ${BITS}-bit key, used once, giving ${b4(CIPHER)}. How many different ${BITS}-bit messages could it be hiding?`,
        options: ["1", String(BITS), String(ALL)],
        answer: 2,
      }}
      exploreHint={`Pick a message and see which key turns it into ${b4(CIPHER)}. Try a few.`}
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You picked {tried.length} messages by hand ({tried.map(b4).join(", ")}), and each had a key that turns it
            into {b4(CIPHER)}. Filling in the rest, all <strong>{ALL}</strong> messages had one, and all {DISTINCT_KEYS}{" "}
            keys were different.
          </p>
          <p>
            So {b4(CIPHER)} rules nothing out: if the key was random, every message is equally likely. Trying keys only
            lists every message. This is a one-time pad, and it stays unbreakable only if the key is never used again.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["three", "all"]}>
          {(reach) => {
            const toggle = (i: number) => {
              if (locked) return;
              const m = msg ^ (1 << (BITS - 1 - i));
              setMsg(m);
              const t = tried.includes(m) ? tried : [...tried, m];
              setTried(t);
              if (t.length >= 3) reach("three");
            };
            const fill = () => {
              if (locked || filled || tried.length < 3) return;
              setFilled(true);
              reach("all");
            };
            const line = locked
              ? "Make a prediction to start."
              : filled
                ? `All ${ALL} messages fit ${b4(CIPHER)}, each with its own key.`
                : tried.length === 0
                  ? "Tap message bits to pick a message."
                  : `${b4(msg)} fits, with key ${b4(key)}.`;
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{line}</p>
                <div className={s.sum}>
                  <span className={s.lab}>message</span>
                  <div className={s.bits}>
                    {b4(msg).split("").map((b, i) => (
                      <Control key={i} className={s.bit} disabled={locked || filled} aria-label={`Flip message bit ${i + 1}`}
                        onClick={() => toggle(i)}>
                        {b}
                      </Control>
                    ))}
                  </div>
                  <span className={s.lab}>XOR key</span>
                  <div className={s.bits}>
                    {b4(key).split("").map((b, i) => (
                      <span key={i} className={`${s.cell} ${s.keyCell}`}>{locked || tried.length === 0 ? "?" : b}</span>
                    ))}
                  </div>
                  <span className={s.lab}>= sent</span>
                  <div className={s.bits}>
                    {b4(CIPHER).split("").map((b, i) => (
                      <span key={i} className={`${s.cell} ${s.cipher}`}>{b}</span>
                    ))}
                  </div>
                </div>
                <p className={s.rule}>XOR: 1 where the two bits differ.</p>
                <div className={s.table} aria-label="All 16 possible messages">
                  {Array.from({ length: ALL }, (_, m) => (
                    <div key={m} className={`${s.t} ${shown(m) && !locked ? s.fit : ""} ${m === msg && tried.length > 0 ? s.now : ""}`}>
                      <span className={s.tm}>{b4(m)}</span>
                      <span className={s.tk}>{shown(m) && !locked ? `key ${b4(keyFor(m))}` : "·"}</span>
                    </div>
                  ))}
                </div>
                <Row>
                  <Readout label="Messages that fit" value={locked ? "–" : `${count} of ${ALL}`} />
                  <Control disabled={locked || filled || tried.length < 3} onClick={fill}>Fill in the rest</Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

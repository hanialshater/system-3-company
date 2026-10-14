"use client";

// RSA with toy numbers. Public key n = 55, e = 3. Locking m is m^3 mod 55. Using e again does
// not undo it. Splitting 55 into 5 x 11 gives (5-1)(11-1) = 40 and d = 27 (3 x 27 = 81 =
// 2 x 40 + 1), and c^27 mod 55 returns m for every m from 0 to 54. One representation: the
// message, locked and unlocked boxes in a line, with the key card above.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const NMOD = 55;
const E = 3;
const D = 27;
const DIVISORS = [2, 3, 5];

function powmod(b: number, e: number, m: number) {
  let r = 1;
  b %= m;
  for (let i = 0; i < e; i++) r = (r * b) % m;
  return r;
}

export default function RsaLockWithPublicKey({ slug }: { slug: string }) {
  const [m, setM] = useState(2);
  const [c, setC] = useState<number | null>(null);
  const [out, setOut] = useState<{ v: number; by: "e" | "d" } | null>(null);
  const [tried, setTried] = useState<number[]>([]); // divisors tried
  const factored = tried.includes(5);
  const [note, setNote] = useState("");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Public key: n = 55, e = 3. You lock 2 as 2³ mod 55 = 8. Who can unlock 8?",
        options: ["Anyone with the public key", "Only someone who knows 55 = 5 × 11", "Nobody"],
        answer: 1,
      }}
      exploreHint="Lock a number. Try to unlock it with the public key, then with the factors."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Using the public e = 3 again turned the locked number into something new, not back into your message. Only
            after splitting 55 into 5 × 11 could you get d = 27, and that unlocked it.
          </p>
          <p>
            Locking needs only n and e, which everyone may know. Unlocking needs d, and d comes from the factors of n.
            Multiplying two primes is easy; finding them again from the product is not. No fast method is known for
            numbers hundreds of digits long, which is what real keys use.
          </p>
          <p className="muted">A public lock can be safe when the key to open it hides inside a hard problem.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["e-fails", "d-unlocks"]}>
          {(reach) => {
        const pick = (v: number) => {
          if (locked) return;
          setM(v);
          setC(null);
          setOut(null);
          setNote("");
        };
        const lock = () => {
          if (locked) return;
          const v = powmod(m, E, NMOD);
          setC(v);
          setOut(null);
          setNote(`${m}³ mod 55 = ${v}. Anyone can do this.`);
        };
        const unlockE = () => {
          if (locked || c === null) return;
          const v = powmod(c, E, NMOD);
          setOut({ v, by: "e" });
          setNote(`${c}³ mod 55 = ${v}. ${v === m ? "This message happens to come back; most do not. Try another." : `Not ${m}: e only locks.`}`);
          if (v !== m) reach("e-fails");
        };
        const divide = (k: number) => {
          if (locked) return;
          setTried((t) => (t.includes(k) ? t : [...t, k]));
          setNote(k === 5 ? "55 = 5 × 11. So (5−1)(11−1) = 40, and d = 27: 3 × 27 = 81 = 2 × 40 + 1." : `55 ÷ ${k} is not whole.`);
        };
        const unlockD = () => {
          if (locked || c === null || !factored) return;
          const v = powmod(c, D, NMOD);
          setOut({ v, by: "d" });
          setNote(`${c}²⁷ mod 55 = ${v}. ${v === m ? "Your message is back." : ""}`);
          if (v === m) reach("d-unlocks");
        };

        const msg = locked ? "Make a prediction to start." : note || "Pick a message and lock it.";

        return (
          <div className={s.wrap}>
            <div className={s.keys}>
              <div className={s.key}>
                <span className={s.tag}>Public</span> n = 55, e = 3
              </div>
              <div className={`${s.key} ${factored ? s.open : s.closed}`}>
                <span className={s.tag}>Private</span> d = {factored ? 27 : "?"}
              </div>
            </div>
            <div className={s.flow}>
              <div className={s.box}>
                <span className={s.lbl}>Message</span>
                <span className={s.val}>{m}</span>
              </div>
              <span className={s.arrow}>→</span>
              <div className={`${s.box} ${c !== null ? s.lockedBox : ""}`}>
                <span className={s.lbl}>Locked</span>
                <span className={s.val}>{c ?? "–"}</span>
              </div>
              <span className={s.arrow}>→</span>
              <div className={`${s.box} ${out ? (out.v === m ? s.good : s.bad) : ""}`}>
                <span className={s.lbl}>Unlocked</span>
                <span className={s.val}>{out ? out.v : "–"}</span>
              </div>
            </div>
            <p className={s.msg} aria-live="polite">
              {msg}
            </p>
            <Slider label="Message" value={m} min={0} max={54} disabled={locked} onChange={pick} />
            <Row>
              <Control className="active" disabled={locked || c !== null} onClick={lock}>
                Lock with e = 3
              </Control>
              <Control disabled={locked || c === null || out?.by === "e"} onClick={unlockE}>
                Unlock with e = 3
              </Control>
            </Row>
            <Row>
              <span className="muted small">Split 55:</span>
              {DIVISORS.map((k) => (
                <Control key={k} disabled={locked || tried.includes(k) || factored} aria-label={`Try dividing 55 by ${k}`} onClick={() => divide(k)}>
                  ÷{k}
                </Control>
              ))}
              <Control className="active" disabled={locked || c === null || !factored || out?.by === "d"} onClick={unlockD}>
                Unlock with d
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

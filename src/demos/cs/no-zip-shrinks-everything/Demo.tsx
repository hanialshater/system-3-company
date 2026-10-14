"use client";

// The counting limit on compression. Eight 3-bit files, seven shorter strings (empty, 0, 1,
// 00, 01, 10, 11). The learner gives each file its own shorter slot and runs out: one file is
// left with nowhere to go. One representation: files above, slots below, grouped by length.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import s from "./styles.module.css";

const FILES = ["000", "001", "010", "011", "100", "101", "110", "111"];
const SLOTS = ["", "0", "1", "00", "01", "10", "11"];
const GROUPS = [
  { bits: 0, slots: [0] },
  { bits: 1, slots: [1, 2] },
  { bits: 2, slots: [3, 4, 5, 6] },
];
const slotName = (i: number) => (SLOTS[i] === "" ? "empty" : SLOTS[i]);

export default function NoZipShrinksEverything({ slug }: { slug: string }) {
  const [held, setHeld] = useState<(number | null)[]>(Array(SLOTS.length).fill(null)); // slot -> file
  const [picked, setPicked] = useState<number | null>(0);
  const [note, setNote] = useState("");

  const placedSlot = (f: number) => held.indexOf(f);
  const full = held.every((x) => x !== null);
  const left = FILES.map((_, f) => f).filter((f) => placedSlot(f) < 0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "There are 8 different 3-bit files. Could one compressor turn every one of them into a shorter string (0, 1 or 2 bits) and still decompress each correctly?",
        options: ["Yes, with a clever code", "No, there are not enough shorter strings", "Yes, but only slowly"],
        answer: 1,
      }}
      exploreHint="Give every file its own shorter slot. Can all 8 fit?"
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            You filled all 7 slots and file <strong>{FILES[left[0] ?? 6]}</strong> had nowhere to go. There are 8 files of
            3 bits but only 1 + 2 + 4 = 7 shorter strings.
          </p>
          <p>
            Two files cannot share a slot: the decompressor would have no way to tell which one you meant. The same count
            works for any length: 2ⁿ files of n bits, and only 2ⁿ − 1 shorter strings. So a compressor that shrinks some
            files must make others longer.
          </p>
          <p className="muted">Zip works because real files repeat themselves, not because every file can shrink.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const pickFile = (f: number) => {
          if (locked) return;
          const at = placedSlot(f);
          if (at >= 0) {
            // Take a placed file back out of its slot.
            const next = [...held];
            next[at] = null;
            setHeld(next);
            setPicked(f);
            setNote(`${FILES[f]} taken back out.`);
            return;
          }
          setPicked(f);
          setNote("");
        };
        const drop = (slot: number) => {
          if (locked || picked === null || held[slot] !== null) return;
          const next = [...held];
          next[slot] = picked;
          setHeld(next);
          const remaining = FILES.map((_, f) => f).filter((f) => !next.includes(f));
          setNote(`${FILES[picked]} → ${slotName(slot)}.`);
          if (next.every((x) => x !== null)) {
            setPicked(remaining[0] ?? null);
            interact();
          } else setPicked(remaining[0] ?? null);
        };

        const msg = locked
          ? "Make a prediction to start."
          : full
            ? `Every slot is taken. ${FILES[left[0]]} has nowhere shorter to go.`
            : picked !== null
              ? `${note} Holding ${FILES[picked]}: tap a free slot.`
              : "Tap a file, then a free slot.";

        return (
          <div className={s.wrap}>
            <p className={`${s.msg} ${full ? s.bad : ""}`} aria-live="polite">
              {msg}
            </p>
            <div className={s.label}>8 files, 3 bits each</div>
            <div className={s.files}>
              {FILES.map((name, f) => {
                const at = placedSlot(f);
                return (
                  <Control
                    key={name}
                    className={`${s.file} ${picked === f ? "active" : ""} ${at >= 0 ? s.placed : ""} ${full && at < 0 ? s.stranded : ""}`}
                    disabled={locked || picked === f}
                    aria-label={at >= 0 ? `File ${name}, in slot ${slotName(at)}: take it back` : `Pick file ${name}`}
                    onClick={() => pickFile(f)}
                  >
                    {name}
                  </Control>
                );
              })}
            </div>
            <div className={s.label}>Shorter strings: one file per slot</div>
            {GROUPS.map((g) => (
              <div key={g.bits} className={s.group}>
                <span className={s.bits}>{g.bits} bit{g.bits === 1 ? "" : "s"}</span>
                {g.slots.map((i) => (
                  <Control
                    key={i}
                    className={`${s.slot} ${held[i] !== null ? s.filled : ""}`}
                    disabled={locked || held[i] !== null || picked === null}
                    aria-label={`Slot ${slotName(i)}`}
                    onClick={() => drop(i)}
                  >
                    <span className={s.slotName}>{SLOTS[i] === "" ? <em>empty</em> : SLOTS[i]}</span>
                    <span className={s.holds}>{held[i] !== null ? FILES[held[i]!] : "free"}</span>
                  </Control>
                ))}
              </div>
            ))}
            <p className={s.count}>
              {held.filter((x) => x !== null).length} of 7 slots used · {left.length} file{left.length === 1 ? "" : "s"} waiting
            </p>
          </div>
        );
      }}
    </Lesson>
  );
}

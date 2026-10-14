"use client";

// Random assignment. 40 patient dots, shaded by recovery chance (30% frail, dark .. 90% fit, pale). The drug does
// nothing (stated on the card), so a box's expected recoveries are the sum of its members' chances (model.ts).
// Presets in DOM order: Coin chooses (mulberry32(58)), Coin again (seeds 59, 60, ...), Doctor chooses (20 fittest).
// Doctor: 15.1 vs 8.9 of 20. Coin seed 58: 11.8 vs 12.2; seed 59: 11.8 vs 12.2 (values from model.ts, not chosen).
// Milestones: coin, doctor. Both results are recorded when they fire; whichever is not on the boxes stays in the
// trace line, so every value the reveal quotes is on the stage when it opens.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Row } from "@/kit/controls";
import { N, chance, coinSplit, doctorSplit, result, type Result } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["coin", "doctor"] as const;
const W = 320;
const BOX = [8, 168];
const BOX_W = 144;
const fmt = (x: number) => x.toFixed(1);
const signed = (x: number) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x).toFixed(1)}`;
const shade = (i: number) => 1 - (0.82 * i) / (N - 1);

type Mode = { kind: "none" } | { kind: "coin"; k: number } | { kind: "doctor" };

function positions(split: boolean[] | null) {
  if (!split) return Array.from({ length: N }, (_, i) => ({ x: 25 + (i % 10) * 30, y: 52 + Math.floor(i / 10) * 22 }));
  const slot = [0, 0];
  return split.map((d) => {
    const b = d ? 0 : 1;
    const t = slot[b]++;
    return { x: BOX[b] + 16 + (t % 5) * 28, y: 52 + Math.floor(t / 5) * 22 };
  });
}

type Seen = { coin: Result | null; doctor: Result | null };

function Stage({ locked, reach, mode, setMode, seen, setSeen }: {
  locked: boolean;
  reach: (n: string) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  seen: Seen;
  setSeen: (v: Seen) => void;
}) {
  const m: Mode = locked ? { kind: "none" } : mode;
  const split = m.kind === "coin" ? coinSplit(m.k) : m.kind === "doctor" ? doctorSplit() : null;
  const r = split ? result(split) : null;
  const pos = positions(split);
  const coin = (k: number) => {
    if (locked) return;
    setMode({ kind: "coin", k });
    setSeen({ ...seen, coin: result(coinSplit(k)) });
    reach("coin");
  };
  const doctor = () => {
    if (locked || mode.kind === "doctor") return;
    setMode({ kind: "doctor" });
    setSeen({ ...seen, doctor: result(doctorSplit()) });
    reach("doctor");
  };
  const nextK = mode.kind === "coin" ? mode.k + 1 : seen.coin ? 1 : 0;
  const trace =
    m.kind === "doctor" && seen.coin
      ? `Last coin split: ${fmt(seen.coin.drug)} vs ${fmt(seen.coin.none)}`
      : m.kind === "coin" && seen.doctor
        ? `Doctor's split: ${fmt(seen.doctor.drug)} vs ${fmt(seen.doctor.none)}`
        : "";

  return (
    <div className={s.wrap}>
      <p className={s.msg}>{locked ? "Make a prediction to start." : "In this model the drug does nothing."}</p>
      <svg viewBox={`0 0 ${W} 166`} className={`stage-svg ${s.svg}`} role="img" aria-label={r ? `Drug box ${fmt(r.drug)}, no-drug box ${fmt(r.none)} expected recoveries of 20` : "40 patients, not yet assigned"}>
        <defs>
          <linearGradient id="dpp-legend">
            <stop offset="0" stopColor="var(--domain)" stopOpacity={1} />
            <stop offset="1" stopColor="var(--domain)" stopOpacity={0.18} />
          </linearGradient>
        </defs>
        <text x={8} y={12} className={s.label}>Chance to recover: 30%</text>
        <rect x={146} y={3} width={108} height={11} rx={3} fill="url(#dpp-legend)" className={s.legend} />
        <text x={260} y={12} className={s.label}>90%</text>
        {split &&
          BOX.map((x, b) => (
            <g key={b}>
              <text x={x + BOX_W / 2} y={32} textAnchor="middle" className={s.label}>
                {b === 0 ? "Drug" : "No drug"}
              </text>
              <rect x={x} y={38} width={BOX_W} height={96} rx={8} className={s.box} />
              <text x={x + BOX_W / 2} y={150} textAnchor="middle" className={s.label}>
                expected: {fmt(b === 0 ? r!.drug : r!.none)} of 20
              </text>
            </g>
          ))}
        {pos.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={8} className={s.dot} style={{ fillOpacity: shade(i) }} />
        ))}
        {r && (
          <text x={W / 2} y={164} textAnchor="middle" className={s.gap}>
            Gap: {signed(r.gap)} recoveries{trace ? ` · ${trace}` : ""}
          </text>
        )}
      </svg>
      <Row>
        <Control disabled={locked} className={!locked && mode.kind === "coin" && mode.k === 0 ? "active" : ""} onClick={() => coin(0)}>
          Coin chooses
        </Control>
        <Control disabled={locked} onClick={() => coin(nextK)}>
          Coin again
        </Control>
        <Control disabled={locked} className={!locked && mode.kind === "doctor" ? "active" : ""} aria-pressed={!locked && mode.kind === "doctor"} onClick={doctor}>
          Doctor chooses
        </Control>
      </Row>
    </div>
  );
}

export default function TheDoctorPicksThePatients({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode>({ kind: "none" });
  const [seen, setSeen] = useState<Seen>({ coin: null, doctor: null });
  const doc = seen.doctor ?? result(doctorSplit());
  const coin = seen.coin ?? result(coinSplit(0));
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A drug that does nothing is tested on 40 patients, 20 get it. Who should choose those 20 for a fair test?",
        options: ["The doctor, who knows the patients", "A coin flip for each", "Either: with 20 per group it evens out"],
        answer: 1,
      }}
      exploreHint="Let the coin choose (twice), then let the doctor choose."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The drug does nothing, yet the doctor&apos;s choice gives the drug group {fmt(doc.drug)} expected recoveries of 20
            against {fmt(doc.none)}. She picked the fittest, so fitness passes for a cure.
          </p>
          <p>
            Your coin split gave {fmt(coin.drug)} against {fmt(coin.none)}. A coin knows nothing about the patients, so fit
            and frail land on both sides about equally. A gap as big as the doctor&apos;s turns up by coin less than 1 time in
            100.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} mode={mode} setMode={setMode} seen={seen} setSeen={setSeen} />}
        </Milestones>
      )}
    </Lesson>
  );
}

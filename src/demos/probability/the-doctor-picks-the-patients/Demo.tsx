"use client";

// Random assignment. 40 patient dots, shaded by recovery chance (30% frail, dark .. 90% fit, pale). The drug does
// nothing (stated on the card), so a box's expected recoveries are the sum of its members' chances (model.ts).
// Presets in DOM order: Coin picks (the next seed: 58, 59, ...), +20 coins (the next 20 seeds), Doctor picks
// (20 fittest). Every coin gap is kept and drawn as a tick on a gap line, with the doctor's gap as a red mark, so
// repeated coin presses visibly add up (learner r10, W-821). A coin box draws its dots in the shuffled order.
// QA path: seed 58 (gap -0.4), seeds 59-78 (21 gaps, -2.0 to +1.6), doctor (+6.2). Values from model.ts, not chosen.
// Milestones: coin, doctor. The reveal quotes the gap range and the doctor's gap, both on the line when it opens.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Row } from "@/kit/controls";
import { N, coinOrder, coinSplit, doctorSplit, result, type Result } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["coin", "doctor"] as const;
const W = 320;
const BOX = [8, 168];
const BOX_W = 144;
const fmt = (x: number) => x.toFixed(1);
const signed = (x: number) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x).toFixed(1)}`;
const shade = (i: number) => 1 - (0.82 * i) / (N - 1);

type Mode = { kind: "none" } | { kind: "coin"; k: number } | { kind: "doctor" };

/** Dot positions. A coin box fills in the coin's shuffled order (coinOrder), so every coin press visibly re-deals
 *  the dots; the doctor's box fills in patient order. Dots stay keyed by patient, so they move between presses. */
function positions(split: boolean[] | null, order: number[] | null) {
  if (!split) return Array.from({ length: N }, (_, i) => ({ x: 25 + (i % 10) * 30, y: 52 + Math.floor(i / 10) * 22 }));
  const slot = [0, 0];
  const out = Array.from({ length: N }, () => ({ x: 0, y: 0 }));
  for (const i of order ?? Array.from({ length: N }, (_, j) => j)) {
    const b = split[i] ? 0 : 1;
    const t = slot[b]++;
    out[i] = { x: BOX[b] + 16 + (t % 5) * 28, y: 52 + Math.floor(t / 5) * 22 };
  }
  return out;
}

type Seen = { gaps: number[]; doctor: Result | null };
const gx = (g: number) => W / 2 + Math.max(-7, Math.min(7, g)) * 20;
const range = (gaps: number[]) => ({ lo: Math.min(...gaps), hi: Math.max(...gaps) });

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
  const pos = positions(split, m.kind === "coin" ? coinOrder(m.k) : null);
  const coins = (count: number) => {
    if (locked) return;
    const first = seen.gaps.length;
    const ks = Array.from({ length: count }, (_, j) => first + j);
    setMode({ kind: "coin", k: ks[ks.length - 1] });
    setSeen({ ...seen, gaps: [...seen.gaps, ...ks.map((k) => result(coinSplit(k)).gap)] });
    reach("coin");
  };
  const doctor = () => {
    if (locked || mode.kind === "doctor") return;
    setMode({ kind: "doctor" });
    setSeen({ ...seen, doctor: result(doctorSplit()) });
    reach("doctor");
  };
  const trace = m.kind === "coin" && seen.doctor ? ` · Doctor's split: ${fmt(seen.doctor.drug)} vs ${fmt(seen.doctor.none)}` : "";
  const n = seen.gaps.length;
  const rg = n ? range(seen.gaps) : null;

  return (
    <div className={s.wrap}>
      <p className={s.msg}>{locked ? "Make a prediction to start." : "In this model the drug does nothing."}</p>
      <svg viewBox={`0 0 ${W} ${split ? 212 : 166}`} className={`stage-svg ${s.svg}`} role="img" aria-label={r ? `Drug box ${fmt(r.drug)}, no-drug box ${fmt(r.none)} expected recoveries of 20` : "40 patients, not yet assigned"}>
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
          <text x={W / 2} y={166} textAnchor="middle" className={s.gap}>
            Gap: {signed(r.gap)} recoveries{trace}
          </text>
        )}
        {split && (
          <g aria-label="Gaps seen so far">
            <line x1={gx(-7)} x2={gx(7)} y1={188} y2={188} className={s.axis} />
            <line x1={gx(0)} x2={gx(0)} y1={183} y2={193} className={s.axis} />
            {seen.gaps.map((g, j) => (
              <line key={j} x1={gx(g)} x2={gx(g)} y1={181} y2={195} className={s.tick} />
            ))}
            {seen.doctor && <line x1={gx(seen.doctor.gap)} x2={gx(seen.doctor.gap)} y1={177} y2={199} className={s.doc} />}
            <text x={8} y={209} className={s.gap}>
              {rg ? `${n} coin gap${n === 1 ? "" : "s"}: ${rg.lo === rg.hi ? signed(rg.lo) : `${signed(rg.lo)} to ${signed(rg.hi)}`}` : "No coin gaps yet"}
            </text>
            {seen.doctor && (
              <text x={W - 8} y={209} textAnchor="end" className={s.docLabel}>
                Doctor {signed(seen.doctor.gap)}
              </text>
            )}
          </g>
        )}
      </svg>
      <Row>
        <Control disabled={locked} className={!locked && mode.kind === "coin" ? "active" : ""} onClick={() => coins(1)}>
          Coin picks
        </Control>
        <Control disabled={locked} onClick={() => coins(20)}>
          +20 coins
        </Control>
        <Control disabled={locked} className={!locked && mode.kind === "doctor" ? "active" : ""} aria-pressed={!locked && mode.kind === "doctor"} onClick={doctor}>
          Doctor picks
        </Control>
      </Row>
    </div>
  );
}

export default function TheDoctorPicksThePatients({ slug }: { slug: string }) {
  const [mode, setMode] = useState<Mode>({ kind: "none" });
  const [seen, setSeen] = useState<Seen>({ gaps: [], doctor: null });
  const doc = seen.doctor ?? result(doctorSplit());
  const gaps = seen.gaps.length ? seen.gaps : [result(coinSplit(0)).gap];
  const rg = range(gaps);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A drug that does nothing is tested on 40 patients, 20 get it. Who should choose those 20 for a fair test?",
        options: ["The doctor, who knows the patients", "A coin decides", "Either: with 20 per group it evens out"],
        answer: 1,
      }}
      exploreHint="Let the coin choose a few times, then let the doctor choose."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The drug does nothing, yet the doctor&apos;s choice gives the drug group {fmt(doc.drug)} expected recoveries of 20
            against {fmt(doc.none)}. She picked the fittest, so fitness passes for a cure.
          </p>
          <p>
            Your {gaps.length === 1 ? "coin split gave a gap of " + signed(rg.lo) : `${gaps.length} coin splits gave gaps from ${signed(rg.lo)} to ${signed(rg.hi)}`}, against the doctor&apos;s {signed(doc.gap)}. A coin knows nothing about the patients, so fit
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

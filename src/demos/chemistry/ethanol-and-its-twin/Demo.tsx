"use client";

// Ethanol and its twin. Ethanol (CH3-CH2-O-H) and dimethyl ether (CH3-O-CH3) are both C2H6O, 46.07 u.
// Ethanol has an H on its O, so each molecule can lend that H to a neighbour's O: a hydrogen bond
// (dashed). Dimethyl ether has no H on O, so its molecules cannot hydrogen-bond to each other.
// Boiling points at 1 atm: ethanol about 78 °C, dimethyl ether about -24 °C (CRC).
// Brief: company/domains/briefs/chemistry.matter-reactions.md #1 (format: before / after toggle).
//
// The stage is a schematic ring of six molecules at one instant (the dash count is illustrative, not
// measured; claim c5). Heavy atoms only, plus the H on O; the H atoms on carbon are left out.
//
// Earned reveal: milestones "ether-shown" (the O moved to the middle at least once) and "pulled-both"
// (one molecule pulled out in each form; the number of dashes it broke is recorded per form). Both
// records stay on stage as two lines under the ring and survive every toggle. DOM order: "Pull one
// out", then "Move the O": pressing each once pulls an ethanol out (breaks 2), then turns the ring
// into ether with that molecule still out (breaks 0), so both milestones are reached by the 2nd press.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Form = "ethanol" | "ether";
type P = { x: number; y: number };

const W = 320;
const H = 214;
const CX = 160;
const CY = 104;
const R = 50; // ring radius = O···O distance between neighbours
const N = 6;
const PULL = 36; // px the pulled molecule moves out
const BP = { ethanol: "78 °C", ether: "−24 °C" } as const;
const NAME = { ethanol: "Ethanol", ether: "Dimethyl ether" } as const;

const rad = (deg: number) => (deg * Math.PI) / 180;
const at = (p: P, len: number, deg: number): P => ({ x: p.x + len * Math.cos(rad(deg)), y: p.y + len * Math.sin(rad(deg)) });
const lerp = (a: P, b: P, t: number): P => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

function oxygen(k: number, pulled: boolean): P {
  const p = at({ x: CX, y: CY }, R, 60 * k);
  return k === 0 && pulled ? { x: p.x + PULL, y: p.y } : p;
}

/** The H on molecule k's O points along the ring toward molecule k+1's O (unpulled geometry). */
function hydrogen(k: number, pulled: boolean): P {
  const o = oxygen(k, pulled);
  return at(o, 11, 60 * k + 120);
}

/** Hydrogen bonds: donor k (its H) to acceptor k+1 (its O). Intact unless one end was pulled away. */
function hBonds(form: Form, pulled: boolean) {
  if (form === "ether") return [];
  return Array.from({ length: N }, (_, k) => {
    const j = (k + 1) % N;
    const broken = pulled && (k === 0 || j === 0);
    return { from: hydrogen(k, pulled), to: oxygen(j, pulled), broken };
  });
}

function Molecule({ k, form, pulled }: { k: number; form: Form; pulled: boolean }) {
  const a = 60 * k;
  const o = oxygen(k, pulled);
  if (form === "ethanol") {
    const c1 = at(o, 17, a - 10);
    const c2 = at(c1, 16, a + 40);
    const h = hydrogen(k, pulled);
    return (
      <g>
        <line x1={o.x} y1={o.y} x2={c1.x} y2={c1.y} className={s.bond} />
        <line x1={c1.x} y1={c1.y} x2={c2.x} y2={c2.y} className={s.bond} />
        <line x1={o.x} y1={o.y} x2={h.x} y2={h.y} className={s.bond} />
        <circle cx={c2.x} cy={c2.y} r={7} className={s.c} />
        <circle cx={c1.x} cy={c1.y} r={7} className={s.c} />
        <circle cx={h.x} cy={h.y} r={4.5} className={s.h} />
        <circle cx={o.x} cy={o.y} r={7.5} className={s.o} />
      </g>
    );
  }
  const ca = at(o, 17, a + 58);
  const cb = at(o, 17, a - 58);
  return (
    <g>
      <line x1={o.x} y1={o.y} x2={ca.x} y2={ca.y} className={s.bond} />
      <line x1={o.x} y1={o.y} x2={cb.x} y2={cb.y} className={s.bond} />
      <circle cx={ca.x} cy={ca.y} r={7} className={s.c} />
      <circle cx={cb.x} cy={cb.y} r={7} className={s.c} />
      <circle cx={o.x} cy={o.y} r={7.5} className={s.o} />
    </g>
  );
}

type Rec = { dashes: number; broke: number | null };

export default function EthanolAndItsTwin({ slug }: { slug: string }) {
  const [form, setForm] = useState<Form>("ethanol");
  const [pulled, setPulled] = useState(false);
  const [rec, setRec] = useState<{ ethanol: Rec; ether: Rec | null }>({
    ethanol: { dashes: hBonds("ethanol", false).length, broke: null },
    ether: null,
  });

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Ethanol and dimethyl ether are built from the same nine atoms (C₂H₆O, 46 u). Ethanol boils at about 78 °C. Dimethyl ether boils at about…",
        options: ["about 78 °C", "about 35 °C", "about −24 °C"],
        answer: 2,
      }}
      exploreHint="Pull one ethanol molecule out, then move the O to the middle and look again."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Same nine atoms, same 46 u, yet the boiling points sit about 100 °C apart: ethanol about 78 °C, dimethyl
            ether about −24 °C.
          </p>
          <p>
            In your ethanol ring, {rec.ethanol.dashes} dashes linked an O–H to a neighbour&apos;s O, and pulling one
            molecule out broke {rec.ethanol.broke ?? "?"}. With the O in the middle, no H sits on oxygen:{" "}
            {rec.ether ? rec.ether.dashes : "?"} dashes, nothing to break.
          </p>
          <p>
            Boiling pulls molecules apart, so that grip, the hydrogen bond, sets the temperature, not the weight.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage
          locked={locked}
          interact={interact}
          form={form}
          setForm={setForm}
          pulled={pulled}
          setPulled={setPulled}
          rec={rec}
          setRec={setRec}
        />
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  form,
  setForm,
  pulled,
  setPulled,
  rec,
  setRec,
}: {
  locked: boolean;
  interact: () => void;
  form: Form;
  setForm: (f: Form) => void;
  pulled: boolean;
  setPulled: (p: boolean) => void;
  rec: { ethanol: Rec; ether: Rec | null };
  setRec: (r: { ethanol: Rec; ether: Rec | null }) => void;
}) {
  const { reach } = useMilestones(interact, ["ether-shown", "pulled-both"]);

  // Record what the learner sees in form f with the molecule pulled or not, then check milestones.
  const see = (f: Form, p: boolean) => {
    const bonds = hBonds(f, false).length;
    const broke = hBonds(f, true).filter((b) => b.broken).length;
    const prev = rec[f];
    const next = { ...rec, [f]: { dashes: bonds, broke: p ? broke : (prev?.broke ?? null) } };
    setRec(next);
    if (f === "ether") reach("ether-shown");
    if (next.ethanol.broke !== null && next.ether?.broke != null) reach("pulled-both");
  };

  const pull = () => {
    const p = !pulled;
    setPulled(p);
    see(form, p);
  };
  const flip = () => {
    const f: Form = form === "ethanol" ? "ether" : "ethanol";
    setForm(f);
    see(f, pulled);
  };

  const bonds = hBonds(form, pulled);
  const line = (f: Form) => {
    const r = rec[f];
    if (!r) return null;
    return `${NAME[f]} boils ${BP[f]} · ${r.dashes} dashes${r.broke !== null ? ` · pull broke ${r.broke}` : ""}`;
  };

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`${NAME[form]}: six molecules, ${bonds.filter((b) => !b.broken).length} hydrogen bonds${pulled ? ", one molecule pulled out" : ""}`}
      >
        <text x={4} y={12} className={s.chip}>
          <tspan className={s.oKey}>Red: O.</tspan> Dashes: hydrogen bonds.
        </text>
        {bonds.map((b, i) => {
          const d = Math.hypot(b.to.x - b.from.x, b.to.y - b.from.y);
          const start = lerp(b.from, b.to, 5 / d);
          const end = lerp(b.from, b.to, 1 - 8.5 / d);
          if (!b.broken) return <line key={i} x1={start.x} y1={start.y} x2={end.x} y2={end.y} className={s.hb} />;
          const m1 = lerp(start, end, 0.3);
          const m2 = lerp(start, end, 0.7);
          return (
            <g key={i}>
              <line x1={start.x} y1={start.y} x2={m1.x} y2={m1.y} className={s.hbBroken} />
              <line x1={m2.x} y1={m2.y} x2={end.x} y2={end.y} className={s.hbBroken} />
            </g>
          );
        })}
        {Array.from({ length: N }, (_, k) => (
          <Molecule key={`${form}-${k}`} k={k} form={form} pulled={pulled} />
        ))}
        {(["ethanol", "ether"] as Form[]).map((f, i) => (
          <text key={f} x={4} y={H - 20 + i * 15} className={form === f ? s.recNow : s.rec}>
            {line(f)}
          </text>
        ))}
      </svg>
      <Row>
        <Control className={pulled ? "active" : ""} aria-pressed={pulled} disabled={locked} onClick={pull}>
          {pulled ? "Push it back" : "Pull one out"}
        </Control>
        <Control className={form === "ether" ? "active" : ""} aria-pressed={form === "ether"} disabled={locked} onClick={flip}>
          {form === "ethanol" ? "O to the middle" : "O back to the end"}
        </Control>
      </Row>
    </div>
  );
}

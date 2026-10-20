"use client";

// Bird on the wire. A bare line at 11,000 V to ground carries 200 A; its conductor is 0.2 ohm/km
// (illustrative), so each metre of wire drops 200 x 0.0002 = 0.04 V. A bird with its feet d cm
// apart has 0.04 x d/100 V across them: 0.002 V at 5 cm. With an illustrative 10 kilo-ohm bird,
// that pushes 0.2 microamps through it. A wing on the grounded pole bridges line and ground:
// 11,000 V across the bird, 1.1 A. The line is drawn as a steady voltage; on AC both feet rise
// and fall together, so the difference stays tiny (claim c6).
//
// The cause is on the stage: a voltmeter (leads drawn to the two points it compares) and a
// current arrow through the bird whose width grows with the current (log scale, labelled).
//
// Earned reveal (v1): milestones "feet" (each foot read against ground), "across" (the difference
// between the feet read), "pole" (wing on the pole, foot-to-wing difference read). Every reading
// is recorded when it is taken and kept on the stage's "Seen" lines, so the reveal quotes values on
// screen. QA path (DOM order): Foot 1, Foot 2, Across feet, slider x2 (5 -> 7 cm, reading updates),
// Wing on pole. All three milestones.

import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const V_LINE = 11000; // V to ground
const I_LINE = 200; // A
const R_PER_M = 0.2 / 1000; // ohm per metre (illustrative)
const R_BIRD = 10000; // ohm (illustrative)
const D_START = 5; // cm

const acrossV = (cm: number) => I_LINE * R_PER_M * (cm / 100);
const fmtV = (v: number) => (v >= 1 ? `${Math.round(v).toLocaleString("en-US")} V` : `${v.toFixed(3)} V`);
const fmtI = (a: number) => (a >= 0.01 ? `${a.toFixed(1)} A` : `${(a * 1e6).toFixed(1)} µA`);

type Mode = "foot1" | "foot2" | "across" | "wing";
const MODE_LABEL: Record<Mode, string> = {
  // v2 (learner r9, W-576): a single-foot reading names its second point, ground.
  foot1: "foot 1–ground",
  foot2: "foot 2–ground",
  across: "across feet",
  wing: "foot–pole",
};

const W = 320;
const H = 184;
const LINE_Y = 52;
const GROUND = 176;
const POLE_X = 30;
const BX = 84; // bird centre
const PX_PER_CM = 2;

export default function BirdOnTheWire({ slug }: { slug: string }) {
  const [cm, setCm] = useState(D_START);
  const [mode, setMode] = useState<Mode | null>(null);
  const [wing, setWing] = useState(false);
  const [feet, setFeet] = useState<{ foot1: boolean; foot2: boolean }>({ foot1: false, foot2: false });
  const [across, setAcross] = useState<{ cm: number; v: number } | null>(null);
  const [poleSeen, setPoleSeen] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Walking under a power line, you spot a bird standing on one bare wire at 11,000 V. What voltage is across its two feet?",
        options: ["About 11,000 V", "About 5,500 V", "Less than 1 V"],
        answer: 2,
      }}
      exploreHint="Read each foot, then across the feet. Then put a wing on the pole."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Your voltmeter read {fmtV(V_LINE)} from each foot to the ground, and only <strong>{across ? fmtV(across.v) : "?"}</strong>{" "}
            between them: their {across ? across.cm : "?"} cm of wire drops almost nothing, even with{" "}
            {I_LINE} A flowing. Current needs a voltage difference to push it, so almost none goes through the bird.
          </p>
          <p>
            When you put a wing on the grounded pole, the difference jumped to {fmtV(V_LINE)}. Voltage is always between
            two points.
          </p>
          <p className="muted">Never approach real power lines: current can jump across air.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage
          locked={locked}
          interact={interact}
          cm={cm}
          setCm={setCm}
          mode={mode}
          setMode={setMode}
          wing={wing}
          setWing={setWing}
          feet={feet}
          setFeet={setFeet}
          across={across}
          setAcross={setAcross}
          poleSeen={poleSeen}
          setPoleSeen={setPoleSeen}
        />
      )}
    </Lesson>
  );
}

function Stage(p: {
  locked: boolean;
  interact: () => void;
  cm: number;
  setCm: (v: number) => void;
  mode: Mode | null;
  setMode: (m: Mode | null) => void;
  wing: boolean;
  setWing: (w: boolean) => void;
  feet: { foot1: boolean; foot2: boolean };
  setFeet: (f: { foot1: boolean; foot2: boolean }) => void;
  across: { cm: number; v: number } | null;
  setAcross: (a: { cm: number; v: number }) => void;
  poleSeen: boolean;
  setPoleSeen: (b: boolean) => void;
}) {
  const { locked, cm, mode, wing, feet, across, poleSeen } = p;
  const { reach } = useMilestones(p.interact, ["feet", "across", "pole"]);

  const read = (m: Mode, d = cm) => {
    p.setMode(m);
    if (m === "foot1" || m === "foot2") {
      const next = { ...feet, [m]: true };
      p.setFeet(next);
      if (next.foot1 && next.foot2) reach("feet");
    } else if (m === "across") {
      p.setAcross({ cm: d, v: acrossV(d) });
      reach("across");
    } else {
      p.setPoleSeen(true);
      reach("pole");
    }
  };

  const reading = (m: Mode | null) => {
    if (m === "foot1") return V_LINE;
    if (m === "foot2") return V_LINE - acrossV(cm);
    if (m === "across") return acrossV(cm);
    if (m === "wing") return V_LINE;
    return null;
  };
  const v = reading(mode);
  const birdV = wing ? V_LINE : acrossV(cm);
  const birdI = birdV / R_BIRD;
  // Arrow width grows with log10 of the current (0.1 µA -> 1 px, 1 A -> 8 px, capped).
  const aw = Math.max(1, Math.min(8, 1 + 1 * Math.log10(birdI / 1e-7)));

  const half = (cm * PX_PER_CM) / 2;
  const f1 = { x: BX - half, y: LINE_Y };
  const f2 = { x: BX + half, y: LINE_Y };
  const body = { x: BX, y: LINE_Y - 20 };
  const poleTouch = { x: POLE_X + 4, y: LINE_Y - 24 };
  const meter = { x: 206, y: 112, w: 108, h: 54 };
  const leadA = { x: meter.x + 24, y: meter.y };
  const leadB = { x: meter.x + 84, y: meter.y };
  const groundPt = { x: meter.x + 84, y: GROUND };
  const leads: [{ x: number; y: number }, { x: number; y: number }] | null =
    mode === "foot1"
      ? [f1, groundPt]
      : mode === "foot2"
        ? [f2, groundPt]
        : mode === "across"
          ? [f1, f2]
          : mode === "wing"
            ? [f1, { x: POLE_X + 3, y: 84 }]
            : null;

  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.fit}`}
        role="img"
        aria-label={`Bird on a power line, feet ${cm} cm apart${wing ? ", wing on the pole" : ""}. Voltmeter ${mode ? MODE_LABEL[mode] : "not connected"}.`}
      >
        {/* ground and pole (grounded) */}
        <line x1={4} y1={GROUND} x2={W - 4} y2={GROUND} className={s.ground} />
        <rect x={POLE_X} y={LINE_Y - 34} width={6} height={GROUND - LINE_Y + 34} className={s.pole} />
        <line x1={POLE_X - 12} y1={LINE_Y - 14} x2={POLE_X + 30} y2={LINE_Y - 14} className={s.arm} />
        <rect x={POLE_X + 24} y={LINE_Y - 14} width={6} height={12} rx={2} className={s.insulator} />
        {/* the line */}
        <line x1={POLE_X + 27} y1={LINE_Y} x2={W - 2} y2={LINE_Y} className={s.wire} />
        <text x={W - 4} y={LINE_Y - 6} textAnchor="end" className={s.label}>
          {fmtV(V_LINE)} · {I_LINE} A
        </text>

        {/* bird */}
        <line x1={f1.x} y1={LINE_Y} x2={body.x - 4} y2={body.y + 6} className={s.leg} />
        <line x1={f2.x} y1={LINE_Y} x2={body.x + 4} y2={body.y + 6} className={s.leg} />
        <ellipse cx={body.x} cy={body.y} rx={15} ry={9} className={s.bird} />
        <circle cx={body.x + 14} cy={body.y - 8} r={6} className={s.bird} />
        <path d={`M${body.x + 19},${body.y - 9} l6,2 l-6,2 z`} className={s.beak} />
        {wing ? (
          <path d={`M${body.x - 6},${body.y - 4} Q${(body.x + poleTouch.x) / 2},${poleTouch.y - 14} ${poleTouch.x},${poleTouch.y}`} className={s.wingOut} />
        ) : (
          <path d={`M${body.x - 10},${body.y - 2} Q${body.x},${body.y - 10} ${body.x + 8},${body.y - 1}`} className={s.wingIn} />
        )}

        {/* current through the bird */}
        {!locked && (
          <>
            <path
              d={
                wing
                  ? `M${poleTouch.x + 2},${poleTouch.y + 2} L${body.x},${body.y} L${f1.x},${LINE_Y - 2}`
                  : `M${f1.x},${LINE_Y - 2} L${body.x},${body.y + 2} L${f2.x},${LINE_Y - 2}`
              }
              className={s.current}
              strokeWidth={aw}
            />
            <text x={BX + 30} y={LINE_Y - 30} className={s.currentLabel}>
              bird {fmtI(birdI)}
            </text>
          </>
        )}

        {/* voltmeter and its two leads */}
        {leads && (
          <>
            <path d={`M${leadA.x},${leadA.y} C${leadA.x},${leadA.y - 30} ${leads[0].x},${leads[0].y + 40} ${leads[0].x},${leads[0].y + 1}`} className={s.leadRed} />
            <path
              d={
                mode === "wing"
                  ? `M${leadB.x},${leadB.y} C${leadB.x},${leads[1].y} ${leads[1].x + 60},${leads[1].y} ${leads[1].x + 3},${leads[1].y}`
                  : `M${leadB.x},${leadB.y} C${leadB.x},${leadB.y - 30} ${leads[1].x},${leads[1].y + 40} ${leads[1].x},${leads[1].y + 1}`
              }
              className={s.leadBlack}
            />
          </>
        )}
        <rect x={meter.x} y={meter.y} width={meter.w} height={meter.h} rx={6} className={s.meter} />
        <text x={meter.x + meter.w / 2} y={meter.y + 17} textAnchor="middle" className={s.meterLabel}>
          {mode && !locked ? MODE_LABEL[mode] : "voltmeter"}
        </text>
        <text x={meter.x + meter.w / 2} y={meter.y + 42} textAnchor="middle" className={s.meterValue}>
          {locked || v === null ? "? V" : fmtV(v)}
        </text>

        {/* the record */}
        {!locked && (feet.foot1 || feet.foot2 || across || poleSeen) && (
          <g className={s.seen}>
            {(feet.foot1 || feet.foot2) && (
              <text x={POLE_X + 14} y={meter.y + 24}>
                seen: {feet.foot1 && feet.foot2 ? "feet" : feet.foot1 ? "foot 1" : "foot 2"}–ground {fmtV(V_LINE)}
              </text>
            )}
            {across && (
              <text x={POLE_X + 14} y={meter.y + 40}>
                across {across.cm} cm {fmtV(across.v)}
              </text>
            )}
            {poleSeen && <text x={POLE_X + 14} y={meter.y + 56}>to pole {fmtV(V_LINE)}</text>}
          </g>
        )}
      </svg>

      <Row>
        <Control className={mode === "foot1" ? "active" : ""} disabled={locked || mode === "foot1"} onClick={() => read("foot1")}>
          Foot 1
        </Control>
        <Control className={mode === "foot2" ? "active" : ""} disabled={locked || mode === "foot2"} onClick={() => read("foot2")}>
          Foot 2
        </Control>
        <Control className={mode === "across" ? "active" : ""} disabled={locked || mode === "across"} onClick={() => read("across")}>
          Across feet
        </Control>
      </Row>
      <Slider
        label="Feet apart"
        value={cm}
        min={2}
        max={20}
        step={1}
        disabled={locked}
        format={(c) => `${c} cm`}
        onChange={(c) => {
          p.setCm(c);
          if (mode === "across") read("across", c);
        }}
      />
      <Row>
        <Control
          className={wing ? "active" : ""}
          disabled={locked}
          onClick={() => {
            const next = !wing;
            p.setWing(next);
            if (next) read("wing");
            else p.setMode(mode === "wing" ? null : mode);
          }}
        >
          {wing ? "Lift wing off pole" : "Wing on pole"}
        </Control>
      </Row>
    </div>
  );
}

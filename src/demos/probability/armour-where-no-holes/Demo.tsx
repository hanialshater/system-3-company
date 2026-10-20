"use client";

// Survivorship bias. Bullets land anywhere on a plane, evenly. A hit on an engine brings it
// down. The learner flies missions and inspects only the planes that came back, then asks to
// see the planes that did not. The payoff: the clean engines are clean because the planes
// hit there never returned to be counted.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { ENGINES, FUSELAGE, MAX_PLANES, TAIL, WING, fleet } from "./model";
import s from "./styles.module.css";

const FLEET = fleet();

export default function ArmourWhereNoHoles({ slug }: { slug: string }) {
  const [flown, setFlown] = useState(0);
  const [showLost, setShowLost] = useState(false);
  const planes = FLEET.slice(0, flown);
  const back = useMemo(() => planes.filter((p) => !p.lost), [planes]);
  const lost = flown - back.length;
  const lostHoles = useMemo(() => planes.filter((p) => p.lost).flatMap((p) => p.holes), [planes]);
  const backHoles = back.flatMap((p) => p.holes);

  const fly = (k: number, interact: () => void) => {
    setFlown((f) => Math.min(MAX_PLANES, f + k));
    if (showLost) interact();
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Bombers return with bullet holes all over the wings and body, but almost none on the engines. Where should extra armour go?",
        options: ["Where the holes are", "Where returning planes have few holes", "Spread it evenly"],
        answer: 1,
      }}
      exploreHint="Fly some missions and inspect the planes that came back. Then look at the ones that didn't."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Of your {flown} planes, {lost} never came back. Every one of them had been hit in an engine; the{" "}
            {back.length} that returned had <strong>no engine holes at all</strong>, though bullets landed evenly.
          </p>
          <p>
            The holes you can count are on planes that survived them. Clean engines do not mean engines are rarely hit:
            they mean an engine hit is the one a plane does not come home from. Armour goes where the returning planes
            are <em>clean</em>.
          </p>
          <p className="muted">
            A toy model: even hits, and only engine hits are fatal. In WWII the statistician Abraham Wald reasoned this
            way about real damage reports.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg viewBox="0 6 300 226" className={`stage-svg ${s.svg}`} role="img" aria-label={`Holes on ${back.length} returned planes${showLost ? ` and ${lost} lost planes` : ""}`}>
            <rect x={WING.x} y={WING.y} width={WING.w} height={WING.h} rx={8} className={s.body} />
            <rect x={TAIL.x} y={TAIL.y} width={TAIL.w} height={TAIL.h} rx={5} className={s.body} />
            <ellipse cx={FUSELAGE.cx} cy={FUSELAGE.cy} rx={FUSELAGE.rx} ry={FUSELAGE.ry} className={s.body} />
            {ENGINES.map((e, i) => (
              <ellipse key={i} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} className={s.engine} />
            ))}
            {backHoles.map((h, i) => (
              <circle key={`b${i}`} cx={h.x} cy={h.y} r={2.1} className={s.hole} />
            ))}
            {showLost &&
              lostHoles.map((h, i) => (
                <circle key={`l${i}`} cx={h.x} cy={h.y} r={2.4} className={h.engine ? s.lostEngine : s.lostHole} />
              ))}
            <text x={150} y={226} textAnchor="middle" className={s.caption}>
              {showLost ? "Black: came back. Red: never came back." : "Holes on planes that came back"}
            </text>
            <text x={62} y={76} textAnchor="middle" className={s.engineLabel}>engines</text>
          </svg>
          <Row>
            <Control disabled={locked || flown >= MAX_PLANES} onClick={() => fly(10, interact)}>
              Fly 10 planes
            </Control>
            <Control disabled={locked || flown >= MAX_PLANES} onClick={() => fly(50, interact)}>
              Fly 50
            </Control>
            <Control
              className={showLost ? "active" : ""}
              disabled={locked || flown === 0}
              onClick={() => {
                setShowLost((v) => !v);
                if (!showLost) interact();
              }}
            >
              {showLost ? "Hide lost planes" : "Show the lost planes"}
            </Control>
          </Row>
          <Row>
            <Readout label="Came back" value={back.length} />
            <Readout label="Never came back" value={flown ? lost : "—"} />
            <Readout label="Returned engine holes" value={flown ? backHoles.filter((h) => h.engine).length : "—"} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}

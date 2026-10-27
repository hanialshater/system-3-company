"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";
import styles from "@/lib/physics/physics.module.css";

// Orthographic projection of a circular orbit tilted about its horizontal axis.
// The tilt changes its appearance, not its radius or constant orbital speed.
const point = (angle: number, tilt: number) => {
  const a = angle * Math.PI / 180;
  const t = tilt * Math.PI / 180;
  return { x: 150 + 95 * Math.cos(a), y: 100 + 95 * Math.sin(a) * Math.cos(t) };
};

export default function InclinedOrbitProjection({ slug }: { slug: string }) {
  const [tilt, setTilt] = useState(0);
  const points = Array.from({ length: 73 }, (_, i) => point(i * 5, tilt));
  const path = points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
  const dot = point(45, tilt);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "An orbit looks oval from above. What can you conclude about the path's actual shape in space?",
        options: ["It must be elliptical", "It may be circular or elliptical", "It cannot be either"],
        answer: 1,
      }}
      exploreHint="Tilt a circular orbit and compare its apparent shape with the unchanged circular reference."
      minInteractions={1}
      reveal={() => <><p>At {tilt}° the tilted circle appears {Math.round(100 * Math.cos(tilt * Math.PI / 180))}% as tall as the reference. Its actual shape is still circular.</p><p>The camera uses an orthographic projection: the apparent height is multiplied by cos(tilt). A projected oval alone does not tell you whether the actual path is circular or elliptical.</p></>}
    >
      {({ locked, interact }) => <div>
        <svg viewBox="0 0 300 200" className="stage-svg" role="img" aria-label={`Top view of an orbit tilted ${tilt} degrees. The orange projected circle appears ${Math.round(100 * Math.cos(tilt * Math.PI / 180))} percent as tall as the grey reference circle.`}>
          <circle cx="150" cy="100" r="95" fill="none" stroke="var(--muted)" strokeDasharray="4 4" />
          <path d={path} fill="none" stroke="var(--domain)" strokeWidth="3" />
          <circle cx="150" cy="100" r="5" fill="var(--fg)" />
          <circle cx={dot.x} cy={dot.y} r="6" fill="var(--domain)" />
        </svg>
        <p>Apparent height: {Math.round(100 * Math.cos(tilt * Math.PI / 180))}%</p>
        <div className={styles.sliderTouch}><Slider label="Tilt" value={tilt} min={0} max={60} step={30} disabled={locked} format={v => `${v}°`} onChange={v => { setTilt(v); interact(); }} /></div>
      </div>}
    </Lesson>
  );
}

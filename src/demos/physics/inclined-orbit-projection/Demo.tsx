"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";

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
        question: "A spacecraft travels at constant speed in a circular orbit. You tilt its orbital plane, keeping the same circular orbit. It now looks oval from above. What happens to its speed?",
        options: ["It increases", "It stays the same", "It decreases"],
        answer: 1,
      }}
      exploreHint="Tilt the orbit and compare its apparent shape with the unchanged circular reference."
      minInteractions={1}
      reveal={() => <><p>At {tilt}° the tilted circle appears {Math.round(100 * Math.cos(tilt * Math.PI / 180))}% as tall as the reference. Its actual radius and speed remain fixed in this model.</p><p>The camera uses an orthographic projection: the apparent height is multiplied by cos(tilt). A projected oval alone does not show that the actual path is elliptical.</p></>}
    >
      {({ locked, interact }) => <div>
        <svg viewBox="0 0 300 200" className="stage-svg" role="img" aria-label={`Top view of an orbit tilted ${tilt} degrees. The orange projected circle appears ${Math.round(100 * Math.cos(tilt * Math.PI / 180))} percent as tall as the grey reference circle.`}>
          <circle cx="150" cy="100" r="95" fill="none" stroke="var(--muted)" strokeDasharray="4 4" />
          <path d={path} fill="none" stroke="var(--domain)" strokeWidth="3" />
          <circle cx="150" cy="100" r="5" fill="var(--fg)" />
          <circle cx={dot.x} cy={dot.y} r="6" fill="var(--domain)" />
        </svg>
        <p>Apparent height: {Math.round(100 * Math.cos(tilt * Math.PI / 180))}%</p>
        <Slider label="Tilt" value={tilt} min={0} max={60} step={30} disabled={locked} format={v => `${v}°`} onChange={v => { setTilt(v); interact(); }} />
      </div>}
    </Lesson>
  );
}

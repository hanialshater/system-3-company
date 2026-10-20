"use client";

// One magnified pixel and its three lights. Each light (red, green, blue) can be set to 0, 128 or 255.
// The swatch is painted with exactly rgb(r, g, b), so what the learner sees is what the screen does.
// Red 255 + green 255 + blue 0 is yellow, not brown; raising blue then makes it paler, up to white.
// The step currently chosen is shown as an active, disabled button, so every enabled button changes the pixel.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const LEVELS = [0, 128, 255];
const CH = ["red", "green", "blue"] as const;
type Ch = (typeof CH)[number];
type Px = Record<Ch, number>;
const Q: Px = { red: 255, green: 255, blue: 0 }; // the question's pixel
// Everyday names for the eight corner colours only (CSS Color 4 named colours: lime, aqua, fuchsia are the CSS names).
const NAMES: Record<string, string> = {
  "0,0,0": "black",
  "255,0,0": "red",
  "0,255,0": "green",
  "0,0,255": "blue",
  "255,255,0": "yellow",
  "0,255,255": "cyan",
  "255,0,255": "magenta",
  "255,255,255": "white",
};
const css = (p: Px) => `rgb(${p.red}, ${p.green}, ${p.blue})`;
const isQ = (p: Px) => CH.every((c) => p[c] === Q[c]);

export default function LightAddsToYellow({ slug }: { slug: string }) {
  const [px, setPx] = useState<Px>({ red: 0, green: 0, blue: 0 });
  const [sawYellow, setSawYellow] = useState(false);
  const [bluer, setBluer] = useState<number | null>(null); // blue level reached after yellow

  const name = NAMES[`${px.red},${px.green},${px.blue}`];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On your phone screen, each pixel has three lights, from 0 (off) to 255 (full). You set one to red ${Q.red}, green ${Q.green}, blue ${Q.blue}. What colour appears?`,
        options: ["Brown", "Yellow", "White"],
        answer: 1,
      }}
      exploreHint="Turn red and green up to full. Then raise blue and watch."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You set red and green to 255 with blue at 0, and the pixel turned <strong>yellow</strong>, not brown.
            {bluer !== null
              ? ` Raising blue to ${bluer} made it paler${px.red === 255 && px.green === 255 && px.blue === 255 ? ": all three full is white." : "."}`
              : ""}
          </p>
          <p>
            A screen does not mix pigment: each pixel gives off light, and the three lights add. Adding light only makes
            it brighter. Paint works the other way: each pigment soaks up some light, so mixing paints leaves less,
            which is why red and green paint make a dark brown.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["yellow", "blue-up"]}>
          {(reach) => {
            const set = (c: Ch, v: number) => {
              if (locked) return;
              const next = { ...px, [c]: v };
              setPx(next);
              const yellowNow = isQ(next);
              if (yellowNow) {
                setSawYellow(true);
                reach("yellow");
              }
              if ((sawYellow || yellowNow) && c === "blue" && v > 0 && next.red === 255 && next.green === 255) {
                setBluer(v);
                reach("blue-up");
              }
            };
            return (
              <div className={s.wrap}>
                <div className={s.pixel} style={{ background: locked ? "rgb(0, 0, 0)" : css(px) }} role="img"
                  aria-label={`Pixel showing ${css(px)}`}>
                  <span className={s.code}>{locked ? " " : css(px)}</span>
                </div>
                <p className={s.msg} aria-live="polite">
                  {locked ? "Make a prediction to start." : name ? `Looks ${name}.` : "Each light adds to the pixel."}
                </p>
                {CH.map((c) => (
                  <div key={c} className={s.chan} role="group" aria-label={`${c} light`}>
                    <span className={`${s.dot} ${s[c]}`} aria-hidden />
                    <span className={s.cname}>{c}</span>
                    {LEVELS.map((v) => (
                      <Control key={v} disabled={locked || px[c] === v} className={!locked && px[c] === v ? "active" : ""}
                        aria-label={`${c} ${v}`} onClick={() => set(c, v)}>
                        {v}
                      </Control>
                    ))}
                  </div>
                ))}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

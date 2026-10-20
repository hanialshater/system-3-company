"use client";

// Same picture, two histories (E&K ch. 4, section 4.2 unconfirmed): selection vs social influence.
// Eight people, two groups of 4 (0-3 "blue" circles, 4-7 "orange" squares). The final picture: each
// group fully linked (6 + 6 = 12 friendships), no friendship crossing colours.
//   Town 1 (picking): colours never change. It starts with links 0-4, 3-6, 1-5 in place of 0-1, 2-3, 5-6
//   (12 links, 3 crossing) and swaps one crossing link for a same-colour one per step: 3 steps.
//   Town 2 (copying): links never change (the final 12). Person 3 starts orange and person 7 blue; one
//   person per step takes their friends' majority colour, person 3 then person 7: 2 steps.
// Numbers: node company/courses/ncm/checks/rejudged-four.mjs (J9) and model() below.
// Each replay runs to its final frame on its own (one step every 700 ms; Step advances by hand), then the
// trail fades after 1 s so the end frame looks exactly like the final picture.
// The milestone is recorded on the press (the QA contract presses each control once, 450 ms apart, so a
// gate on the run's end would need steps too fast to watch); the Seen row and the reveal's counts appear
// only for a history watched to its last step.

import { useEffect, useRef, useState } from "react";
import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Edge = [number, number];
const key = ([a, b]: Edge) => (a < b ? `${a}-${b}` : `${b}-${a}`);
const BLUE = [0, 1, 2, 3];
const ORANGE = [4, 5, 6, 7];
const clique = (g: number[]) => g.flatMap((a, i) => g.slice(i + 1).map((b) => [a, b] as Edge));
const FINAL_LINKS: Edge[] = [...clique(BLUE), ...clique(ORANGE)]; // 12
const FINAL_COLOURS = [0, 0, 0, 0, 1, 1, 1, 1]; // 0 blue, 1 orange

// Town 1: (remove cross link, add same-colour link) per step.
const SWAPS: [Edge, Edge][] = [
  [[0, 4], [0, 1]],
  [[3, 6], [2, 3]],
  [[1, 5], [5, 6]],
];
// Town 2: person who switches per step.
const SWITCHES = [3, 7];

interface Frame {
  links: Edge[];
  colours: number[];
}

function town1(step: number): Frame {
  let links = FINAL_LINKS.filter((e) => !SWAPS.some(([, add]) => key(add) === key(e))).concat(SWAPS.map(([rem]) => rem));
  for (let i = 0; i < step; i++) {
    const [rem, add] = SWAPS[i];
    links = links.filter((e) => key(e) !== key(rem)).concat([add]);
  }
  return { links, colours: FINAL_COLOURS };
}
function town2(step: number): Frame {
  const colours = [0, 0, 0, 1, 1, 1, 1, 0];
  for (let i = 0; i < step; i++) {
    const p = SWITCHES[i];
    const friends = FINAL_LINKS.filter(([a, b]) => a === p || b === p).map(([a, b]) => (a === p ? b : a));
    const orange = friends.filter((f) => colours[f] === 1).length;
    colours[p] = orange * 2 > friends.length ? 1 : 0;
  }
  return { links: FINAL_LINKS, colours };
}
const STEPS = { 1: SWAPS.length, 2: SWITCHES.length } as const;
const frameOf = (town: 1 | 2, step: number) => (town === 1 ? town1(step) : town2(step));
const crossing = (f: Frame) => f.links.filter(([a, b]) => f.colours[a] !== f.colours[b]).length;
const sameFrame = (a: Frame, b: Frame) =>
  a.colours.join() === b.colours.join() && a.links.map(key).sort().join() === b.links.map(key).sort().join();

// Layout (viewBox 320 x 172): two squares, blue on the left, orange on the right. The short crossing links
// 0-4 (top) and 3-6 (bottom) run between the facing corners; 1-5 bows over the top of both squares.
const POS = [
  { x: 130, y: 62 },
  { x: 40, y: 62 },
  { x: 40, y: 146 },
  { x: 130, y: 146 },
  { x: 190, y: 62 },
  { x: 280, y: 62 },
  { x: 190, y: 146 },
  { x: 280, y: 146 },
];
function linkPath([a, b]: Edge) {
  const p = POS[a];
  const q = POS[b];
  // 1-5 would run straight through people 0 and 4: bow it over the top.
  if (key([a, b]) === "1-5") return `M${p.x},${p.y} Q160,-24 ${q.x},${q.y}`;
  return `M${p.x},${p.y} L${q.x},${q.y}`;
}

function Person({ i, colour, was }: { i: number; colour: number; was: number | null }) {
  const { x, y } = POS[i];
  return (
    <g>
      {/* The ring is drawn in the colour the person had before they changed. */}
      {was !== null && <circle cx={x} cy={y} r={16} className={was === 0 ? s.ringBlue : s.ringOrange} />}
      {colour === 0 ? (
        <circle cx={x} cy={y} r={10} className={s.blue} />
      ) : (
        <rect x={x - 9.5} y={y - 9.5} width={19} height={19} rx={2} className={s.orange} />
      )}
    </g>
  );
}

/** A short line sample for the key, drawn with the same class as the stage line it names. */
function Swatch({ cls }: { cls: string }) {
  return (
    <svg viewBox="0 0 22 8" className={s.swatch} aria-hidden="true">
      <line x1={1} y1={4} x2={21} y2={4} className={cls} />
    </svg>
  );
}
function RingSwatch() {
  return (
    <svg viewBox="0 0 12 12" className={s.ringSwatch} aria-hidden="true">
      <circle cx={6} cy={6} r={4.5} className={s.keyRingLine} />
    </svg>
  );
}

/** Which histories have been watched to their last step (the Seen row and the reveal's counts). */
interface Seen {
  t1: boolean;
  t2: boolean;
}

const SETTLE_MS = 1000; // the trail fades this long after a history's last step, leaving the bare picture

function Stage({ ctx, seen, onSeen }: { ctx: StageContext; seen: Seen; onSeen: (t: 1 | 2) => void }) {
  const { locked } = ctx;
  const { reach } = useMilestones(ctx.interact, ["town1", "town2"]);
  const [town, setTown] = useState<0 | 1 | 2>(0); // 0: the final picture
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [settled, setSettled] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setPlaying(false);
  };
  const unsettle = () => {
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = null;
    setSettled(false);
  };
  useEffect(
    () => () => {
      stop();
      unsettle();
    },
    [],
  );

  // A history reaching its last step (on its own or by Step): record it, then let the trail fade.
  const last = town === 0 ? 0 : STEPS[town];
  useEffect(() => {
    if (town === 0 || step < STEPS[town]) return;
    onSeen(town);
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => setSettled(true), SETTLE_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [town, step]);

  const replay = (t: 1 | 2) => {
    if (locked) return;
    stop();
    unsettle();
    setTown(t);
    setStep(0);
    setPlaying(true);
    // The gate opens on the press: the run then plays to its last step on its own (1.4 s / 0.7 s).
    reach(t === 1 ? "town1" : "town2");
    timer.current = setInterval(() => {
      setStep((k) => {
        const n = k + 1;
        if (n >= STEPS[t]) stop();
        return Math.min(n, STEPS[t]);
      });
    }, 700);
  };
  const showFinal = () => {
    if (locked) return;
    stop();
    unsettle();
    setTown(0);
    setStep(0);
  };
  const stepOnce = () => {
    if (locked || town === 0) return;
    stop();
    setStep((k) => Math.min(k + 1, STEPS[town]));
  };

  const frame: Frame = town === 0 ? { links: FINAL_LINKS, colours: FINAL_COLOURS } : frameOf(town, step);
  // Trail: what has changed so far in this history (hidden once the history has settled on its end).
  const trail = town !== 0 && !settled;
  const removed = trail && town === 1 ? SWAPS.slice(0, step).map(([rem]) => rem) : [];
  const added = new Set(trail && town === 1 ? SWAPS.slice(0, step).map(([, add]) => key(add)) : []);
  const switched = new Map(trail && town === 2 ? SWITCHES.slice(0, step).map((p) => [p, frameOf(2, 0).colours[p]] as const) : []);
  const ends = town !== 0 && step === last && sameFrame(frame, frameOf(town === 1 ? 2 : 1, STEPS[town === 1 ? 2 : 1]));
  const cross = crossing(frame);

  const caption =
    town === 0
      ? "Final picture"
      : `Town ${town} (${town === 1 ? "picking" : "copying"}) · step ${step} of ${last}`;
  // The Seen row lists histories watched to the end, except the one being replayed until it ends again.
  const showT1 = seen.t1 && !(town === 1 && step < last);
  const showT2 = seen.t2 && !(town === 2 && step < last);

  return (
    <div className={s.wrap}>
      <p className={s.caption} aria-live="polite">
        {caption}
        {ends ? " = final" : ""}
      </p>
      <svg
        viewBox="0 0 320 172"
        className="stage-svg"
        role="img"
        aria-label={`${frame.links.length} friendships, ${cross} join different colours`}
      >
        {removed.map((e) => (
          <path key={`r${key(e)}`} d={linkPath(e)} className={s.trailLink} />
        ))}
        {frame.links.map((e) => (
          <path
            key={key(e)}
            d={linkPath(e)}
            className={frame.colours[e[0]] !== frame.colours[e[1]] ? s.crossLink : added.has(key(e)) ? s.newLink : s.link}
          />
        ))}
        {POS.map((_, i) => (
          <Person key={i} i={i} colour={frame.colours[i]} was={switched.get(i) ?? null} />
        ))}
      </svg>
      <p className={s.key}>
        {cross > 0 && (
          <span className={s.keyItem}>
            <Swatch cls={s.crossLink} /> joins two colours
          </span>
        )}
        {added.size > 0 && (
          <span className={s.keyItem}>
            <Swatch cls={s.newLink} /> new link
          </span>
        )}
        {removed.length > 0 && (
          <span className={s.keyItem}>
            <Swatch cls={s.trailLink} /> dropped link
          </span>
        )}
        {switched.size > 0 && (
          <span className={s.keyItem}>
            <RingSwatch /> colour before
          </span>
        )}
      </p>
      <Row>
        <Control className={town === 1 && playing ? "active" : ""} disabled={locked} onClick={() => replay(1)}>
          <span aria-hidden="true">▶</span> Town 1
        </Control>
        <Control className={town === 2 && playing ? "active" : ""} disabled={locked} onClick={() => replay(2)}>
          <span aria-hidden="true">▶</span> Town 2
        </Control>
        <Control disabled={locked || town === 0} onClick={showFinal}>
          Final
        </Control>
        <Control disabled={locked || town === 0 || step >= last} onClick={stepOnce}>
          Step
        </Control>
      </Row>
      <p className={s.seen}>
        {showT1 && <span>Town 1: {SWAPS.length} links swapped</span>}
        {showT1 && showT2 && " · "}
        {showT2 && <span>Town 2: {SWITCHES.length} colours changed</span>}
      </p>
    </div>
  );
}

export default function SamePictureTwoHistories({ slug }: { slug: string }) {
  const [seen, setSeen] = useState<Seen>({ t1: false, t2: false });
  const onSeen = (t: 1 | 2) => setSeen((v) => (t === 1 ? { ...v, t1: true } : { ...v, t2: true }));
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "You visit two towns and find this same picture in both: all 12 friendships join people of the same colour. Did people choose friends like themselves?",
        options: [
          "Yes: they picked friends of their own colour",
          "No: they became like their friends",
          "Can't tell from this picture alone",
        ],
        answer: 2,
      }}
      exploreHint="Play each town's history, then compare where both end."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Town 1 kept everyone&apos;s colour and swapped {seen.t1 ? SWAPS.length : "some"} friendships. Town 2 kept every friendship and{" "}
            {seen.t2 ? SWITCHES.length : "some"} people changed colour. Both ended in the identical picture.
          </p>
          <p>
            So a single snapshot cannot separate choosing similar friends from becoming like your friends. Telling them apart needs data over time:
            who changed first, the link or the person.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage ctx={ctx} seen={seen} onSeen={onSeen} />}
    </Lesson>
  );
}

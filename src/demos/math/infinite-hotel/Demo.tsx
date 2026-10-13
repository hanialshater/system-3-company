"use client";

// Infinite hotel (Hilbert's hotel, a thought experiment). A row of rooms 1, 2, 3, ... fading off
// to the right, every room full. "Everyone moves up one room" sends the guest in room n to room
// n + 1; room 1 comes free and nobody is left over, because every room has a next room. "New
// guest takes room 1" seats the newcomer. "Same move, 12 rooms" shows the same picture for a
// hotel with 12 rooms: there the move leaves guest 12 with no room 13 (pigeonhole).
// Key states: everyone moved up; the new guest in room 1.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const FINITE = 12;
const SHOWN = 8; // rooms drawn in the infinite hotel (the 8th fades)
const MILESTONES = ["moved-up", "guest-in"] as const;
const W = 340;
const H = 150;

export default function InfiniteHotel({ slug }: { slug: string }) {
  const [moved, setMoved] = useState(false);
  const [admitted, setAdmitted] = useState(false);
  const [finite, setFinite] = useState(false);
  const [sawFiniteFail, setSawFiniteFail] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A hotel has infinitely many rooms, numbered 1, 2, 3, … and every one is full. A new guest arrives. Can everyone have a room, with nobody thrown out?",
        options: ["Yes", "No, it is full", "Only if someone leaves"],
        answer: 0,
      }}
      exploreHint="Move everyone up one room, then seat the new guest."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>Yes.</strong> When everyone moved up one room, room 1 came free and nobody was left over: the guest in room n
            went to room n + 1, and there is always a room n + 1.
            {sawFiniteFail ? ` In the ${FINITE}-room hotel the same move left guest ${FINITE} with no room ${FINITE + 1}.` : ""}
          </p>
          <p>
            With finitely many rooms, more guests than rooms forces someone out. With infinitely many, &quot;full&quot; does not mean
            &quot;no space&quot;: shifting everyone frees a room without losing anyone. This is Hilbert&apos;s hotel, a thought
            experiment about infinite sets, not a real building.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              moved={moved}
              admitted={admitted}
              finite={finite}
              onMove={() => {
                setMoved(true);
                if (finite) setSawFiniteFail(true);
                reach("moved-up");
              }}
              onAdmit={() => {
                setAdmitted(true);
                reach("guest-in");
              }}
              onFinite={() => {
                setFinite(!finite);
                if (!finite && moved) setSawFiniteFail(true);
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({
  locked,
  moved,
  admitted,
  finite,
  onMove,
  onAdmit,
  onFinite,
}: {
  locked: boolean;
  moved: boolean;
  admitted: boolean;
  finite: boolean;
  onMove: () => void;
  onAdmit: () => void;
  onFinite: () => void;
}) {
  const rooms = finite ? FINITE : SHOWN;
  const rw = finite ? 24 : 36;
  const x0 = 38;
  const top = 46;
  const rh = finite ? 40 : 52;
  const gr = finite ? 9 : 14;
  const cx = (room: number) => x0 + (room - 0.5) * rw; // room numbered from 1
  const cy = top + rh / 2;

  // guest g (their starting room) is in room g, or g + 1 after the move
  const guests = Array.from({ length: rooms + (finite ? 0 : 1) }, (_, i) => i + 1);
  const outside = finite && moved; // guest 12 has no room 13
  const homeless = (outside ? 1 : 0) + (admitted ? 0 : 1);

  const caption = locked
    ? "Make a prediction to start."
    : !moved
      ? finite
        ? `${FINITE} rooms, ${FINITE} guests. The new guest waits.`
        : "Every room is full, forever to the right. The new guest waits."
      : finite
        ? `Guest ${FINITE} has no room ${FINITE + 1} to move to.`
        : admitted
          ? "Everyone has a room, and nobody left."
          : "Guest in room n is now in room n + 1. Room 1 is empty.";

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        <defs>
          <linearGradient id="hotel-fade" x1="0" x2="1">
            <stop offset="0" stopColor="var(--bg-2)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--bg-2)" stopOpacity="1" />
          </linearGradient>
        </defs>
        {Array.from({ length: rooms }, (_, i) => (
          <g key={`r${i}`}>
            <rect x={x0 + i * rw} y={top} width={rw} height={rh} className={s.room} />
            <text x={cx(i + 1)} y={top + rh + 13} className={s.roomNo}>
              {i + 1}
            </text>
          </g>
        ))}
        {guests.map((g) => {
          const room = moved ? g + 1 : g;
          if (finite && g > FINITE) return null;
          const isOut = finite && room > FINITE;
          const x = isOut ? x0 + FINITE * rw - rw / 2 : cx(room);
          const y = isOut ? top + rh + 34 : cy;
          if (!finite && room > SHOWN + 0.5) return null;
          return (
            <g key={`g${g}`}>
              <circle cx={x} cy={y} r={gr} className={isOut ? s.out : s.guest} />
              <text x={x} y={y + 4} className={s.gNo}>
                {g}
              </text>
            </g>
          );
        })}
        {moved &&
          Array.from({ length: finite ? FINITE - 1 : SHOWN - 1 }, (_, i) => (
            <path
              key={`a${i}`}
              d={`M${cx(i + 1)},${top - 4} Q${cx(i + 1) + rw / 2},${top - 18} ${cx(i + 2) - 3},${top - 6}`}
              className={s.arrow}
            />
          ))}
        {!finite && <rect x={x0 + (SHOWN - 1.6) * rw} y={top - 20} width={rw * 1.7} height={rh + 40} fill="url(#hotel-fade)" />}
        {!finite && (
          <text x={x0 + SHOWN * rw + 4} y={cy + 4} className={s.more}>
            …
          </text>
        )}
        {outside && (
          <text x={x0 + FINITE * rw - rw - 6} y={top + rh + 38} className={s.outLbl}>
            no room {FINITE + 1}
          </text>
        )}
        {!locked && (
          <g>
            <circle cx={admitted ? cx(1) : 18} cy={cy} r={gr} className={s.newGuest} />
            <text x={admitted ? cx(1) : 18} y={cy + 3} className={s.gNo} style={{ fontSize: finite ? 6.5 : 9 }}>
              new
            </text>
          </g>
        )}
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <Row>
        <Control disabled={locked || moved} className={moved ? "active" : ""} onClick={onMove}>
          Everyone moves up one room
        </Control>
        <Control disabled={locked || !moved || admitted} className={admitted ? "active" : ""} onClick={onAdmit}>
          New guest takes room 1
        </Control>
        <Control disabled={locked} className={finite ? "active" : ""} aria-pressed={finite} onClick={onFinite}>
          {finite ? "Back to endless rooms" : `Same move, ${FINITE} rooms`}
        </Control>
        <Readout label="Without a room" value={locked ? "?" : homeless} />
      </Row>
    </div>
  );
}

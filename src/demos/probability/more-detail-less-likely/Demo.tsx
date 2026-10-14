"use client";

// Conjunction fallacy. 1,000 dots are the town's people who fit Sam's description. Two sliders set the
// share who are librarians (outer ring) and the share of librarians who run a book club (inner ring).
// The club ring is drawn from the librarians, so it can never hold more dots than the outer ring.
// Key state: club share at its maximum (90%), inner still below outer; and the librarian share moved.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Readout, Row, Slider } from "@/kit/controls";
import { CLUB, COLS, LIB, PEOPLE, ROWS, clubbers, librarians, outline } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["club-max", "lib-moved"] as const;
const PITCH = 8;
const X0 = 10;
const Y0 = 6;
const fmt = (v: number) => v.toLocaleString("en-US");

type Seen = { lib: number; club: number; inner: number; outer: number } | null;

function Stage({ locked, reach, lib, setLib, club, setClub, seen, setSeen }: {
  locked: boolean;
  reach: (n: string) => void;
  lib: number;
  setLib: (v: number) => void;
  club: number;
  setClub: (v: number) => void;
  seen: Seen;
  setSeen: (v: Seen) => void;
}) {
  const outer = librarians(lib);
  const inner = clubbers(lib, club);
  const note = (l: number, c: number) => {
    if (c === CLUB.max) {
      setSeen({ lib: l, club: c, inner: clubbers(l, c), outer: librarians(l) });
      reach("club-max");
    }
  };

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : seen
            ? `Club share at ${seen.club}%: ${fmt(seen.inner)} in the inner ring, ${fmt(seen.outer)} in the outer.`
            : "1,000 people like Sam. Outer ring: librarians. Inner ring: librarians with a book club."}
      </p>
      <svg viewBox={`0 0 ${COLS * PITCH + 20} ${ROWS * PITCH + 12}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`${outer} librarians, ${inner} of them run a book club, of ${PEOPLE} people`}>
        {Array.from({ length: PEOPLE }, (_, i) => {
          const c = Math.floor(i / ROWS);
          const r = i % ROWS;
          const cls = locked ? s.dot : i < inner ? s.club : i < outer ? s.lib : s.dot;
          return <circle key={i} cx={X0 + c * PITCH + PITCH / 2} cy={Y0 + r * PITCH + PITCH / 2} r={2.6} className={cls} />;
        })}
        {!locked && (
          <>
            <path d={outline(outer)} transform={`translate(${X0} ${Y0}) scale(${PITCH})`} className={s.outer} />
            <path d={outline(inner)} transform={`translate(${X0} ${Y0}) scale(${PITCH})`} className={s.inner} />
          </>
        )}
      </svg>
      <Row>
        <Slider
          label="Run a club, of librarians"
          value={club}
          min={CLUB.min}
          max={CLUB.max}
          step={CLUB.step}
          disabled={locked}
          format={(v) => `${v}%`}
          onChange={(v) => {
            setClub(v);
            note(lib, v);
          }}
        />
      </Row>
      <Row>
        <Slider
          label="Librarians, of people like Sam"
          value={lib}
          min={LIB.min}
          max={LIB.max}
          step={LIB.step}
          disabled={locked}
          format={(v) => `${v}%`}
          onChange={(v) => {
            setLib(v);
            reach("lib-moved");
            note(v, club);
          }}
        />
      </Row>
      <Row>
        <Readout label="Outer ring: librarians" value={locked ? "-" : fmt(outer)} />
        <Readout label="Inner ring: with a club" value={locked ? "-" : fmt(inner)} />
      </Row>
    </div>
  );
}

export default function MoreDetailLessLikely({ slug }: { slug: string }) {
  const [lib, setLib] = useState(LIB.start);
  const [club, setClub] = useState(CLUB.start);
  const [seen, setSeen] = useState<Seen>(null);
  const outer = librarians(lib);
  const inner = clubbers(lib, club);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Sam is quiet and loves books. In this town some librarians run book clubs, some don't. Which is more likely?",
        options: ["Sam is a librarian", "Sam is a librarian who runs a book club", "Equally likely"],
        answer: 0,
      }}
      exploreHint="Push the book-club share to its top, then move the librarian share."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Every librarian who runs a book club is a librarian, so the inner ring sits inside the outer one. Now {club}% of
            librarians run a club: {fmt(inner)} dots in the inner ring, {fmt(outer)} in the outer.
            {seen && (seen.club !== club || seen.outer !== outer) && ` At ${seen.club}% it was ${fmt(seen.inner)} of ${fmt(seen.outer)}, still fewer.`}
          </p>
          <p>
            Sam&apos;s description makes the book club feel fitting, but each added detail can only remove people. A more
            specific story can feel more convincing, yet it is never more likely.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} lib={lib} setLib={setLib} club={club} setClub={setClub} seen={seen} setSeen={setSeen} />}
        </Milestones>
      )}
    </Lesson>
  );
}

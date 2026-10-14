"use client";

// Enemies allow three camps. Six people (A-F) on a hexagon; every pair is friends (same camp) or
// enemies (different camps). The weak balance rule bans only one triangle: two friendly links and one
// hostile link. All-enemy triangles are allowed. Controls in order: Next triangle (checks the 20
// triangles one at a time, highlighting each), Check all 20, then camp chips 2 / 3 / 6 (3 is the
// question's split: pairs AB, CD, EF). Whatever the number of camps, 0 triangles are banned; the
// all-enemy count is 0 for 2 camps, 8 for 3, 20 for 6. Key states: all 20 checked; another split seen.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const NAMES = ["A", "B", "C", "D", "E", "F"];
const SPLITS: Record<number, number[]> = {
  2: [0, 0, 0, 1, 1, 1],
  3: [0, 0, 1, 1, 2, 2],
  6: [0, 1, 2, 3, 4, 5],
};
const CAMP_CHOICES = [2, 3, 6] as const;
type Camps = (typeof CAMP_CHOICES)[number];
const MILESTONES = ["checked-all", "other-split"] as const;

const PAIRS: [number, number][] = [];
for (let a = 0; a < 6; a++) for (let b = a + 1; b < 6; b++) PAIRS.push([a, b]);
const TRIANGLES: [number, number, number][] = [];
for (let a = 0; a < 6; a++) for (let b = a + 1; b < 6; b++) for (let c = b + 1; c < 6; c++) TRIANGLES.push([a, b, c]);

const friendly = (camp: number[], a: number, b: number) => camp[a] === camp[b];
const friendlyLinks = (camp: number[], [a, b, c]: [number, number, number]) =>
  Number(friendly(camp, a, b)) + Number(friendly(camp, a, c)) + Number(friendly(camp, b, c));
type Kind = "banned" | "all-enemy" | "one-friend" | "all-friend";
const kindOf = (camp: number[], t: [number, number, number]): Kind =>
  ["all-enemy", "one-friend", "banned", "all-friend"][friendlyLinks(camp, t)] as Kind;

export function tally(camps: Camps, upTo = TRIANGLES.length) {
  const camp = SPLITS[camps];
  const out = { banned: 0, "all-enemy": 0, "one-friend": 0, "all-friend": 0 };
  TRIANGLES.slice(0, upTo).forEach((t) => out[kindOf(camp, t)]++);
  return out;
}

const POS: [number, number][] = NAMES.map((_, i) => {
  const ang = ((90 + 60 * i) * Math.PI) / 180;
  return [170 + 74 * Math.cos(ang), 96 - 74 * Math.sin(ang)];
});

const VERDICT: Record<Kind, string> = {
  banned: "two friendly, one hostile. Banned.",
  "all-enemy": "all enemies. Allowed.",
  "one-friend": "one friendly pair. Allowed.",
  "all-friend": "all friends. Allowed.",
};

const listOf = (cs: number[]) =>
  cs.length < 2 ? cs.join("") : `${cs.slice(0, -1).join(", ")} and ${cs[cs.length - 1]}`;

export default function EnemiesAllowThreeCamps({ slug }: { slug: string }) {
  const [camps, setCamps] = useState<Camps>(3);
  const [checked, setChecked] = useState(0);
  const [cur, setCur] = useState(-1);
  // Splits the learner has seen with all 20 triangles counted; the reveal quotes only these as seen.
  const [seen, setSeen] = useState<Camps[]>([]);
  const see = (c: Camps) => setSeen((v) => (v.includes(c) ? v : [...v, c].sort((a, b) => a - b)));
  const three = tally(3);
  const unseen = [...CAMP_CHOICES].filter((c) => !seen.includes(c));

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Six people in three pairs. Friends inside a pair, enemies across. Banned: two friends of one person who are enemies. How many banned triangles?",
        options: ["0", "8", "20"],
        answer: 0,
      }}
      exploreHint="Check the triangles, then try other numbers of camps."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Of the {TRIANGLES.length} triangles in three camps, {three.banned} are banned. {three["one-friend"]} have one
            friendly pair, and {three["all-enemy"]} are all enemies, one person from each camp. A banned triangle needs someone
            with two friends who are enemies, but friends share a camp, so any two friends of yours are friends too.
          </p>
          <p>
            The all-enemy triangle is what the strict rule (the enemy of my enemy is my friend) forbids, and it is what forces
            two sides. Allow it, and any number of camps is stable:{" "}
            {seen.length > 0
              ? `you saw ${listOf(seen)} camps each with 0 banned triangles${unseen.length > 0 ? `, and ${listOf(unseen)} camps give 0 too` : ""}.`
              : `${listOf([...CAMP_CHOICES])} camps each give 0 banned triangles.`}
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              camps={camps}
              checked={checked}
              cur={cur}
              onNext={() => {
                const next = (cur + 1) % TRIANGLES.length;
                const done = Math.max(checked, next + 1);
                setCur(next);
                setChecked(done);
                if (done === TRIANGLES.length) {
                  see(camps);
                  reach("checked-all");
                }
              }}
              onAll={() => {
                setChecked(TRIANGLES.length);
                setCur(-1);
                see(camps);
                reach("checked-all");
              }}
              onCamps={(c) => {
                setCamps(c);
                if (checked === TRIANGLES.length) see(c);
                if (c !== 3) reach("other-split");
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
  camps,
  checked,
  cur,
  onNext,
  onAll,
  onCamps,
}: {
  locked: boolean;
  camps: Camps;
  checked: number;
  cur: number;
  onNext: () => void;
  onAll: () => void;
  onCamps: (c: Camps) => void;
}) {
  const camp = SPLITS[camps];
  const t = cur >= 0 ? TRIANGLES[cur] : null;
  const counts = tally(camps, checked);
  const caption = locked
    ? "Make a prediction to start."
    : t
      ? `${t.map((v) => NAMES[v]).join(", ")}: ${VERDICT[kindOf(camp, t)]}`
      : checked === TRIANGLES.length
        ? `All ${TRIANGLES.length} triangles checked in ${camps} camps.`
        : "Green: friends. Red dashes: enemies.";

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 340 192" className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        {t && (
          <polygon
            points={t.map((v) => POS[v].join(",")).join(" ")}
            className={kindOf(camp, t) === "banned" ? s.triBad : s.tri}
          />
        )}
        {PAIRS.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={POS[a][0]}
            y1={POS[a][1]}
            x2={POS[b][0]}
            y2={POS[b][1]}
            className={friendly(camp, a, b) ? s.friend : s.enemy}
          />
        ))}
        {POS.map(([x, y], v) => (
          <g key={v}>
            <circle cx={x} cy={y} r={13} className={`${s.person} ${t?.includes(v) ? s.inTri : ""}`} />
            <text x={x} y={y + 4.5} className={s.name}>
              {NAMES[v]}
            </text>
          </g>
        ))}
      </svg>

      <p className={s.rule}>Banned: two friendly links, one hostile.</p>
      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <div className={s.controls}>
        <Control className={s.tap} disabled={locked} onClick={onNext} aria-label="Check the next triangle">
          Next triangle
        </Control>
        <Control className={s.tap} disabled={locked || checked === TRIANGLES.length} onClick={onAll}>
          Check all {TRIANGLES.length}
        </Control>
      </div>
      <div className={s.camps} role="group" aria-label="Number of camps">
        <span className={s.campsLabel}>Camps</span>
        {CAMP_CHOICES.map((c) => (
          <Control
            key={c}
            className={`${s.tap} ${camps === c ? "active" : ""}`}
            disabled={locked || camps === c}
            aria-label={`${c} camps`}
            onClick={() => onCamps(c)}
          >
            {c}
          </Control>
        ))}
      </div>
      <Row>
        <Readout label="Checked" value={locked ? "?" : `${checked}/${TRIANGLES.length}`} />
        <Readout label="Banned" value={locked ? "?" : counts.banned} />
        <Readout label="All enemies" value={locked ? "?" : counts["all-enemy"]} />
      </Row>
    </div>
  );
}

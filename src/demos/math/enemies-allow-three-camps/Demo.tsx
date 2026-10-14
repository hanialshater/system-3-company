"use client";

// Enemies allow three camps. Six people (A-F) on a hexagon; every pair is friends (same camp) or
// enemies (different camps). The weak balance rule bans only one triangle: two friendly links and one
// hostile link. All-enemy triangles are allowed.
// The question's split is uneven, 3 + 2 + 1 (A B C | D E | F), so A, B and C each have two friends and the
// rule has something to test: the first triangle checked is A, B, C, where "B and C are both A's friends,
// so same camp, so friends". Counts for 3 + 2 + 1: 0 banned, 13 one friendly pair, 6 all enemies, 1 all
// friends. 2 camps (3 + 3): 0 banned, 0 all enemies. 6 camps: 0 banned, 20 all enemies.
// Controls in DOM order: Next triangle, Check all 20, camp chips 6 / 3 / 2, then "B–D friends" (a friend
// link across camps, the one move that makes banned triangles: 3 in 3 + 2 + 1, 4 in 3 + 3, 0 in 6 camps).
// Key states: all 20 checked in the question's split; another split seen.
// v4 (learner r7): the Seen rows record, per split checked, banned and all-enemy counts, and the first B–D result
// (split, count, example), so the reveal's 6 all-enemy and "4 turned banned, such as A, B, D" stay on the stage.

import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const NAMES = ["A", "B", "C", "D", "E", "F"];
const SPLITS: Record<number, number[]> = {
  2: [0, 0, 0, 1, 1, 1],
  3: [0, 0, 0, 1, 1, 2],
  6: [0, 1, 2, 3, 4, 5],
};
const SPLIT_NAME: Record<number, string> = { 2: "3 + 3", 3: "3 + 2 + 1", 6: "six of one" };
const CAMP_CHOICES = [6, 3, 2] as const;
type Camps = (typeof CAMP_CHOICES)[number];
const MILESTONES = ["checked-all", "other-split"] as const;
const LINK: [number, number] = [1, 3]; // B and D

const PAIRS: [number, number][] = [];
for (let a = 0; a < 6; a++) for (let b = a + 1; b < 6; b++) PAIRS.push([a, b]);
type Tri = [number, number, number];
const TRIANGLES: Tri[] = [];
for (let a = 0; a < 6; a++) for (let b = a + 1; b < 6; b++) for (let c = b + 1; c < 6; c++) TRIANGLES.push([a, b, c]);

const isLink = (a: number, b: number) => (a === LINK[0] && b === LINK[1]) || (a === LINK[1] && b === LINK[0]);
const friendly = (camp: number[], link: boolean, a: number, b: number) => camp[a] === camp[b] || (link && isLink(a, b));
const friendlyLinks = (camp: number[], link: boolean, [a, b, c]: Tri) =>
  Number(friendly(camp, link, a, b)) + Number(friendly(camp, link, a, c)) + Number(friendly(camp, link, b, c));
type Kind = "banned" | "all-enemy" | "one-friend" | "all-friend";
const kindOf = (camp: number[], link: boolean, t: Tri): Kind =>
  ["all-enemy", "one-friend", "banned", "all-friend"][friendlyLinks(camp, link, t)] as Kind;

export function tally(camps: Camps, link = false, upTo = TRIANGLES.length) {
  const camp = SPLITS[camps];
  const out = { banned: 0, "all-enemy": 0, "one-friend": 0, "all-friend": 0 };
  TRIANGLES.slice(0, upTo).forEach((t) => out[kindOf(camp, link, t)]++);
  return out;
}

const POS: [number, number][] = NAMES.map((_, i) => {
  const ang = ((90 + 60 * i) * Math.PI) / 180;
  return [170 + 74 * Math.cos(ang), 96 - 74 * Math.sin(ang)];
});

/** The caption for one triangle: for a triangle with two or more friendly links, name the person in the middle. */
function verdict(camp: number[], link: boolean, t: Tri): string {
  const k = kindOf(camp, link, t);
  const names = t.map((v) => NAMES[v]).join(", ");
  if (k === "all-enemy") return `${names}: all enemies. Allowed.`;
  if (k === "one-friend") return `${names}: one friendly pair. Allowed.`;
  // the person with two friends in this triangle
  const mid = t.find((v) => t.filter((u) => u !== v).every((u) => friendly(camp, link, u, v))) as number;
  const [x, y] = t.filter((u) => u !== mid).map((u) => NAMES[u]);
  if (k === "all-friend") return `${x} and ${y} are both ${NAMES[mid]}'s friends, so same camp, so friends. Allowed.`;
  return `${x} and ${y} are both ${NAMES[mid]}'s friends but enemies. Banned.`;
}

const listOf = (cs: (number | string)[]) =>
  cs.length < 2 ? cs.join("") : `${cs.slice(0, -1).join(", ")} and ${cs[cs.length - 1]}`;

type BannedSeen = { camps: Camps; n: number; example: Tri };

export default function EnemiesAllowThreeCamps({ slug }: { slug: string }) {
  const [camps, setCamps] = useState<Camps>(3);
  const [link, setLink] = useState(false);
  const [checked, setChecked] = useState(0);
  const [cur, setCur] = useState(-1);
  // Splits the learner has seen with all 20 triangles counted (camps only, no cross link).
  const [seen, setSeen] = useState<Camps[]>([]);
  const [bannedSeen, setBannedSeen] = useState<BannedSeen | null>(null);
  const see = (c: Camps) => setSeen((v) => (v.includes(c) ? v : [...v, c]));
  const three = tally(3);

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Six people in three camps: A B C, D E, and F. Friends inside a camp, enemies across. Banned: two friends of one person who are enemies. Of the 20 triangles, how many are banned?",
        options: ["0", "6", "13"],
        answer: 0,
      }}
      exploreHint="Check the triangles, try other numbers of camps, then make B and D friends."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            {seen.includes(3)
              ? `In 3 + 2 + 1 camps, ${three.banned} of ${TRIANGLES.length} triangles are banned, ${three["all-enemy"]} all enemies. `
              : ""}
            Banned needs two friends of one person to be enemies, but friends share a camp: B and C share A&apos;s, so
            they are friends.
            {bannedSeen
              ? ` Making B and D friends made ${bannedSeen.n} banned, such as ${bannedSeen.example.map((v) => NAMES[v]).join(", ")}.`
              : ""}
          </p>
          <p>
            The balance rule also bans all-enemy triangles, which forces two sides. Allow them, and any number of camps
            is stable
            {seen.length > 0 ? `: you saw ${listOf([...seen].sort((a, b) => a - b))}${seen.length === 1 ? " camps, with" : ", each with"} 0 banned.` : "."}
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
              link={link}
              checked={checked}
              cur={cur}
              seen={seen}
              bannedSeen={bannedSeen}
              onNext={() => {
                const next = (cur + 1) % TRIANGLES.length;
                const done = Math.max(checked, next + 1);
                setCur(next);
                setChecked(done);
                if (done === TRIANGLES.length) {
                  if (!link) see(camps);
                  if (camps === 3) reach("checked-all");
                }
              }}
              onAll={() => {
                setChecked(TRIANGLES.length);
                setCur(-1);
                if (!link) see(camps);
                if (camps === 3) reach("checked-all");
              }}
              onCamps={(c) => {
                setCamps(c);
                if (checked === TRIANGLES.length && !link) see(c);
                if (checked === TRIANGLES.length && c === 3) reach("checked-all");
                if (c !== 3) reach("other-split");
                if (link) {
                  const n = tally(c, true).banned;
                  const ex = TRIANGLES.find((t) => kindOf(SPLITS[c], true, t) === "banned");
                  if (n > 0 && ex && !bannedSeen) setBannedSeen({ camps: c, n, example: ex });
                }
              }}
              onLink={() => {
                const on = !link;
                setLink(on);
                setCur(-1);
                if (on) {
                  const n = tally(camps, true).banned;
                  const ex = TRIANGLES.find((t) => kindOf(SPLITS[camps], true, t) === "banned");
                  if (n > 0 && ex && !bannedSeen) setBannedSeen({ camps, n, example: ex });
                }
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
  link,
  checked,
  cur,
  seen,
  bannedSeen,
  onNext,
  onAll,
  onCamps,
  onLink,
}: {
  locked: boolean;
  camps: Camps;
  link: boolean;
  checked: number;
  cur: number;
  seen: Camps[];
  bannedSeen: BannedSeen | null;
  onNext: () => void;
  onAll: () => void;
  onCamps: (c: Camps) => void;
  onLink: () => void;
}) {
  const camp = SPLITS[camps];
  const t = cur >= 0 ? TRIANGLES[cur] : null;
  const counts = tally(camps, link, checked);
  const bannedAll = link ? TRIANGLES.filter((x) => kindOf(camp, true, x) === "banned") : [];
  const caption = locked
    ? "Make a prediction to start."
    : t
      ? verdict(camp, link, t)
      : link
        ? bannedAll.length
          ? `B–D friends: ${bannedAll.length} banned (red), e.g. ${bannedAll[0].map((v) => NAMES[v]).join(", ")}.`
          : "B–D friends, but nobody has two friends."
        : checked === TRIANGLES.length
          ? `All ${TRIANGLES.length} triangles checked in camps of ${SPLIT_NAME[camps]}.`
          : "Green: friends. Red dashes: enemies.";

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 340 192" className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        {!t &&
          bannedAll.map((x) => (
            <polygon key={x.join("")} points={x.map((v) => POS[v].join(",")).join(" ")} className={s.triBad} />
          ))}
        {t && (
          <polygon
            points={t.map((v) => POS[v].join(",")).join(" ")}
            className={kindOf(camp, link, t) === "banned" ? s.triBad : s.tri}
          />
        )}
        {PAIRS.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={POS[a][0]}
            y1={POS[a][1]}
            x2={POS[b][0]}
            y2={POS[b][1]}
            className={friendly(camp, link, a, b) ? s.friend : s.enemy}
          />
        ))}
        {/* Counts folded into the picture (v6), left and right of the hexagon */}
        <g className={s.count}>
          <text x={6} y={34} className={s.countLab}>Checked</text>
          <text x={6} y={58} className={s.countVal} data-testid="checked">
            {locked ? "?" : `${checked}/${TRIANGLES.length}`}
          </text>
          <text x={334} y={34} textAnchor="end" className={s.countLab}>Banned</text>
          <text x={334} y={58} textAnchor="end" className={s.countVal} data-testid="banned">
            {locked ? "?" : counts.banned}
          </text>
          <text x={334} y={150} textAnchor="end" className={s.countLab}>All enemies</text>
          <text x={334} y={174} textAnchor="end" className={s.countVal} data-testid="all-enemies">
            {locked ? "?" : counts["all-enemy"]}
          </text>
        </g>
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
        <Control className={`${s.tap} ${link ? "active" : ""}`} aria-pressed={link} disabled={locked} onClick={onLink}>
          B–D friends
        </Control>
      </div>
      {seen.length > 0 && (
        <p className={s.seen} data-testid="seen">
          Seen, banned / all-enemy:{" "}
          {seen.map((c) => `${c} camps ${tally(c).banned} / ${tally(c)["all-enemy"]}`).join(" · ")}
        </p>
      )}
      {bannedSeen && !(link && camps === bannedSeen.camps) && (
        <p className={s.seen}>
          B–D friends, {bannedSeen.camps} camps: {bannedSeen.n} banned, e.g.{" "}
          {bannedSeen.example.map((v) => NAMES[v]).join(", ")}
        </p>
      )}
    </div>
  );
}

"use client";

// Drawing without replacement. A 52-card deck drawn as tiles (top two rows red, bottom two black).
// The setup forces the first 10 dealt cards to be red; dealt tiles go hollow. After ten reds, 16 red
// and 26 black remain, so the next card is red 16/42 = 38%. "Put cards back" restores the coin case.
// Key state: ten reds dealt, then cards put back. Deal buttons come first in DOM order.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { BLACK, DECK, FORCED, RED, left } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["ten-reds", "put-back"] as const;
const pct = (p: number) => `${Math.round(p * 100)}%`;
const AFTER = left(FORCED, false);
const BACK = left(FORCED, true);
const COLS = 13;
const W = 22;
const H = 32;
const GAP = 3;

function Stage({
  locked,
  interact,
  dealt,
  setDealt,
  putBack,
  setPutBack,
}: {
  locked: boolean;
  interact: () => void;
  dealt: number;
  setDealt: (d: number) => void;
  putBack: boolean;
  setPutBack: (b: boolean) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const now = left(dealt, putBack);
  const msg = locked
    ? "Make a prediction to start."
    : dealt < FORCED
      ? `We make the first ${FORCED} cards red. Filled tiles are still in the deck.`
      : putBack
        ? `Each card goes back and is shuffled in: ${RED} red of ${DECK} again.`
        : `${AFTER.red} red and ${AFTER.black} black left in the deck.`;

  return (
    <div className={s.wrap}>
      <p className={s.msg}>{msg}</p>
      <svg viewBox="0 0 340 150" className={`stage-svg ${s.svg}`} role="img" aria-label={`${now.red} red and ${now.black} black cards in the deck`}>
        {Array.from({ length: DECK }, (_, i) => {
          const red = i < RED;
          const gone = red && i < dealt && !putBack;
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          return (
            <rect
              key={i}
              x={8 + col * (W + GAP)}
              y={6 + row * (H + GAP) + (row >= 2 ? 4 : 0)}
              width={W}
              height={H}
              rx={4}
              className={`${red ? s.red : s.black} ${gone ? s.gone : ""}`}
            />
          );
        })}
      </svg>
      <Row>
        <Control disabled={locked || dealt >= FORCED} onClick={() => setDealt(dealt + 1)}>
          Deal 1 red
        </Control>
        <Control
          disabled={locked || dealt >= FORCED}
          onClick={() => {
            setDealt(FORCED);
            reach("ten-reds");
          }}
        >
          Deal to {FORCED} reds
        </Control>
        <Control
          className={putBack ? "active" : ""}
          disabled={locked || dealt < FORCED}
          onClick={() => {
            setPutBack(!putBack);
            if (!putBack) reach("put-back");
          }}
        >
          {putBack ? "Keep them out" : "Put cards back"}
        </Control>
      </Row>
      <Row>
        <Readout label="Reds dealt" value={dealt} />
        <Readout label="In the deck" value={`${now.red} red, ${now.black} black`} />
        <Readout label="Next card red" value={locked ? "?" : `${now.red} of ${now.total} = ${pct(now.pRed)}`} />
      </Row>
    </div>
  );
}

export default function CardsDoRemember({ slug }: { slug: string }) {
  const [dealt, setDealt] = useState(0);
  const [putBack, setPutBack] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A deck has ${RED} red and ${BLACK} black cards. The first ${FORCED} cards dealt are all red, and none go back. How likely is the next card red?`,
        options: ["50%", `about ${pct(AFTER.pRed)}`, `about ${pct(1 - AFTER.pRed)}`],
        answer: 1,
      }}
      exploreHint={`Deal ${FORCED} reds, then try putting the cards back.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            After {FORCED} reds you saw {AFTER.red} red and {AFTER.black} black left, so the next card is red {AFTER.red} times in{" "}
            {AFTER.total}: <strong>{pct(AFTER.pRed)}</strong>. The deck remembers because dealt cards are used up.
          </p>
          <p>
            When you put each card back, it was {BACK.red} of {BACK.total} again: {pct(BACK.pRed)}. That is the coin case: a coin has no
            pile to run out of, so its odds never shift. For cards, what changed is the mix of the remaining deck, not any &ldquo;due-ness&rdquo;: the next card follows what is left.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage locked={locked} interact={interact} dealt={dealt} setDealt={setDealt} putBack={putBack} setPutBack={setPutBack} />
      )}
    </Lesson>
  );
}

"use client";

import { useState, type ReactNode, type ComponentProps } from "react";
import { type StageContext } from "@/kit/Lesson";
import { Control, Slider } from "@/kit/controls";
import { StorySymbol, storySymbol, symbolPosition } from "./StorySymbol";
import type { Story, StoryMap } from "./types";
import styles from "./story.module.css";

export function StoryExplanation({ story }: { story: Story }) {
  return <><p>{story.reveal}</p><p className={styles.limit}>{story.limit}</p></>;
}

export function StoryStage({ story, map, ctx, checkpoint }: { story: Story; map: StoryMap; ctx: StageContext; checkpoint: (props: ComponentProps<typeof Control>) => ReactNode }) {
  const [selected, setSelected] = useState(0);
  const [visited, setVisited] = useState<number[]>([]);
  const [compare, setCompare] = useState(false);
  const [resetCount, setResetCount] = useState(0);
  // The reveal's explanation always has the final, cumulative evidence beside it.
  const index = ctx.phase === "reveal" ? story.frames.length - 1 : selected;
  const frame = story.frames[index];
  const symbol = storySymbol(story.slug, index);
  const symbolBox = symbol ? symbolPosition(map, story.nodes, frame.active, symbol) : null;
  const prior = story.frames[Math.max(0, index - 1)];
  const closed = story.closedFrames?.includes(index) ?? false;
  const past = new Set(story.frames.slice(0, index + 1).flatMap(f => f.active));
  const active = new Set(frame.active);
  const choose = (next: number) => {
    setSelected(next);
    // Repeated clicks, comparison and reset never substitute for unseen checkpoints.
    if (!visited.includes(next)) {
      setVisited(v => [...v, next]);
      ctx.interact();
    }
  };
  return <div className={styles.story} data-story={story.slug} data-story-phase={ctx.phase} data-checkpoint={index} data-reset={resetCount}>
    <div className={styles.caption} aria-live="polite">
      <strong>{ctx.locked ? "Where does the story turn?" : `${frame.date} · ${frame.heading}`}</strong>
      <span>{ctx.locked ? "Predict to open the map." : frame.text}</span>
    </div>
    <svg className={styles.map} viewBox="0 0 360 190" role="img" aria-label={ctx.locked ? "Modern coastlines; historical events hidden until prediction" : `${frame.date}. ${frame.text} ${story.limit}`}>
      <rect width="360" height="190" rx="10" fill="#142b36" />
      <path d={map.land} fill="#344c49" stroke="#7f9c8b" strokeWidth=".55" />
      <path d={map.grid} fill="none" stroke="#bfd6dc" strokeWidth=".5" opacity=".13" />
      {map.river && <path d={map.river} fill="none" stroke="#72aec5" strokeWidth="9" />}
      <text x="12" y="18" fill="#d5e1df" fontSize="10">N ↑</text>
      {!ctx.locked && <g>
        {map.edges.filter(e => e.frame <= index).map((e, i) => <path key={i} d={e.path} fill="none"
          stroke={closed ? "#e6a58c" : e.kind === "objective" ? "#b7c5d1" : "#ffd18b"}
          strokeWidth={e.frame === index ? 3 : 2} strokeDasharray={closed || e.kind === "objective" ? "4 5" : undefined}
          opacity={e.kind === "objective" ? .45 : .8} />)}
        {compare && map.edges.filter(e => e.frame <= Math.max(0, index - 1)).map((e, i) => <path key={`before-${i}`} d={e.path}
          fill="none" stroke="#f7fcff" strokeWidth="1.5" strokeDasharray="2 4" />)}
        {map.nodes.map(n => {
          const node = story.nodes.find(x => x.id === n.id)!;
          if (!past.has(n.id)) return null;
          const on = active.has(n.id);
          return <g key={n.id}>
            {compare && prior.active.includes(n.id) && <circle cx={n.x} cy={n.y} r="11" fill="none" stroke="#f7fcff" strokeDasharray="2 3" />}
            <circle cx={n.x} cy={n.y} r={on ? 6 : 3} fill={on ? "#ffd18b" : "#9dbdb4"} stroke="#142b36" strokeWidth="2" />
            {on && <text x={n.labelX} y={n.labelY} textAnchor={n.anchor as "start" | "end" | "middle"}
              fill="#fff1d6" stroke="#142b36" strokeWidth="3.5" paintOrder="stroke" fontSize="13" fontWeight="650">{node.name}</text>}
          </g>;
        })}
        {symbol && symbolBox && <StorySymbol key={`${symbol}-${index}`} kind={symbol} x={symbolBox.x} y={symbolBox.y} />}
        {closed && <g><rect x="132" y="78" width="96" height="30" rx="6" fill="#142b36" /><text x="180" y="98" textAnchor="middle" fontSize="14" fill="#ffc5ab">Closed</text></g>}
        {story.heights && <g><rect x="235" y="144" width="112" height="30" rx="6" fill="#142b36" /><text x="291" y="164" textAnchor="middle" fontSize="13" fill="#ffd18b">{story.heights[index]} m elevation</text></g>}
      </g>}
    </svg>
    <div className={styles.legend}>Schematic · modern coastlines{symbol && !ctx.locked ? " · illustrations" : ""}{compare ? " · white: earlier" : ""}</div>
    <div className={styles.timeline} role="group" aria-label="Story checkpoints">
      {story.frames.map((f, i) => <span key={i} className={styles.checkpointWrap}>{checkpoint({
        disabled: ctx.locked || ctx.phase === "reveal",
        "aria-label": `Checkpoint ${i + 1}: ${f.date}, ${f.heading}`,
        "aria-pressed": index === i,
        className: `${styles.checkpoint} ${index === i ? styles.current : ""}`,
        onClick: () => choose(i),
        children: <><span className={styles.tick} data-visited={visited.includes(i)}>{visited.includes(i) ? "✓" : i + 1}</span><span>{f.date}</span></>,
      })}</span>)}
    </div>
    <div className={styles.tools}>
      <Slider label="Timeline" min={0} max={story.frames.length - 1} value={index} disabled={ctx.locked || ctx.phase === "reveal"}
        onChange={choose} format={v => `${v + 1}/4`} />
      <Control disabled={ctx.locked} aria-pressed={compare} onClick={() => setCompare(v => !v)}>Compare</Control>
      <Control disabled={ctx.locked || ctx.phase === "reveal" || (selected === 0 && !compare)} onClick={() => { setSelected(0); setCompare(false); setResetCount(v => v + 1); }}>Reset</Control>
    </div>
    <span className={styles.progress} aria-live="polite">{ctx.locked ? "Four checkpoints" : `${visited.length}/4 visited`}</span>
  </div>;
}

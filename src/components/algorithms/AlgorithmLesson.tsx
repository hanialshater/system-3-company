'use client';

import { useId, useRef, useState, type ReactNode } from 'react';
import type { AlgorithmFrame, AlgorithmRun, AlgorithmSpec } from '@/lib/algorithms/types';
import { advanceAlgorithm, algorithmAvailability, initialAlgorithmState, type AlgorithmAction } from './AlgorithmState';
import styles from './AlgorithmLesson.module.css';

export const algorithmControlClass = styles.controls;

export function useAlgorithmState(spec: AlgorithmSpec) {
  const [snapshot, setSnapshot] = useState(() => initialAlgorithmState(spec));
  // Read the latest transition synchronously, including successive event calls.
  const current = useRef(snapshot);
  const apply = (action: AlgorithmAction, interact?: () => void) => {
    const before = current.current;
    const next = advanceAlgorithm(spec, before, action);
    if (next === before) return;
    current.current = next;
    setSnapshot(next);
    // The sole milestone is a complete question case, by Run or individual Steps.
    if (before.witness === null && next.witness !== null) interact?.();
  };
  return {
    ...snapshot,
    trace: snapshot.run,
    frame: snapshot.run.frames[snapshot.frameIndex],
    ...algorithmAvailability(snapshot),
    run: (interact: () => void) => apply('run', interact),
    step: (interact: () => void) => apply('step', interact),
    tryAnother: () => apply('another'),
    reset: () => apply('reset'),
  };
}
export type AlgorithmLessonState = ReturnType<typeof useAlgorithmState>;

export function AlgorithmFrameView({ frame }: { frame: AlgorithmFrame }) {
  const arrowId = `algorithm-arrow-${useId().replace(/:/g, '')}`;
  const nodeMap = new Map((frame.nodes ?? []).map((node) => [node.id, node]));
  return <>
    {frame.nodes?.length ? <svg className={styles.graph} viewBox="0 0 300 180" role="img" aria-label={frame.caption}>
      <defs><marker id={arrowId} markerWidth="7" markerHeight="7" refX="20" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7" fill="context-stroke" /></marker></defs>
      {frame.edges?.map((edge, index) => {
        const a = nodeMap.get(edge.from), b = nodeMap.get(edge.to);
        if (!a || !b) return null;
        return <g key={`${edge.from}-${edge.to}-${index}`} data-tone={edge.tone ?? 'plain'} className={styles.edge}>
          <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} markerEnd={edge.directed ? `url(#${arrowId})` : undefined} />
          {edge.label && <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 5}>{edge.label}</text>}
        </g>;
      })}
      {frame.nodes.map((node) => <g key={node.id} className={styles.node} data-tone={node.tone ?? 'plain'}>
        <circle cx={node.x} cy={node.y} r="13" />
        <text x={node.x} y={node.y + 4}>{node.label}</text>
      </g>)}
    </svg> : <div className={styles.rows}>
      {frame.rows?.map((row, index) => <div key={index} className={styles.row}>
        {row.label && <span className={styles.rowLabel}>{row.label}</span>}
        <div className={styles.cells}>{row.cells.map((cell, cellIndex) => <span key={cellIndex} className={styles.cell} data-tone={cell.tone ?? 'plain'}>{cell.text}</span>)}</div>
      </div>)}
    </div>}
    {frame.metrics?.length ? <dl className={styles.metrics}>{frame.metrics.map((metric, i) => <div key={i}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl> : null}
  </>;
}

export function AlgorithmStage({ state, children }: { state: AlgorithmLessonState; children?: ReactNode }) {
  return <div className={styles.stage} data-algorithm-case={state.caseIndex} data-algorithm-frame={state.frameIndex}>
    <div className={styles.caption} role="status" aria-live="polite">{state.frame.caption}{(state.frameIndex > 0 || state.witness) && <span className={styles.counter} aria-label="Trace position">{state.frameIndex + 1}/{state.trace.frames.length}</span>}</div>
    <AlgorithmFrameView frame={state.frame} />
    {state.witness && <div className={styles.proof} data-algorithm-proof=""><strong>Seen</strong> {state.witness.proof}</div>}
    {children}
  </div>;
}

export function AlgorithmReveal({ spec, witness }: { spec: AlgorithmSpec; witness: AlgorithmRun | null }) {
  if (!witness) return null;
  return <>{spec.reveal(witness).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</>;
}

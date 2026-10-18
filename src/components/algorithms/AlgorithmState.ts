import type { AlgorithmRun, AlgorithmSpec } from '../../lib/algorithms/types';

export type AlgorithmSnapshot = {
  run: AlgorithmRun;
  caseIndex: number;
  frameIndex: number;
  witness: AlgorithmRun | null;
};
export type AlgorithmAction = 'run' | 'step' | 'another' | 'reset';

export function initialAlgorithmState(spec: AlgorithmSpec): AlgorithmSnapshot {
  return { run: spec.cases[0].run(), caseIndex: 0, frameIndex: 0, witness: null };
}

export function algorithmAvailability(state: AlgorithmSnapshot) {
  const last = state.run.frames.length - 1;
  return {
    canRun: state.caseIndex !== 0 || state.frameIndex !== last || state.witness === null,
    canStep: state.frameIndex < last,
    canTryAnother: state.witness !== null && (state.caseIndex !== 1 || state.frameIndex !== last),
    canReset: state.caseIndex !== 0 || state.frameIndex !== 0,
  };
}

/** Transition-only model: controls never mutate the retained question-case proof. */
export function advanceAlgorithm(spec: AlgorithmSpec, state: AlgorithmSnapshot, action: AlgorithmAction): AlgorithmSnapshot {
  const allowed = algorithmAvailability(state);
  if (action === 'run') {
    if (!allowed.canRun) return state;
    const run = spec.cases[0].run();
    return { run, caseIndex: 0, frameIndex: run.frames.length - 1, witness: state.witness ?? run };
  }
  if (action === 'step') {
    if (!allowed.canStep) return state;
    const frameIndex = state.frameIndex + 1;
    const witness = state.witness ?? (state.caseIndex === 0 && frameIndex === state.run.frames.length - 1 ? state.run : null);
    return { ...state, frameIndex, witness };
  }
  if (action === 'another') {
    if (!allowed.canTryAnother) return state;
    const run = spec.cases[1].run();
    return { ...state, run, caseIndex: 1, frameIndex: run.frames.length - 1 };
  }
  if (!allowed.canReset) return state;
  return { ...state, run: spec.cases[0].run(), caseIndex: 0, frameIndex: 0 };
}

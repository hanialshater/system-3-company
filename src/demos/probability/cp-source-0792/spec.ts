import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0792", "title": "Take one density-driven position step", "op": "leapfrog", "labels": ["Position", "Momentum", "Step"], "outputs": ["NewPosition", "EnergyError"], "a": [2.0, 0.0, 0.1], "b": [2.0, 0.0, 0.5], "question": "One toy leapfrog step uses harmonic potential q²/2, Position 2, Momentum 0, Step 0.1. What new position results?", "questionTemplate": "One toy leapfrog step uses harmonic potential q²/2, Position {Position}, Momentum {Momentum}, Step {Step}. What new position results?", "explain": "A half momentum step, full position step and final half momentum step approximate Hamiltonian motion. The energy error still needs a correction in HMC.", "lens": "the deterministic drift ingredient before Langevin noise", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0587", "title": "A momentum step follows a potential", "op": "leapfrog", "labels": ["Position", "Momentum", "Step"], "outputs": ["NewPosition", "EnergyError"], "a": [1.0, 1.0, 0.1], "b": [1.0, 1.0, 1.0], "question": "One toy leapfrog step uses harmonic potential q²/2, Position 1, Momentum 1, Step 0.1. What new position results?", "questionTemplate": "One toy leapfrog step uses harmonic potential q²/2, Position {Position}, Momentum {Momentum}, Step {Step}. What new position results?", "explain": "A half momentum step, full position step and final half momentum step approximate Hamiltonian motion. The energy error still needs a correction in HMC.", "lens": "the position and energy error of one harmonic leapfrog step", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0765", "title": "A damped message iterates", "op": "adjust", "labels": ["Start", "Target", "Steps", "Fraction"], "outputs": ["Estimate"], "a": [0.0, 1.0, 5.0, 0.2], "b": [0.0, 1.0, 5.0, 0.8], "question": "Starting at 0, move fraction 0.2 of the remaining distance toward 1 for 5 steps. Where does the estimate finish?", "questionTemplate": "Starting at {Start}, move fraction {Fraction} of the remaining distance toward {Target} for {Steps} steps. Where does the estimate finish?", "explain": "Each adjustment leaves a fraction of the original distance. Stopping after a small number of steps preserves dependence on the start.", "lens": "a fixed-point damping recurrence rather than exact loopy inference", "kind": "timeline", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

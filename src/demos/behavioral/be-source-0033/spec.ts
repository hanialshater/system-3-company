import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0033", "title": "When does adjustment stop?", "op": "adjust", "labels": ["Start", "Target", "Steps", "Fraction"], "outputs": ["Estimate"], "a": [10.0, 100.0, 2.0, 0.5], "b": [10.0, 100.0, 5.0, 0.5], "question": "Starting at 10, move fraction 0.5 of the remaining distance toward 100 for 2 steps. Where does the estimate finish?", "explain": "Each adjustment leaves a fraction of the original distance. Stopping after a small number of steps preserves dependence on the start.", "lens": "the remaining distance after repeated adjustment", "kind": "timeline", "answerPosition": 0, "questionTemplate": "Starting at {Start}, move fraction {Fraction} of the remaining distance toward {Target} for {Steps} steps. Where does the estimate finish?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

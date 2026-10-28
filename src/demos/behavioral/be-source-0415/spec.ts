import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0415", "title": "The market adjusts slowly", "op": "adjust", "labels": ["Start", "Target", "Steps", "Fraction"], "outputs": ["Estimate"], "a": [100.0, 80.0, 1.0, 0.1], "b": [100.0, 80.0, 5.0, 0.1], "question": "Starting at 100, move fraction 0.1 of the remaining distance toward 80 for 1 steps. Where does the estimate finish?", "questionTemplate": "Starting at {Start}, move fraction {Fraction} of the remaining distance toward {Target} for {Steps} steps. Where does the estimate finish?", "explain": "Each adjustment leaves a fraction of the original distance. Stopping after a small number of steps preserves dependence on the start.", "lens": "the adjustment speed in a stated price path", "kind": "timeline", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

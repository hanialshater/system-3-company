import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0404", "title": "News enters the price gradually", "op": "adjust", "labels": ["Start", "Target", "Steps", "Fraction"], "outputs": ["Estimate"], "a": [80.0, 100.0, 1.0, 0.2], "b": [80.0, 100.0, 5.0, 0.2], "question": "Starting at 80, move fraction 0.2 of the remaining distance toward 100 for 1 steps. Where does the estimate finish?", "questionTemplate": "Starting at {Start}, move fraction {Fraction} of the remaining distance toward {Target} for {Steps} steps. Where does the estimate finish?", "explain": "Each adjustment leaves a fraction of the original distance. Stopping after a small number of steps preserves dependence on the start.", "lens": "the remaining adjustment after a news signal", "kind": "timeline", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

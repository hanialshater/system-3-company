import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0420", "title": "A bubble and an assumed correction", "op": "adjust", "labels": ["Start", "Target", "Steps", "Fraction"], "outputs": ["Estimate"], "a": [200.0, 100.0, 1.0, 0.3], "b": [200.0, 100.0, 5.0, 0.3], "question": "Starting at 200, move fraction 0.3 of the remaining distance toward 100 for 1 steps. Where does the estimate finish?", "questionTemplate": "Starting at {Start}, move fraction {Fraction} of the remaining distance toward {Target} for {Steps} steps. Where does the estimate finish?", "explain": "Each adjustment leaves a fraction of the original distance. Stopping after a small number of steps preserves dependence on the start.", "lens": "the stated adjustment path toward a valuation benchmark", "kind": "timeline", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0399", "title": "A stipulated college-distance instrument", "op": "wald", "labels": ["Reduced", "FirstStage"], "outputs": ["Ratio"], "a": [1.0, 0.1], "b": [1.0, 0.2], "question": "A toy instrument changes mean outcome by 1 and treatment uptake by 0.1. What is the Wald ratio?", "questionTemplate": "A toy instrument changes mean outcome by {Reduced} and treatment uptake by {FirstStage}. What is the Wald ratio?", "explain": "A small first stage amplifies the ratio. Exclusion, instrument validity and the target-effect assumptions cannot be inferred from this division.", "lens": "the first stage and untested exclusion assumptions", "kind": "graph", "answerPosition": 0, "graph": "instrument"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

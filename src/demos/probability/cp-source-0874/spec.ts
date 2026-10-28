import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0874", "title": "A genetic instrument needs assumptions", "op": "wald", "labels": ["Reduced", "FirstStage"], "outputs": ["Ratio"], "a": [0.02, 0.1], "b": [0.02, 0.02], "question": "A toy instrument changes mean outcome by 0.02 and treatment uptake by 0.1. What is the Wald ratio?", "questionTemplate": "A toy instrument changes mean outcome by {Reduced} and treatment uptake by {FirstStage}. What is the Wald ratio?", "explain": "A small first stage amplifies the ratio. Exclusion, instrument validity and the target-effect assumptions cannot be inferred from this division.", "lens": "the first-stage denominator under stipulated IV validity", "kind": "graph", "answerPosition": 1, "graph": "instrument"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

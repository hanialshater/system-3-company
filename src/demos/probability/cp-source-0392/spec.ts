import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0392", "title": "A weak first stage amplifies the ratio", "op": "wald", "labels": ["Reduced", "FirstStage"], "outputs": ["Ratio"], "a": [1.0, 0.5], "b": [1.0, 0.01], "question": "A toy instrument changes mean outcome by 1 and treatment uptake by 0.5. What is the Wald ratio?", "questionTemplate": "A toy instrument changes mean outcome by {Reduced} and treatment uptake by {FirstStage}. What is the Wald ratio?", "explain": "A small first stage amplifies the ratio. Exclusion, instrument validity and the target-effect assumptions cannot be inferred from this division.", "lens": "the sensitivity of the Wald ratio to weak uptake", "kind": "graph", "answerPosition": 2, "graph": "instrument"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

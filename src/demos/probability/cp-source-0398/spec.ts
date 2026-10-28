import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0398", "title": "A slope change divided by a first stage", "op": "wald", "labels": ["Reduced", "FirstStage"], "outputs": ["Ratio"], "a": [2.0, 0.5], "b": [2.0, 0.2], "question": "A toy instrument changes mean outcome by 2 and treatment uptake by 0.5. What is the Wald ratio?", "questionTemplate": "A toy instrument changes mean outcome by {Reduced} and treatment uptake by {FirstStage}. What is the Wald ratio?", "explain": "A small first stage amplifies the ratio. Exclusion, instrument validity and the target-effect assumptions cannot be inferred from this division.", "lens": "the ratio of stipulated local slope changes", "kind": "graph", "answerPosition": 2, "graph": "instrument"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0397", "title": "A lottery offer is not full take-up", "op": "wald", "labels": ["Reduced", "FirstStage"], "outputs": ["Ratio"], "a": [1.0, 0.25], "b": [1.0, 0.5], "question": "A toy instrument changes mean outcome by 1 and treatment uptake by 0.25. What is the Wald ratio?", "questionTemplate": "A toy instrument changes mean outcome by {Reduced} and treatment uptake by {FirstStage}. What is the Wald ratio?", "explain": "A small first stage amplifies the ratio. Exclusion, instrument validity and the target-effect assumptions cannot be inferred from this division.", "lens": "the intention-to-treat change divided by the uptake change", "kind": "graph", "answerPosition": 1, "graph": "instrument"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

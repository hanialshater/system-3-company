import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0335", "title": "One employer dominates savings", "op": "risk", "labels": ["Cases", "ActionRisk", "InactionRisk"], "outputs": ["Difference"], "a": [100.0, 0.0, 0.6], "b": [100.0, 0.0, 0.1], "question": "Across 100 toy cases, action risk is 0 and inaction risk 0.6. How many fewer expected harms come with action?", "questionTemplate": "Across {Cases} toy cases, action risk is {ActionRisk} and inaction risk {InactionRisk}. How many fewer expected harms come with action?", "explain": "Count both action and inaction using the same population. These are specified risks in a toy comparison.", "lens": "the loss exposure from a specified concentrated holding", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

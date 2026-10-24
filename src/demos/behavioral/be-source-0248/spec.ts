import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0248", "title": "Switching routes after a scare", "op": "risk", "labels": ["Cases", "ActionRisk", "InactionRisk"], "outputs": ["Difference"], "a": [1000000.0, 1e-05, 0.0001], "b": [1000000.0, 1e-05, 1e-05], "question": "Across 1e+06 toy cases, action risk is 1e-05 and inaction risk 0.0001. How many fewer expected harms come with action?", "explain": "Count both action and inaction using the same population. These are specified risks in a toy comparison.", "lens": "the expected risk of both available routes", "kind": "bars", "answerPosition": 2, "questionTemplate": "Across {Cases} toy cases, action risk is {ActionRisk} and inaction risk {InactionRisk}. How many fewer expected harms come with action?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

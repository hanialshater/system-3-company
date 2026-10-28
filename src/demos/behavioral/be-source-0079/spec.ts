import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0079", "title": "A plan that stays put", "op": "cost", "labels": ["Annual", "Years", "SwitchCost"], "outputs": ["Saving"], "a": [2000.0, 3.0, 100.0], "b": [2000.0, 1.0, 100.0], "question": "A toy switch saves 2000 per year for 3 years and costs 100 now. Ignoring discounting, what is its net saving?", "explain": "Include the switching cost and horizon. Inertia may have a financial cost, but this model alone cannot explain real choices.", "lens": "the financial horizon of switching", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy switch saves {Annual} per year for {Years} years and costs {SwitchCost} now. Ignoring discounting, what is its net saving?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

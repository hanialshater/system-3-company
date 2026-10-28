import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0323", "title": "Saving per public-cost unit", "op": "cost", "labels": ["Annual", "Years", "SwitchCost"], "outputs": ["Saving"], "a": [100.0, 1.0, 10.0], "b": [100.0, 1.0, 90.0], "question": "A toy switch saves 100 per year for 1 years and costs 10 now. Ignoring discounting, what is its net saving?", "questionTemplate": "A toy switch saves {Annual} per year for {Years} years and costs {SwitchCost} now. Ignoring discounting, what is its net saving?", "explain": "Include the switching cost and horizon. Inertia may have a financial cost, but this model alone cannot explain real choices.", "lens": "net saving after a stated program cost", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

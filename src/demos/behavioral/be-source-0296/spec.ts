import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0296", "title": "The flat plan versus usage", "op": "flatrate", "labels": ["Fixed", "PerUse", "Uses"], "outputs": ["Extra"], "a": [50.0, 2.0, 10.0], "b": [50.0, 2.0, 30.0], "question": "A toy flat plan costs 50; usage pricing costs 2 for each of 10 uses. How much more does the flat plan cost?", "questionTemplate": "A toy flat plan costs {Fixed}; usage pricing costs {PerUse} for each of {Uses} uses. How much more does the flat plan cost?", "explain": "Compare plans at the same usage level. Uncertainty about future use would be a separate input.", "lens": "the usage threshold in a plan comparison", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

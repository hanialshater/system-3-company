import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0148", "title": "An option in the middle", "op": "dominance", "labels": ["CostA", "BenefitA", "CostB", "BenefitB"], "outputs": ["NetGap"], "a": [10.0, 15.0, 20.0, 22.0], "b": [10.0, 15.0, 30.0, 31.0], "question": "Toy option A costs 10 and provides value 15; B costs 20 and provides 22. What is A net value minus B net value?", "explain": "A dominated option and a genuine tradeoff differ. The stated value scale is necessary for this particular net comparison.", "lens": "a stated net comparison after the menu changes", "kind": "scatter", "answerPosition": 1, "questionTemplate": "Toy option A costs {CostA} and provides value {BenefitA}; B costs {CostB} and provides {BenefitB}. What is A net value minus B net value?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0153", "title": "A plan that costs more", "op": "dominance", "labels": ["CostA", "BenefitA", "CostB", "BenefitB"], "outputs": ["NetGap"], "a": [100.0, 150.0, 120.0, 150.0], "b": [100.0, 150.0, 100.0, 150.0], "question": "Toy option A costs 100 and provides value 150; B costs 120 and provides 150. What is A net value minus B net value?", "explain": "A dominated option and a genuine tradeoff differ. The stated value scale is necessary for this particular net comparison.", "lens": "equal stated benefits with unequal costs", "kind": "scatter", "answerPosition": 0, "questionTemplate": "Toy option A costs {CostA} and provides value {BenefitA}; B costs {CostB} and provides {BenefitB}. What is A net value minus B net value?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

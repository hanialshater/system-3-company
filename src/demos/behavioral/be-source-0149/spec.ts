import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0149", "title": "Add an inferior option", "op": "dominance", "labels": ["CostA", "BenefitA", "CostB", "BenefitB"], "outputs": ["NetGap"], "a": [10.0, 20.0, 12.0, 18.0], "b": [10.0, 20.0, 8.0, 18.0], "question": "Toy option A costs 10 and provides value 20; B costs 12 and provides 18. What is A net value minus B net value?", "explain": "A dominated option and a genuine tradeoff differ. The stated value scale is necessary for this particular net comparison.", "lens": "strictly worse attributes versus a genuine tradeoff", "kind": "scatter", "answerPosition": 2, "questionTemplate": "Toy option A costs {CostA} and provides value {BenefitA}; B costs {CostB} and provides {BenefitB}. What is A net value minus B net value?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

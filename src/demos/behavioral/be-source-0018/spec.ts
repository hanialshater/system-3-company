import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0018", "title": "A lower deductible", "op": "premium", "labels": ["Probability", "Reduction", "Cost"], "outputs": ["Net"], "a": [0.05, 500.0, 100.0], "b": [0.25, 500.0, 100.0], "question": "A toy policy reduces a loss by 500 with probability 0.05 and costs 100. What is its expected cash gain minus cost?", "explain": "Expected cash value weights the avoided loss by its probability. Utility, liquidity and risk tolerance are separate assumptions.", "lens": "the claim probability needed to offset a premium", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy policy reduces a loss by {Reduction} with probability {Probability} and costs {Cost}. What is its expected cash gain minus cost?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

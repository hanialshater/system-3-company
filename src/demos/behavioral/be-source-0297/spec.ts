import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0297", "title": "The warranty break-even point", "op": "premium", "labels": ["Probability", "Reduction", "Cost"], "outputs": ["Net"], "a": [0.02, 500.0, 40.0], "b": [0.1, 500.0, 40.0], "question": "A toy policy reduces a loss by 500 with probability 0.02 and costs 40. What is its expected cash gain minus cost?", "questionTemplate": "A toy policy reduces a loss by {Reduction} with probability {Probability} and costs {Cost}. What is its expected cash gain minus cost?", "explain": "Expected cash value weights the avoided loss by its probability. Utility, liquidity and risk tolerance are separate assumptions.", "lens": "the failure probability needed to cover the premium", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0267", "title": "Coverage for any cause", "op": "premium", "labels": ["Probability", "Reduction", "Cost"], "outputs": ["Net"], "a": [0.01, 1000.0, 14.0], "b": [0.03, 1000.0, 12.0], "question": "A toy policy reduces a loss by 1000 with probability 0.01 and costs 14. What is its expected cash gain minus cost?", "questionTemplate": "A toy policy reduces a loss by {Reduction} with probability {Probability} and costs {Cost}. What is its expected cash gain minus cost?", "explain": "Expected cash value weights the avoided loss by its probability. Utility, liquidity and risk tolerance are separate assumptions.", "lens": "the covered event and the premium together", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

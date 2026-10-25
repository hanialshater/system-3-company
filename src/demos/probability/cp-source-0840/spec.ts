import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0840", "title": "A test's expected benefit meets cost", "op": "premium", "labels": ["Probability", "Reduction", "Cost"], "outputs": ["Net"], "a": [0.5, 100.0, 20.0], "b": [0.5, 100.0, 60.0], "question": "A toy policy reduces a loss by 100 with probability 0.5 and costs 20. What is its expected cash gain minus cost?", "questionTemplate": "A toy policy reduces a loss by {Reduction} with probability {Probability} and costs {Cost}. What is its expected cash gain minus cost?", "explain": "Expected cash value weights the avoided loss by its probability. Utility, liquidity and risk tolerance are separate assumptions.", "lens": "a supplied value-of-information benefit and testing cost", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

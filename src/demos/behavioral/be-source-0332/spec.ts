import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0332", "title": "A prize-linked savings budget", "op": "premium", "labels": ["Probability", "Reduction", "Cost"], "outputs": ["Net"], "a": [0.001, 1000.0, 1.0], "b": [0.002, 1000.0, 1.0], "question": "A toy policy reduces a loss by 1000 with probability 0.001 and costs 1. What is its expected cash gain minus cost?", "questionTemplate": "A toy policy reduces a loss by {Reduction} with probability {Probability} and costs {Cost}. What is its expected cash gain minus cost?", "explain": "Expected cash value weights the avoided loss by its probability. Utility, liquidity and risk tolerance are separate assumptions.", "lens": "the expected prize cost per explicit account", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

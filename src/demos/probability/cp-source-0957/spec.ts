import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0957", "title": "Products of transforms approach a bell", "op": "coinchar", "labels": ["N", "Frequency"], "outputs": ["Characteristic"], "a": [2.0, 1.0], "b": [100.0, 1.0], "question": "Sum N 2 independent symmetric ±1 variables and divide by sqrt(N). At Frequency 1, what real characteristic function results?", "questionTemplate": "Sum N {N} independent symmetric ±1 variables and divide by sqrt(N). At Frequency {Frequency}, what real characteristic function results?", "explain": "Independence multiplies characteristic functions. The standardized coin-sum expression approaches exp(-t²/2) at each fixed t.", "lens": "the standardized independent coin-sum characteristic function", "kind": "curve", "answerPosition": 0, "plot": [1, -3, 3]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0067", "title": "The age of a memoryless bulb", "op": "memoryless", "labels": ["Rate", "Age", "Extra"], "outputs": ["Survival"], "a": [0.001, 1000.0, 1000.0], "b": [0.001, 5000.0, 1000.0], "question": "A toy exponential lifetime has rate 0.001. Given survival to Age 1000, what is the probability of surviving Extra 1000 more time units?", "questionTemplate": "A toy exponential lifetime has rate {Rate}. Given survival to Age {Age}, what is the probability of surviving Extra {Extra} more time units?", "explain": "Under a constant hazard, elapsed age cancels from conditional survival. This property is specific to the stated exponential model.", "lens": "elapsed age in exponential conditional survival", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

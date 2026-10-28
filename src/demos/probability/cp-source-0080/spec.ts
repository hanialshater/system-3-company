import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0080", "title": "A process gives the count shape", "op": "poisson", "labels": ["Rate", "Count"], "outputs": ["Probability"], "a": [2.0, 2.0], "b": [5.0, 2.0], "question": "A toy Poisson count has mean 2. What is the probability of exactly 2 events?", "questionTemplate": "A toy Poisson count has mean {Rate}. What is the probability of exactly {Count} events?", "explain": "The mean fixes this Poisson distribution. Agreement at one count does not establish that real events satisfy the model.", "lens": "the mean of a specified count-generating process", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

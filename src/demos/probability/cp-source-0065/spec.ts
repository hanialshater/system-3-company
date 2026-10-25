import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0065", "title": "Rare incidents per unit of exposure", "op": "poisson", "labels": ["Rate", "Count"], "outputs": ["Probability"], "a": [0.6, 0.0], "b": [1.2, 0.0], "question": "A toy Poisson count has mean 0.6. What is the probability of exactly 0 events?", "questionTemplate": "A toy Poisson count has mean {Rate}. What is the probability of exactly {Count} events?", "explain": "The mean fixes this Poisson distribution. Agreement at one count does not establish that real events satisfy the model.", "lens": "the stated Poisson rate per exposure unit", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0976", "title": "A random baseline has empty regions", "op": "poisson", "labels": ["Rate", "Count"], "outputs": ["Probability"], "a": [1.0, 0.0], "b": [5.0, 0.0], "question": "A toy Poisson count has mean 1. What is the probability of exactly 0 events?", "questionTemplate": "A toy Poisson count has mean {Rate}. What is the probability of exactly {Count} events?", "explain": "The mean fixes this Poisson distribution. Agreement at one count does not establish that real events satisfy the model.", "lens": "the void probability under a homogeneous Poisson baseline", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

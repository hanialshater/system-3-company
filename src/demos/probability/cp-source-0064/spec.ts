import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0064", "title": "A zero-goal toy count", "op": "poisson", "labels": ["Rate", "Count"], "outputs": ["Probability"], "a": [1.5, 0.0], "b": [3.0, 0.0], "question": "A toy Poisson count has mean 1.5. What is the probability of exactly 0 events?", "questionTemplate": "A toy Poisson count has mean {Rate}. What is the probability of exactly {Count} events?", "explain": "The mean fixes this Poisson distribution. Agreement at one count does not establish that real events satisfy the model.", "lens": "the event-count rate in a Poisson model", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

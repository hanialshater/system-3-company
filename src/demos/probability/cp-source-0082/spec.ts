import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0082", "title": "Small counties have variable rates", "op": "samplesd", "labels": ["P", "N"], "outputs": ["SD"], "a": [0.01, 100.0], "b": [0.01, 10000.0], "question": "For 100 independent toy Bernoulli observations with probability 0.01, what is the standard deviation of the sample proportion?", "questionTemplate": "For {N} independent toy Bernoulli observations with probability {P}, what is the standard deviation of the sample proportion?", "explain": "Sampling spread depends on sample size as well as the underlying probability. This exact model assumes independent observations.", "lens": "population exposure behind a noisy proportion", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

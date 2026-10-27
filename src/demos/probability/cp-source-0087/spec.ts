import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0087", "title": "The poll margin has a square root", "op": "samplesd", "labels": ["P", "N"], "outputs": ["SD"], "a": [0.5, 1000.0], "b": [0.5, 10000.0], "question": "For 1000 independent toy Bernoulli observations with probability 0.5, what is the standard deviation of the sample proportion?", "questionTemplate": "For {N} independent toy Bernoulli observations with probability {P}, what is the standard deviation of the sample proportion?", "explain": "Sampling spread depends on sample size as well as the underlying probability. This exact model assumes independent observations.", "lens": "the standard error before applying an interval multiplier", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

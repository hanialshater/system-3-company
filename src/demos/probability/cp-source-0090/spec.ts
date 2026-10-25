import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0090", "title": "Four times the sample, half the spread", "op": "samplesd", "labels": ["P", "N"], "outputs": ["SD"], "a": [0.5, 100.0], "b": [0.5, 400.0], "question": "For 100 independent toy Bernoulli observations with probability 0.5, what is the standard deviation of the sample proportion?", "questionTemplate": "For {N} independent toy Bernoulli observations with probability {P}, what is the standard deviation of the sample proportion?", "explain": "Sampling spread depends on sample size as well as the underlying probability. This exact model assumes independent observations.", "lens": "the square-root precision law", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0634", "title": "Small hospitals have noisier proportions", "op": "samplesd", "labels": ["P", "N"], "outputs": ["SD"], "a": [0.05, 20.0], "b": [0.05, 2000.0], "question": "For 20 independent toy Bernoulli observations with probability 0.05, what is the standard deviation of the sample proportion?", "questionTemplate": "For {N} independent toy Bernoulli observations with probability {P}, what is the standard deviation of the sample proportion?", "explain": "Sampling spread depends on sample size as well as the underlying probability. This exact model assumes independent observations.", "lens": "the binomial sampling-spread facet of a funnel plot", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

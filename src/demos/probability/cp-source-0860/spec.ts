import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0860", "title": "Larger clusters leave fewer units", "op": "samplesd", "labels": ["P", "N"], "outputs": ["SD"], "a": [0.5, 100.0], "b": [0.5, 10.0], "question": "For 100 independent toy Bernoulli observations with probability 0.5, what is the standard deviation of the sample proportion?", "questionTemplate": "For {N} independent toy Bernoulli observations with probability {P}, what is the standard deviation of the sample proportion?", "explain": "Sampling spread depends on sample size as well as the underlying probability. This exact model assumes independent observations.", "lens": "the independent-cluster count before cluster-size design effects", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

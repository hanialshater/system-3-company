import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0419", "title": "Hidden odds in a matched pair", "op": "oddsbias", "labels": ["Gamma"], "outputs": ["UpperProbability"], "a": [1.0], "b": [3.0], "question": "In a toy matched pair, hidden assignment odds can differ by factor Gamma 1 at least 1. What upper assignment probability Gamma/(1+Gamma) follows?", "questionTemplate": "In a toy matched pair, hidden assignment odds can differ by factor Gamma {Gamma} at least 1. What upper assignment probability Gamma/(1+Gamma) follows?", "explain": "This bounds assignment within the stated pair. A full sensitivity conclusion also depends on outcomes, the test and its assumptions.", "lens": "the assignment-probability bound under a stated Gamma", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

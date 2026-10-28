import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0933", "title": "Many cascades end early", "op": "finitebranch", "labels": ["Zero", "Two", "Generations"], "outputs": ["Extinct"], "a": [0.6, 0.2, 5.0], "b": [0.4, 0.4, 5.0], "question": "One toy lineage has 0 offspring with probability 0.6, 2 with 0.2, otherwise 1. What is extinction probability by 5 generations?", "questionTemplate": "One toy lineage has 0 offspring with probability {Zero}, 2 with {Two}, otherwise 1. What is extinction probability by {Generations} generations?", "explain": "Iterating the offspring generating function gives finite-generation extinction. This differs from its eventual fixed point.", "lens": "the offspring law in a finite branching cascade", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

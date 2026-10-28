import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0549", "title": "Extinction by a finite generation", "op": "finitebranch", "labels": ["Zero", "Two", "Generations"], "outputs": ["Extinct"], "a": [0.4, 0.5, 20.0], "b": [0.4, 0.5, 2.0], "question": "One toy lineage has 0 offspring with probability 0.4, 2 with 0.5, otherwise 1. What is extinction probability by 20 generations?", "questionTemplate": "One toy lineage has 0 offspring with probability {Zero}, 2 with {Two}, otherwise 1. What is extinction probability by {Generations} generations?", "explain": "Iterating the offspring generating function gives finite-generation extinction. This differs from its eventual fixed point.", "lens": "the generating-function iterate before the eventual limit", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

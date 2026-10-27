import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0156", "title": "A lineage can vanish as the mean grows", "op": "branch", "labels": ["Zero", "Two"], "outputs": ["Extinction"], "a": [0.4, 0.5], "b": [0.6, 0.3], "question": "Each toy lineage independently has zero descendants with probability 0.4, two with 0.5, otherwise one. What is its eventual extinction probability?", "questionTemplate": "Each toy lineage independently has zero descendants with probability {Zero}, two with {Two}, otherwise one. What is its eventual extinction probability?", "explain": "The smallest fixed point of the offspring generating function gives extinction. Growing mean population does not guarantee survival of every lineage.", "lens": "the offspring generating-function fixed point", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

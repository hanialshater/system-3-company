import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0548", "title": "Subcritical and supercritical lineages", "op": "branch", "labels": ["Zero", "Two"], "outputs": ["Extinction"], "a": [0.6, 0.3], "b": [0.4, 0.5], "question": "Each toy lineage independently has zero descendants with probability 0.6, two with 0.3, otherwise one. What is its eventual extinction probability?", "questionTemplate": "Each toy lineage independently has zero descendants with probability {Zero}, two with {Two}, otherwise one. What is its eventual extinction probability?", "explain": "The smallest fixed point of the offspring generating function gives extinction. Growing mean population does not guarantee survival of every lineage.", "lens": "the eventual extinction fixed point", "kind": "grid", "answerPosition": 2, "recall": [0.2, 0.7]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

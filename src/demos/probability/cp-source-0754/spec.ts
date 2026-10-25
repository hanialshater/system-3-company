import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0754", "title": "A few fires can dominate area", "op": "pareto", "labels": ["TopShare", "Alpha"], "outputs": ["WealthShare"], "a": [0.1, 1.2], "b": [0.1, 3.0], "question": "A toy Pareto distribution has shape Alpha 1.2 greater than 1. What fraction of total wealth is held by the top population share 0.1?", "questionTemplate": "A toy Pareto distribution has shape Alpha {Alpha} greater than 1. What fraction of total wealth is held by the top population share {TopShare}?", "explain": "The shape parameter controls concentration and requires a finite mean for this formula. It is a stated distribution, not an estimate of a country.", "lens": "tail concentration in a Pareto area illustration", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

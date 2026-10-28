import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0991", "title": "Random atoms have a smooth mean decay", "op": "decay", "labels": ["Initial", "HalfLife", "Time"], "outputs": ["Expected"], "a": [1000.0, 2.0, 2.0], "b": [1000.0, 2.0, 4.0], "question": "Independent toy decays start with Initial 1000 atoms and HalfLife 2. What expected survivors remain at Time 2?", "questionTemplate": "Independent toy decays start with Initial {Initial} atoms and HalfLife {HalfLife}. What expected survivors remain at Time {Time}?", "explain": "Independent random lifetimes produce a smooth expected population decay. Realized survivor counts still fluctuate.", "lens": "the elapsed half-lives of independent decays", "kind": "curve", "answerPosition": 1, "plot": [2, 0, 10]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

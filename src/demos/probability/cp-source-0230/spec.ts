import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0230", "title": "Forks create more possible analyses", "op": "uniontests", "labels": ["Tests", "Alpha"], "outputs": ["Bound"], "a": [16.0, 0.05], "b": [4.0, 0.05], "question": "There are 16 opportunities, each with false-alarm probability at most 0.05. What union-bound ceiling applies to any false alarm?", "questionTemplate": "There are {Tests} opportunities, each with false-alarm probability at most {Alpha}. What union-bound ceiling applies to any false alarm?", "explain": "The bound needs no independence but can be loose. Repeated looks at shared data require their own sequential-testing model.", "lens": "the number of false-alarm opportunities", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

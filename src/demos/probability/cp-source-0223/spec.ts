import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0223", "title": "Repeated opportunities need a model", "op": "uniontests", "labels": ["Tests", "Alpha"], "outputs": ["Bound"], "a": [20.0, 0.05], "b": [5.0, 0.05], "question": "There are 20 opportunities, each with false-alarm probability at most 0.05. What union-bound ceiling applies to any false alarm?", "questionTemplate": "There are {Tests} opportunities, each with false-alarm probability at most {Alpha}. What union-bound ceiling applies to any false alarm?", "explain": "The bound needs no independence but can be loose. Repeated looks at shared data require their own sequential-testing model.", "lens": "a conservative bound without assuming independent repeated looks", "kind": "grid", "answerPosition": 1, "recall": [2.0, 0.1]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

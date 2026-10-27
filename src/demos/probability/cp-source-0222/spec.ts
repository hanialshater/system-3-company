import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0222", "title": "Many analysis paths add opportunities", "op": "uniontests", "labels": ["Tests", "Alpha"], "outputs": ["Bound"], "a": [10.0, 0.05], "b": [2.0, 0.05], "question": "There are 10 opportunities, each with false-alarm probability at most 0.05. What union-bound ceiling applies to any false alarm?", "questionTemplate": "There are {Tests} opportunities, each with false-alarm probability at most {Alpha}. What union-bound ceiling applies to any false alarm?", "explain": "The bound needs no independence but can be loose. Repeated looks at shared data require their own sequential-testing model.", "lens": "a union-bound ceiling rather than a fitted p-hacking simulator", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0236", "title": "Choose a hypothesis after the search", "op": "uniontests", "labels": ["Tests", "Alpha"], "outputs": ["Bound"], "a": [20.0, 0.05], "b": [1.0, 0.05], "question": "There are 20 opportunities, each with false-alarm probability at most 0.05. What union-bound ceiling applies to any false alarm?", "questionTemplate": "There are {Tests} opportunities, each with false-alarm probability at most {Alpha}. What union-bound ceiling applies to any false alarm?", "explain": "The bound needs no independence but can be loose. Repeated looks at shared data require their own sequential-testing model.", "lens": "the hidden search opportunity behind a selected pattern", "kind": "grid", "answerPosition": 2, "recall": [3.0, 0.05]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

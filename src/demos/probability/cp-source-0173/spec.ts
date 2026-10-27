import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0173", "title": "Accept an uphill move while warm", "op": "anneal", "labels": ["Increase", "Temperature"], "outputs": ["Acceptance"], "a": [5.0, 10.0], "b": [5.0, 1.0], "question": "A toy annealing move increases cost by 5, with positive temperature 10. What acceptance probability does exp(-increase/temperature) assign?", "questionTemplate": "A toy annealing move increases cost by {Increase}, with positive temperature {Temperature}. What acceptance probability does exp(-increase/temperature) assign?", "explain": "A higher temperature permits more uphill moves. This one-step rule alone does not guarantee a global optimum.", "lens": "the temperature in a stated annealing acceptance rule", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

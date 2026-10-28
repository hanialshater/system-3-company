import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0597", "title": "A code proposal changes a supplied score", "op": "anneal", "labels": ["Increase", "Temperature"], "outputs": ["Acceptance"], "a": [5.0, 1.0], "b": [0.5, 1.0], "question": "A toy annealing move increases cost by 5, with positive temperature 1. What acceptance probability does exp(-increase/temperature) assign?", "questionTemplate": "A toy annealing move increases cost by {Increase}, with positive temperature {Temperature}. What acceptance probability does exp(-increase/temperature) assign?", "explain": "A higher temperature permits more uphill moves. This one-step rule alone does not guarantee a global optimum.", "lens": "a symmetric-proposal acceptance ingredient rather than a live decoder", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

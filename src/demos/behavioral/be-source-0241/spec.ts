import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0241", "title": "A description adds a condition", "op": "conjunction", "labels": ["First", "Conditional"], "outputs": ["Joint"], "a": [0.4, 0.6], "b": [0.4, 1.0], "question": "A toy event has probability 0.4; conditional on it, an additional property occurs with probability 0.6. What is the joint probability?", "explain": "The conjunction occupies only part of the original event. Adding a condition cannot make the same event more probable.", "lens": "the subset relationship behind a conjunction", "kind": "grid", "answerPosition": 1, "questionTemplate": "A toy event has probability {First}; conditional on it, an additional property occurs with probability {Conditional}. What is the joint probability?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

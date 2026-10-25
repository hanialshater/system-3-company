import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0489", "title": "Squaring requires an assumption", "op": "conjunction", "labels": ["First", "Conditional"], "outputs": ["Joint"], "a": [0.0001, 0.0001], "b": [0.0001, 0.01], "question": "A toy event has probability 0.0001; conditional on it, an additional property occurs with probability 0.0001. What is the joint probability?", "questionTemplate": "A toy event has probability {First}; conditional on it, an additional property occurs with probability {Conditional}. What is the joint probability?", "explain": "The conjunction occupies only part of the original event. Adding a condition cannot make the same event more probable.", "lens": "the conditional probability needed for a joint rare event", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

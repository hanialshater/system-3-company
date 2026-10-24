import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0242", "title": "Two clinical conditions in a toy set", "op": "conjunction", "labels": ["First", "Conditional"], "outputs": ["Joint"], "a": [0.2, 0.5], "b": [0.2, 1.0], "question": "A toy event has probability 0.2; conditional on it, an additional property occurs with probability 0.5. What is the joint probability?", "explain": "The conjunction occupies only part of the original event. Adding a condition cannot make the same event more probable.", "lens": "the probability of a subset rather than a stereotype", "kind": "grid", "answerPosition": 2, "questionTemplate": "A toy event has probability {First}; conditional on it, an additional property occurs with probability {Conditional}. What is the joint probability?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

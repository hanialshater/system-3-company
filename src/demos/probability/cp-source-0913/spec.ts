import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0913", "title": "A slate probability combines choices", "op": "conjunction", "labels": ["First", "Conditional"], "outputs": ["Joint"], "a": [0.8, 0.5], "b": [0.4, 0.5], "question": "A toy event has probability 0.8; conditional on it, an additional property occurs with probability 0.5. What is the joint probability?", "questionTemplate": "A toy event has probability {First}; conditional on it, an additional property occurs with probability {Conditional}. What is the joint probability?", "explain": "The conjunction occupies only part of the original event. Adding a condition cannot make the same event more probable.", "lens": "the conditional product in a two-position slate ingredient", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

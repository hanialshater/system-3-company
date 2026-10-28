import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0786", "title": "A pixel sequence multiplies conditionals", "op": "conjunction", "labels": ["First", "Conditional"], "outputs": ["Joint"], "a": [0.8, 0.7], "b": [0.8, 0.2], "question": "A toy event has probability 0.8; conditional on it, an additional property occurs with probability 0.7. What is the joint probability?", "questionTemplate": "A toy event has probability {First}; conditional on it, an additional property occurs with probability {Conditional}. What is the joint probability?", "explain": "The conjunction occupies only part of the original event. Adding a condition cannot make the same event more probable.", "lens": "the chain-rule ingredient in autoregressive generation", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

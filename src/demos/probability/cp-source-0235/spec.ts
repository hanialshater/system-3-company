import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0235", "title": "One tail versus two tails", "op": "tailcount", "labels": ["OneTail", "Tails"], "outputs": ["Probability"], "a": [0.04, 1.0], "b": [0.04, 2.0], "question": "Each of 1 disjoint symmetric tails has toy probability 0.04. What is their combined probability?", "questionTemplate": "Each of {Tails} disjoint symmetric tails has toy probability {OneTail}. What is their combined probability?", "explain": "Adding the tails changes the rejection event. A one-sided direction should be chosen with the question, before inspecting the effect sign.", "lens": "the disjoint tail events included in a test", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0075", "title": "A toy calendar with fewer dates", "op": "birthday", "labels": ["People", "Days"], "outputs": ["Collision"], "a": [23.0, 365.0], "b": [23.0, 300.0], "question": "With 23 independent uniform birthdays across 365 days, what is the probability of any shared birthday?", "questionTemplate": "With {People} independent uniform birthdays across {Days} days, what is the probability of any shared birthday?", "explain": "Multiply the successive probabilities of no match, then take the complement. The uniform independent calendar is an explicit assumption.", "lens": "the support size of a simplified birthday model", "kind": "grid", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

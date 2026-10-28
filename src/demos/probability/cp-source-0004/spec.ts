import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0004", "title": "Any pair shares a birthday", "op": "birthday", "labels": ["People", "Days"], "outputs": ["Collision"], "a": [23.0, 365.0], "b": [70.0, 365.0], "question": "With 23 independent uniform birthdays across 365 days, what is the probability of any shared birthday?", "questionTemplate": "With {People} independent uniform birthdays across {Days} days, what is the probability of any shared birthday?", "explain": "Multiply the successive probabilities of no match, then take the complement. The uniform independent calendar is an explicit assumption.", "lens": "the event of any matching pair", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

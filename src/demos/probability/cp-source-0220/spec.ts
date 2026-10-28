import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0220", "title": "A small hash space still collides", "op": "birthday", "labels": ["People", "Days"], "outputs": ["Collision"], "a": [30.0, 1000.0], "b": [10.0, 1000.0], "question": "With 30 independent uniform birthdays across 1000 days, what is the probability of any shared birthday?", "questionTemplate": "With {People} independent uniform birthdays across {Days} days, what is the probability of any shared birthday?", "explain": "Multiply the successive probabilities of no match, then take the complement. The uniform independent calendar is an explicit assumption.", "lens": "the birthday event in a finite uniform hash space", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

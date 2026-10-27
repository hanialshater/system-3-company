import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0011", "title": "Whose bonus is at risk?", "op": "reference", "labels": ["Outcome", "Reference", "Lambda"], "outputs": ["Value"], "a": [200.0, 0.0, 2.0], "b": [200.0, 300.0, 2.0], "question": "An outcome is 200, its reference is 0, and negative differences count 2 times positive ones. What is its signed model value?", "explain": "The same outcome changes sign when its reference crosses it. The reference is a stated assumption, not a measure of anyone’s feelings.", "lens": "the reference used for a bonus", "kind": "timeline", "answerPosition": 2, "questionTemplate": "An outcome is {Outcome}, its reference is {Reference}, and negative differences count {Lambda} times positive ones. What is its signed model value?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

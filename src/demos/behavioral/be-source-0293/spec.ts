import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0293", "title": "A price above the reference", "op": "reference", "labels": ["Outcome", "Reference", "Lambda"], "outputs": ["Value"], "a": [12.0, 10.0, 2.0], "b": [8.0, 10.0, 2.0], "question": "An outcome is 12, its reference is 10, and negative differences count 2 times positive ones. What is its signed model value?", "questionTemplate": "An outcome is {Outcome}, its reference is {Reference}, and negative differences count {Lambda} times positive ones. What is its signed model value?", "explain": "The same outcome changes sign when its reference crosses it. The reference is a stated assumption, not a measure of anyone’s feelings.", "lens": "the sign of a price difference under a stated value rule", "kind": "timeline", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0002", "title": "Ninety-eight goat doors", "op": "monty", "labels": ["Doors"], "outputs": ["Switch", "Stay"], "a": [100.0], "b": [3.0], "question": "A toy prize is uniform over 100 doors. A knowledgeable host always reveals all but one unchosen goat door. What is the win probability if you switch?", "questionTemplate": "A toy prize is uniform over {Doors} doors. A knowledgeable host always reveals all but one unchosen goat door. What is the win probability if you switch?", "explain": "The host preserves the probability of the entire initially unchosen set. This requires the stated knowledgeable-host protocol.", "lens": "the unchosen probability mass", "kind": "grid", "answerPosition": 2, "recall": [20.0]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

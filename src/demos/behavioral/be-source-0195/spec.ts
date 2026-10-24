import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0195", "title": "Cooperate again tomorrow?", "op": "repeat", "labels": ["Cooperate", "Defect", "Delta"], "outputs": ["Advantage"], "a": [3.0, 5.0, 0.8], "b": [3.0, 5.0, 0.2], "question": "Toy cooperation pays 3 forever, discounted by 0.8 each round. Defection pays 5 once, then zero. What is cooperation’s discounted advantage?", "explain": "Continuation can make a one-time temptation unattractive. The comparison depends on the specified future and discount factor.", "lens": "the value assigned to future cooperation", "kind": "timeline", "answerPosition": 0, "questionTemplate": "Toy cooperation pays {Cooperate} forever, discounted by {Delta} each round. Defection pays {Defect} once, then zero. What is cooperation’s discounted advantage?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

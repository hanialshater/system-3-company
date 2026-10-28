import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0019", "title": "Tokens in two frames", "op": "net", "labels": ["Endowment", "Bonus", "Penalty"], "outputs": ["Net"], "a": [3.0, 1.0, 1.0], "b": [3.0, 0.0, 0.0], "question": "A toy account starts at 3, receives 1, and pays back 1. What final balance remains?", "explain": "Track the final balance as well as the wording. Equivalent cash paths can carry different descriptions without changing the arithmetic.", "lens": "equivalent token outcomes", "kind": "timeline", "answerPosition": 1, "questionTemplate": "A toy account starts at {Endowment}, receives {Bonus}, and pays back {Penalty}. What final balance remains?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

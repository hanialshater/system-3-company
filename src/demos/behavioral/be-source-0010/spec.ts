import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0010", "title": "A bonus paid first", "op": "net", "labels": ["Endowment", "Bonus", "Penalty"], "outputs": ["Net"], "a": [1000.0, 200.0, 200.0], "b": [1000.0, 0.0, 0.0], "question": "A toy account starts at 1000, receives 200, and pays back 200. What final balance remains?", "explain": "Track the final balance as well as the wording. Equivalent cash paths can carry different descriptions without changing the arithmetic.", "lens": "the difference between a path and its final cash balance", "kind": "timeline", "answerPosition": 1, "questionTemplate": "A toy account starts at {Endowment}, receives {Bonus}, and pays back {Penalty}. What final balance remains?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0701", "title": "Back up a neighboring value", "op": "bellman", "labels": ["Reward", "Gamma", "Next"], "outputs": ["Value"], "a": [0.0, 0.9, 10.0], "b": [0.0, 0.9, 8.0], "question": "A toy one-step backup uses Reward 0+Gamma 0.9×Next 10. What backed-up value results?", "questionTemplate": "A toy one-step backup uses Reward {Reward}+Gamma {Gamma}×Next {Next}. What backed-up value results?", "explain": "Immediate reward and discounted continuation both matter. One backup does not solve a complete decision process.", "lens": "the supplied continuation in one value-iteration backup", "kind": "bars", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

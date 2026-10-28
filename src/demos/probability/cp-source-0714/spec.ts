import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0714", "title": "Shape reward with a potential", "op": "shaped", "labels": ["Reward", "Gamma", "PhiNow", "PhiNext"], "outputs": ["Reward"], "a": [0.0, 0.9, 2.0, 4.0], "b": [0.0, 0.9, 2.0, 1.0], "question": "Add potential shaping Gamma 0.9×PhiNext 4-PhiNow 2 to Reward 0. What shaped reward results?", "questionTemplate": "Add potential shaping Gamma {Gamma}×PhiNext {PhiNext}-PhiNow {PhiNow} to Reward {Reward}. What shaped reward results?", "explain": "Potential differences provide intermediate feedback. Policy-invariance claims additionally require compatible discounting, boundaries and a full MDP.", "lens": "the potential difference added to an immediate reward", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

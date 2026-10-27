import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0001", "title": "One risky offer", "op": "threshold", "labels": ["Loss", "Lambda", "Probability"], "outputs": ["Gain"], "a": [100.0, 2.25, 0.5], "b": [100.0, 1.0, 0.5], "question": "A toy gamble loses 100 otherwise and wins with probability 0.5. Losses have weight 2.25. What gain makes expected model value zero?", "explain": "Setting the weighted expected value to zero isolates the compensation needed for the possible loss.", "lens": "compensation for a weighted loss", "kind": "bars", "answerPosition": 1, "questionTemplate": "A toy gamble loses {Loss} otherwise and wins with probability {Probability}. Losses have weight {Lambda}. What gain makes expected model value zero?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

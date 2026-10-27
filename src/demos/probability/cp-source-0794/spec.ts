import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0794", "title": "A token probability has a surprise", "op": "surprisal", "labels": ["Probability"], "outputs": ["Nats"], "a": [0.9], "b": [0.1], "question": "A specified toy outcome has model probability 0.9. What is its surprisal in nats, -log(probability)?", "questionTemplate": "A specified toy outcome has model probability {Probability}. What is its surprisal in nats, -log(probability)?", "explain": "Low model probability produces a high anomaly score. That score does not establish fraud, danger or even that the model fits the current population.", "lens": "the likelihood attached to one generated token", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

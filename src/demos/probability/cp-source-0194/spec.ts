import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0194", "title": "Rare under a model is an anomaly score", "op": "surprisal", "labels": ["Probability"], "outputs": ["Nats"], "a": [0.1], "b": [0.0001], "question": "A specified toy outcome has model probability 0.1. What is its surprisal in nats, -log(probability)?", "questionTemplate": "A specified toy outcome has model probability {Probability}. What is its surprisal in nats, -log(probability)?", "explain": "Low model probability produces a high anomaly score. That score does not establish fraud, danger or even that the model fits the current population.", "lens": "the negative log probability under the fitted model", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

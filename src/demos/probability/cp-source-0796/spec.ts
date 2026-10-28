import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0796", "title": "High likelihood is a model statement", "op": "surprisal", "labels": ["Probability"], "outputs": ["Nats"], "a": [0.01], "b": [0.1], "question": "A specified toy outcome has model probability 0.01. What is its surprisal in nats, -log(probability)?", "questionTemplate": "A specified toy outcome has model probability {Probability}. What is its surprisal in nats, -log(probability)?", "explain": "Low model probability produces a high anomaly score. That score does not establish fraud, danger or even that the model fits the current population.", "lens": "the assigned density score rather than semantic familiarity", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0007", "title": "A busy day in the cab", "op": "target", "labels": ["Target", "Hourly"], "outputs": ["Hours"], "a": [200.0, 20.0], "b": [200.0, 40.0], "question": "A toy worker stops exactly at income 200 and earns 20 per hour. After how many hours do they stop?", "explain": "A fixed income target produces fewer hours on high-rate days. This illustrates the stopping rule; it cannot establish a real worker’s motive.", "lens": "an income-target stopping rule", "kind": "timeline", "answerPosition": 1, "questionTemplate": "A toy worker stops exactly at income {Target} and earns {Hourly} per hour. After how many hours do they stop?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

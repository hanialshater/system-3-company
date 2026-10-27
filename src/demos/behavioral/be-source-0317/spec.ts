import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0317", "title": "A concrete output target", "op": "target", "labels": ["Target", "Hourly"], "outputs": ["Hours"], "a": [100.0, 10.0], "b": [100.0, 20.0], "question": "A toy worker stops exactly at income 100 and earns 10 per hour. After how many hours do they stop?", "questionTemplate": "A toy worker stops exactly at income {Target} and earns {Hourly} per hour. After how many hours do they stop?", "explain": "A fixed income target produces fewer hours on high-rate days. This illustrates the stopping rule; it cannot establish a real worker’s motive.", "lens": "the rate required to reach a stated goal", "kind": "timeline", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

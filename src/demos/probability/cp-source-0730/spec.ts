import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0730", "title": "A second cause removes future risk", "op": "competing", "labels": ["Rate1", "Rate2", "Time"], "outputs": ["Incidence", "Naive"], "a": [0.1, 0.0, 5.0], "b": [0.1, 0.3, 5.0], "question": "Two constant toy cause-specific hazards are 0.1,0. By Time 5, what probability has failed from cause 1?", "questionTemplate": "Two constant toy cause-specific hazards are {Rate1},{Rate2}. By Time {Time}, what probability has failed from cause 1?", "explain": "A competing event removes a person from future risk. Ignoring that event gives a different estimand.", "lens": "the competing hazard in a cause-specific incidence", "kind": "curve", "answerPosition": 1, "plot": [2, 0, 10]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

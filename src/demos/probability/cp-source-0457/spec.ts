import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0457", "title": "Two wandering levels share a gap", "op": "tether", "labels": ["Trend", "Gap"], "outputs": ["Difference", "X", "Y"], "a": [0.0, 2.0], "b": [100.0, 2.0], "question": "Two toy series are X=Trend 0, Y=Trend+Gap 2. What is Y-X?", "questionTemplate": "Two toy series are X=Trend {Trend}, Y=Trend+Gap {Gap}. What is Y-X?", "explain": "A shared trend can disappear from a difference even as both levels move. This algebra illustrates a tether, not a statistical cointegration test.", "lens": "the common trend removed by differencing", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

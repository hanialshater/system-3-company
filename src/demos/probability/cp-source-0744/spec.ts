import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0744", "title": "A rarer return level lies higher", "op": "returnlevel", "labels": ["Period", "Rate"], "outputs": ["Level"], "a": [100.0, 0.1], "b": [1000.0, 0.1], "question": "Independent annual toy levels are exponential with Rate 0.1. What threshold has annual exceedance probability 1/Period 100?", "questionTemplate": "Independent annual toy levels are exponential with Rate {Rate}. What threshold has annual exceedance probability 1/Period {Period}?", "explain": "A return period describes a yearly exceedance probability. It does not schedule one event every fixed number of years.", "lens": "the exceedance period in a stipulated exponential model", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

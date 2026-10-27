import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0970", "title": "Packing fraction depends on geometry", "op": "relative", "labels": ["Saving", "Price"], "outputs": ["Percent"], "a": [64.0, 100.0], "b": [74.0, 100.0], "question": "A toy saving is 64 on a price of 100. What percentage of the original price is saved?", "questionTemplate": "A toy saving is {Saving} on a price of {Price}. What percentage of the original price is saved?", "explain": "The cash saving is the numerator; the reference price supplies the denominator. The same saving can therefore have different relative sizes.", "lens": "the occupied volume in two supplied packing illustrations", "kind": "bars", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

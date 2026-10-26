import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0969", "title": "A parking realization leaves gaps", "op": "relative", "labels": ["Saving", "Price"], "outputs": ["Percent"], "a": [75.0, 100.0], "b": [90.0, 100.0], "question": "A toy saving is 75 on a price of 100. What percentage of the original price is saved?", "questionTemplate": "A toy saving is {Saving} on a price of {Price}. What percentage of the original price is saved?", "explain": "The cash saving is the numerator; the reference price supplies the denominator. The same saving can therefore have different relative sizes.", "lens": "the occupied length in two stipulated parking outcomes", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

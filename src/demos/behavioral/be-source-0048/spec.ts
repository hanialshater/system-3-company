import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0048", "title": "A five-unit saving", "op": "relative", "labels": ["Saving", "Price"], "outputs": ["Percent"], "a": [5.0, 15.0], "b": [5.0, 125.0], "question": "A toy saving is 5 on a price of 15. What percentage of the original price is saved?", "explain": "The cash saving is the numerator; the reference price supplies the denominator. The same saving can therefore have different relative sizes.", "lens": "the denominator in a relative saving", "kind": "bars", "answerPosition": 0, "questionTemplate": "A toy saving is {Saving} on a price of {Price}. What percentage of the original price is saved?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0264", "title": "Lottery spending as income share", "op": "relative", "labels": ["Saving", "Price"], "outputs": ["Percent"], "a": [100.0, 1000.0], "b": [100.0, 5000.0], "question": "A toy saving is 100 on a price of 1000. What percentage of the original price is saved?", "questionTemplate": "A toy saving is {Saving} on a price of {Price}. What percentage of the original price is saved?", "explain": "The cash saving is the numerator; the reference price supplies the denominator. The same saving can therefore have different relative sizes.", "lens": "the income denominator with fixed spending", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

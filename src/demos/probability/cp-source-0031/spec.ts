import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0031", "title": "The first digit is not uniform", "op": "benford", "labels": ["Digit"], "outputs": ["Probability"], "a": [1.0], "b": [9.0], "question": "A toy base-ten leading digit follows the Benford model. What probability is assigned to digit 1?", "questionTemplate": "A toy base-ten leading digit follows the Benford model. What probability is assigned to digit {Digit}?", "explain": "A uniform logarithmic mantissa yields unequal leading-digit shares. The model does not apply to every numerical dataset.", "lens": "a logarithmic leading-digit model", "kind": "grid", "answerPosition": 1};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

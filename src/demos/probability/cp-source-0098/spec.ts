import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0098", "title": "Choose a desired poll half-width", "op": "samplesize", "labels": ["P", "Z", "Error"], "outputs": ["N"], "a": [0.5, 1.96, 0.03], "b": [0.5, 1.96, 0.015], "question": "Use the toy large-population normal approximation with proportion 0.5, multiplier 1.96, and desired half-width 0.03. What rounded-up sample size is required?", "questionTemplate": "Use the toy large-population normal approximation with proportion {P}, multiplier {Z}, and desired half-width {Error}. What rounded-up sample size is required?", "explain": "Precision improves with the square root of sample size. The calculation assumes a simple random sample and ignores nonresponse and design effects.", "lens": "the sample cost of tighter precision", "kind": "grid", "answerPosition": 2};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

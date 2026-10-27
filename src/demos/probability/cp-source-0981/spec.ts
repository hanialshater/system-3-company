import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0981", "title": "Volatility subtracts from log growth", "op": "loggrowth", "labels": ["Drift", "Sigma"], "outputs": ["LogDrift"], "a": [0.1, 0.1], "b": [0.1, 0.5], "question": "A toy geometric Brownian model has arithmetic Drift 0.1 and volatility Sigma 0.1. What drift does its log have?", "questionTemplate": "A toy geometric Brownian model has arithmetic Drift {Drift} and volatility Sigma {Sigma}. What drift does its log have?", "explain": "The quadratic-variation correction subtracts half the squared volatility. This is an assumed diffusion model rather than a return forecast.", "lens": "the quadratic-variation correction in a geometric diffusion", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

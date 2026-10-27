import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0725", "title": "Shape changes the age pattern", "op": "weibull", "labels": ["Shape", "Scale", "Time"], "outputs": ["Survival", "Hazard"], "a": [0.5, 5.0, 3.0], "b": [2.0, 5.0, 3.0], "question": "A toy Weibull lifetime has Shape 0.5, Scale 5. What survival probability remains at Time 3?", "questionTemplate": "A toy Weibull lifetime has Shape {Shape}, Scale {Scale}. What survival probability remains at Time {Time}?", "explain": "The shape parameter changes how hazard varies with age. The model is illustrative rather than a fitted reliability forecast.", "lens": "the Weibull shape governing the age-dependent hazard", "kind": "curve", "answerPosition": 2, "plot": [2, 0.05, 12]};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

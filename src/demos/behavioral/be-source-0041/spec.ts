import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0041", "title": "Two descriptions of 600", "op": "frame", "labels": ["Total", "Saved", "Frame"], "outputs": ["Display", "Saved", "Lost"], "a": [600.0, 200.0, 0.0], "b": [600.0, 200.0, 1.0], "question": "In a toy population of 600, 200 are saved. Frame 0 displays saved when 0 and lost when 1. Which count does that frame display?", "explain": "The displayed count changes its meaning with the frame; the saved and lost counts describe one unchanged outcome.", "lens": "the saved and lost frames of one unchanged outcome", "kind": "grid", "answerPosition": 2, "questionTemplate": "In a toy population of {Total}, {Saved} are saved. Frame {Frame} displays saved when 0 and lost when 1. Which count does that frame display?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

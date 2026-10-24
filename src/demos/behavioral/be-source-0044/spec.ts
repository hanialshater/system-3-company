import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "be-source-0044", "title": "Survival and mortality", "op": "frame", "labels": ["Total", "Saved", "Frame"], "outputs": ["Display", "Saved", "Lost"], "a": [100.0, 90.0, 0.0], "b": [100.0, 90.0, 1.0], "question": "In a toy population of 100, 90 are saved. Frame 0 displays saved when 0 and lost when 1. Which count does that frame display?", "explain": "The displayed count changes its meaning with the frame; the saved and lost counts describe one unchanged outcome.", "lens": "two complementary descriptions of one outcome", "kind": "grid", "answerPosition": 2, "questionTemplate": "In a toy population of {Total}, {Saved} are saved. Frame {Frame} displays saved when 0 and lost when 1. Which count does that frame display?"};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

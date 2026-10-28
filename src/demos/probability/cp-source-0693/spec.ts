import {makeCuratedSpec,type CuratedCase} from '../../../lib/continuation/scenario';
import {compute} from './model';
const c:CuratedCase={"id": "cp-source-0693", "title": "A cold-start arm gets a bonus", "op": "optimism", "labels": ["Mean", "Total", "Pulls"], "outputs": ["UCB", "Bonus"], "a": [0.1, 100.0, 1.0], "b": [0.1, 100.0, 20.0], "question": "A toy UCB score adds sqrt(2 log Total/Pulls) to Mean 0.1. Total 100, Pulls 1: what score results?", "questionTemplate": "A toy UCB score adds sqrt(2 log Total/Pulls) to Mean {Mean}. Total {Total}, Pulls {Pulls}: what score results?", "explain": "Less sampled arms receive a larger optimism bonus. This one-step score does not establish cumulative regret.", "lens": "the exploration bonus for an under-sampled item", "kind": "bars", "answerPosition": 0};
export const spec=makeCuratedSpec(c,compute);
export const curation=c;

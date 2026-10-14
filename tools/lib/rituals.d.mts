export interface Due { ritual: string; room: string; last: string | null; due: boolean; reasons: string[]; why: string }
export function computeDue(triggers: unknown[], events: { ts: string; type: string; room: string; summary?: string }[], now?: number): Due[];

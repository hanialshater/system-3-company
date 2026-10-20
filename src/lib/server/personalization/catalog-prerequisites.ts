import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { allDemos, domains } from '../../catalog';
import { feedPrerequisites, type ConceptMap } from './feed-prerequisites';
// Public content memo only; account settings and served pages are always per request.
export const catalogPrerequisites = feedPrerequisites(allDemos, domains.map(({ id }) => {
    const file = path.join(process.cwd(), 'content/curriculum', `${id}.json`);
    return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) as ConceptMap : { domain: id, concepts: [] };
}));

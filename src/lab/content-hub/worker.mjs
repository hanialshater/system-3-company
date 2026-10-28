import { ContentHub } from './hub.mjs';
const hub = new ContentHub(process.argv[2]);
try {
  for (const { id } of hub.db.prepare('SELECT id FROM spaces').all()) hub.reconcile(id);
  console.log(JSON.stringify(hub.work()));
} finally { hub.close(); }

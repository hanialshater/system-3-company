// Offline export only. Never changes raw ratings, publication or serving approval.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const qualityIds = ['prediction','interaction','payoff','clarity','transfer','accessibility'];
const experienceIds = ['surprise','visualExplanation','playfulness','practicalValue','depth'];

export function buildEditorialProfiles(root, roundDir) {
  const round = path.resolve(root, roundDir), inventory = read(path.join(round, 'inventory.json'));
  const profiles = {}, counts = {reviewed:0, unknown:0, current:0, stale:0, disputed:0};
  const overlaps = new Map(), disputes = new Set(), versionBytes = [fs.readFileSync(path.join(round,'inventory.json'))];
  const overlapDir = path.join(round,'reviews/overlap');
  if (fs.existsSync(overlapDir)) for (const name of fs.readdirSync(overlapDir).sort()) if (name.endsWith('.json')) {
    const file = path.join(overlapDir,name), r=read(file);
    overlaps.set(r.slug,[...(overlaps.get(r.slug)||[]),r]); versionBytes.push(fs.readFileSync(file));
  }
  const adjudications = path.join(round,'adjudications');
  if (fs.existsSync(adjudications)) for (const name of fs.readdirSync(adjudications).sort()) if (name.endsWith('.json')) {
    const bytes = fs.readFileSync(path.join(adjudications,name)); versionBytes.push(bytes);
    const doc=JSON.parse(bytes); if (doc.approvedForServing !== true) for (const item of doc.items || []) if (item.slug) disputes.add(item.slug);
  }
  for (const identity of inventory.items) {
    const file=path.join(round,'reviews/primary',`${identity.slug}.json`);
    if (!fs.existsSync(file)) {counts.unknown++;continue;}
    const bytes=fs.readFileSync(file), r=JSON.parse(bytes); versionBytes.push(bytes);
    if (r.status!=='walkthrough-reviewed' || !['prediction','exploration','reveal'].every(k=>r.coverage?.[k]===true)) {counts.unknown++;continue;}
    if (r.slug!==identity.slug || r.demoVersion!==identity.demoVersion) throw Error(`Review identity mismatch: ${identity.slug}`);
    for (const [group,ids] of [['quality',qualityIds],['experience',experienceIds]]) {
      if (JSON.stringify(Object.keys(r[group]||{}).sort())!==JSON.stringify([...ids].sort())) throw Error(`Invalid dimensions: ${identity.slug}/${group}`);
      for (const id of ids) {const d=r[group][id];if (!(d.score===null || Number.isInteger(d.score)&&d.score>=0&&d.score<=4) || !(d.score===null&&d.confidence===null || ['low','medium','high'].includes(d.confidence))||!d.reason||!d.evidence) throw Error(`Invalid rating: ${identity.slug}/${id}`);}
    }
    const metaFile=path.join(root,identity.metaPath), demoFile=path.join(path.dirname(metaFile),'Demo.tsx');
    const fresh=fs.existsSync(metaFile)&&fs.existsSync(demoFile)&&hash(fs.readFileSync(metaFile))===identity.metaSha256&&hash(fs.readFileSync(demoFile))===identity.demoSha256;
    const others=overlaps.get(identity.slug)||[];
    for (const other of others) for (const [group,ids] of [['quality',qualityIds],['experience',experienceIds]]) for (const id of ids) {
      const a=r[group]?.[id]?.score,b=other[group]?.[id]?.score;
      if (a!==null&&a!==undefined&&b!==null&&b!==undefined&&Math.abs(a-b)>=2) disputes.add(identity.slug);
    }
    const state=!fresh?'stale':disputes.has(identity.slug)?'disputed':'current';
    profiles[identity.slug]={demoVersion:r.demoVersion,sourceRevision:r.sourceRevision,reviewRef:path.relative(root,file),state,reviewCount:1+others.length,quality:r.quality,experience:r.experience,complexity:r.complexity,whyCool:r.whyCool??null,caveat:r.caveat??null};
    counts.reviewed++;counts[state]++;
  }
  // Catalogue identity participates even when a newly added lesson has no review.
  const catalogue=[];
  for (const domain of fs.readdirSync(path.join(root,'src/demos')).sort()) {
    const dir=path.join(root,'src/demos',domain); if(!fs.statSync(dir).isDirectory()) continue;
    for(const slug of fs.readdirSync(dir).sort()) {
      const meta=path.join(dir,slug,'meta.json'); if(!fs.existsSync(meta)) continue;
      catalogue.push([slug,hash(fs.readFileSync(meta))]);
      if(!inventory.items.some(i=>i.slug===slug)) counts.unknown++;
    }
  }
  versionBytes.push(Buffer.from(JSON.stringify(catalogue)));
  return {catalogueCount:catalogue.length,schema:'editorial-preference-preview-v1',profileSetVersion:hash(Buffer.concat([...versionBytes,Buffer.from(JSON.stringify(profiles))])).slice(0,16),round:roundDir,notApprovedForServing:true,notMeasuredLearning:true,freshnessScope:'Metadata and Demo.tsx entry-file pins only; transitive imports are not pinned. Provisional review evidence, not full artifact freshness or release approval.',counts,profiles};
}

if (process.argv[1] && fs.realpathSync(process.argv[1])===fs.realpathSync(fileURLToPath(import.meta.url))) {
  const round=process.argv[2]||'company/evaluation/rounds/2026-10-18-round-1';
  const output=path.resolve(process.cwd(),process.argv[3]||'src/data/editorial-profiles.preview.json');
  const data=buildEditorialProfiles(process.cwd(),round);
  fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,JSON.stringify(data)+'\n');
  console.log(JSON.stringify({output,profileSetVersion:data.profileSetVersion,counts:data.counts,notApprovedForServing:true}));
}

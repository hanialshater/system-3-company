// Only the operator configures the read endpoint; its credential remains on the server.
export async function publication(slug) {
  const endpoint = process.env.CONTENT_HUB_PUBLICATION_URL;
  const allowedOrigin = process.env.CONTENT_HUB_ARTIFACT_ORIGIN;
  if (!endpoint || !allowedOrigin) throw new Error('Content hub is not configured');
  const response = await fetch(endpoint, { cache: 'no-store', signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error('Publication lookup unavailable');
  const record = await response.json();
  if (!record || record.slug !== slug || record.status !== 'published') return null;
  const url = new URL(record.frameUrl);
  if (url.origin !== allowedOrigin || !/^\/objects\/pilot\/[a-f0-9]{64}\/frame\.html$/.test(url.pathname) || url.search || url.hash) throw new Error('Invalid published artifact');
  if (!/^[a-f0-9]{64}$/.test(record.artifact) || !/^[a-f0-9]{40}$/.test(record.sourceCommit) || !['A','B'].includes(record.revision)) throw new Error('Invalid publication identity');
  return { slug, title: String(record.title).slice(0, 200), artifact: record.artifact, sourceCommit: record.sourceCommit, frameUrl: url.href, revision: record.revision };
}

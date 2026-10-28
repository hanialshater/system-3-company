import { publication } from '../../../../lib/publication.mjs';
export const dynamic = 'force-dynamic';
export async function GET(_request, { params }) {
  const record = await publication((await params).slug);
  return Response.json(record ?? { error: 'Not found' }, { status: record ? 200 : 404, headers: { 'Cache-Control': 'no-store' } });
}

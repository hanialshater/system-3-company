import { notFound } from 'next/navigation';
import { publication } from '../../../lib/publication.mjs';
import DemoFrame from '../../frame.jsx';
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export default async function DemoPage({ params }) {
  const { slug } = await params;
  const published = await publication(slug);
  if (!published) notFound();
  return <main><header><a href="/">System 3</a><span>Content hub pilot · revision {published.revision}</span></header><DemoFrame publication={published} /></main>;
}

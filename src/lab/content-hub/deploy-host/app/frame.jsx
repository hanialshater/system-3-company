'use client';
import { useEffect, useRef, useState } from 'react';
export default function DemoFrame({ publication }) {
  const frame = useRef(null), [src, setSrc] = useState(null), [status, setStatus] = useState('Loading lesson…');
  useEffect(() => {
    const url = new URL(publication.frameUrl); url.hash = 'host=' + encodeURIComponent(location.origin); setSrc(url.href);
    const receive = event => {
      if (event.source !== frame.current?.contentWindow || event.data?.s3c !== 1 || event.data.slug !== publication.slug) return;
      if (event.data.type === 'ready') setStatus('Ready');
      if (event.data.type === 'error') setStatus('Lesson could not load');
      if (event.data.type === 'phase' && ['predict','explore','reveal'].includes(event.data.phase)) setStatus(event.data.phase);
    };
    addEventListener('message', receive); return () => removeEventListener('message', receive);
  }, [publication.frameUrl, publication.slug]);
  return <><p className="status" role="status" aria-live="polite">{status}</p>{src && <iframe ref={frame} title={publication.title} src={src} sandbox="allow-scripts" referrerPolicy="no-referrer" />}<footer>Published artifact {publication.artifact.slice(0, 12)} · source {publication.sourceCommit.slice(0, 10)}</footer></>;
}

# Integrating the content hub with the real Next.js app

owner: rnd-engineer · date: 2026-10-24 · status: proposed architecture, not a production migration
tracking: GitHub #18 / draft PR #20; architecture review W-2171

## Boundary

Next.js owns accounts, authorization, feed/navigation, metadata, progress persistence and the publication lookup. Demo source lives in one Git repository per space. A separate build service tests/compiles affected committed demo revisions and stores immutable browser artifacts. The database maps `(space, demo)` to an approved published artifact; object storage/CDN serves its frame, JS, CSS and pinned runtime. Browser requests do not invoke Git or a compiler.

```text
write → space Git commit → affected-demo jobs → compile + checks
      → immutable artifacts → approved publication pointer → cache invalidation

Next.js route → authorize + resolve metadata/publication
              → sandboxed frame → artifact CDN → compiled React demo
```

The existing production code already sets `ssr: false` for demo components in `src/components/DemoHost.tsx`. The remaining build coupling is generated `@/demos/loaders.generated`, plus `generateStaticParams()` and `dynamicParams = false` in `src/app/d/[slug]/page.tsx`. Those require a new Next build for new slugs even if the code is independently stored. The current `src/lib/catalog.ts` also imports the generated metadata registry.

## Required application changes

1. Replace generated catalogue imports with bounded/paginated metadata queries. Keep learner-safe public metadata separate from internal claims/reviews and build manifests.
2. Replace `DemoHost` component loaders with a reviewed `DemoFrame` loader consuming the authorized publication's frame URL. Retain near-viewport mounting/unmounting, active state and progress/event bridging from the feed. Do not import demo JS into the host page's execution context.
3. Remove whole-catalogue static slug enumeration as a requirement. Allow new dynamic route parameters and resolve known demos through the service/database. Unknown/unauthorized IDs fail closed. Start with request-time resolution; selectively cache public metadata or popular pages afterward. An explicit `dynamicParams = false` must not remain.
4. Publish through existing editorial, QA and approval rules after build success. Update a per-demo pointer atomically; invalidate only the relevant public metadata/page caches through an authenticated platform endpoint. Never use a full Next deployment as the demo publication mechanism.
5. Keep each mounted production frame pinned to its revision. New navigations get the new publication; author previews may reload the frame when a new build becomes ready. Rollback selects an earlier approved artifact and invalidates the same metadata caches without compiling.

Illustrative server-side shape; service functions represent the existing app's authorization and a future content-hub adapter:

```tsx
export const dynamicParams = true;

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const publication = await getAuthorizedPublication(slug);
  if (!publication) notFound();
  // URL is generated/allowlisted by the platform, never taken from a query parameter.
  return <DemoFrame publication={publication} />;
}
```

The real page retains its navigation and DemoCard shell; only the demo execution region changes. SSR still renders that surrounding page and metadata. Executable demo UI mounts inside its browser frame. Server-executed demo code, if actually needed, belongs in a separate isolated service with its own contract; this prototype does not provide it.

## What hot wiring means

This is artifact publication and runtime loading, separate from Next.js Fast Refresh. The artifact frame's import map pins React, the shared lesson kit and optional geo runtime to immutable URLs. The demo bundle exports its component; the pinned runtime creates the frame's React root. Host React is not shared across the frame boundary. There is no runtime installation of arbitrary Next routes or server modules, and no need for the host bundler to know the demo at build time.

Only changes to the host application or its supported bridge protocol need a Next deployment. Ordinary demo edits and new demos publish independently. Shared library releases are versioned; existing demos keep their pins unless explicitly rebuilt against a supported update. Security fixes still require an upgrade/support policy.

## Execution and data boundary

- Use a separate registrable artifact domain, not a subdomain that can receive application-domain cookies. Keep application credentials and privileged requests in Next.js/backend services.
- Sandbox frames with `allow-scripts` and without `allow-same-origin`; set a reviewed HTTP CSP and restrict outgoing connections. Do not treat local ports as production cookie isolation.
- Expose a small message protocol: ready, lifecycle, resize, prediction/progress and explicitly permitted data requests. Validate `event.source` against the mounted frame, message schema/size, bound demo/revision and a per-frame nonce. Opaque sandbox origins report `null`; that string is not identity.
- The host validates and persists progress; frame messages cannot authorize publication, backend access or privileged actions. Pass only data the viewer may access. Local compiler/test subprocesses are not a hostile-code sandbox; production workers need stronger isolation and resource/network controls.

## Relationship to the experiment

The real-catalogue benchmark compiles React artifacts and tests loading a preselected domain sample in frames. It does not replace production `DemoHost`, route generation, catalogue storage, authorization, editorial gates or progress persistence. Those application changes remain proposed for W-2171 review.

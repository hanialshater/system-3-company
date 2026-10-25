# Content hub prototype

R&D incubation · W-2026 · [issue #18](https://github.com/hanialshater/system-3-company/issues/18)

One Git repository per space. Scoped optimistic writes create commits and enqueue only affected demos. A separate worker compiles and tests committed snapshots. Immutable artifacts are served on demand; per-demo publication pointers control releases and rollback.

## Run

From the repository root, after installing the existing locked dependencies:

```sh
npm ci --ignore-scripts --cache /tmp/content-hub-npm-cache
node src/lab/content-hub/server.mjs
```

Open http://127.0.0.1:4310. Default state is `/tmp/s3-content-hub-preview`; optionally pass another absolute directory. `CONTENT_HUB_PORT` selects the host port. The artifact server chooses a separate free port. Requires Node >=22.18 with built-in `node:sqlite`, Git and the existing TypeScript dependency. SQLite may print an experimental warning on older Node releases.

The first run creates a `research` space, two synthetic interactive TypeScript demos, a pinned local UI package, real test/build jobs, artifacts and initial publications. These fixtures are outside the editorial catalogue. Later runs retain state. Select alpha or beta, edit source and tests, save, run the worker, and publish a successful build. Changing a multiplier requires updating its test expectation. A failed compiler/test job leaves the previous publication available. Historical-build buttons require explicit rollback intent.

The web UI executes trusted local code. Do not expose this prototype publicly or use it to compile hostile submissions. The local control token and loopback origin checks are development controls, not a production authentication design.

## Verify

```sh
node --test src/lab/content-hub/test/hub.test.mjs
node src/lab/content-hub/scenario.mjs
PW_CHROMIUM_PATH=/usr/bin/chromium node src/lab/content-hub/test/browser.mjs
```

The browser script uses the existing Playwright dependency and an installed Chromium executable. Screenshots and browser results go to `artifacts/content-hub/`. Some execution sandboxes require network/socket permissions for Node subprocesses and local HTTP listeners, including tests; `spawnSync ... EPERM` can indicate that restriction.

## Layout

```text
<state>/
  spaces/<space>/.git/          source history, one repository per space
  spaces/<space>/demos/<demo>/ demo.json, index.ts, test.mjs
  spaces/<space>/packages/<name>/<version>/ package.json, index.ts
  metadata.sqlite             revision index, durable queue, builds, release pointers
  objects/<space>/<hash>/      immutable compiled module graphs
  work/                       disposable committed-source snapshots
```

`demo.json` defines `entry`, `test`, `sdk: "content-hub-dom-v1"` and exact dependency pins, e.g. `dependencies: { "ui": "1.0.0" }`. `@space/ui` imports resolve into that package version. Packages may declare their own pinned `dependencies`. Conflicting transitive pins and cycles fail. Existing package versions cannot be edited through the hub API; write a new version and explicitly update demo pins.

## API

```js
import { ContentHub } from './hub.mjs';
const hub = new ContentHub('/tmp/my-content-hub');
hub.createSpace('my-space');
const revision = hub.write('my-space', {
  expectedHead: hub.head('my-space'),
  scope: 'demos/my-demo',
  files: { /* complete demo.json, entry source and test files for a new demo */ },
});
const builds = hub.work();
// Select a successful build for the intended space/demo.
hub.publish('my-space', 'my-demo', builds[0].id, { expectedGeneration: 0 });
hub.close();
```

`write()` accepts text contents or `null` for deletions, validates the entire patch before writes, and rejects stale HEADs, dirty repositories, traversal and files outside its scope. Supported scopes are `demos/<id>`, `packages/<name>/<exact-version>`, and `docs`. Scope selection is a capability input here; production must derive permitted scopes from authenticated authorization.

The cache identity includes selected demo files, transitive pinned package sources, compiler source, TypeScript version, Node version and SDK version. Repository commit SHA is provenance, not the cache identity. Every cache-hit job still records the commit being built. Tests are part of the inputs; reuse requires an earlier successful job in the same space and demo. Artifact hashes cover manifests, and manifests cover every emitted file's bytes.

Writes save Git history before queue indexing. `reconcile(space)` uses unindexed commits as a durable outbox and indexes each revision once. The standalone worker reconciles all spaces on restart, then resumes queued/interrupted jobs. Run only one worker per state directory; distributed leases are not implemented. Publishing uses a SQLite transaction and expected-generation compare-and-swap. Stale source builds require explicit historical/rollback intent. Publishing changes no artifact bytes and invokes no compiler.

The prototype compiler type-checks TypeScript, rewrites static imports to the resolved relative `.js` paths, emits ESM and runs the compiled Node tests before storing browser files. It does not bundle all code into one file. It supports the synthetic DOM SDK and pinned local packages; production React/TSX, CSS, assets and npm-registry integration are separate work. See the existing sandbox/CDN spike for React/kit compatibility. Static imports only; browser Node builtins, dynamic imports and imports outside the selected snapshot fail.

The host page fetches publication state and loads a frame whose module graph comes from the artifact origin. Frames have opaque sandboxed origins, a CSP and no network-connect allowance. Reads never call the worker. No secrets are passed to builds; test and compiler subprocesses have timeouts, but those subprocesses are not a security sandbox.

## Limits and next decision

The [one-demo deployment preparation](../../../company/rnd/content-hub/deployment-status.md) connects the actual hub to a trusted React compiler profile and a separately buildable Next.js host. It passes local A/B publication and rollback checks. Vercel team connection authorization is required before any live deployment. `ContentHub` accepts an operator-selected `compiler`, `sdk` and `compilerIdentityExtra`; these are trusted process configuration, never inputs accepted from demo authors. The default worker/preview remain DOM-profile tools. The React pilot uses its explicit operator runner.

The subsequent [real-catalogue experiment](../../../company/rnd/content-hub/catalogue-results.md) bundled all 1,645 available React demos and exercised 1,000 labelled growth copies. It is a separate lab compiler/index adapter, not a completed integration into the original DOM hub or production Next.js routes. [Next.js integration proposal](../../../company/rnd/content-hub/nextjs-architecture.md).

```sh
# Use a fresh output parent; the harness freezes source into an isolated Git repository.
node src/lab/content-hub/catalogue-bench.mjs --out=artifacts/content-hub-catalogue/dist
node src/lab/content-hub/catalogue-browser.mjs
node src/lab/content-hub/catalogue-audit.mjs
```

The benchmark uses existing TypeScript and Next-vendored webpack/terser, with compiler helpers exported from `spike/build.mjs`. It does not modify the original spike CLI behavior. Browser checks use the preselected 14-domain sample on two viewports; the graph audit compares that sample's actual webpack-resolved source files against the static index. Growth copies are never published.

- This is a local feasibility prototype, not million-demo throughput evidence. Impact analysis currently scans snapshots and compares demo keys; production needs path/dependency indexes, event-driven scheduling, limits and measured queue capacity.
- Git repositories are local directories, not a replicated/sharded Git farm. No production auth, tenant quotas, Git push service, distributed locking, remote package registry, real object store/CDN, SSR workers or garbage collection.
- Artifact reads verify bytes from disk; production should verify at ingest and rely on immutable storage/CDN integrity policies. The local host's catalogue UI is intentionally limited to the two fixtures; the core API creates arbitrary demo IDs.
- Compiler upgrades have no automatic re-enqueue policy. Package immutability is enforced by the hub write API; direct filesystem/Git administration remains trusted. Source is text-only in this prototype.
- Removing source does not silently withdraw a published artifact; an explicit production withdrawal policy is needed.
- Production must use an isolated build service and a separate registrable artifact domain, preserve existing editorial/QA/claims gates, and define SDK support/security upgrade policy. Synthetic tests here do not substitute for those gates.

R&D lead owns independent acceptance (W-2027); principal engineer owns compatibility, production boundaries and EDD-003 integration (W-2028). No production imports or protected paths changed.

## Budget, prior art and licence

Zero new npm dependencies; Node built-ins and the repository's TypeScript/Playwright installations. Standalone lab code is not included in the host application bundle. Budget for this spike: one implementation, two fixture demos, one worker, no paid infrastructure or evolution generations.

Original prototype code. Git's content-addressed history, TypeScript's compiler API and immutable content-addressed artifact delivery are the relevant prior art; no external implementation was copied. Git is executed as a separate tool; TypeScript and Playwright retain their existing Apache-2.0 licences. Repository-local antecedents: [EDD-003](../../../company/engineering/edd/EDD-003-lesson-storage-at-scale.md), [SPIKE-001](../../../company/engineering/spikes/SPIKE-001-frontend-sandbox.md), and [R&D brief](../../../company/rnd/content-hub/brief.md).

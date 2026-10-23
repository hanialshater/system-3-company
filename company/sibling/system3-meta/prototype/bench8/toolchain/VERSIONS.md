# Benchmark 8 toolchain

Both arms and the hidden runner run Clojure only through `clj-run` (this directory). No other jars, no build tool
(Leiningen, deps.edn/tools.deps and Clojars are not available), no AOT-compiled classes.

| Artifact (Maven Central, org.clojure) | Version | sha256 | sha1 (= Maven Central's .sha1) |
|---|---|---|---|
| clojure | 1.12.6 | 21b578db389a8e74b286ce79c4a7f86ec641e26d88b12f18d69030916b0e18ca | ea744fe01a09db46021b07c4aadf072698bf7a75 |
| spec.alpha | 0.5.238 | 94cd99b6ea639641f37af4860a643b6ed399ee5a8be5d717cff0b663c8d75077 | 4eb5dea521c4e6e1f68c2c47517f14a922003e60 |
| core.specs.alpha | 0.4.74 | eb73ac08cf49ba840c88ba67beef11336ca554333d9408808d78946e0feb9ddb | d56a8d4c666ff8140e6d0a62d41263134be39254 |

spec.alpha 0.5.238 and core.specs.alpha 0.4.74 are the versions clojure-1.12.6.pom depends on. clojure 1.12.6 was
published on 2026-09-02.

JVM: OpenJDK 21.0.12.1 (Ubuntu 24.04 package), flags in clj-run: `-Xss64m -Xmx2g -XX:+UseSerialGC`.
clj-run clears JAVA_TOOL_OPTIONS (the proxy settings), so nothing it runs reaches the network.

## Startup (measured 2026-10-23, 4 CPUs)

| What | Wall time |
|---|---|
| `clj-run -e '(println (clojure-version))'` | 0.65-0.81 s |
| `clj-run -m hello.main` (a one-line namespace loaded from ./src) | 0.91-0.98 s |
| the same inside the hidden runner's sandbox (unshare + mounts + setpriv) | about 1.6 s |

A compiler's own source is compiled from .clj on every start, so a large compiler starts slower (several seconds
for a few thousand lines). That is why the contract has a batch mode: one JVM compiles many files.

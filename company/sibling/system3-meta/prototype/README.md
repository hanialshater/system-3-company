# System 3 Meta prototype

The tools of the Meta design, prototyped and tested. API: [../API.md](../API.md) · roles: [../ROLES.md](../ROLES.md) · evidence: ITERATIONS.md (simulator), LIVE.md, LIVE2.md, LIVE3.md (live runs with real agents).

```bash
node --test tests/*.test.mjs          # the tools' tests
node run.mjs --iteration=5 --seeds=20 # a simulator iteration (1-5)
node meta.mjs …                       # the CLI (see ../API.md §5)
node supervisor.mjs watch             # the code supervisor (see ../API.md §8)
```
Nothing in System 3 Company imports this folder.

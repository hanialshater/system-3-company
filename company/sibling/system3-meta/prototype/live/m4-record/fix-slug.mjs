// M4 attempt 1, operator intervention 1 (recorded): order new has no --slug, so ${slug} fell back to the task
// (LESSON-<slug>) and gates.mjs refused it (exit 2). Sets o.slug on the three orders under the kernel's lock.
const K = process.argv[2];
const { withLock, load, save } = await import(K + "/state.mjs");
withLock(() => { const co = load(); for (const o of co.engine.orders.values()) if (/^LESSON-/.test(o.task) && !o.slug) { o.slug = o.task.replace(/^LESSON-/, ""); co.log.add({ type: "operator", by: "meta-operator", order: o.id, what: `set slug=${o.slug}: order new takes no --slug, so \${slug} was the task (kernel fix follows)` }); console.log(o.id, o.slug); } save(co); });

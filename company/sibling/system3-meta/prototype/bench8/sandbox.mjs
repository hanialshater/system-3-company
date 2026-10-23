#!/usr/bin/env node
// Benchmark 8: the arms' sandbox (pilot fixes, 2026-10-23). The pilot found that the access hook alone does not close
// the benchmark: code an agent writes and runs could read the hidden tests (both arms ran as root), reach the network
// directly, compile C through `gcc @file` or `--language`, read the operator's logs in /tmp, and inherit this session's
// env. So every agent process of both arms now runs in the same box:
//   - its own uid (V 64081, S 64082), no capabilities, no new privileges;
//   - its own mount, pid and network namespaces (unshare): the root file system read-only; /tmp /home /root /mnt /opt
//     /srv /media /usr/local /var/tmp /var/log /var/cache /dev/shm /snap /boot replaced by empty tmpfs; only the arm's
//     own folders bound back in (read-write), and its read-only ones (the toolchain, the shims, the SDK, node);
//   - no C compiler: cc1, cc1plus, lto1 and the other gcc back ends are /dev/null, and /usr/lib/llvm-* is empty, so gcc
//     only assembles and links (as, collect2, ld are there) and clang does not exist;
//   - no network but one tunnel: the netns has only `lo`; a forwarder in the box (127.0.0.1:18080) leads to a unix
//     socket where the orderer's egress proxy (this file's `egress`, root, outside) allows CONNECT to the hosts in
//     ALLOW_HOSTS only (the model API), logging every request to _operator/egress-<arm>.jsonl;
//   - an env built from an allowlist (boxEnv): PATH (the shims first), HOME and TMPDIR (private), LANG, the proxy, the
//     CA bundle, the auth variables (AUTH_KEYS, plus B8_AUTH_ENV), and nothing of this session's (no CLAUDE_CODE_*
//     remote, messaging, debug, additional-directories or effort variables; effort is set by the SDK option instead).
// V: the harness (root) runs the Agent SDK in process; the SDK starts the claude CLI through spawnFor(), in the box.
// S: the whole launcher (supervisor, code stages, every session) runs in the box as S's uid; the hidden runner and the
// accept stage stay with the orderer (root) behind a broker socket (setup.mjs broker), which also writes the hook log.
//
//   node setup.mjs egress --arm=V|S --runs=<dir>     the egress proxy (root; setup.mjs and vanilla-compiler.mjs start it)
//   node setup.mjs box-check --arm=V|S [--runs] [--b8]  runs a battery of probes in the arm's box (no SDK session) and
//                                                    prints which hold; exit 1 if any fails
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SELF = fileURLToPath(import.meta.url);
export const ARM_UID = { V: 64081, S: 64082 };
export const ARM_USER = { V: "b8v", S: "b8s" };
export const PROXY_PORT = 18080;
export const ALLOW_HOSTS = ["api.anthropic.com:443"];
// the auth variables an arm's CLI may get (the same for both arms); B8_AUTH_ENV=NAME,… adds more, B8_AUTH_FILES=
// <src>:<dst under HOME>,… copies credential files into the arm's private HOME (mode 600, the arm's uid)
export const AUTH_KEYS = ["ANTHROPIC_API_KEY", "ANTHROPIC_AUTH_TOKEN", "CLAUDE_CODE_OAUTH_TOKEN", "ANTHROPIC_BASE_URL"];
const authKeys = () => [...new Set([...AUTH_KEYS, ...String(process.env.B8_AUTH_ENV ?? "").split(",").map((x) => x.trim()).filter(Boolean)])];
export const NODE_DIR = path.dirname(path.dirname(process.execPath)); // /opt/node22
const HIDE = ["/tmp", "/home", "/root", "/mnt", "/srv", "/media", "/opt", "/usr/local", "/var/tmp", "/var/log", "/var/cache", "/var/lib/docker", "/dev/shm", "/snap", "/boot"];

export function boxPaths(P, arm) {
  const box = path.join(P.runs, "_box", arm), sock = path.join(P.runs, "_sock", arm);
  return { box, bin: path.join(box, "bin"), home: path.join(box, "home"), tmp: path.join(box, "tmp"), log: path.join(box, "log"), sock, egress: path.join(sock, "egress.sock"), broker: path.join(sock, "broker.sock"), script: path.join(box, "bin", "box.sh"), fwd: path.join(box, "bin", "fwd.mjs"), passwd: path.join(box, "bin", "passwd"), group: path.join(box, "bin", "group"), shimLog: path.join(box, "log", "shim.jsonl"), uid: ARM_UID[arm], user: ARM_USER[arm] };
}

// The box: run as root by `unshare -m -n -p -f --mount-proc`, it builds the view and drops to the arm's uid.
//   box.sh <spec file> <uid> <cwd> <egress socket> -- cmd…   spec lines: `rw|ro <src> <dst>`, `null <file>`, `tmpfs <dir>`
const BOX = `#!/bin/sh
set -e
SPEC=$(cat "$1"); U=$2; CWD=$3; EGRESS=$4; FWD=$5; shift 5; [ "$1" = "--" ] && shift
mount --make-rprivate /
python3 -I -c 'import socket,fcntl,struct; s=socket.socket(socket.AF_INET,socket.SOCK_DGRAM); fcntl.ioctl(s.fileno(),0x8914,struct.pack("16sh",b"lo",0x49))'
mount -t tmpfs -o mode=755,size=8m tmpfs /run
mkdir /run/b8s
i=0
while read kind src dst; do
  case "$kind" in rw|ro) i=$((i+1)); if [ -d "$src" ]; then mkdir /run/b8s/$i; else : > /run/b8s/$i; fi; mount --bind "$src" /run/b8s/$i;; esac
done <<EOF
$SPEC
EOF
for d in ${HIDE.join(" ")}; do [ -d "$d" ] && mount -t tmpfs -o mode=1777,size=2g tmpfs "$d"; done
i=0
while read kind src dst; do
  case "$kind" in
    rw|ro) i=$((i+1)); if [ -d /run/b8s/$i ]; then mkdir -p "$dst"; else mkdir -p "$(dirname "$dst")"; [ -e "$dst" ] || : > "$dst"; fi
           mount --bind /run/b8s/$i "$dst"; [ "$kind" = ro ] && mount -o remount,bind,ro "$dst";;
    null) [ -e "$src" ] && mount --bind /dev/null "$src";;
    tmpfs) [ -d "$src" ] && mount -t tmpfs -o mode=755,size=1m tmpfs "$src";;
  esac
done <<EOF
$SPEC
EOF
while [ $i -gt 0 ]; do umount -l /run/b8s/$i; i=$((i-1)); done
mount -o remount,bind,ro /
mount -o remount,ro /run
DROP="setpriv --reuid=$U --regid=$U --clear-groups --inh-caps=-all --bounding-set=-all --no-new-privs --"
$DROP ${NODE_DIR}/bin/node "$FWD" ${PROXY_PORT} "$EGRESS" </dev/null >/dev/null 2>&1 &
python3 -I -c 'import socket,time
for k in range(200):
    try: socket.create_connection(("127.0.0.1",${PROXY_PORT}),0.2).close(); break
    except OSError: time.sleep(0.025)'
cd "$CWD"
exec $DROP "$@"
`;
// the forwarder inside the box: 127.0.0.1:<port> to the egress proxy's unix socket
const FWD = `import net from "node:net";
const [port, sock] = process.argv.slice(2);
net.createServer((c) => { const u = net.connect(sock); c.pipe(u); u.pipe(c); u.on("error", () => c.destroy()); c.on("error", () => u.destroy()); }).listen(Number(port), "127.0.0.1");
`;

/** The read-write and read-only folders of arm `arm`'s box (same paths inside as outside). */
export function boxBinds(P, arm, extraRo = []) {
  const B = boxPaths(P, arm);
  const rw = arm === "V" ? [P.V, B.home, B.tmp, B.log, B.sock] : [P.S, B.home, B.tmp, B.log, B.sock];
  const ro = [P.toolchain, P.shim(arm), B.bin, NODE_DIR, ...(arm === "S" ? [path.join(P.S, "proto"), P.harness] : []), ...extraRo];
  return { rw, ro, files: [[B.passwd, "/etc/passwd"], [B.group, "/etc/group"]] };
}
/** The gcc back ends and clang, hidden in every box: gcc then only assembles and links. */
export function compilerHides() {
  const out = { null: [], tmpfs: [] };
  for (const root of ["/usr/libexec/gcc", "/usr/lib/gcc"]) {
    let ts = []; try { ts = fs.readdirSync(root); } catch { continue; }
    for (const t of ts) { let vs = []; try { vs = fs.readdirSync(path.join(root, t)); } catch { continue; } for (const v of vs) for (const f of ["cc1", "cc1plus", "cc1obj", "cc1objplus", "lto1", "f951", "d21", "go1", "gnat1", "jc1", "cc1gm2", "rust1"]) { const p = path.join(root, t, v, f); if (fs.existsSync(p)) out.null.push(p); } }
  }
  for (const d of fs.readdirSync("/usr/lib")) if (/^llvm(-\d+)?$/.test(d)) out.tmpfs.push(path.join("/usr/lib", d));
  for (const f of ["/usr/bin/tcc", "/usr/bin/pcc", "/usr/bin/zig"]) if (fs.existsSync(f)) out.null.push(f);
  return out;
}
const chown = (p, uid) => spawnSync("chown", ["-R", `${uid}:${uid}`, p]);
/** Make the box's own files (once per arm and run: idempotent). */
export function prepareBox(P, arm) {
  const B = boxPaths(P, arm);
  // the closed areas are root's alone (pilot fix: <b8>/hidden was 755/644); the boxes do not mount them anyway
  fs.mkdirSync(P.op, { recursive: true });
  for (const d of [P.b8, P.op]) if (fs.existsSync(d)) fs.chmodSync(d, 0o700);
  for (const d of [B.bin, B.home, B.tmp, B.log, B.sock]) fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(B.script, BOX, { mode: 0o755 });
  fs.writeFileSync(B.fwd, FWD, { mode: 0o644 });
  const pw = fs.readFileSync("/etc/passwd", "utf8").split("\n").filter((l) => l && !l.startsWith(`${B.user}:`));
  fs.writeFileSync(B.passwd, [...pw, `${B.user}:x:${B.uid}:${B.uid}:Benchmark 8 arm ${arm}:${B.home}:/bin/bash`].join("\n") + "\n");
  const gr = fs.readFileSync("/etc/group", "utf8").split("\n").filter((l) => l && !l.startsWith(`${B.user}:`));
  fs.writeFileSync(B.group, [...gr, `${B.user}:x:${B.uid}:`].join("\n") + "\n");
  // the CLI's git: who commits, and no safe.directory surprises
  fs.writeFileSync(path.join(B.home, ".gitconfig"), `[user]\n\tname = B8 ${arm}\n\temail = ${arm.toLowerCase()}@b8.invalid\n[init]\n\tdefaultBranch = main\n`);
  for (const spec of String(process.env.B8_AUTH_FILES ?? "").split(",").map((x) => x.trim()).filter(Boolean)) {
    const [src, dst] = spec.split(":"); if (!src || !dst) continue;
    const d = path.join(B.home, dst); fs.mkdirSync(path.dirname(d), { recursive: true }); fs.copyFileSync(src, d); fs.chmodSync(d, 0o600);
  }
  for (const d of [B.home, B.tmp, B.log, B.sock]) chown(d, B.uid);
  fs.chmodSync(B.sock, 0o700);
  return B;
}
/** The arm's whole env (an allowlist: nothing else of the operator's env reaches an agent). */
export function boxEnv(P, arm, extra = {}) {
  const B = boxPaths(P, arm), proxy = `http://127.0.0.1:${PROXY_PORT}`;
  const env = {
    PATH: `${P.shim(arm)}:${NODE_DIR}/bin:/usr/bin:/bin`, HOME: B.home, USER: B.user, LOGNAME: B.user, SHELL: "/bin/bash", LANG: "C.UTF-8", LC_ALL: "C.UTF-8", TERM: "dumb", TMPDIR: B.tmp,
    HTTPS_PROXY: proxy, HTTP_PROXY: proxy, https_proxy: proxy, http_proxy: proxy, NO_PROXY: "", no_proxy: "",
    SSL_CERT_FILE: "/etc/ssl/certs/ca-certificates.crt", NODE_EXTRA_CA_CERTS: "/etc/ssl/certs/ca-certificates.crt",
    CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1", DISABLE_AUTOUPDATER: "1", DISABLE_TELEMETRY: "1", DISABLE_ERROR_REPORTING: "1",
    B8_ARM: arm, B8_SHIM_LOG: B.shimLog, B8_ISOLATION: "box",
  };
  for (const k of authKeys()) if (process.env[k] != null) env[k] = process.env[k];
  return { ...env, ...extra };
}
/** Names of the env variables an arm gets (for the ledger: values of auth variables are never recorded). */
export const boxEnvNames = (P, arm) => Object.keys(boxEnv(P, arm)).sort();

/** [bin, args] that run `cmd` (an argv) in arm `arm`'s box with cwd `cwd`; extraRo are more read-only binds. */
export function boxArgv(P, arm, cwd, cmd, { extraRo = [], killSignal = "SIGTERM" } = {}) {
  const B = prepareBox(P, arm), b = boxBinds(P, arm, extraRo), h = compilerHides();
  const lines = [...b.rw.map((d) => `rw ${d} ${d}`), ...b.ro.filter((d) => fs.existsSync(d)).map((d) => `ro ${d} ${d}`), ...b.files.map(([s, d]) => `ro ${s} ${d}`), ...h.null.map((f) => `null ${f}`), ...h.tmpfs.map((d) => `tmpfs ${d}`)];
  for (const l of lines) if (/\s/.test(l.split(" ").slice(1).join("").replace(/ /g, ""))) throw new Error(`sandbox: a path with spaces: ${l}`);
  const spec = path.join(B.bin, `spec-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.txt`);
  fs.writeFileSync(spec, lines.join("\n") + "\n");
  return ["unshare", ["-m", "-n", "-p", "-f", "--mount-proc", `--kill-child=${killSignal}`, "--", "/bin/sh", B.script, spec, String(B.uid), cwd, B.egress, B.fwd, "--", ...cmd]];
}
/** The Agent SDK's spawnClaudeCodeProcess for arm V: the CLI in the box, its stderr to the operator's log. */
export function spawnFor(P, arm, { stderrLog } = {}) {
  return (o) => {
    const dir = path.dirname(o.command);
    const extraRo = dir.startsWith("/usr/") || dir.startsWith(NODE_DIR) ? [] : [dir];
    const [bin, args] = boxArgv(P, arm, o.cwd ?? P.V, [o.command, ...o.args], { extraRo });
    const ch = spawn(bin, args, { env: o.env, stdio: ["pipe", "pipe", "pipe"], signal: o.signal });
    ch.stderr.on("data", (d) => { if (stderrLog) try { fs.mkdirSync(path.dirname(stderrLog), { recursive: true }); fs.appendFileSync(stderrLog, d); } catch {} });
    return ch;
  };
}

// ---------------------------------------------------------------- the egress proxy (root, outside every box)
export function egressServer({ sock, log, allow = ALLOW_HOSTS, uid = null }) {
  const ok = new Set(allow.map((x) => x.toLowerCase()));
  try { fs.rmSync(sock, { force: true }); } catch {}
  const note = (x) => { try { fs.mkdirSync(path.dirname(log), { recursive: true }); fs.appendFileSync(log, JSON.stringify({ t: new Date().toISOString(), ...x }) + "\n"); } catch {} };
  const srv = net.createServer((c) => {
    let buf = Buffer.alloc(0);
    c.on("error", () => {});
    const onData = (d) => {
      buf = Buffer.concat([buf, d]);
      const i = buf.indexOf("\r\n\r\n");
      if (i < 0) { if (buf.length > 16384) c.destroy(); return; }
      c.removeListener("data", onData);
      const head = buf.subarray(0, i).toString("latin1"), rest = buf.subarray(i + 4);
      const m = head.match(/^CONNECT ([A-Za-z0-9.-]+):(\d+) HTTP\/1\.[01]\r?$/m);
      const target = m ? `${m[1].toLowerCase()}:${m[2]}` : null;
      const allowed = !!target && ok.has(target);
      note({ target: target ?? head.split("\r\n")[0].slice(0, 200), allowed });
      if (!allowed) { c.end("HTTP/1.1 403 Forbidden\r\nContent-Length: 0\r\nConnection: close\r\n\r\n"); return; }
      const u = net.connect(Number(m[2]), m[1], () => { c.write("HTTP/1.1 200 Connection Established\r\n\r\n"); if (rest.length) u.write(rest); c.pipe(u); u.pipe(c); });
      u.on("error", () => c.destroy()); c.on("close", () => u.destroy());
    };
    c.on("data", onData);
  });
  srv.listen(sock, () => { fs.chmodSync(sock, 0o600); if (uid != null) spawnSync("chown", [`${uid}:${uid}`, sock]); });
  return srv;
}
/** Start the egress proxy for arm `arm` as a child process (killed when this process exits); waits for its socket. */
export function startEgress(P, arm) {
  const B = prepareBox(P, arm);
  try { fs.rmSync(B.egress, { force: true }); } catch {}
  const ch = spawn(process.execPath, [path.join(path.dirname(SELF), "setup.mjs"), "egress", `--arm=${arm}`, `--runs=${P.runs}`, `--b8=${P.b8}`], { stdio: "ignore", detached: false });
  process.on("exit", () => { try { ch.kill("SIGKILL"); } catch {} });
  for (let k = 0; k < 100 && !fs.existsSync(B.egress); k++) spawnSync("sleep", ["0.05"]);
  if (!fs.existsSync(B.egress)) throw new Error("sandbox: the egress proxy did not start");
  return ch;
}

// ---------------------------------------------------------------- check: the box's promises, probed (no SDK session)
export async function check(P, arm) {
  prepareBox(P, arm);
  const egress = startEgress(P, arm);
  const own = arm === "V" ? P.V : path.join(P.S, "scratch");
  fs.mkdirSync(own, { recursive: true });
  let broker = null;
  if (arm === "S") {
    // S's box holds the frozen kernel and harness; the broker (root) answers the hook's log lines
    const H = path.dirname(SELF), S = await import("./setup.mjs");
    if (!fs.existsSync(path.join(P.sproto, "meta.mjs"))) S.freezeKernel(P);
    fs.mkdirSync(P.harness, { recursive: true });
    for (const f of ["setup.mjs", "sandbox.mjs", "visible-check.mjs", "contract.mjs"]) fs.copyFileSync(path.join(H, f), path.join(P.harness, f));
    try { fs.rmSync(boxPaths(P, "S").broker, { force: true }); } catch {}
    broker = spawn(process.execPath, [path.join(H, "setup.mjs"), "broker", "--arm=S", `--runs=${P.runs}`, `--b8=${P.b8}`], { stdio: "ignore" });
    for (let k = 0; k < 100 && !fs.existsSync(boxPaths(P, "S").broker); k++) spawnSync("sleep", ["0.05"]);
  }
  chown(arm === "V" ? own : P.S, ARM_UID[arm]);
  const probe = (name, sh, want) => ({ name, sh, want });
  const hiddenFile = path.join(P.b8, "hidden", "manifest.json");
  const probes = [
    probe("runs as the arm's uid", "id -u", (o) => o.out.trim() === String(ARM_UID[arm])),
    probe("own folder writable", `echo x > ${own}/.b8probe && cat ${own}/.b8probe && rm ${own}/.b8probe`, (o) => o.code === 0 && o.out.trim() === "x"),
    probe("toolchain read-only", `touch ${P.toolchain}/x`, (o) => o.code !== 0),
    probe("hidden tests absent", `cat ${hiddenFile}`, (o) => o.code !== 0),
    probe("b8 folder absent", `ls ${P.b8}`, (o) => o.code !== 0 || !o.out.trim()),
    probe("operator folder absent", `ls ${P.op}`, (o) => o.code !== 0 || !o.out.trim()),
    probe("the other arm absent", `ls ${arm === "V" ? P.S : P.V}`, (o) => o.code !== 0 || !o.out.trim()),
    probe("/tmp holds nothing of the host", "ls -A /tmp | grep -v '^claude-0$' | head -3; ls /tmp/claude-code.log", (o) => !/claude-code\.log$/m.test(o.out) && o.code !== 0),
    probe("/home, /root, /mnt empty", "ls -A /home /root /mnt | grep -v ':$' | grep -v '^$' | head", (o) => !o.out.trim()),
    probe("no host processes", "ls /proc | grep -cE '^[0-9]+$'", (o) => Number(o.out.trim()) < 10),
    probe("cc1 does not run (gcc on C fails)", `printf 'int main(){return 0;}' > ${own}/p.c && /usr/bin/gcc ${own}/p.c -o ${own}/p; r=$?; rm -f ${own}/p.c ${own}/p; exit $r`, (o) => o.code !== 0),
    probe("gcc --language=c fails", `printf 'int main(){return 0;}' > ${own}/p.txt && /usr/bin/gcc --language=c -S ${own}/p.txt -o ${own}/p.s; r=$?; rm -f ${own}/p.txt ${own}/p.s; exit $r`, (o) => o.code !== 0),
    probe("clang absent", "/usr/bin/clang --version", (o) => o.code !== 0),
    probe("gcc assembles and links", `printf '.globl main\\nmain:\\n xor %%eax,%%eax\\n ret\\n.section .note.GNU-stack,"",@progbits\\n' > ${own}/p.s && /usr/bin/gcc ${own}/p.s -o ${own}/p && ${own}/p; r=$?; rm -f ${own}/p.s ${own}/p; exit $r`, (o) => o.code === 0),
    probe("Clojure runs", `cd ${own} && ${P.clj} -e '(println (+ 1 2))'`, (o) => o.out.trim() === "3"),
    probe("no direct network (python)", `python3 -I -c "import urllib.request; urllib.request.urlopen('https://raw.githubusercontent.com/', timeout=5)"`, (o) => o.code !== 0),
    probe("no direct network (node fetch to github, no proxy)", `env -u HTTPS_PROXY -u https_proxy node -e "fetch('https://github.com').then(()=>process.exit(0),()=>process.exit(3))"`, (o) => o.code !== 0),
    probe("proxy refuses github", "/usr/bin/curl -sS -o /dev/null -w '%{http_code}' --max-time 10 https://github.com/", (o) => o.code !== 0),
    probe("proxy reaches the model API", "/usr/bin/curl -sS -o /dev/null -w '%{http_code}' --max-time 15 https://api.anthropic.com/v1/models", (o) => /^(401|403|404|200)$/.test(o.out.trim())),
    probe("no session env", "env | cut -d= -f1 | grep -v '^CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC$' | grep -E '^(CLAUDE_CODE_|CLAUDECODE|CLAUDE_ADDITIONAL|JAVA_TOOL_OPTIONS|GH_TOKEN|GITHUB_TOKEN|AWS_|CLOUDSDK_)' | head", (o) => !o.out.trim()),
    probe("root file system read-only", "touch /usr/bin/b8probe", (o) => o.code !== 0),
    probe("the disk device unreadable", "head -c 1 /dev/vda >/dev/null", (o) => o.code !== 0),
  ];
  if (arm === "S") {
    const B = boxPaths(P, "S"), hook = (input) => `printf '%s' '${JSON.stringify(input).replace(/'/g, "")}' | node ${P.harness}/setup.mjs hook --arm=S --runs=${P.runs} --b8=${P.b8} --proto=${P.sproto} --broker=${B.broker}`;
    probes.push(
      probe("the frozen kernel is read-only", `ls ${P.sproto}/meta.mjs && touch ${P.sproto}/x`, (o) => o.code !== 0 && /meta\.mjs/.test(o.out)),
      probe("the harness is read-only", `touch ${P.harness}/x`, (o) => o.code !== 0),
      probe("the launcher's SDK binary runs", `${P.sproto}/launcher/node_modules/@anthropic-ai/claude-agent-sdk-linux-x64/claude --version`, (o) => o.code === 0),
      probe("the hook allows S's own file (logged via the broker)", hook({ tool_name: "Read", tool_input: { file_path: `${own}/x.clj` }, cwd: own, session_id: "check" }), (o) => o.code === 0),
      probe("the hook denies a hidden file", hook({ tool_name: "Read", tool_input: { file_path: path.join(P.b8, "hidden", "manifest.json") }, cwd: own, session_id: "check" }), (o) => o.code === 2),
      probe("the hook denies an MCP tool", hook({ tool_name: "mcp__github__get_file_contents", tool_input: {}, cwd: own, session_id: "check" }), (o) => o.code === 2),
      probe("the hook fails closed on unreadable input", `printf 'not json' | node ${P.harness}/setup.mjs hook --arm=S --runs=${P.runs} --proto=${P.sproto} --broker=${B.broker}`, (o) => o.code === 2),
      probe("git works as S's uid", `cd ${own} && rm -rf g && mkdir g && cd g && git init -q && echo a > a && git add a && git commit -qm a && git log --oneline | wc -l; cd .. && rm -rf g`, (o) => o.out.trim() === "1"),
    );
  }
  const out = [];
  for (const p of probes) {
    const [bin, args] = boxArgv(P, arm, own, ["/bin/sh", "-c", p.sh]);
    const r = spawnSync(bin, args, { env: boxEnv(P, arm), encoding: "utf8", timeout: 60_000 });
    const o = { code: r.status, out: String(r.stdout ?? ""), err: String(r.stderr ?? "") };
    out.push({ name: p.name, ok: !!p.want(o), code: o.code, out: o.out.trim().slice(0, 160), err: o.ok ? "" : o.err.trim().slice(0, 200) });
  }
  try { egress.kill(); } catch {} try { broker?.kill(); } catch {}
  return { arm, probes: out, failed: out.filter((x) => !x.ok).map((x) => x.name) };
}

// ---------------------------------------------------------------- --isolation=hooks (the default since 2026-10-23)
// The box above needs the model API reachable from inside a network namespace, through the egress tunnel, with the
// CLI's credentials in an allowlisted env. In this container the model API is reached through the host's proxy and the
// session's own credentials, and the founder's operator decided not to chain the box through that proxy: no session can
// authenticate in a box. So `--isolation=hooks` (PROTOCOL.md "Isolation deviation") runs both arms' sessions without
// the box, the way Benchmarks 6 and 7 ran: the normal Agent SDK query() (no spawnClaudeCodeProcess), as this process's
// user (root), with this process's env minus the launcher's four variables (launch.mjs) and the context variables
// below. What the box enforced is then enforced by the access hook (PreToolUse, and V's canUseTool), the PATH shims
// for code the agents run, and the audit after the run; identical for both arms. `--isolation=box` keeps the box.
export const ISOLATIONS = ["hooks", "box"];
/** The run's isolation: --isolation, else B8_ISOLATION, else "hooks". */
export function isolationOf(opt = {}) {
  const m = String(opt.isolation ?? process.env.B8_ISOLATION ?? "hooks");
  if (!ISOLATIONS.includes(m)) throw new Error(`--isolation takes ${ISOLATIONS.join("|")} (got ${m})`);
  return m;
}
export const hooksMode = () => isolationOf() === "hooks";
// launch.mjs's rule (Benchmark 5): an agent is its own Claude Code process, not a child of the operator's session
export const LAUNCHER_STRIP = ["CLAUDECODE", "CLAUDE_CODE_SESSION_ID", "CLAUDE_AUTO_BACKGROUND_TASKS", "CLAUDE_CODE_BG_TASKS_REPORT_RUNNING"];
// the pilot's env findings that are not credentials: a CLAUDE.md channel (additional directories), the effort and
// compaction overrides (effort is the SDK option for both arms), the messaging channel to the operator's session,
// debug logs, Java's proxy options, and tokens for other services. B8_KEEP_ENV=NAME,… keeps one if a session needs it.
// CLAUDE_CODE_REMOTE_SESSION_ID (found by the hooks-mode probe, 2026-10-23): the SDK and the CLI derive the session id
// from it (a UUID v5), so with it every session of both arms got the operator's session id: one transcript file per
// project folder, the access log's `sid` the same for every session, and a resume that could pick the wrong one.
export const CONTEXT_STRIP = ["CLAUDE_CODE_REMOTE_SESSION_ID", "CLAUDE_ADDITIONAL_DIRECTORIES", "CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD", "CLAUDE_EFFORT", "MAX_THINKING_TOKENS", "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE", "CLAUDE_AFTER_LAST_COMPACT", "CLAUDE_CODE_MESSAGING_SOCKET", "CLAUDE_CODE_MESSAGING_TOKEN", "CLAUDE_CODE_DEBUG", "CLAUDE_CODE_DIAGNOSTICS_FILE", "CLAUDE_CODE_TEE_SDK_STDOUT", "JAVA_TOOL_OPTIONS", "GH_TOKEN", "GITHUB_TOKEN", "GIT_ASKPASS", "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "CLOUDSDK_AUTH_ACCESS_TOKEN", "NODE_TEST_CONTEXT", "META_ROLE", "META_LAUNCH", "META_STATE", "META_LIVE_DIR", "B8_HOME"];
/** Make the arm's own folders that hooks mode uses (its TMPDIR, its shim log): no uid, no chown. */
export function prepareHooks(P, arm) {
  const B = boxPaths(P, arm);
  fs.mkdirSync(P.op, { recursive: true });
  for (const d of [P.b8, P.op]) if (fs.existsSync(d)) fs.chmodSync(d, 0o700);
  for (const d of [B.tmp, B.log, B.sock]) fs.mkdirSync(d, { recursive: true }); // B.sock: the broker's socket (root only)
  fs.chmodSync(B.sock, 0o700);
  return B;
}
/** The arm's env in hooks mode: this process's env minus LAUNCHER_STRIP and CONTEXT_STRIP (and GIT_CONFIG_*, which
 *  carry the operator's git credentials and proxy), with the shims first on PATH and a TMPDIR of the arm's own. */
export function hooksEnv(P, arm, extra = {}) {
  const B = boxPaths(P, arm), keep = new Set(String(process.env.B8_KEEP_ENV ?? "").split(",").map((x) => x.trim()).filter(Boolean));
  const env = { ...process.env };
  for (const k of [...LAUNCHER_STRIP, ...CONTEXT_STRIP]) if (!keep.has(k) || LAUNCHER_STRIP.includes(k)) delete env[k];
  for (const k of Object.keys(env)) if (/^GIT_CONFIG_(COUNT|KEY_\d+|VALUE_\d+)$/.test(k) && !keep.has(k)) delete env[k];
  Object.assign(env, { PATH: `${P.shim(arm)}:${process.env.PATH ?? "/usr/bin:/bin"}`, TMPDIR: B.tmp, B8_ARM: arm, B8_SHIM_LOG: B.shimLog, B8_ISOLATION: "hooks", CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1", DISABLE_AUTOUPDATER: "1" });
  return { ...env, ...extra };
}
/** The arm's session env in the run's isolation. */
export const armEnvFor = (P, arm, extra = {}) => (hooksMode() ? hooksEnv(P, arm, extra) : boxEnv(P, arm, extra));
/** Names of the env variables an arm gets, in the run's isolation (values are never recorded). */
export const armEnvNames = (P, arm) => Object.keys(armEnvFor(P, arm)).sort();
/** Prepare the arm for the run's isolation (the box, or hooks mode's folders). */
export const prepareArm = (P, arm) => (hooksMode() ? prepareHooks(P, arm) : prepareBox(P, arm));

// The CLI lives in setup.mjs (setup.mjs imports this module): `setup.mjs egress --arm=…` and `setup.mjs box-check --arm=…`.

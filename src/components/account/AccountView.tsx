"use client";

// "Keep my history": age screen -> email -> link; once signed in, the merge screen (what moves, with a real
// "Don't import"), export, import a file, sign out, and delete. EDD-008 §6.2, §7-§9; privacy gate P1.3-P1.5, P2.1-P2.3;
// PRD-005 privacy ruling C5.2 (saves are their own line with their own choice).
// Copy is a functional placeholder for growth-designer (E5). Nothing here reads ACCOUNTS_ENABLED: if /me is 404,
// the page says accounts are not available and offers nothing (C5).
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ProgressMap } from "@/kit/progress";
import {
  AGEBAND_KEY,
  accountMe,
  accountState,
  afterAccountDeleted,
  answerMerge,
  importHistoryFile,
  signOut,
  type AccountState,
  type SignedInMe,
} from "@/lib/account-client";

/** The policy version the learner is shown and accepts. Must be one the server publishes (auth.ts, M6). */
const POLICY_VERSION = "draft-2026-10-16";

type Band = "under-13" | "13-15" | "16+";

/** Birth year -> band, by the youngest age the learner can be this year (conservative at both edges). */
export function bandFromYear(year: number, now = new Date()): Band | null {
  const thisYear = now.getUTCFullYear();
  if (!Number.isInteger(year) || year < thisYear - 120 || year > thisYear) return null;
  const youngest = thisYear - year - 1;
  if (youngest < 13) return "under-13";
  if (youngest < 16) return "13-15";
  return "16+";
}

function readBand(): Band | null {
  try {
    const v = window.sessionStorage.getItem(AGEBAND_KEY);
    return v === "under-13" || v === "13-15" || v === "16+" ? v : null;
  } catch {
    return null;
  }
}

function writeBand(b: Band) {
  try {
    window.sessionStorage.setItem(AGEBAND_KEY, b);
  } catch {
    /* ignore */
  }
}

const box: React.CSSProperties = { maxWidth: 520, margin: "0 auto", padding: "28px 20px", display: "grid", gap: 14, lineHeight: 1.45 };
const btn: React.CSSProperties = { padding: "10px 14px", borderRadius: 10, border: "1px solid #3a4150", background: "#1b2030", color: "inherit", cursor: "pointer" };

export default function AccountView() {
  // PC3: AccountSync (root layout) is the only thing that starts the sync; this page waits for its answer.
  const [state, setState] = useState<AccountState | undefined>(undefined);
  useEffect(() => {
    void accountState().then(setState);
  }, []);

  if (state === undefined) return <main style={box}>Loading…</main>;
  const me = state.me;
  if (me === null)
    return (
      <main style={box} data-testid="account-unavailable">
        <h1>Your history</h1>
        <p>Accounts are not available here. Your progress stays on this device.</p>
        <Link href="/">Back to lessons</Link>
      </main>
    );
  if (!me.signedIn) return <SignUp />;
  return (
    <SignedIn
      me={me}
      ask={"ask" in state ? state.ask : null}
      fromLink={"fromLink" in state && !!state.fromLink}
      onAnswered={setState}
      onSignedOut={() => void accountMe(true).then((m) => setState(m && !m.signedIn ? { me: m } : { me: null }))}
    />
  );
}

function SignUp() {
  const [band, setBand] = useState<Band | null>(null);
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  useEffect(() => setBand(readBand()), []);

  if (band === "under-13")
    return (
      <main style={box} data-testid="account-under-13">
        <h1>Your history</h1>
        <p>Accounts are not available for you yet. Every lesson still works, and your progress stays on this device.</p>
        <Link href="/">Back to lessons</Link>
      </main>
    );

  if (!band)
    return (
      <main style={box}>
        <h1>Keep my history</h1>
        <p>An account keeps your lessons and revisits on every device. It is optional: lessons work without one.</p>
        <label>
          What year were you born?{" "}
          <input inputMode="numeric" value={year} onChange={(e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 4))} aria-label="Birth year" />
        </label>
        <button
          style={btn}
          disabled={year.length !== 4}
          onClick={() => {
            const b = bandFromYear(Number(year));
            if (!b) return;
            writeBand(b); // only the band is kept, for this tab; the year is forgotten here
            setYear("");
            setBand(b);
          }}
        >
          Continue
        </button>
        <Link href="/">Not now</Link>
      </main>
    );

  return (
    <main style={box}>
      <h1>Keep my history</h1>
      {state === "sent" ? (
        <p data-testid="account-link-sent">Check your email for a sign-in link. It works once, for 5 minutes.</p>
      ) : (
        <>
          <label>
            Email <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
          </label>
          <p style={{ opacity: 0.8, fontSize: 14 }}>
            We store your email, an age group, and your lesson progress. Nothing else. Policy version {POLICY_VERSION}.
          </p>
          <button
            style={btn}
            disabled={!email.includes("@") || state === "sending"}
            onClick={async () => {
              setState("sending");
              try {
                const r = await fetch("/api/account/start", {
                  method: "POST",
                  credentials: "same-origin",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ email, ageBand: band, policyVersion: POLICY_VERSION }),
                });
                setState(r.ok ? "sent" : "error");
              } catch {
                setState("error");
              }
            }}
          >
            Send me a sign-in link
          </button>
          {state === "error" && <p role="alert">That did not work. Try again in a minute.</p>}
        </>
      )}
    </main>
  );
}

function SignedIn({
  me,
  ask,
  fromLink,
  onAnswered,
  onSignedOut,
}: {
  me: SignedInMe;
  ask: { lessons: number; recalls: number; saves: number } | null;
  fromLink: boolean;
  onAnswered: (s: AccountState) => void;
  onSignedOut: () => void;
}) {
  const [mergeState, setMergeState] = useState<"ask" | "done" | "declined" | "error">("ask");
  const [takeProgress, setTakeProgress] = useState(true);
  const [takeSaves, setTakeSaves] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [clearDevice, setClearDevice] = useState(false);
  const [clearOnSignOut, setClearOnSignOut] = useState(false);
  const [deleted, setDeleted] = useState<Record<string, number> | null>(null);
  const [note, setNote] = useState("");
  const doSignOut = async () => {
    if (!(await signOut({ clearDevice: clearOnSignOut }))) return setNote("Sign-out failed. Try again.");
    onSignedOut();
  };

  // `ask` counts only the device's own history the account does not hold, computed before anything was pulled (PC3).
  const hasProgress = !!ask && (ask.lessons > 0 || ask.recalls > 0);
  const hasSaves = !!ask && me.likesSaves && ask.saves > 0;

  if (deleted)
    return (
      <main style={box} data-testid="account-deleted">
        <h1>Account deleted</h1>
        <p>
          Deleted: your account, {deleted.lessons} lessons, {deleted.recalls} revisits, {deleted.devices} signed-in devices
          {me.likesSaves ? `, ${deleted.likes} likes, ${deleted.saves} saves` : ""}.
        </p>
        <Link href="/">Back to lessons</Link>
      </main>
    );

  const answer = async (choice: { progress: boolean; saves: boolean } | null) => {
    const next = await answerMerge(choice);
    if (!next) return setMergeState("error");
    setMergeState(choice ? "done" : "declined");
    onAnswered(next);
  };

  return (
    <main style={box}>
      <h1>Your history</h1>
      {/* Privacy re-read 2026-10-18 3.2 (W-1711): this page view only, nothing stored. Words: growth-designer. */}
      {fromLink ? (
        <p data-testid="account-signed-in-notice" role="status">
          You are now signed in as {me.email}. If you did not just ask for this,{" "}
          <button style={btn} onClick={() => void doSignOut()}>
            sign out
          </button>
        </p>
      ) : (
        <p>Signed in as {me.email}.</p>
      )}

      {ask && (hasProgress || hasSaves) && mergeState !== "done" && mergeState !== "declined" && (
        <section data-testid="account-merge" style={{ display: "grid", gap: 8 }}>
          {/* Privacy re-read 3.1 (W-1711): the choice names the account it sends to. Words: growth-designer. */}
          <h2>Send this device&apos;s history to {me.email}?</h2>
          <p style={{ opacity: 0.8, fontSize: 14 }}>Until you choose, nothing on this device is sent to your account.</p>
          {hasProgress && (
            <label>
              <input type="checkbox" checked={takeProgress} onChange={(e) => setTakeProgress(e.target.checked)} /> {ask.lessons} lessons completed and{" "}
              {ask.recalls} revisits
            </label>
          )}
          {hasSaves && (
            <label>
              <input type="checkbox" checked={takeSaves} onChange={(e) => setTakeSaves(e.target.checked)} /> {ask.saves} saved lessons
            </label>
          )}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={btn}
              disabled={!(hasProgress && takeProgress) && !(hasSaves && takeSaves)}
              onClick={() => void answer({ progress: hasProgress && takeProgress, saves: hasSaves && takeSaves })}
            >
              Import
            </button>
            <button style={btn} onClick={() => void answer(null)}>
              Don&apos;t import
            </button>
          </div>
        </section>
      )}
      {mergeState === "done" && <p>Imported. This device and your account now hold the same history.</p>}
      {mergeState === "error" && <p role="alert">The upload failed. Your history is still on this device; try again later.</p>}

      <section style={{ display: "grid", gap: 8 }}>
        <h2>Your data</h2>
        <a style={btn} href="/api/account/export" download="system3-history.json">
          Download my history (one file)
        </a>
        <label>
          Import a history file into this device{" "}
          <input
            type="file"
            accept="application/json"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              try {
                const file = JSON.parse(await f.text()) as { format?: string; progress?: ProgressMap; saves?: { slug: string; at: number }[] };
                if (file.format !== "s3c-export-v1" || !file.progress) throw new Error("format");
                importHistoryFile(file.progress);
                setNote("Imported into this device.");
              } catch {
                setNote("That file is not a System 3 history file.");
              }
            }}
          />
        </label>
        {note && <p>{note}</p>}
      </section>

      <section style={{ display: "grid", gap: 8 }}>
        <p style={{ opacity: 0.8, fontSize: 14 }}>
          Signing out removes your account&apos;s history from this device. What this device had before you signed in stays, unless you tick the box.
        </p>
        <label>
          <input type="checkbox" checked={clearOnSignOut} onChange={(e) => setClearOnSignOut(e.target.checked)} /> Also clear this device
        </label>
        <button
          style={btn}
          onClick={() => void doSignOut()}
        >
          Sign out
        </button>
        {!confirmDelete ? (
          <button style={btn} onClick={() => setConfirmDelete(true)}>
            Delete my account
          </button>
        ) : (
          <div data-testid="account-delete-confirm" style={{ display: "grid", gap: 8 }}>
            <p>
              This is permanent. Your account and everything stored with it are deleted now. This device keeps what it had before you signed in,
              unless you tick the box.
            </p>
            <label>
              <input type="checkbox" checked={clearDevice} onChange={(e) => setClearDevice(e.target.checked)} /> Also clear this device
            </label>
            <button
              style={btn}
              onClick={async () => {
                const r = await fetch("/api/account/delete", {
                  method: "POST",
                  credentials: "same-origin",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ confirm: true }),
                });
                if (!r.ok) return setNote("Deletion failed. Nothing was deleted; try again.");
                afterAccountDeleted(clearDevice);
                setDeleted(((await r.json()) as { deleted: Record<string, number> }).deleted);
              }}
            >
              Delete permanently
            </button>
          </div>
        )}
      </section>
      <Link href="/">Back to lessons</Link>
    </main>
  );
}

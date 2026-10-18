// The one email the product sends: the sign-in link (P1.8; company/decisions/2026-10-15-provider-resend-no-sdk.md).
// Owner: backend-engineer. Server only. `sendSignInLink` is the only caller of the sender API; a grep test fails if
// `api.resend.com` appears in any other file.
//
// Transports, chosen per call from the environment:
// - "resend": RESEND_API_KEY and EMAIL_FROM set. Plain fetch to Resend, plain text plus a minimal HTML twin, no
//   images, no remote content. Open and click tracking are a sending-domain setting (G2), not something this code sets.
// - "console": no RESEND_API_KEY, and not a Vercel production deployment. The link is printed to the server log for
//   local and staff testing. The address is never printed, only the link (which is single use and dies in 300 s).
// - none: a production deployment with no key refuses to send. Nothing is printed.
// No email, token or body is ever logged by the "resend" path, and its errors are reduced to a status code.

export type EmailEnv = Record<string, string | undefined>;
export type Transport = "resend" | "console" | "none";

export function emailTransport(env: EmailEnv = process.env): Transport {
  if (env.RESEND_API_KEY && env.EMAIL_FROM) return "resend";
  if (env.RESEND_API_KEY) return "none"; // a key with no sender is a misconfiguration; fail closed
  if (env.VERCEL_ENV === "production") return "none";
  return "console";
}

const SUBJECT = "Your sign-in link";

export function signInText(url: string): string {
  return [
    "Here is your sign-in link. It works once, for the next 5 minutes:",
    "",
    url,
    "",
    "If you did not ask for it, ignore this email. Nothing happens unless the link is opened.",
  ].join("\n");
}

function signInHtml(url: string): string {
  const safe = url.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  return `<p>Here is your sign-in link. It works once, for the next 5 minutes:</p><p><a href="${safe}">${safe}</a></p><p>If you did not ask for it, ignore this email. Nothing happens unless the link is opened.</p>`;
}

export type SendDeps = {
  env?: EmailEnv;
  fetch?: typeof fetch;
  log?: (line: string) => void;
};

/** Send the sign-in link. Throws a fixed-text error on failure (never the provider's answer). */
export async function sendSignInLink(email: string, url: string, deps: SendDeps = {}): Promise<Transport> {
  const env = deps.env ?? process.env;
  const t = emailTransport(env);
  if (t === "none") throw Object.assign(new Error("email not configured"), { code: "MAIL0" });
  if (t === "console") {
    (deps.log ?? console.log)(`[dev email] sign-in link: ${url}`);
    return t;
  }
  const f = deps.fetch ?? fetch;
  const res = await f("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({ from: env.EMAIL_FROM, to: [email], subject: SUBJECT, text: signInText(url), html: signInHtml(url) }),
  });
  if (!res.ok) throw Object.assign(new Error("email send failed"), { code: `MAIL${res.status}`.slice(0, 5) });
  return t;
}

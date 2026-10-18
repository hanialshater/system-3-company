// Better Auth mount (ADR-008). Only GET /magic-link/verify and POST /sign-out are routed (account-api.ts authRoute).
import { accountApi } from "@/lib/server/account-route";

export const runtime = "nodejs";
export const preferredRegion = "fra1";
export const dynamic = "force-dynamic";

export const GET = (req: Request) => accountApi().authRoute(req);
export const POST = (req: Request) => accountApi().authRoute(req);

// GET /api/account/progress (the account map), PUT (a one-slug delta) (EDD-008 proposal 3).
import { accountApi } from "@/lib/server/account-route";

export const runtime = "nodejs";
export const preferredRegion = "fra1";
export const dynamic = "force-dynamic";

export const GET = (req: Request) => accountApi().progressGet(req);
export const PUT = (req: Request) => accountApi().progressPut(req);

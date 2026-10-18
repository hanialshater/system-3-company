// POST /api/account/delete: one transaction (EDD-008 §7).
import { accountApi } from "@/lib/server/account-route";

export const runtime = "nodejs";
export const preferredRegion = "fra1";
export const dynamic = "force-dynamic";

export const POST = (req: Request) => accountApi().remove(req);

// POST /api/account/start: the one door for sign-in mail (EDD-008 §6.2, C2).
import { accountApi } from "@/lib/server/account-route";

export const runtime = "nodejs";
export const preferredRegion = "fra1";
export const dynamic = "force-dynamic";

export const POST = (req: Request) => accountApi().start(req);

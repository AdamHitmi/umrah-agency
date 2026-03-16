import {NextResponse} from "next/server";

import {getAdminSession} from "@/lib/auth/session";
import {ensureTrustedOrigin} from "@/lib/security";

export async function requireAdminApiSession(request?: Request) {
  if (request) {
    const originError = ensureTrustedOrigin(request);

    if (originError) {
      return {error: originError};
    }
  }

  const session = await getAdminSession();

  if (!session) {
    return {
      error: NextResponse.json({error: "Unauthorized"}, {status: 401})
    };
  }

  return {session};
}

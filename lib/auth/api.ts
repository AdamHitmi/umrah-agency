import {NextResponse} from "next/server";

import {getAdminSession} from "@/lib/auth/session";

export async function requireAdminApiSession() {
  const session = await getAdminSession();

  if (!session) {
    return {
      error: NextResponse.json({error: "Unauthorized"}, {status: 401})
    };
  }

  return {session};
}

import {NextResponse} from "next/server";

import {shouldUseSecureAuthCookie} from "@/lib/auth/session";
import {adminSessionCookieName} from "@/lib/constants";

export async function POST(request: Request) {
  const response = NextResponse.json({success: true});
  response.cookies.set({
    name: adminSessionCookieName,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureAuthCookie(request),
    path: "/",
    maxAge: 0
  });

  return response;
}

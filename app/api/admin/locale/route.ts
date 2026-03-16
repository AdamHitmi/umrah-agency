import {NextResponse} from "next/server";

import {normalizeAdminLocale} from "@/lib/admin-i18n";
import {shouldUseSecureAuthCookie} from "@/lib/auth/session";
import {adminLocaleCookieName} from "@/lib/constants";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = normalizeAdminLocale(url.searchParams.get("locale"));
  const redirectTo = url.searchParams.get("redirectTo") || "/admin/login";
  const redirectUrl = new URL(redirectTo, url.origin);
  const response = NextResponse.redirect(redirectUrl);

  response.cookies.set({
    name: adminLocaleCookieName,
    value: locale,
    httpOnly: false,
    sameSite: "lax",
    secure: shouldUseSecureAuthCookie(request),
    path: "/",
    maxAge: 60 * 60 * 24 * 365
  });

  return response;
}

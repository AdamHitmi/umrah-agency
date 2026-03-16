import createMiddleware from "next-intl/middleware";
import {NextResponse} from "next/server";

import {routing} from "@/lib/i18n/routing";
import {applySecurityHeaders} from "@/lib/security";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: Parameters<typeof intlMiddleware>[0]) {
  const pathname = request.nextUrl.pathname;
  const shouldRunIntl =
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/_vercel") &&
    !/\.[^/]+$/.test(pathname);

  const response = shouldRunIntl ? intlMiddleware(request) ?? NextResponse.next() : NextResponse.next();
  return applySecurityHeaders(response);
}

export const config = {
  matcher: ["/:path*"]
};

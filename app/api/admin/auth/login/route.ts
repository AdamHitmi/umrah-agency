import {NextResponse} from "next/server";

import {comparePassword} from "@/lib/auth/password";
import {
  createAdminSessionToken,
  shouldUseSecureAuthCookie
} from "@/lib/auth/session";
import {adminSessionCookieName} from "@/lib/constants";
import {prisma} from "@/lib/db";
import {sanitizeText} from "@/lib/sanitize";
import {adminLoginSchema} from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const payload = adminLoginSchema.parse(await request.json());
    const email = sanitizeText(payload.email).toLowerCase();
    const user = await prisma.adminUser.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return NextResponse.json({error: "Invalid credentials"}, {status: 401});
    }

    const valid = await comparePassword(payload.password, user.passwordHash);

    if (!valid) {
      return NextResponse.json({error: "Invalid credentials"}, {status: 401});
    }

    const token = await createAdminSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    const response = NextResponse.json({success: true});
    response.cookies.set({
      name: adminSessionCookieName,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: shouldUseSecureAuthCookie(request),
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Unable to log in"}, {status: 400});
  }
}

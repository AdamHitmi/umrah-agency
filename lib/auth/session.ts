import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {JWTPayload, jwtVerify, SignJWT} from "jose";

import {adminSessionCookieName} from "@/lib/constants";

type AdminSessionPayload = JWTPayload & {
  userId: string;
  email: string;
  name: string;
  role: string;
};

function getSessionSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is missing");
  }

  return new TextEncoder().encode(secret);
}

export async function createAdminSessionToken(
  payload: Omit<AdminSessionPayload, "iat" | "exp">
) {
  return new SignJWT(payload)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSessionSecret());
}

export function shouldUseSecureAuthCookie(request: Request) {
  const forwardedProto = request.headers.get("x-forwarded-proto");

  if (forwardedProto) {
    return forwardedProto === "https";
  }

  return new URL(request.url).protocol === "https:";
}

export async function verifyAdminSessionToken(token: string) {
  try {
    const {payload} = await jwtVerify<AdminSessionPayload>(token, getSessionSecret());
    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminSessionCookieName)?.value;

  if (!token) {
    return null;
  }

  return verifyAdminSessionToken(token);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

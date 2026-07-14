import type { Role } from "@/core/permissions/rbac";
import { createHmac, randomBytes } from "node:crypto";
import { config } from "@/core/config/env";

export type SessionUser = {
  id: string;
  email: string;
  role: Role;
};

export type AppSession = {
  user: SessionUser;
};

const SESSION_COOKIE_NAME = "session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Create an HMAC-signed session token for the given user.
 * Returns a string in the format: `payload.signature` where payload is
 * a URL-safe base64-encoded JSON string.
 */
export function createSessionToken(user: SessionUser): string {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    iat: Date.now(),
    exp: Date.now() + SESSION_DURATION_MS,
  };

  const encoded = Buffer.from(JSON.stringify(payload))
    .toString("base64url");

  const signature = signToken(encoded);
  return `${encoded}.${signature}`;
}

/**
 * Verify and decode a session token.
 * Returns the session user if valid, null otherwise.
 */
export function verifySessionToken(token: string): SessionUser | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [encoded, signature] = parts;
    const expectedSignature = signToken(encoded!);

    // Timing-safe comparison
    if (signature!.length !== expectedSignature.length) return null;

    const sigBuf = Buffer.from(signature!, "utf8");
    const expectedBuf = Buffer.from(expectedSignature, "utf8");
    if (sigBuf.length !== expectedBuf.length) return null;

    // Simple comparison for HMAC tokens
    let valid = true;
    for (let i = 0; i < sigBuf.length; i++) {
      if (sigBuf[i] !== expectedBuf[i]) valid = false;
    }
    if (!valid) return null;

    const payload = JSON.parse(Buffer.from(encoded!, "base64url").toString("utf8"));

    // Check expiration
    if (payload.exp && Date.now() > payload.exp) return null;

    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

/**
 * Read the session from the request's Authorization header or session cookie.
 * Returns the session if valid, null otherwise.
 */
export async function getSession(request?: Request): Promise<AppSession | null> {
  if (!request) return null;

  const authHeader = request.headers.get("Authorization");
  let token: string | null = null;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.slice(7);
  } else {
    const cookieHeader = request.headers.get("Cookie") || "";
    const cookies = parseCookies(cookieHeader);
    token = cookies[SESSION_COOKIE_NAME] || null;
  }

  if (!token) return null;

  const user = verifySessionToken(token);
  if (!user) return null;

  return { user };
}

/**
 * Set the session cookie on a Response.
 */
export function setSessionCookie(response: Response, token: string): void {
  response.headers.set(
    "Set-Cookie",
    `${SESSION_COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_DURATION_MS / 1000}`
  );
}

/**
 * Clear the session cookie on a Response.
 */
export function clearSessionCookie(response: Response): void {
  response.headers.set(
    "Set-Cookie",
    `${SESSION_COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
  );
}

/**
 * Generate a cryptographically secure session ID.
 */
export function generateSessionId(): string {
  return randomBytes(32).toString("hex");
}

// Private helpers

function signToken(data: string): string {
  const hmac = createHmac("sha256", config.authSecret);
  hmac.update(data);
  return hmac.digest("base64url");
}

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;

  for (const pair of cookieHeader.split(";")) {
    const [key, ...rest] = pair.trim().split("=");
    if (key && rest.length > 0) {
      cookies[key.trim()] = rest.join("=");
    }
  }

  return cookies;
}

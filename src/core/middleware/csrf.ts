import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createHmac, randomBytes } from "node:crypto";
import { config } from "@/core/config/env";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

/**
 * Generate a CSRF token for a given session ID.
 */
export function generateCsrfToken(sessionId: string): string {
  const hmac = createHmac("sha256", config.authSecret);
  hmac.update(sessionId);
  hmac.update("csrf-token");
  return `${sessionId}.${hmac.digest("hex")}`;
}

/**
 * Verify a CSRF token against the expected session ID.
 */
export function verifyCsrfToken(token: string, sessionId: string): boolean {
  try {
    const [sid] = token.split(".");
    if (sid !== sessionId) return false;
    const expected = generateCsrfToken(sessionId);
    return token === expected;
  } catch {
    return false;
  }
}

/**
 * CSRF protection middleware.
 * Requires a valid X-CSRF-Token header for state-changing requests.
 * The token is tied to the user's session ID.
 */
export function csrfMiddleware(request: NextRequest) {
  if (SAFE_METHODS.has(request.method)) {
    return NextResponse.next();
  }

  const token = request.headers.get("X-CSRF-Token");
  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: { code: "CSRF_ERROR", message: "Missing CSRF token" } }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  // Extract session ID from cookie (fallback to anonymous session)
  const sessionCookie = request.cookies.get("session")?.value;
  const sessionId = sessionCookie || "anonymous";

  if (!verifyCsrfToken(token, sessionId)) {
    return new NextResponse(
      JSON.stringify({ error: { code: "CSRF_ERROR", message: "Invalid CSRF token" } }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  return NextResponse.next();
}

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  max: number;         // Maximum requests in the window
  windowMs: number;    // Window duration in milliseconds
  keyFn?: (request: NextRequest) => string;
};

const store = new Map<string, RateLimitEntry>();

// Periodic cleanup of expired entries
const CLEANUP_INTERVAL = 60_000;
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now >= entry.resetAt) {
      store.delete(key);
    }
  }
}, CLEANUP_INTERVAL).unref();

/**
 * Create a rate limiter middleware.
 *
 * @example
 * ```ts
 * const apiLimiter = createRateLimiter({ max: 100, windowMs: 60_000 });
 * // Use in middleware: apiLimiter(request)
 * ```
 */
export function createRateLimiter(options: RateLimitOptions) {
  const { max, windowMs, keyFn } = {
    keyFn: (req: NextRequest) => {
      const forwarded = req.headers.get("x-forwarded-for");
      const ip = forwarded?.split(",")[0]?.trim() || "127.0.0.1";
      return ip;
    },
    ...options,
  };

  return function rateLimitMiddleware(request: NextRequest) {
    const key = keyFn!(request);
    const now = Date.now();

    let entry = store.get(key);

    if (!entry || now >= entry.resetAt) {
      entry = { count: 0, resetAt: now + windowMs };
      store.set(key, entry);
    }

    entry.count++;

    const remaining = Math.max(0, max - entry.count);
    const resetSeconds = Math.ceil((entry.resetAt - now) / 1000);

    // Set rate limit headers
    const response = entry.count > max
      ? new NextResponse(
          JSON.stringify({
            error: { code: "RATE_LIMITED", message: "Too many requests, please try again later" },
          }),
          { status: 429, headers: { "Content-Type": "application/json" } }
        )
      : NextResponse.next();

    response.headers.set("X-RateLimit-Limit", String(max));
    response.headers.set("X-RateLimit-Remaining", String(remaining));
    response.headers.set("X-RateLimit-Reset", String(resetSeconds));

    return response;
  };
}

/**
 * Global rate limiter: 100 requests per 60 seconds per IP.
 */
export const globalRateLimiter = createRateLimiter({ max: 100, windowMs: 60_000 });

/**
 * Strict rate limiter for auth endpoints: 10 requests per 60 seconds per IP.
 */
export const authRateLimiter = createRateLimiter({ max: 10, windowMs: 60_000 });

/**
 * API rate limiter: 60 requests per 60 seconds per IP.
 */
export const apiRateLimiter = createRateLimiter({ max: 60, windowMs: 60_000 });

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { config } from "@/core/config/env";

type CorsOptions = {
  allowedOrigins?: string[];
  allowCredentials?: boolean;
  allowedMethods?: string[];
  allowedHeaders?: string[];
  maxAge?: number;
};

const defaults: CorsOptions = {
  allowedOrigins: [config.appUrl],
  allowCredentials: true,
  allowedMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  maxAge: 86400,
};

export function createCorsMiddleware(options: CorsOptions = {}) {
  const opts = { ...defaults, ...options };

  return function corsMiddleware(request: NextRequest) {
    const origin = request.headers.get("origin") ?? "";
    const isAllowed = opts.allowedOrigins?.includes(origin) || opts.allowedOrigins?.includes("*");

    // Handle preflight
    if (request.method === "OPTIONS") {
      const response = new NextResponse(null, { status: 204 });
      setCorsHeaders(response.headers, origin, isAllowed, opts);
      return response;
    }

    const response = NextResponse.next();
    setCorsHeaders(response.headers, origin, isAllowed, opts);
    return response;
  };
}

function setCorsHeaders(
  headers: Headers,
  origin: string,
  isAllowed: boolean | undefined,
  opts: CorsOptions
) {
  if (isAllowed) {
    headers.set("Access-Control-Allow-Origin", origin || "*");
  }

  if (opts.allowCredentials) {
    headers.set("Access-Control-Allow-Credentials", "true");
  }

  if (opts.allowedMethods) {
    headers.set("Access-Control-Allow-Methods", opts.allowedMethods.join(", "));
  }

  if (opts.allowedHeaders) {
    headers.set("Access-Control-Allow-Headers", opts.allowedHeaders.join(", "));
  }

  if (opts.maxAge) {
    headers.set("Access-Control-Max-Age", String(opts.maxAge));
  }
}

export const cors = createCorsMiddleware();

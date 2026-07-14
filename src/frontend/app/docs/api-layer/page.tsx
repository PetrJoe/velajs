import { Globe, Shield, Gauge, FileCheck, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ApiLayerPage() {
  return (
    <div className="py-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
        <span className="size-2 rounded-full bg-sky-500" />
        API Layer
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">API Layer</h1>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl">
        The API layer provides a standardized set of tools for building secure, well-structured APIs:
        a consistent response envelope, CORS, CSRF protection, rate limiting, and request validation.
      </p>

      <Section title="Standard Response Envelope">
        <p>Every API response follows a consistent format. This makes client-side error handling predictable and enables auto-generated API clients.</p>

        <ApiBlock
          importPath="@/core/middleware/api-response"
          exports={["success", "created", "noContent", "failure", "badRequest", "unauthorized", "forbidden", "notFound", "conflict", "tooManyRequests", "internalError"]}
        />

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Success responses</h3>
        <CodeBlock>{`import { success, created, noContent } from "@/core/middleware/api-response";

// 200 OK
return success({ id: "abc", name: "Alice" });
// Response: { "data": { "id": "abc", "name": "Alice" } }

// 201 Created
return created( { id: "xyz" });
// Response: { "data": { "id": "xyz" } }

// 204 No Content
return noContent();
// Response: (empty body)`}</CodeBlock>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Error responses</h3>
        <CodeBlock>{`import { unauthorized, notFound, conflict } from "@/core/middleware/api-response";

// 401
return unauthorized();
// { "error": { "code": "UNAUTHORIZED", "message": "Authentication required" } }

// 404
return notFound("User not found");
// { "error": { "code": "NOT_FOUND", "message": "User not found" } }

// 409
return conflict("Email already in use");
// { "error": { "code": "CONFLICT", "message": "Email already in use" } }

// 429
return tooManyRequests();
// { "error": { "code": "RATE_LIMITED", "message": "Rate limit exceeded" } }

// 500
return internalError();
// { "error": { "code": "INTERNAL_ERROR", "message": "Unexpected server error" } }`}</CodeBlock>
      </Section>

      <Section title="CORS Middleware">
        <p>Configurable CORS middleware for handling cross-origin requests. Supports per-origin configuration, credentials, and preflight requests.</p>

        <ApiBlock
          importPath="@/core/middleware/cors"
          exports={["createCorsMiddleware", "cors"]}
        />

        <CodeBlock>{`import { createCorsMiddleware } from "@/core/middleware/cors";

// Custom configuration
const cors = createCorsMiddleware({
  allowedOrigins: ["https://myapp.com", "https://admin.myapp.com"],
  allowCredentials: true,
  allowedMethods: ["GET", "POST", "PUT", "DELETE"],
  maxAge: 3600, // 1 hour
});

// Use in middleware.ts:
export function middleware(request: NextRequest) {
  return cors(request);
}`}</CodeBlock>

        <p className="mt-4">A default instance is pre-configured with the <InlineCode>APP_URL</InlineCode> environment variable as the allowed origin.</p>
      </Section>

      <Section title="CSRF Protection">
        <p>Cross-Site Request Forgery (CSRF) protection using HMAC-signed tokens tied to the user&apos;s session. Safe methods (GET, HEAD, OPTIONS) are exempt.</p>

        <ApiBlock
          importPath="@/core/middleware/csrf"
          exports={["csrfMiddleware", "generateCsrfToken", "verifyCsrfToken"]}
        />

        <CodeBlock>{`import { csrfMiddleware } from "@/core/middleware/csrf";

// Use in middleware.ts:
export function middleware(request: NextRequest) {
  return csrfMiddleware(request);
}

// Client-side: include the CSRF token in state-changing requests
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRF-Token": csrfToken,
  },
  body: JSON.stringify({ name: "Alice" }),
});`}</CodeBlock>

        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Note:</strong> CSRF protection requires a session to be established. For anonymous users,
          the session cookie is still validated — ensure your login/register routes set a session cookie.
        </div>
      </Section>

      <Section title="Rate Limiting">
        <p>In-memory rate limiting with configurable windows and per-route limits. The limiter supports custom key functions (default: IP-based via <InlineCode>x-forwarded-for</InlineCode>).</p>

        <ApiBlock
          importPath="@/core/middleware/rate-limit"
          exports={["createRateLimiter", "globalRateLimiter", "authRateLimiter", "apiRateLimiter"]}
        />

        <CodeBlock>{`import { createRateLimiter } from "@/core/middleware/rate-limit";

// Custom rate limiter: 30 requests per minute
const limiter = createRateLimiter({ max: 30, windowMs: 60_000 });

// Use in middleware.ts:
export function middleware(request: NextRequest) {
  return limiter(request);
}

// Pre-configured limiters:
// globalRateLimiter - 100 requests/60s per IP
// authRateLimiter   - 10 requests/60s per IP
// apiRateLimiter    - 60 requests/60s per IP`}</CodeBlock>

        <p className="mt-4">Rate limit headers are included in every response:</p>
        <CodeBlock>{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 42`}</CodeBlock>
      </Section>

      <Section title="Request Validation">
        <p>Middleware-style validation using Zod schemas. Supports validating request body, query parameters, and headers.</p>

        <ApiBlock
          importPath="@/core/middleware/validate"
          exports={["validate", "validateOrError"]}
        />

        <CodeBlock>{`import { validate, validateOrError } from "@/core/middleware/validate";
import { createUserSchema } from "@/apps/users/validators/user-validator";

// Option 1: Validate and handle errors manually
const result = await validate(createUserSchema, request);
if (!result.success) {
  return Response.json({
    error: { code: "VALIDATION_ERROR", message: "Invalid payload", details: result.error }
  }, { status: 422 });
}
// result.data is typed CreateUserInput

// Option 2: Validate or return error response
const body = await validateOrError(createUserSchema, request);
if (body instanceof Response) return body;
// body is typed CreateUserInput`}</CodeBlock>

        <p className="mt-4">The <InlineCode>validate</InlineCode> function supports three validation targets:</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600">
          <li><InlineCode>body</InlineCode> — parses <InlineCode>await request.json()</InlineCode> (default)</li>
          <li><InlineCode>query</InlineCode> — parses URL search parameters</li>
          <li><InlineCode>headers</InlineCode> — parses request headers</li>
        </ul>
      </Section>

      <Section title="Error Handling">
        <p>The <InlineCode>ApiError</InlineCode> class and <InlineCode>errorResponse</InlineCode> function provide a standard way to throw and catch API errors.</p>

        <ApiBlock
          importPath="@/core/middleware/api-errors"
          exports={["ApiError", "errorResponse"]}
        />

        <CodeBlock>{`import { ApiError, errorResponse } from "@/core/middleware/api-errors";

// Throwing errors in services
if (!user) {
  throw new ApiError("User not found", 404, "NOT_FOUND");
}

// Catching and responding in controllers
try {
  const user = await service.get(id);
  return success(user);
} catch (error) {
  return errorResponse(error);
  // Automatically handles ApiError, ZodError, and generic errors
}`}</CodeBlock>
      </Section>

      <Section title="Middleware Pipeline">
        <p>All API middleware can be composed in the Next.js <InlineCode>middleware.ts</InlineCode> file:</p>
        <CodeBlock>{`// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cors } from "@/core/middleware/cors";
import { csrfMiddleware } from "@/core/middleware/csrf";
import { globalRateLimiter } from "@/core/middleware/rate-limit";
import { withSecurityHeaders } from "@/core/security/headers";

export function middleware(request: NextRequest) {
  let response = cors(request);
  if (response.status === 204) return response; // Preflight

  response = csrfMiddleware(request);
  if (response.status !== 200) return response; // CSRF error

  response = globalRateLimiter(request);
  if (response.status !== 200) return response; // Rate limited

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: "/api/:path*",
};`}</CodeBlock>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-slate-600">{children}</div>
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
      <code>{children}</code>
    </pre>
  );
}

function ApiBlock({ importPath, exports }: { importPath: string; exports: string[] }) {
  return (
    <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="font-medium">Import:</span>
        <code className="rounded bg-white px-1.5 py-0.5 font-mono text-slate-800">{importPath}</code>
      </div>
      <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500">
        <span className="font-medium">Exports:</span>
        <span className="flex flex-wrap gap-1">
          {exports.map((exp) => (
            <code key={exp} className="rounded bg-white px-1.5 py-0.5 font-mono text-emerald-700">{exp}</code>
          ))}
        </span>
      </div>
    </div>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-800">{children}</code>
  );
}

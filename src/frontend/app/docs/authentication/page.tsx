import { Key, Lock, Cookie, User, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AuthenticationPage() {
  return (
    <div className="py-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
        <span className="size-2 rounded-full bg-emerald-500" />
        Authentication
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Authentication</h1>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl">
        velajs provides a complete authentication system with password hashing, session management,
        and API routes — all powered by Node.js built-in crypto, with zero additional dependencies.
      </p>

      <Section title="Architecture">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Password Hashing", desc: "scrypt with random salt (32 bytes), key length 64 bytes. Timing-safe comparison prevents timing attacks.", icon: <Key className="size-4" /> },
            { title: "Session Tokens", desc: "HMAC-SHA256 signed tokens with expiration. Payload is base64url-encoded JSON. No external JWT library needed.", icon: <Cookie className="size-4" /> },
            { title: "Cookie Management", desc: "HttpOnly, Secure, SameSite=Lax cookies with configurable duration (default: 7 days).", icon: <Lock className="size-4" /> },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="flex size-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">{item.icon}</span>
              <h3 className="mt-3 font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Password Hashing">
        <p>Uses Node.js <InlineCode>crypto.scrypt</InlineCode> for password hashing — a memory-hard function resistant to GPU and ASIC attacks.</p>
        <ApiBlock
          importPath="@/core/auth/password"
          exports={["hashPassword", "verifyPassword"]}
        />
        <CodeBlock>{`import { hashPassword, verifyPassword } from "@/core/auth/password";

// Hash a password (async)
const hash = await hashPassword("user-password");
// Returns: "salt:hash" (both hex-encoded)

// Verify a password (async, timing-safe)
const isValid = await verifyPassword("user-password", hash);
// true or false`}</CodeBlock>
        <h3 className="mt-6 text-lg font-semibold text-slate-900">Configuration</h3>
        <table className="mt-2 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-2 pr-4 text-left font-semibold text-slate-900">Parameter</th>
              <th className="py-2 text-left font-semibold text-slate-900">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="py-2 pr-4 text-slate-800">Salt length</td><td className="py-2 font-mono text-xs text-slate-600">32 bytes</td></tr>
            <tr><td className="py-2 pr-4 text-slate-800">Key length</td><td className="py-2 font-mono text-xs text-slate-600">64 bytes</td></tr>
            <tr><td className="py-2 pr-4 text-slate-800">Cost (N)</td><td className="py-2 font-mono text-xs text-slate-600">16384</td></tr>
            <tr><td className="py-2 pr-4 text-slate-800">Block size (r)</td><td className="py-2 font-mono text-xs text-slate-600">8</td></tr>
            <tr><td className="py-2 pr-4 text-slate-800">Parallelization (p)</td><td className="py-2 font-mono text-xs text-slate-600">1</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="Session Management">
        <p>Sessions use HMAC-SHA256 signed tokens stored in HttpOnly cookies. The token format is:</p>
        <CodeBlock>{`base64url(payload).base64url(hmac_signature)

payload = {
  id: "user-uuid",
  email: "user@example.com",
  role: "member",
  iat: 1700000000000,   // issued at (ms)
  exp: 1700604800000     // expires at (ms)
}`}</CodeBlock>

        <ApiBlock
          importPath="@/core/auth/session"
          exports={["getSession", "createSessionToken", "verifySessionToken", "setSessionCookie", "clearSessionCookie", "SessionUser", "AppSession"]}
        />

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Reading the session</h3>
        <CodeBlock>{`import { getSession } from "@/core/auth/session";

// In an API route handler
export async function GET(request: Request) {
  const session = await getSession(request);

  if (!session) {
    return Response.json({ error: { code: "UNAUTHORIZED", message: "Not authenticated" } }, { status: 401 });
  }

  // session.user.id, session.user.email, session.user.role
  return Response.json({ data: session.user });
}`}</CodeBlock>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Creating a session</h3>
        <CodeBlock>{`import { createSessionToken, setSessionCookie } from "@/core/auth/session";

const token = createSessionToken({
  id: user.id,
  email: user.email,
  role: user.role,
});

const response = Response.json({ data: { user } });
setSessionCookie(response, token);
return response;`}</CodeBlock>
      </Section>

      <Section title="Auth API Routes">
        <p>The framework provides built-in API routes for authentication:</p>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">POST /api/auth/register</h3>
        <CodeBlock>{`// Request
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "Alice",
  "password": "secure-password-123"
}

// Response: 201 Created
{
  "data": {
    "user": { "id": "...", "email": "...", "name": "Alice", "role": "member" },
    "token": "eyJpZCI6... .signature"
  }
}`}</CodeBlock>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">POST /api/auth/login</h3>
        <CodeBlock>{`// Request
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure-password-123"
}

// Response: 200 OK
{
  "data": {
    "user": { "id": "...", "email": "...", "name": "Alice", "role": "member" },
    "token": "eyJpZCI6... .signature"
  }
}

// Error: 401 Unauthorized
{
  "error": { "code": "INVALID_CREDENTIALS", "message": "Invalid email or password" }
}`}</CodeBlock>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">POST /api/auth/logout</h3>
        <CodeBlock>{`// Request
POST /api/auth/logout

// Response: 204 No Content
// (session cookie is cleared)`}</CodeBlock>
      </Section>

      <Section title="User Service">
        <p>The <InlineCode>UserService</InlineCode> handles user registration and login with proper error handling:</p>
        <ApiBlock
          importPath="@/apps/users/services/user-service"
          exports={["UserService"]}
        />
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-slate-600">
          <li><strong>Email conflict detection</strong> — returns 409 if email already exists</li>
          <li><strong>Automatic password hashing</strong> — plaintext passwords never stored</li>
          <li><strong>Session token generation</strong> — returned with user data on success</li>
          <li><strong>Secure comparison</strong> — timing-safe password verification</li>
        </ul>
      </Section>

      <Section title="Next Steps">
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href={"/docs/api-layer" as any} className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300">
            <span className="text-sm font-medium text-slate-900">Secure your API endpoints</span>
            <ArrowRight className="size-4 text-slate-400 group-hover:translate-x-0.5" />
          </Link>
          <Link href={"/docs/security" as any} className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300">
            <span className="text-sm font-medium text-slate-900">Security hardening guide</span>
            <ArrowRight className="size-4 text-slate-400 group-hover:translate-x-0.5" />
          </Link>
        </div>
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

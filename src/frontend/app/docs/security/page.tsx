import { Shield, Lock, Eye, Key, Gauge, UserCheck, Globe } from "lucide-react";
import Link from "next/link";

export default function SecurityPage() {
  return (
    <div className="py-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
        <span className="size-2 rounded-full bg-red-500" />
        Security
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Security</h1>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl">
        nextforge ships with security built in at every layer — from HTTP headers and CSP to authentication,
        authorization, CSRF protection, and rate limiting.
      </p>

      <Section title="Security Headers">
        <p>The framework applies security headers automatically to all responses via the security middleware.</p>

        <ApiBlock
          importPath="@/core/security/headers"
          exports={["withSecurityHeaders", "securityMiddleware"]}
        />

        <CodeBlock>{`// middleware.ts
export { securityMiddleware as middleware } from "@/core/security/headers";`}</CodeBlock>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Headers Applied</h3>
        <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Header</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Value</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-slate-800">X-Frame-Options</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-600">DENY</td>
                <td className="px-4 py-3 text-slate-600">Prevents clickjacking</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-slate-800">X-Content-Type-Options</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-600">nosniff</td>
                <td className="px-4 py-3 text-slate-600">Prevents MIME type sniffing</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-slate-800">Referrer-Policy</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-600">strict-origin-when-cross-origin</td>
                <td className="px-4 py-3 text-slate-600">Controls referrer information</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-slate-800">Permissions-Policy</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-600">camera=(), microphone=(), geolocation=()</td>
                <td className="px-4 py-3 text-slate-600">Disables unused browser features</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-slate-800">Content-Security-Policy</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-600">default-src &apos;self&apos; ...</td>
                <td className="px-4 py-3 text-slate-600">Restricts resource loading</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Content Security Policy (CSP)">
        <p>The default CSP restricts resources to same-origin by default, with explicit allowances:</p>
        <CodeBlock>{`default-src 'self'
script-src  'self' 'unsafe-eval' 'unsafe-inline'
style-src   'self' 'unsafe-inline'
img-src     'self' data: https:
connect-src 'self'`}</CodeBlock>
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Production hardening:</strong> Remove <InlineCode>&apos;unsafe-eval&apos;</InlineCode> and <InlineCode>&apos;unsafe-inline&apos;</InlineCode>
          for enhanced security. Use nonces or hashes for inline scripts instead.
        </div>
      </Section>

      <Section title="Authentication & Session Security">
        <p>The authentication system is designed with security best practices:</p>
        <ul className="mt-4 list-inside list-disc space-y-3 text-sm text-slate-600">
          <li><strong>Password hashing:</strong> scrypt with 32-byte random salt — memory-hard, resistant to GPU/ASIC attacks</li>
          <li><strong>Timing-safe comparison:</strong> All password and token verifications use constant-time comparison to prevent timing attacks</li>
          <li><strong>HttpOnly cookies:</strong> Session tokens are inaccessible to JavaScript, preventing XSS-based theft</li>
          <li><strong>Secure flag:</strong> Cookies are only sent over HTTPS in production</li>
          <li><strong>SameSite=Lax:</strong> Prevents CSRF attacks by restricting cookie sending to same-site requests</li>
          <li><strong>Token expiration:</strong> Sessions expire after 7 days by default</li>
          <li><strong>HMAC signing:</strong> Tokens are signed with SHA-256 HMAC, preventing tampering</li>
        </ul>
      </Section>

      <Section title="Authorization (RBAC)">
        <p>Role-Based Access Control is built into the framework:</p>

        <ApiBlock
          importPath="@/core/permissions/rbac"
          exports={["can", "requirePermission", "Role", "Permission"]}
        />

        <CodeBlock>{`import { requirePermission } from "@/core/permissions/rbac";

function deleteUser(requesterRole: Role, userId: string) {
  // Throws if the user lacks the "users.write" permission
  requirePermission(requesterRole, "users.write");
  // Proceed with deletion
}`}</CodeBlock>

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Default Role Hierarchy</h3>
        <div className="mt-3 space-y-2">
          {[
            { role: "admin", perms: "users.read, users.write, admin.access" },
            { role: "manager", perms: "users.read, users.write" },
            { role: "member", perms: "users.read" },
          ].map(({ role, perms }) => (
            <div key={role} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-semibold text-slate-800">{role}</span>
              <span className="text-slate-600">{perms}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="CSRF Protection">
        <p>Cross-Site Request Forgery protection using HMAC-signed tokens. See the <Link href={"/docs/api-layer" as any} className="font-medium text-slate-900 underline">API Layer docs</Link> for details.</p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-slate-600">
          <li>Tokens are bound to the user&apos;s session ID</li>
          <li>Safe methods (GET, HEAD, OPTIONS) are exempt</li>
          <li>Requires <InlineCode>X-CSRF-Token</InlineCode> header on state-changing requests</li>
        </ul>
      </Section>

      <Section title="Rate Limiting">
        <p>Built-in rate limiting protects against brute-force and DDoS attacks:</p>
        <div className="mt-3 space-y-2">
          {[
            { name: "Global", limit: "100 requests/60s", use: "All routes" },
            { name: "Auth", limit: "10 requests/60s", use: "Login/register endpoints" },
            { name: "API", limit: "60 requests/60s", use: "General API routes" },
          ].map(({ name, limit, use }) => (
            <div key={name} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-semibold text-slate-800">{name}</span>
              <span className="text-slate-800 font-mono text-xs">{limit}</span>
              <span className="text-slate-500">{use}</span>
            </div>
          ))}
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

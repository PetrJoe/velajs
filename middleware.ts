export { securityMiddleware as middleware } from "@/core/security/headers";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};

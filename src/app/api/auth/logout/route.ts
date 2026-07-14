import { clearSessionCookie } from "@/core/auth/session";

export async function POST() {
  const response = new Response(null, { status: 204 });
  clearSessionCookie(response);
  return response;
}

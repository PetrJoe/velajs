import type { Role } from "@/core/permissions/rbac";

export type SessionUser = {
  id: string;
  email: string;
  role: Role;
};

export type AppSession = {
  user: SessionUser;
};

export async function getSession(): Promise<AppSession | null> {
  return null;
}

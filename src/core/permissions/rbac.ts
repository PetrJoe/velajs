export type Role = "admin" | "manager" | "member";
export type Permission = "users.read" | "users.write" | "admin.access" | `${string}.${"read" | "write" | "delete"}`;

const rolePermissions: Record<Role, Permission[]> = {
  admin: ["users.read", "users.write", "admin.access"],
  manager: ["users.read", "users.write"],
  member: ["users.read"]
};

export function can(role: Role, permission: Permission) {
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function requirePermission(role: Role, permission: Permission) {
  if (!can(role, permission)) {
    throw new Error(`Missing permission: ${permission}`);
  }
}
